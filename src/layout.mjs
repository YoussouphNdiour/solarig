import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { company, services, products, productFamilies, lang, t } from './data.mjs';

const ASSET_V = Date.now().toString(36);

// CSS inlinée dans chaque <head> (build.mjs la lit, la minifie et l'injecte) : zéro requête bloquante.
let INLINE_CSS = '';
export const setInlineCss = (css) => { INLINE_CSS = css; };

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Les pages anglaises sont dans /en/ : les fichiers communs se trouvent un dossier au-dessus.
export const base = () => (lang === 'en' ? '../' : '');
// Les images, logos, vidéos et fiches reçoivent ?v=<empreinte du fichier> : cache d'un an sans risque de version périmée.
const hashes = new Map();
const fileHash = (p) => {
  if (!hashes.has(p)) {
    const f = new URL(`../public/assets/${p}`, import.meta.url);
    hashes.set(p, existsSync(f) ? createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8) : '');
  }
  return hashes.get(p);
};
export const asset = (p) => `${base()}assets/${p}${/^(img|fiches|brand|logos|video)\//.test(p) && fileHash(p) ? `?v=${fileHash(p)}` : ''}`;

export const waLink = (text = t('Bonjour SOLARIG, je souhaite un devis.', 'Hello SOLARIG, I would like a quote.')) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

const paths = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  drop: '<path d="M12 2.7c3.6 4.3 6 7.6 6 10.8a6 6 0 0 1-12 0c0-3.2 2.4-6.5 6-10.8z"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  chat: '<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3 3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2M6 10v4M10 10v4"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>',
  doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  pump: '<rect x="8" y="3" width="8" height="14" rx="2.5"/><path d="M12 17v4M9 21h6M10.5 7h3M10.5 11h3"/>',
  panel: '<path d="m3 7 2 11h14l2-11H3z"/><path d="M12 7v11M7.6 7 8.6 18M16.4 7l-1 11M4 12.5h16"/>',
  cable: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 3.5V1M21 12h2"/>',
  pipe: '<path d="M3 8.5h18v7H3z"/><path d="M7 8.5v7M17 8.5v7"/>',
  download: '<path d="M12 3v12M7 11l5 5 5-5M5 21h14"/>',
  truck: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
};

export const icon = (name, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;

const nav = () => [
  { label: t('Accueil', 'Home'), href: 'index.html', key: 'home' },
  {
    label: t('Solutions', 'Solutions'),
    key: 'services',
    children: services.map((s) => ({ label: s.title, href: `${s.slug}.html`, icon: s.icon, desc: s.short })),
  },
  { label: t('Catalogue', 'Catalogue'), href: 'catalogue.html', key: 'catalogue' },
  { label: t('Réalisations', 'Projects'), href: 'realisations.html', key: 'projects' },
  { label: t('À propos', 'About'), href: 'a-propos.html', key: 'about' },
  { label: 'Contact', href: 'contact.html', key: 'contact' },
];

function header(active, file, alt) {
  const other = lang === 'en' ? `../${alt?.fr || file}` : `en/${alt?.en || file}`;
  const langLink = (cls) => lang === 'en'
    ? `<a class="${cls}" href="${other}" hreflang="fr" lang="fr" title="Version française">FR</a>`
    : `<a class="${cls}" href="${other}" hreflang="en" lang="en" title="English version">EN</a>`;
  const items = nav()
    .map((item) => {
      const cur = item.key === active ? ' aria-current="page"' : '';
      if (!item.children) return `<li><a class="nav-link" href="${item.href}"${cur}>${item.label}</a></li>`;
      const links = item.children
        .map((c) => `<li><a href="${c.href}"><span class="dd-ico">${icon(c.icon)}</span><span><strong>${esc(c.label)}</strong><small>${esc(c.desc)}</small></span></a></li>`)
        .join('');
      return `<li class="has-dd${item.key === active ? ' is-current' : ''}">
        <button class="nav-link dd-toggle" type="button" aria-expanded="false">${item.label}${icon('chevron', 'chev')}</button>
        <ul class="dd">${links}</ul>
      </li>`;
    })
    .join('');

  return `<a class="skip" href="#contenu">${t('Aller au contenu', 'Skip to content')}</a>
<header class="site-header">
  <div class="wrap header-in">
    <a class="brand" href="index.html" aria-label="${t('SOLARIG, accueil', 'SOLARIG, home')}">
      <img src="${asset('brand/solarig-logo-vert-272.webp')}" alt="SOLARIG" width="136" height="34">
    </a>
    <nav class="main-nav" aria-label="${t('Navigation principale', 'Main navigation')}">
      <ul class="nav-list">${items}</ul>
      <div class="nav-mobile-extra">
        <a class="btn btn-primary" href="contact.html#devis">${t('Demander un devis', 'Request a quote')}</a>
        ${langLink('nav-lang')}
        <a class="nav-phone" href="tel:${company.phoneHref}">${icon('phone')} ${company.phone}</a>
      </div>
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${company.phoneHref}" aria-label="${t('Appeler SOLARIG au ' + company.phone, 'Call SOLARIG on ' + company.phone)}">${icon('phone')}<span>${company.phone}</span></a>
      ${langLink('lang-switch')}
      <a class="btn btn-primary btn-sm" href="contact.html#devis">${t('Devis gratuit', 'Free quote')}</a>
      <button class="burger" type="button" aria-label="${t('Ouvrir le menu', 'Open menu')}" aria-expanded="false">${icon('menu', 'i-open')}${icon('close', 'i-close')}</button>
    </div>
  </div>
</header>`;
}

function footer() {
  const solLinks = services.map((s) => `<li><a href="${s.slug}.html">${esc(s.title)}</a></li>`).join('');
  const catLinks = productFamilies.map(([k, l]) => `<li><a href="catalogue.html#${k}">${esc(l)}</a></li>`).join('');
  const agencies = company.agencies
    .map((a) => `<li>${icon('pin')}<span><strong>${a.city}</strong>${a.address ? `<br>${esc(a.address)}` : ''}</span></li>`)
    .join('');
  return `<footer class="site-footer">
  <div class="footer-rays" aria-hidden="true"></div>
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">
        <img src="${asset('brand/solarig-logo-blanc-380.webp')}" alt="SOLARIG" width="190" height="47" loading="lazy">
        <p class="f-slogan">${company.slogan}.</p>
        <p>${t("Importateur, fournisseur et installateur de solutions solaires : pompage solaire, installations résidentielles et professionnelles, panneaux, câbles, colonnes, onduleurs et batteries.", 'Importer, supplier and installer of solar solutions: solar pumping, residential and professional installations, panels, cables, pipes, inverters and batteries.')}</p>
        <a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${icon('chat')} ${t('Écrire sur WhatsApp', 'Message us on WhatsApp')}</a>
      </div>
      <div class="f-col"><h3>${t('Solutions', 'Solutions')}</h3><ul>${solLinks}</ul></div>
      <div class="f-col"><h3>${t('Catalogue', 'Catalogue')}</h3><ul>${catLinks}</ul></div>
      <div class="f-col f-contact">
        <h3>Contact</h3>
        <ul>
          <li>${icon('phone')}<span><a href="tel:${company.phoneHref}">${company.phone}</a><br><a href="tel:${company.phone2Href}">${company.phone2}</a></span></li>
          <li>${icon('mail')}<span><a href="mailto:${company.email}">${company.email}</a><br><a href="mailto:${company.email2}">${company.email2}</a></span></li>
          ${agencies}
        </ul>
      </div>
    </div>
    <div class="f-bottom">
      <p>© <span data-year>2026</span> ${company.legal} · RCCM ${company.rccm} · NINEA ${company.ninea}. ${t('Tous droits réservés.', 'All rights reserved.')}</p>
      <ul><li><a href="a-propos.html">${t('À propos', 'About')}</a></li><li><a href="blog.html">Blog</a></li><li><a href="faq.html">FAQ</a></li><li><a href="dakar.html">Dakar</a></li><li><a href="thies.html">Thiès</a></li><li><a href="tivaouane.html">Tivaouane</a></li><li><a href="mentions-legales.html">${t('Mentions légales', 'Legal notice')}</a></li></ul>
    </div>
  </div>
</footer>
<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="${t('Écrire à SOLARIG sur WhatsApp', 'Message SOLARIG on WhatsApp')}">${icon('chat')}</a>`;
}

// ---------- Schema.org ----------
const logoUrl = `${company.url}/assets/brand/solarig-logo-vert.png`;

const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${company.url}/#organization`,
  name: company.name,
  alternateName: ['SOLARIG', 'SOLARIG Technology', 'SOLARIG Pump'],
  legalName: company.legal,
  slogan: company.slogan,
  url: company.url,
  logo: logoUrl,
  image: `${company.url}/assets/brand/og.jpg`,
  description: t(
    "SOLARIG Technology est un importateur, fournisseur et installateur de solutions solaires au Sénégal, spécialiste du pompage solaire : pompes immergées, panneaux bifaciaux, câbles submersibles, colonnes PVC, onduleurs et batteries. Agences à Dakar, Thiès et Tivaouane.",
    'SOLARIG Technology is an importer, supplier and installer of solar solutions in Senegal, specialising in solar pumping: submersible pumps, bifacial panels, submersible cables, PVC pipes, inverters and batteries. Offices in Dakar, Thiès and Tivaouane.'
  ),
  foundingDate: '2017',
  taxID: company.ninea,
  identifier: [{ '@type': 'PropertyValue', name: 'RCCM', value: company.rccm }, { '@type': 'PropertyValue', name: 'NINEA', value: company.ninea }],
  founder: { '@type': 'Person', name: company.owner, jobTitle: 'CEO SOLARIG', description: 'Expert senior en énergie, ingénieur consultant en énergie', image: `${company.url}/assets/img/matar-gueye.webp` },
  email: company.email,
  telephone: company.phone,
  areaServed: { '@type': 'Country', name: 'Sénégal' },
  knowsAbout: ['Pompage solaire', 'Pompes immergées', 'Forage solaire', 'Panneaux solaires bifaciaux', 'Onduleurs hybrides', 'Câbles submersibles', 'Colonnes PVC', 'Irrigation solaire'],
  contactPoint: [
    { '@type': 'ContactPoint', telephone: company.phone, contactType: 'sales', email: company.email, availableLanguage: ['French', 'English'], areaServed: 'SN' },
    { '@type': 'ContactPoint', telephone: company.phone2, contactType: 'customer service', email: company.email2, availableLanguage: ['French', 'English'], areaServed: 'SN' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: t('Catalogue SOLARIG', 'SOLARIG catalogue'),
    itemListElement: services.map((s) => ({ '@type': 'OfferCatalogItem', itemOffered: { '@type': 'Service', name: s.title, description: s.short, url: `${company.url}${lang === 'en' ? '/en' : ''}/${s.slug}.html` } })),
  },
});

const branchLd = (a) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${company.url}/#${a.id}`,
  name: `${company.name} — ${a.city}`,
  parentOrganization: { '@id': `${company.url}/#organization` },
  url: `${company.url}/${a.id}.html`,
  telephone: company.phone,
  email: company.email,
  image: `${company.url}/assets/brand/og.jpg`,
  address: { '@type': 'PostalAddress', ...(a.address ? { streetAddress: a.address } : {}), addressLocality: a.city, addressCountry: 'SN' },
  geo: { '@type': 'GeoCoordinates', latitude: a.geo[0], longitude: a.geo[1] },
});

const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${company.url}/#website`,
  url: company.url,
  name: 'SOLARIG',
  inLanguage: ['fr', 'en'],
  publisher: { '@id': `${company.url}/#organization` },
});

const jsonLd = () => JSON.stringify([organizationLd(), ...company.agencies.map(branchLd), websiteLd()]);

export function breadcrumbJsonLd(items) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  });
}

export function faqPageJsonLd(items) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
  });
}

export function catalogueJsonLd() {
  const prefix = `${company.url}${lang === 'en' ? '/en' : ''}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('Catalogue SOLARIG', 'SOLARIG catalogue'),
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.pitch,
        image: `${company.url}/assets/img/${p.image}.webp`,
        brand: { '@type': 'Brand', name: 'SOLARIG' },
        category: (productFamilies.find(([k]) => k === p.family) || [])[1],
        url: `${prefix}/catalogue.html#${p.slug}`,
        additionalProperty: p.specs.slice(0, 8).map(([k, v]) => ({ '@type': 'PropertyValue', name: k, value: v })),
      },
    })),
  });
}

export function articleJsonLd(a) {
  const prefix = `${company.url}${lang === 'en' ? '/en' : ''}`;
  const url = `${prefix}/blog-${a.slug}.html`;
  const docs = [{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    name: a.title,
    description: a.excerpt,
    image: `${company.url}/assets/img/${a.image}.webp`,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: lang,
    keywords: [...(a.tags || []), a.keyword].filter(Boolean).join(', '),
    author: { '@id': `${company.url}/#organization` },
    publisher: { '@id': `${company.url}/#organization` },
    mainEntityOfPage: url,
    url,
  }];
  if (a.faq?.length) {
    docs.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })),
    });
  }
  return JSON.stringify(docs);
}

export function projectJsonLd(p) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    headline: p.title,
    description: p.summary,
    image: p.image ? `${company.url}/assets/img/${p.image}.webp` : `${company.url}/assets/brand/og.jpg`,
    locationCreated: { '@type': 'Place', name: p.place },
    author: { '@id': `${company.url}/#organization` },
    about: p.category,
    url: `${company.url}${lang === 'en' ? '/en' : ''}/projet-${p.slug}.html`,
  });
}

export function page({ file, title, description, active, body, image = null, home = false, noindex = false, ld = null, alt = null, preload = '' }) {
  const fullTitle = home ? title : `${title} | SOLARIG`;
  const pathOf = (f) => (f === 'index.html' ? '' : f);
  const urlFr = `${company.url}/${pathOf(alt?.fr || file)}`;
  const urlEn = `${company.url}/en/${pathOf(alt?.en || file)}`;
  const canonical = lang === 'en' ? urlEn : urlFr;
  const ogImage = image ? `${company.url}/assets/img/${image}.webp` : `${company.url}/assets/brand/og.jpg`;
  const css = INLINE_CSS.replace(/\{\{BASE\}\}assets\/([\w\/.-]+)/g, (_, p) => asset(p));
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="fr" href="${urlFr}">
<link rel="alternate" hreflang="en" href="${urlEn}">
<link rel="alternate" hreflang="x-default" href="${urlFr}">
<meta name="theme-color" content="#0B3B26">
<meta property="og:type" content="website">
<meta property="og:locale" content="${t('fr_SN', 'en_US')}">
<meta property="og:site_name" content="SOLARIG">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="author" content="${company.legal}">
<meta name="geo.region" content="SN">
<link rel="icon" type="image/png" sizes="64x64" href="${asset('brand/favicon-64.png')}">
<link rel="apple-touch-icon" href="${asset('brand/favicon-180.png')}">
<link rel="preload" href="${asset('fonts/sora-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset('fonts/manrope-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
${preload}
<style>${css}</style>
${home ? `<script type="application/ld+json">${jsonLd()}</script>` : ''}
${ld ? `<script type="application/ld+json">${ld}</script>` : ''}
</head>
<body>
${header(active, file, alt)}
<main id="contenu">
${body}
</main>
${footer()}
<script src="${asset('js/main.js')}?v=${ASSET_V}" defer></script>
</body>
</html>
`;
}
