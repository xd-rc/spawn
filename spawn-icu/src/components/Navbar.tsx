"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { navLinks, contact } from "@/lib/data";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/80"
            : "border-line bg-white/80 backdrop-blur-xl dark:border-transparent dark:bg-transparent dark:backdrop-blur-none"
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" aria-label="Spawn home" className="shrink-0">
            <Logo kind="text" className="h-7 w-auto md:h-8" priority />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group relative text-[13px] font-medium tracking-wide transition-colors ${
                    pathname === l.href ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-ink transition-transform duration-300 ${
                      pathname === l.href
                        ? "w-full scale-x-100"
                        : "w-full origin-left scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={contact.phoneHref}
              className="hidden text-[13px] font-medium text-muted transition-colors hover:text-ink xl:inline"
            >
              {contact.phone}
            </a>
            <ThemeToggle className="hidden sm:flex" />
            <Link href="/start" className="btn btn-primary hidden md:inline-flex">
              Start a Project
            </Link>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`h-[1.5px] w-6 bg-ink transition-all duration-300 ${open ? "w-0 opacity-0" : ""}`} />
              <span className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-ink" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-10 pt-24 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.05 }}
                >
                  <Link href={l.href} className="block border-b border-line py-4 text-2xl font-medium">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <Link href="/start" className="btn btn-primary mt-7 w-full">
              Start a Project
            </Link>

            <div className="mt-8 space-y-2 text-sm">
              <a href={contact.phoneHref} className="block font-medium text-ink">
                {contact.phone}
              </a>
              <a href={contact.emailHref} className="block text-muted">
                {contact.email}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <ThemeToggle />
              <span className="text-sm text-muted">Toggle dark mode</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
