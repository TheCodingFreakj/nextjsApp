const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const servicesCartSchema = new mongoose.Schema(
  {
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: [{ type: ObjectId, ref: "Services", required: true }],
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

module.exports = mongoose.model("ServiceCart", servicesCartSchema);
