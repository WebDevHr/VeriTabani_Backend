const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  if (!req.headers && !req.headers.authorization) {
    return res.badRequest({ err: 'Authorization header is missing' });
  }

  // Extract token from header
  const tokenParam = req.headers.authorization;
  const token = tokenParam.split('Bearer ')[1];

  // Verify JWT token
  jwt.verify(token, sails.config.custom.jwtSecret, async (err, decoded) => {
    if (err) {
      sails.log.error('JWT verification error', err);
      return res.forbidden({ err: 'Invalid token' });
    }

    // Attach user to request
    req.user = await Users.findOne({ id: decoded.user });
    next();
  });
};
