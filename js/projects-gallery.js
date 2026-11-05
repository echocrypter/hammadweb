/**
 * Hammad Ahmad — Cinematic Projects Showcase Engine
 * Visual Hierarchy:
 *   1. Hammad Full-Page Portrait = Main Hero Subject
 *   2. Floating Glass Panels = Futuristic UI Elements Orbiting Around Him
 */

(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // COMPLETE 30 PROJECTS DATABASE (Extracted from Portfolio Zip)
  // ══════════════════════════════════════════════════════════════
  const PROJECTS_DATA = [
    // Web & Desktop Applications
    {
      id: 'pos',
      name: 'POS System',
      cat: 'apps',
      badge: 'Desktop App',
      desc: 'Point-of-Sale desktop application for retail management, inventory tracking, instant invoicing, and accounting reporting.',
      img: 'assets/projects/POS.jpg',
      url: 'https://github.com/echocrypter/Naeem-Mobile-POS',
      tags: ['Electron', 'React', 'SQLite', 'Desktop']
    },
    {
      id: 'leadhawk',
      name: 'LeadHawk',
      cat: 'apps',
      badge: 'Desktop App',
      desc: 'B2B lead generation, scraping, and qualification desktop tool built for high-throughput sales pipeline automation.',
      img: 'assets/projects/leadh.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['Electron', 'Python', 'Automation', 'SaaS']
    },
    {
      id: 'habitly',
      name: 'Habitly',
      cat: 'apps',
      badge: 'Web App',
      desc: 'Minimalist habit tracking application featuring routine streaks, progress analytics, and responsive dark mode.',
      img: 'assets/projects/habitly.jpg',
      url: 'https://habitly-three-blue.vercel.app/',
      tags: ['Next.js', 'React', 'Zustand', 'Tailwind']
    },
    {
      id: 'fintrack',
      name: 'FinTrack',
      cat: 'apps',
      badge: 'Web App',
      desc: 'Personal finance and cashflow tracker with visual spending charts, categorized transactions, and monthly budget limits.',
      img: 'assets/projects/fintrack.jpg',
      url: 'https://v0-fintrack-hammadapp.vercel.app/',
      tags: ['React', 'Charts', 'Tailwind', 'Vite']
    },
    {
      id: 'mini-jarvis',
      name: 'Mini Jarvis',
      cat: 'apps',
      badge: 'AI App',
      desc: 'Voice-controlled AI assistant app inspired by Jarvis for natural voice task automation, reminders, and knowledge queries.',
      img: 'assets/projects/jarvis.jpg',
      url: 'https://jarvis-theta-peach.vercel.app/',
      tags: ['AI Agent', 'Web Speech', 'LLM', 'React']
    },

    // Websites
    {
      id: 'air-khushab',
      name: 'Air Khushab',
      cat: 'web',
      badge: 'Website',
      desc: 'High-speed broadband ISP portal with customer self-service, plan upgrades, speed testing, and billing management.',
      img: 'assets/projects/airkhu.jpg',
      url: 'https://air-khushab-broadband.vercel.app/',
      tags: ['Next.js', 'Tailwind', 'ISP Portal', 'UI/UX']
    },
    {
      id: 'khayam-cinema',
      name: 'Khayam Cinema',
      cat: 'web',
      badge: 'Website',
      desc: 'Cinema ticketing and showtime reservation platform featuring seat mapping, movie trailers, and instant checkout.',
      img: 'assets/projects/khayam.jpg',
      url: 'https://khayam-cinema.vercel.app/',
      tags: ['React', 'Framer Motion', 'Ticketing', 'Booking']
    },
    {
      id: 'khamis',
      name: 'Khamis Mushait',
      cat: 'web',
      badge: 'Website',
      desc: 'Hospitality and regional tourism showcase portal for Saudi Arabia destination exploration and booking assistance.',
      img: 'assets/projects/khamis.jpg',
      url: 'https://khamis-mushait.vercel.app/',
      tags: ['React', 'Tailwind', 'Tourism', 'Multilingual']
    },
    {
      id: 'naeem-mobile',
      name: 'Naeem Mobile',
      cat: 'web',
      badge: 'E-Commerce',
      desc: 'Mobile tech retail storefront with live inventory lookup, device comparisons, warranty status, and direct WhatsApp checkout.',
      img: 'assets/projects/naeem.jpg',
      url: 'https://naeem-mobile.vercel.app/',
      tags: ['Next.js', 'E-Commerce', 'Tailwind', 'WhatsApp API']
    },
    {
      id: 'novanest',
      name: 'NovaNest',
      cat: 'web',
      badge: 'Real Estate',
      desc: 'Modern architectural real estate platform with high-res property tours, mortgage calculators, and agent scheduling.',
      img: 'assets/projects/novanest.jpg',
      url: 'https://novanest-real-estate.vercel.app/',
      tags: ['React', 'Tailwind', 'Real Estate', 'Vite']
    },
    {
      id: 'rehman-sweets',
      name: 'Rehman Sweets',
      cat: 'web',
      badge: 'E-Commerce',
      desc: 'Confectionery and traditional sweets bakery ordering portal with custom gift box builders and local delivery dispatch.',
      img: 'assets/projects/rehman.jpg',
      url: 'https://rehman-sweets.vercel.app/',
      tags: ['Next.js', 'E-Commerce', 'Tailwind', 'Stripe']
    },
    {
      id: 'bistro-table',
      name: 'Bistro Table',
      cat: 'web',
      badge: 'Restaurant',
      desc: 'Fine dining culinary website with digital menus, online table reservations, chef specials, and event bookings.',
      img: 'assets/projects/bistro.jpg',
      url: 'https://bistro-table.vercel.app/',
      tags: ['React', 'Reservations', 'Tailwind', 'Gastronomy']
    },
    {
      id: 'luxe-hotel',
      name: 'Luxe Hotel',
      cat: 'web',
      badge: 'Hospitality',
      desc: 'Luxury resort and boutique hotel booking experience with suite availability calendar, amenities guide, and VIP concierge.',
      img: 'assets/projects/luxe.jpg',
      url: 'https://luxe-hotel-booking.vercel.app/',
      tags: ['React', 'Framer Motion', 'Hospitality', 'Booking']
    },
    {
      id: 'car-repair',
      name: 'Car Repair Hub',
      cat: 'web',
      badge: 'Automotive',
      desc: 'Automotive workshop service booking platform with repair price estimates, real-time job tracking, and maintenance logs.',
      img: 'assets/projects/repair.jpg',
      url: 'https://car-repair-hub.vercel.app/',
      tags: ['React', 'Tailwind', 'Automotive', 'Booking']
    },
    {
      id: 'fitness-pro',
      name: 'Fitness Pro',
      cat: 'web',
      badge: 'Fitness',
      desc: 'Gym and athletic membership platform with workout programs, trainer scheduling, nutrition calculators, and member logins.',
      img: 'assets/projects/fitness.jpg',
      url: 'https://fitness-pro-gym.vercel.app/',
      tags: ['Next.js', 'Fitness', 'Membership', 'Tailwind']
    },
    {
      id: 'clean-wave',
      name: 'CleanWave',
      cat: 'web',
      badge: 'Services',
      desc: 'Commercial and residential cleaning service platform with automated quote generation, instant booking, and checklist tracking.',
      img: 'assets/projects/clean.jpg',
      url: 'https://clean-wave-services.vercel.app/',
      tags: ['React', 'Vite', 'Booking Flow', 'Tailwind']
    },
    {
      id: 'zen-dental',
      name: 'Zen Dental Care',
      cat: 'web',
      badge: 'Healthcare',
      desc: 'Modern dental clinic website with online patient scheduling, procedure guides, insurance verification, and smile gallery.',
      img: 'assets/projects/dental.jpg',
      url: 'https://zen-dental-care.vercel.app/',
      tags: ['Next.js', 'Healthcare', 'Tailwind', 'Appointments']
    },
    {
      id: 'glow-salon',
      name: 'Glow Salon',
      cat: 'web',
      badge: 'Beauty',
      desc: 'Boutique beauty salon and spa booking experience with stylist selection, service menus, portfolio gallery, and reminders.',
      img: 'assets/projects/salon.jpg',
      url: 'https://glow-salon-spa.vercel.app/',
      tags: ['React', 'Tailwind', 'Spa Booking', 'UI/UX']
    },
    {
      id: 'sparkle-clean',
      name: 'Sparkle Cleaners',
      cat: 'web',
      badge: 'Services',
      desc: 'Premium dry cleaning and laundry pickup service with wardrobe tracking, scheduling, and SMS notifications.',
      img: 'assets/projects/cleaners.jpg',
      url: 'https://sparkle-cleaners.vercel.app/',
      tags: ['React', 'Tailwind', 'Logistics', 'Vite']
    },

    // AI Automation & Autonomous Agents
    {
      id: 'ai-customer-support',
      name: 'AI Support Agent',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Autonomous 24/7 omnichannel customer service agent that resolves inquiries, checks databases, and escalates complex tickets.',
      img: 'assets/projects/support.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['LangChain', 'FastAPI', 'RAG', 'PostgreSQL']
    },
    {
      id: 'lead-generation-agent',
      name: 'Lead Gen Agent',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Self-directed AI bot that crawls industry portals, extracts verified contact emails, enriches profiles, and qualifies leads.',
      img: 'assets/projects/leadgen.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['Python', 'Playwright', 'LLM', 'Lead Scoring']
    },
    {
      id: 'seo-agent',
      name: 'SEO Audit Agent',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Autonomous crawler that performs technical SEO diagnostics, keyword gap audits, and schema markup fixes with AI summaries.',
      img: 'assets/projects/seo.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['Python', 'SEO Engine', 'Claude API', 'Automation']
    },
    {
      id: 'ai-voice-receptionist',
      name: 'Voice Receptionist',
      cat: 'ai',
      badge: 'AI Voice',
      desc: 'Real-time conversational voice receptionist handling inbound customer calls, answering FAQs, and booking calendar appointments.',
      img: 'assets/projects/voice.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['LiveKit', 'WebRTC', 'OpenAI Realtime', 'Twilio']
    },
    {
      id: 'ai-appointment-setter',
      name: 'Appointment Setter',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Automated conversational agent syncing Google Calendar and Outlook to negotiate meetings and send reminders over WhatsApp and SMS.',
      img: 'assets/projects/appointment.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['FastAPI', 'Cal.com API', 'OpenAI', 'WhatsApp']
    },
    {
      id: 'hr-onboarding-agent',
      name: 'HR Onboarding Bot',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Interactive internal assistant that guides new team members through policy handbooks, team structures, and credential setup.',
      img: 'assets/projects/hr.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['LlamaIndex', 'Slack Bot', 'Vector Store', 'Python']
    },
    {
      id: 'ecommerce-support-agent',
      name: 'E-Commerce Bot',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Shopify-integrated conversational assistant answering order tracking queries, product recommendations, and return processes.',
      img: 'assets/projects/ecom.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['Shopify API', 'RAG', 'Function Calling', 'TypeScript']
    },
    {
      id: 'real-estate-agent',
      name: 'Real Estate Bot',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Intelligent listing inquiry handler qualifying home buyers, scheduling showings, and answering zoning and financing questions.',
      img: 'assets/projects/realestate.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['FastAPI', 'Vector Search', 'MLS Feed', 'Python']
    },
    {
      id: 'financial-insights-agent',
      name: 'Finance Insights',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Automated financial intelligence agent reading ledger CSVs, forecasting runway, and detecting subscription anomalies.',
      img: 'assets/projects/finance.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['Pandas', 'OpenAI Function', 'Charts', 'Python']
    },
    {
      id: 'travel-planner-agent',
      name: 'Travel Planner',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Multimodal itinerary curation agent structuring personalized travel schedules, flight options, and dining reservations.',
      img: 'assets/projects/travel.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['Gemini API', 'Maps API', 'React', 'JSON Schema']
    },
    {
      id: 'social-media-agent',
      name: 'Social Media Agent',
      cat: 'ai',
      badge: 'AI Agent',
      desc: 'Autonomous multi-platform content strategist scheduling posts, generating captions, and analyzing engagement trends.',
      img: 'assets/projects/social.jpg',
      url: 'https://github.com/echocrypter',
      tags: ['Automation', 'Buffer API', 'Claude', 'Analytics']
    }
  ];

  // ══════════════════════════════════════════════════════════════
  // DOM REFERENCES
  // ══════════════════════════════════════════════════════════════
  const stage = document.getElementById('portraitStage');
  const panelsField = document.getElementById('panelsField');
  const projectsGrid = document.getElementById('projectsGrid');
  const btnPause = document.getElementById('btnPause');
  const pauseIcon = document.getElementById('pauseIcon');
  const pauseText = document.getElementById('pauseText');
  const filterPills = document.querySelectorAll('.filter-pill');
  const gridFilterPills = document.querySelectorAll('.grid-filter-pill');

  // Modal elements
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTagsList = document.getElementById('modalTagsList');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCta = document.getElementById('modalCta');

  // ══════════════════════════════════════════════════════════════
  // STATE & ORBIT CONSTANTS
  // ══════════════════════════════════════════════════════════════
  let currentFilter = 'all';
  let isPaused = false;
  let isHoveringPanel = false;
  let animationFrameId = null;

  // Active floating panels elements in the hero stage
  let activePanels = [];
  let orbitAngle = 0; // Current base rotation angle (radians)
  const ROTATION_SPEED = 0.0016; // Cinematic slow orbit speed

  // Total panels displayed simultaneously in orbit around Hammad
  const MAX_ORBIT_COUNT = 8;

  // 8 Anchor Spatial Zones around Hammad:
  // Designed so Hammad's face (top-center) and full body (mid-center) remain 100% CLEAR.
  // Panels live along the left flank, right flank, upper outer corners, and lower floor edges.
  const ORBIT_ANCHORS = [
    // 0: Left Upper Outer Flank
    { baseAngle: 0 * (Math.PI / 4), xPercent: 12, yPercent: 22, z: 20 },
    // 1: Left Mid Flank (Orange rim light halo)
    { baseAngle: 1 * (Math.PI / 4), xPercent: 8,  yPercent: 42, z: -10 },
    // 2: Left Lower Flank
    { baseAngle: 2 * (Math.PI / 4), xPercent: 12, yPercent: 64, z: 30 },
    // 3: Left Floor Edge
    { baseAngle: 3 * (Math.PI / 4), xPercent: 18, yPercent: 82, z: 5 },
    // 4: Right Floor Edge
    { baseAngle: 4 * (Math.PI / 4), xPercent: 74, yPercent: 82, z: 15 },
    // 5: Right Lower Flank
    { baseAngle: 5 * (Math.PI / 4), xPercent: 82, yPercent: 64, z: -20 },
    // 6: Right Mid Flank (Charcoal space)
    { baseAngle: 6 * (Math.PI / 4), xPercent: 84, yPercent: 42, z: 25 },
    // 7: Right Upper Outer Flank
    { baseAngle: 7 * (Math.PI / 4), xPercent: 78, yPercent: 22, z: -5 }
  ];

  // ══════════════════════════════════════════════════════════════
  // 1. INITIALIZE FLOATING GLASS PANELS FIELD
  // ══════════════════════════════════════════════════════════════
  function getFilteredProjects(filter) {
    if (filter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(function (p) { return p.cat === filter; });
  }

  function setupFloatingPanels(filter) {
    if (!panelsField) return;

    // Clear previous panels
    panelsField.innerHTML = '';
    activePanels = [];

    const list = getFilteredProjects(filter);
    const count = Math.min(list.length, MAX_ORBIT_COUNT);

    for (let i = 0; i < count; i++) {
      const p = list[i];
      const anchor = ORBIT_ANCHORS[i % ORBIT_ANCHORS.length];

      const panelEl = document.createElement('div');
      panelEl.className = 'floating-glass-panel';
      panelEl.setAttribute('role', 'button');
      panelEl.setAttribute('tabindex', '0');
      panelEl.setAttribute('aria-label', 'Inspect ' + p.name);

      // Micro stack string
      const stackSnippet = p.tags ? p.tags.slice(0, 2).join(' · ') : '';

      panelEl.innerHTML = [
        '<div class="panel-thumb-wrap">',
        '  <img src="' + p.img + '" alt="' + p.name + '" class="panel-thumb-img" loading="lazy" />',
        '</div>',
        '<div class="panel-details">',
        '  <span class="panel-cat-badge">' + p.badge + '</span>',
        '  <h3 class="panel-title">' + p.name + '</h3>',
        '  <span class="panel-snippet">' + stackSnippet + '</span>',
        '</div>',
        '<div class="panel-arrow-btn" aria-hidden="true">',
        '  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>',
        '</div>'
      ].join('');

      // Click to open inspection modal
      (function (projectItem) {
        panelEl.addEventListener('click', function (e) {
          e.preventDefault();
          openModal(projectItem);
        });

        panelEl.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(projectItem);
          }
        });
      })(p);

      // Pause floating when user hovers to inspect
      panelEl.addEventListener('mouseenter', function () {
        isHoveringPanel = true;
      });

      panelEl.addEventListener('mouseleave', function () {
        isHoveringPanel = false;
      });

      panelsField.appendChild(panelEl);

      activePanels.push({
        el: panelEl,
        data: p,
        anchorIndex: i,
        baseAngle: (i / count) * Math.PI * 2,
        phase: i * 1.35, // harmonic float offset
        floatSpeed: 0.0018 + (i % 3) * 0.0004,
        z: anchor.z
      });
    }

    updatePanelPositions(performance.now());
  }

  // ══════════════════════════════════════════════════════════════
  // 2. ORBIT & FLOATING MOTION ENGINE
  // ══════════════════════════════════════════════════════════════
  function updatePanelPositions(timestamp) {
    if (!stage || activePanels.length === 0) return;

    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;
    const isMobile = stageWidth < 768;

    // Orbit ellipse radius (keeping panels on outer perimeter, safely clearing Hammad)
    // Hammad stands in horizontal center [42% .. 58%]
    const rx = isMobile ? stageWidth * 0.38 : stageWidth * 0.40;
    const ry = isMobile ? stageHeight * 0.34 : stageHeight * 0.36;

    // Center pivot point
    const cx = stageWidth * 0.50;
    const cy = stageHeight * 0.50;

    activePanels.forEach(function (item, index) {
      // Calculate current angular position
      const theta = orbitAngle + item.baseAngle;

      // Elliptical coordinate calculation
      let x = cx + rx * Math.cos(theta);
      let y = cy + ry * Math.sin(theta);

      // ── HAMMAD SILHOUETTE EXCLUSION CORRIDOR ──
      // Central zone: [cx - 150px, cx + 150px], [cy - 220px, cy + 220px]
      // If a panel approaches the center horizontally, repel it outward to the sides
      const corridorHalfWidth = isMobile ? 120 : 160;
      const dxFromCenter = x - cx;

      if (Math.abs(dxFromCenter) < corridorHalfWidth) {
        // Push outward laterally to the left or right flank
        const pushDirection = dxFromCenter >= 0 ? 1 : -1;
        x = cx + pushDirection * corridorHalfWidth + (dxFromCenter * 0.3);
      }

      // Gentle individual floating levitation wave
      const floatY = Math.sin(timestamp * item.floatSpeed + item.phase) * (isMobile ? 6 : 12);
      const floatX = Math.cos(timestamp * item.floatSpeed * 0.7 + item.phase) * (isMobile ? 4 : 8);
      const floatTilt = Math.sin(timestamp * item.floatSpeed * 0.5 + item.phase) * 2.5;

      // Z-depth perspective calculation
      // Items on the front (sin(theta) > 0) have higher z-index and slight scale
      const depthFactor = Math.sin(theta); // -1 (back) to +1 (front)
      const scale = 0.94 + 0.08 * ((depthFactor + 1) / 2); // 0.94 to 1.02
      const zIndex = Math.round(20 + depthFactor * 10);

      // Apply transform and positioning
      const finalX = Math.round(x + floatX);
      const finalY = Math.round(y + floatY);

      item.el.style.left = finalX + 'px';
      item.el.style.top = finalY + 'px';
      item.el.style.transform = 'translate(-50%, -50%) scale(' + scale.toFixed(3) + ') rotate(' + floatTilt.toFixed(2) + 'deg)';
      item.el.style.zIndex = zIndex;
    });
  }

  function animationLoop(timestamp) {
    if (!isPaused && !isHoveringPanel) {
      orbitAngle += ROTATION_SPEED;
      if (orbitAngle > Math.PI * 2) {
        orbitAngle -= Math.PI * 2;
      }
    }

    updatePanelPositions(timestamp);
    animationFrameId = requestAnimationFrame(animationLoop);
  }

  // ══════════════════════════════════════════════════════════════
  // 3. FULL CATALOG GRID RENDERER (All 30 Projects)
  // ══════════════════════════════════════════════════════════════
  function renderCatalogGrid(filter) {
    if (!projectsGrid) return;

    const list = getFilteredProjects(filter);
    projectsGrid.innerHTML = '';

    list.forEach(function (p) {
      const card = document.createElement('article');
      card.className = 'grid-item-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'View ' + p.name);

      const tagsHtml = p.tags
        ? p.tags.map(function (t) { return '<span class="card-tag">' + t + '</span>'; }).join('')
        : '';

      card.innerHTML = [
        '<div class="card-img-wrap">',
        '  <img src="' + p.img + '" alt="' + p.name + '" class="card-img" loading="lazy" />',
        '  <span class="card-overlay-badge">' + p.badge + '</span>',
        '</div>',
        '<div class="card-content">',
        '  <div class="card-title-line">',
        '    <h3 class="card-title">' + p.name + '</h3>',
        '    <div class="card-arrow-icon" aria-hidden="true">',
        '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>',
        '    </div>',
        '  </div>',
        '  <p class="card-desc">' + p.desc + '</p>',
        '  <div class="card-tags">' + tagsHtml + '</div>',
        '</div>'
      ].join('');

      card.addEventListener('click', function () {
        openModal(p);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(p);
        }
      });

      projectsGrid.appendChild(card);
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 4. INSPECTION MODAL CONTROLLER
  // ══════════════════════════════════════════════════════════════
  function openModal(project) {
    if (!modalBackdrop) return;

    modalImg.src = project.img;
    modalImg.alt = project.name;
    modalTag.textContent = project.badge || 'PROJECT';
    modalTitle.textContent = project.name;
    modalDesc.textContent = project.desc;
    modalCta.href = project.url || '#';

    // Populate tags
    if (modalTagsList) {
      modalTagsList.innerHTML = '';
      if (project.tags && project.tags.length) {
        project.tags.forEach(function (t) {
          const chip = document.createElement('span');
          chip.className = 'card-tag';
          chip.textContent = t;
          modalTagsList.appendChild(chip);
        });
      }
    }

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  // ══════════════════════════════════════════════════════════════
  // 5. USER CONTROLS: PAUSE & CATEGORY FILTERS
  // ══════════════════════════════════════════════════════════════
  if (btnPause) {
    btnPause.addEventListener('click', function () {
      isPaused = !isPaused;
      if (isPaused) {
        pauseIcon.textContent = '▶';
        pauseText.textContent = 'Resume';
      } else {
        pauseIcon.textContent = '⏸';
        pauseText.textContent = 'Pause';
      }
    });
  }

  // Spacebar toggle pause
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      if (btnPause && (!modalBackdrop || !modalBackdrop.classList.contains('is-open'))) {
        e.preventDefault();
        btnPause.click();
      }
    }
  });

  // Hero Dock Filter Pills
  filterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');
      currentFilter = filter;

      filterPills.forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');

      // Sync Grid filter bar if present
      gridFilterPills.forEach(function (gp) {
        if (gp.getAttribute('data-grid-filter') === filter) {
          gp.classList.add('active');
        } else {
          gp.classList.remove('active');
        }
      });

      setupFloatingPanels(filter);
      renderCatalogGrid(filter);
    });
  });

  // Catalog Grid Filter Pills
  gridFilterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      const filter = this.getAttribute('data-grid-filter');
      currentFilter = filter;

      gridFilterPills.forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');

      // Sync Dock filter pills
      filterPills.forEach(function (dp) {
        if (dp.getAttribute('data-filter') === filter) {
          dp.classList.add('active');
        } else {
          dp.classList.remove('active');
        }
      });

      setupFloatingPanels(filter);
      renderCatalogGrid(filter);
    });
  });

  // Handle window resize
  let resizeTimeout = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      updatePanelPositions(performance.now());
    }, 60);
  });

  // ══════════════════════════════════════════════════════════════
  // 6. BOOTSTRAP INITIALIZATION
  // ══════════════════════════════════════════════════════════════
  function init() {
    setupFloatingPanels(currentFilter);
    renderCatalogGrid(currentFilter);
    animationFrameId = requestAnimationFrame(animationLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
