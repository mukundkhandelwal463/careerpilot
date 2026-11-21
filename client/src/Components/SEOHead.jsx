import { useEffect } from 'react';

const SITE_URL = 'https://careerpilot.website';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

const setMetaTag = (attr, key, value) => {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const setCanonicalLink = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

/**
 * Dynamic per-route SEO, AEO & GEO head manager.
 * Sets title, description, canonical, robots, Open Graph, Twitter/X Cards,
 * and route-specific JSON-LD structured data (Breadcrumbs, FAQPage, Article, etc.).
 */
const SEOHead = ({
  title,
  description,
  path = '/',
  noIndex = false,
  ogType = 'website',
  image = DEFAULT_IMAGE,
  keywords,
  breadcrumbs = [],
  jsonLd = null
}) => {
  useEffect(() => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath.replace(/\/+$/, '')}`;
    const fullTitle = title
      ? (title.includes('CareerPilot') ? title : `${title} | CareerPilot`)
      : 'CareerPilot — AI ATS Resume Screener, LaTeX Builder & Mock Interview Platform';

    document.title = fullTitle;

    if (description) {
      setMetaTag('name', 'description', description);
    }
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    setMetaTag(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    setCanonicalLink(canonicalUrl);

    // Open Graph
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description || '');
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', 'CareerPilot');

    // Twitter / X Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description || '');
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:image', image);

    // Route-specific JSON-LD injection
    const injectedScripts = [];

    const injectJsonLd = (schemaObj, idSuffix) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-dynamic', idSuffix);
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
      injectedScripts.push(script);
    };

    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      injectJsonLd(
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: crumb.name,
            item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`
          }))
        },
        'breadcrumb'
      );
    }

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => injectJsonLd(schema, `schema-${i}`));
    }

    return () => {
      injectedScripts.forEach((s) => {
        if (s.parentNode) s.parentNode.removeChild(s);
      });
    };
  }, [title, description, path, noIndex, ogType, image, keywords, JSON.stringify(breadcrumbs), JSON.stringify(jsonLd)]);

  return null;
};

export default SEOHead;
