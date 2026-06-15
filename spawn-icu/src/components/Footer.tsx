import Link from "next/link";
import { navLinks, contact } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo kind="text" className="h-9 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Custom websites for real businesses. Hosting, domains, branding and
              support, all handled for you.
            </p>
            <Link href="/start" className="btn btn-primary mt-6">
              Start a Project
            </Link>
          </div>

          <div>
            <div className="eyebrow mb-4">Pages</div>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/start" className="text-muted transition-colors hover:text-ink">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={contact.phoneHref} className="font-medium text-ink transition-colors hover:opacity-70">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="text-muted transition-colors hover:text-ink">
                  {contact.email}
                </a>
              </li>
              <li className="text-muted">Mon–Fri, fast replies</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <span>© {year} Spawn. All rights reserved.</span>
          <span className="tracking-wide">Websites · Hosting · Support</span>
        </div>
      </div>
    </footer>
  );
}
