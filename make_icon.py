# make_icon.py
import fitz
doc = fitz.open("icon.svg")
page = doc[0]
zoom = 512 / page.rect.width
pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
pix.save("icon-512.png")
print("✅ icon-512.png hazır:", pix.width, "x", pix.height)