const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
console.log("🔐 JWT_SECRET in events.js:", SECRET); // ✅ Confirm it's loaded

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    console.log("❌ JWT verification failed:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}