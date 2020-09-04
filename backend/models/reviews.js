const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewsSchema = new mongoose.Schema(
  {
    message: {
      type: String,
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
    ServicesTaken: [{ type: ObjectId, ref: "Service", required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reviews", reviewsSchema);
