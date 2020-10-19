const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    prodName: {
      type: String,
    },

    prodId: {
      type: String,
    },

    priceUnit1: {
      type: Number,
      default: 0,
    },

    priceUnit2: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
//https://simplicable.com/new/business-data-examples
//https://simplicable.com/new/customer-data
module.exports = mongoose.model("Product", productSchema);
