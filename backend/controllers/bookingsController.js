const ComboPackage = require("../models/comboPackages");
const Service = require("../models/services");
const Product = require("../models/product");
const Customer = require("../models/customers");
const User = require("../models/user");
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
  //get the totalPrice from frontend= toolPrice + serviceCharges

  //content-marketing: 50
  //seo/funnelmarketing: 102.3
  //email-marketing: facebook-marketing : 274.35
  //corporate/personal blogs  //static: 19530
  //author:26040
  //ecommece:61600
  //wordpress:35200
  //somglepage:22785
  try {
    let product = await Product.findOneAndUpdate({
      prodName: req.body.prodName,
    });
    // console.log(product);

    //supply service id
    const bookedservice = await Service.findById(req.params.servId)
      .populate("tools", "_id tool clientPrice slug")
      .populate("discountedServiceCharges", " discountedServiceCharges ");
    // console.log(bookedservice);
    // console.log(
    //   "serviceprices",
    //   bookedservice.discountedServiceCharges[0].discountedServiceCharges
    // );

    //we have to match what comes from frontend
    // let durationRange = parseInt(service.duration, 10).valueOf();
    // console.log(durationRange);
    // console.log(typeof "durationRange");

    let duration = parseInt(bookedservice.duration, 10) - 1;

    // console.log("The Duration", duration);

    // console.log(typeof "duration");

    let discountCharge =
      bookedservice.discountedServiceCharges[0].discountedServiceCharges;

    // console.log(typeof "discountCharge");

    console.log("The service charge", discountCharge);

    // console.log(typeof "discountCharge");

    const dueInitial =
      (bookedservice.discountedServiceCharges[0].discountedServiceCharges *
        40) /
      100;

    console.log("The initial Payment", dueInitial);
    // console.log(typeof "dueInitial");

    // const toolPrice = totalPrice - dueInitial;
    // console.log("the tool price", toolPrice);

    // const priceunit1 = toolPrice + dueInitial;
    const recurringDue = discountCharge - dueInitial;

    // const recurringDue =
    //   (service.discountedServiceCharges[0].discountedServiceCharges -
    //     dueInitial) /
    //   (parseInt(service.duration) - 1);

    //console.log("The recurrent amount", recurringDue);
    // console.log(typeof "recurringDue");

    //client pays starter amount

    const priceUnit1 = await stripe.prices.create({
      product: product.prodId,
      unit_amount: Math.round(dueInitial), //This is toolprice + discountedserviceCharges
      //toolPrice will depend on what client chooses from frontend. toolPrice is dynamic
      currency: "usd",
    });

    //client pays this per month
    const priceUnit2 = await stripe.prices.create({
      product: product.prodId,
      unit_amount: Math.round(recurringDue), //This is toolprice + discountedserviceCharges
      currency: "usd",
      recurring: {
        interval: "month",
      },
    });

    // console.log(priceUnit1);
    // console.log(priceUnit2);

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
    const user = await Customer.findOne({ username: req.params.username });

    const customer = await stripe.customers.create({
      name: user.customerName,
      email: user.email, // This is the user who had logged in
      description: user.description,
      phone: user.phone,
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
//ref: session object: https://stripe.com/docs/api/checkout/sessions/object
//https://stripe.com/docs/api/checkout/sessions/create
exports.getCheckoutSession = async (req, res) => {
  // console.log("From frontend", req.params);
  // console.log("From frontend", req.query);
  // console.log("From frontend", req.query.checkedTool);

  const checkedTool = req.query.checkedTool.split(",");
  // console.log(checkedTool);
  //get the sessionid
  //get the price to be paid
  //serviceId?234
  //get tools price
  //get service price

  //priceAmount = serviceCharges + toolPrice

  console.log(req.protocol);
  console.log(req.get("host"));
  try {
    //get the currently booked service
    const bookedservice = await Service.findById(req.params.servId)
      .populate("tools", "_id tool clientPrice slug")
      .populate("discountedServiceCharges", " discountedServiceCharges ");
    //console.log(bookedservice);
    // console.log(
    //   bookedservice.discountedServiceCharges[0].discountedServiceCharges
    // );

    //console.log(bookedservice.tools);

    // console.log(toolBooked);

    let toolchecked = [];

    checkedTool.map((tool) => toolchecked.push({ tool_id: tool }));

    console.log("Checked", toolchecked);

    let checkedArray = [];
    bookedservice.tools.forEach((price, index) => {
      // console.log(price);
      console.log("price", price._id);
      console.log(typeof String(price._id)); //object
      toolchecked.map((o) => {
        console.log("price inside toolchecked", price._id);
        console.log(typeof String(price._id));
        // console.log(o);
        // console.log(typeof o);
        console.log("tool", o.tool_id); //string
        console.log(typeof o.tool_id);
        if (o.tool_id === String(price._id)) {
          console.log(price);
          checkedArray.push(price);
        } else {
          console.log("It is not matching");
        }
      });

      console.log(checkedArray);
    });

    //create checkout session
    // const serviceSelected = await Service.findById(req.params.servId).exec(
    //   async (err, service) => {
    //     if (err) {
    //       return res.status(400).json({ errors: errorHandler(err) });
    //     }
    //     console.log(service.title);
    //     const title = service.title;

    //     const totalPrice = req.query.priceAmount;
    //     console.log("The entire price", totalPrice);

    //     //extract the tool price

    //     const serviceCharges =
    //       bookedservice.discountedServiceCharges[0].discountedServiceCharges;

    //     const toolPrice = toolBooked.clientPrice;
    //     console.log("the tool price", toolPrice);

    //     const payPrice1 = toolPrice + priceUnit1; (from product collectipn)
    //     const payPrice2= priceUnit2
    //     console.log(priceunit1);
    //     console.log(priceUnit2);
    //     // const priceUnits = await Product.findOne({ prodName: title });
    //     // console.log(priceUnits);
    //     //return res.json(blog);
    //     const session = await stripe.checkout.sessions.create({
    //       customer_email: req.user.email,
    //       payment_method_types: ["card"],
    //       client_reference_id: req.params.servId,
    //       mode: "subscription",
    //       billing_address_collection: "required",
    //       line_items: [
    //         {
    //           price: payPrice1,
    //           quantity: 1,
    //         },
    //         {
    //           price: parseInt(payPrice2),
    //           quantity: 1,
    //         },
    //       ],
    //       success_url: `${req.protocol}://${req.get("host")}`, // This is the url called when the credit card is successfully charged
    //       cancel_url: `${req.protocol}://${req.get("host")}/service/${
    //         service.slug
    //       }`,
    //     });
    //     ///success?session_id=${session.id}
    //     res.status(200).json({
    //       status: "success",
    //       id: session.id, //need the session id at the client for the checkout process
    //       session,
    //     });
    //   }
    //);
    //send the session to client
    // A Checkout Session controls what your customer sees in the Stripe-hosted payment page such as line items,
    // the order amount and currency, and acceptable payment methods.
    // Return the Checkout Session's ID in the response to reference the Session on the client.
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.retrieveItems = async (req, res) => {
  try {
    //get the business model and get the phone address of the consumer
    //https://stripe.com/docs/api/checkout/sessions/line_items?lang=node
    stripe.checkout.sessions.listLineItems(
      "cs_test_fExD3xBYjK9NQW43VfbGrfDtCJPUCDsN0qjZwGQ9bMokveAMvzECR2E6",
      { limit: 5 },
      function (err, lineItems) {
        // asynchronously called

        res.status(200).json({
          status: "success",
          lineItems,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//Try this https://stripe.com/docs/payments/accept-a-payment
//https://github.com/stripe-samples/checkout-one-time-payments
//https://stripe.com/docs/api/authentication

//total solution: https://stripe.com/docs/checkout/integration-builder

////////////////////////////////////////Subscriptions/////////////////////////////////////////

exports.createCombopackageSubscribeProducts = async (req, res) => {
  //console.log(req);
  try {
    const combopackage = await ComboPackage.findById(req.params.packageId);

    const package = await stripe.products.create({
      name: `${combopackage.comboPackageName} `,
    });

    //extracting the product Id

    //console.log(product);

    let packageId = package.id;
    let packageName = package.name;
    // console.log(prodName);
    // console.log(productId);
    // console.log(typeof productId);

    let productDB = new Product({
      prodId: packageId,
      prodName: packageName,
    });

    //console.log(productDB);
    await productDB.save();

    res.status(200).json({
      status: "success",
      package,
      productDB,
    });

    //return res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.createComboPrices = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    let product = await Product.findOneAndUpdate({
      prodName: req.body.prodName,
    });
    console.log(product);

    const package = await ComboPackage.findOne({
      comboPackageName: req.body.prodName,
    }).populate(
      "checkedPrice",
      "_id comboPackageName discountedPackageCharges slug"
    );

    console.log(package);

    // let durationRange = parseInt(service.duration, 10).valueOf();
    // console.log(durationRange);
    // console.log(typeof "durationRange");

    // console.log("The Duration", duration);

    // console.log(typeof "duration");

    let discountCharge = package.checkedPrice[0].discountedPackageCharges;

    // console.log(typeof "discountCharge");

    // console.log("The service charge", discountCharge);

    // console.log(typeof "discountCharge");

    // const dueInitial =
    //   (package.discountedPackageCharges[0].discountedPackageCharges * 30) / 100;

    const dueInitial = (discountCharge * 30) / 100;

    console.log("The initial Payment", dueInitial);
    // console.log(typeof "dueInitial");

    // const recurringDue =
    //   (service.discountedServiceCharges[0].discountedServiceCharges -
    //     dueInitial) /
    //   (parseInt(service.duration) - 1);

    const recurringDue = discountCharge - dueInitial;

    console.log("The recurrent amount", recurringDue);
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

exports.createSubscriptions = async (req, res) => {
  try {
    //get the business model and get the phone address of the consumer

    const subscription = await stripe.subscriptions.create({
      customer: "{{CUSTOMER_ID}}",
      items: [
        {
          price: "{{RECURRING_PRICE_ID}}",
        },
      ],
      add_invoice_items: [
        {
          price: "{{PRICE_ID}}",
        },
      ],
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
//https://stripe.com/docs/api/subscriptions/create?lang=node
//https://stripe.com/docs/billing/subscriptions/subscription-schedules

exports.createSubscribedCustomers = async (req, res) => {
  try {
    //get the customer info from frontend which is stored in customer object
    //create a landing page and store the customer info in customer collection
    // const customer = await stripe.customers.create({
    //   name: user.customerName,
    //   email: user.email, // This is the user who had logged in
    //   description: user.description,
    //   phone: user.phone,
    //   payment_method: "pm_card_visa",
    //   invoice_settings: {
    //     default_payment_method: "pm_card_visa",
    //   },
    // });
    // res.status(200).json({
    //   status: "success",
    //   customer,
    // });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//see example: https://xt7b9.sse.codesandbox.io/

//combopackage....

// frontend shows total price with discount rate... also shows per month biilings
// click the button...goes to subscriptio page

//use these two: https://stripe.com/docs/billing/subscriptions/fixed-price#create-customer
//https://stripe.com/docs/billing/subscriptions/overview#integration-example
