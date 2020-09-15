const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const comboPackageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    title: {
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
    packagePrice: [{ type: ObjectId, ref: "Price", required: true }],
    //populate the packagePrice on basis of packageName
    // .populate("packagePrice", "_id packageName packagePrice slug")

    desc: {
      type: String,
      max: 1000,
    },
    bundleDescription: {
      type: String,
      max: 1000,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComboPackage", comboPackageSchema);
