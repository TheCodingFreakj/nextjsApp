const { check } = require("express-validator");

//checking for validation

exports.tagsCreateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"), // incase of rule violation send these messages as error
];
