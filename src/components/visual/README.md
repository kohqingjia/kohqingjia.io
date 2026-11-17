# Pixel artwork

The project sprites use a hand-drawn 32×32 integer grid and a shared eight-colour palette. `draw-sprites.py` is their editable source; run `python3 src/components/visual/draw-sprites.py` from the repository root to export them to `public/sprites/`. It has no dependencies and is not part of the production bundle.

`workshop.svg` and `buddy.svg` are directly authored SVGs. The workshop uses the same palette at a larger grid size. The avatar's clothing is based on QJ's supplied photo; no generated likeness is used. Display individual sprites at 64, 128 or 256 pixels with `image-rendering: pixelated`.

Fonts are self-hosted Urbanist (variable Latin; QJ chose it as a free look-alike of treatsure's licensed Bill Corp Mx) and IBM Plex Mono (Latin 400), both from Fontsource 5.3.0, with their OFL licences in `public/fonts/`. The selected skill logos are from Simple Icons 16.38.0; its CC0 licence is in `public/icons/`. No font service or icon library is loaded at runtime.
