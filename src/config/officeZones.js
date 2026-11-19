// โซนกิจกรรมในออฟฟิศ
export const ZONES = [
  { name: 'โต๊ะทำงาน Lead', x: 105, y: 150, w: 160, h: 90, action: 'sit', hint: 'กด [E] เพื่อนั่งทำงานที่โต๊ะ Lead' },
  { name: 'โต๊ะทำงาน Dev',  x: 400, y: 150, w: 160, h: 90, action: 'serious_talk', hint: 'กด [E] เพื่อเข้าโหมดคุยงานจริงจัง' },
  { name: 'โต๊ะทำงาน Design', x: 695, y: 150, w: 160, h: 90, action: 'victory', hint: 'กด [E] เพื่อฉลองงานเสร็จ (Victory)' },
  { name: 'ห้องประชุมกลาง', x: 355, y: 345, w: 250, h: 170, action: 'normal_talk', hint: 'กด [E] เพื่อเริ่มคุยประชุมงาน' },
  { name: 'มุมพักผ่อน (Nap Zone)', x: 45, y: 400, w: 175, h: 120, action: 'sleep', hint: 'กด [E] เพื่อนอนงีบพักสายตา' },
  { name: 'มุมขนม & กาแฟ (Pantry)', x: 740, y: 400, w: 175, h: 120, action: 'eat_chicken', hint: 'กด [E] เพื่อพักกินไก่ทอด/ผลไม้/ดื่มน้ำ' }
];

// รายการปุ่ม Emote สำหรับเรนเดอร์ UI (ใช้ซ้ำได้ทั้ง Vanilla JS และ React .map())
export const EMOTE_BUTTONS = [
  { action: 'idle',         keyLabel: '0', label: '🧍 ยืนปกติ' },
  { action: 'normal_talk',  keyLabel: '1', label: '💬 คุยปกติ' },
  { action: 'serious_talk', keyLabel: '2', label: '🧐 คุยจริงจัง' },
  { action: 'angry_talk',   keyLabel: '3', label: '🤬 เถียงงาน' },
  { action: 'sit',          keyLabel: '4', label: '🪑 นั่ง (3 ท่า)' },
  { action: 'eat_chicken',  keyLabel: '5', label: '🍗 กินไก่ทอด' },
  { action: 'eat_fruit',    keyLabel: '6', label: '🍎 กินผลไม้' },
  { action: 'drink_water',  keyLabel: '7', label: '🥤 ดื่มน้ำ' },
  { action: 'laugh',        keyLabel: '8', label: '😂 หัวเราะ' },
  { action: 'angry',        keyLabel: '9', label: '😡 หัวร้อน' },
  { action: 'victory',      keyLabel: 'V', label: '✌️ ชนะ/สำเร็จ' },
  { action: 'sleep',        keyLabel: 'Z', label: '💤 นอนหลับ' }
];

// ปุ่มลัดคีย์บอร์ด
export const SHORTCUT_MAP = {
  '0': 'idle',
  '1': 'normal_talk',
  '2': 'serious_talk',
  '3': 'angry_talk',
  '4': 'sit',
  '5': 'eat_chicken',
  '6': 'eat_fruit',
  '7': 'drink_water',
  '8': 'laugh',
  '9': 'angry',
  'v': 'victory',
  'z': 'sleep'
};

// แปลง e.code เป็นปุ่มมาตรฐาน (รองรับคีย์บอร์ดภาษาไทย/อังกฤษ)
export const CODE_TO_KEY = {
  KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd', KeyE: 'e',
  KeyV: 'v', KeyZ: 'z',
  ShiftLeft: 'shift', ShiftRight: 'shift',
  ArrowUp: 'arrowup', ArrowDown: 'arrowdown', ArrowLeft: 'arrowleft', ArrowRight: 'arrowright',
  Digit0: '0', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4',
  Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9',
  Numpad0: '0', Numpad1: '1', Numpad2: '2', Numpad3: '3', Numpad4: '4',
  Numpad5: '5', Numpad6: '6', Numpad7: '7', Numpad8: '8', Numpad9: '9'
};

export const FACING_LABELS = {
  down: 'หน้า (Front)',
  up: 'หลัง (Back)',
  left: 'ซ้าย (Left)',
  right: 'ขวา (Right)'
};

export const DEFAULT_GUIDE_HTML =
  '🎮 กด <b>W A S D</b> / <b>ลูกศร</b> หรือ <b>คลิกพื้นไม้</b> เพื่อเดิน | กด <b>Shift ค้าง</b> เพื่อวิ่ง 🏃 | กด <b>E</b> โต้ตอบจุดใกล้ตัว | กด <b>เลข 0-9, V, Z</b> เปลี่ยนท่า';
