/**
 * Brand name from an image path, for descriptive alt text:
 * "/paper_product/paidika/sakoula-kid-club-2.webp" → "Kid Club",
 * "/product_bags/navy_and_green.webp" → "Navy And Green".
 */
export const brandFromSrc = (src: string): string =>
  (src.split('/').pop() || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^sakoula-/, '')
    .replace(/-\d+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());
