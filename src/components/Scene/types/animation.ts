export interface AnimationConfig {
  rotation: {
    speed: number;
    damping: number;
  };
  float: {
    primarySpeed: number;
    secondarySpeed: number;
    primaryAmplitude: number;
    secondaryAmplitude: number;
  };
  scale: {
    speed: number;
    amplitude: number;
  };
}