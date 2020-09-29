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
  //console.log("This is the data I got from Frontend", req.body);
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

//updates only the updatesServiceLists

exports.updateServicePriceLists = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  console.log("The slug is", slug);
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
    await ComboPackage.find({}).exec((err, comboPackages) => {
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

exports.updatePackagePriceLists = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  console.log("The slug is", slug);

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
