// Soft, animated blobs in background (no scroll assumed).
const c = document.getElementById('bg');
const ctx = c.getContext('2d');
function resize(){ c.width = innerWidth; c.height = innerHeight; }
addEventListener('resize', resize, {passive:true}); resize();

const blobs = Array.from({length: 5}).map((_,i)=> ({
  x: Math.random()*c.width,
  y: Math.random()*c.height,
  r: 220 + Math.random()*220,
  hue: [12, 280, 210, 160, 320][i%5],
  vx: (Math.random()*2-1)*0.25,
  vy: (Math.random()*2-1)*0.25,
}));

function tick(){
  ctx.clearRect(0,0,c.width,c.height);
  blobs.forEach(b=>{
    b.x+=b.vx; b.y+=b.vy;
    if(b.x< -200 || b.x> c.width+200) b.vx*=-1;
    if(b.y< -200 || b.y> c.height+200) b.vy*=-1;
    const grad = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
    grad.addColorStop(0, `hsla(${b.hue} 90% 60% / .25)`);
    grad.addColorStop(1, `hsla(${b.hue} 90% 60% / 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(tick);
}
tick();
