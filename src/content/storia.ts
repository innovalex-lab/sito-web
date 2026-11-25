// Testi della home, fase 4: storyline del sito attuale (index.html sul ramo main) con la grafica nuova.
// Riferimento: docs/PIANO-STORYLINE.md. Legenda del piano: [=] invariato da main, [≈] corretto, [+] nuovo.
// I testi [=] sono copiati parola per parola da main; scripts/verifica-uguali.mjs li confronta con main.
// Ogni frase che cita una funzione la collega in `funzioni`: src/content/verifica.ts controlla che sia attiva.
import type { IdFunzione } from './funzioni';

export interface Voce {
  nome: string;
  testo: string;
  funzioni: IdFunzione[];
}

// ---------- Menu ----------

export const menu = [
  { nome: 'Il Problema', href: '#problema' },
  { nome: 'Calcola il Tuo Costo', href: '#calcolatore' },
  { nome: 'Come Funziona', href: '#come-funziona' },
  { nome: 'Risultati Reali', href: '#risultati' },
  { nome: 'FAQ', href: '#faq' },
  { nome: 'Chi Siamo', href: '#chi-siamo' },
];
// Dal 25/11/2026 la "Diagnosi Operativa" si chiama "analisi gratuita" in tutto il testo visibile (decisione di Federico).
// I valori inviati a /api/lead (data-cta, nomi dei campi) non cambiano.
export const menuPulsante = { nome: 'Analisi gratuita', href: '#contatti' };
export const prenota = 'Prenota l’analisi gratuita';

// ---------- 1. Prima schermata ----------

export const eroe = {
  marchio: 'INNOVALEX',
  titolo: ['Il tuo Studio Legale', 'sotto controllo.'],
  sottotitolo: {
    testo:
      'INNOVALEX riunisce il funzionamento dello studio in un unico centro di controllo: email, clienti, pratiche, documenti, team e risultati economici. Meno ricerche, meno passaggi manuali, più chiarezza su ciò che conta.',
    funzioni: ['pannello-outlook', 'archiviazione', 'pratiche', 'carichi-team', 'report'] as IdFunzione[],
  },
  pulsante: { testo: 'Scopri il problema', href: '#problema' },
  numeri: [
    { cifra: '€66.000', unita: '/anno', etichetta: 'valore recuperabile per avvocato', uguale: true, funzioni: [] as IdFunzione[] },
    { cifra: '440h', unita: '', etichetta: 'di lavoro non fatturabile, ogni anno', uguale: true, funzioni: [] as IdFunzione[] },
    { cifra: 'Dentro Outlook', unita: '', etichetta: 'lavori dalla posta che usi già', uguale: false, funzioni: ['pannello-outlook'] as IdFunzione[] },
  ],
  nota: {
    prima: 'Esempio per un avvocato che perde 2 ore al giorno sulla posta, a 150 € l’ora, per 220 giorni lavorativi.',
    link: 'Calcola il tuo studio qui sotto.',
  },
  foto: 'Studio legale con professionista al lavoro',
};

// ---------- 2. Il problema ----------

export const problema = {
  etichetta: 'Il problema',
  titolo: ['Il tempo c’è.', 'Sta finendo nel posto sbagliato.'],
  lead: 'Ogni giorno, il tuo studio produce valore che non riesce a misurare. E quello che non si misura non si fattura.',
  bruciato: {
    cifra: '750 €',
    unita: 'al giorno',
    testo: 'di valore bruciato per avvocato.',
    calcolo: 'A 150 € l’ora, con 5 ore su 8 che non diventano fattura.',
  },
  fatturabile: {
    cifra: '37%',
    testo: 'Solo il 37% della giornata diventa lavoro fatturabile.',
    resto: 'Il resto si disperde in coordinamento, ricerca materiale e gestione manuale.',
    fonte: { testo: 'Clio, Legal Trends Report 2024', href: 'https://www.clio.com/resources/legal-trends/' },
  },
  giornata: {
    etichetta: 'Giornata tipo',
    titolo: ['Alle 13 hai lavorato quattro ore.', 'Ne fatturerai forse una e mezza.'],
    testo:
      'Il problema non è l’organizzazione personale. È l’assenza di un’Infrastruttura Operativa costruita sul modo in cui lo studio lavora davvero.',
  },
  timeline: {
    etichetta: 'Timeline dello spreco',
    titolo: 'La mattina scorre. Il lavoro vero aspetta.',
    ore: [
      { ora: '8:42', testo: 'L’email è già piena.' },
      { ora: '9:30', testo: 'Un cliente cerca un allegato di tre mesi fa.' },
      { ora: '10:04', testo: 'Il collaboratore dice: “sì, ci guardo”.' },
      { ora: '11:00', testo: 'Cinque messaggi WhatsApp per sapere a che punto siete.' },
      { ora: '13:00', testo: 'Quattro ore lavorate. Una e mezza fatturabili.' },
    ],
  },
};

// ---------- 3. Calcolatore ----------
// Campi, intervalli, valori iniziali e formule identici a main. Le percentuali sono quelle di main,
// ora collegate ai sistemi giusti (in main la casella Governance usava i dati dell'archiviazione).

export const calcolatore = {
  etichetta: 'Calcolatore ROI',
  titolo: 'Quanto vi sta costando il “facciamo come sempre”?',
  lead: 'La domanda vera non è quanto costa INNOVALEX. È quanto ti sta già costando non averlo. Inserisci i dati del tuo studio, il calcolo confronta il costo reale del tuo metodo attuale, non quello di altri software.',
  nota: 'Il calcolo usa i tuoi numeri. L’unica ipotesi è quanto tempo recupera ogni sistema, ed è scritta accanto a ognuno.',
  campi: [
    { id: 'ore', etichetta: 'Ore/giorno perse su email', min: 0.5, max: 6, passo: 0.5, valore: 2, unita: 'h' },
    { id: 'tariffa', etichetta: 'Tariffa oraria media', min: 100, max: 300, passo: 10, valore: 150, unita: '€' },
    { id: 'avvocati', etichetta: 'Numero avvocati', min: 3, max: 20, passo: 1, valore: 10, unita: '' },
  ],
  legenda: 'Modulo INNOVALEX da simulare',
  // Ordine di main: Ordine Operativo, Visibilità Economica, Governance Operativa.
  // `invio` è l'etichetta mandata a /api/roi-lead (modulo_simulato), identica a main.
  // `etichettaLead` sostituisce le etichette sbagliate del campo selectedFeatures di main (form della diagnosi, sessione 2).
  sistemi: [
    {
      id: 'ordine',
      nome: 'Ordine Operativo',
      quota: 0.75,
      invio: 'ORDINE OPERATIVO',
      etichettaLead: 'Ordine Operativo',
      iniziale: true,
      testo: 'Elimina il lavoro manuale sulla casella email e rende visibile tutto ciò che oggi si disperde.',
      funzioni: ['analisi-mail', 'archiviazione'] as IdFunzione[],
    },
    {
      id: 'visibilita',
      nome: 'Visibilità Economica',
      quota: 0.08,
      invio: 'VISIBILITÀ ECONOMICA',
      etichettaLead: 'Visibilità Economica',
      iniziale: false,
      testo: 'Trasforma il lavoro fatto in valore visibile, pratica per pratica, cliente per cliente.',
      funzioni: ['report'] as IdFunzione[],
    },
    {
      id: 'governance',
      nome: 'Governance Operativa',
      quota: 0.1,
      invio: 'GOVERNANCE OPERATIVA',
      etichettaLead: 'Governance Operativa',
      iniziale: false,
      testo: 'Sostituisce rincorse e messaggi interni con visibilità reale sul lavoro del team e soci.',
      funzioni: ['cartella-lavoro', 'carichi-team'] as IdFunzione[],
    },
  ],
  massimo: 0.93,
  giorniAnno: 220,
  giorniMese: 22,
  risultato: {
    etichetta: 'Risultato',
    annuale: 'Valore annuale recuperabile',
    stima: 'Stima da validare sui vostri flussi reali.',
    nessuno: 'Seleziona almeno un modulo.',
    oreMese: 'Ore/mese recuperate',
    risparmio: 'Risparmio mensile',
    soluzione: 'Scopri la Soluzione',
  },
  analisi: {
    titolo: 'Vuoi l’analisi completa per il tuo studio?',
    testo: 'Ti inviamo un report personalizzato con il dettaglio del costo nascosto e la configurazione INNOVALEX più adatta alla dimensione del tuo studio.',
    campo: 'La tua email professionale',
    pulsante: 'Ricevi l’analisi personalizzata',
    invio: 'Invio in corso',
    privacy: 'Usiamo la tua email solo per inviarti l’analisi richiesta.',
    privacyLink: 'Privacy Policy',
    errore: 'Invio non riuscito. Riprova tra pochi minuti.',
    emailNonValida: 'Inserisci un indirizzo email valido.',
    fatto: 'Perfetto.',
    fattoTesto: 'Riceverai l’analisi personalizzata entro 24 ore.',
  },
};

// ---------- 4. Come funziona ----------

export const comeFunziona = {
  etichetta: 'Come Funziona INNOVALEX',
  titolo: ['Non cambi il modo in cui lavori.', 'INNOVALEX si integra nel tuo Studio.'],
  testo: [
    'La tua email contiene già tutto quello che ti serve per gestire lo Studio.',
    'INNOVALEX parte da lì: integra un’Infrastruttura Operativa in quello che usi già ogni giorno, la tua casella email.',
  ],
  pannello: {
    titolo: 'Il tuo centro di comando, dentro la tua email.',
    testo:
      'Un pannello integrato in Outlook: classifica, assegna e traccia senza uscire dalla tua casella. Tu confermi con un click, il sistema fa tutto il resto.',
    funzioni: ['pannello-outlook', 'analisi-mail', 'cartella-lavoro'] as IdFunzione[],
  },
  // La scena a 5 passi: testi invariati dalla fase 3.
  scena: {
    titolo: 'Segui una mail, dall’arrivo al valore.',
    passi: [
      { titolo: 'Arriva una mail', frase: 'Rossi Srl ti inoltra una diffida. La apri in Outlook, come fai ogni giorno.', funzioni: [] as IdFunzione[] },
      {
        titolo: 'La qualifichi dal pannello',
        frase: 'Accanto alla mail scegli cliente, pratica, collaboratore e ore. Poi premi Conferma.',
        funzioni: ['pannello-outlook'] as IdFunzione[],
      },
      {
        titolo: 'Va nella cartella giusta',
        frase: 'La mail diventa un PDF nella cartella di Rossi Srl, pratica Rossi c. Edilvetta, con il suo numero progressivo.',
        funzioni: ['archiviazione', 'nomi-progressivi'] as IdFunzione[],
      },
      {
        titolo: 'I documenti trovano il loro nome',
        frase: 'La scansione prende un nome che si capisce. Il termine della diffida diventa una scadenza proposta. La confermi tu.',
        funzioni: ['analisi-documenti', 'scadenze-da-mail'] as IdFunzione[],
      },
      {
        titolo: 'Le ore diventano valore',
        frase: 'L’ora e mezza entra nel riepilogo della pratica con il suo valore. Le ore stimate restano a parte finché non le confermi.',
        funzioni: ['report', 'attivita-valore'] as IdFunzione[],
      },
    ],
  },
};

// ---------- 5. Tre sistemi, una sola infrastruttura ----------

export const sistemi = {
  titolo: ['Una sola infrastruttura.', 'Tre risultati che cambiano come lavori.'],
  testo: 'I sistemi non sono tre prodotti da comprare separatamente. Sono i tre punti in cui oggi si brucia valore.',
  elenco: [
    {
      id: 'ordine-operativo',
      etichetta: 'Ordine Operativo',
      titolo: 'Ogni email al posto giusto.',
      testo:
        'Le email vengono classificate, archiviate e collegate alla pratica giusta. Il pannello INNOVALEX, integrato in Outlook, ti permette di confermare con un click e governare l’intero flusso senza cambiare nulla nel modo in cui lavori.',
      funzioni: ['analisi-mail', 'archiviazione', 'pannello-outlook'] as IdFunzione[],
      voci: [
        {
          nome: 'Classificazione AI',
          testo: 'L’AI legge contenuto, oggetto e allegati e propone la classificazione per urgenza, priorità e tipo. Tu confermi dal pannello con un click.',
          funzioni: ['analisi-mail', 'pannello-outlook'],
        },
        {
          nome: 'Archiviazione PDF automatica',
          testo: 'Ogni mail diventa un PDF nella cartella del cliente e della pratica giusti, con gli allegati, numerazione progressiva e zero intervento manuale.',
          funzioni: ['archiviazione', 'nomi-progressivi'],
        },
        {
          nome: 'Scadenzario',
          testo: 'INNOVALEX rileva udienze, termini e depositi e te li propone. Tu confermi e finiscono in calendario, anche in Outlook.',
          funzioni: ['scadenze-da-mail', 'calendario'],
        },
        {
          nome: 'Nuovo contatto',
          testo: 'Quando scrive un mittente sconosciuto, INNOVALEX te lo segnala e con un click apri la pratica, creando cliente e cartella.',
          funzioni: ['nuovo-contatto'],
        },
      ] satisfies Voce[],
    },
    {
      id: 'visibilita-economica',
      etichetta: 'Visibilità Economica',
      titolo: 'Il lavoro che fai diventa valore che si vede.',
      testo:
        'Questo report normalmente non esiste. INNOVALEX lo prepara per cliente e pratica. Per ricostruirlo a mano servirebbero decine di ore di lettura, ricerca, controllo allegati e ricostruzione delle attività.',
      funzioni: ['report'] as IdFunzione[],
      voci: [
        {
          nome: 'Report economico',
          testo: 'Ogni email inclusa nel report, marcata dal pannello con un click, alimenta il calcolo di ore e valore per cliente e pratica. Il report è modificabile in Word.',
          funzioni: ['report', 'pannello-outlook'],
        },
        {
          nome: 'Ore stimate',
          testo: 'Le ore che non hai segnato le stima INNOVALEX. Restano a parte finché non le confermi.',
          funzioni: ['attivita-valore'],
        },
        {
          nome: 'Dal report alla parcella',
          testo: 'La parcella nasce dal report, non dalla memoria. Attività, ore, tariffa per tipo di pratica e valore per cliente sono già lì: INNOVALEX prepara la proforma. Zero doppio inserimento.',
          funzioni: ['report'],
        },
        {
          nome: 'Valore per socio',
          testo: 'Per ogni socio e collaboratore INNOVALEX traccia pratiche originate, pratiche gestite, ore lavorate e valore economico generato. La base oggettiva per la distribuzione degli utili, senza discussioni e senza memoria.',
          funzioni: ['valore-socio'],
        },
      ] satisfies Voce[],
    },
    {
      id: 'governance-operativa',
      etichetta: 'Governance Operativa',
      titolo: 'Sai sempre chi sta facendo cosa. Senza rincorrere nessuno.',
      testo:
        'Quando assegni una pratica dal pannello INNOVALEX, il sistema fa tutto il resto. Il collaboratore riceve cartella e materiale. Tu vedi lo studio in tempo reale. E sai esattamente chi genera valore, senza chiederlo a nessuno.',
      funzioni: ['pannello-outlook', 'cartella-lavoro', 'carichi-team', 'valore-socio'] as IdFunzione[],
      voci: [
        {
          nome: 'Assegnazione dal pannello',
          testo: 'Dall’interno della casella email, con un click, assegni la pratica al collaboratore. Il sistema crea automaticamente la cartella con tutti gli allegati, invia il riepilogo operativo e popola la dashboard. Nessun WhatsApp, nessun forward manuale, nessun recap da scrivere.',
          funzioni: ['pannello-outlook', 'cartella-lavoro', 'carichi-team'],
        },
        {
          nome: 'Dashboard collaboratori',
          testo: 'Una schermata mostra l’intero studio: chi sta lavorando su cosa, lo stato di ogni pratica, il livello di urgenza e le ore accumulate. Se una pratica si blocca, si vede subito.',
          funzioni: ['carichi-team', 'pratiche'],
        },
        {
          nome: 'Pipeline delle pratiche',
          testo: 'Ogni pratica nella sua fase, dalla prima mail alla chiusura.',
          funzioni: ['pratiche'],
        },
        {
          nome: 'Avviso al cliente',
          testo: 'Cambi fase e il cliente riceve l’aggiornamento, con il link per mandarti i documenti. Basta messaggi per sapere a che punto siete.',
          funzioni: ['avviso-cliente', 'link-documenti'],
        },
      ] satisfies Voce[],
    },
  ],
};

// ---------- 7. Riepilogo (al posto della sezione AI, decisione di Federico del 25/11/2026) ----------

export const riepilogo = {
  titolo: ['Meno lavoro manuale.', 'Più lavoro fatturato.'],
  testo: {
    testo:
      'Oggi solo il 37% della giornata diventa fattura. Il resto se ne va tra archiviazione, ricerche, recap e rincorse. INNOVALEX toglie il lavoro manuale e porta nel report il valore che oggi si perde. Un’azione sola: qualifichi la mail dal pannello, il sistema fa il resto.',
    funzioni: ['pannello-outlook', 'archiviazione', 'report', 'cartella-lavoro'] as IdFunzione[],
  },
  // Titolo di ogni blocco in due parti: la parola chiave su una riga sua, in oro, e il resto sotto in bianco.
  // A schermo i due punti non si vedono (c'è l'a capo); restano nel testo letto dai lettori di schermo.
  blocchi: [
    {
      id: 'tempo',
      chiave: 'Tempo',
      resto: 'il lavoro manuale lo fa INNOVALEX.',
      testo: 'Archiviare, rinominare, cercare allegati, scrivere recap, segnare scadenze. Prima erano ore. Ora è un click dal pannello.',
      funzioni: ['archiviazione', 'nomi-progressivi', 'cartella-lavoro', 'scadenze-da-mail', 'calendario', 'pannello-outlook'] as IdFunzione[],
    },
    {
      id: 'fatturato',
      chiave: 'Fatturato',
      resto: 'il valore nascosto entra nel report.',
      testo: 'Ogni email che conta diventa ore e valore, anche quelle che non avevi segnato: INNOVALEX le stima, tu le confermi. Nel report entra solo quello che includi tu, quindi sono numeri che puoi mostrare al cliente. La proforma è già pronta.',
      funzioni: ['pannello-outlook', 'attivita-valore', 'report'] as IdFunzione[],
    },
    {
      id: 'organizzazione',
      chiave: 'Organizzazione',
      resto: 'lo studio lavora in ordine.',
      testo: 'Ogni pratica nella sua fase, ogni collaboratore con la sua cartella, il valore di ogni socio misurato. Nessun messaggio per sapere a che punto siete.',
      funzioni: ['pratiche', 'cartella-lavoro', 'carichi-team', 'valore-socio'] as IdFunzione[],
    },
  ],
};

// ---------- 7. Compliance (dopo il riepilogo) ----------

export const compliance = {
  titolo: ['La Compliance non è un dettaglio.', 'È la condizione per lavorare con uno studio legale.'],
  voci: [
    {
      nome: 'GDPR',
      testo: 'Tutto il processo avviene su server in Europa. I dati del vostro studio non vengono usati per addestrare modelli AI.',
      funzioni: ['server-ue'],
    },
    {
      nome: 'Segreto professionale',
      testo: 'I dati del vostro studio, nomi dei clienti, contenuto delle pratiche e comunicazioni riservate, li vede solo chi ha il ruolo per vederli.',
      funzioni: ['ruoli'],
    },
    {
      // Da far rileggere all'Avv. Cocola prima della pubblicazione (piano, sezione 7).
      nome: 'AI Act e Legge 132/2025',
      testo: 'L’Infrastruttura Operativa di INNOVALEX è progettata in coerenza con i principi di trasparenza, supervisione umana e responsabilità previsti dal quadro normativo italiano ed europeo.',
      funzioni: [],
    },
  ] satisfies Voce[],
  dpa: 'DPA disponibile in fase contrattuale.',
};

// ---------- 8. Risultati reali ----------

export const risultati = {
  etichetta: 'Risultati reali',
  titolo: 'Non una demo. Un cliente reale, con numeri reali, su flussi reali.',
  cliente: 'SCLN Legal Network',
  casoTitolo: 'Da ore disperse ogni settimana a un’Infrastruttura Operativa misurabile.',
  casoTesto: {
    testo:
      'Il progetto ha lavorato su archiviazione automatica di tutte le comunicazioni, report economici per pratica e cliente, dashboard collaboratori in tempo reale. Il valore è stato misurato su tempo recuperato, governance operativa e visibilità economica.',
    funzioni: ['archiviazione', 'report', 'carichi-team'] as IdFunzione[],
  },
};

// ---------- 9. Analisi gratuita e form ----------
// Campi, etichette, valori delle tendine e nomi inviati identici al form di main (index.html, dopo il commit 58e6b05).
// Invio a /api/lead con lo stesso formato di main (src/scripts/diagnosi.ts). Nuovi [+]: il consenso privacy,
// gli errori accanto ai campi e la conferma dopo l'invio senza mail, caso studio e whitepaper (piano, sezione 9).

export const diagnosi = {
  etichetta: 'Prima Call',
  titolo: ['Analisi gratuita del tuo studio,', 'in 30 minuti'],
  testo: [
    'In 30 minuti analizziamo insieme i flussi reali del tuo studio: come gestisci le email oggi, quanto tempo va in operatività non fatturabile, come monitori il lavoro dei collaboratori, se sai esattamente quanto vale ogni pratica aperta.',
    'Alla fine dei 30 minuti sai esattamente quanto ti sta costando il tuo metodo attuale.',
  ],
  form: {
    nome: { etichetta: 'Nome', segnaposto: 'Nome e cognome', errore: 'Scrivi nome e cognome.' },
    studio: { etichetta: 'Studio', errore: 'Scrivi il nome dello studio.' },
    email: { etichetta: 'Email', segnaposto: 'nome@studio.it', errore: 'Inserisci un indirizzo email valido.' },
    telefono: { etichetta: 'Telefono', facoltativo: '(opzionale)', segnaposto: '+39 ...' },
    ruolo: {
      etichetta: 'Ruolo',
      vuoto: 'Seleziona ruolo',
      opzioni: ['Titolare / Founder', 'Managing Partner', 'Partner', 'Responsabile operativo / IT', 'Altro'],
      errore: 'Scegli il tuo ruolo.',
    },
    persone: {
      etichetta: 'Quante persone lavorano nello studio?',
      vuoto: 'Seleziona dimensione studio',
      opzioni: ['1-3 persone', '4-10 persone', '11-20 persone', '21-50 persone', '50+ persone'],
      errore: 'Scegli quante persone lavorano nello studio.',
    },
    priorita: {
      etichetta: 'Quali sono oggi le priorità più urgenti?',
      aiuto: 'Puoi selezionare più opzioni.',
      // valore inviato (come main) e testo mostrato (come main)
      opzioni: [
        { valore: 'Email, PEC', testo: 'Gestire Email, PEC' },
        { valore: 'Archiviazione', testo: 'Recuperare Valore economico' },
        { valore: 'Collaboratori', testo: 'Organizzare Collaboratori e soci' },
        { valore: 'Altro sistema personalizzato', testo: 'Altro sistema personalizzato' },
      ],
      errore: 'Scegli almeno una priorità.',
    },
    volume: { etichetta: 'Quante email/PEC gestite mediamente al giorno?', segnaposto: 'Es. 40 email + 12 PEC', errore: 'Scrivi quante email e PEC gestite al giorno.' },
    strumenti: {
      etichetta: 'Che strumenti usate oggi?',
      segnaposto: 'Es. Outlook, Gmail, PEC, Kleos, Cliens, OneDrive, SharePoint...',
      errore: 'Scrivi gli strumenti che usate oggi.',
    },
    consenso: {
      prima: 'Ho letto la',
      link: 'Privacy Policy',
      dopo: 'e accetto di essere ricontattato per l’analisi gratuita.',
      errore: 'Serve il consenso per ricontattarti.',
    },
    pulsante: 'Prenota l’analisi gratuita',
    invio: 'Invio in corso',
    sotto: 'Partiamo dai tuoi numeri reali.',
    riuscito: 'Grazie. Ti contatteremo entro 24h.',
    errore: 'Invio non riuscito. Riprova tra pochi minuti.',
    // Conferma dopo l'invio [≈]: senza mail di conferma, caso studio e whitepaper, che oggi non partono.
    dopo: ['Analizziamo i dati che hai inviato nel form.', 'In call partiamo dai flussi reali dello studio, non da una demo generica.'],
  },
};

// ---------- 11. Chi siamo e 12. piè di pagina ----------

export const chiSiamo = { titolo: 'INNOVALEX nasce dentro uno studio legale.' };

export const piede = {
  testo: ['L’Infrastruttura Operativa per Studi Legali italiani.', 'Costruita sull’email che già usi. Progettata per non cambiare il modo in cui lavori.'],
  compliance: 'Server EU, GDPR by design, DPA disponibile in fase contrattuale.',
};
