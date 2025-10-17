
// Theme handling
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('kinozeit-theme');
  if(saved){ root.setAttribute('data-theme', saved); }
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  document.getElementById('themeToggle').addEventListener('click', ()=>{
    const cur = root.getAttribute('data-theme');
    const next = (cur === 'dark') ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('kinozeit-theme', next);
  });
})();

// Floating dust particles
(function(){
  const c = document.getElementById('fx');
  const ctx = c.getContext('2d');
  let w, h, dpr;
  let particles = [];

  const reset = ()=>{
    dpr = window.devicePixelRatio || 1;
    w = c.width = innerWidth * dpr;
    h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    particles = new Array(80).fill(0).map(_=> ({
      x: Math.random()*w, y: Math.random()*h,
      r: (Math.random()*1.2 + 0.6) * dpr,
      a: Math.random()*Math.PI*2,
      s: Math.random()*0.4 + 0.1
    }));
  };
  reset();
  window.addEventListener('resize', reset, {passive:true});

  function tick(){
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = 'lighter';
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const col = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    ctx.fillStyle = col;
    particles.forEach(p=>{
      p.x += Math.cos(p.a)*p.s;
      p.y += Math.sin(p.a)*p.s*0.8;
      p.a += 0.002;
      if(p.x < -50 || p.x > w+50 || p.y < -50 || p.y > h+50){
        p.x = Math.random()*w; p.y = Math.random()*h;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();
