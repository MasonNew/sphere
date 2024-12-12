import { EffectComposer, Bloom, ChromaticAberration, SMAA } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer multisampling={8}>
      <SMAA preset={2} />
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.4}
        blendFunction={BlendFunction.SCREEN}
        kernelSize={KernelSize.LARGE}
      />
      <ChromaticAberration
        offset={[0.002, 0.002]}
        blendFunction={BlendFunction.NORMAL}
        opacity={0.15}
      />
    </EffectComposer>
  );
}