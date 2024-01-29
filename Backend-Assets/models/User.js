const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, "Username Must be at least 6, got {VALUE}"],
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password Must be at least 6, got {VALUE}"],
    max: [12, "Password Must be at most 12, got {VALUE}"]
  },
  country: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['mentor', 'mentee', 'organization'],
      message: 'Role is either mentor, mentee, or organization'
    }
  },
  profilePicture:{
    type: String,
    default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
  
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'userProfileType'
  },
  userProfileType: {
    type: String,
    // required: true,
    enum: ['MentorProfile', 'MenteeProfile']
  },
});


// Hash password before saving to database
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, username: this.username, role: this.role };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return token;
};

// Get User Data
userSchema.methods.getUserData = function () {
  return {
    // Exclude sensitive data
    name: this.username,
    email: this.email,
    
    // ... add other fields as needed
  };
};

module.exports = mongoose.model("user", userSchema);