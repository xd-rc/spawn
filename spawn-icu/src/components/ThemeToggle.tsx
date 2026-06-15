"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("spawn-theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={dark}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-mist ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && dark ? (
          <motion.svg
            key="moon"
            initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ opacity: 0, rotate: 40, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -40, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              const x1 = 12 + Math.cos(a) * 7.2;
              const y1 = 12 + Math.sin(a) * 7.2;
              const x2 = 12 + Math.cos(a) * 9.4;
              const y2 = 12 + Math.sin(a) * 9.4;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              );
            })}
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
