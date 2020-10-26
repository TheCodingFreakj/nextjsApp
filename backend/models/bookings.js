const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    productName: [
      {
        type: ObjectId,
        ref: "Service",
        required: [true, "Service must be mentioned"],
      },
    ],

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    // toolPrice: [
    //   {
    //     type: ObjectId,
    //     ref: "Tools",
    //     required: [true, "Tools must be mentioned"],
    //   },
    // ],

    productPrice: [
      {
        type: ObjectId,
        ref: "Service",
        required: [true, "Service must be mentioned"],
      },
    ],
  },
  { timestamps: true }
);
//https://simplicable.com/new/business-data-examples
//https://simplicable.com/new/customer-data
module.exports = mongoose.model("Booking", bookingSchema);
