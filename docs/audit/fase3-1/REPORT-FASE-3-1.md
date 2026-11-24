# Rifacimento sito, fase 3.1: rifinitura con i contenuti del sito attuale

Ramo `rifacimento-sito`, partenza dal commit 9c97dfd (albero pulito). Commit del lavoro: 8a685fd. Data: 24/11/2026.
La produzione e il ramo `main` non cambiano. Il sito attuale l'ho letto con `git show origin/main:index.html`:
il clone locale aveva solo il ramo del rifacimento, quindi ho scaricato `main` come riferimento remoto in sola lettura, senza checkout.

## 1. Skill

| Skill | Cosa mi ha fatto cambiare |
|---|---|
| frontend-design | Una sola cosa memorabile nella sezione Studio: lo zig zag tra i due blocchi grandi (Pratiche in alto a sinistra, Valore per socio in basso a destra), il resto quieto. Nessuna entrata animata nuova: l'unico movimento nuovo è la molla del beneficio 2, che risponde alla scena. I punti dello scorrimento su telefono esistono solo perché dicono una cosa vera, cioè dove sei. |
| design-taste-frontend | Ho fatto girare il suo ispettore sulla pagina prima e dopo. Le sole segnalazioni nuove sono lo scorrimento laterale e il margine destro a 0 px a 390: sono lo scorrimento orizzontale chiesto, con la scheda successiva che si intravede, e lo tengo. Il suo passo "guarda la resa" mi ha fatto trovare due difetti miei: i blocchi grandi vuoti a metà a 1440 (i piccoli ora stanno in orizzontale, accanto alla lastra) e la griglia asimmetrica illeggibile a 1024 (ora parte da 1200 px). Il lint segnala 4 gradienti in `sezioni.css`: sono la linea di lettura dell'AI e il "+" della FAQ, già presenti, fuori dal perimetro. |
| impeccable | Contesto caricato (nessun PRODUCT.md, rifinitura sull'implementazione esistente). Mi ha fatto misurare i contrasti degli elementi nuovi: il punto inattivo era a 2,2:1, sotto il 3:1 dei componenti, ora è a 3,2:1. Bersagli dei punti a 24 x 24 px, fuoco visibile, width e height sui ritratti. Il rilevatore trova solo il bordo oro della scheda Scadenza, già difeso in fase 3. Non ho letto il suo `craft-floor.md` prima delle modifiche: lo segnalo. |
| unslop-ui | Lo strumento Skill all'inizio non la trovava (come in fase 3). L'ho letta dal file con `.unslop-ui/taste.md` e caricata con lo strumento quando è comparsa, per il passaggio finale. Verdetto sulle stringhe nuove: **nessuno**, nessuna modifica. Niente punti esclamativi, numerazioni, frecce, prezzi, etichette sopra i titoli. Le segnalazioni che non tocco perché sono testi tuoi parola per parola o decisioni tue sono nel punto 9. |

## 2. Foto del team

- Sul Desktop c'erano tre file: `federico-garau-founder.png` (1170 x 1114), `federico-garau-founder2.png` (2104 x 2629), `francesco-cocola.webp` (726 x 746). Mi sono fermato e ho chiesto. Scelta di Federico: `federico-garau-founder.png`.
- Originali non toccati: hash SHA-1 identici prima e dopo. Lavoro su copie temporanee.
- Profilo colore: la foto di Garau era in Display P3, convertita in sRGB. Poi ogni immagine è ricostruita dai soli pixel: nessun EXIF, XMP, GPS o ICC. Verificato con Pillow e cercando i blocchi di metadati nei file: zero.
- Ritaglio 4:5, la proporzione delle cornici di Chi siamo, con la testa alla stessa scala nelle due foto. A Cocola, che ha il fondo bianco e i capelli a 10 px dal bordo, ho aggiunto 50 px di bianco sopra.
- In `public/team/`, AVIF e WebP, 1x e 2x di ogni misura mostrata:
  - Federico Garau: 240 x 300 da 560 px in su, 104 x 130 sotto. File a 104, 208, 240 e 480 px di larghezza.
  - Francesco Cocola: 176 x 220 da 560 px in su, 104 x 130 sotto. File a 104, 176, 208 e 352.
  - Peso: da 2 a 15 KB ciascuno.
- `width` e `height` espliciti, `srcset` e `sizes`, caricamento differito. CLS misurato: 0.
- **Risoluzione:** basta per il 2x di tutte e due. Il ritaglio di Garau è 891 x 1114 (serve 480 x 600), quello di Cocola 637 x 796 (serve 352 x 440).

## 3. Chi siamo

- Federico Garau, "Fondatore e amministratore". Accanto alla foto il testo della sezione Founder del sito attuale, da "Ho costruito INNOVALEX perché..." a "...se INNOVALEX ha senso per il tuo studio.", in quattro paragrafi (le due interruzioni di riga dell'originale e le due frasi lunghe).
- Avv. Francesco Cocola, Co-fondatore: nota invariata.
- Impaginazione da 1024 px: titolo a tutta larghezza, Federico a sinistra, Cocola e il caso SCLN a destra. Così la citazione di Cocola sta accanto al suo ritratto e le due colonne hanno altezze vicine (circa 700 px).
- Sotto i 560 px: ritratto e nome affiancati, testo sotto.
- Caso SCLN:
  - citazione del sito attuale, con la firma "Avv. Francesco Cocola, SCLN Legal Network";
  - "600+ email al mese" come primo numero, confermato, fonte "sito attuale";
  - 8, 80 e 41 restano "da confermare";
  - i quattro numeri stanno su una riga da 560 px in su, due per due sotto.
- `verifica.ts`:
  - la citazione è un dato con stato e fonte, e genera un avviso se non è confermata;
  - ogni numero porta la sua fonte;
  - `datiConfermati()` elenca 600+ e la citazione con la fonte "sito attuale".
- Piè di pagina: "Federico Garau, Fondatore e amministratore". Il resto è identico.

**Verifica parola per parola**, sul testo dell'HTML finale contro `main`: Founder (118 parole), FAQ a (88), FAQ c (54), citazione (23), sottotitolo FAQ (12). Tutti identici. L'unica differenza è tipografica: apostrofi e virgolette curvi, come nel resto del sito nuovo.

## 4. FAQ

- Sottotitolo del sito attuale sotto "Domande frequenti", sopra l'elenco: a sinistra da 1024 px, sopra sul telefono.
- Le cinque domande:
  - a) e c) parola per parola dal sito attuale, in c) "INNOVALEX" al posto de "l'Infrastruttura Operativa";
  - b) e d) con i testi decisi da te;
  - e) con la risposta attuale di questo ramo.
- Tolte "Funziona con la mia posta?" e "Quanto costa?".

## 5. Tutto lo studio in un posto

- Tolto "Ruoli e permessi". La funzione resta nel registro; i ruoli restano nelle frasi di sicurezza.
- "Valore per socio":
  - testo come richiesto;
  - funzione `valore-socio`, stato `attiva`, fonte "Piano C";
  - frammento con tre soci finti (Avv. Laura Ferri, Avv. Marco Conti, Avv. Elena Sarti), pratiche originate, gestite e una barra del valore, senza cifre e senza €.
- Contatti: "Segui ogni potenziale cliente dal primo contatto all'incarico. Quando firma, la pratica è già aperta."
- **Desktop, da 1200 px:** griglia asimmetrica a 12 colonne, a zig zag.
  - Pratiche grande (7 colonne, due righe) a sinistra, con Avviso al cliente e Scadenze a destra.
  - Sotto, Team e Contatti a sinistra e Valore per socio grande (7 colonne, due righe) a destra.
  - I piccoli hanno la lastra accanto al testo, i grandi la lastra che riempie le due righe.
  - Il frammento delle Pratiche ora ha quattro fasi e sei pratiche. Ho aggiunto due pratiche finte: Russo c. Termica Sud e Conti c. Arredi Riva.
- **Profondità e luce:** i frammenti usano lo stesso materiale delle lastre della prima schermata e dei benefici (le classi `lastra`, `vetro`, `spigolo` e `carta` di `filo.css`): vetro freddo ai bordi, luce calda in alto a sinistra, spessore, ombra portata, riflesso sulla carta. Hanno un'inclinazione ferma di 9 gradi che mostra lo spessore, senza animazione.
- **Da 768 a 1199 px:** i due grandi a tutta larghezza, i piccoli a coppie.
- **Sotto i 768 px:** scorrimento orizzontale solo CSS (`scroll-snap`).
  - La scheda successiva si intravede (circa 60 px a 390).
  - Sotto c'è l'indicatore: sei link alle schede, bersaglio di 24 px, nome e posizione per i lettori di schermo ("Pratiche, 1 di 6"). Il clic e la tastiera portano alla scheda.
  - Il punto della scheda visibile si accende con una timeline di scorrimento CSS. Dove non è supportata (oggi Firefox) i punti restano link uguali.
  - Nessun JavaScript aggiunto.

## 6. Altre decisioni

- **Test dei testi:** la regola "In arrivo" esclude solo la stringa esatta "Posta in arrivo", maiuscola compresa, con un commento che lo spiega. "posta in arrivo" e "In arrivo" da soli fanno ancora scattare la regola (provato). La build ora dice "Testi della home: nessun problema".
- **Passo 4, passo 5 e beneficio 1:** non toccati. La build di produzione si ferma ancora, con 13 problemi (provato con `VERCEL_ENV=production`):
  - 3 sezioni esistenti;
  - 6 blocchi dello studio in rilascio;
  - 1 riga dell'AI;
  - 3 numeri SCLN.
- **Beneficio 2:** il binario statico resta. La cartella passa da Sara a Paolo con una molla in CSS: `transition` con easing `linear()` a 33 punti, calcolato da una molla smorzata (smorzamento 0,65, circa il 7% oltre l'arrivo e ritorno), in 1,2 s. Niente Motion. Dove `linear()` non c'è vale la transizione di prima. Con movimento ridotto la cartella è già da Paolo e non c'è transizione (provato). I fotogrammi sono in `schermate/beneficio2-molla-*.png`.

## 7. Le sezioni non toccate sono identiche

Confronto pixel della build di prima (9c97dfd) e di dopo, a 1440, 1024 e 390, con il galleggiamento fermato e la barra nascosta. Le immagini sono in `prima-dopo/`.

| Sezione | Risultato |
|---|---|
| Prima schermata, sezione scura, tre benefici | 0 pixel diversi a tutte le larghezze |
| Scena, passi 1, 2, 3, 5 | 0 pixel diversi |
| Scena, passo 4 a 1024 | 0,11%: la scheda "Scadenza rilevata" fotografata a metà transizione. Due catture della stessa build di prima differiscono dello 0,69% nello stesso punto: è rumore della cattura |
| AI (390), diagnosi | 0,5-1,2%: stesso HTML, stessa altezza, spostamento verticale di una frazione di pixel perché le sezioni sopra hanno cambiato altezza. A 1440 l'AI ha la stessa frazione e la differenza è 0 |
| Piè di pagina | La riga del ruolo, più lo stesso spostamento di frazione |
| Studio, Chi siamo, FAQ | Cambiate, come richiesto |

## 8. Misure

Build servita in locale, Chromium di Playwright 147, prima e dopo con lo stesso script.

| Misura | Prima (9c97dfd) | Dopo | Obiettivo |
|---|---|---|---|
| JavaScript compresso | 100,7 KB | **100,7 KB** (invariato), più 3,6 KB in linea | max 200 KB |
| LCP mobile, B.3 (390 px, densità 3, 1,6 Mbps, 150 ms, CPU 4x, mediana di 3) | 1,24 s | **1,32 s** (titolo) | sotto 2,5 s |
| CLS, scorrimento completo, 1440 | 0,0012 | **0,0012** | sotto 0,1 |
| CLS, scorrimento completo, 390 | 0,0006 | **0** | sotto 0,1 |
| Fotogrammi oltre 20 ms, 1440, CPU 4x | 4 su 681 | **6 su 696**, p95 9,3 ms | 60 fps |
| Fotogrammi oltre 20 ms, 390, CPU 4x | 6 su 706 | **3 su 694**, p95 9,4 ms | 60 fps |
| HTML compresso | 12,4 KB | 14,1 KB | |

Lo 0,0012 a 1440 è il cambio di font del titolo al caricamento, già noto dalla fase 3.

**Contrasti degli elementi nuovi** (tutti sopra soglia):

| Elemento | Contrasto |
|---|---|
| Testo di Federico e sottotitolo FAQ | 7,69:1 |
| Firma della citazione | 8,50:1 |
| Intestazione della tabella dei soci | 6,25:1 |
| Righe secondarie delle pratiche | 5,83:1 |
| Riga della pratica evidenziata | 6,57:1 |
| Sigla del primo socio | 5,72:1 |
| Punto attivo | 13,36:1 |
| Punto inattivo (componente, soglia 3:1) | 3,18:1 |

**Lunghezza della pagina**, senza il riquadro degli avvisi di anteprima (tra parentesi con il riquadro):

| Larghezza | Prima | Dopo | Differenza |
|---|---|---|---|
| 1440 | 12.979 (13.337) | 13.604 (13.962) | +625 |
| 1024 | 11.256 (11.677) | 12.880 (13.301) | +1.624 |
| 390 | 13.388 (14.313) | 12.844 (13.790) | **-544** |

Sezioni a 390 px:

| Sezione | Prima | Dopo | Differenza |
|---|---|---|---|
| Studio | 2.212 | 727 | **-1.485** |
| Chi siamo | 1.098 | 1.843 | +745 (testo Founder, ritratti, quarto numero, citazione) |
| FAQ | 409 | 606 | +197 |

**Obiettivo dei 2.000 px in meno a 390: non raggiunto.** Lo scorrimento orizzontale toglie 1.485 px a Studio, che prima era alto 2.212 px: 2.000 in meno solo da Studio vorrebbe dire 212 px, meno del titolo. I contenuti nuovi di Chi siamo e FAQ ne aggiungono 942. La pagina scende di 544 px. Le leve, fuori dal perimetro di questa fase, sono al punto 9.

## 9. Prove

`scripts/prove-home.mjs` (Playwright), sulla build servita in locale: **176 prove su 176 superate**, a 1440, 1024 e 390, con e senza movimento ridotto. Erano 124: le nuove controllano

- niente "Ruoli e permessi";
- scorrimento orizzontale con aggancio e sei punti sotto i 768 px, il quinto punto che porta alla scheda Team, nessuno scorrimento né punti sopra;
- Pratiche e Valore per socio più alti dei piccoli da 1200 px;
- due ritratti 4:5 caricati con width, height e alt;
- ruolo, citazione, 600+ e piè di pagina;
- cinque FAQ con sottotitolo;
- cartella del beneficio 2 arrivata da Paolo, con la molla `linear()` e senza transizione con movimento ridotto;
- test dei testi: ora zero problemi, senza eccezioni a mano nel test.

## 10. Cosa resta aperto

- **Altezza a 390:** 544 px in meno invece di 2.000. Prime leve:
  - segnaposto del form della diagnosi più basso sul telefono (oggi 1.132 px con la FAQ chiusa sotto);
  - quattro numeri SCLN su una riga anche sul telefono.
- **1024 px:** la pagina cresce di 1.624 px, perché sotto i 1200 i due blocchi grandi stanno a tutta larghezza. Se conta, si può portare la griglia asimmetrica a 1024 con i piccoli in verticale.
- **FAQ b) e d):** nominano scadenze, team e attività, che nel registro sono anche funzioni in rilascio (calendario, carichi del team, attività e valore). Le FAQ non passano dalla verifica delle funzioni: da confermare che il testo sia vero oggi, oppure le registro in `funzioni.ts`.
- **Testi copiati dal sito attuale, da riconfermare:**
  - FAQ c) promette un intervento nei primi 30 giorni;
  - il testo Founder dice che il problema "non ha una soluzione sul mercato italiano";
  - FAQ a) dice che un sistema automatizzato lavora "meglio, più velocemente e senza errori".
- **Numeri SCLN:** 8, 80 e 41 da confermare. I quattro numeri hanno tutti lo stesso peso (unslop U23); quello che regge il caso è 600+.
- **Autorizzazioni:** uso di nome, ruolo e foto di Cocola e del nome SCLN da avere per iscritto (piano I.2).
- **Dati finti nuovi:** tre soci e due pratiche (punto 5).
- **Indicatore su Firefox:** il punto attivo non si accende, finché non supporta le timeline di scorrimento.

## 11. File

- Video dello scorrimento completo, girati sull'anteprima (con gli avvisi arancioni):
  - 1440 px: https://raw.githubusercontent.com/innovalex-lab/sito-web/8a685fd/docs/audit/fase3-1/home-scorrimento-1440.webm
  - 390 px, con lo scorrimento orizzontale di Studio alla fine: https://raw.githubusercontent.com/innovalex-lab/sito-web/8a685fd/docs/audit/fase3-1/home-scorrimento-390.webm
- `schermate/`:
  - `studio-*` e `chi-siamo-*` a 1440, 1024 e 390, come in produzione e `-anteprima` con gli avvisi;
  - `studio-390-scheda-1/3/6` con il punto attivo;
  - `faq-*`, anche con la prima risposta aperta;
  - `beneficio2-*`: finale, fotogrammi della molla, movimento ridotto.
- `prima-dopo/`: immagini delle differenze, `esiti.json`, misure prima e dopo.
- Codice:
  - `src/components/sezioni/` (Studio, ChiSiamo, Diagnosi, PiePagina);
  - `src/content/funzioni.ts`, `src/content/verifica.ts`;
  - `src/styles/sezioni.css`, `src/styles/filo.css` (solo la transizione della cartella);
  - `scripts/verifica-testi.mjs`, `scripts/prove-home.mjs`;
  - `public/team/`.
