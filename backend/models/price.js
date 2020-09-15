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

    packageName: {
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

    indvPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },

    discountedServiceCharges: {
      type: Number,
      // calculate the service charges
    },

    realPackagePrice: {
      type: Number,
    },

    discountPrice: {
      type: Number,
    },
    packagePrice: {
      type: Number,
      // calculate the package charges
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
