import { LoadingManager } from 'three';

const manager = new LoadingManager();
let progressCallback: ((progress: number) => void) | null = null;

export const preloadAssets = (onProgress?: (progress: number) => void) => {
  return new Promise<void>((resolve) => {
    if (onProgress) {
      progressCallback = onProgress;
    }

    manager.onLoad = () => {
      progressCallback = null;
      resolve();
    };

    manager.onProgress = (_, loaded, total) => {
      const progress = (loaded / Math.max(total, 1)) * 100;
      progressCallback?.(Math.round(progress));
    };
  });
};

export const getLoadingManager = () => manager; 