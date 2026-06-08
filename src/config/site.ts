// ===========================================
// GLOBAL SITE CONFIGURATION
// Single source of truth — reads from src/content/settings/site.json
// Edit that JSON to update branding, location, colors, contact, etc.
// ===========================================

import siteData from "../content/settings/site.json";

const defaults = {
  business: {
    name: "Acme Marketing",
    fullName: "Acme Marketing",
    tagline: "Helping Businesses Get Noticed On Screens and Online",
    description:
      "Full-service local marketing agency offering indoor digital billboards, website design, SEO, PPC, and social media management.",
  },
  location: {
    city: "Denver",
    state: "CO",
    stateFull: "Colorado",
    address: "Denver, CO",
    fullAddress: "Denver, CO",
  },
  contact: {
    email: "hello@acme-marketing.example",
    phone: "9034201090",
    phoneFormatted: "903-420-1090",
  },
  colors: {
    primary: "#aaaaaa",
    secondary: "#cccccc",
    tertiary: "#888888",
    quaternary: "#f2eedf",
  },
  logo: {
    src: "/logo/linear-marketing-logo.svg",
    whiteSrc: "/logo/linear-marketing-logo-white.svg",
    alt: "Linear Marketing Logo",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },
  seo: {
    siteName: "Acme Marketing",
    defaultTitle: "Acme Marketing | Digital Signage and Marketing",
    titleTemplate: "%s | Acme Marketing",
    defaultDescription:
      "Full-service local marketing agency offering indoor digital billboards, website design, SEO, PPC, and social media management.",
    keywords: "digital marketing, indoor billboards, website design, SEO, PPC",
    siteUrl: "https://linear-marketing-template.vercel.app",
    ogImage: "/logo/linear-marketing-logo.svg",
    twitterHandle: "@acme-marketing",
  },
  legal: { lastUpdated: "" },
  integrations: { googleMapsEmbedUrl: "", recaptchaSiteKey: "" },
  popup: {
    image: "",
    badge: "Limited Time Offer",
    headline: "",
    description: "",
    benefits: [] as string[],
    trustIndicators: [] as string[],
    dismissText: "No thanks",
    floatingButtonText: "Ask for a Free Scan",
  },
  cta: { backgroundImage: "" },
  analytics: { googleAnalyticsId: "" },
};

// ─── URL Resolution Chain (Vercel-aware) ─────────────────────────────────────
function normalizeUrl(u: string | undefined | null): string | null {
  if (!u) return null;
  const t = String(u).trim();
  if (!t) return null;
  const withProto = /^https?:\/\//i.test(t) ? t : `https://${t}`;
  return withProto.replace(/\/+$/, "");
}

const env = import.meta.env as Record<string, string | undefined>;
const data = siteData as any;
const SETTINGS_URL =
  normalizeUrl(data.seo?.siteUrl) ?? normalizeUrl(defaults.seo.siteUrl);
const PLACEHOLDER =
  !SETTINGS_URL ||
  /example\.com$/.test(SETTINGS_URL) ||
  /\.vercel\.app$/.test(SETTINGS_URL);

const RESOLVED_SITE_URL =
  normalizeUrl(env.PUBLIC_SITE_URL) ||
  normalizeUrl(env.SITE_URL) ||
  (PLACEHOLDER
    ? normalizeUrl(env.VERCEL_PROJECT_PRODUCTION_URL) ||
      normalizeUrl(env.VERCEL_URL) ||
      SETTINGS_URL
    : SETTINGS_URL) ||
  "https://example.com";

export const siteConfig = {
  business: {
    name: data.business?.name || defaults.business.name,
    fullName: data.business?.fullName || defaults.business.fullName,
    tagline: data.business?.tagline || defaults.business.tagline,
    description: data.business?.description || defaults.business.description,
  },

  location: {
    city: data.location?.city || defaults.location.city,
    state: data.location?.state || defaults.location.state,
    stateFull: data.location?.stateFull || defaults.location.stateFull,
    address: data.location?.address || defaults.location.address,
    fullAddress: data.location?.fullAddress || defaults.location.fullAddress,
  },

  contact: {
    email: data.contact?.email || defaults.contact.email,
    phone: data.contact?.phone || defaults.contact.phone,
    phoneFormatted:
      data.contact?.phoneFormatted || defaults.contact.phoneFormatted,
  },

  colors: {
    primary: data.colors?.primary || defaults.colors.primary,
    secondary: data.colors?.secondary || defaults.colors.secondary,
    tertiary: data.colors?.tertiary || defaults.colors.tertiary,
    quaternary: data.colors?.quaternary || defaults.colors.quaternary,
  },

  logo: {
    src: data.logo?.src || defaults.logo.src,
    whiteSrc: data.logo?.whiteSrc || data.logo?.src || defaults.logo.whiteSrc,
    alt: data.logo?.alt || defaults.logo.alt,
  },

  social: {
    facebook: data.social?.facebook || "",
    instagram: data.social?.instagram || "",
    linkedin: data.social?.linkedin || "",
    twitter: data.social?.twitter || "",
    youtube: data.social?.youtube || "",
  },

  seo: {
    siteName: data.seo?.siteName || defaults.seo.siteName,
    defaultTitle: data.seo?.defaultTitle || defaults.seo.defaultTitle,
    titleTemplate: data.seo?.titleTemplate || defaults.seo.titleTemplate,
    defaultDescription:
      data.seo?.defaultDescription || defaults.seo.defaultDescription,
    keywords: data.seo?.keywords || defaults.seo.keywords,
    siteUrl: RESOLVED_SITE_URL,
    ogImage: data.seo?.ogImage || defaults.seo.ogImage,
    twitterHandle: data.seo?.twitterHandle || defaults.seo.twitterHandle,
  },

  legal: {
    lastUpdated: data.legal?.lastUpdated || defaults.legal.lastUpdated,
  },

  integrations: {
    googleMapsEmbedUrl:
      data.integrations?.googleMapsEmbedUrl ||
      defaults.integrations.googleMapsEmbedUrl,
    recaptchaSiteKey:
      data.integrations?.recaptchaSiteKey ||
      defaults.integrations.recaptchaSiteKey,
  },

  popup: {
    image: data.popup?.image ?? defaults.popup.image,
    badge: data.popup?.badge ?? defaults.popup.badge,
    headline: data.popup?.headline ?? defaults.popup.headline,
    description: data.popup?.description ?? defaults.popup.description,
    benefits: data.popup?.benefits ?? defaults.popup.benefits,
    trustIndicators: data.popup?.trustIndicators ?? defaults.popup.trustIndicators,
    dismissText: data.popup?.dismissText ?? defaults.popup.dismissText,
    floatingButtonText:
      data.popup?.floatingButtonText ?? defaults.popup.floatingButtonText,
  },

  cta: {
    backgroundImage: data.cta?.backgroundImage || defaults.cta.backgroundImage,
  },

  analytics: {
    googleAnalyticsId: data.analytics?.googleAnalyticsId || "",
  },
};

// ─── Legacy named exports (kept so existing imports keep working) ────────────
export const SITE_NAME = siteConfig.business.name;
export const SITE_URL = siteConfig.seo.siteUrl;
export const SITE_DESCRIPTION = siteConfig.seo.defaultDescription;

export const COMPANY_PHONE = siteConfig.contact.phoneFormatted;
export const COMPANY_EMAIL = siteConfig.contact.email;
export const COMPANY_ADDRESS = siteConfig.location.address;
export const COMPANY_CITY = siteConfig.location.city;
export const COMPANY_STATE = siteConfig.location.stateFull;
export const COMPANY_TAGLINE = siteConfig.business.tagline;

export const SOCIAL_LINKEDIN = siteConfig.social.linkedin;
export const SOCIAL_FACEBOOK = siteConfig.social.facebook;
export const SOCIAL_INSTAGRAM = siteConfig.social.instagram;
export const SOCIAL_YOUTUBE = siteConfig.social.youtube;

export const LEGAL_LAST_UPDATED = siteConfig.legal.lastUpdated;

export const GOOGLE_MAPS_EMBED_URL = siteConfig.integrations.googleMapsEmbedUrl;

// Clickable (non-embed) version of the map link, derived from the embed URL so
// it stays in sync with config. Falls back to a plain location search.
export const GOOGLE_MAPS_VIEW_URL = (() => {
  const embed = siteConfig.integrations.googleMapsEmbedUrl || "";
  // Custom "My Maps": /maps/d/embed?mid=... -> /maps/d/viewer?mid=...
  if (embed.includes("/maps/d/embed")) {
    return embed.replace("/maps/d/embed", "/maps/d/viewer");
  }
  if (embed) return embed;
  const query = [siteConfig.location?.city, siteConfig.location?.state]
    .filter(Boolean)
    .join(", ");
  return query
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    : "";
})();
export const RECAPTCHA_SITE_KEY = siteConfig.integrations.recaptchaSiteKey;

export const POPUP_CONFIG = siteConfig.popup;
export const CTA_BACKGROUND_IMAGE = siteConfig.cta.backgroundImage;

export function getPageTitle(pageTitle?: string): string {
  if (!pageTitle) return siteConfig.seo.defaultTitle;
  return siteConfig.seo.titleTemplate.replace("%s", pageTitle);
}

// ─── Token Replacement Helpers ──────────────────────────────────────────────
export function getLocationText(text: string): string {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{stateFull}", siteConfig.location.stateFull)
    .replaceAll("{business}", siteConfig.business.name)
    .replaceAll("{email}", siteConfig.contact.email)
    .replaceAll("{phone}", siteConfig.contact.phone)
    .replaceAll("{phoneFormatted}", siteConfig.contact.phoneFormatted);
}

// Recursively replace tokens in all string values of an object/array
export function localizeData<T>(data: T): T {
  if (typeof data === "string") return getLocationText(data) as T;
  if (Array.isArray(data)) return data.map((item) => localizeData(item)) as T;
  if (data !== null && typeof data === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = localizeData(value);
    }
    return result as T;
  }
  return data;
}

// Localize metadata block with optional extra tokens (e.g. {location})
export function localizeMetadata(
  meta: any,
  extras: Record<string, string> = {}
) {
  if (!meta) return meta;
  const apply = (s: string | undefined) => {
    if (!s) return s;
    let out = getLocationText(s);
    for (const [k, v] of Object.entries(extras)) {
      out = out.replaceAll(`{${k}}`, v);
    }
    return out;
  };
  return {
    ...meta,
    title: apply(meta.title),
    description: apply(meta.description),
    keywords: apply(meta.keywords),
  };
}

export default siteConfig;
