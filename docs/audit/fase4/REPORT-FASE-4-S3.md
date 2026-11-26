# Fase 4, sessione 3: passata di eleganza

Ramo `rifacimento-sito`, commit del lavoro `a166238`. Non pubblicato: nessun merge su main, Vercel non toccato.

Cambia solo la resa visiva. Testi, ordine delle sezioni, contenuto delle lastre e form sono quelli di prima: lo script di confronto [=] dice "Nessuna differenza".

## 1. In breve

- **Titoli più piccoli e più quieti:**
  - titoli di sezione da 52 a 38 px a 1440, da 32 a 28 px a 390;
  - titolo della prima schermata da 92 a 60 px;
  - 37% da 352 a 120 px a 1440 e da 128 a 80 px a 390, in oro pieno.
  - Tutti in peso 400, spaziatura quasi neutra (-0,005em), interlinea 1,18.
- **Etichette:** 12 px, maiuscolo spaziato 0,13em, oro, con una linea oro di 1 px a sinistra.
- **Separatori:** linee oro di 1 px e spazio bianco al posto delle card che separavano contenuti: 750 €, il pannello di "Come funziona", i tre sistemi, il caso SCLN, la compliance e le FAQ.
- **Lastre piatte:** fondo bianco, bordo di 1 px, ombra corta. Tolti il vetro, i tre spigoli di spessore e l'ombra portata.
- **Niente effetti di luce:** niente gradienti sul testo, nessuna luce dietro la scena, il 37% e il riepilogo. Resta solo la velatura sulla foto della prima schermata.
- **Movimento:** curve morbide senza rimbalzo; ogni molla è diventata una curva di 500-600 ms.
- **Pulsanti:** principale blu inchiostro pieno, 44 px, angoli da 3 px. Sui fondi scuri: filo e testo oro chiaro, pieno al passaggio.
- **Spazio:** +25% tra le sezioni (da 144 a 180 px a 1440, da 64 a 80 px a 390) e più spazio tra etichetta, titolo e testo.
- **Righe di testo:** al massimo 65 caratteri (prima fino a 105).
- **Anteprima del font dei titoli:** con `?titoli=classico` i titoli passano a EB Garamond, solo nelle build non di produzione.

## 2. Fasce scure

Oltre alla prima schermata le fasce scure sono già due, quindi non ho schiarito nulla:

1. il blocco del 37% dentro "Il problema";
2. riepilogo e compliance, una sola fascia continua.

Il riquadro del risultato nel calcolatore è scuro ma è un'interfaccia dentro una sezione bianca, non una fascia.

## 3. Prima e dopo

Schermate senza l'intestazione fissa (tranne la prima schermata), dopo uno scorrimento completo, così ogni animazione è arrivata alla fine.

| Sezione | Prima | Dopo |
|---|---|---|
| Prima schermata, 1440 | <img src="s3/schermate/prima/prima-schermata-1440.jpg" width="420"> | <img src="s3/schermate/dopo/prima-schermata-1440.jpg" width="420"> |
| Prima schermata, 390 | <img src="s3/schermate/prima/prima-schermata-390.jpg" width="200"> | <img src="s3/schermate/dopo/prima-schermata-390.jpg" width="200"> |
| Il problema, con il 37%, 1440 | <img src="s3/schermate/prima/problema-1440.jpg" width="420"> | <img src="s3/schermate/dopo/problema-1440.jpg" width="420"> |
| Il problema, con il 37%, 390 | <img src="s3/schermate/prima/problema-390.jpg" width="200"> | <img src="s3/schermate/dopo/problema-390.jpg" width="200"> |
| Calcolatore, 1440 | <img src="s3/schermate/prima/calcolatore-1440.jpg" width="420"> | <img src="s3/schermate/dopo/calcolatore-1440.jpg" width="420"> |
| Calcolatore, 390 | <img src="s3/schermate/prima/calcolatore-390.jpg" width="200"> | <img src="s3/schermate/dopo/calcolatore-390.jpg" width="200"> |
| Scena "Segui una mail" (a 1440 a metà corsa, passo 3), apertura, 1440 | <img src="s3/schermate/prima/scena-testa-1440.jpg" width="420"> | <img src="s3/schermate/dopo/scena-testa-1440.jpg" width="420"> |
| Scena "Segui una mail" (a 1440 a metà corsa, passo 3), 1440 | <img src="s3/schermate/prima/scena-1440.jpg" width="420"> | <img src="s3/schermate/dopo/scena-1440.jpg" width="420"> |
| Scena "Segui una mail" (a 1440 a metà corsa, passo 3), 390 | <img src="s3/schermate/prima/scena-390.jpg" width="200"> | <img src="s3/schermate/dopo/scena-390.jpg" width="200"> |
| I tre sistemi, 1440 | <img src="s3/schermate/prima/tre-sistemi-1440.jpg" width="420"> | <img src="s3/schermate/dopo/tre-sistemi-1440.jpg" width="420"> |
| I tre sistemi, 390 | <img src="s3/schermate/prima/tre-sistemi-390.jpg" width="200"> | <img src="s3/schermate/dopo/tre-sistemi-390.jpg" width="200"> |
| Tutto lo studio in un posto, 1440 | <img src="s3/schermate/prima/studio-1440.jpg" width="420"> | <img src="s3/schermate/dopo/studio-1440.jpg" width="420"> |
| Tutto lo studio in un posto, 390 | <img src="s3/schermate/prima/studio-390.jpg" width="200"> | <img src="s3/schermate/dopo/studio-390.jpg" width="200"> |
| Riepilogo, 1440 | <img src="s3/schermate/prima/riepilogo-1440.jpg" width="420"> | <img src="s3/schermate/dopo/riepilogo-1440.jpg" width="420"> |
| Riepilogo, 390 | <img src="s3/schermate/prima/riepilogo-390.jpg" width="200"> | <img src="s3/schermate/dopo/riepilogo-390.jpg" width="200"> |
| Risultati reali, 1440 | <img src="s3/schermate/prima/risultati-1440.jpg" width="420"> | <img src="s3/schermate/dopo/risultati-1440.jpg" width="420"> |
| Risultati reali, 390 | <img src="s3/schermate/prima/risultati-390.jpg" width="200"> | <img src="s3/schermate/dopo/risultati-390.jpg" width="200"> |
| Analisi gratuita e form, 1440 | <img src="s3/schermate/prima/form-1440.jpg" width="420"> | <img src="s3/schermate/dopo/form-1440.jpg" width="420"> |
| Analisi gratuita e form, 390 | <img src="s3/schermate/prima/form-390.jpg" width="200"> | <img src="s3/schermate/dopo/form-390.jpg" width="200"> |
| Chi siamo, 1440 | <img src="s3/schermate/prima/chi-siamo-1440.jpg" width="420"> | <img src="s3/schermate/dopo/chi-siamo-1440.jpg" width="420"> |
| Chi siamo, 390 | <img src="s3/schermate/prima/chi-siamo-390.jpg" width="200"> | <img src="s3/schermate/dopo/chi-siamo-390.jpg" width="200"> |

## 4. Con `?titoli=classico` (EB Garamond nei titoli)

Stesse sezioni, sinistra Source Serif 4, destra EB Garamond. Cambiano solo i testi in serif: titoli, numeri in evidenza, citazione. Il testo corrente resta Inter.

| Sezione | Source Serif 4 | EB Garamond |
|---|---|---|
| Prima schermata, 1440 | <img src="s3/schermate/dopo/prima-schermata-1440.jpg" width="420"> | <img src="s3/schermate/classico/prima-schermata-1440.jpg" width="420"> |
| Prima schermata, 390 | <img src="s3/schermate/dopo/prima-schermata-390.jpg" width="200"> | <img src="s3/schermate/classico/prima-schermata-390.jpg" width="200"> |
| Il problema, con il 37%, 1440 | <img src="s3/schermate/dopo/problema-1440.jpg" width="420"> | <img src="s3/schermate/classico/problema-1440.jpg" width="420"> |
| Il problema, con il 37%, 390 | <img src="s3/schermate/dopo/problema-390.jpg" width="200"> | <img src="s3/schermate/classico/problema-390.jpg" width="200"> |
| Calcolatore, 1440 | <img src="s3/schermate/dopo/calcolatore-1440.jpg" width="420"> | <img src="s3/schermate/classico/calcolatore-1440.jpg" width="420"> |
| Calcolatore, 390 | <img src="s3/schermate/dopo/calcolatore-390.jpg" width="200"> | <img src="s3/schermate/classico/calcolatore-390.jpg" width="200"> |
| Scena "Segui una mail" (a 1440 a metà corsa, passo 3), apertura, 1440 | <img src="s3/schermate/dopo/scena-testa-1440.jpg" width="420"> | <img src="s3/schermate/classico/scena-testa-1440.jpg" width="420"> |
| Scena "Segui una mail" (a 1440 a metà corsa, passo 3), 1440 | <img src="s3/schermate/dopo/scena-1440.jpg" width="420"> | <img src="s3/schermate/classico/scena-1440.jpg" width="420"> |
| Scena "Segui una mail" (a 1440 a metà corsa, passo 3), 390 | <img src="s3/schermate/dopo/scena-390.jpg" width="200"> | <img src="s3/schermate/classico/scena-390.jpg" width="200"> |
| I tre sistemi, 1440 | <img src="s3/schermate/dopo/tre-sistemi-1440.jpg" width="420"> | <img src="s3/schermate/classico/tre-sistemi-1440.jpg" width="420"> |
| I tre sistemi, 390 | <img src="s3/schermate/dopo/tre-sistemi-390.jpg" width="200"> | <img src="s3/schermate/classico/tre-sistemi-390.jpg" width="200"> |
| Tutto lo studio in un posto, 1440 | <img src="s3/schermate/dopo/studio-1440.jpg" width="420"> | <img src="s3/schermate/classico/studio-1440.jpg" width="420"> |
| Tutto lo studio in un posto, 390 | <img src="s3/schermate/dopo/studio-390.jpg" width="200"> | <img src="s3/schermate/classico/studio-390.jpg" width="200"> |
| Riepilogo, 1440 | <img src="s3/schermate/dopo/riepilogo-1440.jpg" width="420"> | <img src="s3/schermate/classico/riepilogo-1440.jpg" width="420"> |
| Riepilogo, 390 | <img src="s3/schermate/dopo/riepilogo-390.jpg" width="200"> | <img src="s3/schermate/classico/riepilogo-390.jpg" width="200"> |
| Risultati reali, 1440 | <img src="s3/schermate/dopo/risultati-1440.jpg" width="420"> | <img src="s3/schermate/classico/risultati-1440.jpg" width="420"> |
| Risultati reali, 390 | <img src="s3/schermate/dopo/risultati-390.jpg" width="200"> | <img src="s3/schermate/classico/risultati-390.jpg" width="200"> |
| Analisi gratuita e form, 1440 | <img src="s3/schermate/dopo/form-1440.jpg" width="420"> | <img src="s3/schermate/classico/form-1440.jpg" width="420"> |
| Analisi gratuita e form, 390 | <img src="s3/schermate/dopo/form-390.jpg" width="200"> | <img src="s3/schermate/classico/form-390.jpg" width="200"> |
| Chi siamo, 1440 | <img src="s3/schermate/dopo/chi-siamo-1440.jpg" width="420"> | <img src="s3/schermate/classico/chi-siamo-1440.jpg" width="420"> |
| Chi siamo, 390 | <img src="s3/schermate/dopo/chi-siamo-390.jpg" width="200"> | <img src="s3/schermate/classico/chi-siamo-390.jpg" width="200"> |

Nota: EB Garamond è alla stessa dimensione in pixel, senza correzioni. A parità di corpo sembra più piccolo e più leggero, perché ha l'occhio più basso. Se lo scegli, va alzato di circa il 10%.

## 5. Video dello scorrimento

Con movimento, build di anteprima, commit `a166238`:

- [1440](https://raw.githubusercontent.com/innovalex-lab/sito-web/a16623841eac8e6d800acdecf60d9cd886a869ee/docs/audit/fase4/s3/scorrimento-1440.webm)
- [390](https://raw.githubusercontent.com/innovalex-lab/sito-web/a16623841eac8e6d800acdecf60d9cd886a869ee/docs/audit/fase4/s3/scorrimento-390.webm)

## 6. Token cambiati

### Scala tipografica e spazi (`src/styles/global.css`, `@theme`)

| Token | Prima | Dopo |
|---|---|---|
| `--text-display` (titolo della prima schermata) | `clamp(2.375rem, 1.45rem + 4.05vw, 5.5rem)`, interlinea 1,04, -0,022em. La prima schermata non lo usava: aveva `clamp(2.25rem, 0.95rem + 5.4vw, 5.75rem)` | `clamp(2.125rem, 1.4rem + 2.95vw, 3.75rem)`, interlinea 1,12, -0,005em. Ora la prima schermata lo usa |
| `--text-titolo` (titoli di sezione) | `clamp(2rem, 1.55rem + 1.95vw, 3.25rem)`, 1,1, -0,018em | `clamp(1.75rem, 1.4rem + 1.1vw, 2.5rem)`, 1,18, -0,005em |
| `--text-lead` | `clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)`, 1,55 | `clamp(1.0625rem, 1.02rem + 0.15vw, 1.1875rem)`, 1,6 |
| `--spacing-sezione` | `clamp(4rem, 2rem + 8vw, 9rem)` | `clamp(5rem, 2.5rem + 10vw, 11.25rem)` |
| `.btn` | 48 px, bordo 1,5 px, angoli 0, 16 px / 600 | 44 px, bordo 1 px, angoli 3 px, 15 px / 550 |
| `.link`, voci del menu | sottolineatura 2 px | sottolineatura 1 px |

### Token nuovi della home (`src/styles/storia.css`, `.pagina-filo`)

Prima questi valori erano scritti a mano sezione per sezione. Ora ogni sezione usa il token.

| Token | Prima (valori sparsi) | Dopo |
|---|---|---|
| `--peso-titoli` | 450-500 | 400 |
| `--interlinea-titoli` | 1,02-1,15 | 1,18 |
| `--spaziatura-titoli` | da -0,012em a -0,05em | -0,005em |
| `--text-sottotitolo` (titoli dei sistemi, giornata tipo, caso, FAQ, pannello) | da 26 a 40 px | `clamp(1.375rem, 1.2rem + 0.55vw, 1.75rem)`, 22-28 px |
| `--text-voce` (blocchi dello studio, persone, compliance) | 22-24 px | 20 px |
| `--text-cifra` (37%) | `clamp(8rem, 30vw, 22rem)`, gradiente e bagliore | `clamp(5rem, 3.6rem + 5.5vw, 7.5rem)`, oro chiaro pieno |
| `--text-numero` (750 €, valore annuale) | 56-96 px e 44-68 px | `clamp(2.5rem, 2.1rem + 1.6vw, 3.5rem)`, 40-56 px |
| `--text-numero-piccolo` (prima schermata, risultati) | 22-36 px e 36-44 px | `clamp(1.375rem, 1.2rem + 0.6vw, 2rem)`, 22-28 px |
| `--text-etichetta`, `--spaziatura-etichetta` | 15 px, peso 650, tondo | 12 px, peso 600, maiuscolo, 0,13em |
| `--misura` (testo corrente) | da 34 a 46rem, fino a 105 caratteri per riga | 28em, massimo 65 caratteri per riga |
| `--spazio-etichetta` | 0,75rem | 1,25rem |
| `--spazio-titolo` | 1,25rem | 1,75rem |
| `--linea-oro` | nessuno | `#cbb183` (linee sui fondi chiari; sul blu notte `--oro`) |
| `--lastra-bordo`, `--ombra-corta` | vetro a gradiente, 4 ombre, 3 spigoli, ombra portata a gradiente radiale | bordo 1 px `rgb(30 38 86 / 0.14)`, ombra `0 1px 2px` + `0 4px 12px -6px` |
| `--raggio` (pulsanti, campi) | 0 per i pulsanti, 999 px per le pastiglie della scena | 3 px |
| `--raggio-riquadro` (calcolatore, form, citazione) | 0,6rem (9,6 px) | 4 px |
| `--ease` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | `cubic-bezier(0.22, 0.61, 0.36, 1)` |

### Misure lette nel browser

| Elemento | Prima 1440 | Dopo 1440 | Prima 390 | Dopo 390 |
|---|---|---|---|---|
| Titolo della prima schermata | 92 px, peso 500, interlinea 1,02 | 60 px, peso 400, interlinea 1,18 | 36 px | 34 px |
| Titolo di sezione | 52 px, peso 500 | 38 px, peso 400 | 32 px | 28 px |
| Titolo del riepilogo | 75 px, peso 450 | 38 px, peso 400 | 29 px | 28 px |
| Titolo di un sistema | 40 px | 27 px | 28 px | 22 px |
| 37% | 352 px | 120 px | 128 px | 80 px |
| 750 € | 96 px | 56 px | 56 px | 40 px |
| Valore annuale del calcolatore | 68 px | 56 px | 44 px | 40 px |
| Numeri della prima schermata | 36 px | 28 px | 22 px | 22 px |
| Etichetta | 15 px, peso 650 | 12 px, peso 600, maiuscolo, 1,56 px di spaziatura | uguale | uguale |
| Testo introduttivo | 20 px, interlinea 1,55 | 18 px, interlinea 1,6 | 18 px | 17 px |
| Spazio di sezione | 144 px | 180 px | 64 px | 80 px |

## 7. Cosa è cambiato, per punto del brief

**Tipografia.**
- Ogni titolo in serif passa da una sola regola (peso, interlinea, spaziatura dai token).
- Cifre allineate (`tabular-nums`) nei numeri del calcolatore (campi, scale, quote, risultati) e delle lastre. Nelle lastre restano proporzionali solo i nomi dei file: con le cifre allineate "2026-11-12_014" sembrava spaziato a caso.
- Righe del testo corrente misurate sul testo vero:
  - massimo 64 caratteri a 1440 e 1024;
  - massimo 50 caratteri a 390.

**Effetti.**
- Tolti il gradiente e il bagliore del 37%, la luce della sezione scura, la luce del riepilogo e la luce dietro la scena.
- Tolti anche il riflesso sulla carta delle lastre e i gradienti oro dentro le lastre (icona della cartella, barre del valore), ora oro pieno.
- La barra della giornata è piatta: fondo pieno, filo di 1 px, oro pieno, senza prospettiva e senza bagliore.
- Nello studio i blocchi non sono più inclinati.
- La scena a 5 passi mantiene la sua prospettiva: è il comportamento della scena.

**Etichette e separatori.**
- Etichette: "Il problema", "Giornata tipo", "Timeline dello spreco", "Calcolatore ROI", "Come Funziona", i tre sistemi, "Risultati reali", "SCLN Legal Network", "Prima Call", "Risultato" e il marchio "INNOVALEX" nella prima schermata.
- Contrasto delle etichette:
  - sui fondi chiari usano l'oro più scuro del sistema (`#7d5e26`): 5,4:1 sulla crema, oltre 6:1 sul bianco;
  - sul blu notte usano l'oro chiaro: oltre 8:1.
- Le card restano dove contengono un'interfaccia: calcolatore, risultato, form, lastre.
- La citazione di Cocola tiene il suo fondo, perché è lo stesso fondo del ritratto.

**Movimento.**

| Dove | Prima | Dopo |
|---|---|---|
| Cartella da Sara a Paolo | molla `linear()` di 1,2 s, 7% oltre l'arrivo | 600 ms, curva morbida |
| Lastre della scena fissata | molla `cubic-bezier(0.3, 1.28, 0.5, 1)` di 1,15 s | 600 ms, curva morbida, stesso percorso |
| Lastre della scena su telefono (entrata) | molla di 1,1 s, caduta inclinata di 32° | 550 ms, opacità e 12 px |
| Lastra piccola "ore stimate" (entrata) | molla di 0,9 s, 4em e rotazione | 550 ms, opacità e 12 px |
| "Paolo" che riceve la cartella | molla, scala da 0,85 | 500 ms, solo opacità |
| Pratica che cambia fase nella pipeline | 1,2 s | 600 ms, curva morbida |

La timeline dello spreco resta com'è, legata allo scorrimento. Con movimento ridotto tutto è fermo come prima.

**Pulsanti.**
- Sui fondi scuri ("Scopri il problema", "Scopri la Soluzione", "Prenota l'analisi gratuita" del riepilogo) ho scelto filo e testo oro chiaro: si lega alle linee e alle etichette in oro, e un pulsante pieno bianco su blu notte pesava più del titolo.
- Le pastiglie della scena sono diventate pulsanti con angoli da 3 px, senza ombra.
- Tolta la freccia in basso nella prima schermata: era un pulsante con una freccia, e il brief le esclude. Non aveva testo visibile, solo un'etichetta per i lettori di schermo.
- Nessun pulsante ha ombra o freccia.

## 8. Anteprima del font dei titoli

- **Pacchetto:** `@fontsource/eb-garamond` 5.3.0, licenza SIL Open Font License 1.1 (OFL-1.1), come dipendenza di sviluppo.
- **Peso:** il pacchetto è di 3,1 MB, ma resta in `node_modules`. Sul sito va un solo file: latino, peso 400, 23,8 KB (`eb-garamond-latin-400-normal.woff2`), con la licenza accanto (`OFL.txt`).
- **Come funziona:**
  - A fine build, se non è produzione, `astro.config.mjs` copia il font in `dist/anteprima/titoli/`. Con `astro dev` lo serve dallo stesso indirizzo.
  - Nella home, solo fuori produzione, c'è l'interruttore. Su schermo largo è in basso a destra. Su telefono e tablet sta in fondo alla pagina, perché fisso copriva i numeri della prima schermata.
  - Il font si scarica solo con `?titoli=classico`.
- **Produzione verificata:** ho costruito la home con `VERCEL_ENV=production` in una cartella a parte. Non c'è `anteprima/titoli/` e nessun file contiene "garamond", "titoli-classico" o "interruttore-titoli".
  - Per arrivare in fondo ho dovuto spegnere per un momento il controllo dei contenuti, che in produzione ferma la build per i tre numeri SCLN da confermare. `src/content/verifica.ts` è stato ripristinato subito: nessuna differenza nel commit.

## 9. Verifiche

- **Prove Playwright:** `node scripts/prove-home.mjs`, a 1440, 1024 e 390, con e senza movimento ridotto, **476 su 476 superate**.
  - Unico test aggiornato: "riepilogo: la sezione finisce con il pulsante oro". Prima controllava il fondo oro pieno `rgb(210, 176, 114)`. Ora controlla filo oro chiaro di 1 px, testo oro chiaro, nessun fondo, angoli da 3 px, nessuna ombra.
  - Gli altri test sono invariati. Tre sono falliti al primo giro e li ho fatti passare correggendo la pagina, non il test:
    - la parola chiave del riepilogo non era più 1,5 volte il resto del titolo;
    - l'interruttore fisso copriva i numeri della prima schermata su telefono.
- **Confronto [=]:** `node scripts/verifica-uguali.mjs`: "Nessuna differenza" (79 frasi del piano, 86 elementi). Controllo dei testi della build: nessun problema. Nessun trattino lungo nelle righe aggiunte.
- **Contrasti:** i controlli di contrasto delle prove passano a ogni larghezza, compresi i pixel della foto della prima schermata.
- **Budget e lunghezza**, stesso script delle sessioni precedenti (`scripts/misure-home.mjs`):

| Misura | Prima | Dopo |
|---|---|---|
| JavaScript, build di produzione (in linea, gzip) | 3,4 KB | 3,4 KB |
| JavaScript, build di anteprima (con l'interruttore) | 3,4 KB | 3,6 KB |
| LCP mobile (390, 1,6 Mbps, CPU 4x, mediana di 3) | 2,08 s | 1,96 s |
| LCP desktop | 0,15 s | 0,15 s |
| CLS 1440 / 390 | 0 / 0,005 | 0,0002 / 0,006 |
| Fotogrammi oltre 20 ms, 1440 / 390 | 4 / 1 | 5 / 1 |
| Lunghezza della pagina 1440 | 19.254 px | 19.669 px (+2,2%) |
| Lunghezza della pagina 1024 | 19.602 px | 19.456 px (-0,7%) |
| Lunghezza della pagina 390 | 23.995 px | 23.500 px (-2,1%) |

La pagina resta lunga quasi uguale: le sezioni hanno il 25% di spazio in più, i titoli occupano circa un terzo in meno.

- **Detector di impeccable**, tre segnalazioni, lasciate apposta:
  - Inter: il font del testo è una tua decisione;
  - la barra a sinistra della mail non letta nella lastra di Outlook e il filo oro della scadenza nella lastra dello studio: sono dentro le lastre, che in questa sessione non cambiano.

## 10. Cosa ha fatto ogni skill

- **frontend-design, design-taste-frontend.** Le uso per il giudizio sulle schermate, non per cambiare direzione. Le loro regole vietano etichette in maiuscolo e linee sottili. Qui le hai chieste tu, quindi vince il brief.
- **impeccable.**
  - Letto `craft-floor.md` prima delle modifiche.
  - Spaziatura delle lettere mai sotto -0,04em, ombre con scostamento e sfocatura, curve senza rimbalzo.
  - Valori letti nel browser, non a occhio; detector sui file cambiati.
- **unslop-ui.** Passata finale: nessun testo toccato. Tolti la freccia della prima schermata e i gradienti decorativi.

## 11. File toccati

- Token e stili: `src/styles/global.css`, `src/styles/storia.css`, `src/styles/filo.css`, `src/styles/sezioni.css`.
- Markup tolto, solo decorazione:
  - `src/components/sezioni/Eroe.astro`: freccia in basso;
  - `src/components/sezioni/Problema.astro`: livello della luce;
  - `src/components/sezioni/Studio.astro` e le nove lastre in `src/components/filo/`: spigoli del vetro.
- Anteprima dei titoli: `src/pages/index.astro`, `astro.config.mjs`, `package.json`, `package-lock.json`.
- Prova aggiornata: `scripts/prove-home.mjs`.
- Piano: `docs/PIANO-STORYLINE.md`, una riga: la cartella da Sara a Paolo senza molla.
- Schermate e video: `docs/audit/fase4/s3/`.

Nota tecnica: build e prove girate con Node 22.23.4 (come `.nvmrc`). Sul Mac c'è la 22.14.0.

## 12. Aggiunte del 26/11, su richiesta di Federico

- **Risultati reali:** accanto alla citazione il logo di SCLN Legal Network al posto della foto di Francesco Cocola, come nel sito precedente.
  - Il logo viene da `scln_legal_network_logo (1).jpeg` (200 x 200), ritagliato sul marchio: `public/clienti/scln-legal-network.webp`, 182 x 110, 4,3 KB, mostrato a 120 px.
  - Il riquadro della citazione passa dal fondo dei ritratti al bianco con bordo di 1 px, lo stesso fondo del logo.
- **Chi siamo:** il ruolo di Federico Garau è "Fondatore" (era "Fondatore e amministratore"), sia in Chi siamo sia nel piè di pagina.
- **Prove aggiornate in `scripts/prove-home.mjs`:**
  - il controllo del ritratto accanto alla citazione ora controlla il logo: 120 x 73, caricato, testo alternativo "Logo SCLN Legal Network";
  - il controllo del ruolo ora vuole "Fondatore", e nel piè di pagina "Federico Garau, Fondatore" senza "amministratore".
- **Esito:** 476 su 476 prove superate; il confronto [=] dice "Nessuna differenza".
