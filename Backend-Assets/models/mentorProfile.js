const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  expertise: { type: String, required: true },
  // other mentor-specific fields...
});

const MentorProfile = mongoose.model('mentor', mentorProfileSchema);

module.exports = MentorProfile;
