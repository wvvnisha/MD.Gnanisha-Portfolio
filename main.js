/* ============================================================
   GNANISHA PORTFOLIO – MAIN.JS
   Navigation, tabs, scroll effects, and animations
   ============================================================ */

// ---------- MOBILE NAV TOGGLE ----------
function toggleMenu() {
  document.querySelector('.navbar').classList.toggle('nav-mobile-open');
}

// Close menu on nav link click (mobile)
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.querySelector('.navbar').classList.remove('nav-mobile-open');
  });
});

// ---------- NAVBAR SCROLL EFFECT ----------
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 24px rgba(13,27,42,0.35)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ---------- CCA TABS ----------
function showTab(tabId) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(function(tab) {
    tab.classList.add('hidden');
  });
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  // Show selected tab
  var selected = document.getElementById('tab-' + tabId);
  if (selected) {
    selected.classList.remove('hidden');
  }
  // Activate clicked button
  event.target.classList.add('active');
}

// ---------- SCROLL REVEAL ----------
// Animate elements on scroll into view
function initScrollReveal() {
  var revealElements = document.querySelectorAll(
    '.about-block, .stat-card, .cert-card, .nlevel-card, ' +
    '.ach-feature-card, .comp-card, .speaking-item, .extra-card, ' +
    '.project-card, .activity-item, .ft-item, .poly-card, .nav-card, ' +
    '.interest-item, .hours-card, .timeline-item'
  );

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
}

// ---------- SKILL BAR ANIMATION ----------
function animateSkillBars() {
  var bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        var targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(function() {
          bar.style.width = targetWidth;
        }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(function(bar) {
    var original = bar.style.width;
    bar.setAttribute('data-width', original);
    observer.observe(bar);
  });
}

// ---------- ACTIVE NAV HIGHLIGHT ON SCROLL ----------
function initActiveNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 80;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// ---------- STAGGERED GRID ANIMATION ----------
function staggerGridItems() {
  var grids = [
    '.about-grid .about-block',
    '.interests-row .interest-item',
    '.cert-cards-grid .cert-card',
    '.comp-grid .comp-card',
    '.extra-grid .extra-card',
    '.projects-grid .project-card',
    '.nav-cards .nav-card',
    '.poly-options .poly-card'
  ];

  grids.forEach(function(selector) {
    var items = document.querySelectorAll(selector);
    items.forEach(function(item, i) {
      item.style.transitionDelay = (i * 0.08) + 's';
    });
  });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
  animateSkillBars();
  initActiveNav();
  staggerGridItems();
});

// ---------- LIGHTBOX ----------
function openLightbox(imgSrc, caption) {
  var overlay = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var cap = document.getElementById('lightbox-caption');
  if (!overlay || !img) return;
  img.src = imgSrc;
  img.alt = caption || '';
  if (cap) cap.textContent = caption || '';
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var overlay = document.getElementById('lightbox');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});
