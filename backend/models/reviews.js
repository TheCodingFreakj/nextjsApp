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
    //name of the person who gave the review
    reviewedBy: [
      {
        type: ObjectId,
        ref: "User",
        required: [true, "User must be mentioned"],
      },
    ],
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

//calculating the number of ratings and average of all ratings for a particular service
//This function takes in a serviceId and calc the average rating and number of ratings for the service
//This function will also update the corresponding service documents
//We will use middleware to call this function each time a new review is added or updated or deletes

//This id is for current service to which the review belongs to
//this => current model
reviewsSchema.statics.calAverageRatings = async function (serviceId) {
  console.log("Step 3: This is service on which the review is made", serviceId);

  //this.aggregate on the model
  const stats = await this.aggregate([
    { $match: { checkedService: serviceId } },
    //matches the service iD
    //select all the reviews that belonmg to the particular service that is passed in as argument
    //This id is the id we are getting
    // {
    //   $group: {
    //     _id: "$checkedService", //group based on services checked when sending the review from frontend. This checked service the service we click and send as array
    //     nRating: { $sum: 1 },
    //     avgRating: { $avg: "$rating" },
    //   },
    // },
  ]);
  // console.log("The stats are", stats);

  // await Service.findByIdAndUpdate(serviceId, {
  //   ratingsQuantity: stats[0].nRating,
  //   ratingsAverage: stats[0].avgRating,
  // });
};

//runs everytime I create a new review or update
reviewsSchema.post("save", function (next) {
  console.log(" Step 2: Checking the checked service", this.checkedService); //works if the person leave a comment from the service page
  // console.log("Checking the checked service", this.checkedService[0]._id);
  // //calling the function on the model directly
  this.constructor.calAverageRatings(this.checkedService); //this is the cuurent review and we pass the id
});

module.exports = mongoose.model("Review", reviewsSchema);
//store the average rating and number of ratings on each service package
//so that we dont have to query the reviews and calculate the avg each time for all the services
//we will calculate the average rating and number of ratings of the service each time  a new
//review is added or updated or deleted
