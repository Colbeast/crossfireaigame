// ===== Battle Royale looting: chests, 5 rarities, a 5-slot inventory, bandages, shield potions and grenades =====
// Only in Battle Royale mode on the battle royale maps. Squads (Cody) and Free-for-all keep the 4 standard guns.
const LOOT=()=>gm===1&&!!MAPS[mapIdx]&&!!MAPS[mapIdx].br&&!MAPS[mapIdx].osm&&!MAPS[mapIdx].sq;
const LRAR=[{n:'Common',c:'#9ea4aa',h:0x9ea4aa,d:1,s:1,rl:1},{n:'Uncommon',c:'#43c84a',h:0x43c84a,d:1.08,s:.92,rl:.94},{n:'Rare',c:'#3a8dff',h:0x3a8dff,d:1.16,s:.84,rl:.88},
 {n:'Epic',c:'#b45cff',h:0xb45cff,d:1.25,s:.76,rl:.82},{n:'Legendary',c:'#f5a623',h:0xf5a623,d:1.35,s:.68,rl:.75}];
const LSTK={band:15,shp:3,nade:6},LCONS={band:{n:'Bandages',w:21,r:1},shp:{n:'Shield Potion',w:22,r:2},nade:{n:'Grenade',w:20,r:1}};
const LGN={17:'Pistol',18:'SMG',1:'Assault Rifle',2:'Shotgun',3:'Sniper Rifle'};
const itW=it=>it.k==='g'?it.w:LCONS[it.k].w,itR=it=>it.k==='g'?it.r:LCONS[it.k].r,itN=it=>it.k==='g'?LGN[it.w]||WP[it.w].n:LCONS[it.k].n,itC=it=>LRAR[itR(it)].c;
me.inv=[null,null,null,null,null];me.slot=-1;me.using=null;
const curIt=()=>me.inv&&me.slot>=0?me.inv[me.slot]:null;
const rarOf=()=>{if(!LOOT())return null;const it=curIt();return it&&it.k==='g'&&it.w===me.w?LRAR[it.r]:null};
const rarS=()=>{const r=rarOf();return r?r.s:1},rarRL=()=>{const r=rarOf();return r?r.rl:1},rarD=()=>{const r=rarOf();return r?r.d:1};
function lRng(s){s=s>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const lPick=(R,W)=>{let s=0;for(const w of W)s+=w[1];let x=R()*s;for(const w of W){x-=w[1];if(x<0)return w[0]}return W[W.length-1][0]};

// ---------- icons for the inventory bar ----------
const LICO={17:'<path d="M8 11h36v8H26l-3 12h-9l3-12H8z"/><rect x="44" y="12" width="6" height="5"/>',
 18:'<path d="M6 10h40v9H34v6h-6v-6h-5l-3 11h-8l3-11H6z"/><rect x="46" y="12" width="10" height="4"/><rect x="0" y="12" width="6" height="7"/>',
 1:'<path d="M2 12h12l3-3h30v9h15v3H41l-2 9h-7l1-6h-7l-3 9h-7l3-11H2z"/>',
 2:'<path d="M2 13h18v7H2z"/><path d="M20 11h42v4H20z"/><path d="M20 16h26v5H20z"/><path d="M8 19l-4 10h8l4-10z"/>',
 3:'<path d="M2 15h14l3-3h45v3H42v5H27l-3 10h-7l2-10H2z"/><rect x="26" y="5" width="14" height="5" rx="1"/><rect x="31" y="9" width="3" height="4"/>',
 band:'<rect x="18" y="4" width="28" height="26" rx="6" fill="#f2ece0"/><rect x="29" y="8" width="6" height="18" fill="#d23a3a"/><rect x="23" y="14" width="18" height="6" fill="#d23a3a"/>',
 shp:'<path d="M27 3h10v7l7 7v14H20V17l7-7z" fill="#5ab8ff"/><rect x="26" y="1" width="12" height="4" fill="#3a3f46"/><path d="M22 20h20v9H22z" fill="#2f8cff"/>',
 nade:'<circle cx="32" cy="20" r="11" fill="#5d7d33"/><rect x="28" y="4" width="8" height="6" fill="#9aa3ad"/><path d="M36 6l8 10" stroke="#9aa3ad" stroke-width="3"/>',
 pick:'<path d="M14 32L40 6" stroke="#c8a070" stroke-width="5"/><path d="M22 4q18 0 30 14l-6 2q-8-9-24-10z" fill="#c8d0d8"/>'};
const itIco=it=>'<svg viewBox="0 0 64 34" fill="#fff">'+(LICO[it?(it.k==='g'?it.w:it.k):'pick'])+'</svg>';

// ---------- HUD: inventory bar, prompt, use bar, inventory screen ----------
let LUI=false;
function lootUI(){if(LUI)return;LUI=true;const st=document.createElement('style');st.textContent=`
#lbar{position:absolute;right:16px;bottom:16px;display:none;gap:6px;align-items:flex-end}
#lbar .ls{position:relative;width:78px;height:70px;box-sizing:border-box;border:2px solid #ffffff22;border-radius:6px;background:#0008;display:flex;align-items:center;justify-content:center;transition:transform .08s}
#lbar .ls.sel{transform:translateY(-9px);border-color:#fff;box-shadow:0 0 12px #fff6}
#lbar .ls svg{width:58px;height:31px;filter:drop-shadow(0 2px 2px #0009)}
#lbar .ls b{position:absolute;left:5px;top:2px;font:700 11px var(--bd);color:#fff;text-shadow:0 1px 2px #000}
#lbar .ls i{position:absolute;right:5px;bottom:2px;font:700 13px var(--bd);font-style:normal;color:#fff;text-shadow:0 1px 2px #000}
#lbar .ls u{position:absolute;left:0;right:0;bottom:-15px;text-align:center;text-decoration:none;font:500 10px var(--bd);letter-spacing:.5px;color:#fff;text-shadow:0 1px 2px #000;white-space:nowrap;display:none}
#lbar .ls.sel u{display:block}
#lbar .ls.pk{width:56px;height:56px}#lbar .ls.pk svg{width:40px;height:22px}
#lprompt{position:absolute;left:50%;top:60%;transform:translateX(-50%);display:none;background:#000a;border:1px solid #ffffff30;border-radius:5px;padding:7px 14px;font:500 15px var(--bd);color:#fff;white-space:nowrap}
#lprompt kbd{display:inline-block;min-width:20px;padding:1px 6px;margin-right:8px;border-radius:4px;background:#fff;color:#111;font:700 13px var(--bd);text-align:center}
#lprompt .rr{font-weight:700}
#luse{position:absolute;left:50%;top:66%;transform:translateX(-50%);width:240px;display:none;text-align:center;font:500 13px var(--bd);color:#fff;text-shadow:0 1px 2px #000}
#luse div{height:8px;margin-top:5px;background:#0009;border:1px solid #ffffff40;border-radius:4px;overflow:hidden}#luse div i{display:block;height:100%;width:0;background:#5ab8ff}
#linv{position:fixed;inset:0;z-index:60;display:none;align-items:center;justify-content:center;background:#05080ccc;font-family:var(--bd);color:#fff}
#linv .lv{background:#1a1d22f2;border:1px solid #ffffff22;border-radius:10px;padding:22px 26px;min-width:640px;max-width:92vw}
#linv h2{margin:0 0 4px;font:500 28px var(--hd);letter-spacing:3px}#linv .hint{color:#a9aaa6;font-size:13px;margin-bottom:16px}
#linv .row{display:flex;gap:12px;align-items:stretch}
#linv .cd{position:relative;width:118px;height:150px;box-sizing:border-box;border:2px solid #ffffff22;border-radius:8px;background:#0007;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:grab;user-select:none}
#linv .cd.em{cursor:default;opacity:.55}#linv .cd.pk{border-color:#fff}#linv .cd.ov{outline:3px dashed #fff}
#linv .cd svg{width:96px;height:52px}#linv .cd b{font:700 13px var(--bd);text-align:center;padding:0 4px}#linv .cd small{font-size:11px;opacity:.9}
#linv .cd em{position:absolute;left:7px;top:4px;font:700 12px var(--bd);font-style:normal;opacity:.8}#linv .cd i{position:absolute;right:7px;top:4px;font:700 12px var(--bd);font-style:normal}
#linv .dz{width:110px;border:2px dashed #d0463a;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#ff8a7a;font:500 18px var(--hd);letter-spacing:2px}
#linv .dz.ov{background:#d0463a44}
#linv .info{margin-top:16px;min-height:44px;font-size:14px;color:#ddd}
#linv .btns{display:flex;gap:10px;margin-top:14px}#linv button{font:500 15px var(--hd);letter-spacing:1px;padding:8px 18px;border-radius:5px;border:1px solid #ffffff33;background:#2a2e34;color:#fff;cursor:pointer}#linv button:hover{background:#3a3f46}
#va .va.c{width:30px;height:30px}`;document.head.appendChild(st);
 const hudEl=$('hud')||document.body,mk=(id,html)=>{const d=document.createElement('div');d.id=id;if(html)d.innerHTML=html;return d};
 hudEl.appendChild(mk('lbar'));hudEl.appendChild(mk('lprompt'));hudEl.appendChild(mk('luse','<span></span><div><i></i></div>'));
 const inv=mk('linv','<div class="lv"><h2>INVENTORY</h2><div class="hint">Drag items to move them around &middot; drag onto DROP (or right-click an item) to drop it &middot; Tab or Esc to close</div><div class="row" id="lvrow"></div><div class="info" id="lvinfo"></div><div class="btns"><button id="lvdrop">Drop selected</button><button id="lvclose">Close</button></div></div>');
 document.body.appendChild(inv);$('lvclose').onclick=()=>linvClose();$('lvdrop').onclick=()=>{if(lvSel>=0)lootDropAt(lvSel)};
 inv.addEventListener('mousedown',e=>e.stopPropagation())}
let LHK='';
function lootHud(){lootUI();const on=LOOT();const lb=$('lbar');
 if(!on){if(lb.style.display!=='none'){lb.style.display='none';$('wl').style.display='';$('pu').style.display=''}$('lprompt').style.display='none';$('luse').style.display='none';return false}
 $('wl').style.display='none';$('pu').style.display='none';lb.style.display='flex';
 let h='<div class="ls pk'+(me.slot<0?' sel':'')+'" style="background:#000a"><b>'+pretty(BIND.pick)+'</b>'+itIco(null)+'<u>'+(me.sk===10?WP[23].n:'Pickaxe')+'</u></div>';
 for(let i=0;i<5;i++){const it=me.inv[i],sel=me.slot===i;let txt='';if(it){if(it.k==='g'){const a=sel&&me.w===it.w?(me.rl>0&&me.rw===it.w?'…':me.ammo[it.w]):it.a;txt=a+'/'+WP[it.w].mag}else txt='×'+it.n}
  const bg=it?'linear-gradient(160deg,'+itC(it)+' 0%,'+itC(it)+'99 45%,#0009 100%)':'#0008';
  h+='<div class="ls'+(sel?' sel':'')+'" style="background:'+bg+'"><b>'+pretty(BIND['w'+(i+1)])+'</b>'+(it?itIco(it)+'<i>'+txt+'</i><u>'+LRAR[itR(it)].n+' '+itN(it)+'</u>':'')+'</div>'}
 if(h!==LHK){LHK=h;lb.innerHTML=h}return true}

// ---------- choosing what you hold ----------
function lootSyncAmmo(){const it=curIt();if(it&&it.k==='g'&&me.w===it.w)it.a=me.ammo[it.w]}
function lootCancelUse(){if(me.using){me.using=null;$('luse').style.display='none'}}
function lootSel(n){if(!LOOT()||me.out)return;if(n>=0&&!me.inv[n])return;lootSyncAmmo();lootCancelUse();const it=n>=0?me.inv[n]:null,w=it?itW(it):(me.sk===10?23:19);
 if(me.rl>0){me.rl=0;me.rw=-1}me.slot=n;if(it&&it.k==='g')me.ammo[w]=it.a;if(w!==me.w)setW(w);else{fpArms(w);hud()}}
function lootCycle(d){const L=[-1];for(let i=0;i<5;i++)if(me.inv[i])L.push(i);const i=Math.max(0,L.indexOf(me.slot));lootSel(L[(i+d+L.length)%L.length])}
// returns whatever had to come out of your inventory to make room (or null)
function lootAdd(it){const mx=LSTK[it.k];
 if(mx){for(let i=0;i<5&&it.n>0;i++){const s=me.inv[i];if(s&&s.k===it.k&&s.n<mx){const t=Math.min(mx-s.n,it.n);s.n+=t;it.n-=t}}if(it.n<=0){hud();return null}}
 const e=me.inv.indexOf(null);if(e>=0){me.inv[e]=it;if(me.slot<0)lootSel(e);else hud();return null}
 if(me.slot<0)return it;lootSyncAmmo();const old=me.inv[me.slot];me.inv[me.slot]=it;lootCancelUse();if(me.rl>0){me.rl=0;me.rw=-1}const w=itW(it);if(it.k==='g')me.ammo[w]=it.a;if(w!==me.w)setW(w);else{fpArms(w);hud()}return old}
function lootCanTake(it){const mx=LSTK[it.k];if(mx&&me.inv.some(s=>s&&s.k===it.k&&s.n<mx))return true;return me.inv.includes(null)||me.slot>=0}

// ---------- chests ----------
const LCH=[];let LCHmap=-1;
const LCM={b:new THREE.MeshStandardMaterial({color:0xd29a2e,roughness:.4,metalness:.55,emissive:0x6a4200,emissiveIntensity:.6}),
 o:new THREE.MeshStandardMaterial({color:0x9a7430,roughness:.6,metalness:.3}),
 t:new THREE.MeshStandardMaterial({color:0x5a3c18,roughness:.8}),k:new THREE.MeshStandardMaterial({color:0xfff0b0,roughness:.3,metalness:.8,emissive:0x8a6a10,emissiveIntensity:.5}),
 in:new THREE.MeshBasicMaterial({color:0x1a1206})};
const LCG={b:new THREE.BoxGeometry(.95,.5,.6),l:new THREE.BoxGeometry(.97,.2,.62),s:new THREE.BoxGeometry(.08,.52,.62),sl:new THREE.BoxGeometry(.08,.21,.64),k:new THREE.BoxGeometry(.14,.16,.05),i:new THREE.PlaneGeometry(.86,.5)};
function chestMesh(){const g=new THREE.Group(),m=(geo,mat,x,y,z)=>{const q=new THREE.Mesh(geo,mat);q.position.set(x,y,z);q.castShadow=true;g.add(q);return q};
 const body=m(LCG.b,LCM.b,0,.25,0);[-.3,.3].forEach(x=>m(LCG.s,LCM.t,x,.25,0));const ins=m(LCG.i,LCM.in,0,.501,0);ins.rotation.x=-Math.PI/2;ins.castShadow=false;
 const lid=new THREE.Group();lid.position.set(0,.5,-.3);g.add(lid);const lm=new THREE.Mesh(LCG.l,LCM.b);lm.position.set(0,.1,.31);lm.castShadow=true;lid.add(lm);
 [-.3,.3].forEach(x=>{const s=new THREE.Mesh(LCG.sl,LCM.t);s.position.set(x,.1,.31);lid.add(s)});const kk=new THREE.Mesh(LCG.k,LCM.k);kk.position.set(0,.02,.63);lid.add(kk);
 g.userData={body,lid,lm};return g}
function lootBuildChests(){LCH.forEach(c=>{scene.remove(c.g);if(c.sp)scene.remove(c.sp)});LCH.length=0;LCHmap=mapIdx;const M=MAPS[mapIdx];if(!LOOT())return;
 const R=lRng((M.seed||1)*7919+13),TR=(ro,a,b)=>ro==0?[a,b]:ro==1?[b,-a]:ro==2?[-a,-b]:[-b,a],P=[];
 const clear=(x,z,y,r)=>!near(x,z).some(b=>Math.abs(x-b[0])<b[2]/2+r&&Math.abs(z-b[1])<b[3]/2+r&&b[4]>y+.12&&b[5]<y+1.05);
 const stand=(x,z,y)=>{const g=groundAt(x,z,y+.6);return Math.abs(g-y)<.3&&!near(x,z).some(b=>fo(b,x,z)&&b[4]>g+.55&&b[5]<g+1.8)};
 const inB=(x,z)=>!((BND>0&&x*x+z*z>(BND-3)*(BND-3))||(RBX>0&&(Math.abs(x)>RBX-3||Math.abs(z)>RBZ-3)));
 const spaced=(x,z,y,d)=>P.every(p=>Math.hypot(p.x-x,p.z-z)>d||Math.abs(p.y-y)>2);
 // inside houses: most houses get one (bigger ones sometimes two), up against a wall, on any floor
 for(const h of M.HP||[]){if(R()>.66)continue;const n=(h.W*h.D>170||h.NS>1)&&R()<.45?2:1;let got=0;
  for(let t=0;t<30&&got<n;t++){const side=R()*4|0,al=R()*2-1,hw=h.W/2-.95,hd=h.D/2-.95;let lx,lz,fx,fz;
   if(side==0){lx=al*hw;lz=hd;fx=0;fz=-1}else if(side==1){lx=al*hw;lz=-hd;fx=0;fz=1}else if(side==2){lx=hw;lz=al*hd;fx=-1;fz=0}else{lx=-hw;lz=al*hd;fx=1;fz=0}
   const k=h.NS>1&&R()<.4?1+(R()*(h.NS-1)|0):0,[ax,az]=TR(h.r|0,lx,lz),[dx,dz]=TR(h.r|0,fx,fz),x=h.x+ax,z=h.z+az,yp=h.G+.3+(h.rise||0)+k*(h.FH||3.3)+1.2,y=groundAt(x,z,yp);
   if(y<yp-2.4||y>yp+.1)continue;if(!clear(x,z,y,.5)||!stand(x+dx*1.15,z+dz*1.15,y))continue;const cl=ceilAt(x,z,y);if(cl<y+1.3||cl>y+9)continue;if(!spaced(x,z,y,3))continue;
   P.push({x,z,y,yaw:Math.atan2(dx,dz)});got++}}
 // outside: tucked into bushes or next to rocks
 const nIn=P.length,want=Math.max(12,36-nIn),cand=(M.D||[]).filter(d=>(d[0]==='b'&&d[4]>1)||(d[0]==='k'&&d[4]>.8));
 for(let i=cand.length-1;i>0;i--){const j=R()*(i+1)|0;[cand[i],cand[j]]=[cand[j],cand[i]]}
 for(const d of cand){if(P.length-nIn>=want)break;for(let t=0;t<6;t++){const a=R()*6.283,r=d[0]==='b'?d[4]*.5:d[4]+.75,x=d[1]+Math.cos(a)*r,z=d[3]+Math.sin(a)*r,y=groundAt(x,z,Hf(x,z)+.4);
   if(Math.abs(y-Hf(x,z))>.3||!inB(x,z))continue;if(M.wl!=null&&y<M.wl+.1)continue;if(typeof inLava==='function'&&inLava(x,z,y))continue;if(!clear(x,z,y,.45)||!stand(x+Math.cos(a)*1.1,z+Math.sin(a)*1.1,y))continue;if(!spaced(x,z,y,22))continue;
   P.push({x,z,y,yaw:Math.atan2(Math.cos(a),Math.sin(a))});break}}
 P.forEach((p,i)=>{const g=chestMesh();g.position.set(p.x,p.y,p.z);g.rotation.y=p.yaw;scene.add(g);LCH.push({i,x:p.x,y:p.y,z:p.z,yaw:p.yaw,g,open:0,ot:0,sp:null})})}
function chestClose(c){c.open=0;c.ot=0;c.g.userData.lid.rotation.x=0;c.g.userData.body.material=LCM.b;c.g.userData.lm.material=LCM.b}
// what a chest holds is decided by the match seed, so every player sees the same items fall out
function chestLoot(i){const R=lRng((stSeed^Math.imul(i+1,2654435761))>>>0),out=[];
 const w=lPick(R,[[1,25],[18,21],[2,21],[17,19],[3,14]]),r=lPick(R,[[0,36],[1,30],[2,20],[3,10],[4,4]]);out.push({k:'g',w,r,a:WP[w].mag});
 const cons=()=>{const c=lPick(R,[['band',38],['shp',34],['nade',28]]);return c==='band'?{k:'band',n:5}:c==='shp'?{k:'shp',n:R()<.3?2:1}:{k:'nade',n:3}};
 const a=cons();out.push(a);if(R()<.4){let b=cons();if(b.k===a.k)b=cons();out.push(b)}return out}
function chestOpen(i,mine){const c=LCH[i];if(!c||c.open)return;c.open=1;c.ot=0;c.g.userData.body.material=LCM.o;c.g.userData.lm.material=LCM.o;if(c.sp){scene.remove(c.sp);c.sp=null}
 const d=Math.hypot(c.x-me.x,c.z-me.z);if(d<45){const v=Math.max(.15,1-d/45);[784,988,1175,1568].forEach((f,k)=>setTimeout(()=>lTone(f,.22,.05*v,'triangle'),k*70))}
 const L=chestLoot(i),fx=Math.sin(c.yaw),fz=Math.cos(c.yaw);
 L.forEach((it,k)=>{const a=c.yaw+(k-(L.length-1)/2)*.8;let x=c.x+Math.sin(a)*1.45,z=c.z+Math.cos(a)*1.45,y=groundAt(x,z,c.y+.8);if(Math.abs(y-c.y)>1||wallDist(new V(c.x,c.y+.4,c.z),new V(x-c.x,0,z-c.z).normalize(),2)<1.5){x=c.x+fx*.95+(k-1)*.35*fz;z=c.z+fz*.95-(k-1)*.35*fx;y=groundAt(x,z,c.y+.8)}
  gSpawn({id:'c'+i+'.'+k,it,x,y,z},[c.x,c.y+.5,c.z])});
 if(mine)send({t:'lt',a:'open',i})}

// ---------- items lying on the ground ----------
const LGR=new Map();let LDN=0;const LBM={},LBG=new THREE.CylinderGeometry(.035,.035,1.9,6,1,true),LRG=new THREE.RingGeometry(.28,.42,24);
function gMesh(it){const g=new THREE.Group(),c=LRAR[itR(it)].h,piv=new THREE.Group(),m=makeGun(itW(it),0);m.scale.setScalar(it.k==='g'?1.5:2.4);m.rotation.y=Math.PI/2;
 const bb=new THREE.Box3().setFromObject(m),ctr=bb.getCenter(new V());m.position.sub(ctr);piv.add(m);piv.position.y=.45;g.add(piv);
 const mb=LBM[c]||(LBM[c]=[new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.38,depthWrite:false,fog:false,side:THREE.DoubleSide}),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.6,depthWrite:false,side:THREE.DoubleSide})]);
 const beam=new THREE.Mesh(LBG,mb[0]);beam.position.y=.95;g.add(beam);const ring=new THREE.Mesh(LRG,mb[1]);ring.rotation.x=-Math.PI/2;ring.position.y=.04;g.add(ring);g.userData.piv=piv;return g}
function gSpawn(e,from){if(LGR.has(e.id))return;const g=gMesh(e.it),q={id:e.id,it:e.it,x:e.x,y:e.y,z:e.z,g,ph:Math.random()*6,pt:from?0:1,from};g.position.set(e.x,e.y,e.z);if(from)g.position.set(from[0],from[1],from[2]);scene.add(g);LGR.set(e.id,q)}
function gRemove(q){scene.remove(q.g);q.g.userData.piv.traverse(m=>{if(m.isMesh)m.geometry.dispose()});LGR.delete(q.id)}
function gGone(id,by){const q=LGR.get(id);if(!q)return;gRemove(q);if(by===me.id){const it=JSON.parse(JSON.stringify(q.it)),left=lootAdd(it);lTone(1046,.1,.05,'sine');setTimeout(()=>lTone(1568,.12,.04,'sine'),60);if(left)lootDropItems([left])}}
function lootPick(q){if(!lootCanTake(q.it)){feed('Inventory full - select a slot to swap',1);beep(150,.12);return}const now=performance.now();if(q.pend&&now-q.pend<700)return;q.pend=now;
 if(isHost)lootReq({id:q.id,f:me.id});else send({t:'lq',id:q.id})}
// the host decides who gets an item, so two players can't both grab it
function lootReq(m){const q=LGR.get(m.id);if(!q)return;const msg={t:'lt',a:'gone',id:m.id,by:m.f};send(msg);gGone(m.id,m.f)}
function lootDropItems(arr,ring){const out=[],n=arr.length,fw=new V(-Math.sin(me.yaw),0,-Math.cos(me.yaw)),o=new V(me.x,me.y+1,me.z);
 arr.forEach((it,k)=>{let x,z;if(ring||n>1){const a=k/n*6.283+me.yaw;x=me.x+Math.cos(a)*1.1;z=me.z+Math.sin(a)*1.1}else{const d=Math.min(1.3,wallDist(o,fw,2)-.4);x=me.x+fw.x*Math.max(0,d);z=me.z+fw.z*Math.max(0,d)}
  const y=groundAt(x,z,me.y+.8);out.push({id:me.id+'d'+(++LDN)+'.'+(me.life|0),it,x:+x.toFixed(2),y:+y.toFixed(2),z:+z.toFixed(2)})});
 const from=[me.x,me.y+1,me.z];out.forEach(e=>gSpawn(e,from));send({t:'lt',a:'drop',L:out,o:from.map(v=>+v.toFixed(2))});lTone(330,.08,.04,'triangle')}
function lootDropHeld(){if(!LOOT()||me.out||me.slot<0||!go)return;lootDropAt(me.slot)}
function lootDropAt(i){const it=me.inv[i];if(!it)return;lootSyncAmmo();if(i===me.slot){lootCancelUse();me.inv[i]=null;lootDropItems([it]);lootSel(-1)}else{me.inv[i]=null;lootDropItems([it]);hud()}if(window.LINV)lvRender()}
function lootDie(){if(!LOOT())return;lootSyncAmmo();lootCancelUse();const items=me.inv.filter(Boolean);me.inv=[null,null,null,null,null];me.slot=-1;if(items.length)lootDropItems(items,true);linvClose(false)}
function lootMsg(m){if(!LOOT())return;if(m.a==='open')chestOpen(m.i,false);else if(m.a==='drop')(m.L||[]).forEach(e=>gSpawn(e,m.o));else if(m.a==='gone')gGone(m.id,m.by)}

// ---------- using what you hold: bandages, shield potions, grenades ----------
function lootAct(W){const it=curIt();if(!it||!LOOT()||me.out)return;
 if(it.k==='nade'){throwProj(WP[20],20);it.n--;if(it.n<=0){me.inv[me.slot]=null;lootSel(-1)}else hud();return}
 if(me.using)return;const mh=typeof maxHP==='function'?maxHP():100,cap=Math.round(mh*.75);
 if(it.k==='band'){if(me.hp>=cap){feed('Bandages only heal up to '+cap+' health',1);beep(150,.12);return}me.using={k:'band',t:0,d:3,it}}
 else if(it.k==='shp'){if(me.sh>=100){feed('Your shield is already full',1);beep(150,.12);return}me.using={k:'shp',t:0,d:4,it}}
 lTone(520,.12,.035,'sine')}
function useTick(dt){const u=me.using,el=$('luse');if(!u){el.style.display='none';return}
 if(curIt()!==u.it||me.out||me.bus||!go){lootCancelUse();return}u.t+=dt;el.style.display='block';el.firstChild.textContent=(u.k==='band'?'Bandaging':'Drinking shield potion')+'... '+Math.max(0,u.d-u.t).toFixed(1)+'s';
 const b=el.querySelector('i');b.style.width=Math.min(100,u.t/u.d*100)+'%';b.style.background=u.k==='band'?'#6cc04a':'#5ab8ff';
 if(u.t>=u.d){const mh=typeof maxHP==='function'?maxHP():100;if(u.k==='band'){me.hp=Math.min(Math.round(mh*.75),me.hp+15);feed('+15 health')}else{me.sh=Math.min(100,me.sh+50);feed('+50 shield')}
  lTone(u.k==='band'?660:880,.25,.05,'sine');u.it.n--;me.using=null;el.style.display='none';if(u.it.n<=0){me.inv[me.slot]=null;lootSel(-1)}hud()}}
// grenade blast: big damage up close, less further out
function fragBoom(p,own){beep(70,.55,'sawtooth');beep(130,.35,'square');
 const fl=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),new THREE.MeshBasicMaterial({color:0xffa040,transparent:true,opacity:.9,fog:false}));fl.position.copy(p);scene.add(fl);POP.push({m:fl,v:new V(),t:0,life:.4,grow:11});
 const sm=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),new THREE.MeshBasicMaterial({color:0x5a5650,transparent:true,opacity:.6,depthWrite:false}));sm.position.copy(p);scene.add(sm);POP.push({m:sm,v:new V(0,9.6,0),t:0,life:1.4,grow:3});
 for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1),popM[2]);m.position.copy(p);scene.add(m);const a=Math.random()*6.283,u=Math.random()*.9+.2,s=6+Math.random()*7;POP.push({m,v:new V(Math.cos(a)*s,u*s,Math.sin(a)*s),t:0,life:1.2+Math.random()*.6})}
 const dm=Math.hypot(p.x-me.x,p.z-me.z);if(dm<25){kick=Math.max(kick,.12*(1-dm/25))}
 if(!own)return;for(const pl of Object.values(players)){if(!pl.R.g.visible||pl.dead||mate(pl))continue;const r=pl.rt,d=Math.hypot(r.x-p.x,r.y+1-p.y,r.z-p.z);if(d>7)continue;hitPlayer(pl,Math.round(d<2?75:75-(d-2)*13),false)}}

// ---------- inventory screen ----------
let lvSel=-1,lvDrag=-1;
function lvRender(){const row=$('lvrow');if(!row)return;let h='';
 for(let i=0;i<5;i++){const it=me.inv[i];if(!it){h+='<div class="cd em" data-i="'+i+'"><em>'+(i+1)+'</em><small>Empty</small></div>';continue}
  const c=itC(it),bg='linear-gradient(170deg,'+c+' 0%,'+c+'88 50%,#000a 100%)';
  h+='<div class="cd'+(lvSel===i?' pk':'')+'" draggable="true" data-i="'+i+'" style="background:'+bg+'"><em>'+(i+1)+'</em><i>'+(it.k==='g'?it.a+'/'+WP[it.w].mag:'×'+it.n)+'</i>'+itIco(it)+'<b>'+itN(it)+'</b><small>'+LRAR[itR(it)].n+'</small></div>'}
 h+='<div class="dz" data-dz="1">DROP</div>';row.innerHTML=h;
 const it=lvSel>=0?me.inv[lvSel]:null,inf=$('lvinfo');
 if(!it)inf.innerHTML='Click an item to see its stats.';else if(it.k==='g'){const W=WP[it.w],R=LRAR[it.r];inf.innerHTML='<b style="color:'+R.c+'">'+R.n+' '+itN(it)+'</b> &middot; damage '+Math.round(W.d*R.d)+(W.p>1?' x'+W.p+' pellets':'')+' &middot; '+(W.r>=1?W.r+'s between shots':Math.round(60/W.r)+' shots/min')+' &middot; magazine '+W.mag+' &middot; reload '+(W.rl*R.rl).toFixed(1)+'s'}
 else inf.innerHTML='<b style="color:'+itC(it)+'">'+itN(it)+'</b> &middot; '+(it.k==='band'?'+15 health each, up to 75% health (3s to use)':it.k==='shp'?'+50 shield each, up to 100 (4s to drink)':'throw it: up to 75 damage in a 7m blast')+' &middot; you have '+it.n+' (max '+LSTK[it.k]+')';
 row.querySelectorAll('.cd').forEach(el=>{const i=+el.dataset.i;el.onclick=()=>{lvSel=i;lvRender()};el.oncontextmenu=e=>{e.preventDefault();lootDropAt(i)};
  el.ondragstart=e=>{lvDrag=i;e.dataTransfer.setData('text/plain',''+i);e.dataTransfer.effectAllowed='move'};el.ondragend=()=>{lvDrag=-1};
  el.ondragover=e=>{e.preventDefault();el.classList.add('ov')};el.ondragleave=()=>el.classList.remove('ov');el.ondrop=e=>{e.preventDefault();el.classList.remove('ov');if(lvDrag>=0)lootSwap(lvDrag,i)}});
 const dz=row.querySelector('.dz');dz.ondragover=e=>{e.preventDefault();dz.classList.add('ov')};dz.ondragleave=()=>dz.classList.remove('ov');dz.ondrop=e=>{e.preventDefault();dz.classList.remove('ov');if(lvDrag>=0)lootDropAt(lvDrag)}}
function lootSwap(a,b){if(a===b)return;lootSyncAmmo();const sel=curIt(),A=me.inv[a],B=me.inv[b],mx=A&&LSTK[A.k];
 if(A&&B&&mx&&A.k===B.k){const t=Math.min(mx-B.n,A.n);B.n+=t;A.n-=t;if(A.n<=0)me.inv[a]=null}else{me.inv[a]=B;me.inv[b]=A}
 if(sel){const j=me.inv.indexOf(sel);if(j>=0)me.slot=j;else lootSel(-1)}if(lvSel===a)lvSel=b;else if(lvSel===b)lvSel=a;hud();lvRender()}
function linvOpen(){if(!LOOT()||!go||me.out||window.LINV)return;lootUI();window.LINV=1;for(const c in k)k[c]=false;down=false;lootCancelUse();lvSel=me.slot;lvRender();$('linv').style.display='flex';if(document.pointerLockElement)document.exitPointerLock()}
function linvClose(relock){if(!window.LINV)return;window.LINV=0;$('linv').style.display='none';if(relock!==false&&go&&!me.out){try{const p=ren.domElement.requestPointerLock();if(p&&p.catch)p.catch(()=>{$('clickplay').style.display='flex'})}catch(e){$('clickplay').style.display='flex'}}}
addEventListener('keydown',e=>{if(!LOOT()||!go)return;if(e.code===BIND.inv){e.preventDefault();if(e.repeat)return;if(window.LINV)linvClose();else if(document.pointerLockElement)linvOpen()}
 else if(window.LINV&&(e.code==='Escape'||e.code==='KeyI')){e.preventDefault();linvClose()}else if(window.LINV&&e.code===BIND.drop&&lvSel>=0){e.preventDefault();lootDropAt(lvSel)}},true);

// ---------- what you are looking at: open / pick up ----------
function lootTarget(){const fx=-Math.sin(me.yaw),fz=-Math.cos(me.yaw);let best=null,bs=1e9;
 const test=(x,y,z,R,o)=>{const dx=x-me.x,dz=z-me.z,d=Math.hypot(dx,dz);if(d>R||Math.abs(y-me.y)>1.6)return;const dot=d>.01?(dx*fx+dz*fz)/d:1;if(dot<.25&&d>1.1)return;const s=d-dot*1.3;if(s<bs){bs=s;best=o}};
 for(const c of LCH)if(!c.open)test(c.x,c.y,c.z,2.5,{c});for(const q of LGR.values())if(q.pt>=1)test(q.x,q.y,q.z,2.2,{q});return best}
function lootUse(){if(!LOOT()||me.out||me.bus||!go)return false;const t=lootTarget();if(!t)return false;if(t.c)chestOpen(t.c.i,true);else lootPick(t.q);return true}
function lootPrompt(){const el=$('lprompt'),t=go&&!me.out&&!me.bus&&!me.car&&!window.LINV?lootTarget():null;if(!t){el.style.display='none';return}
 let h='<kbd>'+pretty(BIND.use)+'</kbd>';if(t.c)h+='Open <span class="rr" style="color:#f2c230">Chest</span>';
 else{const it=t.q.it,full=!lootCanTake(it)?' <small>(inventory full)</small>':(!me.inv.includes(null)&&!(LSTK[it.k]&&me.inv.some(s=>s&&s.k===it.k&&s.n<LSTK[it.k]))&&me.slot>=0?' <small>(swaps with what you hold)</small>':'');
  h+='Pick up <span class="rr" style="color:'+itC(it)+'">'+LRAR[itR(it)].n+' '+itN(it)+'</span>'+(it.n>1?' ×'+it.n:'')+full}
 if(el.innerHTML!==h)el.innerHTML=h;el.style.display='block'}

// ---------- sounds: chests hum and sparkle, and show on the visual-audio ring, only when you are really close ----------
function lTone(f,d,vol,type){try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,ac.currentTime);g.gain.setValueAtTime(vol,ac.currentTime);g.gain.exponentialRampToValueAtTime(.0005,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d+.02)}catch(e){}}
const LVAC='<svg viewBox="0 0 40 40"><rect x="6" y="18" width="28" height="15" rx="2" fill="#f2c230"/><path d="M6 18 Q20 5 34 18 Z" fill="#ffd95a"/><rect x="18" y="19" width="4" height="6" fill="#6b4a1e"/></svg>';
const LVA=[];let lHum=0;const LSPG=new THREE.BufferGeometry();LSPG.setAttribute('position',new THREE.BufferAttribute(new Float32Array(48),3));
const LSPM=new THREE.PointsMaterial({color:0xffe9a0,size:.1,transparent:true,opacity:.95,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
function chestFx(dt,now){const on=go&&!me.out&&LOOT();let near=[];
 for(const c of LCH){if(c.open){if(c.ot<1){c.ot=Math.min(1,c.ot+dt*4);c.g.userData.lid.rotation.x=-1.35*(1-Math.pow(1-c.ot,3))}continue}
  const d=Math.hypot(c.x-me.x,c.z-me.z);if(on&&d<12&&Math.abs(c.y-me.y)<7)near.push([d,c]);
  if(d<16){if(!c.sp){const g=LSPG.clone();c.sp=new THREE.Points(g,LSPM);c.sp.position.set(c.x,c.y,c.z);c.sp.userData.s=Array.from({length:16},()=>[Math.random()*6.283,Math.random(),.3+Math.random()*.4]);scene.add(c.sp)}
   const pa=c.sp.geometry.attributes.position;c.sp.userData.s.forEach((s,j)=>{const t=(now/1000*.6+s[1])%1,a=s[0]+now/1000*1.4;pa.setXYZ(j,Math.cos(a)*s[2],.35+t*1.1,Math.sin(a)*s[2])});pa.needsUpdate=true}
  else if(c.sp){scene.remove(c.sp);c.sp.geometry.dispose();c.sp=null}}
 LCM.b.emissiveIntensity=.45+.3*Math.sin(now/180);
 near.sort((a,b)=>a[0]-b[0]);near=near.slice(0,3);const box=$('va');
 for(let i=0;i<3;i++){let el=LVA[i];if(!near[i]){if(el)el.style.display='none';continue}if(!el){el=LVA[i]=document.createElement('div');el.className='va c';el.innerHTML=LVAC;box.appendChild(el)}
  const[d,c]=near[i];vaPos(el,c.x,c.z,96,Math.max(.35,1-d/12)*(.8+.2*Math.sin(now/140)))}
 if(near.length){lHum-=dt;if(lHum<=0){lHum=1.15;const v=.006+.04*(1-near[0][0]/12);lTone(1568,.35,v,'sine');setTimeout(()=>lTone(2093,.4,v*.8,'sine'),110)}}else lHum=0}

// ---------- every frame ----------
function lootTick(dt){if(!LOOT()){if(LCH.length||LGR.size)lootMap();if(window.LINV)linvClose(false);return}lootUI();const now=performance.now();
 if(me.out&&window.LINV)linvClose(false);lootSyncAmmo();
 for(const q of LGR.values()){const g=q.g;if(q.pt<1){q.pt=Math.min(1,q.pt+dt*2.4);const u=q.pt,f=q.from;g.position.set(f[0]+(q.x-f[0])*u,f[1]+(q.y-f[1])*u+Math.sin(u*Math.PI)*1.1,f[2]+(q.z-f[2])*u)}
  else g.position.set(q.x,q.y,q.z);const pv=g.userData.piv;pv.rotation.y=now/900+q.ph;pv.position.y=.45+Math.sin(now/400+q.ph)*.07}
 chestFx(dt,now);useTick(dt);lootPrompt();hudW()}
function lootMap(){LCH.forEach(c=>{scene.remove(c.g);if(c.sp)scene.remove(c.sp)});LCH.length=0;LCHmap=-1;[...LGR.values()].forEach(gRemove);LVA.forEach(e=>e&&(e.style.display='none'))}
function lootReset(){[...LGR.values()].forEach(gRemove);linvClose(false);lootCancelUse();me.inv=[null,null,null,null,null];me.slot=-1;LHK='';
 if(!LOOT()){if(LCH.length)lootMap();hud();return}if(LCHmap!==mapIdx)lootBuildChests();else LCH.forEach(chestClose);if(me.rl>0){me.rl=0;me.rw=-1}setW(me.sk===10?23:19)}
