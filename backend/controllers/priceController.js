const Price = require("../models/price");
const Service = require("../models/services");
const PackagePrice = require("../models/packagePrice");
const ComboPackage = require("../models/comboPackages");
const slugify = require("slugify");
const formidable = require("formidable");
const { errorHandler } = require("../helpers/dbErrorHandler");

//Content Marketing
//Seo
//Funnel Marketing
//Static Websites
//Single Page Website
//Ecommerce Websites
//Author Websites
//Resturant Websites
//Corporate Websites
//Personal Blogs
//Mobile Apps

//This is for storing service price
exports.createPriceObject = async (req, res) => {
  const { serviceName, realServicePrice, servicedDiscountPrice } = req.body;
  // console.log(req.body);

  const servicePriceFields = {};
  if (serviceName) servicePriceFields.serviceName = serviceName;
  if (realServicePrice) servicePriceFields.realServicePrice = realServicePrice;
  if (servicedDiscountPrice)
    servicedDiscountPrice.servicePriceFields = servicedDiscountPrice;

  // console.log(packagePriceFields);
  try {
    let price = await new Price(servicePriceFields);
    price.slug = slugify(price.serviceName.toString()).toLowerCase();
    //console.log(packagePrice);

    if (price) {
      price = await Price.findOneAndUpdate(
        { serviceName: servicePriceFields.serviceName }, // use this to update stuffs
        { $set: price },
        { new: true, upsert: true }
      );
      return res.json(price);
    }

    await price.save();
    return res.json(price);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getServicePriceLists = async (req, res) => {
  try {
    await Price.find({}).exec((err, pricePackages) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(pricePackages);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.SinglePrice = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Price.find({ slug }).exec((err, price) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(price);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.removePrice = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Price.findOneAndRemove({ slug }).exec((err, price) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json({ price, message: "price Deleted Successfully" });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updatePriceObject = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const { serviceName, realServicePrice, servicedDiscountPrice } = req.body;

  const updatePriceObject = {};
  if (serviceName) updatePriceObject.serviceName = serviceName;
  if (realServicePrice) updatePriceObject.realServicePrice = realServicePrice;
  if (servicedDiscountPrice)
    updatePriceObject.servicedDiscountPrice = servicedDiscountPrice;

  try {
    Price.findOneAndUpdate(
      { slug },
      { $set: updatePriceObject },
      {
        new: true,
        select: "serviceName realServicePrice servicedDiscountPrice",
      }
    ).exec((err, updatedPrice) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(updatedPrice);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//updates only the updatesServiceLists

exports.updateServicePriceLists = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  //console.log("The slug is", slug);
  try {
    Price.findOneAndUpdate({ slug }, { new: true }).exec(
      async (err, oldPricePackage) => {
        //console.log("The oldPricePackage is", oldPricePackage);

        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        const stats = await Price.aggregate([
          {
            $project: {
              _id: "$_id",
              serviceName: 1, // I am retrieving the tools field. choose field: 1 whichever you want
              total: {
                $subtract: [
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
        ]);

        let calculatedPrice = "";

        for (let i = 0; i < stats.length; i++) {
          //console.log("This is calculated price", calculatedPrice);
          if (stats[i].serviceName === oldPricePackage.serviceName) {
            calculatedPrice = stats[i].total;
            oldPricePackage.discountedServiceCharges = calculatedPrice;
          }
        }

        const newPricePackage = await oldPricePackage.save();
        //console.log("This is new Package Price", newPricePackage);
        res.json(newPricePackage);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.createComboPackage = async (req, res) => {
  //console.log(req.body);
  const {
    comboPackageName,
    desc,
    title,
    bundleDescription,
    checkedPrice,
  } = req.body;

  const packageFields = {};
  if (comboPackageName) packageFields.comboPackageName = comboPackageName;
  if (desc) packageFields.desc = desc;
  if (title) packageFields.title = title;
  if (bundleDescription) packageFields.bundleDescription = bundleDescription;
  //get the packagePrice
  if (checkedPrice) {
    packageFields.checkedPrice =
      checkedPrice && checkedPrice.toString().split(",");
  }

  //console.log(packageFields);

  try {
    let package = await new ComboPackage(packageFields);
    package.slug = slugify(title).toLowerCase();

    //console.log(package);

    if (package) {
      //update
      package = await ComboPackage.findOneAndUpdate(
        { comboPackageName: packageFields.comboPackageName },
        { $set: package },
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

exports.getComboPackages = async (req, res) => {
  try {
    await ComboPackage.find({})
      //.populate({ path: "discountedServiceCharges", model: "Price" })
      .populate("checkedPrice", "_id discountedPackageCharges slug")
      .select(
        "_id comboPackageName title desc bundleDescription slug checkedPrice "
      )
      .exec((err, comboPackages) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }
        res.json(comboPackages);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.removeComboPackage = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await ComboPackage.findOneAndRemove({ slug }).exec((err, package) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      return res.json({
        package,
        message: "package Deleted Successfully",
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//create combo package price
exports.createComboPackagePrice = async (req, res) => {
  const { realPackagePrice, packageDiscountPrice, packageName } = req.body;
  // console.log(req.body);

  const packagePriceFields = {};
  if (packageName) packagePriceFields.packageName = packageName;
  if (realPackagePrice) packagePriceFields.realPackagePrice = realPackagePrice;
  if (packageDiscountPrice)
    packagePriceFields.packageDiscountPrice = packageDiscountPrice;

  // console.log(packagePriceFields);
  try {
    let packagePrice = await new PackagePrice(packagePriceFields);
    packagePrice.slug = slugify(
      packagePrice.packageName.toString()
    ).toLowerCase();
    //console.log(packagePrice);

    if (packagePrice) {
      packagePrice = await PackagePrice.findOneAndUpdate(
        { packageName: packagePriceFields.packageName }, // use this to update stuffs
        { $set: packagePrice },
        { new: true, upsert: true }
      );
      return res.json(packagePrice);
    }

    await packagePrice.save();
    return res.json(packagePrice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getComboPackagePrices = async (req, res) => {
  try {
    await PackagePrice.find({}).exec((err, comboPricePackages) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(comboPricePackages);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.SinglePackagePrice = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await PackagePrice.find({ slug }).exec((err, price) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(price);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updatePackagePriceObject = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const { packageName, realPackagePrice, packageDiscountPrice } = req.body;

  const updatePackagePriceObject = {};
  if (packageName) updatePackagePriceObject.packageName = packageName;
  if (realPackagePrice)
    updatePackagePriceObject.realPackagePrice = realPackagePrice;
  if (packageDiscountPrice)
    updatePackagePriceObject.packageDiscountPrice = packageDiscountPrice;

  try {
    PackagePrice.findOneAndUpdate(
      { slug },
      { $set: updatePackagePriceObject },
      {
        new: true,
        select: "packageName realPackagePrice packageDiscountPrice",
      }
    ).exec((err, updatedPackagePrice) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json(updatedPackagePrice);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updatePackagePriceLists = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  //console.log("The slug is", slug);

  try {
    PackagePrice.findOneAndUpdate({ slug }, { new: true }).exec(
      async (err, oldPricePackage) => {
        console.log("This is the Package Price", oldPricePackage);
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        const stats = await PackagePrice.aggregate([
          {
            $project: {
              _id: "$_id",
              packageName: 1, // I am retrieving the tools field. choose field: 1 whichever you want
              total: {
                $subtract: [
                  "$realPackagePrice",
                  {
                    $multiply: [
                      "$realPackagePrice",
                      { $divide: ["$packageDiscountPrice", 100] },
                    ],
                  },
                ],
              },
            },
          },
        ]);

        console.log("This is stats after update", stats);

        let calculatedPrice = "";

        for (let i = 0; i < stats.length; i++) {
          //console.log("This is calculated price", calculatedPrice);
          if (stats[i].packageName === oldPricePackage.packageName) {
            calculatedPrice = stats[i].total;
            oldPricePackage.discountedPackageCharges = calculatedPrice;
          }
        }

        const newPricePackage = await oldPricePackage.save();
        //console.log("This is new Package Price", newPricePackage);
        res.json(newPricePackage);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
