# Prototipo "Il filo d'oro", iterazione 2: report

Pagina: `/anteprima/filo` (noindex). Ramo `rifacimento-sito`. Data: 24/11/2026.
Decisione di Federico del 24/11 registrata nel piano, in "Decisioni".

## Cosa è cambiato, punto per punto

1. **Prima schermata.**
   - La pila occupa quasi metà della larghezza a 1440 px e si avvicina al titolo senza coprirlo.
   - Ogni lastra ha uno spessore vero: tre facce in CSS 3D con un riflesso lungo lo spigolo.
   - Il vetro è più freddo ai bordi e ha una luce calda interna.
   - Un'ombra a due strati sta sul piano, e ogni lastra fa ombra su quella sotto.
   - Profondità di campo: le due lastre più lontane sono leggermente sfocate e più scure.
   - Le lastre galleggiano lentamente e un punto di luce sale lungo il filo verticale.
   - Su desktop la pila segue appena il mouse. L'effetto è spento con movimento ridotto e su touch.
   - Il titolo resta l'elemento LCP e non si muove.
2. **Luce e contrasto.**
   - Una luce calda sta dietro la pila e dietro il palco della scena fissata, con zone d'ombra ai bordi.
   - Nei benefici tre aloni caldi seguono le tre scene.
   - Le interfacce restano su carta bianca, nitide.
3. **Il filo d'oro.**
   - È spesso il doppio, con un gradiente oro che lo fa sembrare un filo tondo e un alone caldo.
   - Nella scena è un unico tracciato. Parte dalla pastiglia e resta in orizzontale finché non supera il testo, così non passa sopra la frase. Entra nel perno della lastra nuova e scende cucendo i perni della pila.
   - Le tangenti sono continue alle giunzioni.
   - A ogni cambio di passaggio un punto di luce lo percorre. Lo stesso punto parte dal logo all'arrivo sulla pagina.
4. **Benefici, tre scene con impaginazioni diverse.**
   - *Recuperi il fatturato nascosto:* una lastra grande esce verso destra. Le barre si riempiono, poi l'oro copre le ore stimate tratteggiate e le cifre passano da 2.775 € a 3.750 €. Infine una lastra piccola, "Ore stimate confermate 6,5 h", si posa davanti.
   - *Passi una pratica e non spieghi nulla:* la cartella, con riepilogo e allegati, scorre da Sara Lombrici a Paolo Neri lungo un filo d'oro. L'avatar di arrivo si accende e compare l'esito.
   - *Sai a che punto è ogni pratica:* la pipeline è a tutta larghezza. Rossi Srl c. Edilvetta passa da Istruttoria a Diffida inviata, le pratiche sotto salgono a chiudere il vuoto e i conteggi cambiano.
5. **Mobile a 390 px.**
   - La pila si costruisce nella prima schermata, più grande di prima, una lastra alla volta all'arrivo.
   - Nella scena ho scelto il ripiego previsto dal brief. Le lastre si posano una alla volta entrando nello schermo: calano inclinate e si appoggiano piatte.
   - Non c'è alcun blocco dello scorrimento. Una pila fissata dentro una sola altezza di schermo avrebbe reso le interfacce troppo piccole per leggerle.
6. **Font: da 150 KB a 47 KB.**
   - Serif e sans sono ridotti ai pesi usati (serif 380–650, sans 400–700) e al latino dell'italiano.
   - Il corsivo contiene solo le lettere della seconda riga del titolo: 3,5 KB, incorporato nel CSS.
   - I file sono in `src/fonts/filo/` con nomi di famiglia propri, così le pagine A, B e sistema restano identiche.
   - Questa pagina non precarica più il font comune: in `Base.astro` c'è una nuova opzione `fontPropri`.
7. **Fedeltà al prodotto.**
   - Le lastre seguono le schermate della demo in `~/Desktop/INNOVALEX-screenshot` (scatti del 17/11, dati fittizi). L'accesso diretto alla demo non è servito.
   - *Pannello:* logo e nome dell'utente in alto, poi Cliente e Pratica come menu a tendina, "Assegna a", Ore, "Includi nel report", Conferma.
   - *Allegati:* "Rinominati e numerati per pratica", nel formato del prodotto `2026-11-12_014_Email_Diffida_Edilvetta.pdf`, con la riga "originale:".
   - *Scadenza:* scheda "Scadenza rilevata", con data in serif, descrizione, pratica, Conferma e Rifiuta, e il bordo oro a sinistra come nel prodotto.
   - *Pipeline:* le fasi vere del recupero crediti (Istruttoria, Diffida inviata, Ricorso depositato, Decreto emesso) e le schede con persona, ore e urgenza.
   - Il nome rinominato di Rossi è ora `2026-11-12_015_Diffida_Edilvetta.pdf`, nel formato del prodotto, invece del nome scritto nel primo brief.
   - Palette, tipografia del sito e dati fittizi restano quelli di prima.

## Esito dell'accesso alla demo

demo.innovalexai.it chiede l'autenticazione del browser (Basic auth del server). Non ho fatto altri tentativi: Federico ha indicato la cartella di screenshot della demo, che basta per allineare struttura, etichette e ordine dei campi.

## Misure, prima e dopo

Build di produzione servita in locale. Chromium di Playwright.

| Misura | Iterazione 1 | Iterazione 2 | Obiettivo |
|---|---|---|---|
| LCP mobile, condizioni B.3 | 0,82 s (titolo) | **0,84 s (titolo)** | sotto 2,5 s |
| LCP desktop | 0,11 s | 0,10 s | |
| CLS | 0 | **0** | sotto 0,1 |
| JavaScript compresso | 1,6 KB | **1,9 KB** | massimo 200 KB |
| Font | 150,8 KB | **46,8 KB** (43,2 KB di file più 3,5 KB di corsivo nel CSS) | sotto 90 KB |
| Richieste | 8 | 8 | |
| Fotogrammi oltre 20 ms, 1440, CPU 4x, GPU | 1 su 1.909 | **0 su 1.918**, p95 9,2 ms | 60 fps |
| Fotogrammi oltre 20 ms, 390, CPU 4x, GPU | 0 su 1.918 | **2 su 1.871**, p95 9,2 ms | 60 fps |
| Fotogrammi oltre 20 ms, 1440, CPU 4x, senza GPU | 161 su 1.174 | 187 su 1.094, p95 34 ms | caso pessimo |
| Fotogrammi oltre 20 ms, 390, CPU 4x, senza GPU | 0 | 0 su 1.890 | |

- Prove a 1440, 1024 e 390 px, anche con movimento ridotto: risposta 200, console pulita, nessuno scorrimento orizzontale.
- Nessuna dipendenza nuova, nessun WebGL, nessun video, nessun `backdrop-filter`.
- Motion per React non è servito: le scene dei benefici sono transizioni CSS avviate da un solo IntersectionObserver.
- Senza GPU la scena fissata a 1440 px perde fotogrammi per via delle lastre grandi in 3D. Con la GPU è fluida.

## Critica

- **design-taste-frontend.** Restano 8 FAIL e 11 WARN, quasi tutti in conflitto voluto con il brief: gradienti di luce, corsivo oro, fondo crema, titolo lungo, scena fissata su 5 schermate.
  - La "linea sottile" segnalata è il binario del filo.
  - Il testo coperto è la lastra posata sotto quella attiva.
  - Il margine destro diverso dipende dalle lastre che escono volutamente verso destra.
- **impeccable (detector).** Nessun rilievo.
- **unslop-ui.** Nessun taglio. Le etichette nuove vengono dal prodotto, compreso il formato "Persona · ore" delle schede pipeline.

## Cosa ancora non regge il confronto

- **Prima schermata contro Legora.** Si avvicina, ma non è alla pari.
  - Legora usa un render 3D con rifrazione vera: il vetro deforma ciò che c'è sotto.
  - In CSS lo spessore e il riflesso sono credibili, ma il vetro resta opaco.
  - Per arrivarci servirebbe WebGL o un'immagine pre-renderizzata, cioè peso e complessità che oggi non ho ritenuto giustificati.
- **Mobile.** La scena è una sequenza di lastre che si posano, non una pila che si costruisce. La pila c'è solo nella prima schermata.
- **Benefici.** Sono molto più vivi, ma restano interfacce su vetro. Manca un momento "cinema" come la sezione del 37%.
- **Senza GPU.** La scena a 1440 px resta sotto i 60 fps.

## File

- Video:
  - https://raw.githubusercontent.com/innovalex-lab/sito-web/rifacimento-sito/docs/audit/concept/iterazione-2/filo-scorrimento-1440.webm
  - https://raw.githubusercontent.com/innovalex-lab/sito-web/rifacimento-sito/docs/audit/concept/iterazione-2/filo-scorrimento-390.webm
- Screenshot dei passaggi: `screenshot/`, a 1440, 1024 e 390 px, più `screenshot/movimento-ridotto/`.
- Prima e dopo: `prima-dopo-1440.jpg`, `prima-dopo-390.jpg`.
- Confronto con i riferimenti: `confronto-riferimenti-1440.jpg`, `confronto-riferimenti-390.jpg`.
