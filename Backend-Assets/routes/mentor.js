const express = require('express');
const router = express.Router();
const MentorProfile = require('../models/mentorProfile');
const User = require('../models/User');

// Create a mentor profile for a user
router.post('/create-mentor-profile', async (req, res) => {
  try {
    const { userId, bio, expertise } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create mentor profile
    const mentorProfileData = {
      user: user._id,
      bio,
      expertise,
    };
    const mentorProfile = await MentorProfile.create(mentorProfileData);

    res.status(201).json({ mentorProfile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
