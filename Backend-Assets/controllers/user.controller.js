const User = require("../models/User");
const MenteeProfile = require("../models/menteeProfile");
const MentorProfile = require("../models/mentorProfile");

const createProfile = async (req, res) => {
  /* userId & role will come from decoded token */
  const { userId, role } = req.body;
  console.log(userId, role);
  const user = await User.findOne({ _id: userId, role });
  console.log("DB User", user);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  // const updatedProfileFields = { bio, expertise, yoe };

  if (user.role === "mentor") {
    const updatedProfile = await MentorProfile.findByIdAndUpdate(
      user.details,
      req.body,
      { new: true }
    );
    console.log("logic", updatedProfile);
    return res.json({ data: updatedProfile });
  }

  if (user.role === "mentee") {
    const updatedProfile = await MenteeProfile.findByIdAndUpdate(
      user.details,
      req.body,
      { new: true }
    );
    console.log(updatedProfile);
    return res.json({ data: updatedProfile });
  }
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
