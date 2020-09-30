const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  // const token = req.header("x-auth-token"); //this is the key which have token sent
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(
    "As i hit the route the sign up method generated a token which is passed here for verification for signin",
    token
  );
  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token, You are not authorized to enter this route" });
  } //This fires when token is not atal present

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("This is the decoded token ", decoded);

    // This is the decoded token  {
    //   user: { id: '5f4a62c47d66e00b14316a3c', email: 'ppriya@gmail.com' },
    //   iat: 1598930953,
    //   exp: 1599362953
    // }

    req.user = decoded.user;
    console.log(
      "This is the first step. You can know who is logged with this",
      req.user
    ); //{ id: '5f4a62c47d66e00b14316a3c', email: 'ppriya@gmail.com' }
    next();
  } catch (err) {
    console.error("something wrong with  middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
