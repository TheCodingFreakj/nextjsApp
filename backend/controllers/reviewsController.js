const Review = require("../models/reviews");
const User = require("../models/user");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.CreateReviews = async (req, res) => {
  console.log(req.body);

  try {
    const { review, rating, checkedService, reviewedBy } = req.body;
    let newReview = new Review();
    newReview.review = review;
    newReview.rating = rating;
    newReview.slug = slugify(review).toLowerCase();

    let ArrayOfreviewedBy = reviewedBy && reviewedBy.toString().split(",");
    // console.log(ArrayOfreviewedBy);
    let ArrayOfcheckedService = checkedService && checkedService;
    console.log("Stage1: The array of checked service", ArrayOfcheckedService);

    newReview.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      // return res.json(newReviews);

      Review.findByIdAndUpdate(
        result.id,
        { $push: { reviewedBy: ArrayOfreviewedBy } },
        { new: true }
      ).exec((err, result) => {
        //console.log("This is the result with tools update", result);
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          //return res.json(result);

          Review.findByIdAndUpdate(
            result.id,
            { $push: { checkedService: ArrayOfcheckedService } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              console.log(" Step 5: This is ultimate result", result);
              return res.json(result);
            }
          });
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.Reviews = async (req, res) => {
  //console.log(req.body);
  //const reviewData = req.body;
  try {
    const { review, rating, user, serviceId } = req.body;

    let newReview = new Review();
    newReview.review = review;
    newReview.rating = rating;
    newReview.slug = slugify(review).toLowerCase();
    newReview.checkedService = serviceId;
    newReview.reviewedBy = user;

    newReview.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      return res.json(result);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateReviews = async (req, res) => {
  try {
    const reviews = Review.findByIdAndUpdate(req.params.id);
    res.status(200).json({
      status: "success",
      result: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.ReviewsList = async (req, res) => {
  try {
    await Review.find({})
      //.populate({ path: "discountedServiceCharges", model: "Price" })
      .populate("reviewedBy", "_id name ")
      .populate("checkedService", "_id title slug duration")

      .select("_id review rating  reviewedBy  checkedService slug ")
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

exports.SingleReview = async (req, res) => {
  // console.log(req.params.id);
  try {
    await Review.findById(req.params.id)
      .populate("client", "_id name ")
      .populate("checkedService", "_id title slug duration")
      .select("_id review rating slug, createdAt client ")
      .exec((err, review) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }
        res.json(review);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getCurrentLoggedUser = async (req, res) => {
  //we need a username
  // console.log(
  //   "This is params..This is the query object passed from getServerSideprops",
  //   req.params
  // );
  let username = req.params.username;
  // console.log("This is the username as per req params", username);

  try {
    await User.findOne({ username }).exec(async (err, userFromDb) => {
      if (err || !userFromDb) {
        return res.status(400).json({
          error: "We did not find the user",
        });
      }

      res.json(userFromDb);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
