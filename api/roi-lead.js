module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.CLICKUP_TOKEN;
  const listId = process.env.CLICKUP_ROI_LIST_ID || process.env.CLICKUP_LIST_ID;
  const status = process.env.CLICKUP_ROI_STATUS || 'LEAD FORM';
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ROI_LEAD_NOTIFY_EMAIL || 'federico.garau@innovalexai.it';
  const resendFrom = process.env.RESEND_FROM_EMAIL || 'INNOVALEX <onboarding@resend.dev>';

  if (!token || !listId) {
    return res.status(500).json({ ok: false, error: 'Missing ClickUp env vars' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const {
    email,
    ore_giorno,
    tariffa_oraria,
    numero_avvocati,
    modulo_simulato,
    valore_annuale_calcolato,
    ore_mese_recuperate,
    risparmio_mensile,
    source,
    timestamp
  } = body;

  if (!email) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  const createdAt = timestamp || new Date().toISOString();
  const taskName = `[ROI Lead] ${email}`;
  const description = [
    `Email: ${email}`,
    `Ore/giorno perse: ${ore_giorno || '-'}`,
    `Tariffa oraria: ${tariffa_oraria ? `€${tariffa_oraria}` : '-'}`,
    `Numero avvocati: ${numero_avvocati || '-'}`,
    `Modulo simulato: ${modulo_simulato || '-'}`,
    `Valore annuale calcolato: ${valore_annuale_calcolato || '-'}`,
    `Ore/mese recuperate: ${ore_mese_recuperate || '-'}`,
    `Risparmio mensile: ${risparmio_mensile || '-'}`,
    `Fonte: ${source === 'calcolatore_roi' ? 'Calcolatore ROI sito' : (source || '-')}`,
    `Data: ${createdAt}`
  ].join('\n');

  const basePayload = {
    name: taskName,
    description,
    tags: ['roi-lead', 'da-contattare']
  };
  const payloadWithStatus = status ? { ...basePayload, status } : basePayload;

  const createTask = async (payload) => {
    const clickupRes = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await clickupRes.json().catch(() => ({}));
    return { clickupRes, data };
  };

  const sendNotification = async (subjectPrefix, errorDetails = null) => {
    if (!resendKey) {
      return { ok: false, skipped: true, error: 'Missing Resend API key' };
    }

    const text = [
      `${subjectPrefix}: ${email}`,
      '',
      `Email: ${email}`,
      `Ore/giorno perse: ${ore_giorno || '-'}`,
      `Tariffa oraria: ${tariffa_oraria ? `€${tariffa_oraria}` : '-'}`,
      `Numero avvocati: ${numero_avvocati || '-'}`,
      `Modulo simulato: ${modulo_simulato || '-'}`,
      `Valore annuale calcolato: ${valore_annuale_calcolato || '-'}`,
      `Ore/mese recuperate: ${ore_mese_recuperate || '-'}`,
      `Risparmio mensile: ${risparmio_mensile || '-'}`,
      `Fonte: ${source === 'calcolatore_roi' ? 'Calcolatore ROI sito' : (source || '-')}`,
      `Data: ${createdAt}`,
      errorDetails ? '' : null,
      errorDetails ? `Errore ClickUp: ${errorDetails}` : null
    ].filter(Boolean).join('\n');

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [notifyEmail],
        subject: `${subjectPrefix} ${email}`,
        text
      })
    });

    const data = await resendRes.json().catch(() => ({}));
    return { ok: resendRes.ok, data };
  };

  try {
    let { clickupRes, data } = await createTask(payloadWithStatus);

    if (!clickupRes.ok && status) {
      const retry = await createTask(basePayload);
      clickupRes = retry.clickupRes;
      data = retry.data;
    }

    if (clickupRes.ok) {
      const notification = await sendNotification('[ROI Lead]');
      if (!notification.ok && !notification.skipped) {
        console.error('ROI lead notification error:', notification.data || notification.error);
      }

      return res.status(200).json({
        ok: true,
        taskId: data.id,
        taskUrl: data.url || null
      });
    }

    console.error('ROI lead ClickUp error:', data);
    const fallback = await sendNotification('[ROI Lead Fallback]', JSON.stringify(data));
    if (fallback.ok) {
      return res.status(200).json({ ok: true, fallback: 'email' });
    }

    console.error('ROI lead fallback notification error:', fallback.data || fallback.error);
    return res.status(500).json({
      ok: false,
      error: 'ClickUp and fallback notification failed'
    });
  } catch (error) {
    console.error('ROI lead server error:', error);
    const fallback = await sendNotification('[ROI Lead Fallback]', String(error));
    if (fallback.ok) {
      return res.status(200).json({ ok: true, fallback: 'email' });
    }

    console.error('ROI lead fallback notification error:', fallback.data || fallback.error);
    return res.status(500).json({
      ok: false,
      error: 'Server error',
      details: String(error)
    });
  }
};
