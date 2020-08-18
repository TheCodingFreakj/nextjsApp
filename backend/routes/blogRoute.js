const express = require("express");
const router = express.Router();

//// For routes to be used after "/api"
///Controllers and Middlewares

//bring Controller

const { Home } = require("../controllers/blogController");

router.get("/", Home);

module.exports = router;
