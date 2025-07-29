const Feedback = require('../models/Feedback.js');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const newFeedback = new Feedback({ name, rating, comment });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // ✅ use createdAt
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

exports.getVerifiedFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ verified: true }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch verified feedback' });
  }
};


exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};


exports.verifyFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndUpdate(id, { verified: true });
    res.status(200).json({ message: 'Feedback verified' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify feedback' });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};