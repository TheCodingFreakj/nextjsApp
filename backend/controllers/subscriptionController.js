const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ToolsCart = require("../models/toolsCart");
const ServiceCart = require("../models/serviceCart");
exports.subscribeServices = async (req, res) => {
  console.log(req.body);
  let loggedinuser = req.user;
  let emailFromDb = loggedinuser.email;
  let checkoutemail = req.body.email;
  try {
    //get the cart based on the customer loggedin
    const toolsCart = await ToolsCart.findOne({
      customer: loggedinuser,
    }).populate({ path: "products.product", model: "Tools" });

    const serviceCart = await ServiceCart.findOne({
      customer: loggedinuser,
    }).populate({
      path: "products.product",
      model: "Service",
      populate: {
        path: "discountedServiceCharges",
        model: "Price",
      },
    });

    console.log(serviceCart.products);
    console.log(toolsCart.products);

    //filter products in carts

    let services;
    let tools;
    serviceCart.products.map((product) => {
      if (product) {
        services = product;
      }
    });
    toolsCart.products.map((product) => {
      if (product) {
        tools = product;
      }
    });

    console.log(services);
    console.log(tools);

    //push the product ids to an arrays
    let productIs = [];

    //list all the price

    const prices = await stripe.prices.list({
      limit: 10,
    });

    console.log(prices);
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

    const customer =
      (isExistingCustomer && previousCustomer.data[0].id) || newCustomer.id;

    //get price items
    //create the subscription or
    console.log(customer);
    // const subscription = await stripe.subscriptions.create({
    //   customer: customer,
    //   items: [
    //     {
    //       price: "{{RECURRING_PRICE_ID}}",
    //     },
    //   ],
    //   // add_invoice_items: [
    //   //   {
    //   //     price: "{{PRICE_ID}}",
    //   //   },
    //   // ],
    // });
    //add order to db
    //empty the cart at backend
    //send back order is to front end on the success url
    res.json("done");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// const priceIds = [
//   (seo = price_1HqjCbCmuENtzqJWo6LDtkqN),
//   (contentmarketing = price_1HqjDzCmuENtzqJW1CvA2z59),
//   (funnelmarketing = price_1HqjF3CmuENtzqJWZLe6ex2P),
//   (emailmarketing = price_1HqjGzCmuENtzqJWFOUH78nQ),
//   (facebookmarketing = price_1HqjG6CmuENtzqJWecTMt7AJ),
//   (semrush = price_1HqjIWCmuENtzqJWXr0mL6oy),
//   (ahref = price_1HqjHYCmuENtzqJWqvnzyk4y),
//   (kwfinder = price_1HqjIvCmuENtzqJWRPe2cJsU),
//   (buzzsumo = price_1HqjJbCmuENtzqJWOYWaTWkx),
//   (grammerly = price_1HqjI8CmuENtzqJWmO2ATckE),
//   (getresponse = price_1HqjKCCmuENtzqJWmkecFmOX),
// ];
