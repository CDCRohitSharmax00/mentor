const User=require("../models/User");
const MenteeProfile=require("../models/menteeProfile");

const creatementeecontroller=async(req,res)=>{
    try {
        const {bio, expertise } = req.body;
        const userId=req.params.id;
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Create a new mentee profile
        const menteeProfile = new MenteeProfile({bio, expertise });
        await menteeProfile.save();
    
        // Update the user with the mentee profile ID and type
        user.userProfile = menteeProfile._id;
        user.userProfileType = 'MenteeProfile';
        await user.save();
    
        res.json({ user, menteeProfile });
      } catch (error) {
        console.error('Error creating mentee profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    const updatementeecontroller=async(req,res)=>{
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
      
          console.log('User:', user.userProfile);
          // Check if the user has a mentee profile
          let menteeProfile;
          if (user.userProfileType === 'MenteeProfile' && user.userProfile) {
            console.log('Updating mentee profile');
            // Update mentee details if present
            menteeProfile = await MenteeProfile.findByIdAndUpdate(user.userProfile, updatedData.mentee, { new: true });
            console.log('UpdatedMenteeProfile:', menteeProfile);
      
            if (!menteeProfile) {
              return res.status(404).json({ error: 'Mentee profile not found' });
            }
          }
      
          res.json({ user: user.getUserData(), menteeProfile });
        } catch (error) {
          console.error('Error updating user and mentee:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const allmenteecontroller=async(req,res)=>{
        try {
         
            const allMentees = await User.find({ userProfileType: 'MenteeProfile' }).populate('userProfile');
        
            // The 'user' field in Mentee Profile schema should be a reference to the User model
        
            console.log(allMentees);
            res.json(allMentees);
          } catch (error) {
            console.error('Error fetching all mentees:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }

module.exports = {creatementeecontroller,updatementeecontroller,allmenteecontroller};