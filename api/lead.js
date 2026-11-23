module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.CLICKUP_TOKEN;
  const listId = process.env.CLICKUP_LIST_ID;
  const status = process.env.CLICKUP_STATUS;
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ROI_LEAD_NOTIFY_EMAIL || 'federico.garau@innovalexai.it';
  const resendFrom = process.env.RESEND_FROM_EMAIL || 'INNOVALEX <onboarding@resend.dev>';

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const {
    name,
    studio,
    email,
    phone,
    role,
    teamSize,
    dailyEmailVolume,
    currentTools,
    urgentProblem,
    hoursPerDay,
    lawyers,
    hourlyRate,
    selectedFeatures,
    estimatedAnnualValue,
    estimatedMonthlyHours,
    sourceCta,
    timestamp
  } = body;

  if (!name || !studio || !email) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  const taskName = `Lead | ${studio} | ${name}`;
  const description = [
    `Nome: ${name}`,
    `Studio: ${studio}`,
    `Email: ${email}`,
    `Telefono: ${phone || '-'}`,
    `Ruolo: ${role || '-'}`,
    `Persone nello studio: ${teamSize || '-'}`,
    `Email/PEC medie al giorno: ${dailyEmailVolume || '-'}`,
    `Strumenti in uso oggi: ${currentTools || '-'}`,
    `Problema più urgente: ${urgentProblem || '-'}`,
    `Ore email/giorno: ${hoursPerDay || '-'}`,
    `Avvocati coinvolti: ${lawyers || '-'}`,
    `Tariffa oraria: ${hourlyRate || '-'}`,
    `Feature selezionate: ${selectedFeatures || '-'}`,
    `Valore annuale stimato: ${estimatedAnnualValue || '-'}`,
    `Ore mensili stimate: ${estimatedMonthlyHours || '-'}`,
    `Source CTA: ${sourceCta || '-'}`,
    `Timestamp: ${timestamp || new Date().toISOString()}`
  ].join('\n');

  const basePayload = { name: taskName, description };
  const payloadWithStatus = status ? { ...basePayload, status } : basePayload;

  const createTask = async (payload) => {
    const clickupRes = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      // Deve scadere prima della funzione, altrimenti la mail di riserva non partirebbe.
      signal: AbortSignal.timeout(6000)
    });
    const data = await clickupRes.json().catch(() => ({}));
    return { clickupRes, data };
  };

  const sendNotification = async (subjectPrefix, errorDetails = null) => {
    if (!resendKey) {
      return { ok: false, skipped: true, error: 'Missing Resend API key' };
    }

    const text = [
      `${subjectPrefix}: ${studio} | ${name}`,
      '',
      description,
      errorDetails ? '' : null,
      errorDetails ? `Errore ClickUp: ${errorDetails}` : null
    ].filter((line) => line !== null).join('\n');

    // Gli errori restano qui: una mail fallita non deve far sembrare fallito un task già creato.
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [notifyEmail],
          subject: `${subjectPrefix} ${studio} | ${name}`.replace(/[\r\n]+/g, ' ').slice(0, 200),
          text
        }),
        signal: AbortSignal.timeout(3000)
      });
      const data = await resendRes.json().catch(() => ({}));
      return { ok: resendRes.ok, data };
    } catch (error) {
      return { ok: false, error: String(error) };
    }
  };

  let clickupError;

  try {
    if (!token || !listId) {
      throw new Error('Missing ClickUp env vars');
    }

    let { clickupRes, data } = await createTask(payloadWithStatus);

    // Fallback when status value is not valid for the target list.
    if (!clickupRes.ok && status) {
      const retry = await createTask(basePayload);
      clickupRes = retry.clickupRes;
      data = retry.data;
    }

    if (clickupRes.ok) {
      const notification = await sendNotification('[Diagnosi]');
      if (!notification.ok) {
        console.error('Diagnosi notification error:', notification.data || notification.error);
      }

      return res.status(200).json({
        ok: true,
        taskId: data.id,
        taskUrl: data.url || null,
        notified: notification.ok
      });
    }

    console.error('Diagnosi ClickUp error:', data);
    clickupError = JSON.stringify(data);
  } catch (error) {
    console.error('Diagnosi server error:', error);
    clickupError = String(error);
  }

  const fallback = await sendNotification('[Diagnosi Fallback]', clickupError);
  if (fallback.ok) {
    return res.status(200).json({ ok: true, fallback: 'email' });
  }

  console.error('Diagnosi fallback notification error:', fallback.data || fallback.error);
  return res.status(500).json({
    ok: false,
    error: 'ClickUp and fallback notification failed'
  });
};
