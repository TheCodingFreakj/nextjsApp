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
  calculateDiscountedServices,
  calculatePackagePrice,
} = require("../controllers/priceController");

router.post(
  "/price",
  priceCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createPriceObject
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

// router.post(
//   "/combo-package",
//   priceCreateValidator,
//   runValidation,
//   tokenAuth,
//   adminMiddleware,
//   createComboPackage
// );

// router.post(
//   "/package-price",
//   priceCreateValidator,
//   runValidation,
//   tokenAuth,
//   adminMiddleware,
//   createPricePackage
// );
router.get("/get-discount-price", calculateDiscountedServices);

//access :slug using req.params
router.get("/get-discount-package", calculatePackagePrice);
// router.delete(
//   "/price/:slug",
//   tokenAuth,
//   adminMiddleware,
//   CalculatePackagePrice
// );

module.exports = router;
