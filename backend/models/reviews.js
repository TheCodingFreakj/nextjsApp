const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewsSchema = new mongoose.Schema(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },
    postedBy: [{ type: ObjectId, ref: "Brand", required: true }],

    //populate the title,slug
    servicesTaken: {
      type: ObjectId,
      ref: "Service",
      required: [true, "ServicesTaken Must Belong to a Service Package"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//https://stackoverflow.com/questions/29664499/mongoose-static-methods-vs-instance-methods

//calculating the number of ratings and average of all ratings for a particular service
reviewsSchema.statics.calAverageRatings = function (serviceId) {
  this.aggregate([
    { $match: { servicesTaken: serviceId } }, //matches the service iD
    {
      $group: {
        _id: "$servicesTaken",
        totalRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]),
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      //return result.average;
    };
};

//https://mongoosejs.com/docs/guide.html
//http://thecodebarbarian.com/mongoose-5-5-static-hooks-and-populate-match-functions.html

module.exports = mongoose.model("Review", reviewsSchema);
//https://stackoverflow.com/questions/53788235/how-to-write-a-static-method-in-mongoose-that-gets-all-documents
