// Formula del calcolatore, identica a main (index.html, updateROI):
//   ore perse all'anno = ore al giorno x 220 x avvocati; al mese = ore al giorno x 22 x avvocati
//   quota recuperata = somma delle quote dei sistemi scelti, al massimo 0,93
//   valore = ore recuperate x tariffa
// Usata dal rendering della pagina (valori iniziali) e da src/scripts/calcolatore.ts.

export interface Ingresso {
  ore: number;
  tariffa: number;
  avvocati: number;
  quote: number[];
}

export interface Esito {
  quota: number;
  sistemi: number;
  annuale: number;
  mensile: number;
  oreMese: number;
  oreGiorno: number;
}

export const MASSIMO = 0.93;
export const GIORNI_ANNO = 220;
export const GIORNI_MESE = 22;

export function calcola({ ore, tariffa, avvocati, quote }: Ingresso): Esito {
  const quota = Math.min(quote.reduce((a, b) => a + b, 0), MASSIMO);
  const oreAnno = ore * GIORNI_ANNO * avvocati * quota;
  const oreMese = ore * GIORNI_MESE * avvocati * quota;
  return {
    quota,
    sistemi: quote.length,
    annuale: Math.max(0, oreAnno * tariffa),
    mensile: oreMese * tariffa,
    oreMese,
    oreGiorno: ore * quota,
  };
}

const formatoEuro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export const euro = (v: number) => formatoEuro.format(v);

const numero = (v: number) => String(v).replace('.', ',');

/** Il calcolo dichiarato, rifacibile a mano: "2 h x 220 giorni x 10 avvocati x 75% x 150 €/h". */
export function formula(e: Esito, ore: number, tariffa: number, avvocati: number) {
  return `${numero(ore)} h al giorno × ${GIORNI_ANNO} giorni × ${avvocati} avvocati × ${Math.round(e.quota * 100)}% × ${euro(tariffa)}/h`;
}
