const express = require('express');
const router = express.Router();

const verifyAdmin = require('../middleware/authMiddleware');
const {
  getAllRegistrants,
  getRegistrantsByEvent,
  deleteAllRegistrants,
  deleteSingleRegistrant
} = require('../controllers/registrationController');

router.get('/', verifyAdmin, getAllRegistrants);
router.get('/event/:eventId', verifyAdmin, getRegistrantsByEvent);
router.delete('/event/:eventId', verifyAdmin, deleteAllRegistrants); // ✅ Delete all
router.delete('/:id', verifyAdmin, deleteSingleRegistrant);          // ✅ Delete one

module.exports = router;