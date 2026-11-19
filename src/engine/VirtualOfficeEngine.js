import { ANIMATIONS } from '../config/spritesConfig.js';
import {
  ZONES,
  SHORTCUT_MAP,
  CODE_TO_KEY,
  FACING_LABELS
} from '../config/officeZones.js';
import { loadSpriteSheets } from './spriteLoader.js';
import { drawOffice, drawPlayer } from './officeRenderer.js';

export class VirtualOfficeEngine {
  constructor(canvas, { onStateChange, onSheetsProgress } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onStateChange = onStateChange;
    this.onSheetsProgress = onSheetsProgress;

    this.keys = {};
    this.rafId = null;
    this.isCreatorOpen = false;
    this.loadInfo = { loaded: 0, total: 20, isReady: false };

    this.me = {
      name: 'คุณ (Lead)',
      x: 185,
      y: 265,
      targetX: 185,
      targetY: 265,
      facing: 'down',
      isMoving: false,
      isRunning: false,
      action: 'idle',
      actionStartTime: 0,
      sitVariant: 0,
      pantryVariant: 0,
      lastActiveTime: performance.now(),
      avatar: {
        mode: 'classic',
        gender: 'male',
        bodyIndex: 1,
        face: 0,
        hair: 0,
        top: 0,
        bottom: 0,
        glasses: 0,
        hat: -1
      }
    };

    // เพื่อนร่วมทีมในออฟฟิศ (สามารถกดสร้างเพิ่มจากหน้าสร้างตัวละครได้สูงสุด 10+ คน)
    this.npcs = [
      {
        name: 'มิ้นท์ (Designer)',
        x: 775,
        y: 235,
        targetX: 775,
        targetY: 235,
        facing: 'down',
        isMoving: false,
        isRunning: false,
        action: 'idle',
        nextMoveTime: 4000,
        avatar: {
          mode: 'modular',
          gender: 'female',
          bodyIndex: 3,
          face: 0,
          hair: 6,
          top: 5,
          bottom: 5,
          glasses: -1,
          hat: 4
        }
      },
      {
        name: 'นนท์ (Dev)',
        x: 480,
        y: 235,
        targetX: 480,
        targetY: 235,
        facing: 'right',
        isMoving: false,
        isRunning: false,
        action: 'idle',
        nextMoveTime: 6500,
        avatar: {
          mode: 'modular',
          gender: 'male',
          bodyIndex: 1,
          face: 1,
          hair: 4,
          top: 1,
          bottom: 3,
          glasses: 3,
          hat: 1
        }
      }
    ];

    this.lastSnapshotKey = '';

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCanvasClick = this.handleCanvasClick.bind(this);
    this.loop = this.loop.bind(this);

    this.sheets = loadSpriteSheets(progress => {
      this.loadInfo = progress;
      if (typeof this.onSheetsProgress === 'function') {
        this.onSheetsProgress(progress, this.sheets);
      }
      this.emitStateChange();
    });
  }

  setCreatorOpen(isOpen) {
    this.isCreatorOpen = Boolean(isOpen);
    if (this.isCreatorOpen) {
      this.handleBlur();
    }
  }

  applyCharacter(name, avatarConfig) {
    if (name && name.trim()) {
      this.me.name = name.trim();
    }
    this.me.avatar = { ...avatarConfig };
    this.me.lastActiveTime = performance.now();
    this.emitStateChange();
  }

  spawnFriend(name, avatarConfig) {
    const spots = [
      { x: 430, y: 460 },
      { x: 530, y: 460 },
      { x: 300, y: 310 },
      { x: 640, y: 310 },
      { x: 135, y: 480 },
      { x: 825, y: 480 },
      { x: 260, y: 240 },
      { x: 600, y: 240 }
    ];
    const spot = spots[this.npcs.length % spots.length];
    const jitterX = (Math.random() - 0.5) * 36;
    const jitterY = (Math.random() - 0.5) * 24;
    const sx = Math.round(spot.x + jitterX);
    const sy = Math.round(spot.y + jitterY);

    this.npcs.push({
      name: (name && name.trim()) || `เพื่อน #${this.npcs.length + 1}`,
      x: sx,
      y: sy,
      targetX: sx,
      targetY: sy,
      facing: Math.random() > 0.5 ? 'right' : 'left',
      isMoving: false,
      isRunning: false,
      action: 'idle',
      nextMoveTime: performance.now() + 3000 + Math.random() * 4000,
      avatar: { ...avatarConfig, mode: 'modular' }
    });
    this.emitStateChange();
  }

  getCurrentZone() {
    const { x, y } = this.me;
    return (
      ZONES.find(
        z => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h
      ) || null
    );
  }

  getUIState() {
    const { action, isMoving, isRunning, facing } = this.me;
    const { loaded, total, isReady } = this.loadInfo;

    let statusText = `กำลังโหลดชุดภาพ (${loaded}/${total})...`;
    let dotColor = '#22c55e';

    if (action !== 'idle') {
      const anim = ANIMATIONS[action];
      statusText = anim && anim.label ? anim.label : action;
      dotColor =
        action === 'angry' || action === 'angry_talk'
          ? '#ef4444'
          : action === 'sleep'
          ? '#a855f7'
          : '#38bdf8';
    } else if (isMoving) {
      statusText = isRunning
        ? '🏃 กำลังวิ่ง... (Running)'
        : '🚶 กำลังเดิน... (Walking)';
      dotColor = isRunning ? '#f59e0b' : '#22c55e';
    } else if (isReady) {
      statusText = `พร้อมลุยงาน (ในห้อง ${this.npcs.length + 1} คน)`;
    }

    return {
      action,
      statusText,
      dotColor,
      facing,
      facingText: FACING_LABELS[facing] || facing,
      currentZone: this.getCurrentZone(),
      memberCount: this.npcs.length + 1
    };
  }

  emitStateChange() {
    if (typeof this.onStateChange !== 'function') return;
    const state = this.getUIState();
    const snapshotKey = `${state.action}|${state.statusText}|${state.dotColor}|${state.facing}|${state.currentZone ? state.currentZone.name : ''}|${state.memberCount}`;
    if (snapshotKey !== this.lastSnapshotKey) {
      this.lastSnapshotKey = snapshotKey;
      this.onStateChange(state);
    }
  }

  setAction(newAction) {
    this.me.targetX = this.me.x;
    this.me.targetY = this.me.y;
    this.me.isMoving = false;

    if (newAction === 'sit' && this.me.action === 'sit') {
      this.me.sitVariant = (this.me.sitVariant + 1) % 3;
    }
    if (this.me.action !== newAction) {
      this.me.actionStartTime = performance.now();
    }
    this.me.action = newAction;
    this.me.lastActiveTime = performance.now();
    this.emitStateChange();
  }

  handleKeyDown(e) {
    if (this.isCreatorOpen) return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    const k = CODE_TO_KEY[e.code] || e.key.toLowerCase();
    this.keys[k] = true;
    this.me.lastActiveTime = performance.now();

    if (SHORTCUT_MAP[k]) {
      this.setAction(SHORTCUT_MAP[k]);
    } else if (k === 'e') {
      const z = this.getCurrentZone();
      if (z) {
        if (z.action === 'eat_chicken') {
          const pantryActions = ['eat_chicken', 'eat_fruit', 'drink_water'];
          const chosen =
            pantryActions[this.me.pantryVariant % pantryActions.length];
          this.me.pantryVariant++;
          this.setAction(chosen);
        } else {
          this.setAction(z.action);
        }
      }
    }
  }

  handleKeyUp(e) {
    const k = CODE_TO_KEY[e.code] || e.key.toLowerCase();
    this.keys[k] = false;
  }

  handleBlur() {
    Object.keys(this.keys).forEach(k => {
      this.keys[k] = false;
    });
  }

  handleCanvasClick(e) {
    if (this.isCreatorOpen) return;
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;
    if (cy > 95 && cy < 575) {
      this.me.targetX = cx;
      this.me.targetY = cy;
      this.me.lastActiveTime = performance.now();
      if (this.me.action !== 'idle') {
        this.me.action = 'idle';
        this.emitStateChange();
      }
    }
  }

  updateNPCs(time) {
    this.npcs.forEach(npc => {
      if (time > npc.nextMoveTime) {
        npc.nextMoveTime = time + 4500 + Math.random() * 5500;
        if (Math.random() < 0.65) {
          const roamX = Math.max(85, Math.min(875, npc.x + (Math.random() - 0.5) * 180));
          const roamY = Math.max(210, Math.min(520, npc.y + (Math.random() - 0.5) * 120));
          npc.targetX = roamX;
          npc.targetY = roamY;
          npc.action = 'idle';
        } else {
          const randomActions = ['idle', 'normal_talk', 'laugh', 'eat_fruit', 'victory'];
          npc.action = randomActions[Math.floor(Math.random() * randomActions.length)];
        }
      }

      const dx = npc.targetX - npc.x;
      const dy = npc.targetY - npc.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 3) {
        npc.x += (dx / dist) * 2.1;
        npc.y += (dy / dist) * 2.1;
        npc.facing = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        npc.isMoving = true;
      } else {
        npc.isMoving = false;
      }
    });
  }

  update(time) {
    this.updateNPCs(time);

    if (this.isCreatorOpen) return;

    this.me.isRunning = Boolean(this.keys['shift']);
    const speed = this.me.isRunning ? 5.0 : 3.0;
    let dxKey = 0;
    let dyKey = 0;

    if (this.keys['w'] || this.keys['arrowup']) dyKey -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) dyKey += 1;
    if (this.keys['a'] || this.keys['arrowleft']) dxKey -= 1;
    if (this.keys['d'] || this.keys['arrowright']) dxKey += 1;

    if (dxKey !== 0 || dyKey !== 0) {
      const len = Math.hypot(dxKey, dyKey);
      this.me.x += (dxKey / len) * speed;
      this.me.y += (dyKey / len) * speed;
      this.me.targetX = this.me.x;
      this.me.targetY = this.me.y;
      this.me.isMoving = true;

      if (Math.abs(dxKey) >= Math.abs(dyKey)) {
        this.me.facing = dxKey > 0 ? 'right' : 'left';
      } else {
        this.me.facing = dyKey > 0 ? 'down' : 'up';
      }

      if (this.me.action !== 'idle') {
        this.me.action = 'idle';
      }
    } else {
      const dx = this.me.targetX - this.me.x;
      const dy = this.me.targetY - this.me.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        this.me.x += (dx / dist) * speed;
        this.me.y += (dy / dist) * speed;
        if (Math.abs(dx) >= Math.abs(dy)) {
          this.me.facing = dx > 0 ? 'right' : 'left';
        } else {
          this.me.facing = dy > 0 ? 'down' : 'up';
        }
        this.me.isMoving = true;
      } else {
        this.me.isMoving = false;
      }
    }

    if (
      !this.me.isMoving &&
      this.me.action === 'idle' &&
      time - this.me.lastActiveTime > 25000
    ) {
      this.setAction('sleep');
    }

    this.me.x = Math.max(40, Math.min(this.canvas.width - 40, this.me.x));
    this.me.y = Math.max(120, Math.min(565, this.me.y));

    this.emitStateChange();
  }

  loop(time) {
    this.update(time);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    drawOffice(this.ctx, this.canvas, this.getCurrentZone());

    // เรียงลำดับการวาดตามแกน Y (ใครอยู่ด้านล่างวาดทับคนด้านบน)
    const allChars = [
      ...this.npcs.map(n => ({ char: n, isMain: false })),
      { char: this.me, isMain: true }
    ].sort((a, b) => a.char.y - b.char.y);

    allChars.forEach(item => {
      drawPlayer(this.ctx, item.char, this.sheets, time, item.isMain);
    });

    this.rafId = requestAnimationFrame(this.loop);
  }

  start() {
    if (this.rafId !== null) return;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
    this.canvas.addEventListener('click', this.handleCanvasClick);
    this.emitStateChange();
    this.rafId = requestAnimationFrame(this.loop);
  }

  destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleBlur);
    this.canvas.removeEventListener('click', this.handleCanvasClick);
  }
}
