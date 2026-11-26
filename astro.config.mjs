import { defineConfig } from 'astro/config';
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

// Anteprima del font dei titoli (fase 4, sessione 3): con ?titoli=classico i titoli della home passano a EB Garamond
// (@fontsource/eb-garamond, licenza SIL OFL 1.1), solo latino e solo il peso 400.
// Solo nelle build non di produzione: a fine build il font e la sua licenza si copiano in dist/anteprima/titoli/;
// con astro dev si servono dallo stesso indirizzo. In produzione non si copia nulla e la home non ha l'interruttore
// (src/pages/index.astro), quindi la build di produzione non contiene né il font né l'interruttore.
const fontTitoliClassici = {
  cartella: new URL('./node_modules/@fontsource/eb-garamond/', import.meta.url),
  file: { 'eb-garamond-latin-400-normal.woff2': 'files/eb-garamond-latin-400-normal.woff2', 'OFL.txt': 'LICENSE' },
};
const titoliClassici = {
  name: 'titoli-classici',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use('/anteprima/titoli/', (req, res, next) => {
        const origine = fontTitoliClassici.file[req.url.replace(/^\//, '').split('?')[0]];
        if (!origine) return next();
        res.setHeader('Content-Type', origine.endsWith('.woff2') ? 'font/woff2' : 'text/plain; charset=utf-8');
        fs.createReadStream(new URL(origine, fontTitoliClassici.cartella)).pipe(res);
      });
    },
    'astro:build:done': ({ dir, logger }) => {
      if (process.env.VERCEL_ENV === 'production') return;
      const destinazione = new URL('anteprima/titoli/', dir);
      fs.mkdirSync(destinazione, { recursive: true });
      for (const [nome, origine] of Object.entries(fontTitoliClassici.file)) {
        fs.copyFileSync(new URL(origine, fontTitoliClassici.cartella), new URL(nome, destinazione));
      }
      logger.info('Anteprima dei titoli con EB Garamond: /?titoli=classico');
    },
  },
};

export default defineConfig({
  site: 'https://www.innovalexai.it',
  output: 'static',
  // Le pagine di lavoro in /anteprima/ non devono mai entrare nella sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/anteprima/') }), verificaContenuti, titoliClassici],
  vite: { plugins: [tailwindcss()] },
});
