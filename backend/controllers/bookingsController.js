const Service = require("../models/services");
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");
const fs = require("fs");

exports.createProducts = async (req, res) => {
  //console.log(req);
  try {
    const service = await Service.findById(req.params.servId);

    const product = await stripe.products.create({
      name: `${service.title} `,
    });

    //extracting the product Id

    //console.log(product);

    let productId = product.id;
    let prodName = product.name;
    // console.log(prodName);
    // console.log(productId);
    // console.log(typeof productId);

    let productDB = new Product({
      prodId: productId,
      prodName: prodName,
    });

    //console.log(productDB);
    await productDB.save();

    res.status(200).json({
      status: "success",
      product,
      productDB,
    });

    //return res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.createPrices = async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(req.body);
    //console.log(product);

    const service = await Service.findOneAndUpdate(req.body).populate(
      "discountedServiceCharges",
      "_id serviceName discountedServiceCharges slug"
    );

    // let durationRange = parseInt(service.duration, 10).valueOf();
    // console.log(durationRange);
    // console.log(typeof "durationRange");

    // let duration = parseInt(service.duration, 16) - 1;

    // console.log("The Duration", duration);

    // console.log(typeof "duration");

    // let discountCharge =
    //   service.discountedServiceCharges[0].discountedServiceCharges;

    // console.log(typeof "discountCharge");

    // console.log("The service charge", discountCharge);

    // console.log(typeof "discountCharge");

    const dueInitial =
      (service.discountedServiceCharges[0].discountedServiceCharges * 40) / 100;

    // console.log("The initial Payment", dueInitial);
    // console.log(typeof "dueInitial");

    const recurringDue =
      (service.discountedServiceCharges[0].discountedServiceCharges -
        dueInitial) /
      (parseInt(service.duration) - 1);

    // console.log("The recurrent amount", recurringDue);
    // console.log(typeof "recurringDue");
    const priceUnit1 = await stripe.prices.create({
      product: product.prodId,
      unit_amount: Math.round(dueInitial),
      currency: "usd",
    });

    const priceUnit2 = await stripe.prices.create({
      product: product.prodId,
      unit_amount: Math.round(recurringDue),
      currency: "usd",
      recurring: {
        interval: "month",
      },
    });

    product.priceUnit1 = priceUnit1.unit_amount;
    product.priceUnit2 = priceUnit2.unit_amount;
    product.priceUnit1Id = priceUnit1.id;
    product.priceUnit2Id = priceUnit2.id;

    await product.save();

    res.status(200).json({
      status: "success",
      priceUnit1,
      priceUnit2,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.createCustomers = async (req, res) => {
  try {
    //get the business model and get the phone address of the consumer
    const customer = await stripe.customers.create({
      email: req.user.email, // This is the user who had logged in
      payment_method: "pm_card_visa",
      invoice_settings: {
        default_payment_method: "pm_card_visa",
      },
    });

    res.status(200).json({
      status: "success",
      customer,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//billing the customers using checkout
exports.getCheckoutSession = async (req, res) => {
  console.log(req.params.servId);
  try {
    //get the currently booked service

    // const service = await Service.findById(req.params.servId).populate(
    //   "discountedServiceCharges",
    //   "_id serviceName discountedServiceCharges slug"
    // );
    // console.log(service);
    //console.log(service.discountedServiceCharges[0].discountedServiceCharges);

    //create checkout session

    //ref: session object: https://stripe.com/docs/api/checkout/sessions/object
    const service = await Service.findById(req.params.servId).exec(
      async (err, service) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }
        console.log(service.title);

        const title = service.title;

        const priceUnits = await Product.findOne({ prodName: title });

        console.log(priceUnits);
        //return res.json(blog);

        const session = await stripe.checkout.sessions.create({
          customer_email: req.user.email,
          payment_method_types: ["card"],
          client_reference_id: req.params.servId,
          mode: "subscription",
          billing_address_collection: "required",
          line_items: [
            {
              price: priceUnits.priceUnit1Id,
              quantity: 1,
            },
            {
              price: priceUnits.priceUnit2Id,
              quantity: 1,
            },
          ],
          success_url: `${req.protocol}://${req.get("host")}/`, // This is the url called when the credit card is successfully charged
          cancel_url: `${req.protocol}://${req.get("host")}/service/${
            service.slug
          }`,
        });

        res.status(200).json({
          status: "success",
          session, //need the session id at the client for the checkout process
        });
      }
    );

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   success_url: `${req.protocol}://${req.get("host")}/`, // This is the url called when the credit card is successfully charged
    //   cancel_url: `${req.protocol}://${req.get("host")}/service/${
    //     service.slug
    //   }`, // This is the url called when the person choose to cancel the payment
    //   customer_email: req.user.email,
    //   client_reference_id: req.params.servId, //this will allow to pass some data about the session .Later once the purchase was successful, we will get access to session object,by then we need to create a new booking in db
    //   line_items: [
    //     {
    //       name: `${service.title} Service`,
    //       description: service.summary,
    //       amount:
    //         service.discountedServiceCharges[0].discountedServiceCharges / 2,
    //       currency: "usd",
    //       quantity: 1,
    //       // images: [service.photo], //create the user id from user email
    //     },
    //   ], // some details about the product purchased
    // });

    //send the session to client

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
