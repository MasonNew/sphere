import { InteractiveSphere } from './Scene/InteractiveSphere';
import { SceneEnvironment } from './Scene/Environment';
import { PostProcessing } from './Scene/PostProcessing';

export function Scene() {
  return (
    <>
      <SceneEnvironment />
      <InteractiveSphere />
      <PostProcessing />
    </>
  );
}