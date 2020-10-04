const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Service = require("../models/services");

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
    reviewedBy: [{ type: ObjectId, ref: "Brand" }], //name of the person who gave the review
    client: [{ type: ObjectId, ref: "User" }],
    //populate the title,slug //This is parent referencing//Each review know what service it belongs to
    checkedService: [
      {
        type: ObjectId,
        ref: "Service",
        required: [true, "ServicesTaken Must Belong to a Service Package"],
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reviewsSchema.pre(/^find/, function(next){
//   this.populate({
//     path:"checkedService",
//     select:""
//   })
//   next()
// })

//calculating the number of ratings and average of all ratings for a particular service
//This function takes in a serviceId and calc the average rating and number of ratings for the service
//This function will also update the corresponding service documents
//We will use middleware to call this function each time a new review is added or updated or deletes

reviewsSchema.statics.calAverageRatings = async function (serviceId) {
  console.log(serviceId);
  const stats = await this.aggregate([
    { $match: { checkedService: serviceId } }, //matches the service iD
    {
      $group: {
        _id: "$checkedService",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  //console.log("The stats are", stats);

  await Service.findByIdAndUpdate(serviceId, {
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating,
  });
};

reviewsSchema.post("save", function (next) {
  this.constructor.calAverageRatings(this.checkedService);
});

reviewsSchema.pre(/^findOneAnd/, async function (next) {
  const rev = await this.findOne();
  console.log(rev);
});

module.exports = mongoose.model("Review", reviewsSchema);
//store the average rating and number of ratings on each service package
//so that we dont have to query the reviews and calculate the avg each time for all the services
//we will calculate the average rating and number of ratings of the service each time  a new
//review is added or updated or deleted
