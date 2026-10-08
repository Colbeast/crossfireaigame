const FXI=10;let fxU=false;try{fxU=localStorage.getItem('cf_fx9')==='1'}catch(e){}
function fxChime(){[784,988,1175,1568,2093].forEach((f,k)=>setTimeout(()=>beep(f,.25,'sine'),k*90))}
function openSkins(cb){const L=SK.map((s,i)=>i).filter(i=>fxU||!SK[i].fx),items=L.map(i=>({img:SKP[i],n:SK[i].n,t:''}));openCar('Choose your skin',items,Math.max(0,L.indexOf(me.sk)),j=>cb(L[j]));if(fxU||!car)return;
 let cnt=0;const nx=car.next,pv=car.prev,bump=()=>{if(++cnt<5*L.length)return;fxU=true;try{localStorage.setItem('cf_fx9','1')}catch(e){}car.x();fxChime();
  openCar(_d('Tfdsfu!tljo!vompdlfe"'),SK.map((s,i)=>({img:SKP[i],n:s.n,t:''})),FXI,cb)};
 car.next=()=>{nx();bump()};car.prev=()=>{pv();bump()}}

const FXT=(()=>{const c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d'),r=g.createRadialGradient(16,16,0,16,16,16);r.addColorStop(0,'rgba(255,255,240,1)');r.addColorStop(.25,'rgba(255,230,140,.9)');r.addColorStop(1,'rgba(255,200,60,0)');g.fillStyle=r;g.fillRect(0,0,32,32);
 g.fillStyle='rgba(255,255,230,.9)';g.fillRect(15,2,2,28);g.fillRect(2,15,28,2);return new THREE.CanvasTexture(c)})();
const FXS=new Set(),FXM=new THREE.PointsMaterial({color:0xffffff,map:FXT,size:.16,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
function fxMeshes(R){const out=[];['sh','pa','sk','hr','so'].forEach(k=>(R.P[k]||[]).forEach(m=>out.push(m)));(R.ex||[]).forEach(m=>out.push(m));return out}
function skinFx(R,i){const fx=!!(SK[i]&&SK[i].fx);
 fxMeshes(R).forEach(m=>{const q=m.material;if(!q||!q.emissive)return;q.metalness=fx?.35:.1;q.roughness=fx?.3:.75;q.emissive.set(fx?0xb07800:0);q.emissiveIntensity=fx?.6:1});
 if(fx&&!R.spk){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(66),3));R.spk=new THREE.Points(g,FXM);R.spk.frustumCulled=false;R.spk.userData.ns=1;
  R.spk.userData.s=Array.from({length:22},()=>[Math.random()*6.283,Math.random(),.45+Math.random()*.35,.6+Math.random()*.8]);R.g.add(R.spk);FXS.add(R)}
 else if(!fx&&R.spk){R.g.remove(R.spk);R.spk.geometry.dispose();R.spk=null;FXS.delete(R)}}

const _fe=new V(),_fd=new V();
function fxAim(){if(me.sk!==FXI||!go||me.out||me.bus||me.car||!document.pointerLockElement)return;if(!(held_('fire')||held_('aim')))return;
 _fe.set(me.x,me.y+1.7,me.z);let best=null,bs=1e9;const fy=me.yaw,fp=me.pitch;
 for(const p of Object.values(players)){if(p.dead||p.out||!p.R.g.visible||mate(p))continue;const q=p.rt,tx=q.x,ty=q.y+(q.cr?1.2:q.ck?1.3:1.85),tz=q.z,dx=tx-_fe.x,dy=ty-_fe.y,dz=tz-_fe.z,d=Math.hypot(dx,dy,dz);if(d>220)continue;
  const yw=Math.atan2(-dx,-dz),pt=Math.atan2(dy,Math.hypot(dx,dz)),off=Math.abs(Math.atan2(Math.sin(yw-fy),Math.cos(yw-fy)))+Math.abs(pt-fp);if(off>1.2)continue;
  _fd.set(dx/d,dy/d,dz/d);if(wallDist(_fe,_fd)<d-.6)continue;const sc=off*40+d;if(sc<bs){bs=sc;best=[yw,pt]}}
 if(best){me.yaw=best[0];me.pitch=Math.max(-1.5,Math.min(1.5,best[1]));cam.rotation.set(me.pitch,me.yaw,0)}}

function fxTick(dt){const t=performance.now()/1000;
 for(const R of FXS){if(!R.spk)continue;if(!R.g.visible)continue;const pa=R.spk.geometry.attributes.position;
  R.spk.userData.s.forEach((s,j)=>{const u=(t*.35*s[3]+s[1])%1,a=s[0]+t*1.3;pa.setXYZ(j,Math.cos(a)*s[2],.1+u*2.3,Math.sin(a)*s[2])});pa.needsUpdate=true;
  fxMeshes(R).forEach((m,k)=>{if(m.material&&m.material.emissive)m.material.emissiveIntensity=.35+.45*Math.max(0,Math.sin(t*4+k*.9))})}
 fxAim();
 if(typeof LOOT==='function'&&LOOT()&&go&&!me.out&&me.slot<0){if(me.sk===FXI&&me.w===19)setW(23);else if(me.sk!==FXI&&me.w===23)setW(19)}}
