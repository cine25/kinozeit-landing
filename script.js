// Monochrome soft moving blobs for subtle depth
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d', { alpha: true });

let dpr = window.devicePixelRatio || 1;
function resize(){
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
}
resize();
addEventListener('resize', resize);

const blobs = Array.from({length: 6}).map((_,i)=> ({
  x: Math.random()*innerWidth,
  y: Math.random()*innerHeight,
  r: 160 + Math.random()*200,
  dx: (Math.random()*.6+.2) * (Math.random()<.5?-1:1),
  dy: (Math.random()*.6+.2) * (Math.random()<.5?-1:1),
  c: i%2
}));

function step(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(const b of blobs){
    b.x += b.dx; b.y += b.dy;
    if(b.x<-200 || b.x>innerWidth+200) b.dx*=-1;
    if(b.y<-200 || b.y>innerHeight+200) b.dy*=-1;

    const g = ctx.createRadialGradient(
      b.x*dpr, b.y*dpr, 0,
      b.x*dpr, b.y*dpr, b.r*dpr
    );
    // whites & greys
    if(b.c===0){
      g.addColorStop(0,'rgba(255,255,255,0.16)');
      g.addColorStop(1,'rgba(255,255,255,0.0)');
    }else{
      g.addColorStop(0,'rgba(200,200,210,0.14)');
      g.addColorStop(1,'rgba(200,200,210,0.0)');
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(b.x*dpr,b.y*dpr,b.r*dpr,0,Math.PI*2);
    ctx.fill();
  }

  requestAnimationFrame(step);
}
step();
