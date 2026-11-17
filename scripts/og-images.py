# OWNER: Claude. Share-preview images for project pages.
# Project covers are WebP, which several link-preview crawlers (WhatsApp, some LinkedIn paths)
# don't render. This writes a 1200x630 JPEG per covered project to public/og/<slug>.jpg;
# scripts/prerender.mjs uses it when it exists. Re-run after changing a cover:
#   uv run --no-project --with pillow python scripts/og-images.py
import re, pathlib
from PIL import Image

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "src/data/projects.ts").read_text()
imports = dict(re.findall(r"^import (\w+) from '\.\./(assets/[^']+)';", src, re.M))
out = root / "public/og"; out.mkdir(exist_ok=True)
W, H, PAD, BG = 1200, 630, 56, (11, 13, 20)  # canvas = dark theme background

for block in re.split(r"\n  \{\n", src)[1:]:
    slug = re.search(r'slug: "([^"]+)"', block)
    cover = re.search(r"cover: \{ src: (\w+)", block)
    if not (slug and cover):
        continue
    shot = Image.open(root / "src" / imports[cover.group(1)]).convert("RGB")
    shot.thumbnail((W - 2 * PAD, H - 2 * PAD), Image.LANCZOS)
    canvas = Image.new("RGB", (W, H), BG)
    canvas.paste(shot, ((W - shot.width) // 2, (H - shot.height) // 2))
    canvas.save(out / f"{slug.group(1)}.jpg", quality=82, optimize=True, progressive=True)
    print(slug.group(1), shot.size)
