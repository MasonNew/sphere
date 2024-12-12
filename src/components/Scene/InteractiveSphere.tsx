import { useRef, useCallback, useMemo } from 'react';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useSphereMaterial } from './materials/SphereMaterial';
import { useSphereAnimation } from './animation/useSphereAnimation';

export function InteractiveSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  
  // Memoize material to prevent unnecessary recreations
  const material = useMemo(() => useSphereMaterial(), []);
  
  useSphereAnimation(sphereRef, targetRotation);

  // Optimize event handler with useCallback
  const handlePointerMove = useCallback((e: THREE.Event) => {
    if (!sphereRef.current) return;
    const { point } = e as unknown as { point: THREE.Vector3 };
    targetRotation.current.x = point.y * 0.3;
    targetRotation.current.y = point.x * 0.3;
  }, []);

  // Optimize reset handler with useCallback
  const handlePointerLeave = useCallback(() => {
    targetRotation.current = { x: 0, y: 0 };
  }, []);

  // Memoize sphere geometry arguments - increased segments for better texture detail
  const sphereArgs = useMemo(() => [1, 128, 128] as [number, number, number], []);

  return (
    <Sphere
      ref={sphereRef}
      args={sphereArgs}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      material={material}
      frustumCulled
      castShadow
      receiveShadow
    />
  );
}