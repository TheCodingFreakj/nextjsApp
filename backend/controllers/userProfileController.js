const User = require("../models/user");
const Blog = require("../models/blog");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.read = (req, res) => {
  // console.log(req.user);

  const authenticatedUser = req.user;
  authenticatedUser.hashed_password = undefined;

  return res.json(authenticatedUser);
};

exports.publicUserProfile = async (req, res) => {
  //we need a username

  let username = req.params.username;
  let user;
  let blogs;

  try {
    await User.findOne({ username }).exec(async (err, userFromDb) => {
      if (err || !userFromDb) {
        return res.status(400).json({
          error: "We need not find the user",
        });
      }

      user = userFromDb;
      let userId = user._id;
      await Blog.find({ postedBy: userId })
        .populate("categories", "_id name slug")
        .populate("tags", "_id name slug")
        .populate("postedBy", "_id name ")
        .limit(10)
        .select(
          "_id title slug excerpt categories tags postedBy createdAt updatedAt"
        )
        .exec((err, blogs) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }

          user.photo = undefined;
          res.json({
            user,
            blogs: blog, // we are sending the user info and blogs written as we click on the author link
          });
        });
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
