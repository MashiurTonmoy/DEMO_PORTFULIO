/**
 * ═══════════════════════════════════════════════════════════
 * NEUROCULAS — Portfolio JavaScript
 * 3D Safari Road Experience
 * Author: Generated for Mashiur Rahman Tonmoy
 * ═══════════════════════════════════════════════════════════
 */

'use strict';

/* ════════════════════════════════════════════
   1. PARTICLE SYSTEM (canvas background)
════════════════════════════════════════════ */
const ParticleSystem = (() => {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let particles = [];
  let animId;

  const CONFIG = {
    count:     70,      // total particle count
    maxSize:   2.5,
    minSpeed:  0.1,
    maxSpeed:  0.4,
    color:     '0, 229, 255',
    lineColor: '0, 180, 220',
    linkDist:  140,     // max distance to draw connection lines
  };

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
      vy:    (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
      size:  Math.random() * CONFIG.maxSize + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.linkDist) {
          const opacity = (1 - dist / CONFIG.linkDist) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${CONFIG.lineColor}, ${opacity})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color}, ${p.alpha})`;
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0)             p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0)             p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  function start() {
    resize();
    init();
    loop();
    window.addEventListener('resize', () => { resize(); init(); });
  }

  return { start };
})();


/* ════════════════════════════════════════════
   2. STAR FIELD (static star background)
════════════════════════════════════════════ */
function generateStars() {
  const container = document.getElementById('starField');
  if (!container) return;

  const count = 80;
  const frag  = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star  = document.createElement('div');
    const size  = Math.random() * 2 + 0.5;
    const alpha = Math.random() * 0.8 + 0.1;
    const dur   = (Math.random() * 4 + 2).toFixed(1);
    const del   = (Math.random() * 5).toFixed(1);

    star.className = 'star';
    Object.assign(star.style, {
      left:     `${Math.random() * 100}%`,
      top:      `${Math.random() * 100}%`,
      width:    `${size}px`,
      height:   `${size}px`,
      opacity:  alpha,
      '--dur':  `${dur}s`,
      '--del':  `-${del}s`,
      '--max':  alpha,
    });

    frag.appendChild(star);
  }

  container.appendChild(frag);
}


/* ════════════════════════════════════════════
   3. ROAD DASH GENERATOR
════════════════════════════════════════════ */
function generateRoadDashes() {
  const track = document.getElementById('dashTrack');
  if (!track) return;

  const count = 20;
  const frag  = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const dash = document.createElement('div');
    dash.className = 'road-dash';
    frag.appendChild(dash);
  }

  track.appendChild(frag);
}


/* ════════════════════════════════════════════
   4. ROADSIDE PYLON GENERATOR
════════════════════════════════════════════ */
function generatePylons() {
  const sides = [
    document.getElementById('roadsideLeft'),
    document.getElementById('roadsideRight'),
  ];

  sides.forEach(container => {
    if (!container) return;
    const count = 12;
    const frag  = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const pylon    = document.createElement('div');
      const light    = document.createElement('div');
      const body     = document.createElement('div');
      const flashDur = (Math.random() * 2 + 1).toFixed(1);

      pylon.className = 'pylon';
      light.className = 'pylon-light';
      body.className  = 'pylon-body';

      // Spread along the "road" depth
      const topPct    = (i / count) * 80 + 2;
      const heightPx  = 20 + (i / count) * 30; // bigger = closer

      light.style.setProperty('--flash', `${flashDur}s`);
      light.style.width  = `${4 + (i / count) * 8}px`;
      light.style.height = `${4 + (i / count) * 8}px`;
      body.style.height  = `${heightPx}px`;

      pylon.style.top = `${topPct}%`;

      pylon.appendChild(light);
      pylon.appendChild(body);
      frag.appendChild(pylon);
    }

    container.appendChild(frag);
  });
}


/* ════════════════════════════════════════════
   5. TYPEWRITER EFFECT
════════════════════════════════════════════ */
function typewriterEffect() {
  const el = document.getElementById('typeText');
  if (!el) return;

  const phrases = [
    'AI Automation & Intelligent Web Systems',
    'Full Stack Developer & AI Engineer',
    'Founder of Neuroculas',
    'Building Intelligent Web Applications',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let pauseTime   = 0;

  function type() {
    const current = phrases[phraseIndex];
    const speed   = isDeleting ? 30 : 55;

    if (!isDeleting && charIndex <= current.length) {
      el.textContent = current.slice(0, charIndex);
      charIndex++;
    } else if (isDeleting && charIndex >= 0) {
      el.textContent = current.slice(0, charIndex);
      charIndex--;
    }

    if (!isDeleting && charIndex > current.length) {
      // Pause at end before deleting
      pauseTime = 2000;
      isDeleting = true;
      setTimeout(type, pauseTime);
      return;
    }

    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      charIndex = 0;
      setTimeout(type, 400);
      return;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 1200);
}


/* ════════════════════════════════════════════
   6. CUSTOM CURSOR
════════════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top  = `${mouseY}px`;
  });

  // Ring follows with lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = `${ringX}px`;
    ring.style.top  = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Scale ring on interactive elements
  const interactables = document.querySelectorAll('a, button, .skill-card, .project-card, .service-item, .section-nav-item');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'rgba(0,229,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '30px';
      ring.style.height = '30px';
      ring.style.borderColor = 'rgba(0,229,255,0.7)';
    });
  });
}


/* ════════════════════════════════════════════
   7. SCROLL PROGRESS BAR
════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const max     = document.body.scrollHeight - window.innerHeight;
    const pct     = (window.scrollY / max) * 100;
    bar.style.width = `${pct}%`;
  }, { passive: true });
}


/* ════════════════════════════════════════════
   8. SECTION REVEAL (IntersectionObserver)
════════════════════════════════════════════ */
function initReveal() {
  const cards = document.querySelectorAll('.reveal-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
  });

  cards.forEach(card => observer.observe(card));

  // Also observe skill cards for bar animation
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObs   = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(c => skillObs.observe(c));
}


/* ════════════════════════════════════════════
   9. NAV SCROLL BEHAVIOR + SECTION NAV DOTS
════════════════════════════════════════════ */
function initNav() {
  const nav     = document.getElementById('nav');
  const dots    = document.querySelectorAll('.section-nav-item');
  const sections = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];

  // Section observers for nav dots
  sections.forEach((id, index) => {
    const el = document.getElementById(id);
    if (!el) return;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
      }
    }, { threshold: 0.4 });

    obs.observe(el);
  });

  // Dot click → scroll to section
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Sticky nav on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}


/* ════════════════════════════════════════════
   10. SPEEDOMETER HUD (scroll speed)
════════════════════════════════════════════ */
function initSpeedometer() {
  const speedEl = document.getElementById('speedNum');
  if (!speedEl) return;

  let lastY    = 0;
  let speed    = 0;
  let displayed = 0;
  let decayId;

  function decay() {
    speed = Math.max(0, speed - 3);
    displayed += (speed - displayed) * 0.15;
    speedEl.textContent = Math.round(displayed);

    // Color shift: green → cyan → orange at high speeds
    if (speed > 200) {
      speedEl.style.color = '#ff8a00';
    } else if (speed > 100) {
      speedEl.style.color = '#00e5ff';
    } else {
      speedEl.style.color = '#00e5ff';
    }

    if (speed > 0 || Math.round(displayed) > 0) {
      decayId = requestAnimationFrame(decay);
    } else {
      speedEl.textContent = '0';
    }
  }

  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastY);
    lastY       = window.scrollY;
    speed       = Math.min(350, speed + delta * 1.5);

    cancelAnimationFrame(decayId);
    decay();
  }, { passive: true });
}


/* ════════════════════════════════════════════
   11. PARALLAX ROAD EFFECT
     The road/sky parallax gives depth feel
════════════════════════════════════════════ */
function initParallax() {
  // Sky elements move at different rates on scroll
  const skyLayer  = document.querySelector('.sky-layer');
  const mountains = document.querySelector('.mountains');
  let   ticking   = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;

        // Mountains move slowly (far background)
        if (mountains) {
          mountains.style.transform = `translateY(${y * 0.08}px)`;
        }

        // Sky shifts slightly
        if (skyLayer) {
          skyLayer.style.transform = `translateY(${y * 0.04}px)`;
        }

        // Road dash speed increases with scroll (visual only — CSS handles animation)
        const dashTrack = document.getElementById('dashTrack');
        if (dashTrack) {
          const baseSpeed = 0.6; // seconds
          const bonus = Math.max(0, Math.min(0.5, window.scrollY * 0.0003));
          dashTrack.style.animationDuration = `${Math.max(0.15, baseSpeed - bonus)}s`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}


/* ════════════════════════════════════════════
   12. SMOOTH SCROLL HELPER
════════════════════════════════════════════ */
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Expose globally for inline onclick in HTML
window.smoothScrollTo = smoothScrollTo;

// Nav link smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    smoothScrollTo(link.getAttribute('href'));
  });
});


/* ════════════════════════════════════════════
   13. CARD 3D TILT EFFECT (mouse tracking)
════════════════════════════════════════════ */
function initTilt() {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);

      const rotY   =  dx * 6;  // degrees
      const rotX   = -dy * 4;

      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}


/* ════════════════════════════════════════════
   14. CONTACT FORM (basic UX feedback)
════════════════════════════════════════════ */
function initContactForm() {
  const btn = document.querySelector('.send-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const nameInput  = document.querySelectorAll('.term-input')[0];
    const emailInput = document.querySelectorAll('.term-input')[1];
    const msgInput   = document.querySelector('.term-textarea');

    if (!nameInput.value || !emailInput.value || !msgInput.value) {
      // Flash red border on empty fields
      [nameInput, emailInput, msgInput].forEach(inp => {
        if (!inp.value) {
          inp.style.borderColor = '#ff5f57';
          setTimeout(() => { inp.style.borderColor = ''; }, 1500);
        }
      });
      return;
    }

    // Success feedback
    const origText   = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = '✓ MESSAGE TRANSMITTED';
    btn.style.background = 'linear-gradient(135deg, #00aa55, #007a3d)';
    btn.style.boxShadow  = '0 0 20px rgba(0,255,136,0.3)';

    setTimeout(() => {
      btn.querySelector('span').textContent = origText;
      btn.style.background = '';
      btn.style.boxShadow  = '';
      [nameInput, emailInput, msgInput].forEach(inp => { inp.value = ''; });
    }, 3000);
  });
}


/* ════════════════════════════════════════════
   15. MOTION BLUR EFFECT ON FAST SCROLL
════════════════════════════════════════════ */
function initMotionBlur() {
  let lastScrollY   = 0;
  let blurTimeout;
  const body        = document.body;

  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;

    if (delta > 20) {
      // Apply subtle blur to sections during fast scroll
      const blurPx = Math.min(3, delta * 0.05);
      body.style.setProperty('--motion-blur', `${blurPx}px`);
    }

    clearTimeout(blurTimeout);
    blurTimeout = setTimeout(() => {
      body.style.setProperty('--motion-blur', '0px');
    }, 100);
  }, { passive: true });
}


/* ════════════════════════════════════════════
   16. INIT ALL
════════════════════════════════════════════ */
function init() {
  // Generate dynamic elements
  generateStars();
  generateRoadDashes();
  generatePylons();

  // Initialize systems
  ParticleSystem.start();
  typewriterEffect();
  initCursor();
  initScrollProgress();
  initReveal();
  initNav();
  initSpeedometer();
  initParallax();
  initTilt();
  initContactForm();
  initMotionBlur();

  // Small page load animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
}

/* Wait for DOM */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}