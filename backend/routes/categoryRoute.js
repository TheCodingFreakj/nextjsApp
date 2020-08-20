const express = require("express");
const router = express.Router();

//// For routes to be used after "/api"
///Controllers and Middlewares

const { categoryCreateValidator } = require("../middlewares/category");
const { runValidation } = require("../middlewares/authController");
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");
//bring Controller

const { create } = require("../controllers/categoryController");
const { list } = require("../controllers/categoryController");
const { read } = require("../controllers/categoryController");
const { removeCat } = require("../controllers/categoryController");

router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  create
);

router.get("/categories", list);

//access :slug using req.params
router.get("/category/:slug", read);
router.delete("/category/:slug", tokenAuth, adminMiddleware, removeCat);

module.exports = router;
