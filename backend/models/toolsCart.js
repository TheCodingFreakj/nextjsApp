const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const toolsCartSchema = new mongoose.Schema(
  {
    customer: [{ type: ObjectId, ref: "Customer", required: true }],
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
    category: {
      type: String,
      default: "tools",
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ToolsCart", toolsCartSchema);
