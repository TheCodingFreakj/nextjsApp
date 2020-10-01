const Tools = require("../models/marketingTools");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createTools = async (req, res) => {
  //expecting the newTool fields from the req.body

  const { tool, price, summary, serviceCharges } = req.body; //This is the thing you get from the body

  //console.log(req.body);

  try {
    let newTool = new Tools();
    newTool.tool = tool;
    newTool.summary = summary;
    newTool.slug = slugify(tool).toLowerCase();
    newTool.totalPrice = price;
    newTool.discountPrice = serviceCharges;
    //How to data which is transformed

    await newTool.save(async (err, data) => {
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

//get all tools
exports.getAllTools = async (req, res) => {
  try {
    await Tools.find({}).exec((err, data) => {
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

//getting the price from the admin
//((send this calculated price from the admin section)totalPrice = MRP + your Margin)
//GIve a discount if the client demands
//use this route to calculate the clientPrice for tool
//Use the result of this calculation in the combopackage price

exports.updateToolClientPrice = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    Tools.findOneAndUpdate({ slug }, { new: true }).exec(
      async (err, toolPrice) => {
        //console.log("The oldPricePackage is", oldPricePackage);

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
                $subtract: [
                  "$totalPrice",
                  {
                    $multiply: [
                      "$totalPrice",
                      { $divide: ["$discountPrice", 100] },
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
    // //getting the tool price after discount
    // await Tools.aggregate([
    //   {
    //     $project: {
    //       //_id: 1, //excludes id
    //       tool: 1, // I am retrieving the tools field. choose field: 1 whichever you want

    //       clientPrice: {
    //         $add: [
    //           "$totalPrice",
    //           {
    //             $multiply: [
    //               "$totalPrice",
    //               { $divide: ["$discountPrice", 100] },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   },
    // ]).exec((err, results) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: errorHandler(err),
    //     });
    //   } else {
    //     res.json(results); //tool, clientPrice
    //   }
    // });
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

// //update all tools // to be done
// exports.updateTool = async (req, res) => {
//   console.log(req.params.slug);
//   // console.log(req.query);
//   const toolSlug = req.params.slug.toLowerCase();
//   // console.log(id);
//   try {

//     let tool = await Tools.findOne( { toolSlug });

//       if (tool) {
//         //update

//         tool = await Profile.findOneAndUpdate(
//           { toolSlug },
//           { $set: profileFields },
//           { new: true, upsert: true }
//         );
//         return res.json(profile);
//       }

//       await profile.save();
//       return res.json(profile);

//     await Tools.findOneAndUpdate(
//       { toolSlug },
//       { new: true, upsert: true }
//     );

//     return res.json(profile);

//     // .exec(
//     //   (err, data) => {
//     //     console.log(data);
//     //     if (err) {
//     //       return res.status(400).json({ errors: errorHandler(err) });
//     //     }
//     //     return res.json({
//     //       data,
//     //       message: "Tool Updated Successfully",
//     //     });
//     //   }
//     // );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
