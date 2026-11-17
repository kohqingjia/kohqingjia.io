from pathlib import Path
from html import escape

# Hand-drawn integer-grid compositions; exported as SVG pixel runs, no raster dependency.
PALETTE={'K':'#27364d','B':'#5279b8','L':'#a5bddb','P':'#f3dfb6','W':'#fff8e8','S':'#85a58a','G':'#d6ae61','C':'#c58f7c'}
out=Path(__file__).resolve().parents[3] / 'public/sprites'
canvas=[]
def new():
 global canvas
 canvas=[[None]*32 for _ in range(32)]
def r(x,y,w,h,c):
 for yy in range(max(0,y),min(32,y+h)):
  for xx in range(max(0,x),min(32,x+w)):canvas[yy][xx]=c
def box(x,y,w,h,c):
 r(x,y,w,h,'K');r(x+1,y+1,w-2,h-2,c)
def line(points,c='K',thick=1):
 for (x0,y0),(x1,y1) in zip(points,points[1:]):
  dx=abs(x1-x0);sx=1 if x0<x1 else -1;dy=-abs(y1-y0);sy=1 if y0<y1 else -1;err=dx+dy
  while True:
   r(x0,y0,thick,thick,c)
   if x0==x1 and y0==y1:break
   e=2*err
   if e>=dy:err+=dy;x0+=sx
   if e<=dx:err+=dx;y0+=sy
def poly(points,c):
 for y in range(32):
  cuts=[]
  for (x1,y1),(x2,y2) in zip(points,points[1:]+points[:1]):
   if min(y1,y2)<=y+.5<max(y1,y2):cuts.append(x1+(y+.5-y1)*(x2-x1)/(y2-y1))
  cuts.sort()
  for a,b in zip(cuts[::2],cuts[1::2]):
   for x in range(32):
    if a<=x+.5<b:canvas[y][x]=c
def save(name,title):
 paths=[]
 for code,colour in PALETTE.items():
  runs=[]
  for y,row in enumerate(canvas):
   x=0
   while x<32:
    if row[x]!=code:x+=1;continue
    start=x
    while x<32 and row[x]==code:x+=1
    w=x-start;runs.append(f'M{start} {y}h{w}v1h-{w}z')
  if runs:paths.append(f'  <path fill="{colour}" d="{"".join(runs)}"/>')
 svg='<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">\n  <title>'+escape(title)+'</title>\n'+'\n'.join(paths)+'\n</svg>\n'
 (out/(name+'.svg')).write_text(svg)

# Lecture chair, desk and a sound-wave speech bubble.
new();box(5,7,11,14,'B');r(6,8,8,2,'L');box(5,19,15,5,'L');r(6,20,11,1,'W');r(7,24,2,5,'K');r(17,24,2,5,'K');box(20,17,9,3,'P');r(25,20,2,9,'K');box(15,3,14,10,'W');r(18,12,3,3,'K');r(19,12,2,2,'W');r(18,7,1,2,'B');r(21,5,1,6,'B');r(24,6,1,4,'B');r(27,7,1,2,'B');save('classpartai','Lecture seat and discussion wave')
# Food rescue: folded takeaway box and leaf.
new();poly([(4,12),(28,12),(25,27),(7,27)],'K');poly([(6,14),(26,14),(23,25),(9,25)],'P');r(9,23,15,2,'G');box(3,10,26,5,'W');r(4,13,24,1,'G');box(8,7,9,4,'P');poly([(18,11),(18,5),(23,2),(29,2),(29,7),(25,11)],'K');poly([(20,9),(20,6),(24,3),(28,3),(28,6),(24,9)],'S');line([(17,13),(25,5)],'K');r(21,5,2,2,'W');r(12,17,2,2,'K');r(20,17,2,2,'K');r(16,21,3,1,'K');save('treatsure','Takeaway box with a rescue leaf')
# Solar panel, battery and charging lead.
new();box(3,6,18,14,'B');r(4,7,16,2,'L');r(9,7,1,12,'K');r(15,7,1,12,'K');r(4,12,16,1,'K');r(4,17,16,1,'K');r(11,20,2,5,'K');r(6,25,12,2,'K');box(23,9,6,12,'S');r(25,7,2,2,'K');r(24,11,2,2,'W');line([(18,23),(22,23),(22,27),(27,27),(27,25)],'K',2);box(25,21,5,5,'G');r(25,19,1,2,'K');r(28,19,1,2,'K');save('promyro','Solar panel, battery and charging plug')
# Earbud with discrete motion arcs.
new();poly([(9,4),(19,4),(22,7),(22,14),(18,18),(18,26),(15,29),(12,29),(10,26),(10,16),(7,13),(7,7)],'K');poly([(10,5),(18,5),(21,8),(21,13),(17,17),(17,26),(15,28),(12,27),(11,25),(11,15),(8,12),(8,8)],'W');r(12,17,4,9,'L');r(13,18,2,7,'W');box(10,8,7,5,'L');r(12,9,3,2,'K');line([(25,4),(28,7),(28,12),(26,15)],'K');line([(24,7),(25,9),(25,11)],'B');r(6,19,1,4,'K');r(3,18,1,6,'B');save('silentlink','Earbud measuring head motion')
# Ticket with a checklist and notches.
new();box(3,8,26,18,'P');r(4,9,24,2,'W');r(4,23,24,2,'G');r(3,15,2,4,None);r(27,15,2,4,None);r(5,15,1,4,'K');r(26,15,1,4,'K');r(3,14,2,1,'K');r(3,19,2,1,'K');r(27,14,2,1,'K');r(27,19,2,1,'K');r(19,11,1,12,'K');box(8,12,4,4,'W');line([(9,14),(10,15),(12,12)],'S');r(14,13,3,1,'B');box(8,19,4,4,'W');line([(9,21),(10,22),(12,19)],'S');r(14,20,3,1,'B');r(22,12,3,7,'B');r(22,21,3,1,'K');save('connectsphere','Event ticket and operations checklist')
# Stack of study cards with a star.
new();box(4,11,21,17,'B');box(6,8,21,17,'L');box(8,4,21,18,'W');r(9,19,19,2,'P');poly([(18,6),(20,10),(25,11),(21,14),(22,19),(18,16),(14,19),(15,14),(11,11),(16,10)],'K');poly([(18,8),(19,12),(23,12),(20,14),(20,17),(18,15),(16,17),(16,14),(13,12),(17,12)],'G');r(18,10,1,3,'W');r(16,13,1,1,'K');r(20,13,1,1,'K');save('stardyhub','Study cards with a star')
# Transit forecast display.
new();box(4,5,24,20,'L');box(6,8,20,13,'K');r(7,9,18,11,'W');line([(8,18),(12,15),(15,17),(19,11),(23,12)],'B',2);r(8,22,5,1,'K');r(21,22,4,1,'S');r(11,25,2,4,'K');r(20,25,2,4,'K');r(8,28,17,2,'K');r(7,6,7,1,'W');save('metromind','Transit demand forecast display')
# Two housing blocks exchanging energy.
new();box(2,9,11,20,'L');box(20,5,10,24,'B');r(3,10,9,2,'W');r(21,6,8,2,'L')
for x in [4,8]:
 for y in [14,19,24]:r(x,y,2,3,'P')
for x in [22,26]:
 for y in [10,15,20,25]:r(x,y,2,2,'W')
poly([(16,5),(11,17),(15,17),(13,28),(22,13),(18,13),(21,5)],'K');poly([(17,7),(13,16),(17,16),(15,23),(20,14),(16,14),(19,7)],'G');save('blockbattles','Two housing blocks sharing an energy challenge')
# Envelope and classification tag.
new();box(3,10,26,18,'P');r(4,11,24,2,'W');line([(4,12),(16,21),(27,12)],'K');line([(4,26),(11,20)],'G');line([(27,26),(21,21)],'G');box(19,4,10,11,'B');r(20,5,8,2,'L');r(21,9,5,1,'W');r(21,12,3,1,'W');r(21,5,1,1,'K');save('bank-complaints','Complaint envelope and sorting tag')
# Tailored jacket with needle and thread.
new();poly([(11,5),(20,5),(23,9),(27,11),(28,28),(4,28),(5,11),(9,9)],'K');poly([(6,12),(11,8),(16,15),(20,8),(25,12),(26,27),(6,27)],'B');poly([(11,6),(16,13),(14,19),(9,11)],'L');poly([(20,6),(17,14),(19,19),(23,11)],'L');poly([(14,7),(18,7),(16,12)],'W');r(15,20,2,2,'K');r(15,24,2,2,'K');r(7,14,1,9,'L');line([(23,3),(9,25)],'K',2);line([(23,4),(10,24)],'W');r(22,5,1,2,'K');line([(24,3),(28,3),(29,6),(27,8)],'G');save('picadilly','Suit lapel and tailor needle')
# Chinese vocabulary card; 汉 is drawn explicitly on the pixel grid.
new();box(5,3,22,26,'B');box(7,5,18,21,'W');r(8,23,16,2,'P');r(10,9,2,2,'B');r(9,13,2,2,'B');line([(10,20),(12,17)],'B',2);r(15,9,7,2,'K');line([(20,11),(18,15),(14,20)],'K',2);line([(15,12),(18,17),(22,20)],'K',2);r(13,27,6,1,'L');save('hanly','Vocabulary card displaying Han')
# Turning flashcard with a lightning bolt.
new();box(4,8,20,20,'L');box(8,4,20,20,'W');r(9,5,18,2,'P');poly([(27,15),(27,23),(19,23)],'K');poly([(26,17),(26,22),(21,22)],'L');poly([(18,7),(12,16),(17,16),(14,23),(24,12),(19,12),(22,7)],'K');poly([(18,9),(14,15),(19,15),(17,19),(22,13),(17,13),(20,9)],'G');save('flashbyte','Turning flashcard with a lightning bolt')
# Bowl passed from hand to hand.
new();poly([(6,13),(27,13),(25,22),(21,25),(12,25),(8,22)],'K');poly([(8,15),(25,15),(23,21),(20,23),(13,23),(10,21)],'B');r(9,16,14,2,'L');box(5,11,23,5,'P');r(7,12,18,1,'W');r(9,9,4,2,'S');r(16,8,4,3,'S');r(22,10,3,1,'G');poly([(1,19),(5,19),(11,24),(15,24),(15,28),(9,29),(4,25),(1,25)],'K');poly([(1,20),(4,20),(10,25),(14,25),(14,27),(9,28),(4,24),(1,24)],'C');poly([(31,18),(27,18),(22,23),(18,23),(18,27),(24,28),(29,24),(31,24)],'K');poly([(31,19),(28,19),(23,24),(19,24),(19,26),(24,27),(29,23),(31,23)],'P');save('sharebite','Hands passing a bowl of food')
# Housing block and price chart.
new();box(4,4,18,25,'L');r(5,5,16,2,'W');r(6,27,14,1,'B')
for x in [7,12,17]:
 for y in [9,14,19]:r(x,y,2,3,'K');r(x,y,1,2,'P')
line([(13,25),(17,21),(21,23),(27,13)],'K',3);line([(14,25),(18,21),(22,23),(28,13)],'G');r(24,12,6,2,'K');r(28,13,2,6,'K');r(25,13,4,1,'G');r(28,14,1,3,'G');save('hdb-prices','Housing block and resale price chart')
# Interlocking loops and a usability check.
new();box(3,9,16,15,'C');r(6,12,10,9,'K');r(7,13,8,7,None);r(4,10,12,2,'P');box(13,14,16,15,'G');r(16,17,10,9,'K');r(17,18,8,7,None);r(14,15,12,2,'W');r(14,18,3,5,'C');r(13,18,1,5,'K');r(17,18,1,5,'K');line([(20,7),(23,10),(29,3)],'K',3);line([(21,7),(23,9),(29,3)],'S');save('knotty','Interlocking loops with a usability check')
# QJ's portrait reference: short dark hair, smile, black tee, bag and denim shorts.
new();r(12,2,8,1,'K');r(10,3,12,3,'K');box(10,5,12,10,'P');r(11,5,10,2,'K');r(10,6,2,3,'K');r(13,9,1,2,'K');r(18,9,1,2,'K');r(13,12,6,2,'K');r(14,12,4,1,'W');r(13,15,6,1,'C');box(8,16,16,9,'K');r(12,18,6,1,'W');r(13,20,4,1,'W');box(5,17,4,8,'P');box(24,17,4,8,'P');line([(21,16),(19,20),(15,24)],'B');box(10,22,7,5,'K');r(11,23,4,1,'L');box(10,25,12,4,'L');r(15,26,2,3,'K');r(11,29,3,1,'P');r(18,29,3,1,'P');r(9,30,6,2,'K');r(17,30,6,2,'K');r(9,30,5,1,'W');r(17,30,5,1,'W');r(10,30,1,1,'S');r(19,30,1,1,'G');save('qj','QJ with a black tee, denim shorts and white Crocs')
# Fallback is a toolbox, rather than an unfinished square.
new();box(11,4,10,6,'B');r(13,6,6,3,None);box(4,9,24,19,'B');r(5,10,22,3,'L');r(5,24,22,3,'B');r(5,17,22,1,'K');box(14,15,5,7,'G');r(15,16,3,1,'W');r(7,11,2,4,'W');save('placeholder','Toolbox for a project in progress')
print('Wrote 15 project sprites, portrait-based avatar and toolbox fallback')
