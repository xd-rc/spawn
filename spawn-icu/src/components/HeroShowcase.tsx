"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Custom hero showcase: a website assembling itself, on loop.
 * Blank page -> Spawn mark -> navigation -> hero -> service cards -> launched.
 * Communicates the Spawn workflow: Idea -> Design -> Build -> Launch.
 */

const PHASES = ["Idea", "Design", "Build", "Launch"] as const;
// Which phase is active at each step (0..5).
const stepPhase = [0, 0, 1, 2, 2, 3];
const STEP_MS = 1250;
const TOTAL_STEPS = 6;

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroShowcase() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 5 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % TOTAL_STEPS), STEP_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const show = (from: number) => step >= from;
  const phase = stepPhase[step];

  return (
    <div className="relative mx-auto w-full max-w-[560px] [perspective:1600px]">
      {/* Floating S badge for depth */}
      <motion.div
        className="absolute -left-4 top-6 z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-paper shadow-card sm:-left-7"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={reduce ? { duration: 0.6, ease } : { y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 }, scale: { duration: 0.6 } }}
      >
        <Image src="/brand/spawn-icon-black.png" width={584} height={599} alt="" className="h-8 w-auto dark:hidden" />
        <Image src="/brand/spawn-icon-white.png" width={1017} height={1009} alt="" className="hidden h-8 w-auto dark:block" />
      </motion.div>

      {/* The assembling page */}
      <motion.div
        className="relative overflow-hidden rounded-[1.6rem] border border-line bg-paper shadow-float"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 36, rotateX: 8, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: 6, rotateY: -7 }}
        transition={{ duration: 0.9, ease }}
      >
        {/* faint working grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />

        <div className="relative aspect-[4/3.05] p-5 sm:p-6">
          {/* NAV (step >= 2) */}
          <div className="flex h-7 items-center justify-between">
            <AnimatePresence>
              {show(2) && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex items-center"
                >
                  <Image src="/brand/spawn-text-black.png" width={677} height={277} alt="" className="h-4 w-auto dark:hidden" />
                  <Image src="/brand/spawn-text-white.png" width={683} height={280} alt="" className="hidden h-4 w-auto dark:block" />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {show(2) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  className="flex gap-2"
                >
                  <span className="h-1.5 w-7 rounded-full bg-mist" />
                  <span className="h-1.5 w-7 rounded-full bg-mist" />
                  <span className="h-1.5 w-7 rounded-full bg-ink" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Centered mark before assembly (step 1 only) */}
          <AnimatePresence>
            {step >= 1 && step < 2 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease }}
              >
                <Image src="/brand/spawn-icon-black.png" width={584} height={599} alt="" className="h-20 w-auto dark:hidden" />
                <Image src="/brand/spawn-icon-white.png" width={1017} height={1009} alt="" className="hidden h-20 w-auto dark:block" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO block (step >= 3) */}
          <div className="mt-7">
            <AnimatePresence>
              {show(3) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <div className="h-3.5 w-3/4 rounded-full bg-ink" />
                  <div className="mt-2.5 h-3.5 w-1/2 rounded-full bg-ink/70" />
                  <div className="mt-4 h-2 w-2/3 rounded-full bg-mist" />
                  <div className="mt-5 flex gap-2">
                    <span className="h-6 w-24 rounded-full bg-ink" />
                    <span className="h-6 w-20 rounded-full border border-line" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SERVICE CARDS (step >= 4) */}
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
            <AnimatePresence>
              {show(4) && (
                <motion.div
                  className="grid grid-cols-3 gap-2.5"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } }
                      }}
                      className="rounded-xl border border-line bg-paper p-2.5 shadow-soft"
                    >
                      <div className="mb-2 flex h-5 w-5 items-center justify-center rounded-md bg-ink">
                        <Image src="/brand/spawn-icon-white.png" width={1017} height={1009} alt="" className="block h-3 w-auto dark:hidden" />
                        <Image src="/brand/spawn-icon-black.png" width={584} height={599} alt="" className="hidden h-3 w-auto dark:block" />
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-mist" />
                      <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-mist" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Launched check (step 5) */}
          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                className="absolute right-5 top-9 z-10 flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[10px] font-semibold text-paper sm:right-6"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4 10-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Launched
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Phase tracker */}
      <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3">
        {PHASES.map((p, i) => {
          const active = i === phase;
          const done = i < phase;
          return (
            <div key={p} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    active || done ? "bg-ink" : "bg-line"
                  }`}
                />
                <span
                  className={`text-[11px] font-medium tracking-wide transition-colors duration-300 sm:text-xs ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {p}
                </span>
              </div>
              {i < PHASES.length - 1 && (
                <span className="h-px w-4 bg-line sm:w-6" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
