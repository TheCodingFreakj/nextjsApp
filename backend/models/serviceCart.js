const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const servicesCartSchema = new mongoose.Schema(
  {
    customer: [{ type: ObjectId, ref: "Customer", required: true }],
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: [
          {
            type: ObjectId,
            ref: "Service",
            required: true,
          },
        ],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCart", servicesCartSchema);
