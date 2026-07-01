"use client";

import { useState, useEffect, useRef } from "react";
import TypewriterText from "../TypewriterText";

type Ball = { x: number, y: number, vx: number, vy: number, r: number };
type Plank = { id: number, x1: number, y1: number, x2: number, y2: number, color: string };

export default function Stage5({ onComplete, onLogRecovered }: { onComplete: () => void, onLogRecovered: (id: string, text: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [success, setSuccess] = useState(false);
  
  // Physics state
  const ballsRef = useRef<Ball[]>([]);
  const planksRef = useRef<Plank[]>([
    { id: 1, x1: 200, y1: 200, x2: 400, y2: 300, color: "#aaa" }, // Ramp right, medium
    { id: 2, x1: 500, y1: 400, x2: 300, y2: 500, color: "#aaa" }, // Ramp left, medium
    { id: 3, x1: 200, y1: 600, x2: 500, y2: 700, color: "#aaa" }, // Ramp right, long
    { id: 4, x1: 600, y1: 200, x2: 750, y2: 200, color: "#aaa" }, // Horizontal wall
    { id: 5, x1: 100, y1: 450, x2: 250, y2: 450, color: "#aaa" }, // Flat horizontal
    { id: 6, x1: 550, y1: 600, x2: 650, y2: 650, color: "#aaa" }, // Tiny steep ramp
    { id: 7, x1: 700, y1: 300, x2: 800, y2: 450, color: "#aaa" }, // Steep ramp right
  ]);
  const targetRef = useRef({ x: 600, y: 700, w: 100, h: 50 });
  
  const draggedPlankRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const successRef = useRef(false);

  useEffect(() => {
    successRef.current = success;
  }, [success]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = performance.now();
    let spawnTimer = 0;

    // Resize canvas to fit container
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        // Position target relative to canvas
        targetRef.current = {
          x: canvas.width - 150,
          y: canvas.height - 80,
          w: 120,
          h: 60
        };
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1); // max 100ms
      lastTime = time;

      if (successRef.current) {
        animationId = requestAnimationFrame(loop);
        return;
      }

      // Spawn ball
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        ballsRef.current.push({ x: 50, y: 50, vx: (Math.random() - 0.5) * 50, vy: 0, r: 8 });
        spawnTimer = 2.0; // spawn every 2s
      }

      const gravity = 900; // px/s^2
      const restitution = 0.5;

      // Update balls
      for (let i = ballsRef.current.length - 1; i >= 0; i--) {
        const b = ballsRef.current[i];
        
        b.vy += gravity * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Wall collisions
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -restitution; }
        if (b.x + b.r > canvas.width) { b.x = canvas.width - b.r; b.vx *= -restitution; }
        
        // Remove if falls off bottom
        if (b.y > canvas.height + 100) {
          ballsRef.current.splice(i, 1);
          continue;
        }

        // Target collision
        const tgt = targetRef.current;
        if (b.x > tgt.x && b.x < tgt.x + tgt.w && b.y > tgt.y && b.y < tgt.y + tgt.h) {
          if (!successRef.current) {
            setSuccess(true);
            setTimeout(() => {
              onLogRecovered("log-stage5", "Path reconstructed. The future is rewritten by correcting the past's trajectory.");
              onComplete();
            }, 3000);
          }
        }

        // Plank collisions
        for (const p of planksRef.current) {
          // Line segment AB
          const dx = p.x2 - p.x1;
          const dy = p.y2 - p.y1;
          const len2 = dx * dx + dy * dy;
          if (len2 === 0) continue;

          // Projection of ball onto line
          let t = ((b.x - p.x1) * dx + (b.y - p.y1) * dy) / len2;
          t = Math.max(0, Math.min(1, t)); // Clamp to segment

          const closestX = p.x1 + t * dx;
          const closestY = p.y1 + t * dy;

          const distX = b.x - closestX;
          const distY = b.y - closestY;
          const dist2 = distX * distX + distY * distY;

          // Plank thickness radius
          const plankR = 5;
          const minD = b.r + plankR;

          if (dist2 < minD * minD) {
            const dist = Math.sqrt(dist2);
            if (dist === 0) continue; // avoid division by zero

            // Normal vector
            const nx = distX / dist;
            const ny = distY / dist;

            // Push ball out
            const overlap = minD - dist;
            b.x += nx * overlap;
            b.y += ny * overlap;

            // Reflect velocity
            const dot = b.vx * nx + b.vy * ny;
            if (dot < 0) {
              b.vx -= (1 + restitution) * dot * nx;
              b.vy -= (1 + restitution) * dot * ny;
            }
          }
        }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Emitter
      ctx.fillStyle = "rgba(255, 176, 0, 0.5)";
      ctx.beginPath();
      ctx.arc(50, 50, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "var(--text-amber)";
      ctx.stroke();

      // Draw Target
      const tgt = targetRef.current;
      ctx.fillStyle = "rgba(51, 255, 51, 0.3)";
      ctx.fillRect(tgt.x, tgt.y, tgt.w, tgt.h);
      ctx.strokeStyle = "rgba(51, 255, 51, 0.8)";
      ctx.strokeRect(tgt.x, tgt.y, tgt.w, tgt.h);
      ctx.fillStyle = "rgba(51, 255, 51, 1)";
      ctx.font = "12px monospace";
      ctx.fillText("CORE ENTRY", tgt.x + 10, tgt.y + 25);

      // Draw Planks
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      for (const p of planksRef.current) {
        ctx.strokeStyle = p.id === draggedPlankRef.current ? "white" : p.color;
        ctx.beginPath();
        ctx.moveTo(p.x1, p.y1);
        ctx.lineTo(p.x2, p.y2);
        ctx.stroke();
      }

      // Draw Balls
      ctx.fillStyle = "var(--text-primary)";
      for (const b of ballsRef.current) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete, onLogRecovered]);

  // Mouse handlers for dragging planks
  const getMousePos = (e: React.MouseEvent | React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (success) return;
    const pos = getMousePos(e);
    
    // Find clicked plank
    for (const p of planksRef.current) {
      const dx = p.x2 - p.x1;
      const dy = p.y2 - p.y1;
      const len2 = dx * dx + dy * dy;
      if (len2 === 0) continue;

      let t = ((pos.x - p.x1) * dx + (pos.y - p.y1) * dy) / len2;
      t = Math.max(0, Math.min(1, t));

      const closestX = p.x1 + t * dx;
      const closestY = p.y1 + t * dy;

      const dist = Math.hypot(pos.x - closestX, pos.y - closestY);
      if (dist <= 15) { // Grab radius
        draggedPlankRef.current = p.id;
        dragOffsetRef.current = { x: pos.x - p.x1, y: pos.y - p.y1 }; // using p.x1 as anchor
        
        const target = e.target as HTMLElement;
        target.setPointerCapture(e.pointerId);
        break;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggedPlankRef.current !== null) {
      const pos = getMousePos(e);
      const p = planksRef.current.find(pl => pl.id === draggedPlankRef.current);
      if (p) {
        const newX1 = pos.x - dragOffsetRef.current.x;
        const newY1 = pos.y - dragOffsetRef.current.y;
        const dx = p.x2 - p.x1;
        const dy = p.y2 - p.y1;
        
        p.x1 = newX1;
        p.y1 = newY1;
        p.x2 = newX1 + dx;
        p.y2 = newY1 + dy;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggedPlankRef.current !== null) {
      draggedPlankRef.current = null;
      const target = e.target as HTMLElement;
      if (target.hasPointerCapture(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "1rem" }}>
      <div style={{ minHeight: "40px", color: "var(--text-amber)" }}>
        <TypewriterText text="Drag the planks to redirect the simulation data packets to the core entry point." delay={30} />
      </div>

      <div style={{ flex: 1, position: "relative", border: "1px dashed var(--text-muted)", overflow: "hidden", minHeight: "400px", background: "rgba(10,10,15,0.8)" }}>
        {success && (
          <div className="glitch" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "2rem", color: "rgba(51, 255, 51, 1)", border: "2px solid", padding: "1rem", zIndex: 20 }}>
            SIMULATION ROUTING SUCCESSFUL
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", cursor: draggedPlankRef.current ? "grabbing" : "grab", touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>
    </div>
  );
}
