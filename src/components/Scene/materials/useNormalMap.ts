import { useMemo } from 'react';
import * as THREE from 'three';
import { NoiseConfig } from '../types/materials';
import { createPerlinNoise } from '../utils/noiseUtils';

const DEFAULT_CONFIG: NoiseConfig = {
  size: 1024,
  frequency: 0.05,
  amplitude: 1.0,
  octaves: 6,
  persistence: 0.5,
  normalStrength: 0.15
};

export function useNormalMap(config: NoiseConfig = DEFAULT_CONFIG) {
  return useMemo(() => {
    const data = new Uint8Array(config.size * config.size * 4);
    
    for (let y = 0; y < config.size; y++) {
      for (let x = 0; x < config.size; x++) {
        const i = (y * config.size + x) * 4;
        
        const c = createPerlinNoise(x / config.size, y / config.size, config);
        const cx = createPerlinNoise((x + 1) / config.size, y / config.size, config);
        const cy = createPerlinNoise(x / config.size, (y + 1) / config.size, config);
        
        const dx = (cx - c) * 2.0;
        const dy = (cy - c) * 2.0;
        const dz = config.normalStrength;
        
        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        data[i] = Math.floor(((dx / length) * 0.5 + 0.5) * 255);
        data[i + 1] = Math.floor(((dy / length) * 0.5 + 0.5) * 255);
        data[i + 2] = Math.floor(((dz / length) * 0.5 + 0.5) * 255);
        data[i + 3] = 255;
      }
    }
    
    const texture = new THREE.DataTexture(data, config.size, config.size, THREE.RGBAFormat);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    
    return texture;
  }, [config]);
}