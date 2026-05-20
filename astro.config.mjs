// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import configIntegration from "./vendor/integration/index";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://ntv-template-1.vercel.app", // Update with your actual domain
  trailingSlash: "never", // Prevents duplicate URLs with and without trailing slashes
  integrations: [icon(), sitemap(), configIntegration()],
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
    ],
    // Enable image optimization
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": "/src",
      },
    },
    build: {
      // Inline small assets to reduce requests
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
    },
  },
  // Enable compression
  compressHTML: true,
});
