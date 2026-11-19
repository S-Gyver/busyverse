import { ANIMATIONS } from '../config/spritesConfig.js';
import { drawModularAvatar } from './modularAvatarRenderer.js';

// วาดฉากออฟฟิศทั้งหมดบน Canvas
export function drawOffice(ctx, canvas, activeZone) {
  // พื้นไม้
  ctx.fillStyle = '#b88655';
  ctx.fillRect(0, 80, canvas.width, canvas.height - 80);
  ctx.strokeStyle = '#7c532c';
  ctx.lineWidth = 1.5;
  for (let row = 0; row < 22; row++) {
    const y = 80 + row * 26;
    const offset = (row % 2) * 40;
    for (let col = -1; col < 14; col++) {
      ctx.strokeRect(col * 80 + offset, y, 80, 26);
    }
  }

  // ผนังและป้าย TEAM 3P
  ctx.fillStyle = '#1b2232';
  ctx.fillRect(0, 0, canvas.width, 80);
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(390, 12, 180, 56);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 26px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('TEAM 3P', 480, 49);

  // โต๊ะทำงาน 3 โต๊ะ
  const deskNames = ['Lead Desk', 'Dev Desk', 'Design Desk'];
  [105, 400, 695].forEach((dx, idx) => {
    ctx.fillStyle = '#d6b485';
    ctx.fillRect(dx, 150, 160, 56);
    ctx.strokeStyle = '#45270c';
    ctx.strokeRect(dx, 150, 160, 56);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(dx + 30, 138, 44, 30);
    ctx.fillRect(dx + 86, 138, 44, 30);
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = 'bold 11px Tahoma';
    ctx.fillText(deskNames[idx], dx + 80, 192);
  });

  // โซนงีบหลับ (Nap Zone)
  ctx.fillStyle = 'rgba(49, 46, 129, 0.78)';
  ctx.fillRect(45, 400, 175, 120);
  ctx.strokeStyle = '#818cf8';
  ctx.strokeRect(45, 400, 175, 120);
  ctx.fillStyle = '#c7d2fe';
  ctx.font = 'bold 12px Tahoma';
  ctx.fillText('💤 Nap Zone (โซนงีบ)', 132, 425);
  ctx.fillStyle = '#4338ca';
  ctx.fillRect(70, 445, 125, 52);

  // โต๊ะประชุมกลาง (Meeting Table)
  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.fillRect(355, 345, 250, 170);
  ctx.strokeStyle = '#64748b';
  ctx.strokeRect(355, 345, 250, 170);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(410, 397, 140, 56);
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 12px Tahoma';
  ctx.fillText('💬 Meeting Table', 480, 429);

  // โซนของกิน (Pantry)
  ctx.fillStyle = 'rgba(124, 45, 18, 0.78)';
  ctx.fillRect(740, 400, 175, 120);
  ctx.strokeStyle = '#fb923c';
  ctx.strokeRect(740, 400, 175, 120);
  ctx.fillStyle = '#fed7aa';
  ctx.font = 'bold 12px Tahoma';
  ctx.fillText('🍗 Pantry (โซนของกิน)', 827, 425);
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(770, 445, 115, 50);

  // กรอบไฮไลต์เมื่อตัวละครอยู่ในโซน
  if (activeZone) {
    ctx.save();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(activeZone.x - 4, activeZone.y - 4, activeZone.w + 8, activeZone.h + 8);
    ctx.restore();
  }
}

// วาดตัวละคร (รองรับทั้งโหมด Modular Custom Avatar และโหมด Classic 15-Sheet)
export function drawPlayer(ctx, charObj, sheets, time, isMainPlayer = true) {
  ctx.save();
  ctx.translate(charObj.x, charObj.y);

  // เงาใต้เท้า
  if (charObj.action !== 'sleep' || (charObj.avatar && charObj.avatar.mode === 'modular')) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.36)';
    ctx.beginPath();
    ctx.ellipse(0, 5, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const useModular = true; // ใช้โมเดลตัวละคร Local แบบ Modular 100%

  if (useModular) {
    const avatarConfig = charObj.avatar || {
      mode: 'modular',
      gender: 'male',
      facing: charObj.facing,
      hairStyle: 'none'
    };
    drawModularAvatar(ctx, avatarConfig, sheets, time, {
      isMoving: charObj.isMoving,
      isRunning: charObj.isRunning,
      action: charObj.action,
      facing: charObj.facing,
      scale: 0.275
    });
  } else {
    let animKey = 'idle_down';
    if (charObj.isMoving) {
      animKey = (charObj.isRunning ? 'run_' : 'walk_') + charObj.facing;
    } else if (charObj.action !== 'idle') {
      animKey = charObj.action;
    } else {
      animKey = 'idle_' + charObj.facing;
    }

    let anim = ANIMATIONS[animKey] || ANIMATIONS.idle_down;
    let sheet = sheets[anim.sheet];

    if (!(sheet && sheet.complete && sheet.naturalWidth > 0)) {
      anim = ANIMATIONS['idle_' + charObj.facing] || ANIMATIONS.idle_down;
      sheet = sheets[anim.sheet];
    }

    const scale = anim.scale || 0.25;
    const elapsed = Math.max(0, time - (charObj.actionStartTime || 0));

    let frameIdx = 0;
    if (animKey === 'sit') {
      frameIdx = (charObj.sitVariant || 0) % anim.frames.length;
    } else if (animKey === 'sleep') {
      const step = Math.floor((elapsed / 1000) * anim.fps);
      frameIdx = step < 3 ? step : (3 + ((step - 3) % 2));
    } else if (anim.fps > 0 && anim.frames.length > 1) {
      const baseTime = charObj.isMoving ? time : elapsed;
      frameIdx = Math.floor((baseTime / 1000) * anim.fps) % anim.frames.length;
    }
    const frame = anim.frames[frameIdx] || anim.frames[0];

    if (sheet && sheet.complete && sheet.naturalWidth > 0) {
      const drawW = frame.w * scale;
      const drawH = frame.h * scale;
      const ox = (frame.ox || 0) * scale;

      ctx.save();
      if (anim.flipX) {
        ctx.scale(-1, 1);
      }
      ctx.drawImage(
        sheet,
        frame.x, frame.y, frame.w, frame.h,
        -drawW / 2 + ox, -drawH + 10, drawW, drawH
      );
      ctx.restore();
    }
  }

  ctx.restore();

  // ป้ายชื่อเหนือหัว
  ctx.save();
  ctx.font = 'bold 12.5px Tahoma';
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3.5;
  const labelY = charObj.y - 88;
  ctx.strokeText(charObj.name, charObj.x, labelY);
  ctx.fillStyle = isMainPlayer ? '#fef08a' : '#7dd3fc';
  ctx.fillText(charObj.name, charObj.x, labelY);
  ctx.restore();
}
