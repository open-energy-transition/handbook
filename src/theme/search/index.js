import React from 'react';
import OriginalSearch from '@easyops-cn/docusaurus-search-local/lib/theme/Search';
import addBaseUrl from '@docusaurus/useBaseUrl';

function normalizeHref(href) {
  if (!href) return href;
  // Ensure href is an absolute site path starting with baseUrl (e.g., /handbook/)
  const base = addBaseUrl('/');
  // If href already contains base multiple times, collapse duplicates
  href = href.replace(new RegExp(`^(${base})+`), base);
  // If href is relative (no leading '/'), prepend a single base
  if (!href.startsWith('/')) href = base + href;
  return href;
}

export default function SafeSearch(props) {
  const pluginData = props.pluginData || {};
  const search = pluginData.search?.map((hit) => {
    if (!hit) return hit;
    // normalize both href and permalink if present
    return {
      ...hit,
      href: normalizeHref(hit.href || hit.permalink || ''),
      permalink: normalizeHref(hit.permalink || hit.href || ''),
    };
  });

  return <OriginalSearch {...props} pluginData={{ ...pluginData, search }} />;
}
