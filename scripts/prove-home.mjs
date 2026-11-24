// Prove della home con Playwright, sulla build servita in locale.
// uso: node scripts/prove-home.mjs http://localhost:4329/
// Controlla a 1440, 1024 e 390 px, con e senza movimento ridotto: risposta 200, console pulita, nessuno
// scorrimento orizzontale, un solo H1 e titoli in ordine, ancore del menu, intestazione fissa con il pulsante
// sempre visibile, menu mobile con Esc, FAQ da tastiera, prima schermata, timeline del problema, calcolatore
// (calcolo, nomi e percentuali, invio con chiamata intercettata), ritratti, contrasti, testi [=] e testi vietati.
// Nessun contatto vero: /api/roi-lead e /api/lead sono sempre intercettate e non escono dal browser.
import { chromium } from 'playwright';
import { verificaTesti } from './verifica-testi.mjs';
import { confrontaUguali, leggiPagina } from './verifica-uguali.mjs';

const url = process.argv[2] ?? 'http://localhost:4329/';
const esiti = [];
const ok = (nome, vero, dettaglio = '') => esiti.push({ nome, vero: Boolean(vero), dettaglio });
const spazi = (t) => (t ?? '').replace(/[  ]/g, ' ').trim();

// Contrasto in pagina: testo contro il primo fondo pieno risalendo gli antenati (con le velature composte).
// Gli elementi sopra un'immagine o un gradiente senza fondo pieno vanno a parte; la prima schermata si misura sui pixel.
function misuraContrasti() {
  const leggi = (s) => {
    let m = s.match(/^rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      return { c: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 };
    }
    m = s.match(/^color\(srgb ([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
      return { c: p.slice(0, 3).map((v) => v * 255), a: p.length > 3 ? p[3] : 1 };
    }
    return null;
  };
  const lum = (c) => {
    const [r, g, b] = c.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const sopra = (f, d) => f.c.map((v, i) => v * f.a + d[i] * (1 - f.a));
  // Restituisce i fondi possibili dietro l'elemento. Con un gradiente (senza immagini) conta ogni colore del
  // gradiente composto sul colore di fondo: si tiene il caso peggiore. Con un'immagine restituisce null.
  const fondo = (el) => {
    // strati dall'elemento verso il basso: colori semitrasparenti e gradienti, fino al primo colore pieno
    const strati = [];
    let base = [255, 255, 255];
    for (let e = el; e; e = e.parentElement) {
      // Fondi disegnati con ::after e ::before che coprono l'elemento (le pastiglie della scena)
      let pieno = false;
      for (const ps of ['::after', '::before']) {
        const q = getComputedStyle(e, ps);
        const c = leggi(q.backgroundColor);
        const r = e.getBoundingClientRect();
        const copre = parseFloat(q.width) >= r.width - 2 && parseFloat(q.height) >= r.height - 2;
        if (q.content === 'none' || q.position !== 'absolute' || !copre || Number(q.opacity) < 0.5 || !c || !c.a) continue;
        if (c.a >= 1) {
          base = c.c;
          pieno = true;
          break;
        }
        strati.push({ colore: c });
      }
      if (pieno) break;
      const s = getComputedStyle(e);
      const b = leggi(s.backgroundColor);
      if (s.backgroundImage !== 'none') {
        if (/url\(/.test(s.backgroundImage)) return null;
        strati.push({ fermate: [...s.backgroundImage.matchAll(/(rgba?\([^)]+\)|color\(srgb [^)]+\))/g)].map((m) => leggi(m[1])).filter(Boolean) });
      }
      if (b && b.a >= 1) {
        base = b.c;
        break;
      }
      if (b && b.a > 0) strati.push({ colore: b });
    }
    // Ogni combinazione con un solo colore per gradiente: si compongono dal basso verso l'alto
    let fondi = [base];
    for (const st of strati.slice().reverse()) {
      if (st.colore) fondi = fondi.map((d) => sopra(st.colore, d));
      else fondi = [...fondi, ...fondi.flatMap((d) => st.fermate.map((f) => sopra(f, d)))];
    }
    return fondi;
  };
  const risultati = [];
  let saltati = 0;
  for (const el of document.querySelectorAll('body *')) {
    if (!['P', 'SPAN', 'A', 'LI', 'H1', 'H2', 'H3', 'H4', 'DT', 'DD', 'LABEL', 'LEGEND', 'BUTTON', 'SUMMARY', 'B', 'TIME', 'OUTPUT', 'FIGCAPTION', 'SMALL', 'STRONG', 'EM'].includes(el.tagName)) continue;
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim())) continue;
    if (el.closest('[aria-hidden="true"], .eroe, .avvisi-anteprima, .sr-only, [hidden]')) continue;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (!r.width || !r.height || s.visibility !== 'visible') continue;
    const fondi = fondo(el);
    if (!fondi) {
      saltati++;
      continue;
    }
    const t = leggi(s.color);
    const rapporto = Math.min(
      ...fondi.map((d) => {
        const [a, b] = [lum(sopra(t, d)), lum(d)];
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      }),
    );
    const grande = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && Number(s.fontWeight) >= 700);
    const soglia = grande ? 3 : 4.5;
    risultati.push({ testo: el.textContent.trim().slice(0, 40), rapporto: Math.round(rapporto * 100) / 100, soglia });
  }
  const sotto = risultati.filter((r) => r.rapporto < r.soglia);
  const minimo = risultati.reduce((m, r) => (r.rapporto / r.soglia < m.rapporto / m.soglia ? r : m), risultati[0]);
  return { misurati: risultati.length, saltati, sotto, minimo };
}

// Prima schermata: il testo si nasconde, si fotografa la foto con la velatura e per ogni riga di testo si prende
// il pixel più chiaro dietro di lei (caso peggiore). Il contrasto si calcola con il colore del testo.
async function contrastiEroe(pagina, browser) {
  const caselle = await pagina.evaluate(() => {
    const els = [...document.querySelectorAll('.eroe-interno :is(p, h1, dt, dd, a)')].filter((e) => !e.matches('.btn'));
    // Le righe di testo vere (Range), non il riquadro del blocco: un paragrafo largo quanto la pagina
    // finirebbe per misurare zone della foto dove non c'è testo.
    const out = els.flatMap((e) => {
      const g = document.createRange();
      g.selectNodeContents(e);
      const s = getComputedStyle(e);
      return [...g.getClientRects()]
        .filter((r) => r.width > 2 && r.height > 2)
        .map((r) => ({ testo: e.textContent.trim().slice(0, 30), colore: s.color, x: r.left, y: r.top + scrollY, w: r.width, h: r.height, grande: parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && Number(s.fontWeight) >= 700) }));
    });
    const stile = document.createElement('style');
    stile.id = 'nascondi-testo';
    stile.textContent = '.eroe-interno *, .eroe-scorri { color: transparent !important; border-color: transparent !important; text-decoration-color: transparent !important; } .eroe-scorri { background: none !important; box-shadow: none !important; } .eroe-scorri svg { opacity: 0 }';
    document.head.append(stile);
    return out;
  });
  await pagina.waitForTimeout(100);
  const foto = await pagina.locator('.eroe').screenshot();
  await pagina.evaluate(() => document.getElementById('nascondi-testo').remove());
  const tela = await browser.newPage();
  const misure = await tela.evaluate(
    async ({ b64, caselle, alto }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = new OffscreenCanvas(img.width, img.height);
      const x = c.getContext('2d');
      x.drawImage(img, 0, 0);
      const lum = (r, g, b) => [r, g, b].map((v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
      return caselle.map((k) => {
        const d = x.getImageData(Math.max(0, Math.floor(k.x)), Math.max(0, Math.floor(k.y - alto)), Math.max(1, Math.ceil(k.w)), Math.max(1, Math.ceil(k.h))).data;
        let max = 0;
        for (let i = 0; i < d.length; i += 4) max = Math.max(max, lum(d[i], d[i + 1], d[i + 2]));
        const t = k.colore.match(/[\d.]+/g).map(Number);
        const lt = lum(t[0], t[1], t[2]);
        // testo semitrasparente: caso peggiore sul pixel più chiaro
        const a = t.length > 3 ? t[3] : 1;
        const ltEff = a < 1 ? lum(...t.slice(0, 3).map((v, i) => v * a + 255 * Math.sqrt(max) * (1 - a))) : lt;
        const rapporto = (Math.max(ltEff, max) + 0.05) / (Math.min(ltEff, max) + 0.05);
        return { testo: k.testo, rapporto: Math.round(rapporto * 100) / 100, soglia: k.grande ? 3 : 4.5 };
      });
    },
    { b64: foto.toString('base64'), caselle, alto: await pagina.evaluate(() => document.querySelector('.eroe').getBoundingClientRect().top + scrollY) },
  );
  await tela.close();
  return misure;
}

const browser = await chromium.launch();
for (const ridotto of [false, true]) {
  for (const [w, h] of [
    [1440, 900],
    [1024, 768],
    [390, 844],
  ]) {
    const tag = `${w}${ridotto ? ' ridotto' : ''}`;
    const pagina = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: ridotto ? 'reduce' : 'no-preference' });

    // Le chiamate ai moduli non escono mai dal browser. Il modo cambia nelle prove del calcolatore.
    const chiamate = [];
    let modo = 'blocca';
    await pagina.route(/\/api\/(roi-lead|lead)(\?|$)/, async (r) => {
      chiamate.push({ url: r.request().url(), corpo: r.request().postDataJSON() });
      if (modo === 'ok') {
        await new Promise((f) => setTimeout(f, 700));
        return r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
      }
      if (modo === 'errore') return r.fulfill({ status: 502, contentType: 'application/json', body: '{"ok":false,"error":"prova"}' });
      return r.abort('blockedbyclient');
    });

    const console_ = [];
    pagina.on('console', (m) => {
      // la risposta 502 e l'avviso della prova d'errore del calcolatore sono voluti
      if (modo === 'errore' && /status of 502|Analisi del calcolatore non inviata/.test(m.text())) return;
      console_.push(`${m.type()}: ${m.text()}`);
    });
    pagina.on('pageerror', (e) => console_.push(`errore: ${e.message}`));
    const r = await pagina.goto(url, { waitUntil: 'networkidle' });
    ok(`${tag} risposta 200`, r.status() === 200, String(r.status()));

    // ---- Prima schermata (prima di scorrere) ----
    const eroe = await pagina.evaluate(() => {
      const img = document.querySelector('.eroe-foto img');
      const pre = document.querySelector('link[rel="preload"][as="image"]');
      const r = document.querySelector('.eroe').getBoundingClientRect();
      return {
        h1: document.querySelector('h1').innerText.replace(/\s+/g, ' ').trim(),
        priorita: img.getAttribute('fetchpriority'),
        lazy: img.getAttribute('loading'),
        misure: img.getAttribute('width') && img.getAttribute('height'),
        srcset: document.querySelectorAll('.eroe-foto source[srcset*="960w"][srcset*="1600w"]').length,
        preload: pre?.getAttribute('imagesrcset')?.includes('1600w') && pre.getAttribute('fetchpriority') === 'high',
        numeri: document.querySelectorAll('.eroe-numeri > div').length,
        altezza: Math.round(r.height),
        pila: !document.querySelector('.eroe .lastra'),
      };
    });
    ok(`${tag} prima schermata: foto come elemento LCP (priorità alta, preload, srcset, misure)`, eroe.priorita === 'high' && eroe.lazy !== 'lazy' && eroe.misure && eroe.srcset === 2 && eroe.preload, JSON.stringify(eroe));
    ok(`${tag} prima schermata: titolo, tre numeri, nessuna lastra`, eroe.h1 === 'Il tuo Studio Legale sotto controllo.' && eroe.numeri === 3 && eroe.pila, JSON.stringify(eroe));
    const lcp = await pagina.evaluate(
      () =>
        new Promise((f) => {
          new PerformanceObserver((l) => {
            const e = l.getEntries().at(-1);
            f(e?.element ? `${e.element.tagName}.${e.element.className || e.element.parentElement.className}` : 'nessuno');
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          setTimeout(() => f('scaduto'), 2000);
        }),
    );
    ok(`${tag} prima schermata: l'elemento LCP è la foto`, lcp.startsWith('IMG'), lcp);
    const eroeContrasti = await contrastiEroe(pagina, browser);
    const eroeSotto = eroeContrasti.filter((c) => c.rapporto < c.soglia);
    const eroeMin = eroeContrasti.reduce((m, c) => (c.rapporto < m.rapporto ? c : m), eroeContrasti[0]);
    ok(`${tag} prima schermata: testo sulla foto sopra soglia in ogni punto`, eroeSotto.length === 0, `minimo ${eroeMin.rapporto} (${eroeMin.testo})${eroeSotto.length ? ' sotto: ' + JSON.stringify(eroeSotto) : ''}`);

    // Movimento della foto: solo transform, spento con movimento ridotto
    await pagina.evaluate(() => window.scrollTo(0, 400));
    await pagina.waitForTimeout(200);
    const parallasse = await pagina.evaluate(() => getComputedStyle(document.querySelector('[data-parallasse]')).transform);
    if (ridotto) ok(`${tag} prima schermata: foto ferma con movimento ridotto`, parallasse === 'none', parallasse);
    else ok(`${tag} prima schermata: la foto scende con lo scorrimento (32 px a 400)`, /matrix\(1, 0, 0, 1, 0, 32\)/.test(parallasse), parallasse);

    // ---- Timeline del problema ----
    const luci = () => pagina.evaluate(() => [...document.querySelectorAll('.spreco-ora')].map((l) => Number(getComputedStyle(l).getPropertyValue('--luce')).toFixed(2)));
    await pagina.evaluate(() => {
      const t = document.querySelector('.spreco-ore').getBoundingClientRect().top + scrollY;
      window.scrollTo(0, t - innerHeight + 10);
    });
    await pagina.waitForTimeout(250);
    const prima = await luci();
    await pagina.evaluate(() => {
      const t = document.querySelector('.spreco-ora:last-child').getBoundingClientRect().top + scrollY;
      window.scrollTo(0, t - innerHeight * 0.25);
    });
    await pagina.waitForTimeout(250);
    const dopo = await luci();
    if (ridotto) ok(`${tag} timeline: tutta accesa con movimento ridotto`, [...prima, ...dopo].every((v) => v === '1.00'), `${prima} / ${dopo}`);
    else ok(`${tag} timeline: gli orari si accendono scorrendo`, prima.every((v) => v === '0.00') && dopo.every((v) => v === '1.00'), `${prima} / ${dopo}`);

    // Scorre tutta la pagina per far idratare le isole e partire gli ingressi
    const alto = await pagina.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += h * 0.7) {
      await pagina.evaluate((y) => window.scrollTo(0, y), y);
      await pagina.waitForTimeout(120);
    }
    await pagina.waitForTimeout(1500);

    const largo = await pagina.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(`${tag} nessuno scorrimento orizzontale`, largo <= 0, `${largo}px`);

    const titoli = await pagina.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((t) => Number(t.tagName[1])));
    const salti = titoli.filter((l, i) => i > 0 && l > titoli[i - 1] + 1);
    ok(`${tag} un solo H1 e titoli in ordine`, titoli.filter((l) => l === 1).length === 1 && titoli[0] === 1 && !salti.length, titoli.join(''));

    // Ordine delle sezioni come il piano
    const ordine = await pagina.evaluate(() => [...document.querySelectorAll('main > section, main > div > section')].map((s) => s.id).filter(Boolean).join(' '));
    ok(`${tag} ordine delle sezioni come il piano`, ordine === 'home problema calcolatore come-funziona sistemi studio ai compliance risultati contatti chi-siamo', ordine);

    // Menu come il piano, ancore esistenti
    const menu = await pagina.evaluate(() => [...document.querySelectorAll('[data-menu] nav a')].map((a) => a.textContent.trim()).join(' · '));
    ok(`${tag} voci del menu come il piano`, menu === 'Il Problema · Calcola il Tuo Costo · Come Funziona · Risultati Reali · FAQ · Chi Siamo', menu);
    const voci = await pagina.evaluate(() => [...document.querySelectorAll('header nav a')].map((a) => a.getAttribute('href')));
    const uniche = [...new Set(voci), '#contatti'];
    for (const href of uniche) {
      const esiste = await pagina.evaluate((h) => Boolean(document.querySelector(h)), href);
      ok(`${tag} ancora ${href} esiste`, esiste);
    }
    const vecchie = await pagina.evaluate(() => ['#roi', '#metodo', '#founder'].every((h) => document.querySelector(h)));
    ok(`${tag} le ancore del sito attuale (#roi, #metodo, #founder) esistono`, vecchie);
    if (!ridotto) {
      for (const href of uniche) {
        await pagina.evaluate(() => window.scrollTo(0, 0));
        if (w < 1280 && href !== '#contatti') {
          await pagina.locator('[data-menu] summary').click();
          await pagina.locator(`[data-menu] nav a[href="${href}"]`).click();
        } else {
          await pagina.locator(`header a[href="${href}"]`).first().click();
        }
        await pagina.waitForTimeout(href === '#contatti' ? 2600 : 2200);
        const pos = await pagina.evaluate((h) => {
          const barra = document.querySelector('[data-barra]').getBoundingClientRect().bottom;
          const t = document.querySelector(h).getBoundingClientRect().top;
          return { barra, t, hash: location.hash };
        }, href);
        ok(`${tag} clic su ${href}`, pos.hash === href && pos.t >= pos.barra - 2 && pos.t < pos.barra + 60, `top ${Math.round(pos.t)}, barra ${Math.round(pos.barra)}`);
        const pulsante = await pagina.locator('header a[href="#contatti"]').isVisible();
        ok(`${tag} pulsante della diagnosi visibile dopo ${href}`, pulsante);
      }
    }

    // Menu mobile (sotto i 1280 px): si apre, Esc lo chiude e il fuoco torna sul pulsante
    if (w < 1280) {
      await pagina.evaluate(() => window.scrollTo(0, 0));
      await pagina.locator('[data-menu] summary').focus();
      await pagina.keyboard.press('Enter');
      const aperto = await pagina.evaluate(() => document.querySelector('[data-menu]').open);
      await pagina.keyboard.press('Tab');
      await pagina.keyboard.press('Escape');
      const stato = await pagina.evaluate(() => ({
        aperto: document.querySelector('[data-menu]').open,
        fuoco: document.activeElement === document.querySelector('[data-menu] summary'),
      }));
      ok(`${tag} menu mobile: Invio apre, Esc chiude e riporta il fuoco`, aperto && !stato.aperto && stato.fuoco, JSON.stringify({ aperto, ...stato }));
    }

    // Tre pulsanti "Prenota la Diagnosi Operativa": dopo i sistemi, dopo Risultati reali, in Chi siamo
    const prenota = await pagina.evaluate(() =>
      ['.sistemi', '.risultati', '.chi'].map((s) => [...document.querySelectorAll(`${s} a[href="#contatti"]`)].filter((a) => a.textContent.trim() === 'Prenota la Diagnosi Operativa').length),
    );
    ok(`${tag} pulsante "Prenota la Diagnosi Operativa" dopo i sistemi, in Risultati e in Chi siamo`, prenota.every((n) => n === 1), prenota.join(','));

    // Proporzioni: nei blocchi affiancati la grafica sta entro metà larghezza
    const proporzioni = await pagina.evaluate(() =>
      [...document.querySelectorAll('.sistema')].map((s) => {
        const c = s.closest('.contenitore').getBoundingClientRect().width;
        return Math.round((s.querySelector('.sistema-scena').getBoundingClientRect().width / c) * 100);
      }),
    );
    if (w >= 1024) ok(`${tag} tre sistemi: scena entro metà larghezza`, proporzioni.every((p) => p <= 50), proporzioni.join('%, ') + '%');

    // FAQ da tastiera
    const primaFaq = pagina.locator('.faq-voce summary').first();
    await primaFaq.focus();
    await pagina.keyboard.press('Enter');
    const faqAperta = await pagina.evaluate(() => document.querySelector('.faq-voce').open);
    await pagina.keyboard.press('Enter');
    const faqChiusa = await pagina.evaluate(() => !document.querySelector('.faq-voce').open);
    ok(`${tag} FAQ apre e chiude da tastiera`, faqAperta && faqChiusa);
    const faq = await pagina.evaluate(() => ({ n: document.querySelectorAll('.faq-voce').length, sotto: document.querySelector('.faq-sottotitolo')?.textContent }));
    ok(`${tag} FAQ: cinque domande con sottotitolo`, faq.n === 5 && faq.sotto?.startsWith('Le domande reali'), JSON.stringify(faq));

    // Isola AI: la proposta si conferma da tastiera
    const conferma = pagina.locator('.al-si');
    if (await conferma.count()) {
      await conferma.focus();
      await pagina.keyboard.press('Enter');
      await pagina.waitForTimeout(500);
      ok(`${tag} AI: Conferma da tastiera`, await pagina.locator('.al-confermata').isVisible());
    } else ok(`${tag} AI: Conferma da tastiera`, false, 'pulsante non trovato');

    // Tutto lo studio: la pipeline nel blocco Pratiche, scorrimento orizzontale sotto i 768 px
    const studio = await pagina.evaluate(() => {
      const l = document.querySelector('.studio-griglia');
      return {
        pipeline: Boolean(document.querySelector('#studio-pratiche .bn-pipeline')),
        mini: !document.querySelector('#studio-pratiche .mini-pipeline'),
        scorre: ['auto', 'scroll'].includes(getComputedStyle(l).overflowX) && l.scrollWidth > l.clientWidth + 1,
        punti: [...document.querySelectorAll('.studio-punto')].filter((a) => a.offsetParent).length,
      };
    });
    ok(`${tag} studio: la pipeline sostituisce la mini pipeline`, studio.pipeline && studio.mini, JSON.stringify(studio));
    if (w < 768) ok(`${tag} studio: scorrimento orizzontale con sei punti`, studio.scorre && studio.punti === 6, JSON.stringify(studio));
    else ok(`${tag} studio: griglia senza scorrimento e senza punti`, !studio.scorre && studio.punti === 0, JSON.stringify(studio));

    // Scene dei sistemi: a fine ingresso sono compiute (con movimento ridotto subito)
    const scene = await pagina.evaluate(() => ({
      cartella: getComputedStyle(document.querySelector('.bp-cartella')).transform,
      lastra: document.querySelector('.bn-cartella').dataset.stato,
    }));
    ok(`${tag} sistemi: la cartella è arrivata da Paolo e la lastra di Ordine Operativo è attiva`, scene.cartella === 'none' && scene.lastra === 'attiva', JSON.stringify(scene));

    // Ritratti: stessa cornice e stessa misura, 4:5, caricati
    const ritratti = await pagina.evaluate(() =>
      [...document.querySelectorAll('.ritratto img, .voce-ritratto img')].map((i) => {
        const r = i.getBoundingClientRect();
        return { dove: i.closest('.voce') ? 'citazione' : 'chi', w: Math.round(r.width), h: Math.round(r.height), caricata: i.complete && i.naturalWidth > 0, attr: Boolean(i.getAttribute('width') && i.getAttribute('height')), alt: Boolean(i.alt) };
      }),
    );
    const chi = ritratti.filter((r) => r.dove === 'chi');
    const atteso = w >= 560 ? [240, 300] : [104, 130];
    ok(`${tag} chi siamo: due ritratti nella stessa cornice ${atteso.join(' x ')}`, chi.length === 2 && chi.every((r) => r.w === atteso[0] && r.h === atteso[1] && r.caricata && r.attr && r.alt), JSON.stringify(chi));
    const cit = ritratti.find((r) => r.dove === 'citazione');
    ok(`${tag} risultati: ritratto di Cocola accanto alla citazione, 120 x 150`, cit && cit.w === 120 && cit.h === 150 && cit.caricata, JSON.stringify(cit));
    const testiChi = await pagina.evaluate(() => ({
      ruolo: document.querySelector('.persona-fondatore .persona-ruolo').textContent,
      citazione: document.querySelector('.voce-citazione').textContent,
      email: document.querySelector('.caso-numeri').textContent.includes('600+'),
      piede: document.querySelector('footer').textContent.includes('Federico Garau, Fondatore e amministratore'),
    }));
    ok(`${tag} ruolo, citazione, 600+ e piè di pagina`, testiChi.ruolo === 'Fondatore e amministratore' && testiChi.citazione.includes('Il valore non è stato aggiungere') && testiChi.email && testiChi.piede, JSON.stringify(testiChi));

    // ---- Calcolatore ----
    const leggiCalc = () =>
      pagina.evaluate(() => {
        const t = (s) => document.querySelector(`[data-esito="${s}"]`).textContent.replace(/[  ]/g, ' ').trim();
        return { annuale: t('annuale'), oreMese: t('oreMese'), mensile: t('mensile'), oreGiorno: t('oreGiorno'), formula: t('formula'), analisi: !document.querySelector('[data-analisi]').hidden };
      });
    await pagina.locator('#calcolatore').scrollIntoViewIfNeeded();
    const iniziale = await leggiCalc();
    ok(`${tag} calcolatore: valori iniziali come main (495.000 €, 330h, 49.500 €), analisi nascosta`, iniziale.annuale === '495.000 €' && iniziale.oreMese === '330h' && iniziale.mensile === '49.500 €' && !iniziale.analisi, JSON.stringify(iniziale));
    const sistemi = await pagina.evaluate(() =>
      [...document.querySelectorAll('.cs-voce')].map((v) => {
        const i = v.querySelector('input');
        return { nome: v.querySelector('.cs-nome').textContent.trim(), quota: v.querySelector('.cs-quota').textContent, dataQuota: i.dataset.quota, invio: i.dataset.invio };
      }),
    );
    const coerenti = sistemi.every((s) => s.invio === s.nome.toUpperCase() && s.quota.includes(`${Math.round(Number(s.dataQuota) * 100)}%`));
    const quote = Object.fromEntries(sistemi.map((s) => [s.nome, Number(s.dataQuota)]));
    ok(`${tag} calcolatore: nome, percentuale e dato inviato coerenti (75%, 8%, 10%)`, coerenti && quote['Ordine Operativo'] === 0.75 && quote['Visibilità Economica'] === 0.08 && quote['Governance Operativa'] === 0.1, JSON.stringify(sistemi));

    await pagina.locator('#calc-tariffa-numero').fill('150');
    for (const n of ['Visibilità Economica', 'Governance Operativa']) await pagina.locator('.cs-voce', { hasText: n }).locator('input').check();
    const tutti = await leggiCalc();
    ok(`${tag} calcolatore: con i tre sistemi 93% (613.800 €, 409h, 61.380 €) e analisi visibile`, tutti.annuale === '613.800 €' && tutti.oreMese === '409h' && tutti.mensile === '61.380 €' && tutti.formula.includes('93%') && tutti.analisi, JSON.stringify(tutti));
    for (const n of ['Ordine Operativo', 'Visibilità Economica']) await pagina.locator('.cs-voce', { hasText: n }).locator('input').uncheck();
    const governance = await leggiCalc();
    ok(`${tag} calcolatore: Governance da sola usa il 10% (66.000 €)`, governance.annuale === '66.000 €', JSON.stringify(governance));
    await pagina.locator('.cs-voce', { hasText: 'Governance Operativa' }).locator('input').uncheck();
    const nessuno = await leggiCalc();
    ok(`${tag} calcolatore: nessun sistema, 0 € e invito a sceglierne uno`, nessuno.annuale === '0 €' && nessuno.oreGiorno === 'Seleziona almeno un modulo' && !nessuno.analisi, JSON.stringify(nessuno));
    for (const n of ['Ordine Operativo', 'Visibilità Economica', 'Governance Operativa']) await pagina.locator('.cs-voce', { hasText: n }).locator('input').check();

    // Invio: email non valida, errore con i dati ancora nel campo, riuscito con doppio clic bloccato
    const email = pagina.locator('#ca-email');
    const invia = pagina.locator('[data-analisi-form] button[type="submit"]');
    const errore = pagina.locator('#ca-errore');
    await email.fill('nonvalida');
    await invia.click();
    ok(`${tag} calcolatore: email non valida, errore visibile e nessuna chiamata`, (await errore.isVisible()) && chiamate.length === 0, spazi(await errore.textContent()));

    modo = 'errore';
    await email.fill('prova@esempio.it');
    await invia.click();
    await pagina.waitForTimeout(400);
    const dopoErrore = { testo: spazi(await errore.textContent()), visibile: await errore.isVisible(), email: await email.inputValue(), abilitato: await invia.isEnabled() };
    ok(`${tag} calcolatore: errore visibile, email ancora nel campo, si può riprovare`, dopoErrore.visibile && dopoErrore.testo === 'Invio non riuscito. Riprova tra pochi minuti.' && dopoErrore.email === 'prova@esempio.it' && dopoErrore.abilitato && chiamate.length === 1, JSON.stringify(dopoErrore));

    modo = 'ok';
    chiamate.length = 0;
    await invia.dblclick();
    await invia.click({ force: true }).catch(() => {});
    await pagina.waitForTimeout(1200);
    const fatto = await pagina.locator('[data-analisi-fatto]').isVisible();
    ok(`${tag} calcolatore: doppio clic bloccato, una sola chiamata, esito visibile`, chiamate.length === 1 && fatto, `${chiamate.length} chiamate, esito ${fatto}`);
    const p = chiamate[0]?.corpo ?? {};
    const chiavi = 'email,ore_giorno,tariffa_oraria,numero_avvocati,modulo_simulato,valore_annuale_calcolato,ore_mese_recuperate,risparmio_mensile,source,timestamp';
    const payloadOk =
      Object.keys(p).join(',') === chiavi &&
      p.email === 'prova@esempio.it' &&
      p.ore_giorno === '2' &&
      p.tariffa_oraria === '150' &&
      p.numero_avvocati === '10' &&
      p.modulo_simulato === 'ORDINE OPERATIVO, VISIBILITÀ ECONOMICA, GOVERNANCE OPERATIVA' &&
      spazi(p.valore_annuale_calcolato) === '613.800 €' &&
      p.ore_mese_recuperate === '409h' &&
      spazi(p.risparmio_mensile) === '61.380 €' &&
      p.source === 'calcolatore_roi' &&
      !Number.isNaN(Date.parse(p.timestamp));
    ok(`${tag} calcolatore: payload con gli stessi campi e lo stesso formato di main`, payloadOk, JSON.stringify(p));
    ok(`${tag} calcolatore: chiamata solo a /api/roi-lead`, chiamate.every((c) => new URL(c.url).pathname === '/api/roi-lead'));

    // ---- Contrasti ----
    const contrasti = await pagina.evaluate(misuraContrasti);
    ok(`${tag} contrasti sopra soglia (${contrasti.misurati} testi misurati)`, contrasti.sotto.length === 0, `minimo ${contrasti.minimo.rapporto} su ${contrasti.minimo.soglia} (${contrasti.minimo.testo}), su immagine (non misurati qui) ${contrasti.saltati}${contrasti.sotto.length ? ' sotto: ' + JSON.stringify(contrasti.sotto.slice(0, 6)) : ''}`);

    ok(`${tag} console pulita`, console_.length === 0, console_.join(' | '));

    if (w === 1440 && !ridotto) {
      const html = await pagina.content();
      const testi = verificaTesti(html);
      ok('testi vietati: nessuno (eccezioni esatte: "Posta in arrivo", "€66.000 /anno")', testi.length === 0, testi.map((t) => `${t.regola}: ${t.contesto}`).join(' | '));
      const uguali = confrontaUguali(await leggiPagina(pagina));
      ok(`testi [=] uguali a main (${uguali.frasi} frasi del piano, ${uguali.elementi} elementi)`, uguali.differenze.length === 0, uguali.differenze.join(' | '));
      ok(`testi [=] del form della diagnosi attesi in sessione 2 (${uguali.attese.length})`, true, uguali.attese.map((a) => a.split(': ').at(-1)).join(' '));
      const avvisi = await pagina.locator('.avvisi-anteprima li').allTextContents();
      ok('avvisi di anteprima: solo i tre numeri SCLN da confermare', avvisi.length === 3 && avvisi.every((a) => a.startsWith('Caso SCLN')), avvisi.join(' | '));
    }
    await pagina.close();
  }
}
await browser.close();

const falliti = esiti.filter((e) => !e.vero);
for (const e of esiti) console.log(`${e.vero ? 'OK  ' : 'NO  '} ${e.nome}${e.dettaglio ? `  (${e.dettaglio})` : ''}`);
console.log(`\n${esiti.length - falliti.length}/${esiti.length} prove superate`);
process.exit(falliti.length ? 1 : 0);
