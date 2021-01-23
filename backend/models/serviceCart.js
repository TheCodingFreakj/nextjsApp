const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const servicesCartSchema = new mongoose.Schema(
  {
    //get the customer from the customer collection
    customer: [{ type: ObjectId, ref: "Customer", required: true }],
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },

        //the id of the service and need the name and price which is again derived from price collection
        product: [{ type: ObjectId, ref: "Service", required: true }],
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      default: "services",
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCart", servicesCartSchema);
