const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// POST /bulknepal/api/v1/auth/google
// Body: { idToken: string }
router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ success: false, message: 'Missing idToken' });

  try {
    // Verify ID token with Google's tokeninfo endpoint
    const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(401).json({ success: false, message: 'Invalid ID token', detail: text });
    }

    const profile = await resp.json();

    // Optional: verify audience
    if (process.env.GOOGLE_CLIENT_ID && profile.aud && profile.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ success: false, message: 'ID token audience mismatch' });
    }

    // Build user payload
    const userPayload = {
      sub: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      iss: profile.iss,
    };

    // Sign a server-side JWT for sessions
    const token = jwt.sign(userPayload, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });

    return res.json({ success: true, data: { token, user: userPayload } });
  } catch (err) {
    console.error('Google auth error', err);
    return res.status(500).json({ success: false, message: 'Server error verifying ID token' });
  }
});

module.exports = router;
