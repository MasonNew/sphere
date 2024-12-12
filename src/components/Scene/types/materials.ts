export interface NoiseConfig {
  size: number;
  frequency: number;
  amplitude: number;
  octaves: number;
  persistence: number;
  normalStrength: number;
}

export interface MaterialConfig {
  color: string;
  metalness: number;
  roughness: number;
  envMapIntensity: number;
  clearcoat: number;
  clearcoatRoughness: number;
  normalScale: { x: number; y: number };
  transmission: number;
  thickness: number;
  attenuationColor: string;
  attenuationDistance: number;
  iridescence: number;
  iridescenceIOR: number;
  iridescenceThicknessRange: [number, number];
  sheen: number;
  sheenRoughness: number;
  sheenColor: string;
  specularIntensity: number;
  specularColor: string;
}