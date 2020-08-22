const express = require("express");
const router = express.Router();

//// For routes to be used after "/api"
///Controllers and Middlewares

const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

//bring Controller

const { create } = require("../controllers/blogController");

router.post("/blog", tokenAuth, adminMiddleware, create);

module.exports = router;
