/* SOLARIG · interactions */
(() => {
  const WA = '221764409704';
  const EMAIL = 'info@solarig.sn';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EN = document.documentElement.lang === 'en';
  const L = (fr, en) => (EN ? en : fr);
  const fmt = (n, d = 0) => n.toLocaleString(EN ? 'en-US' : 'fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, ' ');

  /* En-tête : sentinelle observée plutôt qu'un scroll handler (aucun reflow forcé) */
  const header = $('.site-header');
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => header.classList.toggle('scrolled', !e.isIntersecting)).observe(sentinel);

  /* Menu mobile */
  const burger = $('.burger');
  const closeNav = () => {
    document.body.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', L('Ouvrir le menu', 'Open menu'));
  };
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? L('Fermer le menu', 'Close menu') : L('Ouvrir le menu', 'Open menu'));
  });
  $$('.main-nav a').forEach((a) => a.addEventListener('click', closeNav));

  /* Sous-menu */
  $$('.dd-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const li = btn.parentElement;
      const open = !li.classList.contains('open');
      $$('.has-dd.open').forEach((o) => { o.classList.remove('open'); $('.dd-toggle', o).setAttribute('aria-expanded', 'false'); });
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.has-dd')) $$('.has-dd.open').forEach((o) => o.classList.remove('open')); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    $$('.has-dd.open').forEach((o) => o.classList.remove('open'));
    if (document.body.classList.contains('nav-open')) { closeNav(); burger.focus(); }
  });

  /* Apparitions au défilement */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealEls.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* Vidéos : bouton de lecture, une seule vidéo à la fois */
  const videos = $$('.vid video');
  videos.forEach((v) => {
    const fig = v.closest('.vid');
    const btn = $('.vid-play', fig);
    v.removeAttribute('controls');
    btn.addEventListener('click', () => { v.setAttribute('controls', ''); v.play(); v.focus(); });
    v.addEventListener('play', () => { fig.classList.add('playing'); v.setAttribute('controls', ''); videos.forEach((o) => { if (o !== v) o.pause(); }); });
  });

  /* Lightbox (photos, affiches techniques) */
  const lb = $('.lightbox');
  if (lb) {
    const lbImg = $('img', lb);
    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-lightbox]');
      if (!a) return;
      e.preventDefault();
      const dlg = a.closest('dialog');
      if (dlg && dlg.open) dlg.close();
      lbImg.src = a.href;
      lbImg.alt = (a.querySelector('img') || {}).alt || '';
      lb.showModal();
    });
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target === lbImg) lb.close(); });
  }

  /* Fiches produit (dialog natif) */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open]');
    if (!b) return;
    const dlg = document.getElementById(b.dataset.open);
    if (!dlg || typeof dlg.showModal !== 'function') return;
    e.preventDefault();
    dlg.showModal();
  });
  $$('.prod-dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

  /* Catalogue : filtres par famille */
  const cat = $('[data-catalogue]');
  if (cat) {
    const chips = $$('[data-filter]');
    const items = $$(':scope > li', cat);
    const apply = (f) => {
      chips.forEach((c) => c.classList.toggle('is-on', c.dataset.filter === f));
      items.forEach((li) => { li.hidden = f !== 'all' && li.dataset.family !== f; });
    };
    chips.forEach((c) => c.addEventListener('click', () => { apply(c.dataset.filter); history.replaceState(null, '', c.dataset.filter === 'all' ? location.pathname : `#${c.dataset.filter}`); }));
    const fromHash = location.hash.slice(1);
    if (chips.some((c) => c.dataset.filter === fromHash)) apply(fromHash);
  }

  /* Outil de pré-dimensionnement du pompage */
  $$('[data-sizer]').forEach((form) => {
    const MSG = JSON.parse(form.dataset.msgs)[EN ? 'en' : 'fr'];
    const PSH = 5.5; // heures d'ensoleillement équivalent par jour
    const ETA = 0.4; // rendement global pompe + moteur + contrôleur
    const DER = 0.8; // pertes du champ (poussière, température, câbles)
    const PANEL = 600; // Wc d'un panneau type
    const PUMP_H = 6; // heures de pompage utiles par jour
    const ETA_MOTOR = 0.5; // rendement pompe + moteur pour la puissance de pointe
    // Catalogue : [nom, solaire direct, Qmax m³/h, Hmax m, puissance W]
    const PUMPS = [
      [L('Pompe hybride AC/DC 1 500 W', 'Hybrid AC/DC pump 1,500 W'), true, 16, 70, 1500],
      [L('Pompe DC 3 000 W', 'DC pump 3,000 W'), true, 28, 55, 3000],
      [L('Pompe de forage 4SD12/32 (7,5 kW)', '4SD12/32 borehole pump (7.5 kW)'), false, 14.4, 160, 7500],
      [L('Pompe de forage 6SP46/7 (11 kW)', '6SP46/7 borehole pump (11 kW)'), false, 60, 92, 11000],
      [L('Pompe hybride AC/DC 22 kW', 'Hybrid AC/DC pump 22 kW'), true, 110, 130, 22000],
    ].sort((a, b) => a[4] - b[4]);
    const vol = $('#sz-vol', form), volR = $('#sz-vol-r', form), head = $('#sz-head', form), headR = $('#sz-head-r', form);
    const out = (k) => $(`[data-out="${k}"]`, form);
    const cta = $('[data-sizer-cta]', form);
    const num = (el) => Math.max(0, Number(el.value) || 0);

    const compute = () => {
      const V = num(vol), H = num(head);
      const Eh = 2.725 * V * H; // Wh/jour d'énergie hydraulique
      const wp = Eh / (ETA * DER * PSH);
      const panels = Math.max(1, Math.ceil(wp / PANEL));
      const q = V / PUMP_H;
      const pNeed = (2.725 * q * H) / ETA_MOTOR;
      const fit = PUMPS.find(([, , qm, hm, pw]) => q <= qm && H <= hm && pNeed <= pw);
      out('kwc').textContent = V && H ? fmt(wp / 1000, wp < 10000 ? 1 : 0) : '–';
      out('panels').textContent = V && H ? `≈ ${fmt(panels)} ${L(`panneau${panels > 1 ? 'x' : ''} de ${PANEL} Wc`, `${PANEL} Wc panel${panels > 1 ? 's' : ''}`)}` : '';
      out('q').textContent = V ? fmt(q, 1) : '–';
      out('pw').textContent = V && H ? fmt(pNeed / 1000, 1) : '–';
      let note = '';
      if (!V || !H) { out('pump').textContent = '–'; }
      else if (fit) {
        out('pump-label').textContent = MSG.fit;
        out('pump').textContent = fit[0];
        note = fit[1] ? MSG.solar : MSG.ac;
        if (pNeed < 0.3 * fit[4]) note += L(' · une pompe plus petite peut suffire : demandez conseil', ' · a smaller pump may be enough: ask for advice');
      } else {
        out('pump-label').textContent = MSG.fit;
        out('pump').textContent = MSG.study;
        note = L('Gros débit ou grande profondeur : une étude avec test de débit est nécessaire', 'High flow or great depth: a study with a flow test is required');
      }
      out('pump-note').textContent = note;
      const msg = EN
        ? `Hello SOLARIG, I used the pumping pre-sizing tool.\n- Daily volume: ${fmt(V)} m³/day\n- Total head: ${fmt(H)} m\nEstimate: ${fmt(wp / 1000, 1)} kWp (about ${panels} panels of ${PANEL} Wc), peak flow ${fmt(q, 1)} m³/h${fit ? `, ${fit[0]}` : ''}.\nI would like a free study.`
        : `Bonjour SOLARIG, j'ai utilisé l'outil de pré-dimensionnement du pompage.\n- Volume par jour : ${fmt(V)} m³/jour\n- Hauteur manométrique : ${fmt(H)} m\nEstimation : ${fmt(wp / 1000, 1)} kWc (environ ${panels} panneaux de ${PANEL} Wc), débit de pointe ${fmt(q, 1)} m³/h${fit ? `, ${fit[0]}` : ''}.\nJe souhaite une étude gratuite.`;
      cta.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    };
    const link = (r, n) => {
      r.addEventListener('input', () => { n.value = r.value; compute(); });
      n.addEventListener('input', () => { r.value = Math.min(Number(r.max), Math.max(Number(r.min), num(n))); compute(); });
    };
    link(volR, vol);
    link(headR, head);
    $$('input[name="use"]', form).forEach((r) => r.addEventListener('change', () => {
      if (!r.checked) return;
      vol.value = volR.value = r.dataset.vol;
      head.value = headR.value = r.dataset.head;
      compute();
    }));
    form.addEventListener('submit', (e) => e.preventDefault());
    compute();
  });

  /* Formulaire de devis */
  const form = $('[data-quote]');
  if (form) {
    const need = $('#q-need', form);
    const pre = new URLSearchParams(location.search).get('besoin');
    if (pre && [...need.options].some((o) => o.value === pre)) need.value = pre;
    const err = $('.form-error', form);
    let via = 'whatsapp';
    $$('button[type="submit"]', form).forEach((b) => b.addEventListener('click', () => { via = b.dataset.via; }));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = $$('[required]', form);
      let ok = true;
      required.forEach((f) => { const bad = !f.value.trim(); f.setAttribute('aria-invalid', String(bad)); if (bad) ok = false; });
      err.hidden = ok;
      if (!ok) { required.find((f) => f.getAttribute('aria-invalid') === 'true').focus(); return; }
      const d = Object.fromEntries(new FormData(form));
      const needLabel = need.options[need.selectedIndex].text;
      const subject = `${L('Demande de devis', 'Quote request')} – ${needLabel}`;
      const body = EN
        ? `${subject}\nName: ${d.name}\nPhone: ${d.phone}${d.email ? `\nEmail: ${d.email}` : ''}\nTown: ${d.city}\n\n${d.message}`
        : `${subject}\nNom : ${d.name}\nTéléphone : ${d.phone}${d.email ? `\nE-mail : ${d.email}` : ''}\nLocalité : ${d.city}\n\n${d.message}`;
      if (via === 'email') location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      else window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`${L('Bonjour SOLARIG,', 'Hello SOLARIG,')}\n${body}`)}`, '_blank', 'noopener');
    });
    $$('[required]', form).forEach((f) => f.addEventListener('input', () => f.removeAttribute('aria-invalid')));
  }

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
