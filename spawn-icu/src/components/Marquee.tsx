"use client";

const items = [
  "Custom Websites",
  "Redesigns",
  "Hosting",
  "VPS Management",
  "Branding",
  "Automation",
  "SEO",
  "Maintenance"
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.18em] text-muted"
          >
            {t}
            <span className="text-line">/</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
