export const contact = {
  phone: "717-750-7441",
  phoneHref: "tel:+17177507441",
  email: "dom@spawn.icu",
  emailHref: "mailto:dom@spawn.icu"
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Why Spawn", href: "/why" },
  { label: "FAQ", href: "/faq" }
];

export type Service = { title: string; blurb: string };

export const services: Service[] = [
  { title: "Website Development", blurb: "Custom websites built for your business." },
  { title: "Website Redesigns", blurb: "Give your old website a cleaner, newer look." },
  { title: "Hosting Setup", blurb: "Get your website online with reliable hosting." },
  { title: "VPS Management", blurb: "Server setup, updates and maintenance." },
  { title: "Domain Setup", blurb: "Connect your domain and make sure everything works correctly." },
  { title: "Contact Forms", blurb: "Simple forms that send leads directly to me." },
  { title: "Branding", blurb: "Logos, colors and visual identity." },
  { title: "Graphic Design", blurb: "Logos, menus, flyers and other visuals for your business." },
  { title: "Business Automation", blurb: "Small tools that save time and automate repetitive tasks." },
  { title: "Maintenance Plans", blurb: "Ongoing website updates and support." }
];

export type Project = {
  name: string;
  category: string;
  features: string[];
  url: string;
  accent: string;
};

export const projects: Project[] = [
  {
    name: "Atlas Studio",
    category: "Architecture",
    features: ["Custom design", "Project gallery", "Hosting"],
    url: "#",
    accent: "#101418"
  },
  {
    name: "Verdant Wellness",
    category: "Wellness & Spa",
    features: ["Online booking", "Branding", "Automation"],
    url: "#",
    accent: "#16241d"
  },
  {
    name: "Forge & Co.",
    category: "Manufacturing",
    features: ["Redesign", "VPS setup", "Contact forms"],
    url: "#",
    accent: "#1a1a1f"
  },
  {
    name: "Lumen Finance",
    category: "Finance",
    features: ["Custom build", "SEO", "Maintenance"],
    url: "#",
    accent: "#0e1726"
  },
  {
    name: "Saffron Table",
    category: "Restaurant",
    features: ["Menu & reservations", "Branding", "Hosting"],
    url: "#",
    accent: "#241712"
  },
  {
    name: "Northwind Gear",
    category: "Online Store",
    features: ["Storefront", "Automation", "Domain setup"],
    url: "#",
    accent: "#15201d"
  }
];

export type ProcessStep = { no: string; title: string; body: string };

export const processSteps: ProcessStep[] = [
  { no: "01", title: "Idea", body: "We talk about your business, your goals and what you need the site to do." },
  { no: "02", title: "Design", body: "You get a clean, custom design built around your brand, not a template." },
  { no: "03", title: "Build", body: "The site is built to be fast, easy to use and ready for search engines." },
  { no: "04", title: "Launch", body: "We handle hosting, your domain and going live so you do not have to." },
  { no: "05", title: "Support", body: "Ongoing updates, fixes and help whenever you need them." }
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  { q: "How long does a website take?", a: "Most sites take two to four weeks. Larger projects take a bit longer. You get a clear timeline before we start." },
  { q: "Do you handle hosting and domains?", a: "Yes. I can set up hosting, connect your domain and manage your server, so you have one person for all of it." },
  { q: "What does it cost?", a: "Every project is priced for what you actually need. Send a message and I will get back to you with a clear quote." },
  { q: "Can you redesign my current site?", a: "Yes. Redesigns are a core service. I keep what works, update the rest and move everything over without downtime." },
  { q: "Do you offer ongoing support?", a: "Yes. Maintenance plans cover updates, fixes and support on a simple monthly basis." },
  { q: "How do we get started?", a: "Use the contact form, call 717-750-7441, or email dom@spawn.icu. I will reply quickly to set up a call." }
];

export type ServiceType =
  | "Website"
  | "Website Redesign"
  | "Hosting"
  | "Graphic Design"
  | "Branding"
  | "Automation"
  | "Other";

export const serviceTypes: ServiceType[] = [
  "Website",
  "Website Redesign",
  "Hosting",
  "Graphic Design",
  "Branding",
  "Automation",
  "Other"
];
