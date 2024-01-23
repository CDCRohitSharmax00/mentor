const express = require("express");
const {signup,signin,googleApi,googleApiCallback} = require("../controllers/userController.js");
const { userAuth, checkRole} = require("../middleware/requireAuth.js");
//Data Validation middleware
const { validateUser, validateSignInUser } = require("../utils/userValidation.js"); 
const { validationResult } = require('express-validator');

const router = express.Router();

router.post("/signup", validateUser, (req, res, next) => { // Modify this line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    signup(req, res, next);
});

router.post("/signin", validateSignInUser, (req, res, next) => { // Modify this line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    signin(req, res, next);
});

router.post("/google-auth", googleApi);
router.post("/google-callback",googleApiCallback);

router.get("/test", userAuth, checkRole(['mentor','mentee']), (req, res) => {
    console.log("testing" , req.user);
    res.send("Access Granted");
});

module.exports = router;