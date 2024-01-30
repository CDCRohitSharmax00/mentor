const { createProfile } = require("../controllers/user.controller");
const { Router } = require("express");
const router = Router();

router.post("/create-profile", createProfile);
module.exports = router;
