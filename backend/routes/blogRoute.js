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

const {
  create,
  list,
  listAllBlogsByCatAndTags,
  read,
  removeBlog,
  updateBlog,
} = require("../controllers/blogController");

router.post("/blog", tokenAuth, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllBlogsByCatAndTags);
router.post("/blog/:slug", read);
router.delete("/blog/:slug", tokenAuth, adminMiddleware, removeBlog);
router.put("/blog/:slug", tokenAuth, adminMiddleware, updateBlog);

module.exports = router;
