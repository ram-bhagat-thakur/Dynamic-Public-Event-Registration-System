const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // ✅ This must point to your Admin model
const jwt = require('jsonwebtoken');
import express from 'express';
const router = express.Router();


const SECRET = process.env.JWT_SECRET;
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Admin Registration (protected or seeded)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== process.env.ADMIN_REGISTRATION_KEY) {
      return res.status(403).json({ error: 'Unauthorized registration attempt' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Admin already exists' });

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email, name: newAdmin.name, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Admin registered successfully', token });
  } catch (err) {
    console.error("❌ Admin registration error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;