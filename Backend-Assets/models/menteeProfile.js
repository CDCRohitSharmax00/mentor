const mongoose = require("mongoose");

const menteeProfileSchema = new mongoose.Schema({
  bio: { type: String },
  expertise: { type: String },
  // other mentor-specific fields...
});

const MenteeProfile = mongoose.model("MenteeProfile", menteeProfileSchema);

module.exports = MenteeProfile;
