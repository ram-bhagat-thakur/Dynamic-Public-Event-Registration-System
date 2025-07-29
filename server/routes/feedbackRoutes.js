const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getVerifiedFeedback,
  getAllFeedback,
  verifyFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

// Public routes
router.post('/', submitFeedback);
router.get('/verified', getVerifiedFeedback);

// Admin routes
router.get('/admin', getAllFeedback);
router.patch('/verify/:id', verifyFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;