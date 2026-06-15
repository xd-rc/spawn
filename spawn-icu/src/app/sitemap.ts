import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://spawn.icu";
  const routes = ["", "/work", "/services", "/process", "/why", "/faq", "/start"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7
  }));
}
