# Piano sito INNOVALEX: storyline del sito attuale + grafica nuova

Stato: confermato da Federico il 24/11/2026, con la prima schermata del sito attuale. Sessione 1 di Claude Code in preparazione.

Legenda dei testi: **[=]** testo del sito attuale, invariato. **[≈]** testo del sito attuale, corretto solo dove dice una cosa non vera oggi (motivo tra parentesi). **[+]** testo nuovo.

## Principio

- La struttura, l'ordine e i testi del sito attuale restano. Sono quelli che vendono.
- La grafica nuova (lastre, scena, animazioni, blocchi dello studio, foto) illustra i testi. Non li sostituisce.
- Proporzioni: il testo guida. Nei blocchi affiancati la grafica occupa al massimo metà della larghezza. Solo la scena di "Come funziona" resta a tutta larghezza.
- Una sola animazione per sezione, al massimo.
- Tutte le funzioni citate sono segnate attive (fonte: Federico, 24/11). Spariscono i riquadri rossi.
- I numeri restano, ma come calcolo dichiarato, così un avvocato può rifarlo da solo.

## Menu

[=] Il Problema · Calcola il Tuo Costo · Come Funziona · Risultati Reali · FAQ · Chi Siamo · pulsante "Diagnosi Gratuita".

## 1. Prima schermata (aggiornata il 24/11: come il sito attuale)

- Impostazione [=]: quella del sito attuale. Foto dello studio legale a tutto schermo come sfondo, velatura blu, testo bianco a sinistra. La pila di lastre esce dalla prima schermata.
- [=] "INNOVALEX"
- Titolo [=]: "Il tuo Studio Legale sotto controllo."
- Sottotitolo [=]: "INNOVALEX riunisce il funzionamento dello studio in un unico centro di controllo: email, clienti, pratiche, documenti, team e risultati economici. Meno ricerche, meno passaggi manuali, più chiarezza su ciò che conta."
- Pulsante [=]: "Scopri il problema".
- Tre numeri:
  - [=] "€66.000 /anno, valore recuperabile per avvocato"
  - [=] "440h di lavoro non fatturabile, ogni anno"
  - [≈] "Dentro Outlook: lavori dalla posta che usi già" (sostituisce "ROI < 30 giorni documentato": non c'è un documento di calcolo)
- Nota sotto i numeri [≈]: "Esempio per un avvocato che perde 2 ore al giorno sulla posta, a 150 € l'ora, per 220 giorni lavorativi. Calcola il tuo studio qui sotto." (sostituisce "valore documentato" e "studio medio oltre 150.000 €", senza metodo)
- Grafica: solo la foto, con un leggero movimento allo scorrimento come oggi. Il titolo nuovo delle slide resta alle slide.

## 2. Il problema

- [=] "Il problema"
- [=] "Il tempo c'è. Sta finendo nel posto sbagliato."
- [=] "Ogni giorno, il tuo studio produce valore che non riesce a misurare. E quello che non si misura non si fattura."
- Due numeri:
  - [≈] "750 € al giorno di valore bruciato per avvocato. A 150 € l'ora, con 5 ore su 8 che non diventano fattura." (ora è coerente con il dato Clio)
  - [≈] "Solo il 37% della giornata diventa lavoro fatturabile. Il resto si disperde in coordinamento, ricerca materiale e gestione manuale." Fonte visibile: Clio, Legal Trends Report 2024. (prima era 36%, senza fonte)
- [=] Giornata tipo: "Alle 13 hai lavorato quattro ore. Ne fatturerai forse una e mezza."
- [=] "Il problema non è l'organizzazione personale. È l'assenza di un'Infrastruttura Operativa costruita sul modo in cui lo studio lavora davvero."
- [=] Timeline dello spreco: "La mattina scorre. Il lavoro vero aspetta."
  - 8:42 "L'email è già piena."
  - 9:30 "Un cliente cerca un allegato di tre mesi fa."
  - 10:04 "Il collaboratore dice: 'sì, ci guardo'."
  - 11:00 "Cinque messaggi WhatsApp per sapere a che punto siete."
  - 13:00 "Quattro ore lavorate. Una e mezza fatturabili."
- Grafica: la sezione scura di adesso, con la barra della giornata al 37%. La timeline si accende un orario alla volta mentre scorri: è l'animazione di questa sezione.

## 3. Calcolatore

- [=] "Calcolatore ROI"
- [=] "Quanto vi sta costando il 'facciamo come sempre'?"
- [=] "La domanda vera non è quanto costa INNOVALEX. È quanto ti sta già costando non averlo. Inserisci i dati del tuo studio, il calcolo confronta il costo reale del tuo metodo attuale, non quello di altri software."
- Campi [=]: ore al giorno perse sulla posta (da 0,5 a 6), tariffa oraria media (da 100 a 300 €), numero di avvocati (da 3 a 20).
- Sistemi da simulare [=], con le tue descrizioni:
  - Ordine Operativo: "Elimina il lavoro manuale sulla casella email e rende visibile tutto ciò che oggi si disperde."
  - Visibilità Economica: "Trasforma il lavoro fatto in valore visibile, pratica per pratica, cliente per cliente."
  - Governance Operativa: "Sostituisce rincorse e messaggi interni con visibilità reale sul lavoro del team e soci."
- Risultato [=]: valore annuale recuperabile, ore al mese recuperate, risparmio mensile.
- Nota [≈]: "Il calcolo usa i tuoi numeri. L'unica ipotesi è quanto tempo recupera ogni sistema, ed è scritta accanto a ognuno." (prima diceva "non è una proiezione", ma le percentuali sono fisse nel codice)
- Ipotesi visibili, uguali a quelle di oggi: Ordine Operativo 75%, Governance Operativa 10%, Visibilità Economica 8%, massimo 93%. I risultati non cambiano.
- Correzione tecnica: oggi la casella "Governance" usa la percentuale e l'etichetta dell'archiviazione. Si allineano nome, percentuale e dato inviato.
- Richiesta dell'analisi dopo il risultato:
  - [=] "Vuoi l'analisi completa per il tuo studio?"
  - [≈] "Ti inviamo un report personalizzato con il dettaglio del costo nascosto e la configurazione INNOVALEX più adatta alla dimensione del tuo studio." (tolto "confronto con studi simili": non esiste)
  - [≈] "Usiamo la tua email solo per inviarti l'analisi richiesta. Privacy Policy." (prima: "non condivisi con terzi", ma la privacy policy indica fornitori)
  - [=] "Perfetto. Riceverai l'analisi personalizzata entro 24 ore."
- Invio: stessa chiamata a /api/roi-lead di oggi, stessi campi. Funziona già e arriva su ClickUp.

## 4. Come funziona

- [=] "Come Funziona INNOVALEX"
- [≈] "Non cambi il modo in cui lavori. INNOVALEX si integra nel tuo Studio." (prima: "Non installi nulla", ma l'add-in si installa)
- [=] "La tua email contiene già tutto quello che ti serve per gestire lo Studio."
- [≈] "INNOVALEX parte da lì: integra un'Infrastruttura Operativa in quello che usi già ogni giorno, la tua casella email." (prima: "non aggiunge un nuovo sistema", ma c'è la dashboard)
- [≈] Il Pannello: "Il tuo centro di comando, dentro la tua email. Un pannello integrato in Outlook: classifica, assegna e traccia senza uscire dalla tua casella. Tu confermi con un click, il sistema fa tutto il resto." (solo Outlook: Gmail e PEC non sono nella V1)
- Grafica: la scena a 5 passi di adesso ("Segui una mail, dall'arrivo al valore"), testi dei passi invariati. Sostituisce lo schema vecchio con le emoji e "Agente AI".

## 5. Tre sistemi, una sola infrastruttura

- Apertura:
  - [=] "Una sola infrastruttura. Tre risultati che cambiano come lavori."
  - [=] "I sistemi non sono tre prodotti da comprare separatamente. Sono i tre punti in cui oggi si brucia valore."
  - È l'apertura della sezione "Architettura" in fondo al sito attuale. Quella sezione sparisce, perché ripeteva questa.
- Ogni sistema ha la stessa forma: etichetta, titolo, testo, quattro voci brevi, una scena animata affiancata.

### Ordine Operativo
- [≈] Titolo: "Ogni email al posto giusto." (tolto "prima ancora che tu la apra": dipende dai tempi di elaborazione)
- [≈] Testo: "Le email vengono classificate, archiviate e collegate alla pratica giusta. Il pannello INNOVALEX, integrato in Outlook, ti permette di confermare con un click e governare l'intero flusso senza cambiare nulla nel modo in cui lavori." (tolta la PEC)
- Voci:
  - [=] Classificazione AI: "L'AI legge contenuto, oggetto e allegati e propone la classificazione per urgenza, priorità e tipo. Tu confermi dal pannello con un click."
  - [≈] Archiviazione PDF automatica: "Ogni mail diventa un PDF nella cartella del cliente e della pratica giusti, con gli allegati, numerazione progressiva e zero intervento manuale." (tolta l'incorporazione degli allegati nel PDF, non verificata)
  - [≈] Scadenzario: "INNOVALEX rileva udienze, termini e depositi e te li propone. Tu confermi e finiscono in calendario, anche in Outlook." (tolti gli avvisi a 30, 15, 7 e 1 giorno e il canale della cancelleria)
  - [≈] Nuovo contatto: "Quando scrive un mittente sconosciuto, INNOVALEX te lo segnala e con un click apri la pratica, creando cliente e cartella." (tolto "senza inserimento manuale": l'aggancio lo fa l'avvocato)
- Grafica: la lastra della cartella con i PDF numerati.

### Visibilità Economica
- [=] Titolo: "Il lavoro che fai diventa valore che si vede."
- [≈] Testo: "Questo report normalmente non esiste. INNOVALEX lo prepara per cliente e pratica. Per ricostruirlo a mano servirebbero decine di ore di lettura, ricerca, controllo allegati e ricostruzione delle attività." (tolto "ogni settimana": vedi i punti da confermare)
- Voci:
  - [≈] Report economico: "Ogni email inclusa nel report, marcata dal pannello con un click, alimenta il calcolo di ore e valore per cliente e pratica. Il report è modificabile in Word." (tolto "pronto ogni lunedì mattina")
  - [+] Ore stimate: "Le ore che non hai segnato le stima INNOVALEX. Restano a parte finché non le confermi." (sostituisce le riunioni di Teams e Meet, che non sono ancora costruite)
  - [≈] Dal report alla parcella: "La parcella nasce dal report, non dalla memoria. Attività, ore, tariffa per tipo di pratica e valore per cliente sono già lì: INNOVALEX prepara la proforma. Zero doppio inserimento." (tolti XML FatturaPA e "compatibile con qualsiasi sistema")
  - [=] Valore per socio: "Per ogni socio e collaboratore INNOVALEX traccia pratiche originate, pratiche gestite, ore lavorate e valore economico generato. La base oggettiva per la distribuzione degli utili, senza discussioni e senza memoria."
- Grafica: la scena del beneficio 1 (il valore del mese che passa da 2.775 a 3.750 € quando confermi le ore stimate).

### Governance Operativa
- [=] Titolo: "Sai sempre chi sta facendo cosa. Senza rincorrere nessuno."
- [=] Testo: "Quando assegni una pratica dal pannello INNOVALEX, il sistema fa tutto il resto. Il collaboratore riceve cartella e materiale. Tu vedi lo studio in tempo reale. E sai esattamente chi genera valore, senza chiederlo a nessuno."
- Voci:
  - [=] Assegnazione dal pannello: "Dall'interno della casella email, con un click, assegni la pratica al collaboratore. Il sistema crea automaticamente la cartella con tutti gli allegati, invia il riepilogo operativo e popola la dashboard. Nessun WhatsApp, nessun forward manuale, nessun recap da scrivere."
  - [=] Dashboard collaboratori: "Una schermata mostra l'intero studio: chi sta lavorando su cosa, lo stato di ogni pratica, il livello di urgenza e le ore accumulate. Se una pratica si blocca, si vede subito."
  - [+] Pipeline delle pratiche: "Ogni pratica nella sua fase, dalla prima mail alla chiusura."
  - [+] Avviso al cliente: "Cambi fase e il cliente riceve l'aggiornamento, con il link per mandarti i documenti. Basta messaggi per sapere a che punto siete."
- Grafica: la scena del beneficio 2 (la cartella che passa da Sara a Paolo, con la molla).
- Pulsante dopo i tre sistemi: "Prenota la Diagnosi Operativa".

## 6. Tutto lo studio in un posto

- Come adesso: blocchi asimmetrici e scorrimento su mobile, gli stessi sei blocchi. Funziona da riepilogo prima della prova reale.
- La scena del beneficio 3 (la pipeline) entra qui come blocco grande di "Pratiche", al posto della mini pipeline.

## 7. AI e compliance

- AI: la sezione scura di adesso, invariata ("Il lavoro ripetitivo lo fa INNOVALEX. Le decisioni restano tue." con le due colonne e la scadenza da confermare).
- Compliance, al posto delle quattro frasi di sicurezza:
  - [=] "La Compliance non è un dettaglio. È la condizione per lavorare con uno studio legale."
  - [≈] GDPR: "Tutto il processo avviene su server in Europa. I dati del vostro studio non vengono usati per addestrare modelli AI." (tolti "certificati" e "non escono mai dall'UE", non documentati)
  - [≈] Segreto professionale: "I dati del vostro studio, nomi dei clienti, contenuto delle pratiche e comunicazioni riservate, li vede solo chi ha il ruolo per vederli." (tolto "controllo esclusivo", assoluto)
  - [=] AI Act e Legge 132/2025: "L'Infrastruttura Operativa di INNOVALEX è progettata in coerenza con i principi di trasparenza, supervisione umana e responsabilità previsti dal quadro normativo italiano ed europeo."
  - [=] "DPA disponibile in fase contrattuale."
- Il testo "AI Act" resta da far rileggere a Cocola prima della pubblicazione, come già previsto.

## 8. Risultati reali

- [=] "Risultati reali"
- [=] "Non una demo. Un cliente reale, con numeri reali, su flussi reali."
- [=] "SCLN Legal Network. Da ore disperse ogni settimana a un'Infrastruttura Operativa misurabile."
- [≈] "Il progetto ha lavorato su archiviazione automatica di tutte le comunicazioni, report economici per pratica e cliente, dashboard collaboratori in tempo reale. Il valore è stato misurato su tempo recuperato, governance operativa e visibilità economica." (tolto "settimanali")
- Numeri: 600+ email al mese, 8 caselle collegate, 80 pratiche aperte, 41 clienti attivi. Questi ultimi tre restano bloccati dal test finché Cocola non li conferma.
- [=] Citazione: "Il valore non è stato aggiungere un altro software. È stato avere un'infrastruttura che segue il modo in cui lo studio lavora davvero." Francesco Cocola, SCLN Legal Network. Con la sua foto.
- Pulsante: "Prenota la Diagnosi Operativa".

## 9. Diagnosi e form

- [=] "Prima Call"
- [=] "Diagnosi Operativa in 30 minuti"
- [=] "In 30 minuti analizziamo insieme i flussi reali del tuo studio: come gestisci le email oggi, quanto tempo va in operatività non fatturabile, come monitori il lavoro dei collaboratori, se sai esattamente quanto vale ogni pratica aperta."
- [=] "Alla fine dei 30 minuti sai esattamente quanto ti sta costando il tuo metodo attuale."
- Campi [=], tutti quelli di oggi:
  - nome, studio, email;
  - ruolo (Titolare o Founder, Managing Partner, Partner, Responsabile operativo o IT, Altro);
  - telefono facoltativo;
  - persone nello studio (1-3, 4-10, 11-20, 21-50, 50+);
  - priorità, anche più di una (gestire email e PEC, recuperare valore economico, organizzare collaboratori e soci, altro);
  - email e PEC al giorno;
  - strumenti usati oggi.
- [=] Pulsante: "Prenota la Diagnosi Operativa. Partiamo dai tuoi numeri reali."
- [=] Esito: "Grazie. Ti contatteremo entro 24h." In caso di errore: "Invio non riuscito. Riprova tra pochi minuti."
- Pagina di conferma [≈]: tolte la mail di conferma e l'invio di caso studio e whitepaper, perché oggi non parte nulla. Tornano con il funnel email. Restano: "Analizziamo i dati che hai inviato nel form." e "In call partiamo dai flussi reali dello studio, non da una demo generica."
- Invio: stessa chiamata a /api/lead di oggi, stessi campi. È già sistemata dal commit 58e6b05.

## 10. FAQ

Come nella fase 3.1, con il tuo sottotitolo: segretaria, gestionale (riscritta come hai detto), 30 giorni, parcella, AI.

## 11. Chi siamo

- [+] "INNOVALEX nasce dentro uno studio legale."
- Federico Garau, Fondatore e amministratore, con il tuo testo Founder [=].
- Avv. Francesco Cocola, Co-fondatore.
- Foto: stessa cornice, stesso taglio, stesso fondo (è il lavoro della fase 3.2, che entra qui).
- [=] Pulsante finale: "Prenota la Diagnosi Operativa".

## 12. Piè di pagina

- [=] "L'Infrastruttura Operativa per Studi Legali italiani. Costruita sull'email che già usi. Progettata per non cambiare il modo in cui lavori."
- [=] Contatti, dati societari, LinkedIn, Privacy e Cookie Policy.
- [=] "Server EU, GDPR by design, DPA disponibile in fase contrattuale."
- Ruolo: "Federico Garau, Fondatore e amministratore".

## Cosa si riusa e cosa esce

- **Si riusa:** colori, font, intestazione, foto della prima schermata del sito attuale, lastre, scena, sezione scura del 37%, tre scene dei benefici, blocchi dello studio, sezione AI, foto, FAQ, verifica dei testi.
- **Esce:**
  - la prima schermata con le lastre: torna quella del sito attuale;
  - il titolo "Cosa cambia nello studio": le tre scene vanno dentro i tre sistemi;
  - le quattro frasi di sicurezza: sostituite dalla compliance del sito attuale;
  - il segnaposto del form: arriva il form vero;
  - i riquadri rossi dell'anteprima.

## Come si costruisce

Due sessioni di Claude Code, una dopo l'altra, sul ramo rifacimento-sito:

1. **Struttura, testi e calcolatore:** sezioni 1-8 e 10-12, calcolatore collegato a /api/roi-lead, foto sistemate.
2. **Form della diagnosi:** sezione 9 collegata a /api/lead, pagina di conferma, prova automatica dell'invio.

Main e la produzione non si toccano fino al collaudo finale.

## Punti da confermare (con una scelta già fatta)

1. **"Riceverai l'analisi entro 24 ore" e "Ti contatteremo entro 24h".** Restano: il contatto arriva su ClickUp e rispondi tu. Se non vuoi questo impegno, si tolgono.
2. **Report "ogni lunedì".** Tolto. Se il report settimanale automatico è già acceso, si rimette.
3. **SCLN, "20 ore recuperate a settimana" e "156.000 € l'anno".** Fuori. Rientrano se Cocola li conferma.
4. **Percentuali del calcolatore (75%, 10%, 8%).** Restano le tue, solo rese visibili.

## Rischi

- **Lunghezza.** La pagina torna simile al sito attuale. Le tre sezioni dei sistemi devono restare compatte: titolo, testo, quattro voci brevi, una scena.
- **Promesse nei testi.** Ogni frase con una funzione passa dal test dei contenuti. Una funzione che il giorno della pubblicazione non fosse accesa da SCLN fermerebbe la build.
