import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { processSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Process",
  description: "How Spawn works: idea, design, build, launch and support."
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="From idea to launch."
        intro="A clear path with no surprises. You know what is happening at every step."
      />

      <Section className="pt-6">
        <ol className="space-y-6">
          {processSteps.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.04}>
              <li className="grid gap-5 rounded-xl2 border border-line bg-paper p-6 shadow-soft transition-shadow duration-500 hover:shadow-float md:grid-cols-[auto_1fr] md:p-8">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
                  {step.no}
                </div>
                <div>
                  <h2 className="display-h text-2xl font-semibold md:text-3xl">{step.title}</h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-14 text-center">
            <Link href="/start" className="btn btn-primary">
              Start a Project
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
