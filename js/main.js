/* ===========================================================
   MAIN.JS — Construtora Bezerra Mendes LTDA
   =========================================================== */

const WHATSAPP_NUMBER = '5585999999999'; // UPDATE THIS WITH REAL NUMBER
const WHATSAPP_MSG = encodeURIComponent('Olá! Vi o site da Construtora Bezerra Mendes e gostaria de solicitar um orçamento.');

/* -----------------------------------------------------------
   PRELOADER
   ----------------------------------------------------------- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  }
});

/* -----------------------------------------------------------
   NAVBAR
   ----------------------------------------------------------- */
const navbar = document.getElementById('navbar');

function initNavbar() {
  if (!navbar) return;
  const isHome = navbar.dataset.home === 'true';

  const update = () => {
    if (isHome) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    } else {
      navbar.classList.add('solid');
    }
    // Back to Top
    const btn = document.getElementById('back-to-top');
    if (btn) btn.classList.toggle('show', window.scrollY > 500);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();

  // Active link
  const links = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) link.classList.add('active');
  });
}

/* -----------------------------------------------------------
   HAMBURGER MENU
   ----------------------------------------------------------- */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* -----------------------------------------------------------
   WHATSAPP BUTTON
   ----------------------------------------------------------- */
function initWhatsApp() {
  const waBtn = document.getElementById('whatsapp-float');
  if (waBtn) {
    waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
  }

  // All whatsapp-link elements
  document.querySelectorAll('.whatsapp-link').forEach(el => {
    el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
    el.target = '_blank';
  });
}

/* -----------------------------------------------------------
   BACK TO TOP
   ----------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* -----------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
   ----------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  items.forEach(item => observer.observe(item));
}

/* -----------------------------------------------------------
   COUNTER ANIMATION
   ----------------------------------------------------------- */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* -----------------------------------------------------------
   HERO SLIDER (Home page)
   ----------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let current = 0;
  slides[0].classList.add('active');

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 6000);
}

/* -----------------------------------------------------------
   TESTIMONIALS SLIDER
   ----------------------------------------------------------- */
function initTestimonials() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  if (cards.length === 0) return;

  const prevBtn = document.querySelector('.test-prev');
  const nextBtn = document.querySelector('.test-next');
  const dots = document.querySelectorAll('.test-dot');

  let current = 0;

  const goTo = (index) => {
    cards[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  };

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  goTo(0);
  setInterval(() => goTo(current + 1), 5500);
}

/* -----------------------------------------------------------
   INIT ALL
   ----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initWhatsApp();
  initBackToTop();
  initReveal();
  initCounters();
  initHeroSlider();
  initTestimonials();
});
