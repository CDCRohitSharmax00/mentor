const express = require('express');
const { creatementeecontroller, updatementeecontroller, allmenteecontroller } = require('../controllers/menteeController');
const User = require('../models/User');

const router = express.Router();

//mentee creation
router.post('/create-mentee-profile/:id',creatementeecontroller);

//mentee updation
router.put('/:userId',updatementeecontroller);

//get all mentees
router.get('/all-mentees', async (req, res) => {
  try {
    // Find all mentor profiles and populate the associated user details
    // const allMentors = await User.find().populate('userProfile');
    const allMentors = await User.find({ userProfileType: 'MenteeProfile' }).populate('userProfile');

    // The 'user' field in MentorProfile schema should be a reference to the User model

    console.log(allMentors);
    res.json(allMentors);
  } catch (error) {
    console.error('Error fetching all mentors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


module.exports = router;
