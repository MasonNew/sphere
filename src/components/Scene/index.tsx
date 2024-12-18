import { InteractiveSphere } from './InteractiveSphere';

interface SceneProps {
  sphereProps?: {
    imageUrl?: string;
    materialProps?: {
      normalMapIntensity?: number;
      metalness?: number;
      roughness?: number;
      clearcoat?: number;
      transmission?: number;
      iridescence?: number;
    };
  };
}

export function Scene({ sphereProps }: SceneProps) {
  return (
    <>
      <InteractiveSphere {...sphereProps} />
    </>
  );
} 