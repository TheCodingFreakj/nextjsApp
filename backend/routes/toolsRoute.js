const express = require("express");
const router = express.Router();
//axios.post(`${API}/api/createTools

//getting the validators for the form fields
const { toolsCreateValidator } = require("../middlewares/toolsValidator");
const { runValidation } = require("../middlewares/authController");

//get the user middleware and token verification module
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");

//get the module where real logic is written
const { createTools } = require("../controllers/toolsController");

router.post(
  "/createTools",
  toolsCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  createTools
);

module.exports = router;
