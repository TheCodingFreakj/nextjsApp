const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");
//bring Controller

const {
  updateToolCart,
  fetchToolsCart,
  deleteToolsCart,
  fetchServicesCart,
  updateServiceCart,
  deleteServiceCart,
} = require("../controllers/shoppingcartController");
router.get("/tools-cart", tokenAuth, authMiddleware, fetchToolsCart);
router.put("/tools-cart", tokenAuth, authMiddleware, updateToolCart);
router.delete("/tools-cart", tokenAuth, authMiddleware, deleteToolsCart);

router.put("/services-cart", tokenAuth, authMiddleware, updateServiceCart);
router.delete(
  "/services-cart/:productId",
  tokenAuth,
  authMiddleware,
  deleteServiceCart
);
router.get("/services-cart", tokenAuth, authMiddleware, fetchServicesCart);

module.exports = router;
