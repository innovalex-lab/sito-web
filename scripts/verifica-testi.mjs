// Verifica dei testi della home sull'HTML finale (testo visibile, aria-label e alt).
// Si usa da astro.config.mjs a fine build, oppure a mano: node scripts/verifica-testi.mjs dist/index.html
// In produzione (VERCEL_ENV=production) ogni violazione ferma la build; nelle anteprime è un avviso.
import fs from 'node:fs';

export const regole = [
  { nome: 'trattino lungo', re: /—/g },
  // Prezzi del prodotto: parole di listino o cifre in euro legate a un periodo o a un utente.
  // Le cifre fittizie dentro le interfacce disegnate (per esempio 2.775 €) non sono prezzi.
  { nome: 'prezzo', re: /\b(prezz[oi]|listino|canone|abbonament[oi]|a partire da)\b|€\s?\d[\d.,]*\s?(\/|al|a|per)\s?(mese|anno|utente|licenza)|\d[\d.,]*\s?€\s?(\/|al|a|per)\s?(mese|anno|utente|licenza)/gi },
  { nome: '"In arrivo"', re: /\bin arrivo\b/gi },
  { nome: '"agente AI"', re: /\bagent[ei]\s+(AI|IA)\b/gi },
  { nome: '"Germania"', re: /german[iy]a?\b/gi },
  { nome: '"Tavolo Fondatori"', re: /tavolo\s+fondatori/gi },
];

export function testoVisibile(html) {
  const attributi = [...html.matchAll(/\s(?:aria-label|alt|title)="([^"]*)"/g)].map((m) => m[1]);
  const corpo = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  return [corpo, ...attributi]
    .join(' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

export function verificaTesti(html) {
  const testo = testoVisibile(html);
  const trovati = [];
  for (const r of regole) {
    for (const m of testo.matchAll(r.re)) {
      const i = m.index ?? 0;
      trovati.push({ regola: r.nome, contesto: testo.slice(Math.max(0, i - 50), i + m[0].length + 50).trim() });
    }
  }
  return trovati;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2] ?? 'dist/index.html';
  const trovati = verificaTesti(fs.readFileSync(file, 'utf8'));
  for (const t of trovati) console.log(`- ${t.regola}: "...${t.contesto}..."`);
  console.log(trovati.length ? `${trovati.length} problemi nei testi di ${file}` : `Testi di ${file}: nessun problema`);
  process.exit(trovati.length ? 1 : 0);
}
