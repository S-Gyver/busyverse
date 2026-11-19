import React, { useEffect, useRef, useState } from 'react';
import { EMOTE_BUTTONS } from '../config/officeZones.js';
import { VirtualOfficeEngine } from '../engine/VirtualOfficeEngine.js';
import '../styles/office.css';

export default function VirtualOffice() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  const [uiState, setUiState] = useState({
    action: 'idle',
    statusText: 'กำลังโหลดชุดภาพ (0/14)...',
    dotColor: '#22c55e',
    facing: 'down',
    facingText: 'หน้า (Front)',
    currentZone: null
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new VirtualOfficeEngine(canvasRef.current, {
      onStateChange: nextState => setUiState(nextState)
    });

    engineRef.current = engine;
    engine.start();

    // Cleanup เมื่อ Component Unmount (รองรับ React 18/19 StrictMode ไม่ให้ Loop ซ้อน)
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  const handleActionClick = actionKey => {
    if (engineRef.current) {
      engineRef.current.setAction(actionKey);
    }
  };

  return (
    <div className="office-frame">
      <canvas
        ref={canvasRef}
        className="office-canvas"
        width={960}
        height={640}
      />

      <div className="top-hud">
        <div className="status-badge">
          <span
            className="status-dot"
            style={{
              background: uiState.dotColor,
              boxShadow: `0 0 8px ${uiState.dotColor}`
            }}
          />
          <span>
            สถานะ: <b>{uiState.statusText}</b>
          </span>
        </div>
        <div className="status-badge">
          <span>
            ทิศทาง: <b>{uiState.facingText}</b>
          </span>
        </div>
      </div>

      <div className="hud-bottom">
        <div className="guide-text">
          {uiState.currentZone ? (
            <>
              📍 คุณอยู่ในโซน <b>{uiState.currentZone.name}</b> —{' '}
              <b>{uiState.currentZone.hint}</b> หรือกดปุ่มท่าทางด้านล่าง
            </>
          ) : (
            <>
              🎮 กด <b>W A S D</b> / <b>ลูกศร</b> หรือ <b>คลิกพื้นไม้</b> เพื่อเดิน 4 ทิศทาง | กด{' '}
              <b>E</b> โต้ตอบกับจุดใกล้ตัว | กดปุ่มหรือ <b>เลข 0-9, V, Z</b> เพื่อเปลี่ยนท่าทาง
            </>
          )}
        </div>

        <div className="emote-bar">
          {EMOTE_BUTTONS.map(btn => (
            <button
              key={btn.action}
              type="button"
              className={`emote-btn${uiState.action === btn.action ? ' active' : ''}`}
              onClick={() => handleActionClick(btn.action)}
            >
              <kbd>{btn.keyLabel}</kbd> {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
