import Link from "next/link";
import { contact } from "@/lib/data";
import Logo from "./Logo";
import Reveal from "./Reveal";

export default function ContactBand() {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[#0a0a0a] px-8 py-14 text-white md:px-14 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
              <div>
                <Logo kind="icon" tone="white" className="mb-6 h-12 w-auto" />
                <h2 className="display-h text-[clamp(1.9rem,4vw,3rem)] font-semibold">
                  Ready to get your business online?
                </h2>
                <p className="mt-4 max-w-md text-white/70">
                  Tell me what you need and I will get back to you fast. Call,
                  email, or send the form. Whatever is easiest for you.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/start" className="btn bg-white text-[#0a0a0a] hover:-translate-y-0.5">
                    Start a Project
                  </Link>
                  <Link href="/work" className="btn border border-white/30 text-white hover:bg-white/10">
                    View Our Work
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={contact.phoneHref}
                  className="block rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xs uppercase tracking-widest text-white/50">Call or text</div>
                  <div className="mt-1 text-xl font-semibold">{contact.phone}</div>
                </a>
                <a
                  href={contact.emailHref}
                  className="block rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xs uppercase tracking-widest text-white/50">Email</div>
                  <div className="mt-1 text-xl font-semibold">{contact.email}</div>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
