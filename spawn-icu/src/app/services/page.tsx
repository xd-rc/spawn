import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import { StaggerGroup, StaggerItem } from "@/components/Stagger";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, redesigns, hosting, VPS management, domains, contact forms, branding, automation and maintenance."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your website needs."
        intro="From the first design to the server it runs on, Spawn handles the whole thing."
      >
        <div className="mt-8">
          <Link href="/start" className="btn btn-primary">
            Start a Project
          </Link>
        </div>
      </PageHero>

      <Section className="pt-6">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.title}>
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
    </>
  );
}
