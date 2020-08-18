const express = require("express");
const router = express.Router();
const tokenAuth = require("../middlewares/tokenAuth");

//bring Controller

const {
  Signup,
  Signin,
  Signout,
  requireSignin,
  AuthenticatedToken,
} = require("../controllers/authController");

//bring validators

const { runValidation } = require("../middlewares/authController");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../middlewares/auth");

router.post("/sign-up", userSignupValidator, runValidation, Signup);
router.get("/sign-in", tokenAuth, AuthenticatedToken);
router.post("/sign-in", userSigninValidator, runValidation, Signin);
router.get("/sign-out", Signout);

router.get("/secret", requireSignin, (req, res, next) => {
  //the token that we created has the user id, expiry date and secret
  res.json({
    message: req.user,
  });

  //   response:  "message": {
  //     "user": {
  //         "id": "5f3a7cd8d8b98510e8decdc0",
  //         "email": "pallavidapriya75@gmail.com"
  //     },
  //     "iat": 1597724656,
  //     "exp": 1598156656
  // }

  // we will access authenticate user id (express jwt checks the valid token we created) from this req.user._id
  //For any protected routes, we need to apply this middleware to very token and then we can add other middleware and the req object will be passed
});

module.exports = router;
