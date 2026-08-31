# make_icon.py
import fitz
doc = fitz.open("icon.svg")
page = doc[0]
zoom = 512 / page.rect.width
pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
pix.save("icon-512.png")
print("✅ icon-512.png hazır:", pix.width, "x", pix.height)
svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
<rect width="1280" height="720" fill="#121417"/>
<circle cx="640" cy="300" r="140" fill="none" stroke="#4096ff" stroke-width="30"/>
<circle cx="640" cy="300" r="55" fill="#2ecc71"/>
<text x="640" y="560" font-size="64" fill="#eeeeee" text-anchor="middle" font-family="sans-serif">Dijital Optik - Tablet</text>
</svg>'''
doc = fitz.open(stream=svg.encode(), filetype="svg")
pg = doc[0]
pix = pg.get_pixmap(matrix=fitz.Matrix(1280/pg.rect.width, 720/pg.rect.height))
pix.save("screenshot-1280.png")
print("✅ screenshot-1280.png hazır")