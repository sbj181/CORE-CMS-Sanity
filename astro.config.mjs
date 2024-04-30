import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import icon from 'astro-icon';
import { loadEnv } from "vite";

// Load environment variables
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET
} = loadEnv(import.meta.env.MODE, process.cwd(), "");

const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    sanity({
      projectId,
      dataset,
      studioBasePath: '/admin',
      useCdn: false,
      apiVersion: '2023-03-20'
    }),
    react(),
    icon()
  ],
  buildOptions: {
    rollupOptions: {
      external: ['@sanity/client'] // Mark @sanity/client as external
    }
  }
});
