const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const comboPackageSchema = new mongoose.Schema(
  {
    comboPackageName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    title: {
      type: String,
      trim: true,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    desc: {
      type: String,
      max: 1000,
    },
    bundleDescription: {
      type: String,
      max: 1000,
    },
    checkedPrice: [{ type: ObjectId, ref: "PackagePrice", required: true }],
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComboPackage", comboPackageSchema);
