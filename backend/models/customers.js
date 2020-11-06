const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },

    email: {
      type: String,
      unique: true,
    },
    custId: {
      type: String,
      unique: true,
      default: "0",
    },

    address: [
      {
        location: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },

        region: {
          type: String,
          required: true,
        },
        pinCode: {
          type: Number,
          required: true,
        },
      },
    ],

    description: {
      type: String,
      unique: true,
      index: true,
    },
    // servicessTaken: [{ type: ObjectId, ref: "Services", required: true }],
    // toolPurchased: [{ type: ObjectId, ref: "Tools", required: true }],

    phone: {
      type: String,
      unique: true,
      index: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
