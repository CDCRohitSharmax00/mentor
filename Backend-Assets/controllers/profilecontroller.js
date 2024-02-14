const User = require("../models/User");
const MenteeProfile = require("../models/menteeProfile");
const MentorProfile = require("../models/mentorProfile");

//profile creation and updation based on role
const createProfile = async (req, res) => {

  /* userId & role will come from decoded token */
  const userId=req.params.id;
  const { role } = req.body;

  const user = await User.findOne({ _id: userId, role });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }


  // const updatedProfileFields = { bio, expertise, yoe };
  //for role=mentor
  if (user.role === "mentor") {
    const updatedProfile = await MentorProfile.findByIdAndUpdate(
      user.details._id,
      req.body,
      { new: true }
    );

    return res.json({ data: updatedProfile });
  }

  //for role=mentee
  if (user.role === "mentee") {
    const updatedProfile = await MenteeProfile.findByIdAndUpdate(
      user.details._id,
      req.body,
      { new: true }
    );
  
    return res.json({ data: updatedProfile });
  }
};

//get all mentors
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
