const { readToken } = require('../services/adminAuth');

function requireAdmin(req, res, next) {
  const header = req.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const payload = readToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Sign in required' });
  }
  req.admin = payload;
  return next();
}

module.exports = requireAdmin;
