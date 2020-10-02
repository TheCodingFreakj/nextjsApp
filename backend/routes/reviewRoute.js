const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");
const {
  CreateReviews,
  //CalcAverage,
  ReviewsList,
} = require("../controllers/reviewsController");

router.post("/create-reviews", tokenAuth, adminMiddleware, CreateReviews);
router.post("/all-reviews", ReviewsList);
//router.get("/calcAverage/:serviceId", CalcAverage);

module.exports = router;
