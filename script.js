/**
 * Hammad Ahmad — Portfolio
 * Software Developer & AI Product Engineer
 * STRICT: ONLY HERO + ABOUT SECTION
 * Existing 190-Frame Video Scroll Animation Engine
 */

(() => {
  'use strict';

  const TOTAL_FRAMES = 190;
  const FRAME_PATH = (index) =>
    `portfolio_video_frames/portfolio_frames/frame_${String(index).padStart(4, '0')}.jpg`;

  const canvas = document.getElementById('scroll-canvas');
  const ctx = canvas.getContext('2d');
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loader-progress');
  const loaderText = document.getElementById('loader-text');
  const heroSection = document.getElementById('hero');
  const aboutContent = document.querySelector('.about-content') || document.querySelector('.about-inner');

  // Cache loaded images
  const images = new Array(TOTAL_FRAMES);

  // Animation states
  let targetFrame = 0;
  let currentFrame = 0;
  let lastRenderedFrame = -1;
  let isResizing = false;
  const LERP_SPEED = 0.09; // Smooth linear interpolation

  /**
   * Resize canvas buffer with High-DPI (Retina) support
   */
  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    lastRenderedFrame = -1;
  }

  /**
   * Draw frame with aspect ratio 'cover'
   */
  function drawFrame(img) {
    if (!img || !canvas || !ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  /**
   * Fallback to nearest loaded frame if current target frame is still loading
   */
  function getNearestLoadedFrame(index) {
    if (images[index]) return images[index];

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && images[prev]) return images[prev];
      const next = index + offset;
      if (next < TOTAL_FRAMES && images[next]) return images[next];
    }
    return null;
  }

  /**
   * Calculate scroll progress across Hero into About
   */
  function updateScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const aboutElem = document.getElementById('about');
    let maxScroll = 0;
    if (aboutElem) {
      maxScroll = aboutElem.offsetTop + aboutElem.offsetHeight - window.innerHeight;
    }
    if (maxScroll <= 0) {
      maxScroll = window.innerHeight * 1.5;
    }
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

    // Progress drives video frames from 0 to 189
    targetFrame = progress * (TOTAL_FRAMES - 1);

    // Subtle scroll reveal coordination
    if (heroSection) {
      if (progress <= 0.35) {
        const heroOpacity = Math.max(0, 1 - (progress / 0.30));
        const heroY = -(progress * 60);
        heroSection.style.opacity = heroOpacity.toFixed(3);
        heroSection.style.transform = `translateY(${heroY.toFixed(1)}px)`;
        heroSection.style.pointerEvents = heroOpacity > 0.1 ? 'auto' : 'none';
      } else {
        heroSection.style.opacity = '0';
        heroSection.style.pointerEvents = 'none';
      }
    }

    if (aboutContent) {
      if (progress >= 0.15) {
        const aboutEntrance = Math.min(1, Math.max(0, (progress - 0.15) / 0.25));
        const translateY = (1 - aboutEntrance) * 24;
        aboutContent.style.opacity = Math.min(1, aboutEntrance).toFixed(3);
        aboutContent.style.transform = `translateY(${translateY.toFixed(1)}px)`;
      } else {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(24px)';
      }
    }
  }

  /**
   * Main render loop using requestAnimationFrame and LERP easing
   */
  function renderLoop() {
    currentFrame += (targetFrame - currentFrame) * LERP_SPEED;

    if (Math.abs(targetFrame - currentFrame) < 0.001) {
      currentFrame = targetFrame;
    }

    const frameIndex = Math.round(currentFrame);

    if (frameIndex !== lastRenderedFrame) {
      const frameImg = getNearestLoadedFrame(frameIndex);
      if (frameImg) {
        drawFrame(frameImg);
        lastRenderedFrame = frameIndex;
      }
    }

    requestAnimationFrame(renderLoop);
  }

  /**
   * Preload single image
   */
  function loadFrame(index) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = FRAME_PATH(index);

      const onDone = () => {
        images[index] = img;
        resolve();
      };

      if (img.decode) {
        img.decode().then(onDone).catch(onDone);
      } else {
        img.onload = onDone;
        img.onerror = onDone;
      }
    });
  }

  /**
   * Preload sequence with immediate Frame 0 paint & concurrent worker pool
   */
  async function preloadSequence() {
    // 1. Paint frame 0 immediately
    await loadFrame(0);
    drawFrame(images[0]);
    lastRenderedFrame = 0;

    let loadedCount = 1;
    const BATCH_SIZE = 8;
    const queue = [];

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      queue.push(i);
    }

    const updateProgress = () => {
      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      if (loaderProgress) loaderProgress.style.width = `${percent}%`;
      if (loaderText) loaderText.textContent = `Loading ${percent}%`;
    };

    async function worker() {
      while (queue.length > 0) {
        const index = queue.shift();
        await loadFrame(index);
        loadedCount++;
        updateProgress();
      }
    }

    const workers = Array.from({ length: BATCH_SIZE }, () => worker());
    await Promise.all(workers);

    if (loaderProgress) loaderProgress.style.width = '100%';
    if (loaderText) loaderText.textContent = 'Ready';
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
    }, 250);
  }

  // Event Listeners
  window.addEventListener('scroll', updateScroll, { passive: true });

  window.addEventListener('resize', () => {
    if (!isResizing) {
      isResizing = true;
      requestAnimationFrame(() => {
        resizeCanvas();
        updateScroll();
        isResizing = false;
      });
    }
  });

  // Init
  resizeCanvas();
  updateScroll();
  requestAnimationFrame(renderLoop);
  preloadSequence();
})();


/* ============================================================
   FEATURED PROJECTS — Scroll-Driven Sticky 3D Curved Carousel
   The carousel is pinned/sticky inside #projects while scrolling.
   Vertical page scroll directly drives the 3D arc progression.
   Center card remains prominent, sharp, and all details visible.
   ============================================================ */
(function () {
  'use strict';

  const section  = document.getElementById('projects');
  const stage    = document.getElementById('projStage');
  const viewport = document.getElementById('projViewport');
  const track    = document.getElementById('projTrack');
  const dotsWrap = document.getElementById('projDots');
  const btnPrev  = document.getElementById('projPrev');
  const btnNext  = document.getElementById('projNext');

  if (!section || !viewport || !track) return;

  const cards = Array.from(track.querySelectorAll('.proj-card'));
  const dots  = Array.from(dotsWrap ? dotsWrap.querySelectorAll('.proj-dot') : []);
  const N     = cards.length;
  if (N === 0) return;

  /* ── Arc geometry ── */
  const ARC_STEP_X    = () => Math.min(viewport.offsetWidth * 0.28, 250);
  const ARC_DEPTH     = () => Math.min(viewport.offsetWidth * 0.22, 260);
  const ARC_ROTATE_Y  = 13;
  const SCALE_CENTER  = 1.0;
  const SCALE_MIN     = 0.65;
  const OPACITY_MIN   = 0.35;

  /* ── State ── */
  let currentFloat = 0.0;
  let targetFloat  = 0.0;
  let isDragging   = false;
  let dragStartX   = 0;
  let dragStartScrollY = 0;

  /* ── Compute scroll progress within #projects ── */
  function getScrollProgress() {
    const rect = section.getBoundingClientRect();
    const totalDist = section.offsetHeight - window.innerHeight;
    if (totalDist <= 0) return 0;
    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / totalDist));
  }

  /* ── Compute per-card transform along the 3D curve ── */
  function computeCardTransform(cardIndex, floatPos) {
    const offset = cardIndex - floatPos;
    const absOff = Math.abs(offset);

    const stepX = ARC_STEP_X();
    const depth = ARC_DEPTH();

    const tx = offset * stepX;
    const tz = -(absOff * absOff) * (depth / 4.2);
    const ry = -offset * ARC_ROTATE_Y;

    const t  = Math.min(absOff, 3) / 3;
    const sc = SCALE_CENTER - (SCALE_CENTER - SCALE_MIN) * (t * t);

    const opacity = 1 - (1 - OPACITY_MIN) * Math.min(absOff / 2.2, 1);
    const zIndex  = Math.round(100 - absOff * 10);

    return { tx, tz, ry, sc, opacity, zIndex };
  }

  /* ── Render all cards ── */
  function renderCards(floatPos) {
    cards.forEach((card, i) => {
      const { tx, tz, ry, sc, opacity, zIndex } = computeCardTransform(i, floatPos);

      card.style.transform =
        `translate(-50%, -50%) translateX(${tx.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex  = zIndex;

      const isActive = Math.abs(floatPos - i) < 0.5;
      card.classList.toggle('is-active', isActive);
    });
  }

  /* ── Update dots and arrows ── */
  function updateUI(activeIdx) {
    dots.forEach((d, i) => d.classList.toggle('proj-dot--active', i === activeIdx));
    if (btnPrev) btnPrev.style.opacity = activeIdx === 0     ? '0.3' : '1';
    if (btnNext) btnNext.style.opacity = activeIdx === N - 1 ? '0.3' : '1';
  }

  /* ── Smooth scroll to a specific project index ── */
  function scrollToProject(index) {
    index = Math.max(0, Math.min(index, N - 1));
    const totalDist = section.offsetHeight - window.innerHeight;
    const sectionTop = window.pageYOffset + section.getBoundingClientRect().top;
    const targetY = sectionTop + (index / (N - 1)) * totalDist;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }

  /* ── Arrow & Dot controls ── */
  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      scrollToProject(Math.round(currentFloat) - 1);
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      scrollToProject(Math.round(currentFloat) + 1);
    });
  }
  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      scrollToProject(i);
    });
  });

  /* ── Click side card to navigate ── */
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (!isDragging && Math.abs(currentFloat - i) > 0.4) {
        scrollToProject(i);
      }
    });
  });

  /* ── Keyboard navigation when section is in view ── */
  document.addEventListener('keydown', (e) => {
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    const cur = Math.round(currentFloat);
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToProject(cur - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollToProject(cur + 1); }
  });

  /* ── Optional touch / mouse horizontal drag mapping to scroll ── */
  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartScrollY = window.pageYOffset;
    viewport.setPointerCapture(e.pointerId);
    viewport.classList.add('is-dragging');
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const totalDist = section.offsetHeight - window.innerHeight;
    const pxPerCard = totalDist / (N - 1);
    const scrollDelta = -(deltaX / 140) * pxPerCard * 0.6;
    window.scrollTo({
      top: dragStartScrollY + scrollDelta,
      behavior: 'auto'
    });
  });

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('is-dragging');
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  /* ── Main Animation / Render Loop ── */
  let lastActive = -1;
  function loop() {
    const progress = getScrollProgress();
    targetFloat = progress * (N - 1);

    // LERP easing for ultra-smooth buttery motion
    currentFloat += (targetFloat - currentFloat) * 0.12;

    renderCards(currentFloat);

    const activeIdx = Math.round(currentFloat);
    if (activeIdx !== lastActive) {
      updateUI(activeIdx);
      lastActive = activeIdx;
    }

    requestAnimationFrame(loop);
  }

  // Recalculate on resize
  window.addEventListener('resize', () => {
    renderCards(currentFloat);
  });

  // Start loop
  loop();

})();


/* ============================================================
   CONTACT FORM HANDLERS — WhatsApp & Email dispatch
   ============================================================ */
(function () {
  'use strict';

  const form = document.getElementById('cf');
  if (!form) return;

  const btnWa = document.getElementById('cf-wa');
  const btnMail = document.getElementById('cf-mail');
  const statusEl = document.getElementById('cf-st');

  const WHATSAPP_NUM = '923265933029';
  const EMAIL_ADDR   = 'hammadxprof174@gmail.com';

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function validateAndBuild() {
    const name = getVal('cf-name');
    const svc  = getVal('cf-svc');
    const msg  = getVal('cf-msg');

    if (!name || !msg) {
      if (statusEl) {
        statusEl.textContent = 'Please enter your name and a brief message.';
        statusEl.style.color = '#ff9d66';
      }
      return null;
    }

    if (statusEl) statusEl.textContent = '';

    const text = `Hi Hammad, my name is ${name}.\nI need ${svc}.\n\n${msg}`;
    return { name, svc, msg, text };
  }

  if (btnWa) {
    btnWa.addEventListener('click', () => {
      const payload = validateAndBuild();
      if (!payload) return;
      const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(payload.text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (btnMail) {
    btnMail.addEventListener('click', () => {
      const payload = validateAndBuild();
      if (!payload) return;
      const subject = encodeURIComponent(`Project Inquiry: ${payload.svc} — ${payload.name}`);
      const body    = encodeURIComponent(payload.text);
      window.location.href = `mailto:${EMAIL_ADDR}?subject=${subject}&body=${body}`;
    });
  }

  // Update footer year dynamically
  const yr = document.getElementById('yr');
  if (yr) {
    yr.textContent = new Date().getFullYear();
  }
})();


/* ============================================================
   NAVBAR ACTIVE STATE & SMOOTH SCROLLING
   ============================================================ */
(function () {
  'use strict';

  const navLinks = Array.from(document.querySelectorAll('.site-nav .nav-link'));
  const sectionIds = ['about', 'skills', 'services', 'contact'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const matches = id ? href === `#${id}` : false;
      link.classList.toggle('active', matches);
    });
  }

  function updateActiveNav() {
    const scrollY = window.pageYOffset || window.scrollY;
    const windowH = window.innerHeight;
    const docH    = document.documentElement.scrollHeight;

    // Near the very bottom -> activate contact
    if (scrollY + windowH >= docH - 100) {
      setActive('contact');
      return;
    }

    let activeId = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= windowH * 0.45 && rect.bottom >= windowH * 0.15) {
        activeId = section.id;
      }
    });

    setActive(activeId);
  }

  // Smooth scroll for in-page anchors
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.getElementById('site-header');
          const headerH = header ? header.offsetHeight : 60;
          const targetY = window.pageYOffset + targetEl.getBoundingClientRect().top - (targetId === 'hero' ? 0 : headerH);
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
          setActive(targetId);
        }
      });
    }
  });

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);

  // Initial check
  updateActiveNav();
})();
