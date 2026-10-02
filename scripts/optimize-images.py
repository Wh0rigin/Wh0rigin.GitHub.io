"""Build transmission copies; keep original PNG artwork unchanged. Requires Pillow."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
for source in (root / 'src/assets/logo').glob('*.png'):
    with Image.open(source) as image:
        image.save(source.with_suffix('.webp'), 'WEBP', lossless=True, method=6, exact=True)
        for width in (480, 960):
            if width >= image.width:
                continue
            size = (width, round(image.height * width / image.width))
            image.resize(size, Image.Resampling.LANCZOS).save(
                source.with_name(f'{source.stem}-{width}.webp'),
                'WEBP', lossless=True, method=6, exact=True,
            )

for source in (root / 'src/assets/education').glob('*.png'):
    with Image.open(source) as image:
        image.thumbnail((256, 256), Image.Resampling.LANCZOS)
        image.save(source.with_name(f'{source.stem}-256.webp'),
                   'WEBP', lossless=True, method=6, exact=True)
