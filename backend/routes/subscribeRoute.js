const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

const {
  subscribeServices,
  getCheckoutSession,
} = require("../controllers/subscriptionController");

////////////////////////////////////////Subscriptions/////////////////////////////////////////

//Route for creating subscriptions for the product

router.post(
  "/subscribe-services",
  tokenAuth,
  authMiddleware,
  subscribeServices
);

router.post(
  "/subscribe-session",
  tokenAuth,
  authMiddleware,
  getCheckoutSession
);

module.exports = router;
