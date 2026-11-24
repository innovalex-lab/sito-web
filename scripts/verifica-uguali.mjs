// Confronto dei testi [=] con il sito attuale (index.html sul ramo main, letto con git show, senza checkout).
// uso: node scripts/verifica-uguali.mjs http://localhost:4329/   (oppure importa confrontaUguali nei test)
//
// Due fonti di testi [=]:
//   1. il piano (docs/PIANO-STORYLINE.md): le frasi tra virgolette sulle righe marcate [=], e sulle voci
//      rientrate sotto una riga [=] (per esempio le descrizioni dei tre sistemi nel calcolatore);
//   2. la pagina costruita: ogni elemento con l'attributo data-uguale.
// Per ognuna si controlla che ogni frase sia nel testo visibile di main. Per le frasi del piano si controlla
// anche che siano nella pagina; quelle del form della diagnosi (sezione 9) arrivano nella sessione 2.
//
// Il confronto ignora gli spazi, le virgolette, gli apostrofi e la punteggiatura (. , : ; ! ?): conta che
// le parole e i numeri siano gli stessi e nello stesso ordine. Le differenze si elencano, non si correggono.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const radice = new URL('..', import.meta.url);

export const normalizza = (t) =>
  t
    .normalize('NFC')
    .replace(/[\s  ]+/g, '')
    .replace(/["'“”‘’«»`]/g, '')
    .replace(/[.,:;!?]/g, '');

const entita = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', egrave: 'è', eacute: 'é', agrave: 'à', ograve: 'ò', ugrave: 'ù', igrave: 'ì', Egrave: 'È', euro: '€', times: '×', middot: '·', hellip: '…' };

// Testo di main: via script, stili e svg, poi i tag diventano spazi.
export function testoMain() {
  const html = execFileSync('git', ['show', 'origin/main:index.html'], { cwd: radice, encoding: 'utf8', maxBuffer: 2e7 });
  return html
    .replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) =>
      e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (entita[e] ?? m),
    );
}

// Frasi [=] del piano, con la sezione da cui vengono.
export function frasiPiano() {
  const righe = readFileSync(new URL('docs/PIANO-STORYLINE.md', radice), 'utf8').split('\n');
  const frasi = [];
  let sezione = '';
  let genitoreUguale = false;
  for (const [n, riga] of righe.entries()) {
    if (riga.startsWith('#')) sezione = riga.replace(/^#+\s*/, '');
    const rientrata = /^\s{2,}-/.test(riga);
    const marcata = /\[=\]/.test(riga.split('"')[0]);
    if (!rientrata) genitoreUguale = marcata;
    if (!(marcata || (rientrata && genitoreUguale))) continue;
    // Solo il primo blocco di citazioni: il resto della riga è commento del piano
    for (const m of riga.matchAll(/"([^"]+)"/g)) {
      for (const f of m[1].split(/(?<=[.!?])\s+/)) if (normalizza(f)) frasi.push({ riga: n + 1, sezione, frase: f });
    }
  }
  return frasi;
}

// Testi che arrivano con il form della diagnosi (sessione 2)
const sessione2 = (f) => f.sezione.startsWith('9.') && f.riga > 152;

export function confrontaUguali({ uguali, testoPagina }) {
  const main = normalizza(testoMain());
  const pagina = normalizza(testoPagina);
  const differenze = [];
  const attese = [];
  for (const f of frasiPiano()) {
    const n = normalizza(f.frase);
    if (!main.includes(n)) differenze.push(`piano riga ${f.riga} (${f.sezione}): diverso da main: "${f.frase}"`);
    if (!pagina.includes(n)) (sessione2(f) ? attese : differenze).push(`piano riga ${f.riga} (${f.sezione}): manca nella pagina: "${f.frase}"`);
  }
  for (const u of uguali) {
    for (const f of u.split(/(?<=[.!?])\s+/)) {
      if (normalizza(f) && !main.includes(normalizza(f))) differenze.push(`pagina, data-uguale: diverso da main: "${f.trim()}"`);
    }
  }
  return { frasi: frasiPiano().length, elementi: uguali.length, differenze, attese };
}

// Testo della pagina con uno spazio tra i nodi, compresi gli esiti nascosti (riuscito, errore)
export const leggiPagina = async (pagina) =>
  pagina.evaluate(() => {
    const testi = [];
    const giro = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement.closest('script,style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    while (giro.nextNode()) testi.push(giro.currentNode.nodeValue);
    return {
      testoPagina: testi.join(' '),
      uguali: [...document.querySelectorAll('[data-uguale]')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
    };
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  const { chromium } = await import('playwright');
  const url = process.argv[2] ?? 'http://localhost:4329/';
  const browser = await chromium.launch();
  const pagina = await browser.newPage();
  await pagina.goto(url, { waitUntil: 'domcontentloaded' });
  const esito = confrontaUguali(await leggiPagina(pagina));
  await browser.close();
  console.log(`Frasi [=] del piano: ${esito.frasi}. Elementi data-uguale nella pagina: ${esito.elementi}.`);
  console.log(esito.differenze.length ? `Differenze (${esito.differenze.length}):\n- ${esito.differenze.join('\n- ')}` : 'Nessuna differenza.');
  if (esito.attese.length) console.log(`Attese nella sessione 2 (${esito.attese.length}):\n- ${esito.attese.join('\n- ')}`);
  process.exit(esito.differenze.length ? 1 : 0);
}
