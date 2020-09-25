const express = require("express");
const router = express.Router();

//getting the validators for the form fields
const { toolsCreateValidator } = require("../middlewares/toolsValidator");
const { runValidation } = require("../middlewares/authController");

//get the user middleware and token verification module
const { adminMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");

//get the module where real logic is written
const {
  createTools,
  getToolClientPrice,
  getAllTools,
  removeTool,
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

module.exports = router;
