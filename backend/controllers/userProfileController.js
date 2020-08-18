const User = require("../models/user");

exports.read = (req, res) => {
  // console.log(req.user);

  const authenticatedUser = req.user;
  authenticatedUser.hashed_password = undefined;

  return res.json(authenticatedUser);
};
