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

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    ratingsQuantity: {
      type: Number,
      default: 4.5,
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

    // reviews: [{ type: ObjectId, ref: "Review" }],
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true },
  {
    toObject: { virtuals: true },
  }
);

servicesSchema.set("toJSON", { virtuals: true });

//virtual populate
servicesSchema.virtual("the_reviews", {
  ref: "Review",
  foreignField: "checkedService",
  localField: "_id",
  justOne: false,
});

//virtual populate
servicesSchema.virtual("the_portfolios", {
  ref: "Portfolio",
  foreignField: "services",
  localField: "_id",
  justOne: false,
});

module.exports = mongoose.model("Service", servicesSchema);
