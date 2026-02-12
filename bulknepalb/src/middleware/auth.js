const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const header = req.header('authorization') || req.header('Authorization');
  if (!header) return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : header;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
