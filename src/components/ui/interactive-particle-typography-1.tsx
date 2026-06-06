"use client";

import React, { useEffect, useRef, useCallback } from "react";

// ─── Tuneable physics ──────────────────────────────────────────────────────────
const PHYSICS = {
  PARTICLE_COUNT_TARGET: 4000,
  PARTICLE_BASE_SIZE:    1.3,
  ATTRACTION_FORCE_BASE: 0.10,
  NOISE_STRENGTH_BASE:   0.4,
  FRICTION:              0.95,
  MOUSE_INTERACTION_RADIUS: 90,
  MOUSE_DISPERSE_STRENGTH:  1.2,
  TRAIL_ALPHA:           0.22,
} as const;

// ─── Static config ─────────────────────────────────────────────────────────────
const POINT_SAMPLING_DENSITY          = 4;
const TARGET_CANVAS_FILL_PERCENTAGE   = 0.72;
const MAX_INITIAL_FONT_SIZE           = 350;
const MIN_FONT_SIZE                   = 10;
const FIT_CHECK_PADDING               = 25;
const SETTLE_DISTANCE_THRESHOLD       = 4;
const SETTLE_ATTRACTION_MULTIPLIER    = 0.15;
const SETTLE_NOISE_MULTIPLIER         = 0.7;
const FONT_FAMILY                     = "'Roboto Mono', monospace";

const COLORS = [
  "#4285F4","#73A9FF","#DB4437","#E06666",
  "#FF69B4","#8A2BE2","#DDA0DD","#9370DB",
  "#BA55D3","#C71585","#E6E6FA",
];

// ─── Particle ──────────────────────────────────────────────────────────────────
interface PhysicsParams {
  PARTICLE_BASE_SIZE: number;
  ATTRACTION_FORCE_BASE: number;
  NOISE_STRENGTH_BASE: number;
  FRICTION: number;
  MOUSE_INTERACTION_RADIUS: number;
  MOUSE_DISPERSE_STRENGTH: number;
}

interface MousePos { x?: number; y?: number }

class Particle {
  x: number; y: number;
  vx: number; vy: number;
  targetX: number; targetY: number;
  baseSize: number; size: number;
  color: string;
  attractionOffset: number;
  noiseOffset: number;

  constructor(
    targetX: number, targetY: number,
    cw: number, ch: number,
    private physics: PhysicsParams,
  ) {
    this.x = Math.random() * cw;
    this.y = Math.random() * ch;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.targetX = targetX;
    this.targetY = targetY;
    this.baseSize = physics.PARTICLE_BASE_SIZE;
    this.size = this.baseSize + Math.random() * this.baseSize * 0.5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.attractionOffset = (Math.random() - 0.5) * 0.04;
    this.noiseOffset      = (Math.random() - 0.5) * 0.2;
  }

  update(mouse: MousePos) {
    this.baseSize = this.physics.PARTICLE_BASE_SIZE;
    this.size = this.baseSize + Math.random() * this.baseSize * 0.5;

    const dxT = this.targetX - this.x;
    const dyT = this.targetY - this.y;
    const dist = Math.sqrt(dxT * dxT + dyT * dyT);

    let attr  = Math.max(0.001, this.physics.ATTRACTION_FORCE_BASE + this.attractionOffset);
    let noise = Math.max(0, this.physics.NOISE_STRENGTH_BASE + this.noiseOffset);

    if (dist < SETTLE_DISTANCE_THRESHOLD) {
      attr  *= SETTLE_ATTRACTION_MULTIPLIER;
      noise *= SETTLE_NOISE_MULTIPLIER;
    } else if (dist < SETTLE_DISTANCE_THRESHOLD * 4) {
      const f = Math.max(0, (dist - SETTLE_DISTANCE_THRESHOLD) / (SETTLE_DISTANCE_THRESHOLD * 3));
      attr  = attr  * (SETTLE_ATTRACTION_MULTIPLIER  + (1 - SETTLE_ATTRACTION_MULTIPLIER)  * f);
      noise = noise * (SETTLE_NOISE_MULTIPLIER        + (1 - SETTLE_NOISE_MULTIPLIER)        * f);
    }

    let fx = 0, fy = 0;

    if (mouse.x !== undefined && mouse.y !== undefined) {
      const dxM   = this.x - mouse.x;
      const dyM   = this.y - mouse.y;
      const distM = Math.sqrt(dxM * dxM + dyM * dyM);
      if (distM < this.physics.MOUSE_INTERACTION_RADIUS && distM > 0) {
        const ang   = Math.atan2(dyM, dxM);
        const force = ((this.physics.MOUSE_INTERACTION_RADIUS - distM)
                       / this.physics.MOUSE_INTERACTION_RADIUS)
                      * this.physics.MOUSE_DISPERSE_STRENGTH;
        fx += Math.cos(ang) * force;
        fy += Math.sin(ang) * force;
        attr *= 0.1;
      }
    }

    if (dist > 0.01) {
      fx += (dxT / dist) * attr * Math.min(dist, 100) * 0.1;
      fy += (dyT / dist) * attr * Math.min(dist, 100) * 0.1;
    }
    fx += (Math.random() - 0.5) * noise;
    fy += (Math.random() - 0.5) * noise;

    this.vx = (this.vx + fx) * this.physics.FRICTION;
    this.vy = (this.vy + fy) * this.physics.FRICTION;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0.2, this.size), 0, Math.PI * 2);
    ctx.fillStyle    = this.color;
    ctx.shadowColor  = this.color;
    ctx.shadowBlur   = Math.min(5, this.size * 1.5);
    ctx.fill();
  }
}

// ─── Helper: sample pixel positions for a word ────────────────────────────────
function getWordPoints(word: string, cw: number, ch: number) {
  const tmp  = document.createElement("canvas");
  tmp.width  = cw;
  tmp.height = ch;
  const ctx  = tmp.getContext("2d")!;
  const text = word.toUpperCase();

  let fontSize = MIN_FONT_SIZE;
  for (let fs = MAX_INITIAL_FONT_SIZE; fs >= MIN_FONT_SIZE; fs -= 2) {
    ctx.font = `bold ${fs}px ${FONT_FAMILY}`;
    const m   = ctx.measureText(text);
    const tw  = m.width + FIT_CHECK_PADDING;
    const th  = (m.actualBoundingBoxAscent ?? fs * 0.75)
              + (m.actualBoundingBoxDescent ?? fs * 0.25)
              + FIT_CHECK_PADDING;
    if (tw < cw * TARGET_CANVAS_FILL_PERCENTAGE && th < ch * TARGET_CANVAS_FILL_PERCENTAGE) {
      fontSize = fs;
      break;
    }
  }

  ctx.clearRect(0, 0, cw, ch);
  ctx.font          = `bold ${fontSize}px ${FONT_FAMILY}`;
  ctx.fillStyle     = "white";
  ctx.textAlign     = "center";
  ctx.textBaseline  = "middle";
  ctx.fillText(text, cw / 2, ch / 2);

  const { data } = ctx.getImageData(0, 0, cw, ch);
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < ch; y += POINT_SAMPLING_DENSITY)
    for (let x = 0; x < cw; x += POINT_SAMPLING_DENSITY)
      if (data[(y * cw + x) * 4 + 3] > 128)
        points.push({ x, y });
  return points;
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ParticleTypographyProps {
  /** Text to render as particles. Defaults to "ALJAMAL" */
  text?: string;
  /** CSS height of the section. Defaults to "70vh" */
  height?: string;
}

export default function ParticleTypography({
  text   = "ALJAMAL",
  height = "70vh",
}: ParticleTypographyProps) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const particles  = useRef<Particle[]>([]);
  const targets    = useRef<{ x: number; y: number }[]>([]);
  const mouse      = useRef<MousePos>({});
  const rafId      = useRef<number | null>(null);
  const physics    = useRef<any>({ ...PHYSICS });

  // ── build + start ────────────────────────────────────────────────────────────
  const build = useCallback((cw: number, ch: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cw <= 0 || ch <= 0) return;
    canvas.width  = cw;
    canvas.height = ch;

    targets.current = getWordPoints(text, cw, ch);

    // Dynamic particle count
    const raw = Math.round(
      Math.max(500, Math.min(10000, targets.current.length)) / 100,
    ) * 100;
    physics.current.PARTICLE_COUNT_TARGET = raw;

    particles.current = Array.from({ length: raw }, (_, i) => {
      const t = targets.current[i % targets.current.length];
      return new Particle(t.x, t.y, cw, ch, physics.current);
    });
  }, [text]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = `rgba(0,0,0,${physics.current.TRAIL_ALPHA})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur   = 0;
    ctx.shadowColor  = "transparent";

    for (const p of particles.current) {
      p.update(mouse.current);
      p.draw(ctx);
    }
    ctx.shadowBlur = 0;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  // ── mount / unmount ──────────────────────────────────────────────────────────
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Size canvas to wrapper
    const { width, height: h } = wrap.getBoundingClientRect();
    build(Math.round(width), Math.round(h));
    animate();

    // Respond to container resize
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      const { width: rw, height: rh } = e.contentRect;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      setTimeout(() => {
        build(Math.round(rw), Math.round(rh));
        animate();
      }, 200);
    });
    ro.observe(wrap);

    // Mouse / touch events
    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave  = ()                 => { mouse.current = {}; };
    const onTouch  = (e: TouchEvent)   => {
      e.preventDefault();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect && e.touches[0])
        mouse.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    };

    const cv = canvasRef.current!;
    cv.addEventListener("mousemove",  onMove);
    cv.addEventListener("mouseleave", onLeave);
    cv.addEventListener("touchmove",  onTouch, { passive: false });
    cv.addEventListener("touchend",   onLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      ro.disconnect();
      cv.removeEventListener("mousemove",  onMove);
      cv.removeEventListener("mouseleave", onLeave);
      cv.removeEventListener("touchmove",  onTouch);
      cv.removeEventListener("touchend",   onLeave);
    };
  }, [build, animate]);

  return (
    <div ref={wrapRef} style={{ height }} className="w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ display: "block", backgroundColor: "#050505" }}
        className="w-full h-full"
      />
    </div>
  );
}
