const Review = require("../models/reviews");
const User = require("../models/user");
const Brand = require("../models/brands");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.CreateReviews = async (req, res) => {
  //console.log(req);

  const { review, rating } = req.body;

  try {
    let newReview = new Review();
    newReview.review = review;
    newReview.rating = rating;
    newReview.slug = slugify(review).toLowerCase();
    //newReview.servicesTaken = servicesTaken;
    //newReview.postedBy = req.user.id;

    newReview.save((err, newReviews) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(newReviews);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//https://docs.w3cub.com/mongoose/populate/
exports.ReviewsList = async (req, res) => {
  // //we need a username
  // console.log(
  //   "This is params..This is the query object passed from getServerSideprops",
  //   req.params
  // );
  try {
    await Review.find({})
      .populate("postedBy", ["_id", "brandName"], "Brand")
      .select("_id review rating slug  postedBy ")
      .exec((err, reviews) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        res.json(reviews);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.CalcAverage = async (req, res) => {
  try {
    let calAvg = await Review.calAverageRatings("serviceId");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
