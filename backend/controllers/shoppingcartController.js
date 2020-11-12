const ToolsCart = require("../models/toolsCart");
const ServiceCart = require("../models/serviceCart");
const Price = require("../models/price");
const Customer = require("../models/customers");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { errorHandler } = require("../helpers/dbErrorHandler");

//https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
exports.updateToolCart = async (req, res) => {
  console.log(req.body);
  const { quantity, productId } = req.body;
  const customer = req.user;
  const customerid = customer._id;

  try {
    const toolsCart = await ToolsCart.findOne({ customer });
    //iterate over array and check if any meet a give condition
    const productExists = toolsCart.products.some((doc) =>
      ObjectId(productId).equals(doc.product)
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

exports.fetchToolsCart = async (req, res) => {
  const user = req.user._id;
  try {
    const toolsCart = await ToolsCart.findOne({ customer: user }).populate({
      path: "products.product",
      model: "Tools",
    });

    res.status(200).json(toolsCart.products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Please Login Again");
  }
};
//http://localhost:3001/products?productId=5f8fdda74f5975190868cbbe
exports.deleteToolsCart = async (req, res) => {
  const { productId } = req.query;

  console.log(req.user);
  const userid = req.user.id;
  console.log("userid", userid);

  try {
    const updatedCart = await ToolsCart.findOneAndUpdate(
      { customer: userid },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Tools", // This is ref value
    });

    res.status(200).json(updatedCart.products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Please Login Again");
  }
};

exports.fetchServicesCart = async (req, res) => {
  const user = req.user._id;
  try {
    const serviceCart = await ServiceCart.findOne({ customer: user }).populate({
      path: "products.product",
      model: "Service",
      populate: {
        path: "discountedServiceCharges",
        model: "Price",
      },
    });

    console.log(serviceCart.products);

    res.status(200).json(serviceCart.products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateServiceCart = async (req, res) => {
  const { quantity, serviceId } = req.body;
  const customer = req.user;

  try {
    const serviceCart = await ServiceCart.findOne({ customer });
    //iterate over array and check if any meet a give condition
    const productExists = serviceCart.products.some((doc) =>
      ObjectId(serviceId).equals(doc.product)
    );
    if (productExists) {
      await ServiceCart.findOneAndUpdate(
        {
          _id: serviceCart._id,
          "products.product": serviceId,
        },
        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      const newProduct = { quantity, product: serviceId };
      await ServiceCart.findOneAndUpdate(
        {
          _id: serviceCart._id,
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

exports.deleteServiceCart = async (req, res) => {
  const { serviceId } = req.query;

  console.log(req.user);
  const userid = req.user.id;
  console.log("userid", userid);

  try {
    const updateddCart = await ServiceCart.findOneAndUpdate(
      { customer: userid },
      { $pull: { products: { product: serviceId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Services", // This is ref value
    });

    res.status(200).json(updateddCart.products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Please Login Again");
  }
};
