# Prototipo "Il filo d'oro": report

Pagina: `/anteprima/filo` (noindex). Ramo `rifacimento-sito`. Data: 24/11/2026.

## Cosa non è stato verificato

- **Fedeltà al prodotto.** La demo (demo.innovalexai.it) ha rifiutato l'accesso: HTTP 401 con le credenziali ricevute. Le interfacce delle lastre sono ricostruite da `docs/PIANO-RIFACIMENTO-SITO.md` (sezioni C ed E.5) e dai dati fittizi del brief, non da schermate della demo. Vanno confrontate con il prodotto vero.
- **Anteprima Vercel.** Il link di condivisione del nuovo commit va chiesto a Federico. Questa pagina non è ancora stata verificata lì.

## Cosa ho imparato dai riferimenti

Screenshot completi a 1440 px in `docs/audit/riferimenti/`, fogli riassuntivi `foglio-*.jpg`.

- **Legora.** Un solo oggetto, la pila di lastre di vetro, resta fisso al centro mentre si scorre. A ogni scatto si aggiunge uno strato. A sinistra le pillole in grigio scuro: solo quella attiva si apre con una frase. Fondo grigio chiarissimo, nessun colore, molto vuoto, luce morbida dall'alto e ombre lunghe. Il movimento è lento e fisico. La memoria che resta è l'oggetto, non il testo.
- **Resend.** Cinema: fondo nero, oggetti 3D modellati da una sola luce, titoli serif sottili e grandi, schermate del prodotto scure e curate al pixel. Una cosa per schermata e ritmo lento. Il logo gigante in chiusura fa da firma.
- **Metodo TRACCIA.** Il concetto viene dal nome. Una linea continua scende a sinistra per tutta la pagina e lega le sezioni. Le lettere giganti di TRACCIA si riempiono una per una scorrendo, e ogni lettera è una fase. Sezioni chiare e scure si alternano, la giornata tipo sta su una linea del tempo.

Tecnica misurata: Legora e Resend usano video e immagini 3D pre-renderizzate (3 e 5 video, Resend anche un canvas). TRACCIA usa solo SVG e CSS (0 video, 8 script).

## Il concetto realizzato

La mezzaluna oro del logo si allunga in un filo. Il filo scende lungo un binario a sinistra in tutte le sezioni e si riempie mentre si scorre, con una punta che segna dove si è arrivati. Nella prima schermata attraversa in verticale una pila esplosa di quattro lastre (mail, pannello, documento, ore), con un perno d'oro su ogni strato. Nella scena fissata esce dalla pastiglia attiva, raggiunge la lastra appena arrivata e scende cucendo i perni di tutte le lastre già posate. Nella sezione scura diventa oro chiaro e la barra della giornata si riempie fino al 37%. La pagina finisce sulla mezzaluna del logo.

## Scelte tecniche e pesi

| Parte | Tecnica | Peso |
|---|---|---|
| Lastre, pila, prospettiva | CSS 3D (`perspective`, `preserve-3d`, trasformazioni) | solo CSS |
| Filo dal logo, filo della scena | SVG con `stroke-dashoffset` | solo CSS e markup |
| Scorrimento, binario, ingressi | Uno script senza dipendenze (`src/scripts/filo.ts`) | **1,6 KB gzip**, unico JavaScript della pagina |
| Animazioni interne delle lastre | Transizioni CSS su `transform` e `opacity` | solo CSS |

- **Motion per React non è stato usato.** Lo script da 1,6 KB fa tutto quello che serve. React più Motion avrebbero aggiunto circa 100 KB (piano D.3).
- **WebGL e Three.js non sono stati usati.** Nessun effetto lo ha richiesto.
- **Nessuna dipendenza nuova.** Nessun video come sfondo.
- **Font.** Aggiunto il corsivo di Source Serif 4, già presente nel pacchetto installato: 51 KB, precaricato. I font in totale pesano 150 KB, oltre l'obiettivo di 70 KB del piano B.3. Si può ridurre con un sottoinsieme del corsivo, che serve solo per una riga.
- **CSS della pagina:** 7,4 KB gzip più 4,9 KB del CSS comune. **HTML:** 7,3 KB gzip.
- **Modifiche ai file della fase 2:** `Intestazione.astro` ha un nuovo slot `logo`, `Base.astro` un nuovo slot `head`. Le pagine A, B e sistema restano identiche.

## Misure

Build di produzione servita in locale con `astro preview`, senza compressione (peso reale trasferito più basso). Chromium di Playwright.

| Misura | Risultato | Obiettivo |
|---|---|---|
| LCP mobile, condizioni B.3 (390 px, 1,6 Mbps, 150 ms, CPU 4x, cache off, mediana di 3) | **0,82 s**, elemento LCP: il titolo | sotto 2,5 s |
| LCP desktop 1440 | 0,11 s, il titolo | |
| CLS (mobile e desktop, pagina scorsa per intero) | **0,00** | sotto 0,1 |
| JavaScript totale gzip | **1,6 KB** | massimo 200 KB |
| Richieste | 8 | sotto 15 |
| Fps a 1440, CPU 4x, rendering GPU | 1 fotogramma su 1.909 oltre 20 ms, p95 9,2 ms | 60 fps |
| Fps a 390, CPU 4x, rendering GPU | 0 su 1.918 oltre 20 ms, p95 9,2 ms | 60 fps |
| Fps a 1440, CPU 4x, rendering **software** | 161 su 1.174 oltre 20 ms, p95 34 ms | caso pessimo |

Il rendering software (senza GPU) è un caso pessimo, raro sui dispositivi reali. Lì la scena fissata a 1440 px perde fotogrammi per via delle ombre e delle lastre grandi. Su GPU è fluida.

Prove a 1440, 1024 e 390 px: risposta 200, console senza errori né avvisi, nessuno scorrimento orizzontale. Movimento ridotto: la scena diventa una sequenza statica completa e tutti gli stati sono finali (screenshot in `screenshot/movimento-ridotto/`).

**Accessibilità.** Testi reali. Le lastre sono `role="img"` con una descrizione. Le pastiglie sono pulsanti che portano al loro passaggio. Focus visibile. Contrasti dell'oro su crema: 3,59:1, usato solo per il titolo grande.

## Critica

- **impeccable (revisione indipendente).** "Chiaro, ordinato" più che "wow". Le lastre sembravano schede, il filo una barra di avanzamento, il mobile perdeva il concetto. Dopo la critica: lastre più grandi, spessore del vetro, atterraggio con rimbalzo, filo che cuce la pila, punta del binario, mezzaluna finale, pastiglie cliccabili, lastre piatte e nitide su mobile.
- **design-taste-frontend (inspect).** 10 FAIL e 9 WARN, quasi tutti in conflitto voluto con il brief: gradienti per la luce, oro corsivo nel titolo, fondo crema, frasi lunghe imposte (titolo, dato Clio), binario del filo letto come "linea sottile", pila che copre la lastra sotto. Corretti: interfacce marcate come frammenti di prodotto, titolo della scena più largo. Falso positivo: a 768 px le voci di menu "vicine al bordo" sono nel menu mobile chiuso.
- **unslop-ui (pulizia finale, verdetto leggero).** Tolte le strisce sul bordo delle righe nuove (U24) e un pallino decorativo (U10). Un due punti tra due frasi diventa un punto. Tenute la barra blu della mail non letta, perché è la convenzione di Outlook, e la legenda delle ore stimate.

## Cosa mi convince e cosa no

**Mi convince**

- La sezione scura con il 37% è il momento più forte. Ha luce, materia e un dato con fonte.
- La storia di una sola mail, dalla diffida ai 750 euro della pratica, con l'avvocato che conferma, è specifica e vera rispetto al piano.
- Il filo ora ha un ruolo: esce dal logo, attraversa la pila, finisce sulla mezzaluna.
- Prestazioni molto sopra gli obiettivi.

**Non mi convince ancora**

- **Non è ancora al livello di Legora.** Legora ha un unico oggetto enorme, centrato, con poco intorno. Qui le lastre sono più ricche di contenuto ma meno monumentali, e il vetro resta più "carta con bordo" che vetro spesso e trasparente.
- **I benefici sono il tratto più tradizionale.** Le tre interfacce sono diverse tra loro, ma la sezione resta testo e figura alternati.
- **Mobile.** Bello e leggibile, ma è una sequenza: la sensazione di pila che si costruisce c'è solo su desktop.

**Funzioni da verificare (piano, sezione C).** "I documenti trovano il loro nome" e "Le ore diventano valore" mostrano funzioni oggi in rilascio. Vanno trattate così prima di portarle sul sito pubblico.

## File

- Video: `filo-scorrimento-1440.webm`, `filo-scorrimento-390.webm`
- Screenshot dei passaggi: `screenshot/` (1440, 1024, 390) e `screenshot/movimento-ridotto/`
- Confronto con i riferimenti: `confronto-1440.jpg`, `confronto-390.jpg`
