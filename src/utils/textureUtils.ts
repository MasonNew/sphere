import * as THREE from 'three';

export function generateNormalMap(): THREE.Texture {
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  
  for (let i = 0; i < size * size * 4; i += 4) {
    // Create a complex normal pattern
    const x = (i / 4) % size;
    const y = Math.floor((i / 4) / size);
    
    const frequency = 0.1;
    const noise = Math.sin(x * frequency) * Math.cos(y * frequency) * 0.5 + 0.5;
    
    data[i] = Math.floor(noise * 255);     // R
    data[i + 1] = Math.floor(noise * 255); // G
    data[i + 2] = 255;                     // B
    data[i + 3] = 255;                     // A
  }
  
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  
  return texture;
}