import { useEffect, useState, useCallback } from 'react';
import { preloadAssets } from '../utils/preload';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((value: number) => {
    setProgress(value);
  }, []);

  useEffect(() => {
    preloadAssets(handleProgress);
    
    return () => {
      // Cleanup any pending operations
      setProgress(0);
    };
  }, [handleProgress]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-white transform-gpu transition-all duration-300 ease-out"
            style={{ 
              width: `${progress}%`,
              willChange: 'width'
            }}
          />
        </div>
        <span className="text-gray-400 text-sm">Loading {progress}%</span>
      </div>
    </div>
  );
}