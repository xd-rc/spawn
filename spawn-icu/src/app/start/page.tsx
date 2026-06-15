import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Logo from "@/components/Logo";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell Spawn about your project. Name, contact, service and a short message. Or call 717-750-7441."
};

export default function StartPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's build your website."
        intro="Fill out the form and it comes straight to me. Prefer to call or email? Use the details below."
      />

      <Section className="pt-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="rounded-xl2 border border-line bg-[#0a0a0a] p-7 text-white md:p-8">
                <Logo kind="icon" tone="white" className="h-11 w-auto" />
                <p className="mt-5 text-lg font-semibold">Reach me directly</p>
                <div className="mt-5 space-y-4">
                  <a href={contact.phoneHref} className="block rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <div className="text-xs uppercase tracking-widest text-white/50">Call or text</div>
                    <div className="mt-1 text-xl font-semibold">{contact.phone}</div>
                  </a>
                  <a href={contact.emailHref} className="block rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <div className="text-xs uppercase tracking-widest text-white/50">Email</div>
                    <div className="mt-1 text-xl font-semibold">{contact.email}</div>
                  </a>
                </div>
                <p className="mt-5 text-sm text-white/60">
                  Replies are fast. You talk to the person doing the work.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
