const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");
const {
  CreateRatings,
  RatingsList,
} = require("../controllers/ratingsController");

router.post("/create-reviews", tokenAuth, adminMiddleware, CreateRatings);
router.get("/get-reviews", RatingsList);

module.exports = router;
