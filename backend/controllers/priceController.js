const Price = require("../models/price");
const { errorHandler } = require("../helpers/dbErrorHandler");

//Create a Service
exports.CalculateDiscountedServices = async (req, res) => {
  try {
    //get totalling of service charges

    await Price.aggregate([
      {
        $project: {
          //_id: 1, //excludes id
          serviceName: 1, // I am retrieving the tools field. choose field: 1 whichever you want

          discountedServiceCharges: {
            $add: [
              "$indvPrice",
              {
                $multiply: ["$indvPrice", { $divide: ["$discountPrice", 100] }],
              },
            ],
          },
        },
      },
    ]).exec((err, results) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.CalculatePackagePrice = async (req, res) => {
  try {
    await Price.aggregate([
      {
        $project: {
          //_id: 1, //excludes id
          packageName: 1, // I am retrieving the tools field. choose field: 1 whichever you want

          packagePrice: {
            $add: [
              "$realPackagePrice",
              {
                $multiply: [
                  "$realPackagePrice",
                  { $divide: ["$discountPrice", 100] },
                ],
              },
            ],
          },
        },
      },
    ]).exec((err, results) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
// exports.UpdatePriceList = async (req, res, next) => {
//   try {
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// exports.getServiceClientPrice = async (req, res) => {
//   try {
//     //getting the service price after discount
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };
// exports.RemovePrice = async (req, res, next) => {
//   const slug = req.params.slug.toLowerCase();
//   try {
//     await Price.findOneAndRemove({ slug }).exec((err, tool) => {
//       if (err) {
//         return res.status(400).json({ errors: errorHandler(err) });
//       }

//       return res.json({
//         tool,
//         message: "Tool Deleted Successfully",
//       });
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };
