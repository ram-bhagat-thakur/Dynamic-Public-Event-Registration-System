const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/authMiddleware');

const {
  submitContact,
  getMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/contactController');

router.post('/', submitContact); // Public form
router.get('/', verifyAdmin, getMessages); // Admin-only
router.patch('/:id/read', verifyAdmin, markAsRead);
router.delete('/:id', verifyAdmin, deleteMessage);

module.exports = router;