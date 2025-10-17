// Subtle animated corner 'fire' glows using Canvas
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d', { alpha: true });

let DPR = 1, W = 0, H = 0;
function resize(){
  DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  W = canvas.width  = Math.floor(window.innerWidth  * DPR);
  H = canvas.height = Math.floor(window.innerHeight * DPR);
  canvas.style.width  = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
}
resize();
addEventListener('resize', resize);

// flicker helper
function jitter(seed, t, amp){ return (Math.sin(seed + t*0.002) * 0.5 + 0.5) * amp; }

function paintGlow(x, y, baseR, rgb, seed, t){
  const r2 = baseR * (1.4 + jitter(seed, t, 0.25));
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r2);
  grad.addColorStop(0, `rgba(${rgb},0.10)`);
  grad.addColorStop(0.45,`rgba(${rgb},0.06)`);
  grad.addColorStop(1, `rgba(${rgb},0.00)`);
  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.arc(x, y, r2, 0, Math.PI*2); ctx.fill();
}

function frame(t){
  ctx.clearRect(0,0,W,H);

  // vignette
  const vg = ctx.createRadialGradient(W*0.5, H*0.55, Math.min(W,H)*0.2, W*0.5, H*0.65, Math.max(W,H)*0.85);
  vg.addColorStop(0,'rgba(0,0,0,0.0)');
  vg.addColorStop(1,'rgba(0,0,0,0.45)');
  ctx.fillStyle = vg; ctx.fillRect(0,0,W,H);

  // warm glows bottom corners – very subtle "fire" hint
  paintGlow(90*DPR,  H-70*DPR, 220*DPR, '255,145,70',  11.2, t);
  paintGlow(W-90*DPR,H-70*DPR, 220*DPR, '255,165,92',  97.8, t);

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
