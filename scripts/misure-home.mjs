// Misure della home: stesso script per la build nuova e per il sito attuale (main) serviti in locale.
// uso: node scripts/misure-home.mjs <url> [etichetta]
//   JavaScript compresso (gzip) di tutti gli script caricati scorrendo la pagina intera;
//   LCP mobile nelle condizioni della linea di base del 23/11 (390 px, densità 3, 1,6 Mbps, 150 ms,
//   CPU 4x, cache spenta, mediana di 3) e LCP desktop a 1440;
//   CLS con lo scorrimento completo a 1440 e 390;
//   fotogrammi oltre 20 ms durante lo scorrimento, CPU 4x, rendering GPU (Metal);
//   lunghezza della pagina a 1440, 1024 e 390, senza il riquadro degli avvisi di anteprima.
import { chromium } from 'playwright';
import { gzipSync } from 'node:zlib';

const url = process.argv[2] ?? 'http://localhost:4329/';
const etichetta = process.argv[3] ?? url;
const gpu = ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'];
const browser = await chromium.launch({ args: gpu });
const misure = { etichetta };
const mediana = (v) => v.slice().sort((a, b) => a - b)[Math.floor(v.length / 2)];

async function scorriTutto(pagina, passo = 500, attesa = 60) {
  const alto = await pagina.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= alto; y += passo) {
    await pagina.evaluate((y) => window.scrollTo(0, y), y);
    await pagina.waitForTimeout(attesa);
  }
}

// JavaScript
{
  const pagina = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const corpi = [];
  pagina.on('response', async (r) => {
    if (r.request().resourceType() === 'script' && r.ok()) corpi.push(r.body().then((b) => ({ url: r.url(), gz: gzipSync(b).length })).catch(() => null));
  });
  await pagina.goto(url, { waitUntil: 'networkidle' });
  await scorriTutto(pagina);
  await pagina.waitForTimeout(1500);
  const file = (await Promise.all(corpi)).filter(Boolean);
  const inLinea = await pagina.evaluate(() => [...document.querySelectorAll('script:not([src])')].map((s) => s.textContent).join(''));
  misure.js = { file: file.length, kbGzip: +(file.reduce((s, f) => s + f.gz, 0) / 1024).toFixed(1), inLineaKbGzip: +(gzipSync(inLinea).length / 1024).toFixed(1) };
  await pagina.close();
}

// LCP: contesto nuovo a ogni giro, cache spenta, rete e CPU limitate con CDP
async function lcp({ w, h, dpr, mobile, limita }) {
  const contesto = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile });
  const pagina = await contesto.newPage();
  const cdp = await contesto.newCDPSession(pagina);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  if (limita) {
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  await pagina.goto(url, { waitUntil: 'load', timeout: 120000 });
  await pagina.waitForTimeout(1500);
  const e = await pagina.evaluate(
    () =>
      new Promise((f) => {
        new PerformanceObserver((l) => {
          const x = l.getEntries().at(-1);
          f({ t: x.startTime, el: x.element ? `${x.element.tagName.toLowerCase()}${x.element.className ? '.' + String(x.element.className).split(' ')[0] : ''}` : '' });
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      }),
  );
  await contesto.close();
  return e;
}
{
  const giri = [];
  for (let i = 0; i < 3; i++) giri.push(await lcp({ w: 390, h: 844, dpr: 3, mobile: true, limita: true }));
  misure.lcpMobile = { mediana: +(mediana(giri.map((g) => g.t)) / 1000).toFixed(2), giri: giri.map((g) => +(g.t / 1000).toFixed(2)), elemento: giri[0].el };
  const d = await lcp({ w: 1440, h: 900, dpr: 1, mobile: false, limita: false });
  misure.lcpDesktop = { s: +(d.t / 1000).toFixed(2), elemento: d.el };
}

// CLS e fotogrammi
for (const [w, h] of [
  [1440, 900],
  [390, 844],
]) {
  const contesto = await browser.newContext({ viewport: { width: w, height: h } });
  const pagina = await contesto.newPage();
  await pagina.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await pagina.goto(url, { waitUntil: 'networkidle' });
  await scorriTutto(pagina, 400, 80);
  await pagina.waitForTimeout(800);
  misure[`cls${w}`] = +(await pagina.evaluate(() => window.__cls)).toFixed(4);

  // Fotogrammi: dall'alto al fondo con la rotella, CPU 4x
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.waitForTimeout(500);
  const cdp = await contesto.newCDPSession(pagina);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await pagina.mouse.move(w / 2, h / 2);
  await pagina.evaluate(() => {
    window.__fotogrammi = [];
    let prima = performance.now();
    const giro = (t) => {
      window.__fotogrammi.push(t - prima);
      prima = t;
      if (!window.__fine) requestAnimationFrame(giro);
    };
    requestAnimationFrame(giro);
  });
  const alto = await pagina.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 120) {
    await pagina.mouse.wheel(0, 120);
    await pagina.waitForTimeout(16);
  }
  const f = await pagina.evaluate(() => {
    window.__fine = true;
    return window.__fotogrammi.slice(2);
  });
  const ordinati = f.slice().sort((a, b) => a - b);
  misure[`fotogrammi${w}`] = { totale: f.length, oltre20ms: f.filter((x) => x > 20).length, p95: +ordinati[Math.floor(ordinati.length * 0.95)].toFixed(1) };
  await contesto.close();
}

// Lunghezza della pagina
misure.lunghezza = {};
for (const [w, h] of [
  [1440, 900],
  [1024, 768],
  [390, 844],
]) {
  const pagina = await browser.newPage({ viewport: { width: w, height: h } });
  await pagina.goto(url, { waitUntil: 'networkidle' });
  await scorriTutto(pagina, 600, 40);
  await pagina.waitForTimeout(500);
  misure.lunghezza[w] = await pagina.evaluate(() => document.documentElement.scrollHeight - (document.querySelector('.avvisi-anteprima')?.offsetHeight ?? 0));
  await pagina.close();
}

await browser.close();
console.log(JSON.stringify(misure, null, 2));
