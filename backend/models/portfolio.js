const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const portfolioSchema = new mongoose.Schema(
  {
    name: {
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
    technical_sheet: {
      type: String,
      trim: true,
      max: 1000,
    },

    technologies: {
      type: String,
      max: 1000,
    },

    company: {
      type: String,
      max: 1000,
    },

    checkedService: [
      {
        type: ObjectId,
        ref: "Service",
        required: [true, "ServicesTaken Must Belong to a Service Package"],
      },
    ],
    //https://caferati.me/portfolio
  },
  { timestamp: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
