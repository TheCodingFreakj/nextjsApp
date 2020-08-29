const User = require("../models/user");
const Blog = require("../models/blog");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.read = (req, res) => {
  // console.log(req.user);

  const authenticatedUser = req.user;
  authenticatedUser.hashed_password = undefined;

  return res.json(authenticatedUser);
};

exports.publicUserProfile = async (req, res) => {
  //we need a username

  let username = req.params.username;
  console.log(username);
  let user;
  let blogs;

  try {
    await User.findOne({ username }).exec(async (err, userFromDb) => {
      if (err || !userFromDb) {
        return res.status(400).json({
          error: "We did not find the user",
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
          user.hashed_password = undefined;
          res.json({
            user,
            blogs: blogs, // we are sending the user info and blogs written as we click on the author link
          });
        });
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateUserProfile = async (req, res) => {
  //console.log(req.user);
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not uploaded",
        });
      }

      let user = req.user; //This is coming from authMiddleware
      //console.log(user);
      user = _.extend(user, fields); //if fields change then they will be merged

      //checking for password

      if (fields.password && fields.password.length < 6) {
        return res.status(400).json({
          error: "Please Make your password 6 characters long",
        });
      }

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }

        user.photo.data = fs.readFileSync(files.photo.path);
        user.photo.contentType = files.photo.type;
      }

      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        result.hashed_password = undefined;

        res.json(result);

        console.log(result);
      });
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
exports.getUserProfilephoto = async (req, res) => {
  const username = req.params.username;
  //console.log(username);
  try {
    await User.findOne({ username }).exec((err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "This  user does not exist in the database" });
      }
      if (user.photo.data) {
        res.set("Content-Type", user.photo.contentType);
        return res.send(user.photo.data);
      }
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
