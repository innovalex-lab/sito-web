# Fase 4, sessione 2: riepilogo finale, form della diagnosi, ritocchi mobile

Ramo `rifacimento-sito`, commit del lavoro `8d4e949`. Piano: `docs/PIANO-STORYLINE.md` (sezione 7 aggiornata, vedi sotto).
Non pubblicato: nessun merge su main, nessuna produzione. Si guarda sull'anteprima Vercel del ramo.
Tutto il resto della pagina è identico alla sessione 1.

## 1. Cosa è stato fatto

| Punto | Cosa c'è |
|---|---|
| 1. Riepilogo | La sezione AI (due colonne e la scadenza interattiva) è tolta. Al suo posto, nella stessa fascia scura e prima della compliance, c'è il riepilogo, solo tipografia, con i testi esatti del brief: titolo su due righe, testo, tre blocchi (Tempo, Fatturato, Organizzazione), il conto grande in oro e due pulsanti ("Calcola il tuo studio" va a `#calcolatore`, "Prenota la Diagnosi Operativa" va a `#contatti`). I blocchi sono in fila da 1024 px e in colonna sotto. Nessuna animazione. Sopra i blocchi c'è lo spazio per un video futuro: è uno slot `video` del componente e oggi non stampa nulla, nemmeno un segnaposto. Ogni frase è in `src/content/storia.ts`, legata alle sue funzioni di `funzioni.ts` |
| 1. React e Motion | Tolti (`@astrojs/react`, `react`, `react-dom`, `motion`), con `AiScene.tsx`, `Ai.astro` e il loro CSS. La pagina non carica più nessun file JS |
| 2. Form della diagnosi | Campi, valori delle tendine e nomi inviati uguali a main (dopo 58e6b05). Le prove li leggono da `git show origin/main:index.html`. POST a `/api/lead` con le stesse 17 chiavi di main, nello stesso ordine. Se il calcolatore è stato usato si aggiungono i suoi dati nel formato di main, e `sourceCta` dice da quale pulsante si è arrivati. Etichette sempre visibili. Errori accanto al campo, con il fuoco sul primo. Consenso privacy non preselezionato, con link alla Privacy Policy. Esiti sempre visibili: "Grazie. Ti contatteremo entro 24h." al posto del form, oppure "Invio non riuscito. Riprova tra pochi minuti." con i dati ancora nel form. Doppio invio bloccato. Conferma come il piano: nessuna mail di conferma, nessun caso studio o whitepaper. `api/lead.js` non è cambiato |
| 3. Ordine Operativo | Lastra nuova del nuovo contatto (`LastraContatto.astro`), con dati fittizi. Arriva una mail di Davide Conti (Conti Trasporti Srl). Il pannello segnala "Mittente non in anagrafica, Possibile nuovo cliente", con "Apri pratica" si arriva a Cliente creato, Pratica aperta, Cartella pronta. Una sola animazione, la sequenza quando entra nello schermo, spenta con movimento ridotto |
| 4. Prima schermata sotto i 768 px | La foto sta in una fascia alta in cima (36% dello schermo, tra 240 e 352 px), con velatura leggera (0,22 a 0,3), così lo studio e la bilancia si riconoscono. Il testo bianco comincia dove la velatura diventa piena. I numeri sono su due righe, due sopra e uno sotto, e le cifre non vanno mai a capo. Da 768 px in su nulla cambia (verificato dalle prove) |
| 5. Lastre sotto i 768 px | Ogni lastra mostra solo il dettaglio che conta, ingrandito. Il ritaglio è fatto togliendo parti intere dell'interfaccia: lista della posta, colonne della cartella, tabella del report e così via. Il testo dell'interfaccia non scende mai sotto 11 px reali a 390, minimo misurato 11,2 px. Da 768 px in su nulla cambia (verificato dalle prove) |

**Piano, sezione 7.** Si chiama "Riepilogo e compliance". Le righe [+] del riepilogo registrano tre cose:

- la decisione di Federico del 25/11, cioè il riepilogo al posto della sezione AI;
- lo spazio per il video futuro;
- il riconoscimento delle riunioni dal calendario, che non si cita finché non è attivo.

Anche la grafica di Ordine Operativo nel piano ora descrive la lastra del nuovo contatto.

**Testi.** I testi [=] della sessione 1 non sono cambiati. I numeri SCLN restano "da confermare". Nessun prezzo INNOVALEX: il 66.000 € del conto è il valore recuperabile preso da main. Nessun trattino lungo.

## 2. Schermate e video

**Riepilogo**
- [1440](s2/schermate/riepilogo-1440.jpg), [390](s2/schermate/riepilogo-390.jpg)

**Form**
- vuoto: [1440](s2/schermate/form-vuoto-1440.jpg), [390](s2/schermate/form-vuoto-390.jpg)
- con gli errori: [1440](s2/schermate/form-errori-1440.jpg), [390](s2/schermate/form-errori-390.jpg)
- inviato, con la chiamata intercettata: [1440](s2/schermate/form-inviato-1440.jpg), [390](s2/schermate/form-inviato-390.jpg)

**Ordine Operativo**, a fine sequenza
- [1440](s2/schermate/ordine-operativo-1440.jpg), [390](s2/schermate/ordine-operativo-390.jpg)

**Prima schermata a 390**
- [primo schermo](s2/schermate/prima-schermata-390.jpg)
- [sezione intera](s2/schermate/prima-schermata-intera-390.jpg)

**Scena a 390, passo per passo.** Le catture sono fatte con movimento ridotto, quindi ogni passo è già compiuto.
- [1](s2/schermate/scena-passo-1-390.jpg), [2](s2/schermate/scena-passo-2-390.jpg), [3](s2/schermate/scena-passo-3-390.jpg), [4](s2/schermate/scena-passo-4-390.jpg), [5](s2/schermate/scena-passo-5-390.jpg)

**Scene dei tre sistemi a 390**
- [Ordine Operativo](s2/schermate/sistema-ordine-operativo-390.jpg)
- [Visibilità Economica](s2/schermate/sistema-visibilita-economica-390.jpg)
- [Governance Operativa](s2/schermate/sistema-governance-operativa-390.jpg)

**Video dello scorrimento**, con movimento
- [1440](https://raw.githubusercontent.com/innovalex-lab/sito-web/8d4e949354644ea70b6aaaf35677c0c0f03a63fc/docs/audit/fase4/s2/home-scorrimento-1440.webm)
- [390](https://raw.githubusercontent.com/innovalex-lab/sito-web/8d4e949354644ea70b6aaaf35677c0c0f03a63fc/docs/audit/fase4/s2/home-scorrimento-390.webm)

## 3. Prove

`node scripts/prove-home.mjs <url>` gira a 1440, 1024 e 390, con e senza movimento ridotto: **416 su 416 superate**. Le chiamate a `/api/lead` e `/api/roi-lead` sono sempre intercettate e non escono dal browser.

| Area | Cosa si controlla in più rispetto alla sessione 1 |
|---|---|
| Riepilogo | Testi esatti (titolo, testo, conto), conto in oro, tre blocchi in fila da 1024 e in colonna sotto, link dei due pulsanti, nessun segnaposto video, nessuna traccia della sezione AI (`astro-island`), compliance subito dopo |
| Ordine Operativo | Lastra del nuovo contatto con i sei testi della storia, nessuna cartella ripetuta |
| Prima schermata | Cifre su una riga a ogni larghezza. Sotto i 768 px: numeri due sopra e uno sotto, foto in alto con velatura leggera, testo sotto. Da 768 px: foto a tutta altezza e numeri in fila come prima |
| Lastre | Sotto i 768 px nessun testo visibile sotto 11 px. Da 768 px lastre intere come prima |
| Form: struttura | Etichette visibili. Valori di Ruolo, Persone e Priorità identici a main. Nomi dei campi come main, più il consenso. Consenso non spuntato con link a `/privacy-policy.html` |
| Form: campi mancanti | 9 errori accanto ai campi, `aria-invalid` sui campi, fuoco su Nome, nessuna chiamata. Senza consenso resta solo quell'errore |
| Form: errore del server | Risposta 502: messaggio visibile, dati ancora nel form (nome, ruolo, priorità, consenso), pulsante di nuovo attivo, una chiamata |
| Form: invio riuscito e doppio clic | Doppio clic più un clic forzato producono una sola chiamata. La conferma prende il posto del form, con il fuoco, senza mail di conferma, caso studio o whitepaper |
| Form: contenuto inviato | Le chiavi sono uguali a main e nello stesso ordine (estratte dal `payload` di main). I valori sono nel formato di main, con i dati del calcolatore usato poco prima (`2.0`, `10`, `150`, `Ordine Operativo, Visibilità Economica, Governance Operativa`, `613800`, `409`) e `sourceCta` `riepilogo-diagnosi`. Su una pagina nuova senza calcolatore le chiavi del calcolatore sono vuote e `sourceCta` è `direct` |

**Confronto dei testi [=] con main** (`node scripts/verifica-uguali.mjs <url>`): **nessuna differenza**.

- Sono 84 frasi del piano e 90 elementi `data-uguale`.
- Le cinque frasi del form che nella sessione 1 erano "attese" ora sono nella pagina, e lo script non ha più eccezioni.

**Testi vietati** (`node scripts/verifica-testi.mjs`): nessun problema.

## 4. Misure

`node scripts/misure-home.mjs <url>`, stesse condizioni della sessione 1.

| Misura | Sessione 1 | Sessione 2 | Obiettivo |
|---|---|---|---|
| JavaScript compresso | 100,9 KB in 3 file, più 4,4 KB in linea | **0 file, 3,4 KB in linea** | max 200 KB |
| LCP mobile (390, densità 3, 1,6 Mbps, 150 ms, CPU 4x, mediana di 3) | 1,26 s | **1,28 s** (foto) | sotto 2,5 s |
| LCP desktop 1440 | 0,11 s | 0,16 s | |
| CLS, scorrimento completo, 1440 | 0 | **0** | sotto 0,1 |
| CLS, scorrimento completo, 390 | 0,0089 | **0,005** | sotto 0,1 |
| Fotogrammi oltre 20 ms, 1440, CPU 4x, GPU | 5 su 540, p95 9,3 ms | **5 su 551**, p95 16,4 ms | 60 fps |
| Fotogrammi oltre 20 ms, 390, CPU 4x, GPU | 1 su 546, p95 9,2 ms | **1 su 625**, p95 9,2 ms | 60 fps |

A 1440 il p95 è salito a 16,4 ms. Resta dentro un fotogramma a 60 fps (16,7 ms) e i fotogrammi lenti sono gli stessi 5.

**Contrasti.**

- Tutti i testi misurati sono sopra soglia, minimo 4,64:1. Sono circa 400 testi a 1440 e 338 a 390.
- Testo sulla foto: minimo 4,44:1 a 1440 (testo grande), 6,89:1 a 1024, 6,83:1 a 390.
- Form, misurati a parte perché gli errori sono nascosti durante la misura generale:
  - errore #b42318 sulla crema: 5,95:1;
  - riquadro dell'errore di rete: 7,81:1;
  - segnaposto: 4,83:1;
  - bordo dei campi: 3,23:1 (soglia 3 per i contorni).

**Lunghezza della pagina**, in pixel, senza il riquadro degli avvisi di anteprima.

| Larghezza | Main | Sessione 1 | Sessione 2 | Differenza dalla sessione 1 |
|---|---|---|---|---|
| 1440 | 17.020 | 18.688 | 19.232 | +544 |
| 1024 | 20.531 | 18.929 | 19.629 | +700 |
| 390 | 22.048 | 21.709 | 23.996 | +2.287 |

Da dove viene la differenza:
- A 1440:
  - riepilogo contro sezione AI, +162;
  - form vero contro segnaposto, +383.
- A 390:
  - prima schermata, +200, per la fascia della foto;
  - tre sistemi, +760, per le lastre ingrandite;
  - riepilogo, +92;
  - form, +571.

## 5. Cosa ha cambiato ogni skill

- **frontend-design.** Il riepilogo è solo tipografia: titolo serif grande, un solo colore in più (l'oro del conto), nessuna card e nessuna icona. Da 1200 px il testo sta accanto al titolo, perché lasciava vuoto l'angolo in alto a destra. Il conto va a capo a ogni uguale, come un'operazione.
- **impeccable.** Ho letto `craft-floor.md` prima delle modifiche. Il detector sui file nuovi e cambiati segnala solo il bordo oro della scadenza in "Tutto lo studio" (`sezioni.css:235`). C'era già nella sessione 1, quindi resta. Dai controlli vengono:
  - il form su un pannello crema, perché era bianco su bianco;
  - il fuoco oro da 3 px;
  - righe delle priorità alte almeno 44 px;
  - i risultati della lastra del contatto sopra il pulsante, perché "Apri pratica" copriva "Cliente creato".
- **design-taste-frontend.** Correzioni portate dall'ispettore:
  - il titolo del riepilogo andava su tre righe a 390 e a 1440: ora è su due a ogni larghezza;
  - i titoli dei tre blocchi andavano su tre righe a 1024: ora sono su due.

  Le altre segnalazioni riguardano parti della sessione 1 che il brief chiede di lasciare identiche: etichette sopra i titoli [=], gradienti e ombre delle scene, fondo crema, la scena a 5 passi. Due sono falsi positivi:
  - "testo sul bordo" e "pagina fuori centro" a 390 sono le voci del menu chiuso e un testo solo per lettori di schermo;
  - "testo coperto" è l'intestazione fissa.
- **unslop-ui.** Verdetto: nessuno, nulla da tagliare.
  - Le etichette e i testi del form sono quelli di main.
  - I segnaposto aggiungono un formato o un esempio, e "Puoi selezionare più opzioni" è un vincolo: restano (U7).
  - Gli errori dicono cosa manca, senza punti esclamativi (U4).
  - Nessuna freccia sui pulsanti, nessun trattino lungo.

## 6. Differenze dal piano e dal brief

| Punto | Differenza | Motivo |
|---|---|---|
| Form | Telefono non obbligatorio | Su main non lo è; il brief vuole i campi identici a main |
| Form | Consenso privacy nuovo, obbligatorio, non inviato a `/api/lead` | Lo chiede il brief; inviarlo cambierebbe il payload di main e `api/lead.js`, che non si tocca |
| Form | Priorità come caselle sempre visibili, non una tendina a scelta multipla | Stessi valori e stesso invio di main (uniti con ", "), ma si leggono tutte senza aprire nulla e funzionano da tastiera e su telefono senza codice in più |
| Form | Ordine dei campi un poco diverso da main (Telefono accanto a Email, Ruolo accanto a Persone) | Coppie nella griglia a due colonne; l'ordine del payload resta quello di main |
| Form | Conferma nella pagina al posto del form, non una finestra sopra | Esito sempre visibile, nessun fuoco intrappolato; il titolo della conferma è "Grazie. Ti contatteremo entro 24h." del brief al posto di "Richiesta inviata correttamente." di main |
| Form | Dati del calcolatore vuoti se il calcolatore non è stato usato | Il brief dice "se è stato usato"; main li manda sempre con i valori iniziali, qui si manda la chiave vuota per non far passare per scelta del visitatore un valore che non ha toccato |
| Riepilogo | Il conto va a capo a ogni uguale (quattro righe a 390, due a 1440) | Si legge come un'operazione e le cifre non si spezzano |
| Ordine Operativo | La scena non è più la cartella del passo 3 | Lo chiede il brief: storia del nuovo contatto |
| Prima schermata | Sotto i 768 px la sezione è più alta di 200 px | La foto ha una fascia sua in alto con velatura leggera, il testo sta sotto con il fondo pieno |
| Lastre | Il ritaglio a 390 toglie parti intere dell'interfaccia invece di zoomare sui pixel | Il testo resta testo vero, nitido e sopra 11 px, e ogni lastra mantiene la sua forma; un ritaglio a pixel avrebbe tagliato righe a metà |
| Lastre | Sotto i 768 px i tre sistemi sono più alti di 760 px | Conseguenza del dettaglio ingrandito |
