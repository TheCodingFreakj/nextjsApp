const express = require("express");
const router = express.Router();
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

const { subscribeServices } = require("../controllers/subscriptionController");

////////////////////////////////////////Subscriptions/////////////////////////////////////////

//Route for creating subscriptions for the product

router.post(
  "/subscribe-services",
  tokenAuth,
  authMiddleware,
  subscribeServices
);
module.exports = router;
