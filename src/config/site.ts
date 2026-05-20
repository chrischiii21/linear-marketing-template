// ===========================================
// SITE CONFIGURATION
// Reads from src/content/settings/site.json
// Edit settings via Pages CMS
// ===========================================

import siteData from '../content/settings/site.json';

export const siteConfig = {
  // Business Information
  business: {
    name: siteData.business?.name || "Dealer Template",
    fullName: siteData.business?.fullName || "Dealer Template",
    tagline: siteData.business?.tagline || "Your Trusted Marketing Partner",
    description: siteData.business?.description || "Premium marketing solutions in Denver, Colorado.",
  },

  // Location
  location: {
    city: siteData.location?.city || "Denver",
    state: siteData.location?.state || "Colorado",
    address: siteData.location?.address || "Denver, CO",
    fullAddress: siteData.location?.fullAddress || "Denver, CO",
  },

  // Contact
  contact: {
    email: siteData.contact?.email || "info@dealertemplate.com",
    phone: siteData.contact?.phone || "5555555555",
    phoneFormatted: siteData.contact?.phoneFormatted || "555-555-5555",
  },

  // Brand Colors (used in CSS variables)
  // primary = main brand color (dark shades auto-derived)
  // secondary = accent color
  // tertiary = eyebrow/highlight color (gold)
  // quaternary = light background color (white)
  colors: {
    primary: siteData.colors?.primary || "#0D2A63",
    secondary: siteData.colors?.secondary || "#F5BF3A",
    tertiary: siteData.colors?.tertiary || "#DDAE05",
    quaternary: siteData.colors?.quaternary || "#ffffff",
  },

  // Logo
  logo: {
    src: siteData.logo?.src || "/images/logo/dealer-logo.avif",
    alt: siteData.logo?.alt || "Dealer Template Logo",
  },

  // Social Media (optional)
  social: {
    facebook: siteData.social?.facebook || "",
    instagram: siteData.social?.instagram || "",
    linkedin: siteData.social?.linkedin || "",
    twitter: siteData.social?.twitter || "",
    youtube: siteData.social?.youtube || "",
  },

  // SEO
  seo: {
    siteName: siteData.seo?.siteName || "Dealer Template",
    defaultTitle: siteData.seo?.defaultTitle || "Dealer Template | Digital Marketing in Denver",
    defaultDescription: siteData.seo?.defaultDescription || "Denver marketing agency: web design, social media, indoor billboards & PPC.",
    keywords: siteData.seo?.keywords || "Denver marketing agency, digital marketing Denver",
    siteUrl: siteData.seo?.siteUrl || "https://ntv-template-1.vercel.app",
    ogImage: siteData.seo?.ogImage || "/favicon.svg",
    twitterHandle: siteData.seo?.twitterHandle || "@dealertemplate",
  },

  // Analytics
  analytics: {
    googleAnalyticsId: siteData.analytics?.googleAnalyticsId || "",
  },

  // Template Info (not editable via CMS)
  template: {
    id: "1",
    name: "Dealer Template 1",
  },
}

// Helper to get location-aware text
export function getLocationText(text: string) {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{business}", siteConfig.business.name)
}

// Recursively replace {city}, {state}, {business} in all string values of an object/array
export function localizeData<T>(data: T): T {
  if (typeof data === "string") return getLocationText(data) as T
  if (Array.isArray(data)) return data.map(item => localizeData(item)) as T
  if (data !== null && typeof data === "object") {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data)) {
      result[key] = localizeData(value)
    }
    return result as T
  }
  return data
}
