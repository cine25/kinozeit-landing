// KINOZEIT Liquid Glass v7 — subtle ember particles bottom corners
const canvas = document.getElementById('embers');
const ctx = canvas.getContext('2d', { alpha:true });
let W, H, DPR;

function resize(){
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = canvas.width = Math.floor(window.innerWidth * DPR);
  H = canvas.height = Math.floor(window.innerHeight * 0.40 * DPR);
  canvas.style.height = Math.floor(window.innerHeight * 0.40) + "px";
}
window.addEventListener('resize', resize, { passive:true });
resize();

// tiny drifting glow particles (warm grey/white to keep timeless)
const N = 24;
const parts = Array.from({length:N}, (_,i)=>{
  const side = i%2===0 ? 'left' : 'right';
  const x = side==='left' ? Math.random()*W*0.25 : W - Math.random()*W*0.25;
  const y = H*(0.15 + Math.random()*0.7);
  return {
    x, y,
    r: 12 + Math.random()*24,
    a: 0.15 + Math.random()*0.25,
    vx: (Math.random()*0.3+0.05) * (side==='left'?1:-1),
    vy: -0.15 - Math.random()*0.25,
  };
});

function step(){
  ctx.clearRect(0,0,W,H);
  for(const p of parts){
    ctx.beginPath();
    const g = ctx.createRadialGradient(p.x,p.y,0, p.x,p.y,p.r*2.2);
    g.addColorStop(0, `rgba(255,255,255,${p.a})`);
    g.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.fillStyle = g;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();

    p.x += p.vx; p.y += p.vy;
    // gently wrap
    if(p.y < -40) { p.y = H*(0.8+Math.random()*0.2); }
    if(p.x < 0)   { p.x = W*0.25 + Math.random()*W*0.05; }
    if(p.x > W)   { p.x = W*(0.75 - Math.random()*0.05); }
  }
  requestAnimationFrame(step);
}
requestAnimationFrame(step);
