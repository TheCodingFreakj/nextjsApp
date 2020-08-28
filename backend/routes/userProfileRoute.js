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
} = require("../controllers/userProfileController");

//bring validators

router.get("/profile", tokenAuth, adminMiddleware, read);
router.get("/user/:username", publicUserProfile);
module.exports = router;
