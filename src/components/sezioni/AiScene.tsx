// Due micro animazioni della sezione "AI e automazioni", con Motion per React.
// Il server disegna lo stato finale: senza script e con movimento ridotto si vede la scena compiuta.
// Con movimento consentito, l'isola torna allo stato iniziale prima di entrare nello schermo
// (client:visible con margine) e la sequenza parte una volta sola quando è visibile.
import { AnimatePresence, LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const molla = { type: 'spring', stiffness: 420, damping: 28 } as const;
const morbida = { type: 'spring', stiffness: 170, damping: 24 } as const;

/** Fase della sequenza: parte da `fine` (come il server) e, se si può animare, rigioca da 0. */
function useSequenza(passi: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const ridotto = useReducedMotion();
  const visto = useInView(ref, { once: true, amount: 0.6 });
  const fine = passi.length;
  const [fase, setFase] = useState(fine);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    if (ridotto) return;
    // Blocca l'altezza su quella della scena compiuta: la sequenza cresce dentro senza spostare la pagina
    if (ref.current) ref.current.style.minHeight = `${ref.current.offsetHeight}px`;
    setFase(0);
    setPronto(true);
  }, [ridotto]);

  useEffect(() => {
    if (!pronto || !visto) return;
    const timer = passi.map((t, i) => window.setTimeout(() => setFase(i + 1), t));
    return () => timer.forEach(clearTimeout);
  }, [pronto, visto]);

  // Prima di essere pronta l'isola non dichiara stati iniziali: l'HTML del server resta la scena compiuta.
  const ini = <T,>(v: T) => (pronto ? v : false);
  return { ref, fase, ini };
}

const etichette = ['Diffida', 'Urgenza alta', 'Cliente: Rossi Srl'];

export function LeggeMail() {
  // 1 lettura, 2-4 etichette, 5 proposta di scadenza
  const { ref, fase, ini } = useSequenza([300, 1100, 1300, 1500, 2100]);
  const [decisione, setDecisione] = useState<'' | 'confermata' | 'rifiutata'>('');

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={ref} className="ai-ui ai-legge" data-ui>
        <div className="al-mail">
          <span className="al-sigla">MR</span>
          <span className="al-testo">
            <b>Marta Rossi, Rossi Srl</b>
            <span>Diffida Edilvetta, documenti</span>
          </span>
          <span className="al-ora">09:42</span>
          {fase === 1 && (
            <m.span
              className="al-lettura"
              aria-hidden="true"
              initial={ini({ scaleX: 0, opacity: 1 })}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }}
            />
          )}
        </div>

        <ul className="al-etichette" aria-label="Analisi della mail">
          {etichette.map((e, i) => (
            <AnimatePresence key={e}>
              {fase >= i + 2 && (
                <m.li initial={ini({ opacity: 0, y: 10, scale: 0.9 })} animate={{ opacity: 1, y: 0, scale: 1 }} transition={molla}>
                  {e}
                </m.li>
              )}
            </AnimatePresence>
          ))}
        </ul>

        <AnimatePresence>
          {fase >= 5 && (
            <m.div className="al-proposta" initial={ini({ opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={morbida}>
              <span className="al-data">
                <b>27</b>nov
              </span>
              <span className="al-cosa">
                <b>Scadenza proposta</b>
                <small>Termine per il pagamento indicato nella diffida</small>
              </span>
              <span className="al-decidi" aria-live="polite">
                {decisione === '' ? (
                  <>
                    <button type="button" className="al-si" onClick={() => setDecisione('confermata')}>
                      Conferma
                    </button>
                    <button type="button" className="al-no" onClick={() => setDecisione('rifiutata')}>
                      Rifiuta
                    </button>
                  </>
                ) : (
                  <m.span className={`al-esito al-${decisione}`} initial={ini({ opacity: 0, scale: 0.85 })} animate={{ opacity: 1, scale: 1 }} transition={molla}>
                    {decisione === 'confermata' ? 'Confermata da te' : 'Rifiutata da te'}
                    <button type="button" className="al-annulla" onClick={() => setDecisione('')}>
                      Annulla
                    </button>
                  </m.span>
                )}
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}

export function Archivia() {
  // 1 la mail diventa PDF, 2 il PDF entra nella cartella, 3 etichetta in Outlook, 4 avviso al collaboratore
  const { ref, fase, ini } = useSequenza([400, 1200, 2000, 2600]);
  const dentro = fase >= 2;

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={ref} className="ai-ui ai-archivia" data-ui>
        <div className="aa-riga">
          <span className="aa-mail">
            <b>Diffida Edilvetta, documenti</b>
            <AnimatePresence>
              {fase >= 3 && (
                <m.span className="aa-etichetta" initial={ini({ opacity: 0, x: -8 })} animate={{ opacity: 1, x: 0 }} transition={molla}>
                  Archiviata
                </m.span>
              )}
            </AnimatePresence>
          </span>
          <span className="aa-pista">
            {!dentro && (
              <m.span
                className="aa-pdf"
                initial={false}
                animate={fase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={molla}
              >
                PDF
              </m.span>
            )}
          </span>
        </div>

        <m.div className="aa-cartella" animate={fase === 2 ? { scale: [1, 1.035, 1] } : { scale: 1 }} transition={{ duration: 0.45 }}>
          <p className="aa-percorso">
            <span className="aa-icona" aria-hidden="true"></span>Rossi Srl <span aria-hidden="true">/</span> Rossi c. Edilvetta
          </p>
          <ul className="aa-file">
            <AnimatePresence initial={false}>
              {dentro && (
                <m.li className="aa-nuovo" initial={ini({ opacity: 0, y: -26, scale: 0.92 })} animate={{ opacity: 1, y: 0, scale: 1 }} transition={morbida}>
                  <i>PDF</i>
                  <span>2026-11-12_014_Email_Diffida_Edilvetta.pdf</span>
                </m.li>
              )}
            </AnimatePresence>
            <li>
              <i>PDF</i>
              <span>2026-11-07_013_Foto-cantiere_Rossi.pdf</span>
            </li>
          </ul>
        </m.div>

        <AnimatePresence>
          {fase >= 4 && (
            <m.p className="aa-avviso" initial={ini({ opacity: 0, y: 8 })} animate={{ opacity: 1, y: 0 }} transition={morbida}>
              <span className="aa-spunta" aria-hidden="true"></span>Cartella di lavoro pronta, avviso inviato ad Avv. Paolo Neri
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
