const Service = require("../models/services");
const User = require("../models/user");
const Tools = require("../models/marketingTools");
const ComboPackage = require("../models/comboPackages");
const formidable = require("formidable");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");
const fs = require("fs");

//Create a Service
exports.Services = async (req, res) => {
  // console.log(req.body);

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "There is some issue",
        });
      }
      // console.log("This is the fields", fields);
      // console.log("This is the files", files);

      const {
        serviceName,
        servicePrice,
        duration,
        pricePercent,
        ratingQuantity,
        summary,
        ratings,
        tools,
      } = fields;

      if (!tools || !tools.length) {
        return res.status(400).json({
          error: "tools is required",
        });
      }

      if (!servicePrice || !servicePrice.length) {
        return res.status(400).json({
          error: "servicePrice is required",
        });
      }

      if (!serviceName || !serviceName.length) {
        return res.status(400).json({
          error: "serviceName is required",
        });
      }

      if (!pricePercent || !pricePercent.length) {
        return res.status(400).json({
          error: "pricePercent is required",
        });
      }

      if (!duration || !duration.length) {
        return res.status(400).json({
          error: "duration is required",
        });
      }

      if (!ratingQuantity || !ratingQuantity.length) {
        return res.status(400).json({
          error: "ratingQuantity is required",
        });
      }

      if (!ratings || !ratings.length) {
        return res.status(400).json({
          error: "ratings is required",
        });
      }

      if (!summary || !summary.length) {
        return res.status(400).json({
          error: "summary is required",
        });
      }

      let service = new Service();
      service.title = serviceName;
      service.slug = slugify(serviceName).toLowerCase();
      service.indvPrice = servicePrice;
      service.discountPrice = pricePercent;
      service.summary = summary;
      service.ratingQuantity = ratingQuantity;
      service.ratingAverage = ratings;

      let arrayOfTools = tools && tools.split(",");
      // console.log(arrayOfTools);

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }

        service.photo.data = fs.readFileSync(files.photo.path);
        service.photo.contentType = files.photo.type;
      }

      await service.save((err, result) => {
        console.log("This is the result for save", result);
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        Service.findByIdAndUpdate(
          result.id,
          { $push: { tools: arrayOfTools } },
          { new: true }
        ).exec((err, result) => {
          console.log("This is the result with tools update", result);
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            return res.json(result);
            // Service.findByIdAndUpdate(
            //   result.id,
            //   { $push: { tags: arrayOftags } },
            //   { new: true }
            // ).exec((err, result) => {
            //   if (err) {
            //     return res.status(400).json({
            //       error: errorHandler(err),
            //     });
            //   } else {
            //     return res.json(result);
            //   }
            // });
          }
        });
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.ServicesList = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.removeServices = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.updateServices = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// exports.createComboPackage = async (req, res) => {
//   // comboPackage: {
//   //   (packageName = ""),
//   //     (slug = ""),
//   //     (title = ""),
//   //     (desc = ""),
//   //     packagePrice="", getToolClientPrice + servicePrice
//   //     serviceDescription:""

//   // }
//   console.log(req.body);

//   try {
//     let package = new ComboPackage();
//     package.packageName = packageName;
//     package.title = title;
//     package.slug = slugify(packageName).toLowerCase(); //slug based on title
//     package.desc = desc;
//     package.realPackagePrice = realPackagePrice;
//     package.discountPrice = discountPrice;
//     package.bundleDescription = bundleDescription;

//     //packagePrice calculate
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// Create a meter that calculated price per words and then check out the process (For contentWriting)
// For packages
// Give them tools to choose and then calculate price
// This price = Fixed Price (Tool Price + Margin) + (Changeable Price Price) Service Charges - (any seasonal discount)
// Service Price = LabourCost + Margin

//Fixed Price: You will use the result what you get from getToolClientPrice route calculation
//Service Charges= Grab from Services route where you will store the price
//include any seasonal discount
//create another calculation route to calculate the service price per service
//In the frontend  YOu will keep them platform to calculate total price as per service they add
