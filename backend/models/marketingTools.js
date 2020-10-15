const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const toolsSchema = new mongoose.Schema(
  {
    tool: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },

    summary: {
      type: String,
      max: 1000,
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

    // clientPrice: [{ type: ObjectId, ref: "ToolPrice", required: true }],

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);
//https://medium.com/@SigniorGratiano/modelling-data-and-advanced-mongoose-175cdbc68bb1
module.exports = mongoose.model("Tools", toolsSchema);
