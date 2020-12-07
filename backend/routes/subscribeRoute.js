const express = require("express");
const router = express.Router();
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

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

router.get(
  "/subscribe-session/:userId",
  tokenAuth,
  authMiddleware,
  getCheckoutSession
);

module.exports = router;
