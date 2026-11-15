import { readFileSync } from 'node:fs';
import { company, services, products, productFamilies, projects, partners, steps, whyUs, stats, aboutValues, lang, t, nb } from './data.mjs';
import { esc, icon, asset, waLink, base } from './layout.mjs';

const manifest = JSON.parse(readFileSync(new URL('./img-manifest.json', import.meta.url), 'utf8'));

// ---------- Images ----------
export const imgSrc = (name) => asset(`${manifest[name]?.dir || 'img'}/${name}.webp`);
export const picture = (name, alt, { cls = '', eager = false, sizes = '(min-width: 900px) 600px, 100vw' } = {}) => {
  const m = manifest[name];
  const dir = m?.dir || 'img';
  const src = asset(`${dir}/${name}.webp`);
  const srcset = m?.s ? ` srcset="${asset(`${dir}/${name}-${m.s}.webp`)} ${m.s}w, ${src} ${m.w}w" sizes="${sizes}"` : '';
  const dim = m ? ` width="${m.w}" height="${m.h}"` : '';
  return `<img${cls ? ` class="${cls}"` : ''} src="${src}"${srcset} alt="${esc(alt)}"${dim} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};

export const kicker = (text, light = false) => `<p class="kicker${light ? ' kicker-light' : ''}">${text}</p>`;

const breadcrumbs = (crumbs) =>
  `<nav class="crumbs" aria-label="${t("Fil d'Ariane", 'Breadcrumb')}"><a href="index.html">${t('Accueil', 'Home')}</a>${crumbs
    .map(([label, href]) => `<span aria-hidden="true">/</span>${href ? `<a href="${href}">${esc(label)}</a>` : `<span aria-current="page">${esc(label)}</span>`}`)
    .join('')}</nav>`;

export const projectVisual = (p) => `<div class="proj-visual"><ul class="pv-stats">${p.visual.map(([n, u]) => `<li><strong>${n}<small>${u}</small></strong></li>`).join('')}</ul><p class="pv-cap">${esc(p.visualCaption || '')}</p></div>`;

export const pageHero = ({ kickerText, title, lead, image, alt, visual, crumbs = [], actions = true }) => `<section class="page-hero">
  <div class="ph-rays" aria-hidden="true"></div>
  <div class="wrap ph-in${image || visual ? '' : ' ph-solo'}">
    <div class="ph-copy">
      ${crumbs.length ? breadcrumbs(crumbs) : ''}
      ${kickerText ? kicker(kickerText) : ''}
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
      ${actions ? `<div class="btn-row"><a class="btn btn-primary" href="contact.html#devis">${t('Demander un devis', 'Request a quote')} ${icon('arrow')}</a><a class="btn btn-outline" href="${waLink()}" target="_blank" rel="noopener">${icon('chat')} WhatsApp</a></div>` : ''}
    </div>
    ${image ? `<div class="ph-art"><div class="arch">${picture(image, alt || '', { eager: true, sizes: '(min-width: 900px) 480px, 100vw' })}</div></div>` : visual ? `<div class="ph-art"><div class="arch arch-visual">${visual}</div></div>` : ''}
  </div>
</section>`;

// ---------- Accueil ----------
export function homeHero() {
  return `<section class="hero">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="pill">${icon('sun')} ${t('Importateur · Installateur · Pompage solaire', 'Importer · Installer · Solar pumping')}</p>
      <h1>${t('Énergisez le Sénégal <em>avec le solaire.</em>', 'Power Senegal <em>with solar.</em>')}</h1>
      <p class="hero-lead">${t(
        "SOLARIG importe, fournit et installe : pompes solaires, panneaux, câbles et colonnes pour vos forages, vos fermes, vos maisons et vos entreprises. Du stock à la mise en eau, un seul interlocuteur.",
        'SOLARIG imports, supplies and installs: solar pumps, panels, cables and pipes for your boreholes, farms, homes and businesses. From stock to first water, a single contact.'
      )}</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="contact.html#devis">${t('Demander un devis', 'Request a quote')} ${icon('arrow')}</a>
        <a class="btn btn-outline" href="catalogue.html">${t('Voir le catalogue', 'Browse the catalogue')}</a>
      </div>
      <ul class="hero-trust">
        <li>${icon('box')}<span>${t('Matériel en stock', 'Equipment in stock')}</span></li>
        <li>${icon('chart')}<span>${t("Conseil d'un ingénieur", 'Engineer-led advice')}</span></li>
        <li>${icon('wrench')}<span>${t('Installation clé en main', 'Turnkey installation')}</span></li>
      </ul>
    </div>
    <div class="hero-art">
      <div class="hero-rays" aria-hidden="true"></div>
      <div class="arch">${picture('champ-afriagro', t('Champ solaire au sol et pompage installés par SOLARIG', 'Ground-mounted solar array and pumping installed by SOLARIG'), { eager: true, sizes: '(min-width: 900px) 520px, 100vw' })}</div>
      <div class="float-card fc-a">${icon('drop')}<div><small>${t('Pompe hybride AC/DC', 'Hybrid AC/DC pump')}</small><strong>${nb('16 m³/h · 70 m')}</strong></div></div>
      <div class="float-card fc-b">${icon('sun')}<div><small>${t('Forage 100 % solaire', '100% solar borehole')}</small><strong>Thiambène Sambou</strong></div></div>
    </div>
  </div>
</section>`;
}

export function ticker() {
  const items = [
    t('Pompes solaires', 'Solar pumps'), t('Panneaux bifaciaux', 'Bifacial panels'), t('Câbles submersibles', 'Submersible cables'),
    t('Colonnes PVC', 'PVC column pipes'), t('Onduleurs hybrides', 'Hybrid inverters'), t('Batteries', 'Batteries'),
    t('Forage solaire', 'Solar borehole'), t('Études et conseil', 'Studies and advice'),
  ];
  const row = (hidden) => `<ul class="ticker-row"${hidden ? ' aria-hidden="true"' : ''}>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  return `<div class="ticker" role="presentation"><div class="ticker-track">${row(false)}${row(true)}</div></div>`;
}

export function solutionsSection({ title, intro = true } = {}) {
  return `<section class="section" id="solutions">
  <div class="wrap">
    <div class="section-head">
      <div>
        ${kicker(t('Nos solutions', 'Our solutions'))}
        <h2>${title || t('Quatre métiers, un seul interlocuteur.', 'Four trades, one contact.')}</h2>
      </div>
      ${intro ? `<p class="section-intro">${t("Du matériel importé à la mise en eau : nous fournissons, installons, dimensionnons et entretenons.", 'From imported equipment to first water: we supply, install, size and maintain.')}</p>` : ''}
    </div>
    <ul class="sol-grid">
      ${services
        .map(
          (s, i) => `<li class="sol-card" data-reveal>
        <a href="${s.slug}.html">
          <div class="sol-media">${picture(s.image, s.imageAlt, { sizes: '(min-width: 900px) 560px, 100vw' })}<span class="sol-ico">${icon(s.icon)}</span></div>
          <div class="sol-body">
            <span class="sol-n">0${i + 1}</span>
            <h3>${s.title}</h3>
            <p>${s.short}</p>
            <span class="link-arrow">${t('En savoir plus', 'Learn more')} ${icon('arrow')}</span>
          </div>
        </a>
      </li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;
}

// ---------- Catalogue ----------
const waProduct = (p) =>
  waLink(t(`Bonjour SOLARIG, je souhaite un prix et la disponibilité pour : ${p.name}.`, `Hello SOLARIG, I would like a price and availability for: ${p.name}.`));

export function productCard(p) {
  const fam = (productFamilies.find(([k]) => k === p.family) || [])[1];
  return `<article class="prod" id="${p.slug}" data-family="${p.family}">
  <div class="prod-plate ${p.fit}">
    ${picture(p.image, p.name, { cls: `prod-img ${p.fit}`, sizes: '(min-width: 900px) 360px, 90vw' })}
    <span class="prod-badge">${esc(p.badge)}</span>
  </div>
  <div class="prod-body">
    <p class="prod-fam">${esc(fam)}</p>
    <h3>${esc(nb(p.name))}</h3>
    <p class="prod-pitch">${esc(p.pitch)}</p>
    <ul class="keyspecs">${p.key.map(([k, v]) => `<li><small>${esc(k)}</small><strong>${esc(nb(v))}</strong></li>`).join('')}</ul>
    <div class="prod-actions">
      <a class="btn btn-dark btn-sm" href="#${p.slug}" data-open="dlg-${p.slug}">${icon('doc')} ${t('Fiche technique', 'Datasheet')}</a>
      <a class="btn btn-outline btn-sm" href="${waProduct(p)}" target="_blank" rel="noopener">${icon('chat')} ${t('Demander un prix', 'Ask for a price')}</a>
    </div>
  </div>
</article>`;
}

export function productDialog(p) {
  const perf = p.perf
    ? `<div class="perf"><h4>${t('Performances hydrauliques', 'Hydraulic performance')}</h4><div class="perf-scroll"><table class="perf-table"><thead><tr><th scope="col">${esc(p.perf.head[0])}</th>${p.perf.head[1].map((v) => `<td>${nb(String(v).replace(/(\d)(?=(\d{3})+$)/, '$1 '))}</td>`).join('')}</tr></thead><tbody>${p.perf.rows
        .map(([lab, vals]) => `<tr><th scope="row">${esc(lab)}</th>${vals.map((v) => `<td>${v}</td>`).join('')}</tr>`)
        .join('')}</tbody></table></div></div>`
    : '';
  return `<dialog class="prod-dialog" id="dlg-${p.slug}" aria-labelledby="dlg-${p.slug}-t">
  <form method="dialog" class="dlg-close"><button aria-label="${t('Fermer', 'Close')}">${icon('close')}</button></form>
  <div class="dlg-in">
    <div class="dlg-media ${p.fit}">${picture(p.image, p.name, { cls: p.fit, sizes: '420px' })}</div>
    <div class="dlg-body">
      <span class="prod-badge static">${esc(p.badge)}</span>
      <h3 id="dlg-${p.slug}-t">${esc(nb(p.name))}</h3>
      <p class="prod-pitch">${esc(p.pitch)}</p>
      <table class="spec-table"><tbody>${p.specs.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(nb(v))}</td></tr>`).join('')}</tbody></table>
      ${perf}
      ${p.note ? `<p class="dlg-note">${icon('shield')}<span>${esc(p.note)}</span></p>` : ''}
      ${p.bullets?.length ? `<ul class="check-list">${p.bullets.map((b) => `<li>${icon('check')}${esc(b)}</li>`).join('')}</ul>` : ''}
      <div class="prod-actions">
        <a class="btn btn-primary btn-sm" href="${waProduct(p)}" target="_blank" rel="noopener">${icon('chat')} ${t('Demander un prix', 'Ask for a price')}</a>
        ${p.fiche ? `<a class="btn btn-outline btn-sm" href="${imgSrc(p.fiche)}" data-lightbox>${icon('expand')} ${t('Voir l\'affiche technique', 'View the technical poster')}</a>` : ''}
      </div>
    </div>
  </div>
</dialog>`;
}

export function compareTable() {
  const pumps = [
    ['pompe-hybride-1500', 'AC/DC', '1 500 W', 16, '70 m', t('3 pouces', '3 in')],
    ['pompe-hybride-22kw', 'AC/DC', '22 kW', 110, '130 m', '4″'],
    ['pompe-dc-3000', 'DC', '3 000 W', 28, '55 m', '2″'],
    ['pompe-forage-6sp46-7', 'AC 380 V', '11 kW', 60, '92 m', '4″'],
    ['pompe-forage-4sd12-32', 'AC', '7,5 kW', 14.4, '160 m', '3″'],
    ['pompe-piscine-1500', 'AC/DC', '1 500 W', 25, '14 m', '2″'],
  ];
  const fmt = (n) => String(n).replace('.', t(',', '.'));
  return `<div class="table-wrap"><table class="compare">
    <caption class="sr-only">${t('Comparatif des pompes SOLARIG', 'SOLARIG pump comparison')}</caption>
    <thead><tr><th scope="col">${t('Pompe', 'Pump')}</th><th scope="col">${t('Alimentation', 'Supply')}</th><th scope="col">${t('Puissance', 'Power')}</th><th scope="col">${t('Débit max', 'Max flow')}</th><th scope="col">${t('Hauteur max', 'Max head')}</th><th scope="col">${t('Sortie', 'Outlet')}</th></tr></thead>
    <tbody>${pumps
      .map(([slug, ac, pw, q, h, out]) => {
        const p = products.find((x) => x.slug === slug);
        return `<tr><th scope="row"><a href="#${slug}">${esc(nb(p.name))}</a></th><td>${ac}</td><td>${nb(pw)}</td><td>${fmt(q)} m³/h</td><td>${nb(h)}</td><td>${out}</td></tr>`;
      })
      .join('')}</tbody>
  </table></div>`;
}

export function featuredProducts(slugs) {
  return `<ul class="prod-grid prod-grid-4">${slugs.map((s) => `<li>${productCard(products.find((p) => p.slug === s))}</li>`).join('')}</ul>`;
}

// ---------- Outil de pré-dimensionnement ----------
export function sizer() {
  const uses = [
    ['irrigation', t('Irrigation / maraîchage', 'Irrigation / market garden'), 40, 45],
    ['betail', t('Élevage', 'Livestock'), 20, 40],
    ['village', t('Village / forage', 'Village / borehole'), 60, 60],
    ['piscine', t('Piscine / bassin', 'Pool / pond'), 25, 8],
  ];
  const msgs = {
    fr: { fit: 'Pompe conseillée', study: 'Étude sur mesure', ac: 'pompe AC à associer à un onduleur de pompage solaire', solar: 'alimentation solaire directe' },
    en: { fit: 'Suggested pump', study: 'Custom study', ac: 'AC pump to pair with a solar pumping inverter', solar: 'direct solar supply' },
  };
  return `<section class="section sizer-sec" id="simulateur">
  <div class="wrap sizer">
    <div class="sizer-copy">
      ${kicker(t('Pré-dimensionnement', 'Pre-sizing'))}
      <h2>${t('Combien de panneaux pour mon pompage ?', 'How many panels for my pumping?')}</h2>
      <p class="section-intro">${t(
        "Indiquez le volume d'eau dont vous avez besoin chaque jour et la hauteur de pompage : l'outil estime la puissance solaire et la pompe du catalogue qui conviennent.",
        'Enter the water volume you need each day and the pumping head: the tool estimates the solar power and the catalogue pump that fits.'
      )}</p>
      <ul class="check-list">
        <li>${icon('check')}${t("Estimation indicative basée sur 5,5 h d'ensoleillement équivalent par jour", 'Indicative estimate based on 5.5 equivalent sun hours per day')}</li>
        <li>${icon('check')}${t("La hauteur à saisir est la hauteur manométrique totale : profondeur de pompage + pertes + hauteur de refoulement", 'The head to enter is the total dynamic head: pumping depth + losses + discharge height')}</li>
        <li>${icon('check')}${t('Une visite avec test de débit confirme le dimensionnement final', 'A visit with a flow test confirms the final sizing')}</li>
      </ul>
    </div>
    <form class="sizer-card" data-sizer data-msgs='${JSON.stringify(msgs).replace(/'/g, '&#39;')}'>
      <fieldset class="field">
        <legend>${t('Usage', 'Use')}</legend>
        <div class="chips">${uses.map(([v, l, vol, h], i) => `<label class="chip"><input type="radio" name="use" value="${v}" data-vol="${vol}" data-head="${h}"${i === 0 ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>
      </fieldset>
      <div class="field">
        <label for="sz-vol">${t("Volume d'eau par jour", 'Daily water volume')}</label>
        <div class="range-row"><input id="sz-vol-r" type="range" min="5" max="300" step="5" value="40" aria-label="${t("Volume d'eau par jour (curseur)", 'Daily water volume (slider)')}"><div class="num"><input id="sz-vol" type="number" inputmode="numeric" min="1" max="1000" step="1" value="40"><span>m³/${t('jour', 'day')}</span></div></div>
      </div>
      <div class="field">
        <label for="sz-head">${t('Hauteur manométrique totale', 'Total dynamic head')}</label>
        <div class="range-row"><input id="sz-head-r" type="range" min="5" max="180" step="1" value="45" aria-label="${t('Hauteur manométrique (curseur)', 'Total head (slider)')}"><div class="num"><input id="sz-head" type="number" inputmode="numeric" min="1" max="400" step="1" value="45"><span>m</span></div></div>
      </div>
      <ul class="sizer-out" aria-live="polite">
        <li class="out-main"><span class="lbl">${t('Puissance solaire conseillée', 'Recommended solar power')}</span><strong><span data-out="kwc">–</span> <small>kWc</small></strong><em data-out="panels"></em></li>
        <li><span class="lbl">${t('Débit de pointe', 'Peak flow')}</span><strong><span data-out="q">–</span> <small>m³/h</small></strong></li>
        <li><span class="lbl">${t('Puissance de pompe', 'Pump power')}</span><strong><span data-out="pw">–</span> <small>kW</small></strong></li>
        <li class="out-pump"><span class="lbl" data-out="pump-label">${msgs[lang].fit}</span><strong data-out="pump">–</strong><em data-out="pump-note"></em></li>
      </ul>
      <a class="btn btn-primary btn-block" data-sizer-cta href="${waLink()}" target="_blank" rel="noopener">${icon('chat')} ${t('Recevoir mon étude gratuite', 'Get my free study')}</a>
      <p class="fineprint">${t("Estimation indicative, hors pertes particulières. Elle ne remplace pas une étude technique.", 'Indicative estimate, excluding specific losses. It does not replace a technical study.')}</p>
    </form>
  </div>
</section>`;
}

// ---------- Pourquoi / chiffres ----------
export function whySection() {
  return `<section class="section section-mist">
  <div class="wrap">
    <div class="section-head">
      <div>${kicker(t('Pourquoi SOLARIG', 'Why SOLARIG'))}<h2>${t('Le matériel, le calcul et la pose au même endroit.', 'Equipment, calculation and installation in one place.')}</h2></div>
    </div>
    <ul class="why-grid">
      ${whyUs.map(([ic, h, d]) => `<li class="why-card" data-reveal><span class="why-ico">${icon(ic)}</span><h3>${h}</h3><p>${d}</p></li>`).join('')}
    </ul>
  </div>
</section>`;
}

export function statsBand() {
  return `<section class="stats-band">
  <div class="sb-rays" aria-hidden="true"></div>
  <div class="wrap">
    <ul class="stats">
      ${stats.map(([n, u, d]) => `<li data-reveal><strong>${n}${u ? `<small>${u}</small>` : ''}</strong><span>${d}</span></li>`).join('')}
    </ul>
  </div>
</section>`;
}

// ---------- Réalisations ----------
export function projectCard(p) {
  return `<article class="proj-card" data-reveal>
  <a href="projet-${p.slug}.html">
    <div class="proj-media">${p.image ? picture(p.image, p.title, { sizes: '(min-width: 900px) 400px, 100vw' }) : projectVisual(p)}<span class="tag">${esc(p.category)}</span></div>
    <div class="proj-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <span class="link-arrow">${t('Voir le projet', 'View the project')} ${icon('arrow')}</span>
    </div>
  </a>
</article>`;
}

export function projectsSection(limit = 3) {
  return `<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>${kicker(t('Réalisations', 'Projects'))}<h2>${t('Des installations qui produisent déjà au soleil.', 'Installations already producing with the sun.')}</h2></div>
      <a class="btn btn-outline" href="realisations.html">${t('Toutes les réalisations', 'All projects')} ${icon('arrow')}</a>
    </div>
    <div class="proj-grid">${projects.slice(0, limit).map(projectCard).join('')}</div>
  </div>
</section>`;
}

export function videoCard(v) {
  const m = manifest[v.poster];
  const vertical = m ? m.h > m.w : false;
  return `<figure class="vid${vertical ? ' vid-v' : ''}">
  <video preload="none" playsinline controls poster="${imgSrc(v.poster)}"${m ? ` width="${m.w}" height="${m.h}"` : ''}>
    <source src="${asset(`video/${v.file}.mp4`)}" type="video/mp4">
  </video>
  <button class="vid-play" type="button" aria-label="${t('Lire la vidéo', 'Play video')} : ${esc(v.title)}">${icon('play')}</button>
  <figcaption><strong>${esc(v.title)}</strong><span>${v.duration}</span></figcaption>
</figure>`;
}

export const gallery = (names, altPrefix) =>
  `<ul class="gallery">${names
    .map((n, i) => `<li data-reveal><a href="${imgSrc(n)}" data-lightbox aria-label="${t('Agrandir la photo', 'Enlarge photo')} ${i + 1}">${picture(n, `${altPrefix} — ${t('photo', 'photo')} ${i + 1}`, { sizes: '(min-width: 900px) 380px, 50vw' })}<span class="g-zoom">${icon('expand')}</span></a></li>`)
    .join('')}</ul>`;

// ---------- Méthode / partenaires / dirigeant / CTA ----------
export function stepsSection() {
  return `<section class="section section-mist">
  <div class="wrap">
    <div class="section-head">
      <div>${kicker(t('Comment ça se passe', 'How it works'))}<h2>${t('De la visite à la mise en eau, en cinq étapes.', 'From visit to first water, in five steps.')}</h2></div>
    </div>
    <ol class="steps">
      ${steps.map(([h, d], i) => `<li data-reveal><span class="step-n">${i + 1}</span><h3>${h}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>`;
}

export function partnersSection() {
  const group = (title, list) => `<div class="pt-group" data-reveal><h3>${title}</h3><ul>${list.map(([f, n]) => `<li><img src="${asset(`logos/${f}.webp`)}" alt="${esc(n)}" loading="lazy" decoding="async" height="64"></li>`).join('')}</ul></div>`;
  return `<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>${kicker(t('Ils nous font confiance', 'They trust us'))}<h2>${t('Clients, partenaires et institutions.', 'Clients, partners and institutions.')}</h2></div>
    </div>
    <div class="pt-wrap">
      ${group(t('Clients', 'Clients'), partners.clients)}
      ${group(t('Partenaires et institutions', 'Partners and institutions'), partners.institutions)}
    </div>
  </div>
</section>`;
}

export function ceoBlock() {
  return `<section class="section section-mist">
  <div class="wrap ceo">
    <div class="ceo-photo">${picture('matar-gueye', t('Matar GUEYE, CEO de SOLARIG', 'Matar GUEYE, CEO of SOLARIG'), { sizes: '260px' })}</div>
    <div>
      ${kicker(t('Direction', 'Leadership'))}
      <h2>${company.owner}</h2>
      <p class="ceo-role">${company.ownerRole}</p>
      <ul class="chips-static">${company.ownerTitles.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p>${t("Expert senior en énergie et ingénieur consultant, Matar GUEYE dirige SOLARIG et supervise le dimensionnement des projets de pompage et d'énergie solaire.", 'A senior energy expert and consulting engineer, Matar GUEYE leads SOLARIG and oversees the sizing of pumping and solar energy projects.')}</p>
    </div>
  </div>
</section>`;
}

export function ctaBand() {
  return `<section class="cta-band">
  <div class="cta-rays" aria-hidden="true"></div>
  <div class="wrap cta-in">
    <div>
      <h2>${t('Un forage à équiper, un projet solaire à lancer ?', 'A borehole to equip, a solar project to launch?')}</h2>
      <p>${t("Décrivez votre besoin : nous revenons vers vous avec une première estimation et une proposition de visite.", 'Describe your need: we come back to you with a first estimate and a proposed visit.')}</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-light" href="contact.html#devis">${t('Demander un devis', 'Request a quote')} ${icon('arrow')}</a>
        <a class="btn btn-ghost" href="${waLink()}" target="_blank" rel="noopener">${icon('chat')} WhatsApp</a>
        <a class="btn btn-ghost" href="tel:${company.phoneHref}">${icon('phone')} ${company.phone}</a>
      </div>
    </div>
  </div>
</section>`;
}

export function faqGroups(groups) {
  return groups
    .map(
      (g) => `<section class="faq-group"><h2>${esc(g.title)}</h2><div class="faq-items">${g.items
        .map(([q, a], i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary><span>${esc(q)}</span>${icon('chevron', 'faq-chev')}</summary><div class="faq-answer"><p>${a}</p></div></details>`)
        .join('')}</div></section>`
    )
    .join('');
}

export function lightboxShell() {
  return `<dialog class="lightbox" aria-label="${t('Image agrandie', 'Enlarged image')}"><form method="dialog"><button class="lb-close" aria-label="${t('Fermer', 'Close')}">${icon('close')}</button></form><img alt=""></dialog>`;
}

export { aboutValues };
