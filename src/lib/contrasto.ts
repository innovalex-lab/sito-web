// Calcolo WCAG 2 del contrasto. La pagina /anteprima/sistema lo esegue a ogni build.

export const colori = {
  inchiostro: '#1E2656',
  profondo: '#141A3D',
  oro: '#9E7A35',
  'oro chiaro': '#D2B072',
  crema: '#F8F3EA',
  carta: '#F6F7F9',
  bianco: '#FFFFFF',
  'testo 2': '#454B6B',
  'crema 2': '#EDE4D3',
  linea: '#D8D3C7',
  spento: '#E3E4EA',
  'testo spento': '#5A5F7C',
} as const;

export type NomeColore = keyof typeof colori;

function luminanza(esadecimale: string): number {
  const canali = [1, 3, 5]
    .map((i) => parseInt(esadecimale.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * canali[0] + 0.7152 * canali[1] + 0.0722 * canali[2];
}

export function contrasto(a: string, b: string): number {
  const [chiaro, scuro] = [luminanza(a), luminanza(b)].sort((x, y) => y - x);
  return (chiaro + 0.05) / (scuro + 0.05);
}

interface Coppia {
  testo: NomeColore;
  fondo: NomeColore;
  uso: string;
  soglia: 4.5 | 3;
}

export const coppie: Coppia[] = [
  { testo: 'inchiostro', fondo: 'bianco', uso: 'Titoli, testo, voci di menu', soglia: 4.5 },
  { testo: 'inchiostro', fondo: 'crema', uso: 'Titoli e testo nella direzione A', soglia: 4.5 },
  { testo: 'inchiostro', fondo: 'carta', uso: 'Titoli e testo nella direzione B', soglia: 4.5 },
  { testo: 'inchiostro', fondo: 'crema 2', uso: 'Scritta del segnaposto in A', soglia: 4.5 },
  { testo: 'testo 2', fondo: 'bianco', uso: 'Testo secondario', soglia: 4.5 },
  { testo: 'testo 2', fondo: 'crema', uso: 'Testo secondario', soglia: 4.5 },
  { testo: 'testo 2', fondo: 'carta', uso: 'Testo secondario', soglia: 4.5 },
  { testo: 'bianco', fondo: 'inchiostro', uso: 'Pulsante principale', soglia: 4.5 },
  { testo: 'bianco', fondo: 'profondo', uso: 'Pulsante sopra e premuto', soglia: 4.5 },
  { testo: 'testo spento', fondo: 'spento', uso: 'Pulsante disattivato', soglia: 4.5 },
  { testo: 'oro chiaro', fondo: 'profondo', uso: 'Accento su fondo scuro', soglia: 4.5 },
  { testo: 'oro', fondo: 'bianco', uso: 'Solo sottolineature, focus e elementi grandi', soglia: 3 },
  { testo: 'oro', fondo: 'crema', uso: 'Solo sottolineature, focus e elementi grandi', soglia: 3 },
  { testo: 'oro', fondo: 'carta', uso: 'Solo sottolineature, focus e elementi grandi', soglia: 3 },
];
