const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  // const token = req.header("x-auth-token"); //this is the key which have token sent
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token, You are not authorized to enter this route" });
  } //This fires when token is not atal present

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    // console.log(req.user); //got the user
    next();
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
