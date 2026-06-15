"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import TiltCard from "./TiltCard";

/**
 * Strong portfolio card: a large stylised website preview (stands in for a real
 * screenshot), category, included features and a Visit Website button.
 * Drop a real screenshot in by replacing the preview block with an <Image>.
 */
export default function PortfolioCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-paper shadow-soft transition-shadow duration-500 hover:shadow-float"
    >
      <TiltCard className="rounded-t-xl2" max={5} glare={false}>
        {/* Preview window */}
        <div className="relative aspect-[16/10] overflow-hidden" style={{ background: project.accent }}>
          {/* faux site content */}
          <div className="absolute inset-0 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold tracking-wide text-white/90">
                {project.name}
              </div>
              <div className="flex gap-1.5">
                <span className="h-1.5 w-6 rounded-full bg-white/25" />
                <span className="h-1.5 w-6 rounded-full bg-white/25" />
                <span className="h-1.5 w-6 rounded-full bg-white/60" />
              </div>
            </div>
            <div className="mt-7 h-3 w-2/3 rounded-full bg-white/85" />
            <div className="mt-2.5 h-3 w-2/5 rounded-full bg-white/45" />
            <div className="mt-5 flex gap-2">
              <span className="h-6 w-20 rounded-full bg-white" />
              <span className="h-6 w-16 rounded-full border border-white/40" />
            </div>
            <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2">
              <span className="h-10 rounded-lg bg-white/15" />
              <span className="h-10 rounded-lg bg-white/15" />
              <span className="h-10 rounded-lg bg-white/15" />
            </div>
          </div>

          {/* Hover overlay with Visit button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100">
            <Link
              href={project.url}
              className="translate-y-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-400 group-hover:translate-y-0"
            >
              Visit Website
            </Link>
          </div>
        </div>
      </TiltCard>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted">
            {project.category}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.features.map((f) => (
            <span key={f} className="rounded-full border border-line px-3 py-1 text-xs text-ink/75">
              {f}
            </span>
          ))}
        </div>

        <Link
          href={project.url}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-opacity hover:opacity-70"
        >
          Visit Website
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
