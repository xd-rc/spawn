"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion
} from "framer-motion";
import type { ReactNode } from "react";

/**
 * A 3D hover-tilt card. Tracks the pointer and rotates subtly in 3D space,
 * with a soft moving highlight. Falls back to a static card when the user
 * prefers reduced motion.
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
  glare = true
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), {
    stiffness: 150,
    damping: 18
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), {
    stiffness: 150,
    damping: 18
  });

  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }
      }
      className={`relative ${className}`}
    >
      {children}
      {glare && !reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.55), transparent 45%)`
            )
          }}
        />
      )}
    </motion.div>
  );
}
