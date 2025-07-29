const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyAdmin;