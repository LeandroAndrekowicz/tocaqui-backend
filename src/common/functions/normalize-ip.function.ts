export function normalizeIp(ip: string): string {
  return ip.replace(/^::ffff:/, '');
}