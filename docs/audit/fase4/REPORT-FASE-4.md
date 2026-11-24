# Fase 4, sessione 1: la storyline del sito attuale con la grafica nuova

Ramo `rifacimento-sito`, commit del lavoro `2033ae7`. Piano: `docs/PIANO-STORYLINE.md`, salvato identico.
Fuori da questa sessione, come da piano: il form vero della diagnosi (sezione 9), che resta il segnaposto.

## 1. Cosa è stato fatto

| Sezione | Cosa c'è |
|---|---|
| Menu | Le sei voci del piano e "Diagnosi Gratuita". Menu completo da 1280 px, sotto c'è il pulsante Menu |
| 1. Prima schermata | Foto dello studio da main (`git show`, non rigenerata) a tutto schermo, velatura blu, testo bianco, tre numeri con la linea oro, nota, freccia. Source Serif 4 per il titolo, Inter per il resto. Nessuna lastra. La foto è l'elemento LCP: preload, `fetchpriority="high"`, width e height, lo stesso srcset di main. Si sposta piano con lo scorrimento (solo transform, ferma con movimento ridotto) |
| 2. Il problema | Testi [=], il 750 € al giorno, la sezione scura del 37% (la barra ora è ferma), giornata tipo e timeline dalle 8:42 alle 13:00. Ogni orario si accende quando arriva a metà schermo; è CSS puro (scroll-driven animation). Con movimento ridotto o senza supporto è tutta accesa |
| 3. Calcolatore | Grafica nuova. Campi, intervalli, valori iniziali e formule come main. Percentuali accanto a ogni sistema (75%, 10%, 8%, massimo 93%). Nome, percentuale e dato inviato ora coincidono per ogni casella. La richiesta dell'analisi chiama `/api/roi-lead` con gli stessi campi e lo stesso formato di main |
| 4. Come funziona | Testi di main sopra, la scena a 5 passi della fase 3 sotto, a tutta larghezza, invariata |
| 5. Tre sistemi | Apertura, poi tre blocchi uguali per forma: etichetta, titolo, testo, quattro voci, scena. Ordine Operativo usa la lastra della cartella, Visibilità Economica il beneficio 1, Governance Operativa il beneficio 2. Scene a 5 colonne su 12, a lati alterni, ferme accanto alle voci mentre si leggono. Pulsante "Prenota la Diagnosi Operativa" in fondo |
| 6. Tutto lo studio | Come in 3.1. Il blocco Pratiche mostra il beneficio 3 (la pipeline) al posto della mini pipeline |
| 7. AI e compliance | AI invariata. Sotto, nella stessa fascia scura, la compliance di main: GDPR, Segreto professionale, AI Act e Legge 132/2025, la riga del DPA |
| 8. Risultati reali | SCLN, i quattro numeri, la citazione con il ritratto di Cocola, pulsante. 8, 80 e 41 restano "da confermare" e in anteprima hanno l'avviso |
| 9. Diagnosi | Testi di main ("Prima Call", titolo, due paragrafi). Form: segnaposto della fase 3 |
| 10. FAQ | Come in 3.1 |
| 11. Chi siamo | Titolo del piano, i due ritratti nella stessa cornice, testo Founder [=], pulsante |
| 12. Piè di pagina | Motto [=], contatti, riga di compliance [=], documenti |

Stato delle funzioni: tutte le funzioni citate sono `attiva` in `src/content/funzioni.ts` con fonte "Federico, 24/11/2026". Ogni frase nuova sta in `src/content/storia.ts` legata alle sue funzioni, e `src/content/verifica.ts` la controlla. La build di produzione resta ferma finché 8, 80 e 41 non sono confermati, come previsto. Citazione e "600+ email al mese" sono confermati. Le parole vietate sono quelle di prima. Si aggiunge l'eccezione esatta "€66.000 /anno", perché il controllo dei prezzi la leggeva come un prezzo: è il costo dello spreco preso da main, non un prezzo INNOVALEX.

Le ancore del sito attuale funzionano ancora: `#roi`, `#metodo`, `#founder`.

## 2. Ritratti

Rifatti dagli originali sul Desktop, che non sono stati toccati, con `scripts/ritratti.py`. Il soggetto e i punti del volto vengono dal framework Vision di macOS (`scripts/ritratti/*.swift`).

- Profilo colore convertito in sRGB: l'originale di Garau era Display P3.
- Il fondo originale è sostituito da un tono unico, #ece4d4, vicino alla crema della pagina. I bordi dei capelli sono puliti dal colore del vecchio fondo.
- Ritaglio 4:5 con gli occhi al 40% dell'altezza. La testa, dalla sommità al mento, occupa il 43%. Le proporzioni sono uguali per tutti e due.
- Nessun filtro sui volti.
- AVIF e WebP a 1x e 2x (104, 208, 240, 480; per Cocola anche 120), ricostruiti dai soli pixel. Niente EXIF, XMP o ICC. Width e height sono nel markup.
- Chi siamo: 240 x 300 da 560 px in su, 104 x 130 sotto. Stessa misura per tutti e due a ogni larghezza, verificato dai test a 1440, 1024 e 390.
- Risultati reali: Cocola a 120 x 150.
- Eliminati i file vecchi che non servono più (`francesco-cocola-176`, `-352`).

## 3. Schermate e video

- Pagina intera: [1440](schermate/pagina-1440.jpg), [390](schermate/pagina-390.jpg). Sono catturate con movimento ridotto, così la scena a 5 passi appare tutta in sequenza. Il riquadro degli avvisi di anteprima è nascosto.
- Prima schermata: [1440](schermate/prima-schermata-1440.jpg), [390](schermate/prima-schermata-390.jpg).
- Calcolatore: valori iniziali [1440](schermate/calcolatore-1440.jpg), [390](schermate/calcolatore-390.jpg); con i tre sistemi e la richiesta dell'analisi aperta [1440](schermate/calcolatore-tre-sistemi-1440.jpg), [390](schermate/calcolatore-tre-sistemi-390.jpg).
- Tre sistemi: [1440](schermate/tre-sistemi-1440.jpg), [390](schermate/tre-sistemi-390.jpg).
- Video dello scorrimento, con movimento:
  - [1440](https://raw.githubusercontent.com/innovalex-lab/sito-web/2033ae709b3f3af7593614e17a9a6a5833efbf02/docs/audit/fase4/home-scorrimento-1440.webm)
  - [390](https://raw.githubusercontent.com/innovalex-lab/sito-web/2033ae709b3f3af7593614e17a9a6a5833efbf02/docs/audit/fase4/home-scorrimento-390.webm)

## 4. Prove

Comando: `node scripts/prove-home.mjs <url>`. Le prove girano a 1440, 1024 e 390, con e senza movimento ridotto: **300 su 300 superate**. Le chiamate a `/api/roi-lead` e `/api/lead` sono sempre intercettate e non escono dal browser.

| Area | Cosa si controlla |
|---|---|
| Struttura | Risposta 200, console pulita, nessuno scorrimento orizzontale, un solo H1 e titoli in ordine, ordine delle sezioni e voci del menu come il piano, ancore, intestazione fissa con il pulsante sempre visibile, menu mobile (Invio apre, Esc chiude e riporta il fuoco), FAQ da tastiera, conferma da tastiera nell'isola AI |
| Prima schermata | Foto come elemento LCP (priorità, preload, srcset, misure), titolo, tre numeri, nessuna lastra. La foto scende di 32 px a 400 px di scorrimento ed è ferma con movimento ridotto |
| Timeline | Spenta prima di arrivarci, tutta accesa dopo. Con movimento ridotto è sempre accesa |
| Calcolatore: calcoli | Valori iniziali come main: 495.000 €, 330h, 49.500 €. Nome, percentuale e dato inviato coerenti. Con tre sistemi 93% (613.800 €, 409h, 61.380 €). Governance da sola usa il 10% (66.000 €). Senza sistemi: 0 € e l'invito a sceglierne uno |
| Calcolatore: invio | Email non valida: errore, nessuna chiamata. Errore del server: messaggio visibile, email ancora nel campo, si può riprovare. Doppio clic: una sola chiamata, esito visibile. Il payload ha le stesse chiavi, nello stesso ordine e nello stesso formato di main: `ORDINE OPERATIVO, VISIBILITÀ ECONOMICA, GOVERNANCE OPERATIVA`, `613.800 €`, `409h`, `61.380 €` |
| Pagina | Tre pulsanti "Prenota la Diagnosi Operativa" nei posti del piano. Scene dei sistemi entro metà larghezza (38% a 1440, 36% a 1024). Ritratti nella stessa cornice. Avvisi di anteprima solo per 8, 80 e 41 |
| Contrasti | Testo contro il fondo vero, comprese le velature, i gradienti (caso peggiore tra i colori) e i fondi disegnati con `::before` e `::after`. Circa 400 testi per larghezza, tutti sopra soglia. Minimo 4,64:1 su soglia 4,5 |
| Contrasti sulla foto | Testo nascosto, foto fotografata, e per ogni riga di testo il pixel più chiaro dietro. Tutto sopra soglia. Minimo 4,44:1 a 1440 (testo grande, soglia 3), 6,89:1 a 1024, 8,28:1 a 390 |
| Testi | Parole vietate: nessuna. Testi [=]: vedi sotto |

**Confronto automatico dei testi [=]** (`node scripts/verifica-uguali.mjs <url>`, incluso nelle prove).

- Legge le 84 frasi [=] del piano e i 71 elementi `data-uguale` della pagina, e confronta tutto con il testo di `main:index.html` letto con `git show`.
- Il confronto ignora spazi, virgolette, apostrofi e punteggiatura.
- Risultato: **nessuna differenza**.
- Cinque frasi del form della diagnosi non sono ancora nella pagina e arrivano nella sessione 2: "Partiamo dai tuoi numeri reali.", "Grazie.", "Ti contatteremo entro 24h.", "Invio non riuscito.", "Riprova tra pochi minuti.".
- Una prova di controllo con un testo cambiato di proposito viene segnalata come differenza.

## 5. Misure

Comando: `node scripts/misure-home.mjs <url>`. La build nuova e main sono serviti in locale e misurati con lo stesso script, nello stesso Chromium di Playwright 147. Main viene da `git archive origin/main`, senza checkout.

| Misura | Main (locale) | Nuova | Obiettivo |
|---|---|---|---|
| JavaScript compresso | 0 file, 5,3 KB in linea | **100,9 KB** in 3 file, più 4,4 KB in linea | max 200 KB |
| LCP mobile, condizioni del 23/11 (390 px, densità 3, 1,6 Mbps, 150 ms, CPU 4x, cache spenta, mediana di 3) | 1,75 s (foto) | **1,26 s** (foto) | sotto 2,5 s |
| LCP mobile, produzione del 23/11 | 1,33 s | non misurabile prima del rilascio | |
| LCP desktop 1440 | 0,23 s | 0,11 s | |
| CLS, scorrimento completo, 1440 | 0,0001 | **0** | sotto 0,1 |
| CLS, scorrimento completo, 390 | 0 | **0,0089** | sotto 0,1 |
| Fotogrammi oltre 20 ms, 1440, CPU 4x, GPU (Metal) | 0 su 534 | **5 su 540**, p95 9,3 ms | 60 fps |
| Fotogrammi oltre 20 ms, 390, CPU 4x, GPU | 4 su 760 | **1 su 546**, p95 9,2 ms | 60 fps |

L'1,33 s di main è stato misurato in produzione, con la compressione della CDN. In locale nessuno dei due server comprime, per questo main in locale dà 1,75 s. Il confronto alla pari è quello in locale: 1,26 s contro 1,75 s.

**Lunghezza della pagina**, in pixel. La pagina nuova è misurata senza il riquadro degli avvisi di anteprima.

| Larghezza | Main | Nuova | Differenza |
|---|---|---|---|
| 1440 | 17.020 | 18.688 | +1.668 |
| 1024 | 20.531 | 18.929 | -1.602 |
| 390 | 22.048 | 21.709 | -339 |

A 1440 la scena a 5 passi rimane ferma mentre si scorre, e da sola vale circa 5 schermate. Con movimento ridotto la pagina a 1440 è lunga 17.317.

## 6. Cosa ha cambiato ogni skill

- **frontend-design.**
  - Le etichette di main restano, perché il piano le vuole [=], ma in tondo e senza spaziatura larga. Solo il marchio "INNOVALEX" della prima schermata resta spaziato come su main.
  - Numeri visibili solo dove c'è una sequenza vera: gli orari della timeline. I tre sistemi non hanno 01, 02, 03.
  - Una sola animazione per sezione, legata a quello che si legge. Per questo la barra del 37% è diventata ferma.
- **design-taste-frontend.** L'ispettore ha portato a queste correzioni:
  - i titoli di Problema, Tre sistemi e Compliance andavano oltre le due righe a 1440: ora il titolo del problema ha 8 colonne, quello dei sistemi tutta la larghezza, e la compliance non ha più un limite di caratteri;
  - "Cerca" nella lastra di Outlook era a 3,19:1: ora è a 4,64:1.

  Segnalazioni lasciate apposta, con il motivo:
  - Etichette sopra i titoli: testi [=] del piano.
  - Gradienti, ombre e la cifra 37% in gradiente: sono la sezione scura e le scene della fase 3, che il piano chiede di non ridisegnare. La velatura della foto è il caso ammesso.
  - Fondo crema: è il colore del marchio.
  - Una sola foto, nessun video: il piano vuole solo la foto.
  - La scena che resta per 5 schermate: è la scena a 5 passi, invariata.
  - Lo scorrimento laterale a 390: è Tutto lo studio della 3.1, con i punti.
  - Due falsi positivi: "testo coperto" è l'intestazione fissa che passa sopra mentre si scorre; "testo sul bordo" a 768 sono le voci del menu chiuso.
- **impeccable.** `craft-floor.md` letto prima delle modifiche. Il detector, sui componenti e sugli stili nuovi, non trova niente. Dai controlli sul quality floor vengono:
  - un oro solo per il testo piccolo, #7d5e26, perché #9e7a35 sulla crema dava 3,59:1;
  - la velatura più fitta tra 768 e 1279 px, dove il testo passa sopra la bilancia illuminata;
  - contorno del fuoco oro sui fondi scuri;
  - ogni movimento spento con movimento ridotto;
  - i test di contrasto sulla foto pixel per pixel.
- **unslop-ui.** Verdetto: lieve.
  - Tolti lo stato "In tempo reale" e "Aggiornato ora" del calcolatore (U5, U6).
  - Nessuna freccia sui pulsanti (U21).
  - Restano le etichette sopra i titoli (U1), perché sono testi [=] del piano.

## 7. Differenze dal piano

| Punto | Differenza | Motivo |
|---|---|---|
| Menu | "Il Problema" senza la virgoletta in più che c'è su main | Su main è un refuso |
| Menu | Voci complete da 1280 px, non da 1024 | Sei voci più il pulsante non entrano a 1024 senza andare a capo |
| Prima schermata | Velatura più fitta di main tra 768 e 1279 px | A quelle larghezze il terzo numero sta sopra la bilancia illuminata e scendeva sotto soglia |
| Prima schermata | Sotto i 768 px la foto è allargata e spostata come su main, e la bilancia si vede poco | La velatura per il testo bianco copre quasi tutta la larghezza |
| Problema | Orari della timeline senza "Ore" davanti | L'orario basta e allinea la colonna |
| Problema | La barra del 37% non si anima più | Una sola animazione per sezione: la timeline |
| Calcolatore | Tolto lo stato "In tempo reale" / "Aggiornato ora" | Non dice niente che il numero non mostri già |
| Calcolatore | Senza sistemi scelti: "Seleziona almeno un modulo." invece di "Seleziona almeno una feature." | Stessa parola dell'etichetta "Modulo INNOVALEX da simulare". Non è un testo [=] del piano |
| Calcolatore | I sistemi scelti, con le etichette corrette, sono già pronti in `data-sistemi-lead` | Servono al form della sessione 2 |
| Come funziona | Il titolo "Pannello" sopra il riquadro del pannello non c'è | Il riquadro ha già il suo titolo |
| Tre sistemi | Il piano [=] riporta per Dashboard collaboratori e Valore per socio una parte del testo di main | Ho seguito il piano. Il confronto automatico conferma che è testo di main |
| Risultati | Logo SCLN assente | Il piano non lo cita |
| Risultati | Firma "Francesco Cocola", senza "Avv." | Come nella citazione di main e nel piano |
| Compliance | È una sezione a sé (`#compliance`) nella stessa fascia scura dell'AI | Ha un suo titolo H2 nel piano |
| Diagnosi | Il form è il segnaposto | Previsto: sessione 2 |
| Lunghezza | A 1440 la pagina è 1.668 px più lunga di main | La scena a 5 passi si percorre ferma sullo schermo |

## 8. Note

- Astro 7 chiede Node 22.23.4 o più recente. Sul Mac c'è la 22.14.0, quindi build, prove e misure sono girate con una Node 24.22.3 già installata in locale. Vercel non è stato toccato.
- Non sono stati toccati: main, le impostazioni del progetto Vercel, la cartella App/sito-web, `api/lead.js` e `api/roi-lead.js`.
- In `public/assets` (copiata da main nella fase 1) restano le stesse foto della prima schermata. Nessuna pagina le usa più. Non le ho tolte in questa sessione: conviene farlo insieme alla pulizia di tutta la cartella.

## 9. Per la sessione 2

- Il form della diagnosi collegato a `/api/lead`: campi, pulsante ed esiti [=] del piano, prove con la chiamata intercettata. I sistemi scelti nel calcolatore sono già pronti in `data-sistemi-lead`.
- Confermare o togliere 8, 80 e 41: finché restano "da confermare", la build di produzione si ferma.
