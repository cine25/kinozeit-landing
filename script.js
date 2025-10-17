// Soft animated blobs on the background canvas
const cvs = document.getElementById('bg');
const ctx = cvs.getContext('2d');
let w, h, t = 0;
const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

function resize(){
  w = cvs.width = Math.floor(window.innerWidth * dpr);
  h = cvs.height = Math.floor(window.innerHeight * dpr);
  cvs.style.width = window.innerWidth + 'px';
  cvs.style.height = window.innerHeight + 'px';
}
window.addEventListener('resize', resize, { passive:true });
resize();

function rnd(a,b){ return a + Math.random()*(b-a); }

const blobs = Array.from({length: 6}).map(() => ({
  x: rnd(0.1, 0.9),
  y: rnd(0.1, 0.9),
  r: rnd(120, 300),
  speed: rnd(0.2, 0.6),
  hue: rnd(200, 340),
  alpha: rnd(0.08, 0.16)
}));

function frame(ts){
  t = ts * 0.001;
  ctx.clearRect(0,0,w,h);
  ctx.globalCompositeOperation = 'lighter';

  blobs.forEach((b, i) => {
    const x = (b.x + Math.sin(t * b.speed + i)*0.03) * w;
    const y = (b.y + Math.cos(t * b.speed + i)*0.03) * h;
    const r = b.r * dpr;

    const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, `hsla(${b.hue}, 100%, 60%, ${b.alpha})`);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fill();
  });

  ctx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
