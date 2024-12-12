import * as THREE from 'three';

interface NoiseParams {
  frequency: number;
  amplitude: number;
  octaves: number;
  persistence: number;
}

function createPerlinNoise(x: number, y: number, params: NoiseParams): number {
  let total = 0;
  let frequency = params.frequency;
  let amplitude = params.amplitude;
  let maxValue = 0;

  for(let i = 0; i < params.octaves; i++) {
    total += interpolatedNoise(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= params.persistence;
    frequency *= 2;
  }

  return total / maxValue;
}

function interpolatedNoise(x: number, y: number): number {
  const intX = Math.floor(x);
  const fractX = x - intX;
  const intY = Math.floor(y);
  const fractY = y - intY;

  const v1 = smoothNoise(intX, intY);
  const v2 = smoothNoise(intX + 1, intY);
  const v3 = smoothNoise(intX, intY + 1);
  const v4 = smoothNoise(intX + 1, intY + 1);

  const i1 = interpolate(v1, v2, fractX);
  const i2 = interpolate(v3, v4, fractX);

  return interpolate(i1, i2, fractY);
}

function smoothNoise(x: number, y: number): number {
  const corners = (noise(x-1, y-1) + noise(x+1, y-1) + noise(x-1, y+1) + noise(x+1, y+1)) / 16;
  const sides = (noise(x-1, y) + noise(x+1, y) + noise(x, y-1) + noise(x, y+1)) / 8;
  const center = noise(x, y) / 4;
  return corners + sides + center;
}

function noise(x: number, y: number): number {
  const n = x + y * 57;
  let val = (Math.sin(n) * 43758.5453123) % 1;
  return val > 0 ? val : -val;
}

function interpolate(a: number, b: number, x: number): number {
  const ft = x * Math.PI;
  const f = (1 - Math.cos(ft)) * 0.5;
  return a * (1 - f) + b * f;
}

export function generateHighQualityNormalMap(): THREE.Texture {
  const size = 1024; // Increased resolution
  const data = new Uint8Array(size * size * 4);
  
  const noiseParams: NoiseParams = {
    frequency: 0.05,
    amplitude: 1.0,
    octaves: 6,
    persistence: 0.5
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      
      // Generate height values for normal calculation
      const scale = 1.0;
      const c = createPerlinNoise(x / size, y / size, noiseParams) * scale;
      const cx = createPerlinNoise((x + 1) / size, y / size, noiseParams) * scale;
      const cy = createPerlinNoise(x / size, (y + 1) / size, noiseParams) * scale;
      
      // Calculate normal vector
      const dx = (cx - c) * 2.0;
      const dy = (cy - c) * 2.0;
      const dz = 0.15; // Reduced for subtler effect
      
      // Normalize and convert to RGB
      const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
      data[i] = Math.floor(((dx / length) * 0.5 + 0.5) * 255);
      data[i + 1] = Math.floor(((dy / length) * 0.5 + 0.5) * 255);
      data[i + 2] = Math.floor(((dz / length) * 0.5 + 0.5) * 255);
      data[i + 3] = 255;
    }
  }
  
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  
  return texture;
}