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

    realServicePrice: {
      type: Number,
    },
    servicedDiscountPrice: {
      type: Number,
    },

    discountedServiceCharges: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Price", priceSchema);
