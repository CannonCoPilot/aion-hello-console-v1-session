/**
 * Transform utility functions for text manipulation
 */

/**
 * Convert text to URL-friendly slug
 * @param {string} text - Input text
 * @returns {string} Slugified text
 */
export function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Collapse multiple hyphens
    .replace(/^-|-$/g, '');         // Trim leading/trailing hyphens
}

/**
 * Reverse the characters in text
 * @param {string} text - Input text
 * @returns {string} Reversed text
 */
export function reverse(text) {
  if (!text) return '';
  return text.split('').reverse().join('');
}

/**
 * Convert text to uppercase
 * @param {string} text - Input text
 * @returns {string} Uppercased text
 */
export function uppercase(text) {
  if (!text) return '';
  return text.toUpperCase();
}

/**
 * Count words in text
 * @param {string} text - Input text
 * @returns {string} Word count as "N word(s)"
 */
export function wordCount(text) {
  if (!text || !text.trim()) return '0 words';
  const count = text.trim().split(/\s+/).length;
  return count === 1 ? '1 word' : `${count} words`;
}

/**
 * Dispatch to appropriate transform function
 * @param {string} text - Input text
 * @param {string} operation - Operation name
 * @returns {string} Transformed text
 */
export function transform(text, operation) {
  switch (operation) {
    case 'slugify':
      return slugify(text);
    case 'reverse':
      return reverse(text);
    case 'uppercase':
      return uppercase(text);
    case 'wordCount':
      return wordCount(text);
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}
