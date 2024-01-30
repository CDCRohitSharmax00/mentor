const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  expertise: { type: String, required: true },
  // other mentor-specific fields...
},
{timestamps:true});

const MentorProfile = mongoose.model('MentorProfile', mentorProfileSchema);

module.exports = MentorProfile;
