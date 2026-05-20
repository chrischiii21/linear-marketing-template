// ============================================
// GLOBAL SITE CONFIGURATION
// This file reads from src/config.yaml
// Edit config.yaml to update your brand globally
// ============================================

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// Read and parse config.yaml
const configPath = path.join(process.cwd(), "src", "config.yaml");
const configFile = fs.readFileSync(configPath, "utf8");
const config = yaml.load(configFile) as any;

// Site
export const SITE_NAME: string = config.site.name;
export const SITE_URL: string = config.site.site;
export const SITE_DESCRIPTION: string = config.metadata.description;

// Company
export const COMPANY_PHONE: string = config.company?.phone ?? "";
export const COMPANY_EMAIL: string = config.company?.email ?? "";
export const COMPANY_ADDRESS: string = config.company?.address ?? "";
export const COMPANY_CITY: string = config.company?.city ?? "";
export const COMPANY_STATE: string = config.company?.state ?? "";
export const COMPANY_TAGLINE: string = config.company?.tagline ?? "";

// Social
export const SOCIAL_LINKEDIN: string = config.social?.linkedin ?? "";
export const SOCIAL_FACEBOOK: string = config.social?.facebook ?? "";
export const SOCIAL_INSTAGRAM: string = config.social?.instagram ?? "";
export const SOCIAL_YOUTUBE: string = config.social?.youtube ?? "";

// Legal
export const LEGAL_LAST_UPDATED: string = config.legal?.lastUpdated ?? "";

// Integrations
export const GOOGLE_MAPS_EMBED_URL: string = config.integrations?.googleMapsEmbedUrl ?? "";
export const RECAPTCHA_SITE_KEY: string = config.integrations?.recaptchaSiteKey ?? "";

// Popup
export const POPUP_CONFIG = {
  image: config.popup?.image ?? "",
  badge: config.popup?.badge ?? "Limited Time Offer",
  headline: config.popup?.headline ?? "",
  description: config.popup?.description ?? "",
  benefits: config.popup?.benefits ?? [] as string[],
  trustIndicators: config.popup?.trustIndicators ?? [] as string[],
  dismissText: config.popup?.dismissText ?? "No thanks",
  floatingButtonText: config.popup?.floatingButtonText ?? "Ask for a Free Scan",
};

// CTA
export const CTA_BACKGROUND_IMAGE: string = config.cta?.backgroundImage ?? "";

export function getPageTitle(pageTitle?: string): string {
  if (!pageTitle) return config.metadata.title.default;
  return config.metadata.title.template.replace("%s", pageTitle);
}

// Replace {city}, {state}, {business} placeholders in a string
export function getLocationText(text: string): string {
  return text
    .replaceAll("{city}", COMPANY_CITY)
    .replaceAll("{state}", COMPANY_STATE)
    .replaceAll("{business}", SITE_NAME);
}

// Recursively replace {city}, {state}, {business} in all string values of an object/array
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

export default config;
