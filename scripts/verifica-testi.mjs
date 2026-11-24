// Verifica dei testi della home sull'HTML finale (testo visibile, aria-label e alt).
// Si usa da astro.config.mjs a fine build, oppure a mano: node scripts/verifica-testi.mjs dist/index.html
// In produzione (VERCEL_ENV=production) ogni violazione ferma la build; nelle anteprime è un avviso.
import fs from 'node:fs';

export const regole = [
  { nome: 'trattino lungo', re: /—/g },
  // Prezzi del prodotto: parole di listino o cifre in euro legate a un periodo o a un utente.
  // Le cifre fittizie dentro le interfacce disegnate (per esempio 2.775 €) non sono prezzi.
  { nome: 'prezzo', re: /\b(prezz[oi]|listino|canone|abbonament[oi]|a partire da)\b|€\s?\d[\d.,]*\s?(\/|al|a|per)\s?(mese|anno|utente|licenza)|\d[\d.,]*\s?€\s?(\/|al|a|per)\s?(mese|anno|utente|licenza)/gi },
  // Eccezione decisa il 24/11/2026: "Posta in arrivo" è il nome della cartella di Outlook nelle lastre
  // (prima schermata e scena, passo 1), non un annuncio di funzioni future. Si esclude solo la stringa
  // esatta, maiuscola compresa: "posta in arrivo" o "In arrivo" da soli fanno ancora scattare la regola.
  { nome: '"In arrivo"', re: /\bin arrivo\b/gi, eccezioni: ['Posta in arrivo'] },
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

// Vero se il risultato in posizione i fa parte di un'occorrenza esatta (maiuscole comprese) della stringa e.
function esattaIntorno(testo, i, lunghezza, e) {
  for (let k = Math.max(0, i - e.length); k <= i; k++) {
    if (testo.startsWith(e, k) && k + e.length >= i + lunghezza) return true;
  }
  return false;
}

export function verificaTesti(html) {
  const testo = testoVisibile(html);
  const trovati = [];
  for (const r of regole) {
    for (const m of testo.matchAll(r.re)) {
      const i = m.index ?? 0;
      if (r.eccezioni?.some((e) => esattaIntorno(testo, i, m[0].length, e))) continue;
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
