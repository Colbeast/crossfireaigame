#!/usr/bin/env python3
# OpenStreetMap export of Cody, Wyoming -> compact game data (js/cody.js)
# x = metres east of the export centre, z = metres south (north is -z)
import xml.etree.ElementTree as ET, math, json, random, sys, collections
random.seed(7)
SRC = sys.argv[1] if len(sys.argv) > 1 else 'cody.osm'
OUT = sys.argv[2] if len(sys.argv) > 2 else '/home/claude/work/out/js/cody.js'
t = ET.parse(SRC).getroot()
bd = t.find('bounds')
la0, la1, lo0, lo1 = (float(bd.get(k)) for k in ('minlat', 'maxlat', 'minlon', 'maxlon'))
LAT0, LON0 = (la0 + la1) / 2, (lo0 + lo1) / 2
KX, KZ = 111320 * math.cos(math.radians(LAT0)), 111124
P = lambda ll: ((ll[1] - LON0) * KX, -(ll[0] - LAT0) * KZ)
XB, ZB = (lo1 - lo0) / 2 * KX, (la1 - la0) / 2 * KZ
print('half extents', round(XB), round(ZB))
N = {n.get('id'): P((float(n.get('lat')), float(n.get('lon')))) for n in t.iter('node')}
NT = {}
for n in t.iter('node'):
    tg = {x.get('k'): x.get('v') for x in n.iter('tag')}
    if tg: NT[n.get('id')] = tg
WAYS = []
for w in t.iter('way'):
    tg = {x.get('k'): x.get('v') for x in w.iter('tag')}
    pts = [N[nd.get('ref')] for nd in w.iter('nd') if nd.get('ref') in N]
    WAYS.append((w.get('id'), tg, pts))
WID = {i: (tg, pts) for i, tg, pts in WAYS}
# multipolygon relations: use their outer rings
for r in t.iter('relation'):
    tg = {x.get('k'): x.get('v') for x in r.iter('tag')}
    if tg.get('type') != 'multipolygon': continue
    outs = [WID[m.get('ref')][1] for m in r.iter('member') if m.get('type') == 'way' and m.get('role') == 'outer' and m.get('ref') in WID]
    # join open rings
    rings, cur = [], None
    segs = [list(s) for s in outs if len(s) > 1]
    while segs:
        cur = segs.pop(0)
        changed = True
        while changed and cur[0] != cur[-1]:
            changed = False
            for i, s in enumerate(segs):
                if s[0] == cur[-1]: cur += s[1:]; segs.pop(i); changed = True; break
                if s[-1] == cur[-1]: cur += s[-2::-1]; segs.pop(i); changed = True; break
        rings.append(cur)
    for rg in rings: WAYS.append(('r' + r.get('id'), tg, rg))

def inbox(pts, m=40):
    return any(abs(x) < XB + m and abs(z) < ZB + m for x, z in pts)
def area(p):
    return abs(sum(p[i][0] * p[i - 1][1] - p[i - 1][0] * p[i][1] for i in range(len(p)))) / 2
def cen(p):
    return sum(q[0] for q in p) / len(p), sum(q[1] for q in p) / len(p)
def ring(p):
    if len(p) > 2 and p[0] == p[-1]: p = p[:-1]
    return p
R1 = lambda v: round(v, 1)
flat = lambda p: [R1(c) for q in p for c in q]

# ---------------- roads ----------------
RW = {'motorway': 16, 'trunk': 15, 'primary': 14, 'secondary': 12, 'tertiary': 11, 'residential': 9, 'unclassified': 8, 'living_street': 7,
      'trunk_link': 8, 'primary_link': 8, 'secondary_link': 8, 'tertiary_link': 7, 'service': 5, 'track': 4, 'footway': 2, 'path': 1.6,
      'cycleway': 2.4, 'pedestrian': 4, 'steps': 2, 'bridleway': 2}
RK = {'motorway': 0, 'trunk': 0, 'primary': 0, 'secondary': 0, 'tertiary': 0, 'trunk_link': 0, 'primary_link': 0, 'secondary_link': 0, 'tertiary_link': 0,
      'residential': 1, 'unclassified': 1, 'living_street': 1, 'service': 2, 'track': 3, 'footway': 4, 'pedestrian': 4, 'steps': 4, 'cycleway': 4, 'path': 3, 'bridleway': 3}
roads = []
for i, tg, pts in WAYS:
    h = tg.get('highway')
    if h in RW and len(pts) > 1 and inbox(pts) and tg.get('area') != 'yes':
        w = RW[h]
        if 'lanes' in tg:
            try: w = max(w, int(tg['lanes']) * 3.4 + (2 if RK[h] == 0 else 0))
            except ValueError: pass
        if 'width' in tg:
            try: w = max(3, float(tg['width'].split()[0]))
            except ValueError: pass
        k = RK[h]
        surf = tg.get('surface', '')
        if k == 2 and surf in ('gravel', 'unpaved', 'dirt', 'ground', 'fine_gravel', 'compacted'): k = 3
        if k == 1 and surf in ('gravel', 'unpaved', 'dirt', 'ground'): k = 3
        # sidewalks on town streets
        sw = 1 if (k in (0, 1) and h not in ('trunk_link', 'primary_link', 'secondary_link', 'tertiary_link')) else 0
        name = tg.get('name', '')
        if name == 'Sheridan Avenue' and h in ('trunk', 'primary', 'tertiary'): w = max(w, 22); sw = 2
        if tg.get('bridge') == 'yes': sw = 0
        cls = ['trunk', 'primary', 'secondary', 'tertiary', 'residential', 'unclassified', 'service', 'track', 'footway', 'path', 'cycleway', 'pedestrian', 'steps', 'living_street', 'trunk_link', 'primary_link', 'secondary_link', 'tertiary_link', 'bridleway', 'motorway'].index(h)
        roads.append([k, R1(w), sw, cls, 1 if tg.get('bridge') == 'yes' else 0] + flat(pts))
    a = tg.get('aeroway')
    if a in ('runway', 'taxiway') and len(pts) > 1 and inbox(pts):
        roads.append([5 if a == 'runway' else 2, 45 if a == 'runway' else 18, 0, 99, 0] + flat(pts))
rails = [flat(pts) for i, tg, pts in WAYS if tg.get('railway') in ('rail', 'abandoned', 'disused') and tg.get('railway') == 'rail' and inbox(pts)]
print('roads', len(roads), 'rails', len(rails))

# ---------------- areas painted on the ground ----------------
def atype(tg):
    if tg.get('natural') == 'water' or tg.get('water') or tg.get('landuse') in ('reservoir', 'basin'): return 'water'
    if tg.get('amenity') == 'parking' or tg.get('parking'): return 'parking'
    if tg.get('aeroway') == 'apron': return 'apron'
    if tg.get('leisure') == 'pitch':
        s = tg.get('sport', '')
        if s in ('baseball', 'softball'): return 'diamond'
        if s in ('tennis', 'basketball', 'pickleball'): return 'court'
        return 'field'
    if tg.get('leisure') == 'track': return 'track'
    if tg.get('leisure') == 'swimming_pool': return 'pool'
    if tg.get('leisure') == 'golf_course' or tg.get('golf'): return 'golf'
    if tg.get('leisure') in ('park', 'garden', 'playground', 'recreation_ground', 'dog_park') or tg.get('landuse') in ('recreation_ground', 'village_green'): return 'park'
    if tg.get('landuse') in ('grass', 'meadow') or tg.get('natural') in ('grassland',): return 'grass'
    if tg.get('natural') in ('sand', 'bare_rock', 'scree') or tg.get('landuse') in ('quarry',): return 'sand'
    if tg.get('natural') in ('wood', 'scrub') or tg.get('landuse') == 'forest': return 'wood'
    if tg.get('landuse') == 'cemetery' or tg.get('amenity') == 'grave_yard': return 'cemetery'
    if tg.get('landuse') in ('farmland', 'farmyard'): return 'farm'
    if tg.get('landuse') in ('retail', 'commercial'): return 'commercial'
    if tg.get('landuse') in ('industrial', 'railway', 'construction', 'brownfield'): return 'industrial'
    if tg.get('amenity') in ('school', 'college', 'university', 'hospital'): return 'campus'
    if tg.get('landuse') == 'residential': return 'residential'
    return None
ORDER = ['residential', 'farm', 'campus', 'commercial', 'industrial', 'grass', 'wood', 'golf', 'park', 'cemetery', 'sand', 'apron', 'parking', 'field', 'diamond', 'track', 'court', 'pool', 'water']
areas = []
for i, tg, pts in WAYS:
    if 'building' in tg or 'highway' in tg: continue
    ty = atype(tg)
    if not ty or len(pts) < 4 or pts[0] != pts[-1] or not inbox(pts): continue
    p = ring(pts)
    if area(p) < 20: continue
    areas.append((ORDER.index(ty), area(p), p, tg.get('name', '')))
areas.sort(key=lambda a: (a[0], -a[1]))
water = [flat(a[2]) for a in areas if ORDER[a[0]] == 'water' and a[1] > 400]
AR = [[a[0]] + flat(a[2]) for a in areas]
print('areas', collections.Counter(ORDER[a[0]] for a in areas))
streams = [[1 if tg.get('waterway') == 'canal' else 0] + flat(pts) for i, tg, pts in WAYS if tg.get('waterway') in ('stream', 'canal', 'ditch', 'drain') and inbox(pts)]
river = None
for i, tg, pts in WAYS:
    if tg.get('waterway') == 'river' and tg.get('name') == 'Shoshone River': river = pts
rv = flat([p for p in river if abs(p[0]) < XB + 1500 and abs(p[1]) < ZB + 1500])

# ---------------- buildings ----------------
CHAIN = {"McDonald's": ('BURGERS', 'ry'), "Wendy's": ('BURGERS', 'rw'), "Taco John's": ('TACOS', 'yg'), 'Pizza Hut': ('PIZZA', 'rw'), 'DQ Grill & Chill': ('ICE CREAM', 'rb'),
         'Albertsons': ('GROCERY', 'bw'), 'Sinclair': ('GAS', 'gw'), 'Super 8 by Wyndham Cody': ('MOTEL', 'ry'), 'BEST WESTERN PREMIER Ivy Inn & Suites': ('HOTEL', 'bw'),
         'Comfort Inn at Buffalo Bill Village Resort': ('INN', 'bw'), 'AmericInn by Wyndham Cody': ('INN', 'rw'), 'Holiday Inn Cody at Buffalo Bill Village': ('HOTEL', 'gw'),
         'Rodeway Inn Cody': ('INN', 'bw'), 'Chevrolet': ('AUTO SALES', 'bw'), 'Sears': ('STORE', 'bw'), 'Boot Barn': ('WESTERN WEAR', 'kw'), 'UPS Distribution Center': ('SHIPPING', 'ky'),
         'Sierra': ('OUTDOOR STORE', 'gw'), 'Best Western Sunset Motor Inn': ('MOTOR INN', 'bw'), 'Big Horn Federal': ('BANK', 'bw')}
def btype(tg, a):
    b = tg.get('building'); am = tg.get('amenity', ''); sh = tg.get('shop', ''); tour = tg.get('tourism', '')
    if b in ('house', 'detached', 'semidetached_house', 'residential', 'bungalow', 'terrace', 'farm'): return 'house'
    if b in ('garage', 'garages', 'shed', 'carport', 'hut', 'barn', 'farm_auxiliary', 'storage_tank', 'greenhouse', 'stable'): return 'shed' if a < 160 else 'ind'
    if b == 'static_caravan': return 'trailer'
    if b == 'cabin': return 'cabin'
    if b in ('apartments', 'dormitory'): return 'apt'
    if b in ('school', 'college', 'university', 'kindergarten') or am in ('school', 'college'): return 'school'
    if b in ('church', 'chapel', 'cathedral', 'religious') or am == 'place_of_worship': return 'church'
    if b in ('hospital',) or am == 'hospital': return 'hosp'
    if b in ('hotel', 'motel') or tour in ('hotel', 'motel'): return 'hotel'
    if b in ('industrial', 'warehouse', 'hangar', 'manufacture', 'service', 'transportation') : return 'ind'
    if b == 'roof': return 'canopy'
    if b == 'tipi': return 'tipi'
    if b in ('commercial', 'retail', 'office', 'civic', 'public', 'government', 'supermarket') or am or sh or tour: return 'com'
    # plain "yes": guess from size
    if a < 45: return 'shed'
    if a < 330: return 'house'
    return 'com'
def generic(tg):
    am, sh, to, cu = tg.get('amenity', ''), tg.get('shop', ''), tg.get('tourism', ''), tg.get('cuisine', '')
    if not (sh or to or am in ('fast_food', 'restaurant', 'cafe', 'pharmacy', 'fuel', 'bank')): return None
    if am == 'fast_food':
        for k, v in (('burger', 'BURGERS'), ('pizza', 'PIZZA'), ('mexican', 'TACOS'), ('taco', 'TACOS'), ('ice_cream', 'ICE CREAM'), ('sandwich', 'SUBS'), ('chicken', 'CHICKEN'), ('coffee', 'COFFEE')):
            if k in cu: return (v, 'rw')
        return ('FAST FOOD', 'rw')
    if am == 'restaurant': return ('PIZZA' if 'pizza' in cu else 'RESTAURANT', 'rw')
    if am == 'cafe': return ('COFFEE', 'kw')
    if am == 'pharmacy' or sh == 'chemist': return ('PHARMACY', 'rw')
    if am == 'fuel': return ('GAS', 'gw')
    if am == 'bank': return ('BANK', 'bw')
    if to == 'hotel': return ('HOTEL', 'bw')
    if to == 'motel': return ('MOTEL', 'ry')
    if sh in ('supermarket',): return ('GROCERY', 'bw')
    if sh in ('convenience',): return ('CONVENIENCE', 'ry')
    if sh in ('variety_store',): return ('DISCOUNT STORE', 'gw')
    if sh in ('car',): return ('AUTO SALES', 'bw')
    if sh in ('car_repair', 'tyres', 'car_parts'): return ('AUTO PARTS', 'ky')
    if sh in ('hardware', 'doityourself'): return ('HARDWARE', 'rw')
    if sh in ('clothes', 'shoes'): return ('CLOTHING', 'kw')
    if sh in ('farm', 'agrarian'): return ('FARM & RANCH', 'gw')
    if sh in ('department_store',): return ('STORE', 'bw')
    if sh in ('mobile_phone', 'electronics'): return ('PHONES', 'kw')
    return ('STORE', 'bw')
TY = ['house', 'shed', 'trailer', 'cabin', 'apt', 'school', 'church', 'hosp', 'hotel', 'ind', 'canopy', 'tipi', 'com']
# named point features inside buildings give the building its name/use
pois = []
for nid, tg in NT.items():
    if 'name' in tg and (tg.get('amenity') or tg.get('shop') or tg.get('tourism')) and nid in N:
        pois.append((N[nid], tg))
def pip(x, z, p):
    c = False; j = len(p) - 1
    for i in range(len(p)):
        if ((p[i][1] > z) != (p[j][1] > z)) and x < (p[j][0] - p[i][0]) * (z - p[i][1]) / (p[j][1] - p[i][1] + 1e-12) + p[i][0]: c = not c
        j = i
    return c
NAMES = []; NI = {}
def nidx(s):
    if s not in NI: NI[s] = len(NAMES); NAMES.append(s)
    return NI[s]
blds = []
seen = set()
for i, tg, pts in WAYS:
    if 'building' not in tg or len(pts) < 4 or not inbox(pts, 0): continue
    p = ring(pts)
    a = area(p)
    if a < 6: continue
    cx, cz = cen(p)
    if abs(cx) > XB - 3 or abs(cz) > ZB - 3: continue
    tg = dict(tg)
    if 'name' not in tg:
        for (px, pz), pt in pois:
            if abs(px - cx) < 80 and abs(pz - cz) < 80 and pip(px, pz, p): tg.update({k: v for k, v in pt.items() if k not in tg}); break
    ty = btype(tg, a)
    lv = 0
    try: lv = int(float(tg.get('building:levels', '0')))
    except ValueError: pass
    nm = tg.get('name', '')
    if nm and (tg.get('brand') or tg.get('brand:wikidata')) and nm not in CHAIN:
        gq = generic(tg)
        if gq: CHAIN[nm] = gq
    blds.append([TY.index(ty), lv, nidx(nm) if nm else -1] + flat(p))
print('buildings', len(blds), collections.Counter(TY[b[0]] for b in blds))
trees = [R1(c) for nid, tg in NT.items() if tg.get('natural') == 'tree' and nid in N and abs(N[nid][0]) < XB and abs(N[nid][1]) < ZB for c in N[nid]]
arts = [[R1(N[nid][0]), R1(N[nid][1]), tg.get('name', '')] for nid, tg in NT.items() if tg.get('tourism') in ('artwork',) and nid in N]
print('arts', arts)
data = {'bb': [R1(XB), R1(ZB)], 'll': [LAT0, LON0], 'rd': roads, 'rl': rails, 'ar': AR, 'wt': water, 'st': streams, 'rv': rv, 'bd': blds, 'nm': NAMES,
        'ch': {k: list(v) for k, v in CHAIN.items()}, 'tr': trees, 'art': arts, 'AT': ORDER, 'TY': TY}
js = '// Cody, Wyoming - map data derived from OpenStreetMap (c) OpenStreetMap contributors, ODbL 1.0 - https://www.openstreetmap.org/copyright\nwindow.CODY=' + json.dumps(data, separators=(',', ':')) + ';\n'
open(OUT, 'w').write(js)
print('wrote', OUT, len(js) // 1024, 'KB')
