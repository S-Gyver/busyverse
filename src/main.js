import { EMOTE_BUTTONS, DEFAULT_GUIDE_HTML } from './config/officeZones.js';
import { VirtualOfficeEngine } from './engine/VirtualOfficeEngine.js';
import { drawModularAvatar, drawBaseBodyCard } from './engine/modularAvatarRenderer.js';

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
const charNameInput = document.getElementById('charNameInput');
const costumeTabsEl = document.getElementById('costumeTabs');
const costumeGridEl = document.getElementById('costumeGrid');
const costumeCategoryLabel = document.getElementById('costumeCategoryLabel');
const previewCanvas = document.getElementById('creatorPreviewCanvas');
const previewCtx = previewCanvas.getContext('2d');
const btnCreateConfirm = document.getElementById('btnCreateConfirm');
const btnSpawnFriend = document.getElementById('btnSpawnFriend');
const btnRandomize = document.getElementById('btnRandomize');

// Step 1 State: เลือกเพศ (male / female) และทิศทางการหัน (down=หน้า, left=ซ้าย, right=ขวา, up=หลัง)
const draftAvatar = {
  mode: 'modular',
  gender: 'male',
  facing: 'down'
};

let previewPose = 'idle';

const GENDER_OPTIONS = [
  {
    gender: 'male',
    label: 'เพศชาย (Male)',
    profession: 'Male Character',
    race: 'Human (ชาย)',
    desc: 'หุ่นมาตรฐานเพศชาย สามารถกดเลือกหันหน้า หันซ้าย หันขวา และหันหลังได้จากตารางฝั่งขวา',
    stats: { str: 85, int: 75, agg: 80, dex: 75, hp: 90 }
  },
  {
    gender: 'female',
    label: 'เพศหญิง (Female)',
    profession: 'Female Character',
    race: 'Human (หญิง)',
    desc: 'หุ่นมาตรฐานเพศหญิง สามารถกดเลือกหันหน้า หันซ้าย หันขวา และหันหลังได้จากตารางฝั่งขวา',
    stats: { str: 65, int: 90, agg: 60, dex: 90, hp: 85 }
  }
];

const FACING_DIRECTIONS = [
  { dir: 'down',  label: 'หันหน้า (Front)' },
  { dir: 'left',  label: 'หันซ้าย (Left)' },
  { dir: 'right', label: 'หันขวา (Right)' },
  { dir: 'up',    label: 'หันหลัง (Back)' }
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
    renderGenderLeftPanel();
    renderDirectionRightPanel();
  }
});

engine.npcs = [];
engine.setCreatorOpen(true);

if (btnRandomize) btnRandomize.style.display = 'none';

costumeTabsEl.innerHTML = `
  <button class="costume-tab active" data-cat="direction" style="grid-column: span 6;">
    หมุนดูมุมหุ่นตัวละคร (หันหน้า / หันซ้าย / หันขวา / หันหลัง)
  </button>
`;

function renderGenderLeftPanel() {
  presetGridEl.innerHTML = GENDER_OPTIONS.map(opt => {
    const isActive = draftAvatar.gender === opt.gender;
    return `
      <div class="preset-card${isActive ? ' active' : ''}" data-gender="${opt.gender}">
        <canvas width="128" height="125" id="gender_card_${opt.gender}"></canvas>
        <div class="preset-card-name">${opt.label}</div>
      </div>
    `;
  }).join('');

  GENDER_OPTIONS.forEach(opt => {
    const c = document.getElementById(`gender_card_${opt.gender}`);
    drawBaseBodyCard(c, opt.gender, 'down', engine.sheets);
  });
}

function renderDirectionRightPanel() {
  const genderTitle = draftAvatar.gender === 'male' ? 'เพศชาย' : 'เพศหญิง';
  costumeCategoryLabel.textContent = `${genderTitle} (4 ทิศทาง)`;

  costumeGridEl.innerHTML = FACING_DIRECTIONS.map(f => {
    const isSelected = draftAvatar.facing === f.dir;
    return `
      <div class="costume-item-card${isSelected ? ' active' : ''}" data-dir="${f.dir}">
        <canvas width="145" height="155" id="dir_thumb_${f.dir}"></canvas>
        <div class="costume-item-label">${f.label}</div>
      </div>
    `;
  }).join('');

  FACING_DIRECTIONS.forEach(f => {
    const c = document.getElementById(`dir_thumb_${f.dir}`);
    drawBaseBodyCard(c, draftAvatar.gender, f.dir, engine.sheets);
  });
}

function selectGender(gender) {
  const opt = GENDER_OPTIONS.find(g => g.gender === gender) || GENDER_OPTIONS[0];
  draftAvatar.gender = opt.gender;

  const loreEl = document.getElementById('loreDesc');
  if (loreEl) loreEl.textContent = opt.desc;

  renderGenderLeftPanel();
  renderDirectionRightPanel();
}

// คลิกเลือกเพศ ชาย / หญิง ฝั่งซ้าย
presetGridEl.addEventListener('click', e => {
  const card = e.target.closest('.preset-card');
  if (card && card.dataset.gender) {
    selectGender(card.dataset.gender);
  }
});

// คลิกเลือกทิศทาง (หันหน้า / หันซ้าย / หันขวา / หันหลัง) ฝั่งขวา
costumeGridEl.addEventListener('click', e => {
  const card = e.target.closest('.costume-item-card');
  if (!card || !card.dataset.dir) return;
  draftAvatar.facing = card.dataset.dir;
  renderDirectionRightPanel();
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
  renderGenderLeftPanel();
  renderDirectionRightPanel();
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
      ? `เพื่อน #${friendNum}`
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

    const cx = previewCanvas.width / 2;
    const cy = 435;

    previewCtx.save();
    previewCtx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    previewCtx.beginPath();
    previewCtx.ellipse(cx, cy + 36, 136, 30, 0, 0, Math.PI * 2);
    previewCtx.fill();

    const gradSide = previewCtx.createLinearGradient(cx - 120, cy, cx + 120, cy + 40);
    gradSide.addColorStop(0, '#a16207');
    gradSide.addColorStop(0.5, '#eab308');
    gradSide.addColorStop(1, '#713f12');
    previewCtx.fillStyle = gradSide;
    previewCtx.beginPath();
    previewCtx.ellipse(cx, cy + 24, 118, 28, 0, 0, Math.PI);
    previewCtx.rect(cx - 118, cy - 6, 236, 30);
    previewCtx.fill();

    const gradTop = previewCtx.createRadialGradient(cx, cy - 6, 14, cx, cy - 6, 118);
    gradTop.addColorStop(0, '#fef08a');
    gradTop.addColorStop(1, '#ca8a04');
    previewCtx.fillStyle = gradTop;
    previewCtx.strokeStyle = '#fef9c3';
    previewCtx.lineWidth = 2.5;
    previewCtx.beginPath();
    previewCtx.ellipse(cx, cy - 6, 118, 28, 0, 0, Math.PI * 2);
    previewCtx.fill();
    previewCtx.stroke();
    previewCtx.restore();

    // วาดหุ่นขนาดใหญ่สมดุลกับหน้าจอ Full Screen
    previewCtx.save();
    previewCtx.translate(cx, cy - 12);
    drawModularAvatar(previewCtx, draftAvatar, engine.sheets, time, {
      isMoving: previewPose !== 'idle',
      isRunning: previewPose === 'run',
      action: 'idle',
      facing: draftAvatar.facing,
      scale: 1.08
    });
    previewCtx.restore();
  }
  requestAnimationFrame(renderCreatorPreview);
}

selectGender('male');
engine.start();
requestAnimationFrame(renderCreatorPreview);
