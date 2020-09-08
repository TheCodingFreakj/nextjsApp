const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const priceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    serviceCharges: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Price", priceSchema);
