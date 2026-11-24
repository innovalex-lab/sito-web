# Rifacimento sito, fase 3: tolto il filo, aggiunte le sezioni

Ramo `rifacimento-sito`, partenza dal commit 50ea2aa. Data: 24/11/2026. La produzione non cambia.
Decisioni di Federico del 24/11 registrate nel piano, in "Decisioni del 24/11/2026".

## 1. Cosa ho tolto: solo il filo

- Il filo d'oro che parte dal logo (SVG, alone, punto di luce) e la sua definizione di gradiente.
- I binari verticali di ogni sezione, con la punta luminosa e il codice che li riempiva allo scorrimento.
- I nodi sul binario (anche quelli accanto alle pastiglie della scena) e la mezzaluna finale con il marchio, che era il punto d'arrivo del filo.
- Nella prima schermata: il filo verticale che attraversa la pila, il punto di luce che lo risale e i perni d'oro sulle lastre.
- Nella scena: il tracciato dalla pastiglia attiva alla lastra, i perni e il punto di luce. La continuità la dà la pastiglia attiva, che già diventa blu inchiostro.
- Nel beneficio 2: la linea d'oro animata tra Sara Lombrici e Paolo Neri. **Scelta mia, da confermare:** ho lasciato il binario chiaro statico tra i due avatar, perché senza di lui la riga delle persone si sfalda; se Federico lo vuole via, è una riga di markup.
- CSS e script: tolte 42 regole e le funzioni `aggiornaBinari` e `disegnaFilo`. Restano lastre, pastiglie, luci, inclinazione, galleggiamento e tutte le altre animazioni.

## 2. Altre modifiche all'esistente (solo quelle chieste)

- **Home.** Il contenuto di `/anteprima/filo` è ora `/`. Tolte `/anteprima/filo`, `/anteprima/a`, `/anteprima/b` e il componente usato solo da A e B. `/anteprima/sistema` resta in noindex. La home è indicizzabile solo nella build di produzione, come prima.
- **Intestazione fissa.** Voci verso le sezioni (Come funziona, Benefici, Lo studio, AI e sicurezza, Chi siamo, FAQ). "Prenota la diagnosi" è sempre visibile, anche a 390 px (logo a 112 px sotto i 480 px). Menu mobile: si chiude con Esc (il fuoco torna sul pulsante), scegliendo una voce o toccando fuori.
- **Scena fissata e intestazione fissa.** Per non coprire la scena, la scena si ferma sotto la barra (72 px) e misura tutto sull'altezza che resta invece che su quella dello schermo. La composizione è la stessa: a 1440 x 900 la scena è identica al prototipo visto su uno schermo di 1440 x 828 (vedi il confronto).
- **Chiusura → Diagnosi.** Stesso titolo e stesso stile. Il testo diventa "In 30 minuti guardiamo come lo studio gestisce posta, documenti, pratiche e ore. Alla fine sai cosa si può sistemare e da dove partire." Ho tolto il pulsante "Prenota la diagnosi di 30 minuti", che portava a sé stesso: al suo posto c'è il segnaposto del form.

## 3. Le sezioni esistenti sono identiche

Confronto pixel per pixel in `prima-dopo/` (prima, dopo, differenze in rosso), a 1440, 1024 e 390 px, con il galleggiamento fermato in entrambe le versioni per avere immagini confrontabili.

| Sezione | 1440 | 1024 | 390 | Cosa cambia |
|---|---|---|---|---|
| Prima schermata | 0,15% | 0,24% | 0,43% | binario, filo verticale, perni |
| Scena, 5 passi (390: sequenza) | 0,40-0,49% | 0,41-0,56% | 0,21% | binario, nodi, tracciato, perni |
| Sezione scura del 37% | 0,31% | 0,43% | 1,14% | binario |
| Tre benefici | 0,20% | 0,28% | 0,72% | binario, linea d'oro del beneficio 2 |

Dimensioni identiche in tutte le coppie. Ho controllato a occhio ogni immagine di differenza: il rosso cade solo sul filo.

## 4. Cosa ho aggiunto

Tra le tre scene dei benefici e la diagnosi:

1. **Tutto lo studio in un posto** (`#studio`, statica). Sei blocchi: pratiche, avviso al cliente, scadenze, team, contatti (CRM), ruoli e permessi. Ognuno ha un frammento d'interfaccia stilizzato e parziale, con i dati fittizi già usati nel prototipo (Rossi c. Edilvetta, Sara Lombrici, Paolo Neri, Giulia Moro). Lo stato di ogni blocco viene dal file dei contenuti.
2. **AI e automazioni** (`#ai`, seconda e ultima sezione scura). Titolo deciso da Federico, due colonne con gli elenchi del brief, e sopra ciascuna una micro animazione con Motion:
   - *Cosa legge l'AI per te:* la mail di Marta Rossi viene letta, compaiono le etichette (Diffida, Urgenza alta, Cliente: Rossi Srl) con una molla, poi la scadenza proposta del 27 novembre con Conferma e Rifiuta. **È l'unico elemento con cui si interagisce:** il visitatore conferma o rifiuta, e può annullare. Dice con un gesto "l'AI propone, l'avvocato decide".
   - *Cosa succede da solo:* la mail diventa un PDF che cade nella cartella Rossi Srl / Rossi c. Edilvetta con il numero progressivo, in Outlook compare "Archiviata" e parte l'avviso ad Avv. Paolo Neri.
   - Sotto, in una fascia, solo le quattro frasi di sicurezza della decisione 5 (`#sicurezza`).
3. **Chi siamo e caso SCLN** (`#chi-siamo`, `#caso-studio`, statica). "INNOVALEX nasce dentro uno studio legale.", Federico Garau fondatore, Avv. Francesco Cocola co-fondatore con la frase del brief. Nessuna foto: cornici 4:5 con le iniziali, pronte per i ritratti. Accanto il caso SCLN Legal Network, Roma, "In produzione", con 8 caselle, 80 pratiche, 41 clienti. Citazione vuota.
4. **Diagnosi, FAQ, piè di pagina** (`#contatti`, `#faq`). Segnaposto del form con le dimensioni dei campi del piano F.11 e la scritta "Form della diagnosi (sessione dedicata)", nessun invio. Quattro FAQ con `details` e `summary`. Piè di pagina con i dati societari identici a `scripts/legacy/index.html` (righe 2106-2113), Privacy Policy, Cookie Policy, `/contratti` e logo su fondo bianco. Non ho portato la colonna "Compliance" del vecchio sito: contiene "Server EU, GDPR by design", che la decisione 5 non ammette.

Movimento ridotto e senza JavaScript: tutte le sezioni nuove mostrano lo stato finale completo (l'HTML del server è già la scena compiuta; screenshot in `sezioni-nuove/movimento-ridotto/`).

## 5. Contenuti e verità

- **File dei contenuti:** `src/content/funzioni.ts`. Stato di ogni funzione dal piano C ("attiva" o "in rilascio"), testi dei blocchi nuovi, registro dei punti delle sezioni esistenti che citano una funzione, numeri SCLN con stato "da confermare", citazione vuota, FAQ.
- **Verifica:**
  - `src/content/verifica.ts`, nella pagina: funzioni non attive presentate come disponibili e dati da confermare.
  - `scripts/verifica-testi.mjs`, sull'HTML finale (testo, `aria-label`, `alt`): trattino lungo, prezzi, "In arrivo", "agente AI", "Germania", "Tavolo Fondatori". Per i prezzi conta le parole di listino e le cifre in euro legate a un periodo o a un utente: le cifre fittizie nelle interfacce (2.775 €) non sono prezzi.
- **Produzione:** con `VERCEL_ENV=production` la build si ferma. Provato: uscita 1, 13 problemi elencati.
- **Anteprime:** la build passa. La pagina mostra un avviso arancione su ogni blocco nuovo non attivo e su ogni numero da confermare, e un riquadro in fondo con l'elenco completo, comprese le sezioni esistenti. La console del browser resta pulita.

### Testi esistenti segnalati dal test (non li ho cambiati: decide Federico)

| Dove | Problema | Proposta |
|---|---|---|
| Lastra Outlook (prima schermata e scena, passo 1) | "Posta in arrivo" fa scattare la regola "In arrivo" | È il nome della cartella di Outlook, non una roadmap. Proposta: escludere dalla regola il nome esatto "Posta in arrivo". In alternativa la lastra mostra "Posta" |
| Scena, passo 4 "I documenti trovano il loro nome" | Analisi dei documenti in rilascio | Tenere il passo e pubblicare dopo il rilascio, oppure riscrivere il passo sui nomi progressivi degli allegati della mail, che sono attivi |
| Scena, passo 5 "Le ore diventano valore" | Attività e valore (ore stimate) in rilascio | Il report per cliente è attivo: si può togliere la frase sulle ore stimate finché la funzione non è accesa |
| Beneficio 1 "Recuperi il fatturato nascosto" | Stessa funzione del passo 5 | Come sopra: la lastra piccola "Ore stimate confermate" dipende da Attività e valore |

## 6. Cosa resta da confermare

- Stato delle funzioni in rilascio: avviso al cliente e link documenti, CRM, carichi del team, analisi documenti, calendario, attività e valore. Quando una si accende su uno studio reale, si cambia una riga in `funzioni.ts`.
- Numeri SCLN (8, 80, 41) con l'Avv. Cocola. Il conteggio clienti nel repo è diverso (piano F.8).
- Citazione di Cocola: vuota finché non c'è un testo approvato per iscritto.
- Uso di nome e ruolo di Cocola e del nome SCLN: autorizzazione scritta (piano I.2).
- Ritratti di Federico e Cocola.
- Il binario chiaro rimasto nel beneficio 2 (punto 1).
- Le frasi dei sei blocchi e delle FAQ, scritte da me sulle bozze del piano.

## 7. Skill e librerie

| Strumento | Cosa mi ha fatto cambiare |
|---|---|
| frontend-design | Ho tenuto ferma la direzione del brief (palette, Source Serif e Inter, carta su vetro) e ho speso l'unico momento di movimento nuovo sulla sezione AI, invece di mettere entrate animate su ogni sezione. I blocchi dello studio hanno un frammento d'interfaccia diverso ciascuno, al posto di icone in fila. |
| design-taste-frontend | Il suo lint ha trovato i filetti tra le voci dell'elenco AI e della FAQ: li ho sostituiti con spazio e con uno scalino di tono. Il titolo AI andava su tre righe a 1440: ho allargato la misura e ora sta in due. Le ombre e i bordi segnalati sono dentro i frammenti d'interfaccia (`data-ui`, eccezione prevista dalla skill) e restano. |
| impeccable | Mi ha fatto leggere la sua soglia minima prima di scrivere: niente etichetta sopra i titoli (ho spostato "In produzione" sotto il nome dello studio, non sopra), contrasti misurati, stati di hover e focus su ogni controllo, FAQ con icona disegnata. Il suo rilevatore segnala il bordo oro a sinistra delle schede scadenza: lo tengo perché riproduce la scheda "Scadenza rilevata" del prodotto, come la lastra del prototipo. |
| unslop-ui (con `.unslop-ui/taste.md`) | Verdetto Light. "Dal primo contatto alla pratica, nello stesso posto in cui lavori." → "Dal primo contatto all'incarico, fino alla pratica aperta." (unslop 27). "No. Si parte dalla posta e tenete il gestionale che usate oggi." → "No. Si parte dalla posta e il gestionale di oggi resta dov'è." (unslop 11: la pagina dà del tu, la risposta dava del voi). Niente frecce, numerazioni, badge o prezzi. Attività da fare: i tre numeri SCLN hanno lo stesso peso (U23, solo segnalazione). |

Nota: all'inizio unslop-ui non era registrata nello strumento Skill (è una skill del progetto). L'ho letta dal file e applicata; quando è comparsa nello strumento l'ho caricata e ho fatto il passaggio finale.

**Kokonut UI e bklit UI: non ho preso componenti.** Ho letto i due cataloghi ufficiali, senza installare nulla.

- Kokonut ha 121 componenti. L'unico vicino al bisogno è `ai-tool-approval`: è un'interfaccia per approvare i comandi di un agente AI (tema escluso dalla decisione 6), porta `lucide-react` e avrei dovuto riscriverla tutta.
- bklit ha solo grafici. Nelle sezioni nuove servirebbero dati inventati.

Per questo niente `components.json` e niente shadcn nel ramo.

**Motion per React 14.14.0 (MIT): adottato,** solo nelle due micro animazioni della sezione AI, con `LazyMotion` e `domAnimation`. È un'isola idratata 300 px prima di entrare nello schermo: non pesa sull'LCP. anime.js non è servito.

**Proposta per le scene esistenti (non applicata):** con Motion la cartella del beneficio 2 potrebbe arrivare da Sara a Paolo con una molla invece che con una transizione lineare. Decide Federico.

## 8. Misure

Build servita in locale, Chromium di Playwright.

| Misura | Prototipo, iter. 2 | Fase 3 | Obiettivo |
|---|---|---|---|
| JavaScript compresso | 1,9 KB | **100,7 KB**: 64,1 runtime React, 33,4 isola Motion, 3,2 integrazione. Gli script della pagina sono in linea nell'HTML | massimo 200 KB |
| LCP mobile, condizioni B.3 (390 px, 1,6 Mbps, 150 ms, CPU 4x, mediana di 3) | 0,84 s | **1,26 s** (titolo) | sotto 2,5 s |
| LCP desktop | 0,10 s | 0,13 s | |
| CLS allo scorrimento completo | 0 | **0,0001 a 1440, 0 a 390** | sotto 0,1 |
| Fotogrammi oltre 20 ms, 1440, CPU 4x, GPU (M1 Pro, Metal) | 0 su 1.918 | **3 su 1.520**, p95 9,9 ms | 60 fps |
| Fotogrammi oltre 20 ms, 390, CPU 4x, GPU | 2 su 1.871 | **1 su 1.644**, p95 9,8 ms | 60 fps |
| HTML compresso | | 12,4 KB | |

- Le due misure di LCP mobile non sono confrontabili alla pari: oggi ho usato anche la densità 3 del telefono.
- Al caricamento a 1440 c'è uno spostamento di 0,0012 dovuto al cambio di font del titolo. C'è identico nel prototipo e non l'ho toccato.
- Durante il lavoro il CLS era salito a 0,064. Causa: l'isola AI, quando tornava allo stato iniziale per animarsi, era più bassa di 35 px. Ora l'altezza resta bloccata su quella finale.

**Contrasti misurati sulle sezioni nuove:** tutti sopra soglia. Il più basso sul testo normale è 5,20:1 ("Confermata da te"). Le iniziali dei ritratti, testo grande, sono a 4,57:1.

**Lunghezza della pagina:**

| Larghezza | Prototipo | Home fase 3 | Senza il riquadro degli avvisi di anteprima |
|---|---|---|---|
| 1440 | 9.414 px | 13.337 px | 12.979 px |
| 1024 | 7.821 px | 11.677 px | 11.256 px |
| 390 | 6.684 px | 14.313 px | 13.388 px |

A 1440 la scena fissata è più corta di prima, perché misura l'altezza sotto la barra.

**Da rivedere:** a 390 px le sezioni nuove aggiungono circa 6.700 px. I sei blocchi uno sotto l'altro e il segnaposto del form a una colonna sono la parte più lunga. Se Federico vuole un mobile più corto, la prima leva sono i blocchi dello studio su due colonne senza frammento d'interfaccia.

## 9. Prove

`scripts/prove-home.mjs` (Playwright), sulla build servita in locale: **124 prove su 124 superate**.

Larghezze 1440, 1024 e 390 px, ciascuna con e senza movimento ridotto. Le prove controllano:

- risposta 200;
- console pulita;
- nessuno scorrimento orizzontale;
- un solo H1 e titoli in ordine;
- tutte le ancore del menu: esistono, il clic porta la sezione subito sotto la barra fissa e il pulsante della diagnosi resta visibile;
- menu mobile: Invio apre, Esc chiude e riporta il fuoco;
- FAQ da tastiera;
- conferma della scadenza nell'isola AI da tastiera;
- test dei testi eseguito, con il solo avviso noto "Posta in arrivo";
- avvisi di stato visibili in anteprima.

## 10. File

- Video dello scorrimento completo: `home-scorrimento-1440.webm` (13.337 px di pagina), `home-scorrimento-390.webm` (14.313 px). Sono girati sull'anteprima, quindi mostrano gli avvisi arancioni.
- Prima e dopo delle sezioni esistenti: `prima-dopo/`.
- Sezioni nuove a 1440, 1024 e 390: `sezioni-nuove/`, con intestazione fissa, menu mobile e `movimento-ridotto/`.
- Codice nuovo:
  - `src/components/sezioni/` (Studio, Ai, AiScene.tsx, ChiSiamo, Diagnosi, PiePagina);
  - `src/styles/sezioni.css`;
  - `src/content/funzioni.ts`, `src/content/verifica.ts`;
  - `scripts/verifica-testi.mjs`, `scripts/prove-home.mjs`.
