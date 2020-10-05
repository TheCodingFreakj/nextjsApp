const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    technicalSheet: {
      type: String,
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
    photo: {
      data: Buffer,
      contentType: String,
    },
    services: [
      {
        type: ObjectId,
        ref: "Service",
      },
    ],
    //https://caferati.me/portfolio
  },
  { timestamp: true }
);

portfolioSchema.set("toJSON", { virtuals: true });
// portfolioSchema.pre(/^find/, function(next){
//   this.populate({
//     path:"services",
//     select:""
//   })
//   next()
// })

module.exports = mongoose.model("Portfolio", portfolioSchema);
