const express = require("express");
const router = express.Router();

//// For routes to be used after "/api"
///Controllers and Middlewares

const { tagsCreateValidator } = require("../middlewares/tags");
const { runValidation } = require("../middlewares/authController");
const {
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");
const tokenAuth = require("../middlewares/tokenAuth");
//bring Controller

const { create } = require("../controllers/tagController");
const { list } = require("../controllers/tagController");
const { read } = require("../controllers/tagController");
const { removeTag } = require("../controllers/tagController");

router.post(
  "/tag",
  tagsCreateValidator,
  runValidation,
  tokenAuth,
  adminMiddleware,
  create
);

router.get("/tags", list);

//access :slug using req.params
router.get("/tag/:slug", read);
router.delete("/tag/:slug", tokenAuth, adminMiddleware, removeTag);

module.exports = router;
