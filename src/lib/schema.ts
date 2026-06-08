// ============================================
// SCHEMA.ORG HELPERS
// Build JSON-LD structured data objects from
// site config + page-level content.
// ============================================

import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_CITY,
  COMPANY_STATE,
  SOCIAL_LINKEDIN,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_YOUTUBE,
  siteConfig,
} from "../config/site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const LOGO_URL = `${SITE_URL}${siteConfig.logo.src}`;

const stripE164 = (raw: string) => {
  const digits = (raw || "").replace(/\D/g, "");
  if (!digits) return undefined;
  return digits.startsWith("1") ? `+${digits}` : `+1${digits}`;
};

const sameAs = [SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN, SOCIAL_YOUTUBE].filter(Boolean);

const phoneE164 = stripE164(COMPANY_PHONE);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    description: SITE_DESCRIPTION,
    ...(phoneE164 && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phoneE164,
        email: COMPANY_EMAIL || undefined,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "en",
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: LOGO_URL,
    description: SITE_DESCRIPTION,
    ...(phoneE164 && { telephone: phoneE164 }),
    ...(COMPANY_EMAIL && { email: COMPANY_EMAIL }),
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS,
      addressLocality: COMPANY_CITY,
      addressRegion: COMPANY_STATE,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: COMPANY_CITY,
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function webPageSchema(opts: {
  url: string;
  name: string;
  description?: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";
}) {
  const { url, name, description, type = "WebPage" } = opts;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description && { description }),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

const stripHtml = (input: string) =>
  (input || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripHtml(f.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(f.answer),
      },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description?: string;
  url: string;
  serviceType?: string;
  areaServed?: string;
}) {
  const { name, description, url, serviceType, areaServed } = opts;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    ...(description && { description }),
    url,
    provider: { "@id": ORG_ID },
    ...(serviceType && { serviceType }),
    areaServed: {
      "@type": "City",
      name: areaServed || COMPANY_CITY,
    },
  };
}

export function locationBusinessSchema(opts: {
  url: string;
  city: string;
  state?: string;
  description?: string;
}) {
  const { url, city, state, description } = opts;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: `${SITE_NAME} — ${city}`,
    url,
    image: LOGO_URL,
    ...(description && { description }),
    ...(phoneE164 && { telephone: phoneE164 }),
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state || COMPANY_STATE,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city,
    },
    parentOrganization: { "@id": ORG_ID },
  };
}

export function contactPageSchema(url: string, name: string, description?: string) {
  return {
    ...webPageSchema({ url, name, description, type: "ContactPage" }),
    mainEntity: { "@id": ORG_ID },
  };
}
