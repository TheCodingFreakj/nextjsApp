const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      unique: true,
      index: true,
    },
    custId: {
      type: String,
      unique: true,
      index: true,
    },

    address: [
      {
        location: {
          type: Number,
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

    phone: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
