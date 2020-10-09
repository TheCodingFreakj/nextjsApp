const express = require("express");
const router = express.Router();
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

const { getCheckoutSession } = require("../controllers/bookingsController");

router.get(
  "/checkout-session/:servId",
  tokenAuth,
  authMiddleware,
  getCheckoutSession
);

module.exports = router;
