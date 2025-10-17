// Minimal floating particles for a soft depth
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d', { alpha: true });

let dpr = Math.min(window.devicePixelRatio || 1, 2);
let W, H, particles;

function resize(){
  W = canvas.width = Math.floor(innerWidth * dpr);
  H = canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  init();
}

function init(){
  const count = Math.floor((innerWidth * innerHeight) / 35000);
  particles = new Array(count).fill(0).map(() => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: (Math.random() * 1.6 + 0.4) * dpr,
    a: Math.random() * Math.PI * 2,
    s: (Math.random() * 0.25 + 0.06) * dpr
  }));
}

function step(){
  ctx.clearRect(0,0,W,H);
  ctx.save();
  for(const p of particles){
    p.x += Math.cos(p.a) * p.s * 0.6;
    p.y += Math.sin(p.a) * p.s * 0.6;
    p.a += 0.002;

    if(p.x < -10 || p.x > W+10 || p.y < -10 || p.y > H+10){
      p.x = Math.random() * W;
      p.y = Math.random() * H;
    }

    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*3);
    g.addColorStop(0, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0.02)');

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r*3, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.restore();
  requestAnimationFrame(step);
}

addEventListener('resize', resize, { passive: true });
resize();
requestAnimationFrame(step);
