document.getElementById('year').textContent = new Date().getFullYear();

// Gentle focus ring for keyboard users
function handleFirstTab(e){
  if(e.key === 'Tab'){
    document.body.classList.add('user-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}
window.addEventListener('keydown', handleFirstTab);
