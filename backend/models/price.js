const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const priceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    servicePrice: {
      type: Number,
      required: true,
      min: 1000,
    },
    duration: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      max: 32,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Price", priceSchema);
