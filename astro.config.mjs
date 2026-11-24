import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { verificaTesti } from './scripts/verifica-testi.mjs';

// Controllo dei testi della home a fine build: in produzione ferma il deploy, in anteprima avvisa.
// Lo stato delle funzioni e i dati "da confermare" si controllano già nella pagina (src/content/verifica.ts).
const verificaContenuti = {
  name: 'verifica-contenuti',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const file = fileURLToPath(new URL('index.html', dir));
      if (!fs.existsSync(file)) return;
      const trovati = verificaTesti(fs.readFileSync(file, 'utf8'));
      if (!trovati.length) return logger.info('Testi della home: nessun problema.');
      const elenco = trovati.map((t) => `- ${t.regola}: "...${t.contesto}..."`).join('\n');
      if (process.env.VERCEL_ENV === 'production') {
        throw new Error(`Testi della home: ${trovati.length} problemi, la build di produzione si ferma.\n${elenco}`);
      }
      logger.warn(`Testi della home: ${trovati.length} avvisi (in produzione fermerebbero la build).\n${elenco}`);
    },
  },
};

export default defineConfig({
  site: 'https://www.innovalexai.it',
  output: 'static',
  // Le pagine di lavoro in /anteprima/ non devono mai entrare nella sitemap.
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/anteprima/') }), verificaContenuti],
  vite: { plugins: [tailwindcss()] },
});
