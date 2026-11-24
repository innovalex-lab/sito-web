// Calcolatore: stesso comportamento di main (index.html), con la grafica nuova.
// - I campi a cursore e numerici restano allineati; il calcolo usa il cursore, come in main.
// - La richiesta dell'analisi compare dopo il primo intervento, se c'è un risultato.
// - Invio a /api/roi-lead con gli stessi campi e lo stesso formato di main (api/roi-lead.js non cambia).
// - Esiti sempre visibili: riuscito, errore con l'email ancora nel campo, doppio invio bloccato.
import { calcola, euro, formula } from '../lib/calcolo';

const radice = document.querySelector<HTMLElement>('[data-calcolatore]');
if (radice) avvia(radice);

function avvia(radice: HTMLElement) {
  const cursore = (id: string) => radice.querySelector<HTMLInputElement>(`[data-campo="${id}"]`)!;
  const numero = (id: string) => radice.querySelector<HTMLInputElement>(`[data-numero="${id}"]`)!;
  const esito = (id: string) => radice.querySelector<HTMLElement>(`[data-esito="${id}"]`)!;
  const sistemi = [...radice.querySelectorAll<HTMLInputElement>('[data-sistema]')];
  const campi = ['ore', 'tariffa', 'avvocati'];

  const analisi = radice.querySelector<HTMLElement>('[data-analisi]')!;
  const modulo = analisi.querySelector<HTMLElement>('[data-analisi-modulo]')!;
  const form = analisi.querySelector<HTMLFormElement>('[data-analisi-form]')!;
  const fatto = analisi.querySelector<HTMLElement>('[data-analisi-fatto]')!;
  const email = form.querySelector<HTMLInputElement>('input[type="email"]')!;
  const pulsante = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const errore = form.querySelector<HTMLElement>('#ca-errore')!;
  const stima = esito('stima').textContent ?? '';

  let toccato = false;
  let inviata = false;
  let inVolo = false;

  const scelti = () => sistemi.filter((s) => s.checked);

  function aggiorna() {
    const ore = parseFloat(cursore('ore').value) || 0;
    const tariffa = parseFloat(cursore('tariffa').value) || 0;
    const avvocati = parseFloat(cursore('avvocati').value) || 0;
    const e = calcola({ ore, tariffa, avvocati, quote: scelti().map((s) => Number(s.dataset.quota)) });

    esito('annuale').textContent = euro(e.annuale);
    esito('formula').textContent = formula(e, ore, tariffa, avvocati);
    esito('stima').textContent = e.sistemi ? stima : 'Seleziona almeno un modulo.';
    esito('oreMese').textContent = `${e.oreMese.toFixed(0)}h`;
    esito('oreGiorno').textContent = e.sistemi ? `${e.oreGiorno.toFixed(1)}h/giorno recuperate per avvocato` : 'Seleziona almeno un modulo';
    esito('mensile').textContent = euro(e.mensile);
    esito('mensileDettaglio').textContent = `${e.oreMese.toFixed(0)}h x ${euro(tariffa)}/h`;

    // Per la sessione 2 (form della diagnosi): i sistemi scelti con le etichette corrette.
    radice.dataset.sistemiLead = scelti().map((s) => s.dataset.etichettaLead).join(', ');

    mostraAnalisi((toccato && e.annuale > 0 && e.oreMese > 0 && e.mensile > 0) || inviata);
  }

  function mostraAnalisi(vero: boolean) {
    if (vero === !analisi.hidden) return;
    analisi.hidden = !vero;
    if (vero) requestAnimationFrame(() => analisi.classList.add('aperta'));
    else analisi.classList.remove('aperta');
  }

  for (const id of campi) {
    const c = cursore(id);
    const n = numero(id);
    c.addEventListener('input', () => {
      toccato = true;
      n.value = c.value;
      aggiorna();
    });
    n.addEventListener('input', () => {
      toccato = true;
      c.value = n.value;
      aggiorna();
    });
    // Fuori intervallo il cursore si ferma al limite: il numero torna a dire il valore usato.
    n.addEventListener('change', () => {
      n.value = c.value;
    });
  }
  sistemi.forEach((s) =>
    s.addEventListener('input', () => {
      toccato = true;
      aggiorna();
    }),
  );

  const mostraErrore = (testo: string) => {
    errore.textContent = testo;
    errore.hidden = false;
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (inVolo) return; // doppio clic o Invio ripetuto
    errore.hidden = true;
    email.removeAttribute('aria-invalid');

    const indirizzo = email.value.trim();
    if (!/\S+@\S+\.\S+/.test(indirizzo)) {
      email.setAttribute('aria-invalid', 'true');
      mostraErrore(errore.dataset.erroreEmail!);
      email.focus();
      return;
    }

    // Stessi campi e formato di main: valori dei cursori come testo, risultati come mostrati a schermo.
    const payload = {
      email: indirizzo,
      ore_giorno: cursore('ore').value,
      tariffa_oraria: cursore('tariffa').value,
      numero_avvocati: cursore('avvocati').value,
      modulo_simulato: scelti().map((s) => s.dataset.invio).join(', ') || '-',
      valore_annuale_calcolato: esito('annuale').textContent!.trim(),
      ore_mese_recuperate: esito('oreMese').textContent!.trim(),
      risparmio_mensile: esito('mensile').textContent!.trim(),
      source: 'calcolatore_roi',
      timestamp: new Date().toISOString(),
    };

    inVolo = true;
    pulsante.disabled = true;
    pulsante.textContent = pulsante.dataset.invio!;
    form.setAttribute('aria-busy', 'true');
    // Senza un limite, una rete bloccata lascerebbe la persona senza esito.
    const controllo = new AbortController();
    const limite = setTimeout(() => controllo.abort(), 25000);

    try {
      const risposta = await fetch('/api/roi-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controllo.signal,
      });
      const dati = await risposta.json().catch(() => ({}));
      if (!risposta.ok || !dati.ok) throw new Error(dati?.error || 'Richiesta non riuscita');
      inviata = true;
      form.reset();
      modulo.hidden = true;
      fatto.hidden = false;
    } catch (e) {
      console.warn('Analisi del calcolatore non inviata:', e);
      // L'email resta nel campo: basta premere di nuovo.
      mostraErrore(errore.dataset.erroreRete!);
    } finally {
      clearTimeout(limite);
      inVolo = false;
      pulsante.disabled = false;
      pulsante.textContent = pulsante.dataset.testo!;
      form.removeAttribute('aria-busy');
    }
  });

  aggiorna();
}
