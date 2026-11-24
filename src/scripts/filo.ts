// Prototipo "Il filo d'oro": binario che si riempie, scena fissata, ingressi.
// Nessuna dipendenza. Scrive solo transform, attributi e classi.

const ridotto = matchMedia('(prefers-reduced-motion: reduce)');
const fissata = matchMedia('(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)');

const binari = [...document.querySelectorAll<HTMLElement>('[data-binario]')].map((sezione) => ({
  sezione,
  pieno: sezione.querySelector<HTMLElement>(':scope > .binario > .binario-pieno'),
  punta: sezione.querySelector<HTMLElement>(':scope > .binario > .binario-punta'),
}));

const scena = document.querySelector<HTMLElement>('[data-scena]');
const pista = scena?.querySelector<HTMLElement>('.scena-pista') ?? null;
const passi = scena ? [...scena.querySelectorAll<HTMLElement>('[data-passo]')] : [];
const lastre = passi.map((p) => p.querySelector<HTMLElement>(':scope > .lastra')!);
const filoScena = scena?.querySelector<SVGSVGElement>('.scena-filo') ?? null;
const filoPonte = filoScena?.querySelector<SVGPathElement>('.filo-ponte') ?? null;
const filoCucitura = filoScena?.querySelector<SVGPathElement>('.filo-cucitura') ?? null;

let attivo = -1;
let inAttesa = false;
let timerFilo = 0;

function aggiornaBinari(vh: number) {
  const lettura = vh * 0.62;
  // In fondo alla pagina il filo arriva sempre fino alla mezzaluna finale
  const inFondo = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
  for (const { sezione, pieno, punta } of binari) {
    if (!pieno) continue;
    const r = sezione.getBoundingClientRect();
    const p = ridotto.matches || (inFondo && r.top < vh) ? 1 : Math.min(1, Math.max(0, (lettura - r.top) / r.height));
    pieno.style.transform = `scaleY(${p.toFixed(4)})`;
    // La punta segna dove arriva il filo: visibile solo mentre il filo avanza nella sezione
    if (punta) {
      punta.style.transform = `translateY(${(p * r.height).toFixed(1)}px)`;
      punta.style.opacity = p > 0 && p < 1 ? '1' : '0';
    }
  }
}

function impostaPasso(i: number) {
  attivo = i;
  passi.forEach((passo, k) => {
    const lastra = lastre[k];
    lastra.dataset.stato = k < i ? 'posata' : k === i ? 'attiva' : 'futura';
    lastra.style.setProperty('--d', String(i - k));
    passo.toggleAttribute('data-attivo', k === i);
    passo.toggleAttribute('data-dopo', k > i);
  });
  disegnaFilo();
}

// Il filo esce dalla pastiglia attiva, raggiunge la lastra appena arrivata
// e scende cucendo i perni delle lastre già posate.
function centro(el: Element, base: DOMRect) {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2 - base.left, r.top + r.height / 2 - base.top];
}

function disegnaFilo() {
  if (!filoScena || !filoPonte || !filoCucitura) return;
  filoScena.classList.remove('disegnato');
  window.clearTimeout(timerFilo);
  timerFilo = window.setTimeout(() => {
    const i = attivo;
    const pastiglia = passi[i]?.querySelector('.pastiglia');
    const carta = lastre[i]?.querySelector('.carta');
    if (!pastiglia || !carta) return;
    const base = filoScena.getBoundingClientRect();
    const a = pastiglia.getBoundingClientRect();
    const b = carta.getBoundingClientRect();
    const x1 = a.right - base.left + 10;
    const y1 = a.top + a.height / 2 - base.top;
    const x2 = b.left - base.left + 2;
    const y2 = b.top + b.height * 0.32 - base.top;
    const m = (x2 - x1) * 0.55;
    const f = (n: number) => n.toFixed(1);
    filoPonte.setAttribute('d', `M${f(x1)} ${f(y1)} C${f(x1 + m)} ${f(y1)} ${f(x2 - m)} ${f(y2)} ${f(x2)} ${f(y2)}`);
    // cucitura: perno della lastra attiva, poi i perni della pila dall'alto in basso
    const punti: number[][] = [];
    for (let k = i; k >= 0; k--) {
      const perno = lastre[k].querySelector('.perno-lastra');
      if (perno) punti.push(centro(perno, base));
    }
    let d = '';
    if (punti.length > 1) {
      d = `M${f(punti[0][0])} ${f(punti[0][1])}`;
      for (let k = 1; k < punti.length; k++) {
        const [px, py] = punti[k - 1];
        const [qx, qy] = punti[k];
        const my = (py + qy) / 2;
        d += ` C${f(px)} ${f(my)} ${f(qx)} ${f(my)} ${f(qx)} ${f(qy)}`;
      }
    }
    filoCucitura.setAttribute('d', d);
    filoScena.getBoundingClientRect();
    filoScena.classList.add('disegnato');
  }, 1250);
}

// Le pastiglie portano al loro passaggio
passi.forEach((passo, k) => {
  passo.querySelector('.pastiglia')?.addEventListener('click', () => {
    const comportamento: ScrollBehavior = ridotto.matches ? 'auto' : 'smooth';
    if (fissata.matches && pista) {
      const corsa = pista.offsetHeight - window.innerHeight;
      const y = pista.getBoundingClientRect().top + window.scrollY + corsa * ((k + 0.5) / passi.length);
      window.scrollTo({ top: y, behavior: comportamento });
    } else {
      passo.scrollIntoView({ behavior: comportamento, block: 'start' });
    }
  });
});

function aggiornaScena(vh: number) {
  if (!pista || !fissata.matches) return;
  const r = pista.getBoundingClientRect();
  const corsa = r.height - vh;
  const t = Math.min(0.9999, Math.max(0, -r.top / corsa));
  const i = Math.floor(t * passi.length);
  if (i !== attivo) impostaPasso(i);
}

function misura() {
  inAttesa = false;
  const vh = window.innerHeight;
  aggiornaBinari(vh);
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
  filoScena?.classList.remove('disegnato');
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

// Il binario si disegna all'arrivo, poi segue lo scorrimento senza ritardo.
window.setTimeout(() => {
  misura();
  window.setTimeout(() => {
    binari.forEach(({ pieno }) => pieno?.classList.add('svelto'));
  }, 950);
}, 600);

window.addEventListener('scroll', richiedi, { passive: true });
window.addEventListener('resize', () => {
  richiedi();
  if (fissata.matches && attivo >= 0) disegnaFilo();
});
