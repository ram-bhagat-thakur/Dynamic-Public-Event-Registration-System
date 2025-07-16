const jwt = require('jsonwebtoken');
const SECRET = 'your_secret_key'; // 🔒 Use environment variable in production

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.admin = decoded; // You can access this in the route if needed
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyAdmin;