// Verifica dei contenuti della home. Gira durante la build (frontmatter della home)
// e, sul testo finale, in astro.config.mjs (scripts/verifica-testi.mjs).
// In produzione (VERCEL_ENV=production) ogni avviso fa fallire la build.
// Nelle anteprime la pagina si costruisce comunque e mostra gli avvisi.
import { ai, casoScln, funzioni, studio, usiEsistenti, type IdFunzione } from './funzioni';

export interface Avviso {
  dove: string;
  problema: string;
  esistente: boolean;
}

export const produzione = process.env.VERCEL_ENV === 'production';

function nonAttive(ids: readonly IdFunzione[]) {
  return ids.filter((id) => funzioni[id].stato !== 'attiva').map((id) => `${funzioni[id].nome} (${funzioni[id].stato})`);
}

export function avvisiContenuti(): Avviso[] {
  const avvisi: Avviso[] = [];
  const controlla = (dove: string, ids: readonly IdFunzione[], esistente: boolean) => {
    for (const n of nonAttive(ids)) avvisi.push({ dove, problema: `funzione non attiva presentata come disponibile: ${n}`, esistente });
  };
  for (const u of usiEsistenti) controlla(u.dove, u.funzioni, true);
  for (const b of studio) controlla(`Tutto lo studio, ${b.titolo}`, b.funzioni, false);
  for (const r of [...ai.legge, ...ai.daSolo]) controlla(`AI e automazioni, "${r.testo}"`, r.funzioni, false);
  for (const n of casoScln.numeri) {
    if (n.stato !== 'confermato') avvisi.push({ dove: 'Caso SCLN', problema: `dato da confermare: ${n.valore} ${n.etichetta}`, esistente: false });
  }
  return avvisi;
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
