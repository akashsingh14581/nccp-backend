const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'NATIONALCOLLAGEOFCHESTPHYSICAN';

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ message: 'Invalid token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
