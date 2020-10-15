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
  updateToolClientPrice,
  getAllTools,
  removeTool,
  updateTool,
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
router.put("/tool/:slug", tokenAuth, adminMiddleware, updateTool); //update price as well
//call this route when displaying toolprice

router.delete("/tool/:slug", tokenAuth, adminMiddleware, removeTool);

//////////////////////All About ToolPrice /////////////////////////

router.put(
  "/update-tool-price/:slug",
  tokenAuth,
  adminMiddleware,
  updateToolClientPrice
);

module.exports = router;
