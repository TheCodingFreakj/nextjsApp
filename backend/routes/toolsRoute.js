const express = require("express");
const router = express.Router();
//axios.post(`${API}/api/createTools

//getting the validators for the form fields
const {
  toolsCreateValidator,
  brandsCreateValidator,
} = require("../middlewares/toolsValidator");
const { runValidation } = require("../middlewares/authController");

//get the user middleware and token verification module
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");

//get the module where real logic is written
const {
  createTools,
  getToolClientPrice,
  getAllTools,
  removeTool,
  updateTool,
  createBrands,
  getAllBrands,
  removeBrand,
} = require("../controllers/toolsController");

router.post(
  "/createTools",
  toolsCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createTools
);

router.get("/getTools", getAllTools);

//call this route when displaying toolprice
router.get(
  "/getToolClientPrice",
  tokenAuth,
  adminMiddleware,
  getToolClientPrice
);

router.delete("/tool/:slug", tokenAuth, adminMiddleware, removeTool);
//router.put("/tool/:slug", tokenAuth, adminMiddleware, updateTool);

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
