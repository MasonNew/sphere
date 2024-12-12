import React, { Suspense, useState, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, AdaptiveDpr, AdaptiveEvents, BakeShadows } from '@react-three/drei';
import { Scene } from './components/Scene';
import { LoadingScreen } from './components/LoadingScreen';
import { Twitter, ExternalLink } from 'lucide-react';

function App() {
  const contractAddress = "0x000...000"; // Replace with actual contract address

  // Memoize Canvas settings
  const canvasSettings = useMemo(() => ({
    dpr: [1, 2],
    performance: { min: 0.5 },
    gl: {
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
      depth: true,
    }
  }), []);

  // Memoize camera position
  const cameraPosition = useMemo(() => [0, 0, 5], []);

  // Memoize light settings
  const spotLightSettings = useMemo(() => ({
    position: [10, 10, 10],
    angle: 0.15,
    penumbra: 1,
    intensity: 1,
    castShadow: true
  }), []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-900 to-purple-950">
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-blue-600/10 via-transparent to-transparent animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-radial from-purple-600/10 via-transparent to-transparent animate-pulse-slower" />
          <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent animate-pulse-fast" />
        </div>
        
        {/* Animated Stars */}
        <div className="absolute inset-0">
          <div className="stars-small" />
          <div className="stars-medium" />
          <div className="stars-large" />
        </div>

        {/* Grid Pattern with Glow */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(125, 211, 252, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(125, 211, 252, 0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Floating Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--delay': `${Math.random() * 5}s`,
                '--position': `${Math.random() * 100}%`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Animated Glow Lines */}
        <div className="glow-lines">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="glow-line"
              style={{
                '--delay': `${i * 2}s`,
                '--position': `${20 + i * 15}%`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <Suspense fallback={<LoadingScreen />}>
        <Canvas {...canvasSettings}>
          <PerspectiveCamera makeDefault position={cameraPosition} />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={7}
            enableDamping
            dampingFactor={0.05}
          />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <BakeShadows />
          <ambientLight intensity={0.5} />
          <spotLight {...spotLightSettings} />
          <Scene />
        </Canvas>
      </Suspense>
      
      {/* Enhanced Social Links and Contract Address */}
      <div className="fixed bottom-6 left-0 w-full px-6 z-10">
        <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30 shadow-glow">
          <div className="flex items-center justify-between gap-4">
            {/* Social Links with enhanced styling */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-400/30 transition-all duration-300" />
                <div className="relative bg-black/50 p-2 rounded-full border border-cyan-500/30 backdrop-blur-sm group-hover:border-cyan-400/50 transition-all duration-300">
                  <Twitter size={20} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-400/30 transition-all duration-300" />
                <div className="relative bg-black/50 p-2 rounded-full border border-cyan-500/30 backdrop-blur-sm group-hover:border-cyan-400/50 transition-all duration-300">
                  <ExternalLink size={20} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </a>
            </div>
            {/* Contract Address with enhanced styling */}
            <div className="flex items-center">
              <span className="text-cyan-400/90 mr-2.5 text-xs font-medium uppercase tracking-wide">Contract:</span>
              <div className="bg-black/50 px-3 py-1.5 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
                <span className="text-cyan-300/90 font-mono text-xs">{contractAddress}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;