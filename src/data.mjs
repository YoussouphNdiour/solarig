// Données bilingues du site SOLARIG. Une seule source : t(fr, en) selon la langue active.
// Les exports « let » sont des liaisons vivantes recalculées par setLang().

export let lang = 'fr';
export const t = (fr, en) => (lang === 'en' ? en : fr);

// Espaces insécables entre chiffres/unités pour éviter les coupures de ligne (« 1 500 / W »).
export const nb = (s) =>
  String(s)
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1 ')
    .replace(/(\d) (?=(?:W|kW|kWc|Wc|V|A|HP|Hz|mm|m|m³\/h|m³|L\/min|tr\/min|r\/min|%|FCFA|kWh|ans|years)(?![A-Za-zÀ-ÿ]))/g, '$1 ');

export let company, services, products, productFamilies, projects, partners, steps, faq, cities, aboutValues, whyUs, stats;

function build() {
  company = {
    name: 'SOLARIG Technology',
    short: 'SOLARIG',
    legal: 'SOLARIG Technology',
    slogan: t('Énergisez le Sénégal avec le solaire', 'Power Senegal with solar'),
    url: 'https://www.solarig.sn',
    phone: '+221 76 440 97 04',
    phoneHref: '+221764409704',
    phone2: '+221 78 133 92 15',
    phone2Href: '+221781339215',
    whatsapp: '221764409704',
    email: 'info@solarig.sn',
    email2: '4esolarig@gmail.com',
    rccm: 'SN.THS.2017.A.1729',
    ninea: '006360622',
    owner: 'Matar GUEYE',
    ownerRole: t('CEO SOLARIG', 'CEO, SOLARIG'),
    ownerTitles: [
      t('Expert senior en énergie', 'Senior energy expert'),
      t('Ingénieur consultant en énergie', 'Energy consulting engineer'),
    ],
    agencies: [
      { id: 'dakar', city: 'Dakar', address: 'HLM 5, Villa 2311', full: 'HLM 5, Villa 2311, Dakar', geo: [14.7167, -17.45] },
      { id: 'thies', city: 'Thiès', address: 'Parcelles Unité 5, Hersent, Rue 17', full: 'Parcelles Unité 5, Hersent, Rue 17, Thiès', geo: [14.7886, -16.926] },
      { id: 'tivaouane', city: 'Tivaouane', address: '', full: 'Tivaouane', geo: [14.9511, -16.8189] },
    ],
    address: 'Dakar (HLM 5) · Thiès (Parcelles Unité 5) · Tivaouane',
  };

  // ---------- Solutions (4 métiers) ----------
  services = [
    {
      slug: 'pompage-solaire',
      icon: 'drop',
      title: t('Pompage solaire', 'Solar pumping'),
      short: t('Forages, irrigation, élevage et piscines alimentés par le soleil.', 'Boreholes, irrigation, livestock and pools powered by the sun.'),
      lead: t(
        "Un forage, un bassin ou un champ à irriguer : nous dimensionnons, fournissons et installons le pompage solaire complet, des panneaux à la tête de forage, sans gasoil ni facture d'électricité.",
        'A borehole, a basin or a field to irrigate: we size, supply and install the complete solar pumping system, from the panels to the wellhead, with no diesel and no electricity bill.'
      ),
      image: 'champ-afriagro',
      imageAlt: t('Champ solaire au sol alimentant un pompage, photographié pendant le chantier Afrite Agro', 'Ground-mounted solar array powering a pumping system during the Afrite Agro project'),
      offers: [
        [t('Étude et test de débit', 'Study and flow test'), t("Relevé du besoin en eau, niveau dynamique, hauteur manométrique : on dimensionne la pompe et le champ solaire au plus juste.", 'Water need, dynamic level and head survey: we size the pump and the solar array precisely.')],
        [t('Pompes solaires immergées', 'Submersible solar pumps'), t("Hybrides AC/DC de 1 500 W à 22 kW, pompes DC 3 000 W, pompes de forage 7,5 et 11 kW : fonctionnent au soleil ou sur secteur selon le modèle.", 'Hybrid AC/DC from 1,500 W to 22 kW, 3,000 W DC pumps, 7.5 and 11 kW borehole pumps: they run on sun or mains depending on the model.')],
        [t('Panneaux, structures et contrôleur', 'Panels, structures and controller'), t('Champ solaire au sol ou sur support, contrôleur MPPT, protections, câbles submersibles et colonnes PVC filetées.', 'Ground or rack-mounted solar array, MPPT controller, protections, submersible cables and threaded PVC column pipes.')],
        [t('Installation et mise en service', 'Installation and commissioning'), t("Pose des structures, montage des panneaux, descente de la pompe, raccordement et essai de débit en sortie de forage.", 'Structure installation, panel mounting, pump lowering, wiring and flow test at the borehole outlet.')],
        [t('Suivi et dépannage', 'Follow-up and repairs'), t('Contrôles, diagnostic de panne, remplacement de pompe ou de contrôleur, pièces disponibles.', 'Inspections, fault diagnosis, pump or controller replacement, spare parts available.')],
      ],
      audiences: [
        t('Maraîchers et exploitations agricoles', 'Market gardeners and farms'),
        t('Éleveurs et abreuvement du bétail', 'Livestock farmers and watering'),
        t('Villages, écoles et lieux de culte', 'Villages, schools and places of worship'),
        t('Propriétaires de piscines et de bassins', 'Pool and pond owners'),
        t('Entreprises de forage et d\'hydraulique', 'Drilling and water engineering companies'),
      ],
      gallery: ['afriagro-2', 'thiambene-tete-forage', 'afriagro-6', 'thiambene-3'],
      project: 'pompage-solaire-afrite-agro',
    },
    {
      slug: 'installation-solaire',
      icon: 'sun',
      title: t('Installation solaire', 'Solar installation'),
      short: t('Installations résidentielles et professionnelles : panneaux, onduleurs hybrides et batteries.', 'Residential and professional installations: panels, hybrid inverters and batteries.'),
      lead: t(
        "Particuliers, professionnels, agriculteurs : une installation solaire, résidentielle ou professionnelle, étudiée pour votre consommation, posée par nos équipes et suivie dans le temps.",
        'Households, professionals, farmers: a residential or professional solar installation, designed for your consumption, installed by our teams and followed over time.'
      ),
      image: 'onduleurs-local',
      imageAlt: t('Local technique avec onduleurs hybrides et batteries installés par SOLARIG', 'Technical room with hybrid inverters and batteries installed by SOLARIG'),
      offers: [
        [t('Installations résidentielles', 'Residential installations'), t("Produire, stocker et utiliser l'énergie solaire chez soi : panneaux, onduleur hybride, batterie lithium et coffret de protection.", 'Produce, store and use solar energy at home: panels, hybrid inverter, lithium battery and protection box.')],
        [t('Étude personnalisée', 'Tailored study'), t('Analyse de vos consommations et de vos contraintes pour proposer la solution juste nécessaire.', 'We analyse your consumption and constraints to propose the right-sized solution.')],
        [t('Panneaux bifaciaux', 'Bifacial panels'), t('Production recto-verso, puissance élevée, résistance aux conditions climatiques extrêmes.', 'Front-and-back production, high power, resistance to extreme weather.')],
        [t('Onduleurs hybrides et stockage', 'Hybrid inverters and storage'), t('Onduleurs, batteries et protections installés dans un local technique propre et signalé.', 'Inverters, batteries and protections installed in a clean, labelled technical room.')],
        [t('Cadrages et supports de panneaux', 'Frames and panel supports'), t('Structures adaptées au toit ou au sol, fixations anticorrosion.', 'Structures suited to the roof or the ground, corrosion-resistant fixings.')],
        [t('Maintenance et suivi', 'Maintenance and monitoring'), t("Visites préventives, vérifications électriques, remplacement de composants.", 'Preventive visits, electrical checks, component replacement.')],
      ],
      audiences: [
        t('Particuliers : maisons et villas', 'Individuals: homes and villas'),
        t('Commerces, ateliers et PME', 'Shops, workshops and SMEs'),
        t('Fermes et exploitations agricoles', 'Farms and agricultural holdings'),
        t('Industries et projets à grande échelle', 'Industries and large-scale projects'),
      ],
      gallery: ['onduleurs-installation', 'technicien-local', 'thiambene-2', 'afriagro-4'],
      project: 'centrales-solaires-agences-cbao',
    },
    {
      slug: 'import-fourniture',
      icon: 'box',
      title: t('Import et fourniture', 'Import and supply'),
      short: t('Pompes, panneaux, câbles et colonnes disponibles en stock pour installateurs et particuliers.', 'Pumps, panels, cables and pipes in stock for installers and individuals.'),
      lead: t(
        "SOLARIG importe et fournit le matériel solaire et hydraulique : pompes immergées, panneaux bifaciaux, câbles submersibles, colonnes PVC. Pour les installateurs, les entreprises de forage et les particuliers.",
        'SOLARIG imports and supplies solar and hydraulic equipment: submersible pumps, bifacial panels, submersible cables, PVC column pipes. For installers, drilling companies and individuals.'
      ),
      image: 'colonnes-pvc-reel',
      imageAlt: t('Colonnes PVC filetées en stock', 'Threaded PVC column pipes in stock'),
      offers: [
        [t('Pompes de toutes puissances', 'Pumps of every rating'), t('Pompes solaires hybrides, DC, AC et pompes électriques avec variateur : toutes les gammes de pompes immergées sont disponibles.', 'Hybrid solar, DC, AC pumps and electric pumps with drive: every range of submersible pumps is available.')],
        [t('Câbles et colonnes', 'Cables and pipes'), t('Câbles submersibles et colonnes PVC filetées pour forages, irrigation et projets industriels.', 'Submersible cables and threaded PVC column pipes for boreholes, irrigation and industrial projects.')],
        [t('Panneaux, onduleurs, batteries', 'Panels, inverters, batteries'), t('Panneaux bifaciaux et équipements de stockage pour vos propres chantiers.', 'Bifacial panels and storage equipment for your own projects.')],
        [t('Fiches techniques et conseil', 'Datasheets and advice'), t("Une fiche par produit et l'appui d'un ingénieur pour choisir la bonne référence.", 'A datasheet for every product and an engineer on hand to pick the right reference.')],
        [t('Devis rapide', 'Fast quotes'), t('Demandez un prix par WhatsApp : réponse avec disponibilité et conditions.', 'Request a price on WhatsApp: we reply with availability and terms.')],
      ],
      audiences: [
        t('Installateurs solaires', 'Solar installers'),
        t('Entreprises de forage et d\'hydraulique', 'Drilling and water engineering companies'),
        t('Revendeurs et quincailleries', 'Resellers and hardware stores'),
        t('Agriculteurs et particuliers', 'Farmers and individuals'),
      ],
      gallery: ['colonnes-pvc-reel', 'prod-cable', 'prod-colonnes', 'prod-panneaux'],
      project: null,
    },
    {
      slug: 'etudes-maintenance',
      icon: 'chart',
      title: t('Études et maintenance', 'Studies and maintenance'),
      short: t("Dimensionnement, conseil d'un ingénieur et contrats de suivi.", "Sizing, engineer-led advice and service contracts."),
      lead: t(
        "Derrière chaque projet SOLARIG, un ingénieur consultant en énergie : audit, dimensionnement, choix du matériel, puis suivi de l'installation pour qu'elle produise longtemps.",
        'Behind every SOLARIG project is an energy consulting engineer: audit, sizing, equipment selection, then follow-up so the installation keeps producing.'
      ),
      image: 'technicien-local',
      imageAlt: t('Technicien SOLARIG devant un local technique', 'SOLARIG technician in front of a technical room'),
      offers: [
        [t('Audit et dimensionnement', 'Audit and sizing'), t('Besoins en eau ou en énergie, champ solaire, pompe, protections, câbles : un calcul expliqué, pas une estimation au jugé.', 'Water or energy needs, solar array, pump, protections, cables: an explained calculation, not a guess.')],
        [t('Choix du matériel', 'Equipment selection'), t('Conseil indépendant sur les références, les puissances et la compatibilité des composants.', 'Independent advice on references, ratings and component compatibility.')],
        [t('Diagnostic de panne', 'Fault diagnosis'), t('Mesures, lecture des alarmes, remplacement de pompe, contrôleur ou câble.', 'Measurements, alarm reading, replacement of pump, controller or cable.')],
        [t('Maintenance préventive', 'Preventive maintenance'), t('Nettoyage des panneaux, serrages, contrôle des protections et du débit.', 'Panel cleaning, tightening, protection and flow checks.')],
        [t('Rapport signé', 'Signed report'), t("Chaque intervention donne lieu à un rapport d'intervention remis au client.", 'Every intervention produces a report handed to the customer.')],
      ],
      audiences: [
        t('Propriétaires d\'installations existantes', 'Owners of existing installations'),
        t('Exploitations agricoles et élevages', 'Farms and livestock operations'),
        t('Collectivités et projets villageois', 'Local authorities and village projects'),
        t('Porteurs de projets', 'Project owners'),
      ],
      gallery: ['technicien-local', 'onduleurs-installation', 'thiambene-tete-forage', 'afriagro-3'],
      project: null,
    },
  ];

  // ---------- Catalogue ----------
  productFamilies = [
    ['pompes-solaires', t('Pompes solaires', 'Solar pumps')],
    ['pompes-forage', t('Pompes de forage', 'Borehole pumps')],
    ['piscine', t('Piscine', 'Pool')],
    ['cables-colonnes', t('Câbles et colonnes', 'Cables and pipes')],
    ['energie', t('Panneaux et stockage', 'Panels and storage')],
  ];

  products = [
    {
      slug: 'pompe-hybride-1500',
      family: 'pompes-solaires',
      image: 'prod-pompe-hybride-1500',
      fiche: 'fiche-pompe-hybride-1500',
      fit: 'contain',
      name: t('Pompe solaire hybride AC/DC 1 500 W', 'Hybrid AC/DC solar pump 1,500 W'),
      badge: t('Hybride AC/DC', 'Hybrid AC/DC'),
      pitch: t('Efficace, robuste, économique : fonctionne sur solaire ou sur secteur.', 'Efficient, robust, economical: runs on solar or on mains.'),
      key: [[t('Débit max', 'Max flow'), '16 m³/h'], [t('Hauteur max', 'Max head'), '70 m'], [t('Puissance', 'Power'), '1 500 W']],
      specs: [
        [t('Puissance', 'Power'), '1 500 W'],
        [t('Type', 'Type'), t('Hybride AC/DC', 'Hybrid AC/DC')],
        [t('Débit maximum', 'Maximum flow'), '16,0 m³/h'],
        [t('Hauteur maximale', 'Maximum head'), '70 m'],
        [t('Courant', 'Current'), '8 A'],
        [t('Sortie', 'Output'), '220-240 V / 50 Hz'],
        [t('Diamètre', 'Diameter'), t('3 pouces', '3 inches')],
        [t('Matériau', 'Material'), t('Acier inoxydable', 'Stainless steel')],
      ],
      bullets: [t('Fonctionne sur solaire ou sur secteur', 'Runs on solar or mains'), t("Idéale pour l'agriculture et l'accès à l'eau", 'Ideal for farming and water access'), t('Installation facile, entretien minimal', 'Easy installation, minimal maintenance')],
    },
    {
      slug: 'pompe-hybride-22kw',
      family: 'pompes-solaires',
      image: 'prod-pompe-hybride-ac-dc',
      fiche: 'fiche-pompe-hybride-ac-dc',
      fit: 'contain',
      name: t('Pompe solaire hybride AC/DC 22 kW', 'Hybrid AC/DC solar pump 22 kW'),
      badge: t('Haute puissance', 'High power'),
      pitch: t('Performance, fiabilité et durabilité pour les grands débits.', 'Performance, reliability and durability for high flow rates.'),
      key: [[t('Débit', 'Flow'), '3 – 1 833 L/min'], [t('Hauteur', 'Head'), '130 – 1 m'], [t('Puissance', 'Power'), '22 kW']],
      specs: [
        [t('Modèle', 'Model'), '6DSC110-130-380/520-22000-A/D'],
        [t('Alimentation', 'Supply'), 'AC 380 V / DC 520 V'],
        [t('Puissance', 'Power'), '22 000 W'],
        [t('Sortie (outlet)', 'Outlet'), '4″'],
        [t('Vitesse', 'Speed'), '4 000 tr/min'],
        [t('Débit', 'Flow'), '3 – 1 833 L/min'],
        [t('Hauteur manométrique', 'Head'), '130 – 1 m'],
        [t('Indice de protection', 'Protection rating'), 'IP68'],
        [t("Classe d'isolation", 'Insulation class'), 'F'],
      ],
      perf: { head: [t('Débit (L/min)', 'Flow (L/min)'), [3, 333, 500, 833, 1167, 1333, 1500, 1667, 1833]], rows: [[t('Hauteur (m)', 'Head (m)'), [130, 124, 115, 94, 74, 62, 47, 15, 1]]] },
      bullets: [t('Alimentation AC ou DC', 'AC or DC supply'), t('Indice de protection IP68', 'IP68 protection'), t('Grand débit, longue durée de vie', 'High flow, long service life')],
    },
    {
      slug: 'pompe-dc-3000',
      family: 'pompes-solaires',
      image: 'prod-pompe-dc-3000',
      fiche: 'fiche-pompe-dc-3000',
      fit: 'contain',
      name: t('Pompe solaire DC 3 000 W', 'DC solar pump 3,000 W'),
      badge: 'DC',
      pitch: t('Pompe solaire DC haute performance, puissance maximale 3 000 W.', 'High-performance DC solar pump, maximum power 3,000 W.'),
      key: [[t('Débit max', 'Max flow'), '28 m³/h'], [t('Hauteur max', 'Max head'), '55 m'], [t('Puissance', 'Power'), '3 000 W']],
      specs: [
        [t('Modèle', 'Model'), '4PPSS28-55-385-3000'],
        [t('Tension', 'Voltage'), '385 V'],
        [t('Sortie (outlet)', 'Outlet'), '2″'],
        [t('Hauteur max', 'Max head'), '55 m'],
        [t('Puissance', 'Power'), '3 000 W'],
        [t('Courant', 'Current'), '8 A'],
        [t('Débit max', 'Max flow'), '28 m³/h'],
      ],
      note: t('Ne jamais faire fonctionner la pompe à vide.', 'Never run the pump dry.'),
      bullets: [t('Pompe DC directe sur champ solaire', 'DC pump straight off the solar array'), t('Grand débit pour irrigation et bassins', 'High flow for irrigation and basins')],
    },
    {
      slug: 'pompe-forage-6sp46-7',
      family: 'pompes-forage',
      image: 'prod-pompe-forage-6sp',
      fiche: 'fiche-pompe-forage-6sp',
      fit: 'contain',
      name: t('Pompe immergée pour forage 6SP46/7', 'Submersible borehole pump 6SP46/7'),
      badge: 'AC 380 V',
      pitch: t('Performance, fiabilité, durabilité : 11 kW pour les forages à fort débit.', 'Performance, reliability, durability: 11 kW for high-flow boreholes.'),
      key: [[t('Débit', 'Flow'), '600 – 1 000 L/min'], [t('Hauteur', 'Head'), '70 – 39 m'], [t('Puissance', 'Power'), '15 HP (11 kW)']],
      specs: [
        [t('Modèle', 'Model'), '6SP46/7'],
        [t('Tension / fréquence', 'Voltage / frequency'), '380 V / 50 Hz'],
        [t('Puissance', 'Power'), '15 HP (11 kW)'],
        [t('Vitesse de rotation', 'Rotation speed'), '2 850 tr/min'],
        [t('Débit', 'Flow'), '600 – 800 – 1 000 L/min'],
        [t('Hauteur manométrique totale', 'Total head'), '70 – 56 – 39 m'],
        [t('Diamètre de sortie', 'Outlet diameter'), '4″'],
        [t("Nombre d'étages", 'Stages'), '46'],
        [t('Hauteur max', 'Max head'), '92 m'],
        [t('Câble électrique', 'Electric cable'), t('100 % cuivre', '100% copper')],
        [t('Isolation', 'Insulation'), t('Classe B', 'Class B')],
      ],
      perf: { head: [t('Débit (L/min)', 'Flow (L/min)'), [600, 800, 1000]], rows: [[t('Hauteur (m)', 'Head (m)'), [70, 56, 39]]] },
      bullets: [t('Corps en acier inoxydable', 'Stainless steel body'), t('Câble 100 % cuivre', '100% copper cable')],
    },
    {
      slug: 'pompe-forage-4sd12-32',
      family: 'pompes-forage',
      image: 'prod-pompe-forage-4sd',
      fiche: 'fiche-pompe-forage-4sd',
      fit: 'contain',
      name: t('Pompe immergée pour forage 4SD12/32', 'Submersible borehole pump 4SD12/32'),
      badge: 'AC · 7,5 kW',
      pitch: t('Conçue pour les forages profonds : irrigation, eau potable, châteaux d\'eau, élevage.', 'Built for deep boreholes: irrigation, drinking water, water towers, livestock.'),
      key: [[t('Débit', 'Flow'), '120 – 240 L/min'], [t('Hauteur', 'Head'), '90 – 160 m'], [t('Puissance', 'Power'), '10 HP (7,5 kW)']],
      specs: [
        [t('Modèle', 'Model'), '4SD12/32'],
        [t('Puissance', 'Power'), '10 HP (7,5 kW)'],
        [t('Vitesse de rotation', 'Rotation speed'), '2 850 tr/min'],
        [t('Débit nominal', 'Rated flow'), '120 – 240 L/min'],
        [t('Hauteur manométrique totale', 'Total head'), '90 – 160 m'],
        [t('Raccordement', 'Connection'), t('Sortie 3 pouces', '3-inch outlet')],
        [t('Diamètre de la pompe', 'Pump diameter'), '4″ (100 mm)'],
        [t("Nombre d'étages", 'Stages'), '32'],
        [t('Indice de protection', 'Protection rating'), 'IP68'],
        [t('Immersion max', 'Max immersion'), '80 m'],
        [t("Température max. de l'eau", 'Max water temperature'), '35 °C'],
      ],
      perf: { head: [t('Débit (L/min)', 'Flow (L/min)'), [120, 180, 240]], rows: [[t('Hauteur (m)', 'Head (m)'), [160, 131, 90]]] },
      note: t('Garantie 12 mois contre tout défaut de fabrication.', '12-month warranty against manufacturing defects.'),
      bullets: [t('Corps en acier inoxydable', 'Stainless steel body'), t('Compatible avec les systèmes solaires et hybrides', 'Compatible with solar and hybrid systems')],
    },
    {
      slug: 'pompe-piscine-1500',
      family: 'piscine',
      image: 'prod-pompe-piscine',
      fiche: 'fiche-pompe-piscine',
      fit: 'contain',
      name: t('Pompe solaire piscine 1 500 W', 'Solar pool pump 1,500 W'),
      badge: t('Hybride AC/DC', 'Hybrid AC/DC'),
      pitch: t("Idéale pour la circulation et la filtration de l'eau de piscine et de bassin.", 'Ideal for circulation and filtration of pool and pond water.'),
      key: [[t('Débit max', 'Max flow'), '25 m³/h'], [t('Hauteur max', 'Max head'), '14 m'], [t('Puissance', 'Power'), '1 500 W']],
      specs: [
        [t('Puissance', 'Power'), '1 500 W'],
        [t('Type', 'Type'), t('Pompe piscine hybride AC/DC', 'Hybrid AC/DC pool pump')],
        [t('Débit max', 'Max flow'), '25,0 m³/h'],
        [t('Hauteur max', 'Max head'), '14 m'],
        [t('Courant', 'Current'), '8 A'],
        [t('Diamètre', 'Diameter'), '50 mm (2″)'],
        [t('Sortie', 'Output'), '220-240 V / 50 Hz'],
        [t('Matériau', 'Material'), t('Corps en plastique renforcé, turbine résistante', 'Reinforced plastic body, durable impeller')],
      ],
      bullets: [t('Disponible aussi : pompes de surface et autres pompes de piscine', 'Also available: surface pumps and other pool pumps')],
    },
    {
      slug: 'cables-submersibles',
      family: 'cables-colonnes',
      image: 'prod-cable',
      fiche: 'fiche-cables-submersibles',
      fit: 'cover',
      name: t('Câbles submersibles', 'Submersible cables'),
      badge: t('Forage', 'Borehole'),
      pitch: t('Conçus pour la performance maximale dans les conditions souterraines les plus dures.', 'Engineered for maximum performance in the toughest underground conditions.'),
      key: [[t('Usage', 'Use'), t('Pompes immergées', 'Submersible pumps')], [t('Tenue', 'Resistance'), t("À l'eau", 'Water')]],
      specs: [
        [t('Durabilité', 'Durability'), t('Haute, pour conditions extrêmes', 'High, for extreme conditions')],
        [t('Étanchéité', 'Water resistance'), t('Fiable en milieu humide', 'Reliable in wet environments')],
        [t('Conductivité', 'Conductivity'), t('Haute, transmission efficace', 'High, efficient transmission')],
        [t('Souplesse', 'Flexibility'), t('Souple et résistant, pose facile', 'Flexible and strong, easy to install')],
        [t('Sections', 'Sizes'), t('Disponibles sur demande', 'Available on request')],
      ],
      bullets: [t('Câble plat à trois conducteurs repérés par couleur', 'Flat three-core cable with colour-coded conductors')],
    },
    {
      slug: 'colonnes-pvc',
      family: 'cables-colonnes',
      image: 'prod-colonnes',
      fiche: 'fiche-colonnes-pvc',
      fit: 'cover',
      name: t('Colonnes PVC filetées', 'Threaded PVC column pipes'),
      badge: 'PVC',
      pitch: t('Précision, résistance, fiabilité : pour chaque goutte qui compte.', 'Precision, strength, reliability: for every drop that matters.'),
      key: [[t('Usage', 'Use'), t('Forages, irrigation', 'Boreholes, irrigation')], [t('Filetage', 'Thread'), t('De précision', 'Precision')]],
      specs: [
        [t('Résistance', 'Strength'), t('Haute pression et conditions difficiles', 'High pressure and tough conditions')],
        [t('Corrosion', 'Corrosion'), t('Résistante, longue durée en milieux agressifs', 'Resistant, long life in harsh water and soil')],
        [t('Filetage', 'Threading'), t('De précision, assemblage étanche', 'Precision, leak-proof fit')],
        [t('Jonctions', 'Joints'), t('Fiables pour des forages plus profonds', 'Reliable for deeper boreholes')],
        [t('Diamètres', 'Diameters'), t('Disponibles sur demande', 'Available on request')],
      ],
      bullets: [t('Pompes immergées, installations de forage, irrigation agricole, projets industriels', 'Submersible pumps, borehole installations, agricultural irrigation, industrial projects')],
    },
    {
      slug: 'panneaux-bifaciaux',
      family: 'energie',
      image: 'prod-panneaux',
      fiche: 'fiche-panneaux-bifaciaux',
      fit: 'cover',
      name: t('Panneaux solaires bifaciaux', 'Bifacial solar panels'),
      badge: t('Recto-verso', 'Front & back'),
      pitch: t('Plus de puissance, plus de performance : production d\'énergie recto et verso.', 'More power, more performance: energy production front and back.'),
      key: [[t('Technologie', 'Technology'), t('Bifaciale', 'Bifacial')], [t('Usage', 'Use'), t('Tous projets', 'All projects')]],
      specs: [
        [t('Technologie', 'Technology'), t('Bifaciale : production recto et verso', 'Bifacial: front and back production')],
        [t('Puissance', 'Power'), t('Élevée, pour plus d\'énergie et d\'économies', 'High, for more energy and savings')],
        [t('Fiabilité', 'Reliability'), t('Résistance aux conditions climatiques extrêmes', 'Withstands extreme weather')],
        [t('Applications', 'Applications'), t('Résidentiel, agricole, industriel, grands projets', 'Residential, agricultural, industrial, large-scale')],
        [t('Références et puissances', 'References and ratings'), t('Disponibles sur demande', 'Available on request')],
      ],
      bullets: [t('Fourniture, installation, cadrages et supports, maintenance', 'Supply, installation, frames and supports, maintenance')],
    },
    {
      slug: 'onduleurs-batteries',
      family: 'energie',
      image: 'onduleurs-local',
      fiche: null,
      fit: 'cover',
      name: t('Onduleurs hybrides et batteries', 'Hybrid inverters and batteries'),
      badge: t('Stockage', 'Storage'),
      pitch: t('Onduleurs, batteries et protections posés dans un local technique propre.', 'Inverters, batteries and protections installed in a clean technical room.'),
      key: [[t('Usage', 'Use'), t('Maison, ferme, PME', 'Home, farm, SME')]],
      specs: [
        [t('Onduleurs', 'Inverters'), t('Hybrides, selon votre consommation', 'Hybrid, matched to your consumption')],
        [t('Batteries', 'Batteries'), t('Stockage dimensionné à vos besoins', 'Storage sized to your needs')],
        [t('Références et marques', 'References and brands'), t('Disponibles sur demande', 'Available on request')],
      ],
      bullets: [t('Étude et pose par nos équipes', 'Study and installation by our teams')],
    },
  ];

  // ---------- Réalisations ----------
  // Champs optionnels : image (sinon visuel chiffré `visual`), equipment, sites, challenge/solution/result, gallery, videos.
  projects = [
    {
      slug: 'forage-solaire-thiabenne-samb',
      title: t('Forage 100 % solaire à Thiabénne Samb', '100% solar borehole in Thiabénne Samb'),
      shortTitle: t('Forage solaire Thiabénne Samb', 'Thiabénne Samb solar borehole'),
      category: t('Forage solaire', 'Solar borehole'),
      place: t('Thiabénne Samb, vers Pékesse', 'Thiabénne Samb, near Pékesse'),
      image: 'thiambene-3',
      summary: t(
        "Un forage alimenté à 100 % par le soleil : 48 panneaux de 580 W (27,84 kWc), pompe hybride de 13 kW avec son contrôleur, supports et coffret de protection.",
        'A borehole powered 100% by the sun: 48 panels of 580 W (27.84 kWp), a 13 kW hybrid pump with its controller, supports and protection box.'
      ),
      specs: [
        [t('Localité', 'Location'), t('Thiabénne Samb, vers Pékesse', 'Thiabénne Samb, near Pékesse')],
        [t('Champ solaire', 'Solar array'), '48 × 580 W (27,84 kWc)'],
        [t('Pompe', 'Pump'), t('Hybride 13 kW + contrôleur', 'Hybrid 13 kW + controller')],
        [t('Énergie', 'Energy'), t('100 % solaire', '100% solar')],
      ],
      equipment: [
        t('48 panneaux solaires de 580 W', '48 solar panels of 580 W'),
        t('Structures supports', 'Support structures'),
        t('Pompe hybride de 13 kW avec son contrôleur', '13 kW hybrid pump with its controller'),
        t('Coffret de protection', 'Protection box'),
        t('Accessoires de raccordement', 'Connection accessories'),
      ],
      challenge: t(
        "Alimenter un forage avec l'énergie du soleil, sans groupe électrogène ni carburant.",
        'Power a borehole with the energy of the sun, with no generator and no fuel.'
      ),
      solution: t(
        "Montage des structures métalliques et de 48 panneaux de 580 W au sol, pose de la pompe hybride de 13 kW et de son contrôleur, travaux sur la tête de forage, coffret de protection et raccordement, réalisés par l'équipe SOLARIG en gilet de chantier.",
        'Assembly of the metal structures and 48 ground-mounted 580 W panels, installation of the 13 kW hybrid pump and its controller, work on the wellhead, protection box and wiring, carried out by the SOLARIG crew in site vests.'
      ),
      result: t(
        "Un forage qui fonctionne au soleil : plus de carburant à acheter pour le pompage.",
        'A borehole that runs on the sun: no more fuel to buy for pumping.'
      ),
      gallery: ['thiambene-pose-panneau', 'thiambene-1', 'thiambene-2', 'thiambene-3', 'thiambene-4', 'thiambene-tete-forage', 'thiambene-5'],
      videos: [
        { file: 'thiambene-champ-solaire', poster: 'poster-thiambene-champ-solaire', title: t('Le champ solaire et le château d\'eau', 'The solar array and the water tower'), duration: '15 s' },
      ],
    },
    {
      slug: 'pompage-solaire-afrite-agro',
      title: t('Pompage solaire Afrite Agro', 'Afrite Agro solar pumping'),
      shortTitle: t('Pompage solaire Afrite Agro', 'Afrite Agro solar pumping'),
      category: t('Pompage solaire', 'Solar pumping'),
      place: 'Sénégal',
      image: 'champ-afriagro',
      summary: t(
        "Champ solaire au sol et pompage solaire installés pour Afrite Agro : structures, panneaux, raccordement et essais de débit à la sortie du forage.",
        'Ground-mounted solar array and solar pumping installed for Afrite Agro: structures, panels, wiring and flow tests at the borehole outlet.'
      ),
      specs: [
        [t('Client', 'Client'), 'Afrite Agro'],
        [t('Type', 'Type'), t('Pompage solaire', 'Solar pumping')],
        [t('Installation', 'Installation'), t('Champ solaire au sol', 'Ground-mounted array')],
        [t('Mise en service', 'Commissioning'), t('Essais de débit filmés', 'Flow tests filmed')],
      ],
      challenge: t(
        "Mettre en place un pompage alimenté par le soleil pour répondre aux besoins en eau d'Afrite Agro.",
        "Set up a sun-powered pumping system to meet Afrite Agro's water needs."
      ),
      solution: t(
        "Pose des structures en acier au sol, montage et câblage du champ de panneaux, équipement de la tête de forage et raccordement de la pompe solaire, avec les équipes SOLARIG sur le terrain du premier trou de scellement à la mise en eau.",
        'Steel ground structures, panel mounting and wiring, wellhead equipment and solar pump connection, with SOLARIG crews on site from the first foundation hole to first water.'
      ),
      result: t(
        "L'eau jaillit en sortie de tuyauterie : les essais de débit ont été réalisés et filmés lors de la mise en service.",
        'Water gushes from the outlet pipe: flow tests were carried out and filmed during commissioning.'
      ),
      gallery: ['afriagro-2', 'afriagro-3', 'afriagro-4', 'afriagro-5', 'afriagro-6', 'afriagro-structure'],
      videos: [
        { file: 'afriagro-debit', poster: 'poster-afriagro-debit', title: t('Essai de débit : sortie de l\'eau', 'Flow test: water coming out'), duration: '22 s' },
        { file: 'afriagro-mise-en-service', poster: 'poster-afriagro-mise-en-service', title: t('Mise en service du pompage', 'Pumping commissioning'), duration: '26 s' },
        { file: 'afriagro-champ-solaire', poster: 'poster-afriagro-champ-solaire', title: t('Le champ solaire au sol', 'The ground-mounted array'), duration: '12 s' },
      ],
    },
    {
      slug: 'centrales-solaires-agences-cbao',
      title: t('Centrales solaires des agences CBAO', 'Solar plants for CBAO branches'),
      shortTitle: t('Agences CBAO : 3 centrales solaires', 'CBAO branches: 3 solar plants'),
      category: t('Installation solaire', 'Solar installation'),
      place: 'Kédougou · Javelier · Kidira',
      image: null,
      visual: [['3', t('agences', 'branches')], ['113,64', 'kWc']],
      visualCaption: 'Kédougou · Javelier · Kidira',
      summary: t(
        "Trois centrales solaires hybrides avec injection pour des agences CBAO : de 35 à 40 kWc, avec onduleur hybride, onduleur d'injection de 30 kW et deux batteries lithium de 10 kWh.",
        'Three hybrid solar plants with grid injection for CBAO branches: from 35 to 40 kWp, with hybrid inverter, 30 kW injection inverter and two 10 kWh lithium batteries.'
      ),
      specs: [
        [t('Client', 'Client'), 'CBAO'],
        [t('Agences', 'Branches'), 'Kédougou, Javelier, Kidira'],
        [t('Puissance totale', 'Total capacity'), '113,64 kWc'],
        [t('Stockage', 'Storage'), t('2 × 10 kWh lithium par agence', '2 × 10 kWh lithium per branch')],
      ],
      intro: t(
        "SOLARIG a équipé trois agences CBAO d'une centrale solaire. Chaque site associe un champ de panneaux, un onduleur hybride, un onduleur d'injection de 30 kW et deux batteries lithium de 10 kWh, avec leurs accessoires de connexion et de protection.",
        'SOLARIG equipped three CBAO branches with a solar plant. Each site combines a solar array, a hybrid inverter, a 30 kW injection inverter and two 10 kWh lithium batteries, with their connection and protection accessories.'
      ),
      sites: {
        head: [t('Agence', 'Branch'), t('Champ solaire', 'Solar array'), t('Onduleur hybride', 'Hybrid inverter'), t("Onduleur d'injection", 'Injection inverter'), t('Batteries lithium', 'Lithium batteries'), t('Accessoires', 'Accessories')],
        rows: [
          ['Kédougou', '40 kWc', '5 kW', '30 kW', '2 × 10 kWh', t('Connexion', 'Connection')],
          ['Javelier', '38,64 kWc', '16 kW', '30 kW', '2 × 10 kWh', t('Câblage et protection', 'Cabling and protection')],
          ['Kidira', '35 kWc', '5 kW', '30 kW', '2 × 10 kWh', t('Connexion', 'Connection')],
        ],
      },
    },
    {
      slug: 'pompage-solaire-keur-momar-sarr',
      title: t('Pompage solaire à Keur Momar Sarr', 'Solar pumping in Keur Momar Sarr'),
      shortTitle: t('Pompage solaire Keur Momar Sarr', 'Keur Momar Sarr solar pumping'),
      category: t('Pompage solaire', 'Solar pumping'),
      place: 'Keur Momar Sarr',
      image: null,
      visual: [['37,26', 'kWc'], ['22', 'kW']],
      visualCaption: t('54 panneaux · pompe de surface', '54 panels · surface pump'),
      summary: t(
        "Pompe de surface de 22 kW alimentée par un champ solaire de 54 panneaux de 690 W (37,26 kWc).",
        '22 kW surface pump powered by a solar array of 54 panels of 690 W (37.26 kWp).'
      ),
      specs: [
        [t('Localité', 'Location'), 'Keur Momar Sarr'],
        [t('Champ solaire', 'Solar array'), '54 × 690 W (37,26 kWc)'],
        [t('Pompe', 'Pump'), t('Pompe de surface 22 kW', '22 kW surface pump')],
        [t('Type', 'Type'), t('Pompage solaire', 'Solar pumping')],
      ],
      intro: t(
        "Installation d'un pompage solaire dans la zone de Keur Momar Sarr : une pompe de surface de 22 kW alimentée par 54 panneaux de 690 W.",
        'Installation of a solar pumping system in the Keur Momar Sarr area: a 22 kW surface pump powered by 54 panels of 690 W.'
      ),
      equipment: [
        t('54 panneaux solaires de 690 W (37,26 kWc)', '54 solar panels of 690 W (37.26 kWp)'),
        t('Pompe de surface de 22 kW', '22 kW surface pump'),
      ],
    },
    {
      slug: 'installation-solaire-hybride-diamaguene',
      title: t('Installation solaire hybride à Diamaguène, Thiès', 'Hybrid solar installation in Diamaguène, Thiès'),
      shortTitle: t('Installation hybride Diamaguène', 'Diamaguène hybrid installation'),
      category: t('Installation solaire', 'Solar installation'),
      place: 'Diamaguène, Thiès',
      image: null,
      visual: [['5,8', 'kWc'], ['15', 'kWh']],
      visualCaption: t('Onduleur hybride 8 kW · batterie lithium', '8 kW hybrid inverter · lithium battery'),
      summary: t(
        "Une installation qui permet de produire, stocker et utiliser l'énergie solaire : 10 panneaux de 580 W, onduleur hybride de 8 kW, batterie lithium de 15 kWh et coffret de protection.",
        'An installation that produces, stores and uses solar energy: 10 panels of 580 W, an 8 kW hybrid inverter, a 15 kWh lithium battery and a protection box.'
      ),
      specs: [
        [t('Localité', 'Location'), 'Diamaguène, Thiès'],
        [t('Champ solaire', 'Solar array'), '10 × 580 W (5,8 kWc)'],
        [t('Onduleur', 'Inverter'), t('Hybride 8 kW', 'Hybrid 8 kW')],
        [t('Stockage', 'Storage'), t('Batterie lithium 15 kWh', '15 kWh lithium battery')],
      ],
      intro: t(
        "Une installation a été réalisée à Diamaguène (Thiès). Elle permet de produire, stocker et utiliser l'énergie solaire.",
        'An installation was completed in Diamaguène (Thiès). It produces, stores and uses solar energy.'
      ),
      equipment: [
        t('10 panneaux solaires de 580 W', '10 solar panels of 580 W'),
        t('Onduleur hybride de 8 kW', '8 kW hybrid inverter'),
        t('Batterie lithium de 15 kWh', '15 kWh lithium battery'),
        t('Coffret de protection', 'Protection box'),
      ],
    },
  ];

  // ---------- Partenaires ----------
  partners = {
    clients: [['senico', 'Senico'], ['patisen', 'Patisen'], ['terranga-farms', 'Terranga Farms Sénégal'], ['grips', 'GRIPS'], ['mp-energy', 'MP Energy'], ['tumiqui', t('Tumiqui Japon', 'Tumiqui Japan')]],
    institutions: [['senelec', 'Senelec'], ['aner', 'ANER'], ['isep-thies', 'ISEP Thiès'], ['eranove', 'Eranove'], ['felicity', 'Felicity Solar'], ['solarx', 'SolarX'], ['infraenergy', 'Infranergy'], ['afreenergy', 'Afreenergy'], ['deye', 'Deye']],
  };

  steps = [
    [t('Visite et test de débit', 'Visit and flow test'), t("Un technicien vient sur place, mesure le niveau dynamique et le débit du forage, relève votre besoin.", 'A technician visits the site, measures the dynamic level and borehole flow, and surveys your need.')],
    [t('Dimensionnement et devis', 'Sizing and quote'), t("Nous calculons la pompe et le champ solaire justes et vous remettons un devis détaillé.", 'We calculate the right pump and solar array and give you a detailed quote.')],
    [t('Fourniture du matériel', 'Equipment supply'), t('Pompes, panneaux, câbles, colonnes : matériel disponible en stock, livré sur site.', 'Pumps, panels, cables, pipes: equipment in stock, delivered to site.')],
    [t('Installation et mise en service', 'Installation and commissioning'), t("Pose, raccordement et essai de débit par nos équipes, avec prise en main.", 'Installation, wiring and flow test by our teams, with a hands-on handover.')],
    [t('Suivi et maintenance', 'Follow-up and maintenance'), t('Contrôles, dépannage rapide et pièces disponibles.', 'Checks, fast repairs and spare parts available.')],
  ];

  whyUs = [
    ['box', t('Matériel disponible en stock', 'Equipment in stock'), t('Pompes, câbles, colonnes et panneaux importés : toutes les gammes de pompes immergées sont disponibles.', 'Imported pumps, cables, pipes and panels: every range of submersible pumps is available.')],
    ['chart', t("L'avis d'un ingénieur", "An engineer's opinion"), t("Un ingénieur consultant en énergie dimensionne chaque projet : on vend la solution juste, pas la plus chère.", 'An energy consulting engineer sizes every project: we sell the right solution, not the priciest.')],
    ['wrench', t('Clé en main', 'Turnkey'), t("De l'étude à la mise en eau : fourniture, pose, câblage, essai de débit, formation à l'usage.", 'From study to first water: supply, installation, wiring, flow test, user training.')],
    ['shield', t('Un SAV réactif', 'Responsive after-sales'), t('Trois agences, à Dakar, Thiès et Tivaouane, pour intervenir vite et fournir les pièces.', 'Three offices, in Dakar, Thiès and Tivaouane, to respond fast and supply parts.')],
  ];

  stats = [
    ['1,5–22', 'kW', t('de la pompe hybride 1 500 W à la 22 kW', 'from the 1,500 W hybrid to the 22 kW pump')],
    ['160', 'm', t('de hauteur manométrique maximale au catalogue', 'maximum head in the catalogue')],
    ['3', t('agences', 'offices'), t('à Dakar, Thiès et Tivaouane', 'in Dakar, Thiès and Tivaouane')],
    ['2017', '', t('année d’immatriculation au RCCM de Thiès', 'year of registration at the Thiès trade register')],
  ];

  aboutValues = [
    [t('Importer au bon prix', 'Import at the right price'), t("Nous importons directement pompes, panneaux, câbles et colonnes pour vous proposer un matériel adapté au terrain sénégalais.", 'We import pumps, panels, cables and pipes directly to offer equipment suited to Senegalese conditions.')],
    [t('Dimensionner juste', 'Size it right'), t("Une pompe trop petite ne remplit pas le bassin, une pompe trop grande gaspille de l'argent : nous partons de vos besoins réels.", 'A pump that is too small will not fill the basin, one that is too big wastes money: we start from your real needs.')],
    [t('Installer proprement', 'Install cleanly'), t("Structures solides, câblage soigné, local technique signalé : un chantier qui dure.", 'Solid structures, tidy wiring, labelled technical room: a site that lasts.')],
    [t('Rester disponible', 'Stay available'), t("Une installation vit longtemps si elle est suivie : nous restons joignables après la mise en service.", 'An installation lasts if it is followed: we stay reachable after commissioning.')],
  ];

  // ---------- FAQ ----------
  faq = [
    {
      title: t('Pompage solaire', 'Solar pumping'),
      items: [
        [t('Comment choisir la bonne pompe solaire pour mon forage ?', 'How do I choose the right solar pump for my borehole?'),
          t("Il faut connaître trois chiffres : le volume d'eau nécessaire par jour (m³/j), la hauteur manométrique totale (profondeur de pompage + pertes + hauteur de refoulement) et le débit du forage. Avec ces données, nous retenons la pompe (hybride AC/DC 1 500 W, DC 3 000 W, hybride 22 kW, 4SD12/32, 6SP46/7…) et dimensionnons le champ solaire. Notre <a href=\"pompage-solaire.html#simulateur\">outil de pré-dimensionnement</a> donne une première estimation ; une visite et un test de débit confirment.",
            "You need three figures: the daily water volume (m³/day), the total dynamic head (pumping depth + losses + discharge height) and the borehole yield. With these, we choose the pump (hybrid AC/DC 1,500 W, DC 3,000 W, 22 kW hybrid, 4SD12/32, 6SP46/7…) and size the solar array. Our <a href=\"pompage-solaire.html#simulateur\">pre-sizing tool</a> gives a first estimate; a visit and flow test confirm it.")],
        [t("Une pompe solaire fonctionne-t-elle la nuit ou par temps nuageux ?", "Does a solar pump work at night or on cloudy days?"),
          t("Une pompe solaire pompe quand il y a du soleil : c'est pourquoi on stocke l'eau dans un bassin ou un château d'eau plutôt que l'électricité. Les modèles hybrides AC/DC (1 500 W, 22 kW) peuvent aussi fonctionner sur le secteur ou un groupe lorsque c'est nécessaire.",
            "A solar pump pumps when the sun shines, which is why we store water in a basin or water tower rather than electricity. Hybrid AC/DC models (1,500 W, 22 kW) can also run on mains or a generator when needed.")],
        [t("Quelle est la différence entre une pompe DC, AC et hybride AC/DC ?", "What is the difference between a DC, AC and hybrid AC/DC pump?"),
          t("Une pompe DC se branche directement sur le champ solaire. Une pompe AC (comme les 4SD12/32 et 6SP46/7) fonctionne sur secteur, groupe ou onduleur de pompage. Une pompe hybride AC/DC accepte les deux sources : solaire en journée, secteur au besoin.",
            "A DC pump connects straight to the solar array. An AC pump (such as the 4SD12/32 and 6SP46/7) runs on mains, a generator or a pumping inverter. A hybrid AC/DC pump accepts both: solar by day, mains when needed.")],
        [t("Pouvez-vous équiper un forage existant ?", "Can you equip an existing borehole?"),
          t("Oui. Nous mesurons le niveau dynamique et le débit, puis proposons la pompe, les colonnes PVC, le câble submersible et le champ solaire adaptés — comme sur le forage de Thiabénne Samb.",
            "Yes. We measure the dynamic level and yield, then propose the right pump, PVC column pipes, submersible cable and solar array — as on the Thiabénne Samb borehole.")],
      ],
    },
    {
      title: t('Produits et fourniture', 'Products and supply'),
      items: [
        [t('Vendez-vous le matériel seul, sans installation ?', 'Do you sell equipment without installation?'),
          t("Oui. SOLARIG est importateur et fournisseur : installateurs, entreprises de forage, revendeurs et particuliers peuvent acheter pompes, câbles, colonnes et panneaux. Demandez un prix sur WhatsApp, nous répondons avec disponibilité et conditions.",
            "Yes. SOLARIG is an importer and supplier: installers, drilling companies, resellers and individuals can buy pumps, cables, pipes and panels. Ask for a price on WhatsApp and we reply with availability and terms.")],
        [t("Quelles pompes avez-vous au catalogue ?", "Which pumps are in your catalogue?"),
          t("Hybride AC/DC 1 500 W (16 m³/h, 70 m), hybride AC/DC 22 kW (jusqu'à 1 833 L/min), DC 3 000 W (28 m³/h, 55 m), immergées de forage 4SD12/32 (7,5 kW, jusqu'à 160 m) et 6SP46/7 (11 kW, 600-1 000 L/min), et pompe de piscine hybride 1 500 W (25 m³/h). D'autres gammes sont disponibles sur demande. Voir le <a href=\"catalogue.html\">catalogue complet</a>.",
            "Hybrid AC/DC 1,500 W (16 m³/h, 70 m), hybrid AC/DC 22 kW (up to 1,833 L/min), DC 3,000 W (28 m³/h, 55 m), 4SD12/32 borehole pumps (7.5 kW, up to 160 m) and 6SP46/7 (11 kW, 600-1,000 L/min), and a 1,500 W hybrid pool pump (25 m³/h). Other ranges are available on request. See the <a href=\"catalogue.html\">full catalogue</a>.")],
        [t("Quelle garantie sur les pompes ?", "What warranty do the pumps carry?"),
          t("La pompe immergée 4SD12/32 est garantie 12 mois contre tout défaut de fabrication. Les conditions des autres références vous sont communiquées avec le devis.",
            "The 4SD12/32 submersible pump carries a 12-month warranty against manufacturing defects. Terms for other references are given with the quote.")],
        [t("Livrez-vous partout au Sénégal ?", "Do you deliver across Senegal?"),
          t("Nous livrons le matériel sur site et intervenons depuis nos trois agences, à Dakar, à Thiès et à Tivaouane. Précisez votre localité dans la demande de devis.",
            "We deliver equipment to site and operate from our three offices, in Dakar, Thiès and Tivaouane. Mention your location in the quote request.")],
      ],
    },
    {
      title: t('Installation et solaire', 'Installation and solar'),
      items: [
        [t("Que comprend une installation clé en main ?", "What does a turnkey installation include?"),
          t("L'étude, la fourniture du matériel, la pose des structures et des panneaux, le câblage et les protections, la mise en service avec essai de débit (pour un pompage) et la prise en main. Un rapport d'intervention vous est remis.",
            "The study, equipment supply, installation of structures and panels, wiring and protections, commissioning with a flow test (for pumping) and handover. You receive an intervention report.")],
        [t("Que sont les panneaux bifaciaux ?", "What are bifacial panels?"),
          t("Ils produisent de l'énergie sur leurs deux faces : la face arrière capte la lumière réfléchie par le sol. Résultat : plus de puissance pour une même surface, surtout sur un champ au sol.",
            "They generate energy on both sides: the rear face captures light reflected from the ground. The result is more power for the same area, especially on a ground-mounted array.")],
        [t('Installez-vous des systèmes solaires pour les maisons ?', 'Do you install solar systems for homes?'),
          t("Oui. SOLARIG réalise aussi des installations résidentielles : panneaux, onduleur hybride, batterie lithium et coffret de protection pour produire, stocker et utiliser l'énergie solaire chez soi, comme à <a href=\"projet-installation-solaire-hybride-diamaguene.html\">Diamaguène</a>.",
            'Yes. SOLARIG also carries out residential installations: panels, hybrid inverter, lithium battery and protection box to produce, store and use solar energy at home, as in <a href=\"projet-installation-solaire-hybride-diamaguene.html\">Diamaguène</a>.')],
        [t("Faites-vous la maintenance après l'installation ?", "Do you provide maintenance after installation?"),
          t("Oui : nettoyage des panneaux, contrôle des serrages et des protections, vérification du débit, diagnostic de panne et remplacement de composants.",
            "Yes: panel cleaning, checking of torque and protections, flow verification, fault diagnosis and component replacement.")],
        [t("Comment demander un devis ?", "How do I request a quote?"),
          t("Par WhatsApp au +221 76 440 97 04, par e-mail à info@solarig.sn ou avec le <a href=\"contact.html#devis\">formulaire de devis</a>. Décrivez votre besoin (volume d'eau, profondeur, type de site) et votre localité.",
            "By WhatsApp on +221 76 440 97 04, by email at info@solarig.sn or with the <a href=\"contact.html#devis\">quote form</a>. Describe your need (water volume, depth, type of site) and your location.")],
      ],
    },
  ];

  // ---------- Pages villes ----------
  cities = [
    {
      slug: 'dakar',
      city: 'Dakar',
      agency: company.agencies[0],
      title: t('Pompage et énergie solaire à Dakar — agence SOLARIG', 'Solar pumping and energy in Dakar — SOLARIG office'),
      excerpt: t("Agence SOLARIG à Dakar (HLM 5) : pompes solaires, panneaux, câbles et colonnes en stock, installation et conseil d'un ingénieur.", 'SOLARIG office in Dakar (HLM 5): solar pumps, panels, cables and pipes in stock, installation and engineer advice.'),
      image: 'onduleurs-local',
      hook: t("À Dakar, SOLARIG vous reçoit à l'agence de HLM 5 pour choisir votre matériel, demander une étude ou organiser une installation, en ville comme dans les Niayes et la banlieue.", 'In Dakar, SOLARIG welcomes you at the HLM 5 office to choose your equipment, request a study or plan an installation, in the city as well as in the Niayes and the suburbs.'),
      highlights: [
        [t('Fourniture de matériel', 'Equipment supply'), t('Pompes immergées, panneaux bifaciaux, câbles submersibles et colonnes PVC, avec fiches techniques et prix sur demande.', 'Submersible pumps, bifacial panels, submersible cables and PVC pipes, with datasheets and prices on request.')],
        [t('Pompage pour maraîchage et jardins', 'Pumping for market gardens and gardens'), t("Pompes solaires et hybrides pour forages et puits : arrosage, bassins et petites exploitations.", 'Solar and hybrid pumps for boreholes and wells: watering, basins and small farms.')],
        [t('Installation solaire', 'Solar installation'), t('Panneaux, onduleurs hybrides et batteries pour maisons, commerces et PME.', 'Panels, hybrid inverters and batteries for homes, shops and SMEs.')],
        [t('Pompes de piscine', 'Pool pumps'), t('Pompe solaire piscine hybride 1 500 W et pompes de surface disponibles.', 'Hybrid 1,500 W solar pool pump and surface pumps available.')],
      ],
      faq: [
        [t("Où se trouve l'agence de Dakar ?", 'Where is the Dakar office?'), t("À HLM 5, Villa 2311, Dakar. Appelez le +221 76 440 97 04 avant de passer pour vérifier la disponibilité du matériel.", 'At HLM 5, Villa 2311, Dakar. Call +221 76 440 97 04 before visiting to check equipment availability.')],
        [t('Pouvez-vous intervenir en banlieue et dans les Niayes ?', 'Can you operate in the suburbs and the Niayes?'), t("Oui : précisez votre localité dans la demande de devis, nous organisons la visite technique.", 'Yes: state your location in the quote request and we organise the technical visit.')],
      ],
    },
    {
      slug: 'thies',
      city: 'Thiès',
      agency: company.agencies[1],
      title: t('Pompage et énergie solaire à Thiès — agence SOLARIG', 'Solar pumping and energy in Thiès — SOLARIG office'),
      excerpt: t("Agence SOLARIG à Thiès (Parcelles Unité 5, Hersent) : stock de pompes, câbles et colonnes, chantiers de forage solaire dans la région.", 'SOLARIG office in Thiès (Parcelles Unité 5, Hersent): stock of pumps, cables and pipes, solar borehole projects in the region.'),
      image: 'thiambene-3',
      hook: t("Thiès est le point d'ancrage de SOLARIG : immatriculée au RCCM de Thiès en 2017, l'entreprise y reçoit ses clients et intervient sur les forages et exploitations de la région.", 'Thiès is SOLARIG’s home base: registered at the Thiès trade register in 2017, the company welcomes customers here and works on boreholes and farms across the region.'),
      highlights: [
        [t('Forages solaires', 'Solar boreholes'), t("Équipement complet de forages villageois et agricoles : pompe, colonnes, câble, champ solaire.", 'Full equipment of village and agricultural boreholes: pump, pipes, cable, solar array.')],
        [t('Stock et retrait', 'Stock and pick-up'), t('Pompes, câbles submersibles et colonnes PVC disponibles pour les installateurs et entreprises de la région.', 'Pumps, submersible cables and PVC pipes available for installers and companies in the region.')],
        [t('Installation solaire', 'Solar installation'), t('Panneaux, onduleurs et batteries pour maisons, fermes et ateliers.', 'Panels, inverters and batteries for homes, farms and workshops.')],
        [t('Dépannage et pièces', 'Repairs and parts'), t('Diagnostic, remplacement de pompe ou de contrôleur, pièces disponibles.', 'Diagnosis, pump or controller replacement, parts available.')],
      ],
      faq: [
        [t("Où se trouve l'agence de Thiès ?", 'Where is the Thiès office?'), t("À Parcelles Unité 5, Hersent, Rue 17, Thiès. Appelez le +221 76 440 97 04 avant de venir.", 'At Parcelles Unité 5, Hersent, Rue 17, Thiès. Call +221 76 440 97 04 before visiting.')],
        [t('Avez-vous déjà équipé des forages dans la région ?', 'Have you already equipped boreholes in the region?'), t("Oui, voir le <a href=\"projet-forage-solaire-thiabenne-samb.html\">forage 100 % solaire de Thiabénne Samb</a> le <a href=\"projet-pompage-solaire-afrite-agro.html\">pompage solaire Afrite Agro</a> et l'<a href=\"projet-installation-solaire-hybride-diamaguene.html\">installation hybride de Diamaguène</a>.", 'Yes, see the <a href="projet-forage-solaire-thiabenne-samb.html">100% solar borehole in Thiabénne Samb</a>, the <a href="projet-pompage-solaire-afrite-agro.html">Afrite Agro solar pumping</a> and the <a href="projet-installation-solaire-hybride-diamaguene.html">Diamaguène hybrid installation</a>.')],
      ],
    },
    {
      slug: 'tivaouane',
      city: 'Tivaouane',
      agency: company.agencies[2],
      title: t('Pompage et énergie solaire à Tivaouane — agence SOLARIG', 'Solar pumping and energy in Tivaouane — SOLARIG office'),
      excerpt: t("Agence SOLARIG à Tivaouane : pompes solaires, panneaux, câbles et colonnes, installations résidentielles et conseil d'un ingénieur.", 'SOLARIG office in Tivaouane: solar pumps, panels, cables and pipes, residential installations and engineer advice.'),
      image: 'afriagro-4',
      hook: t("SOLARIG est présente à Tivaouane avec sa troisième agence, pour accompagner les particuliers, les agriculteurs et les entreprises de la zone : choix du matériel, étude, installation et dépannage.", 'SOLARIG is present in Tivaouane with its third office, to support individuals, farmers and businesses in the area: equipment selection, study, installation and repairs.'),
      highlights: [
        [t('Installations résidentielles', 'Residential installations'), t("Panneaux, onduleur hybride, batterie lithium et coffret de protection pour produire, stocker et utiliser l'énergie solaire chez vous.", 'Panels, hybrid inverter, lithium battery and protection box to produce, store and use solar energy at home.')],
        [t('Pompage solaire', 'Solar pumping'), t("Pompes solaires et de forage, câbles submersibles, colonnes PVC et champ solaire pour forages et exploitations.", 'Solar and borehole pumps, submersible cables, PVC pipes and solar array for boreholes and farms.')],
        [t('Fourniture de matériel', 'Equipment supply'), t('Pompes, panneaux bifaciaux, câbles et colonnes, avec fiches techniques et prix sur demande.', 'Pumps, bifacial panels, cables and pipes, with datasheets and prices on request.')],
        [t('Dépannage et pièces', 'Repairs and parts'), t('Diagnostic, remplacement de pompe ou de contrôleur, pièces disponibles.', 'Diagnosis, pump or controller replacement, parts available.')],
      ],
      faq: [
        [t("Où se trouve l'agence de Tivaouane ?", 'Where is the Tivaouane office?'), t("À Tivaouane. Appelez le +221 76 440 97 04 ou écrivez sur WhatsApp pour obtenir l'adresse exacte et vérifier la disponibilité du matériel avant de venir.", 'In Tivaouane. Call +221 76 440 97 04 or message us on WhatsApp for the exact address and to check equipment availability before visiting.')],
        [t('Pouvez-vous intervenir autour de Tivaouane ?', 'Can you operate around Tivaouane?'), t("Oui : précisez votre localité dans la demande de devis, nous organisons la visite technique.", 'Yes: state your location in the quote request and we organise the technical visit.')],
      ],
    },
  ];
}

export function setLang(l) {
  lang = l;
  build();
}

build();
