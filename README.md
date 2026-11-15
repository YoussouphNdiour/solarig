# Site SOLARIG (statique, bilingue FR/EN)

- Source : `src/` (données `data.mjs`, composants, gabarit) · CSS `public/assets/css/style.css` · JS `public/assets/js/main.js`
- Build : `node build.mjs` → pages dans `public/` (FR) et `public/en/` (EN), + `sitemap.xml`, `robots.txt`, `llms.txt`. La CSS est minifiée et inlinée dans chaque page.
- Aucune dépendance npm. Polices Sora et Manrope auto-hébergées (`public/assets/fonts/`), aucun script ni police tiers.
- Contenu à modifier : catalogue, services, FAQ et pages villes dans `src/data.mjs` (chaque texte existe en FR et EN via `t('fr','en')`).
- Images : `public/assets/img/` (+ variantes `-800.webp`) ; après ajout d'images, régénérer `src/img-manifest.json` (script `_work/variants.py`).
- Déploiement cPanel : `.cpanel.yml` copie `public/` vers `~/solarig.sn/`.
