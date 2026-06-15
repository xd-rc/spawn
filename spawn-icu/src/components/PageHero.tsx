import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-8 pt-28 md:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="shell">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display-h mt-4 max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] font-semibold">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {intro}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={0.18}>{children}</Reveal>}
      </div>
    </section>
  );
}
