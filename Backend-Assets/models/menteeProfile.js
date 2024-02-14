const mongoose = require('mongoose');

const menteeProfileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  expertise: { type: String, required: true },
  // other mentor-specific fields...
},{timestamps:true});


const MenteeProfile = mongoose.model('MenteeProfile', menteeProfileSchema);


module.exports = MenteeProfile;