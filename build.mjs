// Génère le site SOLARIG : français dans public/, anglais dans public/en/ — usage : node build.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { company, services, products, productFamilies, projects, faq, cities, aboutValues, steps, lang, t, setLang, nb } from './src/data.mjs';
import { page, icon, esc, waLink, asset, setInlineCss, breadcrumbJsonLd, faqPageJsonLd, catalogueJsonLd, projectJsonLd, articleJsonLd } from './src/layout.mjs';
import {
  homeHero, ticker, solutionsSection, productCard, productDialog, compareTable, featuredProducts, sizer, whySection,
  statsBand, projectCard, projectsSection, videoCard, gallery, stepsSection, partnersSection, ceoBlock, ctaBand,
  faqGroups, lightboxShell, pageHero, kicker, picture, projectVisual, postCard, blogTeaser, blogIndexBody, articleBody, fieldKit,
} from './src/components.mjs';
import { getArticles, blogFr, blogEn } from './src/blog.mjs';
import { imgPreload } from './src/components.mjs';

const prefix = () => `${company.url}${lang === 'en' ? '/en' : ''}`;
const crumbLd = (items) => breadcrumbJsonLd([{ name: t('Accueil', 'Home'), url: `${prefix()}/` }, ...items.map(([name, file]) => ({ name, url: `${prefix()}/${file}` }))]);
const mapLink = (a) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.full}, Sénégal`)}`;

const productsBlock = (slugs, { cols = 3 } = {}) => {
  const list = slugs.map((s) => products.find((p) => p.slug === s));
  return `<ul class="prod-grid prod-grid-${cols}">${list.map((p) => `<li>${productCard(p)}</li>`).join('')}</ul>${list.map(productDialog).join('')}${lightboxShell()}`;
};

const agencyCards = () => `<div class="agency-grid">${company.agencies
  .map(
    (a) => `<article class="card agency">
    <h3>${icon('pin')} ${t('Agence de', 'Office in')} ${a.city}</h3>
    <p>${a.address ? `${esc(a.address)}, ` : ''}${a.city}</p>
    <ul>
      <li>${icon('phone')}<a href="tel:${company.phoneHref}">${company.phone}</a></li>
      <li>${icon('mail')}<a href="mailto:${company.email}">${company.email}</a></li>
    </ul>
    <a class="link-arrow" href="${mapLink(a)}" target="_blank" rel="noopener">${t('Itinéraire', 'Directions')} ${icon('arrow')}</a>
  </article>`
  )
  .join('')}</div>`;

function buildPages() {
  const out = [];
  const posts = getArticles(lang);
  const add = (file, opts) => out.push([file, page({ file, ...opts })]);

  // ---------- Accueil ----------
  add('index.html', {
    home: true,
    preload: imgPreload('champ-afriagro', '(min-width: 900px) 520px, 100vw'),
    active: 'home',
    image: 'champ-afriagro',
    title: t('SOLARIG – Énergisez le Sénégal avec le solaire | Pompage solaire, pompes, panneaux', 'SOLARIG – Power Senegal with solar | Solar pumping, pumps, panels'),
    description: t(
      "SOLARIG Technology, importateur et installateur de solutions solaires au Sénégal : pompes solaires immergées, panneaux bifaciaux, câbles submersibles, colonnes PVC, onduleurs et batteries. Agences à Dakar, Thiès et Tivaouane.",
      'SOLARIG Technology, importer and installer of solar solutions in Senegal: submersible solar pumps, bifacial panels, submersible cables, PVC pipes, inverters and batteries. Offices in Dakar, Thiès and Tivaouane.'
    ),
    body: [
      homeHero(),
      ticker(),
      solutionsSection(),
      `<section class="section section-mist">
  <div class="wrap">
    <div class="section-head">
      <div>${kicker(t('Catalogue', 'Catalogue'))}<h2>${t('Les pompes que nous avons en stock.', 'The pumps we keep in stock.')}</h2></div>
      <a class="btn btn-outline" href="catalogue.html">${t('Voir tout le catalogue', 'See the full catalogue')} ${icon('arrow')}</a>
    </div>
    ${productsBlock(['pompe-hybride-1500', 'pompe-dc-3000', 'pompe-hybride-22kw', 'pompe-forage-4sd12-32'], { cols: 4 })}
  </div>
</section>`,
      sizer(),
      statsBand(),
      projectsSection(),
      blogTeaser(posts),
      whySection(),
      partnersSection(),
      ceoBlock(),
      ctaBand(),
    ].join('\n'),
  });

  // ---------- Pages solutions ----------
  const svcProducts = {
    'pompage-solaire': ['pompe-hybride-1500', 'pompe-dc-3000', 'pompe-hybride-22kw', 'pompe-forage-4sd12-32', 'pompe-forage-6sp46-7', 'cables-submersibles'],
    'installation-solaire': ['panneaux-bifaciaux', 'onduleurs-batteries'],
    'import-fourniture': ['pompe-hybride-1500', 'cables-submersibles', 'colonnes-pvc', 'panneaux-bifaciaux'],
    'etudes-maintenance': [],
  };
  const afr = projects.find((x) => x.slug === 'pompage-solaire-afrite-agro');
  const thi = projects.find((x) => x.slug === 'forage-solaire-thiabenne-samb');
  services.forEach((s, i) => {
    const ps = svcProducts[s.slug];
    const proj = projects.find((x) => x.slug === s.project);
    const others = services.filter((x) => x.slug !== s.slug);
    add(`${s.slug}.html`, {
      active: 'services',
      image: s.image,
      title: s.title,
      ld: crumbLd([[s.title, `${s.slug}.html`]]),
      description: t(`${s.title} au Sénégal par SOLARIG : ${s.short}`, `${s.title} in Senegal by SOLARIG: ${s.short}`),
      body: `${pageHero({ kickerText: `${t('Solution', 'Solution')} 0${i + 1}`, title: s.title, lead: s.lead, image: s.image, alt: s.imageAlt, crumbs: [[t('Solutions', 'Solutions'), 'index.html#solutions'], [s.title]] })}
<section class="section">
  <div class="wrap svc-detail">
    <div>
      ${kicker(t('Ce que nous faisons', 'What we do'))}
      <h2>${t('Nos prestations', 'Our services')}</h2>
      <ul class="offer-list">${s.offers.map(([h, d]) => `<li data-reveal><span class="ol-ico">${icon('check')}</span><div><h3>${h}</h3><p>${d}</p></div></li>`).join('')}</ul>
    </div>
    <aside class="card side-card">
      <h3>${t('Pour qui ?', 'Who is it for?')}</h3>
      <ul class="check-list">${s.audiences.map((a) => `<li>${icon('check')}${a}</li>`).join('')}</ul>
      <a class="btn btn-primary btn-block" href="contact.html?besoin=${s.slug}#devis">${t('Demander un devis', 'Request a quote')} ${icon('arrow')}</a>
      <a class="btn btn-outline btn-block" href="${waLink(t(`Bonjour SOLARIG, je suis intéressé(e) par : ${s.title}.`, `Hello SOLARIG, I am interested in: ${s.title}.`))}" target="_blank" rel="noopener">${icon('chat')} WhatsApp</a>
    </aside>
  </div>
</section>
${ps.length ? `<section class="section section-mist">
  <div class="wrap">
    <div class="section-head"><div>${kicker(t('Matériel', 'Equipment'))}<h2>${t('Le matériel que nous utilisons et fournissons.', 'The equipment we use and supply.')}</h2></div><a class="btn btn-outline" href="catalogue.html">${t('Catalogue complet', 'Full catalogue')} ${icon('arrow')}</a></div>
    ${productsBlock(ps, { cols: ps.length >= 4 ? 3 : 2 })}
  </div>
</section>` : ''}
${s.slug === 'pompage-solaire' ? sizer() : ''}
<section class="section${s.slug === 'pompage-solaire' ? ' section-mist' : ''}">
  <div class="wrap">
    ${kicker(t('Sur le terrain', 'On site'))}
    <h2>${t('Nos équipes au travail.', 'Our teams at work.')}</h2>
    ${gallery(s.gallery, s.title)}
  </div>
</section>
${s.slug === 'pompage-solaire' ? `<section class="section section-mist">
  <div class="wrap">
    ${kicker(t('En vidéo', 'On video'))}
    <h2>${t('Le pompage, filmé sur chantier.', 'Pumping, filmed on site.')}</h2>
    <div class="videos">${[afr.videos[0], afr.videos[1], thi.videos[0]].map(videoCard).join('')}</div>
  </div>
</section>` : ''}
${proj ? `<section class="section${s.slug === 'pompage-solaire' ? '' : ' section-mist'}">
  <div class="wrap feat-proj">
    <div>
      ${kicker(t('Référence', 'Reference project'))}
      <h2>${proj.title}</h2>
      <p class="section-intro">${proj.result}</p>
      <a class="link-arrow" href="projet-${proj.slug}.html">${t('Voir le projet', 'View the project')} ${icon('arrow')}</a>
    </div>
    ${projectCard(proj)}
  </div>
</section>` : ''}
${s.slug === 'pompage-solaire' || s.slug === 'installation-solaire' ? stepsSection() : ''}
${s.slug === 'pompage-solaire' ? blogTeaser(posts, ['choisir-pompe-solaire-forage-guide', 'choose-solar-pump-borehole-guide', 'dimensionner-pompage-solaire-exemple-chiffre', 'size-solar-pumping-worked-example', 'pompe-ac-dc-hybride-difference', 'ac-dc-hybrid-solar-pump-difference']) : ''}
<section class="section">
  <div class="wrap">
    ${kicker(t('Nos autres solutions', 'Our other solutions'))}
    <ul class="mini-svc">${others.map((o) => `<li><a href="${o.slug}.html"><span class="svc-ico">${icon(o.icon)}</span><span><strong>${o.title}</strong><small>${o.short}</small></span>${icon('arrow')}</a></li>`).join('')}</ul>
  </div>
</section>
${ctaBand()}
${lightboxShell()}`,
    });
  });

  // ---------- Catalogue ----------
  add('catalogue.html', {
    active: 'catalogue',
    image: 'prod-pompe-hybride-1500',
    title: t('Catalogue : pompes solaires, câbles, colonnes, panneaux', 'Catalogue: solar pumps, cables, pipes, panels'),
    description: t(
      "Catalogue SOLARIG : pompes solaires hybrides AC/DC 1 500 W et 22 kW, pompe DC 3 000 W, pompes de forage 4SD12/32 et 6SP46/7, pompe de piscine, câbles submersibles, colonnes PVC et panneaux bifaciaux.",
      'SOLARIG catalogue: hybrid AC/DC solar pumps 1,500 W and 22 kW, 3,000 W DC pump, 4SD12/32 and 6SP46/7 borehole pumps, pool pump, submersible cables, PVC pipes and bifacial panels.'
    ),
    ld: `${catalogueJsonLd()}`,
    body: `${pageHero({ kickerText: t('Catalogue', 'Catalogue'), title: t('Pompes, câbles, colonnes et panneaux.', 'Pumps, cables, pipes and panels.'), lead: t("Les références que nous importons et fournissons, avec leurs caractéristiques. Toutes les gammes de pompes immergées sont disponibles : demandez le prix et la disponibilité.", 'The references we import and supply, with their specifications. Every range of submersible pumps is available: ask for price and availability.'), image: 'prod-pompe-hybride-1500', alt: t('Pompe solaire hybride AC/DC 1 500 W avec son contrôleur', 'Hybrid AC/DC 1,500 W solar pump with its controller'), crumbs: [[t('Catalogue', 'Catalogue')]], actions: false })}
<section class="section cat-sec">
  <div class="wrap">
    <div class="cat-filters" role="group" aria-label="${t('Filtrer par famille', 'Filter by family')}">
      <button type="button" class="chip-btn is-on" data-filter="all">${t('Tout', 'All')}</button>
      ${productFamilies.map(([k, l]) => `<button type="button" class="chip-btn" data-filter="${k}">${esc(l)}</button>`).join('')}
    </div>
    <ul class="prod-grid prod-grid-3" data-catalogue>${products.map((p) => `<li data-family="${p.family}">${productCard(p)}</li>`).join('')}</ul>
    ${products.map(productDialog).join('')}${lightboxShell()}
  </div>
</section>
<section class="section section-mist">
  <div class="wrap">
    ${kicker(t('Comparatif', 'Comparison'))}
    <h2>${t('Les pompes en un coup d\'œil.', 'The pumps at a glance.')}</h2>
    ${compareTable()}
    <p class="fineprint">${t("Valeurs maximales issues des fiches techniques. Le débit et la hauteur varient selon le point de fonctionnement : consultez la courbe de chaque pompe.", 'Maximum values from the datasheets. Flow and head vary with the operating point: see each pump’s curve.')}</p>
  </div>
</section>
<section class="section">
  <div class="wrap other-ranges">
    <div class="card">
      <h2>${t('Une autre puissance, une autre gamme ?', 'Another rating or range?')}</h2>
      <p>${t("D'autres gammes de pompes sont disponibles : pompes DC, pompes AC, pompes électriques avec variateur, pompes de surface. Dites-nous votre débit et votre hauteur : nous vous proposons la bonne référence.", 'Other pump ranges are available: DC pumps, AC pumps, electric pumps with variable drive, surface pumps. Tell us your flow and head: we will propose the right reference.')}</p>
      <div class="btn-row"><a class="btn btn-primary" href="contact.html#devis">${t('Demander un devis', 'Request a quote')} ${icon('arrow')}</a><a class="btn btn-outline" href="pompage-solaire.html#simulateur">${t('Pré-dimensionner mon pompage', 'Pre-size my pumping')}</a></div>
    </div>
  </div>
</section>
${ctaBand()}`,
  });

  // ---------- Réalisations ----------
  add('realisations.html', {
    active: 'projects',
    image: 'thiambene-3',
    title: t('Nos réalisations', 'Our projects'),
    description: t('Forage 100 % solaire de Thiabénne Samb, pompage de Keur Momar Sarr, centrales des agences CBAO, installation hybride de Diamaguène : les réalisations de SOLARIG.', 'The 100% solar borehole in Thiabénne Samb, Keur Momar Sarr pumping, CBAO branch plants, Diamaguène hybrid installation: SOLARIG projects.'),
    ld: crumbLd([[t('Réalisations', 'Projects'), 'realisations.html']]),
    body: `${pageHero({ kickerText: t('Réalisations', 'Projects'), title: t('Des installations qui produisent déjà au soleil.', 'Installations already producing with the sun.'), lead: t('Forages et pompages solaires, installations hybrides, centrales d’agences bancaires : chaque projet est étudié, installé et mis en service par nos équipes.', 'Solar boreholes and pumping, hybrid installations, bank-branch plants: every project is studied, installed and commissioned by our teams.'), image: 'thiambene-3', alt: t('Champ solaire au sol et technicien SOLARIG à Thiabénne Samb', 'Ground-mounted array and SOLARIG technician in Thiabénne Samb'), crumbs: [[t('Réalisations', 'Projects')]], actions: false })}
<section class="section">
  <div class="wrap">
    <div class="proj-grid">${projects.map(projectCard).join('')}</div>
  </div>
</section>
<section class="section section-mist">
  <div class="wrap">
    ${kicker(t('En vidéo', 'On video'))}
    <h2>${t('Sur chantier, en images animées.', 'On site, in motion.')}</h2>
    <div class="videos">${projects.flatMap((p) => p.videos || []).map(videoCard).join('')}</div>
  </div>
</section>
${ctaBand()}`,
  });

  // ---------- Projets ----------
  projects.forEach((p, i) => {
    const next = projects[(i + 1) % projects.length];
    const siteTable = p.sites
      ? `<div class="site-table"><h2>${t('Le détail, agence par agence', 'The detail, branch by branch')}</h2><div class="table-wrap"><table class="compare"><caption class="sr-only">${esc(p.title)}</caption><thead><tr>${p.sites.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${p.sites.rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) => `<td>${esc(nb(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`
      : '';
    const equip = p.equipment
      ? `<div class="equip"><div><h2>${t("Composition de l'installation", 'What the installation includes')}</h2><ul class="check-list">${p.equipment.map((e) => `<li>${icon('check')}${esc(nb(e))}</li>`).join('')}</ul></div><aside class="card"><h3>${t('Un projet similaire ?', 'A similar project?')}</h3><p>${t('Décrivez votre besoin : nous dimensionnons et chiffrons votre installation.', 'Describe your need: we size and price your installation.')}</p><a class="btn btn-primary" href="contact.html#devis">${t('Demander un devis', 'Request a quote')} ${icon('arrow')}</a><a class="btn btn-outline" href="${waLink(t(`Bonjour SOLARIG, je souhaite une installation comparable à : ${p.title}.`, `Hello SOLARIG, I would like an installation similar to: ${p.title}.`))}" target="_blank" rel="noopener">${icon('chat')} WhatsApp</a></aside></div>`
      : '';
    const story = p.challenge
      ? `<div class="story">
      <div data-reveal><h2>${t('Le besoin', 'The need')}</h2><p>${p.challenge}</p></div>
      <div data-reveal><h2>${t('Notre solution', 'Our solution')}</h2><p>${p.solution}</p></div>
      <div data-reveal class="story-res"><h2>${t('Le résultat', 'The result')}</h2><p>${p.result}</p></div>
    </div>`
      : '';
    add(`projet-${p.slug}.html`, {
      active: 'projects',
      image: p.image,
      title: p.title,
      ld: `${projectJsonLd(p)}`,
      description: `${p.title} (${p.place}) : ${p.summary}`,
      body: `${pageHero({ kickerText: p.category, title: p.title, lead: `${p.place}. ${p.summary}`, image: p.image, visual: p.image ? undefined : projectVisual(p), alt: p.title, crumbs: [[t('Réalisations', 'Projects'), 'realisations.html'], [p.title]], actions: false })}
<section class="section">
  <div class="wrap">
    <ul class="spec-bar">${p.specs.map(([k, v]) => `<li><small>${esc(k)}</small><strong>${esc(nb(v))}</strong></li>`).join('')}</ul>
    ${p.intro ? `<p class="proj-intro">${p.intro}</p>` : ''}
    ${equip}
    ${siteTable}
    ${story}
  </div>
</section>
${p.videos?.length ? `<section class="section section-mist">
  <div class="wrap">
    ${kicker(t('En vidéo', 'On video'))}
    <h2>${t('Le chantier, filmé.', 'The site, on film.')}</h2>
    <div class="videos">${p.videos.map(videoCard).join('')}</div>
  </div>
</section>` : ''}
${p.gallery?.length ? `<section class="section">
  <div class="wrap">
    ${kicker(t('En images', 'In pictures'))}
    <h2>${t('Le chantier.', 'The site.')}</h2>
    ${gallery(p.gallery, p.title)}
  </div>
</section>` : ''}
<section class="section section-mist">
  <div class="wrap next-proj">
    <a href="projet-${next.slug}.html">
      <small>${t('Projet suivant', 'Next project')}</small>
      <strong>${next.shortTitle}</strong>
      <span>${next.category} · ${next.place}</span>
      ${icon('arrow')}
    </a>
  </div>
</section>
${ctaBand()}
${lightboxShell()}`,
    });
  });

  // ---------- À propos ----------
  add('a-propos.html', {
    active: 'about',
    image: 'technicien-local',
    title: t('À propos de SOLARIG', 'About SOLARIG'),
    description: t("SOLARIG Technology : importateur, fournisseur et installateur de solutions solaires, dirigé par Matar GUEYE, ingénieur consultant en énergie. Agences à Dakar, Thiès et Tivaouane.", 'SOLARIG Technology: importer, supplier and installer of solar solutions, led by Matar GUEYE, energy consulting engineer. Offices in Dakar, Thiès and Tivaouane.'),
    ld: crumbLd([[t('À propos', 'About'), 'a-propos.html']]),
    body: `${pageHero({ kickerText: t('À propos', 'About us'), title: t('Une entreprise qui importe, installe et conseille.', 'A company that imports, installs and advises.'), lead: t("SOLARIG Technology réunit trois savoir-faire : l'importation de matériel solaire et hydraulique, l'installation et le conseil d'ingénieur, pour que chaque forage et chaque toit produise de l'énergie fiable.", 'SOLARIG Technology brings together three skills: importing solar and hydraulic equipment, installation and engineering advice, so every borehole and roof produces reliable energy.'), image: 'technicien-local', alt: t('Technicien SOLARIG en gilet devant un local technique', 'SOLARIG technician in a vest in front of a technical room'), crumbs: [[t('À propos', 'About')]] })}
<section class="section">
  <div class="wrap about-in">
    <div>
      ${kicker(t('Qui sommes-nous', 'Who we are'))}
      <h2>${company.slogan}.</h2>
      <p class="section-intro">${t("SOLARIG est née d'un constat : au Sénégal, l'accès à l'eau et à l'énergie passe presque toujours par le même équipement — une pompe, un câble, des colonnes, des panneaux. En important nous-mêmes ce matériel et en l'installant avec nos équipes, nous maîtrisons la qualité de bout en bout.", 'SOLARIG was born from an observation: in Senegal, access to water and energy almost always relies on the same equipment — a pump, a cable, pipes, panels. By importing this equipment ourselves and installing it with our own teams, we control quality end to end.')}</p>
      <p>${t("Notre gamme de pompes solaires et de forage couvre de 1,5 kW à 22 kW, et nous proposons aussi des câbles submersibles, des colonnes PVC filetées, des panneaux bifaciaux, des onduleurs hybrides et des batteries. Trois agences, à Dakar, à Thiès et à Tivaouane, reçoivent les installateurs, les entreprises et les particuliers.", 'Our range of solar and borehole pumps covers 1.5 kW to 22 kW, and we also offer submersible cables, threaded PVC pipes, bifacial panels, hybrid inverters and batteries. Three offices, in Dakar, Thiès and Tivaouane, welcome installers, companies and individuals.')}</p>
    </div>
    <div class="vm">
      <div class="card" data-reveal><h3>${icon('sun')} ${t('Notre mission', 'Our mission')}</h3><p>${t("Rendre l'énergie solaire et l'eau accessibles à chaque ferme, village et entreprise du Sénégal, avec du matériel adapté et un service qui reste disponible.", 'Make solar energy and water accessible to every farm, village and business in Senegal, with suitable equipment and a service that stays available.')}</p></div>
      <div class="card" data-reveal><h3>${icon('shield')} ${t('Informations légales', 'Legal information')}</h3><p>${company.legal}<br>RCCM : ${company.rccm}<br>NINEA : ${company.ninea}</p></div>
    </div>
  </div>
</section>
<section class="section section-mist">
  <div class="wrap">
    <div class="section-head"><div>${kicker(t('Nos engagements', 'Our commitments'))}<h2>${t('Quatre habitudes de travail.', 'Four working habits.')}</h2></div></div>
    <ul class="why-grid">${aboutValues.map(([h, d], i) => `<li class="why-card" data-reveal><span class="why-ico">0${i + 1}</span><h3>${h}</h3><p>${d}</p></li>`).join('')}</ul>
  </div>
</section>
${ceoBlock().replace('section-mist', '')}
${fieldKit()}
${statsBand()}
<section class="section">
  <div class="wrap">
    <div class="section-head"><div>${kicker(t('Nos agences', 'Our offices'))}<h2>${t('Dakar, Thiès et Tivaouane.', 'Dakar, Thiès and Tivaouane.')}</h2></div></div>
    ${agencyCards()}
  </div>
</section>
${stepsSection()}
${partnersSection()}
${ctaBand()}
${lightboxShell()}`,
  });

  // ---------- Contact ----------
  add('contact.html', {
    active: 'contact',
    title: t('Contact et devis', 'Contact and quotes'),
    description: t("Contactez SOLARIG à Dakar ou à Thiès : devis gratuit pour un pompage solaire, une installation ou du matériel. WhatsApp +221 76 440 97 04.", 'Contact SOLARIG in Dakar or Thiès: free quote for solar pumping, an installation or equipment. WhatsApp +221 76 440 97 04.'),
    ld: crumbLd([['Contact', 'contact.html']]),
    body: `${pageHero({ kickerText: 'Contact', title: t('Parlons de votre projet.', "Let's talk about your project."), lead: t('Une question, un prix, une visite ? Écrivez-nous : nous vous répondons rapidement, par WhatsApp de préférence.', 'A question, a price, a visit? Write to us: we reply quickly, preferably on WhatsApp.'), crumbs: [['Contact']], actions: false })}
<section class="section" id="devis">
  <div class="wrap contact-in">
    <form class="card quote-form" data-quote novalidate>
      <h2>${t('Demande de devis', 'Quote request')}</h2>
      <p class="form-hint">${t('Les champs marqués * sont obligatoires.', 'Fields marked * are required.')}</p>
      <div class="f-grid">
        <div class="field"><label for="q-name">${t('Nom complet', 'Full name')} *</label><input id="q-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="q-phone">${t('Téléphone', 'Phone')} *</label><input id="q-phone" name="phone" type="tel" autocomplete="tel" placeholder="77 000 00 00" required></div>
        <div class="field"><label for="q-email">E-mail</label><input id="q-email" name="email" type="email" autocomplete="email"></div>
        <div class="field"><label for="q-city">${t('Ville / localité', 'City / town')} *</label><input id="q-city" name="city" autocomplete="address-level2" required></div>
        <div class="field f-full"><label for="q-need">${t('Votre besoin', 'What you need')} *</label>
          <select id="q-need" name="need" required>
            ${services.map((s) => `<option value="${s.slug}">${esc(s.title)}</option>`).join('')}
            <option value="catalogue">${t('Prix d\'un produit du catalogue', 'Price of a catalogue product')}</option>
            <option value="autre">${t('Autre / je ne sais pas encore', "Other / I'm not sure yet")}</option>
          </select>
        </div>
        <div class="field f-full"><label for="q-msg">${t('Votre message', 'Your message')} *</label><textarea id="q-msg" name="message" rows="5" placeholder="${t("Volume d'eau par jour, profondeur du forage, type de site, produit souhaité…", 'Daily water volume, borehole depth, type of site, product wanted…')}" required></textarea></div>
      </div>
      <p class="form-error" role="alert" hidden>${t('Merci de remplir les champs obligatoires.', 'Please fill in the required fields.')}</p>
      <div class="btn-row">
        <button class="btn btn-wa" type="submit" data-via="whatsapp">${icon('chat')} ${t('Envoyer sur WhatsApp', 'Send via WhatsApp')}</button>
        <button class="btn btn-outline" type="submit" data-via="email">${icon('mail')} ${t('Envoyer par e-mail', 'Send by email')}</button>
      </div>
    </form>
    <aside class="contact-side">
      <ul class="contact-list">
        <li>${icon('chat')}<div><small>WhatsApp · ${t('Téléphone', 'Phone')}</small><a href="tel:${company.phoneHref}">${company.phone}</a></div></li>
        <li>${icon('phone')}<div><small>${t('Autre numéro', 'Other number')}</small><a href="tel:${company.phone2Href}">${company.phone2}</a></div></li>
        <li>${icon('mail')}<div><small>E-mail</small><a href="mailto:${company.email}">${company.email}</a><br><a href="mailto:${company.email2}">${company.email2}</a></div></li>
      </ul>
      ${agencyCards()}
    </aside>
  </div>
</section>`,
  });

  // ---------- FAQ ----------
  const faqGroupsData = faq.map((g) => ({ title: g.title, items: g.items }));
  add('faq.html', {
    active: '',
    image: 'prod-pompe-dc-3000',
    title: t('FAQ : pompage solaire, pompes, installation', 'FAQ: solar pumping, pumps, installation'),
    description: t("Réponses aux questions fréquentes sur le pompage solaire, le choix d'une pompe, le catalogue SOLARIG, l'installation et le devis.", 'Answers to frequent questions about solar pumping, choosing a pump, the SOLARIG catalogue, installation and quotes.'),
    ld: faqPageJsonLd(faq.flatMap((g) => g.items)),
    body: `${pageHero({ kickerText: 'FAQ', title: t('Vos questions sur le pompage solaire et le matériel.', 'Your questions about solar pumping and equipment.'), lead: t("Choisir une pompe, comprendre l'AC et le DC, équiper un forage, demander un prix : les réponses de nos ingénieurs.", 'Choosing a pump, understanding AC and DC, equipping a borehole, asking for a price: answers from our engineers.'), crumbs: [['FAQ']], actions: false })}
<section class="section"><div class="wrap faq-wrap">${faqGroups(faqGroupsData)}</div></section>
${ctaBand()}`,
  });

  // ---------- Pages villes ----------
  cities.forEach((c) => {
    add(`${c.slug}.html`, {
      active: '',
      image: c.image,
      title: c.title,
      description: c.excerpt,
      ld: `${JSON.stringify({ '@context': 'https://schema.org', '@id': `${company.url}/#${c.agency.id}` })}`,
      body: `${pageHero({ kickerText: `${t('Agence de', 'Office in')} ${c.city}`, title: `${t('Pompage et énergie solaire à', 'Solar pumping and energy in')} ${c.city}`, lead: c.hook, image: c.image, alt: c.title, crumbs: [[c.city]] })}
<section class="section">
  <div class="wrap">
    ${kicker(t(`Nos services à ${c.city}`, `Our services in ${c.city}`))}
    <h2>${t('Ce que vous trouvez à l\'agence.', 'What you will find at the office.')}</h2>
    <ul class="city-highlights">${c.highlights.map(([h, d]) => `<li><h3>${icon('check')}${esc(h)}</h3><p>${d}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section section-mist">
  <div class="wrap">
    <div class="section-head"><div>${kicker(t('Nous trouver', 'Find us'))}<h2>${t('Agence de', 'Office in')} ${c.city}</h2></div></div>
    <div class="agency-grid"><article class="card agency">
      <h3>${icon('pin')} ${c.agency.address ? `${esc(c.agency.address)}, ` : ''}${c.city}</h3>
      <ul><li>${icon('phone')}<a href="tel:${company.phoneHref}">${company.phone}</a></li><li>${icon('mail')}<a href="mailto:${company.email}">${company.email}</a></li></ul>
      <a class="link-arrow" href="${mapLink(c.agency)}" target="_blank" rel="noopener">${t('Itinéraire', 'Directions')} ${icon('arrow')}</a>
    </article></div>
  </div>
</section>
<section class="section">
  <div class="wrap faq-wrap">${faqGroups([{ title: t(`Questions fréquentes — ${c.city}`, `FAQ — ${c.city}`), items: c.faq }])}</div>
</section>
${ctaBand()}`,
    });
  });

  // ---------- Mentions légales ----------
  const legal = lang === 'en'
    ? `<p class="todo">This is a translation provided for information. The <a href="../mentions-legales.html">French version</a> is the reference text.</p>
    <h2>Website publisher</h2>
    <p>${company.legal}<br>RCCM: ${company.rccm}<br>NINEA: ${company.ninea}<br>Offices: ${company.agencies.map((a) => a.full).join(' · ')}.<br>Phone: <a href="tel:${company.phoneHref}">${company.phone}</a> · Email: <a href="mailto:${company.email}">${company.email}</a></p>
    <p>Publication director: ${company.owner}, CEO.</p>
    <h2>Intellectual property</h2>
    <p>The texts, photographs, logos and visual identity of this website belong to ${company.legal} or to their respective owners. The logos of clients and partners are shown to illustrate our references. Any reproduction without permission is prohibited.</p>
    <h2>Personal data and cookies</h2>
    <p>The contact and quote form does not store any data on this website: it opens WhatsApp or your email app with your message pre-filled. This website sets no tracking cookie and loads no third-party font or script.</p>
    <p>In accordance with Senegalese law no. 2008-12 on the protection of personal data, you may request access to, correction or deletion of your data by writing to <a href="mailto:${company.email}">${company.email}</a>.</p>
    <h2>Pre-sizing tool and product information</h2>
    <p>The results of the pre-sizing tool are indicative estimates and do not constitute an offer. Product specifications come from manufacturer datasheets and may change; only a written quote is binding.</p>`
    : `<h2>Éditeur du site</h2>
    <p>${company.legal}<br>RCCM : ${company.rccm}<br>NINEA : ${company.ninea}<br>Agences : ${company.agencies.map((a) => a.full).join(' · ')}.<br>Téléphone : <a href="tel:${company.phoneHref}">${company.phone}</a> · E-mail : <a href="mailto:${company.email}">${company.email}</a></p>
    <p>Responsable de la publication : ${company.owner}, CEO.</p>
    <h2>Propriété intellectuelle</h2>
    <p>Les textes, photographies, logos et la charte graphique de ce site appartiennent à ${company.legal} ou à leurs propriétaires respectifs. Les logos des clients et partenaires sont reproduits pour illustrer nos références. Toute reproduction sans autorisation est interdite.</p>
    <h2>Données personnelles et cookies</h2>
    <p>Le formulaire de contact et de devis ne stocke aucune donnée sur ce site : il ouvre WhatsApp ou votre messagerie avec votre message prérempli. Ce site ne dépose aucun cookie de suivi et ne charge aucune police ni aucun script tiers.</p>
    <p>Conformément à la loi sénégalaise n° 2008-12 sur la protection des données à caractère personnel, vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à <a href="mailto:${company.email}">${company.email}</a>.</p>
    <h2>Outil de pré-dimensionnement et informations produits</h2>
    <p>Les résultats de l'outil de pré-dimensionnement sont des estimations indicatives qui ne constituent pas une offre. Les caractéristiques des produits proviennent des fiches des fabricants et peuvent évoluer ; seul un devis écrit engage SOLARIG.</p>`;
  add('mentions-legales.html', {
    active: '',
    title: t('Mentions légales', 'Legal notice'),
    description: t('Mentions légales du site de SOLARIG Technology.', 'Legal notice for the SOLARIG Technology website.'),
    body: `${pageHero({ title: t('Mentions légales', 'Legal notice'), crumbs: [[t('Mentions légales', 'Legal notice')]], actions: false })}
<section class="section"><div class="wrap prose">${legal}</div></section>`,
  });

  // ---------- Blog ----------
  add('blog.html', {
    active: '',
    image: posts[0].image,
    title: t("Blog : guides sur le pompage solaire, les pompes et l'installation", 'Blog: guides on solar pumping, pumps and installation'),
    description: t("Guides pratiques SOLARIG : choisir une pompe solaire, dimensionner un pompage, AC ou DC, stockage de l'eau, installation résidentielle, panneaux bifaciaux.", 'Practical SOLARIG guides: choosing a solar pump, sizing a pumping system, AC or DC, water storage, residential installation, bifacial panels.'),
    ld: crumbLd([['Blog', 'blog.html']]),
    body: blogIndexBody(posts),
  });
  posts.forEach((a, i) => {
    add(`blog-${a.slug}.html`, {
      active: '',
      alt: { fr: `blog-${blogFr[i].slug}.html`, en: `blog-${blogEn[i].slug}.html` },
      image: a.image,
      title: a.title,
      description: a.excerpt,
      ld: articleJsonLd(a),
      body: articleBody(a, posts),
    });
  });

  // ---------- 404 ----------
  add('404.html', {
    active: '',
    noindex: true,
    title: t('Page introuvable', 'Page not found'),
    description: t("Cette page n'existe pas ou a été déplacée.", 'This page does not exist or has been moved.'),
    body: `<section class="section notfound"><div class="wrap">
    ${kicker(t('Erreur 404', 'Error 404'))}
    <h1>${t("Cette page n'a pas de signal.", 'This page has no signal.')}</h1>
    <p class="section-intro">${t("Elle n'existe pas ou a été déplacée. Revenez à l'accueil ou consultez le catalogue.", 'It does not exist or has been moved. Go back home or browse the catalogue.')}</p>
    <div class="btn-row"><a class="btn btn-primary" href="index.html">${t("Retour à l'accueil", 'Back to home')}</a><a class="btn btn-outline" href="catalogue.html">${t('Catalogue', 'Catalogue')}</a></div>
  </div></section>`,
  });

  return out;
}

// ==========================================================================
// CSS : lecture, minification, inlining dans chaque page
// ==========================================================================
const cssPath = new URL('./public/assets/css/style.css', import.meta.url);
const cssSrc = readFileSync(cssPath, 'utf8');
const minCss = cssSrc
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>+~])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();
setInlineCss(minCss);

let total = 0;
const allPages = { fr: [], en: [] };
for (const l of ['fr', 'en']) {
  setLang(l);
  const dir = new URL(l === 'fr' ? './public/' : './public/en/', import.meta.url);
  mkdirSync(dir, { recursive: true });
  const pages = buildPages();
  for (const [file, html] of pages) {
    writeFileSync(new URL(file, dir), html);
    allPages[l].push(file);
  }
  total += pages.length;
}
console.log(`${total} pages générées (français dans public/, anglais dans public/en/) · CSS inlinée ${minCss.length} octets`);

// ==========================================================================
// sitemap.xml · robots.txt · llms.txt
// ==========================================================================
setLang('fr');
const today = new Date().toISOString().slice(0, 10);
const serviceFiles = services.map((s) => `${s.slug}.html`);
const priority = (f) => f === 'index.html' ? '1.0' : f === 'blog.html' ? '0.8' : serviceFiles.includes(f) || f === 'catalogue.html' ? '0.9' : f.startsWith('projet-') || f === 'realisations.html' || f === 'dakar.html' || f === 'thies.html' || f === 'tivaouane.html' ? '0.8' : /404|mentions-legales/.test(f) ? '0.3' : '0.6';
const changefreq = (f) => f === 'index.html' || f === 'catalogue.html' || f === 'blog.html' ? 'weekly' : f === 'mentions-legales.html' ? 'yearly' : 'monthly';
const urlEntries = allPages.fr
  .filter((f) => f !== '404.html' && !f.startsWith('blog-'))
  .flatMap((f) => {
    const p = f === 'index.html' ? '' : f;
    const fr = `${company.url}/${p}`;
    const en = `${company.url}/en/${p}`;
    const alt = `    <xhtml:link rel="alternate" hreflang="fr" href="${fr}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${en}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${fr}" />`;
    return [fr, en].map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq(f)}</changefreq>\n    <priority>${priority(f)}</priority>\n${alt}\n  </url>`);
  });
// Articles : slugs différents en FR et EN → appariés par rang (mêmes articles, même ordre).
blogFr.forEach((fa, i) => {
  const ea = blogEn[i];
  const fr = `${company.url}/blog-${fa.slug}.html`;
  const en = `${company.url}/en/blog-${ea.slug}.html`;
  const alt = `    <xhtml:link rel="alternate" hreflang="fr" href="${fr}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${en}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${fr}" />`;
  [[fr, fa.date], [en, ea.date]].forEach(([loc, d]) => urlEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${d}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n${alt}\n  </url>`));
});
writeFileSync(new URL('./public/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries.join('\n')}\n</urlset>\n`);

writeFileSync(new URL('./public/robots.txt', import.meta.url), `# Robots.txt — SOLARIG Technology
User-agent: *
Allow: /

# Les assistants d'IA générative sont les bienvenus : le catalogue et les fiches sont publics.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${company.url}/sitemap.xml
`);

const prodLine = (p) => `- **${p.name}** : ${p.specs.slice(0, 7).map(([k, v]) => `${k} ${v}`).join(' ; ')}. ${p.pitch}`;
const llms = `# SOLARIG Technology

> Importateur, fournisseur et installateur de solutions solaires au Sénégal, spécialiste du pompage solaire : pompes immergées, panneaux bifaciaux, câbles submersibles, colonnes PVC, onduleurs hybrides et batteries. Agences à Dakar, Thiès et Tivaouane. Slogan : « ${company.slogan} ».

Site officiel : ${company.url}
Dirigeant : ${company.owner} — CEO SOLARIG, expert senior en énergie, ingénieur consultant en énergie
Téléphone / WhatsApp : ${company.phone} · ${company.phone2}
E-mail : ${company.email} · ${company.email2}
Agences : ${company.agencies.map((a) => `${a.city} (${a.full})`).join(' ; ')}
RCCM : ${company.rccm} · NINEA : ${company.ninea}

## Solutions

${services.map((s) => `- **${s.title}** : ${s.short} ${company.url}/${s.slug}.html`).join('\n')}

## Catalogue (caractéristiques issues des fiches techniques)

${products.map(prodLine).join('\n')}

Autres gammes disponibles sur demande : pompes DC, AC, électriques avec variateur, pompes de surface, pompes de piscine.

## Réalisations

${projects.map((p) => `- **${p.title}** (${p.place}) : ${p.summary} ${company.url}/projet-${p.slug}.html`).join('\n')}

## Clients, partenaires et institutions

Clients : ${projects.length ? 'Senico, Patisen, Terranga Farms Sénégal, GRIPS, MP Energy, Tumiqui Japon' : ''}.
Partenaires et institutions : Senelec, ANER, ISEP Thiès, Eranove, Felicity Solar, SolarX, Infranergy, Afreenergy, Deye.

## Blog — guides pratiques

${blogFr.map((a) => `- [${a.title}](${company.url}/blog-${a.slug}.html) — ${a.excerpt}`).join('\n')}

## Pages utiles

- [Accueil](${company.url}/)
- [Catalogue](${company.url}/catalogue.html)
- [Pompage solaire et outil de pré-dimensionnement](${company.url}/pompage-solaire.html#simulateur)
- [Réalisations](${company.url}/realisations.html)
- [Blog](${company.url}/blog.html)
- [FAQ](${company.url}/faq.html)
- [Agence de Dakar](${company.url}/dakar.html) · [Agence de Thiès](${company.url}/thies.html) · [Agence de Tivaouane](${company.url}/tivaouane.html)
- [Contact et devis](${company.url}/contact.html)
- [English version](${company.url}/en/)

## Contact

Pour un devis ou un prix : WhatsApp ${company.phone}, e-mail ${company.email}, ou ${company.url}/contact.html.
`;
writeFileSync(new URL('./public/llms.txt', import.meta.url), llms);
console.log(`sitemap (${urlEntries.length} URL) + robots.txt + llms.txt écrits`);
