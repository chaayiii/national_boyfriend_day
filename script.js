// floating hearts background
const floaty = document.getElementById('floaty');
const heartEmojis = ['💗', '💕', '✨', '🤍'];
for (let i = 0; i < 16; i++) {
  const el = document.createElement('span');
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = Math.random() * 100 + '%';
  el.style.animationDuration = (9 + Math.random() * 8) + 's';
  el.style.animationDelay = (Math.random() * 10) + 's';
  floaty.appendChild(el);
}

// open gift button
const gate = document.getElementById('gate');
const main = document.getElementById('main');
const openBtn = document.getElementById('openBtn');
const burst = document.getElementById('burst');

function fireBurst() {
  const symbols = ['💗', '🤍', '✨', '💕'];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('span');
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 160;
    s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    s.style.animationDelay = (Math.random() * 0.15) + 's';
    burst.appendChild(s);
  }
  setTimeout(() => { burst.innerHTML = ''; }, 1400);
}

openBtn.addEventListener('click', () => {
  fireBurst();
  gate.classList.add('gone');
  setTimeout(() => {
    gate.style.display = 'none';
    main.classList.remove('hidden');
    setupReveal();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 650);
});

// scroll reveal for sections
function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((item) => io.observe(item));
}

// music toggle (no autoplay — user must tap)
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play().catch(() => {});
    musicBtn.classList.add('playing');
    musicBtn.textContent = '⏸';
  } else {
    bgm.pause();
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '🎵';
  }
});
