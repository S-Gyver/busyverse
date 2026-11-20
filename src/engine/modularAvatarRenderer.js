import { BODY_FILE_MAP, HAIR_4WAY_STYLES } from '../config/avatarItemsConfig.js';

/**
 * วาดหุ่นตัวละครพื้นฐาน 4 ทิศทาง + ทรงผม 4 ทิศทาง (Local 100%)
 */
export function drawModularAvatar(ctx, avatar, sheets, time, state = {}) {
  const isMoving = Boolean(state.isMoving);
  const isRunning = Boolean(state.isRunning);
  const facing = state.facing || avatar.facing || 'down';
  const renderScale = state.scale || 0.255;
  const gender = avatar.gender === 'female' ? 'female' : 'male';

  const genderMap = BODY_FILE_MAP[gender] || BODY_FILE_MAP.male;
  const sheetKey = genderMap[facing] || genderMap.down;
  const img = sheets[sheetKey];

  if (!(img && img.complete && img.naturalWidth > 0)) return false;

  let bobY = 0;
  let tiltAngle = 0;
  if (isMoving) {
    const freq = isRunning ? 0.022 : 0.014;
    const amp = isRunning ? 12 : 7;
    bobY = -Math.abs(Math.sin(time * freq)) * amp;
    tiltAngle = Math.sin(time * freq) * (isRunning ? 0.08 : 0.04);
  } else {
    bobY = Math.sin(time * 0.004) * 2;
  }

  ctx.save();
  ctx.scale(renderScale, renderScale);
  ctx.translate(0, bobY);
  ctx.rotate(tiltAngle);

  const targetH = 340;
  const targetW = (img.naturalWidth / img.naturalHeight) * targetH;
  const footY = 12;

  // 1. วาดหุ่น Base Body
  ctx.drawImage(img, -targetW / 2, footY - targetH, targetW, targetH);

  // 2. วาดทรงผม 4 ทิศทาง (ถ้าเลือกทรงผมไว้)
  const hairStyleKey = avatar.hairStyle;
  if (hairStyleKey && hairStyleKey !== 'none') {
    const hairStyle = HAIR_4WAY_STYLES[hairStyleKey];
    if (hairStyle) {
      const hairSheetKey = hairStyle.sheets[facing] || hairStyle.sheets.down;
      const hairImg = sheets[hairSheetKey];
      if (hairImg && hairImg.complete && hairImg.naturalWidth > 0) {
        const cfg = (hairStyle.offsets && hairStyle.offsets[facing]) || { w: 184, ox: 0, oy: -24 };
        const hw = cfg.w;
        const hh = (hairImg.naturalHeight / hairImg.naturalWidth) * hw;
        ctx.drawImage(
          hairImg,
          -hw / 2 + cfg.ox,
          footY - targetH + cfg.oy,
          hw,
          hh
        );
      }
    }
  }

  ctx.restore();
  return true;
}

/**
 * วาดรูปพรีวิวหุ่น (พร้อมทรงผมถ้ามี) ลงในการ์ดเลือกเพศ / การ์ด 4 ทิศทาง
 */
export function drawBaseBodyCard(canvas, gender, facingDir, sheets, avatar = null) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const genderMap = BODY_FILE_MAP[gender] || BODY_FILE_MAP.male;
  const sheetKey = genderMap[facingDir] || genderMap.down;
  const img = sheets[sheetKey];
  if (!(img && img.complete && img.naturalWidth > 0)) return;

  ctx.save();
  ctx.translate(w / 2, h - 8);
  drawModularAvatar(
    ctx,
    {
      gender,
      facing: facingDir,
      hairStyle: avatar ? avatar.hairStyle : 'none'
    },
    sheets,
    0,
    { facing: facingDir, scale: Math.min(w, h) / 390, isMoving: false }
  );
  ctx.restore();
}
