const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const servicesSchema = new mongoose.Schema(
  {
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
    discountedServiceCharges: [
      { type: ObjectId, ref: "Price", required: true },
    ],

    imageCover: {
      data: Buffer,
      contentType: String,
    },

    tools: [{ type: ObjectId, ref: "Tools", required: true }],

    process: {
      type: String,
      max: 1000,
    },
    summary: {
      type: String,
      max: 1000,
    },
    duration: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);
//https://medium.com/@SigniorGratiano/modelling-data-and-advanced-mongoose-175cdbc68bb1
module.exports = mongoose.model("Service", servicesSchema);
