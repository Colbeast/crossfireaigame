"""Generates the low-res stylized textures in assets/textures and bundles them
into assets/js/textures.js (as data URIs, so the game also works from file://)."""
import os, random, base64, io, math
from PIL import Image, ImageDraw
R = os.path.join(os.path.dirname(__file__), '..')
OUT = os.path.join(R, 'assets', 'textures'); os.makedirs(OUT, exist_ok=True)
N = 64
def new(v=235): return Image.new('RGB', (N, N), (v, v, v))
def noise(im, a, seed, blot=0):
    rnd = random.Random(seed); px = im.load()
    for y in range(N):
        for x in range(N):
            r, g, b = px[x, y]; d = rnd.randint(-a, a)
            if blot: d += int(blot * math.sin(x * .19 + seed) * math.cos(y * .23 + seed * 2))
            px[x, y] = tuple(max(0, min(255, c + d)) for c in (r, g, b))
    return im
def gray(v): return (v, v, v)
T = {}
# p: plain plaster
im = new(238); noise(im, 6, 1, 6); T['p'] = im
# b: brick
im = new(178); d = ImageDraw.Draw(im); rnd = random.Random(2)
for r in range(8):
    for q in range(-1, 5):
        v = rnd.randint(222, 250); x = q * 16 + (8 if r % 2 else 0)
        d.rectangle([x + 1, r * 8 + 1, x + 15, r * 8 + 7], fill=gray(v))
        d.line([x + 1, r * 8 + 7, x + 15, r * 8 + 7], fill=gray(v - 22))
noise(im, 5, 3); T['b'] = im
# w: horizontal wood siding / planks
im = new(); d = ImageDraw.Draw(im); rnd = random.Random(4)
for r in range(8):
    v = rnd.randint(215, 245)
    for y in range(8):
        d.line([0, r * 8 + y, N, r * 8 + y], fill=gray(v - y * 3))
    d.line([0, r * 8 + 7, N, r * 8 + 7], fill=gray(150)); d.line([0, r * 8, N, r * 8], fill=gray(250))
    for k in range(3):
        x = rnd.randint(0, N); d.line([x, r * 8 + 2, x + rnd.randint(6, 18), r * 8 + 2 + rnd.randint(0, 3)], fill=gray(v - 25))
    xs = rnd.randint(4, 60); d.line([xs, r * 8, xs, r * 8 + 7], fill=gray(160))
noise(im, 4, 5); T['w'] = im
# x: crate
im = new(); d = ImageDraw.Draw(im)
for r in range(4):
    v = 225 + (r % 2) * 14; d.rectangle([0, r * 16, N, r * 16 + 15], fill=gray(v)); d.line([0, r * 16 + 15, N, r * 16 + 15], fill=gray(150))
d.line([6, 6, 57, 57], fill=gray(185), width=7); d.rectangle([0, 0, 63, 63], outline=gray(165), width=6)
for c in [(4, 4), (59, 4), (4, 59), (59, 59)]: d.rectangle([c[0] - 1, c[1] - 1, c[0] + 1, c[1] + 1], fill=gray(90))
noise(im, 5, 6); T['x'] = im
# m: corrugated metal
im = new(); px = im.load()
for x in range(N):
    v = int(212 + 30 * math.sin(x / N * math.pi * 16))
    for y in range(N): px[x, y] = gray(v)
d = ImageDraw.Draw(im); d.line([0, 0, N, 0], fill=gray(150)); noise(im, 5, 7, 4); T['m'] = im
# c: concrete slabs
im = new(225); noise(im, 9, 8, 8); d = ImageDraw.Draw(im)
d.line([0, 0, N, 0], fill=gray(170)); d.line([0, 0, 0, N], fill=gray(170))
rnd = random.Random(9)
for i in range(18): x, y = rnd.randint(0, 63), rnd.randint(0, 63); d.point((x, y), fill=gray(160))
T['c'] = im
# f: grass / ground detail (multiplied by terrain vertex colours)
im = new(225); px = im.load(); rnd = random.Random(10)
for y in range(N):
    for x in range(N): v = rnd.randint(205, 248); px[x, y] = gray(v)
d = ImageDraw.Draw(im)
for i in range(70):
    x, y = rnd.randint(0, 63), rnd.randint(0, 63); v = rnd.choice([255, 190, 180])
    d.line([x, y, x + rnd.choice([-1, 0, 1]), y - rnd.randint(1, 3)], fill=gray(v))
T['f'] = im
# g: skyscraper facade (coloured windows)
im = Image.new('RGB', (N, N), (200, 205, 210)); d = ImageDraw.Draw(im); rnd = random.Random(11)
for r in range(4):
    for q in range(4):
        lit = rnd.random() < .16; x, y = q * 16 + 2, r * 16 + 3
        top = (255, 226, 150) if lit else (52, 74, 98); bot = (235, 200, 120) if lit else (30, 44, 60)
        for yy in range(11):
            t = yy / 10; col = tuple(int(top[i] * (1 - t) + bot[i] * t) for i in range(3)); d.line([x, y + yy, x + 11, y + yy], fill=col)
        if not lit: d.line([x + 1, y + 1, x + 4, y + 1], fill=(120, 150, 180))
        d.line([x, y + 12, x + 12, y + 12], fill=(150, 155, 160))
noise(im, 3, 12); T['g'] = im
# t: roof shingles
im = new(); d = ImageDraw.Draw(im); rnd = random.Random(13)
for r in range(8):
    for q in range(-1, 9):
        v = rnd.randint(205, 245); x = q * 8 + (4 if r % 2 else 0)
        d.rectangle([x, r * 8, x + 7, r * 8 + 7], fill=gray(v)); d.line([x, r * 8 + 7, x + 7, r * 8 + 7], fill=gray(120)); d.line([x, r * 8, x, r * 8 + 7], fill=gray(170))
noise(im, 4, 19); T['t'] = im
# o: door, vertical planks
im = new(); d = ImageDraw.Draw(im); rnd = random.Random(14)
for q in range(4):
    v = rnd.randint(220, 245); d.rectangle([q * 16, 0, q * 16 + 15, N], fill=gray(v)); d.line([q * 16 + 15, 0, q * 16 + 15, N], fill=gray(140))
d.rectangle([0, 6, N, 10], fill=gray(195)); d.rectangle([0, 52, N, 56], fill=gray(195)); noise(im, 4, 15); T['o'] = im
# r: rock / stone
im = new(205); noise(im, 10, 16, 18); d = ImageDraw.Draw(im); rnd = random.Random(17)
for i in range(5):
    x, y = rnd.randint(0, 63), rnd.randint(0, 63); pts = [(x, y)]
    for k in range(4): x += rnd.randint(-6, 6); y += rnd.randint(2, 8); pts.append((x, y))
    d.line(pts, fill=gray(140), width=1)
T['r'] = im
T['e'] = noise(new(245), 3, 18)

# v: stucco / plaster render
im = new(232); noise(im, 7, 20, 10); d = ImageDraw.Draw(im); rnd = random.Random(21)
for i in range(40): x, y = rnd.randint(0, 63), rnd.randint(0, 63); d.point((x, y), fill=gray(212))
T['v'] = im
# h: clay barrel roof tiles
im = new(); px = im.load()
for y in range(N):
    for x in range(N):
        c = (x % 16) / 16; v = int(205 + 45 * math.sin(c * math.pi)); r8 = y % 16
        if r8 > 13: v -= 55
        px[x, y] = gray(max(0, v))
noise(im, 5, 22); T['h'] = im
# l: log cabin wall (horizontal round logs)
im = new(); px = im.load(); rnd = random.Random(23)
for y in range(N):
    t = (y % 16) / 16; v = int(150 + 95 * math.sin(t * math.pi))
    for x in range(N): px[x, y] = gray(max(0, min(255, v + rnd.randint(-6, 6))))
d = ImageDraw.Draw(im)
for i in range(10):
    y = rnd.randint(0, 63); x = rnd.randint(0, 50); d.line([x, y, x + rnd.randint(6, 14), y], fill=gray(175))
T['l'] = im
# s: cut stone blocks
im = new(160); d = ImageDraw.Draw(im); rnd = random.Random(24)
for r in range(4):
    off = 0 if r % 2 == 0 else 12
    for q in range(-1, 4):
        v = rnd.randint(200, 240); x = q * 24 + off
        d.rectangle([x + 1, r * 16 + 1, x + 22, r * 16 + 14], fill=gray(v))
noise(im, 8, 25, 6); T['s'] = im
# k: wood floor boards (run along x)
im = new(); d = ImageDraw.Draw(im); rnd = random.Random(26)
for r in range(8):
    v = rnd.randint(205, 245); d.rectangle([0, r * 8, N, r * 8 + 7], fill=gray(v)); d.line([0, r * 8 + 7, N, r * 8 + 7], fill=gray(140))
    x = rnd.randint(8, 56); d.line([x, r * 8, x, r * 8 + 7], fill=gray(150))
    for k in range(2): x = rnd.randint(0, 60); d.line([x, r * 8 + 3, x + 6, r * 8 + 3], fill=gray(v - 20))
noise(im, 3, 27); T['k'] = im
# q: carpet
im = new(225); noise(im, 12, 28); T['q'] = im
# i: checker tile floor
im = new(); d = ImageDraw.Draw(im)
for r in range(4):
    for q in range(4): d.rectangle([q * 16, r * 16, q * 16 + 15, r * 16 + 15], fill=gray(250 if (r + q) % 2 == 0 else 185))
for k in range(0, 64, 16): d.line([k, 0, k, 63], fill=gray(150)); d.line([0, k, 63, k], fill=gray(150))
noise(im, 3, 29); T['i'] = im
# d: interior wallpaper (subtle stripes)
im = new(240); px = im.load()
for x in range(N):
    if x % 16 in (0, 1, 8): 
        for y in range(N): px[x, y] = gray(226)
noise(im, 3, 30); T['d'] = im
# a: asphalt, u = across road (yellow dashes at centre, white edge lines)
im = Image.new('RGB', (N, N), (86, 88, 92)); noise(im, 10, 31); d = ImageDraw.Draw(im)
d.rectangle([3, 0, 4, 63], fill=(225, 225, 220)); d.rectangle([59, 0, 60, 63], fill=(225, 225, 220))
d.rectangle([31, 0, 32, 30], fill=(232, 196, 72))
T['a'] = im
# u: sidewalk / paving slabs
im = new(225); noise(im, 6, 32, 4); d = ImageDraw.Draw(im)
d.line([0, 0, 63, 0], fill=gray(160)); d.line([0, 0, 0, 63], fill=gray(160)); d.line([32, 0, 32, 63], fill=gray(175)); d.line([0, 32, 63, 32], fill=gray(175))
T['u'] = im
# j: dirt track
im = new(220); noise(im, 16, 33, 14); d = ImageDraw.Draw(im); rnd = random.Random(34)
for i in range(90): x, y = rnd.randint(0, 63), rnd.randint(0, 63); d.point((x, y), fill=gray(rnd.choice([150, 250])))
T['j'] = im
# y: sectional garage door
im = new(240); d = ImageDraw.Draw(im)
for r in range(4):
    d.line([0, r * 16, 63, r * 16], fill=gray(150)); d.line([0, r * 16 + 1, 63, r * 16 + 1], fill=gray(255))
    for q in range(4): d.rectangle([q * 16 + 3, r * 16 + 4, q * 16 + 13, r * 16 + 12], outline=gray(205))
T['y'] = im
# 1: panelled front door (64x128, mapped on the whole door face)
im = Image.new('RGB', (64, 128), (232, 232, 232)); d = ImageDraw.Draw(im)
for (x0, y0, x1, y1) in [(9, 10, 29, 44), (35, 10, 55, 44), (9, 52, 29, 82), (35, 52, 55, 82), (9, 90, 29, 120), (35, 90, 55, 120)]:
    d.rectangle([x0, y0, x1, y1], fill=gray(212)); d.line([x0, y0, x1, y0], fill=gray(165)); d.line([x0, y0, x0, y1], fill=gray(165))
    d.line([x0, y1, x1, y1], fill=gray(250)); d.line([x1, y0, x1, y1], fill=gray(250)); d.rectangle([x0 + 4, y0 + 4, x1 - 4, y1 - 4], fill=gray(226))
d.rectangle([0, 0, 63, 127], outline=gray(170), width=2)
T['1'] = im

# z: palm thatch (layered straw bundles)
im = Image.new('RGB', (N, N), (214, 190, 128)); d = ImageDraw.Draw(im); rnd = random.Random(41)
for row in range(8):
    y0 = row * 8
    d.line([0, y0, 63, y0], fill=(150, 124, 70)); d.line([0, y0 + 1, 63, y0 + 1], fill=(178, 150, 92))
    for i in range(70):
        x = rnd.randint(0, 63); l = rnd.randint(3, 7); c = rnd.choice([(232, 210, 146), (196, 168, 104), (170, 142, 86), (240, 222, 160)])
        d.line([x, y0 + 2, x + rnd.randint(-1, 1), y0 + 2 + l], fill=c)
noise(im, 6, 42); T['z'] = im
# 2: coral limestone blocks (pale, porous)
im = Image.new('RGB', (N, N), (226, 216, 194)); d = ImageDraw.Draw(im); rnd = random.Random(43)
for r in range(4):
    y = r * 16; off = (r % 2) * 16
    d.line([0, y, 63, y], fill=(176, 164, 140))
    for c in range(3): x = (c * 32 + off) % 64; d.line([x, y, x, y + 15], fill=(176, 164, 140))
for i in range(160):
    x, y = rnd.randint(0, 63), rnd.randint(0, 63); rr = rnd.choice([0, 0, 1]); d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=rnd.choice([(196, 184, 160), (206, 194, 170), (238, 230, 212)]))
noise(im, 6, 44, 5); T['2'] = im
# 4: weathered dock planks (boards run along x, dark gaps)
im = Image.new('RGB', (N, N), (196, 176, 146)); d = ImageDraw.Draw(im); rnd = random.Random(45)
for r in range(5):
    y = int(r * 12.8); d.rectangle([0, y, 63, y + 1], fill=(92, 78, 60))
    sh = rnd.randint(-16, 16); d.rectangle([0, y + 2, 63, y + 11], fill=tuple(max(0, min(255, c + sh)) for c in (196, 176, 146)))
    x = rnd.randint(8, 56); d.line([x, y + 2, x, y + 11], fill=(120, 104, 84))
    for q in range(6): d.point((rnd.randint(0, 63), y + rnd.randint(3, 10)), fill=(140, 124, 100))
noise(im, 7, 46); T['4'] = im

# 5: packed ice / snow blocks for the igloo (pale blue-white blocks, soft blue seams)
im = Image.new('RGB', (N, N), (232, 242, 250)); d = ImageDraw.Draw(im); rnd = random.Random(47)
for r in range(4):
    y = r * 16; off = (r % 2) * 16
    d.line([0, y, 63, y], fill=(168, 196, 222)); d.line([0, y + 1, 63, y + 1], fill=(250, 253, 255))
    for c in range(3):
        x = (c * 32 + off) % 64; d.line([x, y, x, y + 15], fill=(168, 196, 222)); d.line([x + 1, y + 2, x + 1, y + 15], fill=(250, 253, 255))
for i in range(120):
    x, y = rnd.randint(0, 63), rnd.randint(0, 63); d.point((x, y), fill=rnd.choice([(214, 230, 244), (245, 250, 255), (200, 222, 240)]))
noise(im, 4, 48, 3); T['5'] = im

# 3: book spines (three shelves' worth of coloured spines, tiles 1 m)
im = Image.new('RGB', (N, N), (40, 30, 24)); d = ImageDraw.Draw(im); rnd = random.Random(51)
cols = [(168, 52, 44), (46, 84, 140), (60, 120, 70), (200, 170, 80), (120, 70, 120), (220, 214, 200), (80, 60, 44), (40, 40, 48), (180, 100, 50), (90, 140, 160)]
for band in range(3):
    y0 = band * 21 + 1; x = 0
    while x < 64:
        w = rnd.randint(2, 5); h = rnd.randint(14, 20); c = rnd.choice(cols)
        d.rectangle([x, y0 + 20 - h, x + w - 1, y0 + 19], fill=c)
        d.line([x, y0 + 20 - h + 3, x + w - 1, y0 + 20 - h + 3], fill=tuple(min(255, v + 50) for v in c))
        if rnd.random() < .4: d.line([x, y0 + 15, x + w - 1, y0 + 15], fill=(230, 210, 140))
        x += w + (1 if rnd.random() < .15 else 0)
noise(im, 4, 52); T['3'] = im
# 6: patterned rug (border, medallion, small motifs), multiplied by the rug colour
im = Image.new('RGB', (N, N), (200, 200, 200)); d = ImageDraw.Draw(im)
d.rectangle([0, 0, 63, 63], outline=(130, 130, 130), width=4); d.rectangle([6, 6, 57, 57], outline=(245, 245, 245), width=2)
d.polygon([(32, 14), (50, 32), (32, 50), (14, 32)], outline=(120, 120, 120), fill=(235, 235, 235)); d.polygon([(32, 22), (42, 32), (32, 42), (22, 32)], fill=(150, 150, 150))
for (x, y) in [(14, 14), (50, 14), (14, 50), (50, 50)]: d.rectangle([x - 3, y - 3, x + 3, y + 3], fill=(160, 160, 160))
noise(im, 6, 53); T['6'] = im
# 7: small square wall/floor tiles (8 x 8 per metre) with grout
im = Image.new('RGB', (N, N), (236, 236, 232)); d = ImageDraw.Draw(im); rnd = random.Random(54)
for i in range(8):
    for j in range(8):
        v = rnd.randint(-8, 8); d.rectangle([i * 8 + 1, j * 8 + 1, i * 8 + 7, j * 8 + 7], fill=(236 + v // 2, 236 + v // 2, 232 + v // 2))
    d.line([i * 8, 0, i * 8, 63], fill=(176, 176, 172)); d.line([0, i * 8, 63, i * 8], fill=(176, 176, 172))
T['7'] = im
# 8: cabinet door: frame and raised panel with a small knob (one door per tile)
im = Image.new('RGB', (N, N), (226, 226, 226)); d = ImageDraw.Draw(im)
d.rectangle([0, 0, 63, 63], outline=(150, 150, 150)); d.rectangle([7, 7, 56, 56], outline=(180, 180, 180), width=2); d.rectangle([12, 12, 51, 51], fill=(240, 240, 240))
d.rectangle([50, 28, 53, 35], fill=(90, 90, 90)); noise(im, 4, 55); T['8'] = im
# 9: tatami mats (straw weave with dark cloth borders)
im = Image.new('RGB', (N, N), (200, 196, 140)); d = ImageDraw.Draw(im); rnd = random.Random(56)
for y in range(64):
    if y % 2 == 0: d.line([0, y, 63, y], fill=(186, 182, 124))
d.rectangle([0, 0, 63, 2], fill=(60, 64, 44)); d.rectangle([0, 61, 63, 63], fill=(60, 64, 44)); d.rectangle([31, 0, 32, 63], fill=(60, 64, 44))
noise(im, 6, 57); T['9'] = im

os.makedirs(os.path.join(R, 'assets', 'js'), exist_ok=True)
js = ['/* generated by tools/build_textures.py - do not edit by hand */', 'window.CF_TEX={']
for k, im in T.items():
    im.save(os.path.join(OUT, k + '.png'))
    b = io.BytesIO(); im.save(b, 'PNG'); js.append("'%s':'data:image/png;base64,%s'," % (k, base64.b64encode(b.getvalue()).decode()))
js.append('};'); open(os.path.join(R, 'assets', 'js', 'textures.js'), 'w').write('\n'.join(js) + '\n')
print('ok', list(T))
