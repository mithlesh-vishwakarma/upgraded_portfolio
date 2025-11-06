import { useEffect, useRef } from "react";

const BackgroundPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    speed: number;
    lineLength: number;
  }[] = [];

  const particleCount = 35; // keep low for subtle background
  const cursor = { x: 0, y: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize subtle particles
    for (let i = 0; i < particleCount; i++) {
      const baseX = Math.random() * canvas.width;
      const baseY = Math.random() * canvas.height;
      particles.push({
        x: baseX + (Math.random() * 200 - 100), // start from random offset
        y: baseY + (Math.random() * 200 - 100),
        baseX,
        baseY,
        size: Math.random() * 1.2 + 0.5,
        speed: Math.random() * 0.015 + 0.005,
        lineLength: Math.random() * 80 + 30,
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Soft Light Glow ---
      const gradient = ctx.createRadialGradient(
        cursor.x,
        cursor.y,
        0,
        cursor.x,
        cursor.y,
        200
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.08)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // --- End Light Glow ---

      particles.forEach((p) => {
        // Ease towards their base position
        p.x += (p.baseX - p.x) * p.speed;
        p.y += (p.baseY - p.y) * p.speed;

        // Cursor interaction
        const dx = cursor.x - p.x;
        const dy = cursor.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fill();

        // Optional floating connection lines
        particles.forEach((p2) => {
          const dx2 = p2.x - p.x;
          const dy2 = p2.y - p.y;
          const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (distance < p.lineLength) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(255,255,255,0.15)";
            ctx.lineWidth = 0.2;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full left-0 z-[-1] bg-gray-900 overflow-hidden">
      {/* Subtle grid background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path
            d="M 5 0 L 0 0 0 5"
            fill="none"
            stroke="#182339"
            strokeWidth="0.3"
          />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Canvas for particles, lines, and light glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default BackgroundPattern;
