// House of Sunday — Visual Menu data + rendering

const MENU = {
  food: [
    {
      key: 'specials', title: 'Specials',
      items: [
        { name: 'Beef Comfort Bowl',           img: 'beef-comfort-bowl.png',
          desc: 'Minced beef, basmati rice, pinto beans, kale, fried egg, hand-cut fries, umami sauce' },
        { name: 'Herb Butter Snapper Bowl',    img: 'herb-butter-snapper-bowl.png',
          desc: 'Red snapper, mashed sweet potato, mixed veggies, aromatic herb butter, orange chimichurri' },
        { name: 'Beef Scrambled Wrap',         img: 'beef-scrambled-wrap.png',
          desc: 'Minced beef, scrambled eggs, capsicum, caramelized onions, cherry tomatoes, umami sauce' },
        { name: 'Cheesy Waffle',               img: 'cheesy-waffle.png',
          desc: 'Parmesan cheese waffle, avocado, boiled egg' },
      ]
    },
    {
      key: 'breakfast', title: 'Breakfast',
      items: [
        { name: 'Breakfast Melt Wrap',     img: 'breakfast-melt-wrap.png',
          desc: 'Two scrambled eggs, bacon, mozzarella cheese, pico de gallo, tomato relish' },
        { name: 'Farm Omelette',           img: 'farm-omelette.png',
          desc: 'Mushroom, spinach, tomato, garlic, tomato relish, smashed avocado' },
        { name: 'Savory Ricotta Hotcakes', img: 'savory-ricotta-hotcakes.png',
          desc: 'With your choice of egg, crispy bacon, honey' },
        { name: 'Egg & Bacon Waffle',      img: 'eggs-bacon-waffle.png',
          desc: 'Plantain protein waffle, boiled egg, bacon, sliced avocado' },
        { name: 'Avocado Almond Toast',    img: 'avocado-almond-toast.png',
          desc: 'Sourdough, poached eggs, avocado, roasted tomato, watercress, arugula vinaigrette, chili flakes, almonds, sesame seeds' },
        { name: 'Açaí Bowl',               img: 'acai-bowl.png',
          desc: 'Açaí blended with banana, hazelnut granola, mango, coconut flakes' },
        { name: 'Berry Ricotta Hotcakes',  img: 'berry-ricota-hotcakes.png',
          desc: 'With vanilla whipped cream, berry compote, strawberries, coconut flakes, honey' },
        { name: 'Strawberry Protein Waffle', img: 'strawberry-protein-waffle.png',
          desc: 'Plantain protein waffle, berry compote, greek yoghurt, strawberries, pistachio crumble, honey' },
        { name: 'Apple Hazelnut Yoghurt',  img: 'apple-hazelnut-yoghurt.png',
          desc: 'Protein-rich Greek yoghurt, apple, strawberries, tamarillo, hazelnut granola, berry compote' },
      ]
    },
    {
      key: 'lunch', title: 'Lunch',
      items: [
        { name: 'Wagyu Brazilian Lunch',         img: 'brazilian-steak-lunch.png',
          desc: 'Wagyu rump or chicken thigh/breast, basmati rice, pinto beans, farofa, french fries, fried egg' },
        { name: 'Wagyu Steak Stroganoff',        img: 'steak-crispy-garlic-rice.png',
          desc: 'Wagyu rump or chicken thigh/breast, red stroganoff sauce, mushrooms, rice, shoestring fries' },
        { name: 'Steak & Crispy Garlic Rice',    img: 'steak-stroganoff.png',
          desc: 'Wagyu rump steak, basmati rice, aromatic herb butter, chives, crispy garlic, umami sauce' },
        { name: 'Brazilian Curry',               img: 'brazilian-curry.png',
          desc: 'Chicken thigh/breast or red snapper and prawn, coconut curry, basmati rice, farofa' },
        { name: 'Chicken Rice',                  img: 'chicken-rice.png',
          desc: 'Basmati rice cooked in chicken broth, snowpeas, tomato, mushroom, bacon, chicken thigh' },
        { name: 'Chicken Sweet Mash',            img: 'chicken-sweet-mash.png',
          desc: 'Chicken thigh, mashed sweet potato, arugula, orange chimichurri, olive oil' },
        { name: 'Grilled Chicken Wrap',          img: 'chicken-wrap.png',
          desc: 'Chicken thigh/breast, iceberg lettuce, capsicum, cucumber, tomato, pesto sauce' },
        { name: 'Brazilian Feijoada',            img: 'feijoada.png',
          desc: 'Black bean pork stew, basmati rice, sautéed kale, sourdough farofa, homemade vinaigrette',
          tag:  'Only on Saturdays' },
      ]
    },
    {
      key: 'sweets', title: 'Sweets',
      items: [
        { name: 'Cheesecake Brûlée',           img: 'cheesecake-brulee.png',     desc: 'With pistachio crumble' },
        { name: 'Flourless Chocolate Cake',    img: 'flourless-chocolate-cake.png', desc: 'With vanilla whipped cream' },
      ]
    },
  ],
  drinks: [
    {
      key: 'coffee', title: 'Coffee',
      items: [
        { name: 'Black',                       img: 'long-black.png' },
        { name: 'White',                       img: 'capuccinno.png' },
        { name: 'Burnt Caramel Latte',         img: 'burnt-caramel-latte.png',
          desc: 'Burnt caramel, milk, honeycomb, espresso' },
        { name: 'Toasted Chocolate Mocha',     img: 'toasted-chocolate-mocha.png',
          desc: 'Cacao powder and husk, milk, honey, chocolate rice puff, espresso' },
        { name: 'Salted Honey Foam Cold Drip', img: 'honey-foam-cold-drip.png',
          desc: 'Salted honey foam, orange zest, nutmeg, cold drip' },
      ]
    },
    {
      key: 'matcha', title: 'Matcha',
      items: [
        { name: 'Ceremonial Matcha Latte',     img: 'ceremonial-matcha-latte.png',
          desc: 'Whisked ceremonial-grade matcha, milk' },
        { name: 'Strawberry Iced Matcha',      img: 'strawberry-iced-matcha.png',
          desc: 'Matcha, strawberry jam, milk' },
        { name: 'Matcha Cloud',                img: 'matcha-cloud.png',
          desc: 'Matcha, coconut water, coconut cream' },
      ]
    },
    {
      key: 'hydrate', title: 'Hydrate',
      items: [
        { name: 'Green Hydrate',               img: 'cucumber-cooler.png',
          desc: 'Cucumber, mint, honey, lime, salt' },
        { name: 'Watermelon Hydrate',          img: 'watermelon-hydrate.png',
          desc: 'Watermelon, honey, lime, salt' },
        { name: 'Spicy Pineapple Hydrate',     img: 'probiotic-pineapple.png',
          desc: 'Pineapple tepache, coconut, spicy honey, lime, salt' },
      ]
    },
    {
      key: 'refresh', title: 'Refresh',
      items: [
        { name: 'Mate Lemon Ice Tea',          img: 'mate-lemon-ice-tea.png',
          desc: 'Lemon, yerba mate, honey' },
        { name: 'Nourish Juice',               img: 'nourish-juice.png',
          desc: 'Orange, passionfruit, honey, mint, ginger' },
        { name: 'Brazilian Limeade',           img: 'brazilian-limeade.png',
          desc: 'Lime juice, lime peel, condensed milk' },
        { name: 'Fresh Mint Tea',              img: 'fresh-mint-tea.png',
          desc: 'With honey on the side' },
        { name: 'Fresh Ginger Tea',            img: 'fresh-ginger-tea.png',
          desc: 'With lemon and honey on the side' },
      ]
    },
    {
      key: 'blend', title: 'Blend',
      items: [
        { name: 'Brazilian Açaí & Banana',     img: 'brazilian-acai-banana.png',
          desc: 'Açaí blended with banana' },
        { name: 'Strength',                    img: 'nutbutter-power.png',
          desc: 'Banana, peanut butter, coconut milk, cinnamon' },
        { name: 'Recovery Milkshake',          img: 'chocolate-recovery.png',
          desc: 'Cocoa, chia, date, honey, cinnamon, sea salt, milk' },
      ]
    },
  ]
};

const SUN_PLACEHOLDER = `
  <div class="item__photo item__photo--placeholder">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 401.36 687.3"><path d="M342.187,336.698c.615-1.416-.564-2.966-2.092-2.742-41.383,6.065-44.903-7.291-81.427-8.774-.359-.015-.626-.358-.629-.717-.382-44.257,45.927-60.012,43.537-105.015-.397-5.486-3.154-17.374-9.41-19.594-1.246-.442-2.502.601-2.398,1.92,3.768,48.019-53.288,61.903-64.738,104.563-.159.593-.944.735-1.271.215-17.959-28.594,5.581-67.981,2.44-98.709-1.472-13.093-8.119-30.393-20.689-36.576-1.167-.574-2.496.454-2.184,1.717,16.344,66.237-35.406,80.535-22.797,134.385.132.565-.443,1.042-.97.798-31.775-14.751-31.36-27.422-36.926-59.334-3.896-14.246-13.404-42.43-29.206-43.623-1.358-.103-2.302,1.36-1.686,2.575,23.702,46.677-4.591,66.81,34.479,117.283.687.888,1.136,1.647,1.395,2.136.172.326.054.737-.261.928-17.605,10.707-41.156-1.897-60.876,2.354-9.032,1.947-19.251,7.7-24.934,16.212-.357.534-1.496,2.349-2.337,4.115-.722,1.517.79,3.132,2.362,2.539,42.387-15.99,51.901,19.075,92.374,14.223.628-.075,1.032.644.628,1.131-11.375,13.719-21.907,26.635-25.412,44.733-5.926,31.001,1.459,49.125-27.662,69.54-1.935,3.492,6.205,2.168,7.922,1.891,57.216-9.733,40.192-63.731,77.468-90.807.287-.208.701-.165.938.098,33.1,36.691-19.089,97.786,33.014,121.708,1.436.659,2.921-.809,2.332-2.274-21.549-53.633,23.363-75.259,9.948-119.845-.191-.636.512-1.161,1.054-.779,5.171,3.642,10.494,7.451,14.93,11.708,25.85,27.251,16.375,57.985,60.762,76.017,5.659,2.299,5.946.907,3.518-3.401-15.029-26.666-14.658-34.971-24.919-68.928-6.311-20.885-16.279-31.127-30.186-43.165-.35-.303-.315-.875.076-1.122,17.876-11.291,34.764-1.336,56.502-6.593,8.98-2.172,19.251-7.7,24.934-16.212.399-.598,1.778-2.799,2.622-4.741Z"/></svg>
  </div>`;

const itemPhoto = (item) => `
  <div class="item__photo">
    <img loading="lazy" src="assets/menu/${item.img}" alt="${item.name}" />
  </div>`;

const itemCard = (item, sectionKey) => {
  const safeName = item.name.replace(/"/g, '&quot;');
  const safeDesc = item.desc ? item.desc.replace(/"/g, '&quot;') : '';
  const safeTag  = item.tag ? item.tag.replace(/"/g, '&quot;') : '';
  return `
  <article class="item" data-section="${sectionKey}">
    <button class="item__photo-btn"
            type="button"
            data-name="${safeName}"
            data-desc="${safeDesc}"
            data-img="assets/menu/${item.img}"
            ${item.tag ? `data-tag="${safeTag}"` : ''}
            aria-label="Open photo of ${safeName}">
      ${itemPhoto(item)}
    </button>
    <h3 class="item__name">${item.name}</h3>
    ${item.desc ? `<details class="item__details">
      <summary class="item__toggle">
        <span class="item__toggle-label">Ingredients</span>
        <span class="item__chevron" aria-hidden="true">▾</span>
      </summary>
      <p class="item__desc">${item.desc}</p>
    </details>` : ''}
    ${item.tag ? `<div class="item__tag">${item.tag}</div>` : ''}
  </article>`;
};

function renderPanel(type) {
  const sections = MENU[type];
  const panel = document.getElementById('panel-' + type);
  panel.innerHTML = sections.map(s => `
    <div class="section" id="section-${type}-${s.key}">
      <div class="section-head">
        <h2 class="section-head__title">${s.title}</h2>
        <div class="section-head__count">${s.items.length} items</div>
      </div>
      <div class="grid">${s.items.map(i => itemCard(i, s.key)).join('')}</div>
    </div>
  `).join('');
}

function renderChips(type) {
  const sections = MENU[type];
  const chipsEl = document.getElementById('chips');
  chipsEl.innerHTML = sections.map((s, i) =>
    `<button class="chip" data-section="${s.key}" aria-current="${i === 0 ? 'true' : 'false'}">${s.title}</button>`
  ).join('');

  chipsEl.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => {
      // Swap aria-current on chips, and center the active chip in the row
      chipsEl.querySelectorAll('.chip').forEach(other =>
        other.setAttribute('aria-current', other === c ? 'true' : 'false')
      );
      c.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
      // Jump to the corresponding section
      const id = `section-${currentTab}-${c.dataset.section}`;
      const el = document.getElementById(id);
      if (!el) return;
      const headerH = document.querySelector('.head').getBoundingClientRect().height;
      const y = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
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

// ----- chip auto-highlight on scroll -----
function setupScrollSpy() {
  const observer = new IntersectionObserver((entries) => {
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
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  document.querySelectorAll('.section').forEach(s => observer.observe(s));
}

// ----- lightbox -----
let lbReturnFocus = null;

function openLightbox(card) {
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
  renderPanel('food');
  renderPanel('drinks');
  renderChips('food');

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

  // Lightbox
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lb').addEventListener('click', (e) => {
    if (e.target.id === 'lb') closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  setupScrollSpy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
