import {
  BODY_FILE_MAP,
  WALK_BODY_MAP,
  RO_HEAD_OFFSETS,
  RO_HAIR_OFFSETS,
  RO_HEAD_BASE_H,
  RO_WALK_HEAD_OFFSETS
} from '../config/avatarItemsConfig.js';

/**
 * ดึง Offset ของทรงผม (ถ้ามีตั้งเฉพาะทรงใน RO_HAIR_OFFSETS จะใช้ค่านั้นก่อน ถ้าไม่มีจะใช้ RO_HEAD_OFFSETS)
 */
export function getHairOffset(hairId, facing) {
  if (RO_HAIR_OFFSETS && RO_HAIR_OFFSETS[hairId] && RO_HAIR_OFFSETS[hairId][facing]) {
    return RO_HAIR_OFFSETS[hairId][facing];
  }
  return (RO_HEAD_OFFSETS && RO_HEAD_OFFSETS[facing]) || { x: 0, y: 0 };
}

/**
 * ดึงหรือโหลด Sprite ของทรงผม RO 1_male ถึง 30_male ใน 8 ทิศทาง
 */
export function getHairSheet(sheets, hairId = 1, facing = 'down') {
  const safeId = hairId || 1;
  const key = `ro_hair_${safeId}_${facing}`;
  if (sheets[key] && sheets[key].complete && sheets[key].naturalWidth > 0) {
    return sheets[key];
  }
  if (!sheets[key]) {
    const img = new Image();
    img.src = `./assets/body/male/hair/${safeId}_male/hair_${facing}.png`;
    sheets[key] = img;
  }
  if (sheets[key].complete && sheets[key].naturalWidth > 0) {
    return sheets[key];
  }
  return sheets[`ro_hair_${facing}`];
}

/**
 * วาดตัวละคร RO Novice 8 ทิศทาง ตัวหุ่น + ทรงผม
 */
export function drawModularAvatar(ctx, avatar, sheets, time, state = {}) {
  const isMoving = Boolean(state.isMoving);
  const isRunning = Boolean(state.isRunning);
  const facing = state.facing || avatar.facing || 'down';
  const renderScale = state.scale || 0.255;

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.scale(renderScale, renderScale);

  const bodyKey = (BODY_FILE_MAP.ro_novice && BODY_FILE_MAP.ro_novice[facing]) || 'ro_body_down';
  let bImg = sheets[bodyKey];
  const hairId = avatar.hair || 1;
  const hImg = getHairSheet(sheets, hairId, facing);

  // ตรวจสอบและดึงภาพแอนิเมชันเดิน (Walk Frames) หากตัวละครกำลังเคลื่อนไหว
  const walkFrames = WALK_BODY_MAP?.ro_novice?.[facing];
  let hasWalkAnim = false;
  let frameIdx = 0;
  if (isMoving && walkFrames && walkFrames.length > 0) {
    const frameDuration = isRunning ? 75 : 115;
    frameIdx = Math.floor((time / frameDuration) % walkFrames.length);
    const walkKey = walkFrames[frameIdx];
    if (sheets[walkKey] && sheets[walkKey].complete && sheets[walkKey].naturalWidth > 0) {
      bImg = sheets[walkKey];
      hasWalkAnim = true;
    }
  }

  if (!(bImg && bImg.complete && bImg.naturalWidth > 0)) {
    ctx.restore();
    return false;
  }

  let bobY = 0;
  // ใช้ sine bobbing เฉพาะทิศทางที่ยังไม่มีภาพสไปรต์เดินแบบแยกเฟรม
  if (isMoving && !hasWalkAnim) {
    const freq = isRunning ? 0.022 : 0.014;
    const amp = isRunning ? 10 : 6;
    bobY = -Math.abs(Math.sin(time * freq)) * amp;
  }
  if (bobY !== 0) {
    ctx.translate(0, bobY);
  }

  const pixelScale = 3.6;
  const overlap = 5;
  const footY = 12;

  const bodyW = bImg.naturalWidth * pixelScale;
  const bodyH = bImg.naturalHeight * pixelScale;
  const bodyX = -bodyW / 2;
  const bodyY = footY - bodyH;

  // 1. วาดตัวหุ่น
  ctx.drawImage(bImg, bodyX, bodyY, bodyW, bodyH);

  // 2. วาดทรงผมซ้อนทับลงบนหัว
  // ใช้ baseHeadH เพื่อล็อกตำแหน่งกะโหลกศีรษะ/ตา ทรงผมยาว (หางม้า) จะห้อยลงมาพาดหลังธรรมชาติ ไม่ดันหัวลอย
  if (hImg && hImg.complete && hImg.naturalWidth > 0) {
    const offset = getHairOffset(hairId, facing);
    const walkOffset = (hasWalkAnim && RO_WALK_HEAD_OFFSETS?.[facing]?.[frameIdx]) || { x: 0, y: 0 };
    const baseHeadH = ((RO_HEAD_BASE_H && RO_HEAD_BASE_H[facing]) || 26) * pixelScale;
    const hairW = hImg.naturalWidth * pixelScale;
    const hairH = hImg.naturalHeight * pixelScale;
    const hairX = -hairW / 2 + ((offset.x + walkOffset.x) * pixelScale);
    const hairY = bodyY - baseHeadH + ((overlap + offset.y + walkOffset.y) * pixelScale);
    ctx.drawImage(hImg, hairX, hairY, hairW, hairH);
  }

  ctx.restore();
  return true;
}

/**
 * วาดรูปพรีวิวหุ่นลงในการ์ดเลือกตัวละคร / การ์ดหันทิศทาง 8 ทิศ
 */
export function drawBaseBodyCard(canvas, character, facingDir = 'down', sheets, hairId = 1) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = false;

  const bodyKey = (BODY_FILE_MAP.ro_novice && BODY_FILE_MAP.ro_novice[facingDir]) || 'ro_body_down';
  const bImg = sheets[bodyKey];
  const hImg = getHairSheet(sheets, hairId, facingDir);

  if (!(bImg && bImg.complete && bImg.naturalWidth > 0)) {
    if (bImg) bImg.onload = () => drawBaseBodyCard(canvas, character, facingDir, sheets, hairId);
    return;
  }

  const overlap = 5;
  const baseH = (RO_HEAD_BASE_H && RO_HEAD_BASE_H[facingDir]) || 26;
  const totalH = bImg.naturalHeight + baseH - overlap;
  const maxW = Math.max(bImg.naturalWidth, hImg && hImg.naturalWidth ? hImg.naturalWidth : 0);

  const pad = 8;
  const scale = Math.min((w - pad * 2) / maxW, (h - pad * 2) / totalH);

  const dw = bImg.naturalWidth * scale;
  const dh = bImg.naturalHeight * scale;
  const startX = (w - dw) / 2;
  const startY = (h - totalH * scale) / 2;

  const bodyY = startY + (totalH - bImg.naturalHeight) * scale;
  ctx.drawImage(bImg, startX, bodyY, dw, dh);

  if (hImg && hImg.complete && hImg.naturalWidth > 0) {
    const offset = getHairOffset(hairId, facingDir);
    const baseHeadH = baseH * scale;
    const hw = hImg.naturalWidth * scale;
    const hh = hImg.naturalHeight * scale;
    const hx = (w - hw) / 2 + (offset.x * scale);
    const hy = bodyY - baseHeadH + ((overlap + offset.y) * scale);
    ctx.drawImage(hImg, hx, hy, hw, hh);
  }
}

/**
 * วาดรูปพรีวิวเฉพาะทรงผมลงในการ์ดเลือกทรงผม 1_male ถึง 30_male
 */
export function drawHairThumbCard(canvas, hairId, sheets) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = false;

  const hImg = getHairSheet(sheets, hairId, 'down');
  if (!(hImg && hImg.complete && hImg.naturalWidth > 0)) {
    if (hImg) hImg.onload = () => drawHairThumbCard(canvas, hairId, sheets);
    return;
  }

  const pad = 10;
  const scale = Math.min((w - pad * 2) / hImg.naturalWidth, (h - pad * 2) / hImg.naturalHeight);
  const dw = hImg.naturalWidth * scale;
  const dh = hImg.naturalHeight * scale;

  ctx.drawImage(hImg, (w - dw) / 2, (h - dh) / 2, dw, dh);
}
