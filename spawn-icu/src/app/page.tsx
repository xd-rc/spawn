import Link from "next/link";
import HeroShowcase from "@/components/HeroShowcase";
import Reveal from "@/components/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/Stagger";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import ContactBand from "@/components/ContactBand";
import { services, projects, processSteps, contact } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="shell grid items-center gap-14 pb-20 md:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Web studio</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-h mt-5 text-[clamp(2.6rem,6.2vw,4.8rem)] font-semibold">
                Custom websites for real businesses.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Spawn builds clean, fast websites and handles the rest, hosting,
                domains, branding and support. You focus on your business. I keep
                it online.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/start" className="btn btn-primary">
                  Start a Project
                </Link>
                <Link href="/work" className="btn btn-ghost">
                  View Our Work
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="text-muted">Get in touch:</span>
                <a href={contact.phoneHref} className="font-medium text-ink hover:opacity-70">
                  {contact.phone}
                </a>
                <a href={contact.emailHref} className="font-medium text-ink hover:opacity-70">
                  {contact.email}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">What I do</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-h mt-3 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-semibold">
                Everything your website needs.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/services" className="btn btn-ghost shrink-0">
              All Services
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <StaggerItem key={s.title}>
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* WORK */}
      <Section className="bg-mist/40">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">Our work</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-h mt-3 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-semibold">
                Recent websites.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/work" className="btn btn-ghost shrink-0">
              View Portfolio
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <PortfolioCard key={p.name} project={p} />
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
        <Reveal>
          <span className="eyebrow">How it works</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-h mt-3 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-semibold">
            A simple process, start to finish.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <StaggerItem key={step.no}>
              <div className="h-full rounded-xl2 border border-line bg-paper p-6 shadow-soft transition-transform duration-500 hover:-translate-y-1">
                <div className="display-h text-3xl text-muted/40">{step.no}</div>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Link href="/process" className="btn btn-ghost">
              See the full process
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* CONTACT */}
      <ContactBand />
    </>
  );
}
