const User=require("../models/User");
const MentorProfile=require("../models/mentorProfile");

const creatementorcontroller=async(req,res)=>{
    try {
        const {bio, expertise} = req.body;
        const userId=req.params.id;
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Create a new mentor profile
        const mentorProfile = await new MentorProfile({bio, expertise}).save();
    
        // Update the user with the mentor profile ID
        user.UserProfile = mentorProfile._id;
        await user.save();
    
        res.json({ user, mentorProfile });
        
      } catch (error) {
        console.error('Error creating mentor profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {creatementorcontroller};