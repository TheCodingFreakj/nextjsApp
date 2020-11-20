//get the model file for hashing methods

const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const shortid = require("short-id");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.Signup = async (req, res) => {
  const { username, name, email, password, role, customerRole } = req.body;
  try {
    //see if the user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User already exists in our database..Please Login " }],
      });
    }

    //create new user

    let username = shortid.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    user = new User({
      name,
      email,
      password,
      profile,
      username,
      customerRole,
      role,
    });
    const salt = await bcrypt.genSalt(10);

    user.hashed_password = await bcrypt.hash(password, salt);

    if (user.customerRole) {
      user.customerRole = customerRole;
    } else {
      user.role = role;
    }

    await user.save((err, user) => {
      if (err)
        return res.status(400).json({
          error: err,
        });

      console.log(user);
    });

    const payload = {
      user: {
        id: user._id, //this is the user we just saved
      },
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          token,
          message: "Sign Up Done.. Please Sign In ",
          id: user._id,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.AuthenticatedToken = async (req, res) => {
  //token is valid you get the user and see the content of protected page

  try {
    const user = await User.findById(req.user.id).select("-hashed_password");

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.Signin = async (req, res) => {
  //check if user exists
  //authenticate the user to match the email and password
  //generate a token-a userid and secret

  //get the name email password from req
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    //console.log(user);
    //no user
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "There is no user" }] });
    }

    //console.log(user);

    // const username = user.username;
    //const email = user.email;
    // const role = user.role;
    // const profile = user.profile;
    // const id = user._id;

    //if user exists check the password
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    //no password
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Password didnt match" }] });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    //send this token to cliebt

    //jwt.sign(payload, secretkey, [options, callback])
    //jwt.verify(token, secretkey, [options, callback])

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "5 days",
      },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        return res.json({ token, user });
      }
    );

    //save the token in cookie

    res.cookie("token", token, { expiresIn: "1d" });

    // const { _id, username, name, email, role } = user;

    // return res.json({
    //   token,
    // });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.Signout = (req, res, next) => {
  //whhile signing out clear the cookie
  res.clearCookie("token");

  res.json({
    nessage: "Sign Out Success",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  //checks for valid token
  //if valid authenticates
  //also checck expiry and make the user available in req object
});

exports.authMiddleware = async (req, res, next) => {
  console.log(
    "I am getting the id of the verified person that i got from tokenAuth middleware",
    req.user.id
  );
  //need the user id
  try {
    const authUserID = req.user.id;

    // console.log(authUserID);
    let authUser = await User.findById({ _id: authUserID });

    console.log(
      "This is the entire user information i pulled using the logged in user",
      authUser
    ); //This comes with photo and all stuffs including password
    //no user
    if (!authUser) {
      return res.status(400).json({ errors: [{ msg: "There is no user" }] });
    }
    // console.log("Using that Id i got I am find the entire user info", authUser);
    // console.log(authUser.profile);

    req.user = authUser;

    next();

    // authUser.profile = user;
  } catch (error) {
    console.error("something wrong with authMiddleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.adminMiddleware = async (req, res, next) => {
  //console.log(req.user.id);
  //need the user id
  try {
    const adminUserID = req.user.id;

    //console.log(adminUserID);
    let adminUser = await User.findById({ _id: adminUserID });
    //no user
    if (!adminUser) {
      return res.status(400).json({ errors: [{ msg: "There is no user" }] });
    }

    if (adminUser.role != 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "You dont have access to this page" }] });
    }
    req.user = adminUser;
    next();
  } catch (error) {
    console.error("something wrong with adminMiddleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

//This middleware checks if the blog posted by userId matched with the loggedin person
//find the particular blog based on slug

exports.canUpdateAndDeleteBlog = async (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  // console.log(
  //   "This is the slug I got from params. I will use this to find the blogs",
  //   slug
  // );
  try {
    Blog.findOne({ slug }).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      //console.log("This is blog data that user can update and delete", data);
      //we are checking the blog's user id is equal to the logged in user
      let authorizedUser =
        data.postedBy._id.toString() === req.user._id.toString(); //This is avalable using the auth middleware auth
      console.log("This is the authorised user", authorizedUser);
      if (!authorizedUser) {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized",
          });
        }
      }

      next();
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
