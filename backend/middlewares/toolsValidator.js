const { check } = require("express-validator");

//checking for validation

exports.toolsCreateValidator = [
  check("tool").not().isEmpty().withMessage("Tool Name is required"), // incase of rule violation send these messages as error
  check("price").not().isEmpty().withMessage("You must give the price"),
];
//Adds a validator to check if a value is not empty; that is, a string with a length of 1 or bigger.

//https://express-validator.github.io/docs/validation-chain-api.html

exports.brandsCreateValidator = [
  check("brandName").not().isEmpty().withMessage(" Name is required"), // incase of rule violation send these messages as error
];
