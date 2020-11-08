const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");
//bring Controller

const {
  createCartItems,
  fetchCart,
} = require("../controllers/shoppingcartController");

router.post("/cartitems", tokenAuth, authMiddleware, createCartItems);

router.get("/cartitems", tokenAuth, authMiddleware, fetchCart);
module.exports = router;
