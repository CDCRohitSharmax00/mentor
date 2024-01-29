const mongoose = require('mongoose');

const menteeProfileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  expertise: { type: String, required: true },
  // other mentor-specific fields...
});

const MenteeProfile = mongoose.model('menteeProfile', menteeProfileSchema);

module.exports = MenteeProfile;