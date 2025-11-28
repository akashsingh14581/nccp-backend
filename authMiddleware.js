const jwt = require('jsonwebtoken');
const SECRET_KEY = 'NATIONALCOLLAGEOFCHESTPHYSICAN';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided. Access denied.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Malformed token. Access denied.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized access. Invalid token.' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
