import { z } from 'astro/zod';

const configSchema = z.object({
  site: z.object({
    name: z.string(),
    site: z.string().url(),
    base: z.string().default('/'),
    trailingSlash: z.boolean().default(false),
  }),
  company: z.object({
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    tagline: z.string().optional(),
  }).optional(),
  social: z.object({
    linkedin: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }).optional(),
  metadata: z.object({
    title: z.object({
      default: z.string(),
      template: z.string().default('%s'),
    }),
    description: z.string(),
    robots: z.object({
      index: z.boolean().default(true),
      follow: z.boolean().default(true),
    }).optional(),
    openGraph: z.object({
      site_name: z.string().optional(),
      images: z.array(z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      })).optional(),
      type: z.string().default('website'),
    }).optional(),
    twitter: z.object({
      handle: z.string().optional(),
      site: z.string().optional(),
      cardType: z.string().default('summary_large_image'),
    }).optional(),
  }),
  legal: z.object({
    lastUpdated: z.string(),
  }).optional(),
  integrations: z.object({
    googleMapsEmbedUrl: z.string().url().optional(),
    recaptchaSiteKey: z.string().optional(),
  }).optional(),
  popup: z.object({
    image: z.string().optional(),
    badge: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    benefits: z.array(z.string()).optional(),
    trustIndicators: z.array(z.string()).optional(),
    dismissText: z.string().optional(),
    floatingButtonText: z.string().optional(),
  }).optional(),
  cta: z.object({
    backgroundImage: z.string().optional(),
  }).optional(),
  i18n: z.object({
    language: z.string().default('en'),
    textDirection: z.enum(['ltr', 'rtl']).default('ltr'),
  }).optional(),
  ui: z.object({
    theme: z.enum(['system', 'light', 'dark', 'light:only', 'dark:only']).default('system'),
  }).optional(),
});

export type Config = z.infer<typeof configSchema>;

export const validateConfig = (config: unknown): Config => {
  return configSchema.parse(config);
};
