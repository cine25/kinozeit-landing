// Theme handling: system by default. Toggle persists in localStorage.
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('kinozeit-theme');
  const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const apply = (mode) => {
    root.classList.remove('light');
    if(mode === 'light') root.classList.add('light');
  };

  apply(saved ? saved : (isSysDark ? '' : 'light'));

  document.getElementById('themeToggle').addEventListener('click', () => {
    const nowLight = !root.classList.contains('light');
    if(nowLight){ root.classList.add('light'); localStorage.setItem('kinozeit-theme','light'); }
    else { root.classList.remove('light'); localStorage.setItem('kinozeit-theme','dark'); }
  });
})();

// Soft particles
(function(){
  const c = document.getElementById('sparks');
  const ctx = c.getContext('2d');
  let w,h; const DPR = Math.min(2, window.devicePixelRatio||1);

  const resize = () => {
    w = c.width = Math.floor(innerWidth * DPR);
    h = c.height = Math.floor(innerHeight * DPR);
    c.style.width = innerWidth+'px';
    c.style.height = innerHeight+'px';
  };
  resize(); addEventListener('resize', resize);

  const N = 36;
  const P = [...Array(N)].map(()=> ({
    x: Math.random()*w, y: Math.random()*h,
    r: (Math.random()*16+10)*DPR,
    a: Math.random()*Math.PI*2,
    v: (Math.random()*0.4+0.15)*DPR
  }));

  function tick(t){
    ctx.clearRect(0,0,w,h);
    for(const p of P){
      p.a += 0.003;
      p.x += Math.cos(p.a)*p.v;
      p.y += Math.sin(p.a)*p.v * 0.6;
      if(p.x<-50 || p.x>w+50) p.x = (p.x+w+50)% (w+100);
      if(p.y<-50 || p.y>h+50) p.y = (p.y+h+50)% (h+100);

      const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      const isLight = document.documentElement.classList.contains('light');
      if(isLight){
        grd.addColorStop(0,'rgba(255,255,255,.28)');
        grd.addColorStop(1,'rgba(255,255,255,0)');
      }else{
        grd.addColorStop(0,'rgba(255,255,255,.12)');
        grd.addColorStop(1,'rgba(255,255,255,0)');
      }
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
