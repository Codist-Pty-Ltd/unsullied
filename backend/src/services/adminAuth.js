const crypto = require('crypto');

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function safeEqual(leftValue, rightValue) {
  const left = Buffer.from(String(leftValue));
  const right = Buffer.from(String(rightValue));
  if (left.length !== right.length) {
    crypto.timingSafeEqual(left, left);
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function credentialsMatch(email, password) {
  const expectedEmail = process.env.ADMIN_EMAIL || '';
  const expectedPassword = process.env.ADMIN_PASSWORD || '';
  if (!expectedEmail || !expectedPassword || !process.env.ADMIN_TOKEN_SECRET) {
    return false;
  }
  const emailOk = safeEqual(String(email || '').trim().toLowerCase(), expectedEmail.trim().toLowerCase());
  const passwordOk = safeEqual(String(password || ''), expectedPassword);
  return emailOk && passwordOk;
}

function signToken(email) {
  const payload = {
    sub: email,
    exp: Date.now() + TOKEN_TTL_MS
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', process.env.ADMIN_TOKEN_SECRET)
    .update(body)
    .digest('base64url');
  return { token: `${body}.${signature}`, expiresAt: payload.exp };
}

function readToken(token) {
  if (!token || !process.env.ADMIN_TOKEN_SECRET) return null;
  const [body, signature] = String(token).split('.');
  if (!body || !signature) return null;

  const expected = crypto
    .createHmac('sha256', process.env.ADMIN_TOKEN_SECRET)
    .update(body)
    .digest('base64url');
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !crypto.timingSafeEqual(given, wanted)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = {
  credentialsMatch,
  signToken,
  readToken
};
