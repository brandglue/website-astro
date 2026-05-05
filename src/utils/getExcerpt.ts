/**
 * Strips markdown/MDX syntax from raw body text and returns a plain-text excerpt.
 */
export function getExcerpt(body: string, length = 300): string {
  const plain = body
    // Remove images: ![alt](src) or ![](src)
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links but keep text: [text](href)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove headings markers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic markers
    .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, '$2')
    // Remove blockquote markers
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Remove import/export statements (MDX)
    .replace(/^(import|export)\s+.+$/gm, '')
    // Unescape markdown-escaped characters (e.g. \> \* \_ \[ \])
    .replace(/\\(.)/g, '$1')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= length) return plain;

  // Truncate at the last word boundary before the limit
  const truncated = plain.slice(0, length);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
}
