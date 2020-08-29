const express = require("express");
const router = express.Router();

//bring Controller

const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

const {
  read,
  publicUserProfile,
  updateUserProfile,
  getUserProfilephoto,
} = require("../controllers/userProfileController");

//bring validators

router.get("/user/profile", tokenAuth, authMiddleware, read); // for private profile to update delete
router.get("/user/:username", publicUserProfile);
router.put("/user/update", tokenAuth, authMiddleware, updateUserProfile);
router.get("/user/photo/:username", getUserProfilephoto);
module.exports = router;
