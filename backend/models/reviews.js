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

    postedBy: {
      type: ObjectId,
      ref: "Brands",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    ServicesTaken: {
      type: ObjectId,
      ref: "Service",
      required: [true, "Review Must Belong to a Service Package"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewsSchema);
