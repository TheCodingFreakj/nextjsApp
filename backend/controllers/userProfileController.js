const User = require("../models/user");
const Blog = require("../models/blog");
const Customer = require("../models/customers");
const ServiceCart = require("../models/serviceCart");
const ToolsCart = require("../models/toolsCart");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.read = (req, res) => {
  console.log("The verified user is again passed to read method ", req.user); //Also getting the verified user

  const authenticatedUser = req.user;
  authenticatedUser.hashed_password = undefined;

  console.log(
    "We will return the authenticated user minus password info",
    authenticatedUser
  ); //This is without password

  return res.json(authenticatedUser);
};

exports.publicUserProfile = async (req, res) => {
  //we need a username
  // console.log(
  //   "This is params..This is the query object passed from getServerSideprops",
  //   req.params
  // );
  let username = req.params.username;
  // console.log("This is the username as per req params", username);
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
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateUserProfile = async (req, res) => {
  // console.log(
  //   "This is the entire updated user info I got after update",
  //   req.user
  // );
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
      console.log("This is the entire user info I got just to update", user);
      user = _.extend(user, fields); //if fields change then they will be merged

      // console.log("This is the merged info", user);
      // console.log("The fields which i currently changed", fields);
      // console.log("These are the user files", files);

      //checking for password

      if (fields.password && fields.password.length < 6) {
        return res.status(400).json({
          error: "Please Make your password 6 characters long",
        });
      }

      //for photo update
      //runs when user updates photo

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

        console.log(result);
        user.hashed_password = undefined;
        user.photo = undefined;

        res.json(user);
        console.log(user);
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getUserProfilephoto = async (req, res) => {
  // console.log(req.body.username);
  //const username = req.body._id;
  const userId = req.params.userId;
  console.log(userId);
  try {
    await User.findOne({ _id: userId }).exec((err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "This user does not exist in the database" });
      }

      console.log("This is the user data that needed to be changed", user);

      if (user.photo.data) {
        res.set("Content-Type", user.photo.contentType);
        return res.send(user.photo.data);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    await User.find()
      .select("-photo")
      .exec((err, users) => {
        if (err) {
          return res
            .status(400)
            .json({ error: "This user does not exist in the database" });
        }
        res.send(users);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getBusinessDetails = async (req, res) => {
  // console.log(
  //   "This is the entire updated user info I got after update",
  //   req.user
  // );

  const { location, region, city, description, pinCode, phone } = req.body;
  console.log(req.body);
  console.log(req.params);

  const customerDetails = {};

  if (description) customerDetails.description = description;
  if (phone) customerDetails.phone = phone;

  customerDetails.address = {};
  if (city) customerDetails.address.city = city;
  if (pinCode) customerDetails.address.pinCode = pinCode;
  if (location) customerDetails.address.location = location;
  if (region) customerDetails.address.region = region;

  console.log(customerDetails);

  const username = req.user.username;

  //I am a business person with a motive of building xyz stuff for yus community
  try {
    let customer = await Customer.findOne({ username });

    if (customer) {
      //update
      customer = await Customer.findOneAndUpdate(
        { customerName: req.user.name },
        { $set: customerDetails }
      );
      await customer.save();
      return res.json(customer);
    } else if (!customer) {
      customer = new Customer(customerDetails);
      customer.customerName = req.user.name;
      customer.email = req.user.email;
      customer.username = username;
      customer.custId = req.user.id;
      await customer.save();

      //creating a cart for the customer
      await new ToolsCart({ customer: req.user._id }).save();
      await new ServiceCart({ customer: req.user._id }).save();
      return res.json(customer);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getCurrentCustomer = async (req, res) => {
  //I am a business person with a motive of building xyz stuff for yus community

  console.log(req.body);
  console.log(req.user);
  try {
    let customer = await Customer.findOne({ customerName: req.user.name });
    //console.log(customer);

    if (!customer) {
      return res.status(400).json({ msg: "There is no customer" });
    }
    //or else send the profile
    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
