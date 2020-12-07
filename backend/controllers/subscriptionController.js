const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ToolsCart = require("../models/toolsCart");
const ServiceCart = require("../models/serviceCart");
exports.subscribeServices = async (req, res) => {
  console.log(req.body);
  let loggedinuser = req.user;
  let checkoutemail = req.body.email;

  try {
    // //get the cart based on the customer loggedin
    // const toolsCart = await ToolsCart.findOne({
    //   customer: loggedinuser,
    // }).populate({ path: "products.product", model: "Tools" });

    // const serviceCart = await ServiceCart.findOne({
    //   customer: loggedinuser,
    // }).populate({
    //   path: "products.product",
    //   model: "Service",
    //   populate: {
    //     path: "discountedServiceCharges",
    //     model: "Price",
    //   },
    // });

    // console.log(serviceCart.products);
    // console.log(toolsCart.products);

    // //filter products in carts

    // let services;
    // let tools;
    // serviceCart.products.map((product) => {
    //   if (product) {
    //     services = product;
    //   }
    // });
    // toolsCart.products.map((product) => {
    //   if (product) {
    //     tools = product;
    //   }
    // });

    // console.log(services);
    // console.log(tools);

    // //push the product ids to an arrays
    // let productIs = [];

    // console.log(prices);
    //see ifi tsi linked to stripe customer

    const previousCustomer = await stripe.customers.list({
      email: checkoutemail,
      limit: 1,
    });

    const isExistingCustomer = previousCustomer.data.length > 0;
    //if not create the customer based on email

    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: checkoutemail,
        id: req.user.id,
        phone: req.body.phone,
        address: req.body.phone.billingAddress,
        payment_method: "pm_card_visa",
        invoice_settings: {
          default_payment_method: "pm_card_visa",
        },
      });
    }
    //https://stripe.com/docs/api/subscriptions/create
    const customer =
      (isExistingCustomer && previousCustomer.data[0].id) || newCustomer.id;
    console.log(customer);
    //get price items
    //create the chrage or

    const charge = await stripe.charges.create({
      amount: req.body.amttt,
      currency: "usd",
      source: "tok_mastercard",
      description: "Emi payment",
    });
    res.status(200).json({
      status: "success",
      id: charge.id, //need the session id at the client for the checkout process
      charge,
    });
    //https://stripe.com/docs/api/charges/create
    //add order to db
    //empty the cart at backend
    //send back order is to front end on the success url
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getCheckoutSession = async (req, res) => {
  console.log("body", req.body);

  try {
    const session = await stripe.subscriptions.create({
      customer_email: req.user.email,
      payment_method_types: ["card"],
      client_reference_id: req.params.userId,
      mode: "subscription",
      billing_address_collection: "required",
      line_items: [{ price: req.body.amttt, quantity: 1 }],
      success_url: `${req.protocol}://${req.get("host")}/${req.body.user}`, // This is the url called when the credit card is successfully charged
      cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    });
    ///success?session_id=${session.id}
    res.status(200).json({
      status: "success",
      id: session.id, //need the session id at the client for the checkout process
      session,
    });

    // try this
    // https://stripe.com/docs/payments/accept-a-payment
    //add order to db
    //empty the cart at backend
    //send back order is to front end on the success url
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// const priceIds = [
//   (seo = price_1Hr2c3GERwFTkr9GMZCvmZM6),
//   (contentmarketing = price_1Hr2dVGERwFTkr9GplP4g025),
//   (funnelmarketing = price_1Hr2e2GERwFTkr9G40kSSENb),
//   (emailmarketing = price_1Hr2fdGERwFTkr9GQjPFfaGa),
//   (facebookmarketing = price_1Hr2eZGERwFTkr9GtzSECbX9),
//   (semrush = price_1Hr2aqGERwFTkr9GUN4rjyvs),
//   (ahref = price_1Hr2aMGERwFTkr9GqX8c2ouu),
//   (kwfinder = price_1Hr2ZBGERwFTkr9GYUaGXVZ1),
//   (buzzsumo = price_1Hr2ZZGERwFTkr9G2QwpsOR7),
//   (grammerly = price_1Hr2ZyGERwFTkr9G6grf5xaN),
//   (getresponse = price_1Hr2YgGERwFTkr9GXlYB3HMY),
// ];
