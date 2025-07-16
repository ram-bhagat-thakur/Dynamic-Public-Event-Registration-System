const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // ✅ This must point to your Admin model
const jwt = require('jsonwebtoken');


const SECRET = process.env.JWT_SECRET;
router.post('/login', async (req, res) => {
  try {
    console.log("Login request body:", req.body); // ✅ Should show email & password

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;