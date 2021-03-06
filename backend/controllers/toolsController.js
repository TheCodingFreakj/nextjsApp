const Tools = require("../models/marketingTools");
//const ToolPrice = require("../models/toolPrice");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createTools = async (req, res) => {
  //expecting the newTool fields from the req.body

  const { tool, totalPrice, summary, serviceChargeRate } = req.body; //This is the thing you get from the body

  //console.log(req.body);

  try {
    let newTool = new Tools();
    newTool.tool = tool;
    newTool.summary = summary;
    newTool.slug = slugify(tool).toLowerCase();
    newTool.totalPrice = totalPrice;
    newTool.serviceChargeRate = serviceChargeRate;
    //How to data which is transformed

    await newTool.save();

    const stats = await Tools.aggregate([
      {
        $project: {
          _id: "$_id",
          tool: 1, // I am retrieving the tools field. choose field: 1 whichever you want
          total: {
            $add: [
              "$totalPrice",
              {
                $multiply: [
                  "$totalPrice",
                  { $divide: ["$serviceChargeRate", 100] },
                ],
              },
            ],
          },
        },
      },
    ]);

    let calculatedPrice = "";

    for (let i = 0; i < stats.length; i++) {
      //console.log("This is calculated price", calculatedPrice);
      if (stats[i].tool === newTool.tool) {
        calculatedPrice = stats[i].total;
        newTool.clientPrice = calculatedPrice;
      }
    }

    await newTool.save(async (err, data) => {
      if (err)
        return res.status(400).json({
          //error: err, // This is the error object. IN front end you have to loop through the erroes and return exact message
          error: errorHandler(err), //pass this err obj to the function
        });
      //change the price add service charges and then send
      //console.log(data);

      res.json(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.SingleTool = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Tools.find({ slug }).exec((err, tool) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(tool);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.Product = async (req, res) => {
  console.log(req.query);
  const { productId } = req.query;
  try {
    await Tools.findOne({ _id: productId }).exec((err, product) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(product);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
//get all tools
exports.updateTool = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const { totalPrice, summary, serviceChargeRate } = req.body;

  const updateToolObject = {};

  if (summary) updateToolObject.summary = summary;
  if (totalPrice) updateToolObject.totalPrice = totalPrice;

  if (serviceChargeRate) updateToolObject.serviceChargeRate = serviceChargeRate;

  try {
    Tools.findOneAndUpdate(
      { slug },
      { $set: updateToolObject },
      {
        new: true,
        select: "summary totalPrice discountPrice clientPrice",
      }
    ).exec((err, updatedTool) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(updatedTool);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//get all tools
exports.getAllTools = async (req, res) => {
  //console.log(req);
  try {
    await Tools.find({}).exec((err, data) => {
      //console.log(err);
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }
      res.send(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateToolClientPrice = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    Tools.findOneAndUpdate({ slug }, { new: true }).exec(
      async (err, toolPrice) => {
        console.log("The toolPrice is", toolPrice);

        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        const stats = await Tools.aggregate([
          {
            $project: {
              _id: "$_id",
              tool: 1, // I am retrieving the tools field. choose field: 1 whichever you want
              total: {
                $add: [
                  "$totalPrice",
                  {
                    $multiply: [
                      "$totalPrice",
                      { $divide: ["$serviceChargeRate", 100] },
                    ],
                  },
                ],
              },
            },
          },
        ]);

        let calculatedPrice = "";

        for (let i = 0; i < stats.length; i++) {
          //console.log("This is calculated price", calculatedPrice);
          if (stats[i].tool === toolPrice.tool) {
            calculatedPrice = stats[i].total;
            toolPrice.clientPrice = calculatedPrice;
          }
        }

        const newToolPrice = await toolPrice.save();
        //console.log("This is new Package Price", newPricePackage);
        res.json(newToolPrice);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//delete a tool
exports.removeTool = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Tools.findOneAndRemove({ slug }).exec((err, tool) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      return res.json({
        tool,
        message: "Tool Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
