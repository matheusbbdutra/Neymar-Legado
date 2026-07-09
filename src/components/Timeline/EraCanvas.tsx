import { useEffect, useRef } from 'react';
import type { CareerEra } from '../../data/career';

interface EraCanvasProps {
  era: CareerEra;
  activeEraIndex: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  color: string;
}

export const EraCanvas = ({ era, activeEraIndex }: EraCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Set particle color based on active era
    // Santos: gray/white/black, Barcelona: gold/red, PSG: blue/red, Brasil: gold/green
    const getParticleColor = (index: number) => {
      switch (index) {
        case 0: return 'rgba(0, 0, 0, 0.15)'; // Santos (elegant black/gray shadows)
        case 1: return 'rgba(253, 236, 0, 0.35)'; // Barcelona (gold sparkles)
        case 2: return 'rgba(218, 41, 28, 0.25)'; // PSG (red embers)
        case 3: return 'rgba(0, 155, 58, 0.3)'; // Brasil (green glowing cells)
        default: return 'rgba(255, 255, 255, 0.2)';
      }
    };

    const particles: Particle[] = [];
    const particleCount = activeEraIndex === 1 ? 90 : 50; // More particles for the Barcelona pinnacle

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (activeEraIndex === 1 ? 5 : 3) + 1, // Larger sparkles for Barcelona
        speedX: (Math.random() - 0.5) * (activeEraIndex === 1 ? 1.5 : 0.6),
        speedY: (Math.random() - 0.8) * (activeEraIndex === 1 ? 1.8 : 0.8), // Floating upwards
        alpha: Math.random() * 0.5 + 0.1,
        color: getParticleColor(activeEraIndex),
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Special highlight connection lines for Barcelona (Camp Nou magic connection grid)
      if (activeEraIndex === 1) {
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.strokeStyle = 'rgba(253, 236, 0, 0.05)';
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
            }
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeEraIndex, era]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10 transition-transform duration-700 pointer-events-none" 
    />
  );
};
