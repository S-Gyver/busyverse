import { BODY_FILE_MAP } from '../config/avatarItemsConfig.js';

/**
 * Step 1: วาดหุ่นพื้นฐานจากไฟล์เดี่ยวในโฟลเดอร์ ./body/1.png .. 8.png
 * (1-4: ชาย หน้า/ขวา/ซ้าย/หลัง, 5-8: หญิง หน้า/ซ้าย/ขวา/หลัง)
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

  // ล็อกความสูงมาตรฐาน 340px แล้วคำนวณความกว้างตามสัดส่วนจริงของไฟล์นั้นๆ
  const targetH = 340;
  const targetW = (img.naturalWidth / img.naturalHeight) * targetH;
  const footY = 12;

  ctx.drawImage(
    img,
    -targetW / 2,
    footY - targetH,
    targetW,
    targetH
  );

  ctx.restore();
  return true;
}

/**
 * วาดรูปพรีวิวหุ่นลงในการ์ดเลือกเพศ / การ์ดหันทิศทาง (หันหน้า, หันซ้าย, หันขวา, หันหลัง)
 */
export function drawBaseBodyCard(canvas, gender, facingDir, sheets) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const genderMap = BODY_FILE_MAP[gender] || BODY_FILE_MAP.male;
  const sheetKey = genderMap[facingDir] || genderMap.down;
  const img = sheets[sheetKey];
  if (!(img && img.complete && img.naturalWidth > 0)) return;

  const pad = 6;
  const scale = Math.min(
    (w - pad * 2) / img.naturalWidth,
    (h - pad * 2) / img.naturalHeight
  );
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;

  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}
