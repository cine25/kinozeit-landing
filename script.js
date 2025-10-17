const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d',{alpha:true});
let w,h,dpr;

function resize(){
  dpr=Math.min(window.devicePixelRatio||1,2);
  w=canvas.width=Math.floor(innerWidth*dpr);
  h=canvas.height=Math.floor(innerHeight*dpr);
  canvas.style.width=innerWidth+'px';
  canvas.style.height=innerHeight+'px';
}
addEventListener('resize',resize,{passive:true});
resize();

const N=36;
const dots=Array.from({length:N},(_,i)=>{
  const r=48+Math.random()*80;
  const speed=(0.2+Math.random()*0.5)*(Math.random()<0.5?-1:1);
  return {x:Math.random()*w,y:Math.random()*h,r,speed,a:Math.random()*Math.PI*2,o:0.06+Math.random()*0.08};
});

function tick(t){
  ctx.clearRect(0,0,w,h);
  for(const p of dots){
    p.a+=0.002*p.speed;
    p.x+=Math.cos(p.a)*0.25;
    p.y+=Math.sin(p.a)*0.25;
    if(p.x<-200)p.x=w+200;
    if(p.x>w+200)p.x=-200;
    if(p.y<-200)p.y=h+200;
    if(p.y>h+200)p.y=-200;
    const grad=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
    grad.addColorStop(0,`rgba(255,255,255,${p.o})`);
    grad.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=grad;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  ctx.globalCompositeOperation='multiply';
  const rings=ctx.createRadialGradient(w*0.5,h*0.9,200,w*0.5,h*0.9,Math.max(w,h));
  rings.addColorStop(0,'rgba(0,0,0,0)');
  rings.addColorStop(1,'rgba(0,0,0,0.35)');
  ctx.fillStyle=rings;
  ctx.fillRect(0,0,w,h);
  ctx.globalCompositeOperation='source-over';
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
