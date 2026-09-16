# INNOVALEX website

Static landing page with Vercel serverless endpoints for lead collection.

## Development

```bash
npm install
npm run build
```

Open `index.html` for the static layout. API submissions require a local Vercel development server or the deployed domain.

## Checks

```bash
npm test
```

The production CSS is generated from `src/tailwind.css` into `assets/site.css`. Run `npm run build` after changing Tailwind utility classes.

Optimized image variants can be regenerated with:

```bash
python3 scripts/optimize-images.py
```
