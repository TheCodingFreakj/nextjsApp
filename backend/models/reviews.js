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
    reviewedBy: [{ type: ObjectId, ref: "Brand", required: true }],

    //populate the title,slug
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
  { timestamps: true }
);

//https://stackoverflow.com/questions/29664499/mongoose-static-methods-vs-instance-methods

// //calculating the number of ratings and average of all ratings for a particular service
// reviewsSchema.statics.calAverageRatings = async function (serviceId) {
//   this.aggregate([
//     { $match: { checkedService: serviceId } }, //matches the service iD
//     {
//       $group: {
//         _id: "$servicesTaken",
//         totalRating: { $sum: 1 },
//         avgRating: { $avg: "$rating" },
//       },
//     },
//   ]),
//     async function (err, result) {
//       if (err) {
//         console.log(err);
//       }
//       console.log(result);
//       //return result.average;

//       await Service.findByIdAndUpdate(serviceId, {
//         ratingsQuantity: stats[0].totalRating,
//         ratingsAverage: stats[0].avgRating,
//       });
//     };
// };

// reviewsSchema.post("save", function (next) {
//   this.constructor.calAverageRatings(this.checkedService);
// });

module.exports = mongoose.model("Review", reviewsSchema);
