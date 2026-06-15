import Image from "next/image";
import type { Service } from "@/lib/data";

/** Clean service card with the Spawn S icon as the accent. */
export default function ServiceCard({
  service,
  index
}: {
  service: Service;
  index?: number;
}) {
  return (
    <div className="group flex h-full flex-col rounded-xl2 border border-line bg-paper p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink">
          <Image src="/brand/spawn-icon-white.png" width={1017} height={1009} alt="" className="block h-6 w-auto dark:hidden" />
          <Image src="/brand/spawn-icon-black.png" width={584} height={599} alt="" className="hidden h-6 w-auto dark:block" />
        </div>
        {typeof index === "number" && (
          <span className="display-h text-2xl text-muted/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.blurb}</p>
    </div>
  );
}
