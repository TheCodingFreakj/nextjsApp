const Price = require("../models/price");
const Service = require("../models/services");
const PackagePrice = require("../models/packagePrice");
const ComboPackage = require("../models/comboPackages");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

//This is for storing service price
exports.createPriceObject = async (req, res) => {
  console.log("This is the data I got from Frontend", req.body);
  const { serviceName, realServicePrice, servicedDiscountPrice } = req.body;

  try {
    let price = new Price();
    price.serviceName = serviceName;
    price.realServicePrice = realServicePrice;
    price.slug = slugify(serviceName).toLowerCase();
    price.servicedDiscountPrice = servicedDiscountPrice;

    const newPrice = await price.save();
    res.json(newPrice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//This is for create combo Package object

exports.createComboPackage = async (req, res) => {
  const { comboPackageName, desc, title, bundleDescription } = req.body;

  const packageFields = {};
  if (comboPackageName) packageFields.packageName = comboPackageName;
  if (desc) packageFields.desc = desc;
  if (title) packageFields.title = title;
  if (bundleDescription) packageFields.bundleDescription = bundleDescription;
  //get the packagePrice

  try {
    let package = await new ComboPackage(packageFields);
    package.slug = slugify(comboPackageName).toLowerCase();

    if (package) {
      //update
      package = await ComboPackage.findOneAndUpdate(
        { packageName: packagePriceFields.packageName },
        { $set: packageFields },
        { new: true, upsert: true }
      );
      return res.json(package);
    }
    await package.save();
    return res.json(package);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//create combo package price
exports.createComboPackagePrice = async (req, res) => {
  const { realPackagePrice, packageDiscountPrice, packageName } = req.body;
  console.log(req.body);

  const packagePriceFields = {};
  if (packageName) packagePriceFields.packageName = packageName;
  if (realPackagePrice) packagePriceFields.realPackagePrice = realPackagePrice;
  if (packageDiscountPrice)
    packagePriceFields.packageDiscountPrice = packageDiscountPrice;

  console.log(packagePriceFields);
  try {
    let packagePrice = await new PackagePrice(packagePriceFields);
    console.log(packagePrice);

    if (packagePrice) {
      packagePrice = await PackagePrice.findOneAndUpdate(
        { packageName: packagePriceFields.packageName }, // use this to update stuffs
        { $set: packagePriceFields },
        { new: true, upsert: true }
      );
      return res.json(packagePrice);
    }
    //https://docs.mongodb.com/manual/reference/operator/update/set/
    await packagePrice.save();
    return res.json(packagePrice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Create a Service
exports.calculateDiscountedServices = async (req, res) => {
  try {
    //get totalling of service charges

    await Price.aggregate([
      {
        $project: {
          //_id: 1, //excludes id
          serviceName: 1, // I am retrieving the tools field. choose field: 1 whichever you want

          discountedServiceCharges: {
            $add: [
              "$realServicePrice",
              {
                $multiply: [
                  "$realServicePrice",
                  { $divide: ["$servicedDiscountPrice", 100] },
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
        res.json(results); //serviceName, discountedServiceCharges
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.calculatePackagePrice = async (req, res) => {
  try {
    // await Price.aggregate([
    //   {
    //     $project: {
    //       //_id: 1, //excludes id
    //       packageName: 1, // I am retrieving the tools field. choose field: 1 whichever you want
    //       packagePrice: {
    //         $add: [
    //           "$realPackagePrice",
    //           {
    //             $multiply: [
    //               "$realPackagePrice",
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
    //     res.json(results); //packageName, packagePrice
    //   }
    // });
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
