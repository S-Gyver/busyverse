// พิกัด URL ของ Sprite Sheet ทั้ง 15 แผ่นบน Cloudinary CDN
export const SHEET_FILES = {
  walk_front:      'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048611/visual_sprites/d6rfsncdancflzbykzen.png',
  walk_back:       'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048628/visual_sprites/mibiqtke4f78vubmheba.png',
  walk_right_life: 'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795057987/visual_sprites/gmtquyjxekreb3ctgnic.png',
  run_side:        'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795050460/visual_sprites/b2yk3llvqmdq3sk9n5ry.png',
  sit:             'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048635/visual_sprites/wifzpohzbext59iogl2p.png',
  sleep:           'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048637/visual_sprites/vkp1ww52tcp2gnxh1a06.png',
  victory:         'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048640/visual_sprites/ndaqgfskwq2cum8imlz3.png',
  angry:           'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048644/visual_sprites/xg2ohglmqyab1geeweqw.png',
  laugh:           'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048647/visual_sprites/fgrmqlfb1nuenmtqcrfv.png',
  eat_chicken:     'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048652/visual_sprites/ybj4qmbkuo6jpah2rx62.png',
  drink_water:     'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048657/visual_sprites/zqak5clnndsmz2i57sob.png',
  eat_fruit:       'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048661/visual_sprites/f3utiiw5yqfpfxzi6bo7.png',
  angry_talk:      'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048665/visual_sprites/v6hauujnxwx4razkqe2t.png',
  serious_talk:    'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048668/visual_sprites/ukjyhiwgzywdbfmnnjcl.png',
  normal_talk:     'https://res.cloudinary.com/xn7rvu6g/image/upload/f_auto,q_auto/v1795048672/visual_sprites/ufymg5dq4gwukhmmlecm.png'
};

// พิกัดเฟรมและอัตราส่วนภาพของทั้ง 14 แผ่น
export const ANIMATIONS = {
  // ท่ายืนนิ่ง 4 ทิศทาง (ใช้เฟรมแรกของแต่ละทิศ)
  idle_down: {
    sheet: 'walk_front', scale: 0.315, fps: 0,
    frames: [{ x: 33, y: 115, w: 137, h: 256 }]
  },
  idle_up: {
    sheet: 'walk_back', scale: 0.301, fps: 0,
    frames: [{ x: 35, y: 97, w: 129, h: 272 }]
  },
  idle_right: {
    sheet: 'walk_right_life', scale: 0.224, fps: 0,
    frames: [{ x: 90, y: 99, w: 154, h: 354 }]
  },
  idle_left: {
    sheet: 'walk_right_life', scale: 0.224, fps: 0, flipX: true,
    frames: [{ x: 90, y: 99, w: 154, h: 354 }]
  },

  // ท่าเดินปกติ 4 ทิศทาง (Walk 4-Way: แกว่งแขนระดับเอวธรรมชาติ + แผ่น WALK SIDE 8 FRAMES)
  walk_down: {
    sheet: 'walk_front', scale: 0.315, fps: 8,
    frames: [
      { x: 198, y: 114, w: 127, h: 265, ox: 2 },
      { x: 33,  y: 115, w: 137, h: 256 },
      { x: 703, y: 112, w: 137, h: 270 },
      { x: 1031, y: 116, w: 137, h: 261 }
    ]
  },
  walk_up: {
    sheet: 'walk_back', scale: 0.301, fps: 8,
    frames: [
      { x: 184, y: 97, w: 129, h: 270 },
      { x: 531, y: 97, w: 139, h: 272 },
      { x: 698, y: 97, w: 129, h: 273 },
      { x: 1037, y: 97, w: 129, h: 273 }
    ]
  },
  walk_right: {
    sheet: 'walk_right_life', scale: 0.224, fps: 10,
    frames: [
      { x: 367, y: 99,  w: 175, h: 346, ox: -6 },
      { x: 678, y: 99,  w: 154, h: 355 },
      { x: 966, y: 99,  w: 161, h: 351, ox: -3 },
      { x: 71,  y: 486, w: 180, h: 367, ox: -7 },
      { x: 387, y: 486, w: 162, h: 376 },
      { x: 675, y: 486, w: 162, h: 377 },
      { x: 971, y: 486, w: 162, h: 376 }
    ]
  },
  walk_left: {
    sheet: 'walk_right_life', scale: 0.224, fps: 10, flipX: true,
    frames: [
      { x: 367, y: 99,  w: 175, h: 346, ox: -6 },
      { x: 678, y: 99,  w: 154, h: 355 },
      { x: 966, y: 99,  w: 161, h: 351, ox: -3 },
      { x: 71,  y: 486, w: 180, h: 367, ox: -7 },
      { x: 387, y: 486, w: 162, h: 376 },
      { x: 675, y: 486, w: 162, h: 377 },
      { x: 971, y: 486, w: 162, h: 376 }
    ]
  },

  // ท่าวิ่ง 4 ทิศทาง (Run 4-Way: กด Shift ค้างเพื่อวิ่งเร็ว)
  run_down: {
    sheet: 'walk_front', scale: 0.315, fps: 13,
    frames: [
      { x: 198, y: 114, w: 127, h: 265, ox: 4 },
      { x: 350, y: 105, w: 152, h: 272, ox: 17 },
      { x: 528, y: 118, w: 143, h: 261, ox: 4 },
      { x: 703, y: 112, w: 137, h: 270 },
      { x: 864, y: 106, w: 148, h: 272, ox: 14 },
      { x: 1031, y: 116, w: 137, h: 261 }
    ]
  },
  run_up: {
    sheet: 'walk_back', scale: 0.301, fps: 13,
    frames: [
      { x: 184, y: 97, w: 129, h: 270 },
      { x: 349, y: 92, w: 149, h: 280, ox: 7 },
      { x: 531, y: 97, w: 139, h: 272 },
      { x: 698, y: 97, w: 129, h: 273 },
      { x: 858, y: 92, w: 150, h: 280, ox: -5 },
      { x: 1037, y: 97, w: 129, h: 273 }
    ]
  },
  run_right: {
    sheet: 'run_side', scale: 0.347, fps: 16,
    frames: [
      { x: 49, y: 68, w: 135, h: 232, ox: -2 },
      { x: 266, y: 68, w: 105, h: 230, ox: -2 },
      { x: 467, y: 68, w: 99, h: 231 },
      { x: 646, y: 68, w: 128, h: 226, ox: -2 },
      { x: 835, y: 68, w: 139, h: 233, ox: -4 },
      { x: 639, y: 314, w: 137, h: 237, ox: -2 },
      { x: 460, y: 314, w: 108, h: 243, ox: -1 },
      { x: 260, y: 315, w: 109, h: 240, ox: -2 }
    ]
  },
  run_left: {
    sheet: 'run_side', scale: 0.347, fps: 16, flipX: true,
    frames: [
      { x: 49, y: 68, w: 135, h: 232, ox: -2 },
      { x: 266, y: 68, w: 105, h: 230, ox: -2 },
      { x: 467, y: 68, w: 99, h: 231 },
      { x: 646, y: 68, w: 128, h: 226, ox: -2 },
      { x: 835, y: 68, w: 139, h: 233, ox: -4 },
      { x: 639, y: 314, w: 137, h: 237, ox: -2 },
      { x: 460, y: 314, w: 108, h: 243, ox: -1 },
      { x: 260, y: 315, w: 109, h: 240, ox: -2 }
    ]
  },

  // ท่าพูดคุย 3 อารมณ์ (5 เฟรม)
  normal_talk: {
    sheet: 'normal_talk', scale: 0.199, fps: 3.2, label: '💬 กำลังคุยงานทั่วไป (Normal Talk)',
    frames: [
      { x: 134, y: 140, w: 313, h: 415, ox: 71 },
      { x: 469, y: 141, w: 310, h: 414, ox: 63 },
      { x: 800, y: 136, w: 309, h: 419, ox: 65 },
      { x: 1149, y: 145, w: 200, h: 410 },
      { x: 1479, y: 142, w: 281, h: 413, ox: 43 }
    ]
  },
  serious_talk: {
    sheet: 'serious_talk', scale: 0.177, fps: 3, label: '🧐 ประชุมเครียด/จริงจัง (Serious Talk)',
    frames: [
      { x: 69, y: 104, w: 350, h: 463, ox: 78 },
      { x: 451, y: 104, w: 330, h: 464, ox: 52 },
      { x: 780, y: 105, w: 328, h: 463, ox: 62 },
      { x: 1130, y: 102, w: 323, h: 467, ox: 45 },
      { x: 1455, y: 98, w: 312, h: 470, ox: 41 }
    ]
  },
  angry_talk: {
    sheet: 'angry_talk', scale: 0.180, fps: 3.8, label: '🤬 เถียงงานเดือด! (Angry Talk)',
    frames: [
      { x: 82, y: 98, w: 348, h: 455, ox: 80 },
      { x: 438, y: 98, w: 312, h: 455, ox: 47 },
      { x: 749, y: 92, w: 349, h: 461, ox: 20 },
      { x: 1140, y: 90, w: 357, h: 463, ox: 83 },
      { x: 1499, y: 98, w: 265, h: 455, ox: 14 }
    ]
  },

  // ท่านั่งพัก 3 สไตล์
  sit: {
    sheet: 'sit', scale: 0.203, fps: 0, label: '🪑 นั่งพักผ่อน (Sit - กดซ้ำเพื่อเปลี่ยนท่านั่ง)',
    frames: [
      { x: 87, y: 97, w: 318, h: 349 },
      { x: 513, y: 92, w: 216, h: 353, ox: -6 },
      { x: 868, y: 80, w: 234, h: 370 }
    ]
  },

  // ท่ากินและดื่ม (5 เฟรม)
  eat_chicken: {
    sheet: 'eat_chicken', scale: 0.165, fps: 3.2, label: '🍗 กำลังกินไก่ทอดกรอบๆ (Eat Chicken)',
    frames: [
      { x: 25, y: 124, w: 307, h: 436, ox: -22 },
      { x: 382, y: 124, w: 303, h: 436, ox: -21 },
      { x: 773, y: 132, w: 272, h: 428, ox: -6 },
      { x: 1072, y: 124, w: 315, h: 436 },
      { x: 1445, y: 124, w: 300, h: 436, ox: -18 }
    ]
  },
  eat_fruit: {
    sheet: 'eat_fruit', scale: 0.151, fps: 3.2, label: '🍎 กำลังกินผลไม้สดชื่น (Eat Fruit)',
    frames: [
      { x: 35, y: 95, w: 288, h: 477 },
      { x: 410, y: 95, w: 281, h: 477 },
      { x: 778, y: 95, w: 282, h: 477 },
      { x: 1115, y: 95, w: 279, h: 477 },
      { x: 1459, y: 95, w: 289, h: 477, ox: -3 }
    ]
  },
  drink_water: {
    sheet: 'drink_water', scale: 0.155, fps: 3.2, label: '🥤 กำลังดื่มน้ำเย็นๆ (Drink Water)',
    frames: [
      { x: 51, y: 101, w: 293, h: 464, ox: -5 },
      { x: 423, y: 100, w: 278, h: 465, ox: 4 },
      { x: 777, y: 98, w: 278, h: 467, ox: 3 },
      { x: 1121, y: 101, w: 273, h: 464, ox: 3 },
      { x: 1455, y: 100, w: 280, h: 465 }
    ]
  },

  // ท่าแสดงอารมณ์ชุดใหญ่ 10 เฟรม
  laugh: {
    sheet: 'laugh', scale: 0.248, fps: 5, label: '😂 หัวเราะขำกลิ้ง! (Laugh 10 Frames)',
    frames: [
      { x: 25, y: 120, w: 196, h: 330, ox: -18 },
      { x: 262, y: 120, w: 239, h: 326, ox: -13 },
      { x: 504, y: 129, w: 207, h: 321, ox: -24 },
      { x: 721, y: 123, w: 226, h: 328 },
      { x: 967, y: 102, w: 224, h: 349, ox: 24 },
      { x: 37, y: 536, w: 208, h: 330, ox: -37 },
      { x: 256, y: 491, w: 248, h: 375, ox: -37 },
      { x: 533, y: 527, w: 170, h: 339, ox: -6 },
      { x: 720, y: 527, w: 237, h: 339, ox: -5 },
      { x: 982, y: 527, w: 159, h: 339, ox: -7 }
    ]
  },
  angry: {
    sheet: 'angry', scale: 0.261, fps: 5, label: '😡 หัวร้อนสุดขีด! (Angry 10 Frames)',
    frames: [
      { x: 75, y: 138, w: 161, h: 314 },
      { x: 309, y: 134, w: 184, h: 318, ox: 12 },
      { x: 520, y: 134, w: 200, h: 318, ox: 7 },
      { x: 742, y: 135, w: 185, h: 317, ox: 7 },
      { x: 941, y: 164, w: 240, h: 288, ox: 14 },
      { x: 63, y: 535, w: 181, h: 318, ox: -17 },
      { x: 295, y: 534, w: 177, h: 319, ox: -9 },
      { x: 517, y: 487, w: 238, h: 366, ox: 33 },
      { x: 754, y: 490, w: 213, h: 364, ox: 21 },
      { x: 966, y: 539, w: 164, h: 315, ox: -12 }
    ]
  },
  victory: {
    sheet: 'victory', scale: 0.256, fps: 5.5, label: '✌️ ปิดจ๊อบสำเร็จ! (Victory 10 Frames)',
    frames: [
      { x: 74, y: 139, w: 146, h: 320, ox: 8 },
      { x: 261, y: 135, w: 230, h: 324, ox: 4 },
      { x: 505, y: 131, w: 212, h: 328, ox: 3 },
      { x: 740, y: 107, w: 213, h: 328, ox: -3 },
      { x: 964, y: 91, w: 209, h: 345, ox: 3 },
      { x: 54, y: 545, w: 189, h: 309, ox: -6 },
      { x: 274, y: 492, w: 217, h: 363 },
      { x: 507, y: 492, w: 212, h: 363, ox: -13 },
      { x: 737, y: 539, w: 227, h: 316, ox: -5 },
      { x: 1002, y: 543, w: 143, h: 313 }
    ]
  },
  sleep: {
    sheet: 'sleep', scale: 0.256, fps: 2.2, label: '💤 งีบหลับเติมพลัง (Sleep 5 Frames)',
    frames: [
      { x: 64, y: 139, w: 153, h: 322 },
      { x: 287, y: 138, w: 151, h: 323 },
      { x: 491, y: 157, w: 204, h: 304 },
      { x: 724, y: 152, w: 188, h: 315 },
      { x: 966, y: 124, w: 191, h: 346 }
    ]
  }
};
