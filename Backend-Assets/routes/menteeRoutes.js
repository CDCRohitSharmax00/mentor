const express = require('express');
const { creatementeecontroller, updatementeecontroller, allmenteecontroller } = require('../controllers/menteeController');
const User = require('../models/User');

const router = express.Router();

//mentee creation
router.post('/create-mentee-profile/:id',creatementeecontroller);

//mentee updation
router.put('/:userId',updatementeecontroller);


module.exports = router;
