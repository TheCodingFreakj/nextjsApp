const express = require("express");
const router = express.Router();
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");
const {
  CreateReviews,
  Reviews,
  updateReviews,
  ReviewsList,
  SingleReview,
  getCurrentLoggedUser,
} = require("../controllers/reviewsController");

router.post("/create-reviews", tokenAuth, adminMiddleware, CreateReviews); //admin can do this
router.post("/reviews", tokenAuth, authMiddleware, Reviews); //authenticated user post reviews
router.post("/all-reviews", ReviewsList);
router.post("/review/:id", SingleReview);
router.get("/customer/:username", getCurrentLoggedUser);
router.put("/review/:id", tokenAuth, adminMiddleware, updateReviews);
//router.get("/calcAverage/:serviceId", CalcAverage);

module.exports = router;
