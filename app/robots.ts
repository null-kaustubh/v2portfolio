import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";

/**
 * AI / LLM crawlers explicitly allowed to read and cite this site.
 * Listing them separately matters: several of these agents ignore the
 * wildcard group and only obey a rule that names their user-agent.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "Bytespider",
  "DuckAssistBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "YouBot",
  "CCBot",
  "Diffbot",
  "ImagesiftBot",
  "Timpibot",
  "AI2Bot",
  "Kangaroo Bot",
  "PanguBot",
  "Webzio-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_INFO.url}/sitemap.xml`,
    host: SITE_INFO.url,
  };
}
