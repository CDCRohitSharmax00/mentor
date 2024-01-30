const {
  createProfile,
  getAllMentors,
} = require("../controllers/user.controller");
const { Router } = require("express");
const router = Router();

router.post("/create-profile", createProfile);
router.get("/all-mentors", getAllMentors);
module.exports = router;
