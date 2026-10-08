// Crossfire Online - extras: drivable cars (Squads / practice on Cody, Wyoming), third-person camera,
// your own visible character, and car + teammate markers on the minimap and big map.
// Loaded after game.js; game.js calls into these functions with typeof checks.

// =====================================================================================================
// ---------- camera: first or third person (Settings) ----------
// =====================================================================================================
let CAMV=0;try{CAMV=+(localStorage.getItem('cf_cam')||0)===1?1:0}catch(e){}
function tpOn(){return CAMV===1}
function camUI(){const s=$('camv');if(s)s.value=String(CAMV)}
{const s=$('camv');if(s){s.onchange=()=>{CAMV=s.value==='1'?1:0;try{localStorage.setItem('cf_cam',String(CAMV))}catch(e){}};camUI()}}
const _tf=new V(),_tr=new V(),_th=new V(),_tb=new V();
// over-the-shoulder camera; pulls in when a wall is behind you, and closer while aiming
function tpCam(scoped){if(!tpOn()||scoped||me.car||me.bus)return;const y=me.yaw,p=me.pitch,cp=Math.cos(p);
 _tf.set(-Math.sin(y)*cp,Math.sin(p),-Math.cos(y)*cp);_tr.set(Math.cos(y),0,-Math.sin(y));
 _th.set(me.x,me.y+eyeH-.08,me.z).addScaledVector(_tr,me.zoom?.5:.62);_th.y+=me.zoom?.08:.18;_tb.copy(_tf).multiplyScalar(-1);
 const want=me.zoom?1.7:3.3,d=Math.max(.35,Math.min(want,wallDist(_th,_tb)-.3));cam.position.copy(_th).addScaledVector(_tb,d)}
// shots in third person start where the aim ray passes the player, so nothing behind you is hit
function tpOrigin(){if(!tpOn()||me.car)return cam.position;const fw=new V();cam.getWorldDirection(fw);const h=new V(me.x,me.y+1.6,me.z).sub(cam.position);return cam.position.clone().addScaledVector(fw,Math.max(0,h.dot(fw)))}

// your own character, seen in third person and while sitting in a car
const meR=mkRobot();meR.g.visible=false;scene.add(meR.g);meR.ph=0;meR.px=0;meR.pz=0;
function meTick(dt){const scoped=me.zoom&&me.w===3&&cam.fov<40,vis=!!go&&!me.out&&!me.bus&&((tpOn()&&!scoped)||!!me.car);meR.g.visible=vis;if(!vis)return;
 if(meR.sk!==me.sk)applySkin(meR,me.sk);setInv(meR,me.cloak>0);
 if(me.glide===2&&!meR.glm){meR.glm=mkGlider();meR.glm.position.y=3.2;meR.g.add(meR.glm)}if(meR.glm)meR.glm.visible=me.glide===2;
 if(me.car)return;// posed by carPoseAll
 meR.g.scale.set(1,me.ck?.68:1,1);const v=Math.hypot(me.x-meR.px,me.z-meR.pz)/Math.max(dt,.001);meR.px=me.x;meR.pz=me.z;meR.ph+=Math.min(v,14)*dt*1.6;
 meR.g.position.set(me.x,me.y,me.z);meR.g.rotation.y=me.yaw;meR.legs[0].rotation.x=Math.sin(meR.ph)*.7*Math.min(1,v/4);meR.legs[1].rotation.x=-meR.legs[0].rotation.x;
 meR.head.rotation.x=me.pitch*.8;meR.arms.rotation.x=Math.PI/2+me.pitch;meR.guns.forEach((g,i)=>g.visible=i==me.w)}

// =====================================================================================================
// ---------- drivable cars ----------
// =====================================================================================================
// real-world sizes in metres (length, width, height, wheelbase); front of the car is local +z
const CAR_T=[
 {n:'Sedan',k:'sedan',L:4.85,W:1.85,H:1.45,wb:2.83,wr:.34,col:0x2f5d9a,vmax:38,acc:7.2,cab:[.62,.38,-1.15],seat:.48},
 {n:'Pickup Truck',k:'pickup',L:5.9,W:2.03,H:1.95,wb:3.68,wr:.42,col:0xb8322a,vmax:35,acc:6.4,cab:[.5,1.1,-.6],seat:.62},
 {n:'SUV',k:'suv',L:4.95,W:1.98,H:1.8,wb:2.95,wr:.39,col:0x2b2f33,vmax:36,acc:6.8,cab:[.57,.62,-2.05],seat:.58},
 {n:'Sports Car',k:'sports',L:4.5,W:1.95,H:1.25,wb:2.62,wr:.34,col:0xf2c230,vmax:48,acc:10.5,cab:[.68,.18,-1.0],seat:.36},
 {n:'Minivan',k:'van',L:5.15,W:2.0,H:1.78,wb:3.08,wr:.36,col:0xe9e9e4,vmax:33,acc:6,cab:[.55,1.05,-2.35],seat:.6},
 {n:'Hatchback',k:'hatch',L:4.1,W:1.78,H:1.48,wb:2.55,wr:.32,col:0x3aa060,vmax:35,acc:7,cab:[.6,.5,-1.85],seat:.5},
 {n:'Jeep',k:'jeep',L:4.35,W:1.9,H:1.85,wb:2.46,wr:.42,col:0x5d6a3a,vmax:34,acc:7,cab:[.56,.62,-1.95],seat:.62},
 {n:'Muscle Car',k:'muscle',L:4.8,W:1.92,H:1.36,wb:2.75,wr:.36,col:0xe8553a,vmax:45,acc:9.4,cab:[.62,.1,-1.35],seat:.42},
 {n:'Station Wagon',k:'wagon',L:4.9,W:1.85,H:1.5,wb:2.85,wr:.34,col:0x8a5a3a,vmax:36,acc:6.8,cab:[.6,.45,-2.15],seat:.5},
 {n:'Police Cruiser',k:'police',L:5.1,W:1.95,H:1.55,wb:2.97,wr:.36,col:0x1b1d20,vmax:42,acc:8.4,cab:[.62,.4,-1.25],seat:.5}];
// seats: [left/right offset as a fraction of half width, z offset]; seat 0 is the driver (front left)
const SEATS=[[.42,.12],[-.42,.12],[.42,-.72],[-.42,-.72]];
let CARS=[],carSendT=0,carAllT=0;
const carMat={},cm=(c,o)=>{const k=c+JSON.stringify(o||{});return carMat[k]||(carMat[k]=new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.6,metalness:.1},o||{})))};
function carMesh(t){const T=CAR_T[t],g=new THREE.Group(),b=new THREE.Group();g.add(b);g.userData.b=b;
 const paint=cm(T.col,{metalness:.12,roughness:.32}),glass=cm(0x22364a,{metalness:.1,roughness:.08}),trim=cm(0x18191b,{roughness:.8}),chrome=cm(0xe4e7ea,{metalness:.25,roughness:.25}),
  tire=cm(0x141516,{roughness:.95}),rim=cm(0xc9ced4,{metalness:.25,roughness:.3}),hl=cm(0xfff6dd,{emissive:0xfff2c8,emissiveIntensity:.9}),tl=cm(0xd01818,{emissive:0xb00000,emissiveIntensity:.7}),white=cm(0xf4f4f0,{metalness:.1,roughness:.3});
 const box=(w,h,d,m,x,y,z,p)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;(p||b).add(o);return o};
 const L=T.L,W=T.W,H=T.H,cl=T.wr*.85,belt=cl+(H-cl)*T.cab[0]*.78,[,cz0,cz1]=T.cab,cf=cz0*L/4.85+0,cr=cz1*L/4.85,cabL=cf-cr,cabZ=(cf+cr)/2;
 // lower body, bumpers, lights, door seams
 box(W,belt-cl,L-.18,paint,0,(belt+cl)/2,0);box(W+.04,.22,.16,trim,0,cl+.12,L/2-.08);box(W+.04,.22,.16,trim,0,cl+.12,-L/2+.08);
 box(W*.98,.05,.1,chrome,0,cl+.3,L/2-.04);[-1,1].forEach(s=>{box(.36,.14,.05,hl,s*(W/2-.32),belt-.14,L/2-.07);box(.34,.14,.05,tl,s*(W/2-.3),belt-.12,-L/2+.07);
  box(.02,belt-cl-.12,.02,trim,s*(W/2+.003),(belt+cl)/2,cabZ);box(.03,.04,.24,chrome,s*(W/2+.01),belt-.16,cabZ+.4)});
 box(W*.5,.16,.04,trim,0,belt-.2,L/2-.06);
 if(T.k==='pickup'){// cab + open bed
  box(W-.06,H-belt,cabL,glass,0,(H+belt)/2,cabZ);box(W-.04,.07,cabL-.35,paint,0,H-.03,cabZ-.05);
  [[cf-.05],[cr+.05]].forEach(([z])=>[-1,1].forEach(s=>box(.08,H-belt,.12,paint,s*(W/2-.05),(H+belt)/2,z)));
  const bz0=cr-.1,bz1=-L/2+.12,bl=bz0-bz1,bc=(bz0+bz1)/2;box(W-.1,.08,bl,trim,0,belt-.02,bc);[-1,1].forEach(s=>box(.08,.42,bl,paint,s*(W/2-.04),belt+.17,bc));box(W,.42,.08,paint,0,belt+.17,bz1+.04)}
 else if(T.k==='van'){box(W-.06,H-belt,cabL,glass,0,(H+belt)/2,cabZ);box(W-.04,.08,cabL-.25,paint,0,H-.04,cabZ-.06);[-1,1].forEach(s=>{box(.06,(H-belt)*.62,cabL*.45,paint,s*(W/2-.02),belt+(H-belt)*.3,cr+cabL*.32);box(.08,H-belt,.14,paint,s*(W/2-.05),(H+belt)/2,cf-.06)});
  box(W-.1,.05,1.2,paint,0,belt+.03,cf+.6)}
 else{box(W-.1,H-belt,cabL,glass,0,(H+belt)/2,cabZ);box(W-.16,.07,cabL-(T.k==='jeep'?.1:.4),T.k==='police'?white:paint,0,H-.03,cabZ-.02);
  [[cf-.05],[cr+.05],[cabZ+.05]].forEach(([z],n)=>[-1,1].forEach(s=>box(.08,H-belt-.02,n==2?.1:.14,paint,s*(W/2-.08),(H+belt)/2,z)))}
 if(T.k==='sports'){box(W*.9,.05,.32,paint,0,belt+.32,-L/2+.22);[-1,1].forEach(s=>box(.06,.3,.08,trim,s*(W*.32),belt+.16,-L/2+.22))}
 if(T.k==='muscle'){box(.5,.08,1.2,trim,0,belt+.02,L/2-.8);[-1,1].forEach(s=>box(.12,.04,L-.3,white,s*.18,belt+.005,0))}
 if(T.k==='jeep'){const sp=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.24,14),tire);sp.rotation.x=Math.PI/2;sp.position.set(0,belt+.1,-L/2-.06);b.add(sp);box(W+.08,.1,.4,trim,0,cl+.05,L/2-.2)}
 if(T.k==='police'){[-1,1].forEach(s=>box(.04,belt-cl-.16,1.7,white,s*(W/2+.005),(belt+cl)/2+.02,cabZ));const lb=box(1.1,.12,.28,trim,0,H+.05,cabZ);box(.48,.11,.26,cm(0xff2a2a,{emissive:0xff0000,emissiveIntensity:1.2}),-.27,H+.1,cabZ);box(.48,.11,.26,cm(0x2a5aff,{emissive:0x0033ff,emissiveIntensity:1.2}),.27,H+.1,cabZ)}
 if(T.k==='wagon'||T.k==='suv'){[-1,1].forEach(s=>box(.05,.05,cabL*.8,chrome,s*(W/2-.25),H+.03,cabZ))}
 [-1,1].forEach(s=>box(.08,.1,.18,paint,s*(W/2+.06),belt+.12,cf-.2));
 // wheels: front pair can steer
 const wg=[];[[1,1],[-1,1],[1,-1],[-1,-1]].forEach(([sx,sz])=>{const piv=new THREE.Group();piv.position.set(sx*(W/2-.15),T.wr,sz*T.wb/2);b.add(piv);const sp=new THREE.Group();piv.add(sp);
  const ty=new THREE.Mesh(new THREE.CylinderGeometry(T.wr,T.wr,.26,18),tire);ty.rotation.z=Math.PI/2;ty.castShadow=true;sp.add(ty);const rm=new THREE.Mesh(new THREE.CylinderGeometry(T.wr*.62,T.wr*.62,.27,10),rim);rm.rotation.z=Math.PI/2;sp.add(rm);
  for(let q=0;q<2;q++){const sk=new THREE.Mesh(new THREE.BoxGeometry(.28,T.wr*1.1,.08),trim);sk.rotation.x=q*Math.PI/2;sp.add(sk)}wg.push({piv,sp,front:sz>0})});
 g.userData.wh=wg;
 // "you can drive this" marker
 const c=document.createElement('canvas');c.width=256;c.height=96;const x=c.getContext('2d');x.fillStyle='rgba(12,18,24,.82)';x.beginPath();x.roundRect?x.roundRect(8,10,240,76,18):x.rect(8,10,240,76);x.fill();x.strokeStyle='#f0b23c';x.lineWidth=5;x.stroke();
 x.fillStyle='#f0b23c';x.font='bold 38px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText('\u{1F697} DRIVE',128,50);
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false}));sp.scale.set(1.9,.71,1);sp.position.set(0,H+1.1,0);g.add(sp);g.userData.mk=sp;
 return g}
function carsActive(){const M=MAPS[mapIdx];return !!M&&!!(M.osm||M.sq)&&!!go&&(SQ()||practice)}
// spots along Cody's main streets, spread around town (deterministic, so every player gets the same cars)
function carSpots(M){if(M._carSp)return M._carSp;if(M.carP){const ok=([x,z,yw])=>{const y=groundAt(x,z,Hf(x,z)+.3);const s=Math.sin(yw),c=Math.cos(yw);for(let u=-12;u<=26;u+=.8)for(const w of(Math.abs(u)<=3.2?[-1.3,0,1.3]:[-1,0,1])){const px=x+s*u+c*w,pz=z+c*u-s*w;if(Math.abs(Hf(px,pz)-y)>.8)return false;
  if(near(px,pz).some(b=>Math.abs(b[0]-px)<b[2]/2+.15&&Math.abs(b[1]-pz)<b[3]/2+.15&&b[4]>y+.5&&b[5]<y+2.2))return false}return true};const out=[];M._carBad=[];M.carP.forEach(p=>{const s=Math.sin(p[2]),c=Math.cos(p[2]);for(const o of [0,8,-8,16,-16,24,-24,36,-36,50,-50])for(const w of [0,1.5,-1.5]){const q=[p[0]+s*o+c*w,p[1]+c*o-s*w,p[2]];if(ok(q)){out.push(q);return}}M._carBad.push(p)});return M._carSp=out}
 const C=typeof CODY!=='undefined'?CODY:null,cand=[];if(!C)return M._carSp=[];
 C.rd.forEach(q=>{if(q[0]>1||q[3]===99)return;const w=q[1];for(let i=5;i+3<q.length;i+=2){const ax=q[i],az=q[i+1],bx=q[i+2],bz=q[i+3],l=Math.hypot(bx-ax,bz-az);if(l<14)continue;const ux=(bx-ax)/l,uz=(bz-az)/l;
  for(let t=7;t<l-7;t+=36){const off=Math.min(1.9,Math.max(1.3,w/4)),x=ax+ux*t-uz*off,z=az+uz*t+ux*off;if(Math.abs(x)>2700||Math.abs(z)>1700)continue;cand.push([x,z,Math.atan2(ux,uz)])}}});
 const free=([x,z,yw])=>{const y=groundAt(x,z,Hf(x,z)+.3);if(M.wl!=null&&Hf(x,z)<M.wl+1)return false;const s=Math.sin(yw),c=Math.cos(yw);for(let u=-12;u<=26;u+=.8)for(const w of(Math.abs(u)<=3.2?[-1.3,0,1.3]:[-1,0,1])){const px=x+s*u+c*w,pz=z+c*u-s*w;if(Math.abs(Hf(px,pz)-y)>.8)return false;
   if(near(px,pz).some(b=>Math.abs(b[0]-px)<b[2]/2+.15&&Math.abs(b[1]-pz)<b[3]/2+.15&&b[4]>y+.5&&b[5]<y+2.2))return false}return true};
 const R=rng(9871),pool=cand.filter(()=>R()<.5).filter(free),out=[];if(!pool.length)return M._carSp=[];
 const C0=M.mcC||[0,0];let best=pool.reduce((a,p)=>Math.hypot(p[0]-C0[0],p[1]-C0[1])<Math.hypot(a[0]-C0[0],a[1]-C0[1])?p:a);out.push(best);
 while(out.length<10&&out.length<pool.length){let bd=-1,bp=null;for(const p of pool){let d=1e9;for(const o of out)d=Math.min(d,Math.hypot(p[0]-o[0],p[1]-o[1]));if(d>bd){bd=d;bp=p}}out.push(bp)}
 return M._carSp=out}
function carsClear(){CARS.forEach(c=>{scene.remove(c.g);c.g.traverse(o=>{if(o.geometry)o.geometry.dispose()})});CARS=[];CARON=false;if(me.car)me.car=null}
function carsReset(){carsClear();if(!carsActive())return;const M=MAPS[mapIdx],S=carSpots(M);
 S.forEach((p,i)=>{const t=i%CAR_T.length,g=carMesh(t),y=groundAt(p[0],p[1],Hf(p[0],p[1])+.3);g.position.set(p[0],y,p[1]);g.rotation.y=p[2];scene.add(g);
  CARS.push({i,t,g,x:p[0],y,z:p[1],yaw:p[2],v:0,vy:0,st:0,pt:0,ws:0,o:[null,null,null,null],tx:p[0],ty:y,tz:p[1],tyaw:p[2],tst:0,tpt:0})});CARON=CARS.length>0}
// --- collision ---
const carT=c=>CAR_T[c.t];
// is a walking player at (x,z,y) inside a car?
function carBlock(x,z,y){for(const c of CARS){if(me.car&&me.car.i===c.i)continue;const T=carT(c),dx=x-c.x,dz=z-c.z;if(dx*dx+dz*dz>(T.L*T.L)/4+4)continue;const s=Math.sin(c.yaw),co=Math.cos(c.yaw),u=dx*s+dz*co,w=dx*co-dz*s;
  if(Math.abs(u)<T.L/2+.3&&Math.abs(w)<T.W/2+.3&&y+.55<c.y+T.H&&y+1.8>c.y+.1)return true}return false}
function carCircles(c,x,z,yw){const T=carT(c),s=Math.sin(yw),co=Math.cos(yw),r=T.W/2,n=3,o=[];for(let k=0;k<n;k++){const u=(k/(n-1)-.5)*(T.L-T.W);o.push([x+s*u,z+co*u,r])}return o}
function carFree(c,x,z,yw,y0){const T=carT(c),M=MAPS[mapIdx],s=Math.sin(yw),co=Math.cos(yw),hl=T.L/2,hw=T.W/2;
 if(RBX>0&&(Math.abs(x)>RBX-4||Math.abs(z)>RBZ-4))return false;if(BND>0&&x*x+z*z>(BND-4)*(BND-4))return false;
 if(M.wl!=null&&groundAt(x+s*hl,z+co*hl,y0+.62)<M.wl+.25)return false;
 const pt=(u,w)=>{const px=x+s*u+co*w,pz=z+co*u-s*w;for(const b of near(px,pz))if(Math.abs(b[0]-px)<b[2]/2&&Math.abs(b[1]-pz)<b[3]/2&&b[4]>y0+.62&&b[5]<y0+T.H)return true;return false};
 for(let u=-hl;u<=hl+.01;u+=hl/4){if(pt(u,hw)||pt(u,-hw))return false}for(const w of[-hw/2,0,hw/2]){if(pt(hl,w)||pt(-hl,w))return false}
 const mine=carCircles(c,x,z,yw);for(const o of CARS){if(o===c)continue;const T2=carT(o);if(Math.hypot(o.x-x,o.z-z)>(T.L+T2.L)/2+.5)continue;for(const a of carCircles(o,o.x,o.z,o.yaw))for(const b of mine)if(Math.hypot(a[0]-b[0],a[1]-b[1])<a[2]+b[2])return false}
 return true}
const angD=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
// --- driving (only the driver simulates their car; everyone else follows the driver's updates) ---
function carDrive(c,dt){const T=carT(c),lk=!!document.pointerLockElement&&!chatOn,th=lk?(held_('fwd')?1:0)-(held_('back')?1:0):0,sr=lk?(held_('left')?1:0)-(held_('right')?1:0):0,brk=17;
 if(th>0)c.v+=(c.v<-.3?brk:T.acc*Math.max(.08,1-c.v/T.vmax))*dt;
 else if(th<0){if(c.v>.3)c.v=Math.max(0,c.v-brk*dt);else c.v=Math.max(-9,c.v-T.acc*.55*dt)}
 else{const dr=(1.6+.0045*c.v*c.v)*dt;c.v=Math.abs(c.v)<=dr?0:c.v-Math.sign(c.v)*dr}
 const smax=.62/(1+Math.abs(c.v)/13);c.st+=(sr*smax-c.st)*Math.min(1,dt*7);
 const yr0=c.v/T.wb*Math.tan(c.st),yr=Math.sign(yr0)*Math.min(Math.abs(yr0),12/Math.max(1,Math.abs(c.v))),nyw=c.yaw+yr*dt,nx=c.x+Math.sin(nyw)*c.v*dt,nz=c.z+Math.cos(nyw)*c.v*dt;
 // ground under the new spot: small steps (kerbs) are fine, walls of earth are not
 const gN=groundAt(nx,nz,c.y+.62),climb=gN-c.y,ok=climb<Math.max(.62,Math.abs(c.v*dt)*1.1)&&carFree(c,nx,nz,nyw,c.y);
 if(ok){c.x=nx;c.z=nz;c.yaw=nyw}else{if(Math.abs(c.v)>6)beep(90,.12,'sawtooth');if(Math.abs(yr)>0&&carFree(c,c.x,c.z,nyw,c.y))c.yaw=nyw;c.v=-c.v*.25}
 // wheels on the ground: average of front and back, falling when driving off an edge
 const s=Math.sin(c.yaw),co=Math.cos(c.yaw),hb=T.wb/2,gf=groundAt(c.x+s*hb,c.z+co*hb,c.y+.62),gb=groundAt(c.x-s*hb,c.z-co*hb,c.y+.62),gy=Math.max(gf,gb,groundAt(c.x,c.z,c.y+.62))-Math.abs(gf-gb)*.15;
 if(c.y>gy+.04){c.vy-=(MAPS[mapIdx].grav||18)*dt;c.y=Math.max(gy,c.y+c.vy*dt);if(c.y<=gy)c.vy=0}else{c.y=gy;c.vy=0}
 c.pt+=(Math.atan2(gb-gf,T.wb)-c.pt)*Math.min(1,dt*8);c.tx=c.x;c.ty=c.y;c.tz=c.z;c.tyaw=c.yaw;c.tst=c.st;c.tpt=c.pt;
 carSendT-=dt;if(carSendT<=0){carSendT=.05;send({t:'cs',i:c.i,x:+c.x.toFixed(2),y:+c.y.toFixed(2),z:+c.z.toFixed(2),yw:+c.yaw.toFixed(3),v:+c.v.toFixed(2),st:+c.st.toFixed(2),pt:+c.pt.toFixed(3)})}}
function seatPos(c,s){const T=carT(c),q=SEATS[s],si=Math.sin(c.yaw),co=Math.cos(c.yaw),w=q[0]*T.W,u=q[1]*T.L/2;return[c.x+si*u+co*w,c.z+co*u-si*w]}
// --- per frame ---
function carTick(dt){meTick(dt);lavaTick(dt);crouchTick(dt);pjTick(dt);if(typeof lootTick==='function')lootTick(dt);if(typeof botTick==='function')botTick(dt);if(typeof fxTick==='function')fxTick(dt);if(go&&!me.out)loadoutSync();if(!CARON)return;
 const mc=me.car?CARS[me.car.i]:null;
 for(const c of CARS){const T=carT(c);if(mc===c&&me.car.s===0&&go&&!me.out)carDrive(c,dt);
  else{const k=1-Math.exp(-dt*12);c.v=c.v||0;if(Math.hypot(c.tx-c.x,c.tz-c.z)>40){c.x=c.tx;c.z=c.tz;c.y=c.ty}c.x+=(c.tx-c.x)*k;c.y+=(c.ty-c.y)*k;c.z+=(c.tz-c.z)*k;c.yaw+=angD(c.tyaw,c.yaw)*k;c.st+=(c.tst-c.st)*k;c.pt+=(c.tpt-c.pt)*k}
  c.g.position.set(c.x,c.y,c.z);c.g.rotation.y=c.yaw;c.g.userData.b.rotation.x=c.pt;c.ws+=(c.v||0)*dt/T.wr;
  c.g.userData.wh.forEach(w=>{w.sp.rotation.x=c.ws;w.piv.rotation.y=w.front?c.st:0});
  const d=Math.hypot(cam.position.x-c.x,cam.position.z-c.z);c.g.userData.mk.visible=!!go&&!c.o.some(Boolean)&&!me.car&&d<90&&d>5;c.g.visible=d<(MAPS[mapIdx].far||420)}
 if(mc&&go){const[sx,sz]=seatPos(mc,me.car.s);me.x=sx;me.z=sz;me.y=mc.y-.35;me.vy=0;me.zoom=false}
 if(isHost&&!practice&&go){carAllT-=dt;if(carAllT<=0){carAllT=1;send({t:'call',c:CARS.map(c=>[+c.x.toFixed(2),+c.y.toFixed(2),+c.z.toFixed(2),+c.yaw.toFixed(3),...c.o.map(x=>x||0)])})}}}
// sitting players (remote and you), drawn smaller so they fit under the roof
function seatPose(R,c,s){const T=carT(c),[x,z]=seatPos(c,s),sc=Math.max(.55,Math.min(.8,(T.H-.1-T.seat)/1.24));R.g.scale.setScalar(sc);R.g.position.set(x,c.y+T.seat-.86*sc+.04,z);R.g.rotation.y=c.yaw+Math.PI;
 R.legs.forEach(l=>l.rotation.x=1.45);R.arms.rotation.x=s===0?1.2:.35;R.head.rotation.x=0;R.guns.forEach(g=>g.visible=false)}
function carPoseAll(){if(!CARON)return;for(const p of Object.values(players)){const r=p.rt;if(!r.cr||!p.R.g.visible){if(p.R.g.scale.x!==1)p.R.g.scale.setScalar(1);continue}const c=CARS[r.cr[0]];if(!c)continue;seatPose(p.R,c,r.cr[1]);
  const q=p.R.g.position;p.hb.position.set(q.x,q.y+2.1,q.z);p.tg.position.set(q.x,q.y+2.5,q.z)}
 if(me.car&&meR.g.visible){const c=CARS[me.car.i];if(c)seatPose(meR,c,me.car.s)}}
// chase camera around the car (mouse orbits; it swings back behind the car while you drive)
let lastMM=0;addEventListener('mousemove',()=>{if(document.pointerLockElement)lastMM=performance.now()});
function carCam(dt){const c=me.car&&CARS[me.car.i];if(!c)return false;const T=carT(c);
 if(me.car.s===0&&Math.abs(c.v)>4&&performance.now()-lastMM>1100){const ty=c.yaw+(c.v<0?0:Math.PI);me.yaw+=angD(ty,me.yaw)*Math.min(1,dt*2.2);me.pitch+=(-.12-me.pitch)*Math.min(1,dt*1.5)}
 const ph=Math.max(-.12,Math.min(1.15,-me.pitch+.22)),d=T.L*1.05+3.2,tg=new V(c.x,c.y+T.H+.35,c.z),dir=new V(Math.sin(me.yaw)*Math.cos(ph),Math.sin(ph),Math.cos(me.yaw)*Math.cos(ph));
 const dd=Math.max(1.2,Math.min(d,wallDist(tg,dir)-.4));cam.position.copy(tg).addScaledVector(dir,dd);if(cam.position.y<Hf(cam.position.x,cam.position.z)+.4)cam.position.y=Hf(cam.position.x,cam.position.z)+.4;cam.lookAt(tg);return true}
// --- getting in and out ---
function nearCar(){let best=null,bd=1e9;for(const c of CARS){const T=carT(c),d=Math.hypot(me.x-c.x,me.z-c.z);if(d<T.L/2+1.9&&Math.abs(me.y-c.y)<2.5&&d<bd){bd=d;best=c}}return best}
function carPrompt(){if(!CARON||!go||me.out||me.bus||me.glide)return null;const U=pretty(BIND.use);
 if(me.car){const c=CARS[me.car.i];return U+'  Get out'+(me.car.s===0?'   ·   '+pretty(BIND.fwd)+' gas  '+pretty(BIND.back)+' brake/reverse  '+pretty(BIND.left)+'/'+pretty(BIND.right)+' steer':'   ·   riding in the '+carT(c).n)}
 const c=nearCar();if(!c)return null;if(c.o.every(Boolean))return 'This car is full (4 seats)';return c.o[0]?U+'  Ride in the '+carT(c).n+' ('+c.o.filter(x=>!x).length+' seats free)':U+'  Drive the '+carT(c).n}
function carUse(){if(!CARON||!go||me.out||me.bus||me.glide)return false;if(me.car){carLeave();return true}const c=nearCar();if(!c)return false;
 const s=c.o[0]?c.o.findIndex((x,k)=>k>0&&!x):0;if(s<0){feed('That car is full',1);return true}
 if(isHost)carSeatReq(me.id,c.i,s);else send({t:'cseat',i:c.i,s});return true}
function carExitSpot(c){const T=carT(c),si=Math.sin(c.yaw),co=Math.cos(c.yaw),side=me.car&&SEATS[me.car.s][0]<0?-1:1;
 for(const [w,u] of [[side*(T.W/2+.9),0],[-side*(T.W/2+.9),0],[0,-(T.L/2+1)],[0,T.L/2+1],[side*(T.W/2+2),0]]){const x=c.x+si*u+co*w,z=c.z+co*u-si*w,y=groundAt(x,z,c.y+1);if(!blocked(x,z,y)&&!carBlock(x,z,y)&&y-c.y<1.5)return[x,z,y]}
 const q=safeSpot(c.x+co*(T.W/2+1.2),c.z-si*(T.W/2+1.2));return[q[0],q[1],Hf(q[0],q[1])]}
function exitLocal(place){const c=me.car&&CARS[me.car.i];if(c&&place){const[x,z,y]=carExitSpot(c);me.x=x;me.z=z;me.y=y;me.vy=0;if(me.car.s===0){c.v=0;send({t:'cs',i:c.i,x:+c.x.toFixed(2),y:+c.y.toFixed(2),z:+c.z.toFixed(2),yw:+c.yaw.toFixed(3),v:0,st:0,pt:+c.pt.toFixed(3)})}}
 me.car=null;meR.g.scale.setScalar(1);hud()}
function carLeave(dead){if(!me.car)return;const i=me.car.i;exitLocal(!dead);if(isHost)carSeatReq(me.id,i,-1);else send({t:'cseat',i,s:-1})}
// host decides who sits where
function carSeatReq(id,i,s){const c=CARS[i];if(!c)return;const ch=new Set();
 if(s<0){c.o.forEach((x,k)=>{if(x===id){c.o[k]=null;ch.add(c.i)}})}
 else{if(c.o.includes(id))return;let k=c.o[s]?c.o.findIndex((x,q)=>q>0&&!x):s;if(s===0&&c.o[0])k=c.o.findIndex((x,q)=>q>0&&!x);if(k<0)return;
  CARS.forEach(o=>o.o.forEach((x,q)=>{if(x===id){o.o[q]=null;ch.add(o.i)}}));c.o[k]=id;ch.add(c.i)}
 ch.forEach(n=>{const m={t:'cocc',i:n,o:CARS[n].o.map(x=>x||0)};send(m);setOcc(n,m.o)})}
function carDrop(id){if(!isHost||!CARON)return;CARS.forEach(c=>{if(c.o.includes(id))carSeatReq(id,c.i,-1)})}
function setOcc(i,o){const c=CARS[i];if(!c)return;c.o=o.map(x=>x||null);const s=c.o.indexOf(me.id);
 if(s>=0){if(!me.car||me.car.i!==i||me.car.s!==s){const was=!!me.car;me.car={i,s};me.zoom=false;if(!was){me.yaw=c.yaw+Math.PI;me.pitch=-.15;beep(420,.08,'triangle')}if(s===0){c.v=0;c.tx=c.x;c.tz=c.z}hud()}}
 else if(me.car&&me.car.i===i)exitLocal(true)}
function carMsg(m){if(!CARON)return;if(m.t==='cocc'){setOcc(m.i,m.o);return}
 if(m.t==='cs'){const c=CARS[m.i];if(!c||c.o[0]!==m.f)return;if(me.car&&me.car.i===m.i&&me.car.s===0)return;c.tx=m.x;c.ty=m.y;c.tz=m.z;c.tyaw=m.yw;c.v=m.v;c.tst=m.st;c.tpt=m.pt;return}
 if(m.t==='call'&&!isHost){m.c.forEach((q,i)=>{const c=CARS[i];if(!c)return;const o=q.slice(4).map(x=>x||null);if(o.join()!==c.o.map(x=>x||0).join())setOcc(i,o);if(!c.o[0]){c.tx=q[0];c.ty=q[1];c.tz=q[2];c.tyaw=q[3];c.v=0}})}}
// --- map markers: cars (always shown, even while driven) and teammates ---
function drawMapExtras(g,toS,s,u,W,rot,yw){
 if(CARON)for(const c of CARS){const T=carT(c),[px,py]=toS(c.x,c.z);if(px<-20||py<-20||px>W+20||py>W+20)continue;const fx=Math.sin(c.yaw),fz=Math.cos(c.yaw),co=Math.cos(yw),si=Math.sin(yw),sx=fx*co-fz*si,sy=fx*si+fz*co,
   l=Math.max(T.L*s,18*u),w=Math.max(T.W*s,9.5*u),busy=c.o.some(Boolean);g.save();g.translate(px,py);g.rotate(Math.atan2(sy,sx));g.fillStyle='#'+hex(T.col===0x1b1d20?0x3a4ad8:T.col===0x2b2f33?0x6a7a8a:T.col);g.strokeStyle=busy?'#f0b23c':'#ffffff';g.lineWidth=(busy?2.6:1.6)*u;
   g.fillStyle='#111';[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b2])=>g.fillRect(a*l*.3-l*.1,b2*w/2-(b2<0?2*u:0)-u*.6,l*.2,2.6*u));g.fillStyle='#'+hex(T.col===0x1b1d20?0x3a4ad8:T.col===0x2b2f33?0x6a7a8a:T.col);
   g.beginPath();if(g.roundRect)g.roundRect(-l/2,-w/2,l,w,2.5*u);else g.rect(-l/2,-w/2,l,w);g.fill();g.stroke();g.fillStyle='rgba(10,16,22,.85)';g.fillRect(l*.06,-w/2+1.4*u,l*.16,w-2.8*u);g.fillRect(-l*.34,-w/2+1.6*u,l*.1,w-3.2*u);g.restore()}
 if(SQ())for(const p of Object.values(players)){if(!mate(p)||p.out||!p.seen)continue;const q=p.R.g.position,[px,py]=toS(q.x,q.z),cx=Math.max(10*u,Math.min(W-10*u,px)),cy=Math.max(10*u,Math.min(W-10*u,py)),a=-(p.rt.yaw||0)+(rot?yw:0);
  g.save();g.translate(cx,cy);g.rotate(a);g.fillStyle=TCOL[me.tm|0];g.strokeStyle='#0a1016';g.lineWidth=2*u;g.beginPath();g.moveTo(0,-8*u);g.lineTo(5.5*u,6*u);g.lineTo(0,3*u);g.lineTo(-5.5*u,6*u);g.closePath();g.fill();g.stroke();g.restore();
  g.font='bold '+(11*u)+'px Arial';g.textAlign='center';g.lineWidth=3*u;g.strokeStyle='rgba(0,0,0,.8)';g.strokeText(p.name,cx,cy-11*u);g.fillStyle='#fff';g.fillText(p.name,cx,cy-11*u)}}


// =====================================================================================================
// ---------- skin loadouts: every skin has its own two weapons / perks ----------
// =====================================================================================================
// weapon ids: see WP in game.js. kind 'melee' = swing, 'proj' = thrown/launched object, otherwise hitscan
const LOADOUT=Array.from({length:10},()=>[0,1,2,3]);// every skin: pistol, rifle, shotgun, sniper
const LO=()=>me.sk===10?[0,1,2,3,23]:LOADOUT[me.sk]||LOADOUT[0];
function maxHP(){return me.sk===10?1000:100}
const skinSpeed=()=>me.sk===10?2.2:1;
// keep the selected weapon inside the current skin's loadout and rebuild the weapon bar
let WLsk=-1;
function loadoutSync(force){if(typeof LOOT==='function'&&LOOT())return;if(!force&&WLsk===me.sk&&LO().includes(me.w))return;WLsk=me.sk;const L=LO(),wl=$('wl');wl.innerHTML='';
 L.forEach(i=>{const d=document.createElement('div');d.innerHTML='<b></b>'+WP[i].n+'<span class="am"></span>';wl.appendChild(d)});if(!L.includes(me.w))setW(L[0]);else hudW()}
// remember the skin perk on the outfit picker
function slotW(n){if(typeof LOOT==='function'&&LOOT()){lootSel(n);return}const L=LO();if(n<L.length)setW(L[n])}
function cycleW(d){if(typeof LOOT==='function'&&LOOT()){lootCycle(d);return}const L=LO(),i=Math.max(0,L.indexOf(me.w));setW(L[(i+d+L.length)%L.length])}

// ---------- melee: the nearest enemy in front of you, within reach, and not behind a wall ----------
const _mo=new V(),_mf=new V(),_md=new V();
function meleeHit(W){_mo.copy(typeof tpOrigin==='function'?tpOrigin():cam.position);cam.getWorldDirection(_mf);let best=null,bd=1e9;
 for(const p of Object.values(players)){if(!p.R.g.visible||p.dead||mate(p))continue;const r=p.rt;_md.set(r.x-_mo.x,r.y+1.1-_mo.y,r.z-_mo.z);const d=_md.length();if(d>W.rng+.6)continue;_md.normalize();
  if(_md.dot(_mf)<(W.rng>4?.9:.72))continue;if(wallDist(_mo,_md)<d-.7)continue;if(d<bd){bd=d;best=p}}
 const tip=_mo.clone().addScaledVector(_mf,Math.min(W.rng,best?bd:W.rng));if(W.lash){tracer(_mo.clone().add(new V(0,-.25,0)),tip,0x6b4423);send({t:'s',l:[[..._mo.clone().add(new V(0,-.25,0)).toArray(),...tip.toArray()]],q:1,c:0x6b4423})}
 swing=1;beep(W.f,.08,'triangle');if(best)hitPlayer(best,W.d,false)}
let swing=0;
// ---------- projectiles: tennis balls, ninja stars, crossbow bolts, pitchforks and corn grenades ----------
// the thrower simulates its own and decides hits; everyone else gets a copy just to see it fly
const PJ=[],PJT={6:{sp:55,g:3,life:2.2,m:()=>{const s=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),new THREE.MeshStandardMaterial({color:0xd8f04a,roughness:.6}));return s}},
 9:{sp:42,g:2,life:1.9,spin:1,m:()=>makeGun(9,0)},13:{sp:85,g:4,life:2.5,m:()=>{const g=new THREE.Group();bx(g,.03,.03,.55,0x8a8f96,0,0,-.2);bx(g,.08,.08,.06,0xc23b2f,0,0,.05);return g}},
 15:{sp:30,g:9,life:2.4,m:()=>makeGun(15,0)},14:{sp:22,g:16,life:3,boom:1,spin:1,m:()=>makeGun(14,0)}};
function throwProj(W,id){const o=(typeof tpOrigin==='function'?tpOrigin():cam.position).clone(),fw=new V();cam.getWorldDirection(fw);const T=PJT[id],v=fw.clone().multiplyScalar(T.sp);if(T.boom)v.y+=4;
 o.addScaledVector(fw,.7);o.y-=.15;pjSpawn(id,o,v,true,me.id);send({t:'pj',k:id,p:o.toArray().map(n=>+n.toFixed(2)),v:v.toArray().map(n=>+n.toFixed(2))});swing=1;beep(W.f,.06,'sine')}
function pjSpawn(id,p,v,own,f){const T=PJT[id];if(!T)return;const m=T.m();m.position.copy(p);m.lookAt(p.clone().add(v));scene.add(m);PJ.push({id,p:p.clone(),v:v.clone(),own,f,t:0,m,T,hit:new Set()})}
const _pd=new V();
// real bullets for the 4 basic guns: they take time to fly and drop a little over long distances
const BLG=new THREE.BoxGeometry(.035,.035,1.4).translate(0,0,-.7),BLM={};
function blMesh(c){const m=BLM[c]||(BLM[c]=new THREE.MeshBasicMaterial({color:c,fog:false,transparent:true,opacity:.9}));return new THREE.Mesh(BLG,m)}
Object.assign(PJT,{0:{sp:280,g:7,life:.9,bl:1,m:()=>blMesh(0xffe08a)},1:{sp:320,g:6,life:1.1,bl:1,m:()=>blMesh(0xffd060)},2:{sp:220,g:9,life:.26,bl:1,m:()=>blMesh(0xffc080)},3:{sp:520,g:5,life:2.4,bl:1,m:()=>blMesh(0xbfe8ff)},17:{sp:300,g:7,life:1,bl:1,m:()=>blMesh(0xffe08a)},18:{sp:260,g:8,life:.75,bl:1,m:()=>blMesh(0xffe08a)},20:{sp:21,g:15,life:2.6,boom:'frag',spin:1,m:()=>makeGun(20,0)}});
function bulletFire(w,o,d){const T=PJT[w],p=o.clone().addScaledVector(d,.6),v=d.clone().multiplyScalar(T.sp);pjSpawn(w,p,v,true,me.id);PJ[PJ.length-1].dm=WP[w].d*(typeof rarD==='function'?rarD():1);return[...p.toArray(),...v.toArray()].map(n=>+n.toFixed(2))}
function bulletMsg(m){(m.b||[]).forEach(s=>pjSpawn(m.w,new V(s[0],s[1],s[2]),new V(s[3],s[4],s[5]),false,m.f));const s=m.b&&m.b[0];if(s&&!m.q){if(typeof vaShot==='function'&&!mate(players[m.f]))vaShot(s[0],s[2]);beep(200,.08)}}

function pjTick(dt){for(let i=PJ.length-1;i>=0;i--){const q=PJ[i],T=q.T;q.t+=dt;const op=q.p.clone();q.v.y-=T.g*dt;q.p.addScaledVector(q.v,dt);const seg=q.p.distanceTo(op);_pd.copy(q.p).sub(op).normalize();
  let end=q.t>T.life,wall=seg>0?wallDist(op,_pd):1e9;if(wall<seg){q.p.copy(op).addScaledVector(_pd,Math.max(0,wall-.05));end=true}
  if(q.own&&!T.boom&&seg>0){let best=null,bd=Math.min(seg,wall);for(const p of Object.values(players)){if(!p.R.g.visible||p.dead||mate(p)||q.hit.has(p.id))continue;const h=hitP(p,op,_pd,bd);if(h&&h.d<bd){bd=h.d;best={p,hs:h.hs}}}
   if(best){q.hit.add(best.p.id);hitPlayer(best.p,Math.round((q.dm||WP[q.id].d)*(best.hs?2:1)),best.hs);end=true}}
  if(T.boom&&!end)for(const p of Object.values(players)){if(!p.R.g.visible||p.dead||mate(p))continue;const r=p.rt;if(Math.hypot(r.x-q.p.x,r.y+1-q.p.y,r.z-q.p.z)<1.2){end=true;break}}
  q.m.position.copy(q.p);if(T.spin)q.m.rotation.x+=dt*18;else q.m.lookAt(q.p.clone().add(q.v));
  if(end){scene.remove(q.m);PJ.splice(i,1);if(T.boom)(T.boom==='frag'&&typeof fragBoom==='function'?fragBoom:popcorn)(q.p,q.own)}}
 for(let i=POP.length-1;i>=0;i--){const k=POP[i];k.t+=dt;if(k.t>k.life){scene.remove(k.m);k.m.geometry.dispose();POP.splice(i,1);continue}k.v.y-=9*dt;k.m.position.addScaledVector(k.v,dt);if(k.m.position.y<Hf(k.m.position.x,k.m.position.z)+.05){k.m.position.y=Hf(k.m.position.x,k.m.position.z)+.05;k.v.multiplyScalar(.3)}if(k.grow){const s=1+k.t*k.grow;k.m.scale.setScalar(s);k.m.material.opacity=Math.max(0,1-k.t/k.life)}}}
// the corn grenade bursts into popcorn: 60 damage close up, less further out
const POP=[],popM=[0xfff6dc,0xffe9a8,0xf2c230].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.9}));
function popcorn(p,own){beep(90,.35,'sawtooth');beep(160,.25,'square');
 const fl=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),new THREE.MeshBasicMaterial({color:0xffc040,transparent:true,opacity:.85}));fl.position.copy(p);scene.add(fl);POP.push({m:fl,v:new V(),t:0,life:.45,grow:9});
 for(let i=0;i<70;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.14,.12,.14),popM[i%3]);m.position.copy(p);m.rotation.set(Math.random()*3,Math.random()*3,0);scene.add(m);const a=Math.random()*6.283,u=Math.random()*.9+.2,s=5+Math.random()*7;POP.push({m,v:new V(Math.cos(a)*s*(1-u*.4),u*s,Math.sin(a)*s*(1-u*.4)),t:0,life:2.5+Math.random()})}
 if(!own)return;for(const pl of Object.values(players)){if(!pl.R.g.visible||pl.dead||mate(pl))continue;const r=pl.rt,d=Math.hypot(r.x-p.x,r.y+1-p.y,r.z-p.z);if(d>6.5)continue;hitPlayer(pl,Math.round(d<4?60:60-(d-4)*16),false)}
}
function pjMsg(m){pjSpawn(m.k,new V(...m.p),new V(...m.v),false,m.f)}
// ---------- the special-weapon fire path (called by shoot() for melee and projectile weapons) ----------
function special(W){if(W.kind==='use'||W.kind==='nade'){if(typeof lootAct==='function')lootAct(W);return}if(W.kind==='melee')meleeHit(W);else throwProj(W,me.w)}

// =====================================================================================================
// ---------- sneaking: hold the crouch key to crouch, move slowly and hide your footsteps ----------
// =====================================================================================================
let eyeH=1.7;
function crouchTick(dt){me.ck=!!go&&!me.out&&!me.bus&&!me.glide&&!me.car&&!me.swim&&!!document.pointerLockElement&&!chatOn&&held_('crouch');eyeH+=((me.ck?1.05:1.7)-eyeH)*Math.min(1,dt*12);
 swing=Math.max(0,swing-dt*4);vm.rotation.z=-swing*.9;vm.rotation.y=swing*.6}
const quietSteps=()=>me.ck;// only sneaking hides your footsteps


// =====================================================================================================
// ---------- Volcano Isle: the crater and the lava channels burn (25 health a second while you stand in them) ----------
// =====================================================================================================
let lavaT=0,lavaMsg=0;const lavaFx=document.createElement('div');lavaFx.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:5;opacity:0;transition:opacity .25s;background:radial-gradient(ellipse at center,rgba(255,120,20,0) 35%,rgba(255,70,0,.55) 100%)';document.body.appendChild(lavaFx);
const segD=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));return Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t)};
function inLava(x,z,y){const L=MAPS[mapIdx].lava;if(!L)return false;if(y>Hf(x,z)+.7)return false;const dv=Math.hypot(x-L.vc[0],z-L.vc[1]);if(dv<15)return true;if(dv<17)return false;
 if(Math.hypot(x,z)>L.isl(x,z)-3)return false;for(const P of L.ch)for(let i=0;i<P.length-1;i++)if(segD(x,z,P[i],P[i+1])<2.8)return true;return false}
function lavaTick(dt){const on=!!go&&!me.out&&!me.bus&&!me.glide&&!ending&&inLava(me.x,me.z,me.car?me.y+.35:me.y);lavaFx.style.opacity=on?1:0;if(!on){lavaT=0;return}
 const d=25*dt;if(me.sh>0){const a=Math.min(me.sh,d);me.sh-=a;me.hp-=d-a}else me.hp-=d;lavaT-=dt;if(lavaT<=0){lavaT=.35;flash();beep(140,.1,'sawtooth');hud()}
 if(performance.now()>lavaMsg){lavaMsg=performance.now()+4000;feed('The lava is burning you!',1)}if(me.hp<=0){me.hp=0;die('lava')}}
