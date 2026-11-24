// Verifica dei contenuti della home. Gira durante la build (frontmatter della home)
// e, sul testo finale, in astro.config.mjs (scripts/verifica-testi.mjs).
// In produzione (VERCEL_ENV=production) ogni avviso fa fallire la build.
// Nelle anteprime la pagina si costruisce comunque e mostra gli avvisi.
import { ai, casoScln, funzioni, studio, type IdFunzione } from './funzioni';
import * as storia from './storia';

export interface Avviso {
  dove: string;
  problema: string;
  esistente: boolean;
}

export const produzione = process.env.VERCEL_ENV === 'production';

/** Tutte le frasi della storyline che citano funzioni: ogni oggetto con un testo e un elenco `funzioni`. */
export function frasiConFunzioni(): { dove: string; testo: string; funzioni: readonly IdFunzione[] }[] {
  const trovate: { dove: string; testo: string; funzioni: readonly IdFunzione[] }[] = [];
  const visita = (x: unknown, dove: string) => {
    if (Array.isArray(x)) return x.forEach((y, i) => visita(y, `${dove}[${i}]`));
    if (!x || typeof x !== 'object') return;
    const o = x as Record<string, unknown>;
    if (Array.isArray(o.funzioni)) {
      const testo = [o.nome, o.titolo, o.etichetta, o.cifra, o.testo ?? o.frase].filter((t) => typeof t === 'string').join(': ');
      trovate.push({ dove, testo, funzioni: o.funzioni as IdFunzione[] });
    }
    for (const [k, v] of Object.entries(o)) if (k !== 'funzioni') visita(v, `${dove}.${k}`);
  };
  for (const [nome, valore] of Object.entries(storia)) visita(valore, nome);
  return trovate;
}

function nonAttive(ids: readonly IdFunzione[]) {
  return ids.filter((id) => funzioni[id].stato !== 'attiva').map((id) => `${funzioni[id].nome} (${funzioni[id].stato})`);
}

export function avvisiContenuti(): Avviso[] {
  const avvisi: Avviso[] = [];
  const controlla = (dove: string, ids: readonly IdFunzione[], esistente: boolean) => {
    for (const n of nonAttive(ids)) avvisi.push({ dove, problema: `funzione non attiva presentata come disponibile: ${n}`, esistente });
  };
  for (const f of frasiConFunzioni()) controlla(`${f.dove}, "${f.testo.slice(0, 60)}"`, f.funzioni, false);
  for (const b of studio) controlla(`Tutto lo studio, ${b.titolo}`, b.funzioni, false);
  for (const r of [...ai.legge, ...ai.daSolo]) controlla(`AI e automazioni, "${r.testo}"`, r.funzioni, false);
  for (const n of casoScln.numeri) {
    if (n.stato !== 'confermato') avvisi.push({ dove: 'Caso SCLN', problema: `dato da confermare: ${n.valore} ${n.etichetta} (fonte: ${n.fonte})`, esistente: false });
  }
  const c = casoScln.citazione;
  if (c.stato !== 'confermato') avvisi.push({ dove: 'Caso SCLN', problema: `citazione da confermare (fonte: ${c.fonte})`, esistente: false });
  return avvisi;
}

/** Dati del caso SCLN già confermati, con la loro fonte. Non generano avvisi. */
export function datiConfermati() {
  return [
    ...casoScln.numeri.filter((n) => n.stato === 'confermato').map((n) => ({ dato: `${n.valore} ${n.etichetta}`, fonte: n.fonte })),
    ...(casoScln.citazione.stato === 'confermato'
      ? [{ dato: `citazione di ${casoScln.citazione.autore}, ${casoScln.citazione.ente}`, fonte: casoScln.citazione.fonte }]
      : []),
  ];
}

export function verificaPerBuild(): Avviso[] {
  const avvisi = avvisiContenuti();
  if (avvisi.length && produzione) {
    throw new Error(
      `Verifica contenuti: ${avvisi.length} problemi, la build di produzione si ferma.\n` +
        avvisi.map((a) => `- ${a.dove}: ${a.problema}`).join('\n'),
    );
  }
  return avvisi;
}
