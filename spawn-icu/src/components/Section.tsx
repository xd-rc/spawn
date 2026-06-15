import type { ReactNode } from "react";

export default function Section({
  children,
  className = "",
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}
