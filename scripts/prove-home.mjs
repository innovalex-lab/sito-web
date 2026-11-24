// Prove della home con Playwright, sulla build servita in locale.
// uso: node scripts/prove-home.mjs http://localhost:4402/
// Controlla a 1440, 1024 e 390 px, con e senza movimento ridotto: risposta 200, console pulita,
// nessuno scorrimento orizzontale, un solo H1 e titoli in ordine, ancore del menu, intestazione fissa
// con il pulsante sempre visibile, menu mobile con Esc, FAQ da tastiera, testi verificati.
import { chromium } from 'playwright';
import { verificaTesti } from './verifica-testi.mjs';

const url = process.argv[2] ?? 'http://localhost:4402/';
const esiti = [];
const ok = (nome, vero, dettaglio = '') => esiti.push({ nome, vero: Boolean(vero), dettaglio });

const browser = await chromium.launch();
for (const ridotto of [false, true]) {
  for (const [w, h] of [
    [1440, 900],
    [1024, 768],
    [390, 844],
  ]) {
    const tag = `${w}${ridotto ? ' ridotto' : ''}`;
    const pagina = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: ridotto ? 'reduce' : 'no-preference' });
    const console_ = [];
    pagina.on('console', (m) => console_.push(`${m.type()}: ${m.text()}`));
    pagina.on('pageerror', (e) => console_.push(`errore: ${e.message}`));
    const r = await pagina.goto(url, { waitUntil: 'networkidle' });
    ok(`${tag} risposta 200`, r.status() === 200, String(r.status()));

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

    // Ancore del menu (desktop) o del menu mobile
    const voci = await pagina.evaluate(() => [...document.querySelectorAll('header nav a')].map((a) => a.getAttribute('href')));
    const uniche = [...new Set(voci), '#contatti'];
    for (const href of uniche) {
      const esiste = await pagina.evaluate((h) => Boolean(document.querySelector(h)), href);
      ok(`${tag} ancora ${href} esiste`, esiste);
    }
    if (!ridotto) {
      for (const href of uniche) {
        await pagina.evaluate(() => window.scrollTo(0, 0));
        if (w < 1024 && href !== '#contatti') {
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
        // il bersaglio arriva subito sotto la barra fissa (scroll-padding), non coperto
        ok(`${tag} clic su ${href}`, pos.hash === href && pos.t >= pos.barra - 2 && pos.t < pos.barra + 60, `top ${Math.round(pos.t)}, barra ${Math.round(pos.barra)}`);
        const pulsante = await pagina.locator('header a[href="#contatti"]').isVisible();
        ok(`${tag} pulsante della diagnosi visibile dopo ${href}`, pulsante);
      }
    }

    // Menu mobile: si apre, Esc lo chiude e il fuoco torna sul pulsante
    if (w < 1024) {
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

    // FAQ da tastiera
    const prima = pagina.locator('.faq-voce summary').first();
    await prima.focus();
    await pagina.keyboard.press('Enter');
    const faqAperta = await pagina.evaluate(() => document.querySelector('.faq-voce').open);
    await pagina.keyboard.press('Enter');
    const faqChiusa = await pagina.evaluate(() => !document.querySelector('.faq-voce').open);
    ok(`${tag} FAQ apre e chiude da tastiera`, faqAperta && faqChiusa);

    // Isola AI: la proposta si conferma da tastiera
    const conferma = pagina.locator('.al-si');
    if (await conferma.count()) {
      await conferma.focus();
      await pagina.keyboard.press('Enter');
      await pagina.waitForTimeout(500);
      ok(`${tag} AI: Conferma da tastiera`, await pagina.locator('.al-confermata').isVisible());
    } else ok(`${tag} AI: Conferma da tastiera`, false, 'pulsante non trovato');

    ok(`${tag} console pulita`, console_.length === 0, console_.join(' | '));

    if (w === 1440 && !ridotto) {
      const html = await pagina.content();
      const testi = verificaTesti(html);
      ok('test dei testi eseguito (solo avvisi noti in anteprima)', testi.every((t) => t.contesto.includes('Posta in arrivo')), testi.map((t) => t.regola).join(', '));
      const avvisi = await pagina.locator('.avvisi-anteprima li').count();
      ok('avvisi di stato visibili in anteprima', avvisi > 0, `${avvisi} avvisi`);
    }
    await pagina.close();
  }
}
await browser.close();

const falliti = esiti.filter((e) => !e.vero);
for (const e of esiti) console.log(`${e.vero ? 'OK  ' : 'NO  '} ${e.nome}${e.dettaglio ? `  (${e.dettaglio})` : ''}`);
console.log(`\n${esiti.length - falliti.length}/${esiti.length} prove superate`);
process.exit(falliti.length ? 1 : 0);
