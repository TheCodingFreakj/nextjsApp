const Review = require("../models/reviews");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.CreateReviews = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.ReviewsList = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
