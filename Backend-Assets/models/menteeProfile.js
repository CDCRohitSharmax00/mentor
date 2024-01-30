const mongoose = require('mongoose');

const menteeProfileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  expertise: { type: String, required: true },
  // other mentor-specific fields...
},{timestamps:true});

<<<<<<< HEAD
const MenteeProfile = mongoose.model('MenteeProfile', menteeProfileSchema);
=======
const MenteeProfile = mongoose.model('mentee', menteeProfileSchema);
>>>>>>> ee86b5268bf661542e3188fffa29eda66e8bf7da

module.exports = MenteeProfile;