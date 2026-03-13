/* ============================================================
   RONI MARGOLIN — Portfolio Site
   script.js
   ============================================================ */

/* === SCROLL REVEAL === */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* === NAV SCROLL BEHAVIOUR === */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });
}

/* === SMOOTH SCROLL FOR ANCHOR LINKS === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = (document.querySelector('.nav')?.offsetHeight || 64) + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

/* === CUSTOM CURSOR (desktop / fine pointer only) === */
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  let mx = -100, my = -100, cx = -100, cy = -100;
  let raf;

  const darkSelectors = '.hero, .about, .footer';
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    const el = document.elementFromPoint(mx, my);
    if (el && el.closest(darkSelectors)) dot.classList.add('on-dark');
    else dot.classList.remove('on-dark');
  });

  function tick() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    dot.style.left = cx + 'px';
    dot.style.top  = cy + 'px';
    raf = requestAnimationFrame(tick);
  }
  tick();

  /* Expand on interactive elements */
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => dot.classList.remove('is-hovering'));
  });

}

/* === BACK TO TOP (CS pages) === */
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 200);
  }, { passive: true });
}
