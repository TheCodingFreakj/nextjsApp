const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req); //get the result from runValidation through ValidationResult using req
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg }); //return error array only the first one
  }
  next(); //runs the next in the routes
};
