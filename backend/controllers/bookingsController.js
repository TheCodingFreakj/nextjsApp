const Service = require("../models/services");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");
const fs = require("fs");
exports.getCheckoutSession = async (req, res) => {
  try {
    //get the currently booked service

    await Service.findById(req.params.servId);

    //create checkout session

    stripe.checkout.session.create({
      payment_method_types: ["card"],
      success_url: CLIENT_URL,
      cancel_url: CLIENT_URL,
      customer_email: req.user.email,
      client_reference_id: req.params.servId,
      //    line_items:[{
      //        name: `${ser}`
      //    }]
    });

    //send the session to client
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
