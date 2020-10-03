const express = require("express");
const router = express.Router();

//bring Controller

const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");

const {
  read,
  publicUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserProfilephoto,
} = require("../controllers/userProfileController");

//bring validators

router.get("/user/profile", tokenAuth, authMiddleware, read);
router.get("/users", getAllUsers); // for private profile to update delete
router.get("/user/:username", publicUserProfile);
router.put("/user/update", tokenAuth, authMiddleware, updateUserProfile); //if you want to update the profile this applies
router.get("/user/photo/:userId", getUserProfilephoto); //for upload profile image

//router.get("/blog/photo/:slug", photo);

// exports.photo = async (req, res) => {
//   //get the data from form body
//   const slug = req.params.slug.toLowerCase();
//   try {
//     await Blog.findOne({ slug })
//       .select("photo")
//       .exec((err, blog) => {
//         if (err || !blog) {
//           return res.status(400).json({ errors: errorHandler(err) });
//         }

//         res.set("Content-Type", blog.photo.contentType);
//         return res.send(blog.photo.data);
//       });
//   } catch (error) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
module.exports = router;
