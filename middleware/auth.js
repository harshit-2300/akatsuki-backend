/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const config = require('config');

// eslint-disable-next-line func-names
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Token not exists' });
  }

  try {
    const decoded = jwt.verify(token, config.get('secret'));
    req.user = decoded.user;

    req.user.type = req.user.user_type;

    next();
  } catch (err) {
    return res.status(401).json({ msg: 'token invalid' });
  }
};
