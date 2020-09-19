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

    realPackagePrice: {
      type: Number,
    },
    packageDiscountPrice: {
      type: Number,
    },

    discountedPackageCharges: {
      type: Number,
      // calculate the service charges
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PackagePrice", packagePriceSchema);
