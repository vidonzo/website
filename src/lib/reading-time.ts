/**
 * Rough reading time in minutes.
 *
 * Word counting by whitespace is meaningless for Chinese, Japanese and Thai,
 * and merely imprecise for Persian and Arabic — so scripts without spaces are
 * counted by character instead. The number is a hint, not a measurement.
 */
export function readingTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '') // fenced code
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links and images
    .replace(/[#>*_`~-]/g, ' ');

  const cjk = (text.match(/[぀-ヿ㐀-鿿฀-๿]/g) ?? []).length;
  const words = text.split(/\s+/).filter(Boolean).length;

  const minutes = cjk > words ? cjk / 400 : words / 220;
  return Math.max(1, Math.round(minutes));
}
