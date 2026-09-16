import type { MetadataRoute } from "next";
import { getDocuments } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio/kms";
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || `https://min-ser.github.io${basePath}`).replace(/\/$/, "");
  const fixed = ["", "/profile", "/career", "/projects", "/github", "/expertise", "/training", "/archive"];
  const contentRoutes = [
    ...getDocuments("career").map((d) => `/career/${d.slug}`),
    ...getDocuments("project").map((d) => `/projects/${d.slug}`),
    ...getDocuments("expertise").map((d) => `/expertise/${d.slug}`),
  ];

  return [...fixed, ...contentRoutes].map((route) => ({
    url: `${origin}${route}/`,
  }));
}
