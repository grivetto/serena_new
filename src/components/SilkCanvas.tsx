import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  ox: number; // original/target x
  oy: number; // original/target y
  vx: number;
  vy: number;
}

interface Ribbon {
  points: Point[];
  color: string;
  gradientColors: string[];
  width: number;
  speed: number;
  amplitude: number;
  phase: number;
}

export default function SilkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize Ribbons
    const ribbons: Ribbon[] = [
      {
        points: [],
        color: "rgba(255, 0, 128, 0.08)", // Brand Pink
        gradientColors: ["rgba(255, 0, 128, 0.22)", "rgba(0, 210, 255, 0.04)", "rgba(8, 8, 8, 0)"],
        width: 140,
        speed: 0.002,
        amplitude: 80,
        phase: 0,
      },
      {
        points: [],
        color: "rgba(0, 210, 255, 0.06)", // Brand Cyan
        gradientColors: ["rgba(0, 210, 255, 0.18)", "rgba(255, 0, 128, 0.04)", "rgba(8, 8, 8, 0)"],
        width: 180,
        speed: 0.0015,
        amplitude: 110,
        phase: Math.PI / 3,
      },
      {
        points: [],
        color: "rgba(255, 0, 128, 0.05)", // Brand Pink
        gradientColors: ["rgba(255, 0, 128, 0.16)", "rgba(0, 210, 255, 0.03)", "rgba(8, 8, 8, 0)"],
        width: 120,
        speed: 0.0025,
        amplitude: 60,
        phase: Math.PI * 1.5,
      },
    ];

    const initPoints = () => {
      ribbons.forEach((ribbon) => {
        ribbon.points = [];
        const pointCount = 18;
        for (let i = 0; i < pointCount; i++) {
          // Space points horizontally across the screen
          const x = (width / (pointCount - 1)) * i;
          const y = height * 0.45 + Math.sin(i * 0.5) * ribbon.amplitude;
          ribbon.points.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
          });
        }
      });
    };

    initPoints();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initPoints();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = (time: number) => {
      ctx.fillStyle = "rgba(8, 8, 8, 0.15)"; // Persistent trail for motion blur in Elegant Dark background
      ctx.fillRect(0, 0, width, height);

      // Draw subtle glowing grid lines for high-end digital theater vibe
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const step = 80;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Smooth mouse coordinates
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.08;
        mouse.y += (-1000 - mouse.y) * 0.08;
      }

      // Update and draw ribbons
      ribbons.forEach((ribbon) => {
        ribbon.phase += ribbon.speed;

        // Dynamic physics simulation for ribbon nodes
        ribbon.points.forEach((p, i) => {
          // Floating wave motion (simulating wind blowing silk)
          const offsetAngle = ribbon.phase + i * 0.25;
          const targetY =
            height * 0.45 +
            Math.sin(offsetAngle) * ribbon.amplitude +
            Math.cos(offsetAngle * 1.7) * (ribbon.amplitude * 0.3);

          p.oy = targetY;

          // Pull toward target vertical position (restoring force)
          const dy = p.oy - p.y;
          p.vy += dy * 0.04;

          // Horizontal sway
          const dx = p.ox - p.x;
          p.vx += dx * 0.04;

          // React to mouse coordinates (repulsive/fluid distortion)
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < 320 && mouse.active) {
            const force = (320 - dist) / 320;
            // Push silk points gracefully
            p.vy += (mdy / dist) * force * 15;
            p.vx += (mdx / dist) * force * 10;
          }

          // Inertia, drag/friction
          p.vx *= 0.88;
          p.vy *= 0.88;

          // Apply velocity
          p.x += p.vx;
          p.y += p.vy;

          // Constrain endpoints to screen boundaries
          if (i === 0) p.x = 0;
          if (i === ribbon.points.length - 1) p.x = width;
        });

        // Render silk fabric ribbons using dual-path bezier fills
        ctx.beginPath();
        ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y - ribbon.width / 2);

        // Top edge
        for (let i = 0; i < ribbon.points.length - 1; i++) {
          const p1 = ribbon.points[i];
          const p2 = ribbon.points[i + 1];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y - ribbon.width / 2 + p2.y - ribbon.width / 2) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y - ribbon.width / 2, xc, yc);
        }

        // Connect to bottom edge
        const lastP = ribbon.points[ribbon.points.length - 1];
        ctx.lineTo(lastP.x, lastP.y + ribbon.width / 2);

        // Bottom edge back
        for (let i = ribbon.points.length - 1; i > 0; i--) {
          const p1 = ribbon.points[i];
          const p2 = ribbon.points[i - 1];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + ribbon.width / 2 + p2.y + ribbon.width / 2) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y + ribbon.width / 2, xc, yc);
        }

        ctx.closePath();

        // Create a magnificent vertical/angled silk reflection gradient
        const gradient = ctx.createLinearGradient(
          width / 2,
          height * 0.2,
          width / 2,
          height * 0.8
        );
        gradient.addColorStop(0, ribbon.gradientColors[2]);
        gradient.addColorStop(0.3, ribbon.gradientColors[0]);
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.08)"); // highlight on silk crest
        gradient.addColorStop(0.7, ribbon.gradientColors[1]);
        gradient.addColorStop(1, ribbon.gradientColors[2]);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw elegant glowing fine threads representing individual silk fibers
        ctx.beginPath();
        ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y);
        for (let i = 0; i < ribbon.points.length - 1; i++) {
          const p1 = ribbon.points[i];
          const p2 = ribbon.points[i + 1];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        }
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="silk-ambient-background"
      className="absolute inset-0 w-full h-full block pointer-events-none z-0 opacity-80"
    />
  );
}
