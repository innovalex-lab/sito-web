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
  'valore-socio': { nome: 'Valore per socio: pratiche originate e gestite, ore e valore generato', stato: 'attiva', fonte: 'Piano C' },
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
  // Ordine: è anche l'ordine dello scorrimento su telefono. Su desktop la griglia è asimmetrica:
  // i due blocchi "grande" occupano due righe, gli altri quattro una.
  {
    id: 'pratiche',
    taglia: 'grande',
    titolo: 'Pratiche',
    testo: 'Ogni pratica nella sua fase, con la scheda completa: mail, documenti, ore e scadenze.',
    funzioni: ['pratiche'],
  },
  {
    id: 'cliente',
    taglia: 'piccolo',
    titolo: 'Avviso al cliente',
    testo: 'Cambi fase e il cliente riceve l’aggiornamento, con il link per mandarti i documenti.',
    funzioni: ['avviso-cliente', 'link-documenti'],
  },
  {
    id: 'scadenze',
    taglia: 'piccolo',
    titolo: 'Scadenze',
    testo: 'Le trova nelle mail e nei documenti. Tu le confermi e finiscono in calendario.',
    funzioni: ['scadenze-da-mail', 'analisi-documenti', 'calendario'],
  },
  {
    id: 'soci',
    taglia: 'grande',
    titolo: 'Valore per socio',
    testo: 'Per ogni socio: pratiche originate, pratiche gestite, ore e valore generato. La base oggettiva per dividere gli utili, senza discussioni.',
    funzioni: ['valore-socio'],
  },
  {
    id: 'team',
    taglia: 'piccolo',
    titolo: 'Team',
    testo: 'Chi lavora su cosa, quanto è carico ognuno e a chi passare la prossima pratica.',
    funzioni: ['carichi-team'],
  },
  {
    id: 'crm',
    taglia: 'piccolo',
    titolo: 'Contatti',
    testo: 'Segui ogni potenziale cliente dal primo contatto all’incarico. Quando firma, la pratica è già aperta.',
    funzioni: ['crm'],
  },
] as const satisfies readonly { id: string; taglia: 'grande' | 'piccolo'; titolo: string; testo: string; funzioni: readonly IdFunzione[] }[];

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

// Ritratti in public/team/, ritagliati 4:5 e senza metadati. Il testo di Federico Garau è quello della
// sezione Founder del sito attuale (index.html sul ramo main), parola per parola, solo spezzato in paragrafi.
export const persone = [
  {
    nome: 'Federico Garau',
    ruolo: 'Fondatore e amministratore',
    foto: 'federico-garau',
    testo: [
      'Ho costruito INNOVALEX perché il problema che risolve non ha una soluzione sul mercato italiano.',
      'Gli studi professionali hanno gestionali per le pratiche, banche dati per la giurisprudenza, software per la fatturazione. Non hanno mai avuto qualcosa che trasformi il flusso email quotidiano in dati strutturati, visibilità economica e governance operativa.',
      'Ho iniziato da un cliente reale, con flussi reali, e ho costruito il sistema su quello. Non su una demo. Su 600 email al mese, pratiche aperte, collaboratori da coordinare e report che prima non esistevano.',
      'Ogni studio che usa INNOVALEX lo seguo direttamente. Ci sono io, il mio team, i tuoi flussi reali e trenta minuti per capire se INNOVALEX ha senso per il tuo studio.',
    ],
  },
  {
    nome: 'Avv. Francesco Cocola',
    ruolo: 'Co-fondatore',
    foto: 'francesco-cocola',
    testo: ['Segue ogni fase dello sviluppo ed è il primo a usarlo nel suo studio.'],
  },
];

export const casoScln = {
  studio: 'SCLN Legal Network',
  citta: 'Roma',
  stato: 'In produzione',
  // 8, 80 e 41: numeri al 17/11/2026 dal piano F.8, da far confermare all'Avv. Cocola prima della pubblicazione.
  // 600+: già pubblicato sul sito attuale (caso studio SCLN, "600+ email/mese gestite automaticamente").
  numeri: [
    { valore: '600+', etichetta: 'email al mese', stato: 'confermato', fonte: 'sito attuale' },
    { valore: '8', etichetta: 'caselle email collegate', stato: 'da confermare', fonte: 'piano F.8' },
    { valore: '80', etichetta: 'pratiche aperte', stato: 'da confermare', fonte: 'piano F.8' },
    { valore: '41', etichetta: 'clienti attivi', stato: 'da confermare', fonte: 'piano F.8' },
  ] satisfies { valore: string; etichetta: string; stato: StatoDato; fonte: string }[],
  // Già pubblicata sul sito attuale (caso studio SCLN, "Voce dal progetto").
  citazione: {
    testo: 'Il valore non è stato aggiungere un altro software. È stato avere un’infrastruttura che segue il modo in cui lo studio lavora davvero.',
    autore: 'Avv. Francesco Cocola',
    ente: 'SCLN Legal Network',
    stato: 'confermato' as StatoDato,
    fonte: 'sito attuale',
  },
};

// ---------- Diagnosi e FAQ ----------

// Sottotitolo e risposte a), c), e) dal sito attuale (index.html sul ramo main), parola per parola;
// in c) "l'Infrastruttura Operativa" diventa "INNOVALEX". Domande b) e d) e loro risposte decise da Federico il 24/11.
export const faqSottotitolo = 'Le domande reali che ogni studio fa, con risposte dirette, non rassicuranti.';

export const faq = [
  {
    d: 'Abbiamo già una segretaria che gestisce email e PEC. Serve comunque?',
    r: 'Dipende da cosa fa la segretaria. Se gestisce le relazioni con i clienti, coordina le agende e supporta i soci, INNOVALEX non tocca nulla di questo. Se passa ore ad archiviare email, costruire report a mano e mandare recap ai collaboratori via WhatsApp, allora stai pagando una risorsa qualificata per fare lavoro che un sistema automatizzato fa meglio, più velocemente e senza errori. INNOVALEX libera quella persona per fare il lavoro che vale davvero. Oppure, se non hai ancora quella risorsa, ti dice se ti serve davvero assumerla.',
  },
  {
    d: 'Dobbiamo cambiare gestionale?',
    r: 'No. Dentro INNOVALEX ci sono già pratiche, clienti, scadenze e team, quindi puoi gestire tutto lo studio da qui. Se preferisci, puoi continuare a usare il tuo gestionale: INNOVALEX parte dalla posta e non ti obbliga a lasciarlo. La scelta è tua.',
  },
  {
    d: 'Cosa succede se INNOVALEX non soddisfa le aspettative?',
    r: 'Gli obiettivi vengono definiti prima della firma, non dopo. In discovery stabiliamo insieme cosa significa successo per il tuo studio: quante ore recuperate, che tipo di report ricevi, come funziona l’assegnazione ai collaboratori. Se INNOVALEX non raggiunge quegli obiettivi nei primi 30 giorni, interveniamo direttamente sui flussi fino a che non funziona come concordato.',
  },
  {
    d: 'Posso preparare la parcella direttamente dal report?',
    r: 'Sì. Dal report per cliente INNOVALEX prepara la proforma con attività, ore e valore, senza ricopiare nulla.',
  },
  { d: 'L’AI decide al posto dell’avvocato?', r: 'No. L’AI propone, l’avvocato conferma.' },
];
