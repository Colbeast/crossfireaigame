// ===== Performance mode (Settings > Graphics): makes the game run better on slower computers =====
// lower render resolution, no shadows, no grass / clouds / falling snow, a shorter view distance,
// the minimap redrawn every other frame, and no antialiasing (that one needs a page reload)
let PERF=typeof PERF0!=='undefined'?PERF0:false;
function perfWorld(){if(typeof world==='undefined'||!world)return;const M=MAPS[mapIdx],u=world.userData;
 if(u.gr)u.gr.visible=!PERF;if(u.cl)u.cl.visible=!PERF;if(u.snow)u.snow.visible=!PERF;
 const far=M.far||420,fog=M.fog,fogN=M.fogN||30;
 cam.far=PERF?Math.min(far,M.osm?320:240):far;cam.updateProjectionMatrix();
 scene.fog.far=PERF?Math.min(fog,M.osm?280:175):fog;scene.fog.near=PERF?Math.min(fogN,scene.fog.far*.35):fogN;
 if(typeof lamps!=='undefined')lamps.forEach(l=>{if(l.isDirectionalLight)l.castShadow=!PERF})}
function perfApply(){const sh=!PERF;
 ren.setPixelRatio(PERF?Math.min(devicePixelRatio,1)*.7:Math.min(devicePixelRatio,1.5));ren.setSize(innerWidth,innerHeight);
 if(ren.shadowMap.enabled!==sh){ren.shadowMap.enabled=sh;scene.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>m.needsUpdate=true)})}
 perfWorld();const s=$('perfm');if(s)s.value=PERF?'1':'0';
 const hnt=$('perfh');if(hnt)hnt.textContent=PERF!==PERF0?(PERF?'On. Antialiasing switches off the next time you load the page.':'Off. Antialiasing comes back the next time you load the page.'):'Lower resolution, no shadows, no grass or clouds, shorter view distance and no antialiasing. Turn it on if the game is laggy.'}
{const s=$('perfm');if(s)s.onchange=()=>{PERF=s.value==='1';try{localStorage.setItem('cf_perf',PERF?'1':'0')}catch(e){}perfApply();feed(PERF?'Performance mode on':'Performance mode off')}}
perfApply();
