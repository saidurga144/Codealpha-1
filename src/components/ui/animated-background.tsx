
'use client';

import { useMemo, useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const particleCount = 50; // Number of particles
      const newParticles = Array.from({ length: particleCount }).map((_, i) => {
        const size = Math.random() * 4 + 1; // Particle size
        const duration = Math.random() * 20 + 10; // Animation duration
        const delay = Math.random() * -20; // Animation delay
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        return {
          id: `particle-${i}`,
          style: {
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          },
        };
      });
      setParticles(newParticles);
    }
    generateParticles();
  }, []);


  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="relative h-full w-full">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/30 animate-move-packet"
            style={particle.style}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
