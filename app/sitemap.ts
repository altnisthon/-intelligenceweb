import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/posts";

const BASE_URL = "https://andintelligence.sg";

const STATIC_ROUTES = [
  "",
  "/trainings",
  "/dmit",
  "/how-it-works",
  "/about",
  "/faq",
  "/journal",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const postEntries = getPostSlugs().map((slug) => ({
    url: `${BASE_URL}/journal/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...postEntries];
}
