const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const packagePriceSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      trim: true,
      unique: true,
      max: 32,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },
    realPackagePrice: {
      type: Number,
    },
    packageDiscountPrice: {
      type: Number,
    },

    discountedPackageCharges: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PackagePrice", packagePriceSchema);
