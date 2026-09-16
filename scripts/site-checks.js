const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const failures = [];

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) failures.push(`Duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`);

const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
const missingAnchors = anchors.filter((anchor) => !ids.includes(anchor));
if (missingAnchors.length) failures.push(`Missing anchors: ${[...new Set(missingAnchors)].join(', ')}`);

if (html.includes('cdn.tailwindcss.com')) failures.push('Tailwind CDN must not be used in production');

const requiredAssets = [
  'assets/site.css',
  'assets/hero-studio-1600.avif',
  'assets/innovalex-logo-400.webp',
  'assets/federico-garau-founder-900.webp'
];
for (const asset of requiredAssets) {
  if (!fs.existsSync(path.join(root, asset))) failures.push(`Missing asset: ${asset}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Site checks passed: ${ids.length} unique ids, ${anchors.length} internal links.`);
