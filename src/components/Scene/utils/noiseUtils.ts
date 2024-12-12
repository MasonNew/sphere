import { NoiseConfig } from '../types/materials';

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

export function createPerlinNoise(x: number, y: number, config: NoiseConfig): number {
  let total = 0;
  let frequency = config.frequency;
  let amplitude = config.amplitude;
  let maxValue = 0;

  for(let i = 0; i < config.octaves; i++) {
    total += interpolatedNoise(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= config.persistence;
    frequency *= 2;
  }

  return total / maxValue;
}