const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const brandsSchema = new mongoose.Schema(
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

    // location: {
    //   type: {
    //     type: String, // Don't do `{ location: { type: String } }`
    //     enum: ["Point"], // 'location.type' must be 'Point'
    //     required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: true,
    //   },
    // },
  },
  { timestamps: true }
);
//https://simplicable.com/new/business-data-examples
//https://simplicable.com/new/customer-data
module.exports = mongoose.model("Brand", brandsSchema);
