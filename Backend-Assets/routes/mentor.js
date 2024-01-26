const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
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
    let UserProfile;
    if (user.role === 'mentor' && user.UserProfile) {
      // Update mentor details if present
      UserProfile = await UserProfile.findByIdAndUpdate(user.UserProfile, updatedData.mentor, { new: true });
      console.log('UpdatedUserProfile:', UserProfile);

      if (!UserProfile) {
        return res.status(404).json({ error: 'Mentor profile not found' });
      }
    }

    res.json({ user: user.getUserData(), UserProfile });
  } catch (error) {
    console.error('Error updating user and mentor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/all-mentors', async (req, res) => {
  try {
    // Find all mentor profiles and populate the associated user details
    const allMentors = await User.find().populate('userprofile');

    // The 'user' field in UserProfile schema should be a reference to the User model

    console.log(allMentors);
    res.json(allMentors);
  } catch (error) {
    console.error('Error fetching all mentors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/all-users-mentors', async (req, res) => {
  try {
    // Find all users
    const allUsers = await User.find();

    // Find all mentors
    const mentors = await User.find({ role: 'mentor' });

    // Fetch mentor profiles for mentors
    const UserProfiles = await UserProfile.find({ user: { $in: mentors.map((mentor) => mentor._id) } });

    // Combine user and mentor data
    const usersMentorsData = allUsers.map((user) => {
      const mentorDetails = mentors.find((mentor) => mentor._id.toString() === user._id.toString());
      const UserProfile = UserProfiles.find((profile) => profile.user.toString() === user._id.toString());

      return {
        user,
        mentorDetails,
        UserProfile,
      };
    });
    res.json(usersMentorsData);
  }catch (error) {
    console.error('Error fetching all users and mentors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
