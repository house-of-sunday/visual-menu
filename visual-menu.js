// House of Sunday — Visual Menu data + rendering
//
// Menu content is fetched from Sanity at build time (see scripts/build-menu.mjs)
// and written to menu-data.generated.js as `window.MENU_DATA`, loaded before
// this file. MENU_DATA shape: { food: [section], drinks: [section] } where
// section = { key, title: {<locale>: string}, items: [item] } and
// item = { name, desc, tag: {<locale>: string}|null, img: url|null },
// with one key per entry in SUPPORTED_LANGS below.

const MENU = window.MENU_DATA || { food: [], drinks: [] };

// UI labels (tab names, toggle copy, BYO card) come from the
// visualMenuUiLabels singleton via the same generated file; hardcoded
// English if absent. Merged per key (not either/or) so a generated file
// built before a label existed still renders English, never blank.
const DEFAULT_LABELS = {
  foodTab: { en: 'Food' },
  drinksTab: { en: 'Drinks' },
  ingredients: { en: 'Ingredients' },
  itemsCount: { en: 'items' },
  byoTitle: { en: 'Build Your Own\n(with macros)' },
  byoSupport: { en: 'Pick your protein, bases, sides, vegetables and more. Macros, weight and calories on every ingredient. Build your plate in our macro calculator.' },
  byoCta: { en: 'View BYO Menu' },
  reviewTitle: { en: 'Help us with a Review' },
  reviewSupport: { en: "We know it can feel a bit awkward to ask, but your words make a huge difference for a small business like ours. As a thank you we'd love to offer you a coconut hydrate, perfect for staying hydrated in Bali." },
  reviewCta: { en: 'LEAVE A REVIEW' },
};
const LABELS = { ...DEFAULT_LABELS, ...(MENU.labels || {}) };

// Adding a language = add its code here, a pill in index.html, and the
// locale in the schema + build script.
const SUPPORTED_LANGS = ['en', 'zh', 'ru', 'id', 'ja', 'ko'];

// Counters that attach directly to the number: CJK (「4款」,「4品」) and
// Korean ("4가지" — 한글 맞춤법 §43 permits attaching counters to Arabic
// numerals; universal menu convention).
const NO_SPACE_COUNT_LANGS = ['zh', 'ja', 'ko'];

// ----- deep-link parameters (?lang= / ?section=) -----
// Parsed at module load, BEFORE the first render, so a URL-specified language
// is applied to the very first paint rather than flashing the stored/default
// language and re-rendering.
const deepLink = (() => {
  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return { lang: null, section: null };
  }
  const rawLang = (params.get('lang') || '').trim().toLowerCase();
  const rawSection = (params.get('section') || '').trim().toLowerCase();
  return {
    // Only accept languages we actually ship; anything else is ignored so a
    // stale or hand-edited link degrades to normal behaviour.
    lang: SUPPORTED_LANGS.includes(rawLang) ? rawLang : null,
    section: rawSection || null,
  };
})();

// Precedence: ?lang= > English. Every visit starts in English by design —
// a language chosen on a previous visit is deliberately not carried over, so
// the menu presents the same way to everyone arriving fresh. Switching during
// a session is in-memory only and unaffected.
let currentLang = deepLink.lang || 'en';

// Every localized field falls back to English when the translation for the
// current language is still empty (e.g. content migrated, not yet translated).
function pick(field) {
  if (!field) return '';
  return field[currentLang] || field.en;
}

// Count labels: "4 items" (en), "4款" (zh — measure words attach directly,
// no space), "4 позиции" (ru). A label holding pipe-separated plural forms
// (e.g. "позиция|позиции|позиций" = one|few|many) is resolved per count via
// the browser's native plural rules for the current language.
function itemsCountLabel(n) {
  let label = pick(LABELS.itemsCount);
  if (label.includes('|')) {
    const forms = label.split('|');
    const category = new Intl.PluralRules(currentLang).select(n);
    const index = { one: 0, few: 1, many: 2 }[category];
    label = forms[index !== undefined ? index : forms.length - 1] || forms[forms.length - 1];
  }
  const noSpace = NO_SPACE_COUNT_LANGS.includes(currentLang) && LABELS.itemsCount[currentLang];
  return noSpace ? `${n}${label}` : `${n} ${label}`;
}

const SUN_PLACEHOLDER = `
  <div class="item__photo item__photo--placeholder">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 401.36 687.3"><path d="M342.187,336.698c.615-1.416-.564-2.966-2.092-2.742-41.383,6.065-44.903-7.291-81.427-8.774-.359-.015-.626-.358-.629-.717-.382-44.257,45.927-60.012,43.537-105.015-.397-5.486-3.154-17.374-9.41-19.594-1.246-.442-2.502.601-2.398,1.92,3.768,48.019-53.288,61.903-64.738,104.563-.159.593-.944.735-1.271.215-17.959-28.594,5.581-67.981,2.44-98.709-1.472-13.093-8.119-30.393-20.689-36.576-1.167-.574-2.496.454-2.184,1.717,16.344,66.237-35.406,80.535-22.797,134.385.132.565-.443,1.042-.97.798-31.775-14.751-31.36-27.422-36.926-59.334-3.896-14.246-13.404-42.43-29.206-43.623-1.358-.103-2.302,1.36-1.686,2.575,23.702,46.677-4.591,66.81,34.479,117.283.687.888,1.136,1.647,1.395,2.136.172.326.054.737-.261.928-17.605,10.707-41.156-1.897-60.876,2.354-9.032,1.947-19.251,7.7-24.934,16.212-.357.534-1.496,2.349-2.337,4.115-.722,1.517.79,3.132,2.362,2.539,42.387-15.99,51.901,19.075,92.374,14.223.628-.075,1.032.644.628,1.131-11.375,13.719-21.907,26.635-25.412,44.733-5.926,31.001,1.459,49.125-27.662,69.54-1.935,3.492,6.205,2.168,7.922,1.891,57.216-9.733,40.192-63.731,77.468-90.807.287-.208.701-.165.938.098,33.1,36.691-19.089,97.786,33.014,121.708,1.436.659,2.921-.809,2.332-2.274-21.549-53.633,23.363-75.259,9.948-119.845-.191-.636.512-1.161,1.054-.779,5.171,3.642,10.494,7.451,14.93,11.708,25.85,27.251,16.375,57.985,60.762,76.017,5.659,2.299,5.946.907,3.518-3.401-15.029-26.666-14.658-34.971-24.919-68.928-6.311-20.885-16.279-31.127-30.186-43.165-.35-.303-.315-.875.076-1.122,17.876-11.291,34.764-1.336,56.502-6.593,8.98-2.172,19.251-7.7,24.934-16.212.399-.598,1.778-2.799,2.622-4.741Z"/></svg>
  </div>`;

const itemPhoto = (item, name) => item.img
  ? `<div class="item__photo">
      <img loading="lazy" src="${item.img}" alt="${name}" />
    </div>`
  : SUN_PLACEHOLDER;

const itemCard = (item, sectionKey) => {
  const name = pick(item.name);
  const desc = item.desc ? pick(item.desc) : '';
  const tag  = item.tag ? pick(item.tag) : '';
  const safeName = name.replace(/"/g, '&quot;');
  const safeDesc = desc.replace(/"/g, '&quot;');
  const safeTag  = tag.replace(/"/g, '&quot;');
  return `
  <article class="item" data-section="${sectionKey}">
    <button class="item__photo-btn"
            type="button"
            data-name="${safeName}"
            data-desc="${safeDesc}"
            ${item.img ? `data-img="${item.img}"` : ''}
            ${tag ? `data-tag="${safeTag}"` : ''}
            aria-label="Open photo of ${safeName}">
      ${itemPhoto(item, safeName)}
    </button>
    <h3 class="item__name">${name}</h3>
    ${desc ? `<details class="item__details">
      <summary class="item__toggle">
        <span class="item__toggle-label">${pick(LABELS.ingredients)}</span>
        <span class="item__chevron" aria-hidden="true">▾</span>
      </summary>
      <p class="item__desc">${desc}</p>
    </details>` : ''}
    ${tag ? `<div class="item__tag">${tag}</div>` : ''}
  </article>`;
};

function renderPanel(type) {
  const sections = MENU[type];
  const panel = document.getElementById('panel-' + type);
  panel.innerHTML = sections.map(s => `
    <div class="section" id="section-${type}-${s.key}">
      <div class="section-head">
        <h2 class="section-head__title">${pick(s.title)}</h2>
        <div class="section-head__count">${itemsCountLabel(s.items.length)}</div>
      </div>
      <div class="grid">${s.items.map(i => itemCard(i, s.key)).join('')}</div>
    </div>
  `).join('');
}

// Scroll a section clear of the sticky header. Shared by chip clicks and
// deep-linking so both land identically — a native anchor jump (#id) does NOT
// account for the sticky header and leaves the heading hidden underneath it.
function scrollToSection(el, behavior = 'smooth') {
  const headerH = document.querySelector('.head').getBoundingClientRect().height;
  const y = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
  window.scrollTo({ top: y, behavior });
}

function renderChips(type) {
  const sections = MENU[type];
  const chipsEl = document.getElementById('chips');
  chipsEl.innerHTML = sections.map((s, i) =>
    `<button class="chip" data-section="${s.key}" aria-current="${i === 0 ? 'true' : 'false'}">${pick(s.title)}</button>`
  ).join('');

  chipsEl.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => {
      // Swap aria-current on chips, and center the active chip in the row
      chipsEl.querySelectorAll('.chip').forEach(other =>
        other.setAttribute('aria-current', other === c ? 'true' : 'false')
      );
      c.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
      // Jump to the corresponding section
      const el = document.getElementById(`section-${currentTab}-${c.dataset.section}`);
      if (el) scrollToSection(el, 'smooth');
    });
  });
}

function renderTabLabels() {
  document.querySelector('[data-tab="food"]').textContent = pick(LABELS.foodTab);
  document.querySelector('[data-tab="drinks"]').textContent = pick(LABELS.drinksTab);
}

// End-of-menu BYO card (static markup in index.html, rendered once and on
// every language switch). Newlines in byoTitle/byoSupport are real content —
// the elements render with `white-space: pre-line`, so textContent is enough
// and each translation controls its own line breaks.
function renderByoCard() {
  document.getElementById('byoCardTitle').textContent = pick(LABELS.byoTitle);
  document.getElementById('byoCardSupport').textContent = pick(LABELS.byoSupport);
  document.getElementById('byoCardCta').textContent = pick(LABELS.byoCta);
}

// Review-invitation card: same mechanism as the BYO card.
function renderReviewCard() {
  document.getElementById('reviewCardTitle').textContent = pick(LABELS.reviewTitle);
  document.getElementById('reviewCardSupport').textContent = pick(LABELS.reviewSupport);
  document.getElementById('reviewCardCta').textContent = pick(LABELS.reviewCta);
}

function renderLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang))
  );
}

// Keep the document language in sync with the UI language. This matters most
// for CJK: zh and ja share Han-unified codepoints, and system fallback fonts
// pick regional glyph shapes from the document language — with a wrong/static
// lang, Japanese kanji can render with Chinese-styled glyphs (and vice versa).
function syncDocumentLang() {
  document.documentElement.lang = currentLang;
}

function switchLang(lang) {
  if (lang === currentLang || !SUPPORTED_LANGS.includes(lang)) return;
  const previousLang = currentLang;
  currentLang = lang;
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'menu_language_change',
      menu_language: lang,
      previous_language: previousLang
    });
  }
  syncDocumentLang();
  renderLangButtons();
  renderTabLabels();
  renderByoCard();
  renderReviewCard();
  renderPanel('food');
  renderPanel('drinks');
  renderChips(currentTab);
  document.getElementById('panel-food').hidden = currentTab !== 'food';
  document.getElementById('panel-drinks').hidden = currentTab !== 'drinks';
  setupScrollSpy();
}

let currentTab = 'food';

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t =>
    t.setAttribute('aria-selected', t.dataset.tab === tab ? 'true' : 'false')
  );
  document.getElementById('panel-food').hidden = tab !== 'food';
  document.getElementById('panel-drinks').hidden = tab !== 'drinks';
  renderChips(tab);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

// ----- deep-link target resolution -----
// ?section= accepts either a tab name ("food" / "drinks") or an individual
// section key ("coffee", "lunch", ...). Section keys are language-independent
// (they come from Sanity), so a link keeps working in every language.
// Unknown values resolve to null and are ignored — the page just loads normally.
function resolveSectionTarget(value) {
  if (!value) return null;
  if (value === 'food' || value === 'drinks') return { tab: value, sectionKey: null };
  for (const tab of ['food', 'drinks']) {
    if ((MENU[tab] || []).some(s => s.key === value)) return { tab, sectionKey: value };
  }
  return null;
}

// Applied once, at the end of init(), so panels are already rendered and the
// scroll-spy observer exists. Scrolls instantly rather than smoothly: this is
// a page load, not a user gesture — a scroll animation on arrival reads as a
// glitch and can be interrupted by the visitor's own scrolling.
function applyDeepLinkSection() {
  const target = resolveSectionTarget(deepLink.section);
  if (!target) return;

  // Requirement: never try to scroll to a panel the tab system has hidden.
  if (target.tab !== currentTab) switchTab(target.tab);

  if (!target.sectionKey) return; // tab-level link: switchTab already put us at the top

  let landedAt = null;
  const scrollToTarget = () => {
    const el = document.getElementById(`section-${target.tab}-${target.sectionKey}`);
    if (!el) return;
    scrollToSection(el, 'auto');
    landedAt = Math.round(window.scrollY);
    // Highlight the matching chip immediately rather than waiting for the
    // observer to catch up after the jump.
    document.querySelectorAll('#chips .chip').forEach(c =>
      c.setAttribute('aria-current', String(c.dataset.section === target.sectionKey))
    );
  };

  // Scroll synchronously. Panels are rendered by this point, and the photo
  // boxes reserve their height via CSS aspect-ratio, so layout is already
  // final — no need to wait.
  //
  // Deliberately NOT requestAnimationFrame: rAF does not fire while a page is
  // hidden (opened in a background tab, or prerendered by the browser), which
  // would silently break exactly the shared/marketing links this exists for.
  scrollToTarget();

  // Safety net for late layout shifts (a slow font, an unsized asset) — but
  // only re-assert if the visitor hasn't scrolled away themselves, so we
  // never yank the page out from under someone.
  window.addEventListener('load', () => {
    if (landedAt !== null && Math.abs(window.scrollY - landedAt) < 4) scrollToTarget();
  }, { once: true });
}

// ----- chip auto-highlight on scroll -----
// The active-section band is derived from the real header height so it always
// contains the position chip-clicks scroll to (headerH + 8). Hardcoded
// percentage margins broke when the header grew (language toggle): the click
// landing ended up below the band on short viewports, so the observer's final
// event re-highlighted the previous section.
let scrollSpyObserver = null;

function setupScrollSpy() {
  if (scrollSpyObserver) scrollSpyObserver.disconnect();
  const headerH = Math.round(document.querySelector('.head').getBoundingClientRect().height);
  const bandHeight = Math.round(window.innerHeight * 0.25);
  const bottomMargin = Math.max(0, window.innerHeight - headerH - bandHeight);
  scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id; // section-food-breakfast
        const parts = id.split('-');
        const sectionKey = parts.slice(2).join('-');
        document.querySelectorAll('#chips .chip').forEach(c =>
          c.setAttribute('aria-current', c.dataset.section === sectionKey ? 'true' : 'false')
        );
      }
    });
  }, { rootMargin: `-${headerH}px 0px -${bottomMargin}px 0px`, threshold: 0 });

  document.querySelectorAll('.section').forEach(s => scrollSpyObserver.observe(s));
}

// Pixel-based rootMargin doesn't self-adjust like percentages did, so rebuild
// the observer when the viewport changes (rotation, window resize).
let scrollSpyResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(scrollSpyResizeTimer);
  scrollSpyResizeTimer = setTimeout(setupScrollSpy, 200);
});

// ----- lightbox -----
let lbReturnFocus = null;

function openLightbox(card) {
  if (!card.dataset.img) return; // no photo yet — nothing to zoom into
  const lb = document.getElementById('lb');
  document.getElementById('lbImg').src  = card.dataset.img;
  document.getElementById('lbImg').alt  = card.dataset.name;
  document.getElementById('lbName').textContent = card.dataset.name;
  document.getElementById('lbDesc').textContent = card.dataset.desc;
  const tagEl = document.getElementById('lbTag');
  if (card.dataset.tag) { tagEl.textContent = card.dataset.tag; tagEl.hidden = false; }
  else { tagEl.hidden = true; }
  lbReturnFocus = (document.activeElement && document.activeElement !== document.body)
    ? document.activeElement
    : card;
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lbClose').focus();
}
function closeLightbox() {
  const lb = document.getElementById('lb');
  if (!lb.classList.contains('is-open')) return;
  const returnTo = lbReturnFocus;
  lbReturnFocus = null;
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (returnTo && typeof returnTo.focus === 'function') {
    requestAnimationFrame(() => returnTo.focus({ preventScroll: true }));
  }
}

// ----- init -----
function init() {
  // Render both panels (we just hide the inactive one)
  renderTabLabels();
  renderByoCard();
  renderReviewCard();
  renderPanel('food');
  renderPanel('drinks');
  renderChips('food');

  // Language toggle reflects the starting language (?lang= or English)
  syncDocumentLang();
  renderLangButtons();
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => switchLang(b.dataset.lang));
  });

  // Tabs: swap aria-selected and switch panels
  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => switchTab(t.dataset.tab));
  });

  // Photo taps → lightbox (event delegation). The ingredients <details>
  // toggle is native, so we only bind the photo button here.
  document.querySelectorAll('.panel').forEach(panel => {
    panel.addEventListener('click', (e) => {
      const photoBtn = e.target.closest('.item__photo-btn');
      if (photoBtn) openLightbox(photoBtn);
    });
  });

  // BYO card outbound click. Same dataLayer pattern as menu_language_change;
  // the link opens in a new tab, so the push is never raced by navigation.
  // The GTM trigger + GA4 tag for this event live in the container, not here.
  document.getElementById('byoCard').addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'byo_link_click',
      menu_language: currentLang
    });
  });
  document.getElementById('reviewCard').addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'review_link_click',
      menu_language: currentLang
    });
  });

  // Lightbox
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lb').addEventListener('click', (e) => {
    if (e.target.id === 'lb') closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  setupScrollSpy();

  // Last: panels are rendered, tabs are wired, the observer is live.
  applyDeepLinkSection();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
