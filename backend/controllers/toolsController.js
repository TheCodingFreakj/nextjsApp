const Tools = require("../models/marketingTools");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createTools = async (req, res) => {
  //expecting the newTool fields from the req.body

  const { tool, price, summary, serviceCharges } = req.body; //This is the thing you get from the body

  console.log(req.body);

  try {
    let newTool = new Tools();
    newTool.tool = tool;
    newTool.summary = summary;
    newTool.slug = slugify(tool).toLowerCase();
    newTool.totalPrice = price;
    newTool.discountPrice = serviceCharges;
    // newTool.clientPrice=

    await newTool.save((err, data) => {
      if (err)
        return res.status(400).json({
          //error: err, // This is the error object. IN front end you have to loop through the erroes and return exact message
          error: errorHandler(err), //pass this err obj to the function
        });

      //change the price add service charges and then send
      res.json(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
