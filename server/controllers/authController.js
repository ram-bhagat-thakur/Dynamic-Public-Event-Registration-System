const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, name: admin.name, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, name: admin.name }); // ✅ Send name for dashboard
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    console.log('Incoming data:', req.body);

    const existing = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ message: 'Username or email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Hash password

    const newAdmin = new Admin({ name, username, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error });
  }
};