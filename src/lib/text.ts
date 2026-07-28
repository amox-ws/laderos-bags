/** Words that carry no meaning for the comparison below. */
const STOPWORDS = new Set([
  // Greek
  'μας', 'μου', 'σας', 'του', 'της', 'των', 'τον', 'την', 'στη', 'στο', 'στα', 'στην', 'στον',
  'και', 'για', 'που', 'από', 'απο', 'είναι', 'ειναι', 'με', 'σε', 'το', 'τα', 'οι', 'ένα', 'ενα',
  // English
  'the', 'our', 'and', 'for', 'with', 'your', 'you', 'from', 'are', 'this', 'that',
]);

/** Lowercase, strip accents and punctuation, split into words. */
const words = (s: string): string[] =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);

/**
 * Crude stem: keep the first 5 characters of each meaningful word. This makes
 * Greek inflections match (προσφορά / προσφοράς, παραγωγή / παραγωγής) without
 * pulling in a full stemming library.
 */
const stems = (s: string): Set<string> =>
  new Set(
    words(s)
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w))
      .map((w) => w.slice(0, 5))
  );

/**
 * True when the eyebrow label repeats a word that already appears in the
 * heading right below it — e.g. "[ Η ΠΑΡΑΓΩΓΗ ]" above "Η ΠΑΡΑΓΩΓΗ ΜΑΣ".
 * Used to hide the label instead of showing the same word twice.
 */
export const eyebrowIsRedundant = (eyebrow?: string, heading?: string): boolean => {
  if (!eyebrow || !heading) return false;
  const e = stems(eyebrow);
  if (e.size === 0) return false;
  const h = stems(heading);
  for (const stem of e) {
    if (h.has(stem)) return true;
  }
  return false;
};
