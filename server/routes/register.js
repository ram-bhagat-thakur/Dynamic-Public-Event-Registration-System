const express = require('express');
const router = express.Router();
const { registerUser, getRegistrationsByEvent } = require('../controllers/registrationController');

// POST /api/register
router.post('/', registerUser);

// GET /api/register?eventId=xyz
router.get('/', getRegistrationsByEvent);

module.exports = router;