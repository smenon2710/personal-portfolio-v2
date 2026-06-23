import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://personal-portfolio-smenon2710.vercel.app/sitemap.xml",
  };
}
