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

    indvPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    discountedServiceCharges: {
      type: Number, //service price
    }, // calculate the service charges
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
    marketingTools: [{ type: ObjectId, ref: "Tools", required: true }],
  },

  { timestamps: true }
);
//https://medium.com/@SigniorGratiano/modelling-data-and-advanced-mongoose-175cdbc68bb1
module.exports = mongoose.model("Service", servicesSchema);
