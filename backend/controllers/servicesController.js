const Service = require("../models/services");
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

//Create a Service
exports.Services = async (req, res, next) => {
  const { name } = req.body;
  try {
    //get the admin user
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.ServicesList = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.removeServices = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.updateServices = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Create a meter that calculated price per words and then check out the process (For contentWriting)

// For packages
// Give them tools to choose and then calculate price
// This price = Fixed Price (Tool Price + Margin) + (Changeable Price Price) Service Charges - (any seasonal discount)

// Service Price = Labour Cost + Margin
