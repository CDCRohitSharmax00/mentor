const express = require('express');
const router = express.Router();
const MentorProfile = require('../models/mentorProfile');
const User = require('../models/User');
const { creatementorcontroller } = require('../controllers/mentorController');

// Create a mentor profile for a user
router.post('/create-mentor-profile/:id',creatementorcontroller);

//updating the user profile
router.put('/:userId', async (req, res) => {
  console.log('PUT /:userId route hit');
  try {
    const userId = req.params.userId;
    console.log('UserId:', userId);
    const updatedData = req.body;
    console.log('UpdatedData:', updatedData);

    // Find the user by ID and update the user details
    const user = await User.findByIdAndUpdate(userId, updatedData.user, { new: true });
    console.log('UpdatedUser:', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    // Check if the user has a mentor profile
    let mentorProfile;
    if (user.role === 'mentor' && user.mentorProfile) {
      // Update mentor details if present
      mentorProfile = await MentorProfile.findByIdAndUpdate(user.mentorProfile, updatedData.mentor, { new: true });
      console.log('UpdatedMentorProfile:', mentorProfile);

      if (!mentorProfile) {
        return res.status(404).json({ error: 'Mentor profile not found' });
      }
    }

    res.json({ user: user.getUserData(), mentorProfile });
  } catch (error) {
    console.error('Error updating user and mentor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/all-mentors', async (req, res) => {
  try {
    // Find all mentor profiles and populate the associated user details
    const allMentors = await User.find({role: 'mentor'}).populate('UserProfile');

    // The 'user' field in MentorProfile schema should be a reference to the User model
    if(!allMentors){
      return res.status(400).json({
        message:"bhai mila nahi"
      })
    }

    console.log(allMentors);
    res.json(allMentors);
  } catch (error) {
    console.error('Error fetching all mentors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*router.get('/all-users-mentors', async (req, res) => {
  try {
    // Find all users
    const allUsers = await User.find();

    // Find all mentors
    const mentors = await User.find({ role: 'mentor' });

    // Fetch mentor profiles for mentors
    const mentorProfiles = await MentorProfile.find({ user: { $in: mentors.map((mentor) => mentor._id) } });

    // Combine user and mentor data
    const usersMentorsData = allUsers.map((user) => {
      const mentorDetails = mentors.find((mentor) => mentor._id.toString() === user._id.toString());
      const mentorProfile = mentorProfiles.find((profile) => profile.user.toString() === user._id.toString());

      return {
        user,
        mentorDetails,
        mentorProfile,
      };
    });
    res.json(usersMentorsData);
  }catch (error) {
    console.error('Error fetching all users and mentors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

module.exports = router;
