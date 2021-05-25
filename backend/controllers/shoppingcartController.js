const ToolsCart = require("../models/toolsCart");
const ServiceCart = require("../models/serviceCart");
const mongoose = require("mongoose");

const ObjectId = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51HaLO5GERwFTkr9GyJJgTIwZ7XtkR6rYuxXxZ1tN88QN4pUPrsLh2lAeUq96XGN8vUHacwTFZyfEYPyXb94EdyUJ007f02JxxE"
);

exports.updateToolCart = async (req, res) => {
  const { quantity, productId } = req.body;
  const customer = req.user;
  const customerid = customer._id;

  try {
    const toolsCart = await ToolsCart.findOne({ customer });
    //iterate over array and check if any meet a give condition
    const productExists = toolsCart.products.some(
      (doc) => productId === String(doc.product)
    );
    if (productExists) {
      await ToolsCart.findOneAndUpdate(
        {
          _id: toolsCart._id,
          "products.product": productId,
        },
        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      const newProduct = { quantity, product: productId };
      await ToolsCart.findOneAndUpdate(
        {
          _id: toolsCart._id,
        },
        { $addToSet: { products: newProduct } }
      );
    }

    res.status(200).send("Cart Updated");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.updateServiceCart = async (req, res) => {
  const { quantity, serviceId } = req.body;
  const customer = req.user;
  const serviceCart = await ServiceCart.findOne({ customer });
  const productExists = serviceCart.products.some(
    (doc) => serviceId === String(doc.product)
  );

  //add the product in cart
  if (productExists === false) {
    const newProduct = { quantity, product: serviceId };
    await ServiceCart.findOneAndUpdate(
      {
        _id: serviceCart._id,
      },
      { $addToSet: { products: newProduct } }
    );
    res
      .status(200)
      .send("Your service cart is updated with product and quanity");
  }

  ///update the quantity
  if (productExists === true) {
    await ServiceCart.findOneAndUpdate(
      {
        _id: serviceCart._id,
        "products.product": serviceId,
      },
      { $inc: { "products.$.quantity": quantity } }
    );

    res.status(200).send("Your service cart is updated with the quantity");
  }
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Cart Can't Be Updated");
  }
};

exports.fetchCarts = async (req, res) => {
  const user = req.user._id;

  try {
    const toolsCart = await ToolsCart.findOne({ customer: user }).populate({
      path: "products.product",
      model: "Tools",
    });
    console.log(toolsCart);
    toolcarts = toolsCart.products;

    const serviceCart = await ServiceCart.findOne({ customer: user }).populate({
      path: "products.product",
      model: "Service",
      populate: {
        path: "discountedServiceCharges",
        model: "Price",
      },
    });
    console.log(serviceCart);
    serviceCarts = serviceCart.products;
    // console.log(serviceCarts);
    if (serviceCart) {
      res
        .status(200)
        .json({ toolsCart, serviceCart, msg: "Item Updated", userId: user });
    } else if (toolsCart) {
      res
        .status(200)
        .json({ toolsCart, serviceCart, msg: "Item Updated", userId: user });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Cant fetch the server");
  }
};

exports.getOrderDetails = async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(req.body.amttt),
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
    setup_future_usage: "off_session",
  });

  res.status(200).send({
    msg: "order confirmed",
    secret: paymentIntent.client_secret,
  });
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Cant fetch the server");
  }
};

exports.createPaymentIntent = async (req, res) => {
  const { items, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: currency,
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      publishableKey: process.env.STRIPE_SECRET_KEY,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Cant fetch the server");
  }
};

exports.deleteToolsCart = async (req, res) => {
  const { productId } = req.query;
  const userid = req.user.id;
  // console.log("The query", req.query);
  let toolcarts;
  try {
    const updatedCart = await ToolsCart.findOneAndUpdate(
      { customer: userid },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Tools", // This is ref value
    });

    toolcarts = updatedCart.products;
    res.status(200).json({ toolcarts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Please Login Again");
  }
};

exports.deleteServiceCart = async (req, res) => {
  console.log("The user", req.user);
  const { serviceId } = req.query;
  const user = req.user.id;
  console.log("The query", req.query);
  let serviceCarts;
  try {
    const updateddCart = await ServiceCart.findOneAndUpdate(
      { customer: user },
      { $pull: { products: { product: serviceId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Service", // This is ref value
    });
    serviceCarts = updateddCart.products;
    console.log(serviceCarts);
    res.status(200).json({ serviceCarts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Item Not Found");
  }
};

exports.deletecartitem = async (req, res) => {
  const { productId, serviceId } = req.query;
  const user = req.user.id;
  console.log("The query", req.query);
  let toolcarts;
  let serviceCarts;
  try {
    if (productId) {
      const updatedCart = await ToolsCart.findOneAndUpdate(
        { customer: user },
        { $pull: { products: { product: productId } } },
        { new: true }
      ).populate({
        path: "products.product",
        model: "Tools", // This is ref value
      });
      toolcarts = updatedCart.products;
    } else if (serviceId) {
      const updateddCart = await ServiceCart.findOneAndUpdate(
        { customer: user },
        { $pull: { products: { product: serviceId } } },
        { new: true }
      ).populate({
        path: "products.product",
        model: "Service", // This is ref value
      });

      serviceCarts = updateddCart.products;
    }
    console.log("toolcarts", toolcarts);
    console.log("serviceCarts", serviceCarts);
    res.status(200).json({ toolcarts, serviceCarts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Please Login Again");
  }
};
