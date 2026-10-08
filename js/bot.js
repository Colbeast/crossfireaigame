// ===== Practice bot: moves around, chases you, strafes, jumps and shoots back =====
const BOT={spd:5.2,range:70,dmg:10,rate:.16,burst:[4,8],mag:30,rl:2.2,react:.55};
const _be=new V(),_bd=new V(),_bt=new V();
function botEye(r){return _be.set(r.x,r.y+1.65,r.z)}
// can the bot see your head or chest?
function botSees(r){const e=botEye(r);for(const h of [1.6,1.0]){_bd.set(me.x-e.x,me.y+h-e.y,me.z-e.z);const L=_bd.length();_bd.normalize();if(wallDist(e,_bd,L+1)>=L-.3)return L}return 0}
function botTryMove(b,dx,dz){const r=b.rt,ok=(x,z)=>{const g=groundAt(x,z,r.y+.6);return g<=r.y+.6&&!blocked(x,z,Math.max(g,r.y))};
 let moved=false;if(ok(r.x+dx,r.z)){r.x+=dx;moved=true}if(ok(r.x,r.z+dz)){r.z+=dz;moved=true}return moved}
function botTick(dt){const b=players.bot;if(!b||!practice)return;if(!go||b.dead||ending){b.ai=null;return}
 const r=b.rt;let A=b.ai;if(!A)A=b.ai={vy:0,cd:BOT.react,ammo:BOT.mag,rl:0,burst:0,strafe:Math.random()<.5?-1:1,st:1+Math.random()*2,stuck:0,wander:0,wa:0,seen:0,jump:2+Math.random()*3};
 const dx=me.x-r.x,dz=me.z-r.z,dist=Math.hypot(dx,dz),alive=!me.out&&me.hp>0;
 const sees=alive&&dist<BOT.range?botSees(r):0;A.seen=sees?Math.min(A.seen+dt,5):0;
 // ---- movement ----
 let mx=0,mz=0;const ux=dist>.01?dx/dist:0,uz=dist>.01?dz/dist:0;
 if(A.wander>0){A.wander-=dt;mx=Math.cos(A.wa);mz=Math.sin(A.wa)}
 else if(!alive){}
 else if(!sees||dist>22){mx=ux;mz=uz}                                       // chase you down
 else{A.st-=dt;if(A.st<=0){A.strafe=-A.strafe;A.st=.8+Math.random()*1.8}      // circle-strafe at fighting range
  const keep=dist<8?-.8:dist>16?.6:0;mx=-uz*A.strafe+ux*keep;mz=ux*A.strafe+uz*keep}
 const ml=Math.hypot(mx,mz);if(ml>0){const s=BOT.spd*(A.wander>0?.8:1)*dt/ml;let mvx=mx*s,mvz=mz*s;
  if(!botTryMove(b,mvx,mvz)&&A.wander<=0){// blocked: commit to a detour around it instead of jittering
   for(const a of [.9,-.9,1.7,-1.7,2.6,-2.6]){const c=Math.cos(a),sn=Math.sin(a),vx=mvx*c-mvz*sn,vz=mvx*sn+mvz*c;if(botTryMove(b,vx,vz)){A.wander=.7+Math.random()*.6;A.wa=Math.atan2(vz,vx);break}}}}
 // no real progress for a second while trying to move: jump and head off somewhere else for a bit
 A.pt=(A.pt||0)+dt;if(A.pt>1){const moved=Math.hypot(r.x-(A.px??r.x),r.z-(A.pz??r.z));if(ml>0&&moved<1.2){A.wander=1.4+Math.random()*1.2;A.wa=Math.random()*6.283;if(A.vy===0)A.vy=6.5}A.pt=0;A.px=r.x;A.pz=r.z}
 // ---- jumping and gravity ----
 A.jump-=dt;const g0=groundAt(r.x,r.z,r.y+.55);if(A.jump<=0&&r.y<=g0+.05&&sees){A.vy=6.5;A.jump=2.5+Math.random()*4}
 A.vy-=(MAPS[mapIdx].grav||18)*dt;r.y+=A.vy*dt;const g=groundAt(r.x,r.z,Math.max(r.y,r.y-A.vy*dt)+.55);if(r.y<=g){r.y=g;A.vy=0}
 if(r.y<-60){botSpawn();return}
 // ---- aim: face you when it can see you, otherwise where it's walking ----
 if(sees){r.yaw=Math.atan2(-dx,-dz);r.pitch=Math.atan2(me.y+1.2-(r.y+1.65),dist)}else if(ml>0)r.yaw=Math.atan2(-mx,-mz);
 r.w=1;b.seen=1;
 // ---- shooting: bursts from the rifle, with misses that get rarer the longer it has you in sight ----
 A.cd-=dt;if(A.rl>0){A.rl-=dt;if(A.rl<=0)A.ammo=BOT.mag;return}
 if(!sees||A.seen<BOT.react||A.cd>0)return;
 if(A.burst<=0){A.burst=BOT.burst[0]+(Math.random()*(BOT.burst[1]-BOT.burst[0]+1)|0);A.cd=.35+Math.random()*.5;return}
 A.burst--;A.ammo--;A.cd=BOT.rate;if(A.ammo<=0){A.rl=BOT.rl;A.burst=0}
 const e=botEye(r).clone(),tgt=new V(me.x,me.y+(me.ck?.85:1.25),me.z),L=e.distanceTo(tgt);
 const err=(.022+Math.min(.05,dist*.0009))*(me.sprint?1.4:1)*(A.seen>2?.8:1.15);_bt.copy(tgt).sub(e).normalize();
 _bt.x+=(Math.random()-.5)*2*err;_bt.y+=(Math.random()-.5)*2*err;_bt.z+=(Math.random()-.5)*2*err;_bt.normalize();
 if(typeof pjSpawn==='function'&&PJT[1]){pjSpawn(1,e.clone().addScaledVector(_bt,.6),_bt.clone().multiplyScalar(PJT[1].sp),false,'bot')}
 if(typeof vaShot==='function')vaShot(r.x,r.z);if(dist<70)beep(200,.06);
 // did that shot line up with your body or head?
 const k=me.ck?.68:1,head=rayBoxDistance(e,_bt,me.x-.27,me.y+1.55*k,me.z-.27,me.x+.27,me.y+2.12*k,me.z+.27),body=rayBoxDistance(e,_bt,me.x-.42,me.y,me.z-.42,me.x+.42,me.y+1.55*k,me.z+.42);
 const hd=Math.min(head,body);if(hd>L+2||wallDist(e,_bt,hd+.1)<hd-.1)return;const hs=head<body;
 setTimeout(()=>{if(go&&practice&&!me.out&&players.bot&&!players.bot.dead)dmg({d:BOT.dmg*(hs?2:1),f:'bot',hs})},hd/PJT[1].sp*1000)}
