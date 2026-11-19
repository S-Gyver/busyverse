import { SHEET_FILES } from '../config/spritesConfig.js';
import { MODULAR_SHEET_FILES } from '../config/avatarItemsConfig.js';

export function loadSpriteSheets(onProgress) {
  const sheets = {};
  const allFiles = { ...SHEET_FILES, ...MODULAR_SHEET_FILES };
  const entries = Object.entries(allFiles);
  const total = entries.length;

  const checkProgress = () => {
    const loaded = Object.values(sheets).filter(
      img => img.complete && img.naturalWidth > 0
    ).length;
    if (typeof onProgress === 'function') {
      onProgress({ loaded, total, isReady: loaded >= total });
    }
  };

  entries.forEach(([key, src]) => {
    const img = new Image();
    if (src.startsWith('http')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = checkProgress;
    img.onerror = checkProgress;
    img.src = src;
    sheets[key] = img;
  });

  return sheets;
}
