const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const toolPriceSchema = new mongoose.Schema(
  {
    tool: {
      type: String,
      trim: true,
      unique: true,
      max: 32,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },
    totalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },

    clientPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ToolPrice", toolPriceSchema);
