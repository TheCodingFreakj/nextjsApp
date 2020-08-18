const { check } = require("express-validator");

//checking for validation

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"), // incase of rule violation send these messages as error
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
