const User = require("../models/User");
const MentorProfile = require("../models/mentorProfile");

const createProfile = async (req, res) => {
  /* userId & role will come from decoded token */
  const { userId, role } = req.body;
  console.log(userId, role);
  const user = await User.findById(userId);
  console.log("DB User", user);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  // const updatedProfileFields = { bio, expertise, yoe };
  const updatedProfile = await MentorProfile.findByIdAndUpdate(
    user.details,
    req.body,
    { new: true }
  );
  console.log(updatedProfile);
  res.json({ data: updatedProfile });
};

const getAllMentors = async (req, res) => {
  try {
    const mentor = await User.find({ role: "mentor" }).populate({
      /* provide field name & model name */
      path: "details",
      model: "MentorProfile",
    });
    res.status(200).json({ data: mentor });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createProfile, getAllMentors };
