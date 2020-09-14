const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");
const {
  CreateReviews,
  ReviewsList,
} = require("../controllers/reviewsController");

router.post("/create-reviews", tokenAuth, adminMiddleware, CreateReviews);
router.get("/get-reviews", ReviewsList);

module.exports = router;
