/* ========================================
   RAJA MUDASSIR PORTFOLIO - script.js
   Interactions, Animations, Utilities
   ======================================== */

// ---- Navbar Scroll Behavior ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ---- Mobile Nav Toggle ----
navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMobile?.classList.toggle('open');
});

// Close mobile nav when link clicked
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navMobile?.classList.remove('open');
  });
});

// ---- Active Nav Link ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar .nav-links a, .nav-mobile a');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Also highlight based on current page filename
function highlightCurrentPage() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navbar .nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
highlightCurrentPage();

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when they come into view
      if (entry.target.classList.contains('skills-category')) {
        animateSkillBars(entry.target);
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger, .skills-category').forEach(el => {
  revealObserver.observe(el);
});

// ---- Skill Bars Animation ----
function animateSkillBars(container) {
  const fills = container.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    const target = fill.getAttribute('data-width');
    setTimeout(() => {
      fill.style.width = target + '%';
    }, 100);
  });
}

// Also observe individual skill categories even on dedicated page
document.querySelectorAll('.skill-fill').forEach(fill => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-width');
        setTimeout(() => {
          entry.target.style.width = target + '%';
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(fill);
});

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-card, .hero-stats, .about-stats').forEach(el => {
  counterObserver.observe(el);
});

// ---- Project Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.85)';
        setTimeout(() => { card.style.display = 'none'; }, 350);
      }
    });
  });
});

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  btn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
  btn.style.background = '#0D9488';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Cursor glow effect (subtle) ----
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20,184,166,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ---- Testimonial Slider (auto) ----
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

function showTestimonial(index) {
  // Only for mobile-style single view
  if (window.innerWidth > 900 || !testimonials.length) return;
  testimonials.forEach((t, i) => {
    t.style.display = i === index ? 'block' : 'none';
  });
}

prevBtn?.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

nextBtn?.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// ---- Floating background particles ----
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 15 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: rgba(20, 184, 166, ${Math.random() * 0.3 + 0.05});
      border-radius: 50%;
      pointer-events: none;
      animation: float-particle ${dur}s ease-in-out ${delay}s infinite alternate;
    `;
    hero.appendChild(particle);
  }
}

// Add keyframe for particles
const style = document.createElement('style');
style.textContent = `
  @keyframes float-particle {
    from { transform: translateY(0) scale(1); opacity: 0.3; }
    to { transform: translateY(-40px) scale(1.5); opacity: 0.8; }
  }
`;
document.head.appendChild(style);

createParticles();

// ---- Page transitions ----
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('http') && href.endsWith('.html')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  }
});

// Fade in on load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.4s ease';
});
document.body.style.opacity = '0';

// ---- Init ----
updateActiveNav();
