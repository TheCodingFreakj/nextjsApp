const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const toolsCartSchema = new mongoose.Schema(
  {
    products: [
      {
        quantity: {
          type: Number,
        },
        product: [{ type: ObjectId, ref: "Tools", required: true }],
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

module.exports = mongoose.model("ToolsCart", toolsCartSchema);
