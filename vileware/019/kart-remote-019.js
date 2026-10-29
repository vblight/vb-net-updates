(()=>{
  const ID='vileware-remote-019-badge';
  function show(){
    if(document.getElementById(ID)) return;
    const b=document.createElement('div');
    b.id=ID;
    b.textContent='VILEWARE REMOTE 019 // SIGNAL RECEIVED';
    b.style.cssText='position:fixed;left:14px;bottom:14px;z-index:2147483000;padding:7px 10px;border:1px solid #6f9f76;background:rgba(2,6,4,.88);color:#a8d3ad;font:bold 11px Consolas,monospace;letter-spacing:1px;pointer-events:none;text-shadow:0 0 5px #315b38';
    document.documentElement.appendChild(b);
  }
  if(document.readyState==='loading') addEventListener('DOMContentLoaded',show,{once:true}); else show();
})();
