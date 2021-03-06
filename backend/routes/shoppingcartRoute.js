const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");
//bring Controller

const {
  updateToolCart,
  deleteToolsCart,
  updateServiceCart,
  deleteServiceCart,
  fetchCarts,
  deletecartitem,
} = require("../controllers/shoppingcartController");

router.put("/tools-cart", tokenAuth, authMiddleware, updateToolCart);
router.delete("/tools-cart", tokenAuth, authMiddleware, deleteToolsCart);
router.put("/services-cart", tokenAuth, authMiddleware, updateServiceCart);
router.delete("/services-cart", tokenAuth, authMiddleware, deleteServiceCart);
router.get("/fetch-cart", tokenAuth, authMiddleware, fetchCarts);
router.delete("/delete-cart", tokenAuth, authMiddleware, deletecartitem);
module.exports = router;
