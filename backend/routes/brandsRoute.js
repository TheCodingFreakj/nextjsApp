const express = require("express");
const router = express.Router();

//getting the validators for the form fields
const { brandsCreateValidator } = require("../middlewares/toolsValidator");
const { runValidation } = require("../middlewares/authController");

//get the user middleware and token verification module
const { adminMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");

//get the module where real logic is written
const {
  createBrands,
  getAllBrands,
  removeBrand,
} = require("../controllers/brandsController");

router.post(
  "/createBrand",
  brandsCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createBrands
);

router.get("/getBrands", getAllBrands);
router.delete("/brand/:slug", tokenAuth, adminMiddleware, removeBrand);

module.exports = router;
