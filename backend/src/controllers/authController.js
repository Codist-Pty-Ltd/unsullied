const { credentialsMatch, signToken } = require('../services/adminAuth');

class AuthController {
  login(req, res) {
    const configured = process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_TOKEN_SECRET;
    if (!configured) {
      return res.status(503).json({ error: 'Admin login is not configured' });
    }

    const { email, password } = req.body || {};
    if (!credentialsMatch(email, password)) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const session = signToken(String(email).trim().toLowerCase());
    return res.status(200).json({
      success: true,
      token: session.token,
      expiresAt: session.expiresAt
    });
  }
}

module.exports = new AuthController();
