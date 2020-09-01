const express = require("express");
const router = express.Router();

//// For routes to be used after "/api"
///Controllers and Middlewares

const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
  canUpdateAndDeleteBlog,
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
  photo,
  listRelated,
  BlogSearchLists,
  listByUser,
} = require("../controllers/blogController");

router.post("/blog", tokenAuth, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllBlogsByCatAndTags);
router.post("/blog/:slug", read);
router.delete("/blog/:slug", tokenAuth, adminMiddleware, removeBlog);
router.put("/blog/:slug", tokenAuth, adminMiddleware, updateBlog);
router.get("/blog/photo/:slug", photo);
router.post("/blogs/related", listRelated);
router.get("/blogs/search", BlogSearchLists);

//This is the auth user blog crud
router.post("/user/blog", tokenAuth, authMiddleware, create);
router.get("/:username/blogs", listByUser); //This is the username with which we find id to check
router.delete(
  "/blog/:slug",
  tokenAuth,
  authMiddleware,
  canUpdateAndDeleteBlog,
  removeBlog
);
router.put(
  "/blog/:slug",
  tokenAuth,
  authMiddleware,
  canUpdateAndDeleteBlog,
  updateBlog
);
module.exports = router;
