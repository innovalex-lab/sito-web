// Form della diagnosi: stesso invio di main (index.html dopo 58e6b05), con la grafica nuova.
// - Stessi campi obbligatori di main, più il consenso privacy. Errori accanto al campo, fuoco sul primo.
// - POST a /api/lead con le stesse chiavi, nello stesso ordine e nello stesso formato di main (api/lead.js non cambia).
// - I dati del calcolatore si aggiungono solo se il visitatore l'ha usato; altrimenti le chiavi restano vuote.
// - sourceCta: l'ultimo link con data-cta cliccato, come su main ('direct' se nessuno).
// - Esiti sempre visibili: conferma al posto del form, oppure errore con i dati ancora nel form. Doppio invio bloccato.

let ultimoCta = 'direct';
document.addEventListener('click', (ev) => {
  const link = (ev.target as Element | null)?.closest?.<HTMLAnchorElement>('a[data-cta]');
  if (link) ultimoCta = link.dataset.cta!;
});

const area = document.querySelector<HTMLElement>('[data-diagnosi]');
if (area) avvia(area);

function avvia(area: HTMLElement) {
  const form = area.querySelector<HTMLFormElement>('[data-diagnosi-form]')!;
  const fatto = area.querySelector<HTMLElement>('[data-diagnosi-fatto]')!;
  const erroreRete = form.querySelector<HTMLElement>('[data-diagnosi-errore]')!;
  const pulsante = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const priorita = [...form.querySelectorAll<HTMLInputElement>('input[name="urgentProblem"]')];
  const consenso = form.querySelector<HTMLInputElement>('#consenso')!;
  const campo = (id: string) => form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`#${id}`)!;

  // Obbligatori di main, nello stesso ordine; poi la priorità (almeno una) e il consenso.
  const testi = ['name', 'studio', 'email', 'role', 'teamSize', 'dailyEmailVolume', 'currentTools'];
  const regole: { id: string; valido: () => boolean; fuoco: () => HTMLElement }[] = [
    ...testi.map((id) => ({
      id,
      valido: () => (id === 'email' ? /\S+@\S+\.\S+/.test(campo(id).value) : campo(id).value.trim() !== ''),
      fuoco: () => campo(id) as HTMLElement,
    })),
    { id: 'urgentProblem', valido: () => priorita.some((p) => p.checked), fuoco: () => priorita[0] },
    { id: 'consenso', valido: () => consenso.checked, fuoco: () => consenso },
  ];
  // Ordine visivo del form: il fuoco va al primo campo sbagliato dall'alto.
  const ordine = ['name', 'studio', 'email', 'role', 'teamSize', 'urgentProblem', 'dailyEmailVolume', 'currentTools', 'consenso'];

  let tentato = false;
  let inVolo = false;

  function segna(id: string, sbagliato: boolean) {
    const messaggio = form.querySelector<HTMLElement>(`#err-${id}`)!;
    messaggio.hidden = !sbagliato;
    const bersagli = id === 'urgentProblem' ? [form.querySelector<HTMLElement>('#urgentProblem')!] : [form.querySelector<HTMLElement>(`#${id}`)!];
    for (const b of bersagli) {
      if (sbagliato) b.setAttribute('aria-invalid', 'true');
      else b.removeAttribute('aria-invalid');
    }
  }

  function controlla() {
    const sbagliati = regole.filter((r) => !r.valido()).map((r) => r.id);
    for (const r of regole) segna(r.id, sbagliati.includes(r.id));
    return ordine.filter((id) => sbagliati.includes(id));
  }

  // Dopo il primo tentativo l'errore sparisce appena il campo è a posto.
  form.addEventListener('input', () => {
    if (tentato) controlla();
  });
  form.addEventListener('change', () => {
    if (tentato) controlla();
  });

  function datiCalcolatore() {
    const c = document.querySelector<HTMLElement>('[data-calcolatore]')?.dataset;
    const usato = c?.usato === 'si';
    const v = (x: string | undefined) => (usato ? (x ?? '') : '');
    return {
      hoursPerDay: v(c?.oreGiorno),
      lawyers: v(c?.avvocati),
      hourlyRate: v(c?.tariffa),
      selectedFeatures: v(c?.sistemiLead),
      estimatedAnnualValue: v(c?.valoreAnnuo),
      estimatedMonthlyHours: v(c?.oreMese),
    };
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (inVolo) return; // doppio clic o Invio ripetuto
    tentato = true;
    erroreRete.hidden = true;

    const sbagliati = controlla();
    if (sbagliati.length) {
      regole.find((r) => r.id === sbagliati[0])!.fuoco().focus();
      return;
    }

    const calc = datiCalcolatore();
    // Stesse chiavi e stesso ordine di main.
    const payload = {
      name: campo('name').value.trim(),
      studio: campo('studio').value.trim(),
      email: campo('email').value.trim(),
      phone: campo('phone').value.trim(),
      role: campo('role').value,
      teamSize: campo('teamSize').value,
      dailyEmailVolume: campo('dailyEmailVolume').value.trim(),
      currentTools: campo('currentTools').value.trim(),
      urgentProblem: priorita.filter((p) => p.checked).map((p) => p.value).join(', '),
      hoursPerDay: calc.hoursPerDay,
      lawyers: calc.lawyers,
      hourlyRate: calc.hourlyRate,
      selectedFeatures: calc.selectedFeatures,
      estimatedAnnualValue: calc.estimatedAnnualValue,
      estimatedMonthlyHours: calc.estimatedMonthlyHours,
      sourceCta: ultimoCta,
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
      const risposta = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controllo.signal,
      });
      const dati = await risposta.json().catch(() => ({}));
      if (!risposta.ok || !dati.ok) throw new Error(dati?.error || 'Richiesta non riuscita');
      // Richiesta ricevuta: la conferma prende il posto del form.
      form.reset();
      form.hidden = true;
      fatto.hidden = false;
      fatto.querySelector<HTMLElement>('[tabindex="-1"]')!.focus();
    } catch (e) {
      console.warn('Richiesta di diagnosi non inviata:', e);
      // I dati restano nel form: basta premere di nuovo.
      erroreRete.hidden = false;
    } finally {
      clearTimeout(limite);
      inVolo = false;
      pulsante.disabled = false;
      pulsante.textContent = pulsante.dataset.testo!;
      form.removeAttribute('aria-busy');
    }
  });
}
