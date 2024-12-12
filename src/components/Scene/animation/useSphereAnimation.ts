import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';
import * as THREE from 'three';
import { AnimationConfig } from '../types/animation';

const DEFAULT_CONFIG: AnimationConfig = {
  rotation: {
    speed: 0.05,
    damping: 0.05
  },
  float: {
    primarySpeed: 0.5,
    secondarySpeed: 0.2,
    primaryAmplitude: 0.1,
    secondaryAmplitude: 0.05
  },
  scale: {
    speed: 0.8,
    amplitude: 0.02
  }
};

export function useSphereAnimation(
  sphereRef: RefObject<THREE.Mesh>,
  targetRotation: RefObject<{ x: number; y: number }>,
  config: AnimationConfig = DEFAULT_CONFIG
) {
  useFrame((state) => {
    if (!sphereRef.current) return;
    
    // Rotation animation
    sphereRef.current.rotation.x += 
      (targetRotation.current.x - sphereRef.current.rotation.x) * config.rotation.speed;
    sphereRef.current.rotation.y += 
      (targetRotation.current.y - sphereRef.current.rotation.y) * config.rotation.speed;
    
    // Floating animation
    const t = state.clock.elapsedTime;
    sphereRef.current.position.y = 
      Math.sin(t * config.float.primarySpeed) * config.float.primaryAmplitude + 
      Math.sin(t * config.float.secondarySpeed) * config.float.secondaryAmplitude;
    sphereRef.current.position.x = 
      Math.cos(t * config.float.secondarySpeed * 2) * config.float.secondaryAmplitude;
    
    // Scale animation
    const scale = 1 + Math.sin(t * config.scale.speed) * config.scale.amplitude;
    sphereRef.current.scale.setScalar(scale);
  });
}