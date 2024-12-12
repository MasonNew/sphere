import { Environment, Lightformer } from '@react-three/drei';

export function SceneEnvironment() {
  return (
    <>
      <Environment preset="studio" background blur={0.8}>
        <Lightformer
          position={[10, 10, 10]}
          scale={12}
          intensity={4}
          color="#ffd1c9"
        />
        <Lightformer
          position={[-10, -10, -10]}
          scale={12}
          intensity={2}
          color="#89c7ff"
        />
        <Lightformer
          position={[0, 5, -10]}
          scale={10}
          intensity={2}
          color="#ffffff"
        />
      </Environment>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2.5}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
}