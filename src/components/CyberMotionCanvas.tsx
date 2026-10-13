import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  highlighted: boolean;
}

interface CyberMotionCanvasProps {
  className?: string;
  density?: 'compact' | 'normal' | 'dense';
  interactive?: boolean;
}

export const CyberMotionCanvas: React.FC<CyberMotionCanvasProps> = ({
  className = '',
  density = 'normal',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -9999,
    y: -9999,
    active: false,
    radius: 140,
  });
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const particles: Particle[] = [];
    const count = density === 'compact' ? 32 : density === 'dense' ? 64 : 46;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize particles within boundary
      if (particles.length === 0) {
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            size: Math.random() * 2 + 1.2,
            baseAlpha: Math.random() * 0.45 + 0.15,
            alpha: Math.random() * 0.45 + 0.15,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulsePhase: Math.random() * Math.PI * 2,
            highlighted: Math.random() > 0.8,
          });
        }
      } else {
        particles.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track intersection to pause loop when not on screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    if (interactive && canvas.parentElement) {
      canvas.parentElement.addEventListener('mousemove', handleMouseMove, { passive: true });
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const nodeColor = isDark ? '34, 197, 94' : '0, 110, 47'; // Emerald
      const accentColor = isDark ? '74, 222, 128' : '22, 163, 74';
      const lineColor = isDark ? '255, 255, 255' : '27, 28, 26';
      const maxDistance = 110;

      // Update and draw particles
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion physics
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // Wrap or bounce around bounds
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        const pulse = (Math.sin(p.pulsePhase) + 1) * 0.5;
        p.alpha = p.baseAlpha + pulse * 0.3;

        // Mouse gravity & interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius && dist > 5) {
            const force = (1 - dist / mouse.radius) * 0.8;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;
            p.alpha = Math.min(1, p.alpha + 0.4);
          }
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.16 : 0.08);
            ctx.strokeStyle = `rgba(${lineColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Occasionally draw a packet packet dot moving along the line
            if (p.highlighted && dist < 80) {
              const progress = (Math.sin(p.pulsePhase * 2) + 1) * 0.5;
              const px = p.x + (p2.x - p.x) * progress;
              const py = p.y + (p2.y - p.y) * progress;
              ctx.fillStyle = `rgba(${accentColor}, ${lineAlpha * 2})`;
              ctx.beginPath();
              ctx.arc(px, py, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Draw Particle Node
        ctx.fillStyle = p.highlighted
          ? `rgba(${accentColor}, ${p.alpha})`
          : `rgba(${nodeColor}, ${p.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glowing outer halo for highlighted nodes
        if (p.highlighted) {
          ctx.strokeStyle = `rgba(${accentColor}, ${p.alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw subtle mouse beacon aura
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        gradient.addColorStop(0, isDark ? 'rgba(34, 197, 94, 0.08)' : 'rgba(34, 197, 94, 0.04)');
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (interactive && canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme, density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    />
  );
};
