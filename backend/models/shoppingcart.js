const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const shoppingCartSchema = new mongoose.Schema(
  {
    product: {
      type: String,
    },

    id: {
      type: String,
    },

    price: {
      type: Number,
      default: 0,
    },

    customer: [{ type: ObjectId, ref: "Customer", required: true }],
  },
  { timestamps: true }
);
//https://simplicable.com/new/business-data-examples
//https://simplicable.com/new/customer-data
module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
