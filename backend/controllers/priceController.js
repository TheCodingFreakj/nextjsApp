const Price = require("../models/price");
const { errorHandler } = require("../helpers/dbErrorHandler");

//Create a Service
exports.Prices = async (req, res, next) => {
  const { serviceName, servicePrice, duration } = req.body;
  console.log(req.body);
  try {
    let servicePriceInfo = new Price();
    servicePriceInfo.serviceName = serviceName;
    servicePriceInfo.servicePrice = servicePrice;
    servicePriceInfo.duration = duration;
    servicePriceInfo.slug = slugify(serviceName).toLowerCase();

    await servicePriceInfo.save(async (err, data) => {
      if (err)
        return res.status(400).json({
          //error: err, // This is the error object. IN front end you have to loop through the erroes and return exact message
          error: errorHandler(err), //pass this err obj to the function
        });
      //change the price add service charges and then send
      res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.GetPriceList = async (req, res, next) => {
  try {
    await Price.find({}).exec((err, data) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }
      res.send(data);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.UpdatePriceList = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getServiceClientPrice = async (req, res) => {
  try {
    //getting the service price after discount
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.RemovePrice = async (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Price.findOneAndRemove({ slug }).exec((err, tool) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      return res.json({
        tool,
        message: "Tool Deleted Successfully",
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
