import crypto from 'crypto';

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'kdadvocate85';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kdadvocateo$85153$';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'kd-law-admin-secret-2026-secure-session-key';

export const ADMIN_COOKIE_NAME = 'kd_admin_session';

export function signAdminToken(username: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days validity
  const payload = `${username}:${expiresAt}`;
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const raw = Buffer.from(token, 'base64').toString('utf8');
    const [user, expStr, signature] = raw.split(':');
    const exp = parseInt(expStr, 10);

    if (!user || !exp || !signature) return false;
    if (Date.now() > exp) return false;
    if (user !== ADMIN_USERNAME) return false;

    const expectedSignature = crypto.createHmac('sha256', ADMIN_SECRET).update(`${user}:${exp}`).digest('hex');
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
