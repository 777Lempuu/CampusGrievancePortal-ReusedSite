import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('INITIALIZING');
  
  const phases = [
    'INITIALIZING SECURE CONNECTION...',
    'AUTHENTICATING USER CREDENTIALS...',
    'LOADING GRIEVANCE DATABASE...',
    'ESTABLISHING ENCRYPTED TUNNEL...',
    'SYSTEM READY - WELCOME TO THE GRID'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        const phaseIndex = Math.min(Math.floor(newProgress / 20), phases.length - 1);
        setCurrentPhase(phases[phaseIndex]);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const renderProgressBar = () => {
    const totalSegments = 20;
    const filledSegments = Math.floor((progress / 100) * totalSegments);
    
    return (
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div
            key={index}
            className={`w-6 h-4 border border-green-400 ${
              index < filledSegments 
                ? 'bg-green-400 animate-pulse' 
                : 'bg-transparent'
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      {/* Matrix-style background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xs leading-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fall ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* ASCII Art Logo */}
        <div className="mb-8 text-xs leading-tight">
          <pre className="text-green-400">
{`
 ███████ ███████  █████  ██           ██    ██ ███    ██ ██ ██    ██ 
 ██      ██      ██   ██ ██           ██    ██ ████   ██ ██ ██    ██ 
 ███████ █████   ███████ ██           ██    ██ ██ ██  ██ ██ ██    ██ 
      ██ ██      ██   ██ ██           ██    ██ ██  ██ ██ ██  ██  ██  
 ███████ ███████ ██   ██ ███████       ██████  ██   ████ ██   ████   
`}
          </pre>
        </div>

        <div className="border border-green-400 p-8 bg-green-400 bg-opacity-5 max-w-lg">
          <h2 className="text-xl mb-6 font-bold">LOADING SYSTEM MATRIX...</h2>
          
          {renderProgressBar()}
          
          <div className="text-sm mb-4">
            <p>{currentPhase}</p>
            <p className="mt-2">{progress}% COMPLETE</p>
          </div>

          {/* Loading dots animation */}
          <div className="flex justify-center items-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-green-400 animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>

          {/* System info */}
          <div className="mt-6 text-xs opacity-75 text-left">
            <p>&gt; KERNEL: GRIEVANCE_OS v2.1</p>
            <p>&gt; MEMORY: 512MB ALLOCATED</p>
            <p>&gt; ENCRYPTION: AES-256 ACTIVE</p>
            <p>&gt; STATUS: {progress < 100 ? 'LOADING...' : 'READY'}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;