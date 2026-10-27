/**
 * ============================================================================
 * ABHAY SRIVASTAVA — PORTFOLIO SCRIPT v3.0
 * Features: Three.js BG · 3D Parallax Scroll · Photo Upload · Card Tilt
 *           Theme Toggle · Skill Category Tabs · Dynamic Skill Manager
 *           Scroll Reveal · Progress Bar · Copy Email · Form Validation
 *           Resume Modal · Typewriter · Toast System
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────────────────────────
  // 1.  Three.js Animated Particle Background
  // ─────────────────────────────────────────────────────────────────────────
  (function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Particles
    const COUNT = 320;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x4f8ef7, size: 0.055, transparent: true, opacity: 0.4, sizeAttenuation: true
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Glowing orbs
    [[0x4f8ef7, 3], [0x9b5de5, -2], [0xf72585, 1]].forEach(([color, x]) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 12, 12),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 })
      );
      m.position.set(x, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2);
      m.userData = { ox: m.position.x, oy: m.position.y, sp: 0.4 + Math.random() * 0.4 };
      scene.add(m);
    });

    let mx = 0, my = 0, t = 0;
    window.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    (function animate() {
      requestAnimationFrame(animate);
      t += 0.004;
      particles.rotation.x += (my * 0.015 - particles.rotation.x) * 0.06;
      particles.rotation.y += (mx * 0.015 - particles.rotation.y) * 0.06;
      particles.rotation.z = Math.sin(t * 0.3) * 0.02;
      scene.children.forEach(obj => {
        if (obj.userData.sp) {
          obj.position.y = obj.userData.oy + Math.sin(t * obj.userData.sp) * 0.5;
          obj.position.x = obj.userData.ox + Math.cos(t * obj.userData.sp * 0.7) * 0.3;
        }
      });
      renderer.render(scene, camera);
    })();
  })();

  // ─────────────────────────────────────────────────────────────────────────
  // 2.  Parallax Scroll — 3D Depth Feel on Scroll
  // ─────────────────────────────────────────────────────────────────────────
  const prlHeroName = document.getElementById('prl-hero-name');
  const prlHeroDesc = document.getElementById('prl-hero-desc');
  const prlHeroContent = document.getElementById('prl-hero-content');
  const prlHeroVisual = document.getElementById('prl-hero-visual');
  const prlRing1 = document.getElementById('prl-ring1');
  const prlRing2 = document.getElementById('prl-ring2');
  const prlRing3 = document.getElementById('prl-ring3');
  const prlBlob1 = document.getElementById('prl-blob1');
  const prlBlob2 = document.getElementById('prl-blob2');
  const layerStars = document.getElementById('layer-stars');
  const layerGrid = document.getElementById('layer-grid');
  const scrollProgress = document.getElementById('scroll-progress');

  function updateParallax() {
    const y = window.scrollY;
    const docH = document.body.scrollHeight - window.innerHeight;
    const pct = (y / docH) * 100;

    // Scroll progress bar
    if (scrollProgress) scrollProgress.style.width = `${pct}%`;

    // Stars and grid — slowest drift (true parallax bg)
    if (layerStars) layerStars.style.transform = `translateY(${y * 0.08}px)`;
    if (layerGrid) layerGrid.style.transform = `translateY(${y * 0.05}px)`;

    // Depth rings — slow spin + vertical drift
    if (prlRing1) prlRing1.style.transform = `translate(-50%,-50%) rotate(${y * 0.04}deg) translateY(${y * 0.06}px)`;
    if (prlRing2) prlRing2.style.transform = `translate(-50%,-50%) rotate(${-y * 0.025}deg) translateY(${y * 0.04}px)`;
    if (prlRing3) prlRing3.style.transform = `translate(-50%,-50%) rotate(${y * 0.015}deg) translateY(${y * 0.02}px)`;

    // Blobs drift
    if (prlBlob1) prlBlob1.style.transform = `translateY(${y * 0.12}px) scale(${1 + y * 0.0002})`;
    if (prlBlob2) prlBlob2.style.transform = `translateY(${-y * 0.08}px)`;

    // Hero text — fastest (falls away quickest = strongest depth)
    if (prlHeroName) prlHeroName.style.transform = `translateY(${y * 0.28}px)`;
    if (prlHeroDesc) prlHeroDesc.style.transform = `translateY(${y * 0.18}px)`;
    if (prlHeroContent) prlHeroContent.style.opacity = Math.max(0, 1 - y / 420);

    // Hero visual — medium speed
    if (prlHeroVisual) {
      prlHeroVisual.style.transform = `translateY(${y * 0.12}px)`;
      prlHeroVisual.style.opacity = Math.max(0, 1 - y / 520);
    }
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax(); // init

  // ─────────────────────────────────────────────────────────────────────────
  // 3.  Scroll Reveal — fade+slide sections into view
  // ─────────────────────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-card');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  // ─────────────────────────────────────────────────────────────────────────
  // 4.  3D Card Tilt Effect
  // ─────────────────────────────────────────────────────────────────────────
  function bindTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        card.style.transform = `translateY(-6px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  bindTilt('.skill-3d-card');
  bindTilt('.project-3d-card');
  bindTilt('.info-3d-card');

  // Re-bind tilt when new skill cards are added
  function bindTiltSingle(card) {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card.style.transform = `translateY(-6px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  }

  // 3D Profile Card tilt on mouse
  const profileCard = document.querySelector('.profile-card-inner');
  if (profileCard) {
    profileCard.addEventListener('mousemove', e => {
      const r = profileCard.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      profileCard.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg) scale(1.02)`;
    });
    profileCard.addEventListener('mouseleave', () => profileCard.style.transform = '');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5.  Photo Upload / Change
  // ─────────────────────────────────────────────────────────────────────────
  const photoOverlay = document.getElementById('photo-change-overlay');
  const photoInput = document.getElementById('photo-upload-input');
  const profileImg = document.getElementById('profile-img');

  // Load saved photo from localStorage
  const savedPhoto = localStorage.getItem('as-profile-photo');
  if (savedPhoto && profileImg) profileImg.src = savedPhoto;

  if (photoOverlay && photoInput) {
    photoOverlay.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target.result;
        if (profileImg) profileImg.src = dataUrl;
        // Try saving — may fail if image is very large
        try { localStorage.setItem('as-profile-photo', dataUrl); } catch (_) { }
        showToast('Profile photo updated! 📸', 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6.  Theme Toggle
  // ─────────────────────────────────────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  root.setAttribute('data-theme', localStorage.getItem('as-theme') || 'dark');

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('as-theme', next);
    showToast(`${next === 'dark' ? '🌙 Dark' : '☀️ Light'} mode`, 'info');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 7.  Mobile Navigation
  // ─────────────────────────────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  hamburger?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      navMenu?.classList.remove('open');
      hamburger?.classList.remove('active');
    });
  });

  document.addEventListener('click', e => {
    if (navMenu?.classList.contains('open') && !navMenu.contains(e.target) && !hamburger?.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger?.classList.remove('active');
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 8.  Scroll Spy + Sticky Header
  // ─────────────────────────────────────────────────────────────────────────
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 60);

    sections.forEach(sec => {
      const top = sec.offsetTop - 130;
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', y >= top && y < top + sec.offsetHeight);
    });

    if (backToTop) backToTop.style.opacity = y > 500 ? '1' : '0';
  }, { passive: true });

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ─────────────────────────────────────────────────────────────────────────
  // 9.  Typewriter
  // ─────────────────────────────────────────────────────────────────────────
  const roles = [
    'Frontend Developer',
    'HTML & CSS Craftsman',
    'JavaScript Enthusiast',
    'Docker Explorer',
    'Codomax Intern',
    'Web Artisan',
    'UI Builder'
  ];
  const tw = document.getElementById('typewriter-text');
  let ri = 0, ci = 0, del = false;

  function type() {
    if (!tw) return;
    const cur = roles[ri];
    tw.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    if (!del && ci === cur.length) { del = true; setTimeout(type, 1800); return; }
    if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 380); return; }
    setTimeout(type, del ? 40 : 78);
  }
  setTimeout(type, 700);

  // ─────────────────────────────────────────────────────────────────────────
  // 10. Skill Category Tabs
  // ─────────────────────────────────────────────────────────────────────────
  const catTabs = document.querySelectorAll('.skill-cat-tab');
  const catPanels = document.querySelectorAll('.skill-tab-panel');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      catTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      catPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(`tab-${target}`)?.classList.add('active');

      // Re-animate bars in newly visible tab
      setTimeout(animateBars, 60);
      // Re-bind reveal
      checkEmptyState(target);
    });
  });

  function checkEmptyState(cat) {
    const grid = document.getElementById(`skills-grid-${cat}`);
    const empty = document.getElementById(`empty-${cat}`);
    if (!grid || !empty) return;
    const hasCards = grid.querySelectorAll('.skill-3d-card').length > 0;
    grid.style.display = hasCards ? '' : 'none';
    empty.style.display = hasCards ? 'none' : '';
  }

  ['frontend', 'backend', 'framework'].forEach(checkEmptyState);

  // ─────────────────────────────────────────────────────────────────────────
  // 11. Animated Skill Bars
  // ─────────────────────────────────────────────────────────────────────────
  function animateBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.style.getPropertyValue('--fill');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.2 });
      bars.forEach(b => { if (!b.classList.contains('animated')) obs.observe(b); });
    } else {
      bars.forEach(b => b.style.width = b.style.getPropertyValue('--fill'));
    }
  }
  animateBars();

  // ─────────────────────────────────────────────────────────────────────────
  // 12. Dynamic Skill Manager (Add / Delete + localStorage)
  // ─────────────────────────────────────────────────────────────────────────
  const SKILLS_KEY = 'as-custom-skills-v2';

  const levelBadge = { beginner: 'badge-beginner', learning: 'badge-learning', proficient: 'badge-proficient', advanced: 'badge-advanced', expert: 'badge-expert' };
  const levelFill = { beginner: '22%', learning: '45%', proficient: '70%', advanced: '88%', expert: '96%' };

  // Skill icon map
  function skillIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('react')) return `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM12 0C5.37 0 0 2.69 0 6s5.37 6 12 6 12-2.69 12-6-5.37-6-12-6zm0 10c-5.33 0-10-2.24-10-5s4.67-5 10-5 10 2.24 10 5-4.67 5-10 5zM0 12c0 3.31 5.37 6 12 6s12-2.69 12-6v-1.3c-2.41 1.44-6.74 2.3-12 2.3S2.41 12.14 0 10.7V12z"/></svg>`;
    if (n.includes('node')) return `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l9.5 5.5v11L12 24.5 2.5 19v-11L12 2.5zm0 2.2L4.5 9.1v9.8l7.5 4.3 7.5-4.3V9.1L12 4.7z"/></svg>`;
    if (n.includes('git')) return `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2.6 10.59L10.6 2.6c.8-.8 2.08-.8 2.87 0l1.89 1.89-2.4 2.4c-.58-.2-1.28-.07-1.75.4-.48.48-.6 1.18-.39 1.76L8.43 11.44c-.58-.21-1.28-.09-1.76.39-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0 .5-.5.61-1.22.37-1.81l2.36-2.36c.59.24 1.31.13 1.81-.37.58-.58.7-1.39.37-2.02l2.35-2.35 4.64 4.64c.8.8.8 2.08 0 2.87L15.4 21.4c-.8.8-2.08.8-2.87 0L2.6 13.46c-.8-.79-.8-2.08 0-2.87z"/></svg>`;
    return `<span style="font-size:1.4rem; line-height:1;">🛠</span>`;
  }

  function renderSkillCard(skill) {
    const { id, name, level, color, note, category } = skill;
    if (document.querySelector(`[data-skill-id="${id}"]`)) return;

    const grid = document.getElementById(`skills-grid-${category}`);
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'skill-3d-card reveal-card';
    card.setAttribute('data-skill-id', id);
    card.setAttribute('data-category', category);

    const badgeClass = levelBadge[level] || 'badge-learning';
    const fill = levelFill[level] || '50%';
    const displayNote = note || `Keep learning ${name}!`;

    card.innerHTML = `
      <div class="skill-card-glow" style="--glow-color:${color};"></div>
      <div class="skill-card-face">
        <div class="skill-hexagon" style="--hex-color:${color};">${skillIcon(name)}</div>
        <h3 class="skill-name">${escapeHTML(name)}</h3>
        <span class="skill-badge ${badgeClass}">${capitalize(level)}</span>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="--fill:${fill};"></div></div>
        <p class="skill-note">${escapeHTML(displayNote)}</p>
      </div>
      <button class="skill-delete-btn" data-id="${id}" title="Remove ${name}" aria-label="Remove ${name}">✕</button>
    `;

    grid.appendChild(card);

    // Animate bar
    setTimeout(() => {
      const bar = card.querySelector('.skill-bar-fill');
      if (bar) bar.style.width = fill;
    }, 120);

    // Reveal animation
    setTimeout(() => card.classList.add('visible'), 50);

    // Tilt
    bindTiltSingle(card);

    // Delete handler
    card.querySelector('.skill-delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      deleteSkill(id, category, card);
    });

    checkEmptyState(category);
  }

  function loadSavedSkills() {
    const saved = JSON.parse(localStorage.getItem(SKILLS_KEY) || '[]');
    saved.forEach(renderSkillCard);
    setTimeout(animateBars, 200);
  }

  function saveSkill(skill) {
    const saved = JSON.parse(localStorage.getItem(SKILLS_KEY) || '[]');
    saved.push(skill);
    localStorage.setItem(SKILLS_KEY, JSON.stringify(saved));
  }

  function deleteSkill(id, category, cardEl) {
    const saved = JSON.parse(localStorage.getItem(SKILLS_KEY) || '[]');
    localStorage.setItem(SKILLS_KEY, JSON.stringify(saved.filter(s => s.id !== id)));

    cardEl.style.transition = 'all 0.3s ease';
    cardEl.style.opacity = '0';
    cardEl.style.transform = 'scale(0.85) translateY(10px)';
    setTimeout(() => {
      cardEl.remove();
      checkEmptyState(category);
    }, 300);
    showToast('Skill removed! 🗑️', 'info');
  }

  // Attach delete on built-in HTML cards
  document.querySelectorAll('.skill-delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.skill-3d-card');
      if (!card) return;
      const cat = card.getAttribute('data-category') || 'frontend';
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.85) translateY(10px)';
      setTimeout(() => { card.remove(); checkEmptyState(cat); }, 300);
      showToast('Skill removed!', 'info');
    });
  });

  loadSavedSkills();

  // ── Add Skill Panel Toggle ──
  const toggleBtn = document.getElementById('toggle-add-skill');
  const addPanel = document.getElementById('add-skill-panel');
  const cancelBtn = document.getElementById('cancel-add-skill');

  const openPanel = () => { addPanel?.classList.add('open'); addPanel?.setAttribute('aria-hidden', 'false'); toggleBtn?.setAttribute('aria-expanded', 'true'); };
  const closePanel = () => { addPanel?.classList.remove('open'); addPanel?.setAttribute('aria-hidden', 'true'); toggleBtn?.setAttribute('aria-expanded', 'false'); };

  toggleBtn?.addEventListener('click', () => addPanel?.classList.contains('open') ? closePanel() : openPanel());
  cancelBtn?.addEventListener('click', () => { closePanel(); document.getElementById('add-skill-form')?.reset(); });

  // Color swatches
  document.querySelectorAll('.cp').forEach(sw => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('.cp').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      const inp = document.getElementById('skill-color-input');
      if (inp) inp.value = sw.getAttribute('data-color');
    });
  });

  // Form submit
  document.getElementById('add-skill-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('skill-name-input')?.value.trim();
    const category = document.getElementById('skill-cat-input')?.value;
    const level = document.getElementById('skill-level-input')?.value;
    const color = document.getElementById('skill-color-input')?.value || '#8b5cf6';
    const note = document.getElementById('skill-note-input')?.value.trim();

    if (!name) { showToast('Please enter a skill name.', 'error'); return; }
    if (!category) { showToast('Please select a category.', 'error'); return; }
    if (!level) { showToast('Please select a proficiency level.', 'error'); return; }

    const skill = { id: `custom-${Date.now()}`, name, category, level, color, note };
    saveSkill(skill);
    renderSkillCard(skill);

    // Switch to the correct tab
    catTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    catPanels.forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-tab="${category}"]`)?.classList.add('active');
    document.getElementById(`tab-${category}`)?.classList.add('active');

    document.getElementById('add-skill-form').reset();
    closePanel();
    showToast(`"${name}" added to ${category}! 🎉`, 'success');
    setTimeout(animateBars, 200);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 13. Copy Email
  // ─────────────────────────────────────────────────────────────────────────
  const copyBtn = document.getElementById('copy-email-btn');
  const emailEl = document.getElementById('email-address');

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(emailEl?.textContent.trim() || '')
      .then(() => {
        copyBtn.classList.add('copied');
        showToast('Email copied! 📋', 'success');
        setTimeout(() => copyBtn.classList.remove('copied'), 2500);
      })
      .catch(() => showToast('Copy failed — please copy manually.', 'error'));
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 14. Contact Form
  // ─────────────────────────────────────────────────────────────────────────
  const msgInput = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const submitBtn = document.getElementById('submit-btn');

  msgInput?.addEventListener('input', () => {
    const c = msgInput.value.length;
    if (charCount) charCount.textContent = `${c} / 500`;
    if (charCount) charCount.style.color = c > 500 ? 'var(--neon-pink)' : '';
  });

  ['name', 'email', 'message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      document.getElementById(id)?.closest('.form-group')?.classList.remove('has-error');
    });
  });

  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const ok = [
      [name, !name.value.trim() || name.value.trim().length < 2],
      [email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())],
      [message, message.value.trim().length < 10]
    ].every(([el, bad]) => { el.closest('.form-group')?.classList.toggle('has-error', bad); return !bad; });

    if (!ok) { showToast('Please fix the errors above.', 'error'); return; }

    submitBtn?.classList.add('loading');
    submitBtn && (submitBtn.disabled = true);

    setTimeout(() => {
      submitBtn?.classList.remove('loading');
      submitBtn && (submitBtn.disabled = false);
      document.getElementById('contact-form').reset();
      if (charCount) charCount.textContent = '0 / 500';
      showToast('Message sent! 🚀 I\'ll reply within 24h.', 'success', 4500);
    }, 1400);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 15. Resume Modal
  // ─────────────────────────────────────────────────────────────────────────
  const modal = document.getElementById('resume-modal');
  const openM = () => { modal?.classList.add('active'); modal?.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
  const closeM = () => { modal?.classList.remove('active'); modal?.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };

  ['open-resume-btn', 'hero-resume-btn'].forEach(id => document.getElementById(id)?.addEventListener('click', openM));
  document.getElementById('close-resume-btn')?.addEventListener('click', closeM);
  modal?.addEventListener('click', e => { if (e.target === modal) closeM(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.classList.contains('active')) closeM(); });

  // ─────────────────────────────────────────────────────────────────────────
  // 16. Project Demo Buttons
  // ─────────────────────────────────────────────────────────────────────────
  document.querySelectorAll('.project-demo-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast(`Opening ${btn.dataset.project} demo... 🌐`, 'info'));
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 17. Toast Notification System
  // ─────────────────────────────────────────────────────────────────────────
  function showToast(msg, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: '✅', info: 'ℹ️', error: '❌' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s forwards ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────────────────
  function escapeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

});
