// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Net-trace fill reflects scroll progress down the page
const netFill = document.getElementById('netFill');
function updateNetFill() {
  if (!netFill) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  netFill.style.height = Math.min(100, Math.max(0, progress)) + '%';
}
window.addEventListener('scroll', updateNetFill, { passive: true });
window.addEventListener('resize', updateNetFill);
updateNetFill();

// Scroll reveal for sections
const revealTargets = document.querySelectorAll(
  '.section-label, .section-body, .bom, .board-card, .timeline-item, .connector-pin'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// =============================================================
// Project detail page: fetch and render a project's markdown file
// =============================================================
const pBody = document.getElementById('pBody');

if (pBody) {
  loadProject();
}

async function loadProject() {
  const slug = new URLSearchParams(window.location.search).get('p');

  if (!slug) {
    showProjectError('No project specified.');
    return;
  }

  // Guard against a path-traversal or unexpected slug value.
  const safeSlug = /^[a-z0-9-]+$/i.test(slug) ? slug : null;
  if (!safeSlug) {
    showProjectError('That project link looks malformed.');
    return;
  }

  try {
    const projectUrl = new URL(`./projects/${safeSlug}.md`, window.location.href).href;
    console.log('Loading project markdown from:', projectUrl);
    const res = await fetch(projectUrl);
    if (!res.ok) {
      console.error('Project fetch failed', res.status, res.statusText, projectUrl);
      showProjectError(`Couldn't load that project (HTTP ${res.status}). URL: ${projectUrl}`);
      return;
    }
    const raw = await res.text();
    const { meta, body } = parseFrontmatter(raw);
    renderProject(meta, body);
  } catch (err) {
    console.error('Error loading project:', err);
    showProjectError(`Couldn't load that project: ${err.message}`);
  }
}

// Parses simple "---\nkey: value\n---" frontmatter at the top of a markdown file.
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) meta[key] = value;
  });

  return { meta, body: raw.slice(match[0].length) };
}

function renderProject(meta, body) {
  document.title = `${meta.title || 'Projekt'} —  Mikkel Hulstrøm`;

  const tagEl = document.getElementById('pTag');
  const metaParts = [meta.category, meta.rev, meta.date].filter(Boolean);
  if (tagEl) tagEl.textContent = metaParts.join(' · ') || 'PROJECT';

  const titleEl = document.getElementById('pTitle');
  if (titleEl) titleEl.textContent = meta.title || 'Untitled project';

  const summaryEl = document.getElementById('pSummary');
  if (summaryEl) summaryEl.textContent = meta.summary || '';

  const tagsEl = document.getElementById('pTags');
  if (tagsEl && meta.tags) {
    tagsEl.innerHTML = '';
    meta.tags.split(',').forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t.trim();
      tagsEl.appendChild(li);
    });
  }

  const actionsEl = document.getElementById('pActions');
  if (actionsEl && meta.repo) {
    const a = document.createElement('a');
    a.href = meta.repo;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'btn btn-outline';
    a.textContent = 'View repository';
    actionsEl.appendChild(a);
  }

  if (pBody) {
    if (window.marked) {
      pBody.innerHTML = marked.parse(body);
    } else {
      // Fallback if the markdown library failed to load (e.g. offline).
      const pre = document.createElement('pre');
      pre.textContent = body;
      pBody.innerHTML = '';
      pBody.appendChild(pre);
    }
  }
}

function showProjectError(message) {
  const titleEl = document.getElementById('pTitle');
  if (titleEl) titleEl.textContent = 'Project not found';
  if (pBody) pBody.innerHTML = `<p class="muted-loading">${message}</p>`;
}
