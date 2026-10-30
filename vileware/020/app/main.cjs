const {app,BrowserWindow,ipcMain}=require('electron');
const path=require('path'),fs=require('fs'),crypto=require('crypto'),os=require('os');let win,sourceKart=null;
const FP='MB-MAIN-005',TARGETS={"shiniest-roster-ui.js": "3e7273a2b7848c0a716f2cf6ba9664c4684f1701c22949da8b62184bc0799c1c", "assets/character-select-frame.png": "ea30ab6e2b0c18e95deb2e6a3724b7fe0dba9a8cd0b16946452d0d7ed3da784c"},RAG=["LADY_PRUDENCE_SIDEWINDER_SIDE.png", "LADY_PRUDENCE_SIDEWINDER_REAR.png", "RATBAG_SIDE.png", "RATBAG_REAR.png", "SIR_PORTLY_HATT_SIDE.png", "SIR_PORTLY_HATT_REAR.png", "THE_LICH_SIDE.png", "THE_LICH_REAR.png", "KNUCKLE_BROTHERS_SIDE.png", "KNUCKLE_BROTHERS_REAR.png"],sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const root=()=>path.join(app.getPath('userData'),'vb-net-vileware-kart-selector-015'),kart=()=>path.join(root(),'games','vile-kart');
function installedCandidates(){const a=[],la=process.env.LOCALAPPDATA||'',pf=process.env.ProgramFiles||'',pf86=process.env['ProgramFiles(x86)']||'';for(const b of [la&&path.join(la,'Programs'),pf,pf86].filter(Boolean))for(const n of ['VB-NET','vb-net','Vile Beard Network'])a.push(path.join(b,n,'resources','app.asar','games','vile-kart'));return a}
function source(){if(sourceKart&&fs.existsSync(path.join(sourceKart,'index.html')))return sourceKart;for(const p of installedCandidates())if(fs.existsSync(path.join(p,'index.html'))){sourceKart=p;return p}throw Error('INSTALLED VB-NET VILE KART NOT FOUND')}
function cpTree(s,d){fs.mkdirSync(d,{recursive:true});for(const e of fs.readdirSync(s,{withFileTypes:true})){const a=path.join(s,e.name),b=path.join(d,e.name);if(e.isDirectory())cpTree(a,b);else if(e.isFile()){fs.mkdirSync(path.dirname(b),{recursive:true});fs.writeFileSync(b,fs.readFileSync(a))}}}
function seed(){const s=source(),d=kart();if(!fs.existsSync(path.join(d,'index.html')))cpTree(s,d);return{source:s,mirror:d}}
function repoAssetDirs(){
 const h=os.homedir(),roots=[
 path.join(h,'Desktop'),path.join(h,'Documents'),path.join(h,'Downloads'),
 process.cwd(),path.dirname(process.cwd()),path.join(h,'source'),path.join(h,'source','repos')
 ],out=[];
 function probe(base,depth=0){if(depth>4||!fs.existsSync(base))return;let ents;try{ents=fs.readdirSync(base,{withFileTypes:true})}catch{return}
   const direct=path.join(base,'games','vile-kart','assets');
   if(fs.existsSync(direct))out.push(direct);
   for(const e of ents){if(!e.isDirectory())continue;if(['node_modules','.git','AppData','electron-runtime'].includes(e.name))continue;probe(path.join(base,e.name),depth+1)}
 }
 for(const r of roots)probe(r);return [...new Set(out)];
}
function importRag(){
 const {mirror}=seed(),dst=path.join(mirror,'assets'),dirs=repoAssetDirs(),found=[],missing=[];
 for(const n of RAG){let src=null;for(const d of dirs){const p=path.join(d,n);if(fs.existsSync(p)){src=p;break}}
   if(src){fs.copyFileSync(src,path.join(dst,n));found.push({name:n,source:src,sha256:sha(fs.readFileSync(src))})}else missing.push(n)}
 return{found,missing,repoAssetDirs:dirs};
}
function payload(rel){return rel==='shiniest-roster-ui.js'?path.join(__dirname,'payload','shiniest-roster-ui.js'):path.join(__dirname,'payload','character-select-frame.png')}
function scan(){
 const {mirror}=seed(),imp=importRag(),objects=[];
 for(const [rel,want] of Object.entries(TARGETS)){const p=path.join(mirror,rel);let got=null;if(fs.existsSync(p))got=sha(fs.readFileSync(p));objects.push({path:rel,state:got===want?'CURRENT':got?'MODIFIED':'MISSING',actualSha:got,targetSha:want})}
 const ragState=RAG.map(n=>({name:n,present:fs.existsSync(path.join(mirror,'assets',n))}));
 return{objects,required:objects.filter(x=>x.state!=='CURRENT').length,rag:ragState,imported:imp};
}
function install(rel){const {mirror}=seed(),s=payload(rel),t=path.join(mirror,rel),d=fs.readFileSync(s),want=TARGETS[rel];if(sha(d)!==want)throw Error('SOURCE SHA FAILED '+rel);const st=path.join(mirror,'.vileware-stage',rel.replace(/[\\/]/g,'__')+'.tmp');fs.mkdirSync(path.dirname(st),{recursive:true});fs.writeFileSync(st,d);if(sha(fs.readFileSync(st))!==want)throw Error('STAGE SHA FAILED '+rel);fs.mkdirSync(path.dirname(t),{recursive:true});const bak=t+'.vileware-backup',tmp=t+'.vileware-new';if(fs.existsSync(tmp))fs.unlinkSync(tmp);fs.copyFileSync(st,tmp);if(sha(fs.readFileSync(tmp))!==want)throw Error('TEMP SHA FAILED '+rel);if(fs.existsSync(bak))fs.unlinkSync(bak);if(fs.existsSync(t))fs.renameSync(t,bak);try{fs.renameSync(tmp,t)}catch(e){if(fs.existsSync(bak)&&!fs.existsSync(t))fs.renameSync(bak,t);throw e}fs.unlinkSync(st);if(sha(fs.readFileSync(t))!==want)throw Error('FINAL SHA FAILED '+rel)}
ipcMain.handle('mb:ping',async()=>({reply:'PONG',mainFingerprint:FP}));
ipcMain.handle('mb:info',async()=>seed());
ipcMain.handle('mb:scan',async()=>scan());
ipcMain.handle('mb:patch',async()=>{const a=scan();if(a.imported.missing.length)throw Error('RAG-TAG SOURCE FILES NOT FOUND LOCALLY:\\n'+a.imported.missing.join('\\n')+'\\n\\n015 will not fabricate or substitute them.');for(const o of a.objects)if(o.state!=='CURRENT')install(o.path);const b=scan();if(b.required||b.rag.some(x=>!x.present))throw Error('015 VERIFY FAILED');return b});
ipcMain.handle('mb:launch',async()=>{await win.loadFile(path.join(kart(),'index.html'));return true});
ipcMain.handle('mb:home',async()=>{await win.loadFile(path.join(__dirname,'launcher.html'));return true});
app.whenReady().then(()=>{win=new BrowserWindow({width:1280,height:800,backgroundColor:'#020604',title:'MASTER BASTARD // SELECTOR 015',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:false}});win.loadFile(path.join(__dirname,'launcher.html'))});app.on('window-all-closed',()=>app.quit());
