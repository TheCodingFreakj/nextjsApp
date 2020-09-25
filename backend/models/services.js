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

    //Insert this value with update functionality in the service route
    discountedServiceCharges: [
      { type: ObjectId, ref: "Price", required: true },
    ],
    // .populate("discountedServiceCharges", "_id serviceName discountedServiceCharges slug")
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
    },
    imageCover: {
      data: Buffer,
      contentType: String,
    },
    reviews: [{ type: ObjectId, ref: "Reviews", required: true }],
    brands: [{ type: ObjectId, ref: "Brands", required: true }],
    tools: [{ type: ObjectId, ref: "Tools", required: true }],
    process: {
      type: String,
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
