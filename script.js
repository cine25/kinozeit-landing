document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('.bg-scene');
  if (!scene) return;
  let cx = window.innerWidth/2, cy = window.innerHeight/2;
  window.addEventListener('mousemove', (e) => {
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    scene.style.setProperty('--shift-x', `${dx * 2}vmax`);
    scene.style.setProperty('--shift-y', `${dy * 2}vmax`);
  });
});
