const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({

  /*work_start:{
    type:Number,
    required:true
  },

  about:{
    type: String,
    required:true
    },

    /*videos*/

  /*externalLinks:[{
    handle:{
      type: String,
      required:true
    },
    link:{
      type: String,
      required:[true,"Link is required"]
    }
  }],

  location:{
    country:{
      type: String,
      required:true
    },
    state:{
      type:String,
    }
  },

  languages:{
    type: [String],
    default:[]
  },

  education: [{
    college_Name: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    fieldofStudy: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: [true,"Start Date is required"],
    },
    endDate: {
      type: Date,
    },
  }],

  career: [{

    company_name: {
      type: String,
      required: [true,"Company name is required"],
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
    },

    currently_working: {
      type: Boolean,
      default: false,
    },

    about_work: {
      type: String,
    }
  }],*/

  /*certifications*/






  bio: { type: String, required: true },
  expertise: { type: String, required: true }
  // other mentor-specific fields...
});

const MentorProfile = mongoose.model('mentorProfile', mentorProfileSchema);

module.exports = MentorProfile;
