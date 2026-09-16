import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio/kms";
  return {
    rules: {
      userAgent: "*",
      allow: `${basePath}/`,
    },
    sitemap: `https://min-ser.github.io${basePath}/sitemap.xml`,
  };
}
