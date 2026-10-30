(()=>{'use strict';
const read=k=>{try{const v=JSON.parse(parent.localStorage.getItem(k)||'[]');return Array.isArray(v)?v:[]}catch{return[]}},
shiny=read('vileKartShinierProgressV1'),shiniest=read('vileKartShiniestProgressV1');
if(!shiniest.includes(13)){const i=NAMES.indexOf('THE UNHOLY FATHER');if(i>=0){NAMES.splice(i,1);COLORS.splice(i,1);SELECT_TAGS.splice(i,1);SELECT_STATS.splice(i,1);SELECT_ART.splice(i,1)}}
const A='assets/',R='assets/racers/';
const roster=[
[7,shiny,'THE DREAD CAPTAIN','#7f4536','Dead men steer straighter.',[5,4,3,5],R+'dread_captain_side.png',R+'dread_captain_rear.png'],
[11,shiny,'THE SHE-WOLF','#8c5965','Teeth out. Pedal down.',[4,5,5,3],R+'she_wolf_side.png',R+'she_wolf_rear.png'],
[12,shiny,'WESLEY WANKSTEIN','#755f91','A magnificent liability.',[5,5,3,3],R+'wesley_wankstein_side.png',R+'wesley_wankstein_rear.png'],
[13,shiniest,'THE UNHOLY FATHER','#6c6b52','Blessed are the bastards.',[4,4,4,5],R+'unholy_father_side.png',R+'unholy_father_rear.png'],
[14,shiniest,'MORTIMER MOURN','#57495f','Every finish is a funeral.',[4,5,4,4],R+'MORTIMER_MOURN_SIDE.png',R+'MORTIMER_MOURN_REAR.png'],
[15,shiniest,'COUNTESS VERA VEIN','#7f273e','Old blood. New tyres.',[5,4,5,3],R+'COUNTESS_VERA_VEIN_SIDE.png',R+'COUNTESS_VERA_VEIN_REAR.png'],
[16,shiniest,'RAMSES THE UNRAVELLED','#9a7a42','Wrapped badly. Driving worse.',[4,5,3,5],R+'RAMSES_THE_UNRAVELLED_SIDE.png',R+'RAMSES_THE_UNRAVELLED_REAR.png'],
[17,shiniest,'SIDNEY SILENT','#666','No dialogue. Plenty of screaming.',[5,5,4,3],R+'SIDNEY_SILENT_SIDE.png',R+'SIDNEY_SILENT_REAR.png'],
[18,shiniest,'NIGEL NEWTSUIT','#3f6970','Cold blood. Warm engine.',[4,4,6,3],R+'NIGEL_NEWTSUIT_SIDE.png',R+'NIGEL_NEWTSUIT_REAR.png'],
[0,null,'LADY PRUDENCE SIDEWINDER','#7c4250','Polite company. Violent cornering.',[4,5,5,3],A+'LADY_PRUDENCE_SIDEWINDER_SIDE.png',A+'LADY_PRUDENCE_SIDEWINDER_REAR.png'],
[0,null,'RATBAG','#6f7550','Small. Fast. Unsanitary.',[6,6,5,1],A+'RATBAG_SIDE.png',A+'RATBAG_REAR.png'],
[0,null,'SIR PORTLY HATT','#8b6841','Momentum is a gentleman’s privilege.',[3,3,4,6],A+'SIR_PORTLY_HATT_SIDE.png',A+'SIR_PORTLY_HATT_REAR.png'],
[0,null,'THE LICH','#5b5b72','Still has places to be.',[4,4,5,4],A+'THE_LICH_SIDE.png',A+'THE_LICH_REAR.png'],
[0,null,'THE KNUCKLE BROTHERS','#8a6234','To me. To you. To hospital.',[4,5,2,5],A+'KNUCKLE_BROTHERS_SIDE.png',A+'KNUCKLE_BROTHERS_REAR.png']];
const rear=new Map;
for(const [course,src,name,color,tag,stats,side,rearPath] of roster){if(src&&!src.includes(course))continue;if(!NAMES.includes(name)){const q=new Image;q.src=side;NAMES.push(name);COLORS.push(color);SELECT_TAGS.push(tag);SELECT_STATS.push(stats);SELECT_ART.push(q)}const rr=new Image;rr.src=rearPath;rear.set(name,rr)}
const oldKart=drawKart;
drawKart=function(x,y,scale,color,name,playerKart=false){const q=rear.get(name);if(q?.complete&&q.naturalWidth){const ss=playerKart?.43:Math.max(.055,Math.min(.38,scale*.34)),dh=312*ss,dw=dh*q.naturalWidth/q.naturalHeight;ctx.drawImage(q,x-dw/2,y-dh+8*ss,dw,dh);return}return oldKart(x,y,scale,color,name,playerKart)};
const frame=new Image;frame.src=A+'character-select-frame.png';
function bar(label,v,x,y,sc){ctx.textAlign='left';ctx.font=`bold ${Math.round(12*sc)}px Georgia`;ctx.fillStyle='#f0dfb0';ctx.fillText(label,x,y);for(let j=0;j<6;j++){const bx=x+108*sc+j*22*sc;ctx.fillStyle=j<v?'#b62e28':'#211a13';ctx.fillRect(bx,y-10*sc,17*sc,10*sc);ctx.strokeStyle='#c79b48';ctx.strokeRect(bx,y-10*sc,17*sc,10*sc)}}
const VK_DISPLAY_NAMES={'LADY PRUDENCE SIDEWINDER':'PRUDENCE SIDEWINDER','THE KNUCKLE BROTHERS':'KNUCKLE BROTHERS'};
const VK_DISPLAY_SUBTITLES={'LADY PRUDENCE SIDEWINDER':'LADY'};
drawCharacterSelect=function(){if(!NAMES.length)return;selectNav=(selectNav%NAMES.length+NAMES.length)%NAMES.length;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const fh=W*832/1856,fy=(H-fh)/2,sc=W/960;if(frame.complete&&frame.naturalWidth)ctx.drawImage(frame,0,fy,W,fh);const i=selectNav;{const q=SELECT_ART[i],px=W*.145,py=fy+fh*.315,pw=W*.365,ph=fh*.445;if(q?.complete&&q.naturalWidth){const ss=Math.min(pw/q.naturalWidth,ph/q.naturalHeight),dw=q.naturalWidth*ss,dh=q.naturalHeight*ss;ctx.drawImage(q,px+(pw-dw)/2,py+ph-dh,dw,dh)}}const x=W*.575,y=fy+fh*.38;ctx.textAlign='left';ctx.fillStyle='#f7e7b7';const dn=VK_DISPLAY_NAMES[NAMES[i]]||NAMES[i],ds=VK_DISPLAY_SUBTITLES[NAMES[i]]||'';let np=Math.round((NAMES[i]==='LADY PRUDENCE SIDEWINDER'?19.7:21)*sc),mw=W*.33;do{ctx.font=`bold ${np}px Georgia`;if(ctx.measureText(dn).width<=mw||np<=Math.round(14*sc))break;np--}while(true);ctx.fillText(dn,x,y);if(ds){ctx.fillStyle='#c9a75f';ctx.font=`bold ${Math.round(10*sc)}px Georgia`;ctx.fillText(ds,x,y+18*sc)}ctx.fillStyle='#e9b74e';ctx.font=`italic bold ${Math.round(11*sc)}px Georgia`;ctx.fillText(SELECT_TAGS[i]||'',x,y+(ds?38:27)*sc,W*.32);const s=SELECT_STATS[i]||[3,3,3,3];bar('SPEED',s[0],x,y+78*sc,sc);bar('ACCEL',s[1],x,y+110*sc,sc);bar('HANDLING',s[2],x,y+142*sc,sc);bar('WEIGHT',s[3],x,y+174*sc,sc);ctx.fillStyle='#f0dfb0';ctx.font=`bold ${Math.round(9*sc)}px Georgia`;ctx.fillText('ENTER — SELECT',x,y+198*sc,W*.29);ctx.textAlign='center';ctx.font=`bold ${Math.round(9*sc)}px Consolas`;ctx.fillStyle='#d7c08e';ctx.fillText(`${i+1} / ${NAMES.length}`,W/2,fy+fh*.955)};
const sync=n=>selectNav=(n%NAMES.length+NAMES.length)%NAMES.length;
const start=()=>{selectedRacer=selectNav;gameMode='race';stopMusic();reset();selectSfx('GO');setTimeout(startMusic,220)};
addEventListener('keydown',e=>{if(gameMode!=='select'||!NAMES.length)return;let handled=true;if(e.key==='ArrowLeft'||e.key==='ArrowUp'){sync(selectNav-1);selectSfx('MOVE')}else if(e.key==='ArrowRight'||e.key==='ArrowDown'){sync(selectNav+1);selectSfx('MOVE')}else if(e.key==='Enter'||e.key===' '){start()}else handled=false;if(handled){e.preventDefault();e.stopImmediatePropagation()}},true);
addEventListener('keyup',e=>{if(gameMode!=='race'||e.key.toLowerCase()!=='p')return;unlockAudio();if(!pauseMenu){pauseMenu=true;audioMenu=true;pauseStarted=performance.now();if(AC){engineGain.gain.setTargetAtTime(0,AC.currentTime,.025);skidGain.gain.setTargetAtTime(0,AC.currentTime,.025)}}else{const held=performance.now()-pauseStarted;raceStart+=held;if(lapStart)lapStart+=held;pauseMenu=false;audioMenu=false}e.preventDefault();e.stopImmediatePropagation()},true);
addEventListener('mousedown',e=>{if(gameMode!=='select'||e.target!==C||!NAMES.length)return;const r=C.getBoundingClientRect(),mx=(e.clientX-r.left)*C.width/r.width,my=(e.clientY-r.top)*C.height/r.height,fh=W*832/1856,fy=(H-fh)/2;if(my<fy||my>fy+fh)return;if(mx<=W*.11)sync(selectNav-1);else if(mx>=W*.89)sync(selectNav+1);else return;selectSfx('MOVE');e.preventDefault();e.stopImmediatePropagation()},true);
window.VK_ROSTER_SIZE=NAMES.length;
})();