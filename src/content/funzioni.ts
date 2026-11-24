// Stato di ogni funzione citata sulla home, dal piano, sezione C (23/11/2026).
// Regola del sito: si presenta come disponibile solo ciò che è "attiva", cioè acceso
// su almeno uno studio reale. Quando una funzione entra in produzione, cambia qui il suo stato.
// La build di produzione fallisce se una funzione citata non è attiva o se un dato è "da confermare"
// (src/content/verifica.ts). Le anteprime funzionano comunque e mostrano gli avvisi.

export type StatoFunzione = 'attiva' | 'in rilascio';
export type StatoDato = 'confermato' | 'da confermare';

export const funzioni = {
  'pannello-outlook': { nome: 'Pannello in Outlook: cliente, pratica, assegnazione, ore', stato: 'attiva', fonte: 'Piano C, docs/STATO.md' },
  'analisi-mail': { nome: 'Analisi AI di ogni mail: tipo, urgenza, cliente', stato: 'attiva', fonte: 'Piano B.2, righe 17 e 19' },
  'scadenze-da-mail': { nome: 'Scadenze trovate nelle mail, proposte e confermate dal pannello', stato: 'attiva', fonte: 'Piano C, pannello' },
  archiviazione: { nome: 'Archiviazione di mail e allegati in PDF per cliente e pratica', stato: 'attiva', fonte: 'Piano C' },
  'nomi-progressivi': { nome: 'Nomi dei file con numerazione progressiva per pratica', stato: 'attiva', fonte: 'Piano B.2, riga 36' },
  'cartella-lavoro': { nome: 'Cartella di lavoro con riepilogo AI e avviso al collaboratore', stato: 'attiva', fonte: 'Piano C, B.2 righe 25 e 47' },
  report: { nome: 'Report per cliente e proforma', stato: 'attiva', fonte: 'Piano C' },
  pratiche: { nome: 'Pratiche in lista e in pipeline con scheda', stato: 'attiva', fonte: 'Piano C, D19-D22' },
  ruoli: { nome: 'Ruoli e permessi', stato: 'attiva', fonte: 'Piano C, D16 ed E6b' },
  etichette: { nome: 'Etichette in Outlook dall’analisi', stato: 'attiva', fonte: 'Piano C, G11' },
  'avviso-cliente': { nome: 'Avviso al cliente al cambio di fase', stato: 'in rilascio', fonte: 'Piano C, D23' },
  'link-documenti': { nome: 'Link al cliente per caricare i documenti', stato: 'in rilascio', fonte: 'Piano C' },
  crm: { nome: 'CRM: contatti e lead fino alla pratica', stato: 'in rilascio', fonte: 'Piano C, D24-D28' },
  'carichi-team': { nome: 'Carichi e assegnazioni del team', stato: 'in rilascio', fonte: 'Piano C, repo Plugin nav.ts' },
  'analisi-documenti': { nome: 'Analisi dei documenti: classificazione e scadenze', stato: 'in rilascio', fonte: 'Piano C, coda 20261121-c-doc-p1-r2' },
  calendario: { nome: 'Calendario interno con scrittura su Outlook', stato: 'in rilascio', fonte: 'Piano C, coda 20261121-b-calendario' },
  'attivita-valore': { nome: 'Attività e valore: ore stimate da confermare', stato: 'in rilascio', fonte: 'Piano C, GATE-C-ECONOMICA' },
} satisfies Record<string, { nome: string; stato: StatoFunzione; fonte: string }>;

export type IdFunzione = keyof typeof funzioni;

/** Una funzione composta è disponibile solo se lo sono tutte le sue parti. */
export function stato(ids: readonly IdFunzione[]): StatoFunzione {
  return ids.every((id) => funzioni[id].stato === 'attiva') ? 'attiva' : 'in rilascio';
}

// ---------- Sezioni esistenti del prototipo: testi invariati, solo registrati qui ----------

export const usiEsistenti: { dove: string; testo: string; funzioni: IdFunzione[] }[] = [
  { dove: 'Prima schermata', testo: 'Dentro Outlook qualifichi ogni email con cliente, pratica, collaboratore e ore.', funzioni: ['pannello-outlook'] },
  { dove: 'Scena, passo 1 e 2', testo: 'La qualifichi dal pannello', funzioni: ['pannello-outlook'] },
  { dove: 'Scena, passo 3', testo: 'Va nella cartella giusta', funzioni: ['archiviazione', 'nomi-progressivi'] },
  { dove: 'Scena, passo 4', testo: 'I documenti trovano il loro nome. Il termine della diffida diventa una scadenza proposta.', funzioni: ['analisi-documenti'] },
  { dove: 'Scena, passo 5', testo: 'Le ore diventano valore. Le ore stimate restano a parte finché non le confermi.', funzioni: ['report', 'attivita-valore'] },
  { dove: 'Beneficio 1', testo: 'Recuperi il fatturato nascosto (ore stimate confermate)', funzioni: ['report', 'attivita-valore'] },
  { dove: 'Beneficio 2', testo: 'Passi una pratica e non spieghi nulla', funzioni: ['cartella-lavoro'] },
  { dove: 'Beneficio 3', testo: 'Sai a che punto è ogni pratica', funzioni: ['pratiche'] },
];

// ---------- Sezione nuova: tutto lo studio in un posto ----------

export const studio = [
  {
    id: 'pratiche',
    titolo: 'Pratiche',
    testo: 'Ogni pratica nella sua fase, con la scheda completa: mail, documenti, ore e scadenze.',
    funzioni: ['pratiche'],
  },
  {
    id: 'cliente',
    titolo: 'Avviso al cliente',
    testo: 'Cambi fase e il cliente riceve l’aggiornamento, con il link per mandarti i documenti.',
    funzioni: ['avviso-cliente', 'link-documenti'],
  },
  {
    id: 'scadenze',
    titolo: 'Scadenze',
    testo: 'Le trova nelle mail e nei documenti. Tu le confermi e finiscono in calendario.',
    funzioni: ['scadenze-da-mail', 'analisi-documenti', 'calendario'],
  },
  {
    id: 'team',
    titolo: 'Team',
    testo: 'Chi lavora su cosa, quanto è carico ognuno e a chi passare la prossima pratica.',
    funzioni: ['carichi-team'],
  },
  {
    id: 'crm',
    titolo: 'Contatti',
    testo: 'Dal primo contatto all’incarico, fino alla pratica aperta.',
    funzioni: ['crm'],
  },
  {
    id: 'ruoli',
    titolo: 'Ruoli e permessi',
    testo: 'Ognuno vede solo ciò che gli serve per il suo lavoro.',
    funzioni: ['ruoli'],
  },
] as const satisfies readonly { id: string; titolo: string; testo: string; funzioni: readonly IdFunzione[] }[];

// ---------- Sezione nuova: AI e automazioni ----------

export const ai = {
  titolo: 'Il lavoro ripetitivo lo fa INNOVALEX. Le decisioni restano tue.',
  legge: [
    { testo: 'Analizza ogni mail: tipo, urgenza, cliente.', funzioni: ['analisi-mail'] },
    { testo: 'Trova scadenze e termini e te li propone.', funzioni: ['scadenze-da-mail'] },
    { testo: 'Riassume la conversazione per il collaboratore.', funzioni: ['cartella-lavoro'] },
    { testo: 'Classifica i documenti e dà loro un nome chiaro.', funzioni: ['analisi-documenti'] },
  ],
  daSolo: [
    { testo: 'Archivia in PDF nella cartella di cliente e pratica.', funzioni: ['archiviazione'] },
    { testo: 'All’assegnazione crea la cartella di lavoro e avvisa il collaboratore.', funzioni: ['cartella-lavoro'] },
    { testo: 'Mette le etichette alle mail in Outlook.', funzioni: ['etichette'] },
  ],
} satisfies {
  titolo: string;
  legge: { testo: string; funzioni: IdFunzione[] }[];
  daSolo: { testo: string; funzioni: IdFunzione[] }[];
};

// Decisione 5 del 24/11: solo queste frasi, nessun fornitore, nessun paese.
export const sicurezza = [
  'Dati dello studio su server in Europa.',
  'I modelli AI non si addestrano sui dati dello studio.',
  'Ognuno vede solo ciò che il suo ruolo consente.',
  'L’AI propone, l’avvocato decide.',
];

// ---------- Sezione nuova: chi siamo e caso SCLN ----------

export const persone = [
  { nome: 'Federico Garau', iniziali: 'FG', ruolo: 'Fondatore', nota: '' },
  {
    nome: 'Avv. Francesco Cocola',
    iniziali: 'FC',
    ruolo: 'Co-fondatore',
    nota: 'Segue ogni fase dello sviluppo ed è il primo a usarlo nel suo studio.',
  },
];

export const casoScln = {
  studio: 'SCLN Legal Network',
  citta: 'Roma',
  stato: 'In produzione',
  // Numeri al 17/11/2026 dal piano F.8: da far confermare all'Avv. Cocola prima della pubblicazione.
  numeri: [
    { valore: '8', etichetta: 'caselle email collegate', stato: 'da confermare' },
    { valore: '80', etichetta: 'pratiche aperte', stato: 'da confermare' },
    { valore: '41', etichetta: 'clienti attivi', stato: 'da confermare' },
  ] satisfies { valore: string; etichetta: string; stato: StatoDato }[],
  // Oggi vuota: si riempie solo con un testo approvato per iscritto.
  citazione: '',
};

// ---------- Diagnosi e FAQ ----------

export const faq = [
  { d: 'Dobbiamo cambiare gestionale?', r: 'No. Si parte dalla posta e il gestionale di oggi resta dov’è.' },
  { d: 'Funziona con la mia posta?', r: 'Oggi funziona con Outlook.' },
  { d: 'L’AI decide al posto dell’avvocato?', r: 'No. L’AI propone, l’avvocato conferma.' },
  { d: 'Quanto costa?', r: 'Dipende dallo studio. Ne parliamo nella diagnosi.' },
];
