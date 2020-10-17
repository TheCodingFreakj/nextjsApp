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
  updatePriceObject,
  SinglePrice,
  removePrice,
  createComboPackage,
  getComboPackages,
  updateComboPackage,
  SinglePackage,
  createComboPackagePrice,
  updatePackagePriceObject,
  getComboPackagePrices,
  SinglePackagePrice,
  removeComboPackage,
  getServicePriceLists,
  updateServicePriceLists,
  updatePackagePriceLists,
} = require("../controllers/priceController");

//////// All About Service Price ////////////////
router.post(
  "/price",
  priceCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createPriceObject
);

router.get("/get-price", getServicePriceLists);
router.get("/price/:slug", SinglePrice);
router.put(
  "/update-price/:slug",
  tokenAuth,
  adminMiddleware,
  updateServicePriceLists
);

router.delete("/price/:slug", tokenAuth, adminMiddleware, removePrice);

router.put("/price/:slug", tokenAuth, adminMiddleware, updatePriceObject);

/////////////////////All About ComboPackages//////////////////////
router.post(
  "/comboPackage",
  comboPackageValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createComboPackage
);

router.get("/all-combo-Packages", getComboPackages);
router.put("/comboPackage/:slug", updateComboPackage);
router.get("/comboPackage/:slug", SinglePackage);
router.delete(
  "/comboPackage/:slug",
  tokenAuth,
  adminMiddleware,
  removeComboPackage
);

//////////////////////All About ComboPackagePrice /////////////////////////
router.post(
  "/combo-package-price",
  packagePriceCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createComboPackagePrice
);

router.get("/get-combo-price", getComboPackagePrices);
router.get("/combo-package-price/:slug", SinglePackagePrice);
router.put(
  "/combo-package-price/:slug",
  tokenAuth,
  adminMiddleware,
  updatePackagePriceObject
);
// router.delete("/combo-package-price/:slug", tokenAuth, adminMiddleware, removePackagePrice);
router.put(
  "/update-package-price/:slug",
  tokenAuth,
  adminMiddleware,
  updatePackagePriceLists
);

module.exports = router;
