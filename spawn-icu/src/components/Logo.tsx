import Image from "next/image";

type Kind = "text" | "icon";

const assets = {
  text: {
    black: { src: "/brand/spawn-text-black.png", w: 677, h: 277 },
    white: { src: "/brand/spawn-text-white.png", w: 683, h: 280 }
  },
  icon: {
    black: { src: "/brand/spawn-icon-black.png", w: 584, h: 599 },
    white: { src: "/brand/spawn-icon-white.png", w: 1017, h: 1009 }
  }
} as const;

/**
 * Official Spawn brand asset, theme-aware.
 *
 * - `kind="text"` renders the Spawn wordmark, `kind="icon"` the S mark.
 * - By default it swaps black/white automatically with the active theme.
 * - Use `tone="black"` or `tone="white"` to force a single colour (e.g. a
 *   white logo on a dark accent panel in both themes).
 *
 * Size it with a Tailwind height class via `className` (e.g. `h-8 w-auto`).
 */
export default function Logo({
  kind = "text",
  tone = "auto",
  className = "h-8 w-auto",
  priority = false
}: {
  kind?: Kind;
  tone?: "auto" | "black" | "white";
  className?: string;
  priority?: boolean;
}) {
  const set = assets[kind];

  if (tone === "black" || tone === "white") {
    const a = set[tone];
    return (
      <Image src={a.src} width={a.w} height={a.h} alt="Spawn" priority={priority} className={className} />
    );
  }

  // Auto: black in light mode, white in dark mode.
  return (
    <>
      <Image
        src={set.black.src}
        width={set.black.w}
        height={set.black.h}
        alt="Spawn"
        priority={priority}
        className={`${className} block dark:hidden`}
      />
      <Image
        src={set.white.src}
        width={set.white.w}
        height={set.white.h}
        alt="Spawn"
        priority={priority}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
