
const blobs = document.querySelectorAll('.blob');
window.addEventListener('pointermove', (e)=>{
  const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
  blobs.forEach((b,i)=>{const k=(i+1)*10; b.style.transform=`translate(${x*k}px,${y*k}px)`});
});
