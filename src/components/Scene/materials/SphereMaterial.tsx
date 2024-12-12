import { MeshPhysicalMaterial, Vector2, TextureLoader, sRGBEncoding, LinearMipMapLinearFilter, LinearFilter } from 'three';
import { useEffect, useMemo } from 'react';

export function useSphereMaterial() {
  const texture = useMemo(() => {
    const loader = new TextureLoader();
    const tex = loader.load('/textures/sphere-texture.jpg');
    
    // Configure texture for optimal quality
    tex.generateMipmaps = true;
    tex.minFilter = LinearMipMapLinearFilter;
    tex.magFilter = LinearFilter;
    tex.anisotropy = 16;
    tex.encoding = sRGBEncoding;
    
    return tex;
  }, []);
  
  const material = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      map: texture,
      color: '#ffffff',
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 2.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      normalScale: new Vector2(0.15, 0.15),
      transmission: 0.2,
      thickness: 1.0,
      attenuationColor: '#ffffff',
      attenuationDistance: 0.5,
      iridescence: 0.8,
      iridescenceIOR: 1.5,
      iridescenceThicknessRange: [100, 400],
      sheen: 1.0,
      sheenRoughness: 0.3,
      sheenColor: '#ffffff',
      specularIntensity: 1.0,
      specularColor: '#ffffff'
    });
    
    return mat;
  }, [texture]);

  useEffect(() => {
    return () => {
      material.dispose();
      texture.dispose();
    };
  }, [material, texture]);

  return material;
}