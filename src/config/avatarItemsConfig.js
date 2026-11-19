// ไฟล์รูปหุ่นพื้นฐาน Local 100% (8 มุมมอง มาตรฐาน)
export const MODULAR_SHEET_FILES = {
  male_front:   './assets/characters/male/body/front.png',
  male_right:   './assets/characters/male/body/right.png',
  male_left:    './assets/characters/male/body/left.png',
  male_back:    './assets/characters/male/body/back.png',
  female_front: './assets/characters/female/body/front.png',
  female_left:  './assets/characters/female/body/left.png',
  female_right: './assets/characters/female/body/right.png',
  female_back:  './assets/characters/female/body/back.png'
};

export const HAIR_4WAY_STYLES = {};

// ตัวเลือกตัวละครหลัก (6 ช่องฝั่งซ้าย "เลือกตัวละคร")
export const CHARACTER_PRESETS = [
  {
    id: 'male_side',
    name: 'นักรบโค้ด',
    gender: 'male',
    mode: 'modular',
    bodyIndex: 1,
    profession: 'Warrior Dev',
    race: 'Human',
    desc: 'สายลุยโค้ดแนวหน้า ถนัดการแก้บั๊กระยะประชิด มีความอึดและพละกำลังในการปั่นงานสูงมาก',
    stats: { str: 85, int: 70, agg: 80, dex: 75, hp: 90 },
    defaults: { face: 0, hair: 0, top: 0, bottom: 0, glasses: 0, hat: -1 }
  },
  {
    id: 'female_side',
    name: 'จอมเวทย์ดีไซน์',
    gender: 'female',
    mode: 'modular',
    bodyIndex: 3,
    profession: 'Mage Designer',
    race: 'Human',
    desc: 'ผู้เชี่ยวชาญศาสตร์แห่งสีสันและ UX/UI เสกหน้าจอที่ซับซ้อนให้สวยงามดั่งเวทมนตร์',
    stats: { str: 55, int: 95, agg: 60, dex: 90, hp: 75 },
    defaults: { face: 0, hair: 6, top: 5, bottom: 5, glasses: -1, hat: 4 }
  },
  {
    id: 'male_front',
    name: 'หัวหน้าทีม',
    gender: 'male',
    mode: 'modular',
    bodyIndex: 1,
    profession: 'Paladin Lead',
    race: 'Human',
    desc: 'ผู้นำทีมผู้แข็งแกร่ง คอยวางแผนและปกป้องสมาชิกในทีมจากงานด่วนและเดดไลน์อันโหดร้าย',
    stats: { str: 80, int: 88, agg: 65, dex: 82, hp: 95 },
    defaults: { face: 1, hair: 2, top: 2, bottom: 0, glasses: 2, hat: 3 }
  },
  {
    id: 'female_front',
    name: 'ไอดอล PM',
    gender: 'female',
    mode: 'modular',
    bodyIndex: 3,
    profession: 'Cleric PM',
    race: 'Human',
    desc: 'สายซัพพอร์ตประจำออฟฟิศ สร้างรอยยิ้มและฮีลใจให้เพื่อนร่วมทีมยามพลังงานหมด',
    stats: { str: 50, int: 90, agg: 45, dex: 88, hp: 85 },
    defaults: { face: 3, hair: 8, top: 8, bottom: 7, glasses: 4, hat: -1 }
  },
  {
    id: 'cyber_hacker',
    name: 'แฮกเกอร์ไซเบอร์',
    gender: 'male',
    mode: 'modular',
    bodyIndex: 1,
    profession: 'Assassin Hacker',
    race: 'Cyborg',
    desc: 'ผู้เชี่ยวชาญระบบความปลอดภัยและความเร็วสูง เคลื่อนที่ไร้ร่องรอยพร้อมแว่นไซเบอร์คู่ใจ',
    stats: { str: 72, int: 96, agg: 88, dex: 98, hp: 78 },
    defaults: { face: 1, hair: 4, top: 1, bottom: 3, glasses: 3, hat: 1 }
  },
  {
    id: 'classic_lead',
    name: 'บอสต้นฉบับ',
    gender: 'male',
    mode: 'classic',
    bodyIndex: 1,
    profession: 'Grand Master',
    race: 'Legend',
    desc: 'ตัวละครต้นฉบับที่มาพร้อมชุดอนิเมชันพิเศษครบ 15 แผ่น (กินไก่ทอด เถียงงาน หัวเราะขำกลิ้ง)',
    stats: { str: 95, int: 95, agg: 90, dex: 95, hp: 100 },
    defaults: { face: 0, hair: 0, top: 0, bottom: 0, glasses: 0, hat: -1 }
  }
];

// พิกัดไฟล์หุ่นมาตรฐาน 8 ไฟล์จากโฟลเดอร์ ./assets/characters/[gender]/body/
export const BODY_FILE_MAP = {
  male: {
    down:  'male_front',
    right: 'male_right',
    left:  'male_left',
    up:    'male_back'
  },
  female: {
    down:  'female_front',
    left:  'female_left',
    right: 'female_right',
    up:    'female_back'
  }
};

// พิกัดใบหน้า 5 อารมณ์ (จากแผ่น mod_base แถวล่าง)
export const FACE_ITEMS = [
  { id: 0, name: 'ยิ้มสดใส',   x: 41,  y: 414, w: 125, h: 105 },
  { id: 1, name: 'นิ่งขรึม',    x: 243, y: 427, w: 131, h: 90 },
  { id: 2, name: 'โกรธจัด',    x: 449, y: 424, w: 127, h: 102 },
  { id: 3, name: 'หัวเราะร่า',  x: 653, y: 415, w: 129, h: 112 },
  { id: 4, name: 'ง่วงหลับ',   x: 858, y: 425, w: 130, h: 91 }
];

// พิกัดทรงผม 10 แบบ พร้อมจุดยึดโครงหน้า (fcx, chinY) เพื่อสวมลงบนหัวหุ่นได้พอดี 100% ไม่บี้และไม่บังตา
export const HAIR_ITEMS = [
  { id: 0, name: 'ผมตั้งดำ (ช)',      gender: 'male',   x: 32,  y: 27,  w: 172, h: 173, fcx: 100, chinY: 163 },
  { id: 1, name: 'รองทรงน้ำตาล (ช)',  gender: 'male',   x: 204, y: 31,  w: 204, h: 168, fcx: 126, chinY: 159 },
  { id: 2, name: 'อันเดอร์คัตทอง (ช)', gender: 'male',  x: 408, y: 35,  w: 178, h: 153, fcx: 122, chinY: 155 },
  { id: 3, name: 'ผมหยักศกดำ (ช)',    gender: 'male',   x: 627, y: 30,  w: 175, h: 169, fcx: 100, chinY: 160 },
  { id: 4, name: 'ผมซอยสีเงิน (ช)',    gender: 'male',   x: 821, y: 33,  w: 176, h: 174, fcx: 101, chinY: 157 },
  { id: 5, name: 'ผมยาวหน้าม้า (ญ)',   gender: 'female', x: 27,  y: 347, w: 170, h: 219, fcx: 108, chinY: 148 },
  { id: 6, name: 'มัดหางม้า (ญ)',      gender: 'female', x: 216, y: 333, w: 189, h: 186, fcx: 125, chinY: 162 },
  { id: 7, name: 'ผมบ๊อบติดกิ๊บ (ญ)',  gender: 'female', x: 432, y: 350, w: 180, h: 161, fcx: 97,  chinY: 145 },
  { id: 8, name: 'ทวินเทลชมพู (ญ)',    gender: 'female', x: 612, y: 354, w: 203, h: 205, fcx: 119, chinY: 141 },
  { id: 9, name: 'ลอนยาวน้ำตาล (ญ)',  gender: 'female', x: 821, y: 352, w: 180, h: 200, fcx: 106, chinY: 143 }
];

// พิกัดเสื้อ 10 แบบ (ชาย 5 / หญิง 5 จากแผ่น mod_tops)
export const TOP_ITEMS = [
  { id: 0, name: 'เสื้อเกราะกิลด์ (ช)', gender: 'male',   x: 27,  y: 41,  w: 177, h: 185 },
  { id: 1, name: 'ฮู้ดดี้สายเดฟ (ช)',   gender: 'male',   x: 204, y: 40,  w: 204, h: 181 },
  { id: 2, name: 'สูทผู้บริหาร (ช)',    gender: 'male',   x: 408, y: 44,  w: 202, h: 178 },
  { id: 3, name: 'เสื้อยืดลำลอง (ช)',   gender: 'male',   x: 642, y: 59,  w: 174, h: 153 },
  { id: 4, name: 'แจ็คเก็ตแดง (ช)',    gender: 'male',   x: 816, y: 42,  w: 190, h: 179 },
  { id: 5, name: 'ฮู้ดดี้พาสเทล (ญ)',   gender: 'female', x: 27,  y: 379, w: 177, h: 161 },
  { id: 6, name: 'เบลเซอร์ผูกโบว์ (ญ)', gender: 'female', x: 204, y: 389, w: 200, h: 145 },
  { id: 7, name: 'สเวตเตอร์ไหมพรม (ญ)', gender: 'female', x: 425, y: 382, w: 187, h: 163 },
  { id: 8, name: 'เสื้อกะลาสีโบว์แดง (ญ)', gender: 'female', x: 647, y: 395, w: 141, h: 119 },
  { id: 9, name: 'แจ็คเก็ตยีนส์ (ญ)',   gender: 'female', x: 826, y: 384, w: 176, h: 145 }
];

// พิกัดกางเกง/กระโปรง 10 แบบ (ชาย 5 / หญิง 5 จากแผ่น mod_bottoms)
export const BOTTOM_ITEMS = [
  { id: 0, name: 'สแล็คกรมท่า (ช)',   gender: 'male',   x: 59,  y: 37,  w: 124, h: 208 },
  { id: 1, name: 'ยีนส์คลาสสิก (ช)',   gender: 'male',   x: 255, y: 38,  w: 126, h: 205 },
  { id: 2, name: 'คาร์โก้กากี (ช)',    gender: 'male',   x: 447, y: 37,  w: 141, h: 207 },
  { id: 3, name: 'วอร์มดำจ็อกเกอร์ (ช)', gender: 'male', x: 658, y: 37,  w: 131, h: 204 },
  { id: 4, name: 'ขาสั้นลำลอง (ช)',    gender: 'male',   x: 850, y: 37,  w: 131, h: 129, isShort: true },
  { id: 5, name: 'กระโปรงจีบสั้น (ญ)', gender: 'female', x: 41,  y: 332, w: 156, h: 129, isShort: true },
  { id: 6, name: 'ยีนส์เอวสูง (ญ)',    gender: 'female', x: 255, y: 326, w: 121, h: 212 },
  { id: 7, name: 'กระโปรงยาวชมพู (ญ)', gender: 'female', x: 433, y: 327, w: 177, h: 212 },
  { id: 8, name: 'เลกกิ้งดำเข้ารูป (ญ)', gender: 'female', x: 669, y: 328, w: 110, h: 211 },
  { id: 9, name: 'ยีนส์ขาสั้น (ญ)',    gender: 'female', x: 848, y: 338, w: 136, h: 111, isShort: true }
];

// พิกัดแว่นตา 5 แบบ (จากแผ่น mod_acc_v2 แถวบน ที่ลบเส้นหูและเส้นแก้มออกแล้ว)
export const GLASSES_ITEMS = [
  { id: -1, name: 'ไม่ใส่แว่น' },
  { id: 0,  name: 'แว่นกรอบดำ',     x: 55,  y: 95, w: 147, h: 42 },
  { id: 1,  name: 'แว่นกลมสีทอง',   x: 248, y: 95, w: 149, h: 42 },
  { id: 2,  name: 'แว่นกันแดดดำ',   x: 444, y: 95, w: 149, h: 42 },
  { id: 3,  name: 'แว่นไซเบอร์ VR',  x: 651, y: 95, w: 140, h: 42 },
  { id: 4,  name: 'แว่นแดงครึ่งกรอบ', x: 830, y: 98, w: 146, h: 39 }
];

// พิกัดหมวกและหูฟัง 5 แบบ (จากแผ่น mod_acc_v2 แถวล่าง)
export const HAT_ITEMS = [
  { id: -1, name: 'ไม่ใส่หมวก' },
  { id: 0,  name: 'หมวกแก๊ปเทา',   x: 37,  y: 363, w: 167, h: 83,  oy: -18 },
  { id: 1,  name: 'หูฟังเกมมิ่ง',   x: 204, y: 366, w: 200, h: 120, oy: 6 },
  { id: 2,  name: 'หมวกไหมพรม',   x: 429, y: 360, w: 176, h: 86,  oy: -18 },
  { id: 3,  name: 'มงกุฎทองคำ',    x: 637, y: 350, w: 154, h: 96,  oy: -34 },
  { id: 4,  name: 'ที่คาดผมหูแมว',  x: 847, y: 370, w: 140, h: 76,  oy: -20 }
];
