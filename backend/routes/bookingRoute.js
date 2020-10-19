const express = require("express");
const router = express.Router();
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

const {
  getCheckoutSession,
  createProducts,
  createPrices,
  createCustomers,
} = require("../controllers/bookingsController");

//Route for creating the product

router.post(
  "/create-products/:servId",
  tokenAuth,
  adminMiddleware,
  createProducts
);
//Route for creating the prices of the product
router.post("/create-prices", tokenAuth, adminMiddleware, createPrices);

//Route for creating customer
router.post("/create-customer", tokenAuth, adminMiddleware, createCustomers);
//billing the  customer using checkout
router.get(
  "/checkout-session/:servId",
  tokenAuth,
  authMiddleware,
  getCheckoutSession
);

module.exports = router;

// https://stripe.com/docs/billing/prices-guide
// https://stripe.com/docs/billing/subscriptions/checkout/fixed-price#create-business-model
//https://stripe.com/docs/billing/subscriptions/checkout/fixed-price#create-business-model
