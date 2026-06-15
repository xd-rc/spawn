import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import PortfolioCard from "@/components/PortfolioCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A selection of custom websites built by Spawn across different industries."
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Websites built for real businesses."
        intro="A look at recent projects. Each one is a custom build, designed, developed and launched by Spawn. Hover a project to visit the site."
      />

      <Section className="pt-6">
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((p) => (
            <PortfolioCard key={p.name} project={p} />
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-xl2 border border-line bg-mist/50 p-8 text-center md:p-12">
            <h2 className="display-h text-2xl font-semibold md:text-3xl">
              Want something like this for your business?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Tell me what you have in mind and I will get back to you with a plan
              and a quote.
            </p>
            <Link href="/start" className="btn btn-primary mt-6">
              Start a Project
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
