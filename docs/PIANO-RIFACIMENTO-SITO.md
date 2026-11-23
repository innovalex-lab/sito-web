# Piano di rifacimento del sito INNOVALEX

Stato al 23/11/2026. Piano aggiornato con le decisioni di Federico all'avvio della fase 1.

Legenda: **FACT** = verificato su file, codice o misura. **INFERENCE** = deduzione ragionata dai fatti. **OPINION** = raccomandazione. Le domande aperte sono nella sezione L.

---

## Decisioni del 23/11/2026

Decisioni di Federico. Prevalgono su ogni altra parte di questo documento.

- **L1, chiusa.** Form della diagnosi già corretto in produzione (58e6b05). L'avviso email non è attivo perché manca la chiave Resend. Il sistema di email (conferme, sequenze, newsletter) è in definizione a parte, fuori da questo lavoro. Il form del nuovo sito deve restare compatibile con `api/lead.js`.
- **L2, chiusa.** "Attivo" vuol dire acceso su almeno uno studio reale.
- **L3, chiusa.** I contatti restano su ClickUp finché l'ingresso lead del CRM non è pronto.
- **L4, chiusa.** In futuro i lead entreranno in uno spazio del CRM dedicato a INNOVALEX.
- **L5, chiusa.** `/contratti`, `robots.txt` e `sitemap.xml` restano fuori dal rifacimento e devono continuare a funzionare identici. Verifica nella sezione B.6.
- **L6, chiusa.** Il calcolatore ROI si toglie al lancio del nuovo sito. Sul sito attuale resta per ora.
- **L7, chiusa.** Le "automazioni attivabili per ruolo" non si citano.
- **L8, chiusa.** Il dato Clio si scrive così, con fonte e link: "In media solo il 37% di una giornata di otto ore va in lavoro fatturabile".
- **L9, aperta.** Logo vettoriale: risposta in arrivo. Non serve nella fase 1.
- **L10, chiusa.** Si pubblica dopo l'accensione della V1 su SCLN.
- **L11, chiusa.** Il Tavolo Fondatori non va sul sito.
- **Pagina di ringraziamento.** Non deve promettere invii (caso studio, whitepaper) finché non esistono davvero.

---

## A. Sintesi

**Obiettivo.** Rifare da zero www.innovalexai.it, grafica compresa, perché dica solo cose vere sul prodotto di oggi e porti gli studi legali a prenotare una diagnosi di 30 minuti.

**Cosa cambia.**

- Il messaggio passa da "centro di controllo con l'AI" a controllo, visibilità ed efficienza, con il lavoro ripetitivo automatizzato. L'AI resta uno strumento.
- Spariscono le affermazioni non vere, i numeri senza metodo e gli screenshot vecchi.
- La grafica usa l'identità della presentazione commerciale: blu inchiostro, oro, crema, Source Serif 4 e Inter.
- Quattro animazioni raccontano il prodotto al posto delle animazioni decorative.
- I contatti entrano nel CRM di INNOVALEX quando il suo ingresso lead sarà pronto.
- La tecnologia passa da un unico HTML a Astro, con React solo nei punti animati.

**Tre fatti che condizionano il piano.**

1. **FACT.** Il form principale "Prenota la Diagnosi Operativa" non invia nulla dal 10/06/2026. Il codice legge un campo tolto in quella data, il clic va in errore e l'utente non vede alcun messaggio. Togliendo una riga, su una copia locale, l'invio riparte. La correzione è fuori da questa sessione (domanda L1).
2. **FACT.** L'ingresso lead da form del CRM è previsto nella V1 ma non esiste ancora. È una richiesta da portare a chi sviluppa il CRM (sezione H).
3. **FACT.** Molte funzioni della V1 sono installate solo sullo studio di prova o sono ancora in verifica. Il sito non può presentarle come attive finché non sono accese davvero (sezione C).

**Fasi e stima.** Otto fasi, circa 10-12 sessioni di Claude Code, più il tempo delle approvazioni (INFERENCE, dettaglio nella sezione J).

| Fase | Contenuto | Sessioni |
|---|---|---|
| 1 | Fondamenta Astro, parità di percorsi, anteprima | 1 |
| 2 | Sistema grafico e prima schermata | 1-2 |
| 3 | Sezioni e testi | 2 |
| 4 | Animazioni firma | 2 |
| 5 | Screenshot dalla demo | 1 |
| 6 | Form e contatti | 1 |
| 7 | SEO e pagine legali | 1 |
| 8 | Collaudo e pubblicazione | 1-2 |

---

## B. Audit del sito attuale

### B.1 Come è stato fatto

- **FACT.** La home in produzione è identica byte per byte a `index.html` del ramo main (controllo del 23/11/2026).
- Screenshot a pagina intera in `docs/audit/`, a 1440 e 390 px, locale e produzione. Per fotografare tutte le sezioni è stata forzata la loro visualizzazione, perché il sito le disegna solo quando entrano nello schermo.
- Il form è stato provato su una copia locale con l'invio intercettato. Nessun contatto di prova è arrivato a ClickUp.

### B.2 Affermazioni del sito e loro stato

Esito: **VERA** = confermata dal repo INNOVALEX. **NON VERA** = smentita da repo o codice. **NON VERIFICABILE** = nessuna prova nel repo, da verificare con Federico. Le righe di `index.html` si riferiscono al commit 064a165.

| N. | Affermazione | Riga | Esito | Fonte o nota |
|---|---|---|---|---|
| 1 | 66.000 € l'anno recuperabili per avvocato | 1059 | NON VERIFICABILE | È 2 h x 220 giorni x 150 €, ipotesi senza metodo dichiarato. Da verificare con Federico |
| 2 | 440 ore l'anno di lavoro non fatturabile | 1063 | NON VERIFICABILE | Stessa ipotesi del punto 1 |
| 3 | ROI sotto i 30 giorni, documentato su flussi reali | 1067 | NON VERIFICABILE | Nessun documento di calcolo nel repo |
| 4 | 66.000 € è il valore "documentato" del modulo Ordine Operativo | 1073 | NON VERIFICABILE | Nessun documento di calcolo nel repo |
| 5 | Per uno studio medio il valore supera 150.000 € l'anno | 1073 | NON VERIFICABILE | Nessuna fonte |
| 6 | 750 € al giorno bruciati per avvocato | 1100 | NON VERIFICABILE | Usa 5 ore al giorno, mentre il calcolatore parte da 2 |
| 7 | Solo il 36% delle ore lavorate diventa fattura | 1107 | NON VERA | Clio, Legal Trends Report 2024: 37%, misurato su una giornata di 8 ore |
| 8 | Alle 13, quattro ore lavorate e una e mezza fatturabili | 1119 | NON VERIFICABILE | Scenario illustrativo presentato come fatto |
| 9 | Il calcolo usa i tuoi dati reali e non è una proiezione | 1174 | NON VERA | `index.html` 2263-2273: riduzioni fisse del 75%, 10% e 8%, decise nel codice |
| 10 | Report personalizzato con confronto con studi simili | 1269 | NON VERIFICABILE | Nessuna funzione nel codice del sito. Da verificare con Federico |
| 11 | Analisi personalizzata entro 24 ore | 1287 | NON VERIFICABILE | Impegno manuale, da confermare |
| 12 | I dati non vengono condivisi con terzi | 1282 | NON VERA | La privacy policy, sezione 6, indica fornitori che li trattano |
| 13 | Non installi nulla | 1301 | NON VERA | `docs/RUNBOOK-ONBOARDING-STUDIO.md`, passi 4 e 7: add-in nel tenant e collegamento delle caselle |
| 14 | INNOVALEX non aggiunge un nuovo sistema | 1306 | NON VERA | Esiste una dashboard separata (`CLAUDE.md`, "Cos'è INNOVALEX") |
| 15 | Outlook, Gmail o PEC entrano nel flusso | 1314 | NON VERA | `docs/PIANO-V1.md` sez. 1: IMAP e Gmail fuori dalla V1 |
| 16 | Le email sono prese in carico immediatamente | 1314 | NON VERIFICABILE | Tempi non documentati come impegno |
| 17 | L'AI classifica per urgenza, priorità e tipo | 1326 | VERA | `docs/STATO.md`, analisi AI delle email |
| 18 | L'AI rileva scadenze, udienze e termini | 1326 | VERA | `docs/STATO.md`: scadenze come proposte, confermate dall'avvocato |
| 19 | Riconosce se il mittente è un cliente esistente | 1326 | VERA | Decisione G26: avviene sugli indirizzi agganciati dall'avvocato |
| 20 | Pannello in Outlook, Gmail e qualsiasi webmail | 1344 | NON VERA | Solo Outlook. `docs/PIANO-V1.md` sez. 1 |
| 21 | Dal pannello si conferma cliente, collaboratore, urgenza e inclusione nel report | 1344 | VERA | `docs/STATO.md`, pannello add-in |
| 22 | L'email diventa un PDF archiviato nella cartella giusta | 1365 | VERA | `docs/STATO.md`, archiviazione |
| 23 | Le scadenze entrano nel calendario con alert automatici | 1365 | NON VERA | Calendario in verifica, `docs/STATO.md` e coda di verifica |
| 24 | I nuovi contatti sono proposti per aprire una pratica | 1365 | VERA | Il pannello permette la qualificazione. Decisioni G25 e G26 |
| 25 | Il collaboratore riceve cartella, materiale e recap | 1374 | VERA | `docs/STATO.md`, cartelle di lavoro |
| 26 | La dashboard mostra chi lavora su cosa, stato e ore | 1374 | VERA | `docs/STATO.md`, dashboard |
| 27 | Visibile il valore generato da ogni socio | 1374 | VERA | Pagina Valore per socio, solo managing partner |
| 28 | Ogni lunedì il report è pronto in automatico | 1383 | NON VERA | `docs/gate/GATE-B-REPORT.md`: il settimanale automatico deve ancora partire |
| 29 | Le riunioni Teams e Meet entrano nel report | 1383 | NON VERA | Fase 2 del calendario, `docs/gate/GATE-B-CALENDARIO-F1.md` |
| 30 | Una riunione di 45 minuti vale 112,50 € nel report | 1596 | NON VERA | Dipende dalla funzione del punto 29 |
| 31 | Dal report nasce la bozza di parcella | 1383 | VERA | `docs/STATO.md`: report e proforma |
| 32 | Pannello "integrazione nativa" in Outlook | 1474 | VERA | Add-in Outlook in produzione |
| 33 | Gmail e PEC con estensione Chrome | 1478 | NON VERA | `docs/PIANO-V1.md` sez. 1: estensione in pausa |
| 34 | Ogni email è analizzata prima che tu la apra | 1501 | NON VERIFICABILE | Dipende dai tempi di elaborazione |
| 35 | PDF con intestazione, corpo e allegati incorporati | 1509 | NON VERIFICABILE | Archiviazione confermata, l'incorporazione degli allegati nel PDF non trovata |
| 36 | Nomi dei file con numerazione progressiva | 1509 | VERA | Decisione B1 |
| 37 | Alert a 30, 15, 7 e 1 giorno | 1515 | NON VERA | Nessuna traccia nel codice o nelle decisioni |
| 38 | Comunicazioni di cancelleria con canale dedicato e alert immediato | 1515 | NON VERIFICABILE | Esiste un controllo sulle PEC di cancelleria nell'analisi, ma la PEC non è un canale della V1 |
| 39 | Il database clienti si costruisce senza inserimento manuale | 1521 | NON VERA | Decisioni G25 e G26: l'aggancio è un atto dell'avvocato |
| 40 | 600+ email al mese gestite | 1531 | NON VERIFICABILE | Nessun metodo. Il dato interno recente è molto diverso: va ricalcolato |
| 41 | Report modificabile in Word | 1588 | VERA | `docs/gate/GATE-B-REPORT.md`, generazione DOCX |
| 42 | Le riunioni entrano nel report senza segnarle a mano | 1592 | NON VERA | Fase 2 del calendario |
| 43 | Parcella esportabile in PDF e Word | 1604 | NON VERIFICABILE | Word confermato, PDF della parcella da verificare |
| 44 | Export in XML FatturaPA | 1604 | NON VERA | Nessuna traccia nel codice di main e dei rami in rilascio |
| 45 | Compatibile con qualsiasi sistema di fatturazione | 1604 | NON VERA | Dipende dal punto 44 |
| 46 | Zero doppio inserimento, zero errori di trascrizione | 1604 | NON VERIFICABILE | Affermazione assoluta |
| 47 | Con un clic si assegna e il sistema crea cartella e riepilogo | 1624 | VERA | `docs/STATO.md`, cartelle di lavoro |
| 48 | Vedi lo studio in tempo reale | 1616 | NON VERIFICABILE | Nessuna definizione di "tempo reale" |
| 49 | Una pratica bloccata si vede subito | 1629 | NON VERIFICABILE | Da provare sulla demo |
| 50 | Pratiche originate, gestite, ore e valore per socio | 1634 | VERA | `ValorePerSocioPage` nel repo Plugin |
| 51 | Il dato che nessun gestionale produce | 1634 | NON VERIFICABILE | Confronto di mercato senza fonte |
| 52 | Server certificati in Europa | 1676 | NON VERIFICABILE | Europa confermata, certificazioni non documentate |
| 53 | I dati non escono mai dall'UE | 1676 | NON VERIFICABILE | Assoluto. Usare la frase consentita: dati dello studio su server in Europa |
| 54 | I dati non addestrano modelli AI | 1676 | NON VERIFICABILE | Affermazione consentita da Federico. Conservare la prova contrattuale |
| 55 | Dati sotto il vostro controllo esclusivo | 1681 | NON VERIFICABILE | Assoluto, da togliere |
| 56 | Coerenza con AI Act e Legge 132/2025 | 1686 | NON VERIFICABILE | Serve una valutazione legale |
| 57 | Un cliente reale, non una demo | 1697 | VERA | `CLAUDE.md`: studio reale in produzione |
| 58 | 20 ore recuperate a settimana, 1.040 l'anno | 1724 | NON VERIFICABILE | Nessun metodo dichiarato |
| 59 | 156.000 € di valore annuo | 1741 | NON VERIFICABILE | 1.040 h x 150 €, stessa ipotesi del punto 58 |
| 60 | Citazione di Francesco Cocola | 1746 | NON VERIFICABILE | Da far riapprovare |
| 61 | Report settimanali nel progetto SCLN | 1711 | NON VERA | Vedi punto 28 |
| 62 | Ti contatteremo entro 24 ore | 1959 | NON VERA | Il form principale non invia (sezione B.4) |
| 63 | Mail di ringraziamento entro pochi minuti | 2053 | NON VERA | Il form non invia e `api/lead.js` non spedisce email |
| 64 | Caso studio e whitepaper con invio automatico | 2072 | NON VERA | Nessun invio nel codice del sito |
| 65 | In 30 minuti sai esattamente quanto ti costa il metodo attuale | 1831 | NON VERIFICABILE | Promessa assoluta |
| 66 | Un sistema fa quel lavoro meglio e senza errori | 1982 | NON VERIFICABILE | Assoluto |
| 67 | Non entra in competizione con i gestionali | 1990 | NON VERA | La V1 include pratiche, CRM e calendario |
| 68 | Se non raggiunge gli obiettivi nei primi 30 giorni interveniamo | 1999 | NON VERIFICABILE | Impegno commerciale, da confermare |
| 69 | Il problema non ha soluzione sul mercato italiano | 2030 | NON VERIFICABILE | Confronto di mercato senza fonte |
| 70 | Ogni studio lo seguo direttamente, con il mio team | 2032 | NON VERIFICABILE | Da confermare |
| 71 | DPA disponibile in fase contrattuale | 2116 | NON VERIFICABILE | Affermazione consentita da Federico. Il documento va tenuto pronto |
| 72 | Dati societari nel footer | 2111 | VERA | Restano quelli attuali, per decisione di Federico |

### B.3 Base di partenza misurata

**FACT.** Misure del 23/11/2026 su www.innovalexai.it in laboratorio, con Chromium, cache disattivata, mediana di 3 prove. Mobile: 390 px, rete 1,6 Mbps con 150 ms di latenza, CPU rallentata 4 volte.

| Misura | Desktop 1440 | Mobile 390 simulato | Obiettivo nuovo sito |
|---|---:|---:|---:|
| LCP | 0,34 s | 1,33 s | sotto 2,5 s, puntiamo a 1,8 s |
| CLS | 0,00 | 0,00 | sotto 0,1 |
| Primo disegno (FCP) | 0,34 s | 0,67 s | sotto 1,2 s |
| Caricamento completo | 0,49 s | 1,50 s | sotto 2,5 s |
| Peso trasferito | 204 KB | 265 KB | sotto 400 KB |
| Richieste | 6 | 7 | sotto 15 |
| di cui immagini | 121 KB | 182 KB | sotto 200 KB |
| di cui font | 49 KB | 49 KB | sotto 70 KB |
| di cui CSS | 7 KB | 7 KB | sotto 25 KB |
| HTML compresso | 27 KB | 27 KB | sotto 30 KB |

- **FACT.** INP non è stato misurato: serve un'interazione reale. Si misura nella fase 8.
- **FACT.** Il sito attuale è veloce. Il rifacimento non deve peggiorarlo: è il rischio tecnico principale.
- **FACT.** Peso del repo: 44,9 MB versionati. `assets` 31,6 MB, di cui immagini 7,1 MB e video 24,5 MB. La home non usa il video.

### B.4 Difetti funzionali

- **FACT, grave.** Form principale fermo dal commit ef677d3 del 10/06/2026. Il campo `revenueRange` è stato tolto dalla pagina ma `index.html:2499` lo legge ancora. Risultato: errore JavaScript, nessuna chiamata a `/api/lead`, nessun messaggio a chi compila.
- **FACT.** Il form del calcolatore invece parte: la chiamata a `/api/roi-lead` viene eseguita.
- **FACT.** Solo `api/roi-lead.js` avvisa via Resend. `api/lead.js` non ha un avviso di riserva se ClickUp fallisce.
- **FACT.** Sullo stesso dominio è online una pagina `/contratti` che **non è in questo repo**, con le pagine `/contratti/privacy` e `/contratti/terms`. Anche `robots.txt` e `sitemap.xml` non sono nel repo, e la sitemap non contiene la home. Chi li pubblica è scritto nella sezione B.6.

### B.5 Igiene del repo

| Problema | Azione proposta |
|---|---|
| `node_modules` versionato: 601 file, 13,2 MB | Togliere dal tracciamento nella fase 1 |
| Video da circa 25 MB in `assets`, non usato dalla home | Resta raggiungibile allo stesso indirizzo. Decide Federico se toglierlo |
| Nome del pacchetto `new-project` | Rinominare in `innovalex-sito` |
| Due file `eval "$(ssh-agent -s)"` e `eval "$(ssh-agent -s)".pub` | Tolti da main con f9fa073. Li gestisce un'altra sessione |
| Meta Twitter con tag rotto, `index.html:22` | Sparisce con il rifacimento |
| Virgolette doppie nel menu, "Il Problema\"", righe 1000 e 1018 | Sparisce con il rifacimento |
| `>` isolato in Governance, riga 1432 | Sparisce con il rifacimento |
| "il36%", riga 1107 | Sparisce con il rifacimento |
| Pagine privacy e cookie caricano Tailwind da CDN | Portarle nel nuovo build |
| Font caricati da Google | Ospitarli sul sito |
| Emoji usate come icone nel flusso | Sparisce con il rifacimento |

### B.6 Chi serve `/contratti`, `robots.txt` e `sitemap.xml`

Verifica del 23/11/2026, solo in lettura.

**Conclusione 1, certezza alta.** I cinque indirizzi sono pubblicati dall'applicazione Next.js del repo `innovalex-lab/innovalex-webapp`, come progetto Vercel distinto da `sito-web`.

- **FACT.** Le risposte hanno `server: Vercel` e `x-matched-path` interni all'altra applicazione: `/`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`.
- **FACT.** La pagina carica i file da `/contratti/_next/` e ha il titolo "Analisi contratti con 4 agenti AI". `sito-web` non contiene Next.js.
- **FACT.** `innovalex-webapp` contiene `app/robots.ts`, `app/sitemap.ts` e un `basePath` configurabile in `next.config.js`.
- **FACT.** `x-vercel-id` mostra più passaggi su `/contratti` (`fra1:fra1:fra1`) e uno solo sulla home: la richiesta viene inoltrata.

**Conclusione 2, certezza media.** La regola che porta questi indirizzi da `www.innovalexai.it` all'altro progetto è configurata su Vercel, fuori dai repo.

- **FACT.** Nessun ramo di `sito-web` ha mai contenuto `vercel.json`, riscritture o redirect. Il `vercel.json` di `innovalex-webapp` non ne contiene.
- **Non verificato.** Il pannello Vercel non è stato aperto, quindi il tipo esatto di regola non è confermato. Non è provato nemmeno che la regola sopravviva a un deploy con framework Astro: le risposte attuali arrivano in parte dalla cache.

**Come la fase 8 li preserva.**

1. Prima del merge, Federico o una sessione autorizzata individua nel pannello Vercel la regola e annota progetto, percorsi e destinazione. Non si modifica nulla.
2. La build non deve contenere `contratti/`, `robots.txt` o `sitemap.xml`, perché un file statico con lo stesso percorso può avere la precedenza su una riscrittura. Oggi non li contiene. `@astrojs/sitemap` crea solo `sitemap-index.xml` e `sitemap-0.xml`.
3. Prima del merge si salvano stato, tipo e contenuto dei cinque indirizzi. Subito dopo il deploy si confrontano, senza cache.
4. Se un indirizzo cambia, si torna subito al deploy precedente con la promozione su Vercel. Solo dopo si valuta una riscrittura esplicita in `vercel.json` verso l'origine annotata al punto 1.

---

## C. Stato reale del prodotto

**Fonte.** Repo INNOVALEX e Plugin in sola lettura, al 23/11/2026. Ultimo main INNOVALEX: 0e284d7 del 20/11. Ultimo main Plugin: 7a42db1 del 17/11. Stato delle verifiche: ramo `coordinamento`.

**Regola del sito.** Si presenta come attivo solo ciò che è in produzione il giorno della pubblicazione. Prima di pubblicare, questa tabella va rifatta.

| Funzione | Stato | Dettaglio | Fonte |
|---|---|---|---|
| Pannello in Outlook: cliente, pratica, assegnazione, ore, scadenze, inclusione nel report | In produzione | Conferma e rifiuto delle scadenze compresi | `docs/STATO.md` |
| Archiviazione automatica di email e allegati in PDF | In produzione | Per cliente e pratica | `docs/STATO.md` |
| Cartella di lavoro con recap AI | In produzione | | `docs/STATO.md` |
| Report per cliente e proforma | In produzione | Su richiesta | `docs/STATO.md` |
| Valore per socio | In produzione | Solo managing partner | `docs/STATO.md`, repo Plugin |
| Pratiche in lista e in pipeline con scheda | In produzione | | `docs/STATO.md`, D19-D22 |
| Ruoli e permessi | In produzione | | Decisioni D16 ed E6b |
| Etichette in Outlook dall'analisi | In produzione | L'etichetta di stato è nella riga dedicata | Decisione G11 |
| Avviso al cliente al cambio di fase | In rilascio | Installato, acceso solo sullo studio di prova | `docs/STATO.md`, D23 |
| Link al cliente per caricare i documenti | In rilascio | Acceso solo sullo studio di prova, con passi ancora da chiudere per gli studi reali | `docs/STATO.md` |
| CRM unico: contatti con etichette, lead con pipeline | In rilascio | Installato, acceso solo sullo studio di prova | `docs/STATO.md`, D24-D28 |
| Carichi e assegnazioni del team | In rilascio | Visibile solo con il menu nuovo, acceso solo sullo studio di prova | Repo Plugin, `nav.ts` |
| Pulsante Nuova pratica | In rilascio | Verifica superata con riserve, non ancora su main | Coda `20261123-c-nuova-pratica-r3` |
| Vista archivio delle email | In rilascio | Verifica superata con riserve, non ancora su main | Coda `20261121-c-archivio-r2` |
| Analisi dei documenti fase 1 | In rilascio | Pronta, in attesa di verifica | Coda `20261121-c-doc-p1-r2` |
| Calendario interno con scrittura su Outlook | In rilascio | Pronto, in attesa di verifica | Coda `20261121-b-calendario-*` |
| Etichetta di stato in Outlook sulle email gestite | In rilascio | In attesa di verifica | `docs/PIANO-V1.md`, coda `20261121-b-cost1` |
| Attività e valore | In rilascio | In costruzione, non ancora pronta per la verifica | `docs/gate/GATE-C-ECONOMICA.md` |
| Report settimanale attivabile | In rilascio | Deve ancora partire | `docs/gate/GATE-B-REPORT.md` |
| Ingresso lead da form | In arrivo | Previsto nella V1, non costruito | `docs/PIANO-V1.md` sez. 1 e 5 |
| Automazioni attivabili per ruolo | **Non trovata** | Nessuna traccia in codice o decisioni (domanda L7) | Ricerca su main e rami |
| Riconoscimento dei meeting dal calendario | In arrivo | Fase 2 del calendario | `docs/gate/GATE-B-CALENDARIO-F1.md` |
| Gmail e IMAP | In arrivo | Fuori dalla V1 | `docs/PIANO-V1.md` sez. 1 |
| Estensione Chrome | In pausa | Fuori dalla V1, da non citare | `docs/PIANO-V1.md` sez. 1 |
| Fatturazione elettronica, pagamenti, riconciliazione, solleciti | In arrivo | Ciclo economico, fuori dalla V1 | `docs/PIANO-V1.md` sez. 1 |
| WhatsApp, banche dati giuridiche, deposito telematico | In arrivo | Fuori dalla V1 | `docs/PIANO-V1.md` sez. 1 |
| Agente AI, firma elettronica, antiriciclaggio | In arrivo | Riferimento di Federico, nessuna voce nel piano V1 | Da verificare con Federico |

**Sicurezza, frasi consentite sul sito:** dati dello studio su server in Europa; modelli AI che non si addestrano sui dati dello studio; permessi per ruolo; DPA disponibile in fase contrattuale. Nessun nome di fornitore e nessun dettaglio di infrastruttura.

**INFERENCE.** Al 23/11 il sito può presentare come attivo il nucleo posta, archivio, cartella di lavoro, pratiche, report e valore per socio. Il resto dipende dal rilascio. Per questo ogni blocco del nuovo sito avrà uno stato che decide come appare (sezione J, fase 3).

---

## D. Tecnologia

### D.1 Confronto

Motion for React, Kokonut UI e bklit UI richiedono React. Il sito è una sola pagina di marketing, quasi tutta statica.

| Criterio | Astro con React solo dove serve | Next.js con export statico | React con Vite |
|---|---|---|---|
| Prestazioni | Ottime: HTML puro, JavaScript solo nei blocchi animati | Buone, ma il runtime React si carica per tutta la pagina | Peggiori: la pagina si disegna via JavaScript |
| SEO | Ottima: testo già nell'HTML | Ottima | Debole senza prerender aggiunto |
| Accessibilità | Ottima base HTML, form funzionante anche prima del JS | Buona | Dipende tutta dal JS |
| Form serverless esistenti | Cartella `api/` riutilizzabile, da provare in fase 1 | Da adattare: l'export statico non ha rotte server proprie | Cartella `api/` riutilizzabile |
| Effort | Medio | Medio-alto | Medio, più il lavoro per la SEO |
| Manutenzione | Semplice, poche dipendenze | Aggiornamenti frequenti e più pesanti | Semplice, ma più codice su misura |

### D.2 Raccomandazione

**Astro con isole React. Confidenza: HIGH.**

- Il sito attuale pesa 265 KB su mobile. Astro è l'unica opzione che parte da zero JavaScript e lo aggiunge solo dove serve.
- React e Motion si caricano solo quando un'animazione entra nello schermo, quindi non toccano l'LCP.
- Un punto da provare subito: le funzioni in `api/` su Vercel con il build Astro. È il primo controllo della fase 1. Se fallisce, si passa all'adattatore ufficiale.

**Obiettivi:** LCP sotto 2,5 s su mobile, CLS sotto 0,1, INP sotto 200 ms. **Budget JavaScript:** massimo 130 KB compressi in totale, nessuno prima del primo disegno.

### D.3 Dipendenze

Versioni controllate su npm il 23/11/2026. I pesi sono misurati con un bundle di prova in una cartella temporanea, minificato e compresso gzip. Nulla è stato installato nel progetto.

| Pacchetto | Versione | Licenza | Peso nel browser | Motivo |
|---|---|---|---:|---|
| astro | 7.4.13 | MIT | 0 KB | Build del sito |
| @astrojs/react | 7.1.9 | MIT | Solo integrazione | Isole React |
| @astrojs/sitemap | 3.7.6 | MIT | 0 KB | Sitemap |
| react + react-dom | 19.3.1 | MIT | 67 KB, solo nelle isole | Richiesto da Motion for React |
| motion, con LazyMotion | 14.14.0 | MIT | 34 KB, solo nelle isole | Animazioni firma |
| tailwindcss + @tailwindcss/vite | 4.3.5 | MIT | Solo il CSS usato | Stili |
| @fontsource-variable/source-serif-4 | 5.3.1 | OFL-1.1 | Sottoinsieme latino | Titoli, ospitato sul sito |
| @fontsource-variable/inter | 5.3.0 | OFL-1.1 | Sottoinsieme latino | Testo, ospitato sul sito |

**Librerie valutate e non adottate di base (OPINION):**

- **anime.js 4.5.0, MIT, 12 KB.** È una buona libreria, ma con Motion sarebbe un secondo motore di animazione. Si usa solo se Motion non basta per una singola animazione.
- **Kokonut UI, MIT.** Dei 121 componenti molti sono per chat AI, sfondi e pulsanti a effetto: l'opposto della direzione scelta. Al massimo si copia un singolo componente, rivisto a mano.
- **bklit UI, MIT.** Grafici React che dipendono da Motion e da più moduli. Utile solo se la sezione del valore richiede un grafico vero. Per un solo grafico basta un SVG leggero fatto su misura.

### D.4 Skill

| Skill | Fonte e autore | Versione o commit | Esito |
|---|---|---|---|
| unslop-ui | github.com/felipebasurto/unslop-ui, Felipe Basurto, MIT | v1.0.1, commit bf709166f91cf46f254b8acbe8dc75d4c83efa66 | **Installata** in `.claude/skills/unslop-ui`, scelta da Federico. Solo testo, nessuno script |
| design-taste-frontend | github.com/Leonxlnx/taste-skill | Copia globale | Non copiata, decisione di Federico: si usa dalla cartella globale |
| impeccable | github.com/pbakaus/impeccable | v4.8.0, copia globale | Non copiata, decisione di Federico: si usa dalla cartella globale |
| bklit-ui, bklit-ui-design, bklit-ui-migrate | github.com/bklit/bklit-ui, MIT | commit 76299da698 | **Scartate:** contengono comandi di rete `npx shadcn`, uno eseguito al caricamento della skill |
| install-kokonutui-component | github.com/kokonut-labs/kokonutui, MIT | commit 7e4bd770ca | **Scartata:** comandi di rete `npx shadcn` e letture da registro remoto |
| Motion for React | github.com/motiondivision/motion, MIT | 14.14.0 | Nessuna skill ufficiale per gli utenti. Valutata come libreria |
| anime.js | github.com/juliangarnier/anime, MIT | 4.5.0 | Nessuna skill ufficiale. Valutata come libreria |
| heydamir/unslop | Damir Sokolovsky, CC BY 4.0 | commit 620163eedb | Scartata: script con rete e browser |
| theclaymethod/unslop | Clayton Kim | v2.3.0 | Non scelta: lavora sulla prosa, con esempi in inglese |
| mshumer/unslop | Matt Shumer, MIT | commit edcb62386d | Scartata: chiede clone e installazioni |

**FACT.** La cartella `~/Desktop/TRACCIA` non contiene skill. **INFERENCE.** Il metodo TRACCIA ha usato `design-taste-frontend` e `impeccable`, come mostrano i risultati salvati nella cartella e le note del progetto.

---

## E. Direzione grafica "anti AI"

### E.1 Divieti

Niente gradienti viola, effetti vetro generici, icone emoji, immagini di cervelli o robot, griglie di card tutte uguali. Inoltre, sul modello delle regole di unslop-ui: niente etichette maiuscole sopra ogni titolo, numeri decorativi 01/02/03, badge finti, punti pulsanti, barre colorate sul bordo delle card, contatori che salgono al caricamento, frecce dopo ogni link.

### E.2 Come si usano le skill

- **design-taste-frontend:** solo per controllare composizione e screenshot. La direzione è già decisa qui e nessuna proposta della skill la sostituisce.
- **impeccable:** critica di gerarchia, tipografia, accessibilità e stati dei componenti a fine di ogni fase visiva.
- **unslop-ui:** passaggio finale su testi e decorazioni, prima in modalità piano (`--plan --surface`) e con approvazione. Nella fase 2 si crea `.unslop-ui/taste.md` con le eccezioni: il titolo principale, i testi legali e le animazioni firma.

### E.3 Identità

| Ruolo | Colore | Uso |
|---|---|---|
| Blu inchiostro | `#1E2656` | Titoli, testo forte, pulsante principale |
| Blu profondo | `#141A3D` | Sezioni scure, massimo due nella pagina |
| Oro | `#9E7A35` | Accento, link, dettagli su fondo chiaro |
| Oro chiaro | `#D2B072` | Accento solo su fondo scuro |
| Crema | `#F8F3EA` | Fondo caldo delle sezioni narrative |
| Carta | `#F6F7F9` | Fondo neutro delle sezioni di prodotto |

- **Contrasto.** Il testo piccolo oro su crema va misurato in fase 2. Se non raggiunge 4,5:1, l'oro resta solo per elementi grandi o non testuali.
- **Tipografia.** Titoli in Source Serif 4, testo e interfaccia in Inter.
- **Logo.** Originale blu e oro, sempre su fondo chiaro. L'asset attuale `assets/innovalex-logo.png` è blu e oro ma è un'immagine raster su fondo bianco: serve confermare che sia la versione corrente e avere il vettoriale (domanda L9).
- **Composizione.** Taglio editoriale da rivista giuridica: colonne di testo larghe, molto spazio, schermate del prodotto grandi e ritagliate su un dettaglio. Ogni sezione ha una forma diversa.

### E.4 Principi di animazione

- **A cosa servono:** mostrare un passaggio del prodotto che a parole sarebbe lungo.
- **Quando non animare:** titoli, testi, numeri, card, ingressi di sezione allo scorrimento, form.
- **Durate:** risposta a un'azione 120-180 ms. Passaggio di stato 240-400 ms. Sequenza firma 3-6 s, una sola volta, con possibilità di rivederla.
- **Tecnica:** solo `transform` e `opacity`. Si avvia quando è visibile e si ferma fuori schermo.
- **`prefers-reduced-motion`:** ogni animazione ha uno stato finale statico, completo e leggibile.
- **Mobile:** sequenze più corte, nessun effetto legato allo scorrimento.

### E.5 Animazioni firma

Ognuna ha una versione statica. Si pubblica solo se la funzione mostrata è attiva.

1. **Dalla mail alla cartella.** Una mail entra nel pannello, si scelgono cliente e pratica, la mail diventa un PDF nella cartella giusta. Funzione: in produzione.
2. **Il documento trova il suo nome.** Un allegato "scan_0042.pdf" viene rinominato in modo leggibile e compare una proposta di scadenza da confermare. Funzione: in rilascio.
3. **Le ore diventano valore.** Le ore di una pratica entrano nel riepilogo, quelle stimate restano segnate a parte finché l'avvocato non le conferma. Funzione: in rilascio.
4. **La pratica avanza, il cliente lo sa.** Una pratica passa alla fase successiva nella pipeline e parte l'avviso al cliente con il link per i documenti. Funzione: in rilascio.

---

## F. Sezioni del sito, in ordine

I testi sono bozze. Ogni frase su una funzione va ricontrollata con la sezione C il giorno della pubblicazione. Le voci con **[se attiva]** compaiono come attive solo se la funzione è in produzione, altrimenti passano alla sezione "In arrivo" o si tolgono.

### 1. Intestazione

- **Scopo:** orientare e portare alla diagnosi.
- **Contenuto:** logo su fondo chiaro; Come funziona, Benefici, Caso studio, Sicurezza, Chi siamo, FAQ.
- **Visivo:** barra sottile, nessun effetto.
- **Screenshot:** nessuno.
- **CTA:** "Prenota la diagnosi".

### 2. Prima schermata

- **Scopo:** dire in cinque secondi cosa fa e per chi.
- **Titolo (deciso):** "Meno tempo a gestire lo studio, più tempo per fare l'avvocato."
- **Testo:** "INNOVALEX parte dalla posta. Dentro Outlook qualifichi ogni email con cliente, pratica, collaboratore e ore. Da lì lo studio si ordina: archivio, pratiche, team e valore economico."
- **Visivo:** schermata reale del pannello in Outlook, che carica subito come immagine. L'animazione 1 parte dopo il caricamento.
- **Screenshot:** S1.
- **CTA:** "Prenota la diagnosi di 30 minuti". Secondaria: "Guarda come funziona".

### 3. Il problema

- **Scopo:** dare un nome al costo nascosto, con una fonte.
- **Testo:** "In media solo il 37% di una giornata di otto ore va in lavoro fatturabile. Il resto se ne va tra posta, ricerca di documenti, passaggi di consegne e aggiornamenti ai clienti."
- **Fonte visibile:** "Clio, Legal Trends Report 2024, dato internazionale" con link.
- **Visivo:** una barra orizzontale della giornata, 37% in oro. Statica.
- **Screenshot:** nessuno.
- **CTA:** nessuna, si prosegue.

### 4. Come funziona

- **Scopo:** spiegare il flusso in tre passaggi reali.
- **Testo:**
  1. "Arriva una mail. La apri in Outlook e nel pannello scegli cliente, pratica, collaboratore e ore."
  2. "INNOVALEX archivia mail e allegati in PDF nella cartella di quel cliente e di quella pratica."
  3. "Il collaboratore trova cartella e riepilogo. Tu vedi pratiche, carichi e valore nella dashboard."
- **Nota:** "Tu decidi, il sistema propone. Nessun cliente viene attribuito e nessuna scadenza viene confermata senza di te."
- **Visivo:** animazione 1.
- **Screenshot:** S1, S2.
- **CTA:** "Prenota la diagnosi".

### 5. Benefici

- **Scopo:** tradurre le funzioni in risultati, con le parole di Federico.
- **Forma:** sei blocchi alternati, di peso diverso, ognuno con il proprio dettaglio di prodotto. Il primo è il più grande.

| Beneficio | Bozza | Visivo | Screenshot | Stato |
|---|---|---|---|---|
| Recuperi il fatturato nascosto | "Ogni ora collegata a cliente e pratica. Vedi quanto vale il lavoro fatto prima di preparare la proforma." | Animazione 3 | S3 | Report in produzione, Attività e valore [se attiva] |
| Non perdi più i documenti | "Tutto in ordine per cliente e pratica, con un nome che si capisce." | Animazione 2 | S4 | Archivio attivo, rinomina [se attiva] |
| Passi una pratica e non spieghi nulla | "Assegni la pratica a un collaboratore. Trova tutto nella stessa cartella, con il riepilogo della conversazione." | Cartella con recap | S5 | Attivo |
| Sai a che punto è ogni pratica | "Vedi ogni pratica nella sua fase e cosa sta facendo ogni collaboratore." | Pipeline | S6, S7 | Pipeline attiva, carichi [se attiva] |
| Aggiorni il cliente in un attimo | "Cambi fase, controlli il messaggio, lo mandi. Il cliente riceve anche il link per caricare i documenti." | Animazione 4 | S8 | [se attiva] |
| Non usi più dieci piattaforme | "Posta, documenti, pratiche, contatti, scadenze e valore economico in un solo posto." | Rimanda all'ecosistema | S9 | Da scrivere in base alle funzioni attive |

- **CTA:** "Vediamo il tuo studio in 30 minuti".

### 6. Ecosistema

- **Scopo:** mostrare che è un sistema unico.
- **Testo:** "La posta è il punto di ingresso. Quello che qualifichi una volta alimenta archivio, pratiche, team e valore economico."
- **Visivo:** schema disegnato a mano in SVG, con la posta al centro e i moduli collegati. Solo i moduli attivi a colore pieno.
- **Screenshot:** nessuno.
- **CTA:** nessuna.

### 7. In arrivo

- **Scopo:** mostrare la direzione senza venderla come pronta.
- **Testo:** "Stiamo lavorando a: riconoscimento dei meeting dal calendario, agente AI, Gmail e IMAP, firma elettronica, fatturazione elettronica, pagamenti e solleciti, antiriciclaggio, WhatsApp, banche dati giuridiche, deposito telematico."
- **Avvertenza visibile:** "Queste funzioni non sono ancora disponibili e l'ordine può cambiare."
- **Visivo:** elenco tipografico semplice, senza date.
- **Screenshot:** nessuno.
- **CTA:** "Dicci cosa serve al tuo studio".

### 8. Caso studio SCLN

- **Scopo:** prova reale.
- **Testo:** "SCLN Legal Network, Roma, usa INNOVALEX ogni giorno. Al 17/11/2026: 8 caselle email collegate, 80 pratiche aperte, 41 clienti attivi."
- **Citazione:** quella di Francesco Cocola, da far riapprovare.
- **Condizione:** numeri e citazione si pubblicano solo dopo la conferma di Cocola. **FACT:** le 8 caselle risultano nel repo. Le altre due cifre non sono state ricontrollate, e nel repo compare un conteggio clienti diverso, con altra data e definizione: va riconciliato.
- **Visivo:** numeri in tipografia grande, logo SCLN se autorizzato.
- **Screenshot:** nessuno, per non mostrare dati dello studio.
- **CTA:** "Prenota la diagnosi".

### 9. Sicurezza

- **Scopo:** rispondere alla prima obiezione di un avvocato.
- **Testo:** "I dati dello studio stanno su server in Europa. I modelli AI non si addestrano sui tuoi dati. Ognuno vede solo ciò che il suo ruolo consente. Il DPA è disponibile in fase contrattuale."
- **Visivo:** quattro righe in tipografia, senza icone a lucchetto.
- **Screenshot:** nessuno.
- **CTA:** "Parliamone nella diagnosi".

### 10. Chi siamo

- **Scopo:** dare un volto e una credibilità legale.
- **Titolo:** "INNOVALEX nasce dentro uno studio legale."
- **Testo:** "Federico Garau è il fondatore. L'Avv. Francesco Cocola, di SCLN Legal Network a Roma, è il co-fondatore: segue ogni fase dello sviluppo ed è il primo a usarlo nel suo studio."
- **Visivo:** ritratti veri, stessa luce e stesso taglio. Serve una foto di Cocola.
- **Screenshot:** nessuno.
- **CTA:** "Parla con noi".

### 11. Diagnosi operativa e form

- **Scopo:** la conversione.
- **Testo:** "In 30 minuti guardiamo come il tuo studio gestisce posta, documenti, pratiche e ore. Alla fine sai cosa si può sistemare e da dove partire."
- **Campi:** nome e cognome, studio, email, telefono facoltativo, ruolo, persone nello studio, priorità principale, consenso (sezione H).
- **Visivo:** form su fondo crema, una colonna, etichette sempre visibili.
- **Screenshot:** nessuno.
- **CTA:** "Prenota la diagnosi".
- **Dopo l'invio:** "Richiesta ricevuta. Ti scriviamo entro un giorno lavorativo." L'impegno sui tempi è da confermare.

### 12. FAQ

- **Scopo:** togliere le obiezioni.
- **Bozze:**
  - *Dobbiamo cambiare gestionale?* "Non subito. Puoi partire dalla posta e tenere il gestionale che usi. Nella diagnosi vediamo cosa conviene spostare e cosa no."
  - *Funziona con Gmail o PEC?* "Oggi funziona con Outlook. Gmail e IMAP sono in programma."
  - *Cosa bisogna installare?* "Un componente in Outlook, attivato dall'amministratore della posta, e il collegamento di ogni casella. Vi seguiamo noi."
  - *L'AI decide al posto dell'avvocato?* "No. Propone, l'avvocato conferma."
  - *Dove stanno i dati?* "Su server in Europa, con permessi per ruolo. I modelli AI non si addestrano sui dati dello studio."
  - *Quanto costa?* "Dipende dallo studio. Ne parliamo nella diagnosi."
- **Visivo:** elenco a fisarmonica nativo, accessibile da tastiera.
- **Screenshot:** nessuno.
- **CTA:** "Fai la tua domanda nella diagnosi".

### 13. Piè di pagina

- **Contenuto:** dati societari attuali, contatti, Privacy Policy, Cookie Policy. **Nessun prezzo in tutto il sito.**

---

## G. Screenshot

**Regole.** Si scattano SOLO da demo.innovalexai.it, con dati fittizi, mai dalla produzione. La password della demo si chiede a Federico al momento dello scatto, nella fase 5, e si usa solo in memoria. Prima di pubblicare, ogni immagine si controlla a occhio per escludere nomi reali. Formato AVIF e WebP, doppia densità.

| ID | Schermata | Sezione | Cosa deve mostrare | Dimensione | Ritaglio |
|---|---|---|---|---|---|
| S1 | Pannello in Outlook su una mail | Prima schermata, Come funziona | Cliente, pratica, collaboratore, ore, inclusione nel report | 1600 x 1000 | Pannello con metà della mail |
| S2 | Cartella di cliente e pratica | Come funziona | PDF con nomi progressivi | 1200 x 800 | Solo elenco file |
| S3 | Attività e valore, oppure Report | Benefici | Ore e valore per cliente e pratica, ore stimate distinte | 1600 x 1000 | Tabella con totali |
| S4 | Documenti con nome e proposta di scadenza | Benefici | Documento classificato e rinominato | 1200 x 800 | Una riga con proposta |
| S5 | Cartella di lavoro con recap | Benefici | Recap AI della conversazione | 1200 x 800 | Recap e file vicini |
| S6 | Pipeline delle pratiche | Benefici | Colonne di fase con pratiche | 1600 x 900 | Quattro colonne |
| S7 | Carichi e assegnazioni | Benefici | Lavoro per collaboratore | 1200 x 800 | Tabella centrale |
| S8 | Avviso al cliente | Benefici | Messaggio con link documenti | 1000 x 800 | Finestra dell'avviso |
| S9 | Dashboard generale | Benefici | Vista d'insieme | 1600 x 1000 | Intera, senza barra del browser |
| S10 | Valore per socio | Benefici, facoltativa | Originate, gestite, ore, valore | 1200 x 800 | Tabella |
| S11 | Scheda pratica | Facoltativa | Fase, note, attività | 1200 x 900 | Colonna centrale |
| S12 | CRM, lead in pipeline | Ecosistema, facoltativa | Lead per fase | 1600 x 900 | Tre o quattro colonne |

Per il mobile si usa un ritaglio più stretto della stessa schermata, larghezza 780 px, non una foto rimpicciolita.

---

## H. Contatti dal sito

### H.1 Cosa c'è oggi nel CRM

- **FACT.** Il piano V1 prevede "CRM-2: ingresso lead da form e webhook" (`docs/PIANO-V1.md`, sezioni 1 e 5). Non è stato trovato nel codice di main né nei rami in rilascio.
- **FACT.** La rotta esistente per creare un lead è riservata agli utenti collegati alla dashboard, quindi il sito non può usarla (`docs/contratto-m3.md`, v10.3 e v11.2).
- **FACT.** Il CRM è acceso solo sullo studio di prova.
- **Conclusione.** L'ingresso lead **non esiste ancora**. È una richiesta da portare a chi sviluppa il CRM. Questa sessione non lo costruisce.

### H.2 Richiesta per chi sviluppa il CRM

1. Un ingresso dedicato ai lead da form, separato dalle rotte della dashboard, autenticato **da server a server**. La chiave vive solo nelle variabili d'ambiente di Vercel, mai nel browser.
2. La chiave vale per un solo studio e una sola funzione, ed è revocabile.
3. Lo studio di destinazione è deciso dal server, mai dal form (domanda L4).
4. Limite di frequenza e dimensione massima dei campi.
5. Invio ripetibile senza doppioni, usando una chiave di creazione.
6. Contatto già presente: il lead si collega o viene segnalato, senza risposta di errore al visitatore.
7. Campi per fonte, consenso, versione dell'informativa e data del consenso.
8. Risposte chiare: creato, già ricevuto, dati non validi, non disponibile.

### H.3 Collegamento dal sito

| Campo del form | Destinazione nel CRM | Obbligatorio |
|---|---|---|
| Nome e cognome | Nominativo del contatto | Sì |
| Studio | Organizzazione, da definire con il CRM | Sì |
| Email | Email del contatto | Sì |
| Telefono | Telefono del contatto | No |
| Ruolo | Note o campo esteso | Sì |
| Persone nello studio | Note o campo esteso | Sì |
| Priorità principale | Note | Sì |
| Richiesta (diagnosi) | Fonte | Automatico |
| Consenso, versione informativa, data | Campi di consenso | Sì |

- **Consenso.** Casella non preselezionata: "Ho letto l'informativa privacy". Eventuali comunicazioni commerciali con una seconda casella facoltativa.
- **Protezione da bot.** Prima linea senza terze parti: campo nascosto, tempo minimo di compilazione, limite di frequenza lato server, validazione. Un servizio esterno solo se arriva spam reale, perché cambierebbe la cookie policy.
- **Errori.** Il visitatore vede sempre un esito. Se l'invio fallisce: messaggio chiaro, dati ancora nel form, email di riserva indicata.
- **Avviso a Federico.** Se il CRM non risponde, la funzione serverless manda subito i dati via Resend. Se fallisce anche questo, errore nei log e messaggio di errore al visitatore. Mai un finto "ricevuto".
- **Passaggio graduale.** Finché l'ingresso CRM non è pronto restano ClickUp e l'avviso Resend, estesi anche al form principale (domanda L3). Il passaggio al CRM si fa con un interruttore, provando in anteprima, con ClickUp come riserva per i primi giorni.
- **Prova ricorrente.** Un test Playwright invia il form in anteprima e controlla che il contatto arrivi. Così un guasto come quello di giugno non resta invisibile.

---

## I. SEO e aspetti legali

### I.1 SEO

- **Titolo:** "INNOVALEX | Gestione dello studio legale dalla posta".
- **Descrizione:** "Da Outlook qualifichi ogni email con cliente, pratica, collaboratore e ore. Archivio, pratiche, team e valore economico in un solo posto."
- **Open Graph:** immagine nuova 1200 x 630 con logo su fondo chiaro. Oggi è 1024 x 1024.
- **Dati strutturati:** `Organization`, `WebSite`, `SoftwareApplication` senza prezzo, `FAQPage` coerente con le FAQ visibili.
- **Struttura:** un solo H1, titoli in ordine, testo alternativo descrittivo, `lang="it"`.
- **Sitemap e robots:** `/robots.txt` e `/sitemap.xml` appartengono a `innovalex-webapp` e restano identici (sezione B.6). Il nuovo sito non deve creare file con questi nomi. Come far entrare la home in sitemap si decide nella fase 7, senza cambiarli di nascosto.
- **Percorsi da mantenere:** `/`, `/privacy-policy.html`, `/cookie-policy.html`, `/contratti`, `/contratti/privacy`, `/contratti/terms`, `/api/lead`, `/api/roi-lead`. Se un percorso cambia, redirect 301.
- **Ancore:** mantenere `#contatti` e `#faq`.
- **Misura:** copia dei titoli attuali e controllo di Search Console prima e dopo la pubblicazione, se Federico ha l'accesso.

### I.2 Aspetti legali

- **Privacy policy:** aggiornare data, dati raccolti, finalità, destinatari, passaggio al CRM, conservazione, trasferimenti. Togliere i riferimenti al calcolatore se viene rimosso.
- **Cookie policy:** aggiornare in base al nuovo sito. Con i font ospitati in casa e senza analytics non serve un banner (INFERENCE, da confermare da un legale).
- **Regione delle funzioni:** verificare dove girano le funzioni Vercel che ricevono i dati del form, e scriverlo correttamente nella privacy.
- **Footer:** i dati societari restano quelli attuali.
- **Revisione:** i testi legali e la sezione Sicurezza vanno riletti da un legale prima della pubblicazione. Proposta: Avv. Cocola.
- **Autorizzazioni:** logo SCLN, nome, foto e citazione di Cocola, per iscritto.

---

## J. Fasi di costruzione

Regole comuni: si lavora su rami dedicati, mai su main. Ogni fase si pubblica in **anteprima Vercel**. La produzione cambia solo nella fase 8. Ogni fase si prova con Playwright a 1440 e 390 px.

| Fase | Cosa si fa | Come si prova | Come si pubblica | Come si torna indietro |
|---|---|---|---|---|
| 1. Fondamenta | Astro, Tailwind 4, font, pulizia del repo, `api/` invariata | Build pulito, funzioni `api/` rispondono in anteprima, tutti i percorsi di I.1 restano | Anteprima | Si scarta il ramo |
| 2. Sistema grafico | Colori, tipografia, componenti, prima schermata | Contrasti, LCP mobile sotto 1,8 s, screenshot | Anteprima | Revert del commit |
| 3. Sezioni e testi | Tutte le sezioni, con un file di contenuti in cui ogni funzione ha il suo stato | Test: nessun testo "attivo" su una funzione non in produzione; nessun trattino lungo, prezzo o parola vietata | Anteprima | Revert del commit |
| 4. Animazioni | Le quattro animazioni come isole React | Budget JS, CLS, INP, 60 fps su mobile rallentato, `prefers-reduced-motion` | Anteprima | Ogni animazione si spegne e resta la versione statica |
| 5. Screenshot | Scatti dalla demo, ottimizzazione | Controllo a occhio contro dati reali, peso immagini | Anteprima | Si ripristina l'immagine precedente |
| 6. Form e contatti | Form nuovo, protezioni, riserva Resend | Invio riuscito, CRM giù, tutto giù, bot, doppio clic, senza JS | Anteprima con destinazione di prova | Interruttore su ClickUp |
| 7. SEO e legali | Metadati, dati strutturati, sitemap, policy | Validatori, confronto dei percorsi, revisione legale | Anteprima | Revert del commit |
| 8. Collaudo e pubblicazione | Controllo finale di C e B.2, approvazioni, pubblicazione | Lighthouse mobile e desktop, tastiera, lettore di schermo, invio vero di un contatto dopo il go live | Merge su main con ok di Federico | Promozione su Vercel del deploy precedente, più tag `sito-pre-rifacimento` |

**Lista di controllo prima della produzione:**

- [ ] Tabella C rifatta quel giorno
- [ ] Nessuna affermazione NON VERA o NON VERIFICABILE rimasta senza approvazione
- [ ] Numeri e citazione approvati da Cocola
- [ ] Form provato in produzione con un contatto vero
- [ ] `/contratti` funzionante dopo il deploy
- [ ] Privacy e cookie aggiornate e rilette
- [ ] LCP, CLS e INP entro gli obiettivi

---

## K. Autoverifica avversaria

| Cosa può andare storto | Perché è credibile | Prevenzione |
|---|---|---|
| Il nuovo sito è più lento del vecchio | Oggi pesa 265 KB, React e Motion da soli ne aggiungono 101 | Budget nel test di build, isole caricate solo quando visibili, prima schermata senza JS |
| Animazioni pesanti su mobile | I telefoni economici sono comuni anche negli studi | Solo `transform` e `opacity`, prova con CPU rallentata, stato statico sempre pronto |
| Il sito promette una funzione non attiva | È il difetto del sito attuale e la V1 si sta muovendo ogni giorno | Stato per funzione nei contenuti, test automatico, controllo il giorno della pubblicazione |
| Un numero non approvato viene pubblicato | I numeri vecchi sono ovunque | Nessun numero senza fonte nel file di contenuti |
| Il form perde contatti | È già successo per più di cinque mesi senza che nessuno lo vedesse | Prova automatica, avviso di riserva, messaggio di errore sempre visibile |
| Il CRM non è pronto alla data | Ingresso lead non costruito | Si pubblica con ClickUp e si passa dopo |
| I lead finiscono nello studio sbagliato | Il CRM è multi studio | Studio deciso dal server, chiave limitata, prova con destinazione fittizia |
| SEO perso nel passaggio | Cambia tutta la struttura | Stessi percorsi, redirect, confronto prima e dopo |
| `/contratti` si rompe con il nuovo deploy | Non è nel repo e la regola che la instrada non è visibile nei repo | Procedura della sezione B.6 nella fase 8 |
| Screenshot con dati reali | Basta un errore di scheda | Solo demo, controllo a occhio |
| Il sito sembra comunque fatto con l'AI | Le skill e i componenti pronti portano a forme simili | Direzione fissa, nessun kit adottato in blocco, passaggio con unslop-ui e critica umana |
| Una skill esegue comandi non voluti | Alcune candidate lo fanno | Installata solo unslop-ui, senza script, con commit registrato |
| Promessa di sicurezza troppo forte | Un avvocato la legge come impegno | Solo le quattro frasi consentite, revisione legale |
| Il dato del 37% viene contestato | Clio misura su una giornata di 8 ore e sui propri utenti | Frase precisa, fonte e link visibili |

---

## L. Domande per Federico

Le domande L1-L8, L10 e L11 sono chiuse: le risposte sono in "Decisioni del 23/11/2026", in cima al documento.

**L9, aperta. Hai il logo originale in vettoriale (SVG, AI o PDF)?**
- A (raccomandata): sì, me lo passi prima della fase 2.
- B: no, si usa il PNG attuale, meno nitido sugli schermi ad alta densità.
