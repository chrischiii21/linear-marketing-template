declare module 'virtual:config' {
  export interface Config {
    site: {
      name: string;
      site: string;
      base: string;
      trailingSlash: boolean;
    };
    company?: {
      phone: string;
      email: string;
      address: string;
      city: string;
      state: string;
      tagline?: string;
    };
    social?: {
      linkedin?: string;
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
    metadata: {
      title: {
        default: string;
        template: string;
      };
      description: string;
      robots?: {
        index: boolean;
        follow: boolean;
      };
      openGraph?: {
        site_name?: string;
        images?: Array<{
          url: string;
          width?: number;
          height?: number;
        }>;
        type: string;
      };
      twitter?: {
        handle?: string;
        site?: string;
        cardType: string;
      };
    };
    legal?: {
      lastUpdated: string;
    };
    integrations?: {
      googleMapsEmbedUrl?: string;
      recaptchaSiteKey?: string;
    };
    popup?: {
      image?: string;
      badge?: string;
      headline?: string;
      description?: string;
      benefits?: string[];
      trustIndicators?: string[];
      dismissText?: string;
      floatingButtonText?: string;
    };
    cta?: {
      backgroundImage?: string;
    };
    i18n?: {
      language: string;
      textDirection: 'ltr' | 'rtl';
    };
    ui?: {
      theme: 'system' | 'light' | 'dark' | 'light:only' | 'dark:only';
    };
  }

  const config: Config;
  export default config;
}
