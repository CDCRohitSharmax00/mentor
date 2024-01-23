const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const { errorHandler } = require("../utils/error.js");
const admin = require('firebase-admin');
require('dotenv').config();

//Firebase SDK setup
const serviceAccount = require('../config/serviceAccountKey.json');
const firebaseConfig = require('../config/firebaseConfig.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

async function signup(req, res, next) {
    // const response = validationResult(req);
    // if (!response.isEmpty()) {
    //     return res.status(400).json({
    //         success: false,
    //         error: response.array(),
    //         message: "Validation failed"
    //     })
    // }
    const { username, email, password, country, phonenumber, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
          console.log("hlooo")
          return  next(errorHandler(400, 'User not dsdfound'));
        }
        user = new User({
            username,
            email,
            password,
            country,
            phonenumber,
            role
        });
        await user.save();
        const token = user.generateAuthToken();
        const userResponse = user.getUserData();
        res.json({ ...userResponse, token: token });
    } catch (err) {
       next(err);
    }
};

async function signin(req, res,next) {
    // const response = validationResult(req);
    // if (!response.isEmpty()) {
    //     return res.status(400).json({
    //         success: false,
    //         error: response.array(),
    //         message: "Validation failed"
    //     })
    // }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return  next(errorHandler(404, 'User not found'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return  next(errorHandler(401, 'Invalid credentials'));
        }
        const token = user.generateAuthToken();
        const userResponse = user.getUserData();
        res.json({ ...userResponse, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

async function googleApi(req, res, next){
    const { idToken } = req.body;
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const {name, email, picture } = decodedToken;
      const user = await User.findOne({ email:email });
    
      if(user){
        const token = user.generateAuthToken();
        res.status(200).json({ token: token, name, email, picture });
      }else{
        res.status(200).json({ idToken, name, email, picture});
      }

    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: 'Authentication failed' });
    }
};

async function googleApiCallback(req, res, next) {
   
    const { idToken } = req.body;
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { email , picture} = decodedToken;

      const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: req.body.name,
        email: email,
        password: hashedPassword,
        country: req.body.country,
        phonenumber: req.body.phonenumber,
        role: req.body.role,
        profilePicture: req.body.picture,
      });
      
      await newUser.save();
      const token = newUser.generateAuthToken();
      res.json({ token, name: newUser.username, email, picture });
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: 'Authentication failed' });
    }
}

module.exports = { signup, signin, googleApi, googleApiCallback };