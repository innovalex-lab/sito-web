from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def export(source, stem, widths, quality=82, background=None):
    source_image = Image.open(ASSETS / source)
    if background and source_image.mode in ("RGBA", "LA"):
        image = Image.new("RGBA", source_image.size, (*background, 255))
        image.alpha_composite(source_image.convert("RGBA"))
        image = image.convert("RGB")
    else:
        image = source_image.convert("RGB")
    for width in widths:
        ratio = width / image.width
        height = round(image.height * ratio)
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(ASSETS / f"{stem}-{width}.webp", "WEBP", quality=quality, method=6)
        resized.save(ASSETS / f"{stem}-{width}.avif", "AVIF", quality=quality, speed=6)


export("hero-studio.png", "hero-studio", [960, 1600], 80)
export("innovalex-logo.png", "innovalex-logo", [240, 400], 86, background=(255, 255, 255))
export("estensione-browser.jpg", "estensione-browser", [640, 1200], 82)
export("report-economico.jpg", "report-economico", [640, 1200], 82)
export("dashboard-collaboratori.png", "dashboard-collaboratori", [640, 1200], 82)
export("valore-per-socio.png", "valore-per-socio", [640, 1200], 82)
export("federico-garau-founder.png", "federico-garau-founder", [640, 900], 84)

social = Image.open(ASSETS / "innovalex-social.png").convert("RGBA")
social.resize((32, 32), Image.Resampling.LANCZOS).save(ASSETS / "favicon-32.png", optimize=True)
social.resize((180, 180), Image.Resampling.LANCZOS).save(ASSETS / "apple-touch-icon.png", optimize=True)
