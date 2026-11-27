// Tutto lo studio: il giro guidato delle sei funzioni. Nessuna dipendenza.
// Il tempo di ogni funzione lo dà l'animazione CSS della sua linea oro (giro-tempo, --durata in sezioni.css):
// alla fine dell'animazione si passa alla funzione successiva. Così la pausa ferma anche il tempo, senza timer.
// Stati sul contenitore: data-auto (il giro va da solo), data-pausa (fermo per un momento: puntatore sopra,
// fuoco dentro, sezione fuori dallo schermo). Con movimento ridotto il giro non parte mai da solo.

const giro = document.querySelector<HTMLElement>('[data-giro]');

if (giro) {
  const scene = [...giro.querySelectorAll<HTMLElement>('.giro-scena')];
  const voci = [...giro.querySelectorAll<HTMLElement>('.giro-voce')];
  const scegli = voci.map((v) => v.querySelector<HTMLButtonElement>('.giro-scegli')!);
  const tacche = [...giro.querySelectorAll<HTMLButtonElement>('[data-giro-tacca]')];
  const pausa = giro.querySelector<HTMLButtonElement>('[data-giro-pausa]')!;
  const ridotto = matchMedia('(prefers-reduced-motion: reduce)');
  const n = scene.length;

  let attivo = 0;
  let partito = false; // il giro è già partito una volta, o qualcuno l'ha preso in mano
  let visibile = false;
  let sopra = false;
  let fuoco = false;

  const mostra = (i: number) => {
    attivo = (i + n) % n;
    scene.forEach((s, k) => s.toggleAttribute('data-attivo', k === attivo));
    voci.forEach((v, k) => v.toggleAttribute('data-attivo', k === attivo));
    scegli.forEach((b, k) => b.setAttribute('aria-expanded', String(k === attivo)));
    tacche.forEach((t, k) => (k === attivo ? t.setAttribute('aria-current', 'true') : t.removeAttribute('aria-current')));
  };

  const aggiornaPausa = () => {
    giro.toggleAttribute('data-pausa', !visibile || sopra || fuoco);
  };

  const auto = (si: boolean) => {
    giro.toggleAttribute('data-auto', si);
    pausa.setAttribute('aria-label', si ? 'Ferma il giro delle funzioni' : 'Fai ripartire il giro delle funzioni');
    pausa.toggleAttribute('data-ferma', si);
  };

  // Chi sceglie una funzione prende in mano il giro: si va lì e il giro si ferma
  const vaiA = (i: number) => {
    partito = true;
    auto(false);
    mostra(i);
  };

  scegli.forEach((b, k) => b.addEventListener('click', () => vaiA(k)));
  tacche.forEach((t, k) => t.addEventListener('click', () => vaiA(k)));
  giro.querySelector('[data-giro-indietro]')!.addEventListener('click', () => vaiA(attivo - 1));
  giro.querySelector('[data-giro-avanti]')!.addEventListener('click', () => vaiA(attivo + 1));
  pausa.addEventListener('click', () => {
    const riparte = !giro.hasAttribute('data-auto');
    auto(riparte);
    // Ripartendo dall'ultima linea piena, l'animazione ricomincia da zero sulla stessa funzione
    if (riparte) mostra(attivo);
  });

  giro.addEventListener('animationend', (e) => {
    if (e.animationName === 'giro-tempo' && giro.hasAttribute('data-auto')) mostra(attivo + 1);
  });

  // Pausa breve: puntatore sopra (solo mouse), fuoco dentro, sezione fuori dallo schermo
  giro.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    sopra = true;
    aggiornaPausa();
  });
  giro.addEventListener('pointerleave', () => {
    sopra = false;
    aggiornaPausa();
  });
  giro.addEventListener('focusin', () => {
    fuoco = true;
    aggiornaPausa();
  });
  giro.addEventListener('focusout', (e) => {
    if (giro.contains(e.relatedTarget as Node | null)) return;
    fuoco = false;
    aggiornaPausa();
  });

  // Sul palco si scorre col dito: a sinistra la successiva, a destra la precedente
  const palco = giro.querySelector<HTMLElement>('.giro-palco')!;
  let x0: number | null = null;
  let y0 = 0;
  palco.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    x0 = e.clientX;
    y0 = e.clientY;
  });
  palco.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    const dy = e.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) vaiA(attivo + (dx < 0 ? 1 : -1));
  });
  palco.addEventListener('pointercancel', () => {
    x0 = null;
  });

  // Il giro parte la prima volta che la sezione è sullo schermo; fuori dallo schermo si ferma il tempo
  new IntersectionObserver(
    ([v]) => {
      visibile = v.isIntersecting;
      if (visibile && !partito && !ridotto.matches) {
        partito = true;
        auto(true);
      }
      aggiornaPausa();
    },
    { threshold: 0.6 },
  ).observe(palco);

  pausa.hidden = ridotto.matches;
  ridotto.addEventListener('change', () => {
    pausa.hidden = ridotto.matches;
    if (ridotto.matches) auto(false);
  });
  aggiornaPausa();
}
