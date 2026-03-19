import { useEffect, useMemo, useRef, useState } from "react";

interface GhostCursorProps {
  color?: string;
  brightness?: number;
  edgeIntensity?: number;
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
}

type Point = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const safeHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized.padEnd(6, "0").slice(0, 6);

  const int = Number.parseInt(safeHex, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

export default function GhostCursor({
  color = "#B19EEF",
  brightness = 2,
  edgeIntensity = 0,
  trailLength = 50,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.1,
  bloomRadius = 1,
  bloomThreshold = 0.025,
  fadeDelayMs = 1000,
  fadeDurationMs = 1500,
}: GhostCursorProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const fadeTimerRef = useRef<number>();
  const lastKnownPoint = useRef<Point>({ x: 0, y: 0 });
  const targetPoint = useRef<Point>({ x: 0, y: 0 });
  const trailRef = useRef<Point[]>([]);
  const [visible, setVisible] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);

  const rgb = useMemo(() => hexToRgb(color), [color]);
  const safeLength = clamp(trailLength, 8, 80);
  const smoothing = clamp(1 - inertia * 0.18, 0.06, 0.32);

  useEffect(() => {
    trailRef.current = Array.from({ length: safeLength }, () => ({ x: 0, y: 0 }));
    setPoints(trailRef.current.map((point) => ({ ...point })));
  }, [safeLength]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const host = overlay?.parentElement;
    if (!overlay || !host) return;

    const hideLater = () => {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, fadeDelayMs);
    };

    const updateTarget = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!inside) return;

      const point = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      targetPoint.current = point;
      lastKnownPoint.current = point;

      if (!visible) {
        trailRef.current = trailRef.current.map(() => ({ ...point }));
      }

      setVisible(true);
      hideLater();
    };

    const handleLeave = () => {
      hideLater();
    };

    const tick = () => {
      const trail = trailRef.current;

      if (trail.length > 0) {
        trail[0].x += (targetPoint.current.x - trail[0].x) * smoothing;
        trail[0].y += (targetPoint.current.y - trail[0].y) * smoothing;

        for (let index = 1; index < trail.length; index += 1) {
          trail[index].x += (trail[index - 1].x - trail[index].x) * (smoothing * 0.92);
          trail[index].y += (trail[index - 1].y - trail[index].y) * (smoothing * 0.92);
        }

        setPoints(trail.map((point) => ({ ...point })));
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    targetPoint.current = lastKnownPoint.current;
    animationFrameRef.current = window.requestAnimationFrame(tick);

    host.addEventListener("pointermove", updateTarget);
    host.addEventListener("pointerleave", handleLeave);

    return () => {
      host.removeEventListener("pointermove", updateTarget);
      host.removeEventListener("pointerleave", handleLeave);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      window.clearTimeout(fadeTimerRef.current);
    };
  }, [fadeDelayMs, smoothing, visible]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${fadeDurationMs}ms ease`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: grainIntensity,
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.14) 0 0.5px, transparent 0.6px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0 0.5px, transparent 0.6px)",
          backgroundSize: "18px 18px, 24px 24px",
          mixBlendMode: "screen",
        }}
      />

      {points.map((point, index) => {
        const progress = 1 - index / points.length;
        const size = 10 + progress * 52;
        const alpha = clamp(progress * brightness * 0.22, bloomThreshold, 0.7);
        const edgeAlpha = clamp(edgeIntensity * progress * 0.16, 0, 0.35);
        const blur = 6 + bloomRadius * 10 + (1 - progress) * 8;
        const glow = 8 + bloomStrength * 64 * progress;

        return (
          <div
            key={`${index}-${safeLength}`}
            className="absolute rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha}) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.45}) 42%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 78%)`,
              border: edgeAlpha
                ? `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${edgeAlpha})`
                : "none",
              filter: `blur(${blur}px)`,
              boxShadow: `0 0 ${glow}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.85})`,
              mixBlendMode: "screen",
              opacity: progress,
            }}
          />
        );
      })}
    </div>
  );
}
