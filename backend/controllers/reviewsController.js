const Review = require("../models/reviews");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.CreateReviews = async (req, res) => {
  //console.log(req.body);

  try {
    const { review, rating, checkedService, reviewedBy } = req.body;
    let newReview = new Review();
    newReview.review = review;
    newReview.rating = rating;
    newReview.slug = slugify(review).toLowerCase();

    let ArrayOfreviewedBy = reviewedBy && reviewedBy.toString().split(",");
    // console.log(arrayOfTools);
    let ArrayOfcheckedService =
      checkedService && checkedService.toString().split(",");

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

exports.ReviewsList = async (req, res) => {
  try {
    await Review.find({})
      //.populate({ path: "discountedServiceCharges", model: "Price" })
      .populate("reviewedBy", "_id brandName slug")
      .populate("checkedService", "_id title slug duration")
      .select("_id review rating slug  reviewedBy checkedService")
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

// exports.CalcAverage = async (req, res) => {
//   const serviceId = req.body._id;
//   try {
//     await Review.calAverageRatings(serviceId);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };
//https://medium.com/@SigniorGratiano/modelling-data-and-advanced-mongoose-175cdbc68bb1
