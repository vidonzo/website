#!/usr/bin/env python3
"""Draw a logo for each invented demo channel.

Nothing here refers to a real broadcaster: the names, the marks and the colours
are made up on purpose, so a marketing screenshot of the app carries no one
else's trademark. Each mark is a flat geometric glyph plus a wordmark set in a
system face — deliberately plain, so it reads as "a channel logo" at 100px
without imitating any particular one.
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logos")
S = 4                      # supersampling factor
W = H = 256                # final logo size

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

# name, category, glyph, ink, accent
CHANNELS = [
    ("Alpine Nature 4K",   "Nature",      "peaks",  "#5ee7c4", "#2b8f78"),
    ("Aurora News 24",     "News",        "bars",   "#7fb0ff", "#3358a8"),
    ("Blue Ridge Classics","Classics",    "reel",   "#9aa7ff", "#4a52b0"),
    ("Cascade Kids",       "Kids",        "blocks", "#ffd166", "#e08a2b"),
    ("Delta Documentary",  "Documentary", "delta",  "#c9d4e3", "#5d6b7d"),
    ("Echo Music Live",    "Music",       "wave",   "#ff8fd0", "#b0398c"),
    ("Fjord Explorer",     "Travel",      "compass","#6fd7f0", "#2678a0"),
    ("Golden Age Cinema",  "Movies",      "reel",   "#ffcf6b", "#a8761c"),
    ("Harbor Sports Desk", "Sports",      "ring",   "#8ef08a", "#2f8a3c"),
    ("Ivory Kitchen",      "Food",        "blocks", "#ffb08a", "#b55a34"),
    ("Lumen Science",      "Science",     "atom",   "#8fe1ff", "#2f7fa8"),
    ("Meridian World",     "News",        "globe",  "#a5b4c8", "#4a5a70"),
    ("Nightfall Cinema",   "Movies",      "reel",   "#b79bff", "#5b3fa8"),
    ("Orchard Lifestyle",  "Lifestyle",   "ring",   "#a8e6a3", "#3f8f52"),
    ("Prairie Classics",   "Classics",    "peaks",  "#e0c9a6", "#8a6a3c"),
    ("Quartz Tech Today",  "Science",     "atom",   "#9fe8d8", "#2c8877"),
    ("Riverside Kids",     "Kids",        "blocks", "#7fd4ff", "#2b7fb0"),
    ("Summit Sports",      "Sports",      "peaks",  "#ffe08a", "#b08a1c"),
]


def slug(name):
    return name.lower().replace(" ", "-").replace("4k", "4k")


def glyph(d, kind, box, ink, accent):
    x, y, w, h = box
    cx, cy = x + w / 2, y + h / 2
    if kind == "peaks":
        d.polygon([(x, y + h), (x + w * 0.38, y), (x + w * 0.66, y + h)], fill=ink)
        d.polygon([(x + w * 0.42, y + h), (x + w * 0.74, y + h * 0.3),
                   (x + w, y + h)], fill=accent)
    elif kind == "bars":
        for i, f in enumerate((0.45, 0.75, 1.0)):
            bw = w / 4.4
            bx = x + i * (w / 3)
            d.rounded_rectangle([bx, y + h * (1 - f), bx + bw, y + h],
                                radius=bw / 3, fill=ink if i % 2 == 0 else accent)
    elif kind == "reel":
        d.ellipse([x, y, x + w, y + h], outline=ink, width=int(w * 0.12))
        r = w * 0.13
        for dx, dy in ((0, -0.28), (0.28, 0.1), (-0.28, 0.1)):
            d.ellipse([cx + dx * w - r, cy + dy * h - r,
                       cx + dx * w + r, cy + dy * h + r], fill=accent)
    elif kind == "blocks":
        g = w * 0.08
        s = (w - g) / 2
        for i, (ux, uy) in enumerate(((0, 0), (1, 0), (0, 1), (1, 1))):
            bx, by = x + ux * (s + g), y + uy * (s + g)
            d.rounded_rectangle([bx, by, bx + s, by + s], radius=s * 0.28,
                                fill=ink if i in (0, 3) else accent)
    elif kind == "delta":
        d.polygon([(cx, y), (x + w, y + h), (x, y + h)], outline=ink,
                  width=int(w * 0.11))
        d.polygon([(cx, y + h * 0.42), (x + w * 0.78, y + h), (x + w * 0.22, y + h)],
                  fill=accent)
    elif kind == "wave":
        n = 5
        for i in range(n):
            f = (0.35, 0.7, 1.0, 0.6, 0.3)[i]
            bw = w / (n * 1.7)
            bx = x + i * (w / n)
            d.rounded_rectangle([bx, cy - h * f / 2, bx + bw, cy + h * f / 2],
                                radius=bw / 2, fill=ink if i % 2 == 0 else accent)
    elif kind == "compass":
        d.ellipse([x, y, x + w, y + h], outline=ink, width=int(w * 0.1))
        d.polygon([(cx, y + h * 0.2), (cx + w * 0.16, cy), (cx, y + h * 0.8),
                   (cx - w * 0.16, cy)], fill=accent)
    elif kind == "ring":
        d.ellipse([x, y, x + w, y + h], outline=ink, width=int(w * 0.14))
        d.ellipse([cx - w * 0.16, cy - h * 0.16, cx + w * 0.16, cy + h * 0.16],
                  fill=accent)
    elif kind == "atom":
        d.ellipse([x, cy - h * 0.22, x + w, cy + h * 0.22], outline=ink,
                  width=int(w * 0.08))
        d.ellipse([cx - w * 0.22, y, cx + w * 0.22, y + h], outline=accent,
                  width=int(w * 0.08))
        d.ellipse([cx - w * 0.1, cy - h * 0.1, cx + w * 0.1, cy + h * 0.1], fill=ink)
    elif kind == "globe":
        d.ellipse([x, y, x + w, y + h], outline=ink, width=int(w * 0.09))
        d.ellipse([cx - w * 0.22, y, cx + w * 0.22, y + h], outline=accent,
                  width=int(w * 0.07))
        d.line([x + w * 0.06, cy, x + w * 0.94, cy], fill=accent, width=int(w * 0.07))


def wordmark(d, name, ink):
    """Two short lines of the invented name, centred under the glyph."""
    words = name.split()
    if len(words) > 2:
        lines = [" ".join(words[:len(words) // 2]), " ".join(words[len(words) // 2:])]
    else:
        lines = words
    size = int(46 * S)
    while size > 8 * S:
        f = ImageFont.truetype(BOLD, size)
        if max(d.textlength(l, font=f) for l in lines) <= W * S * 0.94:
            break
        size -= 2
    f = ImageFont.truetype(BOLD, size)
    top = H * S * (0.60 if len(lines) > 1 else 0.66)
    for i, l in enumerate(lines):
        tw = d.textlength(l, font=f)
        d.text(((W * S - tw) / 2, top + i * size * 1.15), l, font=f, fill=ink)


def render(name, kind, ink, accent):
    img = Image.new("RGBA", (W * S, H * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    g = W * S * 0.40
    glyph(d, kind, ((W * S - g) / 2, H * S * 0.10, g, g), ink, accent)
    wordmark(d, name, ink)
    img = img.resize((W, H), Image.LANCZOS)
    img.save(os.path.join(OUT, slug(name) + ".png"))


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, cat, kind, ink, accent in CHANNELS:
        render(name, kind, ink, accent)
    base = "http://localhost:8787"
    lines = ["#EXTM3U"]
    for name, cat, _, _, _ in CHANNELS:
        lines.append(
            f'#EXTINF:-1 tvg-id="{slug(name)}" tvg-name="{name}" '
            f'tvg-logo="{base}/logos/{slug(name)}.png" group-title="{cat}",{name}'
        )
        lines.append(f"{base}/streams/{slug(name)}.m3u8")
    open(os.path.join(os.path.dirname(OUT), "demo.m3u"), "w").write("\n".join(lines) + "\n")
    print(f"{len(CHANNELS)} channels")
