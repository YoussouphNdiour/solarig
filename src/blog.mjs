// Articles du blog SOLARIG : deux fichiers de rédaction (blog-a, blog-b) fusionnés ici.
// FR et EN ont les mêmes articles dans le même ordre (slugs différents) : le sitemap les apparie par rang.
import * as A from './blog-a.mjs';
import * as B from './blog-b.mjs';

export const blogFr = [...A.articlesFr, ...B.articlesFr];
export const blogEn = [...A.articlesEn, ...B.articlesEn];
export const getArticles = (l) => (l === 'en' ? blogEn : blogFr);
