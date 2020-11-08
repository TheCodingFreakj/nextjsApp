const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const shoppingCartSchema = new mongoose.Schema(
  {
    products: [
      {
        productid: String,
        quantity: {
          type: Number,
          default: 0,
        },
        productname: String,
        price: Number,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },

    customer: [{ type: ObjectId, ref: "Customer", required: true }],
  },
  { timestamps: true }
);
//https://simplicable.com/new/business-data-examples
//https://simplicable.com/new/customer-data
module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
