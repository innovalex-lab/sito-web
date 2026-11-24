// Home: scena fissata, inclinazione della pila, ingressi. Il filo d'oro è stato tolto (decisione del 24/11).
// Nessuna dipendenza. Scrive solo transform, attributi e classi.

const ridotto = matchMedia('(prefers-reduced-motion: reduce)');
const fissata = matchMedia('(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)');

const scena = document.querySelector<HTMLElement>('[data-scena]');
const pista = scena?.querySelector<HTMLElement>('.scena-pista') ?? null;
const passi = scena ? [...scena.querySelectorAll<HTMLElement>('[data-passo]')] : [];
const lastre = passi.map((p) => p.querySelector<HTMLElement>(':scope > .lastra')!);

let attivo = -1;
let inAttesa = false;

// L'intestazione è fissa: la scena si ferma sotto di lei e ha a disposizione il resto dello schermo.
const barra = () => document.querySelector<HTMLElement>('[data-barra]')?.offsetHeight ?? 0;

function impostaPasso(i: number) {
  attivo = i;
  passi.forEach((passo, k) => {
    const lastra = lastre[k];
    lastra.dataset.stato = k < i ? 'posata' : k === i ? 'attiva' : 'futura';
    lastra.style.setProperty('--d', String(i - k));
    passo.toggleAttribute('data-attivo', k === i);
    passo.toggleAttribute('data-dopo', k > i);
  });
}

// Le pastiglie portano al loro passaggio
passi.forEach((passo, k) => {
  passo.querySelector('.pastiglia')?.addEventListener('click', () => {
    const comportamento: ScrollBehavior = ridotto.matches ? 'auto' : 'smooth';
    if (fissata.matches && pista) {
      const b = barra();
      const corsa = pista.offsetHeight - (window.innerHeight - b);
      const y = pista.getBoundingClientRect().top + window.scrollY - b + corsa * ((k + 0.5) / passi.length);
      window.scrollTo({ top: y, behavior: comportamento });
    } else {
      passo.scrollIntoView({ behavior: comportamento, block: 'start' });
    }
  });
});

function aggiornaScena(vh: number) {
  if (!pista || !fissata.matches) return;
  const r = pista.getBoundingClientRect();
  const b = barra();
  const corsa = r.height - (vh - b);
  const t = Math.min(0.9999, Math.max(0, (b - r.top) / corsa));
  const i = Math.floor(t * passi.length);
  if (i !== attivo) impostaPasso(i);
}

function misura() {
  inAttesa = false;
  const vh = window.innerHeight;
  aggiornaScena(vh);
}

function richiedi() {
  if (inAttesa) return;
  inAttesa = true;
  requestAnimationFrame(misura);
}

// Versione in sequenza (mobile o movimento ridotto): ogni lastra si anima quando entra.
const osservaLastre = new IntersectionObserver(
  (voci) => {
    for (const v of voci) {
      if (!v.isIntersecting || fissata.matches) continue;
      (v.target as HTMLElement).dataset.stato = 'attiva';
      osservaLastre.unobserve(v.target);
    }
  },
  { rootMargin: '0px 0px -18% 0px', threshold: 0.25 },
);

function preparaModo() {
  if (fissata.matches) {
    attivo = -1;
    richiedi();
    return;
  }
  passi.forEach((passo) => {
    passo.setAttribute('data-attivo', '');
    passo.removeAttribute('data-dopo');
  });
  for (const lastra of lastre) {
    lastra.style.removeProperty('--d');
    if (ridotto.matches) {
      lastra.dataset.stato = 'attiva';
    } else {
      lastra.dataset.stato = 'futura';
      osservaLastre.observe(lastra);
    }
  }
}

// Prima schermata: la pila segue appena il mouse. Solo con puntatore preciso e movimento consentito.
const inclina = document.querySelector<HTMLElement>('[data-inclina]');
const puntatore = matchMedia('(hover: hover) and (pointer: fine)');
const eroe = inclina?.closest<HTMLElement>('.eroe');
if (inclina && eroe) {
  let mx = 0;
  let my = 0;
  let x = 0;
  let y = 0;
  let giro = 0;
  const passo = () => {
    x += (mx - x) * 0.07;
    y += (my - y) * 0.07;
    inclina.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    giro = Math.abs(mx - x) + Math.abs(my - y) > 0.002 ? requestAnimationFrame(passo) : 0;
  };
  const avvia = () => {
    if (!giro) giro = requestAnimationFrame(passo);
  };
  eroe.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || !puntatore.matches || ridotto.matches) return;
    const r = eroe.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    my = ((e.clientY - r.top) / r.height) * 2 - 1;
    avvia();
  });
  eroe.addEventListener('pointerleave', () => {
    mx = 0;
    my = 0;
    avvia();
  });
}

// Elementi che si completano una volta sola quando entrano nello schermo.
const osservaIngressi = new IntersectionObserver(
  (voci) => {
    for (const v of voci) {
      if (!v.isIntersecting) continue;
      v.target.classList.add('visto');
      osservaIngressi.unobserve(v.target);
    }
  },
  { rootMargin: '0px 0px -15% 0px', threshold: 0.3 },
);
document.querySelectorAll('[data-entra]').forEach((el) => osservaIngressi.observe(el));

preparaModo();
fissata.addEventListener('change', preparaModo);
ridotto.addEventListener('change', preparaModo);

misura();

window.addEventListener('scroll', richiedi, { passive: true });
window.addEventListener('resize', richiedi);
