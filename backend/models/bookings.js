const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    brandName: {
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

    revenuesGenerated: {
      type: Number,
      default: 4.5,
    },
  },
  { timestamps: true }
);
//https://simplicable.com/new/business-data-examples
//https://simplicable.com/new/customer-data
module.exports = mongoose.model("Booking", bookingSchema);
