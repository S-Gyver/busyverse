import { MODULAR_SHEET_FILES } from '../config/avatarItemsConfig.js';

export function loadSpriteSheets(onProgress) {
  const sheets = {};
  const entries = Object.entries(MODULAR_SHEET_FILES);
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
    img.onload = checkProgress;
    img.onerror = checkProgress;
    img.src = src;
    sheets[key] = img;
  });

  return sheets;
}
