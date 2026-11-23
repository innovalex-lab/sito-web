const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'assets');
const baseUrl = 'http://sito.test/';
const contentTypes = {
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif'
};
const expectedKeys = [
  'name', 'studio', 'email', 'phone', 'role', 'teamSize', 'dailyEmailVolume', 'currentTools',
  'urgentProblem', 'hoursPerDay', 'lawyers', 'hourlyRate', 'selectedFeatures',
  'estimatedAnnualValue', 'estimatedMonthlyHours', 'sourceCta', 'timestamp'
];
const okBody = JSON.stringify({ ok: true, taskId: 'task-prova' });

// Le pagine sono servite dalla route: nessuna richiesta esce verso la rete o verso le API vere.
const openPage = async (browser, viewport, leadHandler) => {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const calls = [];
  const problems = [];
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`);
  });
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.host !== 'sito.test') return route.fulfill({ status: 200, contentType: 'text/css', body: '' });
    if (url.pathname === '/') {
      return route.fulfill({ contentType: 'text/html', body: fs.readFileSync(path.join(root, 'index.html')) });
    }
    if (url.pathname === '/api/lead') {
      calls.push(route.request().postDataJSON());
      return leadHandler(route);
    }
    const file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file.startsWith(assetsDir + path.sep) && fs.existsSync(file)) {
      return route.fulfill({
        contentType: contentTypes[path.extname(file)] || 'application/octet-stream',
        body: fs.readFileSync(file)
      });
    }
    return route.fulfill({ status: 404, body: '' });
  });
  await page.goto(baseUrl, { waitUntil: 'load' });
  return { context, page, calls, problems };
};

const fillForm = async (page) => {
  await page.locator('#lead-form').scrollIntoViewIfNeeded();
  await page.fill('#name', 'Prova Nome');
  await page.fill('#studio', 'Studio Prova');
  await page.fill('#email', 'prova@example.com');
  await page.fill('#phone', '3330000000');
  await page.selectOption('#role', { index: 1 });
  await page.selectOption('#teamSize', { index: 1 });
  await page.click('#urgentProblemToggle');
  await page.locator('input[name="urgentProblem"]').first().check({ force: true });
  await page.click('#site-header', { position: { x: 1, y: 1 } }).catch(() => {});
  await page.fill('#dailyEmailVolume', '10');
  await page.fill('#currentTools', 'Outlook');
};

const submit = (page) => page.locator('#lead-form button[type="submit"]').click();
const jsonRoute = (status, body) => (route) => route.fulfill({ status, contentType: 'application/json', body });

const browserChecks = async (browser) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const { context, page, calls, problems } = await openPage(browser, viewport, jsonRoute(200, okBody));
    await fillForm(page);
    await submit(page);
    await page.locator('#thank-you-modal').waitFor({ state: 'visible' });
    assert.strictEqual(calls.length, 1, 'una sola chiamata');
    assert.deepStrictEqual(Object.keys(calls[0]).sort(), [...expectedKeys].sort(), 'campi del corpo');
    assert.strictEqual(calls[0].name, 'Prova Nome');
    assert.strictEqual(calls[0].studio, 'Studio Prova');
    assert.strictEqual(calls[0].email, 'prova@example.com');
    assert.ok(calls[0].urgentProblem, 'priorità presente');
    assert.strictEqual(await page.locator('#form-success').textContent(), 'Richiesta inviata correttamente.');
    assert.deepStrictEqual(problems, [], `console pulita a ${viewport.width} px`);
    await context.close();
  }

  const failures = [
    ['risposta 500', jsonRoute(500, JSON.stringify({ ok: false, error: 'errore simulato' }))],
    ['risposta 200 con ok false', jsonRoute(200, JSON.stringify({ ok: false }))],
    ['risposta non JSON', (route) => route.fulfill({ status: 502, contentType: 'text/html', body: 'errore' })],
    ['rete assente', (route) => route.abort('failed')]
  ];
  for (const [label, handler] of failures) {
    const { context, page } = await openPage(browser, { width: 1440, height: 900 }, handler);
    await fillForm(page);
    await submit(page);
    await page.locator('#form-error').waitFor({ state: 'visible' });
    assert.match(await page.locator('#form-error').textContent(), /federico\.garau@innovalexai\.it/, label);
    assert.strictEqual(await page.inputValue('#name'), 'Prova Nome', `${label}: dati nel form`);
    assert.strictEqual(await page.inputValue('#email'), 'prova@example.com', `${label}: dati nel form`);
    assert.ok(await page.locator('input[name="urgentProblem"]').first().isChecked(), `${label}: priorità nel form`);
    assert.strictEqual(await page.locator('#thank-you-modal').isVisible(), false, `${label}: nessun falso successo`);
    assert.strictEqual(await page.locator('#form-success').isVisible(), false, `${label}: nessun falso successo`);
    assert.strictEqual(await page.locator('#lead-form button[type="submit"]').isDisabled(), false, `${label}: si può riprovare`);
    await context.close();
  }

  let release;
  const held = new Promise((resolve) => { release = resolve; });
  const slow = await openPage(browser, { width: 1440, height: 900 }, async (route) => {
    await held;
    await route.fulfill({ status: 200, contentType: 'application/json', body: okBody });
  });
  await fillForm(slow.page);
  await slow.page.locator('#lead-form button[type="submit"]').dblclick();
  await slow.page.evaluate(() => {
    const leadForm = document.getElementById('lead-form');
    leadForm.requestSubmit();
    leadForm.requestSubmit();
  });
  await slow.page.waitForTimeout(250);
  assert.strictEqual(await slow.page.locator('#lead-form button[type="submit"]').isDisabled(), true, 'pulsante disattivato durante l\'invio');
  release();
  await slow.page.locator('#thank-you-modal').waitFor({ state: 'visible' });
  assert.strictEqual(slow.calls.length, 1, 'doppio clic: una sola chiamata');
  await slow.context.close();
};

const callApi = async (fetchStub, env = {}, body = { name: 'Nome', studio: 'Studio', email: 'a@example.com', phone: '333' }) => {
  const names = ['CLICKUP_TOKEN', 'CLICKUP_LIST_ID', 'CLICKUP_STATUS', 'RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'ROI_LEAD_NOTIFY_EMAIL'];
  const savedEnv = Object.fromEntries(names.map((key) => [key, process.env[key]]));
  const savedFetch = global.fetch;
  const savedError = console.error;
  const logged = [];
  names.forEach((key) => delete process.env[key]);
  Object.assign(process.env, { CLICKUP_TOKEN: 'finto', CLICKUP_LIST_ID: 'lista', RESEND_API_KEY: 'finta' }, env);
  Object.keys(env).filter((key) => env[key] === undefined).forEach((key) => delete process.env[key]);
  const requests = [];
  global.fetch = async (url, options) => {
    const request = { url: String(url), body: JSON.parse(options.body) };
    requests.push(request);
    return fetchStub(request);
  };
  console.error = (...args) => logged.push(args);
  const result = {};
  const res = {
    status(code) { result.status = code; return this; },
    json(payload) { result.body = payload; return this; }
  };
  try {
    await require('../api/lead.js')({ method: 'POST', body }, res);
  } finally {
    global.fetch = savedFetch;
    console.error = savedError;
    names.forEach((key) => {
      if (savedEnv[key] === undefined) delete process.env[key];
      else process.env[key] = savedEnv[key];
    });
  }
  return { ...result, requests, logged, mails: requests.filter((r) => r.url.includes('resend')) };
};

const reply = (status, body) => new Response(JSON.stringify(body), { status });
const isMail = (request) => request.url.includes('resend');

const apiChecks = async () => {
  let r = await callApi((q) => (isMail(q) ? reply(200, { id: 'm' }) : reply(200, { id: 'task-1' })));
  assert.strictEqual(r.status, 200);
  assert.deepStrictEqual([r.body.ok, r.body.taskId, r.body.notified], [true, 'task-1', true]);
  assert.strictEqual(r.mails.length, 1);
  assert.ok(r.mails[0].body.subject.startsWith('[Diagnosi] '));
  assert.deepStrictEqual(r.mails[0].body.to, ['federico.garau@innovalexai.it']);
  assert.match(r.mails[0].body.text, /Email: a@example\.com/);
  assert.doesNotMatch(r.requests[0].body.description, /Fatturato/);

  r = await callApi((q) => (isMail(q) ? reply(200, { id: 'm' }) : reply(500, { err: 'giu' })), { CLICKUP_STATUS: 'stato' });
  assert.strictEqual(r.status, 200);
  assert.deepStrictEqual(r.body, { ok: true, fallback: 'email' });
  assert.ok(r.mails[0].body.subject.startsWith('[Diagnosi Fallback] '));
  assert.match(r.mails[0].body.text, /Errore ClickUp: .*giu/);

  r = await callApi((q) => { if (isMail(q)) return reply(200, { id: 'm' }); throw new Error('rete giu'); });
  assert.deepStrictEqual(r.body, { ok: true, fallback: 'email' });

  r = await callApi((q) => reply(200, { id: 'm' }), { CLICKUP_TOKEN: undefined });
  assert.deepStrictEqual(r.body, { ok: true, fallback: 'email' });
  assert.strictEqual(r.requests.length, 1);

  r = await callApi(() => reply(500, { err: 'giu' }));
  assert.strictEqual(r.status, 500);
  assert.strictEqual(r.body.ok, false);
  assert.ok(r.logged.length > 0, 'errore nei log');

  r = await callApi((q) => { if (isMail(q)) throw new Error('mail giu'); return reply(500, { err: 'giu' }); });
  assert.strictEqual(r.status, 500);
  assert.strictEqual(r.body.ok, false);

  r = await callApi((q) => { if (isMail(q)) throw new Error('mail giu'); return reply(200, { id: 'task-2' }); });
  assert.strictEqual(r.status, 200);
  assert.deepStrictEqual([r.body.ok, r.body.taskId, r.body.notified], [true, 'task-2', false]);

  r = await callApi(() => { throw new Error('non deve chiamare'); }, {}, { name: 'Solo nome' });
  assert.strictEqual(r.status, 400);
  assert.strictEqual(r.requests.length, 0);
};

(async () => {
  await apiChecks();
  const browser = await chromium.launch();
  try {
    await browserChecks(browser);
  } finally {
    await browser.close();
  }
  console.log('Form checks passed: invio, errori, doppio clic, 1440 e 390 px, api/lead.');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
