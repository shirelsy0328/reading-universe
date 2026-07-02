/**
 * Theory Desk 品牌门店主页
 * 暂无独立域名时使用站内临时页 /theory-desk
 * 注册域名后在 .env.local 设置 NEXT_PUBLIC_THEORY_DESK_URL 即可切换
 */
export const THEORY_DESK_URL =
  process.env.NEXT_PUBLIC_THEORY_DESK_URL ?? "/theory-desk";

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
