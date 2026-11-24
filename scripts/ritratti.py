"""Ritratti di Chi siamo e Risultati reali (fase 4).

Parte dagli originali (non dalle copie ridotte), che non vengono modificati:
  python3 scripts/ritratti.py <originale-garau> <maschera-garau> <volto-garau.json> \
                              <originale-cocola> <maschera-cocola> <volto-cocola.json>

Maschere e punti del volto vengono dal framework Vision di macOS (soggetto e punti del viso):
  swiftc -O scripts/ritratti/maschera.swift -o /tmp/maschera && /tmp/maschera <originale> <maschera.png>
  swiftc -O scripts/ritratti/volto.swift -o /tmp/volto && /tmp/volto <originale> > volto.json
Per ogni foto:
  1. profilo colore convertito in sRGB;
  2. fondo originale sostituito da un solo tono piatto, lo stesso per tutte e due (FONDO);
     i bordi del soggetto vengono "decontaminati" dal colore del vecchio fondo, niente alone;
  3. ritaglio 4:5 con gli occhi alla stessa altezza (OCCHI) e la testa, dalla sommità al mento,
     della stessa altezza (TESTA), tutte e due in proporzione al riquadro;
  4. esportazione AVIF e WebP alle larghezze usate dalla pagina, ricostruita dai soli pixel:
     nessun EXIF, XMP o ICC.
Sul volto non si applica nessun filtro: i pixel del soggetto restano quelli dell'originale.
"""
import io
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageCms

RADICE = Path(__file__).resolve().parents[1]
USCITA = RADICE / 'public' / 'team'

FONDO = (236, 228, 212)  # #ece4d4, un tono sotto la crema della pagina (#f8f3ea)
RAPPORTO = 4 / 5
OCCHI = 0.40  # altezza degli occhi, frazione dall'alto
TESTA = 0.43  # sommità della testa - mento, frazione dell'altezza
# Chi siamo: 240 x 300 (e 104 x 130 sotto i 560 px) per tutti e due; Risultati reali: Cocola a 120 x 150. Sempre 1x e 2x.
LARGHEZZE = {'federico-garau': [104, 208, 240, 480], 'francesco-cocola': [104, 120, 208, 240, 480]}


def srgb(im):
    profilo = im.info.get('icc_profile')
    im = im.convert('RGB')
    if profilo:
        da = ImageCms.ImageCmsProfile(io.BytesIO(profilo))
        im = ImageCms.profileToProfile(im, da, ImageCms.createProfile('sRGB'), outputMode='RGB')
    return im


def sommita(maschera, x0, x1):
    righe = np.where((maschera[:, int(x0):int(x1)] > 0.5).any(axis=1))[0]
    return float(righe[0])


def ritratto(originale, file_maschera, file_volto, nome):
    im = srgb(Image.open(originale))
    rgb = np.asarray(im).astype(np.float32) / 255
    a = np.asarray(Image.open(file_maschera).convert('L').resize(im.size, Image.LANCZOS)).astype(np.float32) / 255
    v = json.loads(Path(file_volto).read_text())

    # Colore del vecchio fondo vicino a ogni pixel: media dei soli pixel di fondo (convoluzione normalizzata)
    fondo_peso = 1 - a
    def scatola(x, r, asse):
        # media mobile di lato 2r+1 lungo un asse, con i bordi ripetuti
        p = np.pad(x, [(r + 1, r) if k == asse else (0, 0) for k in range(2)], mode='edge')
        c = np.cumsum(p, axis=asse, dtype=np.float64)
        n = x.shape[asse]
        return ((np.take(c, range(2 * r + 1, 2 * r + 1 + n), axis=asse) - np.take(c, range(n), axis=asse)) / (2 * r + 1)).astype(np.float32)

    def sfoca(x):
        # tre passate di media mobile approssimano una gaussiana di raggio circa 18 px
        for _ in range(3):
            x = scatola(scatola(x, 10, 0), 10, 1)
        return x
    peso = sfoca(fondo_peso) + 1e-4
    vecchio = np.stack([sfoca(rgb[..., c] * fondo_peso) / peso for c in range(3)], -1)

    # Decontaminazione: dove il soggetto è semitrasparente, togli il vecchio fondo dal colore
    am = np.clip(a, 1e-3, 1)[..., None]
    soggetto = np.where(a[..., None] > 0.98, rgb, np.clip((rgb - (1 - am) * vecchio) / am, 0, 1))
    nuovo = np.array(FONDO, np.float32) / 255
    composto = soggetto * a[..., None] + nuovo * (1 - a[..., None])

    occhi_y = (v['occhioSx'][1] + v['occhioDx'][1]) / 2
    occhi_x = (v['occhioSx'][0] + v['occhioDx'][0]) / 2
    vx, _, vw, _ = v['volto']
    cima = sommita(a, vx, vx + vw)
    testa = v['mento'] - cima
    alto = testa / TESTA
    largo = alto * RAPPORTO
    top = occhi_y - OCCHI * alto
    left = occhi_x - largo / 2

    # Il riquadro può uscire dall'originale solo dove c'è fondo: si estende con il tono piatto
    tela = Image.new('RGB', (int(np.ceil(largo)) + 4, int(np.ceil(alto)) + 4), FONDO)
    sorgente = Image.fromarray((composto * 255 + 0.5).astype(np.uint8))
    tela.paste(sorgente, (int(round(-left)), int(round(-top))))
    tela = tela.crop((0, 0, int(round(largo)), int(round(alto))))

    fuori = {
        'sinistra': max(0, -left), 'sopra': max(0, -top),
        'destra': max(0, left + largo - im.width), 'sotto': max(0, top + alto - im.height),
    }
    for lato in ('sinistra', 'destra', 'sotto'):
        if fuori[lato] > 0.5:
            # Su questi lati c'è il corpo: estenderlo con il fondo lo taglierebbe di netto
            raise SystemExit(f'{nome}: il ritaglio esce dall\'originale a {lato} di {fuori[lato]:.0f} px')

    for w in LARGHEZZE[nome]:
        h = round(w / RAPPORTO)
        if w > tela.width:
            raise SystemExit(f'{nome}: {w} px richiesti, ritaglio largo solo {tela.width}')
        r = tela.resize((w, h), Image.LANCZOS)
        pulita = Image.frombytes('RGB', r.size, r.tobytes())  # solo pixel, nessun metadato
        pulita.save(USCITA / f'{nome}-{w}.webp', 'WEBP', quality=86, method=6)
        pulita.save(USCITA / f'{nome}-{w}.avif', 'AVIF', quality=72, speed=4)
    if ANTEPRIMA:
        tela.save(Path(ANTEPRIMA) / f'{nome}.png')
    return {
        'nome': nome, 'ritaglio': [round(left), round(top), round(largo), round(alto)],
        'occhi': OCCHI, 'testa_px_originale': round(testa), 'fuori_sopra_px': round(fuori['sopra']),
    }


ANTEPRIMA = None  # settimo argomento facoltativo: cartella dove salvare il ritaglio intero, per controllarlo

if __name__ == '__main__':
    a = sys.argv[1:]
    ANTEPRIMA = a[6] if len(a) > 6 else None
    print(json.dumps([ritratto(a[0], a[1], a[2], 'federico-garau'), ritratto(a[3], a[4], a[5], 'francesco-cocola')], indent=1))
