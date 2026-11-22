import { EMOTE_BUTTONS, DEFAULT_GUIDE_HTML } from './config/officeZones.js';
import { VirtualOfficeEngine } from './engine/VirtualOfficeEngine.js';
import { drawModularAvatar, drawBaseBodyCard, drawHairThumbCard } from './engine/modularAvatarRenderer.js';

const canvas = document.getElementById('officeCanvas');
const statusDotEl = document.getElementById('statusDot');
const statusTextEl = document.getElementById('statusText');
const facingTextEl = document.getElementById('facingText');
const zoneHintEl = document.getElementById('zoneHint');
const emoteBarEl = document.getElementById('emoteBar');

// อ้างอิง DOM ของหน้าจอสร้างตัวละคร
const creatorOverlayEl = document.getElementById('creatorOverlay');
const btnOpenCreator = document.getElementById('btnOpenCreator');
const btnCloseCreator = document.getElementById('btnCloseCreator');
const presetGridEl = document.getElementById('presetGrid');
const hairGridEl = document.getElementById('hairGrid');
const hairSelectLabel = document.getElementById('hairSelectLabel');
const charNameInput = document.getElementById('charNameInput');
const costumeGridEl = document.getElementById('costumeGrid');
const costumeCategoryLabel = document.getElementById('costumeCategoryLabel');
const previewCanvas = document.getElementById('creatorPreviewCanvas');
const previewCtx = previewCanvas.getContext('2d');
const btnCreateConfirm = document.getElementById('btnCreateConfirm');
const btnSpawnFriend = document.getElementById('btnSpawnFriend');

// สถานะการเลือกตัวละคร (ตั้งค่าเริ่มต้นเป็น RO Novice Male 8 ทิศ + ผมทรงที่ 1)
const draftAvatar = {
  mode: 'modular',
  character: 'ro_novice',
  isRO: true,
  gender: 'male',
  hair: 1,
  facing: 'down'
};

let previewPose = 'idle';

const CHARACTER_OPTIONS = [
  {
    id: 'ro_novice',
    character: 'ro_novice',
    isRO: true,
    gender: 'male',
    label: 'RO Novice (8 ทิศ)',
    profession: 'Novice (ชาย)',
    race: 'Ragnarok Online',
    desc: 'ตัวละคร Novice ชาย จาก Ragnarok Online รองรับการหันครบ 8 ทิศทาง พร้อมทรงผม 30 แบบ',
    stats: { str: 90, int: 80, agg: 85, dex: 85, hp: 95 }
  }
];

const RO_FACING_DIRECTIONS = [
  { dir: 'down',        label: 'หน้าตรง (S 0)' },
  { dir: 'front_left',  label: 'หน้าซ้าย (SW 1)' },
  { dir: 'left',        label: 'หันซ้าย (W 2)' },
  { dir: 'back_left',   label: 'หลังซ้าย (NW 3)' },
  { dir: 'up',          label: 'หลังตรง (N 4)' },
  { dir: 'back_right',  label: 'หลังขวา (NE 5)' },
  { dir: 'right',       label: 'หันขวา (E 6)' },
  { dir: 'front_right', label: 'หน้าขวา (SE 7)' }
];

emoteBarEl.innerHTML = EMOTE_BUTTONS.map(
  btn =>
    `<button class="emote-btn${btn.action === 'idle' ? ' active' : ''}" data-action="${btn.action}">
      <kbd>${btn.keyLabel}</kbd> ${btn.label}
    </button>`
).join('');

const engine = new VirtualOfficeEngine(canvas, {
  onStateChange(state) {
    statusTextEl.textContent = state.statusText;
    statusDotEl.style.background = state.dotColor;
    statusDotEl.style.boxShadow = `0 0 8px ${state.dotColor}`;
    facingTextEl.textContent = state.facingText;

    emoteBarEl.querySelectorAll('.emote-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.action === state.action);
    });

    if (state.currentZone) {
      zoneHintEl.innerHTML = `📍 คุณอยู่ในโซน <b>${state.currentZone.name}</b> — <b>${state.currentZone.hint}</b> หรือกดปุ่มท่าทางด้านล่าง`;
    } else {
      zoneHintEl.innerHTML = DEFAULT_GUIDE_HTML;
    }
  },
  onSheetsProgress() {
    renderCharacterLeftPanel();
    renderHairLeftPanel();
    renderRightPanel();
  }
});

// เริ่มต้นเปิดหน้าสร้างตัวละคร
engine.npcs = [];
engine.setCreatorOpen(true);

function renderCharacterLeftPanel() {
  presetGridEl.innerHTML = CHARACTER_OPTIONS.map(opt => {
    const isActive =
      draftAvatar.character === opt.character &&
      Boolean(draftAvatar.isRO) === Boolean(opt.isRO);
    return `
      <div class="preset-card${isActive ? ' active' : ''}" data-char-id="${opt.id}">
        <canvas width="128" height="125" id="char_card_${opt.id}"></canvas>
        <div class="preset-card-name">${opt.label}</div>
      </div>
    `;
  }).join('');

  CHARACTER_OPTIONS.forEach(opt => {
    const c = document.getElementById(`char_card_${opt.id}`);
    drawBaseBodyCard(c, opt.character, 'down', engine.sheets, draftAvatar.hair || 1);
  });
}

function renderHairLeftPanel() {
  if (!hairGridEl) return;
  const hairList = Array.from({ length: 30 }, (_, i) => i + 1);
  if (hairSelectLabel) {
    hairSelectLabel.textContent = `ทรงที่ ${draftAvatar.hair || 1}/30`;
  }

  hairGridEl.innerHTML = hairList.map(hId => {
    const isSelected = (draftAvatar.hair || 1) === hId;
    return `
      <div class="hair-item-card${isSelected ? ' active' : ''}" data-hair-id="${hId}">
        <canvas width="120" height="110" id="hair_left_thumb_${hId}"></canvas>
        <div class="hair-item-label">ทรงผมที่ ${hId}</div>
      </div>
    `;
  }).join('');

  hairList.forEach(hId => {
    const c = document.getElementById(`hair_left_thumb_${hId}`);
    drawHairThumbCard(c, hId, engine.sheets);
  });
}

function renderRightPanel() {
  if (costumeCategoryLabel) {
    costumeCategoryLabel.textContent = 'RO Novice ท่ายืน (8 ทิศทาง)';
  }

  costumeGridEl.innerHTML = RO_FACING_DIRECTIONS.map(f => {
    const isSelected = draftAvatar.facing === f.dir;
    return `
      <div class="costume-item-card${isSelected ? ' active' : ''}" data-dir="${f.dir}">
        <canvas width="145" height="155" id="dir_thumb_${f.dir}"></canvas>
        <div class="costume-item-label">${f.label}</div>
      </div>
    `;
  }).join('');

  RO_FACING_DIRECTIONS.forEach(f => {
    const c = document.getElementById(`dir_thumb_${f.dir}`);
    drawBaseBodyCard(c, draftAvatar.character, f.dir, engine.sheets, draftAvatar.hair || 1);
  });
}

function selectCharacter(charId) {
  const opt = CHARACTER_OPTIONS.find(c => c.id === charId) || CHARACTER_OPTIONS[0];
  draftAvatar.character = opt.character;
  draftAvatar.gender = opt.gender;
  draftAvatar.isRO = Boolean(opt.isRO);

  const loreEl = document.getElementById('loreDesc');
  if (loreEl) loreEl.textContent = opt.desc;

  renderCharacterLeftPanel();
  renderHairLeftPanel();
  renderRightPanel();
}

presetGridEl.addEventListener('click', e => {
  const card = e.target.closest('.preset-card');
  if (card && card.dataset.charId) {
    selectCharacter(card.dataset.charId);
  }
});

// คลิกเลือกทรงผมที่อยู่ฝั่งซ้าย (ใต้เลือกตัวละคร)
if (hairGridEl) {
  hairGridEl.addEventListener('click', e => {
    const hairCard = e.target.closest('.hair-item-card[data-hair-id]');
    if (hairCard) {
      draftAvatar.hair = Number(hairCard.dataset.hairId);
      renderHairLeftPanel();
      renderCharacterLeftPanel();
      renderRightPanel();
    }
  });
}

// คลิกเลือกทิศทางที่อยู่ฝั่งขวา
costumeGridEl.addEventListener('click', e => {
  const dirCard = e.target.closest('.costume-item-card[data-dir]');
  if (dirCard) {
    draftAvatar.facing = dirCard.dataset.dir;
    renderRightPanel();
  }
});

document.querySelectorAll('.preview-ctrl-btn[data-pose]').forEach(btn => {
  btn.addEventListener('click', () => {
    previewPose = btn.dataset.pose;
    document.querySelectorAll('.preview-ctrl-btn[data-pose]').forEach(b => {
      b.classList.toggle('active', b.dataset.pose === previewPose);
    });
  });
});

function closeCreator() {
  creatorOverlayEl.classList.add('hidden');
  engine.setCreatorOpen(false);
}

function openCreator() {
  creatorOverlayEl.classList.remove('hidden');
  engine.setCreatorOpen(true);
  renderCharacterLeftPanel();
  renderHairLeftPanel();
  renderRightPanel();
  updateCreatorScale();
}

btnOpenCreator.addEventListener('click', openCreator);
btnCloseCreator.addEventListener('click', closeCreator);

btnCreateConfirm.addEventListener('click', () => {
  engine.applyCharacter(charNameInput.value, draftAvatar);
  engine.me.facing = draftAvatar.facing;
  closeCreator();
});

btnSpawnFriend.addEventListener('click', () => {
  const friendNum = engine.npcs.length + 1;
  const customName =
    charNameInput.value.trim() === 'คุณ (Lead)'
      ? `เพื่อน RO #${friendNum}`
      : charNameInput.value.trim();
  engine.spawnFriend(customName, draftAvatar);
  btnSpawnFriend.textContent = `✅ เพิ่มแล้ว (${engine.npcs.length + 1} คน)`;
  setTimeout(() => {
    btnSpawnFriend.textContent = '➕ เพิ่มเพื่อนในห้อง';
  }, 1400);
});

emoteBarEl.addEventListener('click', e => {
  const btn = e.target.closest('.emote-btn');
  if (btn && btn.dataset.action) {
    engine.setAction(btn.dataset.action);
  }
});

function renderCreatorPreview(time) {
  if (!creatorOverlayEl.classList.contains('hidden')) {
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    previewCtx.imageSmoothingEnabled = false;

    const cx = previewCanvas.width / 2;
    const cy = 375;
    const pedRadiusX = 84;
    const pedRadiusY = 19;
    const pedHeight = 20;

    previewCtx.save();
    previewCtx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    previewCtx.beginPath();
    previewCtx.ellipse(cx, cy + pedHeight + 4, pedRadiusX * 1.12, pedRadiusY * 1.1, 0, 0, Math.PI * 2);
    previewCtx.fill();

    const gradSide = previewCtx.createLinearGradient(cx - pedRadiusX, cy, cx + pedRadiusX, cy + pedHeight + 10);
    gradSide.addColorStop(0, '#a16207');
    gradSide.addColorStop(0.5, '#eab308');
    gradSide.addColorStop(1, '#713f12');
    previewCtx.fillStyle = gradSide;
    previewCtx.beginPath();
    previewCtx.ellipse(cx, cy + pedHeight - 6, pedRadiusX, pedRadiusY, 0, 0, Math.PI);
    previewCtx.rect(cx - pedRadiusX, cy - 6, pedRadiusX * 2, pedHeight);
    previewCtx.fill();

    const gradTop = previewCtx.createRadialGradient(cx, cy - 6, 10, cx, cy - 6, pedRadiusX);
    gradTop.addColorStop(0, '#fef08a');
    gradTop.addColorStop(1, '#ca8a04');
    previewCtx.fillStyle = gradTop;
    previewCtx.strokeStyle = '#fef9c3';
    previewCtx.lineWidth = 2;
    previewCtx.beginPath();
    previewCtx.ellipse(cx, cy - 6, pedRadiusX, pedRadiusY, 0, 0, Math.PI * 2);
    previewCtx.fill();
    previewCtx.stroke();
    previewCtx.restore();

    // วาดตัวละครขนาดกะทัดรัดบนแท่นยืน (ย่อลงให้สมส่วนพอดี)
    previewCtx.save();
    previewCtx.translate(cx, cy - 10);
    drawModularAvatar(previewCtx, draftAvatar, engine.sheets, time, {
      isMoving: previewPose !== 'idle',
      isRunning: previewPose === 'run',
      action: 'idle',
      facing: draftAvatar.facing,
      scale: 0.58
    });
    previewCtx.restore();
  }
  requestAnimationFrame(renderCreatorPreview);
}

function updateCreatorScale() {
  const stage = document.getElementById('creatorStageArea');
  const wrapper = document.getElementById('creatorBodyWrapper');
  if (!stage || !wrapper) return;

  const w = stage.clientWidth;
  const h = stage.clientHeight;

  if (w < 768) {
    wrapper.classList.add('mobile-layout');
    wrapper.style.transform = '';
  } else {
    wrapper.classList.remove('mobile-layout');
    // อัตราส่วนพื้นที่ดีไซน์หลัก 1260 x 660 px (รองรับการขยายและย่อทุกขนาดหน้าจอโดยอัตโนมัติ)
    const scaleX = (w - 12) / 1260;
    const scaleY = (h - 12) / 660;
    const scale = Math.min(scaleX, scaleY);
    wrapper.style.transform = `scale(${Math.max(0.4, scale).toFixed(3)})`;
  }
}

window.addEventListener('resize', updateCreatorScale);

selectCharacter('ro_novice');
engine.start();
updateCreatorScale();
requestAnimationFrame(renderCreatorPreview);
