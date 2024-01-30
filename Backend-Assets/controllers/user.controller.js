const User = require("../models/User");

const createProfile = (req, res) => {
  console.log("test");
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
