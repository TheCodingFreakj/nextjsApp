const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const servicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    ratingsQuantity: {
      type: Number,
      default: 4.5,
    },

    discountedServiceCharges: [
      { type: ObjectId, ref: "Price", required: true },
    ],

    imageCover: {
      data: Buffer,
      contentType: String,
    },

    tools: [{ type: ObjectId, ref: "Tools", required: true }],

    process: {
      type: String,
      max: 1000,
    },
    summary: {
      type: String,
      max: 1000,
    },
    duration: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },

    reviews: [{ type: ObjectId, ref: "Review", required: true }],
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// //virtual populate
// servicesSchema.virtual("the_reviews", {
//   ref: "Review",
//   foreignField: "_id",
//   localField: "reviews",
//   justOne: false,
// });

module.exports = mongoose.model("Service", servicesSchema);
