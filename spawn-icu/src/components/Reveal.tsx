"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 }
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div"
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const o = offsets[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : o.x, y: reduce ? 0 : o.y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
    }
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
