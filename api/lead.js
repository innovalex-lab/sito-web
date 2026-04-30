module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.CLICKUP_TOKEN;
  const listId = process.env.CLICKUP_LIST_ID;
  const status = process.env.CLICKUP_STATUS;

  if (!token || !listId) {
    return res.status(500).json({ ok: false, error: 'Missing ClickUp env vars' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const {
    name,
    studio,
    email,
    phone,
    role,
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
      body: JSON.stringify(payload)
    });
    const data = await clickupRes.json().catch(() => ({}));
    return { clickupRes, data };
  };

  try {
    let { clickupRes, data } = await createTask(payloadWithStatus);

    // Fallback when status value is not valid for the target list.
    if (!clickupRes.ok && status) {
      const retry = await createTask(basePayload);
      clickupRes = retry.clickupRes;
      data = retry.data;
    }

    if (!clickupRes.ok) {
      return res.status(500).json({
        ok: false,
        error: 'ClickUp API error',
        details: data
      });
    }

    return res.status(200).json({
      ok: true,
      taskId: data.id,
      taskUrl: data.url || null
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'Server error',
      details: String(error)
    });
  }
};
