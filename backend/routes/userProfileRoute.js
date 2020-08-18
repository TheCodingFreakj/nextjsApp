const express = require("express");
const router = express.Router();

//bring Controller

const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

const { read } = require("../controllers/userProfileController");

//bring validators

router.get("/profile", tokenAuth, adminMiddleware, read);

module.exports = router;
