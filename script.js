/* ============================================================
   TAVANA MEDIA AND DIGITAL — Portfolio Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Remove preloader once all resources have loaded (images/fonts)
  const preloader = document.getElementById('page-preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('preloader-hidden');
      // initialize cursor only after preloader begins hiding
      try { if (typeof initCursor === 'function') initCursor(); } catch (e) { /* ignore */ }
      preloader.addEventListener('transitionend', () => {
        if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, { once: true });
    });
  }

  /* ----------------------------------------------------------
     Custom Cursor (initialized after preloader is removed)
  ---------------------------------------------------------- */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
      }
    });

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
      }
      requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!ring) return;
        ring.style.width       = '54px';
        ring.style.height      = '54px';
        ring.style.borderColor = 'rgba(26, 60, 255, 0.77)';
      });
      el.addEventListener('mouseleave', () => {
        if (!ring) return;
        ring.style.width       = '36px';
        ring.style.height      = '36px';
        ring.style.borderColor = 'rgba(26, 144, 255, 0.22)';
      });
    });
  }

  /* ----------------------------------------------------------
     Scroll Reveal
  ---------------------------------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ----------------------------------------------------------
     Portfolio Tab Switching
  ---------------------------------------------------------- */
  window.switchTab = function(type, btn) {
    document.querySelectorAll('.work-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(type + 'Panel');
    if (panel) {
      panel.classList.add('active');
      panel.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 60);
      });
    }
  };

  /* ----------------------------------------------------------
     Hero CTA — scroll + open correct tab
  ---------------------------------------------------------- */
  const devBtn  = document.getElementById('devBtn');
  const filmBtn = document.getElementById('filmBtn');

  if (devBtn) {
    devBtn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const tabs = document.querySelectorAll('.work-tab');
        window.switchTab('dev', tabs[0]);
      }, 650);
    });
  }

  if (filmBtn) {
    filmBtn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const tabs = document.querySelectorAll('.work-tab');
        window.switchTab('film', tabs[1]);
      }, 650);
    });
  }

  /* ----------------------------------------------------------
     Active Nav on Scroll
  ---------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link-item');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 250) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  /* ----------------------------------------------------------
     Navbar shrink on scroll
  ---------------------------------------------------------- */
  const nav = document.querySelector('.tavana-nav');
  window.addEventListener('scroll', () => {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.style.padding = '0.7rem 0';
      nav.style.background = 'rgba(1, 49, 242, 0.98)';
    } else {
      nav.style.padding = '1.2rem 0';
      nav.style.background = 'linear-gradient(to bottom, rgba(11, 24, 164, 0.66), transparent)';
    }
  });

});
