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

    //Fill the value of the calculateDiscountedServices route
    discountedServiceCharges: {
      type: Number,
      // calculate the service charges
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Price", priceSchema);
