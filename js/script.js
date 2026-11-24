// Always start the website from the top on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
(() => {
  const curtain = document.getElementById('introCurtain');
  const music = document.getElementById('weddingMusic');
  let opened = false;

  // Set background music volume.
  if (music) {
    music.volume = 0.52;
  }

  function playMusic() {
    if (!music) return;

    music.play().catch(error => {
      console.log('Music playback error:', error);
    });
  }

  // Open the invitation.
  function openInvite() {
    if (opened || !curtain) return;

    opened = true;

    // Begin the curtain-opening animation.
    curtain.classList.add('open');

    // Start music following the user's click.
    playMusic();

    // WAIT until the curtain animation finishes.
    window.setTimeout(() => {

      // Remove the curtain.
      curtain.classList.add('dismissed');

      // NOW start the website fade-in.
      document.body.classList.add('invite-open');

    }, 850);
  }

  // Curtain click and keyboard support.
  if (curtain) {
    curtain.addEventListener('click', openInvite);

    curtain.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openInvite();
      }
    });
  }

  // Reveal elements gently as they enter the viewport.
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {
    // Fallback for browsers without IntersectionObserver.
    revealElements.forEach(element => {
      element.classList.add('visible');
    });
  }

  // Scroll progress bar.
  const progress = document.querySelector('.scrollProgress');

  function updateProgress() {
    if (!progress) return;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = maxScroll > 0
      ? (window.scrollY / maxScroll) * 100
      : 0;

    progress.style.width = `${percentage}%`;
  }

  window.addEventListener('scroll', updateProgress, {
    passive: true
  });

  window.addEventListener('resize', updateProgress);

  updateProgress();

  // Responsive mobile navigation.
  const toggle = document.querySelector('.menuToggle');
  const nav = document.querySelector('.topNav nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show');

      toggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');

        toggle.setAttribute(
          'aria-expanded',
          'false'
        );
      });
    });
  }

  // Countdown to December 11, 2026, at 9:00 PM IST.
  const countdown = document.getElementById('countdown');

  const targetTime = new Date(
    '2026-12-11T21:00:00+05:30'
  ).getTime();

  function tickCountdown() {
    if (!countdown) return;

    const difference = Math.max(
      0,
      targetTime - Date.now()
    );

    const days = Math.floor(
      difference / 86400000
    );

    const hours = Math.floor(
      (difference % 86400000) / 3600000
    );

    const minutes = Math.floor(
      (difference % 3600000) / 60000
    );

    const seconds = Math.floor(
      (difference % 60000) / 1000
    );

    countdown.innerHTML = `
      <div class="countUnit">
        <b>${days}</b>
        <span>DAYS</span>
      </div>

      <div class="countUnit">
        <b>${String(hours).padStart(2, '0')}</b>
        <span>HOURS</span>
      </div>

      <div class="countUnit">
        <b>${String(minutes).padStart(2, '0')}</b>
        <span>MIN</span>
      </div>

      <div class="countUnit">
        <b>${String(seconds).padStart(2, '0')}</b>
        <span>SEC</span>
      </div>
    `;
  }

  tickCountdown();

  window.setInterval(tickCountdown, 1000);

  // Falling petals.
  const petalLayer = document.querySelector('.petalLayer');

  function createPetal() {
    if (document.hidden || !petalLayer) return;

    const petal = document.createElement('i');

    petal.className = 'petal';

    petal.style.left =
      `${Math.random() * 100}vw`;

    petal.style.setProperty(
      '--drift',
      `${Math.random() * 140 - 70}px`
    );

    petal.style.animationDuration =
      `${8 + Math.random() * 8}s`;

    petal.style.opacity =
      `${0.3 + Math.random() * 0.4}`;

    petalLayer.appendChild(petal);

    window.setTimeout(() => {
      petal.remove();
    }, 17000);
  }

  window.setInterval(createPetal, 850);

  // Initial petals.
  for (let index = 0; index < 8; index++) {
    window.setTimeout(createPetal, index * 250);
  }

})(); 