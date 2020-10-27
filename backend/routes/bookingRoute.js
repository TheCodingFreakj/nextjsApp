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
  retrieveItems,
  createSubscriptions,
  createSubscribedCustomers,
  createCombopackageSubscribeProducts,
  createComboPrices,
} = require("../controllers/bookingsController");

//Route for creating the product

router.post(
  "/create-products/:servId",
  tokenAuth,
  adminMiddleware,
  createProducts
);
//Route for creating the check out prices of the product
router.post("/create-prices/:servId", tokenAuth, adminMiddleware, createPrices);

//Route for creating customer
router.post(
  "/create-customer/:username",
  tokenAuth,
  authMiddleware,
  createCustomers
);
//billing the  customer using checkout
router.get(
  "/checkout-session/:servId",
  tokenAuth,
  authMiddleware,
  getCheckoutSession
);

router.get(
  "/checkout-session/:servId/line_items",
  tokenAuth,
  authMiddleware,
  retrieveItems
);

////////////////////////////////////////Subscriptions/////////////////////////////////////////

//Route for creating subscriptions for the product

router.post(
  "/create-combo-products/:packageId",
  tokenAuth,
  adminMiddleware,
  createCombopackageSubscribeProducts
);

router.post(
  "/create-combo-prices",
  tokenAuth,
  adminMiddleware,
  createComboPrices
);

router.post(
  "/create-subsription-customer/:username",
  tokenAuth,
  authMiddleware,
  createSubscribedCustomers
);
router.post(
  "/create-subscriptions",
  tokenAuth,
  adminMiddleware,
  createSubscriptions
);

module.exports = router;

// https://stripe.com/docs/billing/prices-guide
// https://stripe.com/docs/billing/subscriptions/checkout/fixed-price#create-business-model
//https://stripe.com/docs/billing/subscriptions/checkout/fixed-price#create-business-model

//use this for combopackages:: https://stripe.com/docs/billing/subscriptions/fixed-price#how-to-model-it-on-stripe
