// ---------- Data ----------
const V = 'assets/video/';
const IMG = 'assets/img/';

const REELS = {
  short: { label: 'Short-form', items: [['f5d6e2','1:07'],['7efafd','2:22'],['635d85','1:50'],['76d983','0:52'],['c718c9','0:48'],['fecc1d','0:31'],['4449a1','0:30'],['a24a60','0:13'],['002bff','0:25'],['1488f5','1:16'],['361c79','1:12'],['3217f6','0:14']] },
  ai:    { label: 'AI ad',      items: [['b87273','0:34'],['74059e','1:13'],['07f9f7','1:46'],['d2bff5','1:08'],['916488','1:26'],['03d12f','1:21'],['06e08f','2:02'],['52b233','1:28'],['7fa655','1:19'],['3fae3a','0:58'],['01c7b2','0:08'],['8bcce9','0:06']] },
  ugc:   { label: 'UGC',        items: [['5a9794','0:50'],['cbb1ea','1:20'],['6abae6','1:31'],['e52319','0:32'],['8729ea','0:24'],['3213b6','0:29'],['cdad4b','0:25'],['fac06b','0:24'],['6fe36c','1:21'],['6d1900','0:14'],['07f615','0:17'],['2338fb','0:41']] },
  more:  { label: 'Reel',       items: [['200e07','0:54'],['461581','0:14'],['8fab29','0:24'],['a7e152','0:25'],['062b02','0:08'],['61dab4','0:07'],['fbc84d','0:07'],['7d7d94','0:06'],['daddf1','0:15']] },
};

const LONG = [
  ['1a6c00','3:05','Sold','Highlight · long-form story edit'],
  ['203c78','5:00','The Thread You Were Told','Story-driven YouTube edit'],
  ['b23d69','3:56','One Faithful Community','Parish community film'],
  ['fa0c20','2:51','Personal Story — Part 1','Documentary-style edit'],
  ['bab321','1:51','Personal Story — Part 2','Documentary-style edit'],
];

const GALLERIES = {
  figma: [...[1,2,3,4,5,6].map(n => ['figma-diffuser-'+n+'.jpg','ascent diffuser ad '+n]), ...[1,2,3,4,5,6].map(n => ['figma-alyve-'+n+'.jpg','ALYVE vitamins ad '+n])],
  funnel: [['funnel-rhodiola.webp','Salvora Rhodiola Rosea e-commerce funnel','light pad']],
  cupmix: [['cupmix-splash.webp','CupMix hero visual','light pad'],['cupmix-49.jpg','CupMix ₱49 poster'],['cupmix-logo.webp','CupMix logo','pad'],['cupmix-menu.jpg','CupMix menu board'],['cupmix-new-choices.jpg','CupMix new choices poster'],['cupmix-p39.jpg','CupMix ₱39 Timpora poster'],['cupmix-ad-set.webp','CupMix social ad set','light pad']],
  kape: [['kape-logo.webp','Kape sa Daplin logo','light pad'],['kape-we-are-open.webp','We Are Open launch post','light pad'],['kape-tara-p39.webp','Tara Kape ₱39 promo','light pad'],['kape-tara-barkada.webp','Tara Kape barkada promo','light pad']],
  ecom: [['ecom-featured-bag.jpg','Featured Collection — bag sale'],['ecom-fml-bags.jpg','FML Bags — Best Shop'],['ecom-ksi-shoes.jpg','KSI — Walk the Design Line'],['ecom-firefeast.jpg','Firefeast — Wild Sale'],['ecom-chef-diana.jpg','Chef Diana — Spicy Food'],['ecom-billes-bakery.jpg',"Bille's Bakery — Fresh Bake"]],
  posters: [['poster-allelhuia.webp','Allelhuia — created April 2023'],['poster-alpha.webp','Alpha — Beginning & the End'],['poster-agony.webp','Agony — Crucifixion of Jesus'],['poster-new-light.webp','New Light — Easter Vigil']],
};

const PORTRAITS = [
  ['portrait-leo.jpg','Leo Montero','A creative portrait for his 23rd birthday, together with his twin Leah.'],
  ['portrait-leah.jpg','Leah Montero','A creative portrait for her 23rd birthday, together with her twin Leo.'],
  ['portrait-king-23.jpg','King Almero, RSW','For his 23rd birthday last December, showcasing his achievements through the years at Caraga State University.'],
  ['portrait-mona-rsw.jpg','Mona Carla Julvesano, RSW','For passing the 2024 PRC exam for social workers.','https://www.facebook.com/nanacaraaa'],
  ['portrait-king-rsw.jpg','King M. Almero, RSW','For passing the 2024 PRC exam for social workers.','https://www.facebook.com/plongskie143'],
];

const CLIENTS = ['cerave','soj','ironpaws','ea','catakor','alyve','murad','bloom','drmelaxin','formulation','salvora','neutrogena','bluechef'];
const TOOLS = [['photoshop','Adobe Photoshop'],['illustrator','Adobe Illustrator'],['premiere','Adobe Premiere Pro'],['capcut','CapCut'],['canva','Canva'],['figma','Figma'],['claude','Claude'],['krea','Krea'],['kling','Kling AI'],['higgsfield','Higgsfield'],['heygen','HeyGen'],['flow','Flow AI'],['elevenlabs','ElevenLabs'],['hyperframes','HyperFrames']];

const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const $ = (s, el = document) => el.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------- Lightbox ----------
const lb = $('#lightbox'), stage = $('#lbStage'), cap = $('#lbCap');
let lbList = [], lbIndex = 0;
function openLightbox(list, i) { lbList = list; lbIndex = i; renderLightbox(); if (!lb.open) lb.showModal(); document.body.style.overflow = 'hidden'; }
function renderLightbox() {
  const it = lbList[lbIndex];
  stage.innerHTML = it.type === 'video'
    ? `<video src="${it.src}" poster="${it.poster}" controls autoplay playsinline></video>`
    : `<img src="${it.src}" alt="${esc(it.caption)}">`;
  cap.textContent = `${it.caption}  ·  ${lbIndex + 1} / ${lbList.length}`;
  lb.querySelectorAll('[data-prev],[data-next]').forEach(b => b.hidden = lbList.length < 2);
}
function step(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; renderLightbox(); }
function closeLightbox() { stage.innerHTML = ''; lb.close(); document.body.style.overflow = ''; }
lb.addEventListener('click', e => {
  if (e.target.closest('[data-close]') || e.target === lb || e.target === stage) closeLightbox();
  else if (e.target.closest('[data-prev]')) step(-1);
  else if (e.target.closest('[data-next]')) step(1);
});
lb.addEventListener('cancel', e => { e.preventDefault(); closeLightbox(); });
document.addEventListener('keydown', e => { if (!lb.open) return; if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });

// ---------- Reels ----------
const reelGrid = $('#reelGrid');
const reelList = [];
Object.entries(REELS).forEach(([cat, { label, items }]) => items.forEach(([id, dur]) => reelList.push({ id, dur, cat, label })));
// interleave categories for the "All" view so the grid feels varied
const order = [];
for (let i = 0; i < 12; i++) ['short','ai','ugc','more'].forEach(c => { const r = reelList.filter(x => x.cat === c)[i]; if (r) order.push(r); });
reelGrid.innerHTML = order.map((r, i) => `
  <div class="reel reveal" role="button" tabindex="0" data-cat="${r.cat}" data-id="${r.id}" aria-label="Play ${r.label} video, ${r.dur}">
    <img src="${V}${r.id}.jpg" alt="" loading="lazy" decoding="async">
    <span class="reel__play">${PLAY}</span>
    <div class="reel__meta"><span class="reel__tag">${r.label}</span><span>${r.dur}</span></div>
  </div>`).join('');

const visibleReels = () => [...reelGrid.querySelectorAll('.reel:not(.is-hidden)')];
const reelItem = el => { const r = order.find(x => x.id === el.dataset.id); return { type:'video', src:V+r.id+'.mp4', poster:V+r.id+'.jpg', caption:`${r.label} · ${r.dur}` }; };
function openReel(el) { const vis = visibleReels(); openLightbox(vis.map(reelItem), vis.indexOf(el)); }
reelGrid.addEventListener('click', e => { const el = e.target.closest('.reel'); if (el) openReel(el); });
reelGrid.addEventListener('keydown', e => { const el = e.target.closest('.reel'); if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openReel(el); } });

// hover preview (desktop pointers only)
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  reelGrid.addEventListener('mouseover', e => {
    const el = e.target.closest('.reel'); if (!el || el.querySelector('video')) return;
    const v = document.createElement('video');
    Object.assign(v, { src: V + el.dataset.id + '.mp4', muted: true, loop: true, playsInline: true, preload: 'auto' });
    v.addEventListener('playing', () => el.classList.add('is-playing'));
    el.prepend(v); v.play().catch(() => {});
    el.addEventListener('mouseleave', () => { el.classList.remove('is-playing'); v.pause(); v.remove(); }, { once: true });
  });
}

// filters
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  document.querySelectorAll('#filters .chip').forEach(c => { c.classList.toggle('is-active', c === b); c.setAttribute('aria-selected', c === b); });
  const f = b.dataset.filter;
  reelGrid.querySelectorAll('.reel').forEach(r => r.classList.toggle('is-hidden', f !== 'all' && r.dataset.cat !== f));
});

// ---------- Long-form ----------
const longItems = LONG.map(([id, dur, title]) => ({ type:'video', src:V+id+'.mp4', poster:V+id+'.jpg', caption:`${title} · ${dur}` }));
$('#longGrid').innerHTML = LONG.map(([id, dur, title, sub], i) => `
  <article class="lf reveal" data-i="${i}" role="button" tabindex="0" aria-label="Play ${esc(title)}">
    <div class="lf__thumb"><img src="${V}${id}.jpg" alt="" loading="lazy"><span class="reel__play">${PLAY}</span><span class="lf__dur">${dur}</span></div>
    <h3>${esc(title)}</h3><p>${sub}</p>
  </article>`).join('');
$('#longGrid').addEventListener('click', e => { const el = e.target.closest('.lf'); if (el) openLightbox(longItems, +el.dataset.i); });
$('#longGrid').addEventListener('keydown', e => { const el = e.target.closest('.lf'); if (el && e.key === 'Enter') openLightbox(longItems, +el.dataset.i); });

// ---------- Galleries ----------
document.querySelectorAll('[data-gallery]').forEach(g => {
  const key = g.dataset.gallery;
  if (key === 'portraits') {
    const items = PORTRAITS.map(([f, name]) => ({ type:'image', src:IMG+f, caption:name }));
    g.innerHTML = PORTRAITS.map(([f, name, text, link], i) => `
      <figure class="portrait reveal">
        <div class="tile" data-i="${i}"><img src="${IMG}${f}" alt="Creative portrait of ${esc(name)}" loading="lazy"></div>
        <figcaption><b>${String(i+1).padStart(2,'0')} · ${esc(name)}</b>${esc(text)}${link ? `<br><a href="${link}" target="_blank" rel="noopener">View profile ↗</a>` : ''}</figcaption>
      </figure>`).join('');
    g.addEventListener('click', e => { const t = e.target.closest('.tile'); if (t) openLightbox(items, +t.dataset.i); });
    return;
  }
  const list = GALLERIES[key];
  const items = list.map(([f, c]) => ({ type:'image', src:IMG+f, caption:c }));
  g.innerHTML = list.map(([f, c, cls = ''], i) => `
    <div class="tile reveal ${cls.split(' ').filter(Boolean).map(x => 'tile--'+x).join(' ')}" data-i="${i}" role="button" tabindex="0" aria-label="View ${esc(c)}">
      <img src="${IMG}${f}" alt="${esc(c)}" loading="lazy" decoding="async">
    </div>`).join('');
  g.addEventListener('click', e => { const t = e.target.closest('.tile'); if (t) openLightbox(items, +t.dataset.i); });
  g.addEventListener('keydown', e => { const t = e.target.closest('.tile'); if (t && e.key === 'Enter') openLightbox(items, +t.dataset.i); });
});

// ---------- Clients marquee & tools ----------
const clientHTML = CLIENTS.map(c => `<img src="${IMG}client-${c}.webp?v=2" alt="${c}" decoding="async">`).join('') + '<span class="txt">Mille Bag London</span>';
$('#clients').innerHTML = clientHTML + clientHTML.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
$('#tools').innerHTML = TOOLS.map(([f, n]) => f === 'hyperframes'
  ? `<div class="tool tool--text reveal" title="${n}"><span class="hf-mark" aria-hidden="true"></span>${n}</div>`
  : `<div class="tool reveal" title="${n}"><img src="${IMG}tool-${f}.webp" alt="${n}" loading="lazy"></div>`).join('');

// ---------- Nav, timecode, reveal ----------
const nav = $('.nav');
const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const hv = $('#heroVideo'), tc = $('#timecode');
const tallMQ = matchMedia('(max-aspect-ratio: 1/1)');
function setHeroSrc() {
  const want = tallMQ.matches ? hv.dataset.tall : hv.dataset.wide;
  hv.style.objectPosition = tallMQ.matches ? '50% 50%' : '0% 50%';
  if (hv.getAttribute('src') === want) return;
  hv.poster = want.replace('.mp4', '.jpg'); hv.src = want; hv.play().catch(() => {});
}
setHeroSrc(); tallMQ.addEventListener('change', setHeroSrc);
$('#watchSold').addEventListener('click', () => openLightbox(longItems, 0));
const pad = n => String(Math.floor(n)).padStart(2, '0');
(function tick() { const t = hv.currentTime || 0; tc.textContent = `00:00:${pad(t)}:${pad((t % 1) * 30)}`; requestAnimationFrame(tick); })();

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
