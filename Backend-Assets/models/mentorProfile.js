const mongoose = require("mongoose");

const mentorProfileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  expertise: { type: String, required: true },
  yoe: String,
  // other mentor-specific fields...
});

const MentorProfile = mongoose.model("MentorProfile", mentorProfileSchema);

module.exports = MentorProfile;
