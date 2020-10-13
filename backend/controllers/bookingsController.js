const Service = require("../models/services");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");
const fs = require("fs");
exports.getCheckoutSession = async (req, res) => {
  try {
    //get the currently booked service

    const service = await Service.findById(req.params.servId).populate(
      "discountedServiceCharges",
      "_id serviceName discountedServiceCharges slug"
    );
    console.log(service);
    //console.log(service.discountedServiceCharges[0].discountedServiceCharges);

    //create checkout session

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/`, // This is the url called when the credit card is successfully charged
      cancel_url: `${req.protocol}://${req.get("host")}/service/${
        service.slug
      }`, // This is the url called when the person choose to cancel the payment
      customer_email: req.user.email,
      client_reference_id: req.params.servId, //this will allow to pass some data about the session .Later once the purchase was successful, we will get access to session object,by then we need to create a new booking in db
      line_items: [
        {
          name: `${service.title} Service`,
          description: service.summary,
          amount:
            service.discountedServiceCharges[0].discountedServiceCharges / 2,
          currency: "usd",
          quantity: 1,
          // images: [service.photo], //create the user id from user email
        },
      ], // some details about the product purchased
    });

    //send the session to client

    res.status(200).json({
      status: "success",
      session,
    });

    // A Checkout Session controls what your customer sees in the Stripe-hosted payment page such as line items,
    // the order amount and currency, and acceptable payment methods.
    // Return the Checkout Session's ID in the response to reference the Session on the client.
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//Try this https://stripe.com/docs/payments/accept-a-payment
//https://github.com/stripe-samples/checkout-one-time-payments
//https://stripe.com/docs/api/authentication

//total solution: https://stripe.com/docs/checkout/integration-builder
