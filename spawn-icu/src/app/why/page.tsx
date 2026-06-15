import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { StaggerGroup, StaggerItem } from "@/components/Stagger";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Why Spawn",
  description:
    "Custom work, one point of contact, fast sites, clear communication and real support after launch."
};

const reasons = [
  { title: "Custom, not templates", body: "Every site is designed around your business. No drag and drop sameness." },
  { title: "One person, start to finish", body: "Design, build, hosting, domains and support. You deal with one person for all of it." },
  { title: "Fast and easy to find", body: "Clean code and good setup mean quick load times and better search results." },
  { title: "Clear communication", body: "Simple updates and clear timelines. You always know where things stand." },
  { title: "Support after launch", body: "Updates, fixes and help whenever you need them. I do not disappear after launch." },
  { title: "Easy to reach", body: "Call, text or email. Replies are fast and you talk to the person doing the work." }
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Spawn"
        title="A web studio that actually picks up the phone."
        intro="The difference between a website and a website that works is care. Here is what you get with Spawn."
      />

      <Section className="pt-6">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="flex h-full flex-col rounded-xl2 border border-line bg-paper p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
                <h2 className="text-lg font-semibold">{r.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal>
          <div className="mt-12 text-center">
            <Link href="/start" className="btn btn-primary">
              Start a Project
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
