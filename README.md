# INNOVALEX website

Sito Astro statico con funzioni serverless Vercel per i contatti.

## Development

Serve Node 22.23.4 o superiore.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Le funzioni in `api/` girano su Vercel. Le pagine `/contratti`, `/robots.txt` e `/sitemap.xml` non sono in questo repo: vedi `docs/PIANO-RIFACIMENTO-SITO.md`.

## Checks

```bash
npm test
```

Le prove in `scripts/legacy` controllano il vecchio `index.html`, conservato nella stessa cartella.
