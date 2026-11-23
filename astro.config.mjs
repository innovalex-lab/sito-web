import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.innovalexai.it',
  output: 'static',
  // Le pagine di lavoro in /anteprima/ non devono mai entrare nella sitemap.
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/anteprima/') })],
  vite: { plugins: [tailwindcss()] },
});
