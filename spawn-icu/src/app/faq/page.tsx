import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/Reveal";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about timelines, hosting, pricing, redesigns and support at Spawn."
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered."
        intro="What you might want to know before reaching out. Still curious? Just ask."
      />

      <Section className="pt-6">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs} />

          <Reveal>
            <div className="mt-12 rounded-xl2 border border-line bg-mist/50 p-8 text-center">
              <h2 className="display-h text-2xl font-semibold">Still have a question?</h2>
              <p className="mx-auto mt-2 max-w-md text-muted">
                Send it over and I will get back to you quickly.
              </p>
              <Link href="/start" className="btn btn-primary mt-6">
                Start a Project
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
