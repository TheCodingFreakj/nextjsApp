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
  getAllUsers,
  getUserProfilephoto,
  getBusinessDetails,
  getCurrentCustomer,
} = require("../controllers/userProfileController");

//bring validators

router.get("/user/profile", tokenAuth, authMiddleware, read);
router.get("/users", getAllUsers); // for private profile to update delete
router.get("/user/:username", publicUserProfile);
router.put("/user/update", tokenAuth, authMiddleware, updateUserProfile); //if you want to update the profile this applies
router.get("/user/photo/:userId", getUserProfilephoto); //for upload profile image
router.post(
  "/get-business-details",
  tokenAuth,
  authMiddleware,
  getBusinessDetails
);
router.get(
  "/get-current-customer",
  tokenAuth,
  authMiddleware,
  getCurrentCustomer
);

module.exports = router;
