/** 将书籍评分（10 分制或 5 分制）转换为 5 颗心标准 */
export function toHeartScore(rating: number): number {
  const score = rating <= 5 ? rating : rating / 2;
  return Math.min(5, Math.max(0, score));
}
