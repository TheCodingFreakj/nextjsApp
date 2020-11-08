const ShoppingCart = require("../models/shoppingcart");
const Customer = require("../models/customers");
const { errorHandler } = require("../helpers/dbErrorHandler");
//https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
exports.createCartItems = async (req, res) => {
  const { price, productid, productname } = req.body;
  const customer = req.user;
  const customerid = customer._id;

  try {
    let cart = await ShoppingCart.findOne({ customerid });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productid === productid);
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.price = price;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productid, productname, price });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await ShoppingCart.create({
        customerid,
        products: [{ productid, productname, price }],
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.fetchCart = async (req, res) => {
  try {
    // await Price.find({}).exec((err, pricePackages) => {
    //     if (err) {
    //       return res.status(400).json({ error: errorHandler(err) });
    //     }
    //     res.json(pricePackages);
    //   });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
