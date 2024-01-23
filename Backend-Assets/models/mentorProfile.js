const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  bio: { type: String, required: true },
  expertise: { type: String, required: true },
  // other mentor-specific fields...
});

const MentorProfile = mongoose.model('MentorProfile', mentorProfileSchema);

module.exports = MentorProfile;
