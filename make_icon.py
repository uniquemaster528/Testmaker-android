import fitz

svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
<rect width="512" height="512" rx="96" fill="#121417"/>
<circle cx="256" cy="256" r="150" fill="none" stroke="#4096ff" stroke-width="36"/>
<circle cx="256" cy="256" r="60" fill="#2ecc71"/>
</svg>'''

doc = fitz.open(stream=svg.encode(), filetype="svg")
page = doc[0]
zoom = 512 / page.rect.width
pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
pix.save("icon-512.png")
print("✅ icon-512.png:", pix.width, "x", pix.height)
svg_screenshot = '''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
<rect width="1280" height="720" fill="#121417"/>
<rect x="40" y="40" width="1200" height="60" rx="10" fill="#1c2026"/>
<rect x="60" y="120" width="1160" height="560" rx="10" fill="#1c2026"/>
<circle cx="640" cy="300" r="100" fill="none" stroke="#4096ff" stroke-width="20"/>
<circle cx="640" cy="300" r="40" fill="#2ecc71"/>
<text x="640" y="500" font-size="48" fill="#eeeeee" text-anchor="middle" font-family="sans-serif">Dijital Optik - Tablet</text>
</svg>'''

doc2 = fitz.open(stream=svg_screenshot.encode(), filetype="svg")
pg2 = doc2[0]
pix2 = pg2.get_pixmap(matrix=fitz.Matrix(1280/pg2.rect.width, 720/pg2.rect.height), alpha=False)
pix2.save("screenshot-1280.png")
print("✅ screenshot-1280.png:", pix2.width, "x", pix2.height)