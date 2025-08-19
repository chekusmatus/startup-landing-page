// Mobile menu
const openBtn = document.getElementById('openMenu');
const mobile = document.getElementById('mobileMenu');
openBtn?.addEventListener('click', () => {
  const expanded = openBtn.getAttribute('aria-expanded') === 'true';
  openBtn.setAttribute('aria-expanded', String(!expanded));
  mobile.hidden = expanded;
});

// Intersection-based fade-ups
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, {threshold: 0.15});
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple waitlist handling (mock API)
const form = document.getElementById('waitlist');
const toast = document.getElementById('toast');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  // Basic client-side validation
  const errors = [];
  if(!data.name || String(data.name).trim().length < 2) errors.push('Please enter your name');
  if(!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Enter a valid email');
  if(!data.country) errors.push('Select your country');
  if(!data.interest) errors.push('Select an interest');
  if(!form.consent.checked) errors.push('You must consent to join the waitlist');

  if(errors.length){
    alert(errors.join('\n')); return;
  }

  // Replace this URL with your real endpoint later
  const endpoint = 'https://example.com/api/waitlist';

  try{
    // Simulated network request (remove setTimeout when wiring real API)
    await new Promise(res => setTimeout(res, 700));
    // Example real request:
    // await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)});

    form.reset();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }catch(err){
    alert('Something went wrong. Please try again.');
  }
});

// Keyboard support for ESC to close mobile menu
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && !mobile.hidden){ mobile.hidden = true; openBtn.setAttribute('aria-expanded','false'); }
});
