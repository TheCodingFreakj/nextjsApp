const express = require("express");
const router = express.Router();

//// For routes to be used after "/api"
///Controllers and Middlewares
const {
  priceCreateValidator,
  comboPackageValidator,
  packagePriceCreateValidator,
} = require("../middlewares/toolsValidator");
const { runValidation } = require("../middlewares/authController");
const { adminMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");

//bring Controller
const {
  createPriceObject,
  createComboPackage,
  createComboPackagePrice,
  getComboPackagePrices,
  getServicePriceLists,
  updateServicePriceLists,
  updatePackagePriceLists,
} = require("../controllers/priceController");

router.post(
  "/price",
  priceCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createPriceObject
);

router.get("/get-price", getServicePriceLists);
router.put(
  "/update-price/:slug",
  tokenAuth,
  adminMiddleware,
  updateServicePriceLists
);

router.post(
  "/combo-package",
  comboPackageValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createComboPackage
);

router.post(
  "/combo-package-price",
  packagePriceCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createComboPackagePrice
);

router.get("/get-combo-price", getComboPackagePrices);

router.put(
  "/update-package-price/:slug",
  tokenAuth,
  adminMiddleware,
  updatePackagePriceLists
);

module.exports = router;
