const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");
//bring Controller

const {
  updateToolCart,
  fetchToolsCart,
  fetchServicesCart,
} = require("../controllers/shoppingcartController");

router.put("/tools-cart", tokenAuth, authMiddleware, updateToolCart);

router.get("/tools-cart", tokenAuth, authMiddleware, fetchToolsCart);
router.get("/services-cart", tokenAuth, authMiddleware, fetchServicesCart);
module.exports = router;
