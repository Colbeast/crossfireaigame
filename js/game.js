
THREE.ColorManagement.legacyMode=false;
const $=id=>document.getElementById(id),k={},V=THREE.Vector3,hex=c=>c.toString(16).padStart(6,'0');
const L=c=>new THREE.MeshStandardMaterial({color:c,roughness:.75,metalness:.1});
const MAXP=8,LIM=15,SUN=new V(.5,.85,.3).normalize();
// textures and materials
const TXI={},TXP=Object.entries(window.CF_TEX||{}).map(([k,u])=>new Promise(r=>{const im=new Image();im.onload=im.onerror=()=>r();im.src=u;TXI[k]=im}));
function tex(ty){let im=TXI[ty]||TXI.p;if(!im||!im.width){im=document.createElement('canvas');im.width=im.height=4;const g=im.getContext('2d');g.fillStyle='#e6e6e6';g.fillRect(0,0,4,4)}
 const t=new THREE.Texture(im);t.needsUpdate=true;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;t.encoding=THREE.sRGBEncoding;t.magFilter=THREE.NearestFilter;t.minFilter=THREE.LinearMipmapLinearFilter;return t}
const TX={},MT={},TILE={C:5,w:2.4,m:3,b:3,c:4,p:5,r:4,e:3,g:14,t:3,o:2.4,x:2,v:4,h:3,l:2.4,s:3,k:2.5,q:3,i:2,d:3,u:3,j:4,y:2.6,a:6,'1':1,z:2.4,'2':3,'4':2.5,'5':2.5,'3':1,'6':2,'7':1,'8':.6,'9':1.8};
const MTV={},matV=t=>MTV[t]||(MTV[t]=t=='e'?new THREE.MeshBasicMaterial({vertexColors:true}):new THREE.MeshStandardMaterial({map:TX[t]||(TX[t]=tex(t)),vertexColors:true,roughness:t=='m'?.55:.93,metalness:t=='m'?.3:0}));
const mat=(ty,col)=>{ty=ty||'p';const k=ty+col,tt=ty=='C'?'p':ty;if(!MT[k]){TX[tt]=TX[tt]||tex(tt);MT[k]=new THREE.MeshStandardMaterial({map:TX[tt],color:col,roughness:ty=='m'?.55:.93,metalness:ty=='m'?.3:0,emissive:new THREE.Color(ty=='C'||ty=='d'?col:0).multiplyScalar(ty=='C'?.3:.12)})}return MT[k]};
function uvs(geo,w,h,d,ty){const u=geo.attributes.uv,t=TILE[ty||'p'],s=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];for(let f=0;f<6;f++)for(let v=0;v<4;v++){const i=f*4+v;u.setXY(i,u.getX(i)*s[f][0]/t,u.getY(i)*s[f][1]/t)}}

const bx=(p,w,h,d,c,x,y,z,cs)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),L(c));m.position.set(x,y,z);m.castShadow=!!cs;p.add(m);return m};
function makeGun(i,cs){const g=new THREE.Group(),a=(...r)=>bx(g,...r,cs);
 if(i==0){a(.08,.1,.32,0x9aa3ad,0,0,-.16);a(.07,.18,.09,0x333840,0,-.12,-.03)}
 if(i==1){a(.09,.12,.7,0x3a4450,0,0,-.35);a(.08,.14,.25,0x2a2f36,0,-.02,.1);a(.06,.2,.1,0x222222,0,-.14,-.25);a(.04,.04,.3,0x111111,0,.02,-.85)}
 if(i==2){a(.06,.06,.85,0x222222,0,.03,-.42);a(.09,.08,.25,0x7a4a2a,0,-.04,-.4);a(.08,.14,.3,0x7a4a2a,0,-.02,.15);a(.09,.1,.3,0x444444,0,0,-.05)}
 if(i==3){a(.08,.1,.95,0x2d3a2f,0,0,-.4);a(.06,.06,.3,0x111111,0,.11,-.3);a(.035,.035,.5,0x111111,0,.02,-1.1);a(.08,.14,.3,0x2d3a2f,0,-.03,.2)}
 if(i==4){a(.07,.1,.3,0x2a2a2a,0,0,-.15);a(.065,.17,.09,0x1a1a1a,0,-.12,-.02);a(.05,.03,.04,0x111111,0,.065,-.28)}
 if(i==5){const c=0xe8e8e8;a(.045,.045,.32,0x2a2a2a,0,0,.02);a(.03,.03,.34,c,0,.14,-.43);a(.03,.03,.34,c,0,-.14,-.43);a(.03,.31,.03,c,0,0,-.6);a(.03,.31,.03,c,0,0,-.26);a(.012,.27,.31,0xd8e86a,0,0,-.43)}
 if(i==6){a(.11,.11,.11,0xd8f04a,0,0,-.08)}
 if(i==7){a(.07,.09,.36,0xb8bec6,0,0,-.18);a(.11,.11,.11,0x8a8f96,0,0,-.04);a(.06,.17,.09,0x6b4423,0,-.12,.04)}
 if(i==8){// bullwhip: wrapped handle with a knob, then a long braided lash that tapers and curls down to the popper
  a(.055,.055,.3,0x4a2e1a,0,0,.02);for(let k=0;k<5;k++)a(.062,.062,.025,0x2a1a10,0,0,.14-k*.06);a(.07,.07,.05,0x2a1a10,0,0,.18);
  const P=[];for(let k=0;k<=22;k++){const t=k/22;P.push(new V(.06*Math.sin(t*5.5),-.02-.95*t*t+.1*Math.sin(t*7),-.14-.62*t+.25*t*t))}
  for(let k=0;k<P.length-1;k++){const d=new V().subVectors(P[k+1],P[k]),w=.024-.016*k/P.length,m=new THREE.Mesh(new THREE.BoxGeometry(w,w,d.length()+.01),L(k%2?0x3a2414:0x4a2e1a));m.position.copy(P[k]).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(new V(0,0,1),d.normalize());m.castShadow=!!cs;g.add(m)}
  const e=P[P.length-1];a(.018,.05,.018,0xd8c8a8,e.x,e.y-.03,e.z)}
 if(i==9){a(.2,.015,.2,0x9aa3ad,0,0,-.12);a(.07,.025,.07,0x333333,0,0,-.12);a(.028,.016,.28,0x9aa3ad,0,0,-.12);a(.28,.016,.028,0x9aa3ad,0,0,-.12)}
 if(i==10){a(.07,.1,.3,0x3a3f46,0,0,-.15);a(.065,.17,.09,0x222222,0,-.12,-.02);a(.055,.055,.28,0x111111,0,0,-.43)}
 if(i==11){a(.1,.12,.3,0xc0c8d0,0,0,-.12);a(.15,.15,.04,0x3aff8a,0,0,-.2);a(.13,.13,.04,0x3aff8a,0,0,-.29);a(.05,.05,.14,0x3aff8a,0,0,-.38);a(.06,.16,.08,0x555555,0,-.12,0)}
 if(i==12){a(.04,.04,.22,0x5a3a22,0,0,.06);a(.28,.04,.05,0xc9a640,0,0,-.06);a(.065,.02,1.15,0xdfe4ea,0,0,-.66)}
 if(i==13){a(.07,.08,.6,0x6b4423,0,0,-.2);a(.72,.04,.05,0x4a3020,0,.02,-.48);a(.68,.01,.01,0xeeeeee,0,.02,-.36);a(.02,.02,.4,0x8a8f96,0,.05,-.4)}
 if(i==14){a(.1,.1,.24,0xf2c230,0,0,-.1);a(.12,.07,.12,0x7ab040,0,-.02,.03)}
 if(i==15){a(.04,.04,1.1,0x8a5a3a,0,0,-.3);a(.24,.03,.03,0x8a8f96,0,0,-.86);[-.1,0,.1].forEach(x=>a(.02,.02,.22,0x8a8f96,x,0,-.98))}
 // battle royale loot: heavy pistol, SMG, pickaxe, grenade, bandages, shield potion
 if(i==17){a(.09,.12,.4,0x2b2d31,0,0,-.2);a(.08,.2,.1,0x1a1a1a,0,-.14,-.03);a(.05,.05,.12,0x111111,0,.02,-.44);a(.03,.03,.04,0xc9a640,0,.08,-.37)}
 if(i==18){a(.09,.13,.46,0x30343a,0,0,-.22);a(.07,.16,.08,0x1e1e1e,0,-.13,-.02);a(.06,.22,.08,0x1e1e1e,0,-.15,-.27);a(.04,.04,.16,0x111111,0,.02,-.52);a(.05,.08,.2,0x30343a,0,-.02,.13)}
 if(i==19){a(.04,.04,.78,0x7a5232,0,0,-.28);a(.055,.055,.08,0x3a3f46,0,0,-.66);a(.045,.4,.06,0x9aa3ad,0,.03,-.68);a(.035,.05,.1,0xc8d0d8,0,.03,-.92);a(.035,.05,.1,0xc8d0d8,0,.03,-.44)}
 if(i==20){a(.12,.14,.12,0x4d6b2e,0,0,-.08);a(.06,.05,.06,0x8a8f96,0,.09,-.08);a(.02,.1,.03,0x8a8f96,.05,.05,-.08)}
 if(i==21){a(.14,.12,.14,0xf2ece0,0,0,-.1);a(.145,.03,.06,0xd23a3a,0,0,-.1);a(.06,.125,.145,0xd23a3a,0,0,-.1)}
 if(i==22){a(.12,.16,.12,0x2f8cff,0,0,-.1);a(.06,.07,.06,0xbfe0ff,0,.11,-.1);a(.075,.04,.075,0x3a3f46,0,.16,-.1)}
 if(i==23){a(.04,.04,.26,0x2a1a10,0,0,.06);a(.06,.025,.06,0x2a1a10,0,0,.2);a(.045,.045,.2,0xf2c230,0,0,-.16);a(.06,.06,.24,0xf5c842,0,0,-.37);a(.075,.075,.26,0xffd75a,0,0,-.62);a(.068,.068,.025,0xffe9a0,0,0,-.76)}
 if(i==16){a(.08,.08,.72,0xd9a35a,0,0,-.3);a(.07,.07,.08,0xb8823a,0,0,-.66);a(.085,.01,.06,0xf2dca8,0,.04,-.2);a(.085,.01,.06,0xf2dca8,0,.04,-.4)}
 return g}
const NWP=24;
// grips: guns point forward; the racket, sword and baguette are held up like a bat, the whip hangs from the hand, the pitchfork is carried like a spear
const HOLDFP={5:[1.2,.3,-.5,.03,-.03,.1],8:[.1,.45,-.3,.07,.1,-.06],12:[1.15,.25,-.45,.03,-.03,.12],19:[.95,.15,-.05,.12,-.08,.1],23:[.95,.15,-.05,.12,-.08,.1],15:[.22,0,-.08,0,-.02,.18],16:[1.15,.25,-.45,.02,-.02,.08]},HOLDTP={5:1.3,19:1.25,23:1.25,8:-.2,12:1.25,15:.15,16:1.25};

// ---------- renderer / sky / lights ----------
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,420);cam.rotation.order='YXZ';scene.add(cam);scene.fog=new THREE.Fog(0x9ec9e2,30,160);
let PERF0=false;try{PERF0=localStorage.getItem('cf_perf')==='1'}catch(e){}
function mkR(w,h,keep){const r=new THREE.WebGLRenderer({antialias:!PERF0,preserveDrawingBuffer:!!keep});r.setSize(w,h);r.outputEncoding=THREE.sRGBEncoding;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.1;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;return r}
const ren=mkR(innerWidth,innerHeight);ren.setPixelRatio(Math.min(devicePixelRatio,1.5));document.body.prepend(ren.domElement);
addEventListener('resize',()=>{ren.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});
function mkSky(M){const u={a:{value:new THREE.Color(M.sky[0])},b:{value:new THREE.Color(M.sky[1])},s:{value:SUN},n:{value:M.night?1:0}};
 const m=new THREE.Mesh(new THREE.SphereGeometry(300,24,12),new THREE.ShaderMaterial({uniforms:u,side:THREE.BackSide,depthWrite:false,fog:false,vertexShader:'varying vec3 p;void main(){p=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'uniform vec3 a,b,s;uniform float n;varying vec3 p;void main(){float h=clamp(p.y*1.6+.1,0.,1.);vec3 c=mix(b,a,pow(h,.7));float d=max(dot(p,s),0.);c+=vec3(1.,.85,.6)*(pow(d,900.)*3.+pow(d,10.)*.22)*(1.-n*.7);c+=n*step(.996,fract(sin(dot(floor(p.xz*140./(p.y+.4)),vec2(12.9,78.2)))*43758.5))*smoothstep(.05,.3,p.y);gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}'}));m.frustumCulled=false;m.renderOrder=-1;return m}
function lights(sc,M,ext,ms){const h=new THREE.HemisphereLight(M.sky[1],new THREE.Color(M.gr[2]).lerp(new THREE.Color(0xd8d4cc),.5),M.amb),s=new THREE.DirectionalLight(M.sun,M.si);s.castShadow=true;s.shadow.mapSize.set(ms,ms);const c=s.shadow.camera;c.left=c.bottom=-ext;c.right=c.top=ext;c.near=1;c.far=ext*5;s.shadow.bias=-.0004;s.shadow.normalBias=.45;s.position.copy(SUN).multiplyScalar(ext*1.6);sc.add(h,s,s.target);return[h,s]}
// ---------- procedural maps ----------
// shadow map follows the player in whole-texel steps, so shadow edges don't shimmer while moving
const snapSh=(()=>{const f=SUN.clone(),u=new V(0,1,0).cross(f).normalize(),v=f.clone().cross(u).normalize(),ts=104/2048,o=new V(),q=n=>Math.round(n/ts)*ts;
 return(x,y,z)=>{o.set(x,y,z);const a=q(o.dot(u)),b=q(o.dot(v)),c=o.dot(f);return o.copy(u).multiplyScalar(a).addScaledVector(v,b).addScaledVector(f,c)}})();
const rng=s=>()=>(s=(s*1664525+1013904223)>>>0)/4294967296;
const THEMES=[
{n:'Dustyard',t:'Sun-baked halls, rolling dunes and rooftop stairs',seed:7,cel:1,sky:[0x3d86cf,0xf0d9b0],gr:[0xe0c48c,0xc7a46a,0xa08560],rk:0xb08a5a,wc:[0xd9b98a,0xc49a66,0xe6cfa6],wt:'b',cc:[0x9a6b3a,0xb58650,0x7e5a34],sun:0xfff0d0,si:1.5,amb:.75,ex:1.15,fog:150,hills:10,h:[3,6],ro:.6,plat:3,ph:[3,5.5],rooms:14,pl:3,crates:4,rocks:22,trees:0,cont:0,pil:0,cov:3},
{n:'Bazaar',t:'Green plaza, courtyard houses and temple mounds',seed:23,cel:1,sky:[0x3b8fe6,0xc6e4ff],gr:[0x7fbf4d,0x5ea23e,0x8a7c62],rk:0x8d8a80,wc:[0xf1e6d2,0xc2673f,0xf4ead8],wt:'p',cc:[0xb5793f,0xd19a52,0x8e5a2e],lc:0x3f8a3a,tree:'l',sun:0xfff4dc,si:1.45,amb:.85,ex:1.1,fog:115,hills:9,h:[3,5.5],ro:.5,plat:2,ph:[3,5],rooms:14,pl:2,crates:3,rocks:26,trees:270,bush:200,cont:0,pil:0,cov:2},
{n:'Graveyard',t:'Moonlit cemetery of black iron fences, crypts and endless headstones',seed:41,cel:1,night:1,grave:1,sky:[0x03050a,0x1b2533],gr:[0x34473a,0x41563f,0x2a302b],rk:0x4a4f55,wc:[0x70767c,0x5d6369,0x82888e],wt:'c',cc:[0x5a4632,0x3f4a52,0x6a5a48],em:0x7dffb0,emh:3.4,emn:18,sun:0xaabcff,si:1.3,amb:.95,ex:1.6,fog:95,hills:9,h:[2,4],neg:2,ro:.35,plat:0,ph:[2,3.5],rooms:9,pl:0,crates:1,rocks:14,trees:0,cont:0,pil:0,cov:2,plots:7,graves:190,dead:16},
{n:'Yardline',t:'Stacked containers, gravel piles and loading ramps',seed:59,sky:[0x4f8ccb,0xdbe7f0],gr:[0x8c8880,0x716e66,0x55534e],rk:0x777d84,wc:[0xcfd3d6,0x99a3aa],wt:'c',cc:[0xa83a2e,0x2f5d9a,0x3a7a4a,0xd98a2b,0xcfd3d6],sun:0xffffff,si:1.45,amb:.8,ex:1.1,fog:160,hills:3,h:[1,2],ro:.12,plat:3,ph:[2.5,4],rooms:6,pl:3,crates:4,rocks:12,trees:0,cont:12,pil:0,cov:3},
{n:'Frostpeak',t:'Snowy ridges, pine forest, cabins and watchtowers',seed:83,cel:1,sky:[0x6fa6db,0xe8f1f8],gr:[0xf4f8fb,0xdde8f2,0x8894a0],rk:0x9aa8b6,wc:[0x8b5a36,0xb07a4a,0xf2f2f2],wt:'w',cc:[0x7a5636,0xa88660,0x5a3f26],lc:0x2c6b4a,tree:'p',sun:0xfff6e8,si:1.5,amb:.95,ex:1.15,fog:105,hills:13,h:[4,9],ro:.7,plat:2,ph:[3,5],rooms:13,pl:2,crates:3,rocks:32,trees:320,bush:160,cont:0,pil:0,cov:2},
{n:'Downtown',t:'Skyscraper canyons, tight streets and nowhere to hide',seed:97,city:1,sky:[0x4d86c0,0xcfdbe6],gr:[0x5a5c60,0x6b6d71,0x3a3c40],rk:0x9aa3ad,bt:'g',bh:72,wc:[0xd4d9de,0xc2b49c,0xa7b2bf,0x8d99a6,0xd9cdb9],wt:'g',cc:[0x8a2f2a,0x2c4f7a,0x2f2f33,0xc9c9cc,0x2f6b4a],em:0xffe6a8,sun:0xfff1d6,si:1.3,amb:.8,ex:1.1,fog:125,sd:150,hills:0,h:[0,0],ro:0,plat:0,ph:[0,0],rooms:0,pl:0,crates:0,rocks:0,trees:0,cont:0,pil:0,cov:0,vm:1.6,vd:30,tc:[-70,215,95],tl:[0,10,0]},
{n:'Royale Isle',t:'Battle Royale map: a huge island of hills, forests, villages and vending machines',seed:131,cel:3,br:1,sz:130,sky:[0x3b8fe6,0xc6e4ff],gr:[0x7fbf4d,0x5ea23e,0x8a7c62],rk:0x8d8a80,wc:[0xf1e6d2,0xc2673f,0xd8cdb8,0xcfd3d6,0xe8d9b5],wt:'b',cc:[0xb5793f,0xd19a52,0x8e5a2e,0xa83a2e,0x2f5d9a],lc:0x4fa03c,pc:0x24603f,tree:'m',sun:0xfff4dc,si:1.45,amb:.85,ex:1.1,fog:190,hills:48,h:[5,13],ro:.9,plat:6,ph:[4,7],rooms:58,pl:3,crates:0,rocks:95,trees:720,bush:0,cont:0,pil:0,cov:0,nv:7,vd:32,nsp:28,sps:30,tc:[-175,175,250],tl:[0,-10,20]},
{n:'Pleasant Park',t:'Battle Royale map: a Fortnite-style suburb with houses, picket fences, a football field and doors you open with E',seed:211,br:1,pk:1,sz:130,sky:[0x3b8fe6,0xc6e4ff],gr:[0x7fbf4d,0x5ea23e,0x8a7c62],rk:0x8d8a80,wc:[0xe8d9b5,0xe3b1ac,0xaecbe3,0xeee3a4,0xb9d9b5,0xf1f0ea],wt:'w',cc:[0xb5793f,0xd19a52,0x8e5a2e],lc:0x4fa03c,pc:0x24603f,tree:'m',sun:0xfff4dc,si:1.5,amb:.9,ex:1.1,fog:190,hills:20,h:[3,8],ro:.35,plat:0,ph:[0,0],rooms:0,pl:0,crates:0,rocks:40,trees:420,bush:0,cont:0,pil:0,cov:0,nv:6,vd:32,nsp:28,sps:30,tc:[-150,150,215],tl:[0,-8,5]},
{n:'Coral Key',t:'Battle Royale map: a huge tropical island',seed:307,br:1,isle:1,sz:200,ext:250,wl:0,bnd:221,mapE:232,stS:1.22,sky:[0x2f9ae8,0xd2efff],gr:[0x7fcf54,0x4f9e3c,0x8f8a7a],rk:0xd9cfb8,wc:[0xf4c7cf,0xbfe6df,0xf7e4a2],wt:'v',cc:[0xb5793f,0xd19a52,0x8e5a2e],lc:0x3f9a3a,pc:0x2f7a3a,bc:0x4a9a3a,tree:'m',sun:0xfff4dc,si:1.5,amb:.92,ex:1.12,fog:270,hills:0,h:[0,0],ro:0,plat:0,ph:[0,0],rooms:0,pl:0,crates:0,rocks:0,trees:0,bush:0,cont:0,pil:0,cov:0,nv:8,vd:40,nsp:32,sps:34,tc:[-245,170,300],tl:[0,-6,10]},
{n:'Snowdrift Valley',t:'Battle Royale map: a snowy valley with a giant igloo',seed:419,br:1,snowmap:1,snowfall:1,sz:200,ext:250,bnd:196,mapE:224,stS:1.2,busY:95,sky:[0x6a8fb3,0xc4d1de],gr:[0xe0e7ee,0xc4d0dc,0x6a7380],rk:0x7d8896,wc:[0x8b5a36,0xb07a4a],wt:'l',cc:[0x7a5636,0xa88660,0x5a3f26],lc:0x2c6b4a,pc:0x2a5a46,tree:'p',sun:0xffefd8,si:1.05,amb:.72,ex:.8,fog:230,hills:0,h:[0,0],ro:0,plat:0,ph:[0,0],rooms:0,pl:0,crates:0,rocks:60,trees:650,bush:0,cont:0,pil:0,cov:0,nv:8,vd:40,nsp:32,sps:34,tc:[-240,190,300],tl:[0,-4,10]}];
function genMap(T,lite){let RG=rng(T.seed);const r=()=>RG(),fr=(a,b)=>a+(b-a)*r(),pick=a=>a[r()*a.length|0],ri=(a,b)=>Math.floor(fr(a,b+1)),
 B=[],D=[],occ=[],occR=[],hills=[],pads=[],pits=[],PL=[],DR=[],RD=[],HP=[],BT=[],S=T.sz||66;
 const rectHit=(a,b)=>a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1],FBX=[];
 const spot=(rad,lim=S-10)=>{for(let i=0;i<300;i++){const x=fr(-lim,lim),z=fr(-lim,lim);if(occ.every(o=>Math.hypot(o[0]-x,o[1]-z)>o[2]+rad)&&occR.every(q=>x<q[0]-rad||x>q[2]+rad||z<q[1]-rad||z>q[3]+rad)){occ.push([x,z,rad]);return[x,z]}}return 0};
 // ================= Coral Key: island shape (coast, cliffs, river, lagoon) =================
 const KW=T.wl??-4,KR=[[-6,-28],[-40,-40],[-78,-22],[-110,-30],[-150,-8],[-205,4]],KFP=[-112,-100,27,22],KLG=[180,-18,34,62],
  KIH=[[5,-10,48,10],[-40,-90,36,6],[-30,60,34,6],[110,40,26,5],[-140,60,30,5]];
 const kss=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
 const kseg=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));return Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t)};
 const krivD=(x,z)=>{let d=1e9;for(let i=0;i<KR.length-1;i++)d=Math.min(d,kseg(x,z,KR[i],KR[i+1]));return d};
 const kcoast=a=>{const da=Math.atan2(Math.sin(a-.8),Math.cos(a-.8));return 172+13*Math.sin(3*a+1)+8*Math.sin(5*a+2.3)+5*Math.sin(9*a+.7)-34*Math.exp(-da*da/.03)};
 const kland=(x,z)=>kcoast(Math.atan2(z,x))-Math.hypot(x,z);
 const isleH=(x,z)=>{const t=kland(x,z);let h=t<0?Math.max(-9,t*.16):Math.min(t*.085,1.7)+kss(18,60,t)*(2.4+2.6*Math.sin(x*.031+1.2)*Math.cos(z*.027)+1.6*Math.sin(x*.07+z*.05));
  const inl=kss(0,25,t);for(const q of KIH){const d=Math.hypot(x-q[0],z-q[1])/q[2];if(d<1)h+=q[3]*(Math.cos(d*Math.PI)+1)/2*inl}
  {const d=Math.hypot(x-KFP[0],z-KFP[1]),k=1-kss(KFP[2],KFP[2]+10,d);if(k>0)h=h*(1-k)+KFP[3]*k}
  {const ex=(x-KLG[0])/KLG[2],ez=(z-KLG[1])/KLG[3],e=ex*ex+ez*ez;if(e<1&&h<-.7){const bar=Math.max(0,Math.sin(z*.13+x*.04)-.45)*2.2,w=1-kss(.55,1,e);h=h*(1-w)+(-.75+bar)*w}}
  if(t>-6){const d=krivD(x,z);if(d<17){const w=1-kss(5,17,d);h=h*(1-w)+(KW-1.8)*w}}
  return h};
 // ground colours for the island: deep water -> shallows -> wet sand -> sand -> grass -> rock on steep slopes
 const khx=c=>[(c>>16&255)/255,(c>>8&255)/255,(c&255)/255],kmix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
 const KC={wet:khx(0xd8c48e),sand:khx(0xf2e2b4),sea:khx(0x46b5a8),deep:khx(0x1d6f88),g0:khx(T.gr[0]),g1:khx(T.gr[1]),rock:khx(T.gr[2])};
 const ktcol=(x,z,y,s)=>{if(y<KW)return kmix(kmix(KC.wet,KC.sea,Math.min(1,(KW-y)/1.6)),KC.deep,Math.max(0,Math.min(1,(KW-y-1.6)/6)));
  let c=y<KW+.45?KC.wet:y<KW+2.6?KC.sand:kmix(KC.g0,KC.g1,Math.min(1,(y-2.6)/16));if(y>=KW+2.6&&y<KW+3.5)c=kmix(KC.sand,c,(y-KW-2.6)/.9);if(s>1.1)c=kmix(c,KC.rock,Math.min(1,(s-1.1)*.9));return c};
 // ================= Snowdrift Valley: snowy valley ringed by mountains, frozen lake, giant igloo in the middle =================
 const SV_L=[96,86,38,25],SV_H=[[-120,12,58,22],[60,-110,40,10],[-40,-125,36,8],[125,-20,30,8],[-70,120,34,7],[30,150,30,6],[150,60,26,6]];
 const snowH=(x,z)=>{let h=2.4+1.8*Math.sin(x*.035+.7)*Math.cos(z*.031)+1.1*Math.sin(x*.08+z*.06);
  for(const q of SV_H){const d=Math.hypot(x-q[0],z-q[1])/q[2];if(d<1)h+=q[3]*(Math.cos(d*Math.PI)+1)/2}
  const e=Math.hypot(x,z);if(e>172)h+=Math.pow(e-172,1.35)*.32*(1+.25*Math.sin(Math.atan2(z,x)*7));
  const ex=(x-SV_L[0])/SV_L[2],ez=(z-SV_L[1])/SV_L[3],q=Math.sqrt(ex*ex+ez*ez);if(q<1.3){const w=1-kss(.85,1.3,q);h=h*(1-w)+.8*w}
  return h};
 const SCc={snow:khx(0xe3eaf1),snow2:khx(0xbfcdda),ice:khx(0x7fb2d0),rock:khx(0x646d7a)};
 const stcol=(x,z,y,s)=>{const ex=(x-SV_L[0])/SV_L[2],ez=(z-SV_L[1])/SV_L[3],q=Math.sqrt(ex*ex+ez*ez);let c=kmix(SCc.snow,SCc.snow2,Math.max(0,Math.min(1,.5+.45*Math.sin(x*.05+z*.04)+.25*Math.sin(x*.17-z*.13))));
  if(q<1)c=kmix(SCc.ice,c,kss(.82,1,q));if(s>2.1)c=kmix(c,SCc.rock,Math.min(.85,(s-2.1)*.5));return c};
 // ================= extra Battle Royale maps: terrain shapes + ground colours =================
 const XT=T.terr||null,XS=T.sz||130,xr=rng((T.seed||1)*7+11),xf=(a,b)=>a+(b-a)*xr(),XF={};let xH=null,xCol=null;
 const xbump=(x,z,q)=>{const d=Math.hypot(x-q[0],z-q[1])/q[2];return d<1?q[3]*(Math.cos(d*Math.PI)+1)/2:0};
 const xsegD=(x,z,P)=>{let d=1e9;for(let i=0;i<P.length-1;i++)d=Math.min(d,kseg(x,z,P[i],P[i+1]));return d};
 const xrc=(x,P)=>{let zc=0,dm=1e9;for(let z=-XS;z<XS;z+=.5){const d=xsegD(x,z,P);if(d<dm){dm=d;zc=z}}return zc};
 const xclamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const xland=(x,z,y,s,lo,hi,rock,wl)=>{let c=kmix(khx(lo),khx(hi),xclamp(.5+.45*Math.sin(x*.05+z*.04)+.2*Math.sin(x*.17-z*.13),0,1));if(wl!=null&&y<wl)return kmix(kmix(khx(0xb8a878),khx(0x3f8f8a),xclamp((wl-y)/1.6,0,1)),khx(0x1d5a6e),xclamp((wl-y-1.6)/6,0,1));if(s>1.3)c=kmix(c,khx(rock),Math.min(.9,(s-1.3)*.6));return c};
 if(XT==='mesa'){XF.m=[];for(let i=0;i<400&&XF.m.length<9;i++){const q=[xf(-XS*.85,XS*.85),xf(-XS*.85,XS*.85),xf(10,20),xf(12,22),xf(4,7)];if(Math.hypot(q[0],q[1])<q[2]+52||Math.abs(q[1]+XS*.6)<q[2]+14||XF.m.some(o=>Math.hypot(o[0]-q[0],o[1]-q[1])<o[2]+q[2]+12))continue;XF.m.push(q)}
  XF.can=[[-XS*1.1,XS*.62],[-XS*.35,XS*.45],[XS*.2,XS*.6],[XS*1.1,XS*.5]];
  xH=(x,z)=>{let h=1.3+1.1*Math.sin(x*.05+1)*Math.cos(z*.043)+.5*Math.sin(x*.13+z*.09);for(const q of XF.m){const d=Math.hypot(x-q[0],z-q[1]),k=1-kss(q[2],q[2]+q[4],d);if(k>0)h=h*(1-k)+q[3]*k}
   const d=xsegD(x,z,XF.can);if(d<15)h-=4.6*(1-kss(5,15,d));return h};
  const band=[0xd9a066,0xc2814e,0xe2b27a,0xa85a36,0xcf9058,0xb86a40].map(khx);
  xCol=(x,z,y,s)=>{let c=y<3.2?kmix(khx(0xe0b382),khx(0xc8935c),xclamp(.5+.5*Math.sin(x*.07+z*.05),0,1)):band[Math.floor((y+40)/2.4)%band.length];if(y<-1)c=kmix(c,khx(0xb07a4c),.6);return c}}
 else if(XT==='harbor'){XF.cx=XS*.3;XF.hl=[];for(let i=0;i<6;i++)XF.hl.push([xf(-XS*.9,-XS*.1),xf(-XS*.9,XS*.9),xf(20,34),xf(3,7)]);
  xH=(x,z)=>{const t=XF.cx-x+(Math.abs(z)>XS*.75?4*Math.sin(z*.05):0);if(t<0)return Math.max(-8,t*.4);let h=Math.min(2.2,.5+t*.07);for(const q of XF.hl)h+=xbump(x,z,q)*kss(15,45,t);return h};
  xCol=(x,z,y,s)=>{if(y>2.12&&y<2.3&&x>XF.cx-66&&Math.abs(z)<XS*.73){const g=(Math.abs(((x%8)+8)%8-4)<.15||Math.abs(((z%8)+8)%8-4)<.15)?.86:1;return khx(0x9a9c9e).map(v=>v*g)}return xland(x,z,y,s,0x86a05a,0x6f8a4e,0x777777,0)}}
 else if(XT==='sakura'){XF.hl=[[-60,-30,40,5],[55,-40,36,6],[-40,60,30,4],[60,50,34,5],[0,-74,30,6]];
  xH=(x,z)=>{let h=2.2+.8*Math.sin(x*.06)*Math.cos(z*.05);for(const q of XF.hl)h+=xbump(x,z,q);const ex=x/30,ez=(z-10)/18,e=Math.sqrt(ex*ex+ez*ez);if(e<1.35){const w=1-kss(.8,1.35,e);h=h*(1-w)+(-1.6)*w}return h};
  xCol=(x,z,y,s)=>xland(x,z,y,s,0x86c45e,0x6aa64c,0x8a8a80,0)}
 else if(XT==='ruins'){XF.hl=[];for(let i=0;i<10;i++){const q=[xf(-XS*.9,XS*.9),xf(-XS*.9,XS*.9),xf(22,40),xf(4,10)];if(Math.hypot(q[0],q[1]+10)<q[2]+45)continue;XF.hl.push(q)}
  XF.riv=[[-XS*1.1,XS*.45],[-XS*.4,XS*.6],[XS*.1,XS*.5],[XS*.5,XS*.66],[XS*1.1,XS*.55]];
  xH=(x,z)=>{let h=2.6+1.4*Math.sin(x*.04+.5)*Math.cos(z*.037)+.7*Math.sin(x*.1+z*.08);for(const q of XF.hl)h+=xbump(x,z,q);const d=xsegD(x,z,XF.riv);if(d<17){const w=1-kss(5,17,d);h=h*(1-w)-1.9*w}return h};
  xCol=(x,z,y,s)=>y<1.4&&y>=0?kmix(khx(0x8a7a52),khx(0x5f8a3a),xclamp(y/1.4,0,1)):xland(x,z,y,s,0x5f9a3a,0x3f7a2a,0x6a6a5a,0)}
 else if(XT==='lunar'){XF.cr=[];for(let i=0;i<500&&XF.cr.length<16;i++){const q=[xf(-XS*.95,XS*.95),xf(-XS*.95,XS*.95),xf(9,30),xf(2.5,6)];if(Math.hypot(q[0],q[1])<q[2]+62||Math.hypot(q[0]-XS*.55,q[1]+XS*.45)<q[2]+24)continue;XF.cr.push(q)}
  xH=(x,z)=>{let h=2+.7*Math.sin(x*.045)*Math.cos(z*.05)+.35*Math.sin(x*.16+z*.12);for(const[cx,cz,R,dp]of XF.cr){const d=Math.hypot(x-cx,z-cz);if(d<R*.85)h-=dp*(1-(d/(R*.85))**2);const rd=(d-R)/(R*.22);if(Math.abs(rd)<1)h+=dp*.45*(Math.cos(rd*Math.PI)+1)/2}return h};
  xCol=(x,z,y,s)=>{const n=.5+.25*Math.sin(x*.31+z*.17)*Math.cos(z*.23-x*.11)+.25*Math.sin(x*.07-z*.05);let c=kmix(khx(0x8e8e8c),khx(0xb4b4b0),xclamp(n+(y-2)*.06,0,1));if(s>1.1)c=kmix(c,khx(0x6a6a68),Math.min(.7,(s-1.1)*.5));return c}}
 else if(XT==='bayou'){const nf=(x,z)=>.55*Math.sin(x*.042+.3)*Math.cos(z*.047)+.45*Math.sin(x*.017-z*.026+1)+.25*Math.sin(x*.09+z*.11);
  xH=(x,z)=>{const n=nf(x,z);return 1.1+.25*Math.sin(x*.2+z*.17)-3.1*kss(-.06,.22,n)};
  xCol=(x,z,y,s)=>y<0?kmix(khx(0x4a4a2a),khx(0x2a3a2a),xclamp(-y/2,0,1)):kmix(kmix(khx(0x6a5a3a),khx(0x5a6a32),xclamp(y*1.4,0,1)),khx(0x4a5a2a),xclamp(.5+.5*Math.sin(x*.09+z*.07),0,1)*.5)}
 else if(XT==='castle'){XF.hl=[];for(let i=0;i<12;i++){const q=[xf(-XS*.95,XS*.95),xf(-XS*.95,XS*.95),xf(22,40),xf(4,9)];if(Math.hypot(q[0],q[1]+10)<q[2]+75||Math.abs(q[1]-XS*.55)<q[2])continue;XF.hl.push(q)}
  XF.riv=[[-XS*1.1,XS*.5],[-XS*.45,XS*.62],[0,XS*.55],[XS*.5,XS*.68],[XS*1.1,XS*.58]];
  xH=(x,z)=>{let h=2.8+1.3*Math.sin(x*.035+.5)*Math.cos(z*.033)+.6*Math.sin(x*.09+z*.07);for(const q of XF.hl)h+=xbump(x,z,q);const dc=Math.hypot(x,z+10),k=1-kss(47,80,dc);h=h*(1-k)+18*k;const d=xsegD(x,z,XF.riv);if(d<17){const w=1-kss(5,17,d);h=h*(1-w)-1.9*w}return h};
  xCol=(x,z,y,s)=>y<1.2&&y>=0?kmix(khx(0x9a8a62),khx(0x6aa64c),xclamp(y/1.2,0,1)):xland(x,z,y,s,0x7fb84f,0x5a9a3a,0x7a7a72,0)}
 else if(XT==='cody'){
  // Cody from OpenStreetMap: a gently rising bench; the Shoshone River cut into a canyon along its real course; Beck Lake and the
  // reservoirs sunk into their real shorelines; Sulphur Creek and the Cody Canal as shallow ditches. Mountains rise beyond the town edge.
  const CD=typeof CODY!=='undefined'?CODY:{bb:[3018,1945],rv:[],wt:[],st:[],bd:[],rd:[],ar:[],nm:[],ch:{},tr:[],art:[],AT:[],TY:[],rl:[]};XF.cd=CD;
  const RS=8,SK=T.skirt||4300,RX=Math.ceil(2*SK/RS)+1,RZ=RX,cid=(i,j)=>j*RX+i,INF=1e9;
  const pl=a=>{const p=[];for(let i=0;i<a.length;i+=2)p.push([a[i],a[i+1]]);return p};
  // chamfer distance transform (metres) from seeded cells
  const cham=D=>{const a=RS,b=RS*1.4142;for(let j=0;j<RZ;j++)for(let i=0;i<RX;i++){const k=cid(i,j);let v=D[k];if(i>0)v=Math.min(v,D[k-1]+a);if(j>0){v=Math.min(v,D[k-RX]+a);if(i>0)v=Math.min(v,D[k-RX-1]+b);if(i<RX-1)v=Math.min(v,D[k-RX+1]+b)}D[k]=v}
   for(let j=RZ-1;j>=0;j--)for(let i=RX-1;i>=0;i--){const k=cid(i,j);let v=D[k];if(i<RX-1)v=Math.min(v,D[k+1]+a);if(j<RZ-1){v=Math.min(v,D[k+RX]+a);if(i<RX-1)v=Math.min(v,D[k+RX+1]+b);if(i>0)v=Math.min(v,D[k+RX-1]+b)}D[k]=v}};
  const seedLine=(D,P)=>{for(let s=0;s<P.length-1;s++){const[a,b]=[P[s],P[s+1]],L=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(L/3));for(let q=0;q<=n;q++){const x=a[0]+(b[0]-a[0])*q/n,z=a[1]+(b[1]-a[1])*q/n,i=Math.round((x+SK)/RS),j=Math.round((z+SK)/RS);
    for(let u=-1;u<=1;u++)for(let v=-1;v<=1;v++){const ii=i+u,jj=j+v;if(ii<0||jj<0||ii>=RX||jj>=RZ)continue;const d=Math.hypot(ii*RS-SK-x,jj*RS-SK-z),k=cid(ii,jj);if(d<D[k])D[k]=d}}}};
  const fillPoly=(P,f)=>{let z0=1e9,z1=-1e9;P.forEach(p=>{z0=Math.min(z0,p[1]);z1=Math.max(z1,p[1])});const j0=Math.max(0,Math.ceil((z0+SK)/RS)),j1=Math.min(RZ-1,Math.floor((z1+SK)/RS));
   for(let j=j0;j<=j1;j++){const z=j*RS-SK,xs=[];for(let i=0,k=P.length-1;i<P.length;k=i++){const a=P[i],b=P[k];if((a[1]>z)!==(b[1]>z))xs.push(a[0]+(z-a[1])*(b[0]-a[0])/(b[1]-a[1]))}xs.sort((p,q)=>p-q);
    for(let q=0;q+1<xs.length;q+=2){const i0=Math.max(0,Math.ceil((xs[q]+SK)/RS)),i1=Math.min(RX-1,Math.floor((xs[q+1]+SK)/RS));for(let i=i0;i<=i1;i++)f(cid(i,j))}}};
  const dR=new Float32Array(RX*RZ).fill(INF),dS=new Float32Array(RX*RZ).fill(INF),dI=new Float32Array(RX*RZ).fill(0),lid=new Int16Array(RX*RZ).fill(-1);
  seedLine(dR,pl(CD.rv));cham(dR);CD.st.forEach(s=>seedLine(dS,pl(s.slice(1))));cham(dS);
  const cn=(x,z)=>.45*Math.sin(x*.011+1.3)*Math.cos(z*.009)+.3*Math.sin(x*.023-z*.017)+.25*Math.sin(x*.05+z*.041);
  const mtn=(x,z)=>{let h=0;const ax=Math.abs(x),az=Math.abs(z);if(x<-3300)h+=320*kss(-3300,-4300,x)*(.7+.3*Math.sin(z*.004+1));if(z<-2350)h+=60*kss(-2350,-4300,z);if(z>2300)h+=70*kss(2300,4300,z)*(.8+.2*Math.sin(x*.003));if(x>3400)h+=30*kss(3400,4300,x);return h};
  // elevation: Cody sits on benches that rise toward the mountains to the south-west. Where the town is built up the ground only rolls
  // gently; open land (the bluffs, draws and sagebrush hills between the neighbourhoods and round the lakes) gets real hills.
  const DS=32,DN=Math.ceil(2*SK/DS)+1,dv=new Float32Array(DN*DN),dvi=(x,z)=>{const i=Math.round((x+SK)/DS),j=Math.round((z+SK)/DS);return i<0||j<0||i>=DN||j>=DN?-1:j*DN+i};
  CD.bd.forEach(b=>{let x=0,z=0,n=0;for(let i=3;i<b.length;i+=2){x+=b[i];z+=b[i+1];n++}const k=dvi(x/n,z/n);if(k>=0)dv[k]+=1});
  CD.rd.forEach(q=>{if(q[0]>1)return;for(let i=5;i+3<q.length;i+=2){const ax=q[i],az=q[i+1],bx=q[i+2],bz=q[i+3],L=Math.hypot(bx-ax,bz-az),m=Math.max(1,Math.ceil(L/16));for(let t=0;t<=m;t++){const k=dvi(ax+(bx-ax)*t/m,az+(bz-az)*t/m);if(k>=0)dv[k]+=.35}}});
  CD.wt.forEach(a=>{for(let i=0;i<a.length;i+=2){const k=dvi(a[i],a[i+1]);if(k>=0)dv[k]+=2}});
  CD.rd.forEach(q=>{if(q[3]!==99)return;for(let i=5;i+3<q.length;i+=2){const ax=q[i],az=q[i+1],bx=q[i+2],bz=q[i+3],L=Math.hypot(bx-ax,bz-az),m=Math.max(1,Math.ceil(L/12));for(let t=0;t<=m;t++)for(let o=-2;o<=2;o++){const k=dvi(ax+(bx-ax)*t/m+o*DS*(bz-az)/(L||1),az+(bz-az)*t/m-o*DS*(bx-ax)/(L||1));if(k>=0)dv[k]+=3}}});
  {const FL=['apron','golf','field','diamond','track','parking','campus','park','cemetery','court','pool','commercial','industrial'];CD.ar.forEach(a=>{if(!FL.includes(CD.AT[a[0]]))return;let z0=1e9,z1=-1e9;for(let i=2;i<a.length;i+=2){z0=Math.min(z0,a[i]);z1=Math.max(z1,a[i])}
   for(let z=Math.ceil(z0/DS)*DS;z<=z1;z+=DS){const xs=[];for(let i=1,n=(a.length-1)/2,k=n-1;i<a.length;i+=2){const ax=a[i],az=a[i+1],bx=a[1+2*k],bz=a[2+2*k];if((az>z)!==(bz>z))xs.push(ax+(z-az)*(bx-ax)/(bz-az));k=(i-1)/2}xs.sort((p,q)=>p-q);
    for(let q=0;q+1<xs.length;q+=2)for(let x=Math.ceil(xs[q]/DS)*DS;x<=xs[q+1];x+=DS){const k=dvi(x,z);if(k>=0)dv[k]+=1.4}}})}
  {const tmp=new Float32Array(DN*DN),R=4;for(let pass=0;pass<2;pass++){for(let j=0;j<DN;j++){let acc=0;for(let i=-R;i<DN+R;i++){if(i+R<DN)acc+=dv[j*DN+i+R];if(i-R-1>=0)acc-=dv[j*DN+i-R-1];if(i>=0&&i<DN)tmp[j*DN+i]=acc/(2*R+1)}}
    for(let i=0;i<DN;i++){let acc=0;for(let j=-R;j<DN+R;j++){if(j+R<DN)acc+=tmp[(j+R)*DN+i];if(j-R-1>=0)acc-=tmp[(j-R-1)*DN+i];if(j>=0&&j<DN)dv[j*DN+i]=acc/(2*R+1)}}}}
  const devA=(x,z)=>{const fx=(x+SK)/DS,fz=(z+SK)/DS,i=Math.max(0,Math.min(DN-2,Math.floor(fx))),j=Math.max(0,Math.min(DN-2,Math.floor(fz))),u=Math.max(0,Math.min(1,fx-i)),v=Math.max(0,Math.min(1,fz-j)),k=j*DN+i;
   return xclamp((dv[k]*(1-u)*(1-v)+dv[k+1]*u*(1-v)+dv[k+DN]*(1-u)*v+dv[k+DN+1]*u*v)/.55,0,1)};
  const vh=(i,j)=>{let h=(i*374761393+j*668265263)>>>0;h=Math.imul(h^(h>>>13),1274126177)>>>0;return((h^(h>>>16))>>>0)/4294967296};
  const vn=(x,z)=>{const i=Math.floor(x),j=Math.floor(z),u=x-i,v=z-j,su=u*u*(3-2*u),sv=v*v*(3-2*v),a=vh(i,j),b=vh(i+1,j),c=vh(i,j+1),d=vh(i+1,j+1);return(a+(b-a)*su+(c-a)*sv+(a-b-c+d)*su*sv)*2-1};
  const fbm=(x,z)=>vn(x/900+3.1,z/900+7.7)+.5*vn(x/420-2.3,z/420+1.9)+.27*vn(x/190+5.5,z/190-4.1)+.13*vn(x/85-8.2,z/85+2.6);
  const base=(x,z)=>{const d=devA(x,z),A=5.5+30*Math.pow(1-d,1.5);const f=fbm(x,z);return .5*cn(x,z)-x*.0062+z*.0095+A*(f<0?f*.6:f)+mtn(x,z)};XF.dev=devA;
  // lakes: inside mask + distance to shore, each with a flat water level a little below its lowest shore point
  const LK=[];CD.wt.forEach((a,n)=>{const P=pl(a);let lv=1e9;P.forEach(p=>lv=Math.min(lv,base(p[0],p[1])));lv-=.8;LK.push({p:P,lv});fillPoly(P,k=>{lid[k]=n})});
  {const D=dI;for(let k=0;k<D.length;k++)D[k]=lid[k]>=0?INF:0;cham(D)}XF.LK=LK;
  const samp=(A,x,z)=>{const fx=(x+SK)/RS,fz=(z+SK)/RS,i=Math.max(0,Math.min(RX-2,Math.floor(fx))),j=Math.max(0,Math.min(RZ-2,Math.floor(fz))),u=Math.max(0,Math.min(1,fx-i)),v=Math.max(0,Math.min(1,fz-j)),k=cid(i,j);
   return A[k]*(1-u)*(1-v)+A[k+1]*u*(1-v)+A[k+RX]*(1-u)*v+A[k+RX+1]*u*v};
  XF.dRf=(x,z)=>samp(dR,x,z);
  xH=(x,z)=>{let h=base(x,z);const r=samp(dR,x,z);
   if(r<80){const bank=r<14?-35:r<24?-35+5.5*(r-14)/10:-29.5;h=r<24?bank:-29.5+(h+29.5)*kss(24,78,r)}
   const s=samp(dS,x,z);if(s<6)h-=1.3*(1-kss(1.5,6,s));
   const fi=(x+SK)/RS,fj=(z+SK)/RS,ii=Math.round(fi),jj=Math.round(fj);if(ii>=0&&jj>=0&&ii<RX&&jj<RZ){const L=lid[cid(ii,jj)];if(L>=0){const di=samp(dI,x,z);h=Math.min(h,LK[L].lv-.25-1.1*kss(0,30,di))}}
   return h};
  const BB=CD.bb;
  xCol=(x,z,y,s)=>{const inb=Math.abs(x)<BB[0]&&Math.abs(z)<BB[1],nn=.5+.5*Math.sin(x*.07+z*.05)*Math.cos(z*.09-x*.03);
   let c=inb?kmix(khx(0x9a9868),khx(0x8e9560),nn*.3):kmix(khx(0xb4a87e),khx(0xa29f74),nn*.4);
   if(y>40)c=kmix(c,khx(0x8a7e6c),xclamp((y-40)/160,0,1));
   const r=samp(dR,x,z);if(r<80&&y<base(x,z)-3)c=kmix(c,khx(0xa88e6c),xclamp((base(x,z)-3-y)/10,0,1));
   if(y<-28.5)c=kmix(c,khx(0x6f7d4c),xclamp((-28.5-y)/1.5,0,1));if(y<-31)c=kmix(khx(0x47909a),khx(0x24566a),xclamp((-31-y)/4,0,1));
   if(s>1.2)c=kmix(c,khx(0x9a7e60),Math.min(.85,(s-1.2)*.45));return c}}
 else if(XT==='volc'){// Volcano Isle: round island, a volcano with a lava crater, lava channels to the sea, black-sand beaches
  XF.vc=[-24,-34];XF.lv=[[-24,-34],[10,-62],[48,-96],[78,-140],[96,-200],[104,-260]];XF.lv2=[[-24,-34],[-62,-58],[-104,-82],[-150,-110],[-200,-130]];
  const isl=(x,z)=>{const a=Math.atan2(z,x);return 192+12*Math.sin(3*a+.6)+8*Math.sin(5*a+2.1)+5*Math.sin(11*a+.3)};XF.isl=isl;XF.out={lava:{vc:XF.vc,ch:[XF.lv,XF.lv2],isl}};XF.tok=(x,z)=>Math.hypot(x-XF.vc[0],z-XF.vc[1])>78;
  xH=(x,z)=>{const d=Math.hypot(x,z),t=isl(x,z)-d;let h=t<0?Math.max(-11,t*.22):Math.min(t*.09,1.8)+kss(12,55,t)*(1.6+1.3*Math.sin(x*.03+.4)*Math.cos(z*.027)+.6*Math.sin(x*.09+z*.07));
   const dv=Math.hypot(x-XF.vc[0],z-XF.vc[1]);if(t>-4){const cone=56*Math.pow(Math.max(0,1-dv/125),1.4)*kss(-4,30,t);h+=cone;if(dv<21){const k=1-kss(13,21,dv);h=h*(1-k)+33*k}
    if(dv>17){const lc=Math.min(xsegD(x,z,XF.lv),xsegD(x,z,XF.lv2));if(lc<7)h-=2*(1-kss(2.5,7,lc))*kss(17,30,dv)}}return h};
  xCol=(x,z,y,s)=>{if(y<0)return kmix(kmix(khx(0x2a2a2a),khx(0x2f7f88),xclamp(-y/1.6,0,1)),khx(0x153e52),xclamp((-y-1.6)/6,0,1));
   const dv=Math.hypot(x-XF.vc[0],z-XF.vc[1]);if(dv<16&&y<34.5)return kmix(khx(0xff7a1a),khx(0xffc040),xclamp(.5+.5*Math.sin(x*.6+z*.4),0,1));
   const lc=Math.min(xsegD(x,z,XF.lv),xsegD(x,z,XF.lv2));if(lc<3.2&&dv>17)return kmix(khx(0xe0501a),khx(0xff9a2a),xclamp(.5+.5*Math.sin(x*.3-z*.5),0,1));
   let c=y<.6?khx(0x2c2a28):y<2.3?kmix(khx(0x3a3734),khx(0x4a4640),xclamp(Math.sin(x*.2+z*.13)*.5+.5,0,1)):kmix(khx(0x4f9a3a),khx(0x2f7a2f),xclamp(.5+.4*Math.sin(x*.05+z*.04),0,1));
   if(y>=2.3&&y<3.2)c=kmix(khx(0x4a4640),c,(y-2.3)/.9);{const dv2=Math.hypot(x-XF.vc[0],z-XF.vc[1]);c=kmix(c,khx(0x4a4440),kss(95,60,dv2));c=kmix(c,khx(0x2e2a28),kss(55,30,dv2)*.8)}if(y>30)c=kmix(c,khx(0x3a3634),xclamp((y-30)/8,0,1));if(lc<6&&dv>17)c=kmix(khx(0x2a2420),c,kss(3.2,6,lc));
   if(s>1.2)c=kmix(c,khx(0x3a3634),Math.min(.85,(s-1.2)*.5));return c}}
 else if(XT==='dune'){// Dune Sea: long sand dunes, flat pans between them and a palm oasis
  XF.oa=[54,46,30];
  xH=(x,z)=>{const w=Math.sin(x*.019+z*.011+1.7*Math.sin(z*.009)),dn=Math.pow(Math.abs(w),1.7);let h=2.4+5.2*dn+1.6*Math.sin(x*.043+.5)*Math.cos(z*.037)+.7*Math.sin(x*.11+z*.083);
   const e=Math.max(Math.abs(x),Math.abs(z))/XS;h+=10*kss(.8,1.05,e);const od=Math.hypot(x-XF.oa[0],z-XF.oa[1])/XF.oa[2];if(od<1.6){const k=1-kss(.75,1.6,od);h=h*(1-k)+(od<1?-1.6*(1-od*od)+.3:1.4)*k}return Math.max(h,od<1?-3:.9)};
  xCol=(x,z,y,s)=>{const od=Math.hypot(x-XF.oa[0],z-XF.oa[1])/XF.oa[2];if(y<0)return kmix(khx(0x8a9a6a),khx(0x2f7f8a),xclamp(-y/1.4,0,1));
   if(od<1.25)return kmix(khx(0x6a8a3a),khx(0xd8b878),kss(1,1.25,od));let c=kmix(khx(0xe2c088),khx(0xd2a868),xclamp(.5+.45*Math.sin(x*.031-z*.02)+.25*Math.sin(x*.13+z*.11),0,1));
   if(s>.9)c=kmix(c,khx(0xc08a52),Math.min(.6,(s-.9)*.5));return c}}
 else if(XT==='redwood'){// Redwood Valley: a river through a forested valley, steep wooded sides
  XF.riv=[[-XS*1.15,-26],[-XS*.55,8],[-XS*.1,-14],[XS*.35,20],[XS*.75,-2],[XS*1.15,14]];
  xH=(x,z)=>{const rc=xsegD(x,z,XF.riv);let h=2.4+28*Math.pow(xclamp((rc-34)/170,0,1),1.25)+1.8*Math.sin(x*.035+.3)*Math.cos(z*.031)+.9*Math.sin(x*.1+z*.083);
   if(rc<17){const k=kss(6,17,rc);h=h*k+(-2.6)*(1-k)}return h};
  xCol=(x,z,y,s)=>{if(y<0)return kmix(khx(0x6a6a4a),khx(0x2f6a5a),xclamp(-y/1.6,0,1));const rc=xsegD(x,z,XF.riv);if(rc<19)return kmix(khx(0x9a8a6a),khx(0x4a7a3a),kss(13,19,rc));
   let c=kmix(khx(0x3f6a2a),khx(0x5a7a32),xclamp(.5+.45*Math.sin(x*.05+z*.04)+.2*Math.sin(x*.16-z*.12),0,1));c=kmix(c,khx(0x6a5a3a),xclamp(.35+.35*Math.sin(x*.21+z*.17),0,.5));
   if(s>1.3)c=kmix(c,khx(0x6a6a62),Math.min(.85,(s-1.3)*.55));return c}}
 else if(XT==='mil'){// Fort Ironclad: a flat base on scrubland, hills rising to the edge
  XF.tok=(x,z)=>!(x>-182&&x<182&&z>-146&&z<106)||(x<-60&&z>118);
  XF.hl=[];for(let i=0;i<300&&XF.hl.length<10;i++){const q=[xf(-XS*.95,XS*.95),xf(-XS*.95,XS*.95),xf(26,46),xf(5,12)];if(Math.max(Math.abs(q[0]),Math.abs(q[1]))>XS*.62)XF.hl.push(q)}
  xH=(x,z)=>{let h=2+.9*Math.sin(x*.028+.2)*Math.cos(z*.026)+.4*Math.sin(x*.09+z*.071);for(const q of XF.hl)h+=xbump(x,z,q);const e=Math.max(Math.abs(x),Math.abs(z))/XS;return h+14*kss(.78,1.04,e)};
  xCol=(x,z,y,s)=>{let c=kmix(khx(0x8a9a5a),khx(0x9a8a5a),xclamp(.5+.45*Math.sin(x*.04+z*.035)+.25*Math.sin(x*.15-z*.11),0,1));c=kmix(c,khx(0xa89a72),xclamp(.3*Math.sin(x*.23+z*.19),0,.35));
   if(s>1.2)c=kmix(c,khx(0x7a7466),Math.min(.85,(s-1.2)*.5));return c}}
 else if(XT==='sav'){// Savanna: golden plains, granite kopjes, a watering hole and a dry riverbed
  XF.kp=[];for(let i=0;i<400&&XF.kp.length<9;i++){const q=[xf(-XS*.85,XS*.85),xf(-XS*.85,XS*.85),xf(16,30),xf(8,16)];if(Math.hypot(q[0]+40,q[1]-40)>q[2]+50&&XF.kp.every(o=>Math.hypot(o[0]-q[0],o[1]-q[1])>o[2]+q[2]+30))XF.kp.push(q)}
  XF.wh=[-40,40,30];XF.dr=[[-XS*1.1,-XS*.35],[-XS*.4,-XS*.22],[XS*.1,-XS*.42],[XS*.6,-XS*.3],[XS*1.1,-XS*.48]];
  xH=(x,z)=>{let h=2.6+1.3*Math.sin(x*.022+.6)*Math.cos(z*.019)+.6*Math.sin(x*.07+z*.05);for(const q of XF.kp){const d=Math.hypot(x-q[0],z-q[1])/q[2];if(d<1)h+=q[3]*Math.pow(1-d*d,.6)*(1+.15*Math.sin(x*.7+z*.5))}
   const wd=Math.hypot(x-XF.wh[0],z-XF.wh[1])/XF.wh[2];if(wd<1.5){const k=1-kss(.8,1.5,wd);h=h*(1-k)+(wd<1?-1.5*(1-wd*wd)+.2:1.4)*k}
   const rd=xsegD(x,z,XF.dr);if(rd<10)h-=1.6*(1-kss(4,10,rd));const e=Math.max(Math.abs(x),Math.abs(z))/XS;h+=10*kss(.82,1.05,e);return Math.max(h,wd<1?-3:.8)};
  xCol=(x,z,y,s)=>{if(y<0)return kmix(khx(0x7a6a4a),khx(0x4a6a5a),xclamp(-y/1.4,0,1));const wd=Math.hypot(x-XF.wh[0],z-XF.wh[1])/XF.wh[2];if(wd<1.2)return kmix(khx(0x7a6a48),khx(0xc8b064),kss(1,1.2,wd));
   const rd=xsegD(x,z,XF.dr);if(rd<5)return kmix(khx(0xd8c098),khx(0xc8b064),kss(3,5,rd));let c=kmix(khx(0xd2b868),khx(0xb89a4a),xclamp(.5+.45*Math.sin(x*.037+z*.029)+.25*Math.sin(x*.14-z*.1),0,1));
   if(s>.8)c=kmix(c,khx(0x9a8a7a),Math.min(.9,(s-.8)*.7));return c}}
 else if(XT==='pine'){// Pine Lake: a big lake with an island in the north, a river across the south, pine hills and mountains round the edge
  XF.lk=[60,-170,120,75];XF.isl=[80,-172,18];XF.riv=[[-XS*1.15,214],[-250,238],[-120,204],[0,232],[140,206],[280,236],[XS*1.15,216]];
  XF.tw=[[230,25,135],[60,-300,105],[-250,-80,80],[-220,125,115],[30,110,65],[120,305,100],[-110,-205,55],[-280,-262,70],[-95,-35,80],[318,-120,55]];
  XF.hl=[];for(let i=0;i<800&&XF.hl.length<16;i++){const q=[xf(-XS*.85,XS*.85),xf(-XS*.85,XS*.7),xf(38,70),xf(6,16)];if(XF.tw.some(t=>Math.hypot(q[0]-t[0],q[1]-t[1])<t[2]+q[2]+10))continue;
   if(Math.hypot((q[0]-60)/120,(q[1]+170)/75)<1.75)continue;if(xsegD(q[0],q[1],XF.riv)<q[2]+30)continue;if(Math.abs(q[1]-20)<q[2]+14||Math.abs(q[0]-20)<q[2]+10)continue;XF.hl.push(q)}
  XF.out={carP:[[-260,20,Math.PI/2],[-40,20,-Math.PI/2],[20,0,Math.PI],[230,-150,Math.PI],[-268,125,Math.PI/2]],rb:XS-4};
  xH=(x,z)=>{let h=3+2.2*Math.sin(x*.013+.4)*Math.cos(z*.011)+.9*Math.sin(x*.05+z*.04)+.35*Math.sin(x*.13-z*.11);for(const q of XF.hl)h+=xbump(x,z,q);
   const e=Math.max(Math.abs(x),Math.abs(z))/XS;h+=34*Math.pow(kss(.8,1.04,e),1.2)*(1+.25*Math.sin(x*.02+z*.017));
   const ld=Math.hypot((x-60)/120,(z+170)/75);if(ld<1.4){const k=1-kss(.88,1.4,ld);h=h*(1-k)+(ld<1?-.4-3.4*(1-ld*ld):.9)*k}
   {const id=Math.hypot(x-80,z+172)/18;if(id<1.4){const k=1-kss(.75,1.4,id);h=h*(1-k)+2.6*k}}
   const rc=xsegD(x,z,XF.riv);if(rc<17){const k=kss(6,17,rc);h=h*k+(-2.6)*(1-k)}return h};
  xCol=(x,z,y,s)=>{if(y<0)return kmix(kmix(khx(0x8a8a62),khx(0x2f6f7a),xclamp(-y/1.6,0,1)),khx(0x1d4a5e),xclamp((-y-1.6)/4,0,1));
   if(y<1.25){const ld=Math.hypot((x-60)/120,(z+170)/75);if(ld<1.18||Math.hypot(x-80,z+172)<24)return kmix(khx(0xd8c494),khx(0x5f9a3a),xclamp((y-.4)/.85,0,1))}
   const rc=xsegD(x,z,XF.riv);if(rc<19)return kmix(khx(0x9a8a6a),khx(0x4f8a3a),kss(13,19,rc));
   let c=kmix(khx(0x4f8a3a),khx(0x3f7a32),xclamp(.5+.45*Math.sin(x*.04+z*.035)+.2*Math.sin(x*.15-z*.12),0,1));if(y>24)c=kmix(c,khx(0x7a7a72),xclamp((y-24)/10,0,1));if(y>36)c=kmix(c,khx(0xe8eef2),xclamp((y-36)/6,0,1));
   if(s>1.25)c=kmix(c,khx(0x7a756a),Math.min(.85,(s-1.25)*.55));return c}}
 else if(XT==='bay'){// Sunset Bay: ocean along the south with a rocky headland, beaches, hills to the north with a quarry
  const zc=x=>205+28*Math.sin(x*.009+.5)+12*Math.sin(x*.023+1.1)+95*Math.exp(-Math.pow((x-300)/42,2));XF.zc=zc;XF.q=[-262,-305,50];
  XF.tw=[[0,-10,135],[0,-235,180],[-230,140,110],[-310,5,75],[265,40,80],[-160,82,40],[292,255,30],[260,-150,100],[-300,-140,75],[-190,-40,55]];
  XF.hl=[];for(let i=0;i<800&&XF.hl.length<12;i++){const q=[xf(-XS*.85,XS*.85),xf(-XS*.85,XS*.2),xf(35,65),xf(6,15)];if(XF.tw.some(t=>Math.hypot(q[0]-t[0],q[1]-t[1])<t[2]+q[2]+10))continue;
   if(Math.hypot(q[0]-XF.q[0],q[1]-XF.q[1])<q[2]+XF.q[2]+10||zc(q[0])-q[1]<q[2]+60||Math.abs(q[1]-100)<q[2]+14||Math.abs(q[0])<q[2]+10)continue;XF.hl.push(q)}
  XF.out={carP:[[-250,100,Math.PI/2],[250,100,-Math.PI/2],[0,-150,Math.PI],[160,50,Math.PI/2],[-250,140,Math.PI/2]],rb:XS-4};
  xH=(x,z)=>{const t=zc(x)-z;let h=t<0?Math.max(-10,t*.2):Math.min(t*.07,1.4)+kss(18,70,t)*(1.7+1.5*Math.sin(x*.016+.3)*Math.cos(z*.014)+.5*Math.sin(x*.06+z*.05));
   const hk=kss(10,60,t);h+=26*kss(-140,-390,z)*(.75+.25*Math.sin(x*.012+1))*hk;for(const q of XF.hl)h+=xbump(x,z,q)*hk;
   const e=Math.max(Math.abs(x),-z)/XS;h+=26*kss(.84,1.04,e)*kss(30,90,t);
   h+=9*Math.exp(-Math.pow((x-300)/30,2))*kss(2,30,t);
   {const d=Math.hypot(x-XF.q[0],z-XF.q[1])/XF.q[2];if(d<1.3){const k=1-kss(.72,1.3,d);h=h*(1-k)+4*k}}return h};
  xCol=(x,z,y,s)=>{const t=zc(x)-z;if(y<0)return kmix(kmix(khx(0xd8c48e),khx(0x46b5a8),xclamp(-y/1.6,0,1)),khx(0x1d6f88),xclamp((-y-1.6)/6,0,1));
   if(t<26&&y<3.2)return kmix(khx(0xf2e2b4),khx(0x7fbf4d),kss(2.2,3.2,y)*kss(18,26,t));
   if(Math.hypot(x-XF.q[0],z-XF.q[1])<XF.q[2]*1.15)return kmix(khx(0xb0a490),khx(0x9a8e7a),xclamp(.5+.4*Math.sin(x*.3+z*.2),0,1));
   let c=kmix(khx(0x7fbf4d),khx(0x62a83e),xclamp(.5+.45*Math.sin(x*.045+z*.04)+.2*Math.sin(x*.17-z*.13),0,1));if(y>22)c=kmix(c,khx(0x9a8e72),xclamp((y-22)/12,0,.7));
   if(s>1.2)c=kmix(c,khx(0x8a7c62),Math.min(.9,(s-1.2)*.6));return c}}
 else if(XT==='city2'){xH=(x,z)=>1;xCol=(x,z,y,s)=>kmix(khx(0x4a4c52),khx(0x55575c),xclamp(.5+.3*Math.sin(x*.21+z*.17),0,1))}
 else if(XT==='ind'){xH=(x,z)=>1+.15*Math.sin(x*.05)*Math.cos(z*.06);xCol=(x,z,y,s)=>kmix(khx(0x8a857a),khx(0x77736a),xclamp(.5+.4*Math.sin(x*.13+z*.11)+.2*Math.sin(x*.41-z*.37),0,1))}
 else if(XT==='camp'){XF.lk=[30,28,24];
  xH=(x,z)=>{let h=1.6+.9*Math.sin(x*.06+.4)*Math.cos(z*.05)+.4*Math.sin(x*.15+z*.12);const d=Math.hypot(x-XF.lk[0],z-XF.lk[1])/XF.lk[2];if(d<1.5){const k=1-kss(.8,1.5,d);h=h*(1-k)+(d<1?-2.2*(1-d*d)+.3:1.2)*k}return Math.max(h,d<1?-3:.7)};
  xCol=(x,z,y,s)=>{if(y<0)return kmix(khx(0x8a8a6a),khx(0x2f6f7a),xclamp(-y/1.6,0,1));const d=Math.hypot(x-XF.lk[0],z-XF.lk[1])/XF.lk[2];if(d<1.12)return kmix(khx(0xd8c494),khx(0x5f9a3a),kss(1,1.12,d));return xland(x,z,y,s,0x5f9a3a,0x4a8a32,0x7a7a72,null)}}
 else if(XT==='arena'){xH=(x,z)=>1.2+(Math.hypot(x,z)>44?.2*Math.sin(x*.07)*Math.cos(z*.06):0);
  xCol=(x,z,y,s)=>{const d=Math.hypot(x,z);if(d<25)return kmix(khx(0xe2c890),khx(0xd4b478),xclamp(.5+.4*Math.sin(x*.4+z*.3),0,1));if(d<42)return khx(0xb8b0a0);return kmix(khx(0xc8bea8),khx(0xb0a890),xclamp(.5+.4*Math.sin(x*.2+z*.17),0,1))}}
 else if(XT==='flat'){xH=(x,z)=>1+.25*Math.sin(x*.05)*Math.cos(z*.06);xCol=(x,z,y,s)=>xland(x,z,y,s,0x7fc24f,0x62a83e,0x8a7c62,null)}
 else if(XT==='archi'){XF.is=[[0,0,82,10],[150,0,48,6],[-150,0,48,6],[0,150,50,6],[0,-150,46,8],[114,-118,32,4],[-118,114,34,5],[120,122,24,1]];
  xH=(x,z)=>{let h=-7+.6*Math.sin(x*.05)*Math.cos(z*.04);for(const[cx,cz,r,hh]of XF.is){const d=Math.hypot(x-cx,z-cz),t=r-d+3*Math.sin(Math.atan2(z-cz,x-cx)*4+cx);const v=t<0?t*.24:1.6*kss(0,10,t)+hh*kss(r*.2,r*.8,t)+(t>0?-.2:0);h=Math.max(h,v)}return h};
  xCol=null}
 for(let i=0;i<T.hills;i++)hills.push([fr(-S,S),fr(-S,S),fr(14,28),fr(T.h[0],T.h[1])*(i<(T.neg||0)?-.7:1)]);
 const hb0=(x,z)=>{let h=T.ro*(Math.sin(x*.21+1.3)*Math.cos(z*.17)+.8*Math.sin(x*.06+z*.08));for(const q of hills){const d=Math.hypot(x-q[0],z-q[1])/q[2];if(d<1)h+=q[3]*(Math.cos(d*Math.PI)+1)/2}return h};
 const hb=T.isle?isleH:T.snowmap?snowH:xH?xH:hb0;
 // ================= planning: register flat pads, basements and building lots (no H() calls yet) =================
 const TR=(ro,a,b)=>ro==0?[a,b]:ro==1?[b,-a]:ro==2?[-a,-b]:[-b,a],IT=(ro,a,b)=>ro==0?[a,b]:ro==1?[-b,a]:ro==2?[-a,-b]:[b,-a];
 const wrect=(h,q)=>{const[a,b]=TR(h.r,q[0],q[1]),[c,d]=TR(h.r,q[2],q[3]);return[h.x+Math.min(a,c),h.z+Math.min(b,d),h.x+Math.max(a,c),h.z+Math.max(b,d)]};
 const lrect=(h,q)=>{const[a,b]=IT(h.r,q[0]-h.x,q[1]-h.z),[c,d]=IT(h.r,q[2]-h.x,q[3]-h.z);return[Math.min(a,c),Math.min(b,d),Math.max(a,c),Math.max(b,d)]};
 const town=(x0,z0,x1,z1,G,s)=>pads.push({x:(x0+x1)/2,z:(z0+z1)/2,w:(x1-x0)/2,d:(z1-z0)/2,h:G,s:s||14});
 const road=(x1,z1,x2,z2,w,k,noOcc)=>{k=k||'a';RD.push([x1,z1,x2,z2,w,k]);const ax=z1===z2;
  if(k=='a'){const o=w/2+.8;RD.push(ax?[x1,z1-o,x2,z2-o,1.6,'u']:[x1-o,z1,x2-o,z2,1.6,'u'],ax?[x1,z1+o,x2,z2+o,1.6,'u']:[x1+o,z1,x2+o,z2,1.6,'u'])}
  if(!noOcc){const m=w/2+(k=='a'?1.8:.5);occR.push([Math.min(x1,x2)-m,Math.min(z1,z2)-m,Math.max(x1,x2)+m,Math.max(z1,z2)+m])}};
 const C={trim:[0xf4f2ea,0xf4f2ea,0xe9e4d6,0x3b3f44],door:[0xa8322a,0x2a4a7a,0x2f6040,0xf2efe6,0x6b4423,0x2b2b2b,0x7a1f2b],lin:[0xf1ead8,0xdde7ee,0xeadccc,0xf4f0e6,0xd9e4d0,0xf2e2e2]};
 const ST={
  sub:()=>{const two=r()<.72,br=r()<.3;return{st:'sub',W:pick([13,14,14,15]),D:pick([10,11]),NS:two?2:1,base:r()<.55,gar:r()<.5,roof:'gable',wt:br?'b':'w',
   wc:br?pick([0xb5654a,0xa35845,0xc27f60]):pick([0xf0ede4,0xbcd0e0,0xe8d7a0,0xb3cba8,0xdcc3b6,0xa6b6c8,0xe4e0d0,0x98ad9a,0xd8a4a0,0xc9b48a]),wt2:br&&two&&r()<.6?'w':0,wc2:pick([0xf0ede4,0xe4e0d0,0xbcd0e0]),
   rc:pick([0x4a4f57,0x5c4636,0x3b4a5a,0x6b3a2e,0x3f5a46,0x55565a,0x2f3338]),rt:'t',tc:pick(C.trim),dc:pick(C.door),lc:pick(C.lin),porch:r()<.75,fence:r()<.65,chim:r()<.5,car:r()<.55,
   fl:pick([0xb08455,0x9c6b3e,0xc49a6c,0x8a5a3a]),cp:pick([0x8a9bb0,0xb09a8a,0x9ab08f,0xa88aa0,0xc9c2b0])}},
  villa:()=>{const two=r()<.5,fl=r()<.35;return{st:'villa',W:pick([12,13,14]),D:pick([10,11]),NS:two?2:1,base:r()<.35,gar:!fl&&r()<.15,roof:fl?'flat':'gable',acc:fl&&!two,wt:'v',
   wc:pick([0xf3ece0,0xf0e2c8,0xe9d8c0,0xf6f1e8,0xe8cfae,0xf2e6d0]),rc:pick([0xc0603a,0xb5532f,0xa8492b,0xc9714a]),rt:'h',tc:pick([0xf6f2ea,0x6b4a2c,0x2f5d6a]),dc:pick([0x6b4423,0x2f5d6a,0x8a5a3a,0x2f6040]),
   lc:pick(C.lin),porch:r()<.4,shut:r()<.6,shc:pick([0x2f6a5a,0x2a4a7a,0x7a3a22,0x5a7a3a]),fl:0xc8a27a,cp:0xb58a6a,flr:'i'}},
  adobe:()=>{const two=r()<.4;return{st:'adobe',W:pick([10,11,12]),D:pick([9,10]),NS:two?2:1,base:0,roof:'flat',acc:!two,wt:'v',wc:pick([0xe6cfa6,0xd9b98a,0xe8d5b5,0xd4a979,0xefe0c4,0xc99a6e]),
   rc:0xb89a74,rt:'c',tc:pick([0x8a5a3a,0x6b4423,0xe8dcc0]),dc:pick([0x6b4423,0x2f5d6a,0x8a3a2a]),lc:pick([0xefe2c8,0xe8d6b8]),shut:r()<.5,shc:pick([0x3a6a7a,0x6b4423,0x2f6040]),fl:0xb89470,cp:0xa86a4a,awn:r()<.6,flr:'i'}},
  cabin:()=>{const two=r()<.4;return{st:'cabin',W:pick([11,12,13]),D:pick([9,10]),NS:two?2:1,base:r()<.35,roof:'gable',wt:'l',wc:pick([0x8b5a36,0x7a4e2e,0x9c6a40,0x6e4a30]),
   rc:pick([0xeef3f7,0xeef3f7,0x4a3a30,0x3b4a3f]),rt:'t',tc:0x5a3a22,dc:pick([0x6b4423,0x7a1f2b,0x2f4a3a]),lc:pick([0xc8a274,0xd9b88c]),lin:'l',porch:1,chim:1,fl:0x9c6b3e,cp:0x8a3a3a}},
  crypt:()=>({st:'crypt',W:pick([6,7]),D:pick([8,9]),NS:1,FH:3.6,base:0,roof:'gable',part:0,win:0,wt:'s',wc:pick([0x8a8f94,0x7a7f86,0x9aa0a4,0x6f757b]),rc:0x4a4f56,rt:'s',tc:null,dc:0x2b2b2b,lc:0x6a6f75,lin:'s',fl:0x5a5f66,flr:'s'}),
  church:()=>({st:'church',W:11,D:19,NS:1,FH:6,base:0,roof:'gable',part:0,wt:'s',wc:0x8c9196,rc:0x3e444b,rt:'s',tc:0x5a5f66,dc:0x4a2a1a,lc:0x7f848a,lin:'s',fl:0x6a5a4a,flr:'k',rise:5}),
  ware:()=>({st:'ware',W:pick([22,24]),D:14,NS:1,FH:6,base:0,roof:'flat',part:'office',wt:'m',wc:pick([0x9aa3aa,0x7d8b96,0xb8b2a0,0x6b7d8c,0xa65a3a]),rc:0x6b6f74,rt:'c',tc:0x3b3f44,dc:0x4a5560,lc:0xc9ccd0,lin:'m',fl:0x8f9296,flr:'c',hiwin:1}),
  office:()=>({st:'office',W:12,D:10,NS:2,base:r()<.5,roof:'flat',wt:'c',wc:pick([0xc9c7c0,0xb7b9bd]),rc:0x6b6f74,rt:'c',tc:0x3b3f44,dc:0x3b5a7a,lc:0xe9ebec,fl:0x9a9ea3,flr:'c',cp:0x6a7a8a}),
  shop:()=>({st:'shop',W:12,D:8,NS:1,FH:3.6,base:0,roof:'flat',part:0,wt:'b',wc:0xcfcac0,rc:0x6b6f74,rt:'c',tc:0xc23b2f,dc:0xd8e6ee,lc:0xf1f1ee,fl:0xd8d8d8,flr:'i',shopwin:1}),
  trop:()=>{const two=r()<.45,fl=r()<.3;return{st:'villa',W:pick([10,11,12]),D:pick([9,10]),NS:two?2:1,base:0,gar:0,roof:fl?'flat':'gable',acc:fl&&!two,wt:'v',
   wc:pick([0xf4c7cf,0xbfe6df,0xf7e4a2,0xaed3f2,0xf5bd96,0xd9c6ef,0xf6f1e6,0xc8e6a8]),rc:pick([0xc0603a,0x3f8f9a,0x5a8f4a,0xb5532f,0x2f6f8a]),rt:pick(['h','h','m']),tc:0xfbfaf6,
   dc:pick([0x2f8f9a,0x2a6a9a,0xe0a030,0x3a8a4a,0xc0503a]),lc:pick(C.lin),porch:r()<.6,shut:r()<.75,shc:pick([0x2f8f9a,0x2a6a9a,0xe0a030,0x3a8a4a,0xffffff]),fl:0xc8a27a,cp:0xb58a6a,flr:'i'}},
  bung:()=>({st:'cabin',W:8,D:7,NS:1,base:0,gar:0,roof:'gable',wt:'w',wc:pick([0x6fc3c9,0xf2d16b,0xf29a8a,0xa3d977,0xf5f0e4]),rc:0xd9c08a,rt:'z',tc:0xfbfaf6,
   dc:pick([0x2f8f9a,0xe0a030,0xc0503a]),lc:0xf0e6d0,lin:'w',porch:1,chim:0,fl:0xb08455,cp:0xc9b48a}),
  keep:()=>({st:'keep',W:12,D:10,NS:2,FH:3.4,base:0,gar:0,roof:'flat',wt:'2',wc:0xd6cbb3,rc:0xa89c86,rt:'c',tc:null,dc:0x4a2e1a,lc:0xd8cfbe,lin:'2',fl:0x8a7a62,flr:'s',porch:0})
};
 const planHouse=h=>{if(h.NS>1&&h.part!=='office'&&h.W<4.2+Math.ceil((h.FH||3.3)/.42)*.7)h.NS=1;h.x=Math.round(h.x/2)*2;h.z=Math.round(h.z/2)*2;const gw=h.gar?6.5:0,pf=h.porch?2.6:.4,yd=h.yard||0;
  const fpR=wrect(h,[-h.W/2-1.4,-h.D/2-pf-.6,h.W/2+gw+1.4,h.D/2+1.4]);
  if(!h.force&&(occR.some(q=>rectHit(q,fpR))||Math.max(-fpR[0],-fpR[1],fpR[2],fpR[3])>S-7))return 0;
  occR.push(fpR);if(yd)occR.push(wrect(h,[-h.W/2,-h.D/2-yd,h.W/2+gw,-h.D/2]));
  if(h.G==null)h.G=hb(h.x,h.z);
  const pr=wrect(h,[-h.W/2-1,-h.D/2-Math.max(pf,yd)-.5,h.W/2+gw+1,h.D/2+1]);if(!h.nopad)pads.push({x:(pr[0]+pr[2])/2,z:(pr[1]+pr[3])/2,w:(pr[2]-pr[0])/2,d:(pr[3]-pr[1])/2,h:h.G,s:h.ps||6,hard:1});
  if(h.base&&T.wl!=null&&h.G-3.4<T.wl+.3)h.base=0;
  if(h.base){const w=wrect(h,[-h.W/2+.45,-h.D/2+.45,h.W/2-.45,h.D/2-.45]),q=[Math.ceil(w[0]/2)*2,Math.ceil(w[1]/2)*2,Math.floor(w[2]/2)*2,Math.floor(w[3]/2)*2],l=lrect(h,q);
   if(l[2]-l[0]>=6.9&&l[3]-l[1]>=3.5){h.B=l;pits.push([...q,h.G-3])}else h.base=0}
  if(h.biz=='?'){h.biz=WVQ('biz'+h.bpl,BIZP[h.bpl]||BIZP.def);if(BIZOPEN.includes(h.biz))h.gl='open'}if(h.bz=='?ff')h.bz=WVQ('ff',['arcade','pizza','toys','cafe','diner']);
 HP.push(h);return h};
 // ================= interiors =================
 // Every room is furnished from a recipe for its use. A piece goes against a wall or into the open, never on a door
 // swing, a stair or a hole, never in front of a window if it is tall, and only if every door and stair on that floor
 // can still be walked to (checked on a 25 cm grid with the player's radius).
 const shd=(c,f)=>((Math.min(255,(c>>16&255)*f|0))<<16)|((Math.min(255,(c>>8&255)*f|0))<<8)|Math.min(255,(c&255)*f|0);
 const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=r()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
 const FP={wd:[0x8a5a3a,0x6b4423,0xa8784a,0xc49a6c,0x5a3a22,0x3a2a1e,0xd8c8a8,0xb08a5a,0x7a6a5a],
  fb:[0x7a3a3a,0x3a5a7a,0x5a6a3a,0x8a7a5a,0x4a4a52,0x6a4a6a,0xb08a5a,0x2f4a5a,0x9a3a2a,0xc9b48a,0x3a6a5a,0xd8d0c0,0x8aa0b0,0xc98a6a,0x5a5f66,0xa8a8a0,0x2a2e38,0x6a8a9a],
  br:[0xc23b2f,0x2f6fd8,0xe0a030,0x3aa060,0xb07bff,0xff8a2a,0xf2d16b,0x2fb0b0,0xe86aa0,0x6ac0e0,0xf27a5a],
  wl:[0xf2ede2,0xe8dcc8,0xdfe6ea,0xe6efe0,0xf2e2d6,0xd8d0e6,0xf6efd2,0xc9d8e2,0xe8d0c8,0xd0dcc8,0xf0e8f0,0xbfd0dc,0xe0c8a8,0x9ab0a0,0x8aa0b4,0xd8e8e0,0xf0d8b8,0xb8c8a8,0xe8e0f0,0xc8b8a8],
  kid:[0x9fd0f0,0xf4b8c8,0xb8e0a0,0xf8e090,0xc8b0f0,0xffc89a],
  fl:[0xb08455,0x9c6b3e,0xc49a6c,0x8a5a3a,0x6b4a32,0xd0b08a,0xa87a50,0x7a5a42],
  cp:[0x8a9bb0,0xb09a8a,0x9ab08f,0xa88aa0,0xc9c2b0,0x6a7a8a,0x9a6a5a,0xc8b8a0,0x8a8a92,0xb8a888],
  tl:[0xe8e8e4,0xd8e4ea,0xe8e0d0,0x9ab0b8,0xc8d8c8,0x2b2b2b,0xf0e8e0],
  rug:[0x9a3a2a,0x2f4a6a,0x6a5a3a,0x3a5a4a,0xb08a5a,0x7a3a5a,0x8a8a8a,0xc8a070,0x4a6a8a]};
 const BLK=0x1a1a1e,WHT=0xf2f2ee,STL=0xb8bcc0,SCR=0x3a5a8a,GLO=0xfff1c4,GLD=0xd8b040,GRN=[0x3f8a3a,0x2f7a3a,0x5a9a3a,0x4a8a4a,0x6aa84a];
 const It=(w,d,t,draw,x)=>Object.assign({w,d,t,draw},x||{});
 // ---- one floor of one building: occupancy grid, keep-outs, walk targets ----
 const mkFloor=o=>{const C=.25,RR=.55,[gx0,gz0,gx1,gz1]=o.bx,nx=Math.max(2,Math.ceil((gx1-gx0)/C)),nz=Math.max(2,Math.ceil((gz1-gz0)/C)),N=nx*nz,g=new Uint8Array(N),seen=new Uint8Array(N),qu=new Int32Array(N);
  const cxx=i=>gx0+(i+.5)*C,czz=j=>gz0+(j+.5)*C;
  const stamp=q=>{const i0=Math.max(0,Math.floor((q[0]-RR-gx0)/C-.5)+1),i1=Math.min(nx-1,Math.ceil((q[2]+RR-gx0)/C-.5)-1),j0=Math.max(0,Math.floor((q[1]-RR-gz0)/C-.5)+1),j1=Math.min(nz-1,Math.ceil((q[3]+RR-gz0)/C-.5)-1);
   for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++)g[j*nx+i]=1};
  stamp([gx0-5,gz0-5,gx0,gz1+5]);stamp([gx1,gz0-5,gx1+5,gz1+5]);stamp([gx0-5,gz0-5,gx1+5,gz0]);stamp([gx0-5,gz1,gx1+5,gz1+5]);(o.blk||[]).forEach(stamp);(o.wl||[]).forEach(stamp);
  let tg=[];(o.tg||[]).forEach(([x,z])=>{let best=-1,bd=1e9;const ci=Math.floor((x-gx0)/C),cj=Math.floor((z-gz0)/C);for(let j=cj-3;j<=cj+3;j++)for(let i=ci-3;i<=ci+3;i++){if(i<0||j<0||i>=nx||j>=nz||g[j*nx+i])continue;const d=(cxx(i)-x)**2+(czz(j)-z)**2;if(d<bd){bd=d;best=j*nx+i}}if(best>=0)tg.push(best)});
  const inq=(k,q)=>{const x=cxx(k%nx),z=czz(k/nx|0);return x>q[0]-RR&&x<q[2]+RR&&z>q[1]-RR&&z<q[3]+RR};
  // flood from the first target inside the window [wi0..wi1]x[wj0..wj1] (the room being furnished, or the whole floor)
  let wi0=0,wi1=nx-1,wj0=0,wj1=nz-1,wt=null;
  const flood=q=>{seen.fill(0);const T0=wt?wt[0]:tg[0];let h=0,t=0;qu[t++]=T0;seen[T0]=1;while(h<t){const k=qu[h++],i=k%nx,j=k/nx|0;if(i<wi0||i>wi1||j<wj0||j>wj1)continue;
    if(i>0){const m=k-1;if(!seen[m]&&!g[m]&&!(q&&inq(m,q))){seen[m]=1;qu[t++]=m}}if(i<nx-1){const m=k+1;if(!seen[m]&&!g[m]&&!(q&&inq(m,q))){seen[m]=1;qu[t++]=m}}
    if(k>=nx){const m=k-nx;if(!seen[m]&&!g[m]&&!(q&&inq(m,q))){seen[m]=1;qu[t++]=m}}if(k+nx<N){const m=k+nx;if(!seen[m]&&!g[m]&&!(q&&inq(m,q))){seen[m]=1;qu[t++]=m}}}};
  if(tg.length>1){flood(null);const ok=tg.filter(k=>seen[k]);if(ok.length<tg.length)F_lost++;tg=ok}
  if(!tg.length){let best=-1;for(let k=0;k<N;k++)if(!g[k]){best=k;break}if(best>=0)tg.push(best)}
  const reach=q=>{if(tg.length<1)return true;if(tg.some(k=>inq(k,q)))return false;
   const rm0=F.cur;if(rm0!==F.wr){F.wr=rm0;wi0=0;wi1=nx-1;wj0=0;wj1=nz-1;wt=null;if(rm0){let a=1e9,b=1e9,c=-1e9,d=-1e9;rm0.rects.forEach(R=>{a=Math.min(a,R.x0);b=Math.min(b,R.z0);c=Math.max(c,R.x1);d=Math.max(d,R.z1)});
     wi0=Math.max(0,Math.floor((a-1-gx0)/C));wi1=Math.min(nx-1,Math.floor((c+1-gx0)/C));wj0=Math.max(0,Math.floor((b-1-gz0)/C));wj1=Math.min(nz-1,Math.floor((d+1-gz0)/C));
     wt=tg.filter(k=>{const i=k%nx,j=k/nx|0;return i>=wi0&&i<=wi1&&j>=wj0&&j<=wj1});if(wt.length){flood(null);wt=wt.filter(k=>seen[k])}if(!wt.length){wt=null;wi0=0;wi1=nx-1;wj0=0;wj1=nz-1}}}
   flood(q);if(!(wt||tg).every(k=>seen[k]))return false;
   // no sealed-off pockets inside the room being furnished
   const rm=F.cur;if(rm){let fc=0,sc=0;for(const R of rm.rects){const i0=Math.max(0,Math.floor((R.x0-gx0)/C)),i1=Math.min(nx-1,Math.floor((R.x1-gx0)/C)),j0=Math.max(0,Math.floor((R.z0-gz0)/C)),j1=Math.min(nz-1,Math.floor((R.z1-gz0)/C));
    for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const k=j*nx+i;if(g[k]||inq(k,q))continue;fc++;if(seen[k])sc++}}if(fc>8&&sc<fc*.92)return false}return true};
  const ovl=(a,b,m)=>a[0]<b[2]+m&&a[2]>b[0]-m&&a[1]<b[3]+m&&a[3]>b[1]-m;
  const F={y:o.y,ch:o.ch,H:o.ch-o.y,occ:[],dec:[],keep:o.keep||[],blk:o.blk||[],ops:o.ops||[],holes:o.holes||[],put:o.put,wall:o.wall,bfs:0,ovl};
  const opHit=(q,y0,y1)=>F.ops.some(p=>{if(p.t<=F.y+y0+.02||p.b>=F.y+y1-.02)return false;if(p.ax=='x'){if(Math.min(Math.abs(p.p-q[1]),Math.abs(p.p-q[3]))>.55)return false;return p.c-p.w/2<q[2]&&p.c+p.w/2>q[0]}
   if(Math.min(Math.abs(p.p-q[0]),Math.abs(p.p-q[2]))>.55)return false;return p.c-p.w/2<q[3]&&p.c+p.w/2>q[1]});
  F.free=(q,m)=>!F.keep.some(k=>ovl(q,k,0))&&!F.occ.some(k=>ovl(q,k,m??.04))&&!F.blk.some(k=>ovl(q,k,.02));
  F.draw=(it,X0,Z0,f)=>{const w=it.w,d=it.d,M=(u,v)=>f==0?[X0+u,Z0+v]:f==2?[X0+w-u,Z0+d-v]:f==1?[X0+d-v,Z0+u]:[X0+v,Z0+w-u];
   const b=(u0,v0,u1,v1,y0,y1,c,ty,sol)=>{const p=M(u0,v0),q=M(u1,v1),e=sol?0:(F.jn=((F.jn||0)+1)%5)*.0011;F.put(Math.min(p[0],q[0])+e,Math.min(p[1],q[1])+e,Math.max(p[0],q[0])-e,Math.max(p[1],q[1])-e,F.y+y0+e,F.y+y1-e,c,ty,sol?0:1)};
   it.draw(b,F);if(it.t>0&&!it.nocol)(it.cols||[[0,0,w,d,it.t]]).forEach(([u0,v0,u1,v1,t])=>b(u0,v0,u1,v1,0,t,0,'n',1))};
  // f: 0 front faces -z (back on the +z wall), 1 faces +x, 2 faces +z, 3 faces -x
  F.at=(it,X0,Z0,f,chk)=>{const q=f%2?[X0,Z0,X0+it.d,Z0+it.w]:[X0,Z0,X0+it.w,Z0+it.d],cg=it.k&&(CAPG[it.k]||it.k);
   if(chk!==false){if(cg&&F.cap&&(F.cnt.get(cg)||0)>=F.cap(cg))return 0;if(F.fm&&(it.vh??it.t)>1.3&&!FREET.has(it.k)&&!(!F.home&&FREEB.has(it.k)))return 0;if(!F.free(q,it.m))return 0;if(opHit(q,it.vb||0,it.vh??it.t))return 0;if(it.t>0&&!it.flat&&!it.nocol){if(F.bfs>=420)return 0;F.bfs++;if(!reach(q))return 0}}
   if(cg&&F.cnt)F.cnt.set(cg,(F.cnt.get(cg)||0)+1);F.draw(it,X0,Z0,f);q.side=['N','W','S','E'][f];if(!it.flat){q.vh=it.vh??it.t;F.occ.push(q);if(it.t>0&&!it.nocol)stamp(q)}F.last=q;F.lf=f;return q};
  const SF={N:0,S:2,W:1,E:3};F.opp={N:'S',S:'N',E:'W',W:'E'};
  F.onWall=(rm,it,o2)=>{o2=o2||{};const sides=o2.sides?o2.sides.slice():shuf(['N','S','E','W']);
   for(const R of shuf(rm.rects.slice()))for(const s of sides){if(R.op&&R.op[s])continue;const f=SF[s],fw=f%2?it.d:it.w,fd=f%2?it.w:it.d,ax=s=='N'||s=='S',lo=ax?R.x0:R.z0,hi=(ax?R.x1:R.z1)-(ax?fw:fd);
    if(hi<lo-1e-6)continue;let ps=[];if(o2.corner)ps=[lo,hi];else if(o2.mid)ps=[(lo+hi)/2];else{const n=Math.floor((hi-lo)/.25);for(let k=0;k<=n;k++)ps.push(lo+k*.25);ps.push(hi);shuf(ps);if(o2.mid2)ps.unshift((lo+hi)/2)}
    for(const p of ps){const X0=ax?p:(s=='W'?R.x0:R.x1-fw),Z0=ax?(s=='S'?R.z0:R.z1-fd):p;if(X0<R.x0-1e-6||Z0<R.z0-1e-6||X0+fw>R.x1+1e-6||Z0+fd>R.z1+1e-6)continue;
     const q=F.at(it,X0,Z0,f);if(q){q.side=s;return q}}}return 0};
  F.mid=(rm,it,o2)=>{F.fm=1;const q=F.mid0(rm,it,o2);F.fm=0;return q};
  F.mid0=(rm,it,o2)=>{o2=o2||{};for(const R of shuf(rm.rects.slice())){const cw=R.x1-R.x0,cd=R.z1-R.z0;for(let k=0;k<12;k++){const f=o2.f!=null?o2.f:((cw>=cd)==(it.w>=it.d)?(r()<.5?0:2):(r()<.5?1:3)),fw=f%2?it.d:it.w,fd=f%2?it.w:it.d;
    if(fw>cw||fd>cd)continue;const j=k/12,X0=R.x0+(cw-fw)*(.5+(r()-.5)*j*1.6),Z0=R.z0+(cd-fd)*(.5+(r()-.5)*j*1.6);if(X0<R.x0||Z0<R.z0||X0+fw>R.x1||Z0+fd>R.z1)continue;const q=F.at(it,X0,Z0,f);if(q)return q}}return 0};
  F.any=(rm,it,n)=>{F.fm=1;const q=F.any0(rm,it,n);F.fm=0;return q};
  F.any0=(rm,it,n)=>{for(let k=0;k<(n||14);k++){const R=pick(rm.rects),f=r()*4|0,fw=f%2?it.d:it.w,fd=f%2?it.w:it.d,cw=R.x1-R.x0-fw,cd=R.z1-R.z0-fd;if(cw<0||cd<0)continue;const q=F.at(it,R.x0+r()*cw,R.z0+r()*cd,f);if(q)return q}return 0};
  F.place=(rm,it,mode,o2)=>it&&(mode=='mid'?F.mid(rm,it,o2):mode=='any'?F.any(rm,it):mode=='corner'?F.onWall(rm,it,Object.assign({corner:1},o2)):F.onWall(rm,it,o2));
  // something in front of an already placed piece (coffee table before a sofa, chair before a desk)
  F.front=(it,q,gap,f2)=>{const s=q.side;if(!s)return 0;const f=f2??SF[s],fw=f%2?it.d:it.w,fd=f%2?it.w:it.d,cx=(q[0]+q[2])/2,cz=(q[1]+q[3])/2;
   const X0=s=='N'||s=='S'?cx-fw/2:s=='W'?q[2]+gap:q[0]-gap-fw,Z0=s=='E'||s=='W'?cz-fd/2:s=='S'?q[3]+gap:q[1]-gap-fd;return F.at(it,X0,Z0,f)};
  // pictures, shelves, boards on a wall: not over a window/door, not behind anything taller than their bottom edge
  F.deco=(rm,dc)=>{if(rm.nowall)return 0;const H0=dc.y0,H1=dc.y0+dc.h;for(const R of shuf(rm.rects.slice()))for(const s of shuf(['N','S','E','W'])){if(R.op&&R.op[s])continue;const f=SF[s],ax=s=='N'||s=='S',lo=ax?R.x0+.1:R.z0+.1,hi=(ax?R.x1:R.z1)-.1-dc.w;if(hi<lo)continue;
    for(let k=0;k<8;k++){const p=k==0&&dc.c?(lo+hi)/2:lo+r()*(hi-lo),d=.035,X0=ax?p:(s=='W'?R.x0-.005:R.x1-d+.005),Z0=ax?(s=='S'?R.z0-.005:R.z1-d+.005):p,q=f%2?[X0,Z0,X0+d,Z0+dc.w]:[X0,Z0,X0+dc.w,Z0+d];
     if(opHit(q,H0-.05,H1+.05))continue;const near=e=>ovl(q,e,.3);if(F.occ.some(e=>near(e)&&e.vh>H0-.08))continue;
     if(F.blk.some(e=>near(e)))continue;if(F.dec.some(e=>ovl(q,e,.12)))continue;F.dk=1;F.draw(It(dc.w,d,0,(b,FF)=>dc.draw((u0,v0,u1,v1,y0,y1,c,ty)=>b(u0,v0,u1,v1,H0+y0,H0+y1,c,ty),FF),{nocol:1}),X0,Z0,f);F.dk=0;F.dec.push(q);q.side=s;return q}}return 0};
  // small loose things on the floor, purely visual
  F.litter=(rm,n,kinds)=>{if(F.home&&!F.messy&&!['kids','nursery'].includes(rm.rn))return;n=Math.round(n*.35);for(let k=0,m=0;k<n*6&&m<n;k++){const R=pick(rm.rects),x=fr(R.x0+.15,R.x1-.15),z=fr(R.z0+.15,R.z1-.15),kd=pick(kinds),it=LT[kd]();const q=[x,z,x+it.w,z+it.d];
    if(q[2]>R.x1||q[3]>R.z1||!F.free(q,.02))continue;F.draw(it,x,z,r()*4|0);F.occ.push(Object.assign(q,{vh:it.t||.1}));m++}};
  // wall paint/tiles, baseboards, floor finish and a ceiling light for a room
  F.finish=(rm)=>{F.dk=1;const wt=rm.wt||'p',wc=rm.wc??0xf2ede2,fy=F.y;rm.rects.forEach(R=>{
    const fx0=R.x0-.08,fx1=R.x1+.08,fz0=R.z0-.08,fz1=R.z1+.08,ext=(v,e)=>Math.abs(Math.abs(v)-e)<.03,oN=R.op&&R.op.N,oS=R.op&&R.op.S;
    const sideW=(s)=>{if(R.op&&R.op[s])return;const ax=s=='N'||s=='S',fp=s=='N'?fz1:s=='S'?fz0:s=='E'?fx1:fx0,e=ext(fp,ax?o.ez:o.ex),o1=e?.05:.01,o2=e?.07:.03,sg=s=='N'||s=='E'?-1:1,p=fp+sg*(o1+o2)/2;
     const a0=ax?fx0+.002:fz0+(oS?0:(ext(fz0,o.ez)?.07:.03)),a1=ax?fx1-.002:fz1-(oN?0:(ext(fz1,o.ez)?.07:.03)),ops=F.ops.filter(q=>q.ax==(ax?'x':'z')&&Math.abs(q.p-fp)<.5);
     F.wall(ax?'x':'z',p,a0,a1,fy,rm.wtop??F.ch,.02,wc,wt,ops);if(rm.bb!==0)F.wall(ax?'x':'z',p+sg*.02,a0+(ax?0:.02),a1-(ax?0:.02),fy,fy+.11,.022,rm.bb??0xf4f2ec,'p',ops)};
    if(!rm.nowall)['N','S','E','W'].forEach(sideW);
    if(rm.ft){let rs=[[fx0+.002,fz0+.002,fx1-.002,fz1-.002]];F.holes.forEach(hq=>{const nr=[];rs.forEach(a=>{if(!ovl(a,hq,-.001)){nr.push(a);return}const x0=Math.max(a[0],hq[0]),x1=Math.min(a[2],hq[2]),z0=Math.max(a[1],hq[1]),z1=Math.min(a[3],hq[3]);
      if(x0>a[0])nr.push([a[0],a[1],x0,a[3]]);if(x1<a[2])nr.push([x1,a[1],a[2],a[3]]);if(z0>a[1])nr.push([x0,a[1],x1,z0]);if(z1<a[3])nr.push([x0,z1,x1,a[3]])});rs=nr});
     rs.forEach(a=>{if(a[2]-a[0]>.05&&a[3]-a[1]>.05)F.put(a[0],a[1],a[2],a[3],fy,fy+.012,rm.fc,rm.ft,1)})}});
   if(rm.light!==0){const R=rm.rects.reduce((a,b)=>(b.x1-b.x0)*(b.z1-b.z0)>(a.x1-a.x0)*(a.z1-a.z0)?b:a),cx=(R.x0+R.x1)/2,cz=(R.z0+R.z1)/2;
    if(!F.holes.some(hq=>cx>hq[0]-.5&&cx<hq[2]+.5&&cz>hq[1]-.5&&cz<hq[3]+.5)){const k=rm.light||pick(['flush','flush','pend','fan']);
     if(k=='flush'){F.put(cx-.28,cz-.28,cx+.28,cz+.28,F.ch-.07,F.ch,0xe8e4da,'p',1);F.put(cx-.2,cz-.2,cx+.2,cz+.2,F.ch-.1,F.ch-.07,GLO,'e',1)}
     else if(k=='pend'){F.put(cx-.02,cz-.02,cx+.02,cz+.02,F.ch-.7,F.ch,0x2b2b2b,'m',1);F.put(cx-.22,cz-.22,cx+.22,cz+.22,F.ch-.95,F.ch-.7,rm.lc||0x3a3f44,'m',1);F.put(cx-.12,cz-.12,cx+.12,cz+.12,F.ch-.98,F.ch-.95,GLO,'e',1)}
     else if(k=='chand'){F.put(cx-.02,cz-.02,cx+.02,cz+.02,F.ch-.6,F.ch,GLD,'m',1);F.put(cx-.4,cz-.04,cx+.4,cz+.04,F.ch-.85,F.ch-.8,GLD,'m',1);F.put(cx-.04,cz-.4,cx+.04,cz+.4,F.ch-.85,F.ch-.8,GLD,'m',1);[[-.4,0],[.4,0],[0,-.4],[0,.4]].forEach(([a,c])=>F.put(cx+a-.05,cz+c-.05,cx+a+.05,cz+c+.05,F.ch-.8,F.ch-.66,GLO,'e',1))}
     else if(k=='tube'){F.put(cx-.7,cz-.1,cx+.7,cz+.1,F.ch-.06,F.ch,0xdcdcdc,'m',1);F.put(cx-.66,cz-.06,cx+.66,cz+.06,F.ch-.08,F.ch-.06,0xf4fbff,'e',1)}
     else{F.put(cx-.12,cz-.12,cx+.12,cz+.12,F.ch-.32,F.ch,0x6b4423,'k',1);F.put(cx-.75,cz-.07,cx+.75,cz+.07,F.ch-.3,F.ch-.27,0x6b4423,'k',1);F.put(cx-.07,cz-.75,cx+.07,cz+.75,F.ch-.3,F.ch-.27,0x6b4423,'k',1);F.put(cx-.14,cz-.14,cx+.14,cz+.14,F.ch-.4,F.ch-.32,GLO,'e',1)}}}F.dk=0};
  return F};
 let F_lost=0;
 // ---- loose clutter (visual only) ----
 const LT={
  book:()=>It(.22,.16,0,b=>{b(0,0,.22,.16,0,.04,pick(FP.br),'p')},{nocol:1}),
  books:()=>It(.25,.18,0,b=>{for(let i=0;i<ri(2,4);i++)b(0,0,.25-i*.02,.18-i*.01,i*.04,i*.04+.04,pick(FP.br),'p')},{nocol:1}),
  clothes:()=>It(.5,.4,0,b=>{const c=pick(FP.fb);b(0,0,.5,.4,0,.05,c,'q');b(.1,.05,.42,.3,.05,.09,pick(FP.fb),'q')},{nocol:1}),
  shoes:()=>It(.3,.3,0,b=>{const c=pick([BLK,0x6b4423,WHT,0xc23b2f]);b(0,0,.12,.28,0,.09,c,'p');b(.16,.02,.28,.3,0,.09,c,'p')},{nocol:1}),
  toy:()=>It(.3,.3,0,b=>{for(let i=0;i<3;i++){const x=r()*.2,z=r()*.2;b(x,z,x+.1,z+.1,0,.1,pick(FP.br),'p')}},{nocol:1}),
  ball:()=>It(.22,.22,0,b=>{const c=pick(FP.br);b(.02,.02,.2,.2,0,.2,c,'p');b(0,.06,.22,.16,.05,.15,c,'p')},{nocol:1}),
  cup:()=>It(.08,.08,0,b=>b(0,0,.08,.08,0,.1,pick([WHT,0xc23b2f,0x2f6fd8]),'p'),{nocol:1}),
  pizza:()=>It(.42,.42,0,b=>{b(0,0,.42,.42,0,.05,0xd9c09a,'p');b(.04,.04,.38,.38,.05,.052,0xb5443a,'p')},{nocol:1}),
  can:()=>It(.07,.07,0,b=>b(0,0,.07,.07,0,.12,pick([0xc23b2f,0x2f6fd8,0x3aa060,STL]),'m'),{nocol:1}),
  bottle:()=>It(.08,.08,0,b=>{const c=pick([0x3a7a3a,0x7a4a2a,0xd8e8f0]);b(0,0,.08,.08,0,.22,c,'G');b(.025,.025,.055,.055,.22,.3,c,'G')},{nocol:1}),
  paper:()=>It(.3,.22,0,b=>b(0,0,.3,.22,0,.005,0xf4f4f0,'p'),{nocol:1}),
  debris:()=>It(.5,.4,0,b=>{for(let i=0;i<4;i++){const x=r()*.4,z=r()*.3;b(x,z,x+fr(.06,.16),z+fr(.05,.12),0,fr(.03,.08),pick([0x8a8a86,0x6b5a4a,0xa89a86,0x5a4a3a]),'c')}},{nocol:1}),
  plank:()=>It(1.4,.18,0,b=>b(0,0,1.4,.18,0,.04,0x9c7a56,'k'),{nocol:1}),
  paint:()=>It(.3,.3,0,b=>{const c=pick(FP.br);b(0,0,.26,.26,0,.28,STL,'m');b(.02,.02,.24,.24,.28,.29,c,'p');b(.05,.0,.21,.02,.06,.24,c,'p')},{nocol:1}),
  leaves:()=>It(.5,.5,0,b=>{for(let i=0;i<5;i++){const x=r()*.4,z=r()*.4;b(x,z,x+.1,z+.08,0,.01,pick([0x8a6a2a,0xa8582a,0x6a7a2a]),'p')}},{nocol:1}),
  balloon:()=>It(.3,.3,0,b=>{const c=pick(FP.br);b(.02,.02,.28,.28,.02,.3,c,'p')},{nocol:1}),
  bone:()=>It(.35,.12,0,b=>{b(0,0,.35,.12,0,.04,0xe8e0cc,'p')},{nocol:1}),
  sack:()=>It(.4,.3,0,b=>{b(0,0,.4,.3,0,.18,0xc8b08a,'q')},{nocol:1})};
 // ---- furniture (u across the front, v from the front edge to the wall, y up from the floor) ----
 const chairD=(b,u,v,c,fl,leg)=>{const w=.46;leg=leg??c;[[0,0],[w-.05,0],[0,w-.05],[w-.05,w-.05]].forEach(([a,e])=>b(u+a,v+e,u+a+.05,v+e+.05,0,.44,leg,'k'));b(u,v,u+w,v+w,.44,.49,c,'k');
  if(fl)b(u,v,u+w,v+.06,.49,.95,c,'k');else b(u,v+w-.06,u+w,v+w,.49,.95,c,'k')};
 const lampD=(b,u,v,c,y)=>{y=y||0;b(u,v,u+.16,v+.16,y,y+.04,c||0x8a7a5a,'m');b(u+.065,v+.065,u+.095,v+.095,y+.04,y+.32,c||0x8a7a5a,'m');b(u-.04,v-.04,u+.2,v+.2,y+.3,y+.5,GLO,'e')};
 const prodD=(b,u0,u1,v0,v1,y,h,kind)=>{let u=u0;while(u<u1-.06){const w=Math.min(u1-u,kind=='bot'?.08:fr(.1,.26)),c=kind=='bot'?pick([0x3a7a3a,0x7a4a2a,0xd8e8f0,0xc8a040,0x8a2a2a]):pick(kind=='ph'?[WHT,0xe8f0f8,0x6ac0e0,0xf2d16b,0xe86aa0]:kind=='tool'?[0xc23b2f,0x2b2b2b,0xe0a030,0x2f6fd8,STL]:FP.br.concat([WHT,0xd9c09a])),hh=kind=='bot'?fr(.22,.3):fr(.12,h);
   b(u,v0+(v1-v0)*.1,u+w-.015,v1-.02,y,y+Math.min(h,hh),c,kind=='bot'?'G':'p');u+=w+(r()<.15?fr(.05,.2):.01)}};
 const FU={
  sofa:(c,w)=>{w=w||pick([1.9,2.1,2.3]);const a=pick(FP.br),cw=(w-.4)/Math.round((w-.4)/.62);return It(w,.9,.9,b=>{b(.06,.06,w-.06,.84,0,.1,BLK,'p');b(0,0,w,.9,.1,.42,c,'q');b(0,.64,w,.9,.42,.9,c,'q');b(0,0,.2,.64,.42,.64,c,'q');b(w-.2,0,w,.64,.42,.64,c,'q');
   for(let x=.2;x<w-.25;x+=cw)b(x+.01,.03,x+cw-.01,.64,.42,.5,shd(c,1.08),'q');b(.24,.5,.6,.64,.5,.82,a,'q');if(w>2)b(w-.6,.5,w-.24,.64,.5,.82,a,'q')},{vh:.9})},
  lsofa:(c)=>{const w=2.6,d=1.7,a=pick(FP.br);return It(w,d,.9,b=>{b(0,.8,w,d,.1,.42,c,'q');b(0,d-.26,w,d,.42,.9,c,'q');b(w-.2,.8,w,d-.26,.42,.64,c,'q');b(0,0,.9,.8,.1,.42,c,'q');b(0,0,.2,.8,.42,.64,c,'q');
   b(0,.8,.2,d-.26,.42,.9,c,'q');b(.3,d-.42,.7,d-.26,.42,.78,a,'q');b(w-.7,d-.42,w-.3,d-.26,.42,.78,a,'q');b(.05,.05,w-.05,d-.05,0,.1,BLK,'p')},{cols:[[0,.8,w,d,.9],[0,0,.9,.8,.42]],vh:.9})},
  armchair:(c)=>It(.85,.85,.9,b=>{b(.05,.05,.8,.8,0,.1,BLK,'p');b(0,0,.85,.85,.1,.42,c,'q');b(0,.62,.85,.85,.42,.95,c,'q');b(0,0,.16,.62,.42,.66,c,'q');b(.69,0,.85,.62,.42,.66,c,'q');b(.16,.03,.69,.62,.42,.5,shd(c,1.08),'q')},{vh:.95}),
  wingchair:(c)=>It(.85,.85,1.1,b=>{b(0,0,.85,.85,.1,.42,c,'q');b(0,.66,.85,.85,.42,1.2,c,'q');b(0,.3,.14,.66,.42,1.05,c,'q');b(.71,.3,.85,.66,.42,1.05,c,'q');b(.06,.06,.12,.12,0,.1,0x3a2a1e,'k');b(.73,.06,.79,.12,0,.1,0x3a2a1e,'k');b(.14,.03,.71,.66,.42,.5,shd(c,1.1),'q')},{vh:1.2}),
  recliner:(c)=>It(.9,1.1,.9,b=>{b(0,0,.9,1.1,0,.42,c,'q');b(0,.82,.9,1.1,.42,1.0,c,'q');b(0,.2,.15,.82,.42,.62,c,'q');b(.75,.2,.9,.82,.42,.62,c,'q');b(.15,0,.75,.25,.3,.44,shd(c,.9),'q')},{vh:1}),
  beanbag:(c)=>It(.8,.8,.5,b=>{b(.04,.04,.76,.76,0,.3,c,'q');b(.12,.12,.68,.68,.3,.45,c,'q');b(.1,.5,.7,.76,.3,.6,c,'q')},{vh:.6}),
  rocker:(c)=>It(.65,.85,1,b=>{b(0,.05,.04,.85,0,.08,0x5a3a22,'k');b(.61,.05,.65,.85,0,.08,0x5a3a22,'k');b(0,.15,.65,.7,.4,.46,c,'k');b(0,.62,.65,.7,.46,1.15,c,'k');b(.06,.18,.59,.62,.46,.52,0x9a3a2a,'q')},{vh:1.15}),
  gchair:(a)=>It(.7,.7,1.3,b=>{b(.3,.3,.4,.4,0,.45,BLK,'m');b(.05,.05,.65,.65,0,.06,BLK,'m');b(.05,0,.65,.6,.45,.56,BLK,'q');b(.05,.56,.65,.7,.56,1.35,BLK,'q');b(.15,.55,.55,.57,.7,1.25,a,'q');b(0,.15,.07,.55,.56,.72,BLK,'p');b(.63,.15,.7,.55,.56,.72,BLK,'p')},{vh:1.35}),
  bench:(w,c)=>It(w,.42,.46,b=>{b(0,0,w,.42,.4,.46,c,'k');b(.06,.06,.14,.36,0,.4,c,'k');b(w-.14,.06,w-.06,.36,0,.4,c,'k')}),
  chair:(c)=>It(.48,.48,.95,b=>chairD(b,0,0,c,0)),
  stool:(c,top)=>It(.4,.4,.78,b=>{[[0,0],[.34,0],[0,.34],[.34,.34]].forEach(([a,e])=>b(a,e,a+.06,e+.06,0,.72,c||STL,'m'));b(-.02,-.02,.42,.42,.72,.8,top||0x2b2b2b,'q');b(.04,.04,.36,.36,.25,.28,c||STL,'m')},{vh:.8}),
  ctable:(c,w,d)=>{w=w||pick([1,1.1,1.2]);d=d||.6;return It(w,d,.45,b=>{b(0,0,w,d,.38,.45,c,'k');[[0,0],[w-.06,0],[0,d-.06],[w-.06,d-.06]].forEach(([a,e])=>b(a,e,a+.06,e+.06,0,.38,c,'k'));b(.05,.05,w-.05,d-.05,.1,.13,shd(c,.85),'k');
   if(r()<.6)b(w*.2,d*.25,w*.2+.3,d*.25+.22,.45,.47,pick(FP.br),'p');if(r()<.5)b(w*.65,d*.35,w*.65+.12,d*.35+.12,.45,.6,pick([WHT,0x6ac0e0,GLD]),'p')})},
  dset:(n,c,cc)=>{const tw=n>=6?2.0:n==2?.9:1.3,td=.9,w=tw+(n>=6?.0:0),d=td+1.0,cols=[[0,.5,tw,.5+td,.78]],ch=[];
   const per=n>=6?3:n==2?1:2;for(let i=0;i<per;i++){const u=(tw/per)*(i+.5)-.23;ch.push([u,0,0],[u,d-.46,1]);cols.push([u,0,u+.46,.46,.95],[u,d-.46,u+.46,d,.95])}
   return It(w,d,.95,b=>{b(0,.5,tw,.5+td,.72,.78,c,'k');[[.05,.55],[tw-.11,.55],[.05,.5+td-.11],[tw-.11,.5+td-.11]].forEach(([a,e])=>b(a,e,a+.06,e+.06,0,.72,c,'k'));
    if(r()<.6)b(.15,.5+td*.35,tw-.15,.5+td*.65,.78,.785,pick([WHT,0xc23b2f,0x3a5a7a,0xe8dcc0]),'p');if(r()<.7){b(tw/2-.12,.5+td/2-.12,tw/2+.12,.5+td/2+.12,.78,.86,pick([WHT,GLD,0x6ac0e0]),'p');b(tw/2-.08,.5+td/2-.08,tw/2+.08,.5+td/2+.08,.86,.95,pick(FP.br),'p')}
    ch.forEach(([u,v,fl])=>chairD(b,u,v,cc||c,!fl))},{cols,m:.06})},
  rtable:(c)=>It(.75,.75,.76,b=>{b(.32,.32,.43,.43,0,.72,c,'m');b(.15,.15,.6,.6,0,.03,c,'m');b(0,.12,.75,.63,.72,.76,shd(c,1.2),'p');b(.12,0,.63,.75,.72,.76,shd(c,1.2),'p')}),
  cafeset:(c,cc)=>It(1.75,.75,.95,b=>{b(.82,.32,.93,.43,0,.72,c,'m');b(.5+.15,.15,.5+.6,.6,0,.03,c,'m');b(.5,.12,1.25,.63,.72,.76,shd(c,1.2),'p');b(.62,0,1.13,.75,.72,.76,shd(c,1.2),'p');
   chairD(b,0,.14,cc,0);chairD(b,1.29,.14,cc,0);if(r()<.6)b(.8,.3,.88,.38,.76,.86,WHT,'p')},{cols:[[.5,0,1.25,.75,.78],[0,.14,.46,.6,.95],[1.29,.14,1.75,.6,.95]]}),
  desk:(c,w,kind)=>{w=w||pick([1.1,1.2,1.4]);return It(w,.62,.76,b=>{b(0,0,w,.62,.72,.76,c,'k');b(0,.02,.05,.6,0,.72,c,'k');b(w-.42,.02,w,.6,0,.72,shd(c,.92),'8');deskTop(b,w,kind)},{vh:1.2})},
  deskset:(c,w,kind,cc)=>{w=w||pick([1.1,1.2,1.4]);const d=1.25;return It(w,d,.95,b=>{b(0,.63,w,d,.72,.76,c,'k');b(0,.65,.05,d-.02,0,.72,c,'k');b(w-.42,.65,w,d-.02,0,.72,shd(c,.92),'8');deskTop((u0,v0,u1,v1,y0,y1,cl,ty)=>b(u0,v0+.63,u1,v1+.63,y0,y1,cl,ty),w,kind);
   if(kind=='pc')gchD(b,w/2-.3,.0,pick(FP.br),1);else chairD(b,w/2-.23,.05,cc||c,1)},{cols:[[0,.63,w,d,.76],[w/2-.3,0,w/2+.3,.6,.95]],vh:1.25})},
  stable:(c)=>It(.45,.45,.55,b=>{b(0,0,.45,.45,.5,.55,c,'k');b(.02,.02,.43,.43,0,.5,shd(c,.9),'8');if(r()<.75)lampD(b,.15,.15,pick([0x8a7a5a,GLD,WHT]),.55)},{vh:1.05}),
  nstand:(c)=>It(.45,.4,.55,b=>{b(0,0,.45,.4,0,.55,c,'8');b(-.01,-.01,.46,.41,.55,.58,shd(c,1.1),'k');if(r()<.8)lampD(b,.14,.12,0,.58);else b(.1,.1,.3,.22,.58,.66,BLK,'p')},{vh:1.08}),
  sideboard:(c,w)=>{w=w||pick([1.4,1.6,1.8]);return It(w,.45,.85,b=>{b(0,0,w,.45,.06,.82,c,'8');b(-.02,-.02,w+.02,.47,.82,.86,shd(c,1.1),'k');b(.05,.05,.12,.12,0,.06,c,'k');b(w-.12,.05,w-.05,.12,0,.06,c,'k');
   if(r()<.6){b(.15,.15,.3,.3,.86,1.1,pick([WHT,0x2f6fd8,GLD,0x3aa060]),'p');b(.12,.12,.33,.33,1.1,1.35,pick(GRN),'q')}b(w-.5,.3,w-.25,.34,.86,1.08,BLK,'p');b(w-.48,.29,w-.27,.3,.88,1.06,pick(FP.br),'p');if(r()<.5)b(w*.45,.15,w*.45+.3,.35,.86,.92,pick(FP.br),'p')},{vh:1.35})},
  tvstand:(c,w,sz)=>{w=w||pick([1.4,1.6,1.8]);sz=sz||Math.min(w-.1,pick([1.0,1.2,1.4,1.6]));return It(w,.45,.55,b=>{b(0,0,w,.45,.04,.52,c,'8');b(-.01,-.01,w+.01,.46,.52,.55,shd(c,1.1),'k');b(.05,.05,.12,.12,0,.04,BLK,'m');b(w-.12,.05,w-.05,.12,0,.04,BLK,'m');
   const u0=w/2-sz/2;b(w/2-.2,.2,w/2+.2,.35,.55,.58,BLK,'p');b(w/2-.03,.3,w/2+.03,.34,.58,.68,BLK,'p');b(u0,.32,u0+sz,.38,.66,.66+sz*.58,BLK,'p');b(u0+.03,.315,u0+sz-.03,.32,.69,.63+sz*.58,pick([SCR,0x2a4a3a,0x4a3a6a,0x5a8ab0]),'e');
   if(r()<.6)b(.12,.08,.5,.4,.06,.14,BLK,'p');if(r()<.5){b(.1,.15,.22,.3,.55,.85,BLK,'p');b(w-.22,.15,w-.1,.3,.55,.85,BLK,'p')}},{vh:.68+sz*.58})},
  fireplace:(st,stc)=>It(1.6,.5,1.15,(b,F)=>{const c=stc||pick([0xa85a45,0x8a8f94,0xc8b8a0,0xf2efe6]);b(0,0,1.6,.5,0,1.1,c,st||'b');b(.35,-.005,1.25,.3,.08,.75,BLK,'p');b(.45,.02,1.15,.25,.08,.2,0x5a3a22,'k');b(.5,.05,1.1,.2,.2,.45,0xff8a2a,'e');
   b(-.08,-.08,1.68,.5,1.1,1.18,0x5a3a22,'k');b(.15,.1,1.45,.5,1.18,F.H-.01,c,st||'b');b(.25,.0,.4,.15,1.18,1.4,pick([GLD,WHT,0x2f6fd8]),'p');b(1.2,.0,1.35,.15,1.18,1.32,pick([GLD,WHT]),'p');b(.6,.05,1.0,.1,1.3,1.75,pick(FP.br),'p')},{vh:9}),
  bookshelf:(c,w,h)=>{w=w||pick([.8,1,1.2]);h=h||pick([1.8,2.0,2.1]);const n=Math.round(h/.38);return It(w,.35,h,b=>{b(0,.32,w,.35,0,h,shd(c,.85),'k');b(0,0,.04,.35,0,h,c,'k');b(w-.04,0,w,.35,0,h,c,'k');
   for(let i=0;i<=n;i++){const y=i*(h-.04)/n;b(.04,0,w-.04,.32,y,y+.04,c,'k');if(i<n){if(r()<.85){let u=.05;while(u<w-.1){const bw=Math.min(w-.05-u,fr(.25,.6));if(r()<.82)b(u,.05,u+bw,.3,y+.04,y+.04+fr(.2,.3),WHT,'3');else b(u+.05,.1,u+.15,.2,y+.04,y+.2,pick(FP.br),'p');u+=bw+(r()<.2?fr(.05,.15):0)}}else b(.1,.05,.3,.25,y+.04,y+.2,pick(FP.br),'p')}}},{vh:h})},
  wardrobe:(c,w)=>{w=w||pick([1,1.2,1.5]);return It(w,.6,2,b=>{b(0,0,w,.6,.05,2,c,'8');b(-.02,-.02,w+.02,.62,2,2.06,shd(c,.9),'k');b(w/2-.005,-.01,w/2+.005,0,.1,1.95,shd(c,.7),'p');b(w/2-.1,-.03,w/2-.06,0,.95,1.15,GLD,'m');b(w/2+.06,-.03,w/2+.1,0,.95,1.15,GLD,'m');
   if(r()<.4)b(.1,.05,.5,.5,2.06,2.3,0xc49a6c,'p')},{vh:2.3})},
  dresser:(c,w)=>{w=w||pick([1,1.2]);return It(w,.5,.85,b=>{b(0,0,w,.5,0,.82,c,'8');b(-.01,-.01,w+.01,.51,.82,.86,shd(c,1.1),'k');for(let y=.2;y<.8;y+=.27)b(w/2-.12,-.02,w/2+.12,0,y,y+.04,GLD,'m');
   if(r()<.7){b(w/2-.4,.44,w/2+.4,.5,.9,1.7,shd(c,.85),'k');b(w/2-.35,.435,w/2+.35,.44,.95,1.65,0xd8e8f0,'G')}b(.08,.15,.2,.3,.86,1.0,pick([WHT,GLD,0xe86aa0]),'p');b(w-.3,.1,w-.08,.3,.86,.9,pick(FP.br),'p')},{vh:1.7})},
  fridge:(c)=>{c=c??pick([WHT,STL,STL,0x2b2b2b,0xe8e0c8]);return It(.8,.7,1.9,b=>{b(0,0,.8,.7,0,1.9,c,c==STL?'m':'p');b(.02,-.005,.78,0,1.25,1.27,shd(c,.8),'p');b(.66,-.04,.69,0,.8,1.2,STL,'m');b(.66,-.04,.69,0,1.35,1.6,STL,'m');
   if(r()<.6){b(.15,-.01,.3,0,1.35,1.5,pick(FP.br),'p');b(.35,-.01,.5,0,.9,1.1,WHT,'p')}},{vh:1.9})},
  counter:(w,cab,top,o)=>{o=o||{};const d=.62,n=Math.floor(w/.6+1e-6),sl=shuf(Array.from({length:n},(_,i)=>i));let si=-9,so=-9;if(o.sink&&n>0)si=sl.pop()*.6+(w-n*.6)/2;
   if(o.stove){const c=sl.filter(k=>si<-1||Math.abs(k*.6+(w-n*.6)/2-si)>.65);if(c.length)so=c[0]*.6+(w-n*.6)/2}
   return It(w,d,.92,(b,F)=>{b(0,.04,w,d,.1,.88,cab,'8');b(0,.06,w,d,0,.1,shd(cab,.6),'p');b(-.02,-.02,w,d,.88,.92,top,'c');
    if(si>-1){b(si,.1,si+.6,.48,.86,.925,STL,'m');b(si+.06,.15,si+.54,.43,.87,.926,0x8a8f94,'m');b(si+.27,.45,si+.33,.52,.92,1.15,STL,'m');b(si+.27,.35,si+.33,.52,1.1,1.15,STL,'m')}
    if(so>-1){b(so,.0,so+.6,d,.1,.88,0x2b2b2b,'m');b(so+.05,-.005,so+.55,0,.25,.7,0x15171a,'p');b(so,.0,so+.6,d,.88,.93,0x15171a,'p');[[.08,.1],[.36,.1],[.08,.38],[.36,.38]].forEach(([a,e])=>b(so+a,e,so+a+.16,e+.16,.93,.94,0x4a4a4a,'m'))}
    if(o.up){for(let u=0;u<w-.05;u+=.6){if(so>-1&&u+.6>so+.02&&u<so+.58)continue;b(u,d-.36,Math.min(w,u+.6)-.01,d,1.45,2.15,cab,'8')}b(0,d-.01,w,d,.92,1.45,o.bs||0xe8e8e4,'7');if(so>-1){b(so,d-.5,so+.6,d,1.65,1.85,STL,'m');b(so+.15,d-.3,so+.45,d,1.85,F.H-.01,STL,'m')}}
    if(o.mw&&w>1.5){const u=si>-1&&si<w/2?w-.6:.1;b(u,.15,u+.5,.5,.92,1.2,pick([WHT,BLK,STL]),'m');b(u+.05,.145,u+.35,.15,.97,1.15,0x15171a,'p')}
    if(r()<.6){const u=fr(.05,w-.4);if(Math.abs(u-si)>.7&&Math.abs(u-so)>.8){b(u,.2,u+.25,.45,.92,1.1,pick([WHT,0xc23b2f,STL]),'p')}}
    if(r()<.5){const u=fr(.05,w-.3);if(Math.abs(u-si)>.7&&Math.abs(u-so)>.8)b(u,.3,u+.25,.55,.92,.95,0x8a5a3a,'k')}},{vh:o.up?(so>-1?9:2.15):.93})},
  island:(w,cab,top,st)=>{const d=st?1.45:.95;return It(w,d,.92,b=>{const v0=st?.5:0;b(.05,v0+.05,w-.05,d,.1,.88,cab,'8');b(-.05,v0-.25+(st?0:.25),w+.05,d+.03,.88,.93,top,'c');if(st)for(let u=.15;u<w-.3;u+=.6){b(u+.02,0,u+.36,.34,.62,.68,0x2b2b2b,'q');b(u+.16,.14,u+.22,.2,0,.62,STL,'m')}
   if(r()<.7)b(w/2-.15,v0+.3,w/2+.15,v0+.6,.93,1.05,pick([WHT,0x8a5a3a,GLD]),'p');if(r()<.5){b(w/2+.3,v0+.35,w/2+.42,v0+.47,.93,1.08,0xc23b2f,'p')}},{cols:[[0,st?.5:0,w,d,.93]].concat(st?[[0,0,w,.34,.68]]:[])})},
  wstove:()=>It(.7,.6,.9,(b,F)=>{b(0,0,.7,.6,.1,.8,0x2b2b2b,'m');b(.05,-.01,.65,0,.25,.65,0x15171a,'p');b(.15,-.012,.55,-.01,.32,.55,0xff8a2a,'e');b(-.03,-.03,.73,.63,.8,.86,0x2b2b2b,'m');b(.25,.25,.45,.45,.86,F.H-.01,0x2b2b2b,'m');
   [[0,0],[.62,0],[0,.52],[.62,.52]].forEach(([a,e])=>b(a,e,a+.08,e+.08,0,.1,0x2b2b2b,'m'))},{vh:9,cols:[[0,0,.7,.6,.9]]}),
  vanity:(c,top)=>It(.8,.5,.9,b=>{b(0,0,.8,.5,.05,.86,c,'8');b(-.01,-.01,.81,.51,.86,.9,top||0xe8e8e4,'c');b(.2,.1,.6,.4,.84,.905,WHT,'p');b(.37,.4,.43,.48,.9,1.08,STL,'m');b(.12,.46,.68,.5,1.1,1.75,0xd8e8f0,'G');b(.08,.47,.72,.5,1.05,1.1,c,'k');
   if(r()<.7)b(.65,.25,.75,.35,.9,1.05,pick(FP.br),'p')},{vh:1.75}),
  toilet:()=>It(.45,.7,.8,b=>{b(.1,.2,.35,.55,0,.4,WHT,'p');b(.05,.0,.4,.5,.38,.43,WHT,'p');b(.04,.5,.41,.7,.38,.8,WHT,'p');b(.06,.0,.39,.48,.43,.45,0xe8e8e4,'p');b(.3,.52,.35,.54,.72,.76,STL,'m')},{vh:.8}),
  tub:(c)=>It(1.65,.75,.58,b=>{b(0,0,1.65,.75,0,.58,c||WHT,'p');b(.08,.08,1.57,.67,.4,.585,0x8ac8e0,'G');b(1.45,.6,1.55,.72,.58,.75,STL,'m');b(1.45,.55,1.55,.62,.7,.75,STL,'m');if(r()<.6)b(.2,.05,.45,.2,.58,.66,pick(FP.br),'p')},{vh:.75}),
  shower:()=>It(.95,.95,2.1,b=>{b(0,0,.95,.95,0,.08,WHT,'p');b(0,0,.95,.03,.08,2.0,0xd8e8f0,'G');b(0,0,.03,.95,.08,2.0,0xd8e8f0,'G');b(.92,0,.95,.95,.08,2.0,0xd8e8f0,'G');b(.42,.85,.52,.95,1.8,1.85,STL,'m');b(.4,.75,.54,.9,1.85,1.9,STL,'m');b(.4,.9,.55,.95,1.0,1.15,STL,'m')},{vh:2.0}),
  washer:(c,dry)=>It(.65,.65,.9,b=>{c=c??WHT;b(0,0,.65,.65,0,.88,c,'p');b(0,.0,.65,.12,.88,.9,shd(c,.9),'p');b(.12,-.01,.53,0,.25,.66,dry?0x5a5f66:0x2b3a4a,'p');b(.18,-.012,.47,-.01,.31,.6,dry?0x3a3f44:0x6a9ab8,'G');b(.05,-.01,.25,0,.76,.84,0x8a8f94,'m');b(.45,-.01,.55,0,.76,.84,0x2f6fd8,'e')}),
  wheater:()=>It(.6,.6,1.6,b=>{b(.05,.05,.55,.55,0,1.5,0xe8e8e4,'p');b(0,.1,.6,.5,.05,1.45,0xe8e8e4,'p');b(.1,0,.5,.6,.05,1.45,0xe8e8e4,'p');b(.25,.25,.35,.35,1.5,1.9,0xb87333,'m');b(.2,-.01,.4,0,.2,.35,0x8a8f94,'m')},{vh:1.9}),
  furnace:()=>It(.8,.7,1.6,(b,F)=>{b(0,0,.8,.7,0,1.5,0xb8bcc0,'m');b(.05,-.01,.75,0,.2,.6,0x8a8f94,'m');b(.3,-.012,.5,-.01,.3,.38,0xff6a2a,'e');b(.15,.15,.65,.6,1.5,F.H-.01,0xb8bcc0,'m')},{vh:9,cols:[[0,0,.8,.7,1.6]]}),
  sshelf:(w,kind,c)=>{w=w||pick([1,1.2,1.5]);c=c??pick([0x8a8f94,0x5a5f66,0xd8d8d4,0x6b4423]);return It(w,.5,1.9,b=>{[[0,0],[w-.04,0],[0,.46],[w-.04,.46]].forEach(([a,e])=>b(a,e,a+.04,e+.04,0,1.9,c,'m'));
   for(let y=.1;y<1.9;y+=.45){b(0,0,w,.5,y,y+.03,c,'m');if(y<1.8){if(kind=='box'){let u=.03;while(u<w-.3){const bw=fr(.3,.5);if(u+bw>w-.03)break;b(u,.05,u+bw,.45,y+.03,y+.03+fr(.2,.36),pick([0xc49a6c,0xb58a5a,0xd8b88a]),'p');u+=bw+.04}}
    else if(kind=='jar')prodD(b,.03,w-.03,.05,.45,y+.03,.25,'bot');else if(kind=='can'){let u=.03;while(u<w-.1){b(u,.1,u+.09,.4,y+.03,y+.15,pick([0xc23b2f,0x2f6fd8,0x3aa060,0xe0a030,STL]),'m');u+=.1}}
    else if(kind=='tool')prodD(b,.03,w-.03,.05,.45,y+.03,.3,'tool');else prodD(b,.03,w-.03,.05,.45,y+.03,.32,r()<.3?'bot':'p')}}},{vh:1.9})},
  cbox:(s,n)=>{s=s||fr(.45,.75);n=n||ri(1,3);let hs=[],t=0;for(let i=0;i<n;i++){const h=s*fr(.6,.9);hs.push([t,h]);t+=h}return It(s,s,t,b=>{hs.forEach(([y,h],i)=>{const o=i*.03;b(o,o,s-o,s-o,y,y+h-.003,pick([0xc49a6c,0xb58a5a,0xd8b88a]),'p');b(s/2-.04,o-.002,s/2+.04,s-o+.002,y+h-.02,y+h,0xd8c8a0,'p')})})},
  crate:(s,c)=>{s=s||pick([.8,1,1.2]);return It(s,s,s,b=>b(0,0,s,s,0,s,c||pick([0x9a7a52,0xa8885c,0x8a6a42]),'x'))},
  barrel:(c)=>{c=c||pick([0x6b4a2c,0x2f6fd8,0xc23b2f,0x3a7a3a,0x5a5f66]);return It(.62,.62,.95,b=>{b(.05,.05,.57,.57,0,.95,c,c==0x6b4a2c?'w':'m');b(0,.1,.62,.52,.05,.9,c,c==0x6b4a2c?'w':'m');b(.1,0,.52,.62,.05,.9,c,c==0x6b4a2c?'w':'m');[.12,.8].forEach(y=>b(-.01,-.01,.63,.63,y,y+.05,0x3a3a3a,'m'))})},
  plant:(k)=>{k=k??(r()*4|0);const pc=pick([0xc8704a,WHT,0x2b2b2b,0x8a8f94,0xd9c09a]),g=pick(GRN),h=[1.1,1.6,.9,1.3][k];return It(.45,.45,h,b=>{b(.08,.08,.37,.37,0,.35,pc,'p');b(.1,.1,.35,.35,.35,.37,0x4a3a2a,'p');
   if(k==0){b(.0,.0,.45,.45,.45,.85,g,'q');b(.08,.08,.37,.37,.85,1.1,shd(g,1.15),'q');b(.2,.2,.25,.25,.35,.45,0x5a4a2a,'k')}else if(k==1){b(.2,.2,.25,.25,.35,1.1,0x6a5a3a,'k');b(.02,.05,.42,.4,1.0,1.4,g,'q');b(.1,0,.35,.45,1.2,1.6,shd(g,1.1),'q')}
   else if(k==2){b(.15,.15,.3,.3,.37,.9,0x5a8a4a,'q');b(.05,.18,.15,.27,.55,.75,0x5a8a4a,'q');b(.3,.18,.4,.27,.6,.8,0x5a8a4a,'q')}else{for(let i=0;i<5;i++){const a=i*1.256,x=.2+Math.cos(a)*.15,z=.2+Math.sin(a)*.15;b(x,z,x+.06,z+.06,.37,fr(.9,1.3),shd(g,fr(.9,1.2)),'q')}}},{vh:h})},
  flamp:(c)=>It(.4,.4,1.7,b=>{b(.05,.05,.35,.35,0,.04,c||0x2b2b2b,'m');b(.18,.18,.22,.22,.04,1.45,c||0x2b2b2b,'m');b(.05,.05,.35,.35,1.4,1.72,pick([GLO,0xfff8e0,0xffe8c0]),'e')},{cols:[[.1,.1,.3,.3,1.7]],vh:1.72}),
  gclock:(c)=>It(.5,.35,2,b=>{b(0,0,.5,.35,0,2,c||0x5a3a22,'k');b(.08,-.01,.42,0,1.5,1.85,0xf2ead6,'p');b(.24,-.015,.26,-.01,1.6,1.78,BLK,'p');b(.12,-.01,.38,0,.4,1.3,0x2b2b2b,'G');b(.22,-.015,.28,-.01,.55,.95,GLD,'m');b(-.03,-.03,.53,.38,2,2.1,c||0x5a3a22,'k')},{vh:2.1}),
  pianoset:(c)=>{c=c??pick([BLK,0x3a2a1e,0x5a3a22,WHT]);return It(1.5,1.05,1.25,b=>{b(0,.45,1.5,1.05,0,1.25,c,'p');b(.05,.3,1.45,.45,.7,.78,c,'p');b(.08,.3,1.42,.42,.78,.8,WHT,'p');for(let u=.12;u<1.4;u+=.14)if((u*7|0)%7!=2)b(u,.36,u+.06,.42,.8,.83,BLK,'p');
   b(.4,.44,1.1,.45,.95,1.15,0xf2ead6,'p');b(-.02,.43,1.52,1.07,1.25,1.28,c,'p');b(.45,0,1.05,.35,.42,.5,c,'q');b(.47,.02,.53,.08,0,.42,c,'p');b(.97,.02,1.03,.08,0,.42,c,'p');b(.47,.27,.53,.33,0,.42,c,'p');b(.97,.27,1.03,.33,0,.42,c,'p');
   if(r()<.5)b(.2,.55,.4,.75,1.28,1.45,pick(FP.br),'p')},{cols:[[0,.45,1.5,1.05,1.25],[.45,0,1.05,.35,.5]],vh:1.45})},
  drums:()=>{const c=pick([0xc23b2f,0x2f6fd8,BLK,WHT,0x3aa060]);return It(1.5,1.3,1.0,b=>{b(.55,.6,1.0,1.05,0,.5,c,'p');b(.6,.58,.95,.6,.08,.45,WHT,'p');b(.3,.35,.6,.65,.45,.65,c,'p');b(.95,.35,1.25,.65,.45,.65,c,'p');b(1.1,.85,1.45,1.2,0,.5,c,'p');
   b(0,.2,.35,.55,.6,.65,WHT,'p');b(.15,.35,.2,.4,0,.6,STL,'m');[[.05,.9],[1.2,.1]].forEach(([u,v])=>{b(u+.12,v+.12,u+.16,v+.16,0,1.0,STL,'m');b(u,v,u+.28,v+.28,1.0,1.02,GLD,'m')});b(.65,.0,.9,.25,0,.45,BLK,'q')},{vh:1.02})},
  guitar:()=>{const c=pick([0xc23b2f,0x2b2b2b,0xd9a23a,0x8a5a3a,WHT,0x2f6fd8]);return It(.4,.3,1.1,b=>{b(.05,.1,.35,.28,0,.08,BLK,'m');b(.18,.2,.22,.24,0,.4,BLK,'m');b(.05,.05,.35,.15,.25,.75,c,'p');b(.17,.08,.23,.12,.75,1.15,0x5a3a22,'k');b(.15,.07,.25,.13,1.15,1.25,BLK,'p')},{vh:1.25})},
  amp:()=>It(.6,.35,.7,b=>{b(0,0,.6,.35,0,.7,BLK,'p');b(.05,-.005,.55,0,.08,.55,0x3a3a3a,'q');b(.05,-.01,.55,0,.58,.65,0x8a8f94,'m');b(.45,-.012,.5,-.01,.6,.63,0xff4040,'e')}),
  easel:()=>{const cs=[pick(FP.br),pick(FP.br),pick(FP.wl)];return It(.8,.65,1.8,b=>{b(.05,.35,.1,.42,0,1.8,0x8a6a42,'k');b(.7,.35,.75,.42,0,1.8,0x8a6a42,'k');b(.375,.55,.425,.62,0,1.6,0x8a6a42,'k');b(.0,.3,.8,.38,.75,.8,0x8a6a42,'k');
   b(.1,.3,.7,.35,.8,1.55,cs[2],'p');b(.18,.295,.45,.3,.95,1.25,cs[0],'p');b(.4,.295,.62,.3,1.15,1.45,cs[1],'p')},{vh:1.8})},
  aquarium:()=>It(1.2,.45,1.3,b=>{b(0,0,1.2,.45,0,.75,pick([BLK,0x5a3a22]),'8');b(0,0,1.2,.45,.75,1.25,0x6ac0d8,'G');b(.02,.02,1.18,.43,.75,.8,0xd9c09a,'p');b(.1,.2,.18,.28,.8,1.1,0x3a8a3a,'q');b(.9,.15,.98,.23,.8,1.15,0x3a8a3a,'q');
   for(let i=0;i<4;i++){const u=fr(.25,.9),y=fr(.9,1.15);b(u,.15,u+.08,.2,y,y+.04,pick([0xff8a2a,0xf2d16b,0x6ac0e0,0xe86aa0]),'e')}b(-.01,-.01,1.21,.46,1.25,1.3,BLK,'p')},{vh:1.3}),
  cattree:()=>It(.65,.65,1.6,b=>{const c=0xd9c9a8;b(0,0,.65,.65,0,.06,c,'q');b(.25,.25,.38,.38,.06,1.5,0xc8b08a,'q');b(.05,.05,.5,.5,.5,.56,c,'q');b(.15,.15,.6,.6,1.0,1.06,c,'q');b(.1,.1,.6,.6,1.5,1.6,c,'q')},{vh:1.6}),
  dogbed:(c)=>It(.9,.7,.22,b=>{c=c||pick(FP.fb);b(0,0,.9,.7,0,.22,c,'q');b(.1,.1,.8,.6,.08,.12,shd(c,1.2),'q');if(r()<.6)b(.95,.1,1.15,.3,0,.08,STL,'m')},{vh:.25}),
  crib:(c)=>It(.75,1.3,1,b=>{c=c||WHT;b(0,0,.75,1.3,.3,.4,c,'p');b(.04,.04,.71,1.26,.4,.55,0xf4f4f0,'q');[[0,0],[.7,0],[0,1.25],[.7,1.25]].forEach(([a,e])=>b(a,e,a+.05,e+.05,0,1,c,'p'));
   for(let v=.1;v<1.25;v+=.12){b(0,v,.03,v+.03,.4,.95,c,'p');b(.72,v,.75,v+.03,.4,.95,c,'p')}b(0,0,.75,.04,.95,1,c,'p');b(0,1.26,.75,1.3,.95,1,c,'p');b(0,0,.04,1.3,.95,1,c,'p');b(.71,0,.75,1.3,.95,1,c,'p');b(.2,.9,.45,1.15,.55,.75,pick([0xc8a070,0xf4b8c8,0x9fd0f0]),'q')},{vh:1}),
  toybox:(c)=>It(.8,.45,.5,b=>{b(0,0,.8,.45,0,.45,c||pick(FP.br),'p');b(-.01,-.01,.81,.46,.45,.5,WHT,'p');b(.1,.1,.25,.25,.5,.65,pick(FP.br),'p');b(.4,.15,.6,.3,.5,.58,pick(FP.br),'p')},{vh:.65}),
  bed:(w,bl,fr2,hb)=>{const d=2.1,hh=hb??pick([.95,1.05,1.2]);return It(w,d,.55,b=>{b(0,0,w,d-.08,.08,.3,fr2,'k');b(.03,.03,w-.03,d-.1,.3,.5,0xf4f2ec,'q');b(-.02,-.02,w+.02,d-.55,.48,.56,bl,'q');b(-.03,-.03,w+.03,.0,.2,.52,bl,'q');
   b(0,d-.08,w,d,0,hh,fr2,'k');const np=w>1.2?2:1;for(let i=0;i<np;i++){const u=.08+i*(w-.16)/np;b(u,d-.5,u+(w-.16)/np-.06,d-.12,.5,.64,i%2?0xf4f4f0:pick([0xf4f4f0,shd(bl,1.3)]),'q')}
   if(r()<.5)b(w*.15,.15,w*.85,.55,.56,.6,shd(bl,1.25),'q');[[0,0],[w-.08,0]].forEach(([a,e])=>b(a,e,a+.08,e+.08,0,.08,fr2,'k'))},{cols:[[0,0,w,d,.55],[0,d-.1,w,d,hh]],vh:hh})},
  bedset:(w,bl,fr2,ns)=>{const B=FU.bed(w,bl,fr2),W2=w+1.0;return It(W2,2.1,.55,(b,F)=>{B.draw((u0,v0,u1,v1,y0,y1,c,ty)=>b(u0+.5,v0,u1+.5,v1,y0,y1,c,ty),F);const N=FU.nstand(ns);[0,W2-.45].forEach(u=>N.draw((u0,v0,u1,v1,y0,y1,c,ty)=>b(u0+u,v0+1.7,u1+u,v1+1.7,y0,y1,c,ty),F))},
   {cols:B.cols.map(([a,c,e,f,t])=>[a+.5,c,e+.5,f,t]).concat([[0,1.7,.45,2.1,.58],[W2-.45,1.7,W2,2.1,.58]]),vh:Math.max(B.vh,1.08)})},
  bunk:(c,b1,b2)=>It(.95,2.05,1.8,b=>{[[0,0],[.9,0],[0,2.0],[.9,2.0]].forEach(([a,e])=>b(a,e,a+.05,e+.05,0,1.8,c,'k'));b(0,0,.95,2.05,.25,.32,c,'k');b(.03,.03,.92,2.02,.32,.48,b1,'q');b(0,0,.95,2.05,1.15,1.22,c,'k');b(.03,.03,.92,2.02,1.22,1.38,b2,'q');
   b(.1,1.65,.85,1.95,.48,.58,WHT,'q');b(.1,1.65,.85,1.95,1.38,1.48,WHT,'q');b(0,0,.04,1.2,1.38,1.6,c,'k');for(let y=.4;y<1.2;y+=.25)b(.92,.1,.97,.5,y,y+.04,c,'k')},{vh:1.8}),
  mattress:(c)=>It(.95,2,.25,b=>{b(0,0,.95,2,0,.2,0xf4f2ec,'q');b(-.01,0,.96,1.4,.18,.25,c,'q');b(.15,1.55,.8,1.9,.2,.3,WHT,'q')},{vh:.3}),
  futon:(c)=>It(1,2,.15,b=>{b(0,0,1,2,0,.1,0xf4f2ec,'q');b(-.01,0,1.01,1.5,.08,.15,c,'q');b(.2,1.6,.8,1.9,.1,.2,WHT,'q')},{vh:.2}),
  fcab:(c)=>It(.5,.62,1.3,b=>{c=c??pick([0x8a8f94,0x5a5f66,0xd8d8d4]);b(0,0,.5,.62,0,1.3,c,'m');for(let y=.1;y<1.2;y+=.32){b(.02,-.005,.48,0,y,y+.28,shd(c,1.08),'m');b(.2,-.02,.3,0,y+.18,y+.21,STL,'m')}},{vh:1.3}),
  copier:()=>It(.9,.62,1.1,b=>{b(0,0,.9,.62,0,.95,0xd8d8d4,'p');b(0,0,.9,.62,.95,1.1,0xe8e8e4,'p');b(.6,-.01,.85,0,.98,1.06,0x2b3a4a,'e');b(.05,-.2,.5,0,.7,.75,0xd8d8d4,'p');b(.08,-.18,.45,-.02,.75,.76,WHT,'p')}),
  wcooler:()=>It(.38,.38,1.35,b=>{b(0,0,.38,.38,0,.95,WHT,'p');b(.04,.04,.34,.34,.95,1.35,0x8ac8f0,'G');b(.1,-.01,.28,0,.75,.85,0x2f6fd8,'p')},{vh:1.35}),
  cubicle:(c,a)=>It(2,1.8,1.4,b=>{const p=c??pick([0x6a7a8a,0x8a8a92,0x7a8a7a,0x9a8a7a]);b(0,1.74,2,1.8,0,1.4,p,'q');b(0,.15,.06,1.74,0,1.4,p,'q');b(1.94,.15,2,1.74,0,1.4,p,'q');
   b(.06,1.1,1.94,1.74,.72,.76,0xc9b48a,'k');b(.06,1.12,.5,1.72,0,.72,0x8a8f94,'m');b(.7,1.45,1.3,1.5,.76,1.15,BLK,'p');b(.73,1.44,1.27,1.45,.8,1.12,pick([SCR,0x3a6a5a,0x5a5a8a]),'e');b(.75,1.2,1.25,1.4,.76,.78,0x2b2b2b,'p');
   gchD(b,.7,.3,a||BLK,1);if(r()<.6)b(1.6,1.4,1.7,1.5,.76,.88,pick([WHT,0xc23b2f]),'p');if(r()<.5)b(1.5,1.75,1.9,1.74,.85,1.2,pick(FP.br),'p')},{cols:[[0,1.74,2,1.8,1.4],[0,.15,.06,1.74,1.4],[1.94,.15,2,1.74,1.4],[.06,1.1,1.94,1.74,.76],[.7,.3,1.3,.9,.95]],vh:1.4}),
  mtable:(n,c)=>{const tw=n>=8?3.4:2.6,d=2.1;return It(tw,d,.95,b=>{b(0,.55,tw,1.55,.72,.77,c,'k');b(.4,.8,tw-.4,1.3,0,.72,shd(c,.8),'k');for(let u=.25;u<tw-.4;u+=.75){gchD(b,u,0,BLK,1);gchD(b,u,1.5,BLK,0)}if(r()<.6)b(tw/2-.25,.9,tw/2+.25,1.2,.77,.8,BLK,'p')},
   {cols:[[0,.55,tw,1.55,.77],[0,0,tw,.55,.95],[0,1.55,tw,d,.95]],m:.1})},
  recep:(w,c)=>It(w,.85,1.1,b=>{b(0,0,w,.85,0,1.0,c,'k');b(-.05,-.08,w+.05,.25,1.0,1.1,shd(c,1.2),'c');b(0,.3,w,.85,.72,.76,shd(c,1.1),'k');b(w*.3,.6,w*.3+.5,.65,.76,1.1,BLK,'p');b(w*.3+.03,.595,w*.3+.47,.6,.8,1.07,SCR,'e');if(r()<.7)b(w-.4,.4,w-.2,.6,.76,.95,pick(GRN),'q')}),
  srack:()=>It(.7,1,2,b=>{b(0,0,.7,1,0,2,BLK,'m');b(.04,-.005,.66,0,.05,1.95,0x2b2b2b,'m');for(let y=.15;y<1.9;y+=.12){b(.08,-.01,.62,0,y,y+.08,0x3a3f44,'m');b(.55,-.012,.58,-.01,y+.02,y+.05,pick([0x4aff6a,0x4aff6a,0xffb040,0x4ab0ff]),'e')}},{vh:2}),
  tread:()=>It(.8,1.8,1.3,b=>{b(0,0,.8,1.8,0,.2,0x2b2b2b,'m');b(.08,.1,.72,1.7,.2,.22,BLK,'q');b(0,1.6,.06,1.8,.2,1.3,0x8a8f94,'m');b(.74,1.6,.8,1.8,.2,1.3,0x8a8f94,'m');b(0,1.55,.8,1.8,1.2,1.35,0x2b2b2b,'m');b(.2,1.56,.6,1.6,1.25,1.33,0x2a6aff,'e')},{cols:[[0,0,.8,1.8,.22],[0,1.55,.8,1.8,1.35]],vh:1.35}),
  wbench:()=>It(1.4,1.3,1.2,b=>{b(.5,.0,.9,1.2,.4,.5,BLK,'q');b(.65,.1,.75,1.1,0,.4,0x8a8f94,'m');b(.3,1.1,.36,1.3,0,1.2,0x8a8f94,'m');b(1.04,1.1,1.1,1.3,0,1.2,0x8a8f94,'m');b(-.05,1.17,1.45,1.21,1.1,1.14,STL,'m');
   [-.05,1.29].forEach(u=>b(u,1.08,u+.16,1.3,.92,1.36,0x2b2b2b,'m'))},{cols:[[.5,0,.9,1.2,.5],[.3,1.1,1.1,1.3,1.2]],vh:1.36}),
  wrack:()=>It(1.4,.5,1.0,b=>{b(0,0,.06,.5,0,1,0x2b2b2b,'m');b(1.34,0,1.4,.5,0,1,0x2b2b2b,'m');b(0,.1,1.4,.45,.35,.39,0x2b2b2b,'m');b(0,.1,1.4,.45,.7,.74,0x2b2b2b,'m');for(let u=.12;u<1.25;u+=.18)[.39,.74].forEach(y=>b(u,.15,u+.12,.4,y,y+.12,pick([BLK,0x3a3f44,0xc23b2f]),'m'))}),
  ebike:()=>It(.5,1.15,1.1,b=>{b(.2,.0,.3,1.15,0,.06,0x2b2b2b,'m');b(.2,.3,.3,.4,.06,.8,0x2b2b2b,'m');b(.15,.25,.35,.55,.8,.86,BLK,'q');b(.22,.9,.28,.98,.06,1.05,0x2b2b2b,'m');b(.05,.9,.45,.96,1.05,1.1,0x2b2b2b,'m');b(.18,.6,.32,.85,.25,.55,0xc23b2f,'p')},{vh:1.1}),
  pbag:()=>It(.55,.55,1.9,(b,F)=>{b(.05,.05,.5,.5,.7,1.75,pick([0xc23b2f,BLK,0x2f4a6a]),'q');b(.25,.25,.3,.3,1.75,F.H-.01,0x8a8f94,'m')},{vh:9,cols:[[.05,.05,.5,.5,1.9]]}),
  gmat:()=>It(1,2,0,b=>b(0,0,1,2,0,.02,pick([0x2f6fd8,0x3aa060,0xb07bff,0x2b2b2b]),'q'),{flat:1}),
  pool:()=>It(2.5,1.4,.82,b=>{const w=0x5a3a22;b(.1,.1,2.4,1.3,0,.65,w,'k');b(0,0,2.5,1.4,.65,.82,w,'k');b(.1,.1,2.4,1.3,.79,.825,pick([0x2f7a3a,0x2f4a8a,0x8a2a2a]),'q');
   [[.05,.05],[1.2,.03],[2.35,.05],[.05,1.27],[1.2,1.29],[2.35,1.27]].forEach(([a,e])=>b(a,e,a+.1,e+.1,.8,.826,BLK,'p'));for(let i=0;i<7;i++){const u=fr(.4,2.1),v=fr(.3,1.1);b(u,v,u+.06,v+.06,.825,.885,pick(FP.br.concat([WHT,BLK])),'p')}
   b(.5,.55,2.0,.58,.825,.85,0xd8b080,'k')},{m:.4}),
  pingpong:()=>It(2.7,1.5,.78,b=>{const c=pick([0x2f6a3a,0x2f4a8a]);b(.2,.2,2.5,1.3,0,.72,0x2b2b2b,'m');b(0,0,2.7,1.5,.72,.78,c,'p');b(1.34,-.05,1.36,1.55,.78,.93,WHT,'p');b(.01,.74,2.69,.76,.78,.782,WHT,'p');b(.4,.4,.55,.55,.78,.8,0xc23b2f,'p');b(2.1,.9,2.25,1.05,.78,.8,0x2b2b2b,'p')},{m:.4}),
  arcade:(c)=>{c=c??pick(FP.br);return It(.72,.75,1.85,b=>{b(0,0,.72,.75,0,1.85,BLK,'p');b(-.01,.0,.73,.75,.0,1.85,c,'p');b(.04,-.01,.68,.0,1.65,1.82,pick([0xff4aa0,0x4ae0ff,0xffe04a]),'e');b(.08,.05,.64,.3,1.15,1.55,0x15171a,'p');b(.1,.04,.62,.05,1.18,1.52,pick([0x3aff8a,0xff6a3a,0x6a8aff]),'e');
   b(.0,-.25,.72,.15,.92,1.0,BLK,'p');b(.15,-.2,.2,-.15,1.0,1.08,0xc23b2f,'p');b(.4,-.2,.45,-.15,1.0,1.03,0x2f6fd8,'p');b(.5,-.2,.55,-.15,1.0,1.03,0xf2d16b,'p')},{vh:1.85})},
  barset:(w,c,top)=>It(w,1.25,1.08,b=>{b(0,.55,w,1.25,0,1.02,c,'k');b(-.03,.5,w+.03,1.25,1.02,1.08,top,'k');b(0,.48,w,.52,.15,.2,GLD,'m');for(let u=.2;u<w-.3;u+=.7){b(u+.18,.1,u+.24,.16,0,.72,STL,'m');b(u+.06,-.0,u+.36,.3,.72,.78,0x7a2a2a,'q')}
   if(r()<.7)for(let i=0;i<3;i++){const u=fr(.2,w-.2);b(u,.6,u+.07,.67,1.08,1.2,pick([0xd8b040,0xf2efe6]),'G')}},{cols:[[0,.55,w,1.25,1.08]].concat(Array.from({length:Math.ceil((w-.5)/.7)},(_,i)=>[.2+i*.7+.06,0,.2+i*.7+.36,.3,.78]).filter(c=>c[2]<w))}),
  backbar:(w,c)=>It(w,.45,2.1,b=>{b(0,0,w,.45,0,.9,c,'8');b(-.01,-.01,w+.01,.46,.9,.94,shd(c,1.1),'k');b(.05,.42,w-.05,.45,1.0,2.1,0xd8e8f0,'G');for(let y=1.05;y<2;y+=.42){b(0,.1,w,.45,y,y+.03,shd(c,1.1),'k');prodD(b,.05,w-.05,.15,.42,y+.03,.3,'bot')}},{vh:2.1}),
  jukebox:()=>It(.8,.6,1.5,b=>{b(0,0,.8,.6,0,1.2,0x7a2a2a,'p');b(.05,-.01,.75,0,.6,1.1,0xffb040,'e');b(.1,-.015,.7,-.01,.7,1.0,0x2a1a1a,'p');b(0,0,.8,.6,1.2,1.5,0xffd080,'e');b(.1,-.01,.7,0,.15,.5,GLD,'m')},{vh:1.5}),
  booth:(c,tc)=>It(1.25,1.85,1.1,b=>{b(0,0,1.25,.12,0,1.15,c,'q');b(0,.12,1.25,.55,0,.45,c,'q');b(0,1.73,1.25,1.85,0,1.15,c,'q');b(0,1.3,1.25,1.73,0,.45,c,'q');b(.05,.6,1.2,1.25,.72,.77,tc||WHT,'p');b(.55,.85,.7,1.0,0,.72,STL,'m');
   if(r()<.6)b(.15,.7,.25,.8,.77,.9,0xc23b2f,'p');if(r()<.6)b(.9,1.0,1.1,1.15,.77,.8,WHT,'p')},{vh:1.15}),
  dcase:(w,lit)=>It(w,.65,1.05,b=>{b(0,0,w,.65,0,.6,0xe8e4da,'p');b(0,0,w,.65,.6,1.05,0xd8e8f0,'G');b(.03,.03,w-.03,.62,.6,.62,0xf4f2ec,'p');let u=.08;while(u<w-.2){const c=pick(lit=='cake'?[0xf4d0e0,0x6b3a2a,0xf2e6c8,0xe8a050,WHT]:lit=='gem'?[GLD,0xd8e8f0,0xe86aa0]:FP.br);b(u,.15,u+.16,.45,.62,.62+fr(.06,.16),c,'p');u+=fr(.2,.32)}
   b(-.01,-.01,w+.01,.66,1.05,1.07,0xb8bcc0,'m')}),
  gfridge:(w)=>{w=w||pick([1,1.4]);return It(w,.72,2,b=>{b(0,0,w,.72,0,2,0x5a5f66,'m');b(.04,-.01,w-.04,0,.08,1.92,0xd8e8f0,'G');for(let y=.2;y<1.9;y+=.38){b(.05,.05,w-.05,.65,y,y+.02,0x8a8f94,'m');prodD(b,.06,w-.06,.08,.6,y+.02,.3,'bot')}b(.05,.0,w-.05,.05,1.9,1.98,0xf4fbff,'e')},{vh:2})},
  gondola:(w,kind)=>It(w,.95,1.55,b=>{b(0,0,w,.95,0,.12,0x8a8f94,'m');b(0,.45,w,.5,.12,1.55,0xd8d8d4,'m');[[.0,.0],[.0,.5]].forEach(([u,v])=>{for(let y=.15;y<1.4;y+=.38){b(0,v,w,v+.45,y,y+.03,0xd8d8d4,'m');prodD(b,.03,w-.03,v+.02,v+.43,y+.03,.3,kind)}});
   b(-.02,-.02,.02,.97,0,1.55,0xc23b2f,'p');b(w-.02,-.02,w+.02,.97,0,1.55,0xc23b2f,'p')},{vh:1.55}),
  wshelf:(w,kind,c)=>It(w,.45,2,b=>{c=c??0xd8d8d4;b(0,.4,w,.45,0,2,c,'m');b(0,0,w,.45,0,.12,shd(c,.8),'m');for(let y=.15;y<1.9;y+=.38){b(0,0,w,.45,y,y+.03,c,'m');prodD(b,.03,w-.03,.02,.4,y+.03,.3,kind)}},{vh:2}),
  crack:(w)=>It(w,.55,1.5,b=>{b(.0,.2,.05,.35,0,1.5,STL,'m');b(w-.05,.2,w,.35,0,1.5,STL,'m');b(0,.25,w,.3,1.45,1.5,STL,'m');b(-.05,0,.1,.55,0,.04,STL,'m');b(w-.1,0,w+.05,.55,0,.04,STL,'m');
   for(let u=.1;u<w-.12;u+=.09){const c=pick(FP.fb.concat(FP.br));b(u,.06,u+.07,.49,fr(.5,.85),1.42,c,'q')}},{vh:1.5}),
  manq:()=>{const c=pick(FP.fb.concat(FP.br));return It(.45,.45,1.8,b=>{b(.1,.1,.35,.35,0,.03,0x2b2b2b,'m');b(.21,.21,.24,.24,.03,.75,0x2b2b2b,'m');b(.08,.12,.37,.33,.75,1.45,c,'q');b(.15,.15,.3,.3,1.45,1.55,0xe8dcc8,'p');b(.14,.13,.31,.32,1.55,1.78,0xe8dcc8,'p');b(0,.14,.08,.31,1.0,1.42,c,'q');b(.37,.14,.45,.31,1.0,1.42,c,'q')},{vh:1.8})},
  checkout:(w)=>It(w,.75,.95,b=>{b(0,0,w,.75,0,.9,0xd8d8d4,'p');b(-.02,-.02,w+.02,.77,.9,.95,0x2b2b2b,'c');b(.1,.1,w*.55,.65,.95,.97,0x2b2b2b,'q');b(w-.55,.3,w-.15,.65,.95,1.1,0x2b2b2b,'p');b(w-.5,.35,w-.2,.4,1.1,1.35,BLK,'p');b(w-.48,.345,w-.22,.35,1.13,1.32,SCR,'e');b(w-.1,.3,w-.04,.6,.95,1.6,STL,'m');b(w-.14,.25,w,.65,1.6,1.68,0x3aa060,'e')},{vh:1.68}),
  bchair:()=>It(.7,.85,1.2,b=>{b(.2,.3,.5,.6,0,.45,0x8a8f94,'m');b(.05,.15,.65,.85,0,.05,0x8a8f94,'m');b(0,.1,.7,.75,.45,.58,0x7a1a1a,'q');b(0,.65,.7,.8,.58,1.25,0x7a1a1a,'q');b(0,.1,.08,.65,.58,.8,0x7a1a1a,'q');b(.62,.1,.7,.65,.58,.8,0x7a1a1a,'q');b(.15,-.15,.55,.1,.15,.22,STL,'m')},{vh:1.25}),
  hbed:()=>It(.95,2.05,.7,b=>{b(0,0,.95,2.05,.3,.55,0xd8d8d4,'m');b(.03,.03,.92,2.0,.55,.7,0xe8f0f4,'q');b(.05,0,.9,1.3,.68,.72,0x9ac0d8,'q');b(0,1.95,.95,2.05,.3,1.2,0xd8d8d4,'m');[[0,0],[.9,0],[0,2.0],[.9,2.0]].forEach(([a,e])=>b(a,e,a+.05,e+.05,0,.3,STL,'m'));
   b(1.0,1.6,1.04,1.64,0,1.9,STL,'m');b(.95,1.55,1.1,1.7,1.65,1.85,0xd8f0ff,'G')},{vh:1.2}),
  labb:(w)=>It(w,.8,.95,b=>{b(0,0,w,.8,0,.9,0xe8e8e4,'8');b(-.02,-.02,w+.02,.82,.9,.95,0x2b2b2b,'c');b(0,.75,w,.8,.95,1.6,0xe8e8e4,'p');b(0,.5,w,.8,1.3,1.33,0xe8e8e4,'p');for(let i=0;i<5;i++){const u=fr(.1,w-.2),c=pick([0x6aff8a,0xff6ac0,0x6ac0ff,0xffe06a]);b(u,.2,u+.1,.3,.95,1.12,0xd8f0ff,'G');b(u+.02,.22,u+.08,.28,.95,1.03,c,'e')}
   b(w/2-.25,.3,w/2+.25,.7,.95,1.0,0x2b2b2b,'m');b(w/2-.05,.4,w/2+.05,.5,1.0,1.3,0x2b2b2b,'m')},{vh:1.6}),
  stank:()=>{const c=pick([0x6aff8a,0x6ac0ff,0xb06aff]);return It(.85,.85,2.1,b=>{b(0,0,.85,.85,0,.3,0x8a8f94,'m');b(.05,.05,.8,.8,.3,1.9,0xd8f0ff,'G');b(.1,.1,.75,.75,.32,1.6,c,'e');b(0,0,.85,.85,1.9,2.1,0x8a8f94,'m');b(.3,.3,.55,.55,.9,1.3,0x3a4a3a,'p')},{vh:2.1})},
  hydro:(w)=>It(w,.6,1.9,b=>{b(0,0,.05,.6,0,1.9,STL,'m');b(w-.05,0,w,.6,0,1.9,STL,'m');for(let y=.2;y<1.8;y+=.55){b(0,0,w,.6,y,y+.12,0xe8e8e4,'p');for(let u=.08;u<w-.12;u+=.2)b(u,.1,u+.14,.5,y+.12,y+fr(.25,.4),pick(GRN),'q');b(.05,.2,w-.05,.4,y+.47,y+.5,0xd06aff,'e')}},{vh:1.9}),
  console:(w)=>It(w,.85,1.05,b=>{b(0,.3,w,.85,0,.8,0x5a5f66,'m');b(0,.0,w,.85,.8,.86,0x3a3f44,'m');for(let u=.1;u<w-.45;u+=.55){b(u,.65,u+.45,.72,.86,1.35,BLK,'p');b(u+.03,.645,u+.42,.65,.9,1.32,pick([SCR,0x2a6a4a,0x6a4a2a]),'e')}
   for(let i=0;i<6;i++){const u=fr(.1,w-.1);b(u,.1,u+.04,.14,.86,.88,pick([0xff4040,0x40ff60,0xffd040]),'e')}},{vh:1.35}),
  suit:()=>It(.55,.45,1.9,b=>{b(.05,.1,.5,.4,0,.08,STL,'m');b(.12,.12,.43,.38,.08,.9,0xf2f2ee,'q');b(.05,.08,.5,.4,.9,1.5,0xf2f2ee,'q');b(.12,.12,.43,.38,1.5,1.85,0xf2f2ee,'p');b(.16,.1,.39,.12,1.58,1.78,GLD,'e');b(.0,.12,.07,.35,.95,1.45,0xf2f2ee,'q');b(.48,.12,.55,.35,.95,1.45,0xf2f2ee,'q');b(.15,.35,.4,.45,1.0,1.4,0xc8c8c4,'m')},{vh:1.85}),
  wkb:(w,c)=>It(w,.72,.92,b=>{c=c??0x8a6a42;b(0,0,w,.72,.86,.92,c,'k');b(.03,.03,.1,.69,0,.86,c,'k');b(w-.1,.03,w-.03,.69,0,.86,c,'k');b(0,.05,w,.7,.15,.19,c,'k');b(0,.7,w,.72,.95,1.9,0xc8b08a,'p');
   for(let i=0;i<7;i++){const u=fr(.1,w-.2),y=fr(1.1,1.75);b(u,.66,u+fr(.04,.08),.7,y,y+fr(.15,.35),pick([0xc23b2f,0x2b2b2b,0xe0a030,STL]),'m')}b(.1,.1,.35,.35,.92,1.05,0x2f4a6a,'m');if(r()<.6)b(w-.6,.1,w-.2,.5,.92,1.05,0xc23b2f,'m');b(.3,.2,.6,.3,.19,.3,pick([0xc23b2f,0x2f6fd8]),'p')},{vh:1.9}),
  tchest:()=>It(.75,.48,1.05,b=>{const c=pick([0xc23b2f,0x2f4a8a,0x2b2b2b]);b(0,0,.75,.48,.06,1.0,c,'m');for(let y=.15;y<1;y+=.14)b(.05,-.005,.7,0,y,y+.1,shd(c,1.15),'m');b(-.01,-.01,.76,.49,1.0,1.05,0x2b2b2b,'m');[[0,0],[.65,0],[0,.38],[.65,.38]].forEach(([a,e])=>b(a,e,a+.1,e+.1,0,.06,BLK,'m'))}),
  tires:()=>It(.72,.72,.85,b=>{for(let i=0;i<4;i++){const y=i*.21;b(.02,.02,.7,.7,y,y+.2,0x1f1f1f,'p');b(.2,.2,.52,.52,y+.2,y+.205,0x3a3a3a,'p')}}),
  carlift:(c)=>It(2.6,4.6,1.6,b=>{c=c??pick([0xc23b2f,0x2f5d9a,0xe8e8e8,0x2b2b2b,0x3a7a4a,0xd9a82b]);b(0,1.2,.2,1.4,0,2.4,0xd0a020,'m');b(2.4,3.2,2.6,3.4,0,2.4,0xd0a020,'m');b(.2,1.5,2.4,1.6,.9,.98,0xd0a020,'m');b(.2,3.0,2.4,3.1,.9,.98,0xd0a020,'m');
   b(.35,.1,2.25,4.5,1.25,1.95,c,'p');b(.55,1.1,2.05,3.3,1.95,2.5,0x9cc3d8,'G');b(.6,1.15,2.0,3.25,2.5,2.56,c,'p');[[.3,.6],[1.95,.6],[.3,3.4],[1.95,3.4]].forEach(([a,e])=>b(a,e,a+.35,e+.6,1.0,1.55,0x1f1f1f,'p'))},{cols:[[0,1.2,.2,1.4,2.4],[2.4,3.2,2.6,3.4,2.4]],vh:2.5,m:.3}),
  car:(c)=>It(2.0,4.4,1.5,b=>{c=c??pick([0xc23b2f,0x2f5d9a,0xe8e8e8,0x2b2b2b,0x3a7a4a,0xd9a82b]);b(.05,.1,1.95,4.3,.3,1.0,c,'p');b(.2,1.1,1.8,3.1,1.0,1.5,0x9cc3d8,'G');b(.25,1.15,1.75,3.05,1.5,1.55,c,'p');[[.0,.5],[1.75,.5],[.0,3.3],[1.75,3.3]].forEach(([a,e])=>b(a,e,a+.25,e+.6,0,.6,0x1f1f1f,'p'));b(.2,-.01,.5,.0,.6,.75,0xfff4c0,'e');b(1.5,-.01,1.8,.0,.6,.75,0xfff4c0,'e')},{m:.3}),
  forklift:()=>It(1.0,2.2,2.1,b=>{b(.05,.6,.95,2.0,.2,1.0,0xe0a020,'p');b(.05,1.5,.95,2.2,.2,1.1,0x2b2b2b,'m');b(.1,.7,.9,1.5,2.0,2.08,0x2b2b2b,'m');[[.1,.7],[.82,.7],[.1,1.42],[.82,1.42]].forEach(([a,e])=>b(a,e,a+.08,e+.08,1.0,2.0,0x2b2b2b,'m'));b(.3,1.0,.7,1.4,1.0,1.4,0x2b2b2b,'q');
   b(.1,.5,.9,.6,0,2.1,0x3a3f44,'m');b(.2,-.6,.35,.5,.1,.15,0x3a3f44,'m');b(.65,-.6,.8,.5,.1,.15,0x3a3f44,'m');[[0,.7],[.82,.7],[0,1.7],[.82,1.7]].forEach(([a,e])=>b(a,e,a+.18,e+.4,0,.45,0x1f1f1f,'p'))},{cols:[[0,.5,1.0,2.2,2.1]],m:.3,vh:2.1}),
  pallet:(n)=>{n=n??ri(1,3);const hs=[];let y=.14;for(let i=0;i<n;i++){const h=fr(.35,.5);hs.push([y,h]);y+=h}return It(1.2,1.0,y,b=>{b(0,0,1.2,1.0,0,.14,0xb08a5a,'w');const wr=r()<.5;hs.forEach(([y0,h])=>{for(let u=0;u<1.2-.01;u+=.4)for(let v=0;v<1-.01;v+=.5)b(u+.01,v+.01,u+.39,v+.49,y0,y0+h-.01,pick([0xc49a6c,0xb58a5a,0xd8b88a]),'p')});if(wr)b(-.01,-.01,1.21,1.01,.14,y,0xe8f0f4,'G')})},
  machine:()=>{const c=pick([0x5a7a8a,0x8a8f94,0x6a7a5a,0x9a6a3a]);return It(1.7,1.3,1.9,b=>{b(0,0,1.7,1.3,0,.25,0x3a3f44,'m');b(.1,.1,1.6,1.2,.25,1.5,c,'m');b(.3,.3,1.4,1.0,1.5,1.9,shd(c,.85),'m');b(1.2,-.01,1.55,.0,.9,1.35,0x2b2b2b,'p');b(1.25,-.012,1.5,-.01,1.0,1.25,0x4aff8a,'e');
   b(1.3,-.02,1.36,-.01,.75,.81,0xff3030,'e');b(-.1,.5,.1,.8,.6,.8,STL,'m');b(.4,.35,.6,.55,1.9,2.6,STL,'m')},{vh:1.9})},
  conveyor:(w)=>It(w,.8,.9,b=>{b(0,0,w,.8,.75,.9,0x2b2b2b,'m');for(let u=.05;u<w-.1;u+=.25)b(u,.05,u+.2,.75,.88,.91,0x5a5f66,'m');for(let u=.1;u<w-.1;u+=1.2){b(u,.05,u+.08,.13,0,.75,0xe0a020,'m');b(u,.67,u+.08,.75,0,.75,0xe0a020,'m')}
   for(let i=0;i<Math.floor(w/1.4);i++){const u=fr(.2,w-.6);b(u,.2,u+.4,.6,.91,1.2,pick([0xc49a6c,0xb58a5a]),'p')}},{vh:1.2}),
  hay:(n)=>{n=n??ri(1,3);return It(1.15,.6,n*.5,b=>{for(let i=0;i<n;i++)b(.02*i,0,1.15-.02*i,.6,i*.5,i*.5+.49,0xd8c070,'z')})},
  stall:(c)=>It(3,2.8,1.3,b=>{c=c??0x8a6a42;b(0,2.72,3,2.8,0,1.3,c,'w');b(0,0,.08,2.72,0,1.3,c,'w');b(2.92,0,3,2.72,0,1.3,c,'w');for(let i=0;i<4;i++){const u=fr(.3,2.2),v=fr(.6,2);b(u,v,u+.6,v+.5,0,.08,0xd8c070,'z')}
   b(.3,2.3,1.0,2.7,.6,.9,0x8a6a42,'w');b(0,0,.6,.08,.9,1.0,c,'w');b(2.4,0,3,.08,.9,1.0,c,'w')},{cols:[[0,2.72,3,2.8,1.3],[0,0,.08,2.72,1.3],[2.92,0,3,2.72,1.3]],vh:1.3}),
  tractor:(c)=>It(1.9,3.2,2.3,b=>{c=c??pick([0x3a8a3a,0xc23b2f,0x2f5d9a]);b(.4,0,1.5,1.5,.6,1.3,c,'p');b(.3,1.4,1.6,2.6,.5,1.4,c,'p');b(.6,1.8,1.3,2.4,1.4,1.7,BLK,'q');b(.55,.2,.7,.35,1.3,2.0,0x2b2b2b,'m');
   [[0,0.2,.35,1.0,.0,.9],[1.55,.2,1.9,1.0,0,.9],[-.05,1.9,.4,3.15,0,1.5],[1.5,1.9,1.95,3.15,0,1.5]].forEach(([a,e,f,g,y0,y1])=>b(a,e,f,g,y0,y1,0x1f1f1f,'p'));b(.35,1.6,1.55,2.8,2.2,2.28,c,'p');[[.4,2.6],[1.45,2.6]].forEach(([a,e])=>b(a,e,a+.06,e+.06,1.4,2.2,0x2b2b2b,'m'))},{vh:2.3,m:.3}),
  sacks:()=>It(.95,.65,.55,b=>{for(let i=0;i<3;i++){const u=i*.3;b(u,0,u+.32,.6,0,.3,0xc8b08a,'q')}b(.15,.05,.75,.6,.3,.55,0xc8b08a,'q')}),
  wrackm:()=>It(1.5,.45,1.9,b=>{b(0,.35,1.5,.45,.0,1.0,0x5a3a22,'k');b(0,0,1.5,.45,.0,.12,0x5a3a22,'k');b(0,.35,1.5,.45,1.5,1.6,0x5a3a22,'k');for(let u=.12;u<1.4;u+=.22){b(u,.25,u+.04,.29,.12,1.95,0x6b4a2c,'k');b(u-.02,.23,u+.06,.31,1.95,2.15,STL,'m')}
   b(.2,.0,.6,.12,.3,.9,pick([0xc23b2f,0x2f4a8a,GLD]),'m');b(.9,.0,1.3,.12,.3,.9,pick([0xc23b2f,0x2f4a8a,GLD]),'m')},{vh:2.15}),
  armor:()=>It(.55,.5,1.95,b=>{b(.1,.1,.45,.4,0,.08,0x5a3a22,'k');b(.15,.15,.22,.35,.08,.85,0xa8acb0,'m');b(.33,.15,.4,.35,.08,.85,0xa8acb0,'m');b(.1,.12,.45,.38,.85,1.5,0xb8bcc0,'m');b(.0,.15,.1,.35,.9,1.45,0xa8acb0,'m');b(.45,.15,.55,.35,.9,1.45,0xa8acb0,'m');b(.17,.15,.38,.36,1.5,1.82,0xa8acb0,'m');b(.2,.14,.35,.15,1.62,1.68,BLK,'p');b(.25,.2,.3,.3,1.82,1.98,0xc23b2f,'q')},{vh:1.98}),
  throne:(c)=>It(1.0,.9,1.9,b=>{c=c??0x8a1a1a;b(0,0,1.0,.9,0,.25,0x6b4423,'k');b(.05,.05,.95,.85,.25,.55,GLD,'m');b(.1,.05,.9,.75,.55,.65,c,'q');b(.05,.7,.95,.9,.25,2.1,GLD,'m');b(.12,.68,.88,.7,.7,1.9,c,'q');b(0,.1,.12,.7,.55,.95,GLD,'m');b(.88,.1,1.0,.7,.55,.95,GLD,'m');b(.4,.7,.6,.9,2.1,2.3,GLD,'m')},{vh:2.3}),
  ltable:(w,c)=>It(w,2.1,.8,b=>{b(0,.55,w,1.55,.72,.8,c,'k');for(let u=.2;u<w-.2;u+=Math.max(1,(w-.4)/3))b(u,.95,u+.12,1.15,0,.72,c,'k');b(0,0,w,.4,.38,.45,c,'k');b(0,1.7,w,2.1,.38,.45,c,'k');[.1,w-.2].forEach(u=>{b(u,.1,u+.1,.3,0,.38,c,'k');b(u,1.8,u+.1,2.0,0,.38,c,'k')});
   for(let i=0;i<Math.floor(w/1.1);i++){const u=fr(.2,w-.4);b(u,.8,u+.22,1.0,.8,.84,pick([0xa8acb0,GLD,0x8a6a42]),'m');if(r()<.5)b(u+.3,1.1,u+.42,1.22,.8,.98,pick([0x8a6a42,GLD]),'m')}},{cols:[[0,.55,w,1.55,.8],[0,0,w,.4,.45],[0,1.7,w,2.1,.45]],m:.1}),
  chest:(c)=>It(.95,.55,.62,b=>{c=c??pick([0x6b4423,0x8a5a3a,0x5a3a22]);b(0,0,.95,.55,0,.5,c,'k');b(0,0,.95,.55,.5,.62,shd(c,1.1),'k');[.08,.82].forEach(u=>b(u,-.01,u+.06,.56,0,.63,0x3a3a3a,'m'));b(.42,-.02,.53,0,.38,.5,GLD,'m')}),
  rubble:(w)=>{w=w||fr(.8,1.6);return It(w,w*.8,.5,b=>{for(let i=0;i<7;i++){const u=fr(0,w-.4),v=fr(0,w*.8-.35),s=fr(.2,.5);b(u,v,u+s,v+s*.8,0,fr(.12,.5),pick([0x9a978e,0x8a877e,0xaaa79e,0x7a776e]),'s')}},{vh:.5})},
  column:(h)=>It(.75,.75,h,b=>{b(0,0,.75,.75,0,.2,0xb8b0a0,'s');b(.08,.08,.67,.67,.2,h,0xc8c0b0,'s');if(h>2.2)b(-.03,-.03,.78,.78,h-.2,h,0xb8b0a0,'s')},{vh:h}),
  urn:(c)=>It(.45,.45,.75,b=>{c=c??pick([0xb5603a,0xa8784a,0x8a5a3a,0x5a7a8a]);b(.1,.1,.35,.35,0,.1,c,'p');b(.04,.04,.41,.41,.1,.5,c,'p');b(.12,.12,.33,.33,.5,.68,c,'p');b(.08,.08,.37,.37,.68,.74,c,'p');b(.04,.18,.41,.27,.3,.34,shd(c,.7),'p')}),
  altar:(c)=>It(1.7,.85,1.05,b=>{c=c??0xc8c0b0;b(0,0,1.7,.85,0,1.0,c,'s');b(-.05,-.05,1.75,.9,1.0,1.08,shd(c,1.05),'s');b(.2,.2,.32,.32,1.08,1.35,0xf2ead6,'p');b(.24,.24,.28,.28,1.35,1.42,0xffc060,'e');b(1.38,.2,1.5,.32,1.08,1.35,0xf2ead6,'p');b(1.42,.24,1.46,.28,1.35,1.42,0xffc060,'e');b(.7,.3,1.0,.6,1.08,1.25,GLD,'m')},{vh:1.42}),
  statue:()=>It(.85,.85,2.4,b=>{const c=0xb8b4a8;b(0,0,.85,.85,0,.6,0x9a978e,'s');b(.25,.3,.6,.55,.6,1.4,c,'s');b(.2,.25,.65,.6,1.4,2.0,c,'s');b(.32,.32,.53,.53,2.0,2.35,c,'s');b(.05,.32,.2,.52,1.5,2.0,c,'s');b(.65,.32,.8,.52,1.6,2.25,c,'s')},{vh:2.35}),
  lowtable:(c)=>It(1.2,1.8,.35,b=>{b(0,.5,1.2,1.3,.3,.36,c,'k');[[.05,.55],[1.07,.55],[.05,1.17],[1.07,1.17]].forEach(([a,e])=>b(a,e,a+.08,e+.08,0,.3,c,'k'));[[.2,0],[.65,0],[.2,1.4],[.65,1.4]].forEach(([a,e])=>b(a,e,a+.38,e+.38,0,.08,pick([0x7a3a3a,0x3a4a6a,0x5a6a3a]),'q'));
   b(.45,.75,.75,1.05,.36,.45,0x5a4a3a,'p');b(.5,.8,.6,.9,.45,.5,0xd8e8c8,'p')},{cols:[[0,.5,1.2,1.3,.36]]}),
  anvil:()=>It(.8,.45,.82,b=>{b(.15,.1,.65,.35,0,.5,0x5a3a22,'k');b(.25,.12,.55,.33,.5,.65,0x2b2b2b,'m');b(0,.08,.8,.37,.65,.82,0x3a3a3a,'m');b(.7,.15,.9,.3,.7,.8,0x3a3a3a,'m')}),
  forge:()=>It(1.5,1.1,1.0,(b,F)=>{b(0,0,1.5,1.1,0,.9,0x8a7a6a,'s');b(.2,.2,1.3,.9,.9,.95,0x2b2b2b,'p');b(.35,.3,1.15,.8,.95,1.05,0xff6a1a,'e');b(.25,.3,1.25,1.1,1.6,1.9,0x5a5f66,'m');b(.55,.5,.95,.9,1.9,F.H-.01,0x5a5f66,'m')},{vh:9,cols:[[0,0,1.5,1.1,1.0]]}),
  coffin:(c)=>It(.75,2.0,.55,b=>{c=c??0x3a2418;b(.05,0,.7,2,0,.45,c,'k');b(0,.3,.75,1.5,0,.45,c,'k');b(.02,.02,.73,1.98,.45,.55,shd(c,1.2),'k');b(.3,.6,.45,1.4,.55,.57,GLD,'m');b(.18,.9,.57,1.05,.55,.57,GLD,'m')}),
  safe:()=>It(.85,.75,1.25,b=>{b(0,0,.85,.75,0,1.25,0x2b2f34,'m');b(.06,-.01,.79,0,.06,1.19,0x3a3f44,'m');b(.35,-.04,.5,-.01,.6,.75,GLD,'m');b(.6,-.03,.66,-.01,.4,.9,STL,'m')}),
  cell:()=>It(2.4,2.3,2.3,b=>{const c=0x3a3f44;for(let u=0;u<=2.4;u+=.2){b(u,0,u+.04,.04,0,2.3,c,'m');}for(let v=0;v<2.3;v+=.2){b(0,v,.04,v+.04,0,2.3,c,'m');b(2.36,v,2.4,v+.04,0,2.3,c,'m')}b(0,0,2.4,.04,2.26,2.3,c,'m');
   b(.15,1.4,.95,2.25,.4,.48,0x6b4a2c,'k');b(.18,1.43,.92,2.22,.48,.55,0x8a8a7a,'q');b(1.9,1.9,2.25,2.25,0,.4,0x8a8f94,'m')},{cols:[[0,0,1.6,.06,2.3],[0,0,.06,2.3,2.3],[2.34,0,2.4,2.3,2.3]],vh:2.3,m:.2}),
  teller:(w)=>It(w,.75,1.1,b=>{b(0,0,w,.75,0,1.05,0x5a3a22,'8');b(-.02,-.02,w+.02,.77,1.05,1.12,0x3a2418,'k');for(let u=.05;u<w;u+=.15)b(u,.3,u+.03,.33,1.12,2.2,GLD,'m');b(0,.3,w,.33,2.17,2.22,GLD,'m');b(.2,.4,.5,.6,1.12,1.18,0xc8e0c0,'p')},{vh:2.22}),
  fishdisp:(w)=>It(w,.95,.95,b=>{b(0,0,w,.95,0,.75,STL,'m');b(.05,.05,w-.05,.9,.75,.85,0xe8f4fa,'p');for(let u=.1;u<w-.4;u+=.42){const c=pick([0xa8b0b8,0x8a9aa8,0xd88a6a,0xc8c0b0]);b(u,.15,u+.35,.3,.85,.92,c,'p');b(u+.05,.5,u+.38,.68,.85,.93,pick([0xa8b0b8,0x6a7a8a]),'p')}b(w-.4,.6,w-.1,.9,.85,1.05,0x2b2b2b,'m')},{vh:1.05}),
  surfb:()=>It(.9,.3,2.2,b=>{b(0,.0,.9,.3,0,.15,0x8a6a42,'k');for(let i=0;i<3;i++){const u=.05+i*.29;b(u,.08,u+.22,.14,.15,fr(1.8,2.2),pick([0xf2d16b,0x2fb0b0,0xe86aa0,WHT,0xff8a2a]),'p')}b(0,.25,.9,.3,1.0,1.1,0x8a6a42,'k')},{vh:2.2}),
  skis:()=>It(.9,.35,1.8,b=>{b(0,.25,.9,.35,0,1.8,0x6b4a2c,'k');for(let i=0;i<4;i++){const u=.06+i*.21;b(u,.1,u+.08,.24,.05,fr(1.5,1.75),pick([0xc23b2f,0x2f6fd8,0xf2d16b,0x2b2b2b,WHT]),'p')}},{vh:1.8}),
  coatrack:()=>It(.45,.45,1.8,b=>{b(.05,.05,.4,.4,0,.04,0x5a3a22,'k');b(.2,.2,.25,.25,.04,1.8,0x5a3a22,'k');b(.05,.18,.4,.27,1.6,1.64,0x5a3a22,'k');b(.0,.12,.2,.33,1.0,1.58,pick(FP.fb),'q');if(r()<.6)b(.25,.12,.43,.33,1.15,1.58,pick(FP.fb),'q')},{cols:[[.1,.1,.35,.35,1.8]],vh:1.8}),
  rug:(c,w,d,ty)=>It(w,d,0,b=>{b(0,0,w,d,.012,.03,c,ty||(r()<.55?'6':'q'))},{flat:1}),
  bin:(c)=>It(.36,.36,.62,b=>{b(0,0,.36,.36,0,.58,c??pick([0x8a8f94,WHT,0x2b2b2b,0x3a7a4a]),'m');b(-.01,-.01,.37,.37,.58,.62,0x3a3f44,'m')}),
  basket:()=>It(.5,.42,.45,b=>{b(0,0,.5,.42,0,.4,0xd8c8a0,'w');b(.05,.05,.45,.37,.38,.48,pick(FP.fb),'q')}),
  iron:()=>It(1.25,.4,.9,b=>{b(0,0,1.25,.4,.85,.9,0xe8e8e4,'q');b(.3,.15,.35,.25,0,.85,STL,'m');b(.9,.15,.95,.25,0,.85,STL,'m');b(.9,.12,1.1,.28,.9,1.0,0x2f6fd8,'p')}),
  ladder:()=>It(.55,.75,1.9,b=>{b(0,0,.06,.06,0,1.9,0xd8c040,'m');b(.49,0,.55,.06,0,1.9,0xd8c040,'m');b(0,.69,.06,.75,0,1.8,0xd8c040,'m');b(.49,.69,.55,.75,0,1.8,0xd8c040,'m');for(let y=.35;y<1.8;y+=.35)b(0,.0,.55,.12,y,y+.04,0xd8c040,'m');b(0,0,.55,.75,1.85,1.9,0xd8c040,'m')},{vh:1.9}),
  sawhorse:()=>It(1.6,.5,.85,b=>{[.1,1.4].forEach(u=>{b(u,0,u+.08,.08,0,.75,0xc49a6c,'k');b(u,.42,u+.08,.5,0,.75,0xc49a6c,'k');b(u,0,u+.08,.5,.72,.78,0xc49a6c,'k')});b(-.1,.1,1.7,.4,.78,.85,0xd8b080,'k');if(r()<.6)b(.6,.15,.9,.35,.85,.95,0xc23b2f,'m')}),
  grill:()=>It(.8,.55,1.05,b=>{b(.05,.05,.12,.12,0,.8,0x2b2b2b,'m');b(.68,.05,.75,.12,0,.8,0x2b2b2b,'m');b(.05,.43,.12,.5,0,.8,0x2b2b2b,'m');b(.68,.43,.75,.5,0,.8,0x2b2b2b,'m');b(0,0,.8,.55,.8,1.05,0x2b2b2b,'m');b(-.15,.15,0,.4,.8,.85,0x2b2b2b,'m');b(.3,-.04,.5,0,.98,1.02,STL,'m')}),
  lounger:(c)=>It(.7,1.9,.4,b=>{c=c??pick([WHT,0x2fb0b0,0xf2d16b,0x3a5a7a]);b(0,0,.7,1.9,.25,.32,c,'q');b(0,1.4,.7,1.9,.32,.75,c,'q');[[0,0],[.64,0],[0,1.84],[.64,1.84]].forEach(([a,e])=>b(a,e,a+.06,e+.06,0,.25,0x8a8f94,'m'))},{vh:.75}),
  umbrella:(c)=>It(1.9,1.9,.95,b=>{c=c??pick(FP.br);b(.6,.6,1.3,1.3,.72,.76,WHT,'p');b(.92,.92,.98,.98,0,2.3,0x8a8f94,'m');b(.0,.5,1.9,1.4,2.2,2.3,c,'p');b(.5,0,1.4,1.9,2.2,2.3,c,'p');b(.25,.25,1.65,1.65,2.25,2.35,c,'p');chairD(b,.05,.7,0xe8e8e4,0);chairD(b,1.39,.7,0xe8e8e4,0)},{cols:[[.6,.6,1.3,1.3,.76],[.05,.7,.51,1.16,.95],[1.39,.7,1.85,1.16,.95]],vh:2.35}),
  wtank:()=>It(1.6,1.6,2.1,b=>{b(.1,.1,1.5,1.5,.3,2.0,pick([0x8a8f94,0x2b2b2b,0x3a5a7a,0xd8d8d4]),'m');b(0,.3,1.6,1.3,.35,1.95,0x8a8f94,'m');b(.3,0,1.3,1.6,.35,1.95,0x8a8f94,'m');[[.15,.15],[1.35,.15],[.15,1.35],[1.35,1.35]].forEach(([a,e])=>b(a,e,a+.1,e+.1,0,.3,0x3a3f44,'m'))},{vh:2.1}),
  acunit:()=>It(1.1,.85,.95,b=>{b(0,0,1.1,.85,0,.9,0xd8d8d4,'m');b(.15,.1,.95,.75,.9,.95,0x3a3f44,'m');b(.05,-.01,1.05,0,.1,.8,0xb8bcc0,'m')}),
  solar:()=>It(2,1.2,.6,b=>{for(let k=0;k<4;k++)b(0,k*.3,2,k*.3+.3,.15+k*.12,.2+k*.12,0x2a3a6a,'G');b(.1,.1,.2,1.1,0,.55,0x8a8f94,'m');b(1.8,.1,1.9,1.1,0,.55,0x8a8f94,'m')},{vh:.6}),
  ottoman:(c)=>It(.62,.62,.42,b=>{b(.04,.04,.58,.58,0,.06,0x3a2a1e,'k');b(0,0,.62,.62,.06,.42,c,'q');b(.05,.05,.57,.57,.42,.45,shd(c,1.1),'q')}),
  console:(c)=>It(1.1,.36,.8,b=>{b(0,0,1.1,.36,.76,.8,c,'k');b(.03,.03,.08,.33,0,.76,c,'k');b(1.02,.03,1.07,.33,0,.76,c,'k');b(.05,.05,1.05,.31,.15,.18,c,'k');lampD((u0,v0,u1,v1,y0,y1,cl,ty)=>b(u0,v0,u1,v1,y0+.8,y1+.8,cl,ty),.1,.1);b(.55,.08,.85,.28,.8,.88,pick(FP.br),'p');b(.35,.2,.5,.3,.18,.4,pick(FP.br),'p')},{vh:1.3}),
  curio:(c)=>It(.85,.42,1.85,b=>{b(0,0,.85,.42,0,.7,c,'8');b(0,0,.85,.42,.7,1.8,0xd8e8f0,'G');b(-.01,-.01,.86,.43,1.8,1.86,c,'k');b(0,.38,.85,.42,.7,1.8,c,'k');b(0,0,.04,.42,.7,1.8,c,'k');b(.81,0,.85,.42,.7,1.8,c,'k');for(let y=.95;y<1.8;y+=.3){b(.03,.03,.82,.39,y,y+.03,c,'k');for(let i=0;i<3;i++){const u=fr(.08,.7);b(u,.12,u+.08,.28,y+.02,y+fr(.08,.2),pick([WHT,GLD,0x6ac0e0,0xc23b2f,0x2f6fd8]),'p')}}},{vh:1.86}),
  shoerack:()=>It(.8,.32,.5,b=>{b(0,0,.8,.32,0,.5,0x8a6a42,'k');for(let i=0;i<4;i++){const u=.05+i*.19,c=pick([BLK,0x6b4423,WHT,0xc23b2f,0x2f6fd8]);b(u,.05,u+.08,.3,.2,.28,c,'p');b(u+.09,.05,u+.17,.3,.2,.28,c,'p')}}),
  hamper:()=>It(.45,.45,.6,b=>{b(0,0,.45,.45,0,.55,pick([0xd8c8a0,WHT,0x8a8f94]),'w');b(.05,.05,.4,.4,.55,.62,pick(FP.fb),'q')}),
  trunk:(c)=>It(1.0,.5,.55,b=>{c=c??pick([0x6b4423,0x2f4a6a,0x7a2a2a]);b(0,0,1,.5,0,.5,c,'p');b(-.01,-.01,1.01,.51,.5,.55,shd(c,.8),'p');[.1,.86].forEach(u=>b(u,-.01,u+.04,.51,0,.55,GLD,'m'));b(.45,-.02,.55,0,.32,.45,GLD,'m')}),
  ironbed:(w,bl)=>FU.bed(w,bl,0x2b2b2b,1.2),
  sofaCover:(w)=>{const S=FU.sofa(0xe8e4da,w);return It(S.w,S.d,.9,(b,F)=>{S.draw(b,F);b(-.03,-.03,S.w+.03,S.d+.03,.3,.93,0xeeeae0,'q')})}};
 for(const n in FU){const f0=FU[n];FU[n]=(...a)=>{const it=f0(...a);it.k=n;return it}}
 const CAPG={lsofa:'sofa',sofaCover:'sofa',dset:'table',cafeset:'table',rtable:'table',lowtable:'table',mtable:'table',ltable:'table',deskset:'desk',bedset:'bed',bunk:'bed',mattress:'bed',futon:'bed',wingchair:'armchair',recliner:'armchair',washer:'washer'};
 const FREET=new Set(['easel','pbag','flamp','ladder','umbrella']),FREEY=new Set(['beanbag','cbox','crate','sawhorse','ladder','easel','ebike','wbench','rug','gmat','iron','pallet','forklift','hay','sacks','rubble','car','carlift','tractor','machine','lounger','umbrella','solar','acunit','wtank']),
  FREEB=new Set(['cafeset','dset','rtable','lowtable','ltable','mtable','crack','manq','gondola','dcase','pool','pingpong','labb','hydro','cubicle','deskset','srack','stank','fishdisp','conveyor','barrel','column','urn','statue','altar','coffin','anvil','tread','desk','bench','island','recep']);
 const HCAP={bookshelf:1,table:1,sofa:1,tvstand:1,fireplace:1,wardrobe:1,dresser:1,pianoset:1,drums:1,aquarium:1,curio:1,sideboard:1,console:1,desk:1,fridge:1,cattree:1,dogbed:1,trunk:1,ottoman:1,flamp:1,island:1,pool:1,pingpong:1,gclock:1,rocker:1,toybox:1,crib:1,wstove:1,arcade:1,bench:1,hamper:1,basket:1,bin:1,stable:1,gchair:1,coatrack:1,shoerack:1,cbox:99,crate:2,bed:2,stool:4,counter:3,chair:2,plant:2,armchair:2},OCAP={plant:4,coatrack:1,wcooler:1,bin:2,jukebox:1,safe:2,fridge:1};
 const deskTop=(b,w,kind)=>{if(kind=='pc'){b(w/2-.35,.4,w/2+.35,.46,.76,1.2,BLK,'p');b(w/2-.32,.395,w/2+.32,.4,.79,1.17,pick([SCR,0x3a5a3a,0x5a3a6a]),'e');if(r()<.5){b(w/2+.38,.3,w/2+.62,.46,.76,1.12,BLK,'p');b(w/2+.4,.295,w/2+.6,.3,.8,1.08,SCR,'e')}
   b(w/2-.25,.1,w/2+.25,.25,.76,.78,0x2b2b2b,'p');b(w-.32,.08,w-.12,.5,.76,1.2,BLK,'p');b(w-.3,.07,w-.28,.08,.8,1.1,pick([0xff4aa0,0x4ae0ff,0x4aff6a]),'e')}
  else if(kind=='laptop'){b(w/2-.2,.1,w/2+.2,.4,.76,.78,0x8a8f94,'m');b(w/2-.2,.38,w/2+.2,.4,.78,1.05,0x8a8f94,'m');b(w/2-.18,.375,w/2+.18,.38,.8,1.03,SCR,'e');if(r()<.6)b(.08,.1,.3,.35,.76,.88,pick([WHT,0xc23b2f]),'p')}
  else if(kind=='art'){for(let i=0;i<6;i++){const u=fr(.05,w-.2);b(u,fr(.05,.4),u+.06,.2,.76,.84,pick(FP.br),'p')}b(.1,.3,.6,.55,.76,.77,WHT,'p')}
  else{b(.1,.1,.4,.35,.76,.82,pick(FP.br),'p');b(.12,.12,.38,.33,.82,.87,pick(FP.br),'p');lampD(b,w-.3,.35,0x2b2b2b,.76);b(w/2-.15,.1,w/2+.15,.32,.76,.765,WHT,'p')}};
 const gchD=(b,u,v,a,fl)=>{b(u+.25,v+.25,u+.35,v+.35,0,.45,BLK,'m');b(u+.05,v+.05,u+.55,v+.55,0,.05,BLK,'m');b(u,v,u+.6,v+.55,.45,.55,BLK,'q');if(fl)b(u,v,u+.6,v+.1,.55,1.15,a,'q');else b(u,v+.45,u+.6,v+.55,.55,1.15,a,'q')};
 // ---- wall decorations: w wide, h tall, y0 = bottom edge above the floor ----
 const DC={
  paint:(w,h)=>{w=w||pick([.6,.8,1.0,1.2]);h=h||pick([.5,.7,.9]);const fc=pick([0x3a2a1e,GLD,BLK,WHT,0x8a5a3a]),bg=pick(FP.wl.concat(FP.fb));return{w,h,y0:pick([1.25,1.35,1.45]),draw:b=>{b(0,0,w,.035,0,h,fc,'p');b(.05,-.002,w-.05,0,.05,h-.05,bg,'p');
   const k=r()*3|0;if(k==0){b(.1,-.004,w-.1,-.002,.06,h*.4,pick(GRN),'p');b(w*.6,-.005,w*.8,-.003,h*.6,h*.8,0xf2d16b,'p')}else if(k==1){for(let i=0;i<3;i++){const u=fr(.08,w-.3),y=fr(.08,h-.3);b(u,-.004,u+fr(.12,.25),-.002,y,y+fr(.12,.25),pick(FP.br),'p')}}else{b(w*.3,-.004,w*.7,-.002,h*.2,h*.85,pick(FP.fb),'p');b(w*.38,-.005,w*.62,-.003,h*.65,h*.8,0xe8c8a8,'p')}}}},
  poster:()=>{const w=pick([.5,.6,.7]),h=w*1.4,c=pick(FP.br);return{w,h,y0:1.2,draw:b=>{b(0,0,w,.01,0,h,c,'p');b(.05,-.002,w-.05,0,h*.45,h*.9,pick([BLK,WHT,shd(c,.6)]),'p');b(.08,-.002,w-.08,0,.08,h*.2,WHT,'p')}}},
  mirror:()=>({w:.6,h:1.0,y0:1.0,draw:b=>{b(0,0,.6,.03,0,1,GLD,'m');b(.04,-.002,.56,0,.04,.96,0xd8e8f0,'G')}}),
  clock:()=>({w:.36,h:.36,y0:1.75,draw:b=>{const c=pick([BLK,WHT,0x8a5a3a]);b(0,0,.36,.035,0,.36,c,'p');b(.04,-.002,.32,0,.04,.32,0xf8f6f0,'p');b(.17,-.004,.19,-.002,.17,.3,BLK,'p');b(.17,-.004,.28,-.002,.17,.19,BLK,'p')}}),
  tv:(w)=>{w=w||pick([1.0,1.3,1.6]);return{w,h:w*.58,y0:1.0,draw:b=>{b(0,0,w,.06,0,w*.58,BLK,'p');b(.03,-.002,w-.03,0,.03,w*.58-.03,pick([SCR,0x2a4a3a,0x4a3a6a]),'e')}}},
  shelf:()=>{const w=pick([.8,1.0,1.2]);return{w,h:.4,y0:1.5,draw:b=>{b(0,-.2,w,.035,0,.03,pick([0x8a5a3a,WHT,0x3a2a1e]),'k');let u=.05;while(u<w-.15){const k=r();if(k<.5)b(u,-.17,u+fr(.15,.3),0,.03,fr(.18,.26),WHT,'3');else if(k<.75)b(u,-.15,u+.1,-.05,.03,.25,pick(GRN),'q');else b(u,-.14,u+.08,-.06,.03,.16,pick(FP.br),'p');u+=fr(.2,.35)}}}},
  wboard:()=>({w:1.6,h:1.0,y0:1.0,draw:b=>{b(0,0,1.6,.03,0,1,0xb8bcc0,'m');b(.04,-.002,1.56,0,.04,.96,0xf8f8f6,'p');for(let i=0;i<4;i++){const u=fr(.1,1.0),y=fr(.2,.8);b(u,-.004,u+fr(.2,.5),-.002,y,y+.03,pick([0x2f6fd8,0xc23b2f,BLK]),'p')}b(.2,-.08,1.4,0,-.04,0,0xb8bcc0,'m')}}),
  menu:()=>({w:1.6,h:.9,y0:1.5,draw:b=>{b(0,0,1.6,.04,0,.9,BLK,'p');for(let i=0;i<5;i++)b(.12,-.002,fr(.6,1.4),0,.12+i*.15,.17+i*.15,pick([WHT,0xf2d16b,0xe8e4da]),'p')}}),
  dart:()=>({w:.5,h:.5,y0:1.5,draw:b=>{b(0,0,.5,.04,0,.5,BLK,'p');b(.05,-.004,.45,0,.05,.45,0x1f6a3a,'p');b(.12,-.006,.38,-.004,.12,.38,0xd8c8a0,'p');b(.2,-.008,.3,-.006,.2,.3,0xc23b2f,'p')}}),
  banner:(c)=>{c=c??pick([0x8a1a1a,0x1a2f6a,0x1a5a2a,0x5a1a5a]);return{w:.8,h:1.6,y0:.9,draw:b=>{b(-.05,-.05,.85,.03,1.55,1.6,0x5a3a22,'k');b(0,0,.8,.02,0,1.55,c,'q');b(.3,-.004,.5,0,.7,1.1,GLD,'p');b(.2,-.003,.6,0,.85,.95,GLD,'p')}}},
  antlers:()=>({w:.7,h:.5,y0:1.8,draw:b=>{b(.25,0,.45,.05,.1,.35,0x5a3a22,'k');b(.0,-.15,.3,0,.3,.36,0xe8dcc0,'p');b(.4,-.15,.7,0,.3,.36,0xe8dcc0,'p');b(.0,-.15,.05,0,.36,.5,0xe8dcc0,'p');b(.65,-.15,.7,0,.36,.5,0xe8dcc0,'p');b(.15,-.15,.2,0,.36,.48,0xe8dcc0,'p');b(.5,-.15,.55,0,.36,.48,0xe8dcc0,'p')}}),
  neon:()=>{const c=pick([0xff4aa0,0x4ae0ff,0xff8a2a,0x9a4aff,0x4aff8a]);return{w:1.0,h:.5,y0:1.7,draw:b=>{b(0,0,1,.02,0,.5,0x15171a,'p');b(.1,-.03,.9,0,.1,.14,c,'e');b(.1,-.03,.14,0,.14,.4,c,'e');b(.3,-.03,.34,0,.14,.4,c,'e');b(.5,-.03,.9,0,.36,.4,c,'e');b(.7,-.03,.74,0,.14,.36,c,'e')}}},
  pegs:()=>({w:1.2,h:.9,y0:1.0,draw:b=>{b(0,0,1.2,.02,0,.9,0xc8b08a,'p');for(let i=0;i<6;i++){const u=fr(.05,1.0),y=fr(.05,.6);b(u,-.04,u+fr(.04,.1),0,y,y+fr(.15,.3),pick([0xc23b2f,0x2b2b2b,0xe0a030,STL]),'m')}}}),
  photos:()=>({w:1.0,h:.6,y0:1.35,draw:b=>{for(let i=0;i<5;i++){const u=fr(0,.75),y=fr(0,.35),s=fr(.18,.25);b(u,0,u+s,.025,y,y+s*1.2,pick([BLK,WHT,GLD]),'p');b(u+.02,-.002,u+s-.02,0,y+.02,y+s*1.2-.02,pick(FP.wl.concat(FP.br)),'p')}}}),
  flag:()=>({w:1.2,h:.7,y0:1.4,draw:b=>{const c=pick(FP.br);b(0,0,1.2,.01,0,.7,c,'q');b(0,-.002,1.2,0,.25,.45,pick([WHT,BLK,0xf2d16b]),'q')}}),
  guitarW:()=>({w:.4,h:1.1,y0:.9,draw:b=>{const c=pick([0xc23b2f,0xd9a23a,BLK,0x2f6fd8]);b(.02,-.05,.38,0,0,.45,c,'p');b(.17,-.04,.23,0,.45,1.05,0x5a3a22,'k')}}),
  records:()=>({w:1.0,h:.35,y0:1.5,draw:b=>{for(let i=0;i<3;i++){const u=i*.35;b(u,0,u+.3,.02,0,.3,BLK,'p');b(u+.1,-.002,u+.2,0,.1,.2,pick(FP.br),'p')}}}),
  cobweb:()=>({w:.5,h:.5,y0:2.0,draw:b=>{b(0,-.3,.5,0,.45,.47,0xe8e8e8,'G');b(0,-.3,.02,0,0,.47,0xe8e8e8,'G')}}),
  cross:()=>({w:.5,h:.8,y0:1.5,draw:b=>{b(.2,0,.3,.04,0,.8,GLD,'m');b(0,0,.5,.04,.5,.6,GLD,'m')}})};
 // ---- who lives here: changes which rooms exist and what is in them ----
 const PERS=['family','family','family','family','couple','couple','couple','student','elderly','elderly','gamer','artist','musician','fitness','bookworm','pets','pets','moving','reno','prepper','party','collector'];
 const mkPal=(h,ps)=>{const rus=['cabin','west','keep','barn'].includes(h.st)||h.wt=='l';const P={wd:rus?pick([0x6b4423,0x5a3a22,0x8a5a3a,0x3a2a1e]):pick(FP.wd),wd2:pick(FP.wd),fb:pick(FP.fb),fb2:pick(FP.fb),acc:pick(FP.br),rug:pick(FP.rug),
   cab:pick(rus?[0x8a5a3a,0x6b4423,0x5a6a4a]:[WHT,WHT,0xe8e4da,0x5a6b7a,0x6a8a6a,0x2b2b2b,0xd9c9a8,0x8a5a3a,0x3a4a5a,0xa8c0c8]),top:pick([0x2b2b2b,0xe8e4da,0x8a8f94,0xd8c8a8,0x5a4a3a,0xf2efe6]),fl:pick(FP.fl),cp:pick(FP.cp),tl:pick(FP.tl),rus};
  if(ps=='abandoned'){P.fb=0x7a7a6a;P.fb2=0x6a6458;P.wd=0x5a4a3a;P.rug=0x6a5a4a}return P};
 const WPC=[0xe8dcc8,0xdfe6ea,0xf2e2d6,0xd0dcc8,0xe8d0c8];
 const area=rm=>rm.rects.reduce((a,R)=>a+(R.x1-R.x0)*(R.z1-R.z0),0);
 // helper bundle for one room
 const RK=(F,rm,K)=>{const o={F,rm,K,P:K.P,ps:K.ps,A:area(rm),
  W:(it,x)=>F.onWall(rm,it,x),M:(it,x)=>F.mid(rm,it,x),Y:(it)=>FREEY.has(it.k)||(!F.home&&FREEB.has(it.k))?F.any(rm,it):F.onWall(rm,it),C:(it,x)=>F.onWall(rm,it,Object.assign({corner:1},x)),D:(d,n)=>{let q=0;for(let i=0;i<(n||1);i++)q=F.deco(rm,d())||q;return q},
  L:(n,k)=>F.litter(rm,n,k),T:(it,q,g)=>F.front(it,q,g),opp:s=>F.opp[s],
  sofa:()=>{const k=r();return k<.25&&o.A>14?FU.lsofa(o.P.fb):k<.45?FU.sofa(o.P.fb,1.6):FU.sofa(o.P.fb)},
  messy:['student','party','moving','reno','abandoned'].includes(K.ps)};return o};
 const LIT={student:['clothes','pizza','can','cup','books','paper','shoes'],party:['cup','can','bottle','pizza','balloon','paper'],moving:['paper','books','clothes'],reno:['paint','plank','paper','debris'],abandoned:['debris','paper','leaves','bottle','debris'],
  family:['toy','shoes','books'],pets:['bone','ball','toy'],gamer:['can','pizza','cup'],artist:['paint','paper'],musician:['paper','cup'],elderly:['books'],couple:['books','cup'],fitness:['bottle','shoes'],bookworm:['books','books','paper'],prepper:['can','sack'],collector:['books','toy']};
 const extras=(k)=>{const{ps,P,W,C,M,Y,D,L}=k;
  if(ps=='pets'){r()<.5?W(FU.aquarium()):C(FU.cattree());Y(FU.dogbed())}if(ps=='gamer'){W(FU.arcade());Y(FU.beanbag(P.acc))}if(ps=='musician'){r()<.5?W(FU.pianoset()):C(FU.guitar());C(FU.amp())}
  if(ps=='artist')Y(FU.easel());if(ps=='elderly'){W(FU.gclock(P.wd));Y(FU.rocker(P.wd))}if(ps=='bookworm'){W(FU.bookshelf(P.wd));W(FU.bookshelf(P.wd))}if(ps=='prepper'){W(FU.sshelf(1.2,'can'));C(FU.barrel(0x2f6fd8))}
  if(ps=='collector'){W(FU.dcase(1.4,'gem'));W(FU.bookshelf(P.wd2))}if(ps=='moving'){for(let i=0;i<ri(4,8);i++)Y(FU.cbox())}if(ps=='reno'){Y(FU.ladder());Y(FU.sawhorse());M(FU.rug(0xeeeae0,fr(2,3),fr(1.6,2.4),'q'))}
  if(ps=='party'){D(()=>DC.neon())}};
 // ---- room recipes ----
 const ROOM={
  living:k=>{const{P,ps,W,M,C,Y,D,L,T,rm,F}=k;rm.wc=pick(FP.wl);rm.wt=r()<.25?'d':'p';if(rm.wt=='d')rm.wc=pick(WPC);rm.ft=P.rus&&r()<.5?'w':'k';rm.fc=P.fl;
   if(ps!='moving'&&r()<.75)M(FU.rug(P.rug,fr(1.8,2.8),fr(1.4,2.0)));
   const s=W(ps=='moving'?FU.sofaCover():k.sofa());if(s){const tv=r()<(P.rus?.45:.85)?FU.tvstand(P.wd):FU.fireplace(P.rus?'s':'b');if(!F.onWall(rm,tv,{sides:[F.opp[s.side]],mid2:1}))W(tv);T(FU.ctable(P.wd),s,.42)}else W(FU.tvstand(P.wd));
   for(let i=0;i<ri(1,2);i++)Y(r()<.6?FU.armchair(P.fb2):r()<.5?FU.wingchair(P.fb2):FU.recliner(P.fb2));
   if(r()<.6)W(FU.bookshelf(P.wd));C(FU.plant());if(r()<.6)C(FU.flamp());if(r()<.5)C(FU.stable(P.wd));if(r()<.4)W(FU.sideboard(P.wd2));if(r()<.25)W(FU.pianoset());if(r()<.2)C(FU.plant());if(r()<.15)W(FU.aquarium());
   extras(k);D(()=>DC.paint(),ri(1,3));if(r()<.5)D(()=>pick([DC.photos,DC.clock,DC.mirror])());if(P.rus&&r()<.6)D(()=>DC.antlers());if(ps=='student'||ps=='gamer')D(()=>DC.poster(),2);if(ps=='musician')D(()=>DC.guitarW());
   L(k.messy?ri(5,10):ri(0,2),LIT[ps]||['books'])},
  kitchen:k=>{const{P,ps,W,M,C,Y,D,L,rm,A}=k;rm.ft=r()<.5?'i':'7';rm.fc=P.tl;rm.wt=r()<.5?'7':'p';rm.wc=rm.wt=='7'?pick([0xf2f2ee,0xe8f0f0,0xf0ece0,0xdce8e0]):pick(FP.wl);rm.light=pick(['flush','pend','tube']);
   let ok=0;for(const w of [3.6,3,2.4,1.8,1.2]){if(W(FU.counter(w,P.cab,P.top,{sink:1,stove:1,up:1,mw:r()<.5,bs:rm.wc}))){ok=1;break}}if(!ok)for(const w of [2.4,1.8,1.2])if(W(FU.counter(w,P.cab,P.top,{sink:1,stove:1}))){ok=1;break}
   C(FU.fridge());if(r()<.6)for(const w of [2.4,1.8,1.2])if(W(FU.counter(w,P.cab,P.top,{up:r()<.5,mw:1,bs:rm.wc})))break;
   if(A>16&&r()<.6)M(FU.island(pick([1.6,2,2.4]),P.cab,P.top,r()<.6));else if(A>9)M(FU.dset(r()<.5?2:4,P.wd2));
   C(FU.bin());if(r()<.4)W(FU.sshelf(.9,'jar',P.wd));if(r()<.5)C(FU.plant(r()<.5?2:0));if(P.rus&&r()<.4)W(FU.wstove());D(()=>pick([DC.clock,DC.paint])());L(k.messy?ri(3,6):ri(0,1),['cup','bottle','can'])},
  kitchenette:k=>{const{P,W,C,D,L,rm}=k;rm.ft='i';rm.fc=P.tl;rm.wc=pick(FP.wl);let ok=0;for(const w of [3,2.4,1.8,1.2])if(W(FU.counter(w,P.cab,P.top,{sink:1,stove:1,up:1,mw:r()<.4,bs:0xf2f2ee}),{sides:['N','E','W']})){ok=1;break}
   if(!ok)for(const w of [1.8,1.2])if(W(FU.counter(w,P.cab,P.top,{sink:1,stove:1})))break;C(FU.fridge());C(FU.bin());if(r()<.5)C(FU.plant(2));D(()=>DC.clock())},
  dining:k=>{const{P,W,M,C,D,rm}=k;rm.wc=pick(FP.wl);rm.ft='k';rm.fc=P.fl;rm.light=pick(['chand','pend']);M(FU.rug(P.rug,fr(2.4,3.2),fr(1.8,2.4)));M(FU.dset(r()<.5?6:4,P.wd,P.wd2));W(FU.sideboard(P.wd));C(FU.plant());if(r()<.4)W(FU.bookshelf(P.wd2));D(()=>DC.paint(1.2,.8),ri(1,2))},
  bed:k=>{const{P,ps,W,M,C,Y,D,L,rm,A}=k;rm.wc=pick(FP.wl);rm.ft=r()<.6?'q':'k';rm.fc=rm.ft=='q'?P.cp:P.fl;if(r()<.2){rm.wt='d';rm.wc=pick(WPC)}
   const bc=pick(FP.fb.concat(FP.br)),big=A>9?pick([1.4,1.6,1.8]):1.2;
   if(ps=='student'){W(FU.mattress(bc))||W(FU.bed(.95,bc,P.wd))}else if(!W(FU.bedset(big,bc,P.wd,P.wd))&&!W(FU.bed(big,bc,P.wd)))W(FU.bed(.95,bc,P.wd));
   if(r()<.8)W(FU.wardrobe(r()<.5?P.wd:WHT));if(r()<.7)W(FU.dresser(P.wd));if(r()<.35||ps=='student'||ps=='gamer')W(FU.deskset(P.wd2,null,ps=='gamer'?'pc':pick(['pc','laptop','study'])));
   if(r()<.5)M(FU.rug(P.rug,fr(1.4,2.2),fr(1,1.6)));if(r()<.4)C(FU.plant());if(r()<.3)C(r()<.5?FU.armchair(P.fb2):FU.flamp());if(ps=='fitness')Y(FU.ebike());if(ps=='musician')C(FU.guitar());if(ps=='pets')Y(FU.dogbed());if(ps=='moving')for(let i=0;i<ri(3,6);i++)Y(FU.cbox());
   D(()=>DC.paint(),ri(0,2));if(r()<.5)D(()=>pick([DC.photos,DC.mirror,DC.clock,DC.shelf])());if(ps=='student'||ps=='gamer')D(()=>DC.poster(),ri(2,3));L(k.messy?ri(4,8):ri(0,3),k.messy?LIT[ps]:['clothes','shoes','books'])},
  kids:k=>{const{P,W,M,C,Y,D,L,rm,A}=k;rm.wc=pick(FP.kid);rm.ft=r()<.5?'q':'k';rm.fc=rm.ft=='q'?pick([0x9fd0f0,0xb8e0a0,0xf8e090,0xc8b0f0]):P.fl;const bc=pick(FP.br);
   if(A>8&&r()<.6)W(FU.bunk(pick(FP.br.concat([WHT])),pick(FP.br),pick(FP.br)));else{W(FU.bed(.95,bc,pick([WHT,P.wd,0x6ac0e0])));if(A>11)W(FU.bed(.95,pick(FP.br),WHT))}
   W(FU.toybox());if(r()<.6)W(FU.bookshelf(WHT,.8,1.2));if(r()<.6)M(FU.rug(pick(FP.br),fr(1.4,2),fr(1,1.5),'q'));if(r()<.5)W(FU.deskset(WHT,1.0,'study',pick(FP.br)));if(r()<.5)C(FU.beanbag(pick(FP.br)));if(r()<.4)W(FU.dresser(WHT,1));
   D(()=>DC.poster(),ri(1,3));if(r()<.5)D(()=>DC.flag());L(ri(4,9),['toy','toy','ball','books','clothes'])},
  nursery:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=pick(FP.kid);rm.ft='q';rm.fc=pick([0xf4f2ec,0xe8e0d0]);W(FU.crib());W(FU.dresser(WHT,1));C(FU.rocker(WHT));W(FU.toybox());M(FU.rug(pick(FP.kid),1.8,1.4,'q'));C(FU.plant());D(()=>DC.paint(.6,.6),2);L(ri(2,4),['toy','ball'])},
  bath:k=>{const{P,W,M,C,Y,D,L,rm,A}=k;rm.ft='7';rm.fc=pick(FP.tl);rm.wt='7';rm.wc=pick([0xf2f2ee,0xd8e8f0,0xe8f0e0,0xf0e8e0,0xc8dce8]);rm.light='flush';
   if(A>5.5&&r()<.7)W(FU.tub(r()<.85?WHT:0x6ac0e0))||W(FU.shower());else W(FU.shower())||W(FU.tub());W(FU.toilet());W(FU.vanity(pick([WHT,P.wd,0x5a6b7a]),pick([0xe8e8e4,0x2b2b2b])));if(r()<.6)C(FU.basket());if(r()<.4)C(FU.plant(2));if(r()<.5)W(FU.washer());
   M(FU.rug(pick([0x6ac0e0,WHT,0xe86aa0,0x3aa060]),.9,.6,'q'));},
  study:k=>{const{P,ps,W,M,C,Y,D,L,rm}=k;rm.wc=pick(FP.wl);rm.ft=r()<.5?'k':'q';rm.fc=rm.ft=='k'?P.fl:P.cp;W(FU.deskset(P.wd,pick([1.2,1.4,1.6]),pick(['pc','laptop','study'])));
   for(let i=0;i<(ps=='bookworm'?4:ri(1,2));i++)W(FU.bookshelf(P.wd));if(r()<.6)W(FU.fcab());if(r()<.6)Y(FU.armchair(P.fb2));if(r()<.5)C(FU.flamp());C(FU.plant());if(r()<.4)M(FU.rug(P.rug,1.8,1.3));
   D(()=>pick([DC.wboard,DC.paint,DC.clock,DC.photos])(),ri(1,2));L(ri(0,3),['paper','books','cup'])},
  gym:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=pick([0xdfe6ea,0xe8e8e4,0x3a3f44,0xc8d8e0]);rm.ft='q';rm.fc=pick([0x2b2b2b,0x3a3f44,0x5a5f66]);M(FU.gmat());W(FU.tread());W(FU.wrack());Y(FU.wbench());Y(FU.ebike());C(FU.pbag());D(()=>DC.mirror(),2);L(ri(1,3),['bottle','shoes'])},
  music:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=pick([0x3a3f44,0x5a3a3a,0x2a3a4a,0xe8dcc8]);rm.wt=r()<.5?'q':'p';rm.ft='q';rm.fc=pick(FP.rug);if(r()<.5)W(FU.pianoset());Y(FU.drums());C(FU.guitar());C(FU.guitar());W(FU.amp());C(FU.amp());if(r()<.5)W(FU.sofa(P.fb,1.6));
   D(()=>DC.poster(),2);D(()=>DC.guitarW());L(ri(2,4),['paper','cup','can'])},
  art:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=WHT;rm.ft='k';rm.fc=pick([0xd8c8a8,0xc49a6c]);Y(FU.easel());Y(FU.easel());W(FU.desk(P.wd,1.4,'art'));W(FU.sshelf(1.2,'jar'));if(r()<.5)W(FU.armchair(P.fb));C(FU.plant());D(()=>DC.paint(),ri(3,5));L(ri(4,7),['paint','paper','paint'])},
  game:k=>{const{P,W,M,C,Y,D,L,rm,A}=k;rm.wc=pick([0x2a3a4a,0x3a2a4a,0x2b2b2b,0x3a4a3a,0xdfe6ea]);rm.ft='q';rm.fc=pick([0x2b2b2b,0x3a3f44,0x5a2a2a]);rm.light='pend';
   if(A>12)M(r()<.6?FU.pool():FU.pingpong());W(FU.arcade());C(FU.arcade());const s=W(FU.sofa(P.fb));if(s&&!k.F.onWall(rm,FU.tvstand(BLK),{sides:[k.F.opp[s.side]]}))D(()=>DC.tv());Y(FU.beanbag(P.acc));Y(FU.gchair(P.acc));
   D(()=>pick([DC.neon,DC.dart,DC.poster])(),ri(2,3));L(ri(2,5),['can','pizza','cup'])},
  storage:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=pick([0xe8e4da,0xd8d0c0]);rm.ft='k';rm.fc=P.fl;rm.light='pend';W(FU.sshelf(1.2,'box'));if(r()<.6)W(FU.sshelf(1,'box'));for(let i=0;i<ri(4,8);i++)Y(FU.cbox());if(r()<.6)W(FU.sofaCover());if(r()<.5)W(FU.wardrobe(P.wd));if(r()<.4)Y(FU.crate(.8));
   L(ri(2,4),['books','toy','paper','clothes'])},
  laundry:k=>{const{P,W,C,Y,D,L,rm}=k;rm.ft='7';rm.fc=pick(FP.tl);rm.wc=pick([0xf2f2ee,0xdfe6ea]);W(FU.washer());W(FU.washer(null,1));W(FU.sshelf(1,'jar'));C(FU.basket());Y(FU.iron());C(FU.bin());;L(ri(1,3),['clothes'])},
  studio:k=>{const{P,ps,W,M,C,Y,D,L,rm,A}=k;rm.wc=pick(FP.wl);rm.ft='k';rm.fc=P.fl;const bc=pick(FP.fb.concat(FP.br));W(A>10?FU.bed(1.4,bc,P.wd):FU.bed(.95,bc,P.wd));if(r()<.6)W(FU.armchair(P.fb2));if(r()<.6)C(FU.nstand(P.wd));
   if(P.rus&&r()<.6)C(FU.wstove());else if(r()<.5)W(FU.dresser(P.wd));if(r()<.5)M(FU.rug(P.rug,1.6,1.2));if(r()<.4)C(FU.plant());if(r()<.5)Y(FU.chair(P.wd));extras(k);D(()=>DC.paint(),ri(1,2));if(P.rus)D(()=>DC.antlers());L(k.messy?ri(3,6):ri(0,2),LIT[ps]||['books'])},
  hall:k=>{const{P,W,C,D,rm}=k;rm.wc=pick(FP.wl);rm.ft='k';rm.fc=P.fl;rm.light='flush';if(r()<.6)C(FU.plant());if(r()<.4)C(FU.basket());if(r()<.4)W(FU.bookshelf(P.wd,.8,1.2));D(()=>pick([DC.photos,DC.paint,DC.mirror])())},
  loft:k=>{const{P,ps,W,M,C,Y,D,L,rm}=k;rm.wc=pick(FP.wl);rm.ft='k';rm.fc=P.fl;const bc=pick(FP.fb.concat(FP.br));W(FU.bedset(1.4,bc,P.wd,P.wd))||W(FU.bed(1.2,bc,P.wd));W(FU.wardrobe(P.wd));if(r()<.6)W(FU.sofa(P.fb,1.6));if(r()<.5)W(FU.deskset(P.wd2,null,'laptop'));
   M(FU.rug(P.rug,2,1.5));C(FU.plant());extras(k);D(()=>DC.paint(),2);L(k.messy?ri(3,6):ri(0,2),LIT[ps]||['books'])},
  roof:k=>{const{P,W,M,C,Y,rm}=k;rm.nowall=1;rm.light=0;if(r()<.5){Y(FU.lounger());Y(FU.lounger())}if(r()<.6)M(FU.umbrella());C(FU.plant());C(FU.plant());if(r()<.5)C(FU.grill());if(r()<.4)C(FU.wtank());if(r()<.5)C(FU.acunit());},
  roofU:k=>{const{C,Y,rm}=k;rm.nowall=1;rm.light=0;if(r()<.7)C(FU.acunit());if(r()<.5)C(FU.acunit());if(r()<.4)C(FU.wtank());},
  reno:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=pick([0xe8e4da,0xd8d0c0,0xc8c8c0]);rm.ft='k';rm.fc=0xc8b89a;rm.light='pend';M(FU.rug(0xeeeae0,fr(2,3),fr(1.6,2.4),'q'));Y(FU.ladder());Y(FU.sawhorse());C(FU.cbox(.6,2));W(FU.sofaCover());C(FU.bin(0x8a8f94));L(ri(5,9),['paint','plank','paper','debris'])},
  abandoned:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=pick([0x8a8478,0x7a7468,0x9a9282]);rm.ft='k';rm.fc=0x6a5a48;rm.light=0;if(r()<.6)W(FU.sofa(0x6a6458));if(r()<.5)Y(FU.chair(0x5a4a3a));if(r()<.4)W(FU.bookshelf(0x4a3a2a,1,1.8));if(r()<.5)Y(FU.crate(.8,0x6a5a42));if(r()<.4)C(FU.barrel(0x6b4a2c));
   if(r()<.4)D(()=>DC.paint());L(ri(6,11),['debris','paper','leaves','bottle','debris'])},
  // ---- basements ----
  bsm:k=>{const{rm}=k;k.C(FU.furnace());k.C(FU.wheater());(ROOM['b_'+k.K.bt]||ROOM.b_store)(k)},
  b_rec:k=>{const{P,W,M,C,Y,D,L,rm,F}=k;rm.wc=pick([0xd8d0c0,0x9ab0a0,0xc8b8a8,0x8aa0b4]);rm.ft='q';rm.fc=pick(FP.cp);M(r()<.5?FU.pingpong():FU.pool());const s=W(FU.sofa(P.fb));if(s&&!F.onWall(rm,FU.tvstand(P.wd),{sides:[F.opp[s.side]]}))D(()=>DC.tv());if(r()<.5)W(FU.barset(2.2,P.wd,0x2b2b2b));else W(FU.arcade());Y(FU.beanbag(P.acc));D(()=>pick([DC.dart,DC.poster,DC.neon,DC.flag])(),2);L(ri(1,3),['can','cup'])},
  b_shop:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=0xc8c8c0;rm.ft='c';rm.fc=0x9a9a96;rm.light='tube';W(FU.wkb(2.2));W(FU.wkb(1.6));C(FU.tchest());W(FU.sshelf(1.2,'tool'));Y(FU.sawhorse());Y(FU.crate(.8));D(()=>DC.pegs());L(ri(3,6),['plank','paint','paper'])},
  b_store:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=0xc8c8c0;rm.light='pend';W(FU.sshelf(1.2,'box'));W(FU.sshelf(1.2,'box'));W(FU.sshelf(1,'jar'));for(let i=0;i<ri(5,9);i++)Y(FU.cbox());if(r()<.6)W(FU.sofaCover());Y(FU.crate(.8));L(ri(2,4),['books','toy','paper'])},
  b_gym:k=>{ROOM.gym(k)},b_laundry:k=>{ROOM.laundry(k);k.W(FU.sshelf(1.2,'box'))},
  b_theater:k=>{const{P,W,M,C,Y,D,L,rm,F}=k;rm.wc=pick([0x3a2a2a,0x2a2a3a,0x2b2b2b]);rm.wt='q';rm.ft='q';rm.fc=0x5a2a2a;rm.light='flush';const q=F.deco(rm,DC.tv(2.0));
   if(q){const s=q.side,f={N:2,S:0,E:1,W:3}[s];for(const dd of [2.4,3.6]){const n=3;for(let i=0;i<n;i++){const it=FU.recliner(0x7a1a1a),R=rm.rects[0],off=(i-1)*1.0;let X0,Z0;
     if(s=='N'){X0=(q[0]+q[2])/2+off-it.w/2;Z0=q[1]-dd-it.d}else if(s=='S'){X0=(q[0]+q[2])/2+off-it.w/2;Z0=q[3]+dd}else if(s=='E'){Z0=(q[1]+q[3])/2+off-it.w/2;X0=q[0]-dd-it.d}else{Z0=(q[1]+q[3])/2+off-it.w/2;X0=q[2]+dd}F.at(it,X0,Z0,f)}}}
   C(FU.dcase(1,'cake'));C(FU.flamp());D(()=>DC.poster(),2)},
  b_bunker:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=0x8a8f7a;rm.ft='c';rm.fc=0x6a6a62;rm.light='tube';W(FU.sshelf(1.5,'can'));W(FU.sshelf(1.2,'can'));W(FU.bunk(0x5a5f66,0x5a6a3a,0x5a6a3a));C(FU.barrel(0x2f6fd8));C(FU.barrel(0x2f6fd8));Y(FU.crate(.8,0x5a6a3a));W(FU.desk(0x5a5f66,1.2,'laptop'));D(()=>DC.flag());L(ri(2,4),['can','sack'])},
  b_cellar:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=0xb8a890;rm.wt='b';rm.ft='s';rm.fc=0x8a8478;rm.light='pend';for(let i=0;i<ri(4,7);i++)Y(FU.barrel(0x6b4a2c));W(FU.sshelf(1.2,'jar',0x6b4423));W(FU.sshelf(1.2,'jar',0x6b4423));Y(FU.crate(.8))},
  b_band:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=pick([0x3a3f44,0x5a3a3a]);rm.wt='q';rm.ft='q';rm.fc=pick(FP.rug);Y(FU.drums());W(FU.amp());C(FU.amp());C(FU.guitar());C(FU.guitar());W(FU.sofa(P.fb));D(()=>DC.poster(),2);D(()=>DC.neon());L(ri(3,6),['can','cup','paper'])}};
 // ---- businesses: ground floor of a shop, café, bar... ----
 const shopFloor=(k,c,ft,fc,lt)=>{k.rm.wc=c;k.rm.ft=ft||'i';k.rm.fc=fc??0xe8e8e4;k.rm.light=lt||'tube'};
 // rows of shelves/desks/racks across the biggest part of a room; rep: repeat the piece along each row
 const aisles=(k,mk,gap,rep,mg)=>{const{F,rm}=k;const R=rm.rects.reduce((a,b)=>(b.x1-b.x0)*(b.z1-b.z0)>(a.x1-a.x0)*(a.z1-a.z0)?b:a),ax=(R.x1-R.x0)>=(R.z1-R.z0);gap=gap||1.25;mg=mg??1.3;
  const L0=ax?R.x0:R.z0,L1=ax?R.x1:R.z1,C0=ax?R.z0:R.x0,C1=ax?R.z1:R.x1,len=Math.min(4.8,(L1-L0)-2*mg-.2);if(len<1.2)return 0;let n=0;
  for(let c=C0+mg;;){const it0=mk(len);if(c+it0.d>C1-mg+.3)break;if(!rep){const p=(L0+L1)/2-it0.w/2;if(F.at(it0,ax?p:c,ax?c:p,ax?0:1))n++}
   else{let it=it0,p=L0+mg;const pe=L1-mg;while(p+it.w<=pe){if(F.at(it,ax?p:c,ax?c:p,ax?0:1))n++;p+=it.w+.05;it=mk(len)}}c+=it0.d+gap}return n};
 const BIZ={
  cafe:k=>{const{P,W,M,C,Y,D,L,F,rm}=k;shopFloor(k,pick([0xe8dcc8,0x6a4a3a,0xdfe6ea,0xc8d8c0]),'k',P.fl,'pend');W(FU.barset(2.4,P.wd,0xe8e4da));W(FU.dcase(1.4,'cake'));W(FU.counter(1.8,P.cab,P.top,{sink:1,up:1,mw:0}));for(let i=0;i<ri(3,6);i++)Y(FU.cafeset(BLK,P.wd));C(FU.plant());C(FU.plant(1));if(r()<.5)W(FU.bookshelf(P.wd));D(()=>DC.menu());D(()=>DC.paint(),2)},
  diner:k=>{const{P,W,M,C,Y,D,L}=k;shopFloor(k,pick([0xf2efe6,0xc23b2f,0x6ac0e0]),'i',WHT,'tube');W(FU.barset(3,0xc23b2f,0xe8e8e4));for(let i=0;i<4;i++)W(FU.booth(0xc23b2f,WHT));W(FU.counter(1.8,STL,STL,{stove:1,up:1}));C(FU.jukebox());C(FU.fridge(STL));D(()=>DC.menu());D(()=>DC.neon())},
  grocery:k=>{const{P,W,M,C,Y,D,L}=k;shopFloor(k,pick([0xf2efe6,0xe8f0e0]),'i',0xe8e8e4,'tube');W(FU.checkout(1.8),{sides:['S','E','W']});aisles(k,len=>FU.gondola(len,'p'));W(FU.gfridge(1.4));W(FU.gfridge(1));W(FU.wshelf(1.6,'p'));C(FU.bin());Y(FU.cbox());D(()=>DC.poster())},
  conv:k=>BIZ.grocery(k),
  pharmacy:k=>{const{P,W,M,C,Y,D,L}=k;shopFloor(k,0xf4f6f8,'i',0xf0f0ee,'tube');W(FU.recep(2.2,WHT));aisles(k,len=>FU.gondola(len,'ph'));W(FU.wshelf(1.6,'ph'));W(FU.wshelf(1.6,'ph'));W(FU.gfridge(1));C(FU.plant());D(()=>DC.poster())},
  bar:k=>{const{P,W,M,C,Y,D,L,F,rm}=k;shopFloor(k,pick([0x3a2a1e,0x2a3a2a,0x5a2a2a,0x2b2b2b]),'k',0x5a3a22,'pend');const q=W(FU.backbar(2.4,P.wd));if(q)F.front(FU.barset(2.4,0x5a3a22,0x3a2418),q,1.0);else W(FU.barset(2.4,0x5a3a22,0x3a2418));
   if(r()<.6)M(FU.pool());for(let i=0;i<ri(2,4);i++)Y(r()<.5?FU.cafeset(0x3a2418,0x5a3a22):FU.dset(4,0x5a3a22));C(FU.jukebox());D(()=>DC.dart());D(()=>DC.neon(),2);D(()=>DC.flag());L(ri(2,5),['bottle','can','cup'])},
  bakery:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,pick([0xf6efd2,0xf2e2d6]),'7',0xe8e0d0,'pend');W(FU.dcase(1.6,'cake'));W(FU.dcase(1.4,'cake'));W(FU.counter(2.4,P.cab,P.top,{stove:1,sink:1,up:1}));W(FU.wshelf(1.4,'p',0x8a5a3a));Y(FU.cafeset(WHT,P.wd));Y(FU.cafeset(WHT,P.wd));D(()=>DC.menu())},
  hardware:k=>{const{W,C,Y,D,L}=k;shopFloor(k,0xdfe6ea,'c',0x9a9a96,'tube');W(FU.checkout(1.8));aisles(k,len=>FU.gondola(len,'tool'));W(FU.wshelf(2,'tool'));W(FU.wshelf(1.6,'tool'));Y(FU.ladder());C(FU.cbox());L(ri(2,4),['paint','plank'])},
  clothes:k=>{const{W,M,C,Y,D}=k;shopFloor(k,pick([0xf2efe6,0xe8d0c8,0xdfe6ea]),'k',0xd0b08a,'pend');W(FU.checkout(1.6));for(let i=0;i<ri(3,5);i++)Y(FU.crack(pick([1.2,1.6])));C(FU.manq());C(FU.manq());W(FU.wshelf(1.6,'p'));Y(FU.armchair(0xc98a6a));D(()=>DC.mirror(),2)},
  barber:k=>{const{W,M,C,Y,D,F,rm}=k;shopFloor(k,pick([0xf2efe6,0xdfe6ea]),'i',WHT,'tube');for(let i=0;i<3;i++){const q=F.deco(rm,DC.mirror());if(q)F.front(FU.bchair(),q,.5,{N:2,S:0,E:1,W:3}[q.side])}W(FU.bench(1.6,0x6b4423));W(FU.vanity(WHT));C(FU.plant());W(FU.wshelf(1,'ph'));D(()=>DC.poster())},
  laundromat:k=>{const{W,C,Y,D}=k;shopFloor(k,pick([0xdfe6ea,0xf2efe6,0x6ac0e0]),'i',WHT,'tube');for(let i=0;i<8;i++)W(FU.washer(null,i%2));W(FU.bench(1.6,0x2f6fd8));Y(FU.desk(WHT,1.4));C(FU.basket());C(FU.bin());D(()=>DC.clock());D(()=>DC.poster())},
  books:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,pick([0xe8dcc8,0x3a4a3a,0xf2e2d6]),'k',P.fl,'pend');for(let i=0;i<6;i++)W(FU.bookshelf(P.wd,1.2,2.1));W(FU.checkout(1.6));Y(FU.armchair(P.fb));Y(FU.armchair(P.fb2));M(FU.rug(P.rug,2.2,1.6));C(FU.plant());D(()=>DC.paint())},
  arcade:k=>{const{W,M,C,Y,D}=k;shopFloor(k,0x1a1a2a,'q',0x2a2a4a,'flush');for(let i=0;i<7;i++)W(FU.arcade());M(r()<.5?FU.pool():FU.pingpong());W(FU.recep(1.8,0x2b2b2b));D(()=>DC.neon(),3)},
  gymbiz:k=>{const{W,M,C,Y,D}=k;shopFloor(k,0xdfe6ea,'q',0x2b2b2b,'tube');W(FU.recep(1.8,0x2b2b2b));W(FU.tread());W(FU.tread());W(FU.wrack());Y(FU.wbench());Y(FU.wbench());Y(FU.ebike());C(FU.pbag());C(FU.pbag());M(FU.gmat());D(()=>DC.mirror(),3)},
  clinic:k=>{const{W,M,C,Y,D}=k;shopFloor(k,pick([0xe8f4f4,0xf4f6f8]),'i',0xf0f0ee,'tube');W(FU.recep(2,WHT));W(FU.bench(1.8,0x6ac0e0));W(FU.hbed());W(FU.hbed());W(FU.fcab());W(FU.vanity(WHT));C(FU.plant());C(FU.wcooler());D(()=>DC.poster());D(()=>DC.wboard())},
  pizza:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,pick([0xf2e2d6,0x8a2a2a,0xe8dcc8]),'i',WHT,'pend');W(FU.counter(2.4,0xc23b2f,0xe8e4da,{stove:1,sink:1,up:1}));W(FU.dcase(1.4,'cake'));W(FU.booth(0x8a2a2a,0xe8dcc0));W(FU.booth(0x8a2a2a,0xe8dcc0));Y(FU.cafeset(0x2b2b2b,0x8a2a2a));Y(FU.cafeset(0x2b2b2b,0x8a2a2a));C(FU.gfridge(1));D(()=>DC.menu());D(()=>DC.neon())},
  toys:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,pick(FP.kid),'q',pick(FP.kid),'tube');W(FU.checkout(1.6));aisles(k,len=>FU.gondola(len,'p'));W(FU.wshelf(1.6,'p'));W(FU.toybox());C(FU.toybox());D(()=>DC.poster(),2);L(ri(3,6),['toy','ball'])},
  flowers:k=>{const{W,M,C,Y,D}=k;shopFloor(k,pick([0xe8f0e0,0xf2efe6]),'7',0xe8e8e4,'pend');W(FU.checkout(1.6));for(let i=0;i<10;i++)Y(FU.plant());W(FU.wshelf(1.6,'p',0x6b4423));W(FU.dcase(1.2));D(()=>DC.paint())},
  saloon:k=>{const{P,W,M,C,Y,D,L,F,rm}=k;shopFloor(k,pick([0x8a5a3a,0x6b4423,0x7a3a2a]),'w',0x6b4423,'chand');const q=W(FU.backbar(2.4,0x5a3a22));if(q)F.front(FU.barset(2.4,0x5a3a22,0x3a2418),q,1.0);else W(FU.barset(2.4,0x5a3a22,0x3a2418));
   W(FU.pianoset(0x3a2418));for(let i=0;i<ri(2,3);i++)Y(FU.dset(4,0x6b4423));C(FU.barrel(0x6b4a2c));D(()=>DC.antlers());D(()=>DC.paint());L(ri(3,6),['bottle','cup'])},
  sheriff:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,0xc9a46a,'w',0x8a5a3a,'pend');W(FU.cell());W(FU.cell());W(FU.deskset(0x6b4423,1.4,'study'));W(FU.wrackm());W(FU.fcab(0x5a3a22));C(FU.safe());D(()=>DC.poster(),3)},
  bank:k=>{const{W,M,C,Y,D}=k;shopFloor(k,pick([0xe8dcc0,0x5a6a5a]),'s',0xc8c0b0,'chand');W(FU.teller(3));C(FU.safe());C(FU.safe());W(FU.bench(1.8,0x5a3a22));C(FU.plant());D(()=>DC.clock());D(()=>DC.paint())},
  general:k=>{const{P,W,M,C,Y,D,L}=k;shopFloor(k,pick([0xd9c49a,0xc9a46a]),'w',0x8a5a3a,'pend');W(FU.checkout(1.8));W(FU.sshelf(1.5,'jar',0x6b4423));W(FU.sshelf(1.5,'can',0x6b4423));W(FU.wshelf(1.6,'p',0x6b4423));C(FU.barrel(0x6b4a2c));C(FU.barrel(0x6b4a2c));Y(FU.sacks());Y(FU.crate(.8));W(FU.dcase(1.2))},
  hotel:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,pick([0xe8d0c8,0x8a3a3a,0xe8dcc8]),'k',P.fl,'chand');W(FU.recep(2.4,P.wd));Y(FU.armchair(P.fb));Y(FU.armchair(P.fb));W(FU.sofa(P.fb2));C(FU.plant(1));C(FU.plant(1));C(FU.coatrack());M(FU.rug(P.rug,2.6,1.8));D(()=>DC.paint(),2);D(()=>DC.clock())},
  smith:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0x8a7a6a,'j',0x8a7a5a,'pend');W(FU.forge());Y(FU.anvil());W(FU.wkb(2,0x5a3a22));C(FU.barrel(0x6b4a2c));W(FU.wrackm());C(FU.tchest());D(()=>DC.pegs());L(ri(2,4),['debris'])},
  undertaker:k=>{const{W,M,C,Y,D}=k;shopFloor(k,0x3a3a3a,'w',0x3a2a1e,'pend');W(FU.coffin());W(FU.coffin());Y(FU.coffin(0x6b4423));W(FU.deskset(0x3a2418,1.2,'study'));C(FU.urn());C(FU.urn());D(()=>DC.cross());D(()=>DC.paint())},
  post:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,pick([0xd9c49a,0xdfe6ea]),'k',0x8a6a42,'pend');W(FU.teller(2.4));W(FU.sshelf(1.5,'box'));W(FU.sshelf(1.2,'box'));for(let i=0;i<5;i++)Y(FU.cbox());D(()=>DC.clock());D(()=>DC.flag());L(ri(3,6),['paper'])},
  ramen:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,pick([0xe8dcc0,0x5a3a28]),'k',0xc8a27a,'pend');W(FU.barset(3,0x5a3a28,0xd8c8a8));W(FU.counter(2.4,0x5a3a28,STL,{stove:1,sink:1,up:1}));Y(FU.lowtable(0x5a3a28));Y(FU.lowtable(0x5a3a28));C(FU.plant(3));D(()=>DC.banner(0x8a1a1a),2);D(()=>DC.menu())},
  teahouse:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,0xf2e8d8,'9',0xd8d0a0,'pend');for(let i=0;i<4;i++)Y(FU.lowtable(0x5a3a28));W(FU.sideboard(0x5a3a28,1.4));C(FU.plant(3));C(FU.plant(3));D(()=>DC.paint(.8,1.2),2)},
  tavern:k=>{const{P,W,M,C,Y,D,L,F}=k;shopFloor(k,0xd8c8a8,'w',0x6b4423,'chand');const q=W(FU.backbar(2.4,0x5a3a22));if(q)F.front(FU.barset(2.4,0x5a3a22,0x3a2418),q,1.0);for(let i=0;i<ri(2,3);i++)Y(FU.ltable(2.2,0x6b4423));W(FU.fireplace('s',0x8a8478));C(FU.barrel(0x6b4a2c));C(FU.barrel(0x6b4a2c));D(()=>DC.banner(),2);D(()=>DC.antlers());L(ri(2,5),['cup','bottle'])},
  tiki:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,pick([0xf2d16b,0x2fb0b0,0xe8dcc0]),'4',0xc8a87a,'pend');const q=W(FU.backbar(2.4,0x8a6a42));if(q)k.F.front(FU.barset(2.4,0x8a6a42,0xd8c070),q,1.0);Y(FU.cafeset(0x8a6a42,0x8a6a42));Y(FU.cafeset(0x8a6a42,0x8a6a42));C(FU.plant(1));C(FU.plant(1));W(FU.surfb());D(()=>DC.flag())},
  surf:k=>{const{W,M,C,Y,D}=k;shopFloor(k,pick([0x6ac0e0,0xf2d16b,WHT]),'4',0xc8a87a,'pend');W(FU.surfb());W(FU.surfb());W(FU.surfb());Y(FU.crack(1.4));Y(FU.crack(1.2));W(FU.checkout(1.6));C(FU.manq());D(()=>DC.poster(),2)},
  fish:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xdfe6ea,'7',0xd8e4ea,'tube');W(FU.fishdisp(2.4));W(FU.fishdisp(2));W(FU.gfridge(1.4));C(FU.barrel(0x2f6fd8));C(FU.bin());W(FU.checkout(1.6));D(()=>DC.flag())},
  bait:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,pick([0x6f8a8a,0xa86a3a]),'4',0x9a8a6a,'pend');W(FU.gfridge(1));W(FU.sshelf(1.2,'jar',0x6b4423));W(FU.wshelf(1.6,'tool',0x6b4423));W(FU.checkout(1.6));C(FU.barrel(0x6b4a2c));Y(FU.crate(.8));D(()=>DC.antlers())},
  ski:k=>{const{P,W,M,C,Y,D}=k;shopFloor(k,0x8b5a36,'w',0x6b4423,'pend');W(FU.skis());W(FU.skis());W(FU.skis());Y(FU.crack(1.4));W(FU.checkout(1.6));C(FU.wstove());W(FU.bench(1.6,0x5a3a22));D(()=>DC.antlers())},
  haunted:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=0x3a3440;rm.wt='d';rm.ft='k';rm.fc=0x3a2a1e;rm.light='chand';W(FU.coffin());Y(FU.coffin(0x2a1a14));W(FU.gclock(0x2a1a14));Y(FU.rocker(0x2a1a14));W(FU.armor());W(FU.altar(0x5a5560));C(FU.statue());D(()=>DC.paint(),2);L(ri(4,8),['debris','bone','paper'])}};
 const BIZP={def:['cafe','diner','grocery','pharmacy','bar','bakery','hardware','clothes','barber','laundromat','books','arcade','gymbiz','clinic','pizza','toys','flowers'],
  jp:['ramen','teahouse','ramen','books','flowers','clothes','cafe','bar'],tudor:['tavern','smith','bakery','general','books','flowers','tavern'],trop:['tiki','surf','fish','cafe','bar','clothes','general'],
  snow:['ski','cafe','general','bar','tavern'],west:['saloon','sheriff','bank','general','hotel','smith','undertaker','barber','post','saloon'],harbor:['fish','bait','diner','cafe','bar','general','pizza','laundromat'],
  autumn:['bakery','general','cafe','diner','hardware','flowers','books'],adobe:['cafe','general','bar','bakery','clothes','pharmacy','barber'],villa:['cafe','bakery','bar','clothes','flowers','books','pizza','pharmacy']};
 const SIGN={cafe:0x6b4423,diner:0xc23b2f,grocery:0x3aa060,conv:0xc23b2f,pharmacy:0x2fb0b0,bar:0x3a2418,bakery:0xe8a050,hardware:0xe0a020,clothes:0xb07bff,barber:0x2f6fd8,laundromat:0x6ac0e0,books:0x3a5a3a,arcade:0x9a4aff,gymbiz:0x2b2b2b,clinic:0x2f8f9a,
  pizza:0xc23b2f,toys:0xf2d16b,flowers:0xe86aa0,saloon:0x8a5a3a,sheriff:0xd8b040,bank:0x2f4a3a,general:0x8a6a42,hotel:0x7a1f2b,smith:0x3a3a3a,undertaker:0x1a1a1e,post:0x2f4a8a,ramen:0x8a1a1a,teahouse:0x5a3a28,tavern:0x6b4423,tiki:0x8a6a42,surf:0x2fb0b0,fish:0x2f6f9a,bait:0x5a7a3a,ski:0xc23b2f,haunted:0x2a2030};
 // ---- big sheds: warehouses, labs, modules ----
 const WARE={
  storage:k=>{const{W,M,C,Y,D,L,F,rm}=k;shopFloor(k,0xc8ccd0,'c',0x8f9296,'tube');aisles(k,len=>FU.sshelf(Math.min(len,4),'box'),2.0);for(let i=0;i<ri(4,7);i++)Y(FU.pallet());Y(FU.forklift());for(let i=0;i<3;i++)Y(FU.crate());L(ri(2,5),['paper','plank'])},
  garage:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xc8c8c0,'c',0x8a8a86,'tube');Y(FU.carlift());Y(FU.car());C(FU.tires());C(FU.tires());W(FU.tchest());W(FU.tchest());W(FU.wkb(2.4));W(FU.sshelf(1.5,'tool'));C(FU.barrel(0xc23b2f));D(()=>DC.pegs());D(()=>DC.poster());L(ri(3,6),['debris','paper','can'])},
  factory:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xb8c0c4,'c',0x7a7e82,'tube');for(let i=0;i<ri(3,5);i++)Y(FU.machine());M(FU.conveyor(4.8));for(let i=0;i<3;i++)Y(FU.pallet());W(FU.fcab());W(FU.sshelf(1.5,'tool'));C(FU.barrel(0xe0a020));C(FU.barrel(0xe0a020));L(ri(2,5),['debris','paper'])},
  gymhall:k=>{BIZ.gymbiz(k);k.Y(FU.pbag());k.M(FU.gmat())},
  market:k=>{const{W,M,C,Y,D}=k;shopFloor(k,0xe8dcc0,'u',0xc8c0b0,'tube');for(let i=0;i<ri(4,6);i++)Y(FU.dcase(fr(1.4,2)));aisles(k,len=>FU.gondola(len,'p'),2.4);C(FU.barrel(0x6b4a2c));Y(FU.sacks());Y(FU.crate(.8));D(()=>DC.flag(),2)},
  hangar:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xd9dcdf,'c',0x8a8f94,'tube');Y(FU.forklift());for(let i=0;i<ri(3,5);i++)Y(FU.crate());W(FU.tchest());W(FU.wkb(2.4));C(FU.barrel(0xc23b2f));C(FU.barrel(0xc23b2f));C(FU.barrel(0x2f6fd8));W(FU.sshelf(1.5,'tool'));L(ri(3,5),['debris','paper'])},
  mill:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xd8ccb4,'s',0x9a8a72,'pend');for(let i=0;i<ri(4,7);i++)Y(FU.sacks());Y(FU.machine());C(FU.barrel(0x6b4a2c));C(FU.barrel(0x6b4a2c));Y(FU.crate());Y(FU.hay(2));L(ri(4,7),['sack','debris'])},
  fish:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xdfe6ea,'7',0xd8e4ea,'tube');W(FU.fishdisp(2.4));W(FU.fishdisp(2.4));M(FU.fishdisp(2.4));W(FU.gfridge(1.4));for(let i=0;i<4;i++)C(FU.barrel(0x2f6fd8));Y(FU.crate());W(FU.checkout(1.6))},
  lab:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xe8eef2,'i',0xe8e8e4,'tube');W(FU.labb(2.4));W(FU.labb(2));M(FU.labb(2.4));C(FU.stank());C(FU.stank());W(FU.console(2.2));W(FU.srack());W(FU.fcab());D(()=>DC.wboard());L(ri(2,4),['paper'])},
  hydro:k=>{const{W,M,C,Y,D}=k;shopFloor(k,0xe8eef2,'i',0xd8dce0,'tube');aisles(k,len=>FU.hydro(Math.min(len,3.2)),1.4);W(FU.hydro(2.4));W(FU.labb(2));C(FU.barrel(0x2f6fd8))},
  dorm:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xd8dde2,'q',0x6a7a8a,'tube');for(let i=0;i<4;i++)W(FU.bunk(0xd8d8d4,0x2f4a6a,0x2f4a6a));for(let i=0;i<3;i++)W(FU.fcab(0xd8d8d4));M(FU.dset(4,0xd8d8d4));C(FU.suit());C(FU.suit());L(ri(3,6),['clothes','cup','books'])},
  mess:k=>{const{W,M,C,Y,D}=k;shopFloor(k,0xe8e8e4,'i',0xd8d8d4,'tube');W(FU.counter(3,STL,STL,{sink:1,stove:1,up:1}));W(FU.gfridge(1.4));for(let i=0;i<3;i++)Y(FU.ltable(2.4,0xd8d8d4));C(FU.bin());D(()=>DC.menu())},
  command:k=>{const{W,M,C,Y,D}=k;shopFloor(k,0x3a4048,'c',0x4a5058,'tube');W(FU.console(3));W(FU.console(2.4));W(FU.srack());W(FU.srack());M(FU.mtable(6,0x8a8f94));C(FU.suit());D(()=>DC.wboard());D(()=>DC.tv(1.6))},
  shipyard:k=>{const{W,M,C,Y,D,L}=k;shopFloor(k,0xc8b8a0,'4',0xa8885c,'pend');W(FU.wkb(2.4));W(FU.wkb(2));for(let i=0;i<4;i++)Y(FU.crate());C(FU.barrel(0x6b4a2c));C(FU.barrel(0x6b4a2c));Y(FU.sawhorse());Y(FU.sawhorse());D(()=>DC.pegs());L(ri(4,8),['plank','plank','debris'])},
  office:k=>{const{W,M,C,Y,D,L}=k;k.rm.wtop=k.F.y+2.95;k.rm.light=0;k.rm.wc=pick([0xe8eaec,0xdfe6ea]);k.rm.ft='q';k.rm.fc=0x6a7a8a;k.rm.light='tube';W(FU.deskset(0x6b4423,1.4,'pc'));W(FU.fcab());C(FU.wcooler());C(FU.plant());if(r()<.5)W(FU.deskset(0x6b4423,1.2,'laptop'));D(()=>DC.wboard());L(ri(1,3),['paper'])}};
 // ---- castles, forts, ruins, barns, offices ----
 const OTHER={
  hall:k=>{const{W,M,C,Y,D,L,rm}=k;rm.wc=0xd8cfbe;rm.wt='2';rm.ft='s';rm.fc=0x8a7a62;rm.light='chand';M(FU.rug(0x8a1a1a,fr(2.6,3.4),fr(1.6,2.2),'6'));W(FU.throne());Y(FU.ltable(3,0x6b4423));W(FU.fireplace('s',0x9a9282));C(FU.armor());C(FU.armor());W(FU.chest());D(()=>DC.banner(),3)},
  armory:k=>{const{W,M,C,Y,D,L,rm}=k;rm.wc=0xd8cfbe;rm.wt='2';rm.ft='s';rm.fc=0x8a7a62;rm.light='pend';W(FU.wrackm());W(FU.wrackm());C(FU.armor());C(FU.armor());W(FU.chest());C(FU.barrel(0x6b4a2c));Y(FU.crate(.8));D(()=>DC.banner());L(ri(1,3),['debris'])},
  barracks:k=>{const{W,M,C,Y,D,L,rm}=k;rm.wc=0xd8cfbe;rm.wt='2';rm.ft='k';rm.fc=0x6b4a32;rm.light='pend';for(let i=0;i<4;i++)W(FU.bunk(0x5a3a22,0x7a3a3a,0x3a4a6a));for(let i=0;i<3;i++)W(FU.chest());Y(FU.bench(1.6,0x5a3a22));D(()=>DC.banner());L(ri(2,4),['clothes','cup'])},
  library:k=>{const{W,M,C,Y,D,rm}=k;rm.wc=0xd8cfbe;rm.wt='2';rm.ft='k';rm.fc=0x6b4a32;rm.light='chand';for(let i=0;i<6;i++)W(FU.bookshelf(0x5a3a22,1.2,2.1));Y(FU.wingchair(0x8a1a1a));M(FU.desk(0x5a3a22,1.4,'study'));M(FU.rug(0x2f4a6a,2.2,1.6,'6'))},
  lord:k=>{const{W,M,C,Y,D,rm}=k;rm.wc=0xd8cfbe;rm.wt='2';rm.ft='k';rm.fc=0x6b4a32;rm.light='chand';W(FU.bedset(1.8,0x8a1a1a,0x5a3a22,0x5a3a22));W(FU.wardrobe(0x5a3a22,1.5));W(FU.chest());M(FU.rug(0x8a1a1a,2.4,1.8,'6'));D(()=>DC.banner(),2)},
  ruin:k=>{const{W,M,C,Y,D,L,rm}=k;rm.nowall=1;rm.light=0;rm.ft='s';rm.fc=0x8a8a7a;for(let i=0;i<ri(2,4);i++)Y(FU.rubble());C(FU.column(fr(.8,2.4)));C(FU.column(fr(.6,1.8)));if(r()<.6)W(FU.altar());else W(FU.statue());for(let i=0;i<ri(2,4);i++)C(FU.urn());Y(FU.chest(0x5a4a32));L(ri(6,10),['debris','leaves','debris','bone'])},
  barn:k=>{const{W,M,C,Y,D,L,rm}=k;rm.wc=0xc9a46a;rm.wt='w';rm.ft='j';rm.fc=0xa89070;rm.light='pend';W(FU.stall());W(FU.stall());M(FU.tractor());for(let i=0;i<ri(3,5);i++)Y(FU.hay());Y(FU.sacks());W(FU.ladder());W(FU.wkb(2,0x6b4423));C(FU.barrel(0x6b4a2c));D(()=>DC.pegs());L(ri(6,10),['sack','leaves'])},
  lobby:k=>{const{P,W,M,C,Y,D,rm}=k;rm.wc=pick([0xe8eaec,0xdfe6ea,0xe8dcc8]);rm.ft='i';rm.fc=0xd8d8d4;rm.light='tube';W(FU.recep(2.4,P.wd));W(FU.bench(1.6,0x3a3f44));Y(FU.armchair(0x3a5a7a));Y(FU.armchair(0x3a5a7a));C(FU.plant(1));C(FU.plant(1));C(FU.wcooler());D(()=>DC.paint(1.2,.8));D(()=>DC.clock())},
  offices:k=>{const{W,M,C,Y,D,L,rm,A}=k;rm.wc=pick([0xe8eaec,0xdfe6ea]);rm.ft='q';rm.fc=pick([0x6a7a8a,0x5a5f66,0x7a6a5a]);rm.light='tube';for(let i=0;i<Math.max(2,Math.floor(A/6));i++)(r()<.5?W:Y)(r()<.5?FU.cubicle():FU.deskset(0x8a6a4a,1.4,'pc'));W(FU.fcab());W(FU.fcab());C(FU.copier());C(FU.plant());C(FU.wcooler());D(()=>DC.wboard());L(ri(2,4),['paper','cup'])},
  meeting:k=>{const{W,M,C,Y,D,rm}=k;rm.wc=pick([0xe8eaec,0xdfe6ea]);rm.ft='q';rm.fc=0x5a5f66;rm.light='tube';M(FU.mtable(6,0x6b4423))||M(FU.dset(4,0x6b4423));C(FU.plant(1));D(()=>DC.tv(1.4));D(()=>DC.wboard())},
  breakroom:k=>{const{W,M,C,Y,D,rm,P}=k;rm.ft='i';rm.fc=0xd8d8d4;rm.wc=0xe8eaec;for(const w of [2.4,1.8,1.2])if(W(FU.counter(w,0x8a8f94,0xe8e4da,{sink:1,up:1,mw:1})))break;C(FU.fridge());C(FU.wcooler());Y(FU.cafeset(WHT,0x2f6fd8));D(()=>DC.clock())},
  shack:k=>{const{P,W,M,C,Y,D,L,rm}=k;rm.wc=0x8a6a4a;rm.wt='w';rm.ft='4';rm.fc=0x9a8a6a;rm.light='pend';W(FU.bunk(0x6b4423,0x5a6a3a,0x3a4a6a));C(FU.wstove());W(FU.sshelf(1,'jar',0x6b4423));Y(FU.chair(0x6b4423));C(FU.barrel(0x6b4a2c));Y(FU.crate(.8));D(()=>DC.antlers());L(ri(3,5),['bottle','can','paper'])}};
 ROOM.open=k=>{const{P,ps,W,M,C,Y,D,L,T,rm,F,A}=k;rm.wc=pick(FP.wl);rm.ft=P.rus&&r()<.5?'w':'k';rm.fc=P.fl;
  let ok=0;for(const w of [3,2.4,1.8])if(W(FU.counter(w,P.cab,P.top,{sink:1,stove:1,up:1,mw:r()<.5,bs:0xf2f2ee}))){ok=1;break}if(!ok)for(const w of [1.8,1.2])if(W(FU.counter(w,P.cab,P.top,{sink:1,stove:1})))break;C(FU.fridge());
  if(r()<.7)M(FU.rug(P.rug,fr(1.8,2.6),fr(1.4,1.9)));const s=W(ps=='moving'?FU.sofaCover():k.sofa());if(s){if(!F.onWall(rm,FU.tvstand(P.wd),{sides:[F.opp[s.side]],mid2:1}))D(()=>DC.tv());T(FU.ctable(P.wd),s,.42)}
  if(A>40&&r()<.6)M(FU.island(pick([1.6,2,2.4]),P.cab,P.top,1));if(A>18)M(FU.dset(r()<.5?6:4,P.wd2));else if(A>11)M(FU.dset(2,P.wd2));if(A>30){const s2=M(FU.sofa(P.fb2,1.8));if(s2)F.front(FU.ctable(P.wd,.9,.5),s2,.4)}Y(FU.armchair(P.fb2));Y(FU.armchair(P.fb2));C(FU.plant());if(r()<.5)W(FU.bookshelf(P.wd));if(r()<.5)C(FU.flamp());if(P.rus&&r()<.5)W(FU.wstove());C(FU.bin());
  extras(k);D(()=>DC.paint(),ri(1,2));if(r()<.5)D(()=>pick([DC.clock,DC.photos])());if(P.rus&&r()<.5)D(()=>DC.antlers());L(k.messy?ri(5,9):ri(0,2),LIT[ps]||['books'])};
 BIZP.bayou=['bait','diner','bar','general','fish','cafe'];
 const WVQS={},WVQ=(k,a)=>{const q=WVQS[k]||(WVQS[k]=[]);if(!q.length)q.push(...shuf(a.slice()));return q.pop()};
 const bizPool=s=>({mesa:'west',sakura:'jp',castle:'tudor',isle:'trop',archi:'trop',bayou:'bayou',snow:'snow',frost:'snow',harbor:'harbor',autumn:'autumn'})[T.town]||(s.st=='adobe'?'adobe':s.st=='villa'?'villa':s.st=='cabin'?'snow':'def');
 // every street lot gets its own shape, layout and use: ranch, cottage, modern, mirrored floor plans, side rooms, balconies, shops
 const vary=s=>{if(!s||s.force||s.noVary)return s;const st=s.st;if(!['sub','villa','adobe','cabin','west'].includes(st))return s;const k=r();
  if(st!='west'&&s.W>=9){if(k<.14){s.W+=pick([2,3]);s.NS=1;s.rise=2.1;s.ranch=1}else if(k<.24&&s.W>=12){s.W-=2;s.rise=Math.max(3.2,s.D*.42);s.cottage=1}else if(k<.32)s.D+=1;
   else if(k<.42&&(st=='sub'||st=='villa')&&s.roof!='flat'){Object.assign(s,{roof:'flat',acc:s.NS==1,wt:'p',wc:pick([0xf2f2ee,0xe8e8e4,0xd8dde2,0x3a3f44,0xc8b8a0]),wt2:s.NS>1?'w':0,wc2:0x8a5a3a,rc:0x5a5f66,rt:'c',tc:pick([0x2b2b2b,0x3a3f44]),ww:1.8,shut:0,modern:1})}}
  if(s.NS>1&&r()<.3)s.NS=1;if(!s.gar&&!s.base&&r()<.5)s.mir=1;{const g=r();s.gl=g<.4?'classic':g<.68?'open':'rooms'}s.bdoor=r()<.5;if(r()<(s.NS==1?.8:.4))s.side=1;if(s.NS>1&&r()<.55)s.split=1;if(s.NS>1&&st!='west'&&r()<.3)s.balc=1;
  s.flb=r()<.35;s.ac=r()<.35;s.dish=r()<.22;s.pf=r()<.7;
  const bp=T.grave?0:st=='west'?(s.ff?.75:.15):T.pk?.07:(T.bizP??.17);
  if(r()<bp){s.bpl=bizPool(s);s.biz='?';s.gar=0;s.porch=s.ff?s.porch:0;s.fence=0;s.side=0;s.balc=0;s.flb=0;s.pf=0;if(st!='west'&&r()<.45&&s.roof!='flat'){s.roof='flat';s.acc=0}}
  return s};
 const BIZOPEN=['grocery','hardware','clothes','laundromat','arcade','gymbiz','toys','books','flowers','pharmacy','saloon','bank','general','post'];
 // ---- top-up pass: keep adding fitting pieces until the room feels lived in ----
 const FILLS={
  living:k=>[()=>FU.armchair(k.P.fb2),()=>FU.stable(k.P.wd),()=>FU.plant(),()=>FU.flamp(),()=>FU.bookshelf(k.P.wd),()=>FU.sideboard(k.P.wd2),()=>FU.plant(1)],
  open:k=>[()=>FU.armchair(k.P.fb2),()=>FU.sideboard(k.P.wd2),()=>FU.stable(k.P.wd),()=>FU.plant(),()=>FU.flamp(),()=>FU.bookshelf(k.P.wd),()=>FU.plant(1)],
  bed:k=>[()=>FU.plant(),()=>FU.armchair(k.P.fb2),()=>FU.bookshelf(k.P.wd,.8,1.2),()=>FU.flamp(),()=>FU.dresser(k.P.wd),()=>FU.desk(k.P.wd2,1.1,'laptop')],
  kids:k=>[()=>FU.toybox(),()=>FU.beanbag(pick(FP.br)),()=>FU.bookshelf(WHT,.8,1.2),()=>FU.plant(2)],
  study:k=>[()=>FU.bookshelf(k.P.wd),()=>FU.plant(),()=>FU.fcab(),()=>FU.flamp(),()=>FU.armchair(k.P.fb2),()=>FU.console(k.P.wd)],
  kitchen:k=>[()=>FU.plant(2),()=>FU.sshelf(.9,'jar',k.P.wd),()=>FU.stool()],
  dining:k=>[()=>FU.plant(),()=>FU.plant(1)],
  studio:k=>[()=>FU.plant(),()=>FU.stable(k.P.wd),()=>FU.bookshelf(k.P.wd,.8,1.2),()=>FU.flamp()],
  loft:k=>[()=>FU.plant(),()=>FU.stable(k.P.wd),()=>FU.bookshelf(k.P.wd),()=>FU.flamp()],
  storage:k=>[()=>FU.cbox(),()=>FU.cbox(),()=>FU.crate(.8),()=>FU.hamper()],
  bath:k=>[()=>FU.plant(2),()=>FU.bin(WHT)],
  hall:k=>[()=>FU.plant(),()=>FU.coatrack()],
  bsm:k=>[()=>FU.cbox(),()=>FU.crate(.8),()=>FU.sshelf(1,'box'),()=>FU.barrel()],
  game:k=>[()=>FU.beanbag(k.P.acc),()=>FU.arcade(),()=>FU.stool(),()=>FU.plant()],
  nursery:k=>[()=>FU.toybox(),()=>FU.plant(2)]};
 const FILLA={living:.2,open:.2,bed:.22,kids:.2,study:.2,kitchen:.18,dining:.16,studio:.2,loft:.2,storage:.3,bath:.18,hall:.06,bsm:.2,game:.2,nursery:.18};
 const capPick=(k,L,lim)=>{const u=k.used||(k.used=new Map());const ok=L.filter(f=>(u.get(f)||0)<(lim&&lim.get?lim.get(f):2));if(!ok.length)return null;const f=pick(ok);u.set(f,(u.get(f)||0)+1);return f()};
 const fillRoom=(k,role,n0)=>{const f=FILLS[role];if(!f)return;const A=area(k.rm),occA=()=>k.F.occ.slice(n0).reduce((a,q)=>a+(q[2]-q[0])*(q[3]-q[1]),0),tgt=A*FILLA[role];
  const L=f(k);for(let i=0;i<30&&occA()<tgt;i++){const it=capPick(k,L);if(!it)break;if(r()<.6)k.W(it);else k.Y(it)}
  if(role!='bath'&&role!='hall'&&role!='storage'&&role!='bsm'&&r()<.5)for(let i=0;i<1;i++)k.D(()=>pick([DC.paint,DC.paint,DC.photos,DC.clock])())};
 const BCAT={cafe:'food',diner:'food',bar:'food',bakery:'food',pizza:'food',ramen:'food',teahouse:'food',tavern:'food',tiki:'food',saloon:'food',
  grocery:'ret',conv:'ret',pharmacy:'ret',hardware:'ret',clothes:'ret',books:'ret',toys:'ret',flowers:'ret',general:'ret',surf:'ret',ski:'ret',bait:'ret',fish:'ret'};
 const fillBiz=(k,biz,n0)=>{const c=BCAT[biz]||'svc';if(BFILL[c]){fillWith(k,n0,BFILL[c],.2,c=='rus'?0:1);return}const pk=biz=='hardware'?'tool':biz=='pharmacy'?'ph':biz=='bar'||biz=='saloon'||biz=='tavern'?'bot':'p',A=area(k.rm),occA=()=>k.F.occ.slice(n0).reduce((a,q)=>a+(q[2]-q[0])*(q[3]-q[1]),0),tgt=A*.28,P=k.P;
  const L=c=='food'?[()=>FU.cafeset(pick([BLK,WHT,P.wd]),P.wd),()=>FU.dset(4,P.wd),()=>FU.plant(),()=>FU.stool(),()=>FU.bin(),()=>FU.coatrack(),()=>FU.plant(1)]
   :c=='ret'?[()=>FU.wshelf(pick([1.2,1.6,2]),pk),()=>FU.gondola(pick([1.8,2.4]),pk),()=>FU.dcase(pick([1.2,1.6])),()=>FU.plant(1),()=>FU.cbox(),()=>FU.sshelf(1.2,'box')]
   :[()=>FU.bench(1.6,pick([0x3a3f44,0x6b4423,0x2f6fd8])),()=>FU.armchair(P.fb),()=>FU.plant(1),()=>FU.fcab(),()=>FU.stable(P.wd),()=>FU.coatrack(),()=>FU.wcooler(),()=>FU.plant()];
  const lim=new Map(L.map((f,i)=>[f,i<2&&c!='svc'?99:2]));for(let i=0;i<30&&occA()<tgt;i++){const it=capPick(k,L,lim);if(!it)break;if(r()<.6)k.W(it);else k.Y(it)}for(let i=0;i<ri(1,2);i++)k.D(()=>pick([DC.paint,DC.poster,DC.clock,DC.flag])())};
 const WFILL={storage:[()=>FU.pallet(),()=>FU.crate(),()=>FU.cbox(),()=>FU.sshelf(1.5,'box'),()=>FU.barrel()],garage:[()=>FU.tires(),()=>FU.tchest(),()=>FU.crate(.8),()=>FU.sshelf(1.2,'tool'),()=>FU.barrel(0xc23b2f),()=>FU.wkb(1.8)],
  factory:[()=>FU.machine(),()=>FU.pallet(),()=>FU.barrel(0xe0a020),()=>FU.crate(),()=>FU.fcab()],hangar:[()=>FU.crate(),()=>FU.barrel(),()=>FU.pallet(),()=>FU.tchest(),()=>FU.tires()],mill:[()=>FU.sacks(),()=>FU.barrel(0x6b4a2c),()=>FU.hay(),()=>FU.crate()],
  fish:[()=>FU.barrel(0x2f6fd8),()=>FU.crate(),()=>FU.fishdisp(1.6),()=>FU.bin()],shipyard:[()=>FU.crate(),()=>FU.barrel(0x6b4a2c),()=>FU.sawhorse(),()=>FU.pallet()],market:[()=>FU.dcase(1.6),()=>FU.barrel(0x6b4a2c),()=>FU.sacks(),()=>FU.crate(.8),()=>FU.plant()],
  lab:[()=>FU.labb(2),()=>FU.stank(),()=>FU.fcab(),()=>FU.srack()],hydro:[()=>FU.hydro(2.4),()=>FU.barrel(0x2f6fd8),()=>FU.labb(1.6)],dorm:[()=>FU.fcab(0xd8d8d4),()=>FU.suit(),()=>FU.chest(0x8a8f94)],mess:[()=>FU.dset(4,0xd8d8d4),()=>FU.bin(),()=>FU.plant()],
  command:[()=>FU.console(2),()=>FU.srack(),()=>FU.fcab()],gymhall:[()=>FU.pbag(),()=>FU.wbench(),()=>FU.tread(),()=>FU.ebike()],office:[()=>FU.fcab(),()=>FU.plant(1),()=>FU.deskset(0x6b4423,1.2,'laptop')]};
 const fillWare=(k,wv,n0)=>{const L=WFILL[wv];if(!L)return;const A=area(k.rm),occA=()=>k.F.occ.slice(n0).reduce((a,q)=>a+(q[2]-q[0])*(q[3]-q[1]),0),tgt=A*(wv=='office'?.18:.22);const lim=new Map(L.map((f,i)=>[f,i<2?99:3]));for(let i=0;i<30&&occA()<tgt;i++){const it=capPick(k,L,lim);if(!it)break;if(r()<.5)k.W(it);else k.Y(it)}};
 // themed top-up lists for the rustic, Japanese and castle/office/lab rooms
 const fillWith=(k,n0,L,frac,free)=>{const A=area(k.rm),occA=()=>k.F.occ.slice(n0).reduce((a,q)=>a+(q[2]-q[0])*(q[3]-q[1]),0),lim=new Map(L.map((f,i)=>[f,i<(free||0)?99:2]));for(let i=0;i<30&&occA()<A*frac;i++){const it=capPick(k,L,lim);if(!it)break;if(r()<.55)k.W(it);else k.Y(it)}};
 const MED=[()=>FU.chest(),()=>FU.barrel(0x6b4a2c),()=>FU.bench(1.8,0x5a3a22),()=>FU.armor(),()=>FU.wrackm(),()=>FU.crate(.8,0x8a6a42),()=>FU.sacks()];
 const OFILL={hall:[()=>FU.ltable(2.6,0x6b4423),()=>FU.bench(2,0x5a3a22),...MED],armory:[()=>FU.wrackm(),()=>FU.armor(),...MED],barracks:[()=>FU.bunk(0x5a3a22,0x7a3a3a,0x3a4a6a),()=>FU.chest(),...MED],library:[()=>FU.bookshelf(0x5a3a22,1.2,2.1),()=>FU.wingchair(0x8a1a1a),()=>FU.chest()],
  lord:[()=>FU.chest(),()=>FU.wingchair(0x8a1a1a),()=>FU.dresser(0x5a3a22),()=>FU.bookshelf(0x5a3a22,1,1.8)],ruin:[()=>FU.rubble(),()=>FU.urn(),()=>FU.column(fr(.5,1.5))],barn:[()=>FU.hay(),()=>FU.sacks(),()=>FU.barrel(0x6b4a2c),()=>FU.crate(.8,0x8a6a42),()=>FU.chest(0x6b4423)],
  lobby:[()=>FU.armchair(0x3a5a7a),()=>FU.plant(1),()=>FU.bench(1.6,0x3a3f44),()=>FU.stable(0x6b4423)],offices:[()=>FU.deskset(0x8a6a4a,1.4,'pc'),()=>FU.fcab(),()=>FU.plant(1)],meeting:[()=>FU.plant(1),()=>FU.sideboard(0x3a3f44)],breakroom:[()=>FU.cafeset(WHT,0x2f6fd8),()=>FU.bin(),()=>FU.plant()],
  shack:[()=>FU.crate(.8,0x8a6a42),()=>FU.barrel(0x6b4a2c),()=>FU.chest(0x6b4423),()=>FU.sacks()]};
 const OFREE={hall:2,armory:2,barracks:1,library:1,ruin:2,barn:2,offices:1};
 Object.assign(BCAT,{smith:'rus',sheriff:'rus',undertaker:'rus',general:'rus',post:'rus',saloon:'rusf',tavern:'rusf',ramen:'jp',teahouse:'jp'});
 const BFILL={rus:[()=>FU.barrel(0x6b4a2c),()=>FU.crate(.8,0x8a6a42),()=>FU.chest(),()=>FU.bench(1.6,0x5a3a22),()=>FU.sacks(),()=>FU.coatrack()],
  rusf:[()=>FU.dset(4,0x6b4423),()=>FU.ltable(2,0x6b4423),()=>FU.barrel(0x6b4a2c),()=>FU.chest(),()=>FU.bench(1.6,0x5a3a22)],jp:[()=>FU.lowtable(0x5a3a28),()=>FU.plant(3),()=>FU.sideboard(0x5a3a28,1.2),()=>FU.plant(2)]};
 // houses lining both sides of an axis-aligned street
 const street=(x1,z1,x2,z2,w,o)=>{if(!o.noRoad)road(x1,z1,x2,z2,w,o.k);const ax=z1===z2,len=ax?Math.abs(x2-x1):Math.abs(z2-z1),dr=Math.sign(ax?x2-x1:z2-z1)||1;
  (o.sides||[1,-1]).forEach(sd=>{let t=o.t0||3;while(t<len-4){const s=vary(o.sty()),gw=s.gar?6.5:0,lw=s.W+gw,yd=o.yard??6,off=w/2+((o.k||'a')=='a'?1.6:.3)+yd+s.D/2,c=t+lw/2;
   let hx,hz,ro;if(ax){hx=x1+dr*c;hz=z1+sd*off;ro=sd>0?0:2}else{hz=z1+dr*c;hx=x1+sd*off;ro=sd>0?1:3}
   const[ux,uz]=TR(ro,1,0);hx-=ux*gw/2;hz-=uz*gw/2;
   if(planHouse(Object.assign(s,{x:hx,z:hz,r:ro,G:o.G,yard:yd,fence:yd>3&&s.fence})))t+=lw+fr(o.gap?o.gap[0]:3,o.gap?o.gap[1]:6);else t+=3}})};
 // lay every road of a grid first, then line them with houses, so no house ends up on a crossing street
 const streets=L2=>{L2.forEach(q=>road(q[0],q[1],q[2],q[3],q[4],q[5].k));L2.forEach(q=>street(q[0],q[1],q[2],q[3],q[4],Object.assign({noRoad:1},q[5])))};
 const tryHouse=(n,mk,lim)=>{let k=0;for(let i=0;i<n*40&&k<n;i++){const s=vary(mk()),x=fr(-lim,lim),z=fr(-lim,lim);if(T.wl!=null&&!s.stilt&&Math.min(hb(x,z),hb(x+6,z+6),hb(x-6,z-6),hb(x+6,z-6),hb(x-6,z+6))<T.wl+.6)continue;if(planHouse(Object.assign(s,{x,z,r:ri(0,3)})))k++}};
 // ---------- themed layouts ----------
 const L=T.town;
 if(L=='pp'){town(-104,-104,104,104,0,20);[[-100,-26,100,-26],[-100,26,100,26],[-26,-100,-26,100],[26,-100,26,100]].forEach(q=>road(...q,7));
  road(-22,0,22,0,2.4,'u');road(0,-22,0,22,2.4,'u');occR.push([-23,-23,23,23],[-21,-98,21,-33]);
  planHouse(Object.assign(ST.shop(),{x:0,z:57,r:0,G:0,force:1}));occR.push([-22,33,22,63]);
  [[-100,-26,100,-26],[-100,26,100,26],[-26,-100,-26,100],[26,-100,26,100]].forEach(q=>{const ax=q[1]===q[3];[1,-1].forEach(sd=>{const o={sty:ST.sub,G:0,yard:6.5,sides:[sd],gap:[3,5]};
   // place along the full road; lots blocked by the park/field/station/other roads are skipped automatically
   const ax2=ax;let t=3;const len=200;while(t<len-4){const s=vary(o.sty()),gw=s.gar?6.5:0,lw=s.W+gw,off=3.5+1.6+o.yard+s.D/2,c=t+lw/2;let hx,hz,ro;
    if(ax2){hx=q[0]+c;hz=q[1]+sd*off;ro=sd>0?0:2}else{hz=q[1]+c;hx=q[0]+sd*off;ro=sd>0?1:3}const[ux,uz]=TR(ro,1,0);hx-=ux*gw/2;hz-=uz*gw/2;
    if(Math.max(Math.abs(hx),Math.abs(hz))<99&&planHouse(Object.assign(s,{x:hx,z:hz,r:ro,G:0,yard:o.yard})))t+=lw+fr(3,5);else t+=3}})});
  BT.push(()=>ppExtras())}
 else if(L=='royale'){const vs=[[-70,-62,ST.sub],[66,-70,ST.villa],[-62,68,ST.cabin],[68,62,ST.sub]];
  vs.forEach(([vx,vz,sty])=>{const G=Math.max(0,hb(vx,vz));town(vx-40,vz-40,vx+40,vz+40,G,16);streets([[vx-38,vz,vx+38,vz,6.5,{sty,G,yard:5.5,gap:[3,6]}],[vx,vz-38,vx,vz+38,6.5,{sty,G,yard:5.5,gap:[3,6]}]])});
  const wy=Math.max(0,hb(0,0));town(-30,-22,30,22,wy,10);planHouse(Object.assign(ST.ware(),{x:-14,z:-11,r:0,G:wy}));planHouse(Object.assign(ST.ware(),{x:14,z:11,r:2,G:wy}));
  road(-112,0,112,0,4,'j');road(0,-112,0,112,4,'j');vs.forEach(([vx,vz])=>road(vx,vz+(vz<0?38:-38),vx,0,4,'j'));
  tryHouse(6,ST.cabin,110);tryHouse(3,ST.villa,110)}
 else if(L=='dust'){const G=hb(0,0);town(-54,-54,54,54,G,12);const o={sty:ST.adobe,G,yard:2.5,k:'j',gap:[2,4]};streets([[-58,-22,58,-22,6,o],[-58,22,58,22,6,o],[0,-60,0,60,6,o]])}
 else if(L=='bazaar'){const G=hb(0,0);town(-58,-58,58,58,G,12);occR.push([-14,-14,14,14]);
  [[14,0,60,0],[-14,0,-60,0],[0,14,0,60],[0,-14,0,-60]].forEach(q=>street(...q,6,{sty:ST.villa,G,yard:3,k:'u',gap:[2,5]}));BT.push(()=>plaza(G))}
 else if(L=='grave'){planHouse(Object.assign(ST.church(),{x:0,z:-40,r:2,ps:8}));tryHouse(6,ST.crypt,52);
  tryHouse(1,()=>Object.assign(ST.sub(),{NS:2,base:1,gar:0,porch:1,wc:0x5d6369,wt:'w',wt2:0,rc:0x2a2e33,dc:0x3a2a22,fence:0}),48)}
 else if(L=='yard'){tryHouse(3,ST.ware,50);tryHouse(1,ST.office,50)}
 else if(L=='frost'){const G=hb(0,0);planHouse(Object.assign(ST.cabin(),{x:0,z:0,r:0,W:15,D:11,NS:2,base:1,G,ps:8}));tryHouse(7,ST.cabin,54)}
 else if(L=='isle'){
  // ---- dirt tracks between the districts, laid before any building so nothing sits on a road ----
  const rj=(a,b,c,d)=>road(a,b,c,d,5,'j');
  rj(58,20,58,-32);rj(20,-58,20,-90);rj(-92,-100,-2,-100);rj(-104,-80,-104,-44);rj(-104,-13,-104,92);rj(-60,104,58,104);rj(-60,0,56,0);
  // ---- harbour town (south-east, beside the bay): pastel houses on two paved streets, fish market ----
  town(22,18,88,90,2,9);planHouse(Object.assign(ST.ware(),{wv:'fish',x:80,z:80,r:2,G:2,W:18,D:12,wc:0x8fc3cf,rc:0x5a6b74,force:1}));
  streets([[24,32,92,32,6,{sty:ST.trop,G:2,yard:3,k:'u',gap:[2,4]}],[24,58,92,58,6,{sty:ST.trop,G:2,yard:3,k:'u',gap:[2,4]}],[58,22,58,100,6,{sty:ST.trop,G:2,yard:3,k:'u',gap:[2,4]}]]);
  // ---- beach resort (south-west): hotel, pool, bungalows ----
  town(-122,88,-54,128,2.2,10);occR.push([-99,113,-77,128]);pits.push([-96,116,-80,124,1]);
  planHouse(Object.assign(ST.villa(),{biz:'hotel',x:-88,z:104,r:2,G:2.2,W:24,D:12,NS:2,base:0,gar:0,roof:'gable',porch:0,wc:0xf6e7d2,rc:0x3f8f9a,rt:'h',shut:1,shc:0x2f8f9a,force:1}));
  [[-128,118,2],[-60,132,2],[-140,96,1]].forEach(([x,z,ro])=>planHouse(Object.assign(ST.bung(),{x,z,r:ro,G:Math.max(2,hb(x,z))})));
  // ---- airstrip (east-centre): runway, hangar, control tower ----
  const GA=4.5;town(4,-80,136,-30,GA,14);RD.push([10,-44,130,-44,14,'a']);occR.push([8,-53,132,-35],[65,-67,79,-53]);
  planHouse(Object.assign(ST.ware(),{wv:'hangar',x:40,z:-64,r:2,G:GA,W:24,D:14,wc:0xd9dcdf,rc:0x7a8088,force:1}));
  planHouse(Object.assign(ST.office(),{ru:'command',x:96,z:-66,r:2,G:GA,W:10,D:8,NS:2,base:0,force:1}));
  // ---- sugar-cane fields and the old mill (north) ----
  const GF=Math.max(3.8,hb(35,-110));town(-2,-130,72,-90,GF,10);occR.push([-1,-129,71,-91]);
  const GM=Math.max(3.8,hb(-25,-134));town(-42,-146,-8,-122,GM,10);planHouse(Object.assign(ST.ware(),{wv:'mill',x:-26,z:-134,r:2,G:GM,W:22,D:14,wt:'2',wc:0xd8ccb4,rc:0x8a5a3a,force:1}));
  planHouse(Object.assign(ST.bung(),{x:84,z:-100,r:1,G:Math.max(2,hb(84,-100)),wt:'w',wc:0xd9c9a8}));
  // ---- cliff fort on the north-west plateau: keep inside, walls reserved ----
  planHouse(Object.assign(ST.keep(),{x:-117,z:-100,r:3,G:KFP[3],force:1}));occR.push([-130,-118,-94,-82]);
  BT.push(()=>isleBuild())}
 else if(L=='snow'){
  // giant igloo plaza in the middle, roads out of its four tunnels
  town(-46,-46,46,46,3,18);occR.push([-46,-46,46,46]);
  const rj=(a,b,c,d)=>road(a,b,c,d,5,'j');
  rj(0,-48,0,-90);rj(0,-90,48,-90);rj(48,0,150,0);rj(-48,0,-150,0);rj(0,48,0,60);rj(95,3,95,46);rj(-62,100,-6,100);
  const snowCab=()=>Object.assign(ST.cabin(),{rc:0xdbe3ea,rt:'t'});
  // pine village (north-east)
  town(46,-130,124,-52,Math.max(3,hb(86,-90)),12);streets([[50,-90,124,-90,6,{sty:snowCab,G:Math.max(3,hb(86,-90)),yard:3,k:'j',gap:[2,4]}],[86,-128,86,-52,6,{sty:snowCab,G:Math.max(3,hb(86,-90)),yard:3,k:'j',gap:[2,4]}]]);
  // ranger hamlet along the south road
  streets([[0,60,0,140,6,{sty:snowCab,G:null,yard:4,k:'j',gap:[3,6]}]]);
  // ski lodge on top of the big western hill
  {const G=hb(-120,16);town(-136,6,-104,28,G,8);planHouse(Object.assign(ST.cabin(),{biz:'ski',porch:0,x:-120,z:16,r:0,G,W:18,D:12,NS:2,base:0,rc:0xf2f6fa,force:1}))}
  // research station (south-west)
  {const G=Math.max(3,hb(-95,96));town(-126,72,-64,122,G,10);planHouse(Object.assign(ST.ware(),{wv:'lab',x:-108,z:90,r:1,G,W:20,D:12,wc:0xd9622e,rc:0xe8eef2,force:1}));
   planHouse(Object.assign(ST.office(),{rg:'lab',ru:'dorm',x:-80,z:112,r:0,G,W:12,D:10,NS:2,base:0,wc:0xd8dde2,force:1}));occR.push([-86,74,-74,86])}
  // fishing shacks on the north shore of the frozen lake
  [[82,52],[108,52]].forEach(([x,z])=>planHouse(Object.assign(ST.bung(),{x,z,r:2,G:Math.max(1.6,hb(x,z)),wt:'w',wc:pick([0x6f8fa8,0xa85a3a,0x5a7a4a]),rc:0xf2f6fa,rt:'t',porch:0,shack:1})));
  BT.push(()=>snowBuild())}
 else if(['mesa','harbor','autumn','sakura','ruins','lunar','bayou','castle','park','archi','volc','dune','redwood','mil','sav','neon','refin','camp','arena','rail','pine','bay'].includes(L)){
  const rj=(a,b,c,d,w)=>road(a,b,c,d,w||5,'j'),ru=(a,b,c,d,w)=>road(a,b,c,d,w||4,'u'),S2=XS;
  const west=()=>({st:'west',W:pick([9,10,11]),D:pick([10,12]),NS:r()<.3?2:1,FH:3.6,base:0,gar:0,part:0,roof:'flat',wt:'w',wc:pick([0xa86a3a,0x8a5a3a,0xc9a46a,0x6f8a8a,0xb5503a,0xd9c49a,0x9a7a5a]),rc:0x6b5a4a,rt:'c',tc:0xf2e6c8,dc:0x6b4423,lc:0xe8dcc0,lin:'w',fl:0xb08455,flr:'k',porch:1,ff:1,sgc:pick([0xf2e6c8,0xe8c070,0xd9d0c0])});
  const autumnSub=()=>Object.assign(ST.sub(),{wc:pick([0xd9c39a,0xb5654a,0x8a9a6a,0xe8dcc0,0xa8844f,0x7a8a9a]),rc:pick([0x5c4636,0x6b3a2e,0x4a3a30]),gar:0});
  const jp=()=>({st:'villa',W:pick([10,11,12]),D:pick([9,10]),NS:r()<.35?2:1,base:0,gar:0,roof:'gable',wt:'w',wc:pick([0x5a3a28,0x6b4a32,0x4a3020]),rc:pick([0x3a3f46,0x2f3338,0x4a4f57]),rt:'h',tc:0xf2e8d8,dc:pick([0x8a2f24,0x2f3338]),lc:0xf2e8d8,porch:1,shut:0,fl:0xc8a27a,cp:0x9a8a6a,flr:'k'});
  const tudor=()=>({st:'sub',W:pick([10,11,12]),D:pick([9,10]),NS:r()<.6?2:1,base:0,gar:0,roof:'gable',wt:'p',wc:pick([0xeee4cc,0xe8dcc0,0xf2ead6]),wt2:0,rc:pick([0x6b4a2c,0x5a3a22,0x7a5a3a]),rt:'t',tc:0x3a2a1e,dc:0x4a2e1a,lc:0xe8dcc0,porch:r()<.3,fence:0,chim:r()<.6,fl:0x9c6b3e,cp:0x8a6a4a});
  const trop=ST.trop,bung=ST.bung;
  if(L==='mesa'){const zr=-XS*.6;town(-56,-42,56,42,1.6,10);occR.push([26,-38,40,-24],[-48,26,-30,40],[-84,-20,-64,0]);
   town(-XS,zr-6,XS,zr+6,1.4,8);occR.push([-XS,zr-4,XS,zr+4]);rj(0,-42,0,zr+6);{const zc=xrc(0,XF.can);rj(0,42,0,zc-15);rj(0,zc+15,0,XS*.85)}
   streets([[-56,0,56,0,7,{sty:west,G:1.6,yard:3.6,k:'j',gap:[.6,1.6]}],[0,-40,0,40,7,{sty:west,G:1.6,yard:3.6,k:'j',gap:[.6,1.6]}]]);
   planHouse(Object.assign(west(),{biz:'post',x:16,z:zr+13,r:0,G:1.4,W:14,D:8,NS:1,force:1,sgc:0xe8c070}));
   tryHouse(5,()=>Object.assign(west(),{ff:0,porch:1}),XS*.8)}
  else if(L==='harbor'){const cx=XF.cx;town(cx-64,-XS*.72,cx-1,XS*.72,2.2,6);occR.push([cx-46,-XS*.72,cx-1,XS*.72]);
   [-62,-26,10,46].forEach(z=>planHouse(Object.assign(ST.ware(),{x:cx-55,z,r:3,G:2.2,W:24,D:14,force:1,wc:pick([0x9aa3aa,0x7d8b96,0xa65a3a,0x6b7d8c])})));
   planHouse(Object.assign(ST.office(),{x:cx-55,z:-XS*.62,r:3,G:2.2,W:12,D:10,NS:2,base:0,force:1}));
   rj(-XS*.85,0,cx-64,0,6);const G=Math.max(2.4,hb(-XS*.5,0));town(-XS*.88,-XS*.82,cx-70,XS*.82,G,12);
   streets([[-XS*.85,-XS*.4,cx-72,-XS*.4,6,{sty:ST.sub,G,yard:5,gap:[3,5]}],[-XS*.85,XS*.4,cx-72,XS*.4,6,{sty:ST.sub,G,yard:5,gap:[3,5]}],[-XS*.5,-XS*.8,-XS*.5,XS*.8,6,{sty:ST.sub,G,yard:5,gap:[3,5]}]])}
  else if(L==='autumn'){const Gv=Math.max(2,hb(-56,-48));town(-104,-94,-8,-2,Gv,14);streets([[-104,-48,-8,-48,6,{sty:autumnSub,G:Gv,yard:5,gap:[3,5]}],[-56,-94,-56,-2,6,{sty:autumnSub,G:Gv,yard:5,gap:[3,5]}]]);
   const Gf=Math.max(2,hb(56,48));town(16,10,104,90,Gf,14);occR.push([30,58,96,90]);
   planHouse({st:'barn',W:18,D:12,NS:1,FH:5.5,base:0,gar:0,part:0,roof:'gable',wt:'w',wc:0xa8322a,rc:0x4a3a30,rt:'t',tc:0xf4f2ea,dc:0xf4f2ea,lc:0xc9a46a,lin:'w',porch:0,fl:0x9c7a56,cp:0x9c7a56,x:46,z:34,r:0,G:Gf,force:1});
   planHouse(Object.assign(autumnSub(),{x:86,z:30,r:3,G:Gf,yard:0,fence:0,force:1}));occR.push([60,14,74,28]);
   const Gm=Math.max(2,hb(-48,56));town(-72,32,-24,80,Gm,10);occR.push([-70,34,-26,78]);
   const Gw=hb(48,-64);town(40,-72,56,-56,Gw,8);occR.push([40,-72,56,-56]);
   rj(-56,0,-56,32);rj(-8,-48,22,-48);rj(22,-48,22,10);rj(22,-48,40,-48);rj(-24,56,16,56)}
  else if(L==='sakura'){rj(-30,10,-58,10,4);rj(30,10,64,10,4);ru(0,32,0,52,4);const Gp=hb(0,-74);town(-15,-90,15,-58,Gp,10);occR.push([-15,-90,15,-58]);rj(0,-57,0,-14,4);
   const Gs=Math.max(2.4,hb(0,74));town(-64,58,64,92,Gs,10);streets([[-64,74,64,74,6,{sty:jp,G:Gs,yard:3,k:'u',gap:[3,5]}]]);
   const Ge=Math.max(2.4,hb(76,-10));town(64,-56,96,38,Ge,10);streets([[76,-56,76,38,6,{sty:jp,G:Ge,yard:3,k:'u',gap:[3,5]}]]);
   const Gz=Math.max(2.4,hb(-68,-54));town(-84,-68,-52,-40,Gz,8);occR.push([-84,-68,-52,-40]);planHouse(Object.assign(jp(),{x:-68,z:-30,r:2,G:Math.max(2.4,hb(-68,-30)),NS:1,force:1}))}
  else if(L==='ruins'){const G=hb(0,-10);town(-44,-54,44,34,G,14);occR.push([-26,-36,26,32]);XF.G=G;
   [[-34,-38,0],[34,-38,0],[-36,18,1],[36,18,3]].forEach(([x,z,ro])=>planHouse(Object.assign(ST.keep(),{x,z,r:ro,G,NS:1,W:10,D:9,wc:0x9a9a7a,rc:0x7a7a6a,force:1})));
   {const zc=xrc(0,XF.riv);rj(0,34,0,zc-17,6);rj(0,zc+17,0,XS*.9,6)}rj(-44,-10,-XS*.85,-10);rj(44,-10,XS*.85,-10);
   tryHouse(6,()=>Object.assign(ST.keep(),{NS:1,W:9,D:8,wc:0x8a8f6a,rc:0x6a6a5a}),XS*.8)}
  else if(L==='lunar'){town(-62,-62,62,62,2,14);occR.push([-62,-62,62,62]);const Gp=hb(XS*.55,-XS*.45);town(XS*.55-20,-XS*.45-20,XS*.55+20,-XS*.45+20,Gp,10);occR.push([XS*.55-18,-XS*.45-18,XS*.55+18,-XS*.45+18]);XF.Gp=Gp;
   rj(0,-62,0,-XS*.45,6);rj(0,-XS*.45,XS*.55-20,-XS*.45,6);rj(62,0,XS*.8,0,6);rj(-62,0,-XS*.8,0,6);
   tryHouse(5,()=>Object.assign(ST.ware(),{W:16,D:10,FH:4,wc:0xd8dde2,rc:0xb8bec6,wt:'m'}),XS*.85)}
  else if(L==='bayou'){const zb=-XS*.2,xb=XS*.3;XF.zb=zb;XF.xb=xb;occR.push([-XS*.72,zb-2,XS*.72,zb+2],[xb-2,-XS*.75,xb+2,XS*.75]);
   for(let t=-XS*.66;t<XS*.66;t+=13)[1,-1].forEach(sd=>{if(Math.abs(t-xb)<9)return;const s=Object.assign(vary(r()<.5?bung():ST.sub()),{gar:0,porch:1,fence:0,yard:0,NS:1,base:0,stilt:1,nopad:1});s.W=Math.min(s.W,11);s.D=Math.min(s.D,9);
    planHouse(Object.assign(s,{x:t,z:zb+sd*(1.5+2.6+s.D/2),r:sd>0?2:0,G:1.5}))});
   for(let t=-XS*.7;t<XS*.7;t+=13)[1,-1].forEach(sd=>{if(Math.abs(t-zb)<9)return;const s=Object.assign(vary(bung()),{porch:1,stilt:1,nopad:1,yard:0});planHouse(Object.assign(s,{x:xb+sd*(1.5+2.6+s.D/2),z:t,r:sd>0?3:1,G:1.5}))});
   const Gc=1.6;town(XS*.45-16,XS*.45-16,XS*.45+16,XS*.45+20,Gc,8);planHouse(Object.assign(ST.church(),{x:XS*.45,z:XS*.45,r:2,G:Gc,force:1}));
   }
  else if(L==='castle'){const G=18;XF.G=G;planHouse(Object.assign(ST.keep(),{x:0,z:-14,r:2,G,W:16,D:14,NS:2,force:1}));
   planHouse(Object.assign(ST.cabin(),{biz:'smith',x:-20,z:4,r:1,G,W:12,D:8,NS:1,porch:0,force:1}));planHouse(Object.assign(ST.bung(),{biz:'tavern',porch:0,x:20,z:2,r:3,G,force:1}));
   occR.push([-33,-43,33,-37],[-33,17,33,23],[-33,-43,-27,23],[27,-43,33,23]);
   const Gv=Math.max(3,hb(-XS*.45,XS*.28));town(-XS*.45-40,XS*.28-30,-XS*.45+40,XS*.28+26,Gv,12);
   streets([[-XS*.45-38,XS*.28,-XS*.45+38,XS*.28,6,{sty:tudor,G:Gv,yard:4,gap:[2,4]}],[-XS*.45,XS*.28-28,-XS*.45,XS*.28+24,6,{sty:tudor,G:Gv,yard:4,gap:[2,4]}]]);
   const Gt=Math.max(3,hb(XS*.45,XS*.22));town(XS*.45-26,XS*.22-18,XS*.45+26,XS*.22+18,Gt,10);occR.push([XS*.45-26,XS*.22-18,XS*.45+26,XS*.22+18]);XF.Gt=Gt;
   const Gw=hb(XS*.5,-XS*.5);town(XS*.5-8,-XS*.5-8,XS*.5+8,-XS*.5+8,Gw,8);occR.push([XS*.5-8,-XS*.5-8,XS*.5+8,-XS*.5+8]);
   {const zc=xrc(0,XF.riv);rj(0,24,0,zc-17,6);rj(0,zc+17,0,XS*.9,6)}rj(-XS*.45+40,XS*.28,-4,XS*.28);rj(4,XS*.28,XS*.45-26,XS*.28)}
  else if(L==='park'){town(-XS*.88,-XS*.88,XS*.88,XS*.88,1.1,10);ru(-XS*.85,0,-14,0,6);ru(14,0,XS*.85,0,6);ru(0,-XS*.5,0,-14,6);ru(0,14,0,XS*.85,6);ru(-XS*.85,XS*.45,XS*.85,XS*.45,5);ru(-XS*.6,-XS*.42,XS*.6,-XS*.42,5);
   occR.push([-12,-12,12,12],[XS*.5-22,-XS*.15-8,XS*.5+22,-XS*.15+8],[-XS*.75,-XS*.82,XS*.3,-XS*.48],[-XS*.6,XS*.12,-XS*.32,XS*.38],[-10,XS*.7,10,XS*.86],[XS*.3,XS*.62,XS*.6,XS*.84],[-93,-48,-57,-12],[30,-50,50,-30],[-46,26,-26,46],[28,28,52,52],[-50,-50,-30,-30],[70,-120,130,-80]);
   planHouse(Object.assign(ST.villa(),{bz:'haunted',x:XS*.5,z:XS*.25,r:0,G:1.1,W:14,D:11,NS:2,roof:'gable',wc:0x3a3440,rc:0x1f1a24,rt:'t',shut:1,shc:0x5a1a2a,porch:1,force:1}));
   tryHouse(4,()=>Object.assign(ST.shop(),{wc:pick([0xf2c230,0xe8553a,0x2f9ab0,0x3aa060]),bz:'?ff'}),XS*.8)}
  else if(L==='volc'){// Volcano Isle: fishing village (east), beach resort (south), research station (west), plantation (north-east)
   const Gv=Math.max(2.4,hb(118,70));town(78,38,160,104,Gv,12);streets([[80,56,158,56,6,{sty:trop,G:Gv,yard:3,k:'u',gap:[2,4]}],[80,88,158,88,6,{sty:trop,G:Gv,yard:3,k:'u',gap:[2,4]}],[118,40,118,104,6,{sty:trop,G:Gv,yard:3,k:'u',gap:[2,4]}]]);
   planHouse(Object.assign(ST.ware(),{wv:'fish',x:140,z:118,r:2,G:Math.max(2.4,hb(140,118)),W:16,D:10,wc:0x8fc3cf,rc:0x5a6b74,force:1}));
   const Gr=Math.max(2.4,hb(-10,150));town(-46,128,36,168,Gr,10);planHouse(Object.assign(ST.villa(),{biz:'hotel',x:-10,z:142,r:0,G:Gr,W:22,D:11,NS:2,base:0,gar:0,roof:'gable',porch:0,wc:0xf6e7d2,rc:0x2f6f8a,rt:'h',shut:1,shc:0x2f8f9a,force:1}));
   [[-40,160,2],[22,160,2],[34,140,1]].forEach(([x,z,ro])=>planHouse(Object.assign(vary(bung()),{x,z,r:ro,G:Math.max(2.4,hb(x,z))})));
   const Gs=Math.max(3,hb(-150,40));town(-176,14,-120,72,Gs,10);occR.push([-170,20,-150,40]);
   planHouse(Object.assign(ST.ware(),{wv:'lab',x:-142,z:56,r:1,G:Gs,W:16,D:10,FH:4,wc:0xd8dde2,rc:0xb8bec6,wt:'m',force:1}));planHouse(Object.assign(ST.office(),{ru:'lab',x:-132,z:24,r:3,G:Gs,W:10,D:8,NS:2,base:0,force:1}));
   const Gp=Math.max(2.4,hb(150,-30));town(124,-56,176,-4,Gp,10);planHouse({st:'barn',W:16,D:11,NS:1,FH:5.2,base:0,gar:0,part:0,roof:'gable',wt:'w',wc:0x8a5a3a,rc:0x4a3a30,rt:'t',tc:0xf4f2ea,dc:0xf4f2ea,lc:0xc9a46a,lin:'w',porch:0,fl:0x9c7a56,cp:0x9c7a56,x:160,z:-40,r:3,G:Gp,force:1});
   planHouse(Object.assign(vary(trop()),{x:138,z:-18,r:0,G:Gp,NS:2,force:1}));
   rj(78,72,40,72,5);rj(40,72,-10,128,5);rj(-46,140,-120,60,5);rj(118,38,140,-4,5);
   tryHouse(5,()=>Object.assign(vary(bung()),{}),XS*.75)}
  else if(L==='dune'){// Dune Sea: oasis town, mining outpost, oil field, desert fort, crash site
   const Go=Math.max(2,hb(-4,46));town(-46,6,24,92,Go,12);occR.push([-14,32,6,52]);
   streets([[-44,22,22,22,6,{sty:ST.adobe,G:Go,yard:2.5,k:'j',gap:[1.5,3]}],[-44,72,22,72,6,{sty:ST.adobe,G:Go,yard:2.5,k:'j',gap:[1.5,3]}],[-24,8,-24,90,6,{sty:ST.adobe,G:Go,yard:2.5,k:'j',gap:[1.5,3]}]]);
   const Gm=Math.max(2,hb(-140,-120));town(-178,-150,-104,-92,Gm,12);[[-160,-136,0],[-124,-136,0],[-142,-104,2]].forEach(([x,z,ro])=>planHouse(Object.assign(ST.ware(),{x,z,r:ro,G:Gm,W:18,D:12,wc:pick([0xa86a3a,0x9aa3aa,0xb8b2a0]),force:1})));
   const Gf=Math.max(2,hb(140,-130));town(104,-170,180,-92,Gf,10);occR.push([104,-170,180,-92]);planHouse(Object.assign(ST.office(),{x:120,z:-104,r:2,G:Gf,W:10,D:8,NS:1,base:0,force:1}));
   const Gk=Math.max(2,hb(150,120));town(116,86,184,154,Gk,10);occR.push([116,86,184,154]);XF.Gk=Gk;
   const Gc=Math.max(2,hb(-120,124));town(-160,96,-80,152,Gc,8);occR.push([-160,96,-80,152]);XF.Gc=Gc;
   const Gr=Math.max(2,hb(-150,10));town(-176,-14,-124,34,Gr,8);occR.push([-176,-14,-124,34]);XF.Gr=Gr;
   rj(24,46,104,-120,5);rj(-46,46,-140,-92,5);rj(24,72,116,120,5);rj(-46,72,-80,124,5);
   tryHouse(6,()=>Object.assign(ST.adobe(),{}),XS*.8)}
  else if(L==='redwood'){// Redwood Valley: logging town (north), sawmill, ranger station and campground (south), cabins along the river
   const Gt=Math.max(4,hb(-60,-112));town(-112,-150,-8,-74,Gt,14);streets([[-110,-112,-10,-112,6,{sty:ST.cabin,G:Gt,yard:4,gap:[3,5]}],[-60,-148,-60,-76,6,{sty:ST.cabin,G:Gt,yard:4,gap:[3,5]}]]);
   const Gs=Math.max(4,hb(84,-100));town(54,-130,118,-70,Gs,12);planHouse(Object.assign(ST.ware(),{wv:'factory',x:84,z:-110,r:0,G:Gs,W:22,D:14,wt:'w',wc:0x8a5a3a,rc:0x4a4a4a,force:1}));occR.push([60,-92,112,-72]);
   planHouse(Object.assign(ST.ware(),{wv:'storage',x:100,z:-82,r:2,G:Gs,W:16,D:10,wt:'w',wc:0x6e4a30,rc:0x4a4a4a,force:1}));
   const Gr=Math.max(4,hb(50,112));town(24,90,80,138,Gr,10);planHouse(Object.assign(ST.cabin(),{x:50,z:112,r:2,G:Gr,W:15,D:11,NS:2,base:1,force:1}));occR.push([60,96,78,134]);
   const Gc=Math.max(4,hb(-130,96));town(-160,72,-100,124,Gc,8);occR.push([-160,72,-100,124]);XF.Gc=Gc;
   tryHouse(9,()=>Object.assign(ST.cabin(),{NS:r()<.3?2:1}),XS*.85);
   {const zc=xrc(-100,XF.riv);rj(-100,-74,-100,zc-17,5);rj(-100,zc+17,-100,72,5)}{const zc=xrc(40,XF.riv);rj(40,-70,40,zc-17,5);rj(40,zc+17,40,90,5)}rj(-8,-112,54,-112,5)}
  else if(L==='mil'){// Fort Ironclad: runway and hangars, barracks, HQ, motor pool, inside a fence; a small town outside the gate
   const G=Math.max(2,hb(0,-20));XF.G=G;town(-176,-140,176,100,G,16);RD.push([-160,-64,160,-64,18,'a']);occR.push([-170,-76,170,-52]);
   [-90,-30,30].forEach(x=>planHouse(Object.assign(ST.ware(),{wv:'hangar',x,z:-100,r:0,G,W:26,D:16,FH:7,wc:0x6a7a5a,rc:0x5a6a4a,force:1})));
   planHouse(Object.assign(ST.office(),{ru:'command',x:110,z:-100,r:0,G,W:10,D:8,NS:2,base:0,force:1}));
   for(let i=0;i<4;i++)planHouse(Object.assign(ST.ware(),{wv:i%2?'storage':'gymhall',x:-120+i*30,z:18,r:i%2?2:0,G,W:20,D:10,FH:4.2,wt:'c',wc:0x8a8f7a,rc:0x5a5f52,force:1}));
   planHouse(Object.assign(ST.office(),{x:60,z:30,r:2,G,W:14,D:10,NS:2,base:1,wc:0xb8b2a0,force:1}));planHouse(Object.assign(ST.ware(),{wv:'garage',x:118,z:30,r:2,G,W:22,D:14,wc:0x6a7a5a,force:1}));
   occR.push([-40,50,40,96],[130,-40,176,0],[-176,-40,-130,0]);
   const Gt=Math.max(2,hb(-120,160));town(-176,124,-60,190,Gt,12);streets([[-176,156,-62,156,6,{sty:ST.sub,G:Gt,yard:5,gap:[3,5]}]]);
   rj(0,100,0,150,6);rj(0,150,-60,156,6);tryHouse(4,ST.cabin,XS*.85)}
  else if(L==='sav'){// Savanna: safari lodge, a village of round huts (built later), ranger post, trading post, all joined by dirt tracks
   const Gl=Math.max(2,hb(120,-60));town(92,-88,150,-32,Gl,12);planHouse(Object.assign(ST.villa(),{biz:'hotel',x:120,z:-64,r:0,G:Gl,W:20,D:11,NS:2,base:0,gar:0,roof:'gable',rt:'z',rc:0xd9c08a,wc:0xe8d8b8,porch:0,shut:0,force:1}));
   [[100,-40,1],[142,-40,3]].forEach(([x,z,ro])=>planHouse(Object.assign(ST.bung(),{x,z,r:ro,G:Gl})));
   const Gv=Math.max(2,hb(-130,-110));town(-178,-160,-84,-64,Gv,10);occR.push([-178,-160,-84,-64]);XF.Gv=Gv;
   const Gp=Math.max(2,hb(60,150));town(30,124,92,180,Gp,10);planHouse(Object.assign(ST.cabin(),{x:60,z:150,r:2,G:Gp,W:13,D:10,NS:1,force:1}));occR.push([30,124,48,142]);
   const Gt=Math.max(2,hb(160,100));town(124,70,196,136,Gt,12);streets([[126,100,194,100,6,{sty:()=>Object.assign(west(),{ff:r()<.5}),G:Gt,yard:3,k:'j',gap:[1,2]}]]);
   rj(120,-32,120,70,5);rj(92,150,124,110,5);rj(-84,-112,92,-64,5);rj(-40,72,30,150,5);
   tryHouse(4,ST.bung,XS*.8)}
  else if(L==='neon'){// Neon Alley: a night city block - shops and offices on three streets, rooftop stairs, an alley and a plaza
   const G=1,nsh=()=>Object.assign(ST.shop(),{wc:pick([0x5a5f6a,0x6a5a72,0x56687a,0x7a6a5a,0x60606a,0x6a6a7a]),bz:'?ff'}),nof=()=>Object.assign(ST.office(),{wc:pick([0x60646c,0x6a6e78,0x78726a,0x5a6070]),base:r()<.4});
   town(-S,-S,S,S,G,6);occR.push([-12,-8,12,8]);ru(-40,-18,-40,20,4);ru(40,-18,40,20,4);streets([[-S+2,-22,S-2,-22,7,{sty:()=>r()<.55?nsh():nof(),G,yard:1,gap:[.6,1.4]}],[-S+2,24,S-2,24,7,{sty:()=>r()<.55?nsh():nof(),G,yard:1,gap:[.6,1.4]}]])}
  else if(L==='refin'){// Rust Refinery: tank farm, pipe racks, two sheds and the control office
   const G=1;town(-S,-S,S,S,G,6);planHouse(Object.assign(ST.ware(),{wv:'factory',x:-34,z:-40,r:0,G,W:22,D:14,wc:0xa65a3a,force:1}));planHouse(Object.assign(ST.ware(),{wv:'storage',x:36,z:42,r:2,G,W:22,D:14,wc:0x7d8b96,force:1}));
   planHouse(Object.assign(ST.office(),{x:40,z:-42,r:0,G,W:12,D:10,NS:2,base:0,force:1}));occR.push([-50,-6,50,34],[-50,24,10,54])}
  else if(L==='camp'){// Lakeside Camp: cabins round a green, a mess hall, the lake with a dock
   const G0=hb(-20,-20);planHouse(Object.assign(ST.cabin(),{biz:'diner',x:-28,z:-34,r:0,G:Math.max(1.6,hb(-28,-34)),W:16,D:10,NS:1,porch:1,force:1}));
   occR.push([-16,-14,8,10],[18,-20,46,-8]);[[-38,-2,1],[-38,20,1],[-22,36,2],[0,38,2],[-4,-38,0],[16,-36,0],[38,-30,3]].forEach(([x,z,ro])=>planHouse(Object.assign(ST.cabin(),{x,z,r:ro,G:Math.max(1.6,hb(x,z)),W:9,D:8,NS:1,base:0,porch:1,gar:0})));tryHouse(2,()=>Object.assign(ST.cabin(),{W:9,D:8,NS:1,base:0,gar:0}),40)}
  else if(L==='arena'){// Colosseum: the amphitheatre fills the middle; temples and a forum street round the outside
   occR.push([-42,-42,42,42]);[[-52,-52,1],[52,-52,3],[-52,52,1],[52,52,3]].forEach(([x,z,ro],i)=>planHouse(Object.assign(ST.keep(),{x,z,r:ro,G:1.2,NS:i%2?2:1,W:12,D:9,wc:0xe8dcc4,rc:0xc8b898,force:1})))}
  else if(L==='rail'){// Rail Yard: five tracks, a station on the north side, the engine shed and yard office to the south
   const G=1;town(-S,-S,S,S,G,6);occR.push([-S,-34,S,24]);planHouse(Object.assign(ST.shop(),{biz:'cafe',x:-14,z:-46,r:2,G,W:16,D:8,NS:1,wc:0xb5654a,wt:'b',force:1}));
   planHouse(Object.assign(ST.ware(),{wv:'garage',x:-30,z:44,r:0,G,W:24,D:14,wc:0x6b3a2e,wt:'b',force:1}));planHouse(Object.assign(ST.office(),{x:34,z:44,r:0,G,W:12,D:10,NS:2,base:0,force:1}))}
  else if(L==='pine'){// Pine Lake: Lakeview (east), north-shore cabins, a farm, Millbrook (west), a crossroads, Riverside (south) and a lake campground
   const shopOr=()=>r()<.62?ST.shop():Object.assign(ST.office(),{base:0}),zc=x=>xrc(x,XF.riv);
   const G1=Math.max(3,hb(230,25));town(140,-64,324,114,G1,16);XF.G1=G1;
   streets([[140,20,324,20,8,{sty:shopOr,G:G1,yard:1,k:'a',gap:[1,2]}],[192,-62,192,112,6,{sty:ST.sub,G:G1,yard:5,gap:[4,7]}],[276,-62,276,112,6,{sty:ST.sub,G:G1,yard:5,gap:[4,7]}]]);
   const Gn=Math.max(3,hb(60,-300));town(-44,-334,164,-266,Gn,14);XF.Gn=Gn;streets([[-40,-300,160,-300,6,{sty:ST.cabin,G:Gn,yard:4,k:'j',gap:[4,7]}]]);occR.push([28,-272,52,-262]);
   const Gf=Math.max(3,hb(-250,-80));town(-308,-138,-192,-22,Gf,16);XF.Gf=Gf;occR.push([-304,-134,-262,-98],[-304,-60,-292,-30]);
   planHouse({st:'barn',W:18,D:12,NS:1,FH:5.5,base:0,gar:0,part:0,roof:'gable',wt:'w',wc:0xa8322a,rc:0x4a3a30,rt:'t',tc:0xf4f2ea,dc:0xf4f2ea,lc:0xc9a46a,lin:'w',porch:0,fl:0x9c7a56,cp:0x9c7a56,x:-232,z:-104,r:0,G:Gf,force:1});
   planHouse(Object.assign(ST.sub(),{x:-262,z:-54,r:1,G:Gf,yard:0,fence:0,gar:0,force:1}));
   const Gm=Math.max(3,hb(-220,125));town(-328,76,-112,174,Gm,16);streets([[-326,125,-114,125,7,{sty:()=>r()<.5?ST.villa():ST.sub(),G:Gm,yard:4,k:'a',gap:[3,6]}]]);
   const Gx=Math.max(3,hb(30,110));town(-12,80,84,142,Gx,12);XF.Gx=Gx;occR.push([26,98,48,122]);
   planHouse(Object.assign(ST.shop(),{x:62,z:96,r:3,G:Gx,tc:0x2f6fd8,force:1}));planHouse(Object.assign(ST.shop(),{x:62,z:126,r:3,G:Gx,tc:0xc23b2f,force:1}));planHouse(Object.assign(ST.bung(),{x:-2,z:128,r:1,G:Gx,force:1}));
   const Gr=Math.max(3,hb(120,305));town(26,273,214,337,Gr,14);streets([[30,305,210,305,6,{sty:()=>r()<.5?ST.cabin():ST.sub(),G:Gr,yard:4,k:'j',gap:[4,7]}]]);
   const Gc=Math.max(2.5,hb(-112,-205));town(-156,-238,-70,-172,Gc,10);XF.Gc=Gc;occR.push([-128,-226,-78,-184]);
   [[-146,-186,1],[-146,-224,1]].forEach(([x,z,ro])=>planHouse(Object.assign(ST.cabin(),{x,z,r:ro,G:Gc,NS:1,W:11,D:9,force:1})));
   // sawmill (north-west): two big sheds you can go in, log yard built later
   const Gs=Math.max(3,hb(-280,-262));town(-330,-300,-230,-224,Gs,14);XF.Gs=Gs;occR.push([-326,-238,-286,-228]);
   planHouse(Object.assign(ST.ware(),{wv:'factory',x:-300,z:-276,r:0,G:Gs,W:22,D:14,wt:'w',wc:0x8a5a3a,rc:0x4a4a4a,force:1}));planHouse(Object.assign(ST.ware(),{wv:'storage',x:-252,z:-274,r:1,G:Gs,W:16,D:10,wt:'w',wc:0x6e4a30,rc:0x4a4a4a,force:1}));
   // Pine Hollow: a second neighbourhood between the lake and the highway
   const Gh=Math.max(3,hb(-95,-35));town(-160,-62,-30,-8,Gh,14);streets([[-158,-35,-32,-35,6,{sty:ST.sub,G:Gh,yard:5,gap:[3,6]}]]);
   // hill ranch (east): ranch house and a stable
   const Gk=Math.max(3,hb(318,-120));town(290,-150,346,-92,Gk,12);XF.Gk=Gk;occR.push([292,-104,320,-94]);
   planHouse(Object.assign(ST.cabin(),{x:330,z:-132,r:3,G:Gk,W:13,D:10,NS:2,force:1}));planHouse({st:'barn',W:14,D:10,NS:1,FH:4.6,base:0,gar:0,part:0,roof:'gable',wt:'w',wc:0x7a4a2e,rc:0x3a3430,rt:'t',tc:0xf4f2ea,dc:0xf4f2ea,lc:0xc9a46a,lin:'w',porch:0,fl:0x9c7a56,cp:0x9c7a56,x:302,z:-130,r:1,G:Gk,force:1});
   road(-280,-224,-280,-150,6,'j');road(-280,-150,-220,-150,6,'j');road(-220,-150,-220,-138,6,'j');road(-158,-35,-158,16,6,'j');road(292,-120,232,-120,6,'j');
   road(-336,20,138,20,8,'a');road(20,-86,20,16,6,'a');road(20,24,20,80,6,'a');
   road(20,142,20,zc(20)-17,6,'j');road(20,zc(20)+17,20,273,6,'j');road(192,114,192,zc(192)-17,6,'j');road(192,zc(192)+17,192,273,6,'j');
   road(232,-64,232,-296,6,'j');road(164,-300,232,-300,6,'j');road(-220,-22,-220,16,6,'j');road(-220,24,-220,76,6,'j');road(-112,-172,-112,16,5,'j');
   tryHouse(6,()=>Object.assign(ST.cabin(),{NS:r()<.3?2:1}),XS*.72)}
  else if(L==='bay'){// Sunset Bay: downtown, hillside homes, beach houses, a trailer park, the harbor, a lighthouse cottage
   const shopOr=()=>r()<.55?ST.shop():Object.assign(ST.office(),{base:0}),zc=XF.zc;
   const Gd=Math.max(3,hb(0,-10));town(-114,-94,114,74,Gd,16);XF.Gd=Gd;
   streets([[-110,-10,110,-10,8,{sty:shopOr,G:Gd,yard:1,k:'a',gap:[1,2.4]}],[-110,50,110,50,7,{sty:shopOr,G:Gd,yard:1,k:'a',gap:[1,2.4]}],[0,-92,0,72,7,{sty:shopOr,G:Gd,yard:1,k:'a',gap:[1,2.4]}]]);
   const Gh=Math.max(3,hb(0,-235));town(-172,-270,172,-200,Gh,16);streets([[-170,-235,170,-235,7,{sty:ST.sub,G:Gh,yard:5,k:'a',gap:[3,6]}]]);
   const Gb=Math.max(2.6,hb(-230,140));town(-334,116,-126,164,Gb,10);streets([[-330,140,-130,140,6,{sty:()=>Object.assign(r()<.5?ST.villa():ST.trop(),{NS:1,base:0}),G:Gb,yard:3,k:'j',gap:[4,7]}]]);
   const Gt=Math.max(3,hb(-310,5));town(-372,-30,-248,40,Gt,10);streets([[-370,5,-250,5,6,{sty:ST.bung,G:Gt,yard:2,k:'j',gap:[2,4]}]]);
   const Gp=Math.max(2.6,hb(265,40));town(198,-2,334,84,Gp,12);XF.Gp=Gp;
   planHouse(Object.assign(ST.ware(),{x:234,z:28,r:0,G:Gp,W:22,D:14,force:1}));planHouse(Object.assign(ST.ware(),{wv:'storage',x:296,z:28,r:0,G:Gp,W:22,D:14,wc:0xa65a3a,force:1}));
   planHouse(Object.assign(ST.office(),{x:262,z:70,r:2,G:Gp,NS:2,base:0,force:1}));
   const Gg=Math.max(3,hb(-160,82));town(-186,66,-130,98,Gg,8);XF.Gg=Gg;occR.push([-178,70,-160,92]);planHouse(Object.assign(ST.shop(),{x:-142,z:80,r:3,G:Gg,tc:0x2f9a4a,force:1}));
   const Gl=Math.max(3,hb(292,255));town(278,242,306,268,Gl,8);planHouse(Object.assign(ST.cabin(),{x:292,z:255,r:1,G:Gl,NS:1,W:11,D:9,wt:'w',wc:0xf2f2ee,rc:0xc23b2f,force:1}));
   // Bluff Estates: big villas on the eastern hills
   const Ge=Math.max(3,hb(260,-150));town(176,-178,344,-122,Ge,14);streets([[178,-150,342,-150,6,{sty:()=>Object.assign(ST.villa(),{NS:2}),G:Ge,yard:4,k:'j',gap:[5,8]}]]);
   // vineyard (west): farmhouse, a barn and rows of vines
   const Gv=Math.max(3,hb(-300,-140));town(-358,-196,-242,-86,Gv,14);XF.Gv=Gv;occR.push([-354,-192,-300,-150]);
   planHouse(Object.assign(ST.villa(),{x:-268,z:-118,r:1,G:Gv,NS:2,base:0,force:1}));planHouse({st:'barn',W:14,D:10,NS:1,FH:4.6,base:0,gar:0,part:0,roof:'gable',wt:'w',wc:0x9a5a3a,rc:0x4a3a30,rt:'t',tc:0xf4f2ea,dc:0xf4f2ea,lc:0xc9a46a,lin:'w',porch:0,fl:0x9c7a56,cp:0x9c7a56,x:-320,z:-118,r:0,G:Gv,force:1});
   // sports field with stands
   const Gf=Math.max(3,hb(-190,-40));town(-238,-74,-142,-8,Gf,12);XF.Gf=Gf;occR.push([-236,-72,-144,-10]);
   road(178,-150,120,-150,6,'j');road(120,-150,120,-200,6,'j');road(-242,-140,-170,-140,6,'j');road(-170,-140,-170,-200,6,'j');road(-142,-40,-114,-40,6,'j');
   road(-366,100,366,100,8,'a');road(0,74,0,96,7,'a');road(0,-94,0,-200,7,'a');road(112,50,334,50,7,'a');road(-310,40,-310,96,6,'j');road(-230,104,-230,116,6,'j');
   road(300,104,300,240,5,'j');road(-170,-235,-226,-282,5,'j');road(-150,96,-150,98,5,'j');
   tryHouse(5,()=>Object.assign(ST.sub(),{}),XS*.7)}
  else if(L==='archi'){const I=XF.is;
   planHouse(Object.assign(ST.keep(),{x:0,z:-6,r:2,G:Math.max(2,hb(0,-6)),NS:2,W:12,D:10,force:1}));
   [[-26,14,1],[26,18,3],[-10,34,2],[14,-36,0],[-30,-24,1],[-46,40,1],[44,-40,3],[40,44,2],[-44,-46,0],[-58,4,1],[58,-6,3]].forEach(([x,z,ro])=>planHouse(Object.assign(vary(trop()),{x,z,r:ro,G:Math.max(2,hb(x,z)),NS:1})));
   [[142,-14,2],[158,14,0],[140,18,0],[164,-10,2]].forEach(([x,z,ro])=>planHouse(Object.assign(vary(bung()),{x,z,r:ro,G:Math.max(1.8,hb(x,z))})));
   [[-158,-14,0],[-142,16,2],[-156,20,2],[-166,-6,0]].forEach(([x,z,ro])=>planHouse(Object.assign(vary(bung()),{x,z,r:ro,G:Math.max(1.8,hb(x,z)),wc:pick([0xf4c7cf,0xbfe6df,0xf7e4a2])})));
   planHouse(Object.assign(ST.ware(),{wv:'shipyard',x:-8,z:146,r:2,G:Math.max(1.8,hb(-8,146)),W:18,D:12,wc:0x8fb3c4,force:1}));
   planHouse(Object.assign(ST.keep(),{x:0,z:-140,r:0,G:Math.max(2,hb(0,-140)),NS:2,W:10,D:9,force:1}))}
  BT.push(()=>xBuild())}
 else if(L==='cody'){BT.push(()=>codyBuild())}
 else if(L=='city'){}
 for(let i=0;i<(T.plots||0);i++){const w=fr(20,26),d=fr(16,22),s=spot(Math.hypot(w,d)/2+2.5);if(s){pads.push({x:s[0],z:s[1],w:w/2+1,d:d/2+1,h:fr(0,.5),s:6});PL.push([s[0],s[1],w,d]);occR.push([s[0]-w/2-1,s[1]-d/2-1,s[0]+w/2+1,s[1]+d/2+1])}}
 // ================= terrain: smooth field sampled onto the exact grid the renderer draws =================
 const Hs=(x,z)=>{for(const q of pits)if(x>=q[0]-.001&&x<=q[2]+.001&&z>=q[1]-.001&&z<=q[3]+.001)return q[4];let h=hb(x,z);
  for(const p of pads){const dx=Math.max(Math.abs(x-p.x)-p.w,0),dz=Math.max(Math.abs(z-p.z)-p.d,0),w=Math.max(0,1-Math.hypot(dx,dz)/p.s);h+=(p.h-h)*w*w*(3-2*w)}
  for(const p of pads)if(p.hard&&Math.abs(x-p.x)<=p.w-.6&&Math.abs(z-p.z)<=p.d-.6)h=p.h;
  if(!T.isle&&!T.snowmap&&!T.sea&&XT!=='archi'&&XT!=='cody'){const e=Math.max(Math.abs(x),Math.abs(z));if(e>S)h+=(e-S)*.45}return h};
 const EX=T.ext||150,EZ=T.extZ||EX,GS=T.gs||2,NX=Math.round(2*EX/GS),NZ=Math.round(2*EZ/GS),GC=new Float64Array((NX+1)*(NZ+1)).fill(NaN),gv=(i,j)=>{const k=i*(NZ+1)+j;let v=GC[k];if(v!==v){v=Hs(i*GS-EX,j*GS-EZ);GC[k]=v}return v};
 const H=(x,z)=>{const fx=(x+EX)/GS,fz=(z+EZ)/GS,i=Math.max(0,Math.min(NX-1,Math.floor(fx))),j=Math.max(0,Math.min(NZ-1,Math.floor(fz))),u=Math.min(1,Math.max(0,fx-i)),v=Math.min(1,Math.max(0,fz-j));
  if(u+v<=1){const a=gv(i,j);return a+(gv(i+1,j)-a)*u+(gv(i,j+1)-a)*v}const c=gv(i+1,j+1);return c+(gv(i,j+1)-c)*(1-u)+(gv(i+1,j)-c)*(1-v)};
 const fp=(x,z,w,d)=>{let hi=-99,lo=99;for(let i=-1;i<2;i++)for(let j=-1;j<2;j++){const y=H(x+i*w/2,z+j*d/2);hi=Math.max(hi,y);lo=Math.min(lo,y)}return[lo,hi]};
 const P=(x,z,w,d,h,c,ty,bt)=>{const[lo,hi]=fp(x,z,w,d);B.push([x,z,w,d,hi+h,bt!=null?hi+bt:lo-.6,c,ty||'p'])};
 const BX=(x0,z0,x1,z1,y0,y1,c,ty,vis)=>B.push([(x0+x1)/2,(z0+z1)/2,x1-x0,z1-z0,y1,y0,c,ty,vis?1:0]);
 const lamp=(x,z,y)=>{BX(x-.1,z-.1,x+.1,z+.1,y-.3,y+5,0x2f3338,'m');BX(x-.22,z-.22,x+.22,z+.22,y+5,y+5.35,0x2f3338,'m',1);BX(x-.16,z-.16,x+.16,z+.16,y+4.75,y+5,0xfff1c4,'e',1)};
 const car=(x,z,ax,col)=>{const y=H(x,z),L2=2.2,W2=.95,[a,b]=ax?[L2,W2]:[W2,L2],[c,d]=ax?[1.25,.85]:[.85,1.25];BX(x-a,z-b,x+a,z+b,y+.28,y+1.05,col,'p');BX(x-c,z-d,x+c,z+d,y+1.05,y+1.65,0x9cc3d8,'G',1);BX(x-c+.05,z-d+.05,x+c-.05,z+d-.05,y+1.65,y+1.72,col,'p',1);
  [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([i,j])=>D.push(['wh',ax?x+i*1.45:x+j*(W2-.05),y+.38,ax?z+j*(W2-.05):z+i*1.45,ax]))};
 // ================= buildings =================
 // is a spot clear of every house (with its porch/garage) and every road/sidewalk? m = clearance in metres
 const rdR=q=>{const h=q[4]/2;return q[1]===q[3]?[Math.min(q[0],q[2]),q[1]-h,Math.max(q[0],q[2]),q[1]+h]:[q[0]-h,Math.min(q[1],q[3]),q[0]+h,Math.max(q[1],q[3])]};
 const clearAt=(x,z,m,mr)=>{mr=mr??m;for(const h of HP){const gw=h.gar?6.5:0,q=wrect(h,[-h.W/2,-h.D/2-(h.porch?2.6:0),h.W/2+gw,h.D/2]);if(x>q[0]-m&&x<q[2]+m&&z>q[1]-m&&z<q[3]+m)return false}
  for(const q of RD){const a=rdR(q);if(x>a[0]-mr&&x<a[2]+mr&&z>a[1]-mr&&z<a[3]+mr)return false}return true};
 const buildHouse=h=>{const ro=h.r,cx=h.x,cz=h.z,W=h.W,Dp=h.D,G=h.G,hw=W/2,hd=Dp/2,F=G+.3,FH=h.FH||3.3,NS=h.NS,R=F+FH*NS,th=.3,flat=h.roof=='flat',top=R+(flat?1:0),lt=h.lin||'d',tc=h.tc,run=.7,
   rise=h.rise||Math.min(3.4,Dp*.32);
  let FUR=0;const MX=h.mir?-1:1,biz0=h.biz||(h.st=='shop'?(h.bz||'conv'):null);
  const box=(x0,z0,x1,z1,y0,y1,col,ty,vis)=>{if(x1-x0<.01||z1-z0<.01||y1-y0<.01)return;if(MX<0){const t=x0;x0=-x1;x1=-t}const[a,b]=TR(ro,x0,z0),[c,d]=TR(ro,x1,z1);(FUR?FBX:B).push([cx+(a+c)/2,cz+(b+d)/2,Math.abs(c-a),Math.abs(d-b),y1,y0,col,ty,vis?1:0,h.rc,FUR])};
  const pw=(x,z)=>{const[a,b]=TR(ro,MX*x,z);return[cx+a,cz+b]};
  const wall=(ax,p,a0,a1,y0,y1,t,col,ty,ops,vis)=>{ops=(ops||[]).filter(o=>o.t>y0&&o.b<y1&&o.c+o.w/2>a0&&o.c-o.w/2<a1);
   const seg=(u0,u1,v0,v1)=>{v0=Math.max(v0,y0);v1=Math.min(v1,y1);if(ax=='x')box(u0,p-t/2,u1,p+t/2,v0,v1,col,ty,vis);else box(p-t/2,u0,p+t/2,u1,v0,v1,col,ty,vis)};
   const xs=[a0,a1];ops.forEach(o=>xs.push(Math.max(a0,o.c-o.w/2),Math.min(a1,o.c+o.w/2)));xs.sort((u,v)=>u-v);
   for(let i=0;i<xs.length-1;i++){const u0=xs[i],u1=xs[i+1];if(u1-u0<.01)continue;const m=(u0+u1)/2,cv=ops.filter(o=>Math.abs(o.c-m)<o.w/2).sort((u,v)=>u.b-v.b);let y=y0;
    cv.forEach(o=>{if(o.b>y)seg(u0,u1,y,o.b);y=Math.max(y,o.t)});if(y1>y)seg(u0,u1,y,y1)}};
  const P2=(ax,p,u0,u1,v0,v1,d0,d1,col,ty,vis)=>ax=='x'?box(u0,p+d0,u1,p+d1,v0,v1,col,ty,vis):box(p+d0,u0,p+d1,u1,v0,v1,col,ty,vis);
  const feat=(ax,p,o,n,t)=>{const l=o.c-o.w/2,q=o.c+o.w/2;t=t||th;const fo=n>0?[t/2,t/2+.06]:[-t/2-.06,-t/2];
   if(o.k=='win'){P2(ax,p,l+.01,q-.01,o.b+.01,o.t-.01,-.03,.03,0x9cc3d8,'G',0);
    if(n&&tc!=null){P2(ax,p,l-.12,l,o.b-.1,o.t+.12,...fo,tc,'p',1);P2(ax,p,q,q+.12,o.b-.1,o.t+.12,...fo,tc,'p',1);P2(ax,p,l-.12,q+.12,o.t,o.t+.14,...fo,tc,'p',1);
     P2(ax,p,l-.18,q+.18,o.b-.14,o.b,...(n>0?[t/2,t/2+.16]:[-t/2-.16,-t/2]),tc,'p',1)}
    if(tc!=null&&!o.big){const ym=(o.b+o.t)/2;P2(ax,p,l,q,ym-.03,ym+.03,-.045,.045,tc,'p',1);P2(ax,p,o.c-.03,o.c+.03,o.b,o.t,-.045,.045,tc,'p',1)}
    if(n&&h.shut){P2(ax,p,l-.6,l-.13,o.b,o.t,...fo,h.shc,'o',1);P2(ax,p,q+.13,q+.6,o.b,o.t,...fo,h.shc,'o',1)}}
   else if(o.k=='door'){const hl=ax=='x'?pw(MX<0?q-.05:l+.05,p):pw(p,l+.05),[ux,uz]=ax=='x'?TR(ro,1,0):TR(ro,0,1),c=ax=='x'?pw(o.c,p):pw(p,o.c);
    DR.push({x:c[0],z:c[1],al:Math.abs(ux)>.5,y:o.b,w:o.w-.1,hx:hl[0],hz:hl[1],ax:ux,az:uz,col:o.col||h.dc});
    const dc=tc??0xe9e4d6;[1,-1].forEach(sg=>{const f=sg>0?[t/2,t/2+.05]:[-t/2-.05,-t/2];P2(ax,p,l-.12,l,o.b,o.t+.12,...f,dc,'p',1);P2(ax,p,q,q+.12,o.b,o.t+.12,...f,dc,'p',1);P2(ax,p,l-.12,q+.12,o.t,o.t+.12,...f,dc,'p',1)})}};
  const win=(c,b,w,hh)=>({c,w:w||h.ww||1.3,b,t:b+(hh||1.3),k:'win'}),door=(c,y,col)=>({c,w:1.3,b:y,t:y+2.4,k:'door',col});
  const dx=h.st=='crypt'||h.st=='church'?0:h.st=='shop'?hw-2:Math.min(hw-2.3,hw*.5),up=NS>1||h.acc,lane=[hd-th-1.7,hd-th],sx0=-hw+th+.1,ss0=sx0+1.4,zp=hd-th-1.7-1.7,ex=hw-th,ez=hd-th;
  // ---- openings per wall ----
  const fr0=[],bk=[],lf=[],rt=[];
  for(let s=0;s<NS;s++){const y=F+FH*s+.95;
   if(s==0){fr0.push(door(dx,F));if(h.shopwin){fr0.push({c:-hw/2-.4,w:hw-.6,b:F+.5,t:F+2.8,k:'win',big:1})}else if(h.biz&&!h.ff&&dx-1.15+hw-.9>1.4){const a=-hw+.9,b2=dx-1.15;fr0.push({c:(a+b2)/2,w:b2-a,b:F+.45,t:F+2.55,k:'win',big:1})}else if(h.win!==0&&!h.hiwin)for(let x=-hw+1.8;x<dx-1.7;x+=3)fr0.push(win(x,y))}
   else{const n0=fr0.length;for(let x=-hw+2;x<=hw-1.9;x+=Math.max(3,(W-4)/2))fr0.push(win(x,y));if(s==1&&h.balc&&h.balcX==null){const i=fr0.findIndex((o,j)=>j>=n0&&Math.abs(o.c)+1.6<hw);if(i>=0){h.balcX=fr0[i].c;fr0[i]=door(fr0[i].c,F+FH)}}}
   if(h.st=='church'){for(let z=-hd+4;z<hd-2;z+=3.6){lf.push(win(z,F+1.6,1.1,3.2));rt.push(win(z,F+1.6,1.1,3.2))}bk.push(win(0,F+2,1.6,3))}
   else if(h.win!==0&&!h.hiwin){lf.push(win(-hd+2.6,y));if(!(h.gar&&s==0))rt.push(win(-hd+2.6,y));
    if(s==0){if(W>12.5)bk.push(win(hw-4.4,y));if(W>11)bk.push(door(hw-1.8,F))}else bk.push(win(hw-2.4,y))}}
  if(h.hiwin){for(let x=-hw+3;x<hw-2;x+=4){fr0.push(win(x,F+FH-1.6,2.4,1));bk.push(win(x,F+FH-1.6,2.4,1))}bk.push(door(hw-2,F));lf.push(door(0,F))}
  // ---- exterior walls (per storey materials), interior lining ----
  const ext=(ax,p,a0,a1,n,ops,l0,l1)=>{for(let s=0;s<NS;s++){const y0=s==0?G-.3:F+FH*s,y1=s==NS-1?top:F+FH*(s+1),u=s>0&&h.wt2;wall(ax,p,a0,a1,y0,y1,th,u?h.wc2:h.wc,u?h.wt2:h.wt,ops,0)}
   ops.forEach(o=>feat(ax,p,o,n));wall(ax,p-n*(th/2+.025),l0,l1,F,R-.3,.04,h.lc,lt,ops.map(o=>Object.assign({},o,{k:'gap',w:o.w+.1,b:o.b-.05,t:o.t+.05})),1)};
  ext('x',-hd+th/2,-hw,hw,-1,fr0,-ex,ex);ext('x',hd-th/2,-hw,hw,1,bk,-ex,ex);ext('z',-hw+th/2,-hd+th,hd-th,-1,lf,-ez,ez);ext('z',hw-th/2,-hd+th,hd-th,1,rt,-ez,ez);
  if(tc!=null&&h.st!='adobe'&&h.st!='ware')[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([i,j])=>box(i*hw-(i>0?.12:.06),j*hd-(j>0?.12:.06),i*hw+(i>0?.06:.12),j*hd+(j>0?.06:.12),F+.2,top-.01,tc,'p',1));
  if(h.st!='ware'){const fc=h.st=='sub'||h.st=='cabin'?0x8f8a84:0xa89a86;box(-hw-.06,-hd-.06,hw+.06,-hd,G-.4,F+.2,fc,'s',1);box(-hw-.06,hd,hw+.06,hd+.06,G-.4,F+.2,fc,'s',1);box(-hw-.06,-hd,-hw,hd,G-.4,F+.2,fc,'s',1);box(hw,-hd,hw+.06,hd,G-.4,F+.2,fc,'s',1)}
  // ---- floors, basement, stairs ----
  const slab=(y0,y1,col,ty,vis,hole,x0,z0,x1,z1)=>{x0=x0??-hw+.03;z0=z0??-hd+.03;x1=x1??hw-.03;z1=z1??hd-.03;if(!hole)return box(x0,z0,x1,z1,y0,y1,col,ty,vis);const[a,b,c,d]=hole;
   box(x0,z0,a,z1,y0,y1,col,ty,vis);box(c,z0,x1,z1,y0,y1,col,ty,vis);box(a,z0,c,b,y0,y1,col,ty,vis);box(a,d,c,z1,y0,y1,col,ty,vis)};
  const Bf=G-3;let bh=null,nB=0,rB=0;if(h.B){const x0b=h.B[0]+1.5;nB=Math.ceil((F-Bf)/.42);rB=(F-Bf)/nB;bh=[x0b,h.B[1]+.3,x0b+nB*.6,h.B[1]+2.5]}
  slab(h.B?F-.35:G-.9,F-.02,h.B?0xe8e6e0:0xa9a49c,h.B?'C':'c',0,bh);
  const flr=h.flr||'k',sp=h.part!==0&&h.part!=='office'&&(h.gl?h.gl!='open':true)&&zp>-hd+3&&W>9;
  if(sp){slab(F-.02,F,h.fl,'k',1,bh,-ex,-ez,ex,zp);slab(F-.02,F,0xe9e5dc,flr=='k'?'i':flr,1,null,-ex,zp,ex,ez)}else slab(F-.02,F,h.fl,flr,1,bh,-ex,-ez,ex,ez);
  let uh=null;const nU=up?Math.ceil(((NS>1?F+FH:R)-F)/.42):0;
  if(up){const y1=NS>1?F+FH:R,rs=(y1-F)/nU;for(let k=1;k<=nU;k++)box(ss0+(k-1)*run,lane[0],ss0+k*run,lane[1],F-.05,F+rs*k,h.fl,'k');uh=[sx0,lane[0]-.5,ss0+nU*run,lane[1]]}
  for(let s=1;s<NS;s++){const y=F+FH*s;slab(y-.32,y-.02,0xf4f2ec,'C',0,s==1?uh:null);slab(y-.02,y,h.cp||h.fl,h.cp?'q':'k',1,s==1?uh:null,-ex,-ez,ex,ez)}
  if(flat){slab(R-.3,R,h.rc,'c',0,h.acc?uh:null);if(h.acc){box(sx0,lane[0]-.6,ss0+nU*run-.8,lane[0]-.52,R,R+1,tc??0x6b4423,'p');box(sx0,lane[0]-.6,sx0+.08,lane[1],R,R+1,tc??0x6b4423,'p')}}
  else box(-hw+.03,-hd+.03,hw-.03,hd-.03,R-.3,R-.01,0xf4f2ec,'C');
  if(h.B){const[bx0,bz0,bx1,bz1]=h.B,bc=0xb3aea6;box(bx0,bz0,bx1,bz0+.3,Bf-.6,F-.35,bc,'c');box(bx0,bz1-.3,bx1,bz1,Bf-.6,F-.35,bc,'c');box(bx0,bz0+.3,bx0+.3,bz1-.3,Bf-.6,F-.35,bc,'c');box(bx1-.3,bz0+.3,bx1,bz1-.3,Bf-.6,F-.35,bc,'c');
   box(bx0+.3,bz0+.3,bx1-.3,bz1-.3,Bf-.3,Bf+.02,0x8f8b85,'c',1);const[x0b,l0,x1b,l1]=bh;for(let k=1;k<=nB;k++)box(x0b+(k-1)*.6,l0,x0b+k*.6,l1-.5,Bf-.05,Bf+rB*k,0x7a5a3a,'k');
   const rc2=tc??0x6b4423;box(x0b,l1+.02,x1b-.8,l1+.1,F,F+1,rc2,'p');box(x0b-.1,l0,x0b-.02,l1+.1,F,F+1,rc2,'p');
   }
  if(h.B){const ac=0xc9c5bc,o=1.8;box(-hw-o,-hd-o,hw+o,-hd,G-3.2,G+.02,ac,'c');box(-hw-o,hd,hw+o,hd+o,G-3.2,G+.02,ac,'c');box(-hw-o,-hd,-hw,hd,G-3.2,G+.02,ac,'c');box(hw,-hd,hw+o,hd,G-3.2,G+.02,ac,'c')}
  // ---- interior walls, rooms and furniture ----
  {const RS0=RG;RG=rng(((T.seed*131+Math.round(cx*7.3)*977+Math.round(cz*3.1)*31)>>>0)||1);const xe=up?ss0+nU*run:sx0,lc=(lane[0]+lane[1])/2,OPS=[],PW=[],FLS=[];
   const addO=(ax,p,L)=>L.forEach(o=>OPS.push(Object.assign({ax,p},o)));addO('x',-hd+th/2,fr0);addO('x',hd-th/2,bk);addO('z',-hw+th/2,lf);addO('z',hw-th/2,rt);
   const fl=(y,ch,o)=>{const f=Object.assign({y,ch,rooms:[],keep:[],tg:[],blk:[],holes:[],wl:[],bx:[-ex,-ez,ex,ez]},o||{});FLS.push(f);return f};
   const part=(f,ax,p,a0,a1,y0,y1,doors,wins,col,ty)=>{const ops=doors.map(c=>door(c,y0)).concat(wins||[]);wall(ax,p,a0,a1,y0,y1,.14,col??h.lc,ty||lt,ops,0);ops.forEach(o=>{feat(ax,p,o,0,.14);OPS.push(Object.assign({ax,p},o))});
    const xs=[a0];ops.filter(o=>o.k=='door').forEach(o=>xs.push(o.c-o.w/2,o.c+o.w/2));xs.push(a1);xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2){const u0=xs[i],u1=xs[i+1];if(u1-u0>.01)f.wl.push(ax=='x'?[u0,p-.07,u1,p+.07]:[p-.07,u0,p+.07,u1])}
    ops.filter(o=>o.k=='door').forEach(o=>{if(ax=='x'){f.keep.push([o.c-.8,p-1.45,o.c+.8,p+1.45]);f.tg.push([o.c,p-.75],[o.c,p+.75])}else{f.keep.push([p-1.45,o.c-.8,p+1.45,o.c+.8]);f.tg.push([p-.75,o.c],[p+.75,o.c])}})};
   // rect list: [x0,z0,x1,z1,{open sides}] in wall-face coordinates, inset where there is a wall
   const RM=(f,role,L)=>{const rm={role,rects:L.map(([x0,z0,x1,z1,op])=>{op=op||{};return{x0:x0+(op.W?0:.08),z0:z0+(op.S?0:.08),x1:x1-(op.E?0:.08),z1:z1-(op.N?0:.08),op}})};f.rooms.push(rm);return rm};
   const winsAt=(L,y0,y1)=>L.filter(o=>o.k=='win'&&o.b>=y0-.05&&o.b<y1);
   const freeOf=(L,v,m)=>L.every(o=>v<o.c-o.w/2-m||v>o.c+o.w/2+m);
   const home=!h.biz&&['sub','villa','adobe','cabin','west'].includes(h.st)&&h.st!=='church';
   const ps=h.ps||(T.grave&&home?'abandoned':home?pick(PERS):null),PAL=mkPal(h,ps),K={P:PAL,ps,h};h.ps=ps;
   const g0=fl(F,NS>1?F+FH-.32:R-.3);
   // doors to outside and stairs on the ground floor
   g0.tg.push([dx,-ez+.6]);g0.keep.push([dx-.8,-ez-.1,dx+.8,-ez+1.5]);
   bk.filter(o=>o.k=='door'&&o.b<F+.1).forEach(o=>{g0.tg.push([o.c,ez-.6]);g0.keep.push([o.c-.8,ez-1.5,o.c+.8,ez+.1])});
   lf.filter(o=>o.k=='door'&&o.b<F+.1).forEach(o=>{g0.tg.push([-ex+.6,o.c]);g0.keep.push([-ex-.1,o.c-.8,-ex+1.5,o.c+.8])});
   rt.filter(o=>o.k=='door'&&o.b<F+.1).forEach(o=>{g0.tg.push([ex-.6,o.c]);g0.keep.push([ex-1.5,o.c-.8,ex+.1,o.c+.8])});
   if(up){g0.tg.push([sx0+.6,lc]);g0.keep.push([sx0-.15,lane[0]-1.6,ss0+.5,lane[1]+.1]);g0.blk.push([ss0,lane[0]-.02,xe,lane[1]+.02])}
   if(h.B){const[x0b,l0,x1b,l1]=bh;g0.blk.push([x0b-.15,l0-.1,x1b,l1+.15]);g0.holes.push([x0b,l0,x1b,l1]);g0.tg.push([x1b+.8,(l0+l1-.5)/2]);g0.keep.push([x1b-.2,l0-.2,x1b+1.7,l1+.2])}
   if(h.B&&h.bdoor&&!h.biz){const[x0b,l0,x1b,l1]=bh,lb=(l0+l1-.5)/2;if(x1b+.3<dx-.95||x0b-.35>dx+.95){part(g0,'x',l1+.17,x0b-.25,x1b+.19,F,g0.ch,[]);part(g0,'z',x0b-.18,-ez,l1+.1,F,g0.ch,[]);part(g0,'z',x1b+.12,-ez,l1+.24,F,g0.ch,[lb]);g0.blk.push([x0b-.3,-ez,x1b+.2,l1+.25])}}
   // ground floor layout
   const gw=winsAt(fr0,F,F+FH),gl=winsAt(lf,F,F+FH);let xs=null;
   if(h.side&&home&&W>=10&&zp>-hd+3.2){for(let x=-ex+3.4;x<=-ex+4.81;x+=.2)if(freeOf(gw,x,.2)&&x<dx-1.75){xs=x;break}if(xs!=null&&!sp&&!freeOf(gl,zp,.2))xs=null;if(xs!=null&&h.B&&xs>bh[0]-.6&&xs<bh[2]+1.9)xs=null}
   let xm=null;if(h.gl=='rooms'&&home&&sp&&!h.B&&W>=12.5&&zp>-hd+3.2){xs=null;for(let x=-ex+3.8;x<=-ex+4.81&&xm==null;x+=.2){if(!freeOf(gw,x,.2))continue;for(let m=x+3.2;m<=x+3.8;m+=.2)if(freeOf(gw,m,.2)&&m<dx-1.75&&(x+m)/2+1.5<hw-2.6){xs=x;xm=m;break}}}
   const roles=[];
   if(h.part=='office'){part(g0,'x',-1,-ex,-hw+7,F,F+3,[-hw+5],[win(-hw+2.5,F+1)],0xd9dcde,'d');part(g0,'z',-hw+7,-1,ez,F,F+3,[],[],0xd9dcde,'d');
    roles.push([RM(g0,'w_office',[[-ex,-1+.07,-hw+7-.07,ez]]),'w_office'],[RM(g0,'ware',[[-hw+7+.07,-ez,ex,ez,{W:1}],[-ex,-ez,-hw+7+.07,-1-.07,{E:1,N:1}]]),'ware'])}
   else if(sp&&xm!=null){part(g0,'x',zp,-ex,ex,F,F+FH-.32,[hw-2.6,xs-.75,(xs+xm)/2]);part(g0,'z',xs,-ez,zp-.07,F,F+FH-.32,[]);part(g0,'z',xm,-ez,zp-.07,F,F+FH-.32,[]);
    roles.push([RM(g0,'side',[[-ex,-ez,xs-.07,zp-.07]]),'side'],[RM(g0,'side2',[[xs+.07,-ez,xm-.07,zp-.07]]),'side2'],[RM(g0,'front',[[xm+.07,-ez,ex,zp-.07]]),'front'],[RM(g0,'back',[[-ex,zp+.07,ex,ez]]),'back'])}
   else if(sp){part(g0,'x',zp,-ex,ex,F,F+FH-.32,[hw-2.6]);
    if(xs!=null){part(g0,'z',xs,-ez,zp-.07,F,F+FH-.32,[zp-.95]);roles.push([RM(g0,'side',[[-ex,-ez,xs-.07,zp-.07]]),'side'],[RM(g0,'front',[[xs+.07,-ez,ex,zp-.07]]),'front'])}
    else roles.push([RM(g0,'front',[[-ex,-ez,ex,zp-.07]]),'front']);
    roles.push([RM(g0,'back',[[-ex,zp+.07,ex,ez]]),'back'])}
   else{if(xs!=null){part(g0,'z',xs,-ez,zp+.07,F,F+FH-.32,[zp-.95]);part(g0,'x',zp,-ex,xs-.07,F,F+FH-.32,[]);roles.push([RM(g0,'side',[[-ex,-ez,xs-.07,zp-.07]]),'side'],[RM(g0,'open',[[xs+.07,-ez,ex,ez,{W:1}],[-ex,zp+.07,xs+.07,ez,{E:1}]]),'open'])}
    else roles.push([RM(g0,'open',[[-ex,-ez,ex,ez]]),'open'])}
   // upper floor
   let u1=null;
   if(NS>1){const y=F+FH;u1=fl(y,NS>2?F+2*FH-.32:R-.3);u1.tg.push([xe+.7,lc]);u1.keep.push([xe-.1,lane[0]-.55,xe+1.6,lane[1]+.1]);u1.blk.push([sx0-.15,lane[0]-.62,xe,lane[1]+.1]);u1.holes.push(uh);
    fr0.filter(o=>o.k=='door'&&o.b>y-.1&&o.b<y+.1).forEach(o=>{u1.tg.push([o.c,-ez+.6]);u1.keep.push([o.c-.8,-ez-.1,o.c+.8,-ez+1.5])});
    if(h.part!==0&&h.part!=='office'){const zq=lane[0]-.57,xp=xe+2.4,hasB=ex-xp>2.6,yt=u1.ch;part(u1,'x',zq,-ex,ex,y,yt,hasB?[xe+.85,xp+1.5]:[xe+.85]);if(hasB)part(u1,'z',xp,-ez,zq-.07,y,yt,[]);
     const xA=hasB?xp-.07:ex;let xa=null;if(h.split){const uw=winsAt(fr0,y,y+FH);for(let x=-ex+2.6;x<=Math.min(xe-.15,xA-2.9);x+=.2)if(freeOf(uw,x,.2)){xa=x;break}}
     if(xa!=null){part(u1,'z',xa,-ez,zq-.07,y,yt,[zq-.95]);roles.push([RM(u1,'a1',[[-ex,-ez,xa-.07,zq-.07]]),'a1'],[RM(u1,'a',[[xa+.07,-ez,xA,zq-.07]]),'a'])}else roles.push([RM(u1,'a',[[-ex,-ez,xA,zq-.07]]),'a']);
     if(hasB)roles.push([RM(u1,'b',[[xp+.07,-ez,ex,zq-.07]]),'b']);roles.push([RM(u1,'hall',[[xe,zq+.07,ex,ez,{W:1}]]),'hall'])}
    else roles.push([RM(u1,'loft',[[-ex,-ez,ex,lane[0]-.62,{N:1}],[xe+.02,lane[0]-.62,ex,ez,{S:1,W:1}]]),'loft'])}
   // roof: terrace when there are stairs up to it, otherwise a few units
   if(flat&&!h.ff&&h.st!='church'){const rf=fl(R,R+3,{});if(h.acc){rf.tg.push([xe+.7,lc]);rf.keep.push([xe-.1,lane[0]-.55,xe+1.6,lane[1]+.1]);rf.blk.push([sx0-.15,lane[0]-.62,xe,lane[1]+.1]);rf.holes.push(uh);
     roles.push([RM(rf,'roof',[[-ex,-ez,ex,lane[0]-.62,{N:1}],[xe+.02,lane[0]-.62,ex,ez,{S:1,W:1}]]),'roof'])}else roles.push([RM(rf,'roofU',[[-ex,-ez,ex,ez]]),'roofU'])}
   // basement
   if(h.B){const[bx0,bz0,bx1,bz1]=h.B,[x0b,l0,x1b,l1]=bh,lb=(l0+l1-.5)/2,bf=fl(Bf+.02,F-.35,{bx:[bx0+.3,bz0+.3,bx1-.3,bz1-.3],xx:1});bf.tg.push([x0b-.7,lb]);bf.keep.push([bx0+.3,bz0+.3,x0b+.05,lb+2.5]);bf.blk.push([x0b,l0-.05,x1b+.05,l1+.05]);
    roles.push([RM(bf,'bsm',[[bx0+.3,bz0+.3,bx1-.3,bz1-.3]]),'bsm'])}
   // ---- decide what every room is ----
   const st=h.st,biz=h.biz||h.bz||(st=='shop'?'conv':null),rl=new Map();
   const pref={family:['kids','kids','nursery','bath','study'],couple:['bath','study','gym','art','storage'],student:['game','bath','music'],elderly:['bath','study','storage','laundry'],gamer:['game','bath'],artist:['art','bath'],musician:['music','bath'],
    fitness:['gym','bath'],bookworm:['study','bath'],pets:['bath','study'],moving:['storage','bath'],reno:['reno','bath'],prepper:['storage','bath'],party:['game','bath'],collector:['study','bath'],abandoned:['abandoned']};
   const by=k=>roles.filter(q=>q[1]==k).map(q=>q[0]);
   if(st=='ware'){const wv=h.wv||(T.town=='lunar'?WVQ('lunar',['lab','hydro','dorm','mess','command']):T.town=='harbor'?WVQ('harb',['fish','storage','shipyard','factory']):WVQ('ware',['storage','garage','factory','storage','gymhall','market']));by('ware').forEach(m=>rl.set(m,['ware',wv]));by('w_office').forEach(m=>rl.set(m,['ware','office']))}
   else if(st=='keep'){const kd=h.kd||(T.town=='ruins'?'ruin':T.town=='castle'?'castle':'fort');const R0=kd=='ruin'?['ruin','ruin','ruin']:kd=='castle'?['hall','lord','library','armory']:['armory','barracks','storage','armory'];
    by('front').concat(by('open')).forEach(m=>rl.set(m,['o',R0[0]]));by('back').forEach(m=>rl.set(m,['o',kd=='ruin'?'ruin':'armory']));by('a').forEach(m=>rl.set(m,['o',R0[1]]));by('a1').forEach(m=>rl.set(m,['o',R0[2]]));by('b').forEach(m=>rl.set(m,['o',R0[3]]))}
   else if(st=='barn')roles.forEach(([m])=>rl.set(m,['o','barn']));
   else if(h.shack)roles.forEach(([m])=>rl.set(m,['o','shack']));
   else if(st=='office'){const rg=h.rg||'lobby',ru=h.ru||'offices';by('front').concat(by('open')).forEach(m=>rl.set(m,rg=='lobby'?['o','lobby']:['ware',rg]));by('back').forEach(m=>rl.set(m,['o','breakroom']));by('a').concat(by('a1')).forEach(m=>rl.set(m,ru=='offices'?['o','offices']:['ware',ru]));by('b').forEach(m=>rl.set(m,['o','meeting']))}
   else if(biz){const B2=h.rg?['o',h.rg]:BIZ[biz]?['b',biz]:['b','conv'];by('front').concat(by('open')).forEach(m=>rl.set(m,B2));by('back').forEach(m=>rl.set(m,['r',['bar','saloon','tavern','tiki','diner','cafe','pizza','bakery','ramen'].includes(biz)?'kitchenette':'storage']));
    const up2=by('a').concat(by('a1'),by('b'));if(biz=='hotel')up2.forEach(m=>rl.set(m,['r','bed']));else{up2.forEach((m,i)=>rl.set(m,['r',i==0?'studio':pick(['bath','storage','study'])]))}by('loft').forEach(m=>rl.set(m,['r','loft']))}
   else if(home){const ab=ps=='abandoned';by('front').forEach(m=>rl.set(m,['r',ab?'abandoned':xm!=null?'open':area(m)<12&&NS==1&&xs==null?'studio':'living']));by('open').forEach(m=>rl.set(m,['r',ab?'abandoned':area(m)<16&&NS==1&&xs==null?'studio':'open']));
    by('back').forEach(m=>{const R=m.rects[0];rl.set(m,['r',ab?'abandoned':xm!=null?'hall':(R.z1-R.z0)<3.8||up?'kitchenette':'kitchen'])});
    by('side2').forEach(m=>rl.set(m,['r',ab?'abandoned':NS==1?pick(['bed','bath','study',ps=='family'?'kids':'bed']):pick(['study','bath','laundry','bed'])]));
    by('side').forEach(m=>rl.set(m,['r',ab?'abandoned':NS==1?(ps=='family'&&r()<.5?'kids':'bed'):pick(pref[ps]||['study']).replace('kids','study').replace('nursery','study')]));
    const ups=by('a').concat(by('a1'),by('b')).sort((p,q)=>area(q)-area(p));ups.forEach((m,i)=>rl.set(m,['r',ab?'abandoned':i==0?'bed':pick(pref[ps]||['study','bath'])]));by('loft').forEach(m=>rl.set(m,['r',ab?'abandoned':'loft']))}
   by('hall').forEach(m=>rl.set(m,['r','hall']));by('roof').forEach(m=>rl.set(m,['r','roof']));by('roofU').forEach(m=>rl.set(m,['r','roofU']));
   by('bsm').forEach(m=>rl.set(m,['r','bsm']));K.bt=h.bt||(ps=='prepper'?'bunker':ps=='musician'?'band':ps=='fitness'?'gym':ps=='gamer'||ps=='party'?'rec':biz?'store':pick(['rec','rec','shop','store','laundry','theater','cellar']));
   // ---- furnish floor by floor ----
   FUR=1;if(!lite)FLS.forEach(f=>{if(!f.rooms.length)return;const FF=mkFloor({put:(...a)=>{FUR=FF.dk?2:1;box(...a)},wall:(ax,p,a0,a1,y0,y1,t,c,ty,ops)=>{FUR=2;wall(ax,p,a0,a1,y0,y1,t,c,ty,ops,1)},bx:f.bx,y:f.y,ch:f.ch,keep:f.keep,tg:f.tg,blk:f.blk,wl:f.wl,holes:f.holes,ops:OPS,ex:f.xx?999:ex,ez:f.xx?999:ez});
    f.rooms.forEach(rm=>{const[kind,name]=rl.get(rm)||['r','storage'],k=RK(FF,rm,K);if(rm.rects.some(R=>R.x1-R.x0<.6||R.z1-R.z0<.6))return;
     FF.cur=rm;rm.rn=name;FF.messy=k.messy;FF.home=kind=='r';FF.cnt=new Map();FF.cap=FF.home?(g=>g=='bookshelf'&&(name=='study'||ps=='bookworm')?2:g=='cbox'||g=='crate'?99:g=='bed'&&name!='kids'?1:HCAP[g]??2):(g=>OCAP[g]??99);const n0=FF.occ.length,fn=kind=='b'?BIZ[name]:kind=='ware'?WARE[name]:kind=='o'?(OTHER[name]||ROOM[name]):ROOM[name];(fn||ROOM.storage)(k);if(kind=='r'&&ps!='abandoned')fillRoom(k,name,n0);else if(kind=='b'&&name!='haunted')fillBiz(k,name,n0);else if(kind=='ware')fillWare(k,name,n0);else if(kind=='o'&&OFILL[name])fillWith(k,n0,OFILL[name],name=='ruin'?.15:.2,OFREE[name]||0);if(!rm.nowall||rm.ft)FF.finish(rm)})});FUR=0;RG=RS0}
  if(h.st=='church'){for(let z=-hd+3.5;z<hd-4;z+=1.7){box(-ex+.4,z,-.9,z+.5,F,F+.5,0x5a3a22,'k');box(.9,z,ex-.4,z+.5,F,F+.5,0x5a3a22,'k')}box(-1.4,hd-2.6,1.4,hd-1.4,F,F+1.1,0xd8d2c4,'s');
   box(-1.9,-hd,1.9,-hd+3.8,R-.3,R+rise+4,h.wc,'s',1);D.push(['pyr',...pw(0,-hd+1.9),R+rise+4,4.2,4.8,h.rc,'s'])}
  if(h.st=='crypt'){box(-.6,-.6,.6,1.6,F,F+.9,0x9aa0a4,'s');box(-1.6,-hd-.55,-1.05,-hd,G-.3,R,h.wc,'s');box(1.05,-hd-.55,1.6,-hd,G-.3,R,h.wc,'s')}
  if(h.st=='shop')box(-hw-.1,-hd-.35,hw+.1,-hd-.05,R-.9,R-.1,0xc23b2f,'p',1);
  // ---- roof ----
  if(!flat){const g2=NS>1&&h.wt2;D.push(['roof',cx,cz,R,W+.9,Dp+.9,rise,ro%2==0?'x':'z',h.rc,h.rt,g2?h.wc2:h.wc,g2?h.wt2:h.wt,W,Dp]);
   if(h.chim)box(-hw+.9,-.6,-hw+2,.4,R-.29,R+rise+.7,0x8a4a3a,'b',1)}
  if(h.ff){box(-hw-.12,-hd-.32,hw+.12,-hd+.02,top-.2,top+2.4,h.wc,h.wt);box(-hw/2,-hd-.4,hw/2,-hd-.32,top+.5,top+1.7,h.sgc||0xf2e6c8,'w',1)}
  if(h.stilt){const lo=Math.min(...[[-hw,-hd],[hw,-hd],[-hw,hd],[hw,hd]].map(([a,b])=>{const q=pw(a,b);return H(q[0],q[1])}));for(let a=-hw;a<=hw+.01;a+=hw)for(let b=-hd;b<=hd+.01;b+=hd){const ia=a<-.01?.18:a>.01?-.18:0,ib=b<-.01?.18:b>.01?-.18:0;box(a+ia-.18,b+ib-.18,a+ia+.18,b+ib+.18,lo-1.5,G-.9,0x5a4632,'w')}}
  else{box(-hw-.08,-hd-.08,hw+.08,hd+.08,top,top+.12,h.st=='adobe'?0xd8c8a8:0x8a8d90,'c',1);if(h.awn)box(dx-1.4,-hd-1.3,dx+1.4,-hd,F+2.55,F+2.68,pick([0xb8442e,0x2f6a7a,0xd9a23a]),'p')}
  // ---- outside: shop sign and awning, balcony, window boxes, AC unit, satellite dish, porch chairs ----
  if(h.biz&&!h.ff&&!h.porch&&h.st!='shop'){const sc=SIGN[biz0]||0x3a3f44,lc2=pick([WHT,0xf2d16b,0xf4f2ec]);box(-hw+.5,-hd-.2,hw-.5,-hd-.04,F+2.78,F+3.2,sc,'p',1);
   let x=-hw+1.2;while(x<hw-1.4){const w2=fr(.14,.24);box(x,-hd-.23,x+w2,-hd-.2,F+2.86,F+3.12,lc2,'p',1);x+=w2+fr(.06,.14)}
   const sw=fr0.find(o=>o.big);if(sw){const a=sw.c-sw.w/2-.1,b2=sw.c+sw.w/2+.1,c1=pick(FP.br),c2=pick([WHT,0xf4f2ec,0x2b2b2b]);let i=0;for(let x=a;x<b2-.01;x+=.45,i++)box(x,-hd-1.2,Math.min(b2,x+.45),-hd-.02,F+2.58,F+2.66,i%2?c1:c2,'p',1);box(a,-hd-1.26,b2,-hd-1.2,F+2.4,F+2.66,c1,'p',1)}}
  if(h.balcX!=null){const c=h.balcX,y=F+FH,bc=tc??0xf2f2ea;box(c-1.5,-hd-1.3,c+1.5,-hd,y-.18,y,0xd8d4cc,'c');box(c-1.5,-hd-1.3,c+1.5,-hd-1.22,y,y+1,0,'n');box(c-1.5,-hd-1.22,c-1.42,-hd,y,y+1,0,'n');box(c+1.42,-hd-1.22,c+1.5,-hd,y,y+1,0,'n');
   box(c-1.5,-hd-1.3,c+1.5,-hd-1.22,y+.92,y+1,bc,'p',1);box(c-1.5,-hd-1.22,c-1.42,-hd,y+.92,y+1,bc,'p',1);box(c+1.42,-hd-1.22,c+1.5,-hd,y+.92,y+1,bc,'p',1);
   for(let x=c-1.46;x<c+1.44;x+=.2)box(x,-hd-1.28,x+.05,-hd-1.24,y,y+.92,bc,'p',1);for(let z=-hd-1.1;z<-hd-.05;z+=.2){box(c-1.48,z,c-1.44,z+.05,y,y+.92,bc,'p',1);box(c+1.44,z,c+1.48,z+.05,y,y+.92,bc,'p',1)}
   [c-1.2,c+1.2].forEach(x=>box(x-.06,-hd-1.0,x+.06,-hd,y-.5,y-.18,bc,'p',1));if(r()<.7){box(c+.6,-hd-1.1,c+1.3,-hd-.5,y,y+.45,0x8a8f94,'m',1);box(c-1.3,-hd-1.0,c-.8,-hd-.5,y,y+.4,0xc8704a,'p',1);box(c-1.25,-hd-.95,c-.85,-hd-.55,y+.4,y+.8,pick(GRN),'q',1)}}
  if(h.flb&&!biz0)fr0.filter(o=>o.k=='win'&&o.b<F+FH&&!o.big).forEach(o=>{const a=o.c-o.w/2-.05,b2=o.c+o.w/2+.05;box(a,-hd-.38,b2,-hd-.02,o.b-.42,o.b-.18,pick([0x8a5a3a,WHT,0x3a5a3a]),'w',1);
   for(let x=a+.05;x<b2-.1;x+=.16)box(x,-hd-.34,x+.12,-hd-.2,o.b-.18,o.b+fr(.02,.12),pick(FP.br.concat(GRN)),'q',1)});
  if(h.ac&&!h.stilt&&!lf.some(o=>o.k=='door')){const z=hd-1.6;box(-hw-.75,z-.45,-hw-.05,z+.45,G-.05,G+.7,0xd8d8d4,'m');box(-hw-.77,z-.35,-hw-.75,z+.35,G+.08,G+.6,0x8a8f94,'m',1);box(-hw-.05,z-.05,-hw,z+.05,G+.5,G+1.2,0x8a8f94,'m',1)}
  if(h.dish){const z=-hd+1.4,y=R-.7;box(-hw-.3,z-.04,-hw,z+.04,y,y+.08,0x8a8f94,'m',1);box(-hw-.36,z-.3,-hw-.3,z+.3,y-.25,y+.35,0xe8e8e4,'p',1);box(-hw-.6,z-.03,-hw-.36,z+.03,y+.02,y+.06,0x8a8f94,'m',1)}
  if(h.porch&&h.pf&&!biz0&&h.st!='church'){const y=F,pz=-hd-1.05,c=pick([WHT,0x6b4423,0x2f6a5a,0x8a8f94,0x3a2a1e]);
   const ch2=x=>{box(x,pz,x+.55,pz+.55,y,y+.95,0,'n');box(x,pz,x+.55,pz+.55,y+.4,y+.46,c,'k',1);box(x,pz+.49,x+.55,pz+.55,y+.46,y+.95,c,'k',1);[[0,0],[.49,0],[0,.49],[.49,.49]].forEach(([a,b2])=>box(x+a,pz+b2,x+a+.06,pz+b2+.06,y,y+.4,c,'k',1))};
   if(r()<.6){ch2(dx-1.78);ch2(dx+1.2)}else{const x0=dx+.95;box(x0,pz+.05,x0+.85,pz+.5,y,y+.9,0,'n');box(x0,pz+.05,x0+.85,pz+.45,y+.38,y+.44,c,'k',1);box(x0,pz+.44,x0+.85,pz+.5,y+.44,y+.9,c,'k',1);box(x0,pz+.05,x0+.06,pz+.45,y,y+.38,c,'k',1);box(x0+.79,pz+.05,x0+.85,pz+.45,y,y+.38,c,'k',1)}
   if(r()<.6){box(dx-1.6,-hd-2.1,dx-1.2,-hd-1.7,y,y+.38,0xc8704a,'p',1);box(dx-1.62,-hd-2.12,dx-1.18,-hd-1.68,y+.38,y+.75,pick(GRN),'q',1)}}
  // ---- porch, garage, yard ----
  if(h.porch){const px0=dx-2,px1=dx+2,pz0=-hd-2.4,pc=tc??0xf2f2ea;box(px0,pz0,px1,-hd,G-.6,F-.02,0x9c7a56,'k');box(px0+.15,pz0+.1,px0+.33,pz0+.28,F,F+2.75,pc,'p');box(px1-.33,pz0+.1,px1-.15,pz0+.28,F,F+2.75,pc,'p');
   box(px0-.2,pz0-.2,px1+.2,-hd,F+2.75,F+2.92,h.rc,h.rt=='h'?'h':'t')}
  if(h.gar){const g0=hw,g1=hw+6.5,z1=hd-1.5;box(g0,-hd,g1,z1,G-.5,F+2.6,h.wc,h.wt);box(g0+.6,-hd-.06,g1-.6,-hd,G,G+2.5,0xf2f0ea,'y',1);box(g0+.45,-hd-.08,g1-.45,-hd,G+2.5,G+2.62,tc??0xf2f2ea,'p',1);
   D.push(['roof',...pw(hw+3.25,(z1-hd)/2),F+2.6,z1+hd+.7,7.2,1.7,ro%2==0?'z':'x',h.rc,h.rt,h.wc,h.wt,z1+hd,6.5])}
  if(h.yard){const fz=-hd-h.yard+.5,gx1=hw+(h.gar?6.5:0);box(dx-.7,fz-.3,dx+.7,h.porch?-hd-2.4:-hd,G-.2,G+.05,0xc9c5bc,'u',1);
   if(h.gar){box(hw+.4,fz-1.4,gx1-.4,-hd,G-.2,G+.05,0xbdb9b0,'c',1);if(h.car){const c=pw(hw+3.25,-hd-h.yard/2);car(c[0],c[1],ro%2==1,pick([0xc23b2f,0x2f5d9a,0xe8e8e8,0x2b2b2b,0x3a7a4a,0xd9a82b,0x8a8f94]))}}
   if(h.fence){const gaps=[[dx-.95,dx+.95]];if(h.gar)gaps.push([hw+.2,gx1+.2]);const fen=(x0,x1)=>{if(x1-x0<.4)return;box(x0,fz-.05,x1,fz+.05,G-.1,G+1,0,'n');box(x0,fz-.03,x1,fz+.03,G+.3,G+.38,0xf4f4f0,'p',1);box(x0,fz-.03,x1,fz+.03,G+.75,G+.83,0xf4f4f0,'p',1);
     for(let t=x0+.1;t<x1-.05;t+=.3)D.push(['pk',...pw(t,fz),G])};let cur=-hw-1.2;gaps.forEach(g=>{fen(cur,g[0]);cur=g[1]});fen(cur,gx1+1.2)}
   box(dx+1.15,fz-.06,dx+1.27,fz+.06,G,G+1.05,0x5a4a3a,'w');box(dx+1.0,fz-.22,dx+1.42,fz+.22,G+1.05,G+1.35,pick([0x2b2b2b,0x2f5d9a,0xc23b2f]),'m',1);
   if(r()<.6){const c=pw(-hw-.6,-hd-h.yard*.55);if(clearAt(c[0],c[1],1.6,.9))tree(c[0],c[1],1)}}};
 const tree=(x,z,leafy)=>{const py=leafy?0:T.tree=='m'?r()<.45:T.tree=='p',[lo,hi]=fp(x,z,1.3,1.3),trh=py?6.5:7.5,sc=py?fr(.95,1.5):fr(.85,1.35);B.push([x,z,1.1,1.1,hi+trh,lo-.6,0x5a4028,'n']);D.push([py?'p':'l',x,hi+trh,z,sc,lo-.35])};
 const bush=(x,z)=>D.push(['b',x,H(x,z),z,r()<.2?fr(1.35,1.65):fr(.42,.66)]);
 const boulder=(x,z,w,hh,c)=>{const[lo]=fp(x,z,w*.8,w*.8);B.push([x,z,w*.8,w*.8,lo+hh*.9,lo-.6,c,'n']);D.push(['k',x,lo+hh*.42,z,w*.55,hh*.55,c,fr(0,6.28)])};
 const stall=(x,z,G,ax)=>{const y=G??H(x,z),c=pick([0xb8442e,0x2f6a7a,0xd9a23a,0x5a7a3a,0x8a3a6a]),[a,b]=ax?[2,1.3]:[1.3,2];[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([i,j])=>BX(x+i*a-.07,z+j*b-.07,x+i*a+.07,z+j*b+.07,y,y+2.6,0x6b4a2c,'w'));
  BX(x-a-.2,z-b-.2,x+a+.2,z+b+.2,y+2.6,y+2.75,c,'p');BX(x-a+.2,z-b+.2,x+a-.2,z+b-.2,y,y+.95,0x8a6a42,'w');for(let k=0;k<3;k++){const t=-1.45+k*1.1,c=pick([0xd9a23a,0xb8442e,0x5a9a3a,0xe8d090]);if(ax)BX(x+t,z-.4,x+t+.8,z+.4,y+.95,y+1.25,c,'p',1);else BX(x-.4,z+t,x+.4,z+t+.8,y+.95,y+1.25,c,'p',1)}};
 // ---- Pleasant Park extras: park + gazebo, soccer field, gas station, cars, lamps ----
 const ppExtras=()=>{const G=0;BX(-3.6,-3.6,3.6,3.6,G-.3,G+.4,0xf2f0ea,'k');[[-3.4,-3.4],[0,-3.4],[3.4,-3.4],[-3.4,0],[3.4,0],[-3.4,3.4],[0,3.4],[3.4,3.4]].forEach(([x,z])=>BX(x-.15,z-.15,x+.15,z+.15,G+.4,G+3.4,0xf4f4f0,'p'));
  [[-3.4,-3.4,-1,-3.4],[1,-3.4,3.4,-3.4],[-3.4,3.4,-1,3.4],[1,3.4,3.4,3.4]].forEach(([a,z,b])=>BX(a,z-.06,b,z+.06,G+.4,G+1.3,0xf4f4f0,'p'));[[-3.4,-3.4,-1],[-3.4,1,3.4],[3.4,-3.4,-1],[3.4,1,3.4]].forEach(([x,a,b])=>BX(x-.06,a,x+.06,b,G+.4,G+1.3,0xf4f4f0,'p'));
  BX(-3.7,-3.7,3.7,3.7,G+3.4,G+3.55,0xf4f4f0,'p');D.push(['pyr',0,G+3.55,0,9,2.4,0x55606b,'t']);
  [[-14,-14],[14,-14],[-14,14],[14,14],[-17,6],[17,-6],[6,17],[-6,-17],[-10,-19],[10,19]].forEach(([x,z])=>tree(x,z,1));
  [[-9,-1.9,1],[9,1.9,1],[-1.9,9,0],[1.9,-9,0]].forEach(([x,z,ax])=>{const[a,b]=ax?[1,.3]:[.3,1];BX(x-a,z-b,x+a,z+b,G,G+.45,0x6b4423,'k')});[[-6,-6],[6,6],[-6,6],[6,-6]].forEach(([x,z])=>BX(x-1.4,z-1.4,x+1.4,z+1.4,G,G+.35,0x5a3a22,'k'));
  [[-19.5,-19.5],[19.5,-19.5],[-19.5,19.5],[19.5,19.5],[-11,2],[11,-2]].forEach(([x,z])=>lamp(x,z,G));
  const fz0=-91,fz1=-37;for(let i=0;i<9;i++){const z0=fz0+i*6;BX(-16,z0,16,z0+6,G-.2,G+.04,i%2?0x5aa03a:0x66b044,'p',1)}
  const ln=(x0,z0,x1,z1)=>BX(x0,z0,x1,z1,G+.04,G+.06,0xf4f4f0,'p',1);ln(-15,fz0+1,15,fz0+1.15);ln(-15,fz1-1.15,15,fz1-1);ln(-15,fz0+1,-14.85,fz1-1);ln(14.85,fz0+1,15,fz1-1);ln(-15,-64.08,15,-63.92);
  ln(-6,fz0+1,-5.85,fz0+7);ln(5.85,fz0+1,6,fz0+7);ln(-6,fz0+7,6,fz0+7.15);ln(-6,fz1-7,-5.85,fz1-1);ln(5.85,fz1-7,6,fz1-1);ln(-6,fz1-7.15,6,fz1-7);ln(-2,-66,2,-62);
  [fz0+1,fz1-1].forEach((z,i)=>{const s=i?1:-1;BX(-3.75,z-.08,-3.55,z+.08,G,G+2.45,0xf4f4f0,'m');BX(3.55,z-.08,3.75,z+.08,G,G+2.45,0xf4f4f0,'m');BX(-3.75,z-.08,3.75,z+.08,G+2.3,G+2.45,0xf4f4f0,'m');BX(-3.6,z+s*1.4-.03,3.6,z+s*1.4+.03,G,G+2.3,0xdde4ea,'G',1)});
  for(let k=0;k<3;k++)BX(17+k*1.1,-78,18.2+k*1.1,-50,G,G+.5+k*.55,0x8a9096,'m');for(let k=0;k<3;k++)BX(17.2+k*1.1,-77.8,17.6+k*1.1,-50.2,G+.5+k*.55,G+.95+k*.55,[0x2f5d9a,0xc23b2f,0xf2c230][k],'p',1);
  BX(-20,31.2,20,51,G-.2,G+.05,0xb5b2ab,'c',1);[[-7,38],[7,38],[-7,48],[7,48]].forEach(([x,z])=>BX(x-.3,z-.3,x+.3,z+.3,G,G+4.6,0xf4f4f0,'p'));BX(-9.5,35.5,9.5,50.5,G+4.6,G+5.2,0xf4f4f0,'p');
  BX(-9.6,35.4,9.6,50.6,G+4.75,G+5.05,0xc23b2f,'p',1);[[-3.5,43],[3.5,43]].forEach(([x,z])=>{BX(x-1.4,z-.6,x+1.4,z+.6,G,G+.25,0x9a9a9a,'c');BX(x-.45,z-.3,x+.45,z+.3,G+.25,G+1.8,0xc23b2f,'m');BX(x-.4,z-.32,x+.4,z+.32,G+1.2,G+1.6,0xf4f4f0,'p',1)});
  BX(-17.15,31.85,-16.85,32.15,G,G+6,0x55595e,'m');BX(-18.2,31.8,-15.8,32.2,G+6,G+7.6,0xc23b2f,'p');
  for(let t=-96;t<=96;t+=24)[-26,26].forEach(c=>{if(Math.abs(t+26)>6&&Math.abs(t-26)>6)[[t,c-5.4],[c+5.4,t]].forEach(([x,z])=>{if(clearAt(x,z,.6,.15))lamp(x,z,G)})});
  const pc=[];for(let i=0;i<14;i++){const ax=r()<.5,c=pick([-26,26]),t=fr(-92,92);if(Math.abs(t-26)<9||Math.abs(t+26)<9)continue;const off=(r()<.5?-1:1)*2.3,px=ax?t:c+off,pz=ax?c+off:t;if(pc.some(q=>Math.hypot(q[0]-px,q[1]-pz)<7))continue;pc.push([px,pz]);car(px,pz,ax,pick([0xc23b2f,0x2f5d9a,0xe8e8e8,0x2b2b2b,0x3a7a4a,0xd9a82b]))}};
 const plaza=G=>{BX(-13,-13,13,13,G-.2,G+.05,0xd8cdb8,'u',1);BX(-2.6,-2.6,2.6,2.6,G,G+.7,0xe8dfcc,'s');BX(-2.2,-2.2,2.2,2.2,G+.7,G+.72,0x5aa0c8,'G',1);BX(-.5,-.5,.5,.5,G,G+2.6,0xe8dfcc,'s');
  [[-8,-8,1],[8,-8,0],[-8,8,0],[8,8,1]].forEach(([x,z,a])=>stall(x,z,G,a));[[-12,0],[12,0],[0,-12],[0,12]].forEach(([x,z])=>lamp(x,z,G))};
 // ================= Coral Key: everything that needs the finished terrain =================
 const isleBuild=()=>{const W0=KW,dk=0x9c7f5c,pk=0xa8885c,rope=0xc9b48a,stone=0xd6cbb3;
  const gAt=(x,z)=>H(x,z),lo4=(x0,z0,x1,z1)=>Math.min(H(x0,z0),H(x1,z0),H(x0,z1),H(x1,z1));
  const post=(x,z,y1,c,w)=>{w=w||.22;BX(x-w/2,z-w/2,x+w/2,z+w/2,Math.min(H(x,z),W0-3)-.4,y1,c||dk,'w')};
  // ---------- harbour: piers into the bay with ladders, moored boats ----------
  const boat=(x,z,ax,col)=>{const L=ax?[3.6,1.2]:[1.2,3.6],y=W0;BX(x-L[0],z-L[1],x+L[0],z+L[1],y-.7,y+.55,0xf4f2ec,'p');BX(x-L[0]-.02,z-L[1]-.02,x+L[0]+.02,z+L[1]+.02,y+.1,y+.35,col,'p',1);
   const c=ax?[1.1,.9]:[.9,1.1];BX(x-c[0]+(ax?-.8:0),z-c[1]+(ax?0:-.8),x+c[0]+(ax?-.8:0),z+c[1]+(ax?0:-.8),y+.55,y+1.9,0xf4f2ec,'p');BX(x-c[0]-.1+(ax?-.8:0),z-c[1]-.1+(ax?0:-.8),x+c[0]+.1+(ax?-.8:0),z+c[1]+.1+(ax?0:-.8),y+1.9,y+2.05,col,'p',1);
   BX(x+(ax?1.6:0)-.06,z+(ax?0:1.6)-.06,x+(ax?1.6:0)+.06,z+(ax?0:1.6)+.06,y+.55,y+5.5,0xe9e5dc,'m',1)};
  let piers=0;for(const X of [92,100,108,116,124]){if(piers>=3)break;let zw=null;for(let z=40;z<150;z+=.5)if(H(X,z)<-.4&&H(X-2,z)<-.4&&H(X+2,z)<-.4){zw=z;break}if(zw==null)continue;
   let len=0;for(let z=zw;z<zw+26;z+=.5){if(H(X,z)>-.3||H(X-3,z)>-.3||H(X+3,z)>-.3)break;len=z-zw}if(len<12)continue;piers++;
   const z0=zw-5,z1=zw+len,top=W0+.9;BX(X-1.4,z0,X+1.4,z1,top-.25,top,pk,'4');for(let z=z0+1;z<z1;z+=3){post(X-1.3,z,top-.25);post(X+1.3,z,top-.25)}
   BX(X-1.4,z0-1,X+1.4,z0,Math.min(H(X,z0-1),top-.5)-.4,top-.45,pk,'4');
   [.75,.25,-.25,-.75].forEach((y,i)=>BX(X-.6,z1+i*.5,X+.6,z1+i*.5+.5,y-.2,y,dk,'4'));
   for(let z=z0+2;z<z1-2;z+=5)if(H(X+4.2,z)<-1.2&&H(X+4.2,z+7)<-1.2&&r()<.7){boat(X+4.4,z+3.6,0,pick([0xc23b2f,0x2f6f9a,0x2f8a5a,0xe0a030]));z+=7}
   for(let k=0;k<3;k++){const zz=z0+2+r()*(z1-z0-4);BX(X-1.1,zz,X-.1,zz+1,top,top+1,pick([0x9a7a52,0xa8885c]),'x')}}
  // ---------- harbour town extras: market stalls, lamps, crates ----------
  [[50,50],[66,50],[50,66],[66,66]].forEach(([x,z],i)=>{if(clearAt(x,z,2.5,.6))stall(x,z,2,i%2)});
  for(let t=30;t<=90;t+=15){[[t,58-4],[58+4,t]].forEach(([x,z])=>{if(clearAt(x,z,.6,.15))lamp(x,z,2)})}
  // ---------- beach resort: pool, deck, tiki bar, cabanas, loungers, umbrellas, lifeguard tower, swim area ----------
  {const G=2.2,q=[-96,116,-80,124];BX(q[0]-2.2,q[1]-2.2,q[2]+2.2,q[1],G-1.3,G+.05,0xf2efe6,'i');BX(q[0]-2.2,q[3],q[2]+2.2,q[3]+2.2,G-1.3,G+.05,0xf2efe6,'i');
   BX(q[0]-2.2,q[1],q[0],q[3],G-1.3,G+.05,0xf2efe6,'i');BX(q[2],q[1],q[2]+2.2,q[3],G-1.3,G+.05,0xf2efe6,'i');
   BX(q[0],q[1],q[2],q[3],G-1.25,G-1.15,0x7fd0e6,'i');BX(q[0]+.01,q[1]+.01,q[2]-.01,q[3]-.01,G-1.15,G-.3,0x49b8dc,'G',1);
   for(let x=q[0]+1.5;x<q[2]-1;x+=2.6){BX(x-.35,q[3]+.5,x+.35,q[3]+2.1,G+.05,G+.38,0xf4f4f0,'p');BX(x-.35,q[3]+1.7,x+.35,q[3]+2.1,G+.38,G+.8,0xf4f4f0,'p',1)}
   const bx0=-74,bz0=116;BX(bx0,bz0,bx0+4,bz0+1,G,G+1.1,0x8a5a3a,'w');BX(bx0-.1,bz0-.1,bx0+4.1,bz0+1.1,G+1.1,G+1.2,0xd9b98a,'k');[[bx0,bz0-.6],[bx0+4,bz0-.6],[bx0,bz0+2.4],[bx0+4,bz0+2.4]].forEach(([x,z])=>BX(x-.12,z-.12,x+.12,z+.12,G,G+2.8,dk,'w'));
   D.push(['pyr',bx0+2,G+2.8,bz0+.9,6,1.8,0xd9c08a,'z']);for(let i=0;i<4;i++)BX(bx0+.4+i,bz0-1.1,bx0+.8+i,bz0-.7,G,G+.75,0x6b4a2c,'k')}
  for(let a=2.02;a<2.5;a+=.045){const rc=kcoast(a),rr=rc-fr(8,13),x=Math.cos(a)*rr,z=Math.sin(a)*rr,y=H(x,z);if(y<.6||!clearAt(x,z,1.6,.5))continue;const k=r();
   if(k<.35){BX(x-1.3,z-1.3,x+1.3,z+1.3,y-.3,y+.05,0xe9dcc0,'4',1);[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]].forEach(([i,j])=>BX(x+i-.09,z+j-.09,x+i+.09,z+j+.09,y,y+2.5,dk,'w'));D.push(['pyr',x,y+2.5,z,3.6,1.4,0xd9c08a,'z'])}
   else{const c=pick([0xe8553a,0x2f9ab0,0xf0c040,0x3aa060]);BX(x-.04,z-.04,x+.04,z+.04,y,y+2.3,0xeeeeee,'m');D.push(['pyr',x,y+2.1,z,2.6,.7,c,'p']);
    [-.9,.9].forEach(o=>{BX(x+o-.33,z-.5,x+o+.33,z+1.3,y,y+.32,0xf4f4f0,'p');BX(x+o-.33,z-.55,x+o+.33,z-.25,y+.32,y+.75,0xf4f4f0,'p',1)})}}
  {const a=2.26,rc=kcoast(a),x=Math.cos(a)*(rc-5),z=Math.sin(a)*(rc-5),y=H(x,z)+.1,p=2.4;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([i,j])=>BX(x+i*1.2-.1,z+j*1.2-.1,x+i*1.2+.1,z+j*1.2+.1,y-.5,y+p-.15,0xf4f4f0,'w'));
   BX(x-1.5,z-1.5,x+1.5,z+1.5,y+p-.15,y+p,0xf4f4f0,'4');BX(x-1.5,z-1.5,x+1.5,z-1.4,y+p,y+p+1,0xd23a2a,'p');BX(x-1.5,z+1.4,x+1.5,z+1.5,y+p,y+p+1,0xd23a2a,'p');BX(x+1.4,z-1.4,x+1.5,z+1.4,y+p,y+p+1,0xd23a2a,'p');
   [[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]].forEach(([i,j])=>BX(x+i-.06,z+j-.06,x+i+.06,z+j+.06,y+p,y+p+2,0xf4f4f0,'w',1));D.push(['pyr',x,y+p+2,z,3.4,1,0xd23a2a,'p']);
   for(let k=1;k<=5;k++)BX(x-1.5-k*.6,z-.6,x-1.5-(k-1)*.6,z+.6,y-.4,y+p-k*.4,0xf4f4f0,'4')}
  {const a0=2.12,a1=2.34,ro=kcoast(2.23)+16,pts=[];for(let a=a0;a<=a1+1e-6;a+=.012)pts.push([Math.cos(a)*ro,Math.sin(a)*ro]);
   const legs=[a0,a1].map(a=>{const rc=kcoast(a),q=[];for(let rr=ro-3;rr>rc+3;rr-=3)q.push([Math.cos(a)*rr,Math.sin(a)*rr]);return q});
   const chain=p=>{p.forEach((q,i)=>{D.push(['bu',q[0],q[1],q[0]*.7+q[1]*1.3,0xf2c230,.7]);if(i)D.push(['br',p[i-1][0],p[i-1][1],q[0],q[1]])})};chain([...legs[0].slice().reverse(),...pts,...legs[1]]);
   const rx=Math.cos(2.23)*(ro-6),rz=Math.sin(2.23)*(ro-6);BX(rx-1.6,rz-1.6,rx+1.6,rz+1.6,W0-.35,W0+.3,0xf2efe6,'4');[-.75,-.25].forEach((y,i)=>BX(rx-.6,rz-1.6-(2-i)*.5,rx+.6,rz-1.6-(1-i)*.5,y-.25,y,0x9aa0a6,'m'))}
  // ---------- airstrip: threshold stripes, windsock, fuel drums, parked plane ----------
  {const G=4.5;[12.5,127.5].forEach(x0=>{for(let k=-3;k<=3;k++){const z=-44+k*1.6;BX(x0-2.2,z-.35,x0+2.2,z+.35,G+.12,G+.2,0xf4f4f0,'p',1)}});
   BX(124.9,-33.1,125.1,-32.9,G,G+6,0xeeeeee,'m');D.push(['pyr',126,G+5.4,-33,1.1,2.4,0xf08a2a,'p']);
   for(let k=0;k<5;k++)BX(100+k*1.1,-56,100.9+k*1.1,-55.1,G,G+1.2,k%2?0xc23b2f:0x2f6f9a,'m');
   BX(67,-61,76,-59,G+1,G+2.6,0xf4f4f0,'p');BX(76,-60.7,77.2,-59.3,G+1.2,G+2.4,0xc23b2f,'p');BX(70.5,-60.8,73,-59.2,G+2.6,G+3.2,0x9cc3d8,'G');
   BX(70,-65.5,72,-54.5,G+1.9,G+2.1,0xf4f4f0,'p');BX(70,-65.5,72,-64.8,G+1.9,G+2.12,0xc23b2f,'p',1);BX(70,-55.2,72,-54.5,G+1.9,G+2.12,0xc23b2f,'p',1);
   BX(66.8,-60.15,67.8,-59.85,G+2.6,G+4.1,0xc23b2f,'p');BX(66.6,-62.5,68,-57.5,G+2.4,G+2.55,0xf4f4f0,'p');BX(77.2,-60.1,77.35,-59.9,G+.6,G+3,0x2b2b2b,'m',1);
   [[71,-62],[71,-58],[75,-60]].forEach(([x,z])=>{BX(x-.06,z-.06,x+.06,z+.06,G+.3,G+1,0x3a3f46,'m');D.push(['wh',x,G+.32,z,1])})}
  // ---------- sugar mill chimney + cane fields ----------
  {const GM=H(-26,-134);BX(-14.4,-139.4,-11.6,-136.6,GM-.5,GM+16,0xa85a40,'b');BX(-14.8,-139.8,-11.2,-136.2,GM+15,GM+15.6,0x7a4a34,'b',1);
   for(let k=0;k<3;k++)BX(-9+k*1.4,-130,-7.8+k*1.4,-128.8,GM,GM+1.2,0x9a7a52,'x')}
  [[0,-128,32,-114],[38,-128,70,-114],[0,-108,32,-94],[38,-108,70,-94]].forEach(([x0,z0,x1,z1])=>{for(let z=z0+.6;z<z1;z+=1.25)for(let x=x0+.5;x<x1;x+=1.05){if(r()<.08)continue;const px=x+fr(-.2,.2),pz=z+fr(-.2,.2);D.push(['cn',px,H(px,pz),pz,fr(2.2,3.1),fr(0,6.28)])}});
  // ---------- cliff fort ----------
  {const G=KFP[3],FX=-112,FZ=-100,HF=17,WT=2.4,WH=6.5,x0=FX-HF,x1=FX+HF,z0=FZ-HF,z1=FZ+HF,c=stone,top=G+WH,
    seg=(a0,b0,a1,b1,yb,yt)=>BX(a0,b0,a1,b1,yb,yt,c,'2'),bot=G-1.2;
   const wallX=(z,za,zb,gate)=>{if(!gate){seg(x0,za,x1,zb,bot,top);return}seg(x0,za,gate[0],zb,bot,top);seg(gate[1],za,x1,zb,bot,top);seg(gate[0],za,gate[1],zb,G+4.4,top)};
   const wallZ=(xa,xb,gate)=>{if(!gate){seg(xa,z0+WT,xb,z1-WT,bot,top);return}seg(xa,z0+WT,xb,gate[0],bot,top);seg(xa,gate[1],xb,z1-WT,bot,top);seg(xa,gate[0],xb,gate[1],G+4.4,top)};
   wallX(0,z0,z0+WT,null);wallX(0,z1-WT,z1,[-106,-102]);wallZ(x0,x0+WT,null);wallZ(x1-WT,x1,[FZ-2,FZ+2]);
   [[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(([cx,cz])=>{seg(cx-3.5,cz-3.5,cx+3.5,cz+3.5,Math.min(bot,lo4(cx-3.5,cz-3.5,cx+3.5,cz+3.5)-.6),top+.02);
    for(let i=0;i<4;i++){const s=-3.5+i*2.2;BX(cx+s,cz-3.5,cx+s+.9,cz-2.9,top,top+1.2,c,'2');BX(cx+s,cz+2.9,cx+s+.9,cz+3.5,top,top+1.2,c,'2');BX(cx-3.5,cz+s,cx-2.9,cz+s+.9,top,top+1.2,c,'2');BX(cx+2.9,cz+s,cx+3.5,cz+s+.9,top,top+1.2,c,'2')}});
   for(let x=x0+4;x<x1-4;x+=1.8){BX(x,z0,x+.9,z0+.55,top,top+1.1,c,'2');BX(x,z1-.55,x+.9,z1,top,top+1.1,c,'2')}
   for(let z=z0+4;z<z1-4;z+=1.8){BX(x0,z,x0+.55,z+.9,top,top+1.1,c,'2');BX(x1-.55,z,x1,z+.9,top,top+1.1,c,'2')}
   const n=16,rs=WH/n;for(let k=1;k<=n;k++){BX(x0+WT+(k-1)*.75,z0+WT,x0+WT+k*.75,z0+WT+1.8,G-.05,G+rs*k,c,'2');BX(x0+WT+(k-1)*.75,z1-WT-1.8,x0+WT+k*.75,z1-WT,G-.05,G+rs*k,c,'2')}
   BX(x1-.06,z0-.06,x1+.06,z0+.06,top,top+7,0x3a3f46,'m');BX(x1+.06,z0-.04,x1+1.9,z0+.04,top+5.6,top+6.9,0xc23b2f,'p',1);
   [[x1-1.2,FZ-6,1],[x1-1.2,FZ+6,1],[-112,z1-1.2,0],[-98,z1-1.2,0]].forEach(([x,z,ax])=>{const[a,b]=ax?[.9,.22]:[.22,.9];BX(x-a,z-b,x+a,z+b,top+.35,top+.75,0x2b2b2b,'m');BX(x-.45,z-.45,x+.45,z+.45,top,top+.4,0x6b4a2c,'k')});
   [[-104,-92],[-100,-110],[-124,-90]].forEach(([x,z])=>boulder(x,z,fr(1.2,2),fr(.8,1.4),0xcfc4ae))}
  // ---------- river bridges: a plank road bridge and two rope footbridges ----------
  const bridge=(X,za,zb,w,road)=>{const ya=H(X,za)+.05,yb=H(X,zb)+.05,L=zb-za,sag=road?0:Math.min(1.2,Math.max(0,Math.min(ya,yb)-1.1));
   const yAt=t=>ya+(yb-ya)*t-sag*4*t*(1-t);
   for(let z=za;z<zb;z+=.5){const t=(z+.25-za)/L,y=Math.max(W0+.7,yAt(t));BX(X-w/2,z,X+w/2,z+.46,y-.14,y,road?pk:0xb08a5a,'4')}
   for(let z=za;z<=zb;z+=road?3:4){const t=(z-za)/L,y=Math.max(W0+.7,yAt(t));[-1,1].forEach(s=>BX(X+s*w/2-.09,z-.09,X+s*w/2+.09,z+.09,Math.min(H(X+s*w/2,z),y)-1.5,y+1.15,dk,'w'))}
   for(let z=za;z<zb;z+=1){const t=(z+.5-za)/L,y=Math.max(W0+.7,yAt(t));[-1,1].forEach(s=>BX(X+s*w/2-.05,z,X+s*w/2+.05,z+1,y+.95,y+1.05,road?dk:rope,road?'w':'p'))}};
  bridge(-104,-44,-13,5,1);bridge(-25,-53,-16,1.8,0);bridge(-135,-37,3,1.8,0);
  // ---------- fishing shacks on the north shore ----------
  [-1.42,-1.6,-1.78].forEach(a=>{const rc=kcoast(a),x=Math.round(Math.cos(a)*(rc-3)),z=Math.round(Math.sin(a)*(rc-3));if(!clearAt(x,z,4,1))return;const fy=Math.max(lo4(x-2.5,z-2.5,x+2.5,z+2.5)+1.2,W0+1.6),h2=2.6,c=pick([0x6fc3c9,0xf29a8a,0xf2d16b,0xa3d977]);
   [[-2.3,-2.3],[2.3,-2.3],[-2.3,2.3],[2.3,2.3]].forEach(([i,j])=>post(x+i,z+j,fy-.2,dk,.26));BX(x-2.6,z-2.6,x+2.6,z+2.6,fy-.2,fy,pk,'4');
   BX(x-2.5,z-2.5,x+2.5,z-2.3,fy,fy+h2,c,'w');BX(x-2.5,z-2.3,x-2.3,z+2.5,fy,fy+h2,c,'w');BX(x+2.3,z-2.3,x+2.5,z+2.5,fy,fy+h2,c,'w');BX(x-2.5,z+2.3,x-.7,z+2.5,fy,fy+h2,c,'w');BX(x+.7,z+2.3,x+2.5,z+2.5,fy,fy+h2,c,'w');BX(x-.7,z+2.3,x+.7,z+2.5,fy+2.2,fy+h2,c,'w');
   D.push(['roof',x,z,fy+h2,6,6,1.5,'x',0xd9c08a,'z',c,'w',5,5]);const gy=H(x,z+4);for(let k=1;k<=Math.ceil((fy-gy)/.45);k++){const st=(fy-gy)/Math.ceil((fy-gy)/.45);BX(x-.6,z+2.6+(Math.ceil((fy-gy)/.45)-k)*.5,x+.6,z+3.1+(Math.ceil((fy-gy)/.45)-k)*.5,gy-.4,gy+st*k,dk,'4')}
   if(H(x,z-9)<-1.3)boat(x,z-9,1,pick([0xc23b2f,0x2f6f9a,0xe0a030]))});
  // ---------- occupancy grid for scattering plants and rocks ----------
  const OG=new Uint8Array(250*250),oi=(x,z)=>(Math.floor((z+250)/2))*250+Math.floor((x+250)/2),mark=(x,z,rad)=>{for(let a=x-rad;a<=x+rad;a+=1)for(let b=z-rad;b<=z+rad;b+=1){const i=oi(a,b);if(i>=0&&i<OG.length)OG[i]=1}};
  B.forEach(b=>{if(b[2]>60||b[3]>60||b[4]<H(b[0],b[1])-.2)return;for(let a=b[0]-b[2]/2-1;a<=b[0]+b[2]/2+1;a+=1)for(let c=b[1]-b[3]/2-1;c<=b[1]+b[3]/2+1;c+=1){const i=oi(a,c);if(i>=0&&i<OG.length)OG[i]=1}});
  const vac=(x,z,rad)=>{for(let a=x-rad;a<=x+rad;a+=1)for(let b=z-rad;b<=z+rad;b+=1){const i=oi(a,b);if(i<0||i>=OG.length||OG[i])return false}return clearAt(x,z,rad,rad*.6)};
  const palm=(x,z,lx,lz,lean)=>{const y=H(x,z),s=fr(.85,1.2);B.push([x,z,.9,.9,y+2.6,y-.6,0x7a5a3a,'n']);D.push(['pm',x,y,z,s,lx,lz,lean]);mark(x,z,1.5)};
  const KZ=[[18,14,96,104],[-126,84,-50,140],[0,-84,140,-26],[-46,-150,74,-86]],inZ=(x,z)=>KZ.some(q=>x>q[0]&&x<q[2]&&z>q[1]&&z<q[3]);
  // beach palms leaning out to sea
  for(let i=0,n=0;i<4000&&n<420;i++){const a=fr(-Math.PI,Math.PI),rr=kcoast(a)-fr(3,18),x=Math.cos(a)*rr,z=Math.sin(a)*rr,y=H(x,z);if(y<.55||y>6||krivD(x,z)<9||!vac(x,z,1.5))continue;palm(x,z,Math.cos(a),Math.sin(a),fr(.12,.32));n++}
  // jungle: palms, broadleaf trees, bushes (west and middle of the island)
  const jung=(x,z)=>{const t=kland(x,z);return t>22&&x<45&&!(x>-135&&x<-89&&z>-123&&z<-77)};
  for(let i=0,n=0;i<9000&&n<520;i++){const x=fr(-190,60),z=fr(-170,170);if(!jung(x,z)||H(x,z)<1.6||krivD(x,z)<7)continue;const rad=n%2?2.8:1.6;if(!vac(x,z,rad))continue;
   if(n%2==0)palm(x,z,fr(-1,1),fr(-1,1),fr(.04,.16));else{tree(x,z,1);mark(x,z,2.6)}n++}
  for(let i=0,n=0;i<6000&&n<380;i++){const x=fr(-190,120),z=fr(-170,170),t=kland(x,z);if(t<12||inZ(x,z)||H(x,z)<1.6||krivD(x,z)<6||!vac(x,z,1.1))continue;bush(x,z);mark(x,z,1);n++}
  // scattered palms everywhere else inland
  for(let i=0,n=0;i<4000&&n<180;i++){const x=fr(-170,170),z=fr(-170,170),t=kland(x,z);if(t<18||inZ(x,z)||H(x,z)<2||krivD(x,z)<8||!vac(x,z,2.4))continue;palm(x,z,fr(-1,1),fr(-1,1),fr(.05,.2));n++}
  // coral rocks: along the shoreline (some half in the water) and a few inland
  for(let i=0,n=0;i<3000&&n<70;i++){const a=fr(-Math.PI,Math.PI),rr=kcoast(a)+fr(-6,5),x=Math.cos(a)*rr,z=Math.sin(a)*rr;if(!vac(x,z,2.2))continue;const s=fr(1.4,3.4);boulder(x,z,s,s*fr(.6,.95),pick([0xd9cfb8,0xcbbfa4,0xb8ab92]));mark(x,z,s);n++}
  for(let i=0,n=0;i<3000&&n<45;i++){const x=fr(-170,170),z=fr(-170,170);if(kland(x,z)<20||H(x,z)<2||!vac(x,z,2.6))continue;const s=fr(1.6,4);boulder(x,z,s,s*fr(.6,.95),pick([0x9a948a,0x8a857c,0xb0a898]));mark(x,z,s);n++}
  // ---------- floating buoy line: the edge of the swimming area (and the map) ----------
  {const RB=T.bnd+1,nb=Math.round(2*Math.PI*RB/5.8),p=[];for(let i=0;i<nb;i++){const a=i/nb*Math.PI*2;p.push([Math.cos(a)*RB,Math.sin(a)*RB])}
   p.forEach((q,i)=>{D.push(['bu',q[0],q[1],i*.9,i%2?0xf4f4f0:0xe0402e,1]);const nq=p[(i+1)%nb];D.push(['br',q[0],q[1],nq[0],nq[1]])})}};
 // ================= Snowdrift Valley build: the giant igloo and winter props =================
 const snowBuild=()=>{const G=3,R=30,ice=0xc9dbe8,TW=3.2,TH=5.4,tun=[0,Math.PI/2,Math.PI,-Math.PI/2],ha=Math.asin((TW+.3)/R);
  D.push(['ig',0,G,0,R,TH]);
  // dome collision: rings of invisible blocks that follow the shell, with gaps for the four tunnels
  for(let y=0;y<R-1;y+=1.25){const rr=Math.sqrt(R*R-(y+.6)*(y+.6)),n=Math.max(8,Math.round(2*Math.PI*rr/2.6)),sz=2*Math.PI*rr/n*1.05;
   for(let i=0;i<n;i++){const a=i/n*2*Math.PI;if(y<TH-.2&&tun.some(t=>Math.abs(Math.atan2(Math.sin(a-t),Math.cos(a-t)))<ha+sz/2/rr))continue;
    B.push([Math.cos(a)*rr,Math.sin(a)*rr,sz,sz,G+y+1.25,y?G+y:G-1,0,'n'])}}
  B.push([0,0,4,4,G+R+.4,G+R-1.4,0,'n']);
  // tunnels (N, E, S, W): ice-block walls and roof
  tun.forEach(t=>{const cx=Math.cos(t),cz=Math.sin(t),ax=Math.abs(cx)>.5,r0=R-3.5,r1=R+7;
   const wall=(o)=>{if(ax){const x0=Math.min(cx*r0,cx*r1),x1=Math.max(cx*r0,cx*r1);BX(x0,o-.5,x1,o+.5,G-1,G+TH,ice,'5')}else{const z0=Math.min(cz*r0,cz*r1),z1=Math.max(cz*r0,cz*r1);BX(o-.5,z0,o+.5,z1,G-1,G+TH,ice,'5')}};
   wall(-TW-.5);wall(TW+.5);
   if(ax){const x0=Math.min(cx*r0,cx*r1),x1=Math.max(cx*r0,cx*r1);BX(x0,-TW-1,x1,TW+1,G+TH,G+TH+1,ice,'5')}else{const z0=Math.min(cz*r0,cz*r1),z1=Math.max(cz*r0,cz*r1);BX(-TW-1,z0,TW+1,z1,G+TH,G+TH+1,ice,'5')}
   const lx=cx*(r1-.4),lz=cz*(r1-.4);[[-1,1]].forEach(()=>{[-1,1].forEach(sg=>{const px=ax?lx:lx+sg*(TW+1.3),pz=ax?lz+sg*(TW+1.3):lz;BX(px-.4,pz-.4,px+.4,pz+.4,G,G+2.4,0x5a3a22,'w');BX(px-.25,pz-.25,px+.25,pz+.25,G+2.4,G+2.9,0xffb54a,'e',1)})})});
  // inside: stepped ice stage with a glowing crystal, four corner platforms with stairs, pillars, ice-block cover, campfires, lamps, supplies
  [[12,.5],[9,1],[6,1.5]].forEach(([w,h])=>BX(-w/2,-w/2,w/2,w/2,G-.2,G+h,0xd2e6f4,'5'));
  BX(-.9,-.9,.9,.9,G+1.5,G+6.5,0x7fe3ff,'e');D.push(['pyr',0,G+6.5,0,1.8,2.2,0x9ff0ff,'p']);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{const cx=sx*12,cz=sz*12,hp=4.2;BX(cx-3,cz-3,cx+3,cz+3,G+hp-.4,G+hp,0xcfe3f2,'5');
   [[-2.6,-2.6],[2.6,-2.6],[-2.6,2.6],[2.6,2.6]].forEach(([a,b])=>BX(cx+a-.35,cz+b-.35,cx+a+.35,cz+b+.35,G-.2,G+hp-.4,0xd8eaf6,'5'));
   BX(cx+sx*3-(sx>0?.15:0),cz-3,cx+sx*3+(sx>0?0:.15),cz+3,G+hp,G+hp+1,0xbcd6ea,'5');
   const zs=cz+sz*3,n=10,rs=hp/n,xa=cx-sx*3+(sx>0?0:-2),xb=xa+2;for(let k=1;k<=n;k++){const z0=zs+sz*(n-k)*.7,z1=z0+sz*.7;BX(xa,Math.min(z0,z1),xb,Math.max(z0,z1),G-.05,G+rs*k,0xcfe3f2,'5')}});
  [[0,-20],[0,20],[-20,0],[20,0]].forEach(([x,z])=>{const ax=x!==0;BX(x-(ax?.6:2.6),z-(ax?2.6:.6),x+(ax?.6:2.6),z+(ax?2.6:.6),G,G+1.3,0xd8eaf6,'5')});
  [[-7,-19],[7,19],[-19,7],[19,-7]].forEach(([x,z])=>{BX(x-1.6,z-1.6,x+1.6,z+1.6,G-.2,G+20,0xdcecf7,'5')});
  [[-16,-3],[16,3]].forEach(([x,z])=>{BX(x-.9,z-.25,x+.9,z+.25,G,G+.35,0x5a3a22,'w',1);BX(x-.25,z-.9,x+.25,z+.9,G+.25,G+.6,0x5a3a22,'w',1);BX(x-.35,z-.35,x+.35,z+.35,G+.1,G+.9,0xff8a2a,'e',1)});
  for(let i=0;i<8;i++){const a=i/8*6.283+.39,r2=17;BX(Math.cos(a)*r2-.3,Math.sin(a)*r2-.3,Math.cos(a)*r2+.3,Math.sin(a)*r2+.3,G+19,G+19.5,0xfff1c4,'e',1);BX(Math.cos(a)*r2-.03,Math.sin(a)*r2-.03,Math.cos(a)*r2+.03,Math.sin(a)*r2+.03,G+19.5,G+Math.sqrt(R*R-r2*r2)-.5,0x3a3f46,'m',1)}
  [[-22,-8],[22,8],[-8,22],[8,-22]].forEach(([x,z])=>{BX(x-1,z-1,x+1,z+1,G,G+1.6,0x9a7a52,'x');BX(x+1.2,z-.7,x+2.6,z+.7,G,G+1.1,0xa8885c,'x')});
  // chairlift up the ski hill: towers, cable and chairs along z=-4
  for(let x=-56;x>=-110;x-=13){const y=H(x,-8);BX(x-.3,-8.3,x+.3,-7.7,y-.5,y+9,0x4a5560,'m');BX(x-.2,-10,x+.2,-6,y+9,y+9.4,0x4a5560,'m')}
  {const ys=[];for(let x=-56;x>=-110;x-=13)ys.push([x,H(x,-8)+9.2]);for(let i=0;i<ys.length-1;i++){const[xa,ya]=ys[i],[xb,yb]=ys[i+1];for(let k=0;k<13;k++){const x=xa-k,y=ya+(yb-ya)*k/13;[-9.6,-6.4].forEach(z=>BX(x-1,z-.04,x,z+.04,y-.04,y+.04,0x2b2b2b,'m',1));if(k%6==3)[-9.6,-6.4].forEach(z=>{BX(x-.03,z-.03,x+.03,z+.03,y-1.6,y,0x2b2b2b,'m',1);BX(x-.5,z-.4,x+.5,z+.4,y-1.9,y-1.6,0xc23b2f,'p',1)})}}}
  // radio mast at the research station
  {const x=-80,z=80,y=H(x,z);[[-.9,-.9],[.9,-.9],[-.9,.9],[.9,.9]].forEach(([a,b])=>BX(x+a-.1,z+b-.1,x+a+.1,z+b+.1,y-.3,y+30,0xd23a2a,'m'));for(let h2=3;h2<30;h2+=3)BX(x-1,z-1,x+1,z+1,y+h2,y+h2+.12,h2%6?0xf4f4f0:0xd23a2a,'m',1);BX(x-.3,z-.3,x+.3,z+.3,y+30,y+30.6,0xff3030,'e',1);
   for(let k=0;k<4;k++)BX(x+4+k*1.6,z-6,x+5.2+k*1.6,z-4.4,y,y+1.4,0xe0a030,'m')}
  // ice-fishing huts and holes on the frozen lake
  [[86,80,0x3a6ea5],[106,92,0xc0503a],[96,104,0x4a8a5a],[112,74,0xe0a030]].forEach(([x,z,c])=>{const y=.8;BX(x-1.5,z-1.5,x+1.5,z-1.35,y,y+2.3,c,'w');BX(x-1.5,z-1.35,x-1.35,z+1.5,y,y+2.3,c,'w');BX(x+1.35,z-1.35,x+1.5,z+1.5,y,y+2.3,c,'w');BX(x-1.5,z+1.35,x-.6,z+1.5,y,y+2.3,c,'w');BX(x+.6,z+1.35,x+1.5,z+1.5,y,y+2.3,c,'w');
   BX(x-1.7,z-1.7,x+1.7,z+1.7,y+2.3,y+2.5,0xf2f6fa,'c');BX(x-.4,z-.4,x+.4,z+.4,y,y+.03,0x0f2a3a,'p',1)});
  for(let i=0;i<10;i++){const a=i*.63,rx=96+Math.cos(a)*fr(5,26),rz=86+Math.sin(a)*fr(4,16);BX(rx-.35,rz-.35,rx+.35,rz+.35,.8,.83,0x0f2a3a,'p',1)}
  // ice bridges joining the four raised platforms into a loop around the stage
  {const hp=G+4.2,c2=0xb9d3e6;[-12,12].forEach(z=>{BX(-9,z-1.2,9,z+1.2,hp-.4,hp,c2,'5');BX(-9,z-1.3,9,z-1.2,hp,hp+1,0x9fc4dc,'5');BX(-9,z+1.2,9,z+1.3,hp,hp+1,0x9fc4dc,'5');[-4,4].forEach(x=>BX(x-.35,z-.35,x+.35,z+.35,G-.2,hp-.4,0xd2e4f1,'5'))});
   [-12,12].forEach(x=>{BX(x-1.2,-9,x+1.2,9,hp-.4,hp,c2,'5');BX(x-1.3,-9,x-1.2,9,hp,hp+1,0x9fc4dc,'5');BX(x+1.2,-9,x+1.3,9,hp,hp+1,0x9fc4dc,'5');[-4,4].forEach(z=>BX(x-.35,z-.35,x+.35,z+.35,G-.2,hp-.4,0xd2e4f1,'5'))})}
  // glowing crystal clusters along the wall, between the tunnels
  for(let k2=0;k2<8;k2++){const a=(k2+.5)*Math.PI/4,cr=25.5,x=Math.cos(a)*cr,z=Math.sin(a)*cr,cc=[0x5fe0ff,0xb07bff,0xff7bd5,0x7bffc1][k2%4];
   [[0,0,1.8,4.2],[1.1,.6,1.2,2.6],[-.9,.8,1,2.1],[.4,-1,.9,1.7]].forEach(([ox,oz,w,h])=>D.push(['pyr',x+ox,G-.1,z+oz,w,h,cc,'e']));B.push([x,z,2.6,2.6,G+3,G-.5,0,'n'])}
  // hanging banners
  [[24,0,1],[0,24,0],[-24,0,1],[0,-24,0]].forEach(([x,z,ax],i)=>{const c=[0xc23b2f,0x2f6fd8,0x3a9a4a,0xe0a030][i];BX(x-(ax?.05:1.3),z-(ax?1.3:.05),x+(ax?.05:1.3),z+(ax?1.3:.05),G+11,G+16.5,c,'p',1);BX(x-(ax?.06:1.3),z-(ax?1.3:.06),x+(ax?.06:1.3),z+(ax?1.3:.06),G+12.6,G+13.2,0xf4f4f0,'p',1);BX(x-(ax?.08:1.5),z-(ax?1.5:.08),x+(ax?.08:1.5),z+(ax?1.5:.08),G+16.5,G+16.7,0x6b4a2c,'k',1)});
  // penguin ice sculptures guarding the stage
  [[0,9,0],[0,-9,Math.PI],[9,0,-Math.PI/2],[-9,0,Math.PI/2]].forEach(([x,z,yw])=>{const k=1.6,fx=-Math.sin(yw),fz=-Math.cos(yw),bx=(a,b,c,d,e,f,col)=>BX(x+a*k,z+b*k,x+c*k,z+d*k,G+e*k,G+f*k,col,'p');
   bx(-.45,-.4,.45,.4,0,.25,0x2a3a48);bx(-.42,-.36,.42,.36,.25,1.35,0x1f2a35);bx(-.3,-.3,.3,.3,1.35,1.85,0x1f2a35);
   BX(x+fx*.38*k-.3*k,z+fz*.38*k-.3*k,x+fx*.38*k+.3*k,z+fz*.38*k+.3*k,G+.35*k,G+1.2*k,0xeef4f8,'p',1);
   BX(x+fx*.38*k-.09*k,z+fz*.38*k-.09*k,x+fx*.38*k+.09*k,z+fz*.38*k+.09*k,G+1.5*k,G+1.62*k,0xf0a020,'p',1);
   [[-.18,.1],[.18,.1]].forEach(([o])=>BX(x+fx*.45*k+o*k-.08*k,z+fz*.45*k-.08*k,x+fx*.45*k+o*k+.08*k,z+fz*.45*k+.08*k,G,G+.08*k,0xf0a020,'p',1))});
  // snow drifts for cover and log benches by the fires
  [[16,20],[-20,16],[-16,-20],[20,-16]].forEach(([x,z])=>boulder(x,z,3.4,1.6,0xdfe8ef));
  [[-16,-3],[16,3]].forEach(([x,z])=>{[[-2.3,0,1],[2.3,0,1],[0,-2.3,0],[0,2.3,0]].forEach(([ox,oz,ax])=>BX(x+ox-(ax?.3:1),z+oz-(ax?1:.3),x+ox+(ax?.3:1),z+oz+(ax?1:.3),G,G+.45,0x6b4a2c,'w'))});
  // snowmen
  for(let i=0,n=0;i<300&&n<26;i++){const s=spot(1.4,S-30);if(!s)continue;const[x,z]=s;if(!clearAt(x,z,1.5,.6))continue;const y=H(x,z),k=fr(.85,1.2);D.push(['sm',x,y,z,k,fr(0,6.28)]);B.push([x,z,1.4*k,1.4*k,y+1.9*k,y-.3,0,'n']);n++}};
 // ================= extra Battle Royale maps: landmarks and props (needs the finished terrain) =================
 const xBuild=()=>{const W0=T.wl,wd=0x6b4a2c,stn=0x9a978e;
  const post=(x,z,y1,c,w)=>{w=w||.22;BX(x-w/2,z-w/2,x+w/2,z+w/2,Math.min(H(x,z),W0!=null?W0-2.5:99)-.4,y1,c||wd,'w')};
  const xboat=(x,z,ax,col,L2)=>{L2=L2||3.6;const y=W0||0,[a,b]=ax?[L2,1.2]:[1.2,L2];BX(x-a,z-b,x+a,z+b,y-.7,y+.55,0xf4f2ec,'p');BX(x-a-.02,z-b-.02,x+a+.02,z+b+.02,y+.1,y+.35,col,'p',1)};
  const xpalm=(x,z,lx,lz,ln)=>{const y=H(x,z),s=fr(.85,1.15);B.push([x,z,.9,.9,y+2.6,y-.6,0,'n']);D.push(['pm',x,y,z,s,lx,lz,ln])};
  // bridge along an axis: ax='x' runs along x at z=c (from a to b); kind: rope | wood | stone
  const xbridge=(ax,c,a,b,w,kind)=>{const P=t=>ax==='x'?[t,c]:[c,t],ya=H(...P(a))+.05,yb=H(...P(b))+.05,L2=b-a,flat=kind!=='rope',sag=flat?0:Math.min(1.2,Math.max(0,Math.min(ya,yb)-1.1)),hi=kind==='stone'?Math.max(ya,yb):0;
   const yAt=t=>Math.max((W0??-99)+.8,ya+(yb-ya)*t+(kind==='stone'?1.6*Math.sin(Math.PI*t):-sag*4*t*(1-t)));
   const col=kind==='stone'?stn:kind==='wood'?0xa8885c:0xb08a5a,ty=kind==='stone'?'s':'4';
   const seg=(t0,t1,y0,y1,c2,tp,vis,yb2)=>{const[p0,q0]=P(t0),[p1,q1]=P(t1);if(ax==='x')BX(p0,q0-w/2,p1,q0+w/2,yb2??y0,y1,c2,tp,vis);else BX(p0-w/2,q0,p0+w/2,q1,yb2??y0,y1,c2,tp,vis)};
   for(let t=a;t<b;t+=.5){const y=yAt((t+.25-a)/L2);seg(t,t+.46,y-.2,y,col,ty,0,kind==='stone'?Math.min(y-.2,H(...P(t))-.3):y-.2)}
   for(let t=a;t<=b;t+=kind==='rope'?4:3){const y=yAt((t-a)/L2);[-1,1].forEach(sg=>{const[p,q]=P(t),px=ax==='x'?p:p+sg*w/2,pz=ax==='x'?q+sg*w/2:q;BX(px-.1,pz-.1,px+.1,pz+.1,Math.min(H(px,pz),y)-1.5,y+1.15,kind==='stone'?stn:wd,kind==='stone'?'s':'w')})}
   for(let t=a;t<b;t+=1){const y=yAt((t+.5-a)/L2);[-1,1].forEach(sg=>{const[p,q]=P(t),[p2,q2]=P(t+1);if(ax==='x')BX(p,q+sg*w/2-.05,p2,q+sg*w/2+.05,y+.95,y+1.05,kind==='rope'?0xc9b48a:wd,kind==='rope'?'p':'w');else BX(p+sg*w/2-.05,q,p+sg*w/2+.05,q2,y+.95,y+1.05,kind==='rope'?0xc9b48a:wd,kind==='rope'?'p':'w')})}};
  const xriverCross=(x,P2,span)=>{let zc=0,dm=1e9;for(let z=-XS;z<XS;z+=.5){const d=xsegD(x,z,P2);if(d<dm){dm=d;zc=z}}return zc};
  // dome with door cut-outs + invisible collision shell
  const xdome=(x,z,G,R,doors,cw,col)=>{D.push(['ig',x,G,z,R,3.6,doors,cw||2.2,col]);for(let y=0;y<R-1;y+=1.25){const rr=Math.sqrt(R*R-(y+.6)*(y+.6)),n=Math.max(8,Math.round(2*Math.PI*rr/2.4)),sz=2*Math.PI*rr/n*1.05;
    for(let i=0;i<n;i++){const a=i/n*2*Math.PI;if(y<3.4&&doors.some(t=>Math.abs(Math.atan2(Math.sin(a-t),Math.cos(a-t)))<Math.asin(Math.min(.95,(cw||2.2)+.4)/rr)+sz/2/rr))continue;B.push([x+Math.cos(a)*rr,z+Math.sin(a)*rr,sz,sz,G+y+1.25,y?G+y:G-1,0,'n'])}}B.push([x,z,R*.5,R*.5,G+R+.4,G+R-1.2,0,'n'])};
  // square fort: walls with battlements, corner towers, gates (list of {side:'s'|'e'|'n'|'w',at}), stairs to the wall-walk
  const xfort=(cx,cz,HF,G,gates,c)=>{const WT=2.4,WH=6.5,x0=cx-HF,x1=cx+HF,z0=cz-HF,z1=cz+HF,top=G+WH,bot=G-1.5,seg=(a0,b0,a1,b1,yb,yt)=>BX(a0,b0,a1,b1,yb,yt,c,'s');
   const gate=s=>gates.find(g=>g.side===s);
   const wx=(za,zb,g)=>{if(!g){seg(x0,za,x1,zb,bot,top);return}seg(x0,za,g.at-2,zb,bot,top);seg(g.at+2,za,x1,zb,bot,top);seg(g.at-2,za,g.at+2,zb,G+4.4,top)};
   const wz=(xa,xb,g)=>{if(!g){seg(xa,z0+WT,xb,z1-WT,bot,top);return}seg(xa,z0+WT,xb,g.at-2,bot,top);seg(xa,g.at+2,xb,z1-WT,bot,top);seg(xa,g.at-2,xb,g.at+2,G+4.4,top)};
   wx(z0,z0+WT,gate('n'));wx(z1-WT,z1,gate('s'));wz(x0,x0+WT,gate('w'));wz(x1-WT,x1,gate('e'));
   [[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(([tx,tz])=>{seg(tx-4,tz-4,tx+4,tz+4,Math.min(bot,H(tx,tz)-1),top+3);for(let i=0;i<4;i++){const s=-4+i*2.4;BX(tx+s,tz-4,tx+s+1,tz-3.4,top+3,top+4.2,c,'s');BX(tx+s,tz+3.4,tx+s+1,tz+4,top+3,top+4.2,c,'s');BX(tx-4,tz+s,tx-3.4,tz+s+1,top+3,top+4.2,c,'s');BX(tx+3.4,tz+s,tx+4,tz+s+1,top+3,top+4.2,c,'s')}
    D.push(['pyr',tx,top+4.2,tz,8.6,5,0x5a3a2a,'t']);B.push([tx,tz,6,6,top+6.5,top+4.2,0,'n'],[tx,tz,3,3,top+8.5,top+6.5,0,'n'])});
   for(let x=x0+5;x<x1-5;x+=1.8){BX(x,z0,x+.9,z0+.55,top,top+1.1,c,'s');BX(x,z1-.55,x+.9,z1,top,top+1.1,c,'s')}for(let z=z0+5;z<z1-5;z+=1.8){BX(x0,z,x0+.55,z+.9,top,top+1.1,c,'s');BX(x1-.55,z,x1,z+.9,top,top+1.1,c,'s')}
   const n=16,rs=WH/n;for(let k=1;k<=n;k++){BX(x0+WT+(k-1)*.75,z0+WT,x0+WT+k*.75,z0+WT+1.8,G-.05,G+rs*k,c,'s');BX(x1-WT-k*.75,z1-WT-1.8,x1-WT-(k-1)*.75,z1-WT,G-.05,G+rs*k,c,'s')}
   BX(x1-.06,z0-.06,x1+.06,z0+.06,top+6.5,top+13,0x3a3f46,'m');BX(x1+.06,z0-.04,x1+2.2,z0+.04,top+11.4,top+12.9,pick([0xc23b2f,0x2f5d9a,0xe0a030]),'p',1)};
  const torii=(x,z,ax,sc)=>{sc=sc||1;const y=H(x,z),h=5*sc,w=3.4*sc,[ox,oz]=ax?[0,w]:[w,0];[[-1],[1]].forEach(([s])=>BX(x+s*ox-.3,z+s*oz-.3,x+s*ox+.3,z+s*oz+.3,y-.3,y+h,0xc8322a,'p'));
   BX(x-ox-(ax?.35:1.2)*sc,z-oz-(ax?1.2:.35)*sc,x+ox+(ax?.35:1.2)*sc,z+oz+(ax?1.2:.35)*sc,y+h,y+h+.5*sc,0x2a2a2a,'p');BX(x-ox-(ax?.2:.6),z-oz-(ax?.6:.2),x+ox+(ax?.2:.6),z+oz+(ax?.6:.2),y+h-1.1*sc,y+h-.75*sc,0xc8322a,'p',1)};
  const lantern=(x,z)=>{const y=H(x,z);BX(x-.4,z-.4,x+.4,z+.4,y,y+.3,stn,'s');BX(x-.15,z-.15,x+.15,z+.15,y+.3,y+1.1,stn,'s');BX(x-.35,z-.35,x+.35,z+.35,y+1.1,y+1.6,0xffe8a8,'e');D.push(['pyr',x,y+1.6,z,1.2,.6,stn,'s'])};
  const windmill=(x,z,c)=>{const y=H(x,z);BX(x-3,z-3,x+3,z+3,y-.5,y+6,c,'s');BX(x-2.4,z-2.4,x+2.4,z+2.4,y+6,y+11,c,'s');BX(x-1.9,z-1.9,x+1.9,z+1.9,y+11,y+15,c,'s');D.push(['pyr',x,y+15,z,4.6,3,0x5a3a2a,'t',8]);
   BX(x-.6,z+3,x+.6,z+3.1,y,y+2.2,0x4a2e1a,'w',1);const hz=z+2.2,hy=y+13.5;BX(x-.4,hz,x+.4,hz+.8,hy-.4,hy+.4,0x3a2a1e,'w',1);BX(x-.25,hz+.8,x+.25,hz+1,hy-8,hy+8,0xd8c8a8,'w',1);BX(x-8,hz+.8,x+8,hz+1,hy-.25,hy+.25,0xd8c8a8,'w',1)};
  const cactus=(x,z)=>{const y=H(x,z),s=fr(.8,1.3);D.push(['cx',x,y,z,s,fr(0,6.28)]);B.push([x,z,.7*s,.7*s,y+3.6*s,y-.3,0,'n'])};
  const tent=(x,z,c)=>{const y=H(x,z);BX(x-1.6,z-1.6,x+1.6,z+1.6,y-.2,y+1.6,c,'p');D.push(['pyr',x,y+1.6,z,3.6,2.4,c,'p']);B.push([x,z,2,2,y+3.2,y+1.6,0,'n'])};
  const crates=(x,z,n)=>{for(let i=0;i<n;i++){const y=H(x,z),s=fr(1.1,1.7),cx=x+fr(-2,2),cz=z+fr(-2,2);BX(cx-s/2,cz-s/2,cx+s/2,cz+s/2,y-.2,y+s,pick([0x9a7a52,0xa8885c,0x8a6a42]),'x')}};
  const freeAt=(x,z,m)=>clearAt(x,z,m,m*.6)&&!B.some(b=>Math.abs(b[0]-x)<b[2]/2+m&&Math.abs(b[1]-z)<b[3]/2+m&&b[4]>H(x,z)-.3);
  const scatter=(n,lim,m,f,ok)=>{for(let i=0,k=0;i<n*30&&k<n;i++){const x=fr(-lim,lim),z=fr(-lim,lim);if(ok&&!ok(x,z))continue;if(!freeAt(x,z,m))continue;f(x,z);k++}};
  const dryAt=(x,z)=>W0==null||H(x,z)>W0+.8;

  // ---- helpers for the newer maps ----
  const res=(x0,z0,x1,z1)=>occR.push([Math.min(x0,x1),Math.min(z0,z1),Math.max(x0,x1),Math.max(z0,z1)]);
  // straight solid staircase from y0 to y1 starting at (x,z), climbing along ax ('x'|'z') in direction sg; returns its length
  const stairs=(x,z,ax,sg,y0,y1,w,c,ty)=>{const n=Math.max(1,Math.ceil((y1-y0)/.4)),rs=(y1-y0)/n;for(let k=1;k<=n;k++){const a=(k-1)*.6*sg,b=k*.6*sg,lo=Math.min(a,b),hi=Math.max(a,b);
    if(ax==='x')BX(x+lo,z-w/2,x+hi,z+w/2,Math.min(y0-.15,y0+rs*k-1.2),y0+rs*k,c,ty||'c');else BX(x-w/2,z+lo,x+w/2,z+hi,Math.min(y0-.15,y0+rs*k-1.2),y0+rs*k,c,ty||'c')}return n*.6};
  // railing: solid (invisible) to 1.1 m, with a visible top bar and posts
  const guard=(x0,z0,x1,z1,y,c)=>{BX(x0,z0,x1,z1,y,y+1.1,0,'n');BX(x0,z0,x1,z1,y+1,y+1.08,c,'m',1);const L2=Math.max(x1-x0,z1-z0),n=Math.max(1,Math.round(L2/1.2));for(let i=0;i<=n;i++){const t=i/n,px=x0+(x1-x0)*t,pz=z0+(z1-z0)*t;BX(px-.04,pz-.04,px+.04,pz+.04,y,y+1,c,'m',1)}};
  // lookout tower: four legs, switchback flights inside, a railed platform with a pyramid roof on top
  const lookout=(x,z,h,c,rc)=>{const y=H(x,z),top=y+h,nf=Math.max(2,Math.round(h/2.6)),rs=h/nf,ns=Math.ceil(rs/.4),run=.6,fL=ns*run,X0=x-fL/2-1.4,X1=x+fL/2+1.4,Z0=z-1.45,Z1=z+1.45,xa=x-fL/2,xb=x+fL/2;res(X0-2.4,Z0-1.4,X1+2.4,Z1+1.4);
   [[X0,Z0],[X1,Z0],[X0,Z1],[X1,Z1]].forEach(([a,b])=>BX(a-.2,b-.2,a+.2,b+.2,y-.5,top+2.7,c,'w'));
   {let g=H(xa-.8,z-.72);for(let t=0;t<=6;t+=.5)g=Math.min(g,H(X0-t,z-.72),H(X0-t,z-1.3),H(X0-t,z-.1));BX(X0,z-1.4,xa,z-.04,Math.min(g,y)-.3,y,c,'w');if(g<y-.3){const n=Math.ceil((y-g)/.4);stairs(X0-n*.6,z-.72,'x',1,g,y,1.36,c,'w')}}
   for(let f=0;f<nf;f++){const y0=y+f*rs,ln=f%2,zc=ln?z+.72:z-.72,dir=ln?-1:1,xs=dir>0?xa:xb;
    for(let k=1;k<=ns;k++){const a=xs+(k-1)*run*dir,b=xs+k*run*dir,yt=y0+rs*k/ns;BX(Math.min(a,b),zc-.68,Math.max(a,b),zc+.68,f==0?Math.min(y-.2,yt-.25):yt-.25,yt,c,'w')}
    if(f<nf-1){const ly=y0+rs;if(dir>0)BX(xb,Z0,X1,Z1,ly-.25,ly,c,'w');else BX(X0,Z0,xa,Z1,ly-.25,ly,c,'w')}}
   const ll=(nf-1)%2,oz0=ll?Z0:z+.04,oz1=ll?z-.04:Z1,ld=ll?-1:1;if(ld>0){BX(xb,Z0,X1,Z1,top-.25,top,c,'w');BX(X0,oz0,xb,oz1,top-.25,top,c,'w')}else{BX(X0,Z0,xa,Z1,top-.25,top,c,'w');BX(xa,oz0,X1,oz1,top-.25,top,c,'w')}
   guard(X0,Z0-.05,X1,Z0+.05,top,c);guard(X0,Z1-.05,X1,Z1+.05,top,c);guard(X0-.05,Z0,X0+.05,Z1,top,c);guard(X1-.05,Z0,X1+.05,Z1,top,c);
   BX(X0-.4,Z0-.4,X1+.4,Z1+.4,top+2.7,top+2.9,rc||c,'w');D.push(['pyr',x,top+2.9,z,Math.max(X1-X0,Z1-Z0)+1,1.6,rc||0x5a3a2a,'t'])};
  // round tank with an octagonal collider and a straight stair up its side
  const tank=(x,z,r,h,c,st)=>{const y=H(x,z);res(x-r-1.5-(st?h*1.6:0),z-r-2.5,x+r+1.5,z+r+1.5);D.push(['cy',x,y-.4,z,r,h+.4,c,'m',28]);D.push(['cy',x,y+h,z,r*.97,.18,0x8a8f94,'m',28]);
   [[1.92,.8],[.8,1.92],[1.46,1.46]].forEach(([a,b])=>B.push([x,z,a*r,b*r,y+h,y-.4,c,'n']));for(let k=0;k<3;k++)D.push(['cy',x,y+1.2+k*(h-1.6)/2,z,r+.03,.18,0x5a5f66,'m',28]);
   if(st){const zs=z-.96*r-.68,n=Math.ceil(h/.4);stairs(x-n*.6,zs,'x',1,y,y+h,1.3,0x6a6f76,'m');guard(x-2.4,zs-.72,x,zs-.64,y+h-.2,0xf2c230)}return y+h};
  // ring of square blocks (amphitheatre tiers, walls); gaps = list of angles left open, gw = gap width
  const ring=(cx,cz,r0,r1,y0,y1,c,ty,gaps,gw,vis)=>{if(!vis&&r1>3)res(cx-r1-1,cz-r1-1,cx+r1+1,cz+r1+1);const rm=(r0+r1)/2,w=r1-r0,n=Math.ceil(2*Math.PI*rm/(w*.85));for(let i=0;i<n;i++){const a=i/n*2*Math.PI;if(gaps&&gaps.some(g=>Math.abs(Math.atan2(Math.sin(a-g),Math.cos(a-g)))*rm<gw/2+w*.45))continue;
    const x=cx+Math.cos(a)*rm,z=cz+Math.sin(a)*rm;BX(x-w/2,z-w/2,x+w/2,z+w/2,y0,y1,c,ty,vis)}};
  const column=(x,z,h,c,r0)=>{const y=H(x,z);r0=r0||.45;res(x-1.2,z-1.2,x+1.2,z+1.2);D.push(['cy',x,y,z,r0,h,c,'s',12]);BX(x-r0*.8,z-r0*.8,x+r0*.8,z+r0*.8,y-.3,y+h,0,'n');BX(x-r0-.15,z-r0-.15,x+r0+.15,z+r0+.15,y-.2,y+.35,c,'s');BX(x-r0-.12,z-r0-.12,x+r0+.12,z+r0+.12,y+h,y+h+.35,c,'s')};
  const flame=(x,z,y,s)=>{BX(x-.3*s,z-.3*s,x+.3*s,z+.3*s,y,y+.9*s,0xff8a2a,'e',1);BX(x-.18*s,z-.18*s,x+.18*s,z+.18*s,y+.6*s,y+1.4*s,0xffd25a,'e',1)};
  const tankV=(x,z,ax,c)=>{const y=H(x,z),[a,b]=ax?[3.4,1.6]:[1.6,3.4];BX(x-a,z-b,x+a,z+b,y+.1,y+1.25,c,'m');BX(x-a*.72,z-b*.72,x+a*.72,z+b*.72,y+1.25,y+1.95,c,'m');const[e,f]=ax?[2.6,.12]:[.12,2.6];BX(x-(ax?0:.12),z-(ax?.12:0),x+(ax?e:.12),z+(ax?.12:e),y+1.55,y+1.75,0x2a2f26,'m');
   [[-1,-1],[1,-1],[-1,1],[1,1],[0,-1],[0,1]].forEach(([i,j])=>D.push(['wh',ax?x+i*2.6:x+j*1.55,y+.38,ax?z+j*1.55:z+i*2.6,ax]))};
  const animal=(x,z,k,yw)=>{res(x-3,z-3,x+3,z+3);const y=H(x,z),s=Math.sin(yw),co=Math.cos(yw),P2=(u,w,h0,h1,a,b,c)=>{const px=x+s*u+co*w,pz=z+co*u-s*w;BX(px-a,pz-b,px+a,pz+b,y+h0,y+h1,c,'p',1)};
   if(k==='giraffe'){const c=0xd9a440;[[-.7,-.35],[-.7,.35],[.7,-.35],[.7,.35]].forEach(([u,w])=>P2(u,w,0,2.2,.12,.12,c));P2(0,0,2.1,3,1,.45,c);for(let i=0;i<6;i++)P2(.9+i*.12,0,2.8+i*.42,3.3+i*.42,.18,.18,c);P2(1.75,0,5.3,5.75,.35,.2,c);B.push([x,z,1.6,1.6,y+3,y-.3,0,'n'])}
   else if(k==='elephant'){const c=0x8a8a8a;[[-1,-.6],[-1,.6],[1,-.6],[1,.6]].forEach(([u,w])=>P2(u,w,0,1.7,.32,.32,c));P2(0,0,1.5,3.1,1.7,.95,c);P2(2,0,2,3.2,.6,.6,c);P2(2.5,0,.4,2.4,.18,.18,c);P2(2,-.85,2.1,3.3,.35,.08,c);P2(2,.85,2.1,3.3,.35,.08,c);B.push([x,z,3.6,2.4,y+3.2,y-.3,0,'n'])}
   else{const c=0xf0f0ea;[[-.55,-.22],[-.55,.22],[.55,-.22],[.55,.22]].forEach(([u,w])=>P2(u,w,0,.9,.08,.08,c));P2(0,0,.85,1.45,.75,.3,c);for(let i=-3;i<=3;i++)P2(i*.2,0,.86,1.44,.05,.31,0x1a1a1a);P2(.85,0,1.2,1.75,.22,.16,c)}};
  const acacia=(x,z,s)=>{const y=H(x,z);res(x-1.5,z-1.5,x+1.5,z+1.5);D.push(['cy',x,y-.2,z,.28*s,4.2*s,0x5a4632,'w',8]);B.push([x,z,.5*s,.5*s,y+4.2*s,y-.3,0,'n']);D.push(['cy',x+.8*s,y+3.6*s,z,.12*s,1.4*s,0x5a4632,'w',6]);
   D.push(['cy',x,y+4.2*s,z,3.4*s,.5*s,0x6a8a3a,'p',14]);D.push(['cy',x+.4*s,y+4.6*s,z-.3*s,2.4*s,.4*s,0x7a9a42,'p',12])};
  const hut=(x,z,r0,c,door)=>{const y=H(x,z);res(x-r0-1,z-r0-1,x+r0+1,z+r0+1);ring(x,z,r0-.22,r0+.22,y-.3,y+2.3,c,'p',[door],1.4);BX(x-r0,z-r0,x+r0,z+r0,y-.3,y+.05,0xa08a62,'c',1);D.push(['pyr',x,y+2.3,z,r0*2.5,2.6,0xc8a85a,'z',12]);B.push([x,z,r0*1.6,r0*1.6,y+3.6,y+2.35,0,'n'])};
  const redwood=(x,z,s)=>{const y=H(x,z),h=26*s,r0=1.1*s;D.push(['cy',x,y-.6,z,r0,h+.6,0x7a3a24,'w',12]);D.push(['cy',x,y-.6,z,r0*1.35,1.6,0x6a3220,'w',12]);B.push([x,z,r0*1.7,r0*1.7,y+h,y-.6,0,'n']);
   for(let i=0;i<4;i++){const yy=y+h*(.42+i*.15),w=(7.5-i*1.5)*s;D.push(['pyr',x,yy,z,w,h*.24,i%2?0x2f5a2a:0x29502a,'p',9])}};
  const derrick=(x,z,h,c)=>{const y=H(x,z),b=2.4;res(x-4,z-4,x+4,z+4);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([i,j])=>{for(let k=0;k<8;k++){const t0=k/8,t1=(k+1)/8,w0=b*(1-t0*.8),w1=b*(1-t1*.8);BX(x+i*w1-.12,z+j*w1-.12,x+i*w1+.12,z+j*w1+.12,y+h*t0,y+h*t1,c,'m',k>0)}});
   for(let k=1;k<8;k++){const t=k/8,w=b*(1-t*.8);BX(x-w,z-w-.06,x+w,z-w+.06,y+h*t-.08,y+h*t+.08,c,'m',1);BX(x-w,z+w-.06,x+w,z+w+.06,y+h*t-.08,y+h*t+.08,c,'m',1);BX(x-w-.06,z-w,x-w+.06,z+w,y+h*t-.08,y+h*t+.08,c,'m',1);BX(x+w-.06,z-w,x+w+.06,z+w,y+h*t-.08,y+h*t+.08,c,'m',1)}
   BX(x-b-.3,z-b-.3,x+b+.3,z+b+.3,y-.2,y+.5,0x6a6a6a,'c');BX(x-.6,z-.6,x+.6,z+.6,y+h,y+h+.6,c,'m',1)};
  const pumpjack=(x,z,ax)=>{res(x-4,z-4,x+4,z+4);const y=H(x,z),[a,b]=ax?[1,0]:[0,1];BX(x-.8,z-.8,x+.8,z+.8,y-.2,y+.4,0x6a6a6a,'c');BX(x-.15,z-.15,x+.15,z+.15,y+.4,y+3,0x3a3f46,'m');BX(x-2.6*a-.2*b,z-2.6*b-.2*a,x+2.6*a+.2*b,z+2.6*b+.2*a,y+3,y+3.4,0xd9822b,'m');BX(x+2.6*a-.3,z+2.6*b-.3,x+2.6*a+.3,z+2.6*b+.3,y+1.6,y+3.4,0xd9822b,'m',1);BX(x-2.2*a-.5,z-2.2*b-.5,x-2.2*a+.5,z-2.2*b+.5,y+.4,y+1.6,0x3a3f46,'m')};
  const buoyLine=(RB)=>{const nb=Math.round(2*Math.PI*RB/6),p=[];for(let i=0;i<nb;i++){const a=i/nb*Math.PI*2;p.push([Math.cos(a)*RB,Math.sin(a)*RB])}p.forEach((q,i)=>{D.push(['bu',q[0],q[1],i*.9,i%2?0xf4f4f0:0xe0402e,1]);const nq=p[(i+1)%nb];D.push(['br',q[0],q[1],nq[0],nq[1]])})};
  const pier=(x0,z0,x1,z1,y,w)=>{const ax=Math.abs(x1-x0)>Math.abs(z1-z0);if(ax)BX(Math.min(x0,x1),z0-w/2,Math.max(x0,x1),z0+w/2,y-.25,y,0xa8885c,'4');else BX(x0-w/2,Math.min(z0,z1),x0+w/2,Math.max(z0,z1),y-.25,y,0xa8885c,'4');
   const L2=ax?Math.abs(x1-x0):Math.abs(z1-z0);for(let t=0;t<=L2;t+=3){const px=ax?Math.min(x0,x1)+t:x0,pz=ax?z0:Math.min(z0,z1)+t;post(ax?px:px-w/2+.15,ax?pz-w/2+.15:pz,y-.25);post(ax?px:px+w/2-.15,ax?pz+w/2-.15:pz,y-.25)}};
  const bunting=(x0,z0,x1,z1,y,cols)=>{const L2=Math.hypot(x1-x0,z1-z0),n=Math.max(2,Math.round(L2/.9));for(let i=0;i<n;i++){const t=(i+.5)/n,px=x0+(x1-x0)*t,pz=z0+(z1-z0)*t,sag=Math.sin(t*Math.PI)*.8;BX(px-.18,pz-.18,px+.18,pz+.18,y-sag-.45,y-sag,cols[i%cols.length],'p',1)}};
  const booth=(x,z,ax,c1,c2,kind)=>{const y=H(x,z),[a,b]=ax?[1.8,1.3]:[1.3,1.8];res(x-a-.8,z-b-.8,x+a+.8,z+b+.8);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([i,j])=>BX(x+i*a-.08,z+j*b-.08,x+i*a+.08,z+j*b+.08,y,y+2.7,0xf4f4f0,'w'));
   for(let k=0;k<6;k++){const t0=-1+k/3,t1=t0+1/3;if(ax)BX(x+t0*a,z-b-.25,x+t1*a,z+b+.25,y+2.7,y+2.95,k%2?c1:c2,'p');else BX(x-a-.25,z+t0*b,x+a+.25,z+t1*b,y+2.7,y+2.95,k%2?c1:c2,'p')}
   if(ax){BX(x-a,z-b-.05,x+a,z-b+.4,y,y+1.05,c1,'w');BX(x-a,z+b-.15,x+a,z+b,y,y+2.7,c2,'w')}else{BX(x-b-.05,z-a,x-b+.4,z+a,y,y+1.05,c1,'w');BX(x+b-.15,z-a,x+b,z+a,y,y+2.7,c2,'w')}
   const cc=[0xff5a8a,0x5ab8ff,0xffd23a,0x7ae05a,0xb07bff,0xff8a2a];for(let i=0;i<5;i++){const t=-.8+i*.4;const px=ax?x+t*a:x+b-.5,pz=ax?z+b-.5:z+t*a;if(kind==='bear'){BX(px-.22,pz-.15,px+.22,pz+.15,y+1.5,y+2,cc[i],'p',1);BX(px-.15,pz-.12,px+.15,pz+.12,y+2,y+2.3,cc[i],'p',1)}
    else if(kind==='ring'){BX(px-.06,pz-.06,px+.06,pz+.06,y+1.05,y+1.6,0xf4f4f0,'w',1);BX(px-.14,pz-.14,px+.14,pz+.14,y+1.05,y+1.12,cc[i],'p',1)}else{BX(px-.2,pz-.2,px+.2,pz+.2,y+1.7+(i%2)*.4,y+2.1+(i%2)*.4,cc[i],'e',1)}}
   if(ax)BX(x-a*.9,z-b-.1,x+a*.9,z-b-.04,y+2.95,y+3.5,c2,'p',1);else BX(x-b-.1,z-a*.9,x-b-.04,z+a*.9,y+2.95,y+3.5,c2,'p',1)};
  const cart=(x,z,c)=>{const y=H(x,z);BX(x-.7,z-.45,x+.7,z+.45,y+.3,y+1.15,c,'p');[[-1,-1],[1,1],[1,-1],[-1,1]].forEach(([i,j])=>D.push(['wh',x+i*.5,y+.25,z+j*.48,1]));BX(x-.06,z-.06,x+.06,z+.06,y+1.15,y+2.3,0xf4f4f0,'m',1);D.push(['pyr',x,y+2.3,z,1.8,.6,c,'p',8]);BX(x-.55,z-.35,x+.55,z+.35,y+1.15,y+1.5,0xfff4c8,'e',1)};
  const balloons=(x,z,y)=>{const cc=[0xff3a4a,0x3a8aff,0xffd23a,0x5ad05a,0xff7ad0];for(let i=0;i<5;i++){const a=i*1.26,px=x+Math.cos(a)*.45,pz=z+Math.sin(a)*.45,py=y+2.2+(i%3)*.35;D.push(['cy',px,py,pz,.26,.5,cc[i],'p',10]);BX(px-.01,pz-.01,px+.01,pz+.01,y+.9,py,0xf4f4f0,'m',1)}};

  if(L==='mesa'){const zr=-XS*.6;
   for(let x=-XS;x<XS;x+=1.2)BX(x,zr-1.6,x+.35,zr+1.6,1.25,1.45,0x5a3a22,'w',1);[-0.75,0.75].forEach(o=>BX(-XS,zr+o-.08,XS,zr+o+.08,1.45,1.6,0x6a6a6a,'m'));
   const tr=(x0,len,c,h)=>{BX(x0,zr-1.4,x0+len,zr+1.4,1.9,1.9+h,c,'m');[[.8],[len-.8]].forEach(([o])=>{[-1,1].forEach(s=>D.push(['wh',x0+o,2.1,zr+s*1.05,1]))})};
   tr(18,10,0x2b2b2b,2.4);BX(18,zr-1.2,22,zr+1.2,4.3,6.6,0xa8322a,'p');BX(25,zr-.35,25.7,zr+.35,4.3,6.4,0x2b2b2b,'m');BX(18.2,zr-1.25,21.8,zr+1.25,6.6,6.8,0x2b2b2b,'p');
   tr(5,11,0x8a3a2a,3);tr(-8,11,0x6a4a2a,3);tr(-21,11,0x3a5a6a,3);
   BX(-12,zr+2.2,34,zr+6,1.2,2.1,0x9a7a52,'4');for(let x=-11;x<34;x+=4)BX(x,zr+5.6,x+.25,zr+5.85,2.1,4.6,wd,'w');BX(-12,zr+2.2,34,zr+6,4.6,4.8,0x6b4a2c,'k');
   {const x=33,z=-31,y=H(x,z);[[-2,-2],[2,-2],[-2,2],[2,2]].forEach(([a,b])=>BX(x+a-.2,z+b-.2,x+a+.2,z+b+.2,y-.3,y+8,wd,'w'));BX(x-2.6,z-2.6,x+2.6,z+2.6,y+8,y+12,0x8a5a3a,'w');D.push(['pyr',x,y+12,z,6,2.2,0x5a4636,'t',10])}
   {const x=-39,z=33,y=H(x,z);BX(x-.2,z-.2,x+.2,z+.2,y-.3,y+9,0x4a4a4a,'m');BX(x-2.4,z-.05,x+2.4,z+.05,y+8.6,y+9.2,0xd8d0c0,'m',1);BX(x-.3,z-.05,x+.3,z+.05,y+6.4,y+11.4,0xd8d0c0,'m',1);BX(x-.1,z-.05,x+.1,z+2.4,y+8.7,y+9.1,0x8a3a2a,'m',1)}
   const zc=xriverCross(0,XF.can);xbridge('z',0,zc-15,zc+15,4.6,'wood');
   {const x0=-82,z0=-18;for(let t=0;t<=16;t+=2){BX(x0+t-.12,z0-.12,x0+t+.12,z0+.12,H(x0+t,z0)-.3,H(x0+t,z0)+1.5,wd,'w');BX(x0+t-.12,z0+16-.12,x0+t+.12,z0+16+.12,H(x0+t,z0+16)-.3,H(x0+t,z0+16)+1.5,wd,'w');BX(x0-.12,z0+t-.12,x0+.12,z0+t+.12,H(x0,z0+t)-.3,H(x0,z0+t)+1.5,wd,'w')}
    const y=H(x0+8,z0+8);BX(x0,z0-.05,x0+16,z0+.05,y+.6,y+.75,wd,'w');BX(x0,z0+16-.05,x0+16,z0+16+.05,y+.6,y+.75,wd,'w');for(let i=0;i<5;i++){const hx=x0+3+fr(0,10),hz=z0+3+fr(0,10),hy=H(hx,hz);BX(hx-.8,hz-.5,hx+.8,hz+.5,hy-.1,hy+.9,0xd9b85a,'z')}}
   scatter(120,XS-12,1.6,cactus,(x,z)=>H(x,z)<6);}
  else if(L==='harbor'){const cx=XF.cx,qz=XS*.73;BX(cx-1,-qz,cx+.7,qz,-9,2.25,0x8a8d90,'c');
   for(let z=-qz+4;z<qz;z+=8)BX(cx-.2,z-.3,cx+.5,z+.3,2.25,2.85,0x3a3f46,'m');
   [-50,0,50].forEach(z=>{const y=2.2,c=pick([0xe0a030,0xc23b2f,0x2f6f9a]);[[cx-13,z-5],[cx-13,z+5],[cx-2,z-5],[cx-2,z+5]].forEach(([x,zz])=>BX(x-.6,zz-.6,x+.6,zz+.6,y,y+24,c,'m'));
    BX(cx-13.6,z-5.6,cx-1.4,z+5.6,y+24,y+25.4,c,'m');BX(cx-20,z-1.2,cx+30,z+1.2,y+25.4,y+26.8,c,'m');BX(cx-20,z-2.2,cx-15,z+2.2,y+22,y+25.4,0x5a5f66,'c');BX(cx+.5,z-1.5,cx+3.5,z+1.5,y+22.6,y+25.4,0x3a3f46,'m');BX(cx+.6,z-1.4,cx+3.4,z+1.4,y+23.6,y+25,0x9cc3d8,'G',1);
    BX(cx+18-.05,z-.05,cx+18+.05,z+.05,y+12,y+25.4,0x2b2b2b,'m',1);BX(cx+15,z-1.25,cx+21,z+1.25,y+9.4,y+12,pick([0xa83a2e,0x2f5d9a,0x3a7a4a]),'m')});
   {const x0=cx+3,x1=cx+19,y0=-4,yd=3.6;BX(x0,-46,x1,46,y0,yd,0x2f3f5a,'m');BX(x0+.3,-45.7,x1-.3,45.7,yd,yd+.06,0x7a3a2a,'p',1);BX(x0-.02,-46.02,x1+.02,46.02,yd-1,yd-.4,0xf4f4f0,'p',1);
    for(let k=1;k<=5;k++){const w=8-k*1.4;BX(cx+11-w,46+(k-1)*2,cx+11+w,46+k*2,y0+k*.3,yd,0x2f3f5a,'m')}
    BX(x0+.5,30,x1-.5,44,yd,yd+13,0xf2efe6,'p');for(let f=0;f<4;f++)BX(x0+.45,30.2,x1-.45,43.8,yd+1.2+f*3.2,yd+2.4+f*3.2,0x2a4a6a,'G',1);BX(x0-1,29,x1+1,31,yd+12,yd+12.6,0xf2efe6,'p');BX(cx+9,36,cx+13,40,yd+13,yd+19,0x3a3f46,'m');
    for(let z=-40;z<26;z+=6.4)for(let x=x0+1;x<x1-1.5;x+=2.7){const n=1+(r()*3|0);for(let k=0;k<n;k++)BX(x,z,x+2.5,z+6,yd+k*2.6,yd+(k+1)*2.6,pick([0xa83a2e,0x2f5d9a,0x3a7a4a,0xd98a2b,0xcfd3d6,0x6a3a8a]),'m')}
    for(let k=1;k<=4;k++)BX(cx-.6+(k-1)*.9,-11,cx-.6+k*.9,-8.6,1.8,2.2+.35*k,0x6a6f74,'m')}
   for(let z=-qz+10;z<qz-10;z+=13)for(let x=cx-42;x<cx-22;x+=6.6){if(r()<.3)continue;const n=1+(r()*3|0);for(let k=0;k<n;k++)BX(x,z,x+6,z+2.5,2.2+k*2.6,2.2+(k+1)*2.6,pick([0xa83a2e,0x2f5d9a,0x3a7a4a,0xd98a2b,0xcfd3d6]),'m')}
   {let zw=null;for(let x=cx-10;x<cx+40;x+=.5)if(H(x,XS*.86)<-.5){zw=x;break}if(zw!=null){const x0=zw-6,x1=zw+24,top=1;BX(x0,XS*.86-1.4,x1,XS*.86+1.4,top-.25,top,0xa8885c,'4');for(let x=x0+1;x<x1;x+=3){post(x,XS*.86-1.3,top-.25);post(x,XS*.86+1.3,top-.25)}xboat(zw+10,XS*.86+4.5,1,0xc23b2f);xboat(zw+18,XS*.86-4.5,1,0x2f6f9a)}}
   for(let i=0;i<8;i++){const z=-qz+12+i*(2*qz-24)/7;lamp(cx-3,z,2.2)}}
  else if(L==='autumn'){const Gf=H(46,34);
   [[66,18],[71,24]].forEach(([x,z],i)=>{const y=H(x,z);D.push(['cy',x,y-.3,z,2.6,14+i*2,0xc9ccd0,'m',14]);D.push(['pyr',x,y+13.7+i*2,z,5.4,2.6,0x8a8f94,'m',14]);B.push([x,z,4.6,4.6,y+14+i*2,y-.3,0,'n'])});
   for(let x=32;x<94;x+=1.6)for(let z=62;z<88;z+=1.6){if(r()<.55)continue;const y=H(x,z),s=fr(.35,.6);D.push(['k',x,y+s*.3,z,s,s*.75,pick([0xe8761a,0xd9661a,0xf08a2a]),fr(0,6)])}
   for(let i=0;i<10;i++){const x=fr(30,95),z=fr(14,56);if(!freeAt(x,z,1.2))continue;const y=H(x,z);BX(x-.9,z-.6,x+.9,z+.6,y-.1,y+1.1,0xd9b85a,'z')}
   [[40,60],[96,60],[40,88],[96,88]].forEach(([x,z],i,a)=>{});{const fx0=30,fx1=96,fz0=58,fz1=90;for(let t=fx0;t<=fx1;t+=2.2){[fz0,fz1].forEach(z=>BX(t-.1,z-.1,t+.1,z+.1,H(t,z)-.3,H(t,z)+1.3,wd,'w'))}for(let t=fz0;t<=fz1;t+=2.2){[fx0,fx1].forEach(x=>BX(x-.1,t-.1,x+.1,t+.1,H(x,t)-.3,H(x,t)+1.3,wd,'w'))}
    const y=H(63,74);BX(fx0,fz0-.04,fx1,fz0+.04,y+.8,y+.92,wd,'w');BX(fx0,fz1-.04,fx1,fz1+.04,y+.8,y+.92,wd,'w');BX(fx0-.04,fz0,fx0+.04,fz1-6,y+.8,y+.92,wd,'w');BX(fx1-.04,fz0,fx1+.04,fz1,y+.8,y+.92,wd,'w')}
   {const x=63,z=74,y=H(x,z);BX(x-.1,z-.1,x+.1,z+.1,y-.3,y+2.4,wd,'w');BX(x-1,z-.08,x+1,z+.08,y+1.6,y+1.75,wd,'w',1);BX(x-.4,z-.3,x+.4,z+.3,y+1,y+2,0x3a5a8a,'p');BX(x-.3,z-.3,x+.3,z+.3,y+2,y+2.5,0xe8c070,'z',1);D.push(['pyr',x,y+2.5,z,1.1,.6,0x8a5a2a,'z'])}
   {const cx0=-65,cz0=39,n=10,c=3.4,G2=H(-48,56),vis=new Set(),wall=[];const id=(i,j)=>i*n+j;const cell=[];for(let i=0;i<n;i++)for(let j=0;j<n;j++)cell.push([i,j]);
    const st=[[0,0]],V2=new Set(['0,0']),open=new Set();while(st.length){const[i,j]=st[st.length-1];const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>[i+a,j+b]).filter(([a,b])=>a>=0&&b>=0&&a<n&&b<n&&!V2.has(a+','+b));if(!nb.length){st.pop();continue}const[a,b]=nb[r()*nb.length|0];open.add([i,j,a,b].join());open.add([a,b,i,j].join());V2.add(a+','+b);st.push([a,b])}
    const wseg=(x0,z0,x1,z1)=>{B.push([(x0+x1)/2,(z0+z1)/2,Math.max(.5,x1-x0),Math.max(.5,z1-z0),G2+2.7,G2-.3,0,'n']);const L3=Math.max(x1-x0,z1-z0),hz=x1-x0>z1-z0;for(let t=0;t<L3;t+=.7){const x=hz?x0+t:x0,z=hz?z0:z0+t;D.push(['cn',x+fr(-.15,.15),G2,z+fr(-.15,.15),fr(2.4,3),fr(0,6.28)])}};
    for(let i=0;i<n;i++)for(let j=0;j<n;j++){const x=cx0+i*c,z=cz0+j*c;if(i<n-1&&!open.has([i,j,i+1,j].join()))wseg(x+c,z,x+c,z+c);if(j<n-1&&!open.has([i,j,i,j+1].join()))wseg(x,z+c,x+c,z+c)}
    wseg(cx0,cz0,cx0+c*n,cz0);wseg(cx0,cz0+c*n,cx0+c*(n-1),cz0+c*n);wseg(cx0,cz0+c,cx0,cz0+c*n);wseg(cx0+c*n,cz0,cx0+c*n,cz0+c*n);
    const mx=cx0+c*n/2,mz=cz0+c*n/2;BX(mx-.8,mz-.8,mx+.8,mz+.8,G2,G2+.9,0x6b4a2c,'k');D.push(['k',mx,G2+1.3,mz,.6,.45,0xe8761a,0])}
   windmill(48,-64,0xd9d0c0)}
  else if(L==='sakura'){const Gp=H(0,-74),y0=Gp;
   {const s0=7;BX(-s0-1.5,-74-s0-1.5,s0+1.5,-74+s0+1.5,y0-.6,y0+.5,stn,'s');
    BX(-s0,-74-s0,s0,-74-s0+.4,y0+.5,y0+3.8,0xf2e8d8,'p');BX(-s0,-74+s0-.4,-1.4,-74+s0,y0+.5,y0+3.8,0xf2e8d8,'p');BX(1.4,-74+s0-.4,s0,-74+s0,y0+.5,y0+3.8,0xf2e8d8,'p');BX(-1.4,-74+s0-.4,1.4,-74+s0,y0+3,y0+3.8,0xf2e8d8,'p');
    BX(-s0,-74-s0+.4,-s0+.4,-74+s0-.4,y0+.5,y0+3.8,0xf2e8d8,'p');BX(s0-.4,-74-s0+.4,s0,-74+s0-.4,y0+.5,y0+3.8,0xf2e8d8,'p');[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>BX(a*s0-.35,-74+b*s0-.35,a*s0+.35,-74+b*s0+.35,y0+.5,y0+3.8,0x9a2a20,'p'));
    BX(-2,-74-2,2,-74+2,y0+.6,y0+1.6,0x8a6a3a,'k');BX(-.4,-74-.4,.4,-74+.4,y0+1.6,y0+2.6,0xe8c070,'e',1);
    let y=y0+3.8;for(let k=0;k<5;k++){const s=s0-k*1.1;BX(-s-2.4,-74-s-2.4,s+2.4,-74+s+2.4,y,y+.45,0x3a3f46,'h');[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>BX(a*(s+2.4)-.4,-74+b*(s+2.4)-.4,a*(s+2.4)+.4,-74+b*(s+2.4)+.4,y+.45,y+.9,0x3a3f46,'h'));
     if(k<4){BX(-s+1.1,-74-s+1.1,s-1.1,-74+s-1.1,y+.45,y+3.3,0x9a2a20,'w');BX(-s+1.05,-74-s+1.05,s-1.05,-74+s-1.05,y+1.4,y+2.4,0xf2e8d8,'p',1)}y+=3.3}
    BX(-.25,-74-.25,.25,-74+.25,y,y+6,0xc9a040,'m');for(let k=0;k<5;k++)BX(-.6,-74-.6,.6,-74+.6,y+1+k,y+1.2+k,0xc9a040,'m',1)}
   for(let z=-56;z>=-25;z-=10.5)torii(0,z,0,1);torii(0,-14,0,1.3);
   xbridge('z',0,-16,36,3,'wood');for(let i=0;i<14;i++){const a=i/14*6.283,x=Math.cos(a)*33,z=10+Math.sin(a)*21;if(Math.abs(x)<4||Math.abs(z-10)<4)continue;lantern(x,z)}
   for(let i=0;i<9;i++){const x=fr(-24,24),z=10+fr(-12,12);BX(x-.5,z-.2,x+.5,z+.2,-.9,-.7,pick([0xff8a2a,0xffffff,0xe8461a]),'p',1)}
   {const x0=-82,z0=-66,G2=H(-68,-54);BX(x0+1,z0+1,x0+29,z0+25,G2-.2,G2+.06,0xe8e2d0,'u',1);for(let t=x0;t<=x0+30;t+=1.5){BX(t-.08,z0-.08,t+.08,z0+.08,G2,G2+.5,wd,'w');BX(t-.08,z0+26-.08,t+.08,z0+26+.08,G2,G2+.5,wd,'w')}
    [[-74,-60,2.2],[-62,-52,1.6],[-70,-48,1.2],[-58,-60,1.4],[-66,-56,.9]].forEach(([x,z,s])=>boulder(x,z,s,s*.9,0x7a7a72))}
   for(let g=0;g<6;g++){const cx=fr(-XS*.85,-XS*.2),cz=fr(-XS*.85,XS*.85);if(!freeAt(cx,cz,6)||!dryAt(cx,cz))continue;for(let i=0;i<45;i++){const x=cx+fr(-6,6),z=cz+fr(-6,6);D.push(['cn',x,H(x,z),z,fr(5,8),fr(0,6.28)])}}}
  else if(L==='ruins'){const G=XF.G,cz=-10;
   for(let k=0;k<7;k++){const h=22-3*k;BX(-h,cz-h,h,cz+h,G+k*2.6-(k?0:1.5),G+(k+1)*2.6,0x8a8f6a,'s')}
   {const top=G+18.2,n=44,z0=cz+22+5,z1=cz+4,run=(z0-z1)/n;for(let k=1;k<=n;k++){const za=z0-k*run;BX(-3.5,za,3.5,za+run,G-1.5,G+top-G-(n-k)*(top-G)/n,0x9a9a7a,'s')}
    BX(-3.6,cz-4,-3.2,cz+4,top,top+4,0x8a8f6a,'s');BX(3.2,cz-4,3.6,cz+4,top,top+4,0x8a8f6a,'s');BX(-3.6,cz-4,3.6,cz-3.6,top,top+4,0x8a8f6a,'s');[[-3.4,3.8],[3.4,3.8],[-1.2,3.8],[1.2,3.8]].forEach(([x,o])=>BX(x-.3,cz+o-.3,x+.3,cz+o+.3,top,top+4,0x8a8f6a,'s'));
    BX(-4.2,cz-4.6,4.2,cz+4.6,top+4,top+4.8,0x7a7f5a,'s');BX(-1.2,cz-2,1.2,cz-.5,top,top+1,0x6a6a5a,'s');BX(-.4,cz-1.6,.4,cz-.9,top+1,top+1.6,0x4fd1a0,'e',1)}
   for(let i=0;i<8;i++)[-1,1].forEach(s=>{const x=s*9,z=40+i*4.5,y=H(x,z),h=r()<.3?fr(1,3):fr(4,7);D.push(['cy',x,y-.3,z,.75,h+.3,0x9a9a8a,'s',10]);B.push([x,z,1.4,1.4,y+h,y-.3,0,'n'])});
   [[-30,46],[34,52],[-50,-40]].forEach(([x,z])=>{const y=H(x,z);BX(x-3,z-.7,x+3,z+.7,y-.1,y+1.3,0x9a9a8a,'s')});
   [[-22,40],[22,40]].forEach(([x,z])=>{const y=H(x,z);BX(x-1.5,z-1.5,x+1.5,z+1.5,y-.3,y+1,0x8a8f6a,'s');BX(x-.8,z-.8,x+.8,z+.8,y+1,y+9,0x8a8f6a,'s');D.push(['pyr',x,y+9,z,1.6,1.8,0x8a8f6a,'s'])});
   const zc=xriverCross(0,XF.riv);xbridge('z',0,zc-17,zc+17,6,'stone');
   [[-XS*.5],[XS*.45]].forEach(([x])=>{const z2=xriverCross(x,XF.riv);xbridge('z',x,z2-17,z2+17,1.8,'rope')});
   scatter(160,XS-12,2,(x,z)=>xpalm(x,z,fr(-1,1),fr(-1,1),fr(.05,.2)),(x,z)=>dryAt(x,z)&&H(x,z)<8)}
  else if(L==='lunar'){const G=2;
   xdome(0,0,G,15,[0,Math.PI/2,Math.PI,-Math.PI/2],2.2,0xe8ecf0);
   [[40,0,Math.PI],[-40,0,0],[0,40,-Math.PI/2],[0,-40,Math.PI/2]].forEach(([x,z,a])=>xdome(x,z,G,9,[a,a+Math.PI],2.2,0xdfe4ea));
   [[15,31,'x',0],[-31,-15,'x',0],[15,31,'z',0],[-31,-15,'z',0]].forEach(([a,b,ax])=>{const sg=a>0?1:-1;[0].forEach(()=>{});const c=0xc9ced6;
    if(ax==='x'){BX(a-.5,-2.7,b+.5,-2.2,G-.5,G+3.4,c,'m');BX(a-.5,2.2,b+.5,2.7,G-.5,G+3.4,c,'m');BX(a-.5,-2.7,b+.5,2.7,G+3.4,G+3.9,c,'m');BX(a,-2.2,b,2.2,G-.2,G+.05,0x8a8f96,'m',1)}
    else{BX(-2.7,a-.5,-2.2,b+.5,G-.5,G+3.4,c,'m');BX(2.2,a-.5,2.7,b+.5,G-.5,G+3.4,c,'m');BX(-2.7,a-.5,2.7,b+.5,G+3.4,G+3.9,c,'m');BX(-2.2,a,2.2,b,G-.2,G+.05,0x8a8f96,'m',1)}});
   [[49,0],[-49,0],[0,49],[0,-49]].forEach(([x,z])=>{const ax=x!==0,c=0xc9ced6;if(ax){BX(x-1,-2.7,x+1,-2.2,G-.5,G+3.4,c,'m');BX(x-1,2.2,x+1,2.7,G-.5,G+3.4,c,'m');BX(x-1,-2.7,x+1,2.7,G+3.4,G+3.9,c,'m')}else{BX(-2.7,z-1,-2.2,z+1,G-.5,G+3.4,c,'m');BX(2.2,z-1,2.7,z+1,G-.5,G+3.4,c,'m');BX(-2.7,z-1,2.7,z+1,G+3.4,G+3.9,c,'m')}});
   BX(-3,-3,3,3,G,G+1,0x3a3f46,'m');D.push(['cy',0,G+1,0,1.6,3.2,0x5fe0ff,'e',16]);for(let i=0;i<6;i++){const a=i/6*6.283;BX(Math.cos(a)*7-.8,Math.sin(a)*7-.5,Math.cos(a)*7+.8,Math.sin(a)*7+.5,G,G+1.1,0x5a6070,'m');BX(Math.cos(a)*7-.6,Math.sin(a)*7-.3,Math.cos(a)*7+.6,Math.sin(a)*7+.3,G+1.1,G+1.4,0x7fd0ff,'e',1)}
   [[40,0],[-40,0],[0,40],[0,-40]].forEach(([x,z],i)=>{for(let k=0;k<3;k++){const a=k*2.1+i,px=x+Math.cos(a)*5,pz=z+Math.sin(a)*5;BX(px-.9,pz-.5,px+.9,pz+.5,G,G+.6,[0x5a6a8a,0x8a5a5a,0x5a8a6a][k],'q')}crates(x+2,z-3,2)});
   {const x=XS*.55,z=-XS*.45,Gp=XF.Gp;BX(x-18,z-18,x+18,z+18,Gp-.4,Gp+.1,0x7a7c80,'c');BX(x-2.6,z-2.6,x+2.6,z+2.6,Gp+.1,Gp+34,0xf2f2f0,'p');for(let k=0;k<4;k++)BX(x-2.65,z-2.65,x+2.65,z+2.65,Gp+6+k*7,Gp+7+k*7,0x2b2b2b,'p',1);
    D.push(['pyr',x,Gp+34,z,5.2,8,0xf2f2f0,'p',8]);[[-1,0],[1,0],[0,-1],[0,1]].forEach(([a,b])=>BX(x+a*2.6-(a?(a>0?0:2.4):.15),z+b*2.6-(b?(b>0?0:2.4):.15),x+a*2.6+(a?(a>0?2.4:0):.15),z+b*2.6+(b?(b>0?2.4:0):.15),Gp+.1,Gp+6,0xc23b2f,'p'));
    [[-4.4,0],[4.4,0]].forEach(([o])=>{BX(x+o-1.2,z-1.2,x+o+1.2,z+1.2,Gp+.1,Gp+18,0xe8e8e4,'p');D.push(['pyr',x+o,Gp+18,z,2.4,3,0xe8e8e4,'p',8])});
    const gx=x+10;[[-2,-2],[2,-2],[-2,2],[2,2]].forEach(([a,b])=>BX(gx+a-.25,z+b-.25,gx+a+.25,z+b+.25,Gp,Gp+30,0x8a3a2a,'m'));for(let hh=4;hh<30;hh+=4)BX(gx-2.3,z-2.3,gx+2.3,z+2.3,hh+Gp,hh+Gp+.3,0x8a3a2a,'m',1);BX(gx-2.5,z-2.5,gx+2.5,z+2.5,Gp+8,Gp+8.3,0x6a6f74,'m');
    for(let k=1;k<=19;k++)BX(gx+2.6,z-12+(k-1)*.5,gx+4,z-12+k*.5,Gp-.1,Gp+k*.42,0x6a6f74,'m')}
   for(let row=0;row<4;row++)for(let i=0;i<6;i++){const x=-XS*.6+i*5,z=XS*.35+row*6,y=H(x,z);BX(x-.1,z-.1,x+.1,z+.1,y-.3,y+1.4,0x6a6f74,'m');BX(x-2.2,z-1.4,x+2.2,z+1.4,y+1.4,y+1.55,0x2a4a8a,'g')}
   [[-XS*.3,XS*.6],[XS*.25,XS*.55],[-XS*.6,-XS*.35]].forEach(([x,z])=>{const y=H(x,z);BX(x-1.5,z-2.4,x+1.5,z+2.4,y+.7,y+2,0xe8e8e4,'p');BX(x-1,z-1,x+1,z+1.6,y+2,y+2.9,0x9cc3d8,'G');[[-1.6,-1.8],[1.6,-1.8],[-1.6,0],[1.6,0],[-1.6,1.8],[1.6,1.8]].forEach(([a,b])=>D.push(['wh',x+a,y+.55,z+b,0]))});
   {const x=-XS*.35,z=-XS*.62,y=H(x,z);BX(x-.4,z-.4,x+.4,z+.4,y-.3,y+16,0xb8bec6,'m');BX(x-3,z-.3,x+3,z+.3,y+15,y+16.6,0xe8ecf0,'m');BX(x-.3,z-3,x+.3,z+3,y+15,y+16.6,0xe8ecf0,'m');BX(x-.3,z-.3,x+.3,z+.3,y+16.6,y+17.4,0xff3030,'e',1)}}
  else if(L==='bayou'){const zb=XF.zb,xb=XF.xb,bw=1.5;
   BX(-XS*.72,zb-1.5,XS*.72,zb+1.5,bw-.25,bw,0x8a7a5a,'4');for(let x=-XS*.72;x<XS*.72;x+=3){post(x,zb-1.4,bw-.25);post(x,zb+1.4,bw-.25)}
   BX(xb-1.5,-XS*.75,xb+1.5,zb-1.5,bw-.25,bw,0x8a7a5a,'4');BX(xb-1.5,zb+1.5,xb+1.5,XS*.75,bw-.25,bw,0x8a7a5a,'4');for(let z=-XS*.75;z<XS*.75;z+=3){post(xb-1.4,z,bw-.25);post(xb+1.4,z,bw-.25)}
   [[-XS*.72,zb,1],[XS*.72,zb,1],[xb,-XS*.75,0],[xb,XS*.75,0]].forEach(([x,z,ax])=>{const gy=H(x,z);if(gy>bw-.6)return;for(let k=1;k<=3;k++){}});
   for(let x=-XS*.7;x<XS*.7;x+=9)lamp(x,zb+1.2,bw);
   {let bx=null,bzz=0;for(let i=0;i<4000&&bx==null;i++){const cx=fr(-XS*.7,XS*.6),cz=fr(-XS*.7,XS*.7);if([[0,0],[-38,-6],[-38,6],[6,-6],[6,6],[-16,0]].every(([a,b])=>H(cx+a,cz+b)<-1.1)&&freeAt(cx-16,cz,12)){bx=cx;bzz=cz}}
   if(bx!=null){const x0=bx-38,x1=bx+2,z=bzz,y=W0;BX(x0,z-5,x1,z+5,y-1.2,y+2.4,0xf2efe6,'p');BX(x0-.02,z-5.02,x1+.02,z+5.02,y+1.2,y+1.6,0xc23b2f,'p',1);
    BX(x0+4,z-4.4,x1-4,z+4.4,y+2.4,y+5,0xf2efe6,'p');BX(x0+4.4,z-4.45,x1-4.4,z+4.45,y+3.2,y+4.4,0x2a4a6a,'G',1);BX(x0+3,z-5,x1-3,z+5,y+5,y+5.3,0xd8d0c0,'p');
    BX(x0+8,z-4.9,x1-8,z+4.9,y+5.3,y+7.6,0xf2efe6,'p');BX(x0+7.6,z-5.2,x1-7.6,z+5.2,y+7.6,y+7.9,0x3a3f46,'p');[-2.4,2.4].forEach(o=>{D.push(['cy',x0+20,y+7.9,z+o,.7,8,0x2b2b2b,'m',10]);B.push([x0+20,z+o,1.3,1.3,y+15.9,y+7.9,0,'n'])});
    BX(x1,z-4,x1+3,z+4,y-1,y+4,0xc23b2f,'w');for(let k=1;k<=6;k++)BX(x0+2+(k-1)*.7,z+3.2,x0+2+k*.7,z+4.8,y+2.4,y+2.4+k*.45,0x8a7a5a,'4');
    }}
   for(let i=0;i<10;i++){const x=fr(-XS*.8,XS*.8),z=fr(-XS*.8,XS*.8);if(H(x,z)>-1.2||!freeAt(x,z,3))continue;xboat(x,z,r()<.5?1:0,pick([0x6a5a3a,0x4a5a3a,0x7a3a2a]),2.6)}
   for(let i=0;i<260;i++){const x=fr(-XS*.85,XS*.85),z=fr(-XS*.85,XS*.85);if(H(x,z)>-.6)continue;D.push(['cy',x,(W0||0)+.01,z,fr(.4,.8),.03,0x3a7a2a,'p',8])}
   for(let i=0,n=0;i<600&&n<55;i++){const x=fr(-XS*.85,XS*.85),z=fr(-XS*.85,XS*.85);if(!freeAt(x,z,2))continue;const lo=H(x,z),h2=fr(7,10);B.push([x,z,.9,.9,lo+h2,lo-.6,0x2a2119,'w']);D.push(['d',x,lo+h2,z,fr(.8,1.2)]);n++}}
  else if(L==='castle'){const G=XF.G;xfort(0,-10,30,G,[{side:'s',at:0}],0x9a968c);
   {const y=G;D.push(['cy',-8,y-.3,-30,1.4,1.2,0x8a8780,'s',12]);B.push([-8,-30,2.6,2.6,y+.9,y-.3,0,'n']);[[-9.2],[-6.8]].forEach(([x])=>BX(x-.1,-30.1,x+.1,-29.9,y+.9,y+2.6,wd,'w'));BX(-9.4,-30.4,-6.6,-29.6,y+2.6,y+2.8,0x6b4a2c,'k',1)}
   [[-14,10],[12,-30],[18,12]].forEach(([x,z])=>crates(x,z,2));
   const zc=xriverCross(0,XF.riv);xbridge('z',0,zc-17,zc+17,6,'stone');{const x=-XS*.45,z2=xriverCross(x,XF.riv);xbridge('z',x,z2-17,z2+17,4,'stone')}
   {const x=XS*.45,z=XS*.22,Gt=XF.Gt;for(let t=-24;t<=24;t+=2.4){[z-16,z+16].forEach(zz=>BX(x+t-.1,zz-.1,x+t+.1,zz+.1,Gt-.3,Gt+1.3,wd,'w'))}BX(x-24,z-16.04,x+24,z-15.96,Gt+.9,Gt+1.05,wd,'w');BX(x-24,z+15.96,x+24,z+16.04,Gt+.9,Gt+1.05,wd,'w');
    BX(x-20,z-.1,x+20,z+.1,Gt-.3,Gt+1.2,0xe8dcc0,'w');for(let k=0;k<4;k++)BX(x-14,z+17+k*1.2,x+14,z+18.2+k*1.2,Gt-.3,Gt+.6+k*.8,0x8a6a4a,'k');
    [[-22,-12,0xc23b2f],[-22,12,0x2f5d9a],[22,-12,0xe0a030],[22,12,0x3a9a4a],[0,-12,0xf4f4f0]].forEach(([a,b,c])=>tent(x+a,z+b,c))}
   windmill(XS*.5,-XS*.5,0xe8dcc0);
   scatter(10,XS*.8,3,(x,z)=>{const y=H(x,z);BX(x-.8,z-.8,x+.8,z+.8,y-.3,y+1.2,0x9a968c,'s')},(x,z)=>dryAt(x,z))}
  else if(L==='park'){const G=1.1;
   {const R0=7;D.push(['cy',0,G,0,R0,.5,0xd9b85a,'k',24]);B.push([0,0,R0*1.6,R0*1.6,G+.5,G-.3,0,'n']);BX(-.8,-.8,.8,.8,G,G+4.6,0xc23b2f,'p');D.push(['pyr',0,G+4.6,0,R0*2.3,4,0xe8553a,'p',12]);D.push(['pyr',0,G+4.62,0,R0*2.32,3.6,0xf4f4f0,'p',6]);B.push([0,0,R0*1.5,R0*1.5,G+6,G+4.6,0,'n']);
    for(let i=0;i<8;i++){const a=i/8*6.283;BX(Math.cos(a)*R0*1.05-.15,Math.sin(a)*R0*1.05-.15,Math.cos(a)*R0*1.05+.15,Math.sin(a)*R0*1.05+.15,G+.5,G+4.7,0xe8c070,'m')}
    for(let i=0;i<12;i++){const a=i/12*6.283+.2,x=Math.cos(a)*4.8,z=Math.sin(a)*4.8;BX(x-.05,z-.05,x+.05,z+.05,G+.5,G+4.6,0xe8c070,'m',1);BX(x-.6,z-.25,x+.6,z+.25,G+1.3,G+2.1,pick([0xf4f4f0,0xc23b2f,0x2f6fd8,0xe0a030,0x8a5a3a]),'p',1)}}
   {const cx=XS*.5,cz=-XS*.15,hy=G+22,R2=17;for(let i=0;i<64;i++){const a=i/64*6.283;BX(cx+Math.cos(a)*R2-.35,cz-.25,cx+Math.cos(a)*R2+.35,cz+.25,hy+Math.sin(a)*R2-.35,hy+Math.sin(a)*R2+.35,0xf4f4f0,'m',1)}
    for(let k=0;k<12;k++){const a=k/12*6.283;for(let t=1;t<10;t++){const rr=R2*t/10;BX(cx+Math.cos(a)*rr-.12,cz-.12,cx+Math.cos(a)*rr+.12,cz+.12,hy+Math.sin(a)*rr-.12,hy+Math.sin(a)*rr+.12,0xd8d8d8,'m',1)}
     const gx=cx+Math.cos(a)*R2,gy=hy+Math.sin(a)*R2;BX(gx-.06,cz-.06,gx+.06,cz+.06,gy-1.2,gy,0x8a8a8a,'m',1);BX(gx-1.1,cz-1.1,gx+1.1,cz+1.1,gy-3.1,gy-1.2,pick([0xc23b2f,0x2f6fd8,0xe0a030,0x3aa060,0xb07bff]),'p')}
    [-4,4].forEach(o=>{for(let t=0;t<14;t++){const f=t/14;[-1,1].forEach(s=>{const x=cx+s*(10-10*f),y=G+f*(hy-G);BX(x-.25,cz+o-.25,x+.25,cz+o+.25,y,y+1.6,0x8a8f96,'m',t<2?0:1)})}});BX(cx-1,cz-4.4,cx+1,cz+4.4,hy-1,hy+1,0x5a5f66,'m',1);BX(cx-6,cz-6,cx+6,cz+6,G-.2,G+.6,0xb8b2a0,'c')}
   {const X0=-XS*.72,X1=XS*.25,Z0=-XS*.8,Z1=-XS*.52,pts=[];const per=2*(X1-X0)+2*(Z1-Z0);
    const P2=s=>{let t=s;if(t<X1-X0)return[X0+t,Z0];t-=X1-X0;if(t<Z1-Z0)return[X1,Z0+t];t-=Z1-Z0;if(t<X1-X0)return[X1-t,Z1];t-=X1-X0;return[X0,Z1-t]};
    const hgt=s=>{const f=s/per;if(f<.06)return 1.2;if(f<.28)return 1.2+22*(f-.06)/.22;if(f<.33)return 23.2-18*(f-.28)/.05;if(f<.5)return 5.2+9*Math.sin((f-.33)/.17*Math.PI);if(f<.7)return 5.2+6*Math.sin((f-.5)/.2*Math.PI*2)**2;if(f<.9)return 5.2-4*(f-.7)/.2;return 1.2};
    for(let s=0;s<per;s+=1){const[x,z]=P2(s),[x2,z2]=P2(Math.min(per-.01,s+1)),y=G+hgt(s+.5),hz=Math.abs(x2-x)>Math.abs(z2-z);if(hz)BX(Math.min(x,x2),z-1.1,Math.max(x,x2),z+1.1,y-.3,y,0xc23b2f,'m');else BX(x-1.1,Math.min(z,z2),x+1.1,Math.max(z,z2),y-.3,y,0xc23b2f,'m');
     if(hz){BX(Math.min(x,x2),z-1.15,Math.max(x,x2),z-1.05,y,y+.25,0xf4f4f0,'m',1);BX(Math.min(x,x2),z+1.05,Math.max(x,x2),z+1.15,y,y+.25,0xf4f4f0,'m',1)}
     if(s%5===0&&y>G+1.6&&clearAt(x,z,-99,.4)){BX(x-.3,z-.3,x+.3,z+.3,G-.3,y-.3,0xf4f4f0,'m')}}
    for(let k=0;k<4;k++){const[x,z]=P2(4+k*2.6);BX(x-1.2,z-1,x+1.2,z+1,G+1.2,G+2.4,pick([0x2f6fd8,0xe0a030,0x3aa060,0xb07bff]),'p')}
    const[sx,sz]=P2(2);BX(sx-2,sz-4,sx+12,sz-1.4,G-.2,G+1.2,0xb8b2a0,'c');[[-1.5],[11]].forEach(([o])=>BX(sx+o-.2,sz-4,sx+o+.2,sz-3.6,G+1.2,G+4.2,0xf4f4f0,'m'));BX(sx-2.2,sz-4.4,sx+12.2,sz-1,G+4.2,G+4.5,0x2f6fd8,'p')}
   {const x0=-XS*.58,x1=-XS*.34,z0=XS*.14,z1=XS*.36;BX(x0,z0,x1,z1,G-.2,G+.15,0x4a4f57,'c',1);[[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(([x,z])=>BX(x-.3,z-.3,x+.3,z+.3,G,G+5,0xe8c070,'m'));BX(x0-.5,z0-.5,x1+.5,z1+.5,G+5,G+5.4,0xe8553a,'p');
    BX(x0,z0,x1,z0+.3,G,G+.6,0xf4f4f0,'p');BX(x0,z1-.3,x1,z1,G,G+.6,0xf4f4f0,'p');BX(x0,z0,x0+.3,z1-4,G,G+.6,0xf4f4f0,'p');BX(x1-.3,z0+4,x1,z1,G,G+.6,0xf4f4f0,'p');
    for(let i=0;i<8;i++){const x=fr(x0+2,x1-2),z=fr(z0+2,z1-2);BX(x-.8,z-.55,x+.8,z+.55,G+.15,G+.75,pick([0xc23b2f,0x2f6fd8,0xe0a030,0x3aa060,0xb07bff]),'p');BX(x-.05,z-.05,x+.05,z+.05,G+.75,G+2.4,0x8a8a8a,'m',1)}}
   {const x=0,z=XS*.78;[[-7],[7]].forEach(([o])=>{BX(x+o-1.5,z-1.5,x+o+1.5,z+1.5,G-.3,G+9,0xe8553a,'p');D.push(['pyr',x+o,G+9,z,3.4,2.4,0xf2c230,'p',8])});BX(x-6,z-1,x+6,z+1,G+6.4,G+8.2,0xf2c230,'p');BX(x-5.6,z-1.05,x+5.6,z+1.05,G+6.8,G+7.8,0xc23b2f,'p',1);
    [[-12],[12]].forEach(([o])=>{BX(x+o-1.6,z-1.2,x+o+1.6,z+1.2,G-.2,G+2.6,0xf4f4f0,'p');BX(x+o-1.8,z-1.4,x+o+1.8,z+1.4,G+2.6,G+2.9,0x2f6fd8,'p')})}
   {const x=XS*.45,z=XS*.73;BX(x-1.4,z-1.4,x+1.4,z+1.4,G-.3,G+36,0x5a5f66,'m');BX(x-3,z-3,x+3,z+3,G+2,G+3.4,0xe8553a,'p');BX(x-2,z-2,x+2,z+2,G+36,G+38,0xf2c230,'p');for(let k=0;k<8;k++)BX(x-1.5,z-1.5,x+1.5,z+1.5,G+6+k*3.8,G+6.4+k*3.8,0xf4f4f0,'m',1)}
   [[14,-6],[-14,6],[18,XS*.45-4],[-18,XS*.45+4],[XS*.3,4],[-XS*.3,-4],[XS*.6,XS*.45+5],[-XS*.6,XS*.45-5]].forEach(([x,z],i)=>{if(freeAt(x,z,2.6))stall(x,z,G,i%2)});
   for(let t=-XS*.8;t<=XS*.8;t+=16){if(Math.abs(t)<14)continue;lamp(t,3.6,G);lamp(3.6,t,G)}
   // ===== carnival upgrade: midway booths, big top, more rides, carts, balloons, bunting, food court =====
   {const BC=[[0xe8553a,0xf4f4f0],[0x2f6fd8,0xf2c230],[0x3aa060,0xf4f4f0],[0xb07bff,0xf2c230],[0xf2c230,0xe8553a],[0x2f9ab0,0xf4f4f0]],KD=['bear','ring','lamp'];let bi=0;
    // midway: game booths both sides of the main paths
    for(let t=22;t<XS*.82;t+=8.5)[[t,0,1],[-t,0,1],[0,t,0]].forEach(([x,z,ax])=>[-1,1].forEach(sd=>{const px=ax?x:x+sd*8.2,pz=ax?z+sd*8.2:z;if(!freeAt(px,pz,2.4))return;const[c1,c2]=BC[bi%BC.length];booth(px,pz,ax,c1,c2,KD[bi%3]);bi++}));
    // bunting between the lamps along the paths
    const BNT=[0xe8553a,0xf2c230,0x2f6fd8,0x3aa060,0xf4f4f0,0xb07bff];for(let t=-XS*.8;t<XS*.8-16;t+=16){if(Math.abs(t)<14||Math.abs(t+16)<14)continue;bunting(t,3.6,t+16,3.6,G+4.7,BNT);bunting(3.6,t,3.6,t+16,G+4.7,BNT)}
    // circus big top: canvas wall with two entrances, striped roof, centre ring and bleachers
    {const cx=-75,cz=-30,R1=16;ring(cx,cz,R1-.3,R1+.3,G-.3,G+3.6,0xf4f4f0,'p',[0,Math.PI],4);for(let i=0;i<40;i++){const a=i/40*6.283;if(Math.abs(Math.sin(a))<.16)continue;const x=cx+Math.cos(a)*(R1+.33),z=cz+Math.sin(a)*(R1+.33);if(i%2)BX(x-.4,z-.4,x+.4,z+.4,G,G+3.5,0xe8553a,'p',1)}
     D.push(['pyr',cx,G+3.6,cz,R1*2.3,9,0xe8553a,'p',16]);D.push(['pyr',cx,G+3.62,cz,R1*2.32,8.4,0xf4f4f0,'p',8]);BX(cx-.35,cz-.35,cx+.35,cz+.35,G,G+14,0xf2c230,'m');BX(cx+.35,cz-.05,cx+2.4,cz+.05,G+12.6,G+13.8,0x2f6fd8,'p',1);
     D.push(['cy',cx,G,cz,5,.5,0xc23b2f,'p',24]);B.push([cx,cz,8,8,G+.5,G-.3,0,'n']);D.push(['cy',cx,G+.5,cz,4.5,.02,0xe8d090,'p',24]);
     for(let k=0;k<3;k++)[[0,-1],[0,1]].forEach(([a,b])=>BX(cx-7,cz+b*(9+k*1.2)-.6,cx+7,cz+b*(9+k*1.2)+.6,G-.2,G+.45*(k+1),0x8a5a3a,'w'));[[-4],[4]].forEach(([o])=>{BX(cx+o-.6,cz-.6,cx+o+.6,cz+.6,G+.5,G+1.3,0xf2c230,'p');BX(cx+o-.45,cz-.45,cx+o+.45,cz+.45,G+1.3,G+1.4,0x2f6fd8,'p',1)});
     [[cx+R1+2,cz-3],[cx+R1+2,cz+3]].forEach(([x,z])=>{BX(x-.6,z-.6,x+.6,z+.6,G,G+3.2,0xe8553a,'p');D.push(['pyr',x,G+3.2,z,1.6,1.4,0xf2c230,'p',8])})}
    // wave swinger: pole, spinning top and chair swings
    {const x=40,z=-40;D.push(['cy',x,G,z,4,.4,0x8a8f96,'m',20]);B.push([x,z,6.4,6.4,G+.4,G-.3,0,'n']);BX(x-.5,z-.5,x+.5,z+.5,G,G+10,0x2f6fd8,'m');D.push(['cy',x,G+9.2,z,5.4,.6,0xf2c230,'p',20]);D.push(['pyr',x,G+9.8,z,8,2.2,0xe8553a,'p',12]);
     for(let i=0;i<14;i++){const a=i/14*6.283,sx=x+Math.cos(a)*6.4,sz=z+Math.sin(a)*6.4,ex=x+Math.cos(a)*5,ez=z+Math.sin(a)*5;BX(Math.min(sx,ex)-.03,Math.min(sz,ez)-.03,Math.max(sx,ex)+.03,Math.max(sz,ez)+.03,G+9.15,G+9.2,0x8a8a8a,'m',1);BX(sx-.02,sz-.02,sx+.02,sz+.02,G+3,G+9.2,0x8a8a8a,'m',1);BX(sx-.3,sz-.3,sx+.3,sz+.3,G+2.6,G+3,pick([0xe8553a,0x3aa060,0xb07bff,0xf2c230]),'p',1)}
     ring(x,z,9.3,9.6,G-.2,G+1,0xf4f4f0,'p',[Math.PI],2.5)}
    // teacups on a turntable
    {const x=-36,z=36;D.push(['cy',x,G,z,8,.35,0xe8d8f0,'p',28]);B.push([x,z,12.8,12.8,G+.35,G-.3,0,'n']);for(let i=0;i<6;i++){const a=i/6*6.283,cx2=x+Math.cos(a)*4.8,cz2=z+Math.sin(a)*4.8,c=[0xff7ab0,0x7ad0ff,0xffd23a,0x9ae06a,0xc08aff,0xff9a5a][i];
      D.push(['cy',cx2,G+.35,cz2,1.35,1,c,'p',16]);D.push(['cy',cx2,G+1.35,cz2,1.45,.12,0xf4f4f0,'p',16]);B.push([cx2,cz2,2,2,G+1.35,G,0,'n']);D.push(['cy',cx2,G+.35,cz2,.25,.85,0xf4f4f0,'p',8])}
     D.push(['cy',x,G+.35,z,1,2.6,0xf2c230,'p',12]);B.push([x,z,1.6,1.6,G+2.9,G,0,'n']);D.push(['pyr',x,G+2.95,z,3.2,1.4,0xe8553a,'p',10])}
    // pirate ship swing between two A-frames
    {const x=40,z=40,y=G;[[-6.5],[6.5]].forEach(([o])=>{BX(x+o-.25,z-3.4,x+o+.25,z-2.9,y,y+9,0x6a5f8a,'m');BX(x+o-.25,z+2.9,x+o+.25,z+3.4,y,y+9,0x6a5f8a,'m');BX(x+o-.3,z-3.4,x+o+.3,z+3.4,y+8.6,y+9.2,0x6a5f8a,'m',1)});BX(x-6.8,z-.2,x+6.8,z+.2,y+8.7,y+9.1,0x3a3f46,'m',1);
     BX(x-5.5,z-1.6,x+5.5,z+1.6,y+1.8,y+3.4,0x8a3a2a,'w');BX(x-6.6,z-1.2,x-5.5,z+1.2,y+2.6,y+4.2,0x8a3a2a,'w');BX(x+5.5,z-1.2,x+6.6,z+1.2,y+2.6,y+4.2,0x8a3a2a,'w');BX(x-5.4,z-1.65,x+5.4,z+1.65,y+3.1,y+3.3,0xf2c230,'p',1);BX(x-.15,z-.15,x+.15,z+.15,y+3.4,y+7.6,0x5a3a22,'w',1);BX(x-.1,z-2.2,x+.1,z+2.2,y+5,y+7.4,0xf4f4f0,'p',1);
     [[-3],[3]].forEach(([o])=>BX(x+o-.05,z-.05,x+o+.05,z+.05,y+3.4,y+8.7,0x8a8a8a,'m',1));stairs(x-3,z+7.1,'z',-1,y,y+3.4,1.6,0x8a5a3a,'w');ring(x,z,10,10.3,y-.2,y+1,0xf4f4f0,'p',[Math.PI/2],3)}
    // helter-skelter: a striped tower you can climb, with a spiral slide round it
    {const x=-40,z=-40;lookout(x,z,10,0xe8553a,0xf2c230);for(let i=0;i<36;i++){const a=i/36*6.283*2,rr=6.2,px=x+Math.cos(a)*rr,pz=z+Math.sin(a)*rr*.75,py=G+9.6-i*.26;BX(px-.55,pz-.55,px+.55,pz+.55,py-.12,py,i%2?0xf2c230:0x2f6fd8,'p',1)}}
    // food court: striped tents, picnic tables with umbrellas, carts with popcorn and candy floss, balloons
    {const fx=100,fz=-100;for(let i=0;i<6;i++){const x=fx-20+(i%3)*20,z=fz-10+(i<3?0:20);if(freeAt(x,z,2.5))tent(x,z,pick([0xe8553a,0x2f6fd8,0xf2c230,0x3aa060]))}
     for(let i=0;i<10;i++){const x=fx-24+(i%5)*12,z=fz+(i<5?-2:10);if(!freeAt(x,z,1.8))continue;const y=H(x,z);BX(x-1,z-.45,x+1,z+.45,y+.72,y+.8,0x8a6a42,'w');BX(x-1,z-.9,x+1,z-.65,y+.42,y+.48,0x8a6a42,'w');BX(x-1,z+.65,x+1,z+.9,y+.42,y+.48,0x8a6a42,'w');BX(x-.04,z-.04,x+.04,z+.04,y+.8,y+2.4,0xf4f4f0,'m',1);D.push(['pyr',x,y+2.4,z,2.6,.6,pick([0xe8553a,0x2f6fd8,0xf2c230]),'p',8])}}
    scatter(18,XS*.85,1.6,(x,z)=>{cart(x,z,pick([0xe8553a,0xff7ab0,0x2f9ab0,0xf2c230]));balloons(x+1.2,z,H(x,z))});
    // ticket booths at the rides and by the gate, rubbish bins, a few more striped tents
    [[-62,-10],[30,-30],[-26,26],[30,50],[-30,-30],[-6,XS*.66],[6,XS*.66]].forEach(([x,z])=>{if(!freeAt(x,z,1.4))return;const y=H(x,z);BX(x-.9,z-.9,x+.9,z+.9,y,y+2.4,0xf4f4f0,'w');BX(x-.92,z-.92,x+.92,z-.85,y+1.2,y+2,0x22364a,'G',1);D.push(['pyr',x,y+2.4,z,2.2,1,0xe8553a,'p',4]);balloons(x+1.2,z+1.2,y)});
    scatter(30,XS*.85,1,(x,z)=>{const y=H(x,z);D.push(['cy',x,y,z,.35,.95,pick([0x3aa060,0x2f6fd8,0xe8553a]),'m',10]);B.push([x,z,.6,.6,y+.95,y-.2,0,'n'])});
    scatter(10,XS*.85,3,(x,z)=>tent(x,z,pick([0xe8553a,0xf2c230,0x2f6fd8,0xb07bff])))}
  }
  else if(L==='volc'){const G=0;// lava: glowing strips over the crater floor and down the two channels
   {const[cx,cz]=XF.vc;for(let x=cx-15;x<cx+15;x+=2.5)for(let z=cz-15;z<cz+15;z+=2.5)if(Math.hypot(x+1.25-cx,z+1.25-cz)<14.5)BX(x,z,x+2.5,z+2.5,H(x+1.25,z+1.25)+.02,H(x+1.25,z+1.25)+.08,0xff6a1a,'e',1);
    [XF.lv,XF.lv2].forEach(P=>{for(let i=0;i<P.length-1;i++){const[a,b]=P[i],[c,d]=P[i+1],l=Math.hypot(c-a,d-b);for(let t=0;t<l;t+=2.2){const x=a+(c-a)*t/l,z=b+(d-b)*t/l;if(Math.hypot(x-cx,z-cz)<18||Math.hypot(x,z)>XF.isl(x,z)-3)continue;const y=H(x,z);BX(x-1.4,z-1.4,x+1.4,z+1.4,y+.02,y+.09,0xff5a12,'e',1)}}})
    // observation deck on the crater rim, reached by a path of steps
    const ra=Math.atan2(40-cz,40-cx),rx=cx+Math.cos(ra)*25,rz=cz+Math.sin(ra)*25,ry=H(rx,rz);BX(rx-4,rz-3,rx+4,rz+3,ry-1.5,ry+.2,0x5a5450,'r');guard(rx-4,rz-3,rx+4,rz-2.92,ry+.2,0x3a3f46);guard(rx-4,rz+2.92,rx+4,rz+3,ry+.2,0x3a3f46);
    D.push(['cy',cx+18,H(cx+18,cz+18)-1,cz+18,1.2,3.5,0x3a3634,'r',8])}
   // research station domes and a radio mast
   xdome(-162,30,H(-162,30),7,[0],2.4,0xe8ecef);xdome(-150,72,H(-150,72),5,[Math.PI],2.2,0xe8ecef);{const x=-122,z=46,y=H(x,z);BX(x-.25,z-.25,x+.25,z+.25,y-.3,y+22,0xc23b2f,'m');for(let k=0;k<5;k++)BX(x-.7,z-.7,x+.7,z+.7,y+3+k*4,y+3.2+k*4,0xf4f4f0,'m',1);BX(x-.3,z-.3,x+.3,z+.3,y+22,y+22.6,0xff3a2a,'e',1)}
   // harbour piers and boats at the fishing village
   for(const px of [96,126,150]){let z1=null;for(let z=110;z<200;z+=.5)if(H(px,z)<-.6){z1=z;break}if(z1!=null){pier(px,z1-6,px,z1+14,1,2.6);xboat(px+3.2,z1+8,0,pick([0xc23b2f,0x2f6f9a,0x3a9a4a]))}}
   lookout(70,-10,9,0x6b4a2c,0x5a3a2a);lookout(-90,120,9,0x6b4a2c,0x5a3a2a);
   // bridges where the coast road crosses the lava channels
   tent(-30,-150,0xc23b2f);tent(-24,-158,0x2f6fd8);crates(-36,-160,3);
   for(let i=0,n=0;i<9000&&n<520;i++){const a=fr(0,6.28),rr=XF.isl(Math.cos(a),Math.sin(a))-fr(4,60),x=Math.cos(a)*rr,z=Math.sin(a)*rr,y=H(x,z);if(y<.7||y>16||!freeAt(x,z,1.4))continue;if(Math.hypot(x-XF.vc[0],z-XF.vc[1])<60)continue;xpalm(x,z,Math.cos(a),Math.sin(a),fr(.05,.3));n++}
   scatter(70,XS-20,2,(x,z)=>boulder(x,z,fr(1.4,3.4),fr(1,2.4),pick([0x2a2826,0x34302c,0x1e1c1a])),(x,z)=>H(x,z)>.8);
   buoyLine(T.bnd+1)}
  else if(L==='dune'){const Go=hb(-4,46);
   // oasis: palms round the water, reeds, and a little stone well
   for(let i=0;i<70;i++){const a=fr(0,6.28),d=XF.oa[2]*fr(1.05,1.45),x=XF.oa[0]+Math.cos(a)*d,z=XF.oa[1]+Math.sin(a)*d;if(freeAt(x,z,1.4))xpalm(x,z,-Math.cos(a),-Math.sin(a),fr(.05,.25))}
   // domes on the larger houses of the oasis town
   HP.forEach(h=>{if(h.st==='adobe'&&!h.acc&&Math.abs(h.x+10)<60&&h.z>0&&h.z<100&&r()<.7){const y=h.G+.3+(h.FH||3.3)*h.NS;D.push(['cy',h.x,y,h.z,1.9,.5,0xd8c8a8,'p',16]);B.push([h.x,h.z,3.2,3.2,y+.5,y,0,'n']);xdome(h.x,h.z,y+.5,2.2,[],2,pick([0x3a8aa8,0xe8e0d0,0x2f9a7a]))}});
   [[-14,40],[0,52],[-8,30],[8,40]].forEach(([x,z],i)=>stall(x,z,null,i%2));
   // oil field: derricks and pump jacks
   [[122,-118],[150,-150],[166,-108],[132,-150]].forEach(([x,z])=>derrick(x,z,20,0x5a4a3a));[[140,-130,1],[160,-128,0],[118,-140,1],[170,-150,0],[150,-96,1]].forEach(([x,z,ax])=>pumpjack(x,z,ax));tank(170,-170,4.5,6,0xb8b2a0,1);
   // desert fort
   xfort(150,120,24,XF.Gk,[{side:'n',at:150},{side:'w',at:120}],0xd8b888);
   // crash site: a broken airliner you can walk through
   {const x0=-150,z=124,y=XF.Gc;for(let x=x0;x<x0+30;x+=1.2){if(x>x0+11&&x<x0+14)continue;BX(x,z-2.1,x+1.2,z-1.95,y,y+3.8,0xe8e8e4,'m');BX(x,z+1.95,x+1.2,z+2.1,y,y+3.8,0xe8e8e4,'m');BX(x,z-2.1,x+1.2,z+2.1,y+3.8,y+4.1,0xe8e8e4,'m');if(Math.floor((x-x0)/1.2)%3==1){BX(x+.3,z-2.15,x+.9,z-2.1,y+2.2,y+2.8,0x22364a,'G',1);BX(x+.3,z+2.1,x+.9,z+2.15,y+2.2,y+2.8,0x22364a,'G',1)}}
    BX(x0,z-2,x0+30,z+2,y-.2,y+.15,0x9a9a9a,'c');BX(x0+16,z-14,x0+22,z-2.1,y+.6,y+1,0xd8d8d4,'m');BX(x0+15,z+2.1,x0+21,z+16,y+.1,y+.5,0xd8d8d4,'m');BX(x0+27,z-.15,x0+30,z+.15,y+4.1,y+8.6,0xc23b2f,'m');
    D.push(['cy',x0+19,y,z-9,1.1,2.6,0x8a8f94,'m',14]);B.push([x0+19,z-9,1.8,1.8,y+2.6,y-.3,0,'n']);[[x0-6,z+6],[x0+34,z-5],[x0+12,z+10]].forEach(([x,zz])=>crates(x,zz,2))}
   // buried ruins: half-sunk columns
   for(let i=0;i<10;i++){const x=-150+(i%5)*6,z=0+(i<5?0:14);column(x,z,fr(1.5,5.5),0xd8c098)}BX(-152,-2,-124,2,XF.Gr-.2,XF.Gr+.5,0xd8c098,'s');
   scatter(30,XS-20,2,(x,z)=>tent(x,z,pick([0xc8a060,0xb5503a,0xe8dcc0])),(x,z)=>H(x,z)<5&&Math.hypot(x-XF.oa[0],z-XF.oa[1])>40);
   scatter(60,XS-16,2.5,(x,z)=>boulder(x,z,fr(1.5,3.6),fr(1,2.2),pick([0xc8935c,0xb0784a,0xd8a870])));
   scatter(80,XS-16,1.2,cactus,(x,z)=>H(x,z)>1.4)}
  else if(L==='redwood'){
   const zc=x=>xrc(x,XF.riv);xbridge('z',-100,zc(-100)-17,zc(-100)+17,5,'wood');xbridge('z',40,zc(40)-17,zc(40)+17,5,'stone');xbridge('z',150,zc(150)-14,zc(150)+14,2.4,'rope');
   // covered roof over the wooden bridge
   {const z0=zc(-100)-15,z1=zc(-100)+15,y=Math.max(H(-100,z0),H(-100,z1))+3.4;for(let z=z0;z<=z1;z+=3){BX(-102.6,z-.15,-102.3,z+.15,y-3.3,y,0x6b4a2c,'w',1);BX(-97.7,z-.15,-97.4,z+.15,y-3.3,y,0x6b4a2c,'w',1)}BX(-103,z0,-97,z1,y,y+.2,0x8a3a2a,'w',1);D.push(['roof',-100,(z0+z1)/2,y+.2,z1-z0,6.4,1.6,'z',0x8a3a2a,'t',0x6b4a2c,'w',z1-z0,6])}
   // sawmill yard: log piles, a log truck
   for(let i=0;i<4;i++){const x=66+i*7,z=-80,y=H(x,z);for(let k=0;k<3;k++)BX(x-2.5,z-.5+k*.35,x+2.5,z+.5+k*.35,y+k*.8,y+.8+k*.8,0x8a5a3a,'w')}car(110,-70,1,0x3a5a3a);car(56,-126,0,0x8a3a2a);
   lookout(-20,-40,12,0x6b4a2c,0x4a3a2a);lookout(120,60,12,0x6b4a2c,0x4a3a2a);lookout(-150,-20,10,0x6b4a2c,0x4a3a2a);
   // campground
   {const cx=-130,cz=98;for(let i=0;i<7;i++){const a=i/7*6.283;tent(cx+Math.cos(a)*15,cz+Math.sin(a)*12,pick([0xc23b2f,0x2f6fd8,0xe0a030,0x3aa060]))}const y=H(cx,cz);for(let i=0;i<8;i++){const a=i/8*6.283;BX(cx+Math.cos(a)*1.4-.3,cz+Math.sin(a)*1.4-.3,cx+Math.cos(a)*1.4+.3,cz+Math.sin(a)*1.4+.3,y-.1,y+.35,0x7a7a72,'r')}flame(cx,cz,y,1);
    [[4,0,1],[-4,0,1],[0,4,0],[0,-4,0]].forEach(([a,b,ax])=>BX(cx+a-(ax?.3:1.4),cz+b-(ax?1.4:.3),cx+a+(ax?.3:1.4),cz+b+(ax?1.4:.3),y,y+.45,0x6b4a2c,'w'))}
   // the giant redwoods
   for(let i=0,n=0;i<6000&&n<150;i++){const x=fr(-XS+12,XS-12),z=fr(-XS+12,XS-12);if(H(x,z)<2||!freeAt(x,z,4.5))continue;if(Math.abs(z-zc(x))<22)continue;redwood(x,z,fr(1,1.65));n++}
   scatter(40,XS-16,2,(x,z)=>D.push(['k',x,H(x,z)+.3,z,fr(.8,1.6),fr(.4,.8),0x5a4632,fr(0,6)]),(x,z)=>H(x,z)>1)}
  else if(L==='mil'){const G=XF.G;
   // runway markings, taxiway lights
   for(let x=-150;x<150;x+=12)BX(x,-64.3,x+6,-63.7,G+.03,G+.06,0xf4f4f0,'p',1);[-158,158].forEach(x=>{for(let z=-71;z<-57;z+=1.8)BX(x-1,z,x+1,z+.9,G+.03,G+.06,0xf4f4f0,'p',1)});for(let x=-160;x<=160;x+=10){BX(x-.15,-73.3,x+.15,-73,G,G+.35,0x3fa0ff,'e',1);BX(x-.15,-55,x+.15,-54.7,G,G+.35,0x3fa0ff,'e',1)}
   // perimeter fence with a main gate on the south side
   const fx0=-176,fx1=176,fz0=-140,fz1=100,fence=(a0,b0,a1,b1)=>{BX(a0,b0,a1,b1,G-.2,G+3,0,'n');const ax=a1-a0>b1-b0,L2=ax?a1-a0:b1-b0;for(let t=0;t<=L2;t+=3){const px=ax?a0+t:a0,pz=ax?b0:b0+t;BX(px-.08,pz-.08,px+.08,pz+.08,G-.2,G+3.2,0x6a6f76,'m',1)}BX(a0,b0,a1,b1,G+2.7,G+2.85,0x8a8f94,'m',1);BX(a0,b0,a1,b1,G+1.2,G+1.3,0x8a8f94,'m',1)};
   fence(fx0,fz0-.05,-8,fz0+.05);fence(8,fz0-.05,fx1,fz0+.05);fence(fx0-.05,fz0,fx0+.05,-26);fence(fx0-.05,-14,fx0+.05,fz1);fence(fx1-.05,fz0,fx1+.05,-26);fence(fx1-.05,-14,fx1+.05,fz1);fence(fx0,fz1-.05,-6,fz1+.05);fence(6,fz1-.05,fx1,fz1+.05);
   BX(-7,fz1-1,-5,fz1+1,G,G+3.6,0xd8d4cc,'c');BX(5,fz1-1,7,fz1+1,G,G+3.6,0xd8d4cc,'c');BX(-7,fz1-.2,7,fz1+.2,G+3.6,G+4.4,0x3a5a3a,'p');BX(8,fz1-4,12,fz1+1,G,G+2.8,0xd8d4cc,'c');BX(7.8,fz1-4.2,12.2,fz1+1.2,G+2.8,G+3,0x5a5f52,'p');
   // watchtowers at the corners and the gate
   [[fx0+16,fz0+7],[fx1-12,fz0+7],[fx0+16,fz1-7],[fx1-12,fz1-7],[-24,fz1-8]].forEach(([x,z])=>lookout(x,z,8,0x5a5f52,0x3a4a3a));
   // bunkers with firing slits: walk in at the back
   [[-150,60],[150,60],[-60,-30],[70,-30],[0,-130]].forEach(([x,z])=>{const y=H(x,z),c=0xa8a49a;BX(x-4,z-3,x+4,z-2.4,y-.3,y+2.4,c,'c');BX(x-4,z-2.4,x-3.4,z+3,y-.3,y+2.4,c,'c');BX(x+3.4,z-2.4,x+4,z+3,y-.3,y+2.4,c,'c');BX(x-4,z+2.4,x-1.2,z+3,y-.3,y+2.4,c,'c');BX(x+1.2,z+2.4,x+4,z+3,y-.3,y+2.4,c,'c');
    BX(x-4,z-3,x+4,z+3,y+2.4,y+3,c,'c');BX(x-4.2,z-3.2,x+4.2,z-2.95,y+1.4,y+1.75,0x1a1a1a,'c',1)});
   // sandbag walls
   for(let i=0;i<26;i++){const x=fr(-160,160),z=fr(-130,90);if(!freeAt(x,z,3))continue;const ax=r()<.5,y=H(x,z),[a,b]=ax?[2.6,.5]:[.5,2.6];BX(x-a,z-b,x+a,z+b,y-.1,y+1.1,0xb8a878,'c');BX(x-a+.2,z-b+.1,x+a-.2,z+b-.1,y+1.1,y+1.4,0xa89868,'c',1)}
   // tanks, trucks and a helicopter on its pad
   [[-140,-20,1],[-120,-24,1],[120,60,0],[140,60,0],[30,80,1]].forEach(([x,z,ax])=>{if(freeAt(x,z,4))tankV(x,z,ax,0x5a6a42)});[[-60,70,1],[-50,70,1],[20,-30,0]].forEach(([x,z,ax])=>car(x,z,ax,0x4a5a3a));
   {const x=150,z=-20,y=H(x,z);BX(x-7,z-7,x+7,z+7,y-.2,y+.15,0x8a8f94,'c');BX(x-4,z-.08,x+4,z+.08,y+.16,y+.2,0xf4f4f0,'p',1);BX(x-1.4,z-1.6,x+1.4,z+1.6,y+.5,y+2.6,0x4a5a3a,'m');BX(x-.3,z+1.6,x+.3,z+7,y+1.6,y+2.1,0x4a5a3a,'m');BX(x-.1,z-6.5,x+.1,z+6.5,y+2.9,y+3,0x2a2a2a,'m',1);BX(x-6.5,z-.1,x+6.5,z+.1,y+2.9,y+3,0x2a2a2a,'m',1);BX(x-1.3,z-1.62,x+1.3,z-1,y+1.6,y+2.5,0x22364a,'G',1);[[-1.2],[1.2]].forEach(([o])=>BX(x+o-.08,z-2,x+o+.08,z+2,y+.15,y+.5,0x2a2a2a,'m'))}
   // radar dome and fuel depot
   xdome(-150,-20,H(-150,-20),6,[Math.PI/2],2.2,0xf4f4f0);[[-158,-6],[-146,-6]].forEach(([x,z])=>tank(x,z,3,5,0xd8d4cc,0));tank(160,40,5,7,0xd8d4cc,1);
   // obstacle course on the parade ground
   for(let i=0;i<6;i++){const x=-34+i*12,z=72,y=H(x,z);BX(x-2,z-.25,x+2,z+.25,y,y+(i%2?1.2:2.2),0x8a6a42,'w')}
   scatter(50,XS-18,2.4,(x,z)=>boulder(x,z,fr(1.4,3.2),fr(.9,2),pick([0x8a8478,0x7a7466])),(x,z)=>Math.max(Math.abs(x),Math.abs(z))>XS*.62)}
  else if(L==='sav'){
   // village of round huts inside a thorn fence (boma), with a meeting tree in the middle
   {const cx=-130,cz=-112,y=XF.Gv;for(let i=0;i<9;i++){const a=i/9*6.283+.2;hut(cx+Math.cos(a)*24,cz+Math.sin(a)*24,3,pick([0xb88a5a,0xa87a4a,0xc8a070]),a+Math.PI)}hut(cx,cz+8,3.8,0xb88a5a,Math.PI/2);acacia(cx-6,cz-6,1.4);
    ring(cx,cz,36,36.8,y-.3,y+1.6,0x6a5a3a,'w',[0,Math.PI],5);flame(cx+6,cz-4,y,1)}
   // safari lodge deck over the plain, and an observation tower at the waterhole
   {const x=120,z=-90,y=H(x,z);BX(x-12,z-6,x+12,z+2,y+1.6,y+1.9,0x8a6a42,'4');for(let a=-12;a<=12;a+=4){post(x+a,z-6+.2,y+1.6);post(x+a,z+1.8,y+1.6)}guard(x-12,z-6,x+12,z-5.92,y+1.9,0x6b4a2c);stairs(x+15,z-1,'x',-1,y,y+1.9,1.4,0x8a6a42,'4')}
   lookout(-8,50,10,0x6b4a2c,0xd9c08a);
   // giraffes, elephants and zebras round the waterhole and the plain
   [[-70,30,'elephant',.5],[-58,72,'elephant',2.6],[-20,20,'giraffe',1],[-10,70,'giraffe',3.4],[20,30,'zebra',.2],[24,36,'zebra',.4],[18,40,'zebra',.1],[-80,50,'zebra',2.2],[90,40,'giraffe',1.6],[60,-140,'elephant',4],[-150,140,'giraffe',.8],[160,-150,'zebra',2]].forEach(([x,z,k,yw])=>{if(freeAt(x,z,3))animal(x,z,k,yw)});
   // a giant baobab
   {const x=30,z=-30,y=H(x,z);D.push(['cy',x,y-.4,z,2.2,8,0x8a7a6a,'w',12]);B.push([x,z,3.6,3.6,y+8,y-.4,0,'n']);for(let i=0;i<6;i++){const a=i*1.05;D.push(['cy',x+Math.cos(a)*2.2,y+7.4,z+Math.sin(a)*2.2,.4,2.2,0x8a7a6a,'w',6]);D.push(['cy',x+Math.cos(a)*3,y+9.4,z+Math.sin(a)*3,1.6,.8,0x6a8a3a,'p',10])}}
   // safari jeeps, a dry-riverbed bridge, termite mounds
   [[100,-20,1],[-60,-60,0],[40,120,1]].forEach(([x,z,ax])=>car(x,z,ax,0xc8a868));{const x=0,z0=xrc(0,XF.dr);xbridge('z',0,z0-11,z0+11,4,'wood')}
   scatter(40,XS-20,1.6,(x,z)=>{const y=H(x,z);D.push(['cy',x,y-.2,z,.7,2.4,0xa86a3a,'p',7]);B.push([x,z,1.1,1.1,y+2.2,y-.3,0,'n'])},(x,z)=>H(x,z)>1.2);
   for(let i=0,n=0;i<4000&&n<180;i++){const x=fr(-XS+10,XS-10),z=fr(-XS+10,XS-10);if(H(x,z)<1||!freeAt(x,z,3.5))continue;acacia(x,z,fr(.85,1.35));n++}
   scatter(70,XS-14,2.2,(x,z)=>boulder(x,z,fr(1.6,4.2),fr(1.2,3),pick([0xa8a092,0x9a9284,0xb8b0a0])),(x,z)=>XF.kp.some(q=>Math.hypot(x-q[0],z-q[1])<q[2]*.9))}
  else if(L==='neon'){const G=1,NC=[0xff2a8a,0x2affe0,0xb05aff,0xffe03a,0x3a8aff,0xff6a2a];
   // neon strips along every roofline and a glowing sign over every door
   HP.forEach((h,i)=>{const top=h.G+.3+(h.FH||3.3)*h.NS+1,c=NC[i%NC.length],c2=NC[(i+2)%NC.length];const q=wrect(h,[-h.W/2-.02,-h.D/2-.14,h.W/2+.02,-h.D/2-.05]);BX(q[0],q[1],q[2],q[3],top-.18,top-.04,c,'e',1);
    const s=wrect(h,[-1.6,-h.D/2-.3,1.6,-h.D/2-.12]);BX(s[0],s[1],s[2],s[3],h.G+3.25,h.G+3.75,c2,'e',1);const v=wrect(h,[-h.W/2-.2,-h.D/2-.32,-h.W/2+.05,-h.D/2-.1]);BX(v[0],v[1],v[2],v[3],h.G+1.2,top-.3,c,'e',1)});
   // rooftop stairs on a few shops (fire escapes): up the side wall and over the parapet
   HP.filter(h=>h.st==='shop'&&h.W>=10).slice(0,5).forEach(h=>{const R2=h.G+.3+(h.FH||3.3)+1.12,y=h.G,MX=h.mir?-1:1,[ux,uz]=TR(h.r,MX,0),[bx,bz]=TR(h.r,MX*(-h.W/2+.5),h.D/2+.78),sx=h.x+bx,sz=h.z+bz;
    const ax=Math.abs(ux)>.5?'x':'z',sg=ax==='x'?Math.sign(ux):Math.sign(uz),n=Math.ceil((R2-y)/.4);if(n*.6>h.W-1.6)return;let ok=true;for(let k=0;k<=n;k++){const px=sx+(ax==='x'?sg*k*.6:0),pz=sz+(ax==='z'?sg*k*.6:0);if(HP.some(o=>o!==h&&Math.abs(o.x-px)<o.W/2+1.4&&Math.abs(o.z-pz)<o.W/2+1.4))ok=false}if(!ok)return;stairs(sx,sz,ax,sg,y,R2,1.2,0x3a3f46,'m')});
   // plaza: a neon arch, benches and a holo sculpture
   {const y=G;[[-8],[8]].forEach(([o])=>BX(o-.4,-.4,o+.4,.4,y,y+6,0x2a2d34,'m'));BX(-8.4,-.4,8.4,.4,y+6,y+6.8,0x2a2d34,'m');BX(-8,-.45,8,.45,y+6.15,y+6.65,0x2affe0,'e',1);D.push(['cy',0,y,0,1.6,.6,0x3a3f46,'c',12]);B.push([0,0,2.6,2.6,y+.6,y-.3,0,'n']);
    for(let k=0;k<4;k++)D.push(['cy',0,y+.6+k*.9,0,1.1-k*.22,.5,NC[k],'e',10]);[[-6,5],[6,5],[-6,-5],[6,-5]].forEach(([x,z])=>BX(x-1.2,z-.3,x+1.2,z+.3,y,y+.5,0x3a3f46,'k'))}
   // billboards on poles, parked cars, dumpsters and trash in the alleys
   [[-40,0],[40,2],[0,-40],[0,44]].forEach(([x,z],i)=>{const y=H(x,z);BX(x-.25,z-.25,x+.25,z+.25,y-.3,y+8,0x2a2d34,'m');BX(x-4,z-.2,x+4,z+.2,y+8,y+11,0x1a1c20,'m');BX(x-3.8,z-.25,x+3.8,z+.25,y+8.2,y+10.8,NC[(i*2)%NC.length],'e',1)});
   [[-30,-22,1],[18,-22,1],[-14,24,1],[34,24,1]].forEach(([x,z,ax])=>car(x,z+(z<0?2.2:-2.2),ax,pick([0x1b1d20,0xe8e8e4,0xc23b2f,0x2f5d9a])));
   scatter(14,S-8,2,(x,z)=>{const y=H(x,z);BX(x-1,z-.6,x+1,z+.6,y,y+1.2,pick([0x2f6a3a,0x2f4a7a,0x5a5f66]),'m');BX(x-1.05,z-.65,x+1.05,z+.65,y+1.2,y+1.3,0x1a1a1a,'m',1)})}
  else if(L==='refin'){const G=1;
   const tops=[[-30,14,8,11],[-6,22,7,11],[22,10,8,11],[-30,40,6,8]].map(([x,z,r0,h],i)=>[x,z,r0,tank(x,z,r0,h,[0xd8d4cc,0xc9c5bc,0xe0dcd2,0xb8b2a0][i],i!==1),h]);
   // catwalk between the first three tanks (at the lower tank's height), with rails
   {const[a,b,c]=tops,y=H(b[0],b[1])+11,z0=a[1],xe=c[0]-c[2]*.7;BX(a[0]+a[2]*.9,z0-.7,xe,z0+.7,y-.2,y,0x6a6f76,'m');BX(b[0]-.7,z0+.7,b[0]+.7,b[1]-b[2]*.9,y-.2,y,0x6a6f76,'m');
    guard(a[0]+a[2]*.96,z0-.78,xe-.4,z0-.7,y,0xf2c230);guard(a[0]+a[2]*.96,z0+.7,b[0]-.7,z0+.78,y,0xf2c230);guard(b[0]+.7,z0+.7,xe-.4,z0+.78,y,0xf2c230)}
   // pipe racks you can walk under
   const pipes=(x0,z0,x1,z1,y,cols)=>{const ax=Math.abs(x1-x0)>Math.abs(z1-z0),L2=ax?x1-x0:z1-z0,sg=Math.sign(L2);for(let t=0;t<=Math.abs(L2);t+=6){const px=ax?x0+sg*t:x0,pz=ax?z0:z0+sg*t,g=H(px,pz);
     [-1.6,1.6].forEach(o=>BX(ax?px-.15:px+o-.15,ax?pz+o-.15:pz-.15,ax?px+.15:px+o+.15,ax?pz+o+.15:pz+.15,g-.3,y+.2,0x6a6f76,'m'));if(ax)BX(px-.15,pz-1.8,px+.15,pz+1.8,y,y+.25,0x6a6f76,'m');else BX(px-1.8,pz-.15,px+1.8,pz+.15,y,y+.25,0x6a6f76,'m')}
    cols.forEach((c,i)=>{const o=-1.2+i*2.4/(cols.length-1);if(ax)BX(Math.min(x0,x1),z0+o-.2,Math.max(x0,x1),z0+o+.2,y+.25,y+.65,c,'m');else BX(x0+o-.2,Math.min(z0,z1),x0+o+.2,Math.max(z0,z1),y+.25,y+.65,c,'m')})};
   pipes(-50,-6,50,-6,4.2,[0xc23b2f,0xd8d4cc,0xf2c230,0x3a6a9a]);pipes(10,-50,10,-8,4.2,[0x8a8f94,0xc23b2f,0x3a6a9a]);pipes(-14,30,-14,54,3.8,[0xd8d4cc,0xf2c230]);
   // flare stack with a flame on top
   {const x=46,z=10,y=H(x,z);BX(x-.6,z-.6,x+.6,z+.6,y-.3,y+24,0x8a8f94,'m');for(let k=0;k<6;k++)BX(x-.8,z-.8,x+.8,z+.8,y+3+k*3.6,y+3.3+k*3.6,0xc23b2f,'m',1);flame(x,z,y+24,2.4)}
   // control building stair to its roof and loading bays
   for(let i=0;i<5;i++){const x=-44+i*4.4,z=-26,y=H(x,z);BX(x-1.6,z-1.6,x+1.6,z+1.6,y,y+(i%2?1.4:2.2),pick([0xa8885c,0x8a6a42]),'x')}
   scatter(10,S-8,3,(x,z)=>{const y=H(x,z);for(let k=0;k<3;k++)D.push(['cy',x+(k-1)*.8,y,z,.38,1.1,pick([0x2f5d9a,0xc23b2f,0xf2c230]),'m',10]);BX(x-1.3,z-.45,x+1.3,z+.45,y-.2,y+1.1,0,'n')})}
  else if(L==='camp'){
   // dock with canoes, the campfire ring, archery range and a lookout over the lake
   {const[lx,lz,lr]=XF.lk;let z1=null;for(let z=lz-lr-6;z<lz;z+=.5)if(H(lx-8,z)<-.5){z1=z;break}if(z1!=null){pier(lx-8,z1-5,lx-8,z1+9,1.2,2.4);BX(lx-13,z1+9,lx-3,z1+11.4,.95,1.2,0xa8885c,'4');xboat(lx-11,z1+5,0,0xc23b2f,2.6);xboat(lx-5,z1+5,0,0x2f6fd8,2.6)}}
   {const cx=-4,cz=-2,y=H(cx,cz);for(let i=0;i<10;i++){const a=i/10*6.283;BX(cx+Math.cos(a)*1.5-.28,cz+Math.sin(a)*1.5-.28,cx+Math.cos(a)*1.5+.28,cz+Math.sin(a)*1.5+.28,y-.1,y+.3,0x8a8a82,'r')}flame(cx,cz,y,1.1);
    for(let i=0;i<6;i++){const a=i/6*6.283,x=cx+Math.cos(a)*5,z=cz+Math.sin(a)*5;BX(x-.9,z-.25,x+.9,z+.25,y,y+.45,0x6b4a2c,'w')}}
   {const z=-12,x0=26;for(let i=0;i<4;i++){const x=x0+i*5,y=H(x,z);BX(x-.6,z-.15,x+.6,z+.15,y,y+1.9,0x6b4a2c,'w');BX(x-.55,z-.2,x+.55,z-.15,y+.8,y+1.85,0xf4f4f0,'p',1);BX(x-.3,z-.24,x+.3,z-.2,y+1.05,y+1.6,0xc23b2f,'p',1);BX(x-.1,z-.27,x+.1,z-.24,y+1.25,y+1.45,0xf2c230,'p',1)}
    for(let i=0;i<4;i++){const x=x0+i*5,y=H(x,z-16);BX(x-.6,z-16.2,x+.6,z-15.8,y,y+.9,0x8a6a42,'w')}}
   lookout(-46,-20,8,0x6b4a2c,0x4a3a2a);
   [[10,10],[-18,18],[18,-26]].forEach(([x,z])=>{const y=H(x,z);BX(x-1.1,z-.5,x+1.1,z+.5,y+.72,y+.82,0x8a6a42,'w');BX(x-1.1,z-1,x+1.1,z-.7,y+.42,y+.5,0x8a6a42,'w');BX(x-1.1,z+.7,x+1.1,z+1,y+.42,y+.5,0x8a6a42,'w');BX(x-.95,z-.4,x-.85,z+.4,y,y+.72,0x8a6a42,'w');BX(x+.85,z-.4,x+.95,z+.4,y,y+.72,0x8a6a42,'w')});
   scatter(5,S-8,2,(x,z)=>tent(x,z,pick([0x3aa060,0xe0a030,0x2f6fd8])),(x,z)=>H(x,z)>1&&Math.hypot(x-XF.lk[0],z-XF.lk[1])>XF.lk[2]+4)}
  else if(L==='arena'){const y=1.2,ST2=0xd8ccb2,ST3=0xc8bca0,gates=[0,Math.PI/2,Math.PI,Math.PI*1.5];
   // seating tiers rising outward, cut by four entrance tunnels
   for(let k=0;k<10;k++)ring(0,0,26.4+k*1.1,27.5+k*1.1,y-.4,y+.5*(k+1),k%2?ST2:ST3,'2',gates,6);
   // outer wall with arches over the four gates, and a walkway on top of the last tier
   ring(0,0,37.4,39.2,y-.4,y+11,0xe2d6bc,'2',gates,6);gates.forEach(g=>{const x=Math.cos(g)*38.3,z=Math.sin(g)*38.3,ax=Math.abs(Math.cos(g))>.5;BX(x-(ax?1:3.4),z-(ax?3.4:1),x+(ax?1:3.4),z+(ax?3.4:1),y+5.4,y+11,0xe2d6bc,'2')});
   for(let i=0;i<32;i++){const a=i/32*6.283+.098;if(gates.some(g=>Math.abs(Math.atan2(Math.sin(a-g),Math.cos(a-g)))<.2))continue;const x=Math.cos(a)*39.25,z=Math.sin(a)*39.25;BX(x-.45,z-.45,x+.45,z+.45,y+2,y+4.8,0x5a4a38,'2',1)}
   // podium wall round the arena floor, with openings up to the first tier
   const pg=[];for(let i=0;i<8;i++)pg.push(i/8*6.283+.39);ring(0,0,25.4,26.4,y-.4,y+1.3,0xb8a888,'2',gates.concat(pg),3);
   // spina down the middle: obelisk, statues, broken columns; barricades and crates for cover
   BX(-14,-1.5,14,1.5,y,y+1,0xd8ccb2,'2');{BX(-1,-1,1,1,y+1,y+2,0xd8ccb2,'2');D.push(['pyr',0,y+2,0,1.8,9,0xe2d6bc,'s',4]);B.push([0,0,1.2,1.2,y+9,y+2,0,'n'])}
   [[-10],[10]].forEach(([x])=>{BX(x-.8,-.8,x+.8,.8,y+1,y+2.2,0xd8ccb2,'2');BX(x-.35,-.25,x+.35,.25,y+2.2,y+3.6,0xc8c0b0,'s');BX(x-.25,-.2,x+.25,.2,y+3.6,y+4,0xc8c0b0,'s')});
   [[-16,-12],[16,12],[-6,15],[8,-16],[-19,6],[18,-6]].forEach(([x,z],i)=>column(x,z,i%2?2.4:4.2,0xe8dcc4,.5));
   for(let i=0;i<8;i++){const a=i/8*6.283,x=Math.cos(a)*18,z=Math.sin(a)*18;if(i%2)BX(x-1.6,z-1.6,x+1.6,z+1.6,y,y+1.6,0x9a7a52,'x');else{const ax=Math.abs(Math.cos(a))<.7;BX(x-(ax?2.2:.3),z-(ax?.3:2.2),x+(ax?2.2:.3),z+(ax?.3:2.2),y,y+1.2,0x6b4a2c,'w')}}
   // forum outside: column rows, a fountain, statues on plinths
   [[-58,-20],[-58,-8],[-58,4],[-58,16],[58,-20],[58,-8],[58,4],[58,16],[-20,-58],[-8,-58],[4,-58],[16,-58],[-20,58],[-8,58],[4,58],[16,58]].forEach(([x,z])=>column(x,z,5,0xe8dcc4,.42));
   [[41,-41],[-41,41]].forEach(([x,z])=>{const yy=H(x,z);D.push(['cy',x,yy,z,2.4,.6,0xd8ccb2,'s',16]);B.push([x,z,4,4,yy+.6,yy-.3,0,'n']);D.push(['cy',x,yy+.6,z,.5,1.4,0xd8ccb2,'s',10]);BX(x-1.8,z-1.8,x+1.8,z+1.8,yy+.3,yy+.5,0x5ab8d8,'e',1)})}
  else if(L==='rail'){const G=1,TZ=[-30,-18,-6,6,18];
   // tracks: ballast, sleepers and two rails each
   TZ.forEach(z=>{BX(-S-2,z-1.7,S+2,z+1.7,G-.05,G+.08,0x6a655c,'c',1);for(let x=-S;x<S;x+=1.1)BX(x,z-1.25,x+.28,z+1.25,G+.08,G+.16,0x5a4632,'w',1);[-.72,.72].forEach(o=>BX(-S-2,z+o-.05,S+2,z+o+.05,G+.16,G+.3,0x8a8f94,'m',1))});
   // freight trains: boxcars you can walk into (doors open on both sides), tank cars, flatcars with containers, a locomotive
   const boxcar=(x0,z,c)=>{const y=G+1,L2=12,x1=x0+L2;BX(x0,z-1.5,x1,z+1.5,y-.15,y,0x3a3632,'m');[[x0,x0+4.8],[x0+7.2,x1]].forEach(([a,b])=>{BX(a,z-1.5,b,z-1.38,y,y+3,c,'m');BX(a,z+1.38,b,z+1.5,y,y+3,c,'m')});
     BX(x0,z-1.5,x0+.12,z+1.5,y,y+3,c,'m');BX(x1-.12,z-1.5,x1,z+1.5,y,y+3,c,'m');BX(x0,z-1.5,x1,z+1.5,y+3,y+3.15,c,'m');BX(x0+4.8,z-1.5,x0+7.2,z-1.38,y+2.6,y+3,c,'m');BX(x0+4.8,z+1.38,x0+7.2,z+1.5,y+2.6,y+3,c,'m');
     [x0+2,x1-2].forEach(bx=>[-1,1].forEach(s=>D.push(['wh',bx,G+.55,z+s*.75,1])));BX(x0+1,z-1.2,x1-1,z+1.2,G+.3,y-.15,0x1f1d1b,'m');[-1,1].forEach(s=>BX(x0+5.4,z+s*2.05-.4,x0+6.6,z+s*2.05+.4,G-.1,G+.5,0x9a7a52,'x'))};
   const tankcar=(x0,z,c)=>{const y=G+1.1;BX(x0,z-1.4,x0+12,z+1.4,y-.15,y,0x3a3632,'m');BX(x0+.6,z-1.3,x0+11.4,z+1.3,y,y+2.6,c,'m');BX(x0+1.2,z-1.1,x0+10.8,z+1.1,y+2.6,y+2.9,c,'m');BX(x0+5.6,z-.5,x0+6.4,z+.5,y+2.9,y+3.3,0x3a3f46,'m');[x0+2,x0+10].forEach(bx=>[-1,1].forEach(s=>D.push(['wh',bx,G+.55,z+s*.75,1])))};
   const flatcar=(x0,z,c)=>{const y=G+1.1;BX(x0,z-1.4,x0+12,z+1.4,y-.15,y,0x3a3632,'m');BX(x0+.4,z-1.25,x0+11.6,z+1.25,y,y+2.6,c,'m');[x0+2,x0+10].forEach(bx=>[-1,1].forEach(s=>D.push(['wh',bx,G+.55,z+s*.75,1])))};
   const loco=(x0,z)=>{const y=G+1.1;BX(x0,z-1.5,x0+14,z+1.5,y-.2,y+.1,0x2a2a2a,'m');BX(x0+3,z-1.3,x0+14,z+1.3,y+.1,y+2.8,0xd9822b,'m');BX(x0,z-1.45,x0+3,z+1.45,y+.1,y+3.6,0xd9822b,'m');BX(x0+.1,z-1.5,x0+2.9,z+1.5,y+2.2,y+3.2,0x22364a,'G',1);BX(x0-.4,z-1.5,x0,z+1.5,y-.2,y+3.8,0x2a2a2a,'m');[x0+2.5,x0+11].forEach(bx=>[-1,1].forEach(s=>D.push(['wh',bx,G+.55,z+s*.75,1])))};
   loco(-50,-30);boxcar(-35,-30,0x8a3a2a);boxcar(-22,-30,0x6b4a2c);tankcar(-9,-30,0x2b2b2b);
   boxcar(4,-6,0x3a5a7a);flatcar(17,-6,pick([0xc23b2f,0x2f5d9a,0x3a7a4a]));boxcar(30,-6,0x8a3a2a);tankcar(-40,6,0xe8e8e4);flatcar(-27,6,0xd98a2b);boxcar(-14,6,0x5a5f66);loco(32,18);boxcar(18,18,0x6b4a2c);
   // station platform with a canopy, and a footbridge over every track
   {const y=G;BX(-40,-38.4,20,-33.6,y-.2,y+1,0xb8b2a0,'c');stairs(21.8,-36,'x',-1,y,y+1,2.4,0xb8b2a0,'c');stairs(-41.8,-36,'x',1,y,y+1,2.4,0xb8b2a0,'c');for(let x=-36;x<=16;x+=6.5){BX(x-.15,-36.15,x+.15,-35.85,y+1,y+4.4,0x3a3f46,'m')}BX(-38,-38.4,18,-33.6,y+4.4,y+4.6,0x3a5a3a,'m');
    for(let x=-30;x<12;x+=10)BX(x-1,-37.6,x+1,-37.2,y+1,y+1.5,0x6b4a2c,'w')}
   {const x=40,y=G,h=6.6,len=stairs(x,-44,'z',1,y,y+h,1.6,0x6a6f76,'m'),z0=-44+len;BX(x-.8,z0,x+.8,28-len,y+h-.25,y+h,0x6a6f76,'m');stairs(x,28,'z',-1,y,y+h,1.6,0x6a6f76,'m');guard(x-.86,z0,x-.78,28-len,y+h,0xf2c230);guard(x+.78,z0,x+.86,28-len,y+h,0xf2c230)}
   // signal gantry and the water tower
   {const x=-56,y=G;BX(x-.2,-33,x+.2,-32.6,y,y+7,0x3a3f46,'m');BX(x-.2,21.4,x+.2,21.8,y,y+7,0x3a3f46,'m');BX(x-.3,-33,x+.3,21.8,y+7,y+7.5,0x3a3f46,'m',1);TZ.forEach((z,i)=>BX(x-.25,z-.25,x+.25,z+.25,y+6.2,y+6.9,i%2?0xff3a2a:0x3aff6a,'e',1))}
   {const x=48,z=-48,y=G;[[-2,-2],[2,-2],[-2,2],[2,2]].forEach(([a,b])=>BX(x+a-.2,z+b-.2,x+a+.2,z+b+.2,y-.3,y+8,0x6b4a2c,'w'));BX(x-2.6,z-2.6,x+2.6,z+2.6,y+8,y+12,0x8a5a3a,'w');D.push(['pyr',x,y+12,z,6,2.2,0x5a4636,'t',10])}}
  else if(L==='pine'){const zc=x=>xrc(x,XF.riv);
   xbridge('z',20,zc(20)-17,zc(20)+17,6,'wood');xbridge('z',192,zc(192)-17,zc(192)+17,6,'stone');xbridge('z',-60,zc(-60)-15,zc(-60)+15,2.4,'rope');
   // Lakeview: street lamps and a town square fountain
   {const G=XF.G1;for(let x=146;x<322;x+=18){lamp(x,15.6,G);lamp(x,24.4,G)}}
   // north-shore dock with rowing boats
   {const y=1.25;let zs=-266;while(zs<-240&&H(40,zs)>y+.25)zs+=.5;pier(40,zs-.5,40,-226,y,3);[[35.5,-238],[44.5,-232],[35.5,-228]].forEach(([x,z],i)=>{BX(x-.9,z-2.2,x+.9,z+2.2,-.25,.45,[0xc23b2f,0x2f6fd8,0xf4f4f0][i],'w');BX(x-.7,z-2,x+.7,z+2,.2,.3,0x6b4a2c,'w',1)})}
   // the island: a lookout tower and a beach
   lookout(80,-172,9,0x6b4a2c,0x3a4a3a);
   // farm: two silos you can climb, corn rows, hay bales, a tractor
   {const G=XF.Gf;tank(-298,-48,3.2,10,0xd8d4cc,1);tank(-298,-36,2.6,8,0x9aa3aa,0);for(let x=-302;x<-262;x+=1.6)BX(x,-132,x+.45,-100,G,G+2.3,0xc8b04a,'p',1);
    for(let i=0;i<8;i++){const x=-250+fr(-12,12),z=-72+fr(-10,10);if(freeAt(x,z,1.5)){const y=H(x,z);BX(x-.9,z-.6,x+.9,z+.6,y,y+1.1,0xd9b85a,'z')}}
    {const x=-212,z=-60,y=H(x,z);BX(x-1.2,z-2,x+1.2,z+1.4,y+.6,y+1.8,0x3a8a3a,'m');BX(x-.9,z-.6,x+.9,z+1.2,y+1.8,y+3.1,0x3a8a3a,'m');D.push(['wh',x-1.2,y+.7,z+.9,0]);D.push(['wh',x+1.2,y+.7,z+.9,0]);D.push(['wh',x-1.2,y+.45,z-1.6,0]);D.push(['wh',x+1.2,y+.45,z-1.6,0])}}
   // crossroads gas station canopy and pumps
   {const G=XF.Gx;[[27,99],[47,99],[27,121],[47,121]].forEach(([x,z])=>BX(x-.25,z-.25,x+.25,z+.25,G,G+4.6,0xe8e8e8,'m'));BX(26,98,48,122,G+4.6,G+5.2,0xc23b2f,'p');BX(26.2,98.2,47.8,121.8,G+4.5,G+4.6,0xf4f4f0,'e',1);
    [[33,106],[41,106],[33,114],[41,114]].forEach(([x,z])=>{BX(x-.5,z-.35,x+.5,z+.35,G,G+1.6,0xf4f4f0,'m');BX(x-.52,z-.37,x+.52,z+.37,G+1.6,G+1.8,0xc23b2f,'p')})}
   // campground: tents round a fire
   {const cx=-103,cz=-205,y=H(cx,cz);for(let i=0;i<7;i++){const a=i/7*6.283;tent(cx+Math.cos(a)*15,cz+Math.sin(a)*12,pick([0xc23b2f,0x2f6fd8,0xe0a030,0x3aa060]))}for(let i=0;i<8;i++){const a=i/8*6.283;BX(cx+Math.cos(a)*1.4-.3,cz+Math.sin(a)*1.4-.3,cx+Math.cos(a)*1.4+.3,cz+Math.sin(a)*1.4+.3,y-.1,y+.35,0x7a7a72,'r')}flame(cx,cz,y,1)}
   // fire lookouts on the hills, old cars, boulders
   // sawmill log yard and a log truck; ranch corral
   {const G=XF.Gs;for(let i=0;i<4;i++){const x=-322+i*9,z=-233;for(let k=0;k<3;k++)BX(x-3,z-.5+k*.35,x+3,z+.5+k*.35,G+k*.8,G+.8+k*.8,0x8a5a3a,'w')}car(-262,-246,1,0x3a5a3a)}
   {const G=XF.Gk;for(let x=292;x<=320;x+=3){BX(x-.08,-104.08,x+.08,-103.92,G,G+1.3,0x8a6a42,'w',1);BX(x-.08,-94.08,x+.08,-93.92,G,G+1.3,0x8a6a42,'w',1)}BX(292,-104.06,320,-103.94,G+.9,G+1.05,0x8a6a42,'w');BX(292,-94.06,306,-93.94,G+.9,G+1.05,0x8a6a42,'w');BX(312,-94.06,320,-93.94,G+.9,G+1.05,0x8a6a42,'w');
    BX(319.94,-104,320.06,-94,G+.9,G+1.05,0x8a6a42,'w')}
   [[330,-250],[-330,-300],[-40,-30],[340,190]].forEach(([x,z])=>{if(freeAt(x,z,6))lookout(x,z,12,0x6b4a2c,0x4a3a2a)});
   [[150,-40,1,0x3a5a7a],[300,70,0,0x8a3a2a],[-180,140,1,0xc9b48a]].forEach(([x,z,ax,c])=>{if(freeAt(x,z,3))car(x,z,ax,c)});
   scatter(70,XS-18,2.4,(x,z)=>boulder(x,z,fr(1.4,3.4),fr(.9,2.2),pick([0x8a8478,0x7a7466])),(x,z)=>H(x,z)>2)}
  else if(L==='bay'){const zc=XF.zc;
   // the lighthouse on the headland: climb it to the lamp room
   {const x=300,z=zc(300)-34;lookout(x,z,16,0xf4f4f0,0xc23b2f);const y=H(x,z)+16;BX(x-.9,z-.9,x+.9,z+.9,y+.3,y+2.2,0xfff2b0,'e',1)}
   // harbor: a long pier with moored boats, crates and a crane
   {const x=250,y=1.5;let z0=zc(250)-30;while(z0<zc(250)&&H(x,z0)>y+.25)z0+=.5;const z1=zc(250)+56;pier(x,z0,x,z1,y,4);[[244,z0+22],[256,z0+30],[244,z0+44]].forEach(([bx,bz],i)=>{BX(bx-1.5,bz-4,bx+1.5,bz+4,-.4,.8,[0xf4f4f0,0x2f6fd8,0xc23b2f][i],'w');BX(bx-1,bz-1.4,bx+1,bz+1.4,.8,2.2,0xf4f4f0,'w')})}
   {const G=XF.Gp;for(let i=0;i<10;i++){const x=fr(206,326),z=fr(4,18);if(freeAt(x,z,2)){BX(x-1.2,z-1.2,x+1.2,z+1.2,G,G+2.4,pick([0x2f6fd8,0xc23b2f,0x3aa060,0xe0a030]),'m')}}}
   // beach: lifeguard towers, umbrellas and towels
   [-280,-170,-60,60,170].forEach(x=>{const z=zc(x)-12;if(freeAt(x,z,5))lookout(x,z,5.4,0xf4f4f0,0xc23b2f)});
   for(let i=0;i<40;i++){const x=fr(-360,220),z=zc(x)-fr(4,20);if(H(x,z)<.4||!freeAt(x,z,1.5))continue;const y=H(x,z),c=pick([0xff5a5a,0x5ab8ff,0xffd23a,0x7ae05a,0xff8ad0]);BX(x-.04,z-.04,x+.04,z+.04,y,y+2.2,0xf4f4f0,'m',1);D.push(['pyr',x,y+2.2,z,2.6,.6,c,'p',8]);BX(x+.6,z-.4,x+2.4,z+.4,y,y+.04,c,'p',1)}
   // gas station canopy
   {const G=XF.Gg;[[-177,71],[-161,71],[-177,91],[-161,91]].forEach(([x,z])=>BX(x-.25,z-.25,x+.25,z+.25,G,G+4.6,0xe8e8e8,'m'));BX(-178,70,-160,92,G+4.6,G+5.2,0x2f9a4a,'p');
    [[-172,77],[-166,77],[-172,85],[-166,85]].forEach(([x,z])=>{BX(x-.5,z-.35,x+.5,z+.35,G,G+1.6,0xf4f4f0,'m');BX(x-.52,z-.37,x+.52,z+.37,G+1.6,G+1.8,0x2f9a4a,'p')})}
   // downtown lamps
   {const G=XF.Gd;for(let x=-104;x<110;x+=16){lamp(x,-14.8,G);lamp(x,-5.2,G)}}
   // the quarry: rock piles, a digger and a conveyor
   {const[qx,qz]=XF.q;for(let i=0;i<10;i++){const x=qx+fr(-30,30),z=qz+fr(-30,30);if(freeAt(x,z,3))boulder(x,z,fr(1.6,3.6),fr(1,2.4),pick([0xb0a490,0x9a8e7a]))}
    {const x=qx+8,z=qz-6,y=H(x,z);BX(x-2,z-1.5,x+2,z+1.5,y+.5,y+2.4,0xe0a030,'m');BX(x-1.4,z-1.6,x+1.4,z-.6,y+2.4,y+3.8,0xe0a030,'m');BX(x-2.2,z-1.7,x+2.2,z+1.7,y,y+.7,0x2a2a2a,'m');BX(x+2,z-.2,x+6,z+.2,y+2.6,y+3,0xe0a030,'m',1)}
    for(let k=0;k<10;k++){const x=qx-20+k*2,z=qz+18,y=H(qx-20,z)+k*.7;BX(x,z-.6,x+2,z+.6,y+1,y+1.2,0x3a3f46,'m',1)}}
   // buoy line out at sea
   {const zb=XS-14,nb=Math.round(2*XS/8);for(let i=0;i<=nb;i++){const x=-XS+8+i*(2*XS-16)/nb;D.push(['bu',x,zb,i*.9,i%2?0xf4f4f0:0xe0402e,1]);if(i<nb)D.push(['br',x,zb,-XS+8+(i+1)*(2*XS-16)/nb,zb])}}
   // vineyard rows and the sports field with goals and stands
   {const G=XF.Gv;for(let z=-190;z<-152;z+=2.4)BX(-352,z,-302,z+.5,G,G+1.6,0x4f7a2f,'p',1)}
   {const G=XF.Gf,x0=-232,x1=-148,z0=-66,z1=-18;BX(x0,z0,x1,z1,G-.2,G+.03,0x5aa83a,'p');BX(x0,(z0+z1)/2-.08,x1,(z0+z1)/2+.08,G+.03,G+.05,0xf4f4f0,'p',1);
    [[x0+2,1],[x1-2,-1]].forEach(([x])=>{BX(x-.1,(z0+z1)/2-3.6,x+.1,(z0+z1)/2-3.4,G,G+2.4,0xf4f4f0,'m');BX(x-.1,(z0+z1)/2+3.4,x+.1,(z0+z1)/2+3.6,G,G+2.4,0xf4f4f0,'m');BX(x-.1,(z0+z1)/2-3.6,x+.1,(z0+z1)/2+3.6,G+2.3,G+2.5,0xf4f4f0,'m')});
    for(let k=0;k<4;k++)BX(x0+10,z0-2-k*1.1,x1-10,z0-1-k*1.1,G,G+.5*(k+1),0x8a8f94,'c')}
   [[60,104,1,0x3a5a7a],[-90,96,1,0x8a3a2a],[120,-30,0,0xc9b48a],[-300,30,1,0xd9d4c8]].forEach(([x,z,ax,c])=>{if(freeAt(x,z,3))car(x,z,ax,c)});
   scatter(60,XS-18,2.4,(x,z)=>boulder(x,z,fr(1.4,3.4),fr(.9,2.2),pick([0x8a8478,0x9a8e7a])),(x,z)=>H(x,z)>6)}
  else if(L==='archi'){const I=XF.is,bw=1.4;
   const span=(ax,a,b)=>{const P=t=>ax==='x'?[t,0]:[0,t];let s=a;for(let t=a;t<b;t+=.5){if(H(...P(t))<.4){s=t-3;break}}let e=b;for(let t=b;t>a;t-=.5){if(H(...P(t))<.4){e=t+3;break}}return[s,e]};
   [['x',60,140],['x',-140,-60],['z',60,140],['z',-140,-60]].forEach(([ax,a,b])=>{const[s,e]=span(ax,a,b);xbridge(ax,0,s,e,4,'wood')});
   {const x=0,z=6,y=H(x,z);}
   [[150,0],[-150,0]].forEach(([ix,iz])=>{const dir=ix>0?1:-1;let zw=null;for(let z=iz+10;z<iz+80;z+=.5)if(H(ix+dir*4,z)<-.4&&H(ix,z)<-.4){zw=z;break}if(zw==null)return;const top=1;BX(ix-1.4,zw-5,ix+1.4,zw+20,top-.25,top,0xa8885c,'4');for(let z=zw-4;z<zw+20;z+=3){post(ix-1.3,z,top-.25);post(ix+1.3,z,top-.25)}[.75,.25,-.25,-.75].forEach((y,i)=>BX(ix-.6,zw+20+i*.5,ix+.6,zw+20.5+i*.5,y-.2,y,wd,'4'));xboat(ix+4.6,zw+10,0,pick([0xc23b2f,0x2f6f9a,0x3a9a4a]))});
   {const x=11,z=146,y=H(x,z);for(let i=0;i<5;i++)BX(x-5+i*2.4,z-.4,x-4.6+i*2.4,z+.4,y-.3,y+1.6,wd,'w');BX(x-7,z-2.2,x+6,z+2.2,y+1.6,y+4,0x8a5a3a,'w');BX(x-6.6,z-2.25,x+5.6,z+2.25,y+3,y+3.4,0xf2efe6,'p',1);BX(x-1.2,z-.15,x-.9,z+.15,y+4,y+11,0xd8c8a8,'w')}
   {const[cx,cz]=[I[7][0],I[7][1]],y=H(cx,cz);BX(cx-2,cz-9,cx+2.5,cz+6,y-2,y+1.8,0x5a3a22,'w');BX(cx-2.1,cz-9.1,cx+2.6,cz-7,y+1.8,y+3.6,0x5a3a22,'w');BX(cx-.2,cz-2,cx+.2,cz-1.6,y+1.8,y+9,0x4a2e1a,'w');BX(cx-.2,cz-1.95,cx+3.2,cz-1.65,y+6,y+8.5,0xe8dcc0,'w',1)}
   [[I[5][0],I[5][1]],[I[6][0],I[6][1]]].forEach(([cx,cz])=>{tent(cx+3,cz-2,0xc23b2f);tent(cx-3,cz+3,0x2f6fd8);crates(cx+5,cz+4,3);const y=H(cx,cz);BX(cx-.35,cz-.35,cx+.35,cz+.35,y,y+.8,0xff8a2a,'e',1)});
   {const x=0,z=-168,y=H(x,z);BX(x-2.5,z-2.5,x+2.5,z+2.5,y-.5,y+12,stn,'s');BX(x-3.4,z-3.4,x+3.4,z+3.4,y+12,y+12.6,stn,'s');for(let i=0;i<4;i++){const s=-3.4+i*2.1;BX(x+s,z-3.4,x+s+.9,z-2.8,y+12.6,y+13.6,stn,'s');BX(x+s,z+2.8,x+s+.9,z+3.4,y+12.6,y+13.6,stn,'s')}
    const n=30,rs=12.6/n;for(let k=1;k<=n;k++)BX(x+3.5,z+13-k*.5,x+4.9,z+13.5-k*.5,y-.3,y+rs*k,stn,'s')}
   for(let i=0;i<6;i++)[[1,1]].forEach(()=>{const a=fr(0,6.28),cx=I[2][0]+Math.cos(a)*28,cz=I[2][1]+Math.sin(a)*28;if(!freeAt(cx,cz,2)||H(cx,cz)<.6)return;const y=H(cx,cz);[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]].forEach(([i2,j])=>BX(cx+i2-.09,cz+j-.09,cx+i2+.09,cz+j+.09,y,y+2.5,wd,'w'));D.push(['pyr',cx,y+2.5,cz,3.6,1.4,0xd9c08a,'z'])});
   for(let i=0,n=0;i<6000&&n<600;i++){const k=I[r()*I.length|0],a=fr(0,6.28),rr=k[2]-fr(2,14),x=k[0]+Math.cos(a)*rr,z=k[1]+Math.sin(a)*rr,y=H(x,z);if(y<.55||!freeAt(x,z,1.4))continue;xpalm(x,z,Math.cos(a),Math.sin(a),fr(.1,.3));n++}
   const RB=T.bnd+1,nb=Math.round(2*Math.PI*RB/6),p=[];for(let i=0;i<nb;i++){const a=i/nb*Math.PI*2;p.push([Math.cos(a)*RB,Math.sin(a)*RB])}p.forEach((q,i)=>{D.push(['bu',q[0],q[1],i*.9,i%2?0xf4f4f0:0xe0402e,1]);const nq=p[(i+1)%nb];D.push(['br',q[0],q[1],nq[0],nq[1]])})}};
 // ================= Cody, Wyoming from OpenStreetMap: every building, street, park, lot and lake where it really is =================
 const codyBuild=()=>{const CD=XF.cd,TYP=CD.TY,NM=CD.nm,BB=CD.bb,AT=CD.AT,RB=[T.rbx,T.rbz];
  const BL=[],RL=[],SG=[];XF.out={BL,RL,SG,LK:XF.LK,osm:1};
  const pl=a=>{const p=[];for(let i=0;i<a.length;i+=2)p.push([a[i],a[i+1]]);return p};
  const sarea=p=>{let s=0;for(let i=0,k=p.length-1;i<p.length;k=i++)s+=p[k][0]*p[i][1]-p[i][0]*p[k][1];return s/2};
  const hull=P=>{const p=P.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]),cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]),lo=[],up=[];
   for(const q of p){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],q)<=0)lo.pop();lo.push(q)}for(let i=p.length-1;i>=0;i--){const q=p[i];while(up.length>=2&&cr(up[up.length-2],up[up.length-1],q)<=0)up.pop();up.push(q)}lo.pop();up.pop();return lo.concat(up)};
  // minimum-area oriented rectangle (long side along u)
  const obb=P=>{const h=hull(P);let best=null;for(let i=0;i<h.length;i++){const a=h[i],b=h[(i+1)%h.length],L=Math.hypot(b[0]-a[0],b[1]-a[1]);if(L<1e-6)continue;const ux=(b[0]-a[0])/L,uz=(b[1]-a[1])/L;
    let u0=1e9,u1=-1e9,v0=1e9,v1=-1e9;for(const q of h){const u=q[0]*ux+q[1]*uz,v=-q[0]*uz+q[1]*ux;u0=Math.min(u0,u);u1=Math.max(u1,u);v0=Math.min(v0,v);v1=Math.max(v1,v)}const A=(u1-u0)*(v1-v0);
    if(!best||A<best.A){const uc=(u0+u1)/2,vc=(v0+v1)/2;best={A,ux,uz,cx:uc*ux-vc*uz,cz:uc*uz+vc*ux,L:u1-u0,W:v1-v0}}}
   if(best&&best.W>best.L){const t=best.L;best.L=best.W;best.W=t;const ux=best.ux;best.ux=-best.uz;best.uz=ux}return best};
  const rectPts=o=>{const ex=o.ux*o.L/2,ez=o.uz*o.L/2,fx=-o.uz*o.W/2,fz=o.ux*o.W/2;return[[o.cx-ex-fx,o.cz-ez-fz],[o.cx+ex-fx,o.cz+ez-fz],[o.cx+ex+fx,o.cz+ez+fz],[o.cx-ex+fx,o.cz-ez+fz]]};
  const hsh=n=>{let h=(n*2654435761)>>>0;h^=h>>>15;h=Math.imul(h,2246822519)>>>0;h^=h>>>13;return(h>>>0)/4294967296};
  // collision: the footprint sliced into 2 m strips of axis-aligned boxes (invisible), so rotated buildings stay solid
  const solid=(P,y0,y1)=>{let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9;P.forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);z0=Math.min(z0,p[1]);z1=Math.max(z1,p[1])});
   const zr=x=>{let a=1e9,b=-1e9;for(let i=0,k=P.length-1;i<P.length;k=i++){const p=P[i],q=P[k];if((p[0]>=x)!==(q[0]>=x)){const z=p[1]+(x-p[0])*(q[1]-p[1])/(q[0]-p[0]);a=Math.min(a,z);b=Math.max(b,z)}}return[a,b]};
   const W=x1-x0,n=Math.max(1,Math.round(W/2));if((x1-x0)*(z1-z0)<=Math.abs(sarea(P))*1.12||n==1){B.push([(x0+x1)/2,(z0+z1)/2,W,z1-z0,y1,y0,0,'n']);return}
   for(let i=0;i<n;i++){const a=x0+W*i/n,b=x0+W*(i+1)/n;let lo=1e9,hi=-1e9;for(const x of[a+.01,(a+b)/2,b-.01]){const[p,q]=zr(x);lo=Math.min(lo,p);hi=Math.max(hi,q)}if(hi>lo)B.push([(a+b)/2,(lo+hi)/2,b-a,hi-lo,y1,y0,0,'n'])}};
  const NAMED={'The Irma Hotel':{h:10.5,w:'brick',c:0x8a4632},'Park County Courthouse':{h:10,w:'stone',c:0xcbb38a},'Buffalo Bill Center of the West':{h:12,w:'stone',c:0xc9a87a},
   'West Park Hospital - Cody Regional Health':{h:15,w:'office',c:0xe2ddd2},'Cody High School':{h:10,w:'school',c:0xa8704c},'Cody Middle School':{h:8.5,w:'school',c:0xb07a54},
   'Park County Public Libary':{h:8,w:'office',c:0xc9b48a},'Cody Auditorium':{h:9,w:'brick',c:0x9a6a4a},'Chamberlin Inn':{h:7.5,w:'brick',c:0x9a4e3c},'Albertsons':{h:8,w:'stucco',c:0xd8cfbc}};
  const HC=[0xf0ede4,0xe8dcc0,0xcfd8de,0xbcc9b0,0xd8c4a8,0xa8b8c8,0xe4e0d0,0x98a89a,0xc9b48a,0xd6cfc2,0x8a9aa8,0xf2e6c8,0xb8a58a,0x9aa59a,0xe8d0b8,0x7a8a96,0xc2b8a4],
   RC=[0x4a4f57,0x5c4636,0x3b4a5a,0x6b3a2e,0x3f5a46,0x55565a,0x2f3338,0x6a6050,0x7a4a3a,0x5a5550],MRC=[0x8a3a2e,0x3a5a7a,0x4a6a4a,0x8a8d90,0x6a6c70,0x2f3a4a],
   BRK=[0xa85a45,0x9a4e3c,0xb87050,0x8a5a48,0xa06048],CMC=[0xd8cfbc,0xc9b89c,0xb8b0a0,0xe0d8c8,0xa89a86,0xc8c4bc,0x9aa3aa,0xd6c8a8];
  const SGN={'Buffalo Bill Center of the West':'CENTER OF THE WEST','Park County Public Libary':'PARK COUNTY LIBRARY','The Church of Jesus Christ of Latter-day Saints':'CHURCH OF JESUS CHRIST','By Western Hands Museum & Gallery':'BY WESTERN HANDS',
   'Millstone Pizza Company & Brewery':'MILLSTONE PIZZA',"Dan Miller's Cowboy Music Review":'COWBOY MUSIC REVUE','Wyoming Department of Transportation':'WYDOT',"Kingdom Hall of Jehovah's Witnesses":'KINGDOM HALL',
   "Cody Police Department and Park County Sheriff's Office":'CODY POLICE','Cody Quad Recreation Center':'CODY REC CENTER','proprietress (the new juniper)':'PROPRIETRESS','Shoshone Lodge & Guest Ranch':'SHOSHONE LODGE','West Park Hospital - Cody Regional Health':'WEST PARK HOSPITAL',
   'Comfort Inn at Buffalo Bill Village Resort':'BUFFALO BILL VILLAGE','Buffalo Bill Village Motel Office':'BUFFALO BILL VILLAGE'};
  const codySignName=n=>{if(SGN[n])return SGN[n];let s=n.toUpperCase().replace(/ - .*/,'').replace(/ AND .*/,'');if(s.length>24){let w=s.slice(0,24).split(' ');if(s[24]&&s[24]!==' ')w.pop();while(w.length>1&&['OF','THE','&','AND','A','AT','BY'].includes(w[w.length-1]))w.pop();s=w.join(' ')}return s};
  const downtown=(x,z)=>x>-1990&&x<-860&&Math.abs(z+338)<95;
  // ---------------- buildings ----------------
  CD.bd.forEach((b,bi)=>{const ty=TYP[b[0]],lv=b[1],nm=b[2]>=0?NM[b[2]]:'';let P=pl(b.slice(3));if(sarea(P)<0)P.reverse();const A=Math.abs(sarea(P));if(A<6)return;
   const o=obb(P),rectish=!!o&&A/(o.L*o.W)>.86&&P.length<=9,h1=hsh(bi),h2=hsh(bi+7919),h3=hsh(bi+104729);let cx=0,cz=0;P.forEach(p=>{cx+=p[0];cz+=p[1]});cx/=P.length;cz/=P.length;
   if(ty==='tipi'){const y=H(cx,cz),w=Math.max(4,Math.sqrt(A)*1.15);D.push(['pyr',cx,y-.1,cz,w,w*1.25,0xe8dcc0,'p',12]);B.push([cx,cz,w*.55,w*.55,y+w*.8,y-.5,0,'n']);return}
   const Q=rectish?rectPts(o):P;let lo=1e9,hi=-1e9;Q.forEach(p=>{const y=H(p[0],p[1]);lo=Math.min(lo,y);hi=Math.max(hi,y)});{const y=H(cx,cz);lo=Math.min(lo,y);hi=Math.max(hi,y)}
   const N1=NAMED[nm]||{},dt=downtown(cx,cz);let w='house',st=1,sh=2.9,wc=HC[h1*HC.length|0],rc=RC[h2*RC.length|0],rf=rectish?'g':'t',rise=0,rt='shingle',G=hi+.25,par=0;
   if(ty==='house'){const q=h3;w=q<.13?'brick':q<.19?'stucco':q<.22?'log':'house';if(w==='brick')wc=BRK[h1*BRK.length|0];if(w==='log')wc=0x8b5a36;st=lv||(A>165&&h2<.32?2:1);if(h2>.86){rt='metal';rc=MRC[h1*MRC.length|0]}rise=Math.min(3.4,(rectish?o.W:Math.sqrt(A))*(.22+.1*h3))}
   else if(ty==='shed'){w='shed';st=1;sh=A>60?3:2.5;rise=rectish?Math.min(1.6,o.W*.18):.6;if(h2>.5){rt='metal';rc=MRC[h1*MRC.length|0]}}
   else if(ty==='trailer'){w='trailer';wc=[0xf2f0ea,0xe8e0cc,0xd8e0e4,0xe8d8c0,0xc8d0c8][h1*5|0];st=1;sh=2.7;G=hi+.45;rt='metal';rc=0xb8bcc0;rise=rectish?.45:.3}
   else if(ty==='cabin'){w='log';wc=[0x8b5a36,0x7a4e2e,0x9c6a40][h1*3|0];st=1;sh=2.8;rise=rectish?o.W*.3:1.4;rt=h2<.5?'metal':'shingle';if(rt==='metal')rc=MRC[h1*MRC.length|0]}
   else if(ty==='apt'){w=h3<.4?'brick':'house';if(w==='brick')wc=BRK[h1*BRK.length|0];st=lv||(A>500?3:2);rise=rectish?Math.min(3.5,o.W*.2):1.6}
   else if(ty==='church'){w=h3<.5?'brick':'stucco';wc=w==='brick'?BRK[h1*BRK.length|0]:0xf0ede4;st=1;sh=A>900?8:6.5;rise=rectish?Math.min(9,o.W*.42):3}
   else if(ty==='school'){w='school';wc=0xa8704c;st=lv||2;sh=4;rf='f';par=.9;rt='flat'}
   else if(ty==='hosp'){w='office';wc=0xe2ddd2;st=lv||4;sh=3.7;rf='f';par=1;rt='flat'}
   else if(ty==='hotel'){w=h3<.45?'brick':'hotel';wc=w==='brick'?BRK[h1*BRK.length|0]:HC[h1*HC.length|0];st=lv||2;sh=3;if(rectish&&A<900&&h2<.55){rise=Math.min(3,o.W*.22)}else{rf='f';par=.7;rt='flat'}}
   else if(ty==='ind'){w='metal';wc=[0x9aa3aa,0x7d8b96,0xb8b2a0,0x6b7d8c,0xa65a3a,0xc8c4bc][h1*6|0];st=1;sh=A>2500?9:A>600?7:5;if(rectish&&A<2500){rise=o.W*.12;rt='metal';rc=MRC[h2*MRC.length|0]}else{rf='f';rt='flat';par=.3}}
   else if(ty==='canopy'){const y=hi;solid(Q,y+4.6,y+5.4);if(rectish)rectPts({...o,L:Math.max(1,o.L-2),W:Math.max(1,o.W-2)}).forEach(p=>B.push([p[0],p[1],.4,.4,y+4.6,lo-.3,0xd8d8d4,'m']));
    BL.push({P:Q,y0:y+4.6,G:y+4.6,h:.75,st:1,sh:.75,w:'canopy',wc:[0xc23b2f,0x2f5d9a,0x2f6b4a,0xe0a030,0xf2f0ea][h1*5|0],rf:'f',rt:'flat',rc:0xe8e8e4,rise:0,par:0,i:bi,c:[cx,cz]});return}
   else{// commercial / civic / retail
    if(dt){w=h3<.75?'store':'store2';wc=h3<.7?BRK[h1*BRK.length|0]:CMC[h1*CMC.length|0];st=lv||(h2<.72?2:1);sh=st>1?3.6:4.8;rf='f';par=1.1;rt='flat'}
    else if(A>1800){w='big';wc=CMC[h1*CMC.length|0];st=1;sh=A>5000?8.5:7;rf='f';par=.8;rt='flat'}
    else{w=h3<.55?'strip':'store';wc=h3<.55?CMC[h1*CMC.length|0]:(h2<.5?BRK[h1*BRK.length|0]:CMC[h1*CMC.length|0]);st=lv||1;sh=st>1?3.6:4.6;if(rectish&&A<420&&h2<.35){rise=Math.min(3,o.W*.2);rt=h1<.5?'metal':'shingle';if(rt==='metal')rc=MRC[h2*MRC.length|0]}else{rf='f';par=.8;rt='flat'}}}
   if(N1.h){st=Math.max(1,Math.round(N1.h/(N1.w==='office'?3.7:3.6)));sh=N1.h/st}if(N1.w)w=N1.w;if(N1.c)wc=N1.c;
   if(rf==='g'&&(!rectish||rise<.2))rf='t';if(rf!=='f'&&rt==='flat')rt='shingle';if(rf==='t')rise=Math.min(rise,Math.max(.8,Math.sqrt(A)*.12));
   const top=G+st*sh;BL.push({P:Q,y0:lo-.6,G,h:st*sh,st,sh,w,wc,rc,rf,rt,rise,o:rectish?o:null,par,i:bi,nm,c:[cx,cz]});
   solid(Q,lo-.6,top+(rf==='f'?Math.min(par,.4):rise*.45));
   if(nm&&!['house','shed','trailer','cabin'].includes(ty)){const cnm=CD.ch[nm];SG.push({i:BL.length-1,t:cnm?cnm[0]:codySignName(nm),s:cnm?cnm[1]:(ty==='hotel'?'mo':ty==='church'?'ch':ty==='school'?'sc':'lo')})}});
  // ---------------- streets: ribbons follow the ground; bridges run straight between their banks ----------------
  CD.rd.forEach((q,n)=>{const[k,w,sw,cls,br]=q,P=pl(q.slice(5));let Y=null;
   // bridges: a solid deck across the full width (even when the bridge runs diagonally), railings on both sides that keep people and cars on it,
   // and pillars down to the ground; narrow footbridges are widened so a car fits between the railings
   let bw=w;if(br){bw=Math.max(w,4.6);const ya=H(P[0][0],P[0][1]),yb=H(P[P.length-1][0],P[P.length-1][1]);let L=0;const cum=[0];for(let i=1;i<P.length;i++){L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);cum.push(L)}
    Y=cum.map(c=>ya+(yb-ya)*c/(L||1)+.3);const hw=bw/2;
    for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]),m=Math.max(1,Math.ceil(l/2)),ux=(b[0]-a[0])/(l||1),uz=(b[1]-a[1])/(l||1),nx=-uz,nz=ux,ax=Math.abs(ux),az=Math.abs(uz);
     const ns=Math.max(1,Math.ceil(bw/1.2)),ww=bw/ns;
     for(let s=0;s<m;s++){const t0=s/m,t1=(s+1)/m,sl=l/m,cx=a[0]+(b[0]-a[0])*(t0+t1)/2,cz=a[1]+(b[1]-a[1])*(t0+t1)/2,y=Y[i]+(Y[i+1]-Y[i])*(t0+t1)/2;
      for(let j=0;j<ns;j++){const o=-hw+ww*(j+.5),px=cx+nx*o,pz=cz+nz*o;B.push([px,pz,sl*ax+ww*az+.05,sl*az+ww*ax+.05,y,y-.9,0x8a8d90,'n'])}
      // railings: short solid posts along both edges (1.1 m high), skipped on the first and last metre so the road runs on and off
      const along=s/m*l+i*0;[-1,1].forEach(sd=>{for(let q=0;q<3;q++){const tt=t0+(t1-t0)*(q+.5)/3,dl=tt*l;if(i==0&&dl<1||i==P.length-2&&dl>l-1)continue;const ex=a[0]+(b[0]-a[0])*tt+nx*sd*(hw+.15),ez=a[1]+(b[1]-a[1])*tt+nz*sd*(hw+.15),ey=Y[i]+(Y[i+1]-Y[i])*tt;B.push([ex,ez,.42,.42,ey+1.1,ey-.9,0,'n'])}});
      if(H(cx,cz)<y-2.5&&s%6==3)[-1,1].forEach(sd=>{const px=cx+nx*sd*hw*.6,pz=cz+nz*sd*hw*.6;B.push([px,pz,1.3,1.3,y-.9,H(px,pz)-1,0x9a9590,'c'])})}}}
   RL.push({k,w,sw,P,Y,cls,n,bw})});
  // ---------------- occupancy grid (2 m) for trees and cars ----------------
  const OS=2,OW=Math.ceil(2*BB[0]/OS),OH=Math.ceil(2*BB[1]/OS),OC=new Uint8Array(OW*OH),oi=(x,z)=>{const i=Math.floor((x+BB[0])/OS),j=Math.floor((z+BB[1])/OS);return i<0||j<0||i>=OW||j>=OH?-1:j*OW+i};
  const mark=(x0,z0,x1,z1,v)=>{const i0=Math.max(0,Math.floor((x0+BB[0])/OS)),i1=Math.min(OW-1,Math.floor((x1+BB[0])/OS)),j0=Math.max(0,Math.floor((z0+BB[1])/OS)),j1=Math.min(OH-1,Math.floor((z1+BB[1])/OS));for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++)OC[j*OW+i]|=v};
  const fillP=(P,v)=>{let z0=1e9,z1=-1e9;P.forEach(p=>{z0=Math.min(z0,p[1]);z1=Math.max(z1,p[1])});for(let z=Math.ceil(z0/OS)*OS;z<=z1;z+=OS){const xs=[];for(let i=0,k=P.length-1;i<P.length;k=i++){const a=P[i],b=P[k];if((a[1]>z)!==(b[1]>z))xs.push(a[0]+(z-a[1])*(b[0]-a[0])/(b[1]-a[1]))}xs.sort((a,b)=>a-b);for(let q=0;q+1<xs.length;q+=2)mark(xs[q],z,xs[q+1],z,v)}};
  const insP=(P,x,z)=>{let c=false;for(let i=0,k=P.length-1;i<P.length;k=i++){const a=P[i],q=P[k];if((a[1]>z)!==(q[1]>z)&&x<(q[0]-a[0])*(z-a[1])/(q[1]-a[1])+a[0])c=!c}return c};
  const bbx=P=>{let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9;P.forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);z0=Math.min(z0,p[1]);z1=Math.max(z1,p[1])});return[x0,z0,x1,z1]};
  BL.forEach(b=>{const[x0,z0,x1,z1]=bbx(b.P);mark(x0-1.5,z0-1.5,x1+1.5,z1+1.5,1)});
  CD.rd.forEach(q=>{const P=pl(q.slice(5)),r2=q[1]/2+(q[2]?2.6:1.2);for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]),m=Math.max(1,Math.ceil(l/1.5));for(let s=0;s<=m;s++){const x=a[0]+(b[0]-a[0])*s/m,z=a[1]+(b[1]-a[1])*s/m;mark(x-r2,z-r2,x+r2,z+r2,2)}}});
  const parks=[],lots=[];CD.ar.forEach(a=>{const t=AT[a[0]],P=pl(a.slice(1));if(t==='water')fillP(P,4);else if(['parking','apron','field','diamond','track','court','pool','sand'].includes(t)){fillP(P,8);if(t==='parking')lots.push(P)}else if(['park','cemetery','golf','grass','campus'].includes(t))parks.push([t,P])});
  (CD.rl||[]).forEach(a=>{const P=pl(a);for(let i=0;i<P.length-1;i++){const p=P[i],q=P[i+1],l=Math.hypot(q[0]-p[0],q[1]-p[1]),m=Math.max(1,Math.ceil(l/2));for(let s=0;s<=m;s++){const x=p[0]+(q[0]-p[0])*s/m,z=p[1]+(q[1]-p[1])*s/m;mark(x-3,z-3,x+3,z+3,2)}}});
  const free=(x,z,m)=>{const k=oi(x,z);return k>=0&&!(OC[k]&m)},inB=(x,z,e)=>Math.abs(x)<RB[0]-e&&Math.abs(z)<RB[1]-e;
  const tr=(x,z,lf)=>{if(!inB(x,z,3)||!free(x,z,15)||H(x,z)<T.wl+1)return;tree(x,z,lf);mark(x-2,z-2,x+2,z+2,1)};
  // ---------------- yards: every house gets the ground nearest to it (stopping at streets, alleys, lots and water); the back and sides
  // of each yard are fenced, front yards stay open to the street, and roomy back yards get a shed and a tree ----------------
  {const HS=['house','brick','stucco','log','trailer'],NC=OW*OH,OWN=new Int16Array(NC).fill(-1),DST=new Uint8Array(NC).fill(255),RDD=new Uint8Array(NC).fill(255);
   let Q=[];CD.rd.forEach(q=>{if(q[0]>1)return;const P=pl(q.slice(5)),r2=q[1]/2+(q[2]?2.6:1.2);for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]),m=Math.max(1,Math.ceil(l/1.5));
     for(let t=0;t<=m;t++){const x=a[0]+(b[0]-a[0])*t/m,z=a[1]+(b[1]-a[1])*t/m;for(let u=-r2;u<=r2;u+=OS)for(let v=-r2;v<=r2;v+=OS){const k=oi(x+u,z+v);if(k>=0&&RDD[k]){RDD[k]=0;Q.push(k)}}}}});
   for(let h=0;h<Q.length;h++){const k=Q[h],d=RDD[k];if(d>=7)continue;const i=k%OW;for(const n of[i>0?k-1:-1,i<OW-1?k+1:-1,k-OW,k+OW]){if(n<0||n>=NC||RDD[n]<=d+1)continue;RDD[n]=d+1;Q.push(n)}}
   Q=[];const HL=[];BL.forEach((b,bi)=>{if(!HS.includes(b.w))return;const id=HL.length;HL.push(bi);const[x0,z0,x1,z1]=bbx(b.P);for(let z=Math.ceil(z0/OS)*OS+.5;z<z1;z+=OS)for(let x=Math.ceil(x0/OS)*OS+.5;x<x1;x+=OS){const k=oi(x,z);if(k>=0&&OWN[k]<0&&insP(b.P,x,z)){OWN[k]=id;DST[k]=0;Q.push(k)}}});
   for(let h=0;h<Q.length;h++){const k=Q[h],d=DST[k];if(d>=14)continue;const i=k%OW;for(const n of[i>0?k-1:-1,i<OW-1?k+1:-1,k-OW,k+OW]){if(n<0||n>=NC||OWN[n]>=0||(OC[n]&(2|4|8)))continue;OWN[n]=OWN[k];DST[n]=d+1;Q.push(n)}}
   // lots line up with their street like real lots do: each yard is squared off along the nearest street, then fenced down both
   // sides (from the front of the house back) and across the back; neighbours share their side fence
   const SB=new Map(),sbk=(x,z)=>Math.floor(x/100)*100000+Math.floor(z/100);CD.rd.forEach(q=>{if(q[0]>1)return;const P=pl(q.slice(5));for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],seg=[a,b];
     const x0=Math.min(a[0],b[0]),x1=Math.max(a[0],b[0]),z0=Math.min(a[1],b[1]),z1=Math.max(a[1],b[1]);for(let x=Math.floor(x0/100);x<=Math.floor(x1/100);x++)for(let z=Math.floor(z0/100);z<=Math.floor(z1/100);z++){const k=x*100000+z;let L=SB.get(k);if(!L)SB.set(k,L=[]);L.push(seg)}}});
   const near=(x,z)=>{let best=null,bd=1e9;const cx=Math.floor(x/100),cz=Math.floor(z/100);for(let u=-1;u<=1;u++)for(let v=-1;v<=1;v++)(SB.get((cx+u)*100000+cz+v)||[]).forEach(([a,b])=>{const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1,t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/L2)),d=Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t);if(d<bd){bd=d;best=[a,b,a[0]+dx*t,a[1]+dz*t]}});return best&&{d:bd,s:best}};
   BL.forEach(b=>fillP(b.P,32));const CL=HL.map(()=>[]);for(const k of Q)if(DST[k]>=1)CL[OWN[k]].push(k);
   const FN=[];XF.out.FN=FN;const FC=[[0x8a6a48,1.75],[0xefede6,1.4],[0x7a5a3a,1.8],[0xa8a090,1.5]];
   CL.forEach((L,o)=>{if(L.length<25)return;const b=BL[HL[o]],[cx,cz]=b.c,nr=near(cx,cz);if(!nr||nr.d>60)return;const[a,q2,px,pz]=nr.s,l=Math.hypot(q2[0]-a[0],q2[1]-a[1])||1;
    let ux=(q2[0]-a[0])/l,uz=(q2[1]-a[1])/l;{const an=Math.atan2(uz,ux),qq=Math.round(an/(Math.PI/2))*(Math.PI/2);if(Math.abs(an-qq)<.06){ux=Math.round(Math.cos(qq));uz=Math.round(Math.sin(qq))}}
    let nx=-uz,nz=ux;if((cx-px)*nx+(cz-pz)*nz<0){nx=-nx;nz=-nz}
    const U=[],Vv=[];for(const k of L){const i=k%OW,j=(k-i)/OW,x=i*OS-BB[0]+1,z=j*OS-BB[1]+1;U.push((x-cx)*ux+(z-cz)*uz);Vv.push((x-cx)*nx+(z-cz)*nz)}U.sort((p,q)=>p-q);Vv.sort((p,q)=>p-q);
    const pc=(A,f)=>A[Math.min(A.length-1,Math.max(0,Math.round(f*(A.length-1))))],u0=pc(U,.03)-1,u1=pc(U,.97)+1,vb=pc(Vv,.97)+1;let vf=1e9;b.P.forEach(p=>vf=Math.min(vf,(p[0]-cx)*nx+(p[1]-cz)*nz));
    if(vb-vf<4||u1-u0<6)return;const st=(()=>{const v=hsh(o*13+5);return v<.6?0:v<.8?1:v<.93?2:3})(),[col,fh]=FC[st],P2=(u,v)=>[cx+ux*u+nx*v,cz+uz*u+nz*v];
    const seg=(A,B2)=>{const L=Math.hypot(B2[0]-A[0],B2[1]-A[1]),m=Math.ceil(L);let s0=-1;const out=t=>{if(s0>=0&&(t-s0)*L/m>=2.5)FN.push([A[0]+(B2[0]-A[0])*s0/m,A[1]+(B2[1]-A[1])*s0/m,A[0]+(B2[0]-A[0])*t/m,A[1]+(B2[1]-A[1])*t/m,fh,col]);s0=-1};
     for(let t=0;t<=m;t++){const x=A[0]+(B2[0]-A[0])*t/m,z=A[1]+(B2[1]-A[1])*t/m,k=oi(x,z),bad=k<0||(OC[k]&(32|2|4))||(OC[oi(x+.7,z)]&32)||(OC[oi(x-.7,z)]&32)||(OC[oi(x,z+.7)]&32)||(OC[oi(x,z-.7)]&32);if(bad)out(t-1);else if(s0<0)s0=t}out(m)};
    seg(P2(u0,vf),P2(u0,vb));seg(P2(u0,vb),P2(u1,vb));
    {const[mx,mz]=P2(u1+2.5,(vf+vb)/2),k=oi(mx,mz);if(!(k>=0&&OWN[k]>=0&&OWN[k]!==o))seg(P2(u1,vf),P2(u1,vb))}});
   // fence colliders: one box per straight piece when it runs along x or z, otherwise short steps along the line
   FN.forEach(([x0,z0,x1,z1,fh,col])=>{const L=Math.hypot(x1-x0,z1-z0),ux=(x1-x0)/L,uz=(z1-z0)/L,ya=H(x0,z0),yb=H(x1,z1),hi=Math.max(ya,yb)+fh,lo=Math.min(ya,yb)-.3;
    if(Math.abs(ux)>.985||Math.abs(uz)>.985)B.push([(x0+x1)/2,(z0+z1)/2,Math.abs(x1-x0)+.12,Math.abs(z1-z0)+.12,hi,lo,0,'n']);
    else{const m=Math.ceil(L/2.6);for(let s=0;s<m;s++){const a=(s+.5)/m,x=x0+(x1-x0)*a,z=z0+(z1-z0)*a,w=Math.abs(ux)*L/m+.15,d=Math.abs(uz)*L/m+.15;B.push([x,z,w,d,hi,lo,0,'n'])}}
    const m2=Math.ceil(L/2);for(let s=0;s<=m2;s++){const x=x0+(x1-x0)*s/m2,z=z0+(z1-z0)*s/m2;mark(x-.8,z-.8,x+.8,z+.8,1)}});
   const NF=FN.length;
   // sheds and back-yard trees
   const LC=HL.map(()=>[]);for(const k of Q){if(DST[k]>=4&&RDD[k]>=6&&!OC[k])LC[OWN[k]].push(k)}
   LC.forEach((L,o)=>{if(L.length<60)return;const h=hsh(o*7+3);if(h<.5){let best=-1,bd=-1;for(const k of L){const i=k%OW;if(i>=OW-2||k+OW+1>=NC)continue;const ok=[k+1,k+OW,k+OW+1].every(n=>OWN[n]===o&&!OC[n]&&DST[n]>=3);if(ok&&RDD[k]>bd){bd=RDD[k];best=k}}
     if(best>=0){const i=best%OW,j=(best-i)/OW,x0=i*OS-BB[0]+.3,z0=j*OS-BB[1]+.3,w=hsh(o)<.5?3.2:3.6,d=hsh(o+1)<.5?2.8:3.4,P=[[x0,z0],[x0+w,z0],[x0+w,z0+d],[x0,z0+d]];let lo=1e9,hi=-1e9;P.forEach(p=>{const y=H(p[0],p[1]);lo=Math.min(lo,y);hi=Math.max(hi,y)});
      const G=hi+.12,ax=w>=d,o2={ux:ax?1:0,uz:ax?0:1,cx:x0+w/2,cz:z0+d/2,L:Math.max(w,d),W:Math.min(w,d)},wc=[0xb8442e,0xe8e4da,0x8a6a48,0x6a7a5a,0xc9b48a,0x7a8a9a][hsh(o+2)*6|0],rc=[0x4a4f57,0x5c4636,0x6a6c70,0x3f5a46][hsh(o+3)*4|0];
      BL.push({P,y0:lo-.3,G,h:2.3,st:1,sh:2.3,w:'shed',wc,rc,rf:'g',rt:hsh(o+4)<.5?'metal':'shingle',rise:.85,o:o2,par:0,i:90000+o,nm:'',c:[o2.cx,o2.cz]});solid(P,lo-.3,G+2.3+.4);mark(x0-1,z0-1,x0+w+1,z0+d+1,1)}}
    if(hsh(o*3+1)<.6){const k=L[(hsh(o*5+9)*L.length)|0];if(k!=null&&!OC[k]){const i=k%OW,j=(k-i)/OW;tr(i*OS-BB[0]+1,j*OS-BB[1]+1,r()<.75)}}});
   XF.out.yards={fences:NF,lots:HL.length}}
  {const T0=CD.tr;for(let i=0;i<T0.length;i+=2)tr(T0[i],T0[i+1],r()<.7)}
  BL.forEach(b=>{if(!['house','brick','stucco','log','trailer'].includes(b.w)||!b.c)return;const n=r()<.25?0:r()<.6?1:2;for(let k=0;k<n;k++){const a=r()*6.283,d=fr(7,17);tr(b.c[0]+Math.cos(a)*d,b.c[1]+Math.sin(a)*d,r()<.72)}});
  parks.forEach(([t,P])=>{const[x0,z0,x1,z1]=bbx(P),A=Math.abs(sarea(P)),n=Math.min(t==='golf'?40:120,A/(t==='grass'?900:t==='campus'?1400:420));
   for(let i=0;i<n*3&&n>0;i++){const x=fr(x0,x1),z=fr(z0,z1);if(insP(P,x,z)&&r()<.34)tr(x,z,r()<.8)}});
  for(let i=0;i<900;i++){const x=fr(-RB[0],RB[0]),z=fr(-RB[1],RB[1]),d=XF.dRf(x,z);if(d>20&&d<90)tr(x,z,r()<.85)}
  // ---------------- cars: parking lots, downtown kerbs, residential streets ----------------
  const CC=[0xa83a2e,0x2f5d9a,0x3a3d42,0xd8d8d4,0x6a6f75,0x2f6b4a,0x8a6a3a,0xc9b48a,0x1f2a44,0x7a2a2a,0xb8bcc0,0xe0e0dc,0x111316];
  lots.forEach(P=>{const[x0,z0,x1,z1]=bbx(P),ax=x1-x0<z1-z0,A=Math.abs(sarea(P)),n=Math.min(70,A/60);
   for(let i=0;i<n*3&&n>1;i++){const x=Math.round(fr(x0,x1)/(ax?5.4:2.8))*(ax?5.4:2.8),z=Math.round(fr(z0,z1)/(ax?2.8:5.4))*(ax?2.8:5.4),k=oi(x,z);if(k<0||!insP(P,x,z)||OC[k]&(1|2|4|16)||!inB(x,z,4))continue;if(r()<.45){car(x,z,ax,pick(CC));mark(x-2.6,z-2.6,x+2.6,z+2.6,16)}}});
  CD.rd.forEach(q=>{const[k,w,sw]=q;if(k>1)return;const P=pl(q.slice(5)),dtw=sw==2;for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]);if(l<8)continue;const ux=(b[0]-a[0])/l,uz=(b[1]-a[1])/l,ax=Math.abs(ux)>.97,az=Math.abs(uz)>.97;if(!ax&&!az)continue;
    for(let t=4;t<l-4;t+=dtw?3.2:7){if(r()>(dtw?.42:.07))continue;const s=r()<.5?-1:1,off=dtw?w/2-2.3:w/2-1.2,x=a[0]+ux*t-uz*off*s,z=a[1]+uz*t+ux*off*s,kk=oi(x,z);if(!inB(x,z,4)||kk<0||OC[kk]&16)continue;
     if(dtw)car(x,z,!ax,pick(CC));else car(x,z,ax,pick(CC));mark(x-2.5,z-2.5,x+2.5,z+2.5,16)}
    if(dtw)for(let t=10;t<l;t+=28)[-1,1].forEach(s=>{const x=a[0]+ux*t-uz*(w/2+2.2)*s,z=a[1]+uz*t+ux*(w/2+2.2)*s;if(free(x,z,1))lamp(x,z,H(x,z))})}});
  // ---------------- The Scout (Buffalo Bill on horseback) on its real spot ----------------
  CD.art.forEach(([x,z,nm])=>{if(!/Scout/.test(nm))return;const y=H(x,z),bz=0x5a4a32,vb=(a,b,c,d,y0,y1,col)=>B.push([(a+c)/2,(b+d)/2,c-a,d-b,y1,y0,col,'m',1]);
   B.push([x,z,8,6,y+.5,y-.5,0x9a978e,'s']);B.push([x,z,4.4,2.8,y+3.4,y+.5,0x8a857a,'s']);const s=y+3.4;
   [[-1.2,-.45],[-1.2,.45],[1.1,-.45],[1.1,.45]].forEach(([a,b])=>vb(x+a-.15,z+b-.15,x+a+.15,z+b+.15,s,s+1.5,bz));vb(x-1.6,z-.55,x+1.5,z+.55,s+1.3,s+2.4,bz);vb(x+1.3,z-.3,x+2.1,z+.3,s+2,s+3.2,bz);vb(x+1.9,z-.25,x+2.8,z+.25,s+2.7,s+3.2,bz);
   vb(x-1.9,z-.12,x-1.5,z+.12,s+1.2,s+2.3,bz);vb(x-.4,z-.45,x+.4,z+.45,s+2.4,s+3.6,bz);vb(x-.3,z-.3,x+.3,z+.3,s+3.6,s+4.15,bz);vb(x-.55,z-.55,x+.55,z+.55,s+4.15,s+4.3,bz);vb(x-.25,z-.25,x+.25,z+.25,s+4.3,s+4.5,bz);vb(x+.3,z-.12,x+1.3,z+.12,s+3.2,s+3.45,bz)});
  // ---------------- ranch fence along the town edge ----------------
  {const ex=RB[0]+1,ez=RB[1]+1,post=(x,z)=>{const y=H(x,z);B.push([x,z,.24,.24,y+1.5,y-.3,0x7a5a3a,'w',1])},rail=(x0,z0,x1,z1)=>{const y=(H(x0,z0)+H(x1,z1))/2;for(const h of[.65,1.25])B.push([(x0+x1)/2,(z0+z1)/2,Math.abs(x1-x0)||.08,Math.abs(z1-z0)||.08,y+h+.05,y+h-.05,0x8a6a4a,'w',1])};
   for(let x=-ex;x<ex;x+=10){const x2=Math.min(ex,x+10);post(x,-ez);post(x,ez);rail(x,-ez,x2,-ez);rail(x,ez,x2,ez)}for(let z=-ez;z<ez;z+=10){const z2=Math.min(ez,z+10);post(-ex,z);post(ex,z);rail(-ex,z,-ex,z2);rail(ex,z,ex,z2)}}
  T._nh=BL.length};
 // ================= build everything =================
 const SB=S+4;
if(T.isle||T.snowmap||T.sea||XT==='archi'||XT==='cody'){}else if(S>66){const n=Math.ceil((2*S+12)/22),l=(2*S+12)/n;for(let i=0;i<n;i++){const c=-S-6+l*(i+.5);P(c,-SB,l+.1,2.4,14,T.rk,'r');P(c,SB,l+.1,2.4,14,T.rk,'r');P(-SB,c,2.4,l+.1,14,T.rk,'r');P(SB,c,2.4,l+.1,14,T.rk,'r')}}
 else[[0,-S-4,2*S+12,2.4],[0,S+4,2*S+12,2.4],[-S-4,0,2.4,2*S+12],[S+4,0,2.4,2*S+12]].forEach(q=>P(q[0],q[1],q[2],q[3],T.bh||14,T.rk,T.bt||'r'));
 HP.forEach(buildHouse);BT.forEach(f=>f());
 const put=(n,rad,f)=>{for(let i=0;i<n;i++){const s=spot(rad);if(s)f(s[0],s[1])}};
 const crates=(x,z)=>{const n=1+(r()*3|0);for(let i=0;i<n;i++){const cx=x+fr(-2,2),cz=z+fr(-2,2),s=fr(1.4,2.2);P(cx,cz,s,s,s,pick(T.cc),'x');if(r()<.4)P(cx,cz,s*.8,s*.8,s*1.8,pick(T.cc),'x',s)}};
 const cover=(x,z)=>{const a=fr(4,7),q=r()<.5;P(x,z,q?a:.9,q?.9:a,1.1,0xb9b7b0,'c')};
 const cont=(x,z)=>{const rot=r()<.5,pw=rot?2.7:12,pd=rot?12:2.7;P(x,z,pw,pd,2.7,pick(T.cc),'m');if(r()<.4)P(x,z,pw,pd,5.4,pick(T.cc),'m',2.7)};
 put(T.cont,9,cont);put(T.crates,4,crates);put(T.cov,5,cover);if(L=='dust')put(5,4,(x,z)=>stall(x,z,null,r()<.5));
 if(T.em&&!T.city)put(T.emn||10,2,(x,z)=>P(x,z,.6,.6,T.emh||7,T.em,'e'));
 const dry=(x,z)=>T.wl==null||H(x,z)>T.wl+.7;
 put(T.rocks,T.br?4.4:3.5,(x,z)=>{if(!dry(x,z))return;const big=T.br?fr(1.8,r()<.18?7:4.6):fr(1.6,3.6),c=pick([T.rk,0x9a9890,0x7d7a72,0x8a8f94]);boulder(x,z,big,big*fr(.65,1),c);if(r()<.5)boulder(x+big*.75,z+big*.55,big*.55,big*.5,c)});
 if(T.tree){put(T.trees,1.9,(x,z)=>{if(dry(x,z)&&(!XF.tok||XF.tok(x,z)))tree(x,z)});put(T.bush||0,1.1,(x,z)=>{if(dry(x,z)&&(!XF.tok||XF.tok(x,z)))bush(x,z)})}

 // ---- enterable office building: lobby with doors, several floors joined by a switchback stair core, roof access ----
 const TWR=[];
 const tower=(X0,Z0,X1,Z1,col)=>{TWR.push([X0,Z0,X1,Z1]);const G=fp((X0+X1)/2,(Z0+Z1)/2,X1-X0,Z1-Z0)[1],t=.3,FH=3.6,NF=ri(4,6),Y=k=>G+.3+k*FH,YR=Y(NF),
   pc=pick([0x2f3338,0x3b4048,0x5a5f66]),gc=pick([0x7fa6c0,0x86b0b8,0x8c9fb8]),fl=pick([0x6a7a8a,0x7a6a5a,0x5a6a5a]),sc2=0x8a8d90,mm=col;
  const bx=(x0,z0,x1,z1,y0,y1,c,ty,vis)=>{if(x1-x0<.01||z1-z0<.01||y1-y0<.01)return;B.push([(x0+x1)/2,(z0+z1)/2,x1-x0,z1-z0,y1,y0,c,ty,vis?1:0,mm])};
  const face=(sd,u0,u1,y0,y1,d0,d1,c,ty,vis)=>sd==0?bx(u0,Z0+d0,u1,Z0+d1,y0,y1,c,ty,vis):sd==1?bx(u0,Z1-d1,u1,Z1-d0,y0,y1,c,ty,vis):sd==2?bx(X0+d0,u0,X0+d1,u1,y0,y1,c,ty,vis):bx(X1-d1,u0,X1-d0,u1,y0,y1,c,ty,vis);
  const xa=X1-t-4.9,xe=X1-t,zb=Z1-t,zm=zb-1.3,zf=zb-2.6,dc=(X0+X1)/2,hole=[xa,zf,xe,zb];
  const slab=(y0,y1,c,ty,vis,x0,z0,x1,z1,h)=>{if(!h)return bx(x0,z0,x1,z1,y0,y1,c,ty,vis);bx(x0,z0,h[0],z1,y0,y1,c,ty,vis);bx(h[2],z0,x1,z1,y0,y1,c,ty,vis);bx(h[0],z0,h[2],h[1],y0,y1,c,ty,vis);bx(h[0],h[3],h[2],z1,y0,y1,c,ty,vis)};
  // facade, one storey band per side
  for(let k=0;k<NF;k++){const y=Y(k),b0=k?y-.3:G-.5,b1=Y(k+1)-.3,wb=k?y+.9:y+.15,wt=y+2.8;
   for(let sd=0;sd<4;sd++){const u0=sd<2?X0:Z0+t,u1=sd<2?X1:Z1-t,door=k==0&&sd<2,n=Math.max(2,Math.round((u1-u0)/2.6)),gaps=door?[[dc-.85,dc+.85]]:[];
    face(sd,u0,u1,b0,door?y:wb,0,t,col,'c');face(sd,u0,u1,wt,b1,0,t,col,'c');
    if(door){face(sd,u0,dc-.65,y,wb,0,t,col,'c');face(sd,dc+.65,u1,y,wb,0,t,col,'c');face(sd,dc-.85,dc-.65,y,wt,0,t,pc,'m');face(sd,dc+.65,dc+.85,y,wt,0,t,pc,'m');face(sd,dc-.65,dc+.65,y+2.4,wt,0,t,pc,'m');
     const zz=sd==0?Z0+t/2:Z1-t/2;DR.push({x:dc,z:zz,al:true,y,w:1.2,hx:dc-.6,hz:zz,ax:1,az:0,col:0x2f3a44})}
    for(let i=0;i<=n;i++){const q=u0+(u1-u0)*i/n;if(gaps.some(g=>q>g[0]-.4&&q<g[1]+.4))continue;face(sd,Math.max(u0,q-.2),Math.min(u1,q+.2),wb,wt,0,t,pc,'m')}
    let g0=u0;[...gaps,[u1,u1]].forEach(g=>{if(g[0]-g0>.05)face(sd,g0+.01,g[0]-.01,wb+.01,wt-.01,.12,.18,gc,'G');g0=g[1]})}}
  // parapet, slabs, ceilings, lights
  for(let sd=0;sd<4;sd++){const u0=sd<2?X0:Z0+t,u1=sd<2?X1:Z1-t;face(sd,u0,u1,YR-.3,YR+1.1,0,t,col,'c');face(sd,u0-(sd<2?.06:0),u1+(sd<2?.06:0),YR+1.1,YR+1.22,-.06,t+.02,sc2,'c',1)}
  slab(G-.6,Y(0)-.02,sc2,'c',0,X0+.03,Z0+.03,X1-.03,Z1-.03);slab(Y(0)-.02,Y(0),0xd8d8d4,'i',1,X0+t,Z0+t,X1-t,Z1-t);
  for(let k=1;k<=NF;k++){const y=Y(k);slab(y-.3,k<NF?y-.02:y,k<NF?0xf2f2ee:sc2,k<NF?'C':'c',0,X0+.03,Z0+.03,X1-.03,Z1-.03,hole);if(k<NF)slab(y-.02,y,fl,'q',1,X0+t,Z0+t,X1-t,Z1-t,hole);
   for(let lx=X0+t+2;lx<xa-1;lx+=4)for(let lz=Z0+t+2;lz<Z1-t-1;lz+=4)if(!(lx>xa-1.5&&lz>zf-1))bx(lx-.6,lz-.15,lx+.6,lz+.15,y-.33,y-.3,0xfff6e0,'e',1)}
  // stair core: flight A up along the back wall, landing, flight B back to the open side
  for(let k=0;k<NF;k++){const y=Y(k);
   for(let i=1;i<=5;i++){const top=y+.36*i;bx(xa+(i-1)*.7,zm+.06,xa+i*.7,zb,k?top-.3:y-.05,top,0x8a8d90,'c')}
   bx(xa+3.5,zf,xe,zb,y+1.5,y+1.8,0x8a8d90,'c');
   for(let i=1;i<=5;i++){const top=y+1.8+.36*i;bx(xa+3.5-i*.7,zf,xa+3.5-(i-1)*.7,zm-.06,top-.3,top,0x8a8d90,'c')}
   bx(xa,zm-.06,xa+3.5,zm+.06,y,Y(k+1)-.3,0xd9dcde,'p');bx(xa-.15,zf-.15,xe,zf,y,Y(k+1)-.3,0xd9dcde,'p')}
  // roof stair house + guard rail over the open stairwell
  bx(xa,zm-.06,xa+3.5,zm+.06,YR,YR+3,0xd9dcde,'p');bx(xa-.05,zm+.06,xa+.05,zb,YR,YR+1.05,pc,'m');
  bx(xa-.15,zf-.15,xe,zf,YR,YR+3,col,'c');bx(xe,zf-.15,X1,Z1,YR+1.1,YR+3,col,'c');bx(xa-.15,zb,xe,Z1,YR+1.1,YR+3,col,'c');bx(xa-.15,zf-.15,X1,Z1,YR+3,YR+3.25,sc2,'c');
  // furniture: every floor has a use (lobby, offices, cubicles, meeting rooms, cafeteria, gym, servers, lounge, storage, lab)
  if(!lite){const RS0=RG;RG=rng(((T.seed*17+Math.round(X0*5)*131+Math.round(Z0*3)*7)>>>0)||1);const TH=shuf(['office','cubes','meeting','cafe','gym','server','lounge','storage','lab','cubes','office']),xi0=X0+t,zi0=Z0+t,xi1=X1-t,zi1=Z1-t;
   for(let k=0;k<NF;k++){const y=Y(k),kind=k==0?'lobby':TH[(k-1)%TH.length],ops=[{ax:'x',p:Z0+t/2,c:(X0+X1)/2,w:X1-X0,b:y+1.95,t:y+2.8},{ax:'x',p:Z1-t/2,c:(X0+X1)/2,w:X1-X0,b:y+1.95,t:y+2.8},{ax:'z',p:X0+t/2,c:(Z0+Z1)/2,w:Z1-Z0,b:y+1.95,t:y+2.8},{ax:'z',p:X1-t/2,c:(Z0+Z1)/2,w:Z1-Z0,b:y+1.95,t:y+2.8}];
    const tg=[[xa-.7,(zf+zm)/2],[xa-.7,(zm+zb)/2]],keep=[[xa-1.7,zf-.2,xa,zb]];if(k==0){tg.unshift([dc,zi0+.7]);tg.push([dc,zi1-.7]);keep.push([dc-1,zi0,dc+1,zi0+1.8],[dc-1,zi1-1.8,dc+1,zi1])}
    const FF=mkFloor({put:(x0,z0,x1,z1,y0,y1,c,ty,vis)=>{if(x1-x0<.01||z1-z0<.01||y1-y0<.01)return;FBX.push([(x0+x1)/2,(z0+z1)/2,x1-x0,z1-z0,y1,y0,c,ty,vis?1:0,mm,1])},wall:()=>{},bx:[xi0,zi0,xi1,zi1],y:y,ch:Y(k+1)-.3,keep,tg,blk:[[xa-.15,zf-.15,xi1,zi1]],ops,ex:999,ez:999}),
     rm={role:kind,rects:[{x0:xi0+.1,z0:zi0+.1,x1:xa-.2,z1:zi1-.1,op:{E:1}},{x0:xa-.2,z0:zi0+.1,x1:xi1-.1,z1:zf-.25,op:{W:1}}],nowall:1,light:0};FF.cur=rm;
    const k2=RK(FF,rm,{P:mkPal({st:'office'},'couple'),ps:'couple',h:{st:'office'}}),{W,M,C,Y:Yy}=k2,many=(n,f)=>{for(let i=0;i<n;i++)f()};
    if(kind=='lobby'){const lc=pick([0x3a3f44,0x7a3a3a,0x3a5a7a,0x5a4a3a]);M(FU.rug(pick(FP.rug),5,3.5,'6'));M(FU.recep(3.2,pick([0x6b4a2c,0x2b2b2b,0xe8e4da])));many(3,()=>{const q=W(FU.sofa(lc,2.2));if(q){FF.front(FU.ctable(0x2b2b2b,1.2,.6),q,.45)}});many(4,()=>Yy(FU.armchair(lc)));many(6,()=>C(FU.plant(1)));many(2,()=>W(FU.plant(0)));C(FU.wcooler());many(2,()=>W(FU.bench(1.8,0x3a3f44)));W(FU.dcase(1.6,'gem'));W(FU.console(0x2b2b2b))}
    else if(kind=='office'){const dc=pick([0xc9b48a,0x8a6a4a,0xe8e4da]);aisles(k2,()=>FU.deskset(dc,1.4,pick(['pc','pc','laptop'])),1.3,1,1.6);many(3,()=>W(FU.fcab()));C(FU.copier());many(5,()=>C(FU.plant(1)));C(FU.wcooler());W(FU.sideboard(0x3a3f44))}
    else if(kind=='cubes'){const pc=pick([0x6a7a8a,0x8a8a92,0x7a8a7a,0x9a8a7a]);aisles(k2,()=>FU.cubicle(pc),1.3,1,1.6);many(2,()=>W(FU.fcab()));C(FU.copier());many(4,()=>C(FU.plant(1)));C(FU.wcooler())}
    else if(kind=='meeting'){many(5,()=>Yy(FU.mtable(pick([6,8]),pick([0x6b4423,0x2b2b2b,0xe8e4da]))));many(6,()=>C(FU.plant(1)));many(2,()=>W(FU.sideboard(0x3a3f44)));many(2,()=>W(FU.sofa(0x3a3f44)));C(FU.wcooler())}
    else if(kind=='cafe'){W(FU.counter(3.6,0xe8e4da,0x2b2b2b,{sink:1,stove:1}));W(FU.gfridge(1.4));W(FU.gfridge(1));aisles(k2,()=>FU.cafeset(WHT,pick(FP.br)),1.2,1,1.8);many(4,()=>Yy(FU.dset(4,0xe8e4da)));many(2,()=>C(FU.bin()));many(4,()=>C(FU.plant()))}
    else if(kind=='gym'){many(2,()=>M(FU.gmat()));aisles(k2,()=>pick([FU.tread,FU.ebike])(),1.4,1,1.8);many(3,()=>Yy(FU.wbench()));many(2,()=>W(FU.wrack()));many(3,()=>C(FU.pbag()));C(FU.wcooler())}
    else if(kind=='server'){aisles(k2,()=>FU.srack(),1.3,1,1.6);W(FU.console(2.4));many(2,()=>C(FU.fcab()));W(FU.desk(0x8a8f94,1.4,'pc'))}
    else if(kind=='lounge'){M(FU.pool());M(FU.pingpong());many(3,()=>{const q=W(FU.sofa(pick(FP.fb)));if(q)FF.front(FU.ctable(0x6b4423),q,.45)});many(4,()=>Yy(FU.beanbag(pick(FP.br))));many(3,()=>W(FU.arcade()));many(5,()=>C(FU.plant()));W(FU.barset(2.4,0x3a3f44,0x2b2b2b));W(FU.jukebox())}
    else if(kind=='storage'){aisles(k2,len=>FU.sshelf(Math.min(len,4.4),'box'),1.6,0,1.6);many(12,()=>Yy(FU.cbox()));many(5,()=>Yy(FU.pallet()));Yy(FU.forklift())}
    else{aisles(k2,()=>FU.labb(2.4),1.4,1,1.8);many(3,()=>C(FU.stank()));W(FU.console(2.2));many(2,()=>W(FU.srack()));W(FU.fcab());many(2,()=>C(FU.plant(1)))}
    FF.litter(rm,ri(2,6),['paper','cup','paper'])}RG=RS0}};
 // ---- downtown ----
 if(T.city){const n=6,bl=17,st=5.5,pit=bl+st,o=-(n-1)*pit/2,sc=[];for(let i=0;i<n-1;i++)sc.push(o+pit/2+i*pit);
  sc.forEach(c=>{RD.push([-68,c,68,c,st,'a'],[c,-68,c,68,st,'a'])});
  const ET=new Set();while(ET.size<8)ET.add(ri(0,n-1)*n+ri(0,n-1));
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){const cx=o+i*pit,cz=o+j*pit;if(ET.has(i*n+j)){tower(cx-bl/2+.4,cz-bl/2+.4,cx+bl/2-.4,cz+bl/2-.4,pick([0xc9c4b8,0xb7b9bd,0xa89a86,0xd4cfc4,0x9aa3ad]));continue}const tall=Math.max(0,1-Math.hypot(cx,cz)/95),low=r()<.12,hh=low?fr(9,15):fr(30,60)+tall*24,ins=()=>fr(0,.5),split=!low&&r()<.4,x0=cx-bl/2+ins(),x1=cx+bl/2-ins(),z0=cz-bl/2+ins(),z1=cz+bl/2-ins(),parts=[];
   if(split){const a=fr(6,10),al=3;if(r()<.5)parts.push([x0,z0,x0+a,z1],[x0+a+al,z0,x1,z1]);else parts.push([x0,z0,x1,z0+a],[x0,z0+a+al,x1,z1])}else parts.push([x0,z0,x1,z1]);
   parts.forEach(([a,b,c,e])=>{const w=c-a,dp=e-b,x=(a+c)/2,z=(b+e)/2,h=hh*(split?fr(.7,1.15):1),col=pick(T.wc);P(x,z,w,dp,h,col,'g');P(x,z,w+.6,dp+.6,h+.9,0x4b4f55,'c',h-.1);if(h>44&&r()<.55)P(x,z,w*.62,dp*.62,h+fr(8,18),col,'g',h)})}
  const used=[],ok=(px,pz)=>used.every(u=>Math.hypot(u[0]-px,u[1]-pz)>7);
  for(let q=0;q<30;q++)for(let t2=0;t2<12;t2++){const vert=r()<.5,c=pick(sc),t=fr(-58,58);if(sc.some(u=>Math.abs(t-u)<4.4))continue;const off=(r()<.5?-1:1)*1.35,px=vert?c+off:t,pz=vert?t:c+off;if(!ok(px,pz))continue;used.push([px,pz]);car(px,pz,!vert,pick(T.cc));break}
  sc.forEach(a=>sc.forEach(b=>{if(r()<.55){const x=a+(r()<.5?-1:1)*3.05,z=b+(r()<.5?-1:1)*3.05;if(!B.some(q=>q[7]=='g'&&Math.abs(q[0]-x)<q[2]/2+.25&&Math.abs(q[1]-z)<q[3]/2+.25)&&!TWR.some(q=>x>q[0]-.3&&x<q[2]+.3&&z>q[1]-.3&&z<q[3]+.3))lamp(x,z,H(a,b))}}))}
 // ---- graveyard ----
 if(T.grave){const cols=[0x8a8f94,0x7c8187,0x9aa0a6,0x6d7379,0x7d8579],ink=0x060606,pcol=0x0b0b0b;
  const stone=(x,z)=>{const t=r(),c=pick(cols);
   if(t<.6){const a=r()<.5,w=fr(.8,1.15),h=fr(.95,1.7);P(x,z,a?w:.32,a?.32:w,h,c,'r');if(a&&r()<.6)P(x,z+1.3,.95,1.9,.22,0x3a2e24,'p')}
   else if(t<.78){P(x,z,1.15,1.15,.35,c,'r');P(x,z,.55,.55,fr(2.2,3),c,'r')}else if(t<.94){const h=fr(1.5,2);P(x,z,.3,.3,h,c,'r');P(x,z,1.05,.3,h-.35,c,'r',h-.75)}else{P(x,z,1.3,.9,.9,c,'r');P(x,z,.7,.5,1.6,c,'r')}};
  const fence=(x1,z1,x2,z2,gs)=>{const hz=z1===z2,len=Math.abs(hz?x2-x1:z2-z1),dir=Math.sign(hz?x2-x1:z2-z1),gw=3.8;let segs=[[0,len]];
   gs.forEach(gc=>{const a=gc*len-gw/2,b=gc*len+gw/2;segs=segs.flatMap(([u,v])=>b<=u||a>=v?[[u,v]]:[[u,Math.min(v,a)],[Math.max(u,b),v]].filter(q=>q[1]-q[0]>.05))});
   const at=t=>hz?[x1+dir*t,z1]:[x1,z1+dir*t];
   segs.forEach(([u,v])=>{const n=Math.max(1,Math.ceil((v-u)/4)),l=(v-u)/n;for(let i=0;i<n;i++){const[cx,cz]=at(u+l*(i+.5));P(cx,cz,hz?l+.05:.36,hz?.36:l+.05,3.3,ink,'p')}
    for(let i=0;i<=n;i++){const[px,pz]=at(u+l*i);P(px,pz,.75,.75,4.1,pcol,'p');D.push(['f',px,fp(px,pz,.75,.75)[1]+4.1,pz,1])}})};
  PL.forEach(([x,z,w,d])=>{const a=x-w/2,b=x+w/2,c=z-d/2,e=z+d/2,gt=()=>[fr(.3,.7)];fence(a,c,b,c,gt());fence(a,e,b,e,r()<.6?gt():[]);fence(a,c,a,e,r()<.5?gt():[]);fence(b,c,b,e,r()<.6?gt():[]);
   for(let gz=c+3;gz<e-2.5;gz+=3.4)for(let gx=a+3;gx<b-2.5;gx+=2.7){if(Math.abs(gx-x)<1.5||Math.abs(gz-z)<1.7||r()<.12)continue;stone(gx+fr(-.25,.25),gz+fr(-.25,.25))}});
  put(T.graves,1.7,stone);put(T.dead,2.6,(x,z)=>{const[lo,hi]=fp(x,z,.9,.9),h=fr(7.5,10);B.push([x,z,.9,.9,hi+h,lo-.6,0x2a2119,'w']);D.push(['d',x,hi+h,z,fr(.8,1.2)])})}
 // ---- solid roofs: invisible stepped colliders that follow every pitched roof and pyramid roof, so nobody can get inside one ----
 D.forEach(d=>{if(d[0]==='roof'){const[,x,z,Rr,Lr,Sp,Hr,ax,,,,,Lw,Dw]=d,dr=Hr*(Sp-Dw)/Sp,base=Rr-dr,n=d[14]?6:Math.max(2,Math.ceil(Sp/.5)),w=Sp/n;
   for(let i=0;i<n;i++){const u0=-Sp/2+i*w,u1=u0+w,uc=(u0+u1)/2,top=base+Hr*(1-Math.abs(uc)/(Sp/2))-.06,inside=Math.abs(uc)<Dw/2,bot=inside?Rr-.3:top-.35;
    if(ax==='x')B.push([x,z+uc,Lr,w,top,bot,0,'n']);else B.push([x+uc,z,w,Lr,top,bot,0,'n'])}}
  else if(d[0]==='pyr'&&d[4]>=3){const[,x,y,z,w,hh]=d,n=4;for(let i=0;i<n;i++){const sz=w*(1-(i+.5)/n);B.push([x,z,sz,sz,y+hh*(i+1)/n-.05,y+hh*i/n,0,'n'])}}});
 // ---- spawns & vending machines ----
 const flat=(x,z)=>{const h=H(x,z);return(T.wl==null||(h>T.wl+1.2&&(!T.isle||krivD(x,z)>7)))&&Math.abs(H(x+2,z)-h)+Math.abs(H(x,z+2)-h)<.7};
 const inHouse=(x,z)=>HP.some(h=>{const q=wrect(h,[-h.W/2-.6,-h.D/2-.6,h.W/2+(h.gar?6.5:0)+.6,h.D/2+.6]);return x>q[0]&&x<q[2]&&z>q[1]&&z<q[3]}),OGc=8,OGm=new Map(),OGk=(i,j)=>i*8192+j,OGb=()=>{if(OGm.size)return;for(const b of B){const i0=Math.floor((b[0]-b[2]/2-4)/OGc),i1=Math.floor((b[0]+b[2]/2+4)/OGc),j0=Math.floor((b[1]-b[3]/2-4)/OGc),j1=Math.floor((b[1]+b[3]/2+4)/OGc);for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){const k=OGk(i+4096,j+4096);let L=OGm.get(k);if(!L)OGm.set(k,L=[]);L.push(b)}}},
  open=(x,z,m)=>{if(inHouse(x,z))return false;const y=H(x,z)-.3,f=b=>Math.abs(b[0]-x)<b[2]/2+m&&Math.abs(b[1]-z)<b[3]/2+m&&b[4]>y;if(m<=4){OGb();const L=OGm.get(OGk(Math.floor(x/OGc)+4096,Math.floor(z/OGc)+4096));if(L&&L.some(f))return false;if(B.length>OGn&&B.slice(OGn).some(f))return false}else if(B.some(f))return false;return!DR.some(d=>Math.hypot(d.x-x,d.z-z)<m+1)};let OGn=0;
 const free=(x,z,m)=>clearAt(x,z,-99,m*.6)&&open(x,z,m);
 // spawn points: out in the open (streets are fine), never inside or touching anything; spread out, with a big pool so you don't keep landing in the same place
 OGn=B.length;const sp=[],NS=T.br?(T.nsp||28):28,SR=(T.rb||S)-6,SRX=(T.rbx||T.rb||S)-6;let SS=T.br?(T.sps||30):16;
 for(let pass=0;pass<6&&sp.length<NS;pass++,SS*=.75)for(let i=0;i<(S>66?3000:1500)&&sp.length<NS;i++){const x=fr(-SRX,SRX),z=fr(-SR,SR);if(flat(x,z)&&open(x,z,1.6)&&sp.every(s=>Math.hypot(s[0]-x,s[1]-z)>SS))sp.push([x,z])}
 for(let x=-SR;x<=SR&&sp.length<6;x+=2)for(let z=-SR;z<=SR&&sp.length<6;z+=2)if(open(x,z,1.6)&&sp.every(s=>Math.hypot(s[0]-x,s[1]-z)>8))sp.push([x,z]);
 const v=[],VR=(T.rb||S)-16,VRX=(T.rbx||T.rb||S)-16,VM=T.vm||3,VD=T.vd||25,VCOL={heal:0x2f8f5b,cloak:0x5a3fa0,speed:0xd9822b,shield:0x2f6fb0},VST=[];
 for(let n=0;n<(T.nv||1);n++)for(let i=0;i<900;i++){const x=fr(-VRX,VRX),z=fr(-VR,VR),f=Math.abs(x)>Math.abs(z)?(x>0?3:1):(z>0?2:0),P4=[0,1,2,3].map(k=>{const o=(k-1.5)*1.95;return f%2?[x,z+o]:[x+o,z]});
  if(VST.every(q=>Math.hypot(q[0]-x,q[1]-z)>VD)&&P4.every(([a,b])=>flat(a,b)&&(T.city?open(a,b,VM)&&sp.every(q=>Math.hypot(q[0]-a,q[1]-b)>6):free(a,b,VM))&&sp.every(q=>Math.hypot(q[0]-a,q[1]-b)>4))){
   VST.push([x,z]);const y=Math.max(...P4.map(([a,b])=>H(a,b)));['heal','cloak','speed','shield'].forEach((ty,k)=>{const[a,b]=P4[k];v.push([a,b,f,ty,y,n,x,z]);B.push([a,b,f%2?1.1:1.8,f%2?1.8:1.1,y+2.4,y-.6,VCOL[ty],'m'])});break}}
 for(const b of FBX)B.push(b);
 return Object.assign({},T,XF.out||{},{hx:hb,B,D,H,v,sp,DR,RD,HP,tcol:T.isle?ktcol:T.snowmap?stcol:xCol?xCol:XT==='archi'?ktcol:null})}
// ---------- 10 extra Battle Royale maps ----------
const XB={br:1,hills:0,h:[0,0],ro:0,plat:0,ph:[0,0],rooms:0,pl:0,crates:0,cont:0,pil:0,cov:0,vd:34,nsp:30,sps:30,sun:0xfff4dc,si:1.45,amb:.85,ex:1.1,wc:[0xe8d9b5],wt:'w',cc:[0xb5793f,0xd19a52,0x8e5a2e]};
const XM=(o)=>{const s=o.sz;return Object.assign({},XB,{ext:s+42,nv:Math.round(s/24),stS:Math.max(1,s*1.42/190),tc:[-s*1.15,s*.95,s*1.6],tl:[0,-5,10]},o)};
THEMES.push(
 XM({n:'Canyon Mesa',t:'Battle Royale: red-rock mesas, a western main street with a saloon, a railway with a parked train, a canyon trestle bridge and cacti',town:'mesa',terr:'mesa',seed:501,sz:140,sky:[0x4f8fd6,0xf3d9b0],gr:[0xd9a066,0xc2814e,0x9a5a36],rk:0xb0673e,lc:0x7a8a3a,bc:0x8a8a4a,tree:'l',trees:0,rocks:45,bush:70,fog:210,sun:0xfff0d0,si:1.5,amb:.8,ex:1.05}),
 XM({n:'Port Harbor',t:'Battle Royale: a container port with giant cranes and a cargo ship you can board, warehouses, a fishing pier and a seaside suburb',town:'harbor',terr:'harbor',seed:513,sz:150,wl:0,sky:[0x5a8fc8,0xd8e6f0],gr:[0x86a05a,0x6f8a4e,0x777777],rk:0x8a8d90,lc:0x3f8a3a,tree:'l',trees:140,rocks:18,bush:60,fog:200}),
 XM({n:'Autumn Hollow',t:'Battle Royale: rolling autumn hills, a village, a red barn farm with silos and a pumpkin patch, a corn maze and a windmill',town:'autumn',seed:527,sz:160,hills:22,h:[3,8],ro:.4,sky:[0x6a9ccc,0xf0dcc0],gr:[0xa8a050,0x8a8040,0x7a6a52],rk:0x8a7a6a,lc:0xd2691e,lcs:[0xd2691e,0xc0392b,0xe6a23c,0xb5651d,0x9a3a1a,0xe8b84a],pc:0x3a5a3a,bc:0xa0522d,tree:'m',trees:440,rocks:40,bush:150,fog:190,sun:0xffe2b8}),
 XM({n:'Sakura Gardens',t:'Battle Royale: cherry blossoms, a five-storey pagoda, torii gates, a koi pond with a bridge, bamboo groves, a zen garden and wooden houses',town:'sakura',terr:'sakura',seed:541,sz:135,wl:0,sky:[0x7fb0e6,0xf6e4ee],gr:[0x86c45e,0x6aa64c,0x8a8a80],rk:0x8a8a80,lc:0xf4a7c4,lcs:[0xf4a7c4,0xf7c3d6,0xe98ab0,0xfbd3e2,0xf2b8d0],pc:0x2f6a4a,bc:0x4f8a3a,tree:'l',trees:230,rocks:20,bush:90,fog:190}),
 XM({n:'Temple Ruins',t:'Battle Royale: a jungle with a giant stepped pyramid you can climb, ruined temples, a column avenue, obelisks and a river with rope bridges',town:'ruins',terr:'ruins',seed:557,sz:175,wl:0,sky:[0x5f9ad0,0xd4e6d0],gr:[0x5f9a3a,0x3f7a2a,0x6a6a5a],rk:0x7a7a6a,lc:0x2f7a2f,bc:0x3a7a2a,tree:'l',trees:620,rocks:50,bush:260,fog:170,amb:.8}),
 XM({n:'Lunar Outpost',t:'Battle Royale: low gravity on the moon - cratered ground, a domed base joined by corridors, a rocket on its launch pad, rovers and solar fields',town:'lunar',terr:'lunar',seed:569,sz:165,night:1,grav:6.5,noclouds:1,earth:1,sky:[0x020308,0x0a0d14],gr:[0xa8a8a8,0x8a8a8a,0x5a5a5a],rk:0x9a9a96,tree:0,trees:0,rocks:130,bush:0,fog:300,sun:0xf2f4ff,si:1.7,amb:.55,ex:1.1}),
 XM({n:'Bayou Swamp',t:'Battle Royale: murky channels, stilt houses along long boardwalks, a paddle riverboat, a swamp chapel, cypress and dead trees',town:'bayou',terr:'bayou',seed:583,sz:150,wl:0,sky:[0x6f8a7a,0xb8c4a8],gr:[0x6a7a3a,0x4f5f2f,0x5a5040],rk:0x6a6a5a,lc:0x3f5a2a,lcs:[0x3f5a2a,0x4a5f3a,0x6a7a5a,0x354a24],bc:0x4a5a2a,tree:'l',trees:360,rocks:15,bush:160,fog:120,amb:.75,ex:1.0}),
 XM({n:'Highland Castle',t:'Battle Royale: a walled castle on a big hill with towers and a keep, a timbered village, stone bridges over the river, a jousting field and a windmill',town:'castle',terr:'castle',seed:597,sz:190,wl:0,sky:[0x5f93cf,0xdce8f2],gr:[0x7fb84f,0x5a9a3a,0x7a7a72],rk:0x8a8a82,lc:0x3f8a3a,pc:0x2a5a3a,tree:'m',trees:620,rocks:55,bush:180,fog:220}),
 XM({n:'Funfair Park',t:'Battle Royale: a carnival - a midway of game booths with prizes, a circus big top, a roller coaster you can walk along, a ferris wheel, carousel, wave swinger, teacups, a pirate ship, a helter-skelter, bumper cars, a haunted house, a drop tower and a food court',town:'park',terr:'flat',seed:611,sz:155,sky:[0x4f9ae8,0xd6ecff],gr:[0x7fc24f,0x62a83e,0x8a7c62],rk:0x8a8a80,lc:0x3f9a3a,tree:'l',trees:60,rocks:6,bush:70,fog:220}),
 XM({n:'Cody, Wyoming',t:'Squads: 4 v 4 with 10 drivable cars in the real Cody, Wyoming, built from OpenStreetMap - every street, all 5,700 buildings at their true size and place, Sheridan Avenue and the Irma Hotel, the courthouse, schools, parks, Beck Lake and the Shoshone River canyon, fenced at the edge of town. The houses are locked.',town:'cody',terr:'cody',osm:1,seed:641,sz:3018,ext:3100,extZ:2030,gs:8,skirt:4300,chunk:220,rb:1915,rbx:2992,rbz:1915,mapE:3100,far:1000,fog:840,fogN:320,wl:-31,wsz:12000,stS:19,stT:4.4,busY:330,busV:45,nv:28,vd:110,sps:110,nsp:64,mmR:170,mcR:330,mcC:[-1400,-330],bgcs:6,tree:'m',trees:0,rocks:0,bush:0,sky:[0x4f8fd6,0xdfe8f0],gr:[0x9aa06a,0x8f9a62,0x8a8478],rk:0x9a8f80,lc:0x587f3a,pc:0x2f5a3a,bc:0x5a7a3a,sun:0xfff2dc,si:1.5,amb:.86,ex:1.08,tc:[-2950,520,-1250],tl:[-1350,0,-250]}),
 XM({n:'Seven Isles',t:'Battle Royale: an archipelago of seven islands - a fortified main island joined by long wooden bridges, a fishing village, a shipyard, a stone tower, camps and a shipwreck, all inside a buoy line',town:'archi',terr:'archi',seed:623,sz:215,ext:265,wl:0,bnd:236,mapE:248,stS:1.3,sky:[0x2f9ae8,0xd2efff],gr:[0x7fcf54,0x4f9e3c,0x8f8a7a],rk:0xd9cfb8,lc:0x3f9a3a,tree:'l',trees:120,rocks:30,bush:80,fog:260,nv:9}));
// ---------- 5 arena maps for free-for-all and 5 big Battle Royale maps ----------
const XF2=(o)=>{const s=o.sz;return Object.assign({hills:0,h:[0,0],ro:0,crates:2,cont:0,cov:1,rocks:6,trees:0,bush:0,sun:0xfff4dc,si:1.45,amb:.85,ex:1.1,wc:[0xe8d9b5],wt:'w',cc:[0xb5793f,0xd19a52,0x8e5a2e],tc:[-s*1.1,s*.95,s*1.6],tl:[0,-3,6],mcR:s*.85},o)};
THEMES.push(
 XF2({n:'Neon Alley',t:'Arena: a city block at night - neon signs on every shop, arcades and offices, rooftop fire escapes, an alley and a glowing plaza',town:'neon',terr:'city2',seed:811,sz:56,night:1,sky:[0x0a0718,0x2a1640],gr:[0x3a3c42,0x45474c,0x2a2c30],rk:0x3a3d44,bt:'c',fog:120,sun:0xb8c4ff,si:1.25,amb:1.05,ex:1.65,em:0x2affe0,emn:8,emh:4.5,crates:3,cov:2,rocks:0,cc:[0x2f3238,0x3a3d44,0x46423c]}),
 XF2({n:'Rust Refinery',t:'Arena: an oil refinery - climb the storage tanks and cross the catwalk, duck under pipe racks, a flare stack burning overhead',town:'refin',terr:'ind',seed:823,sz:60,sky:[0x6a8ab8,0xf0c898],gr:[0x8a857a,0x77736a,0x5a5650],rk:0x7a6a5a,fog:150,sun:0xffe0b8,si:1.4,amb:.8,ex:1.05,cont:5,crates:5,cov:3,rocks:4,cc:[0xa83a2e,0x2f5d9a,0xd98a2b,0x6a6f76]}),
 XF2({n:'Lakeside Camp',t:'Arena: a summer camp in the pines - cabins round a campfire, a mess hall, a dock with canoes on the lake, an archery range and a lookout tower',town:'camp',terr:'camp',seed:837,sz:58,wl:0,sky:[0x4f95e0,0xd6ecff],gr:[0x5f9a3a,0x4a8a32,0x7a7a72],rk:0x8a8a80,lc:0x2c6b4a,pc:0x24603f,bc:0x3f7a3a,tree:'p',trees:85,bush:60,rocks:14,fog:150}),
 XF2({n:'Colosseum',t:'Arena: a Roman amphitheatre - fight on the sand round the spina, climb the seating tiers, run the tunnels, or flank through the forum outside',town:'arena',terr:'arena',seed:851,sz:62,sky:[0x4f95e0,0xf2e4c8],gr:[0xc8bea8,0xb0a890,0x9a9080],rk:0xc8bca0,bt:'2',fog:170,sun:0xfff0d8,si:1.55,tree:'p',trees:16,lc:0x3f7a3a,pc:0x2a5a3a,rocks:0,crates:0,cov:0}),
 XF2({n:'Rail Yard',t:'Arena: a freight yard - walk through boxcars, hide behind tank cars, cross the footbridge over five tracks, a station platform and an engine shed',town:'rail',terr:'ind',seed:863,sz:60,sky:[0x5a8ac0,0xdde6ee],gr:[0x8a857a,0x77736a,0x5a5650],rk:0x6a655c,fog:160,cont:3,crates:4,cov:2,rocks:3,tree:'l',trees:10,lc:0x4f8a3a}));
THEMES.push(
 XM({n:'Volcano Isle',t:'Battle Royale: a volcanic island - climb to the lava crater, cross the glowing lava channels, a fishing village, a beach hotel, a research station with domes, a plantation and black-sand beaches inside a buoy line',town:'volc',terr:'volc',seed:661,sz:225,ext:275,wl:0,bnd:244,mapE:256,stS:1.36,sea:1,sky:[0x6a86b0,0xe8ccb4],gr:[0x4f9a3a,0x2f7a2f,0x3a3634],rk:0x3a3634,lc:0x3f9a3a,bc:0x3a7a2a,tree:'l',trees:170,rocks:40,bush:140,fog:260,nv:9}),
 XM({n:'Dune Sea',t:'Battle Royale: rolling sand dunes - a domed oasis town with a bazaar and palms, a desert fort, an oil field with derricks, a crashed airliner and buried ruins',town:'dune',terr:'dune',seed:673,sz:230,wl:0,sky:[0x5a9ae0,0xf2dcb0],gr:[0xe2c088,0xd2a868,0xc08a52],rk:0xc8935c,lc:0x5a8a3a,bc:0x8a8a4a,tree:'l',trees:0,rocks:24,bush:50,fog:240,sun:0xfff0d0,si:1.6,amb:.82,ex:1.06}),
 XM({n:'Redwood Valley',t:'Battle Royale: a river valley under giant redwoods - a logging town, a sawmill, covered and rope bridges, fire lookout towers, a ranger station and a campground',town:'redwood',terr:'redwood',seed:683,sz:220,wl:0,sky:[0x5f8fc8,0xd8e4e8],gr:[0x3f6a2a,0x5a7a32,0x6a6a62],rk:0x6a6a62,lc:0x2f6a3a,pc:0x24503a,bc:0x3a6a2a,tree:'p',trees:420,rocks:50,bush:220,fog:180,amb:.8}),
 XM({n:'Fort Ironclad',t:'Battle Royale: a military base - a runway with hangars, a control tower, barracks and HQ inside a fence with watchtowers, bunkers, tanks, a helipad, a radar dome and a small town outside the gate',town:'mil',terr:'mil',seed:691,sz:228,sky:[0x6a90c0,0xdfe6ea],gr:[0x8a9a5a,0x9a8a5a,0x7a7466],rk:0x8a8478,lc:0x5a7a3a,pc:0x2f5a3a,tree:'m',trees:220,rocks:30,bush:110,fog:250}),
 XM({n:'Savanna Safari',t:'Battle Royale: golden plains and acacia trees - a safari lodge, a village of round huts, a watering hole with an observation tower, granite kopjes, a dry riverbed, a giant baobab and wild animals',town:'sav',terr:'sav',seed:701,sz:240,wl:0,sky:[0x4f95e0,0xf4e4c0],gr:[0xd2b868,0xb89a4a,0x9a8a7a],rk:0x9a9284,lc:0x6a8a3a,bc:0x8a8a3a,tree:'l',trees:0,rocks:24,bush:90,fog:270,sun:0xfff0d0,si:1.6,amb:.85}));
THEMES.push(
 XM({n:'Pine Lake',t:'Squads: 4 v 4 with 5 drivable cars - a lake town in the pine hills: Lakeview main street and side streets, a cabin village on the north shore with a dock, an island lookout, a farm with silos, Millbrook village, a crossroads diner and gas station, three bridges over the river and a campground. Every house is open',town:'pine',terr:'pine',sq:1,seed:911,sz:440,wl:0,rb:436,stT:2.2,busV:26,fog:300,far:520,sky:[0x5f93cf,0xd8e6ee],gr:[0x4f8a3a,0x3f7a32,0x7a756a],rk:0x7a7466,lc:0x2f6a3a,pc:0x24503a,bc:0x3a6a2a,tree:'p',trees:650,rocks:40,bush:240,nv:16,nsp:40,sps:40}),
 XM({n:'Sunset Bay',t:'Squads: 4 v 4 with 5 drivable cars - a seaside city: downtown blocks of shops and offices, hillside homes, beach houses with lifeguard towers, a trailer park, the harbor with warehouses and a long pier, a lighthouse on the headland and a quarry in the hills. Every house is open',town:'bay',terr:'bay',sq:1,seed:927,sz:440,wl:0,rb:436,stT:2.2,busV:26,fog:300,far:520,sky:[0x4f95e0,0xf6dcc0],gr:[0x7fbf4d,0x62a83e,0x8a7c62],rk:0x9a8e7a,lc:0x4fa03c,pc:0x24603f,tree:'m',trees:380,rocks:40,bush:160,nv:16,nsp:40,sps:40}));
const GRS={Dustyard:[1800,0xc9b46a,0],Bazaar:[7000,0x6fb044,.05],Graveyard:[4000,0x46623d,0],Yardline:[800,0x7f8c55,0],'Royale Isle':[15000,0x6fb044,.04],'Pleasant Park':[11000,0x74b448,.05],'Coral Key':[16000,0x72c44c,.06],'Pine Lake':[12000,0x4f8a3a,.02],'Sunset Bay':[10000,0x7fbf4d,.05],'Snowdrift Valley':[0,0,0],'Canyon Mesa':[900,0xb8a060,0],'Port Harbor':[6000,0x7a9a50,.03],'Autumn Hollow':[9000,0xa59a50,.04],'Sakura Gardens':[8000,0x7ac050,.06],'Temple Ruins':[9000,0x4f8a30,.02],'Lunar Outpost':[0,0,0],'Bayou Swamp':[7000,0x5a6a2a,0],'Highland Castle':[12000,0x6aaa44,.05],'Funfair Park':[9000,0x74b448,.05],'Seven Isles':[9000,0x72c44c,.05],'Neon Alley':[0,0,0],'Rust Refinery':[400,0x8a8a50,0],'Lakeside Camp':[6000,0x5f9a3a,.05],'Colosseum':[1600,0x9aa060,.02],'Rail Yard':[900,0x8a8a50,0],'Volcano Isle':[9000,0x4f9a3a,.04],'Dune Sea':[300,0xb8a050,0],'Redwood Valley':[9000,0x4a7a32,.03],'Fort Ironclad':[9000,0x8a9a50,.02],'Savanna Safari':[15000,0xd8c070,.01]};
THEMES.forEach(T=>{const q=GRS[T.n]||[0];T.grass=q[0];T.gcol=q[1];T.flw=q[2]});
const TOWN={Dustyard:['dust','Adobe town: dusty streets, market stalls and flat rooftops'],Bazaar:['bazaar','Villa streets around a fountain plaza and market'],Graveyard:['grave','Moonlit cemetery with a stone church, crypts and iron fences'],
 Yardline:['yard','Shipping yard: warehouses, offices and container stacks'],Frostpeak:['frost','Snowy pine forest with log cabins around a big lodge'],Downtown:['city','Skyscraper canyons and tight city streets'],
 'Royale Isle':['royale','Battle Royale: four villages, a warehouse yard and wild forest'],'Snowdrift Valley':['snow','Battle Royale: a snowy valley ringed by mountains - a giant igloo with four tunnels in the middle, a pine village, a ski lodge with a chairlift, a frozen lake with ice-fishing huts, a research station and a ranger hamlet'],'Coral Key':['isle','Battle Royale: a huge tropical island - harbour town, beach resort with a pool, cliff fort, jungle river with rope bridges, airstrip, sugar mill and a swimmable sea fenced by a floating buoy line'],'Pleasant Park':['pp','Battle Royale: suburban streets, a park with a gazebo, a soccer field and a gas station']};
THEMES.forEach(T=>{const q=TOWN[T.n];if(q){T.town=q[0];T.t=q[1]}if(T.n=='Pleasant Park'){T.trees=160;T.rocks=26}if(T.n=='Royale Isle'){T.trees=560}if(T.n=='Bazaar'){T.trees=90;T.rocks=10}if(T.n=='Frostpeak'){T.trees=240}if(T.n=='Dustyard'){T.rocks=10}});
const MAPS=THEMES.map(T=>Object.assign({},T,{lazy:1}));
function ensureMap(i){const M=MAPS[i];if(M.lazy){Object.assign(M,genMap(THEMES[i]));delete M.lazy}if(M.br&&!M.osm&&!M.sq&&M.v&&M.v.length){const VS=new Set(M.v.map(v=>v[0]+','+v[1]));M.B=M.B.filter(b=>!(b[7]==='m'&&VS.has(b[0]+','+b[1])));M.v=[]}return M}
// ---------- world builder ----------
const EM=c=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.8});
// ---------- Cody, Wyoming: textures, buildings, streets, signs and ground painted from the OpenStreetMap data ----------
const CTX={};
function cTex(k){if(CTX[k])return CTX[k];const S=256,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),R=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x*S,y*S,w*S,h*S)};
 let sd=k.length*977+k.charCodeAt(0)*31;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
 const noise=(n,a)=>{for(let i=0;i<n;i++){const v=rnd()<.5?0:255;g.fillStyle='rgba('+v+','+v+','+v+','+a+')';g.fillRect(rnd()*S,rnd()*S,1+rnd()*2,1+rnd()*2)}};
 const win=(x0,x1,y0,y1,sash)=>{R(x0-.025,y0-.03,x1-x0+.05,y1-y0+.06,'#fbfbf8');const gr=g.createLinearGradient(0,y0*S,0,y1*S);gr.addColorStop(0,'#4a5d6c');gr.addColorStop(1,'#1f2a33');g.fillStyle=gr;g.fillRect(x0*S,y0*S,(x1-x0)*S,(y1-y0)*S);
  g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.moveTo(x0*S,y1*S);g.lineTo((x0+(x1-x0)*.45)*S,y0*S);g.lineTo((x0+(x1-x0)*.65)*S,y0*S);g.lineTo((x0+(x1-x0)*.2)*S,y1*S);g.fill();
  if(sash!==0){R((x0+x1)/2-.008,y0,.016,y1-y0,'#f4f4f0');if(sash===2)R(x0,(y0+y1)/2-.008,x1-x0,.016,'#f4f4f0')}R(x0-.035,y1,x1-x0+.07,.035,'#ececE6')};
 if(k==='house'){R(0,0,1,1,'#f3f3f1');for(let y=0;y<1;y+=1/13){R(0,y,1,.012,'#cfcfcb');R(0,y+.012,1,.01,'#e2e2de')}noise(500,.05);win(.36,.64,.3,.74,2);R(.31,.3,.04,.44,'#d8d8d4');R(.65,.3,.04,.44,'#d8d8d4')}
 else if(k==='brick'||k==='school'||k==='upper'){R(0,0,1,1,'#ececea');for(let r=0,y=0;y<1;y+=1/26,r++)for(let x=(r%2)*.04;x<1.04;x+=.08){const v=210+rnd()*40|0;g.fillStyle='rgb('+v+','+(v-4)+','+(v-8)+')';g.fillRect((x-.04)*S+1,y*S+1,.08*S-2,S/26-2)}
  if(k==='brick')win(.37,.63,.28,.74,2);else if(k==='upper'){win(.14,.4,.22,.76,2);win(.6,.86,.22,.76,2);R(0,.94,1,.06,'#d0d0cc')}else{win(.05,.95,.32,.72,0);for(let x=.05;x<.96;x+=.15)R(x-.008,.32,.016,.4,'#e8e8e4')}}
 else if(k==='stucco'||k==='hotel'||k==='strip'||k==='plain'||k==='stone'){R(0,0,1,1,'#efeeea');noise(1400,.06);
  if(k==='stone'){for(let y=0;y<1;y+=1/9)R(0,y,1,.008,'#d2d0c8');for(let r=0,y=0;y<1;y+=1/9,r++)for(let x=(r%2)*.11;x<1;x+=.22)R(x,y,.008,1/9,'#d2d0c8');win(.38,.62,.18,.78,2)}
  else if(k==='stucco')win(.37,.63,.3,.74,2);else if(k==='hotel'){R(.12,.18,.2,.82,'#7a3a2a');R(.13,.19,.18,.8,'#8a4a36');R(.29,.55,.025,.03,'#d8b04a');win(.5,.86,.3,.68,1)}
  else if(k==='strip'){R(0,0,1,.16,'#d8d6d0');R(0,.12,1,.05,'#9a9890');win(.04,.96,.24,.92,0);for(let x=.04;x<.97;x+=.23)R(x-.01,.24,.02,.68,'#e6e6e2');R(.4,.24,.2,.76,'#26303a')}}
 else if(k==='store'){R(0,0,1,1,'#e8e6e0');noise(600,.05);R(0,0,1,.2,'#d6d2c8');R(0,.18,1,.03,'#5a5650');win(.06,.66,.26,.88,0);R(.06,.84,.6,.04,'#5a5650');R(.72,.24,.2,.76,'#3a2c22');R(.74,.27,.16,.4,'#2a3640');R(.88,.6,.02,.04,'#d8b04a')}
 else if(k==='big'){R(0,0,1,1,'#e6e4de');for(let x=0;x<1;x+=.125)R(x,0,.008,1,'#cfcdc6');R(0,.08,1,.05,'#bdbab2');noise(800,.05)}
 else if(k==='office'){R(0,0,1,1,'#ecebe6');noise(600,.05);win(.02,.98,.3,.74,0);for(let x=.02;x<.99;x+=.16)R(x-.008,.3,.016,.44,'#dcdcd6')}
 else if(k==='metal'||k==='trailer'||k==='canopy'){R(0,0,1,1,'#e8e8e6');if(k==='canopy'){R(0,0,1,.5,'#ffffff')}else if(k==='metal')for(let x=0;x<1;x+=1/24){R(x,0,.012,1,'#c6c6c2');R(x+.012,0,.01,1,'#f6f6f4')}else{for(let y=0;y<1;y+=1/16)R(0,y,1,.01,'#cfcfcb');win(.4,.6,.38,.66,1)}}
 else if(k==='log'){R(0,0,1,1,'#d8d0c4');for(let y=0;y<1;y+=1/9){const gr=g.createLinearGradient(0,y*S,0,(y+1/9)*S);gr.addColorStop(0,'#bfb4a4');gr.addColorStop(.5,'#ece4d6');gr.addColorStop(1,'#a89c8a');g.fillStyle=gr;g.fillRect(0,y*S,S,S/9)}win(.4,.6,.32,.7,2)}
 else if(k==='shed'){R(0,0,1,1,'#ecebe8');for(let x=0;x<1;x+=1/10)R(x,0,.014,1,'#c9c8c2');noise(500,.05)}
 else if(k==='shingle'){R(0,0,1,1,'#bdbdbb');for(let r=0,y=0;y<1;y+=1/12,r++){R(0,y,1,.012,'#8f8f8d');for(let x=(r%2)*.0625;x<1;x+=.125)R(x,y,.008,1/12,'#9a9a98')}noise(2500,.12)}
 else if(k==='mroof'){R(0,0,1,1,'#e2e2e0');for(let x=0;x<1;x+=1/8){R(x,0,.014,1,'#b8b8b4');R(x+.014,0,.01,1,'#ffffff')}}
 else if(k==='flat'){R(0,0,1,1,'#b4b3ae');noise(5000,.14)}
 else if(k==='fnd'){R(0,0,1,1,'#c8c6c0');noise(2500,.1)}
 else if(k==='asph'){R(0,0,1,1,'#7a7b7e');noise(7000,.13)}
 else if(k==='dtl'){R(0,0,1,1,'#808080');for(let i=0;i<9000;i++){const v=90+rnd()*80|0;g.fillStyle='rgba('+v+','+v+','+v+',.55)';g.fillRect(rnd()*S,rnd()*S,1+rnd()*3,1+rnd()*3)}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return CTX[k]=t}
const CTW={house:4.2,brick:4.2,stucco:4.2,hotel:4.2,strip:6,store:6,upper:6,big:8,office:5,school:6,stone:4.6,metal:6,trailer:4,canopy:6,log:4.2,shed:3.5,plain:4};
const CMM={};function cMat(k,ds){const key=k+(ds?'2':'');if(CMM[key])return CMM[key];const m=new THREE.MeshStandardMaterial({map:cTex(k),vertexColors:true,roughness:k==='mroof'||k==='metal'?.6:.92,metalness:k==='mroof'||k==='metal'?.25:0,side:ds?THREE.DoubleSide:THREE.FrontSide});return CMM[key]=m}
function codyGround(M){const EX=M.ext,EZ=M.extZ,W=4096,Hc=Math.round(W*EZ/EX),c=document.createElement('canvas');c.width=W;c.height=Hc;const g=c.getContext('2d'),sx=W/(2*EX),sz=Hc/(2*EZ),X=x=>(x+EX)*sx,Z=z=>(z+EZ)*sz,CD=window.CODY||{};
 {const w=1024,h=Math.round(1024*EZ/EX),s=document.createElement('canvas');s.width=w;s.height=h;const sg=s.getContext('2d'),im=sg.createImageData(w,h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const x=(i+.5)/w*2*EX-EX,z=(j+.5)/h*2*EZ-EZ,y=M.H(x,z),sl=Math.abs(M.H(x+3,z)-y)/2+Math.abs(M.H(x,z+3)-y)/2,q=M.tcol(x,z,y,sl),o=(j*w+i)*4;im.data[o]=q[0]*255;im.data[o+1]=q[1]*255;im.data[o+2]=q[2]*255;im.data[o+3]=255}
  sg.putImageData(im,0,0);g.imageSmoothingEnabled=true;g.drawImage(s,0,0,W,Hc)}
 const path=(a,o)=>{g.beginPath();for(let i=o||0;i<a.length;i+=2){const x=X(a[i]),y=Z(a[i+1]);if(i==(o||0))g.moveTo(x,y);else g.lineTo(x,y)}};
 // lawns round the houses
 (M.BL||[]).forEach((b,i)=>{if(!['house','brick','stucco','log','trailer'].includes(b.w))return;const r=(Math.sqrt(Math.abs(b.h)*0+((b.o?b.o.L*b.o.W:60)))*.9+7)*sx,v=(i*37)%23;g.fillStyle='rgba('+(92+v)+','+(138+v)+','+(56+v/2|0)+',.96)';g.beginPath();g.arc(X(b.c[0]),Z(b.c[1]),r,0,7);g.fill()});
 const AC={residential:'rgba(88,134,50,.78)',farm:'#b2aa78',campus:'rgba(118,160,80,.55)',commercial:'rgba(148,144,132,.82)',industrial:'rgba(138,134,124,.82)',grass:'#86ab55',wood:'#5f7d45',golf:'#69ab48',park:'#76a64a',cemetery:'#7ea455',sand:'#d8c89a',apron:'#a6a6a2',parking:'#606266',field:'#5a9a3c',diamond:'#68a244',track:'#a8553f',court:'#4f8a6a',pool:'#47b8d8',water:'#3f88a2'};
 (CD.ar||[]).forEach(a=>{const t=CD.AT[a[0]];g.fillStyle=AC[t]||'#888';path(a,1);g.closePath();g.fill();
  if(t==='parking'){g.save();g.clip();g.strokeStyle='rgba(240,240,236,.55)';g.lineWidth=Math.max(1,.15*sx);let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9;for(let i=1;i<a.length;i+=2){x0=Math.min(x0,a[i]);x1=Math.max(x1,a[i]);z0=Math.min(z0,a[i+1]);z1=Math.max(z1,a[i+1])}
   const vert=x1-x0>z1-z0;g.beginPath();if(vert)for(let x=x0;x<x1;x+=2.8){g.moveTo(X(x),Z(z0));g.lineTo(X(x),Z(z1))}else for(let z=z0;z<z1;z+=2.8){g.moveTo(X(x0),Z(z));g.lineTo(X(x1),Z(z))}g.stroke();
   g.strokeStyle='#606266';g.lineWidth=7*sx;g.beginPath();if(vert)for(let z=z0+5.5;z<z1;z+=19){g.moveTo(X(x0),Z(z+6));g.lineTo(X(x1),Z(z+6))}else for(let x=x0+5.5;x<x1;x+=19){g.moveTo(X(x+6),Z(z0));g.lineTo(X(x+6),Z(z1))}g.stroke();g.restore()}
  if(t==='field'||t==='court'){g.strokeStyle='rgba(250,250,246,.9)';g.lineWidth=Math.max(1,.25*sx);path(a,1);g.closePath();g.stroke()}
  if(t==='diamond'){let cx=0,cz=0,n=0;for(let i=1;i<a.length;i+=2){cx+=a[i];cz+=a[i+1];n++}g.fillStyle='#c8a070';g.beginPath();g.arc(X(cx/n),Z(cz/n),12*sx,0,7);g.fill()}});
 g.lineCap=g.lineJoin='round';
 (CD.st||[]).forEach(s=>{g.strokeStyle='#4a8aa0';g.lineWidth=(s[0]?5:3)*sx;path(s,1);g.stroke()});
 (CD.rl||[]).forEach(a=>{g.strokeStyle='#8a7c6a';g.lineWidth=4*sx;path(a);g.stroke();g.strokeStyle='#4a3e34';g.lineWidth=Math.max(1,.4*sx);g.setLineDash([]);path(a);g.stroke()});
 const RD=(CD.rd||[]).slice().sort((a,b)=>b[0]-a[0]);
 RD.forEach(q=>{if(!q[2])return;const sw=q[2]==2?4:1.8,gs=q[2]==2?0:1.6;g.strokeStyle='#cfcac0';g.lineWidth=(q[1]+2*(gs+sw))*sx;path(q,5);g.stroke();if(gs){g.strokeStyle='#7fa24e';g.lineWidth=(q[1]+2*gs)*sx;path(q,5);g.stroke()}});
 const RCOL=['#4c4e52','#56585c','#606266','#b09a76','#d2ccc0','#55575a'];
 RD.forEach(q=>{g.strokeStyle=RCOL[q[0]];g.lineWidth=Math.max(1,q[1]*sx);path(q,5);g.stroke()});
 {let sd=11;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;for(let i=0;i<90000;i++){const v=rnd()<.5?0:255;g.fillStyle='rgba('+v+','+v+','+v+','+(.03+rnd()*.05)+')';const s=1+rnd()*2.5;g.fillRect(rnd()*W,rnd()*Hc,s,s)}}
 M._gc=c;const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=Math.min(16,ren.capabilities.getMaxAnisotropy());t.minFilter=THREE.LinearMipmapLinearFilter;
 const m=new THREE.MeshStandardMaterial({map:t,roughness:1,flatShading:false});const dt=cTex('dtl');
 m.onBeforeCompile=sh=>{sh.uniforms.dtl={value:dt};sh.uniforms.dsc={value:2*EX/3.2};sh.uniforms.dsc2={value:2*EZ/3.2};
  sh.fragmentShader=sh.fragmentShader.replace('#include <map_pars_fragment>','#include <map_pars_fragment>\nuniform sampler2D dtl;uniform float dsc,dsc2;').replace('#include <map_fragment>',
   '#ifdef USE_MAP\n vec4 sdc=texture2D(map,vUv);float dd=texture2D(dtl,vUv*vec2(dsc,dsc2)).r*.6+texture2D(dtl,vUv*vec2(dsc,dsc2)*.13).r*.4;sdc.rgb*=.62+.75*dd;diffuseColor*=sdc;\n#endif')};
 return m}
const CWK=['house','brick','school','upper','stucco','hotel','strip','plain','stone','store','big','office','metal','trailer','log','shed'],CRK=['shingle','mroof','flat','fnd'];
function cAtlas(K,n){const c=document.createElement('canvas'),S=256;c.width=c.height=S*n;const g=c.getContext('2d');K.forEach((k,i)=>g.drawImage(cTex(k).image,(i%n)*S,Math.floor(i/n)*S,S,S));const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t}
let CSW=null;const cSoft=()=>{if(CSW===null){try{const gl=ren.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');CSW=/swiftshader|llvmpipe|software|basic render/i.test(e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'')}catch(e){CSW=false}}return CSW};
const CAM={};function cAtMat(w){if(CAM[w])return CAM[w];const n=w==='W'?4:2,m=new THREE.MeshStandardMaterial({map:cAtlas(w==='W'?CWK:CRK,n),vertexColors:true,roughness:.9,side:w==='W'?THREE.FrontSide:THREE.DoubleSide});
 m.customProgramCacheKey=()=>'cody'+w+cSoft();m.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <uv_pars_vertex>','#include <uv_pars_vertex>\nattribute vec2 tile;varying vec2 vTile;').replace('#include <uv_vertex>','#include <uv_vertex>\nvTile=tile;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <map_pars_fragment>','#include <map_pars_fragment>\nvarying vec2 vTile;').replace('#include <map_fragment>',
   '#ifdef USE_MAP\n float ts='+(1/n).toFixed(5)+';vec2 auv=vTile+(.004+fract(vUv)*.992)*ts;\n'+(cSoft()?' vec4 sdc=texture2D(map,auv);':'#if __VERSION__ >= 300\n vec4 sdc=textureGrad(map,auv,dFdx(vUv)*ts,dFdy(vUv)*ts);\n#else\n vec4 sdc=texture2D(map,auv);\n#endif')+'\n diffuseColor*=sdc;\n#endif')};return CAM[w]=m}
function codyWorld(M,g){const O=M.BL||[],CS=300,grp={};let TT=[0,0];
 const GP=(k,x,z)=>{if(k==='plain2')k='fnd';if(k==='canopy')k='plain';if(k==='store2')k='store';const ri=CRK.indexOf(k),w=ri>=0?'R':'W',i=ri>=0?ri:Math.max(0,CWK.indexOf(k)),n=w==='W'?4:2;TT=[(i%n)/n,1-(Math.floor(i/n)+1)/n];const key=w+'|'+Math.floor(x/CS)+','+Math.floor(z/CS);return grp[key]||(grp[key]={k:w,P:[],N:[],U:[],C:[],I:[],T:[]})};
 const fw=(a,b,c,nx,ny,nz)=>{const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2];return(uy*vz-uz*vy)*nx+(uz*vx-ux*vz)*ny+(ux*vy-uy*vx)*nz>=0};
 const quad=(G,a,b,c,d,ua,ub,uc,ud,col,nx,ny,nz)=>{const n=G.P.length/3;G.P.push(...a,...b,...c,...d);G.U.push(...ua,...ub,...uc,...ud);for(let i=0;i<4;i++){G.N.push(nx,ny,nz);G.C.push(col.r,col.g,col.b);G.T.push(TT[0],TT[1])}if(fw(a,b,c,nx,ny,nz))G.I.push(n,n+1,n+2,n,n+2,n+3);else G.I.push(n,n+2,n+1,n,n+3,n+2)};
 const tri=(G,a,b,c,ua,ub,uc,col,nx,ny,nz)=>{const n=G.P.length/3;G.P.push(...a,...b,...c);G.U.push(...ua,...ub,...uc);for(let i=0;i<3;i++){G.N.push(nx,ny,nz);G.C.push(col.r,col.g,col.b);G.T.push(TT[0],TT[1])}if(fw(a,b,c,nx,ny,nz))G.I.push(n,n+1,n+2);else G.I.push(n,n+2,n+1)};
 const nrm=(a,b,c)=>{const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2];let x=uy*vz-uz*vy,y=uz*vx-ux*vz,z=ux*vy-uy*vx;const l=Math.hypot(x,y,z)||1;if(y<0){x=-x;y=-y;z=-z}return[x/l,y/l,z/l]};
 const col=h=>new THREE.Color(h);
 O.forEach(b=>{const P=b.P,cx=b.c[0],cz=b.c[1],top=b.G+b.h,wc=col(b.wc),rc=col(b.rc),fc=col(0xb8b4ac),TW=CTW[b.w]||4.2;let u=0;
  for(let i=0;i<P.length;i++){const a=P[i],q=P[(i+1)%P.length],L=Math.hypot(q[0]-a[0],q[1]-a[1]);if(L<.05)continue;const nx=(q[1]-a[1])/L,nz=-(q[0]-a[0])/L;
   if(b.w!=='canopy')quad(GP('fnd',cx,cz),[a[0],b.y0,a[1]],[q[0],b.y0,q[1]],[q[0],b.G,q[1]],[a[0],b.G,a[1]],[u/3,0],[(u+L)/3,0],[(u+L)/3,(b.G-b.y0)/3],[u/3,(b.G-b.y0)/3],fc,nx,0,nz);
   if(b.w==='store2'||(b.w==='store'&&b.st>1)){quad(GP('store',cx,cz),[a[0],b.G,a[1]],[q[0],b.G,q[1]],[q[0],b.G+b.sh,q[1]],[a[0],b.G+b.sh,a[1]],[u/6,0],[(u+L)/6,0],[(u+L)/6,1],[u/6,1],wc,nx,0,nz);
    if(b.st>1)quad(GP('upper',cx,cz),[a[0],b.G+b.sh,a[1]],[q[0],b.G+b.sh,q[1]],[q[0],top,q[1]],[a[0],top,a[1]],[u/6,0],[(u+L)/6,0],[(u+L)/6,b.st-1],[u/6,b.st-1],wc,nx,0,nz)}
   else{const k=b.w==='store2'?'store':b.w;quad(GP(k,cx,cz),[a[0],b.G,a[1]],[q[0],b.G,q[1]],[q[0],top,q[1]],[a[0],top,a[1]],[u/TW,0],[(u+L)/TW,0],[(u+L)/TW,b.st],[u/TW,b.st],wc,nx,0,nz)}
   if(b.rf==='f'&&b.par>0)quad(GP('plain2',cx,cz),[a[0],top,a[1]],[q[0],top,q[1]],[q[0],top+b.par,q[1]],[a[0],top+b.par,a[1]],[u/4,0],[(u+L)/4,0],[(u+L)/4,b.par/4],[u/4,b.par/4],wc,nx,0,nz);
   u+=L}
  if(b.rf==='f'){const V=P.map(p=>new THREE.Vector2(p[0],p[1]));let T=[];try{T=THREE.ShapeUtils.triangulateShape(V,[])}catch(e){}const G=GP('flat',cx,cz),y=top+.03,rcol=b.w==='canopy'?col(0xf2f2ee):col([0x8a8984,0x9a9892,0x7e7d78,0xa8a49a][b.i%4]);
   T.forEach(t=>tri(G,[P[t[0]][0],y,P[t[0]][1]],[P[t[2]][0],y,P[t[2]][1]],[P[t[1]][0],y,P[t[1]][1]],[P[t[0]][0]/4,P[t[0]][1]/4],[P[t[2]][0]/4,P[t[2]][1]/4],[P[t[1]][0]/4,P[t[1]][1]/4],rcol,0,1,0));
   if(b.w==='canopy')T.forEach(t=>tri(G,[P[t[0]][0],b.G,P[t[0]][1]],[P[t[1]][0],b.G,P[t[1]][1]],[P[t[2]][0],b.G,P[t[2]][1]],[0,0],[0,0],[0,0],rcol,0,-1,0))}
  else if(b.rf==='g'&&b.o){const o=b.o,ov=.35,hw=o.W/2,hl=o.L/2,ux=o.ux,uz=o.uz,vx=-uz,vz=ux,ye=top-b.rise*ov/hw,yr=top+b.rise,RK=b.rt==='metal'?'mroof':'shingle',G=GP(RK,cx,cz);
   const pt=(su,sv,y)=>[o.cx+ux*su+vx*sv,y,o.cz+uz*su+vz*sv],sl=Math.hypot(hw+ov,b.rise+b.rise*ov/hw);
   [-1,1].forEach(s=>{const e1=pt(-hl-ov,s*(hw+ov),ye),e2=pt(hl+ov,s*(hw+ov),ye),r2=pt(hl+ov,0,yr),r1=pt(-hl-ov,0,yr),n=nrm(e1,e2,r1);quad(G,e1,e2,r2,r1,[0,0],[(o.L+2*ov)/3,0],[(o.L+2*ov)/3,sl/3],[0,sl/3],rc,n[0],n[1],n[2])});
   const WK=b.w==='store'||b.w==='strip'?'plain':b.w,GW=GP(WK,cx,cz),tw=CTW[WK]||4.2;
   [-1,1].forEach(s=>{const a=pt(s*hl,-hw,top),c2=pt(s*hl,hw,top),p=pt(s*hl,0,yr);tri(GW,a,c2,p,[0,b.st],[o.W/tw,b.st],[o.W/2/tw,b.st+b.rise/b.sh],wc,ux*s,0,uz*s)})}
  else{const RK=b.rt==='metal'?'mroof':'shingle',G=GP(RK,cx,cz),ap=[cx,top+b.rise,cz];for(let i=0;i<P.length;i++){const a=[P[i][0],top,P[i][1]],q=[P[(i+1)%P.length][0],top,P[(i+1)%P.length][1]],n=nrm(a,q,ap);
    tri(G,a,q,ap,[0,0],[Math.hypot(q[0]-a[0],q[2]-a[2])/3,0],[.5,Math.hypot(ap[0]-a[0],ap[2]-a[2])/3],rc,n[0],n[1],n[2])}}});
 // streets
 const RM={0:mat('a',0xffffff),5:mat('a',0xffffff)},asm=new THREE.MeshStandardMaterial({map:cTex('asph'),roughness:.95});
 (M.RL||[]).forEach(r=>{if(!(r.k<=2||r.k==5))return;const P=r.P,Y=r.Y,lift=(r.k==0?.17:r.k==5?.18:r.k==1?.15:.13)+(r.n%7)*.003,pts=[];
  for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]),m=Math.max(1,Math.ceil(l/5));for(let s=0;s<m;s++){const t=s/m;pts.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,Y?Y[i]+(Y[i+1]-Y[i])*t:null])}}
  const e=P[P.length-1];pts.push([e[0],e[1],Y?Y[Y.length-1]:null]);if(pts.length<2)return;
  const cols=r.k==0||r.k==5?3:2;for(let s0=0;s0<pts.length-1;s0+=40){const seg=pts.slice(s0,Math.min(pts.length,s0+41)),Pp=[],U=[],I=[];let d=0;
   seg.forEach((p,i)=>{const pa=seg[Math.max(0,i-1)],pb=seg[Math.min(seg.length-1,i+1)];let tx=pb[0]-pa[0],tz=pb[1]-pa[1];const tl=Math.hypot(tx,tz)||1;tx/=tl;tz/=tl;
    let mx=-tz,mz=tx,sc=1;if(i>0&&i<seg.length-1){const ax=p[0]-pa[0],az=p[1]-pa[1],al=Math.hypot(ax,az)||1,dx=-az/al,dz=ax/al;sc=Math.min(2,1/Math.max(.5,dx*mx+dz*mz))}if(i>0)d+=Math.hypot(p[0]-seg[i-1][0],p[1]-seg[i-1][1]);
    for(let j=0;j<cols;j++){const f=j/(cols-1)-.5,x=p[0]+mx*f*r.w*sc,z=p[1]+mz*f*r.w*sc,y=p[2]!=null?p[2]:M.H(x,z)+lift;Pp.push(x,y,z);U.push(r.k==0||r.k==5?j/(cols-1):(f*r.w)/4,d/(r.k==0||r.k==5?6:4))}});
   for(let i=0;i<seg.length-1;i++)for(let j=0;j<cols-1;j++){const a=i*cols+j,b=a+1,c=a+cols,e2=c+1;I.push(a,b,c,b,e2,c)}
   const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(Pp,3));o.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));o.setIndex(I);o.computeVertexNormals();
   const key='rd'+(r.k==0||r.k==5?'a':'s')+'|'+Math.floor(seg[0][0]/600)+','+Math.floor(seg[0][1]/600);(grp[key]||(grp[key]={k:key,geos:[],m:r.k==0||r.k==5?RM[0]:asm})).geos.push(o)}});
 Object.values(grp).forEach(G=>{let geo;if(G.geos){geo=mergeG(G.geos);G.geos.forEach(q=>q.dispose())}else{if(!G.I.length)return;geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(G.P,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(G.N,3));
   geo.setAttribute('uv',new THREE.Float32BufferAttribute(G.U,2));geo.setAttribute('color',new THREE.Float32BufferAttribute(G.C,3));geo.setAttribute('tile',new THREE.Float32BufferAttribute(G.T,2));geo.setIndex(G.P.length/3>65535?new THREE.Uint32BufferAttribute(G.I,1):new THREE.Uint16BufferAttribute(G.I,1))}
  const m=G.m||cAtMat(G.k);const me=new THREE.Mesh(geo,m);me.castShadow=!G.geos;me.receiveShadow=true;if(G.geos){me.position.y=0}g.add(me)});
 // bridges: concrete deck slab with parapets, sloped like the deck (the road surface is laid on top for road bridges)
 {const dm=new THREE.MeshStandardMaterial({color:0x9a9890,roughness:.85}),pm=new THREE.MeshStandardMaterial({color:0xb8b4aa,roughness:.8}),rm=new THREE.MeshStandardMaterial({color:0x6a6e74,roughness:.6,metalness:.2}),fm=new THREE.MeshStandardMaterial({color:0x8a8478,roughness:.9}),gs={d:[],p:[],r:[],f:[]};
  const bx=(arr,L,Hh,W,x,y,z,yaw,pit)=>{const g=new THREE.BoxGeometry(W,Hh,L);g.rotateX(-pit);g.rotateY(yaw);g.translate(x,y,z);arr.push(g)};
  (M.RL||[]).forEach(r=>{if(!r.Y)return;const P=r.P,Y=r.Y,hw=(r.bw||r.w)/2,road=r.k<=2||r.k==5;for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]);if(l<.1)continue;const ux=(b[0]-a[0])/l,uz=(b[1]-a[1])/l,yaw=Math.atan2(ux,uz),pit=Math.atan2(Y[i+1]-Y[i],l),cx=(a[0]+b[0])/2,cz=(a[1]+b[1])/2,cy=(Y[i]+Y[i+1])/2,nx=-uz,nz=ux,L2=l+.4;
    bx(gs.d,L2,.86,hw*2+.5,cx,cy-.47,cz,yaw,pit);if(!road)bx(gs.f,L2,.06,hw*2,cx,cy-.02,cz,yaw,pit);
    [-1,1].forEach(sd=>{const px=cx+nx*sd*(hw+.15),pz=cz+nz*sd*(hw+.15);bx(gs.p,L2,.35,.4,px,cy+.15,pz,yaw,pit);bx(gs.r,L2,.08,.12,px,cy+1.06,pz,yaw,pit);const n=Math.max(1,Math.round(l/2.4));for(let k=0;k<=n;k++){const t=k/n-.5,qx=px+ux*t*l,qz=pz+uz*t*l,qy=cy+(Y[i+1]-Y[i])*t;bx(gs.r,.1,.75,.1,qx,qy+.68,qz,yaw,0)}})}});
  [[gs.d,dm],[gs.p,pm],[gs.r,rm],[gs.f,fm]].forEach(([arr,m])=>{if(!arr.length)return;const geo=mergeG(arr);arr.forEach(q=>q.dispose());const me=new THREE.Mesh(geo,m);me.castShadow=me.receiveShadow=true;g.add(me)})}
 // yard fences: plank texture, follow the ground at both ends
 if(M.FN&&M.FN.length){const FG={};M.FN.forEach(([x0,z0,x1,z1,fh,col])=>{const key=Math.floor(x0/300)+','+Math.floor(z0/300),G=FG[key]||(FG[key]={P:[],N:[],U:[],C:[],I:[]}),L=Math.hypot(x1-x0,z1-z0)||1,ux=(x1-x0)/L,uz=(z1-z0)/L,nx=-uz*.05,nz=ux*.05,
   ga=M.H(x0,z0),gb=M.H(x1,z1),ya=ga-.25,yb=gb-.25,ta=ga+fh,tb=gb+fh,c=new THREE.Color(col),uL=L/2.2;
   const q=(a,b,cc,d,n,uv)=>{const k=G.P.length/3;G.P.push(...a,...b,...cc,...d);G.U.push(...uv);for(let i=0;i<4;i++){G.N.push(...n);G.C.push(c.r,c.g,c.b)}G.I.push(k,k+1,k+2,k,k+2,k+3)};
   q([x0+nx,ya,z0+nz],[x1+nx,yb,z1+nz],[x1+nx,tb,z1+nz],[x0+nx,ta,z0+nz],[nx*20,0,nz*20],[0,0,uL,0,uL,fh/2.2,0,fh/2.2]);
   q([x1-nx,yb,z1-nz],[x0-nx,ya,z0-nz],[x0-nx,ta,z0-nz],[x1-nx,tb,z1-nz],[-nx*20,0,-nz*20],[0,0,uL,0,uL,fh/2.2,0,fh/2.2]);
   q([x0-nx,ta,z0-nz],[x0+nx,ta,z0+nz],[x1+nx,tb,z1+nz],[x1-nx,tb,z1-nz],[0,1,0],[0,0,.05,0,.05,uL,0,uL])});
  const fm=new THREE.MeshStandardMaterial({map:cTex('shed'),vertexColors:true,roughness:.92,side:THREE.DoubleSide});
  Object.values(FG).forEach(G=>{const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(G.P,3));o.setAttribute('normal',new THREE.Float32BufferAttribute(G.N,3));o.setAttribute('uv',new THREE.Float32BufferAttribute(G.U,2));o.setAttribute('color',new THREE.Float32BufferAttribute(G.C,3));o.setIndex(G.I);
   const me=new THREE.Mesh(o,fm);me.castShadow=true;me.receiveShadow=true;g.add(me)})}
 // lakes
 (M.LK||[]).forEach(L=>{const V=L.p.map(p=>new THREE.Vector2(p[0],p[1]));let T=[];try{T=THREE.ShapeUtils.triangulateShape(V,[])}catch(e){}if(!T.length)return;const P=[];T.forEach(t=>[t[0],t[2],t[1]].forEach(i=>P.push(L.p[i][0],L.lv,L.p[i][1])));
  const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(P,3));o.computeVertexNormals();const w=new THREE.Mesh(o,new THREE.MeshStandardMaterial({color:0x2a8fb0,roughness:.12,metalness:.25,transparent:true,opacity:.78,side:THREE.DoubleSide}));w.renderOrder=1;g.add(w)});
 // signs: real names (generic words for chain brands), on the wall that faces the nearest street
 const SG=M.SG||[];if(SG.length){const cols=4,sw=512,shh=96,rows=Math.ceil(SG.length/cols),cv=document.createElement('canvas');cv.width=cols*sw;cv.height=rows*shh;const x2=cv.getContext('2d');
  const STY={ry:['#c8102e','#ffc72c'],rw:['#c8102e','#ffffff'],yg:['#f2c230','#1f5a2a'],rb:['#e03a3e','#ffffff'],bw:['#1f4f9a','#ffffff'],gw:['#2f7a4a','#ffffff'],kw:['#1d1f22','#ffffff'],ky:['#4a3420','#f2c230'],mo:['#7a2a22','#f4e6c8'],ch:['#f4f2ea','#2a2a2a'],sc:['#6a1f2a','#f4f2ea'],lo:['#3a2a1e','#f0dcb0']};
  const segs=[];(M.RL||[]).forEach(r=>{if(r.k>1)return;for(let i=0;i<r.P.length-1;i++)segs.push([r.P[i],r.P[i+1]])});
  const sd=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],L=dx*dx+dz*dz||1,t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/L));return Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t)};
  const SP=[],SU=[],SI=[],POLES=[];SG.forEach((s,n)=>{const b=O[s.i];if(!b)return;const st=STY[s.s]||STY.lo,ci=n%cols,ri=Math.floor(n/cols);x2.fillStyle=st[0];x2.fillRect(ci*sw,ri*shh,sw,shh);x2.strokeStyle=st[1];x2.lineWidth=5;x2.strokeRect(ci*sw+6,ri*shh+6,sw-12,shh-12);
   x2.fillStyle=st[1];let fs=58;x2.font='bold '+fs+'px Georgia, serif';while(x2.measureText(s.t).width>sw-40&&fs>16){fs-=2;x2.font='bold '+fs+'px Georgia, serif'}x2.textAlign='center';x2.textBaseline='middle';x2.fillText(s.t,ci*sw+sw/2,ri*shh+shh/2+2);
   let best=null;for(let i=0;i<b.P.length;i++){const a=b.P[i],q=b.P[(i+1)%b.P.length],L=Math.hypot(q[0]-a[0],q[1]-a[1]);if(L<4)continue;const mx=(a[0]+q[0])/2,mz=(a[1]+q[1])/2;let dmin=1e9;for(const g2 of segs){if(Math.abs(g2[0][0]-mx)>400&&Math.abs(g2[1][0]-mx)>400)continue;dmin=Math.min(dmin,sd(mx,mz,g2[0],g2[1]))}if(!best||dmin<best.d)best={a,q,L,d:dmin}}
   if(!best)return;const{a,q,L}=best,ux=(q[0]-a[0])/L,uz=(q[1]-a[1])/L,nx=uz,nz=-ux,w=Math.min(L*.8,Math.max(4,s.t.length*.55+2)),hh=Math.min(1.8,w*shh/sw*1.3),top=b.G+b.h+(b.rf==='f'?b.par*.8:0),y1=top-.25,y0=y1-hh,mx=(a[0]+q[0])/2+nx*.14,mz=(a[1]+q[1])/2+nz*.14;
   const n0=SP.length/3,u0=ci/cols,u1=(ci+1)/cols,v1=1-ri/rows,v0=1-(ri+1)/rows;SP.push(mx+ux*w/2,y0,mz+uz*w/2,mx-ux*w/2,y0,mz-uz*w/2,mx-ux*w/2,y1,mz-uz*w/2,mx+ux*w/2,y1,mz+uz*w/2);SU.push(u0,v0,u1,v0,u1,v1,u0,v1);SI.push(n0,n0+1,n0+2,n0,n0+2,n0+3);
   // roadside pole sign for restaurants, gas stations, motels and hotels, readable from both directions along the street
   if(['ry','rw','yg','rb','gw','mo','bw'].includes(s.s)||/MOTEL|INN|LODGE|BURGER|PIZZA|TACO|GAS|BBQ|CAFE|STEAK|SALOON|ICE CREAM/.test(s.t)){const off=Math.max(3,Math.min(16,best.d-9)),px=(a[0]+q[0])/2+nx*off,pz=(a[1]+q[1])/2+nz*off,gy=M.H(px,pz),bw2=Math.max(4,Math.min(7.5,s.t.length*.45+1.6)),bh=Math.max(1.6,bw2*shh/sw*1.7),yb=gy+6.4;
    [1,-1].forEach(sd2=>{const k=SP.length/3,ox=ux*.06*sd2,oz=uz*.06*sd2,ax=nx*bw2/2*sd2,az=nz*bw2/2*sd2;SP.push(px-ax+ox,yb,pz-az+oz,px+ax+ox,yb,pz+az+oz,px+ax+ox,yb+bh,pz+az+oz,px-ax+ox,yb+bh,pz-az+oz);SU.push(u0,v0,u1,v0,u1,v1,u0,v1);SI.push(k,k+1,k+2,k,k+2,k+3)});POLES.push([px,gy,pz,yb,bw2,bh,nx,nz])}});
  if(POLES.length){g.add(instMesh(new THREE.BoxGeometry(.42,1,.42),new THREE.MeshStandardMaterial({color:0x5a5c60,metalness:.35,roughness:.55}),POLES.map(([x,gy,z,yb])=>[x,(gy+yb)/2,z,1,yb-gy+.3,1])));
   g.add(instMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x2b2d30,roughness:.7}),POLES.map(([x,gy,z,yb,w,h,nx,nz])=>[x,yb+h/2,z,w+.25,h+.25,.1,Math.atan2(-nz,nx),0])))}
  if(SI.length){const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(SP,3));o.setAttribute('uv',new THREE.Float32BufferAttribute(SU,2));o.setIndex(SI);o.computeVertexNormals();
   const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;g.add(new THREE.Mesh(o,new THREE.MeshStandardMaterial({map:t,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.35,roughness:.6,side:THREE.DoubleSide})))}}}
function codyMap(M){const E=M.mapE,N=2048,sc=N/(2*E),c=document.createElement('canvas');c.width=c.height=N;const g=c.getContext('2d');g.fillStyle='#9c9a70';g.fillRect(0,0,N,N);
 if(M._gc)g.drawImage(M._gc,(E-M.ext)*sc,(E-M.extZ)*sc,2*M.ext*sc,2*M.extZ*sc);
 (M.BL||[]).forEach(b=>{g.fillStyle='#'+new THREE.Color(b.rf==='f'?0x9a9890:b.rc).getHexString();g.beginPath();b.P.forEach((p,i)=>{const x=(p[0]+E)*sc,y=(p[1]+E)*sc;if(i)g.lineTo(x,y);else g.moveTo(x,y)});g.closePath();g.fill();if(b.h>6){g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1;g.stroke()}});
 g.strokeStyle='#6a4a2a';g.lineWidth=3;g.strokeRect((E-M.rbx)*sc,(E-M.rbz)*sc,2*M.rbx*sc,2*M.rbz*sc);return c}
function codyTerrain(M,g,mat){const EX=M.ext,EZ=M.extZ,GS=M.gs||8,NX=Math.round(2*EX/GS),NZ=Math.round(2*EZ/GS),T=40,H=M.H;
 for(let tj=0;tj<NZ;tj+=T)for(let ti=0;ti<NX;ti+=T){const nx=Math.min(T,NX-ti),nz=Math.min(T,NZ-tj),P=[],N=[],U=[],I=[];
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=-EX+(ti+i)*GS,z=-EZ+(tj+j)*GS,y=H(x,z),dx=H(x-GS,z)-H(x+GS,z),dz=H(x,z-GS)-H(x,z+GS),l=Math.hypot(dx,2*GS,dz);P.push(x,y,z);N.push(dx/l,2*GS/l,dz/l);U.push((x+EX)/(2*EX),1-(z+EZ)/(2*EZ))}
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;I.push(a,c,b,b,c,d)}
  const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(P,3));o.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));o.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));o.setIndex(I);
  const m=new THREE.Mesh(o,mat);m.receiveShadow=true;m.castShadow=false;g.add(m)}}
function mkWorld(M){const g=new THREE.Group(),H=M.H,N=M.ext||150,NZ=M.extZ||N,GS=M.gs||2,tg=new THREE.PlaneGeometry(2*N,2*NZ,M.osm?1:Math.round(2*N/GS),M.osm?1:Math.round(2*NZ/GS)),CK=(x,z)=>M.chunk?'|C'+Math.floor(x/M.chunk)+','+Math.floor(z/M.chunk):'';tg.rotateX(-Math.PI/2);
 const pp=tg.attributes.position,cc=new Float32Array(pp.count*3),a=new THREE.Color(M.gr[0]),b=new THREE.Color(M.gr[1]),c2=new THREE.Color(M.gr[2]),t=new THREE.Color();
 for(let i=0;i<pp.count;i++){const x=pp.getX(i),z=pp.getZ(i),y=H(x,z),s=Math.abs(H(x+1.5,z)-y)+Math.abs(H(x,z+1.5)-y);pp.setY(i,y);
  if(M.osm){t.setRGB(1,1,1)}else if(M.tcol){const q=M.tcol(x,z,y,s);t.setRGB(q[0],q[1],q[2]).convertSRGBToLinear()}else{t.lerpColors(a,b,Math.min(1,Math.max(0,y/7)));if(s>1.1)t.lerp(c2,Math.min(1,(s-1.1)*.9))}t.multiplyScalar(.9+.14*Math.sin(x*1.3)*Math.cos(z*1.1)+.06*Math.sin(x*.4+z*.5));cc.set([t.r,t.g,t.b],i*3)}
 tg.setAttribute('color',new THREE.BufferAttribute(cc,3));const tn=GS===2?tg.toNonIndexed():tg;if(GS===2)tg.dispose();
 if(GS===2){const ca=tn.attributes.color;for(let i=0;i<ca.count;i+=3){const j=.93+.12*Math.abs(Math.sin(i*12.9898)*43758.5453%1);for(let q=0;q<3;q++)ca.setXYZ(i+q,ca.getX(i+q)*j,ca.getY(i+q)*j,ca.getZ(i+q)*j)}}tn.computeVertexNormals();
 const gt=GS===2?(TX.f||(TX.f=tex('f'))):(TX.fc||(TX.fc=(TX.f||(TX.f=tex('f'))).clone()));if(GS!==2)gt.needsUpdate=true;gt.repeat.set(GS===2?80:2*N/3.75,GS===2?80:2*N/3.75);const tmM=new THREE.MeshStandardMaterial({vertexColors:true,map:gt,roughness:1,flatShading:true}),tm=new THREE.Mesh(tn,tmM);tm.receiveShadow=tm.castShadow=true;if(M.osm)codyTerrain(M,g,codyGround(M));else g.add(tm);
 if(M.skirt&&M.hx){const E2=M.skirt,SS=40,n=Math.round(2*E2/SS),sg=new THREE.PlaneGeometry(2*E2,2*E2,n,n);sg.rotateX(-Math.PI/2);const sp=sg.attributes.position,sc=new Float32Array(sp.count*3);
  for(let i=0;i<sp.count;i++){const x=sp.getX(i),z=sp.getZ(i),inn=Math.abs(x)<N-1&&Math.abs(z)<NZ-1,y=M.hx(x,z),s2=Math.abs(M.hx(x+6,z)-y)/4+Math.abs(M.hx(x,z+6)-y)/4;sp.setY(i,inn?y-40:y);const q=M.tcol?M.tcol(x,z,y,s2):[.5,.6,.4];t.setRGB(q[0],q[1],q[2]).convertSRGBToLinear();sc.set([t.r,t.g,t.b],i*3)}
  sg.setAttribute('color',new THREE.BufferAttribute(sc,3));sg.computeVertexNormals();const sm=new THREE.Mesh(sg,M.osm?new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true}):tmM);sm.receiveShadow=true;g.add(sm)}
 const bg={},zj=k=>{let h=7;for(let i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))>>>0;return(h%4)*.0022},SPC=t=>t=='G'||t=='C'||t=='d',_vc=new THREE.Color();
 const colG=(g,c,t)=>{const n=g.attributes.position.count,a=new Float32Array(n*3);_vc.setHex(c);if(t=='e')_vc.multiplyScalar(2.1);for(let i=0;i<n;i++){a[i*3]=_vc.r;a[i*3+1]=_vc.g;a[i*3+2]=_vc.b}g.setAttribute('color',new THREE.BufferAttribute(a,3));return g};
 const addG=(k,t,c,geo,cs)=>{if(k[0]!='R'&&!SPC(t)){k='V'+t;colG(geo,c,t)}if(cs)k+=cs;(bg[k]=bg[k]||{t,c,v:k[0]=='V',a:[]}).a.push(geo)};
 const BF=[[2,1,0,-1,-1,1],[2,1,0,1,-1,-1],[0,2,1,1,1,1],[0,2,1,1,-1,-1],[0,1,2,1,-1,1],[0,1,2,-1,-1,-1]],vw=(q)=>q.w||(q.w={P:[],N:[],U:[],C:[],I:[],n:0}),_p=[0,0,0],_q=[0,0,0];
 M.B.forEach(b=>{const h=b[4]-b[5];if(h<=0||b[7]=='n')return;const t=b[7],e=zj(t+b[6]),S=[b[2]+e,h+e,b[3]+e],T0=[b[2],h,b[3]],cy=(b[4]+b[5])/2,tl=TILE[t||'p'],k0=SPC(t)?t+'_'+b[6]:'V'+t,k=b[10]?k0+'|F'+Math.floor(b[0]/48)+','+Math.floor(b[1]/48):k0+CK(b[0],b[1]),q=bg[k]||(bg[k]={t,c:b[6],v:k[0]=='V',fur:!!b[10],a:[]}),W=vw(q);
  let cr=1,cg=1,cb=1;if(q.v){_vc.setHex(b[6]);if(t=='e')_vc.multiplyScalar(2.1);cr=_vc.r;cg=_vc.g;cb=_vc.b}
  for(let f=0;f<6;f++){const[u,v,w,ud,vd,sg]=BF[f],fw=S[u],fh=S[v],dh=sg*S[w]/2,su=(f<2?T0[2]:T0[0])/tl,sv=(f<2?T0[1]:f<4?T0[2]:T0[1])/tl,n0=W.n;
   for(let iy=0;iy<2;iy++)for(let ix=0;ix<2;ix++){_p[u]=(ix*fw-fw/2)*ud;_p[v]=(iy*fh-fh/2)*vd;_p[w]=dh;W.P.push(_p[0]+b[0],_p[1]+cy,_p[2]+b[1]);_q[0]=_q[1]=_q[2]=0;_q[w]=sg;W.N.push(_q[0],_q[1],_q[2]);W.U.push(ix*su,(1-iy)*sv);if(q.v)W.C.push(cr,cg,cb);W.n++}
   W.I.push(n0,n0+2,n0+1,n0+2,n0+3,n0+1)}});
 Object.values(bg).forEach(q=>{if(!q.w)return;const W=q.w,g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(W.P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(W.N,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(W.U,2));if(q.v)g.setAttribute('color',new THREE.Float32BufferAttribute(W.C,3));g.setIndex(W.n>65535?new THREE.Uint32BufferAttribute(W.I,1):new THREE.Uint16BufferAttribute(W.I,1));q.a.unshift(g);q.w=null});
 (M.D||[]).forEach(d=>{if(d[0]=='roof'){const[,x,z,R,Lr,Sp,Hr,axis,rc,rt,gc,gt,Lw,Dw]=d,q=roofGeo(Lr,Sp,Hr,Lw,Dw,rt,gt),dr=Hr*(Sp-Dw)/Sp;[q.roof,q.gable].forEach(o=>{if(axis=='z')o.rotateY(Math.PI/2);o.translate(x,R-dr,z)});addG(rt+'_'+rc,rt,rc,q.roof,CK(x,z));addG(gt+'_'+gc,gt,gc,q.gable,CK(x,z))}
  else if(d[0]=='pyr'){const[,x,y,z,w,h,c,ty,sg]=d,o=sg?new THREE.ConeGeometry(w/2,h,sg):new THREE.ConeGeometry(w/Math.SQRT2,h,4);if(!sg)o.rotateY(Math.PI/4);o.translate(x,y+h/2,z);addG(ty+'_'+c,ty,c,o,CK(x,z))}});
 (M.RD||[]).forEach((q,qi)=>{const[x1,z1,x2,z2,w,k]=q,len=Math.hypot(x2-x1,z2-z1)||1,n=Math.max(1,Math.ceil(len/(M.rstep||1.5))),ux=(x2-x1)/len,uz=(z2-z1)/len,px=-uz,pz=ux,lift=(k=='a'?.12:k=='u'?.08:k=='k'?.1:.05)+(q[7]||0),cols=M.rstep?Math.max(2,Math.ceil(w/5)+1):Math.max(2,Math.ceil(w/1.5)+1),P=[],U=[],I=[];
  for(let i=0;i<=n;i++){const t=i/n*len;for(let j=0;j<cols;j++){const sv=(j/(cols-1)-.5)*w,x=x1+ux*t+px*sv,z=z1+uz*t+pz*sv;P.push(x,H(x,z)+lift,z);U.push(k=='a'?j/(cols-1):(sv+w/2)/3,t/(k=='a'?6:3))}}
  for(let i=0;i<n;i++)for(let j=0;j<cols-1;j++){const a=i*cols+j,b=a+1,c=a+cols,e=c+1;I.push(a,b,c,b,e,c)}
  const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(P,3));o.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));o.setIndex(I);o.computeVertexNormals();
  const col=k=='a'?0xffffff:k=='u'?0xd4d0c8:k=='k'?0x6e7074:0xb39a74;addG('R'+k+'_'+col+(M.chunk?CK((x1+x2)/2,(z1+z2)/2):''),k=='a'?'a':k=='u'?'u':k=='k'?'c':'j',col,o)});
 // where two ribbons of the same kind cross, lay one clean patch on top so they don't fight for the same pixels
 {const RR=M.RD||[],rr=q=>{const h=q[4]/2;return q[1]===q[3]?[Math.min(q[0],q[2]),q[1]-h,Math.max(q[0],q[2]),q[1]+h]:[q[0]-h,Math.min(q[1],q[3]),q[0]+h,Math.max(q[1],q[3])]};
  for(let i=0;i<RR.length;i++)for(let j=i+1;j<RR.length;j++){const A=RR[i],Bq=RR[j];if(A[5]!==Bq[5]||A[6]||Bq[6]||(A[1]===A[3])===(Bq[1]===Bq[3]))continue;const a=rr(A),b=rr(Bq),x0=Math.max(a[0],b[0]),z0=Math.max(a[1],b[1]),x1=Math.min(a[2],b[2]),z1=Math.min(a[3],b[3]);if(x1-x0<.05||z1-z0<.05)continue;
   const k=A[5],lift=(k=='a'?.12:k=='u'?.08:.05)+.035,nx=Math.max(1,Math.ceil((x1-x0)/1.5)),nz=Math.max(1,Math.ceil((z1-z0)/1.5)),P=[],U=[],I=[];
   for(let u=0;u<=nx;u++)for(let v=0;v<=nz;v++){const x=x0+(x1-x0)*u/nx,z=z0+(z1-z0)*v/nz;P.push(x,H(x,z)+lift,z);U.push(k=='a'?.14+.3*u/nx:x/3,k=='a'?.06+.36*v/nz:z/3)}
   for(let u=0;u<nx;u++)for(let v=0;v<nz;v++){const p0=u*(nz+1)+v,p1=p0+1,p2=p0+nz+1,p3=p2+1;I.push(p0,p1,p2,p1,p3,p2)}
   const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(P,3));o.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));o.setIndex(I);o.computeVertexNormals();
   const col=k=='a'?0xffffff:k=='u'?0xd4d0c8:0xb39a74;addG('R'+k+'_'+col,k=='a'?'a':k=='u'?'u':'j',col,o)}}
 if(M.osm)codyWorld(M,g);
 g.userData.fm=[];Object.values(bg).forEach(q=>{const gl=q.t=='G',m=new THREE.Mesh(mergeG(q.a),q.v?matV(q.t):q.t=='e'?EM(q.c):gl?new THREE.MeshStandardMaterial({color:q.c,transparent:true,opacity:.38,roughness:.05,metalness:.4,depthWrite:false}):mat(q.t,q.c));m.castShadow=!gl&&q.t[0]!='R'&&!q.fur;m.receiveShadow=true;if(gl)m.renderOrder=2;if(q.fur){m.geometry.computeBoundingSphere();g.userData.fm.push(m)}g.add(m)});
 if(M.DR&&M.DR.length){const n=M.DR.length,dg=new THREE.BoxGeometry(1,2.32,.07);dg.translate(.5,1.16,0);const im=new THREE.InstancedMesh(dg,new THREE.MeshStandardMaterial({map:TX['1']||(TX['1']=tex('1')),roughness:.6}),n),
  kg=new THREE.BoxGeometry(.07,.07,.2);kg.translate(.86,1.05,0);const km=new THREE.InstancedMesh(kg,new THREE.MeshStandardMaterial({color:0xd8b04a,metalness:.7,roughness:.3}),n);
  im.castShadow=im.receiveShadow=true;im.frustumCulled=km.frustumCulled=false;M.DR.forEach((d,i)=>{im.setColorAt(i,new THREE.Color(d.col));setDoorM(im,km,i,d,0)});im.instanceColor.needsUpdate=true;g.add(im,km);g.userData.dm=[im,km]}
 const dm=c=>new THREE.MeshStandardMaterial({color:c,roughness:.9,flatShading:true,side:THREE.DoubleSide}),dec={};M.D.forEach(d=>(dec[d[0]]=dec[d[0]]||[]).push(d));
 const vc=(c,x,z)=>new THREE.Color(c).multiplyScalar(.8+.35*Math.abs(Math.sin(x*12.9898+z*78.233))),lc2=(x,z)=>M.lcs?vc(M.lcs[Math.abs(Math.floor(x*7.31+z*3.17))%M.lcs.length],x,z):vc(M.lc||0x2c6b4a,x,z),ad=(geo,mt,arr)=>{if(arr.length)g.add(instMesh(geo,mt,arr))},lcol=M.lc||0x2c6b4a,pcol=M.pc||M.lc||0x2c6b4a;
 ad(new THREE.CylinderGeometry(.42,.62,1,7),dm(0x5a4028),[...(dec.l||[]),...(dec.p||[])].map(([t,x,y,z,s,bt])=>{const lo=bt??y-(t==='p'?6.5:7.5);return[x,(y+lo)/2,z,1.4,y-lo+.3,1.4]}));
 ad(new THREE.BoxGeometry(.09,1.12,.045),dm(0xf4f4f0),(dec.pk||[]).map(([,x,z,y])=>[x,y+.56,z,1,1,1]));
 {const wg=new THREE.CylinderGeometry(.38,.38,.26,10);wg.rotateX(Math.PI/2);ad(wg,dm(0x1d1f22),(dec.wh||[]).map(([,x,y,z,ax])=>[x,y,z,1,1,1,ax?0:Math.PI/2]))}
 {const rg=new THREE.IcosahedronGeometry(1,1),pa=rg.attributes.position;for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i),z=pa.getZ(i),n=Math.abs(Math.sin(x*12.9+y*78.2+z*37.7)*43758.5)%1,f=.8+.4*n;pa.setXYZ(i,x*f,y*f*(y<0?.7:1),z*f)}rg.computeVertexNormals();
  ad(rg,dm(0xffffff),(dec.k||[]).map(([,x,y,z,rx,ry,c,yw])=>[x,y,z,rx,ry,rx,yw,0,vc(c,x,z)]))}
 ad(new THREE.IcosahedronGeometry(2.6,0),dm(0xffffff),(dec.l||[]).map(([,x,y,z,s])=>[x,y+s*1.6,z,s,s*.9,s,x*3.1,0,lc2(x,z)]));
 ad(new THREE.IcosahedronGeometry(1.8,0),dm(0xffffff),(dec.l||[]).map(([,x,y,z,s])=>[x+s*1.2,y+s*1.1,z+s*.5,s,s,s,z*2.3,0,lc2(x,z).multiplyScalar(1.12)]));
 ad(new THREE.IcosahedronGeometry(1.6,0),dm(0xffffff),(dec.l||[]).map(([,x,y,z,s])=>[x-s,y+s*2.6,z-s*.6,s,s,s,x,0,lc2(x,z).multiplyScalar(1.2)]));
 for(let i=0;i<4;i++)ad(new THREE.ConeGeometry(3.2-i*.7,2.8,7),dm(0xffffff),(dec.p||[]).map(([,x,y,z,s])=>[x,y+(.6+i*1.5)*s,z,s,s,s,0,0,vc(pcol,x,z)]));
 ad(new THREE.IcosahedronGeometry(1,1),dm(0xffffff),(dec.b||[]).map(([,x,y,z,s])=>[x,y+.7*s,z,1.7*s,1.2*s,1.7*s,0,0,vc(M.bc||lcol,x,z)]));
 ad(new THREE.BoxGeometry(.22,3.2,.22),dm(0x2a2119),(dec.d||[]).flatMap(([,x,y,z,s])=>[0,1,2].map(i=>{const a=i*2.1+x*1.7+z*.9;return[x-Math.cos(a)*1.3*s,y-1.3-i*1.15,z+Math.sin(a)*1.3*s,s,s*(1.15-i*.22),s,a,1.05]})));
 ad(new THREE.ConeGeometry(.42,1,6),dm(0x060606),(dec.f||[]).map(([,x,y,z])=>[x,y+.5,z,1,1,1]));
 if(dec.pm){const tr=[],fr2=[],nu=[],tc=new THREE.Color(0x8a6a48),fc=new THREE.Color(0x3f9a3a);
  dec.pm.forEach(([,x,y,z,s,lx,lz,ln],k)=>{const Ht=6.2*s,n=6,ps=Math.atan2(-lz,lx),ll=Math.hypot(lx,lz)||1,ux=lx/ll,uz=lz/ll,sh=.85+.3*Math.abs(Math.sin(x*3.1+z*1.7));
   for(let i=0;i<n;i++){const f=(i+.5)/n,o=ln*Ht*f*f,tl=Math.atan(2*ln*f);tr.push([x+ux*o,y+Ht*f,z+uz*o,s*(1-.25*f),Ht/n*1.08,s*(1-.25*f),ps,-tl,tc.clone().multiplyScalar(sh*(i%2?1:.86))])}
   const tx=x+ux*ln*Ht,tz=z+uz*ln*Ht,ty=y+Ht;for(let j=0;j<9;j++){const a=j/9*6.283+k*.7;fr2.push([tx,ty,tz,s,s,s,a,-(.22+.3*Math.abs(Math.sin(j*2.3+k))),fc.clone().multiplyScalar(.75+.45*Math.abs(Math.sin(j*1.7+k*.3)))])}
   for(let j=0;j<3;j++){const a=j*2.1+k;nu.push([tx+Math.cos(a)*.35*s,ty-.35*s,tz+Math.sin(a)*.35*s,s,s,s,0,0])}});
  ad(new THREE.CylinderGeometry(.24,.3,1,6),dm(0xffffff),tr);
  const lf=new THREE.BufferGeometry(),LP=[0,0,0, 1.4,.18,0, 1.3,.02,-.6, 1.4,.18,0, 3.5,-.45,0, 1.3,.02,-.6, 0,0,0, 1.3,.02,.6, 1.4,.18,0, 1.4,.18,0, 1.3,.02,.6, 3.5,-.45,0];
  lf.setAttribute('position',new THREE.Float32BufferAttribute(LP,3));lf.computeVertexNormals();ad(lf,dm(0xffffff),fr2);ad(new THREE.IcosahedronGeometry(.26,0),dm(0x5a3c22),nu)}
 // cylinders (tanks, rides, drums...): merged per texture and colour into their own meshes (they come after the box merge above)
 if(dec.cy){const cg={};dec.cy.forEach(([,x,y,z,r,h,c,ty,sg])=>{const o=new THREE.CylinderGeometry(r,r,h,sg||16);o.translate(x,y+h/2,z);const t=ty||'p';(cg[t+'_'+c]=cg[t+'_'+c]||{t,c,a:[]}).a.push(o)});
  Object.values(cg).forEach(q=>{const m=new THREE.Mesh(mergeG(q.a),q.t=='e'?EM(q.c):mat(q.t,q.c));q.a.forEach(a=>a.dispose());m.castShadow=q.t!='e';m.receiveShadow=true;g.add(m)})}
 if(dec.ig)dec.ig.forEach(([,x,y,z,Rd,TH,CUT,CW,COL])=>{const sg=new THREE.SphereGeometry(Rd,72,26,0,Math.PI*2,0,Math.PI/2).toNonIndexed(),P=sg.attributes.position,U=sg.attributes.uv,N2=sg.attributes.normal,keep=[];
   for(let i=0;i<P.count;i+=3){let cx=0,cy=0,cz=0;for(let j=0;j<3;j++){cx+=P.getX(i+j);cy+=P.getY(i+j);cz+=P.getZ(i+j)}cx/=3;cy/=3;cz/=3;const a=Math.atan2(cz,cx),cut=cy<TH-.3&&(CUT||[0,Math.PI/2,Math.PI,-Math.PI/2]).some(t=>Math.abs(Math.atan2(Math.sin(a-t),Math.cos(a-t)))<Math.asin(Math.min(.95,(CW||3.3)/Rd)));if(!cut)keep.push(i)}
   const pa=[],ua=[],na=[];keep.forEach(i=>{for(let j=0;j<3;j++){pa.push(P.getX(i+j),P.getY(i+j),P.getZ(i+j));ua.push(U.getX(i+j)*18,U.getY(i+j)*7);na.push(N2.getX(i+j),N2.getY(i+j),N2.getZ(i+j))}});
   const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.Float32BufferAttribute(pa,3));dg.setAttribute('uv',new THREE.Float32BufferAttribute(ua,2));dg.setAttribute('normal',new THREE.Float32BufferAttribute(na,3));
   const it=tex('5');const dm2=new THREE.Mesh(dg,new THREE.MeshStandardMaterial({map:it,color:COL||0xcfdeea,roughness:.4,metalness:.05,emissive:COL?0x2a2e34:0x3a5a70,emissiveIntensity:.22,side:THREE.DoubleSide}));dm2.position.set(x,y-.3,z);dm2.receiveShadow=true;dm2.castShadow=false;g.add(dm2)});
 if(dec.sm){const wm=new THREE.MeshStandardMaterial({color:0xe6edf3,roughness:.8,flatShading:true});ad(new THREE.IcosahedronGeometry(1,1),wm,dec.sm.flatMap(([,x,y,z,k])=>[[x,y+.55*k,z,.62*k,.6*k,.62*k],[x,y+1.25*k,z,.46*k,.44*k,.46*k],[x,y+1.78*k,z,.32*k,.32*k,.32*k]]));
  const nose=new THREE.ConeGeometry(.07,.35,6);nose.rotateZ(-Math.PI/2);nose.translate(.17,0,0);ad(nose,dm(0xf07a20),dec.sm.map(([,x,y,z,k,yw])=>[x+Math.cos(yw)*.28*k,y+1.8*k,z-Math.sin(yw)*.28*k,k,k,k,yw,0]));
  ad(new THREE.CylinderGeometry(.22,.24,.3,10),dm(0x1d1f22),dec.sm.map(([,x,y,z,k])=>[x,y+2.15*k,z,k,k,k]));ad(new THREE.CylinderGeometry(.34,.34,.04,12),dm(0x1d1f22),dec.sm.map(([,x,y,z,k])=>[x,y+2.02*k,z,k,k,k]))}
 if(M.snowfall){const n=2600,pa=new Float32Array(n*3);for(let i=0;i<n;i++){pa[i*3]=(Math.random()-.5)*120;pa[i*3+1]=Math.random()*50;pa[i*3+2]=(Math.random()-.5)*120}const sgeo=new THREE.BufferGeometry();sgeo.setAttribute('position',new THREE.BufferAttribute(pa,3));
  const pts=new THREE.Points(sgeo,new THREE.PointsMaterial({color:0xffffff,size:.22,transparent:true,opacity:.65,depthWrite:false}));pts.frustumCulled=false;g.add(pts);g.userData.snow=pts}
 if(dec.cx){const parts=[],b=(w,h,d,x,y,z)=>{const o=new THREE.BoxGeometry(w,h,d);o.translate(x,y,z);parts.push(o)};b(.6,4,.6,0,2,0);b(1.1,.4,.4,.75,1.6,0);b(.4,1.4,.4,1.15,2.3,0);b(.9,.4,.4,-.65,2.2,0);b(.4,1.1,.4,-.95,2.75,0);
  ad(mergeG(parts),dm(0xffffff),dec.cx.map(([,x,y,z,s,yw])=>[x,y-.2,z,s,s,s,yw,0,new THREE.Color(0x4a8a3a).multiplyScalar(.85+.3*Math.abs(Math.sin(x*3.7+z)))]))}
 if(dec.cn){const parts=[];for(let i=0;i<3;i++){const a=i*2.09+.4,b=new THREE.BoxGeometry(.07,1,.07);b.translate(Math.cos(a)*.16,.5,Math.sin(a)*.16);parts.push(b);
   const l=new THREE.BoxGeometry(.5,.03,.1);l.translate(.25,0,0);l.rotateZ(.5);l.rotateY(a+.8);l.translate(Math.cos(a)*.16,.62+i*.07,Math.sin(a)*.16);parts.push(l)}
  const cg=mergeG(parts),cc=new THREE.Color(0x7fae3a),cm=instMesh(cg,dm(0xffffff),dec.cn.map(([,x,y,z,h,yw])=>[x,y-.05,z,1.3,h,1.3,yw,0,cc.clone().multiplyScalar(.8+.4*Math.abs(Math.sin(x*7.1+z*3.3)))]));cm.castShadow=false;g.add(cm)}
 if(dec.bu){const W=M.wl||0,bm=instMesh(new THREE.IcosahedronGeometry(.42,1),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.5}),dec.bu.map(([,x,z,ph,c,s])=>[x,W+.1,z,s,s*.9,s,0,0,new THREE.Color(c)])),
   pm2=instMesh(new THREE.CylinderGeometry(.04,.04,.7,5),new THREE.MeshStandardMaterial({color:0xf4f4f0}),dec.bu.map(([,x,z,ph,c,s])=>[x,W+.6,z,s,s,s]));bm.castShadow=pm2.castShadow=false;g.add(bm,pm2);
  g.userData.bu={W,bm,pm2,d:dec.bu}}
 if(dec.br)ad(new THREE.BoxGeometry(1,.06,.06),dm(0xf2efe6),dec.br.map(([,x1,z1,x2,z2])=>[(x1+x2)/2,(M.wl||0)+.12,(z1+z2)/2,Math.hypot(x2-x1,z2-z1),1,1,-Math.atan2(z2-z1,x2-x1),0]));
 if(M.grass){const rr=rng(M.seed*7+3),S=(M.sz||66)-3,cs=2,GN=Math.max(170,Math.ceil((S+8)*2/cs)),ox=GN*cs/2,occ=new Uint8Array(GN*GN),ci=(x,z)=>Math.floor((z+ox)/cs)*GN+Math.floor((x+ox)/cs);
  (M.RD||[]).forEach(q=>{const w=q[4]/2+.4;for(let x=Math.min(q[0],q[2])-w;x<=Math.max(q[0],q[2])+w;x+=1)for(let z=Math.min(q[1],q[3])-w;z<=Math.max(q[1],q[3])+w;z+=1){const i=ci(x,z);if(i>=0&&i<occ.length)occ[i]=1}});
  M.B.forEach(b=>{if(b[4]<H(b[0],b[1])-.1)return;for(let x=b[0]-b[2]/2-.5;x<=b[0]+b[2]/2+.5;x+=1)for(let z=b[1]-b[3]/2-.5;z<=b[1]+b[3]/2+.5;z+=1){const i=ci(x,z);if(i>=0&&i<occ.length)occ[i]=1}});
  const P=[];for(let k=0;k<3;k++){const a=k*2.094+.3,c=Math.cos(a),s=Math.sin(a),w=.1,l=.22;P.push(-c*w,0,-s*w,c*w,0,s*w,-s*l,1,c*l)}
  const bl=new THREE.BufferGeometry();bl.setAttribute('position',new THREE.Float32BufferAttribute(P,3));bl.setAttribute('normal',new THREE.Float32BufferAttribute(P.map((_,i)=>i%3==1?1:0),3));
  const arr=[],gc=new THREE.Color(M.gcol);
  for(let i=0;i<M.grass*4&&arr.length<M.grass;i++){const x=(rr()*2-1)*S,z=(rr()*2-1)*S;if(occ[ci(x,z)])continue;const y=H(x,z);if(Math.abs(H(x+1,z)-y)+Math.abs(H(x,z+1)-y)>.9)continue;if(M.wl!=null&&y<M.wl+3.3)continue;
   const sc=.55+rr()*.75,f=rr()<M.flw;arr.push([x,y-.05,z,sc*1.5,sc*(f?.8:1.05),sc*1.5,rr()*6.28,(rr()-.5)*.2,f?new THREE.Color(rr()<.5?0xffd84a:0xf6f2ff):gc.clone().multiplyScalar(.72+rr()*.5)])}
  const im=instMesh(bl,new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide}),arr);im.castShadow=false;g.add(im);g.userData.gr=im}
 {const rr=rng(M.seed+5),arr=[],cc=new THREE.Color(M.night?0x2a3242:0xffffff);for(let i=0;i<36;i++){const a=rr()*6.28,d=60+rr()*200,cx=Math.cos(a)*d,cz=Math.sin(a)*d,cy=92+rr()*34,n=3+(rr()*4|0);
   for(let j=0;j<n;j++){const s=5+rr()*7;arr.push([cx+(j-n/2)*s*.95,cy+rr()*3,cz+(rr()-.5)*s,s*1.35,s*.75,s,rr()*6,0,cc])}}
  if(M.earth){const e=new THREE.Mesh(new THREE.SphereGeometry(26,24,16),new THREE.MeshBasicMaterial({color:0x3f7fd8,fog:false}));e.position.set(-160,150,-230);g.add(e);const e2=new THREE.Mesh(new THREE.SphereGeometry(26.4,24,16),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35,fog:false}));e2.position.copy(e.position);e2.scale.set(1,.55,1);g.add(e2)}
  const cl=instMesh(new THREE.IcosahedronGeometry(1,0),new THREE.MeshLambertMaterial({color:0xffffff,emissive:M.night?0:0x7d8899,flatShading:true,fog:false}),arr);cl.castShadow=cl.receiveShadow=false;if(!M.noclouds){g.add(cl);g.userData.cl=cl}}
 if(M.wl!=null){const w=new THREE.Mesh(new THREE.PlaneGeometry(M.wsz||3000,M.wsz||3000),new THREE.MeshStandardMaterial({color:0x1fa6c6,roughness:.12,metalness:.25,transparent:true,opacity:.7}));w.rotation.x=-Math.PI/2;w.position.y=M.wl;w.renderOrder=1;g.add(w);
  const sb=new THREE.Mesh(new THREE.PlaneGeometry(M.wsz||3000,M.wsz||3000),new THREE.MeshStandardMaterial({color:0x0e4f66,roughness:1}));sb.rotation.x=-Math.PI/2;sb.position.y=M.wl-9.5;g.add(sb)}
 else{const w=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),new THREE.MeshStandardMaterial({color:M.night?0x0d1a26:0x2a86b8,roughness:.15,metalness:.3}));w.rotation.x=-Math.PI/2;w.position.y=-4;g.add(w)}
 return g}
function snowTick(p,dt){const a=p.geometry.attributes.position,A=a.array,cx=cam.position.x,cy=cam.position.y,cz=cam.position.z;for(let i=0;i<A.length;i+=3){A[i+1]-=dt*(2.2+(i%7)*.25);A[i]+=Math.sin((A[i+1]+i)*.3)*dt*.4;if(A[i+1]<cy-18)A[i+1]+=50;else if(A[i+1]>cy+32)A[i+1]-=50;if(A[i]<cx-60)A[i]+=120;else if(A[i]>cx+60)A[i]-=120;if(A[i+2]<cz-60)A[i+2]+=120;else if(A[i+2]>cz+60)A[i+2]-=120}a.needsUpdate=true}
const _bm=new THREE.Matrix4(),_bq=new THREE.Quaternion(),_bp=new V(),_bs=new V();
function bobBuoys(u,t){u.d.forEach(([,x,z,ph,c,s],i)=>{const y=u.W+.08+.09*Math.sin(t*.0017+ph);_bs.set(s,s*.9,s);_bp.set(x,y,z);_bm.compose(_bp,_bq,_bs);u.bm.setMatrixAt(i,_bm);_bp.y=y+.5;_bs.set(s,s,s);_bm.compose(_bp,_bq,_bs);u.pm2.setMatrixAt(i,_bm)});u.bm.instanceMatrix.needsUpdate=u.pm2.instanceMatrix.needsUpdate=true}
function roofGeo(Lr,Sp,Hr,Lw,Dw,rt,gt){const tr=TILE[rt]||3,tg=TILE[gt]||3,hs=Sp/2,sl=Math.hypot(hs,Hr),dr=Hr*(Sp-Dw)/Sp,lx=Lr/2,mk=()=>({P:[],U:[],I:[]}),R1=mk(),G1=mk();
 const quad=(o,a,b,c,d,ua,ub,uc,ud)=>{const n=o.P.length/3;o.P.push(...a,...b,...c,...d);o.U.push(...ua,...ub,...uc,...ud);o.I.push(n,n+1,n+2,n,n+2,n+3)},tri=(o,a,b,c,ua,ub,uc)=>{const n=o.P.length/3;o.P.push(...a,...b,...c);o.U.push(...ua,...ub,...uc);o.I.push(n,n+1,n+2)};
 const L=Lr/tr,V=sl/tr;quad(R1,[-lx,0,-hs],[-lx,Hr,0],[lx,Hr,0],[lx,0,-hs],[0,0],[0,V],[L,V],[L,0]);quad(R1,[lx,0,hs],[lx,Hr,0],[-lx,Hr,0],[-lx,0,hs],[0,0],[0,V],[L,V],[L,0]);
 quad(R1,[-lx,-.03,-hs],[lx,-.03,-hs],[lx,Hr-.03,0],[-lx,Hr-.03,0],[0,0],[L,0],[L,V],[0,V]);quad(R1,[lx,-.03,hs],[-lx,-.03,hs],[-lx,Hr-.03,0],[lx,Hr-.03,0],[0,0],[L,0],[L,V],[0,V]);
 const gx=Lw/2,hd=Dw/2,uv=(z,y)=>[z/tg,y/tg];tri(G1,[gx,dr,-hd],[gx,Hr,0],[gx,dr,hd],uv(-hd,dr),uv(0,Hr),uv(hd,dr));tri(G1,[-gx,dr,-hd],[-gx,dr,hd],[-gx,Hr,0],uv(-hd,dr),uv(hd,dr),uv(0,Hr));
 const geo=o=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(o.P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(o.U,2));g.setIndex(o.I);g.computeVertexNormals();return g};return{roof:geo(R1),gable:geo(G1)}}
const _dm=new THREE.Matrix4(),_dq=new THREE.Quaternion(),_de=new THREE.Euler(),_dp=new THREE.Vector3(),_ds=new THREE.Vector3();
function setDoorM(im,km,i,d,a){_de.set(0,Math.atan2(-d.az,d.ax)+a,0);_dq.setFromEuler(_de);_dp.set(d.hx,d.y,d.hz);_ds.set(d.w,1,1);_dm.compose(_dp,_dq,_ds);im.setMatrixAt(i,_dm);km.setMatrixAt(i,_dm);im.instanceMatrix.needsUpdate=km.instanceMatrix.needsUpdate=true}
const dispose=w=>w.traverse(o=>{o.geometry&&o.geometry.dispose();o.isInstancedMesh&&o.dispose()});
function mergeG(gs){let vn=0,ix=0;gs.forEach(q=>{vn+=q.attributes.position.count;ix+=q.index.count});const P=new Float32Array(vn*3),N=new Float32Array(vn*3),U=new Float32Array(vn*2),CC=gs[0].attributes.color?new Float32Array(vn*3):null,I=vn>65535?new Uint32Array(ix):new Uint16Array(ix);let vo=0,io=0;
 gs.forEach(q=>{P.set(q.attributes.position.array,vo*3);N.set(q.attributes.normal.array,vo*3);U.set(q.attributes.uv.array,vo*2);if(CC)CC.set(q.attributes.color.array,vo*3);const a=q.index.array;for(let i=0;i<a.length;i++)I[io+i]=a[i]+vo;vo+=q.attributes.position.count;io+=a.length;q.dispose()});
 const r=new THREE.BufferGeometry();r.setAttribute('position',new THREE.BufferAttribute(P,3));r.setAttribute('normal',new THREE.BufferAttribute(N,3));r.setAttribute('uv',new THREE.BufferAttribute(U,2));if(CC)r.setAttribute('color',new THREE.BufferAttribute(CC,3));r.setIndex(new THREE.BufferAttribute(I,1));return r}
// arr rows: [x,y,z,sx,sy,sz,yaw,lean,color]
function instMesh(geo,mt,arr){const im=new THREE.InstancedMesh(geo,mt,arr.length),m=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler(),p=new V(),sc=new V();let col=false;
 arr.forEach((a,i)=>{e.set(0,a[6]||0,a[7]||0,'YZX');q.setFromEuler(e);p.set(a[0],a[1],a[2]);sc.set(a[3],a[4],a[5]);m.compose(p,q,sc);im.setMatrixAt(i,m);if(a[8]!==undefined){im.setColorAt(i,a[8].isColor?a[8]:new THREE.Color(a[8]));col=true}});
 im.castShadow=im.receiveShadow=true;im.frustumCulled=false;im.instanceMatrix.needsUpdate=true;if(col)im.instanceColor.needsUpdate=true;return im}
// ---------- robots & skins ----------
function faceTex(s){const c=document.createElement('canvas');c.width=c.height=16;const g=c.getContext('2d'),h=v=>'#'+hex(v);
 g.fillStyle=h(s.sk);g.fillRect(0,0,16,16);if(s.mask){g.fillStyle=h(s.mask);g.fillRect(0,0,16,5);g.fillRect(0,9,16,7)}
 g.fillStyle=h(s.ha);g.fillRect(3,4,4,1);g.fillRect(9,4,4,1);g.fillStyle='#fff';g.fillRect(4,6,3,3);g.fillRect(9,6,3,3);g.fillStyle='#1b1b1b';g.fillRect(5,6,2,3);g.fillRect(10,6,2,3);
 if(s.ugly){g.fillStyle=h(s.sk);g.fillRect(2,3,12,7);g.fillStyle='#2a2016';g.fillRect(3,4,10,1);g.fillStyle='#fff';g.fillRect(4,5,3,3);g.fillRect(10,6,2,2);g.fillStyle='#1b1b1b';g.fillRect(4,6,1,2);g.fillRect(11,6,1,1);
  g.fillStyle='#d08a78';g.fillRect(6,8,4,3);g.fillStyle='#5a2a22';g.fillRect(7,9,1,1);g.fillRect(9,9,1,1);g.fillStyle='#4a1a14';g.fillRect(4,12,8,2);g.fillStyle='#e8e0a0';g.fillRect(5,12,1,1);g.fillRect(7,12,1,1);g.fillRect(10,12,1,1);
  g.fillStyle='rgba(60,40,20,.35)';[[3,11],[12,11],[4,14],[11,14],[2,13],[13,13],[6,15],[9,15]].forEach(([x,y])=>g.fillRect(x,y,1,1));g.fillStyle='#8a5a3a';g.fillRect(12,9,1,1);g.fillStyle='rgba(120,190,255,.7)';g.fillRect(1,5,1,2)}
 else if(!s.mask){g.fillStyle='rgba(0,0,0,.16)';g.fillRect(7,9,2,2);g.fillStyle='#5a2a22';g.fillRect(6,12,4,1);g.fillRect(5,11,1,1);g.fillRect(10,11,1,1)}
 const t=new THREE.CanvasTexture(c);t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;t.encoding=THREE.sRGBEncoding;return t}
function mkRobot(){const g=new THREE.Group(),legs=[],guns=[],P={sh:[],pa:[],sk:[],so:[],hr:[],vi:[]},a=(p,kk,...r)=>{const m=bx(p,...r,1);P[kk].push(m);return m};
 [-.15,.15].forEach(x=>{const p=new THREE.Group();p.position.set(x,.86,0);g.add(p);a(p,'pa',.26,.8,.3,0x2b3440,0,-.4,0);a(p,'so',.28,.14,.38,0x15191f,0,-.8,-.04);legs.push(p)});
 a(g,'sh',.62,.72,.34,0xd9483b,0,1.22,0);a(g,'pa',.6,.12,.34,0x2b3440,0,.9,0);
 const head=new THREE.Group();head.position.set(0,1.84,0);g.add(head);
 const fm=new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.5),[0,1,2,3,4,5].map(()=>L(0xe8c4a0)));fm.castShadow=true;head.add(fm);
 a(head,'hr',.54,.14,.54,0x2b3440,0,.26,0);a(head,'hr',.54,.36,.12,0x2b3440,0,.08,.22);a(head,'vi',.52,.12,.08,0x0a0f14,0,.03,-.25);
 const arms=new THREE.Group();arms.position.set(0,1.5,0);g.add(arms);const sides=[];
 [-1,1].forEach(sd=>{const p=new THREE.Group();p.position.set(sd*.4,0,0);p.rotation.z=-sd*.5;arms.add(p);a(p,'sh',.2,.56,.22,0xd9483b,0,-.24,0);a(p,'sk',.17,.16,.19,0xe8c4a0,0,-.6,0);sides.push(p)});
 for(let i=0;i<NWP;i++){const q=makeGun(i,1);q.rotation.x=-Math.PI/2+(HOLDTP[i]||0);q.position.set(HOLDTP[i]?.05:0,-.66,.05);q.visible=false;arms.add(q);guns.push(q)}
 g.visible=false;return{g,legs,guns,head,arms,armL:sides[0],armR:sides[1],face:fm,P,ex:[],sk:-1,inv:false}}
const EX={gl:[['head',.15,.1,.04,0x1a1a1a,-.085,.02,-.26],['head',.15,.1,.04,0x1a1a1a,.085,.02,-.26],['head',.04,.03,.04,0x1a1a1a,0,.04,-.26]],
 cu:[[-.24,.34,0],[.24,.34,0],[0,.42,-.12],[0,.42,.14],[-.28,.16,.06],[.28,.16,.06],[-.12,.4,.12],[.14,.38,-.14]].map(q=>['head',.22,.22,.22,-1,...q]),
 bd:[['armR',.21,.1,.23,0xffffff,0,-.47,0]],hat:[['head',.8,.06,.8,0x6b4423,0,.33,0],['head',.42,.24,.42,0x6b4423,0,.46,0]],
 pk:[['g',.5,.6,.2,0x3a4a3a,0,1.22,.27]],pkw:[['g',.5,.6,.22,0xdddddd,0,1.22,.28],['g',.16,.5,.1,0xd9a520,.12,1.22,.4]],hb:[['head',.55,.08,.55,0xd93030,0,.17,0],['head',.1,.08,.34,0xd93030,.3,.15,.2]],
 hm:[['head',.6,.42,.6,0xbfc6cc,0,.06,0],['head',.12,.34,.4,0xd93030,0,.4,0],['head',.42,.06,.04,0x111111,0,.04,-.305]],as:[['head',.74,.72,.74,0xeeeeee,0,0,0],['head',.58,.34,.1,0xd9a520,0,.02,-.38]]};
const _d=s=>[...s].map(c=>String.fromCharCode(c.charCodeAt(0)-1)).join('');
const SK=[{n:'Survivor',d:'Red hoodie, jeans and messy hair',sh:0xc2412f,pa:0x34507a,sk:0xe8c4a0,ha:0x4a3020,so:0x2a2a2a},
{n:'Curly',d:'Shades and big curly hair',sh:0x7b8fd9,pa:0x5d6a3a,sk:0xf0c8a8,ha:0x7a4a2a,so:0x2a2a2a,x:['gl','cu']},
{n:'Tennis',d:'Sporty green with a wristband',sh:0x1fa95a,pa:0xf0f0f0,sk:0xb07850,ha:0x2a1d14,so:0xffffff,x:['bd']},
{n:'Stealth',d:'Dark suit, cyan visor',sh:0x222831,pa:0x14181d,sk:0xc99a7a,ha:0x14181d,vi:0x00e5ff,so:0x0c0e11},
{n:'Cowboy',d:'Wide-brim hat, dusty boots',sh:0x9a6238,pa:0x2e4a7a,sk:0xe0b48c,ha:0x6b4423,so:0x3a2414,x:['hat']},
{n:'Ninja',d:'Black gear with a red headband',sh:0x1b1b22,pa:0x1b1b22,sk:0xe0b090,ha:0x111111,mask:0x18181d,so:0x0a0a0c,x:['hb']},
{n:'Astronaut',d:'White suit, gold visor, jetpack',sh:0xf0f0f0,pa:0xdadada,sk:0xe8c4a0,ha:0xdddddd,so:0x888888,x:['as','pkw']},
{n:'Knight',d:'Steel armour and red plume',sh:0x8e98a4,pa:0x5b6470,sk:0xe8c4a0,ha:0x5b6470,so:0x333840,x:['hm']},
{n:'Farmer',d:'Overalls, plaid and a straw hat',sh:0xb8322a,pa:0x3d5f8f,sk:0xd9a883,ha:0xc9a64a,so:0x3a2414,x:['hat2']},
{n:'Josh Rice',d:'Beret, Breton stripes and a big curly mustache',sh:0x1f3a7a,pa:0x2b2b30,sk:0xf0c8a8,ha:0x3a2414,so:0x1a1a1a,x:['beret','stache','stripes']},
 {n:_d('Bmfyboefs!Tufxbsu'),d:'',sh:0xf5c842,pa:0xd9a520,sk:0xf7d36b,ha:0xffe08a,so:0xb8860b,x:['gl','crwn'],fx:1},
 {n:'Big Fat Chum',d:'',sh:0xe6e0c8,pa:0x6a5a4a,sk:0xe0b090,ha:0x5a4a30,so:0x3a3a3a,x:['fat'],ugly:1}];
EX.crwn=[['head',.64,.12,.64,0xffd700,0,.36,0],...[[-.26,-.26],[.26,-.26],[-.26,.26],[.26,.26],[0,-.27],[0,.27],[-.27,0],[.27,0]].map(([x,z])=>['head',.1,.18,.1,0xffd700,x,.5,z]),['head',.08,.08,.08,0xe0303a,0,.42,-.33]];
EX.fat=[['g',.84,.7,.52,0xe6e0c8,0,1.24,0],['g',.76,.44,.22,0xe6e0c8,0,1.04,-.3],['g',.68,.14,.18,0xe0b090,0,.86,-.31],['g',.06,.05,.02,0x8a5a40,0,.89,-.405],
 ['g',.18,.13,.02,0xb8a060,.16,1.16,-.415],['g',.1,.09,.02,0xb03020,-.2,1.3,-.27],['g',.88,.14,.54,0x6a5a4a,0,.9,0],
 ['head',.5,.16,.42,0xe0b090,0,-.29,-.05],['head',.56,.12,.5,0xe0b090,0,-.18,0],['head',.08,.1,.08,0x8a6a40,.2,-.02,-.26],
 ['armR',.32,.44,.32,0xe0b090,0,-.3,0],['armL',.32,.44,.32,0xe0b090,0,-.3,0],['head',.3,.06,.5,0x5a4a30,-.08,.27,0]];
EX.beret=[['head',.6,.1,.6,0x1a1a1a,.03,.3,0],['head',.06,.08,.06,0x1a1a1a,.03,.38,0]];
EX.stache=[['head',.24,.06,.04,0x3a2414,0,-.07,-.27],['head',.08,.06,.04,0x3a2414,-.15,-.05,-.27],['head',.08,.06,.04,0x3a2414,.15,-.05,-.27],['head',.05,.07,.04,0x3a2414,-.2,0,-.27],['head',.05,.07,.04,0x3a2414,.2,0,-.27],['head',.04,.04,.04,0x3a2414,-.17,.04,-.27],['head',.04,.04,.04,0x3a2414,.17,.04,-.27]];
EX.stripes=[0,1,2,3].map(k=>['g',.63,.07,.35,0xf4f4f0,0,.96+k*.16,0]);
EX.hat2=[['head',.82,.05,.82,0xd8bb63,0,.32,0],['head',.44,.2,.44,0xd8bb63,0,.43,0],['head',.46,.05,.46,0x8a3020,0,.36,0]];
const FTX={};
function applySkin(R,i){const s=SK[i]||SK[0],set=(a,c)=>a.forEach(m=>m.material.color.set(c));R.sk=i;set(R.P.sh,s.sh);set(R.P.pa,s.pa);set(R.P.sk,s.sk);set(R.P.hr,s.ha);set(R.P.so,s.so);set(R.P.vi,s.vi||0);R.P.vi.forEach(m=>m.visible=!!s.vi);
 const fm=R.face.material;fm.forEach((m,n)=>m.color.set(n==5?0xffffff:s.sk));fm[5].map=FTX[i]||(FTX[i]=faceTex(s));fm[5].needsUpdate=true;
 R.ex.forEach(m=>m.parent.remove(m));R.ex=[];(s.x||[]).forEach(n=>EX[n].forEach(q=>R.ex.push(bx(R[q[0]]||R.g,q[1],q[2],q[3],q[4]===-1?s.ha:q[4],q[5],q[6],q[7],1))));if(typeof skinFx==='function')skinFx(R,i)}
function setInv(R,on){if(R.inv===on)return;R.inv=on;R.g.traverse(m=>{if(!m.isMesh||m.userData.ns)return;if(m.userData.cs===undefined)m.userData.cs=m.castShadow;[].concat(m.material).forEach(q=>{q.transparent=true;q.opacity=on?.07:1});m.castShadow=on?false:m.userData.cs})}
// previews (3D thumbnails)
const pr=mkR(520,300,1);
function snapMap(M){pr.setSize(520,300);const z0=(M.sz||66)/66,tc=M.tc||[-84,86,128],tl=M.tl||[0,-6,14],sc=new THREE.Scene(),w=mkWorld(M),sk=mkSky(M);(w.userData.fm||[]).forEach(m=>m.visible=false);if(w.userData.cl)w.userData.cl.visible=false;const _u=0,c=new THREE.PerspectiveCamera(46,520/300,1,1600);sc.add(w,sk);sc.fog=new THREE.Fog(M.sky[1],200*z0,480*z0);lights(sc,M,110*z0,2048);c.position.set(tc[0],tc[1],tc[2]);c.lookAt(tl[0],tl[1],tl[2]);sk.position.copy(c.position);pr.toneMappingExposure=M.ex;pr.render(sc,c);const u=pr.domElement.toDataURL('image/jpeg',.88);dispose(w);return u}
function snapSkin(i){pr.setSize(300,380);const sc=new THREE.Scene(),R=mkRobot(),c=new THREE.PerspectiveCamera(32,300/380,.1,50),f=new THREE.Mesh(new THREE.CircleGeometry(1.5,40),L(0x2c4458));applySkin(R,i);R.g.visible=true;{const w=SK[i]&&SK[i].fx?23:1;R.guns[w].visible=true;R.arms.rotation.x=HOLDTP[w]?1.15:Math.PI/2}R.g.rotation.y=.5;
 f.rotation.x=-Math.PI/2;f.receiveShadow=true;sc.add(R.g,f);sc.background=new THREE.Color(0x1d3340);lights(sc,{sky:[0xffffff],gr:[0,0,0x556677],amb:.9,sun:0xfff2dd,si:1.6},4,1024);c.position.set(-1.4,1.75,-4.9);c.lookAt(0,1.12,0);pr.toneMappingExposure=1.1;pr.render(sc,c);return pr.domElement.toDataURL('image/jpeg',.9)}
// ---------- key bindings ----------
const ACT=[['Movement'],['fwd','Move forward','KeyW'],['back','Move backward','KeyS'],['left','Move left','KeyA'],['right','Move right','KeyD'],['jump','Jump','Space'],['sprint','Sprint','ShiftLeft'],['crouch','Sneak / crouch (hold) - hides your footsteps','KeyC'],
 ['Combat'],['fire','Fire','Mouse0'],['aim','Aim down sights (hold)','Mouse2'],['reload','Reload','KeyR'],['w1','Weapon / slot 1','Digit1'],['w2','Weapon / slot 2','Digit2'],['w3','Weapon / slot 3','Digit3'],['w4','Weapon / slot 4','Digit4'],['w5','Slot 5 (Battle Royale)','Digit5'],['pick','Pickaxe (Battle Royale)','KeyX'],['wnext','Next weapon','WheelDown'],['wprev','Previous weapon','WheelUp'],
 ['Items & map'],['use','Open doors and chests, pick up items, buy at vending machines','KeyE'],['inv','Inventory (Battle Royale)','Tab'],['drop','Drop held item (Battle Royale)','KeyG'],['power','Use powerup','KeyQ'],['cycle','Switch powerup','KeyF'],['map','Open big map','KeyM'],['chat','Quick chat (type a message)','Slash']];
const DEF={};ACT.forEach(a=>{if(a.length>1)DEF[a[0]]=a[2]});
let BIND=Object.assign({},DEF);try{const sv=JSON.parse(localStorage.getItem('crossfire-binds')||'{}');for(const a in DEF)if(typeof sv[a]==='string')BIND[a]=sv[a]}catch(e){}
const saveB=()=>{try{localStorage.setItem('crossfire-binds',JSON.stringify(BIND))}catch(e){}};
const NICE={Space:'Space',ShiftLeft:'Left Shift',ShiftRight:'Right Shift',ControlLeft:'Left Ctrl',ControlRight:'Right Ctrl',AltLeft:'Left Alt',AltRight:'Right Alt',Tab:'Tab',CapsLock:'Caps Lock',Enter:'Enter',Backspace:'Backspace',ArrowUp:'Up Arrow',ArrowDown:'Down Arrow',ArrowLeft:'Left Arrow',ArrowRight:'Right Arrow',Mouse0:'Left Click',Mouse1:'Middle Click',Mouse2:'Right Click',Mouse3:'Mouse 4',Mouse4:'Mouse 5',WheelUp:'Scroll Up',WheelDown:'Scroll Down',Backquote:'`',Minus:'-',Equal:'=',BracketLeft:'[',BracketRight:']',Semicolon:';',Quote:"'",Comma:',',Period:'.',Slash:'/',Backslash:'\\'};
const pretty=c=>!c?'Unbound':NICE[c]||c.replace(/^Key/,'').replace(/^Digit/,'').replace(/^Numpad/,'Num ');
const act=c=>Object.keys(BIND).filter(a=>BIND[a]===c),held_=a=>!!k[BIND[a]];
// ---------- state ----------
const me={id:'h',name:'Player',sk:0,tm:0,coins:0,items:{heal:0,cloak:0,speed:0,shield:0},sel:'heal',out:0,cloak:0,spd:0,sh:0,sta:100,tired:0,sdel:0,sprint:0,ammo:[12,30,6,5,17,0,0,6,0,0,15,10,0,1,0,0,0,6,30,1,1,1,1,1],rl:0,rw:-1,x:0,z:0,y:0,vy:0,yaw:0,pitch:0,hp:100,kills:0,deaths:0,cd:0,w:0,zoom:false},players={},rv=new V();
let mpc,world,skyM,lamps=[],boxes=[],spawns=[[0,0]],Hf=()=>0,mapIdx=0,go=0,isHost=false,practice=false,links=[],hostLink=null,nextId=1,peer,cur='main',car=null,PIC=[],SKP=[];
let down=false,fireReq=false,ending=false,kick=0,bob=0,fT=0;
let gm=0,lastFFA=0,stormT0=0,spec=null,tk=0,sbAcc=0;let lastBR,doors=[];const BRI=lastBR=MAPS.findIndex(M=>M.br),stormM=new THREE.Mesh(new THREE.CylinderGeometry(1,1,150,72,1,true),new THREE.MeshBasicMaterial({color:0x8a4bff,transparent:true,opacity:.24,side:THREE.DoubleSide,depthWrite:false,fog:false}));stormM.position.y=30;stormM.visible=false;stormM.frustumCulled=false;scene.add(stormM);
const roster=()=>[me,...Object.values(players).filter(p=>p.id!=='bot')],st=id=>id===me.id?me:players[id];
// squads (gm 2): two teams of four. tm is 0 or 1 on every roster entry; elimination modes are Battle Royale (1) and Squads (2)
const ELIM=()=>gm>=1,SQ=()=>gm===2,mate=e=>gm===2&&!!e&&e!==me&&e.id!=='bot'&&(e.tm|0)===(me.tm|0),TCOL=['#4fd18b','#5ab8ff'],TNM=['Squad 1','Squad 2'],CODYI=MAPS.findIndex(M=>M.osm),SQM=M=>!!M&&!!(M.osm||M.sq);let lastSQ=CODYI;
const teamOf=id=>{const e=st(id);return e?(e.tm|0):-1},nTeam=t=>roster().filter(e=>(e.tm|0)===t).length;
const fo=(b,x,z)=>Math.abs(x-b[0])<b[2]/2+.4&&Math.abs(z-b[1])<b[3]/2+.4;
let BND=0,RBX=0,RBZ=0,CARON=false;const BG={cs:4,o:-300,n:150,c:null,e:[]};
function buildBG(){const n=BG.n,c=BG.c=new Array(n*n);for(const b of boxes){const i0=Math.max(0,Math.floor((b[0]-b[2]/2-.5-BG.o)/BG.cs)),i1=Math.min(n-1,Math.floor((b[0]+b[2]/2+.5-BG.o)/BG.cs)),j0=Math.max(0,Math.floor((b[1]-b[3]/2-.5-BG.o)/BG.cs)),j1=Math.min(n-1,Math.floor((b[1]+b[3]/2+.5-BG.o)/BG.cs));for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const k=j*n+i;(c[k]||(c[k]=[])).push(b)}}}
const near=(x,z)=>{if(!BG.c)return boxes;const i=Math.floor((x-BG.o)/BG.cs),j=Math.floor((z-BG.o)/BG.cs);if(i<0||j<0||i>=BG.n||j>=BG.n)return BG.e;return BG.c[j*BG.n+i]||BG.e};
const blocked=(x,z,y)=>(BND>0&&x*x+z*z>BND*BND)||(RBX>0&&(Math.abs(x)>RBX||Math.abs(z)>RBZ))||near(x,z).some(b=>fo(b,x,z)&&b[4]>y+.55&&b[5]<y+1.8)||(CARON&&carBlock(x,z,y));
const groundAt=(x,z,y)=>{let g=Hf(x,z);for(const b of near(x,z))if(fo(b,x,z)&&b[4]<=y+.55&&b[4]>g)g=b[4];return g};
// headroom: a step up (stairs, kerbs) is only taken if your head fits at the new height, and jumps stop at the ceiling,
// so nobody pokes through a floor, a lintel or the inside of a roof
const blockedMv=(x,z,y)=>{if(blocked(x,z,y))return true;const g=groundAt(x,z,y);return g>y+.01&&blocked(x,z,g)};
const ceilAt=(x,z,y)=>{let c=1e9;for(const b of near(x,z))if(fo(b,x,z)&&b[5]>=y+1.78&&b[5]<c)c=b[5];return c};
// ---------- battle bus + gliders ----------
let BUS=null;
function mkBusMesh(){const g=new THREE.Group(),m=c=>new THREE.MeshStandardMaterial({color:c,roughness:.6}),b=(w,h,d,c,x,y,z)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m(c));o.position.set(x,y,z);g.add(o);return o};
 b(3.4,2.6,9,0x2f6fd8,0,0,0);b(3.5,.5,9.1,0xf4f4f0,0,-.6,0);b(3.45,.9,8.2,0x1b2a3a,0,.55,.1);b(3.2,.25,8.8,0xe9e9e9,0,1.42,0);b(3.3,1.2,.1,0x1b2a3a,0,.4,4.52);
 [[-1.7,-3],[1.7,-3],[-1.7,3],[1.7,3]].forEach(([x,z])=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.4,12),m(0x1d1f22));w.rotation.z=Math.PI/2;w.position.set(x,-1.3,z);g.add(w)});
 const bl=new THREE.Mesh(new THREE.SphereGeometry(6,20,14),m(0xe8473a));bl.position.y=10.5;bl.scale.y=1.15;g.add(bl);const bs=new THREE.Mesh(new THREE.SphereGeometry(6.05,20,14,0,6.283,1.2,.35),m(0xf4f4f0));bs.position.y=10.5;bs.scale.y=1.15;g.add(bs);
 [[-1.5,-3.5],[1.5,-3.5],[-1.5,3.5],[1.5,3.5]].forEach(([x,z])=>{const r=new THREE.Mesh(new THREE.BoxGeometry(.06,4.8,.06),m(0x3a3a3a));r.position.set(x*.8,4,z*.6);r.rotation.x=z>0?-.35:.35;r.rotation.z=x>0?.15:-.15;g.add(r)});
 g.visible=false;return g}
function mkGlider(){const g=new THREE.Group(),m=new THREE.MeshStandardMaterial({color:0xffc83d,roughness:.5,side:THREE.DoubleSide});
 [-1,0,1].forEach(i=>{const p=new THREE.Mesh(new THREE.BoxGeometry(1.25,.06,1.5),m);p.position.set(i*1.2,-Math.abs(i)*.25,0);p.rotation.z=-i*.35;g.add(p)});
 const sm=new THREE.MeshStandardMaterial({color:0x2b2b2b});[-1,1].forEach(i=>{const st=new THREE.Mesh(new THREE.BoxGeometry(.04,1.4,.04),sm);st.position.set(i*.8,-.75,0);st.rotation.z=i*.45;g.add(st)});return g}
const busM=mkBusMesh(),busM2=mkBusMesh(),myGl=mkGlider();busM.scale.setScalar(2.4);busM2.scale.setScalar(2.4);scene.add(busM,busM2);
// Squads: squad 1 rides bus 1 (start to end of the route), squad 2 rides bus 2 the other way along the same line
const myBusM=()=>gm===2&&(me.tm|0)===1?busM2:busM;myGl.position.set(0,1.05,-.9);myGl.rotation.x=.18;myGl.visible=false;cam.add(myGl);
function busPlan(){const M=MAPS[mapIdx],rr=rng(((stSeed^0x9e3779b9)>>>0)||7),E=M.rb?Math.max(M.rbx||M.rb,M.rbz||M.rb)-30:M.bnd?M.bnd-10:(M.sz||66)-6,a=rr()*6.283,off=(rr()-.5)*E*.7,dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx;
 let x0=-dx*E+px*off,z0=-dz*E+pz*off,x1=dx*E+px*off,z1=dz*E+pz*off;if(M.rb){let a=0,b=1;const ux=x1-x0,uz=z1-z0;[[-ux,x0+(M.rbx||M.rb)-30],[ux,(M.rbx||M.rb)-30-x0],[-uz,z0+(M.rbz||M.rb)-30],[uz,(M.rbz||M.rb)-30-z0]].forEach(([p,q])=>{if(Math.abs(p)<1e-9)return;const t=q/p;if(p<0)a=Math.max(a,t);else b=Math.min(b,t)});[x0,z0,x1,z1]=[x0+ux*a,z0+uz*a,x0+ux*b,z0+uz*b]}const L=Math.hypot(x1-x0,z1-z0),sp=Math.min(M.busV||20,L/20);return{x0,z0,x1,z1,L,dur:L/sp,t0:performance.now(),y:(M.busY||85),live:true}}
function busJump(){if(!me.bus)return;me.bus=0;me.glide=1;me.y=BUS?BUS.y-7:me.y;me.vy=0;beep(520,.25,'sine');hud()}
function busTick(dt){if(!BUS||!go){busM.visible=busM2.visible=false;return}const f=Math.max(0,Math.min(1,(last-BUS.t0)/1000/BUS.dur)),bx=BUS.x0+(BUS.x1-BUS.x0)*f,bz=BUS.z0+(BUS.z1-BUS.z0)*f;
 busM.visible=f<1;busM.position.set(bx,BUS.y,bz);busM.rotation.y=Math.atan2(BUS.x1-BUS.x0,BUS.z1-BUS.z0);busM2.visible=f<1&&gm===2;busM2.position.set(BUS.x1+(BUS.x0-BUS.x1)*f,BUS.y,BUS.z1+(BUS.z0-BUS.z1)*f);busM2.rotation.y=Math.atan2(BUS.x0-BUS.x1,BUS.z0-BUS.z1);BUS.live=f<1;
 if(me.bus){const mb=myBusM();me.x=mb.position.x;me.z=mb.position.z;me.y=BUS.y;if(f>=1&&!me.out){feed('The Battle Bus kicked you off!');busJump()}}
 if(me.glide&&!me.out){const lk=!!document.pointerLockElement,fw=lk?(held_('fwd')?1:0)-(held_('back')?1:0):0,sd=lk?(held_('right')?1:0)-(held_('left')?1:0):0,
   swY=MAPS[mapIdx].wl!=null?MAPS[mapIdx].wl-1.25:-1e9,gnd=Math.max(groundAt(me.x,me.z,me.y),swY);if(me.glide===1&&me.y-gnd<40){me.glide=2;beep(330,.3,'triangle')}
  const hs=me.glide===1?17:11,vs=me.glide===1?(fw>0?-26:-16):(fw>0?-7:-4.5);
  if(fw||sd){const k2=hs*dt/Math.hypot(fw,sd),dx=(-Math.sin(me.yaw)*fw+Math.cos(me.yaw)*sd)*k2,dz=(-Math.cos(me.yaw)*fw-Math.sin(me.yaw)*sd)*k2;if(!blocked(me.x+dx,me.z,me.y))me.x+=dx;if(!blocked(me.x,me.z+dz,me.y))me.z+=dz}
  const py=me.y;me.y+=vs*dt;const g2=Math.max(groundAt(me.x,me.z,Math.max(py,me.y)),swY);if(me.y<=g2){me.y=g2;me.vy=0;me.glide=0;beep(160,.15,'triangle')}}}
const vm=new THREE.Group(),vg=[];vm.position.set(.26,-.24,-.45);cam.add(vm);
for(let i=0;i<NWP;i++){const g=makeGun(i,0);g.visible=false;vm.add(g);vg.push(g)}
for(const i in HOLDFP){const h=HOLDFP[i];vg[i].rotation.set(h[0],h[1],h[2]);vg[i].position.set(h[3],h[4],h[5])}
const flashM=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,.12),new THREE.MeshBasicMaterial({color:0xffdd66}));flashM.position.set(0,.02,-1);flashM.visible=false;vm.add(flashM);
const fpA=new THREE.Group();vm.add(fpA);
function limb(a,b,w,c){const d=new V().subVectors(b,a),m=new THREE.Mesh(new THREE.BoxGeometry(w,w,d.length()),L(c));m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(new V(0,0,1),d.normalize());fpA.add(m)}
const FPH=[[[.01,-.12,-.01],[-.05,-.15,-.08]],[[.01,-.14,-.2],[-.02,-.115,-.5]],[[.01,-.09,.04],[-.02,-.12,-.42]],[[.01,-.09,.08],[-.02,-.11,-.5]]],FPHI=[0,1,2,3,0,0,0,0,0,0,0,0,0,1,0,2,0,0,1,0,0,0,0,0];
function fpArms(i){fpA.children.slice().forEach(m=>{fpA.remove(m);m.geometry.dispose();m.material.dispose()});const s=SK[me.sk]||SK[0],[rh,lh]=FPH[FPHI[i]||0].map(p=>new V(...p)),hv=new V(0,.025,-.06),sv=new V(0,-.01,.04);
 limb(rh.clone().add(sv),new V(.22,-.5,.42),.105,s.sh);limb(rh.clone().sub(hv),rh.clone().add(hv),.085,s.sk);
 limb(lh.clone().add(sv),new V(-.36,-.44,.2),.105,s.sh);limb(lh.clone().sub(hv),lh.clone().add(hv),.085,s.sk)}

// aim-down-sights: field of view per weapon (only the sniper gets the big scope) and how much aiming tightens spread
const ADSFOV=[58,54,64,22,58,75,75,56,75,75,58,50,75,60,75,75,75,58,56,75,75,75,75,75],ADSSP=[.4,.4,.7,0,.4,1,1,.4,1,1,.4,.3,1,1,1,1,1,.4,.5,1,1,1,1,1];
const curSpread=()=>WP[me.w].s*(me.zoom?ADSSP[me.w]:1)*(typeof rarS==='function'?rarS():1);
const WP=[{n:'Pistol',d:28,r:.3,p:1,s:.002,a:0,k:.02,f:700,mag:12,rl:1.4},{n:'Rifle',d:14,r:.09,p:1,s:.006,a:1,k:.012,f:480,mag:30,rl:2.0},{n:'Shotgun',d:10,r:.85,p:10,s:.13,a:0,k:.07,f:260,mag:6,rl:2.6},{n:'Sniper',d:80,r:1.1,p:1,s:.012,a:0,k:.09,f:180,mag:5,rl:2.8},
 {n:'Glock',d:26,r:.17,p:1,s:.006,a:0,k:.02,f:760,mag:17,rl:1.3},{n:'Racket',d:40,r:.5,p:1,s:0,a:0,k:0,f:420,mag:1,rl:0,kind:'melee',inf:1,rng:2.7},{n:'Tennis balls',d:20,r:.16,p:1,s:0,a:1,k:0,f:900,mag:1,rl:0,kind:'proj',inf:1},
 {n:'Six-shooter',d:34,r:.32,p:1,s:.005,a:0,k:.04,f:560,mag:6,rl:2.2},{n:'Whip',d:30,r:.6,p:1,s:0,a:0,k:0,f:1200,mag:1,rl:0,kind:'melee',inf:1,rng:7,lash:1},
 {n:'Ninja stars',d:20,r:.24,p:1,s:0,a:1,k:0,f:1300,mag:1,rl:0,kind:'proj',inf:1},{n:'Silent pistol',d:24,r:.24,p:1,s:.005,a:0,k:.015,f:1800,mag:15,rl:1.5,q:1},
 {n:'Ray gun',d:26,r:.3,p:1,s:.003,a:0,k:.02,f:1500,mag:10,rl:2,tw:1,rng:4000,tc:0x3aff8a},{n:'Longsword',d:90,r:.95,p:1,s:0,a:0,k:0,f:300,mag:1,rl:0,kind:'melee',inf:1,rng:3.2},
 {n:'Crossbow',d:10,r:.5,p:1,s:0,a:0,k:0,f:500,mag:1,rl:0,kind:'proj',inf:1},{n:'Corn grenades',d:60,r:1.4,p:1,s:0,a:0,k:0,f:300,mag:1,rl:0,kind:'proj',inf:1},
 {n:'Pitchforks',d:20,r:.65,p:1,s:0,a:0,k:0,f:340,mag:1,rl:0,kind:'proj',inf:1},{n:'Baguette',d:1,r:.4,p:1,s:0,a:0,k:0,f:600,mag:1,rl:0,kind:'melee',inf:1,rng:2.4},
 {n:'Pistol',d:50,r:3,p:1,s:.002,a:0,k:.06,f:520,mag:6,rl:1.6},{n:'SMG',d:11,r:.07,p:1,s:.016,a:1,k:.008,f:640,mag:30,rl:1.9},{n:'Pickaxe',d:20,r:.55,p:1,s:0,a:1,k:0,f:300,mag:1,rl:0,kind:'melee',inf:1,rng:2.4},
 {n:'Grenade',d:75,r:.8,p:1,s:0,a:0,k:0,f:300,mag:1,rl:0,kind:'nade',inf:1},{n:'Bandages',d:0,r:.3,p:1,s:0,a:0,k:0,f:600,mag:1,rl:0,kind:'use',inf:1},{n:'Shield Potion',d:0,r:.3,p:1,s:0,a:0,k:0,f:600,mag:1,rl:0,kind:'use',inf:1},
 {n:_d('Hpmefo!Cbu'),d:9999,r:.45,p:1,s:0,a:1,k:0,f:240,mag:1,rl:0,kind:'melee',inf:1,rng:2.8}];
// powerup vending machines: E buys (costs kill coins), Q uses the held powerup
const PU={heal:{n:'Heal',c:1},cloak:{n:'Cloak',c:2},speed:{n:'Speed',c:1},shield:{n:'Shield',c:2}},PUL=['heal','cloak','speed','shield'],vends=[],vms=[];
const SHG=new THREE.SphereGeometry(1.45,22,14),SHM=new THREE.MeshBasicMaterial({color:0x5ab8ff,transparent:true,opacity:.2,depthWrite:false});let lastCt=0,invOn=false;
function vTex(t){const c=document.createElement('canvas');c.width=256;c.height=300;const g=c.getContext('2d'),K={heal:['#0f3d2a','#4fd18b','HEAL'],cloak:['#231a4d','#9b8cff','CLOAK'],speed:['#4a2608','#ffa53a','SPEED'],shield:['#0d2a4d','#5ab8ff','SHIELD']}[t];
 g.fillStyle=K[0];g.fillRect(0,0,256,300);g.strokeStyle=K[1];g.lineWidth=8;g.strokeRect(6,6,244,288);g.fillStyle=K[1];
 g.font='bold 40px Arial';g.textAlign='center';g.fillText(K[2],128,58);
 if(t==='heal'){g.fillRect(108,90,40,110);g.fillRect(73,125,110,40)}else if(t==='cloak'){g.beginPath();g.ellipse(128,150,64,36,0,0,7);g.stroke();g.beginPath();g.arc(128,150,17,0,7);g.fill()}
 else if(t==='speed'){g.beginPath();g.moveTo(140,82);g.lineTo(86,160);g.lineTo(124,160);g.lineTo(110,218);g.lineTo(170,132);g.lineTo(132,132);g.closePath();g.fill()}
 else{g.beginPath();g.moveTo(128,84);g.lineTo(182,104);g.quadraticCurveTo(182,180,128,214);g.quadraticCurveTo(74,180,74,104);g.closePath();g.fill();g.fillStyle=K[0];g.fillRect(122,110,12,72);g.fillRect(100,134,56,12)}
 g.fillStyle=K[1];g.font='bold 30px Arial';g.fillText(PU[t].c+' COIN'+(PU[t].c>1?'S':''),128,250);g.font='20px Arial';g.fillText('press E',128,282);return new THREE.CanvasTexture(c)}
function buildVend(M){vms.forEach(m=>scene.remove(m));vms.length=0;vends.length=0;
 (M.v||[]).forEach(v=>{const f=v[2],pm=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.5),new THREE.MeshBasicMaterial({map:vTex(v[3])})),dx=[0,1,0,-1][f],dz=[1,0,-1,0][f];
  pm.position.set(v[0]+dx*.58,(v[4]||0)+1.45,v[1]+dz*.58);pm.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][f];scene.add(pm);vms.push(pm);vends.push({x:v[0],z:v[1],t:v[3]})})}

// ---------- openable doors (E key) ----------
function mkDoors(M){doors=[];const bs=[];(M.DR||[]).forEach((d,i)=>{const t=d.al?[d.w+.1,.16]:[.16,d.w+.1],b=[d.x,d.z,t[0],t[1],d.y+2.4,d.y,0,'o'];b.t=[b[4],b[5]];bs.push(b);doors.push(Object.assign({},d,{b,o:0,i,a:0}))});return bs}
function tdoor(d,st,remote){if(st===undefined)st=d.o?0:1;if(!!st===!!d.o)return;d.o=st?1:0;d.b[4]=st?-500:d.b.t[0];d.b[5]=st?-501:d.b.t[1];const dm=world&&world.userData.dm;
 const t0=performance.now(),f0=d.a||0,f1=st?-1.5:0,tw=()=>{const u=Math.min(1,(performance.now()-t0)/260);d.a=f0+(f1-f0)*u;if(dm)setDoorM(dm[0],dm[1],d.i,d,d.a);if(u<1)requestAnimationFrame(tw)};tw();
 beep(st?180:140,.12,'triangle');if(!remote)send({t:'door',i:d.i,o:d.o})}
function nearDoor(){let b=null,bd=2.6;for(const d of doors){const q=Math.hypot(me.x-d.x,me.z-d.z);if(q<bd&&Math.abs(me.y-d.y)<1.6){bd=q;b=d}}return b&&{d:b,q:bd}}
function nearVend(){let b=null,bd=2.8;for(const v of vends){const d=Math.hypot(me.x-v.x,me.z-v.z);if(d<bd){bd=d;b=v}}return b}
const held=()=>me.items[me.sel]>0?me.sel:PUL.find(t=>me.items[t]>0)||null,cost=t=>ELIM()?1:PU[t].c,holdN=()=>PUL.reduce((a,t)=>a+(me.items[t]|0),0),nHeld=()=>PUL.filter(t=>me.items[t]>0).length;
function buy(){const v=nearVend();if(!v||me.out)return;const c=cost(v.t);
 if(gm===0&&holdN()>0){feed('You can only hold one powerup',1);return}
 if(me.coins<c){feed('Need '+c+' coin'+(c>1?'s':'')+' to buy '+PU[v.t].n,1);beep(150,.15);return}
 me.coins-=c;me.items[v.t]++;if(gm===0||!(me.items[me.sel]>0))me.sel=v.t;feed('Bought '+PU[v.t].n+' - press '+pretty(BIND.power)+' to use');beep(800,.1,'sine');hud()}
function usePU(){const t=held();if(!t||me.out)return;
 if(t==='heal'){const mh=typeof maxHP==='function'?maxHP():100;if(me.hp>=mh){feed('Already at full health',1);return}me.hp=Math.min(mh,me.hp+60);feed('Healed +60');beep(660,.2,'sine')}
 else if(t==='cloak'){if(me.cloak>0){feed('Already cloaked',1);return}me.cloak=15;feed('Cloak active for 15 seconds');beep(300,.4,'sine')}
 else if(t==='speed'){if(me.spd>0){feed('Speed boost already active',1);return}me.spd=12;feed('Speed boost for 12 seconds');beep(900,.25,'square')}
 else{if(me.sh>=50){feed('Shield already full',1);return}me.sh=50;feed('Shield up: blocks the next 50 damage');beep(500,.35,'triangle')}
 me.items[t]--;hud()}
function cyclePU(){const a=PUL.filter(t=>me.items[t]>0);if(a.length<2)return;me.sel=a[(a.indexOf(held())+1)%a.length];hud()}



const status=t=>$('status').textContent=t;
function invUI(hl){PUL.forEach(t=>{const e=$('iv-'+t);if(!e)return;const n=me.items[t]|0;e.classList.toggle('empty',!n);e.classList.toggle('on',n>0&&t===hl);e.querySelector('i').textContent=n?'\u00d7'+n:'';e.querySelector('em').textContent=t===hl&&n?pretty(BIND.power):''})}
const hud=()=>{$('pucoin').textContent=me.coins;const hl=held(),act=[me.cloak>0?'CLOAKED '+Math.ceil(me.cloak)+'s':'',me.spd>0?'SPEED '+Math.ceil(me.spd)+'s':'',me.sh>0?'SHIELD '+Math.ceil(me.sh):''].filter(Boolean).join(' \u00b7 ');$('put').textContent=act||(hl?pretty(BIND.power)+' use'+(nHeld()>1?' \u00b7 '+pretty(BIND.cycle)+' switch':''):'buy at vending machines');$('pu').classList.toggle('has',!!hl||!!act);invUI(hl);$('hpt').textContent=Math.ceil(me.hp)+(me.sh>0?' +'+Math.ceil(me.sh):'');{const e=$('shf');if(e)e.style.width=Math.min(100,me.sh*(typeof LOOT==='function'&&LOOT()?1:2))+'%'}const f=$('hpf'),mh=typeof maxHP==='function'?maxHP():100;f.style.width=Math.min(100,Math.max(0,me.hp/mh*100))+'%';f.style.background=me.hp>mh*.5?'var(--gn)':me.hp>mh*.25?'var(--ac)':'var(--rd)';
 $('lb').innerHTML=roster().sort((a,b)=>b.kills-a.kills).map(e=>'<div class="'+(e===me?'me':'')+(e.out?' out':'')+'"><i style="background:'+(SQ()?TCOL[e.tm|0]:'#'+hex(SK[e.sk||0].sh))+'"></i>'+e.name+'<b>'+e.kills+'</b></div>').join('');hudW()};
function hudW(){if(typeof lootHud==='function'&&lootHud())return;const L=typeof LO==='function'?LO():[0,1,2,3];[...$('wl').children].forEach((d,j)=>{const i=L[j];if(i==null)return;d.classList.toggle('on',i==me.w);d.firstChild.textContent=pretty(BIND['w'+(j+1)]);d.lastChild.textContent=WP[i].inf?'\u221e':(me.rl>0&&me.rw===i?'\u2026':me.ammo[i])+'/'+WP[i].mag})}
function setW(i){if(i!==me.w&&me.rl>0){me.rl=0;me.rw=-1}me.w=i;me.zoom=false;vg.forEach((g,n)=>g.visible=n==i);fpArms(i);hud()}
function feed(t,bad){const d=document.createElement('div');d.textContent=t;if(bad)d.className='bad';$('feed').appendChild(d);setTimeout(()=>d.remove(),4000)}
// ---- visual sound effects: arrows around the crosshair pointing at nearby footsteps and gunfire ----
const VAS='<svg viewBox="0 0 40 40"><ellipse cx="14" cy="24" rx="5" ry="8" fill="#fff"/><circle cx="14" cy="12" r="3" fill="#fff"/><ellipse cx="27" cy="18" rx="5" ry="8" fill="#fff"/><circle cx="27" cy="6.5" r="3" fill="#fff"/></svg>',
 VAG='<svg viewBox="0 0 40 40"><path d="M20 2 L25 14 L20 11 L15 14 Z" fill="#ffb347"/><rect x="16" y="14" width="8" height="18" rx="2" fill="#ffb347"/><path d="M8 30 L14 26 M32 30 L26 26 M20 38 L20 34" stroke="#ffb347" stroke-width="3"/></svg>';
const vaEl={},vaShots=[];
function vaPos(el,x,z,R0,op){const dx=x-me.x,dz=z-me.z,sy=Math.sin(me.yaw),cy=Math.cos(me.yaw),fw=-dx*sy-dz*cy,rt=dx*cy-dz*sy,a=Math.atan2(rt,fw);
 el.style.transform='translate(-50%,-50%) translate('+(Math.sin(a)*R0).toFixed(1)+'px,'+(-Math.cos(a)*R0).toFixed(1)+'px) rotate('+a.toFixed(3)+'rad)';el.style.opacity=op.toFixed(2);el.style.display=''}
function vaShot(x,z){const d=Math.hypot(x-me.x,z-me.z);if(d<2.5||d>110)return;const el=document.createElement('div');el.className='va g';el.innerHTML=VAG;$('va').appendChild(el);vaShots.push({el,x,z,t:performance.now(),d})}
function vaTick(){const box=$('va'),on=!!go&&!me.out;box.style.display=on?'':'none';const now=performance.now();
 for(const id in vaEl)if(!players[id]){vaEl[id].remove();delete vaEl[id]}
 for(const p of Object.values(players)){let el=vaEl[p.id];const r=p.rt,d=Math.hypot(r.x-me.x,r.z-me.z),hear=on&&p.seen&&!p.out&&!mate(p)&&!r.inv&&!r.ns&&(p.spd||0)>1.2&&d<26&&d>1.2&&!(p.R.g.visible&&false);
  if(!hear){if(el)el.style.display='none';continue}if(!el){el=vaEl[p.id]=document.createElement('div');el.className='va s';el.innerHTML=VAS;box.appendChild(el)}
  vaPos(el,r.x,r.z,118,Math.max(.25,1-d/26)*(.75+.25*Math.sin(now/90)))}
 for(let i=vaShots.length-1;i>=0;i--){const q=vaShots[i],a=(now-q.t)/1000;if(a>1.5||!on){q.el.remove();vaShots.splice(i,1);continue}vaPos(q.el,q.x,q.z,150,Math.max(.3,1-q.d/110)*(a<1?1:(1.5-a)*2))}}
const DN=[];function dmgNum(p,d,hs){const el=document.createElement('div');el.className='dn'+(hs?' hs':'');el.textContent=Math.round(d);$('dmgn').appendChild(el);const r=p.rt;DN.push({el,p:new V(r.x+(Math.random()-.5)*.6,r.y+2.3,r.z+(Math.random()-.5)*.6),t:performance.now()})}
const _dv=new V();function dmgTick(){const now=performance.now();for(let i=DN.length-1;i>=0;i--){const n=DN[i],a=(now-n.t)/1000;if(a>1.1){n.el.remove();DN.splice(i,1);continue}_dv.copy(n.p);_dv.y+=a*.8;_dv.project(cam);if(_dv.z>1){n.el.style.display='none';continue}n.el.style.display='';n.el.style.transform='translate(-50%,-50%) translate('+((_dv.x+1)/2*innerWidth).toFixed(1)+'px,'+((1-_dv.y)/2*innerHeight).toFixed(1)+'px) scale('+(a<.12?1.5-a*4:1).toFixed(2)+')';n.el.style.opacity=a<.75?1:Math.max(0,(1.1-a)/.35)}}
function hm(hs){const h=$('hm');h.className=hs?'hs':'';h.style.transition='none';h.style.opacity=1;requestAnimationFrame(()=>{h.style.transition='opacity .3s';h.style.opacity=0})}
const flash=()=>{$('hit').style.opacity=1;setTimeout(()=>$('hit').style.opacity=0,80)};
function banner(t,win,roy){const b=$('banner');b.className=roy?'roy':'';b.style.display=t?'flex':'none';if(t){if(roy){b.innerHTML='<div>'+t+'</div><small>'+(SQ()?'LAST SQUAD STANDING':'LAST ONE STANDING')+'</small>';b.style.color=''}else{b.textContent=t;b.style.color=win?'#4fd18b':'#e5534b'}}}

let ac;function beep(f,d,t){try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.type=t||'square';o.frequency.setValueAtTime(f,ac.currentTime);o.frequency.exponentialRampToValueAtTime(40,ac.currentTime+d);g.gain.setValueAtTime(.05,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
const tracerMaterial=new THREE.LineBasicMaterial({color:0xffdd55});
const TRM={};function tracer(a,b,c){const g=new THREE.BufferGeometry().setFromPoints([a,b]),l=new THREE.Line(g,c?(TRM[c]||(TRM[c]=new THREE.LineBasicMaterial({color:c}))):tracerMaterial);scene.add(l);setTimeout(()=>{scene.remove(l);g.dispose()},70)}

function rayBoxDistance(o,d,minX,minY,minZ,maxX,maxY,maxZ){
 let tmin=0,tmax=120;
 let inv,ta,tb;
 if(Math.abs(d.x)<1e-8){if(o.x<minX||o.x>maxX)return Infinity}
 else{inv=1/d.x;ta=(minX-o.x)*inv;tb=(maxX-o.x)*inv;if(ta>tb){const q=ta;ta=tb;tb=q}tmin=Math.max(tmin,ta);tmax=Math.min(tmax,tb);if(tmax<tmin)return Infinity}
 if(Math.abs(d.y)<1e-8){if(o.y<minY||o.y>maxY)return Infinity}
 else{inv=1/d.y;ta=(minY-o.y)*inv;tb=(maxY-o.y)*inv;if(ta>tb){const q=ta;ta=tb;tb=q}tmin=Math.max(tmin,ta);tmax=Math.min(tmax,tb);if(tmax<tmin)return Infinity}
 if(Math.abs(d.z)<1e-8){if(o.z<minZ||o.z>maxZ)return Infinity}
 else{inv=1/d.z;ta=(minZ-o.z)*inv;tb=(maxZ-o.z)*inv;if(ta>tb){const q=ta;ta=tb;tb=q}tmin=Math.max(tmin,ta);tmax=Math.min(tmax,tb);if(tmax<tmin)return Infinity}
 return tmin>=0?tmin:tmax;
}


// ---------- players ----------
function tag(n){const c=document.createElement('canvas');c.width=256;c.height=64;const g=c.getContext('2d');g.font='bold 34px Arial';g.textAlign='center';g.lineWidth=6;g.strokeStyle='#000';g.fillStyle='#fff';g.strokeText(n,128,44);g.fillText(n,128,44);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false,transparent:true}));s.scale.set(2.4,.6,1);s.renderOrder=6;return s}
function addP(id,name){if(players[id])return players[id];const R=mkRobot(),hb=new THREE.Mesh(new THREE.PlaneGeometry(1,.1),new THREE.MeshBasicMaterial({color:0x4fd18b,depthTest:false})),tg=tag(name);hb.renderOrder=5;hb.visible=tg.visible=false;scene.add(R.g,hb,tg);
 return players[id]={id,name,R,hb,tg,rt:{x:0,y:0,z:0,yaw:0,pitch:0,w:0,hp:100,inv:0},sk:0,kills:0,deaths:0,seen:0,ph:0}}
function delP(id){const p=players[id];if(!p)return;scene.remove(p.R.g,p.hb,p.tg);delete players[id]}
// last-line safety: if a spot is somehow blocked (or would put you inside something), walk outwards to the nearest clear patch of ground
let lastSp=null;
function safeSpot(x,z){const ok=(a,b)=>{const y=Hf(a,b);return !blocked(a,b,y)&&groundAt(a,b,y+.1)<y+.05&&!near(a,b).some(q=>fo(q,a,b)&&q[5]<y+2.6&&q[4]>y+1.8)};if(ok(x,z))return[x,z];
 for(let r=1;r<=30;r+=1)for(let k=0;k<16;k++){const a=x+Math.cos(k/16*6.283)*r,b=z+Math.sin(k/16*6.283)*r;if(ok(a,b))return[a,b]}return[x,z]}
// dynamic crosshair: the gap matches the real bullet spread; the shotgun gets a ring like Fortnite's
let adsT=0,xhK='';
function xhair(hide){const c=$('cross');if(hide||me.out){if(xhK!=='h'){c.style.display='none';xhK='h'}return}
 const f=(innerHeight/2)/Math.tan(cam.fov*Math.PI/360),g=Math.max(4,Math.round(f*curSpread())),sg=me.w===2,key=g+'|'+sg;if(key===xhK)return;xhK=key;c.style.display='';c.classList.toggle('sg',sg);
 const[t,b,l,r,o]=['t','b','l','r','o'].map(q=>c.querySelector('.'+q));t.style.top=-(g+7)+'px';b.style.top=g+'px';l.style.left=-(g+7)+'px';r.style.left=g+'px';o.style.width=o.style.height=(2*g)+'px';o.style.left=o.style.top=(-g)+'px'}
const SDEF={look:1,ads:1,scope:1};let SENS=Object.assign({},SDEF);try{const q=JSON.parse(localStorage.getItem('crossfire-sens')||'{}');for(const a in SDEF)if(typeof q[a]==='number'&&q[a]>0)SENS[a]=q[a]}catch(e){}
const saveS=()=>{try{localStorage.setItem('crossfire-sens',JSON.stringify(SENS))}catch(e){}};
function sensUI(){['look','ads','scope'].forEach(a=>{const i=$('sn-'+a);if(!i)return;i.value=SENS[a];$('sv-'+a).textContent=SENS[a].toFixed(2)+'x';i.oninput=()=>{SENS[a]=+i.value;$('sv-'+a).textContent=SENS[a].toFixed(2)+'x';saveS()}})}
function respawn(){me.cloak=me.spd=me.sh=0;let s=spawns[0],bd=-1;
 if(ELIM()&&MAPS[mapIdx].br){const ids=roster().map(e=>e.id).sort(),i=Math.max(0,ids.indexOf(me.id)),ring=spawns.filter(q=>Math.hypot(q[0],q[1])>45).sort((a,b)=>Math.atan2(a[1],a[0])-Math.atan2(b[1],b[0])),L=ring.length?ring:spawns;s=L[Math.floor(i*L.length/Math.max(1,ids.length))%L.length]}
 else{// pick randomly among the safer half of the spawns: away from enemies, not where you just died, not the last spawn
  const sc=spawns.map(c=>{let dm=1e9;for(const p of Object.values(players))if(p.seen)dm=Math.min(dm,Math.hypot(c[0]-p.rt.x,c[1]-p.rt.z));return[c,dm]});
  let cand=sc.filter(([c,dm])=>c!==lastSp&&dm>14&&Math.hypot(c[0]-me.x,c[1]-me.z)>18);if(cand.length<3)cand=sc.filter(([c])=>c!==lastSp);if(!cand.length)cand=sc;
  cand.sort((a,b)=>b[1]-a[1]);cand=cand.slice(0,Math.max(3,Math.ceil(cand.length*.5)));s=cand[Math.random()*cand.length|0][0]}
 lastSp=s;s=safeSpot(s[0],s[1]);
 me.x=s[0];me.z=s[1];me.y=Hf(me.x,me.z);me.vy=0;me.hp=typeof maxHP==='function'?maxHP():100;me.sta=100;me.tired=0;me.sdel=0;me.ammo=WP.map(w=>w.mag);me.rl=0;me.rw=-1;if(typeof loadoutSync==='function')loadoutSync(1);me.yaw=Math.atan2(s[0],s[1]);me.pitch=0;hud()}
function botSpawn(){const b=players.bot;if(!b)return;const c=spawns.filter(s=>Math.hypot(s[0]-me.x,s[1]-me.z)>15),s0=c[Math.random()*c.length|0]||spawns[0],s=safeSpot(s0[0],s0[1]);Object.assign(b.rt,{x:s[0],y:Hf(s[0],s[1]),z:s[1],yaw:Math.atan2(me.x-s[0],me.z-s[1]),hp:100,w:0});b.dead=0;b.seen=1}
function loadMap(i){mapIdx=i;const M=ensureMap(i);if(world){scene.remove(world);dispose(world)}world=mkWorld(M);scene.add(world);boxes=M.B.filter(b=>!b[8]).concat(mkDoors(M));{const e=Math.max(300,Math.max(M.rbx||0,M.rb||M.bnd||M.sz||66)+60);BG.cs=M.bgcs||4;BG.o=-e;BG.n=Math.ceil(2*e/BG.cs)}buildBG();BND=M.bnd||0;RBX=M.rbx||M.rb||0;RBZ=M.rbz||M.rb||0;cam.far=M.far||420;cam.updateProjectionMatrix();STC=null;spawns=M.sp;Hf=M.H;lamps.forEach(l=>scene.remove(l));lamps=lights(scene,M,52,2048);
 if(skyM)scene.remove(skyM);skyM=mkSky(M);scene.add(skyM);scene.fog.color.set(M.sky[1]);scene.fog.far=M.fog;scene.fog.near=M.fogN||30;ren.toneMappingExposure=M.ex;buildVend(M);if(typeof lootMap==='function')lootMap();if(typeof perfWorld==='function')perfWorld();mapImg(i);if(typeof carsReset==='function')carsReset();respawn();if(go&&players.bot)botSpawn();renderLobby()}
// ---------- battle royale: storm, spectating, elimination ----------
// phases: wait (seconds), shrink (seconds), target radius, damage per second outside
const SPH=[{w:35,s:35,r:105,d:2},{w:25,s:30,r:70,d:4},{w:20,s:25,r:38,d:7},{w:15,s:20,r:14,d:10},{w:10,s:15,r:0,d:15}];
const stK=()=>MAPS[mapIdx].stS||1,R0=()=>190*stK();
// storm circles: every phase picks a random new centre inside the current circle (like Fortnite), from a seed the host shares
let stSeed=1,STC=null;
function stormPlan(){const k=stK(),M=MAPS[mapIdx],rr=rng((stSeed>>>0)||1),lim=M.rb?M.rb-40:(M.sz||66)-6;let cx=0,cz=0,r=190*k;const C=[[0,0,r]];
 SPH.forEach(p=>{const nr=p.r*k,off=Math.max(0,r-nr);let nx=cx,nz=cz;for(let i=0;i<60;i++){const a=rr()*6.283,d=Math.sqrt(rr())*off,x=cx+Math.cos(a)*d,z=cz+Math.sin(a)*d;
   if(Math.abs(x)>(M.rbx?M.rbx-60:lim)||Math.abs(z)>(M.rbz?M.rbz-60:lim))continue;if(M.wl!=null&&nr<60&&M.H(x,z)<M.wl+.8)continue;nx=x;nz=z;break}cx=nx;cz=nz;r=nr;C.push([cx,cz,r])});return C}
function zoneNow(){const k=stK(),TT=MAPS[mapIdx].stT||1;if(!STC)STC=stormPlan();if(!stormT0)return{r:190*k,x:0,z:0,d:0,stt:'wait',left:0};let t=(performance.now()-stormT0)/1000;
 for(let i=0;i<SPH.length;i++){const p=SPH[i],a=STC[i],b=STC[i+1],nx={nr:b[2],nx:b[0],nz:b[1]};const pw=p.w*TT,ps=p.s*TT;if(t<pw)return Object.assign({r:a[2],x:a[0],z:a[1],d:p.d,stt:'wait',left:pw-t},nx);t-=pw;
  if(t<ps){const f=t/ps;return Object.assign({r:a[2]+(b[2]-a[2])*f,x:a[0]+(b[0]-a[0])*f,z:a[1]+(b[1]-a[1])*f,d:p.d,stt:'shrink',left:ps-t},nx)}t-=ps}
 const L=STC[STC.length-1];return{r:0,x:L[0],z:L[1],d:SPH[SPH.length-1].d,stt:'final',left:0}}
const fmt=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')},alive=()=>Object.values(players).filter(p=>p.id!=='bot'&&!p.out&&p.seen);
function specTarget(){const a=alive();if(!a.length)return null;let p=spec&&players[spec];if(!p||p.out||!p.seen){p=a.find(mate)||a[0];spec=p.id}return p}
function specNext(d){const a=alive();if(!a.length)return;const i=a.findIndex(p=>p.id===spec);spec=a[(i+d+a.length)%a.length].id}
function specCam(){const t=specTarget();if(!t){cam.position.set(me.x,me.y+28,me.z+22);cam.lookAt(me.x,me.y,me.z);return}
 const q=t.R.g.position,yw=t.rt.yaw,hd=new V(q.x,q.y+1.9,q.z),dir=new V(q.x+Math.sin(yw)*4.6,q.y+3.2,q.z+Math.cos(yw)*4.6).sub(hd),len=dir.length();dir.normalize();
 const dist=Math.max(.6,Math.min(len,wallDist(hd,dir)-.5));cam.position.copy(hd).addScaledVector(dir,dist);cam.lookAt(hd)}
function sbText(z){let t;if(ELIM()){const al=roster().filter(e=>!e.out);t=SQ()?'SQUADS \u00b7 '+al.filter(e=>(e.tm|0)===(me.tm|0)).length+' v '+al.filter(e=>(e.tm|0)!==(me.tm|0)).length+' ALIVE':'BATTLE ROYALE \u00b7 '+al.length+' ALIVE';
  if(go&&BUS&&BUS.live)t+=' \u00b7 BATTLE BUS';else if(go&&stormT0&&z)t+=' \u00b7 '+(z.r>=R0()-5?'STORM IN '+fmt(z.left):z.stt==='wait'?'NEXT RING IN '+fmt(z.left):z.stt==='shrink'?'STORM CLOSING '+fmt(z.left):'FINAL STORM')+(z.d&&z.r<R0()-5?' \u00b7 '+z.d+' dmg/s':'')}
 else t='FREE-FOR-ALL \u00b7 first to '+LIM+' kills';$('sbs').textContent=t}
function brTick(dt){const br=ELIM()&&go,z=br?zoneNow():null,act=br&&stormT0>0;
 stormM.visible=act&&z.r<R0()-5;if(stormM.visible){const rr=Math.max(z.r,.5);stormM.scale.set(rr,1,rr);stormM.position.x=z.x;stormM.position.z=z.z;stormM.material.opacity=.22+.07*Math.sin(performance.now()/260)}
 let inS=0;
 if(act&&!ending&&!me.out&&!me.bus){const d=Math.hypot(me.x-z.x,me.z-z.z);if(d>z.r){inS=1;me.hp-=z.d*dt;
   
   tk-=dt;if(tk<=0){tk=.25;hud()}if(me.hp<=0){me.hp=0;die('storm')}}}
 $('stormfx').style.opacity=inS;
 const hv=me.out?'hidden':'';$('hp').style.visibility=$('wl').style.visibility=$('pu').style.visibility=hv;
 sbAcc+=dt;if(sbAcc>.25){sbAcc=0;sbText(z);mmStats(z)}
 const sp=$('spec');if(br&&me.out){const t=specTarget();sp.style.display='block';sp.textContent=t?'SPECTATING '+t.name+'   \u00b7   click or \u2190 \u2192 to switch':'ELIMINATED'}else sp.style.display='none'}
let brT=0;const brAlive=()=>roster().filter(e=>!e.out);
function checkBR(){if(!isHost||!ELIM()||!go||ending)return;clearTimeout(brT);brT=setTimeout(()=>{if(!isHost||!ELIM()||!go||ending)return;const all=roster(),al=brAlive();
 if(SQ()){const tA=[0,1].filter(t=>al.some(e=>(e.tm|0)===t)),tAll=[0,1].filter(t=>all.some(e=>(e.tm|0)===t));  if((tAll.length>1&&tA.length<=1)||(tAll.length===1&&!al.length)){const e={t:'end',w:tA.length?'T'+tA[0]:null};send(e);handle(e)}return}
 if((all.length>1&&al.length===1)||(all.length>1&&!al.length)||(all.length===1&&!al.length)){const e={t:'end',w:al.length===1?al[0].id:null};send(e);handle(e)}},1200)}
function die(k,hs){if(typeof lootDie==='function')lootDie();me.life=(me.life||0)+1;if(typeof carLeave==='function')carLeave(1);const d={t:'d',v:me.id,k,hs,n:me.life};send(d);death(d);if(!ELIM())diedMsg(k);
 if(ELIM()){me.out=1;me.hp=0;const kp=k&&players[k];spec=kp&&!kp.out?k:null;banner('ELIMINATED',0);setTimeout(()=>{if(!ending)banner()},2200)}else respawn();hud()}
// ---------- combat ----------
function hitP(p,o,d,mx){mx=mx||120;const r=p.rt,k=r.ck?.68:1,body=rayBoxDistance(o,d,r.x-.42,r.y,r.z-.42,r.x+.42,r.y+1.55*k,r.z+.42),head=rayBoxDistance(o,d,r.x-.27,r.y+1.55*k,r.z-.27,r.x+.27,r.y+2.12*k,r.z+.27);
 if(head<body&&head<mx)return{d:head,hs:true};return body<mx?{d:body,hs:false}:null}
function terr(o,d,max){for(let t=1;t<max;t+=1.2)if(o.y+d.y*t<Hf(o.x+d.x*t,o.z+d.z*t)){let a=t-1.2,b=t;for(let i=0;i<5;i++){const m=(a+b)/2;if(o.y+d.y*m<Hf(o.x+d.x*m,o.z+d.z*m))b=m;else a=m}return b}return max}
let RST=1;
function wallDist(o,d,mx){let best=mx||120;if(!BG.c){for(const b of boxes){const t=rayBoxDistance(o,d,b[0]-b[2]/2,b[5],b[1]-b[3]/2,b[0]+b[2]/2,b[4],b[1]+b[3]/2);if(t<best)best=t}return Math.min(best,terr(o,d,best))}
 // walk the grid cells the ray passes through, nearest first, and stop once a hit is closer than the next cell
 const st=++RST,cs=BG.cs,n=BG.n;let i=Math.floor((o.x-BG.o)/cs),j=Math.floor((o.z-BG.o)/cs);const sx=d.x>0?1:-1,sz=d.z>0?1:-1,tdx=d.x?Math.abs(cs/d.x):1e9,tdz=d.z?Math.abs(cs/d.z):1e9;
 let tx=d.x?((i+(sx>0?1:0))*cs+BG.o-o.x)/d.x:1e9,tz=d.z?((j+(sz>0?1:0))*cs+BG.o-o.z)/d.z:1e9,t0=0;
 for(let k=0,kn=Math.max(200,Math.ceil(best/cs)*2+4);k<kn&&t0<best;k++){if(i>=0&&j>=0&&i<n&&j<n){const L=BG.c[j*n+i];if(L)for(const b of L){if(b.rs===st)continue;b.rs=st;const t=rayBoxDistance(o,d,b[0]-b[2]/2,b[5],b[1]-b[3]/2,b[0]+b[2]/2,b[4],b[1]+b[3]/2);if(t<best)best=t}}
  if(tx<tz){t0=tx;tx+=tdx;i+=sx}else{t0=tz;tz+=tdz;j+=sz}}
 return Math.min(best,terr(o,d,best))}
function reload(){if(!go||ending||me.out||me.rl>0)return;const W=WP[me.w];if(W.inf)return;if(me.ammo[me.w]>=W.mag)return;me.rl=me.rlT=W.rl*(typeof rarRL==='function'?rarRL():1);me.rw=me.w;me.zoom=false;beep(260,.08,'triangle');hudW()}
function shoot(){const W=WP[me.w];if(!go||ending||me.cd>0||me.out||me.rl>0||me.car)return;if(W.kind){me.cd=W.r;special(W);hudW();return}if(me.ammo[me.w]<=0){reload();return}me.cd=W.r;me.ammo[me.w]--;const o=typeof tpOrigin==='function'?tpOrigin():cam.position,fw=new V();cam.getWorldDirection(fw);const sp=curSpread(),bl=[],rgt=new V().setFromMatrixColumn(cam.matrixWorld,0),upv=new V().setFromMatrixColumn(cam.matrixWorld,1);
 for(let i=0;i<W.p;i++){const d=fw.clone();if(sp){const rr=sp*Math.sqrt(W.p>1?(i+Math.random())/W.p:Math.random()),aa=W.p>1?i*2.39996+Math.random()*.6:Math.random()*6.283;d.addScaledVector(rgt,Math.cos(aa)*rr).addScaledVector(upv,Math.sin(aa)*rr).normalize()}
  if(typeof bulletFire==='function')bl.push(bulletFire(me.w,o,d))}
 send({t:'bl',w:me.w,b:bl,q:W.q?1:0});beep(W.f,.12);
 if(me.ammo[me.w]<=0)reload();hudW();kick=.08;fT=.05;me.pitch=Math.min(1.5,me.pitch+W.k*.5)}
// deal damage to another player (or the practice bot) and tell them
function hitPlayer(p,d,hs){hm(hs);dmgNum(p,d,hs);if(p.id==='bot'){const b=p;b.rt.hp=Math.max(0,b.rt.hp-d);if(b.rt.hp<=0&&!b.dead){b.dead=1;death({t:'d',v:'bot',k:me.id,hs});setTimeout(botSpawn,300)}}else{const hmsg={t:'h',to:p.id,d,hs};if(isHost){hmsg.f=me.id;links.forEach(l=>l.pid===p.id&&l.open&&l.send(hmsg))}else send(hmsg)}}
function dmg(m){if(!go||me.hp<=0||ending||me.out)return;if(SQ()&&!m.nk&&m.f&&m.f!==me.id&&teamOf(m.f)===(me.tm|0))return;{let d=m.d;if(me.sh>0){const a=Math.min(me.sh,d);me.sh-=a;d-=a;if(me.sh<=0)feed('Shield broken',1)}me.hp-=d}flash();beep(120,.2,'sawtooth');if(me.hp<=0)die(m.f,m.hs);hud()}
const seenD=new Set();
function death(m){if(m.n!=null){const key=m.v+':'+m.n;if(seenD.has(key))return;seenD.add(key)}if(isHost&&typeof carDrop==='function')carDrop(m.v);const v=st(m.v),kl=st(m.k);if(v){if(ELIM()&&v.out)return;v.deaths++;if(ELIM())v.out=1}if(isHost)setTimeout(lob,50);if(kl&&m.k!==m.v)kl.kills++;if(m.k===me.id&&!(typeof LOOT==='function'&&LOOT())){me.coins+=2;feed('+2 coins for the elimination')}
 feed((m.k==='storm'?'The storm':m.k==='lava'?'Lava':(kl?kl.name:'?'))+' eliminated '+(v?v.name:'?')+(m.hs?' (headshot)':''),m.v===me.id);hud();
 if(isHost&&!ending){if(ELIM())checkBR();else if(kl&&kl.kills>=LIM){const e={t:'end',w:kl.id};send(e);handle(e)}}}
function diedMsg(k){const kl=k&&k!=='storm'?st(k):null,d=$('died');d.innerHTML='<div>YOU DIED</div><small>'+(k==='storm'?'Caught in the storm':k==='lava'?'Burned in the lava':kl?'Eliminated by '+kl.name:'Eliminated')+'</small>';d.style.display='flex';d.style.opacity=1;clearTimeout(d._t);d._t=setTimeout(()=>{d.style.opacity=0;setTimeout(()=>d.style.display='none',400)},2200)}
function newMatch(){const ss=(Math.random()*4294967295)>>>0;send({t:'new',ss});doNew(ss)}
function doNew(ss){stSeed=ss||((Math.random()*4294967295)>>>0);STC=null;BUS=null;me.bus=0;me.glide=0;doors.forEach(d=>d.o&&tdoor(d,0,1));roster().forEach(e=>{e.kills=e.deaths=0;e.out=0});me.coins=0;me.ct=0;me.items={heal:0,cloak:0,speed:0,shield:0};me.sel='heal';me.cloak=me.spd=me.sh=0;me.out=0;spec=null;ending=false;banner();stormT0=ELIM()?performance.now():0;if(typeof carsReset==='function')carsReset();respawn();if(ELIM()&&MAPS[mapIdx].br){BUS=busPlan();me.bus=1;stormT0=BUS.t0+BUS.dur*1000}if(typeof lootReset==='function')lootReset();if(players.bot)botSpawn();hud()}
// ---------- networking: host relays for up to 8 players ----------
const PX='crossfire-',AL='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
// ===== WebRTC networking (no PeerJS / no PeerServer) =====
// Trystero handles peer discovery/signaling; game traffic uses direct WebRTC data channels.
const TRYSTERO_APP='crossfire-online-webrtc-v3';
let RTC_CFG={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'},{urls:'stun:stun.cloudflare.com:3478'}],iceCandidatePoolSize:4};
// Free fallback: use public STUN only. This allows direct WebRTC connections
// where the players' networks permit them, but it cannot relay traffic like TURN.
// No Metered API key or paid TURN service is required for this mode.
let turnLoaded=false;
async function loadMeteredTURN(){
 if(turnLoaded)return;
 turnLoaded=true;
 console.info('Crossfire is using STUN-only WebRTC; some restricted networks may need TURN.');
}
let room=null,wire=null;
const rtcOK=()=>{if(window.RTCPeerConnection&&window.trysteroReady)return true;status('WebRTC is not available on this Chromebook.');return false};
function linkFor(peerId){let lk=links.find(x=>x.peerId===peerId);if(lk)return lk;lk={peerId,pid:null,get open(){try{return !!room&&!!room.getPeers()[peerId]}catch(e){return false}},send:o=>{if(room&&wire)wire.send(o,{target:peerId})},close:()=>{}};links.push(lk);return lk}
async function startRoom(code){await loadMeteredTURN();return window.trysteroReady.then(({joinRoom})=>{room=joinRoom({appId:TRYSTERO_APP,rtcConfig:RTC_CFG},code);wire=room.makeAction('crossfire-game');room.onPeerJoin=peerId=>{const lk=linkFor(peerId);if(!isHost)wire.send({t:'hi',sk:me.sk,name:me.name,cid:CID},{target:peerId})};room.onPeerLeave=peerId=>{const lk=links.find(x=>x.peerId===peerId);if(lk){const wasHost=hostLink===lk;drop(lk);if(wasHost&&!isHost){leave();status('The host left the lobby.')}}};wire.onMessage=(m,{peerId})=>{try{recv(m,linkFor(peerId))}catch(e){console.error(e)}};return room})}
function send(m){m.f=me.id;if(isHost)links.forEach(l=>l.pid&&l.open&&l.send(m));else if(hostLink&&hostLink.open)hostLink.send(m)}
function lob(){if(isHost){if(!VOTEON)VOTE.c=[];else if(!VOTE.c.length||VOTE.mode!==gm)rollVote()}send({t:'lob',vo:VOTEON?1:0,vc:VOTE.c,vv:VOTE.v,vm:VOTE.mode,m:mapIdx,mode:gm,go,p:roster().map(e=>[e.id,e.sk,e.name,e.kills,e.deaths,e.out?1:0,e.tm|0])});renderLobby();hud()}
function recv(m,lk){if(isHost){if(m.t==='hi'){join(m,lk);return}m.f=lk.pid;if(!m.f)return;if(m.t==='cseat'){if(typeof carSeatReq==='function')carSeatReq(m.f,m.i,m.s);return}if(m.t==='sk'){const e=st(m.f);if(e)e.sk=m.sk;lob();return}if(m.t==='vote'){if(!go&&VOTE.c.includes(m.i)){VOTE.v[m.f]=m.i;lob()}return}if(m.t==='lq'){if(typeof lootReq==='function')lootReq(m);return}if(m.t==='h'){if(m.to===me.id)handle(m,lk);else links.forEach(l=>l.pid===m.to&&l.open&&l.send(m));return}links.forEach(l=>l!==lk&&l.pid&&l.open&&l.send(m))}handle(m,lk)}
let CID='';try{CID=sessionStorage.getItem('cf_cid')||'';if(!CID){CID=Math.random().toString(36).slice(2,10)+Date.now().toString(36);sessionStorage.setItem('cf_cid',CID)}}catch(e){CID=Math.random().toString(36).slice(2,12)}
const KICKED=new Set();
function join(m,lk){if(!lk)return;const cid=String(m.cid||'').slice(0,40);
 if(KICKED.has(lk.peerId)||(cid&&KICKED.has(cid))){lk.send({t:'kick'});return}
 // the same connection saying hello again: don't add them twice, just re-send their id
 if(lk.pid&&players[lk.pid]){lk.send({t:'welcome',id:lk.pid});lob();return}
 // the same player coming back on a new connection (refresh / reconnect): remove the stale copy first
 if(cid){const old=links.find(l=>l!==lk&&l.cid===cid&&l.pid);if(old){const op=players[old.pid];links=links.filter(l=>l!==old);if(typeof carDrop==='function')carDrop(old.pid);if(op)delP(old.pid);try{old.close&&old.close()}catch(e){}}}
 lk.cid=cid;if(roster().length>=MAXP){lk.send({t:'full'});return}lk.pid=String(nextId++);const tm=nTeam(0)<=nTeam(1)?0:1,p=addP(lk.pid,m.name||'Player');p.sk=m.sk|0;p.tm=tm;if(go&&ELIM())p.out=1;lk.send({t:'welcome',id:lk.pid});if(!links.includes(lk))links.push(lk);lob();feed(p.name+' joined')}
function drop(lk){links=links.filter(l=>l!==lk);if(lk.pid&&typeof carDrop==='function')carDrop(lk.pid);if(lk.pid&&players[lk.pid]){feed(players[lk.pid].name+' left',1);delP(lk.pid);if(isHost)lob();checkBR()}}
function handle(m,lk){switch(m.t){case'welcome':me.id=m.id;hostLink=lk||hostLink;respawn();break;case'full':status('That game is full (8 players).');leave();break;case'kick':leave();step('main');status('You were kicked from the lobby by the host.');break;case'lob':{const ids=m.p.map(e=>e[0]);Object.keys(players).forEach(id=>{if(id!=='bot'&&!ids.includes(id))delP(id)});m.p.forEach(e=>{if(e[0]===me.id){me.kills=e[3];me.deaths=e[4];if(e[5])me.out=1;me.tm=e[6]|0}else{const p=addP(e[0],e[2]);p.sk=e[1];p.kills=e[3];p.deaths=e[4];p.out=!!e[5];p.tm=e[6]|0}});{const was=go;go=m.go;if(!isHost&&!was&&go)setTimeout(autoJoin,0)}gm=m.mode|0;if(m.vo!=null)VOTEON=!!m.vo;if(m.vc){VOTE.c=m.vc;VOTE.v=m.vv||{};VOTE.mode=m.vm|0}if(m.m!==mapIdx)loadMap(m.m);renderLobby();hud();break}case'p':{const p=players[m.f];if(p){Object.assign(p.rt,m);p.seen=1}break}case's':m.l.forEach(s=>tracer(new V(s[0],s[1],s[2]),new V(s[3],s[4],s[5]),m.c));if(m.l[0]&&!m.q&&!mate(players[m.f]))vaShot(m.l[0][0],m.l[0][2]);if(!m.q)beep(200,.08);break;case'pj':if(typeof pjMsg==='function')pjMsg(m);break;case'bl':if(typeof bulletMsg==='function')bulletMsg(m);break;case'lt':if(typeof lootMsg==='function')lootMsg(m);break;case'c':{const p=st(m.f);if(p&&p!==me)chatMsg(p.name,String(m.x||'').slice(0,90),p.sk);break}case'h':if(m.to===me.id)dmg(m);break;case'd':death(m);break;case'end':{ending=true;const w=st(m.w);if(SQ()){const wt=m.w==null?-1:+String(m.w).slice(1);if(wt===(me.tm|0))banner('SQUAD VICTORY',1,1);else banner(wt>=0?TNM[wt].toUpperCase()+' WINS':'NO SURVIVORS',0)}else if(gm===1){if(m.w===me.id)banner('VICTORY ROYALE',1,1);else banner(w?w.name+' WINS':'NO SURVIVORS',0)}else banner(m.w===me.id?'VICTORY':(w?w.name:'?')+' WINS',m.w===me.id);if(isHost)setTimeout(()=>{if(!ending)return;if(ELIM()){go=0;send({t:'lobby'});toLobby();lob()}else{newMatch()}},ELIM()?7000:6000);break}case'door':{const d=doors[m.i];if(d)tdoor(d,m.o,1);break}case'new':doNew(m.ss);break;case'lobby':toLobby();break;case'cocc':case'cs':case'call':if(typeof carMsg==='function')carMsg(m);break}}
function hostGame(){isHost=true;me.id='h';const code=Array.from({length:4},()=>AL[Math.random()*AL.length|0]).join('');if(!rtcOK())return;status('Opening WebRTC lobby...');startRoom(code).then(()=>{$('big').textContent=code;step('lobby');status('Lobby ready. Share the 4-letter code.');renderLobby()}).catch(e=>{console.error(e);status('Could not start the WebRTC lobby. This network may block the signaling relay. Try Manual connect.');isHost=false})}
function leave(){BUS=null;me.bus=0;me.glide=0;try{room&&room.leave()}catch(e){}try{mpc&&mpc.close()}catch(e){}room=null;wire=null;mpc=null;links=[];hostLink=null;Object.keys(players).forEach(delP);go=0;isHost=false;practice=false;ending=false;banner();me.id='h';me.tm=0;me.kills=me.deaths=me.coins=0;me.ct=0;me.items={heal:0,cloak:0,speed:0,shield:0};me.out=0;spec=null;stormT0=0;gm=0;if(typeof carsReset==='function')carsReset();if(MAPS[mapIdx].br)loadMap(lastFFA);step('main');hud()}
$('host').onclick=()=>{$('big').textContent='....';step('lobby');hostGame()};
$('join').onclick=()=>{const code=$('code').value.trim().toUpperCase();if(code.length!==4){status('Enter the 4-letter code.');return}if(!rtcOK())return;status('Finding lobby '+code+'...');isHost=false;startRoom(code).then(()=>{const wait=performance.now();const timer=setInterval(()=>{if(hostLink){clearInterval(timer);$('big').textContent=code;step('lobby');status('Connected to the host. Waiting for the match to start.');renderLobby()}else if(performance.now()-wait>18000){clearInterval(timer);status('No host found. Check the code or try Manual connect.')}},200)}).catch(e=>{console.error(e);status('Could not join the WebRTC lobby. This network may block the signaling relay.')})};
$('prac').onclick=()=>{practice=true;isHost=true;me.id='h';gm=0;if(MAPS[mapIdx].br)loadMap(lastFFA);const b=addP('bot','Practice Bot');b.sk=1;$('big').textContent='SOLO';step('lobby');status('Practice: the bot runs around and shoots back. Pick a map and press Start.');lob()};
// manual connect: no matchmaking server, copy/paste two codes
let mmode;
const enc=d=>btoa(JSON.stringify(d)),dec=s=>JSON.parse(atob(s.trim()));
function rawWire(dc){const lk={get open(){return dc.readyState==='open'},send:o=>dc.send(JSON.stringify(o)),close:()=>dc.close()};if(isHost)links.push(lk);else hostLink=lk;dc.onopen=()=>{if(!isHost)lk.send({t:'hi',sk:me.sk,name:me.name,cid:CID});$('big').textContent='----';step('lobby');status('Connected.');renderLobby()};dc.onmessage=e=>{try{recv(JSON.parse(e.data),lk)}catch(x){console.error(x)}};dc.onclose=()=>isHost?drop(lk):(leave(),status('The host left.'))}
const gathered=()=>new Promise(r=>{if(mpc.iceGatheringState==='complete')r();else mpc.onicegatheringstatechange=()=>mpc.iceGatheringState==='complete'&&r();setTimeout(r,7000)});
async function manual(mode){practice=false;mmode=mode;isHost=mode==='h';step('man');
 if(!rtcOK())return;
 await loadMeteredTURN();
 mpc=new RTCPeerConnection(RTC_CFG);
 $('mt').textContent=isHost?'1. Send this code to your friend:':'1. Paste the host\'s code:';
 $('mt2').textContent=isHost?'2. Paste the reply code they send back:':'2. Send this reply code back to the host:';
 $('mb').textContent=isHost?'Connect':'Create reply code';$('m1').readOnly=!isHost?true:true;
 if(isHost){rawWire(mpc.createDataChannel('g'));mpc.createOffer().then(o=>mpc.setLocalDescription(o)).then(gathered).then(()=>{$('m1').value=enc(mpc.localDescription);status('Send your code, then paste the reply.')})}
 else{mpc.ondatachannel=e=>rawWire(e.channel);$('m1').readOnly=false;$('m1').value='';$('m2').readOnly=true;status('Paste the host code, then click Create reply code.')}}
$('mh').onclick=()=>manual('h');$('mj').onclick=()=>manual('j');
$('mb').onclick=async()=>{try{if(mmode==='h'){await mpc.setRemoteDescription(dec($('m2').value));status('Connecting...')}
 else{await mpc.setRemoteDescription(dec($('m1').value));await mpc.setLocalDescription(await mpc.createAnswer());await gathered();$('m2').value=enc(mpc.localDescription);status('Send the reply code to the host.')}}catch(e){status('That code is not valid.')}};


// ---------- menus: steps, lobby, carousels ----------
function step(n){cur=n;['main','lobby','man'].forEach(s=>$('s-'+s).classList.toggle('on',s===n))}
// ---------- map voting: 3 maps for the current mode, everyone (host included) gets one vote ----------
const VOTE={c:[],v:{},mode:-1};let VOTEON=true;try{VOTEON=localStorage.getItem('cf_vote')!=='0'}catch(e){}
function rollVote(){const L=MAPS.map((M,i)=>i).filter(i=>gm===2?SQM(MAPS[i]):!SQM(MAPS[i])&&!!MAPS[i].br===(gm===1));for(let i=L.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[L[i],L[j]]=[L[j],L[i]]}VOTE.c=L.slice(0,3);VOTE.v={};VOTE.mode=gm}
function castVote(i){if(go)return;if(isHost){VOTE.v[me.id]=i;lob()}else{VOTE.v[me.id]=i;send({t:'vote',i});renderLobby()}}
function voteWinner(){const n={};VOTE.c.forEach(i=>n[i]=0);Object.entries(VOTE.v).forEach(([id,i])=>{if(n[i]!=null&&(id===me.id||players[id]))n[i]++});const mx=Math.max(...Object.values(n)),top=VOTE.c.filter(i=>n[i]===mx);return top[Math.random()*top.length|0]}
function renderVote(){const el=$('vote');if(!el)return;$('vwrap').style.display=go||!VOTE.c.length?'none':'';if(go||!VOTE.c.length)return;const n={};VOTE.c.forEach(i=>n[i]=0);Object.values(VOTE.v).forEach(i=>{if(n[i]!=null)n[i]++});const mine=VOTE.v[me.id];
 el.innerHTML=VOTE.c.map(i=>'<div class="vc'+(mine===i?' on':'')+'" data-i="'+i+'"><img src="'+pic(i)+'"><b>'+MAPS[i].n+'</b><span>'+n[i]+' vote'+(n[i]===1?'':'s')+'</span>'+(mine===i?'<em>YOUR VOTE</em>':'')+'</div>').join('');
 el.querySelectorAll('.vc').forEach(d=>d.onclick=()=>castVote(+d.dataset.i))}
function renderLobby(){renderVote();if(!booted)return;const M=MAPS[mapIdx],rs=roster().filter(e=>e.id!=='bot');{const pk=practice||!VOTEON;$('mc').classList.toggle('pick',pk);if(pk)$('mimg').src=pic(mapIdx);else if(PIC[mapIdx])$('mimg').src=PIC[mapIdx]}$('mn').textContent=M.n;$('md').textContent=M.t;
 {const sl=e=>e?'<div class="slot on'+(SQ()&&isHost&&!go?' mv':'')+'" data-id="'+e.id+'"><i style="background:#'+hex(SK[e.sk||0].sh)+'"></i>'+e.name+(e.id==='h'?' <small>host</small>':'')+(e===me?' <small>you</small>':'')+(isHost&&e!==me&&e.id!=='bot'?'<b class="kick" data-kick="'+e.id+'" title="Kick '+e.name+'">\u2715</b>':'')+'</div>':'<div class="slot">Open slot</div>';
  $('plist').classList.toggle('sq',SQ());if(SQ()){const col=t=>{const L=rs.filter(e=>(e.tm|0)===t);return'<div class="sqc"><h3 style="color:'+TCOL[t]+'">'+TNM[t]+' <small>'+L.length+'/4</small></h3>'+Array.from({length:4},(_,i)=>sl(L[i])).join('')+'</div>'};
   $('plist').innerHTML='<div class="sqw">'+col(0)+col(1)+'</div>'+(isHost&&!go?'<p class="fine">Click a player to move them to the other squad.</p>':'')}
  else $('plist').innerHTML=Array.from({length:MAXP},(_,i)=>sl(rs[i])).join('')}
 $('chmap').style.display=isHost&&(practice||!VOTEON)?'':'none';{const vb=$('vmode');vb.style.display=isHost&&!practice?'':'none';vb.innerHTML='Map choice: <b>'+(VOTEON?'Players vote':'Host picks')+'</b>'}$('mpick').textContent=practice?'':VOTEON?'Everyone votes on 3 maps':'The host picks the map';$('codebar').style.display=practice?'none':'';$('modes').style.display=practice?'none':'';$('modes').classList.toggle('lock',!isHost);$('m-ffa').classList.toggle('on',gm===0);$('m-br').classList.toggle('on',gm===1);$('m-sq').classList.toggle('on',gm===2);
 $('gmt').innerHTML='Share the code with friends<br>'+(gm===2?'Squads &middot; 4 v 4 &middot; last squad standing wins':gm?'Battle Royale &middot; last one standing wins':'Free-for-all &middot; first to 15 kills');const g=$('go');g.textContent=isHost?(go?'Resume':'Start match'):(go?'Join match':'Waiting for host...');g.disabled=!isHost&&!go}
function openCar(title,items,idx,cb){let i=idx;const el=$('car'),tr=$('ctr'),dt=$('cdots');el.style.display='flex';$('ct').textContent=title;
 tr.innerHTML=items.map(x=>'<div class="sl"><img src="'+x.img+'"><b>'+x.n+'</b><span>'+x.t+'</span></div>').join('');dt.innerHTML=items.map(()=>'<u></u>').join('');
 const show=()=>{tr.style.transform='translateX(-'+i*100+'%)';[...dt.children].forEach((d,n)=>d.className=n==i?'on':'')},close=()=>{el.style.display='none';car=null};
 car={prev:()=>{i=(i+items.length-1)%items.length;show()},next:()=>{i=(i+1)%items.length;show()},ok:()=>{close();cb(i)},x:close};[...dt.children].forEach((d,n)=>d.onclick=()=>{i=n;show()});show()}
$('cp').onclick=()=>car&&car.prev();$('cn').onclick=()=>car&&car.next();$('cok').onclick=()=>car&&car.ok();$('cx').onclick=()=>car&&car.x();
addEventListener('keydown',e=>{if(!car)return;if(e.code==='ArrowLeft')car.prev();if(e.code==='ArrowRight')car.next();if(e.code==='Enter')car.ok();if(e.code==='Escape')car.x()});
$('chs1').onclick=$('chs2').onclick=()=>openSkins(i=>{me.sk=i;$('skpic').src=SKP[i];if(typeof loadoutSync==='function')loadoutSync(1);me.hp=Math.min(me.hp,maxHP());if(!go)me.hp=maxHP();fpArms(me.w);if(isHost)lob();else{send({t:'sk',sk:i});hud();renderLobby()}});
$('vmode').onclick=()=>{if(!isHost||practice)return;VOTEON=!VOTEON;try{localStorage.setItem('cf_vote',VOTEON?'1':'0')}catch(e){}VOTE.c=[];VOTE.v={};lob()};
$('chmap').onclick=()=>{const L=MAPS.map((M,i)=>({M,i})).filter(o=>practice?(gm===0||!!o.M.br):gm===2?SQM(o.M):!SQM(o.M)&&!!o.M.br===(gm===1)).sort((a,b)=>(!!b.M.br===(gm===1))-(!!a.M.br===(gm===1)));openCar(practice?'Choose any map':gm===1?'Choose a Battle Royale map':'Choose a free-for-all map',L.map(o=>({img:PIC[o.i]||'',n:o.M.n,t:(o.M.br?'Battle Royale map':'Arena map')+' \u00b7 '+o.M.t})),Math.max(0,L.findIndex(o=>o.i===mapIdx)),i=>{const ni=L[i].i;if(gm===2)lastSQ=ni;else if(gm===1)lastBR=ni;else lastFFA=ni;if(ni!==mapIdx){loadMap(ni);lob();if(go){newMatch()}}});{const c0=Math.max(0,L.findIndex(o=>o.i===mapIdx)),ord=L.map((_,k)=>k).sort((a,b)=>Math.min(Math.abs(a-c0),L.length-Math.abs(a-c0))-Math.min(Math.abs(b-c0),L.length-Math.abs(b-c0)));let q=0;const im=[...document.querySelectorAll('#ctr .sl img')];
 const nx=()=>{if(!car||q>=ord.length)return;const k=ord[q++];if(!PIC[L[k].i]||!im[k].getAttribute('src'))im[k].src=pic(L[k].i);setTimeout(nx,20)};setTimeout(nx,30)}};
function kickPlayer(id){if(!isHost||id===me.id)return;const lk=links.find(l=>l.pid===id),p=players[id];if(!lk&&!p)return;const nm=p?p.name:'Player';
 if(lk){KICKED.add(lk.peerId);if(lk.cid)KICKED.add(lk.cid);try{lk.send({t:'kick'})}catch(e){}links=links.filter(l=>l!==lk);setTimeout(()=>{try{lk.close&&lk.close()}catch(e){}},300)}
 if(typeof carDrop==='function')carDrop(id);delP(id);lob();feed(nm+' was kicked by the host',1);if(go&&ELIM())checkBR()}
function moveTeam(id){if(!isHost||go)return;const e=st(id);if(!e)return;const t=1-(e.tm|0);if(nTeam(t)>=4){status(TNM[t]+' is full (4 players).');return}e.tm=t;lob()}
function hostMode(m){if(!isHost||practice||m===gm)return;if(!MAPS[mapIdx].br)lastFFA=mapIdx;else if(SQM(MAPS[mapIdx]))lastSQ=mapIdx;else lastBR=mapIdx;gm=m;VOTE.c=[];
 if(m===2){if(!SQM(MAPS[mapIdx]))loadMap(SQM(MAPS[lastSQ])?lastSQ:CODYI);const rs=roster();rs.forEach((e,i)=>{if(nTeam(e.tm|0)>4)e.tm=1-(e.tm|0)})}
 else if(m===1){if(!MAPS[mapIdx].br||SQM(MAPS[mapIdx]))loadMap(MAPS[lastBR]&&!SQM(MAPS[lastBR])?lastBR:BRI)}else if(MAPS[mapIdx].br)loadMap(lastFFA);lob();if(go){newMatch()}}
$('m-ffa').onclick=()=>hostMode(0);$('m-br').onclick=()=>hostMode(1);$('m-sq').onclick=()=>hostMode(2);
$('plist').onclick=e=>{const kb=e.target.closest('[data-kick]');if(kb){e.stopPropagation();const p=players[kb.dataset.kick];if(isHost&&p&&confirm('Kick '+p.name+' from the lobby?'))kickPlayer(kb.dataset.kick);return}const d=e.target.closest('[data-id]');if(d&&isHost&&SQ())moveTeam(d.dataset.id)};
$('nm').oninput=()=>{me.name=($('nm').value.trim()||'Player').slice(0,10)};
$('leave').onclick=leave;$('mback').onclick=leave;
function enter(){$('clickplay').style.display='none';$('menu').style.display='none';const ask=()=>{if(!go||document.pointerLockElement)return;$('clickplay').style.display='flex'};try{const p=ren.domElement.requestPointerLock();if(p&&p.catch)p.catch(ask)}catch(e){ask()}setTimeout(ask,600)}
function autoJoin(){if(!go||document.pointerLockElement)return;$('menu').style.display='none';$('clickplay').style.display='flex';try{const p=ren.domElement.requestPointerLock();if(p&&p.catch)p.catch(()=>{})}catch(e){}}
$('clickplay').onclick=()=>enter();document.addEventListener('pointerlockchange',()=>{if(document.pointerLockElement)$('clickplay').style.display='none'});
$('go').onclick=()=>{if(isHost&&!go){if(!practice&&VOTE.c.length&&VOTE.mode===gm){const w=voteWinner();if(w!=null&&w!==mapIdx){if(gm===2)lastSQ=w;else if(gm===1)lastBR=w;else lastFFA=w;loadMap(w)}}VOTE.c=[];go=1;if(practice)botSpawn();lob();newMatch()}if(go)enter()};
// input
addEventListener('keydown',e=>{k[e.code]=true;if(document.pointerLockElement&&act(e.code).length)e.preventDefault()});
addEventListener('keyup',e=>{k[e.code]=false;release(e.code)});
addEventListener('wheel',e=>{if(!document.pointerLockElement)return;const c=e.deltaY>0?'WheelDown':'WheelUp';k[c]=true;press(c);setTimeout(()=>{k[c]=false;release(c)},70)});
addEventListener('contextmenu',e=>e.preventDefault());
addEventListener('mousemove',e=>{if(document.pointerLockElement){const s=.0022*SENS.look*(me.zoom?(cam.fov/75)*(me.w===3?SENS.scope:SENS.ads):1);me.yaw-=e.movementX*s;me.pitch=Math.max(-1.5,Math.min(1.5,me.pitch-e.movementY*s))}});
addEventListener('mousedown',e=>{if(!document.pointerLockElement)return;e.preventDefault();const c='Mouse'+e.button;k[c]=true;press(c)});
addEventListener('mouseup',e=>{const c='Mouse'+e.button;k[c]=false;release(c)});

// ---- quick chat: press / in a match, type, Enter sends to everyone ----
let chatOn=false;
addEventListener('keydown',e=>{if(chatOn){e.stopImmediatePropagation();if(e.key==='Enter'){const t=$('chatin').value.trim().slice(0,90);if(t){send({t:'c',x:t});chatMsg(me.name,t,me.sk)}closeChat()}else if(e.key==='Escape')closeChat();return}
 if(e.code===BIND.chat&&document.pointerLockElement&&go&&!e.repeat){e.preventDefault();e.stopImmediatePropagation();openChat()}},true);
function openChat(){chatOn=true;for(const c in k)k[c]=false;down=false;const i=$('chatin');i.value='';$('chatbox').style.display='flex';setTimeout(()=>i.focus(),0)}
function closeChat(){chatOn=false;$('chatbox').style.display='none';$('chatin').blur()}
function chatMsg(name,t,sk){const d=document.createElement('div'),n=document.createElement('b');n.textContent=name+': ';n.style.color='#'+hex(SK[sk||0].sh);d.append(n,document.createTextNode(t));const L=$('chatlog');L.appendChild(d);while(L.children.length>7)L.firstChild.remove();beep(900,.05,'sine');setTimeout(()=>{d.classList.add('fade');setTimeout(()=>d.remove(),700)},9000)}
document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement){if(window.LINV)return;if(chatOn)closeChat();$('menu').style.display='flex';down=false;renderLobby()}});
addEventListener('keydown',e=>{if(!document.pointerLockElement||e.repeat)return;press(e.code);if(me.out&&ELIM()){if(e.code==='ArrowRight')specNext(1);if(e.code==='ArrowLeft')specNext(-1)}});
addEventListener('blur',()=>{for(const c in k)k[c]=false;down=false});
function press(c){act(c).forEach(a=>{
 if(a==='map'){toggleMap();return}
 if(me.out&&ELIM()){if(a==='fire')specNext(1);if(a==='aim')specNext(-1);return}
 if(a==='use'&&me.bus){busJump();return}
 if(a==='use'&&typeof carUse==='function'&&carUse())return;
 if(a==='use'&&typeof lootUse==='function'&&lootUse())return;
 if(a==='pick'){if(typeof lootSel==='function')lootSel(-1);return}if(a==='drop'){if(typeof lootDropHeld==='function')lootDropHeld();return}
 if(a==='fire'){down=true;fireReq=true}
 else if(a==='aim'){}
 else if(a==='reload')reload();
 else if(a==='use'){const nd=nearDoor(),nv=nearVend();if(nd&&(!nv||nd.q<=Math.hypot(me.x-nv.x,me.z-nv.z)))tdoor(nd.d);else buy()}else if(a==='power')usePU();else if(a==='cycle')cyclePU();
 else if(a==='wnext')cycleW(1);else if(a==='wprev')cycleW(-1);
 else if(a.length===2&&a[0]==='w')slotW(+a[1]-1)})}
function release(c){act(c).forEach(a=>{if(a==='fire')down=false})}
function nameLOS(q,dd){const o=cam.position,d=new V(q.x-o.x,q.y+2.4-o.y,q.z-o.z),L=d.length();d.normalize();return wallDist(o,d)>=L-.5}
function toLobby(){if(isHost){VOTE.c=[]}BUS=null;me.bus=0;me.glide=0;busM.visible=busM2.visible=false;roster().forEach(e=>{e.kills=e.deaths=0;e.out=0});me.coins=0;me.ct=0;me.items={heal:0,cloak:0,speed:0,shield:0};me.sel='heal';me.cloak=me.spd=me.sh=0;me.out=0;spec=null;ending=false;go=0;down=false;stormT0=0;stormM.visible=false;
 mapOpen=false;$('bigmap').style.display='none';banner();for(const c in k)k[c]=false;if(typeof carsReset==='function')carsReset();respawn();if(typeof lootReset==='function')lootReset();if(document.pointerLockElement)document.exitPointerLock();$('menu').style.display='flex';step('lobby');status('Match over. Waiting in the lobby - the host starts the next game.');hud();renderLobby()}
// ---- controls menu ----
let capA=null,capT=0;
function ctlRender(){$('ctlist').innerHTML=ACT.map(a=>a.length===1?'<div class="cg">'+a[0]+'</div>':'<div class="cr"><span>'+a[1]+'</span><button data-a="'+a[0]+'" class="'+(capA===a[0]?'cap':'')+'">'+(capA===a[0]?'Press a key...':pretty(BIND[a[0]]))+'</button></div>').join('')}
function bindTo(code){if(!capA)return;const a=capA,old=BIND[a];if(code)act(code).forEach(o=>{if(o!==a)BIND[o]=old});BIND[a]=code;capA=null;capT=performance.now();saveB();ctlRender();updateKeys();hud()}
$('ctlist').onclick=e=>{const b=e.target.closest('button');if(!b||performance.now()-capT<250)return;capA=b.dataset.a;ctlRender()};
addEventListener('keydown',e=>{if(!capA)return;e.preventDefault();e.stopImmediatePropagation();if(e.code==='Escape'){capA=null;capT=performance.now();ctlRender();return}bindTo(e.code==='Delete'?'':e.code)},true);
$('ctl').addEventListener('mousedown',e=>{if(!capA)return;e.preventDefault();e.stopPropagation();bindTo('Mouse'+e.button)},true);
$('ctl').addEventListener('wheel',e=>{if(!capA)return;e.preventDefault();bindTo(e.deltaY>0?'WheelDown':'WheelUp')},{capture:true,passive:false});
$('ctlb').onclick=()=>{capA=null;ctlRender();sensUI();$('ctl').style.display='flex'};
$('ctdone').onclick=()=>{capA=null;$('ctl').style.display='none'};
$('ctreset').onclick=()=>{BIND=Object.assign({},DEF);saveB();SENS=Object.assign({},SDEF);saveS();sensUI();capA=null;ctlRender();updateKeys();hud()};
function updateKeys(){const p=pretty,B=BIND;$('keys').innerHTML='Move '+[B.fwd,B.left,B.back,B.right].map(p).join('/')+' &middot; Mouse aim &middot; '+p(B.fire)+' fire &middot; '+p(B.aim)+' hold to aim &middot; '+p(B.reload)+' reload &middot; '+p(B.w1)+'-'+p(B.w4)+' or '+p(B.wnext)+'/'+p(B.wprev)+' switch weapon &middot; '+p(B.jump)+' jump &middot; '+p(B.sprint)+' sprint &middot; '+p(B.use)+' buy at vending machines, open doors, get in and out of cars (Squads) &middot; '+p(B.power)+' use powerup &middot; '+p(B.cycle)+' switch powerup (Battle Royale) &middot; '+p(B.map)+' big map &middot; Esc menu. Headshots do double damage. Rebind everything with the Controls button.'}
// ---- minimap ----
let mapOpen=false;const MMC={};
function toggleMap(){mapOpen=!mapOpen;$('bigmap').style.display=mapOpen?'block':'none';if(mapOpen)$('bms').innerHTML=(ELIM()?'Purple = storm &middot; dashed white = next safe zone &middot; ':'')+(vends.length?'+ / C = vending machines':'')+(CARON?' &middot; car shapes = drivable cars (gold outline = someone inside)':'')+(SQ()?' &middot; arrows = your squad':'')+' &middot; press '+pretty(BIND.map)+' to close'}
function mapImg(i){if(MMC[i])return MMC[i];if(MAPS[i].osm&&ensureMap(i)._gc)return MMC[i]=codyMap(MAPS[i]);const M=ensureMap(i),S=M.sz||66,E=M.mapE||S+6,N=M.sz?1024:640,sc=N/(2*E),c=document.createElement('canvas');c.width=c.height=N;const g=c.getContext('2d'),H=M.H,rg=h=>[h>>16&255,h>>8&255,h&255],dk=M.night?.55:1;
 const G=M.mmG||(M.sz?200:170),tc=document.createElement('canvas');tc.width=tc.height=G;const tg=tc.getContext('2d'),im=tg.createImageData(G,G),A=rg(M.gr[0]),Bc=rg(M.gr[1]);
 for(let j=0;j<G;j++)for(let q=0;q<G;q++){const x=(q+.5)/G*2*E-E,z=(j+.5)/G*2*E-E,y=H(x,z),dx=(H(x+2,z)-y)/2,dz=(H(x,z+2)-y)/2,t=Math.min(1,Math.max(0,y/7)),sh=Math.max(.6,Math.min(1.4,1-(dx*.5+dz*.3)*.9)),o=(j*G+q)*4,cl=!M.tcol&&Math.max(Math.abs(x),Math.abs(z))>S,tq=M.tcol?M.tcol(x,z,y,Math.abs(dx)*1.5+Math.abs(dz)*1.5):null;
  for(let n=0;n<3;n++)im.data[o+n]=Math.min(255,(tq?tq[n]*255*(y<(M.wl??-99)?1/sh:1):cl?[96,100,106][n]:A[n]+(Bc[n]-A[n])*t)*sh*dk*.85);im.data[o+3]=255}
 tg.putImageData(im,0,0);g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(tc,0,0,N,N);
 M.D.forEach(d=>{if(d[0]!=='ig')return;const cx=(d[1]+E)*sc,cy=(d[3]+E)*sc,r=d[4]*sc;g.fillStyle='rgba(206,226,240,.95)';g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.strokeStyle='rgba(112,150,182,.6)';g.lineWidth=Math.max(1,r*.022);
  for(let k=1;k<4;k++){g.beginPath();g.arc(cx,cy,r*k/4,0,7);g.stroke()}for(let k=0;k<16;k++){const a=k/16*6.283;g.beginPath();g.moveTo(cx+Math.cos(a)*r*.25,cy+Math.sin(a)*r*.25);g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);g.stroke()}g.lineWidth=Math.max(2.5,r*.07);g.strokeStyle='#5f87a8';g.beginPath();g.arc(cx,cy,r,0,7);g.stroke()});
 if(M.rdmap){g.lineCap='butt';['j','k','u','a'].forEach(k=>(M.RD||[]).forEach(q=>{if(q[5]!==k)return;g.strokeStyle=k=='a'?'#55585c':k=='u'?'#c9c4b8':k=='k'?'#6e7074':'#b8a07a';g.lineWidth=Math.max(1,q[4]*sc);g.beginPath();g.moveTo((q[0]+E)*sc,(q[1]+E)*sc);g.lineTo((q[2]+E)*sc,(q[3]+E)*sc);g.stroke()}))}
 const bs=M.B.filter(b=>b[7]!=='n'&&!b[10]&&(!M.rdmap||!b[8])&&b[4]-H(b[0],b[1])>.8).sort((p,q)=>p[4]-q[4]);
 bs.forEach(b=>{const w=Math.max(b[2]*sc,1.4),d=Math.max(b[3]*sc,1.4),px=(b[0]+E)*sc-w/2,py=(b[1]+E)*sc-d/2,kk=(1+Math.min(.3,(b[4]-H(b[0],b[1]))/120))*dk,[r,gg,bb]=rg(b[9]??b[6]);g.fillStyle='rgb('+Math.min(255,r*kk|0)+','+Math.min(255,gg*kk|0)+','+Math.min(255,bb*kk|0)+')';g.fillRect(px,py,w,d);if(w>6&&d>6){g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=1;g.strokeRect(px+.5,py+.5,w-1,d-1)}});
 const circ=(x,y,r)=>{g.beginPath();g.arc(x,y,r,0,7);g.fill()};
 M.D.forEach(d=>{const t=d[0],px=(d[1]+E)*sc,py=(d[3]+E)*sc;
  if(t==='l'){g.fillStyle='rgba(54,128,58,.92)';circ(px,py,2.7*d[4]*sc)}else if(t==='p'){g.fillStyle='rgba(28,92,66,.95)';circ(px,py,2.3*d[4]*sc)}
  else if(t==='k'){const[r,gg,bb]=rg(d[6]);g.fillStyle='rgb('+(r*dk*1.05|0)+','+(gg*dk*1.05|0)+','+(bb*dk*1.05|0)+')';circ(px,py,d[4]*1.05*sc)}else if(t==='d'){g.fillStyle='#3a2c20';circ(px,py,1.3*sc)}else if(t==='pm'){g.fillStyle='rgba(40,120,52,.95)';circ(px,py,2.6*d[4]*sc)}else if(t==='cn'){g.fillStyle='rgba(150,190,70,.7)';g.fillRect(px-.4*sc,py-.4*sc,.8*sc,.8*sc)}else if(t==='bu'){g.fillStyle=d[5]<1?'#f2c230':'#e0402e';circ(px,(d[2]+E)*sc,Math.max(1.2,.6*sc))}});
 return MMC[i]=c}
function drawMap(cv,i,vx,vz,R,rot,mk){const g=cv.getContext('2d'),W=cv.width,M=MAPS[i],E=M.mapE||(M.sz||66)+6,s=W/2/R,u=W/416,yw=rot?mk.yaw:0,co=Math.cos(yw),si=Math.sin(yw);
 g.setTransform(1,0,0,1,0,0);g.fillStyle=M.night?'#04070b':'#0b1218';g.fillRect(0,0,W,W);
 g.save();g.translate(W/2,W/2);g.rotate(yw);g.scale(s,s);g.translate(-vx,-vz);g.drawImage(mapImg(i),-E,-E,2*E,2*E);
 const z=ELIM()&&go&&stormT0?zoneNow():null;
 if(z&&z.r<E*1.5){const r=Math.max(z.r,.01);g.beginPath();g.rect(-E*6,-E*6,E*12,E*12);g.moveTo(z.x+r,z.z);g.arc(z.x,z.z,r,0,Math.PI*2);g.fillStyle='rgba(140,70,255,.45)';g.fill('evenodd');g.lineWidth=2.5/s;g.strokeStyle='#d2aaff';g.beginPath();g.arc(z.x,z.z,r,0,Math.PI*2);g.stroke();
  if(z.nr!==undefined&&z.nr<z.r-.5){g.setLineDash([7/s,5/s]);g.strokeStyle='#fff';g.lineWidth=2/s;g.beginPath();g.arc(z.nx,z.nz,Math.max(z.nr,.01),0,Math.PI*2);g.stroke();g.setLineDash([])}}
 if(ELIM()&&go&&BUS&&BUS.live){g.setLineDash([7/s,5/s]);g.strokeStyle='#ffffff';g.lineWidth=2.5/s;g.beginPath();g.moveTo(BUS.x0,BUS.z0);g.lineTo(BUS.x1,BUS.z1);g.stroke();g.setLineDash([]);g.fillStyle='#2f6fd8';g.strokeStyle='#fff';g.beginPath();g.arc(busM.position.x,busM.position.z,6/s,0,7);g.fill();g.stroke();if(gm===2){g.fillStyle='#e8553a';g.beginPath();g.arc(busM2.position.x,busM2.position.z,6/s,0,7);g.fill();g.stroke()}}
 g.restore();
 const toS=(x,zz)=>{const dx=x-vx,dz=zz-vz;return[W/2+s*(dx*co-dz*si),W/2+s*(dx*si+dz*co)]};
 (M.v||[]).forEach(v=>{if(v[3]!=='heal')return;const[px,py]=toS(v[6]??v[0],v[7]??v[1]);if(px<-10||py<-10||px>W+10||py>W+10)return;const c=6*u;[['#2fbf72',-1,-1],['#8a6cff',0,-1],['#ff9a2e',-1,0],['#3fa0ff',0,0]].forEach(([col,a,b])=>{g.fillStyle=col;g.fillRect(px+a*c,py+b*c,c,c)});g.strokeStyle='#fff';g.lineWidth=1.5*u;g.strokeRect(px-c,py-c,2*c,2*c)});
 if(typeof drawMapExtras==='function')drawMapExtras(g,toS,s,u,W,rot,yw);
 const[mx,my]=toS(mk.x,mk.z);g.save();g.translate(mx,my);g.rotate(rot?0:-mk.yaw);
 g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.moveTo(0,0);g.arc(0,0,34*u,-Math.PI/2-.65,-Math.PI/2+.65);g.closePath();g.fill();
 g.fillStyle='#fff';g.strokeStyle='#0a1016';g.lineWidth=2*u;g.beginPath();g.moveTo(0,-9*u);g.lineTo(6.5*u,7*u);g.lineTo(0,3.5*u);g.lineTo(-6.5*u,7*u);g.closePath();g.fill();g.stroke();g.restore();
 if(rot){const rr=W/2-13*u,nx=W/2+rr*Math.sin(yw),ny=W/2-rr*Math.cos(yw);g.fillStyle='rgba(10,16,22,.85)';g.beginPath();g.arc(nx,ny,9*u,0,7);g.fill();g.fillStyle='#fff';g.font='bold '+(11*u)+'px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('N',nx,ny+.5*u)}}
function drawMini(){if(mapOpen&&!document.pointerLockElement){mapOpen=false;$('bigmap').style.display='none'}if(!go)return;
 const t=me.out&&ELIM()?specTarget():null,mk=t?{x:t.R.g.position.x,z:t.R.g.position.z,yaw:t.rt.yaw}:{x:me.x,z:me.z,yaw:me.yaw};
 drawMap($('mmc'),mapIdx,mk.x,mk.z,ELIM()?(MAPS[mapIdx].mmR||64):46,true,mk);if(mapOpen)drawMap($('bmc'),mapIdx,0,0,MAPS[mapIdx].mapE||(MAPS[mapIdx].sz||66)+6,false,mk)}
function mmStats(z){$('mm').style.display=go?'block':'none';if(!go)return;const br=ELIM();$('mm1').textContent=me.kills;$('mm1l').textContent='ELIMS';let t='';
 if(br){$('mm2').textContent=roster().filter(e=>!e.out).length;$('mm2l').textContent='ALIVE';if(stormT0&&z)t=z.r>=R0()-5?'STORM IN '+fmt(z.left):z.stt==='wait'?'NEXT RING '+fmt(z.left)+' \u00b7 '+z.d+' DMG/S':z.stt==='shrink'?'CLOSING '+fmt(z.left)+' \u00b7 '+z.d+' DMG/S':'FINAL STORM'}
 else{$('mm2').textContent='#'+(roster().sort((a,b)=>b.kills-a.kills).indexOf(me)+1);$('mm2l').textContent='RANK';t='FIRST TO '+LIM+' ELIMS'}
 $('mmz').textContent=t;$('mmz').style.display=t?'':'none'}
// ---------- main loop ----------
let last=performance.now(),acc=0;
let booted=false;function pic(i){if(!PIC[i]){try{PIC[i]=snapMap(MAPS[i].lazy?genMap(THEMES[i],1):MAPS[i])}catch(e){console.error(e);PIC[i]=''}}return PIC[i]}
// warm map previews one at a time after start-up so the lobby never waits long
function warmPics(i){i=i||0;if(i>=MAPS.length)return;setTimeout(()=>{if(!go)pic(i);warmPics(i+1)},go?4000:700)}
function boot(){try{PIC=[];booted=true;SKP=SK.map((s,i)=>snapSkin(i));$('skpic').src=SKP[0]}catch(e){console.error(e)}
 updateKeys();lastFFA=1;loadMap(1);warmPics(0);setW(0);hud();last=performance.now();requestAnimationFrame(loop);const ld=$('loader');if(ld){ld.classList.add('done');setTimeout(()=>ld.remove(),600)}}
function loop(t){requestAnimationFrame(loop);try{frame(t)}catch(e){console.error(e)}}
function menuCam(t){const M=MAPS[mapIdx],R=M.city?110:M.mcR||(M.sz||66)*.82,a=t*.00005+.6,C0=M.mcC||[0,0],x=C0[0]+Math.sin(a)*R,z=C0[1]+Math.cos(a)*R;cam.position.set(x,M.city?92:Math.max(Hf(x,z),Hf(x*.5,z*.5))+Math.max(24,R*.42),z);{const C0=M.mcC||[0,0];cam.lookAt(C0[0],M.city?20:Hf(C0[0],C0[1])+3,C0[1])}}
let hudVis;
let FRC=0;function frame(t){const dt=Math.max(0,Math.min(.05,(t-last)/1000));last=t;if(world&&world.userData.fm&&(FRC=(FRC+1)%6)==0){const p=cam.position;for(const m of world.userData.fm){const s=m.geometry.boundingSphere;m.visible=p.distanceTo(s.center)<s.radius+60}}if(hudVis!==!!go){hudVis=!!go;$('hud').style.visibility=go?'':'hidden'}if(world&&world.userData.cl)world.userData.cl.rotation.y+=dt*.004;if(world&&world.userData.bu)bobBuoys(world.userData.bu,t);if(DN.length)dmgTick();vaTick();if(world&&world.userData.snow&&world.userData.snow.visible!==false)snowTick(world.userData.snow,dt);
 me.sprint=0;busTick(dt);if(typeof carTick==='function')carTick(dt);
 if(document.pointerLockElement&&go&&!me.out&&!me.bus&&!me.glide&&!me.car){
  const f=(held_('fwd')?1:0)-(held_('back')?1:0),s=(held_('right')?1:0)-(held_('left')?1:0),gH=groundAt(me.x,me.z,me.y),swY=MAPS[mapIdx].wl!=null?MAPS[mapIdx].wl-1.25:-1e9,swim=gH<swY&&me.y<=swY+.05,g0=!swim&&me.y<=gH+.05;me.swim=swim;
  // sprint: hold Shift while moving. Drains stamina, short delay, then it refills. Run dry and you are winded until ~35% is back.
  if(held_('sprint')&&!me.ck&&(f||s)&&!swim&&!me.zoom&&!me.tired&&me.sta>0){me.sprint=1;me.sta=Math.max(0,me.sta-24*dt);me.sdel=1.2;if(me.sta<=0){me.sta=0;me.tired=1}}
  else{me.sdel=Math.max(0,me.sdel-dt);if(me.sdel<=0)me.sta=Math.min(100,me.sta+(me.tired?14:24)*dt);if(me.tired&&me.sta>=35)me.tired=0}
  if(f||s){const sp=(swim?3.6:me.sprint?11.5:7)*(me.spd>0?1.45:1)*(typeof skinSpeed==='function'?skinSpeed():1)*(me.ck?.45:1)*dt/Math.hypot(f,s),dx=(-Math.sin(me.yaw)*f+Math.cos(me.yaw)*s)*sp,dz=(-Math.cos(me.yaw)*f-Math.sin(me.yaw)*s)*sp;
   if(!blockedMv(me.x+dx,me.z,me.y))me.x+=dx;if(!blockedMv(me.x,me.z+dz,me.y))me.z+=dz;bob+=dt*(swim?4:me.sprint?15:10)}
  if(held_('jump')&&g0)me.vy=6.5;
  const py=me.y;me.vy-=(MAPS[mapIdx].grav||18)*dt;me.y+=me.vy*dt;if(me.vy>0){const cl=ceilAt(me.x,me.z,py);if(me.y+1.8>cl){me.y=Math.max(py,cl-1.802);me.vy=0}}const g2=Math.max(groundAt(me.x,me.z,Math.max(py,me.y)),swY);if(me.y<=g2||(g0&&me.vy<=0&&me.y-g2<.45)){me.y=g2;me.vy=0}if(me.y>py+.001){const cl=ceilAt(me.x,me.z,py);if(me.y+1.8>cl)me.y=Math.max(py,cl-1.802)}
  me.cd-=dt;if(me.rl>0){me.rl-=dt;if(me.rl<=0){me.rl=0;if(me.rw>=0)me.ammo[me.rw]=WP[me.rw].mag;me.rw=-1;beep(520,.06,'triangle');hudW()}}if(fireReq||(down&&WP[me.w].a))shoot();fireReq=false}
 me.zoom=!!go&&!me.out&&!ending&&!me.swim&&!me.bus&&!me.glide&&!me.car&&me.rl<=0&&!!document.pointerLockElement&&held_('aim');const scoped=me.zoom&&me.w===3;
 const zf=me.zoom?ADSFOV[me.w]:me.sprint?84:75;if(Math.abs(cam.fov-zf)>.5){cam.fov+=(zf-cam.fov)*.3;cam.updateProjectionMatrix()}
 $('scope').style.display=scoped&&cam.fov<40?'block':'none';const TPV=typeof tpOn==='function'&&tpOn();vm.visible=!(scoped&&cam.fov<40)&&!me.out&&!!go&&!me.bus&&!me.glide&&!me.car&&!TPV;myGl.visible=me.glide===2&&!!go&&!me.out&&!TPV;adsT+=((me.zoom&&!scoped?1:0)-adsT)*Math.min(1,dt*14);xhair(scoped&&cam.fov<40);
 me.cloak=Math.max(0,me.cloak-dt);me.spd=Math.max(0,me.spd-dt);if(go&&!me.out&&!me.bus&&!ending&&me.hp>0&&!(typeof LOOT==='function'&&LOOT())){me.ct=(me.ct||0)+dt;if(me.ct>=60){me.ct-=60;me.coins++;feed('+1 coin');beep(880,.08,'sine');hud()}}$('cloakfx').style.opacity=me.cloak>0?1:0;const ct=Math.ceil(me.cloak)*1000+Math.ceil(me.spd);if(ct!==lastCt){lastCt=ct;hud()}brTick(dt);{const rr=$('rl');rr.style.display=me.rl>0&&!me.out?'block':'none';if(me.rl>0&&me.rw>=0)$('rlf').style.width=((1-me.rl/(me.rlT||WP[me.rw].rl))*100)+'%'}{const sf=$('stf');sf.style.width=me.sta+'%';sf.style.background=me.tired?'var(--rd)':'var(--st)';$('stt').textContent=me.tired?'TIRED':Math.round(me.sta)}
 const nv=document.pointerLockElement&&!me.out?nearVend():null,nd=document.pointerLockElement&&!me.out?nearDoor():null,pr2=$('prompt');
 const cpT=typeof carPrompt==='function'?carPrompt():null;
 if(cpT&&go){pr2.style.display='block';pr2.textContent=cpT}else if(me.bus&&go){pr2.style.display='block';pr2.textContent=pretty(BIND.use)+'  Jump off the Battle Bus'}else if(me.glide&&go){pr2.style.display='block';pr2.textContent=me.glide===1?'Skydiving - glider opens automatically':'Gliding - steer with '+[BIND.fwd,BIND.left,BIND.back,BIND.right].map(pretty).join('')}else if(typeof lootTarget==='function'&&LOOT()&&go&&!me.out&&!me.car&&lootTarget()){pr2.style.display='none'}else if(nd&&(!nv||nd.q<=Math.hypot(me.x-nv.x,me.z-nv.z))){pr2.style.display='block';pr2.textContent=pretty(BIND.use)+'  '+(nd.d.o?'Close door':'Open door')}else if(nv){const c=cost(nv.t),s=c>1?'s':'';pr2.style.display='block';pr2.textContent=(gm===0&&holdN()>0)?'You are already holding a powerup':me.coins>=c?pretty(BIND.use)+'  Buy '+PU[nv.t].n+' ('+c+' kill'+s+')':'Need '+c+' kill'+s+' for '+PU[nv.t].n+' (you have '+me.coins+')'}else pr2.style.display='none';
 kick=Math.max(0,kick-dt*.6);fT-=dt;flashM.visible=fT>0&&!me.zoom;const rp=me.rl>0&&me.rw>=0?Math.sin((1-me.rl/WP[me.rw].rl)*Math.PI):0;vm.rotation.x=rp*.9;vm.position.set(.26*(1-adsT),-.24+adsT*.105-(me.sprint?.035:0)-(me.swim&&go?.09:0)-rp*.14+Math.sin(bob)*(me.sprint?.018:.006)*(1-adsT),-.45+kick+adsT*.06);
 acc+=dt;if(go&&!me.out&&acc>.04){acc=0;send({t:'p',x:me.x,y:me.y,z:me.z,yaw:me.yaw,pitch:me.pitch,w:me.w,hp:me.hp,inv:me.cloak>0?1:0,sh:me.sh>0?1:0,sp:me.spd>0?1:0,bs:me.bus?1:0,gl:me.glide|0,cr:me.car?[me.car.i,me.car.s]:0,ns:typeof quietSteps==='function'&&quietSteps()?1:0,ck:me.ck?1:0,mh:typeof maxHP==='function'?maxHP():100})}
 for(const p of Object.values(players)){const R=p.R,r=p.rt,vis=go&&p.seen&&!p.out&&!r.bs;R.g.visible=vis;p.hb.visible=vis&&(gm===0||mate(p))&&!r.inv;if(r.gl===2&&!p.glm){p.glm=mkGlider();p.glm.position.y=3.2;R.g.add(p.glm)}if(p.glm)p.glm.visible=r.gl===2;if(!vis){p.tg.visible=false;continue}
  const px=R.g.position.x,pz=R.g.position.z;R.g.position.lerp(rv.set(r.x,r.y,r.z),.35);R.g.rotation.y=r.yaw;const v=Math.hypot(R.g.position.x-px,R.g.position.z-pz)/Math.max(dt,.001);p.ph+=v*dt*1.6;p.spd=v;
  R.legs[0].rotation.x=Math.sin(p.ph)*.7*Math.min(1,v/4);R.legs[1].rotation.x=-R.legs[0].rotation.x;R.head.rotation.x=r.pitch*.8;R.arms.rotation.x=Math.PI/2+r.pitch;R.guns.forEach((g,i)=>g.visible=i==r.w);
  if(p.sk!==R.sk)applySkin(R,p.sk);setInv(R,!!r.inv);if(!R.shb){R.shb=new THREE.Mesh(SHG,SHM);R.shb.userData.ns=1;R.shb.position.y=1.15;R.shb.castShadow=false;R.g.add(R.shb)}R.shb.visible=!!r.sh&&!r.inv&&!p.dead;const q=R.g.position;p.hb.position.set(q.x,q.y+2.45,q.z);p.hb.quaternion.copy(cam.quaternion);p.hb.scale.x=Math.min(1,Math.max(.01,r.hp/(r.mh||100)));R.g.scale.y=r.ck&&!r.cr?.68:R.g.scale.x;p.hb.material.color.set(r.hp>50?0x4fd18b:r.hp>25?0xf2a33a:0xe5534b);p.tg.position.set(q.x,q.y+2.85,q.z);{const dd=cam.position.distanceTo(q);if(mate(p)){p.tg.visible=true;p.tg.material.opacity=1;p.tg.material.color.set(TCOL[me.tm|0]);const k=Math.max(1,dd/18);p.tg.scale.set(2.4*k,.6*k,1)}else{p.tg.material.color.set(0xffffff);p.tg.scale.set(2.4,.6,1);const ok=gm===0&&!r.inv&&dd<14;p.tg.visible=ok&&(dd<3||nameLOS(q,dd));p.tg.material.opacity=Math.max(0,Math.min(1,(14-dd)/4))}}}
 if(typeof carPoseAll==='function')carPoseAll();
 if(!go)menuCam(t);else if(me.out&&ELIM())specCam();else if(me.car&&!me.bus&&typeof carCam==='function'&&carCam(dt)){}else{if(me.bus&&BUS){const ph=Math.max(-.15,Math.min(1.1,-me.pitch+.25)),d=46;const MB=myBusM();cam.position.set(MB.position.x+Math.sin(me.yaw)*Math.cos(ph)*d,MB.position.y+6+Math.sin(ph)*d,MB.position.z+Math.cos(me.yaw)*Math.cos(ph)*d);cam.lookAt(MB.position.x,MB.position.y+6,MB.position.z)}else{cam.position.set(me.x,me.y+(typeof eyeH!=='undefined'?eyeH:1.7),me.z);cam.rotation.set(me.pitch,me.yaw,0);if(typeof tpCam==='function')tpCam(scoped&&cam.fov<40)}}skyM.position.copy(cam.position);
 const sn=lamps[1];sn.target.position.copy(snapSh(cam.position.x,cam.position.y-(me.out?2.5:1.7),cam.position.z));sn.position.copy(sn.target.position).addScaledVector(SUN,MAPS[mapIdx].sd||85);
 if(!(typeof PERF!=='undefined'&&PERF)||(FRC&1))drawMini();ren.render(scene,cam)}
Promise.all(TXP).then(()=>setTimeout(boot,40));
