const express = require("express");
const router = express.Router();

//// For routes to be used after "/api"
///Controllers and Middlewares

const { priceCreateValidator } = require("../middlewares/toolsValidator");
const { runValidation } = require("../middlewares/authController");
const { adminMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");
//bring Controller

const {
  Prices,
  GetPriceList,
  UpdatePriceList,
  RemovePrice,
} = require("../controllers/priceController");

router.post(
  "/create-price-list",
  priceCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  Prices
);

router.get("/get-price-list", GetPriceList);

//access :slug using req.params
router.get("/price/:slug", UpdatePriceList);
router.delete("/price/:slug", tokenAuth, adminMiddleware, RemovePrice);

module.exports = router;
