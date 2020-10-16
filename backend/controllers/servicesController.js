const Service = require("../models/services");
const Price = require("../models/price");
const Portfolio = require("../models/portfolio");
const Tools = require("../models/marketingTools");
const ComboPackage = require("../models/comboPackages");
const formidable = require("formidable");
const _ = require("lodash");
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
      //console.log("This is the fields", fields);
      // console.log("This is the files", files);

      const {
        summary,
        process,
        duration,
        serviceName,
        discountedPrice,
        tools,
      } = fields;

      if (!summary || !summary.length) {
        return res.status(400).json({
          error: "summary is required",
        });
      }

      if (!process || !process.length) {
        return res.status(400).json({
          error: "summary is required",
        });
      }

      if (!duration || !duration.length) {
        return res.status(400).json({
          error: "duration is required",
        });
      }

      if (!serviceName || !serviceName.length) {
        return res.status(400).json({
          error: "serviceName is required",
        });
      }
      if (!discountedPrice || !discountedPrice.length) {
        return res.status(400).json({
          error: "discountedPrice is required",
        });
      }

      if (!tools || !tools.length) {
        return res.status(400).json({
          error: "tools is required",
        });
      }

      let service = new Service();
      service.title = serviceName;
      service.slug = slugify(serviceName).toLowerCase();
      service.summary = summary;
      service.process = process;
      service.duration = duration;

      let arrayOfTools = tools && tools.split(",");
      // console.log(arrayOfTools);
      let arrayOfprice = discountedPrice && discountedPrice.split(",");

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
        //console.log("This is the result for save", result);
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
          //console.log("This is the result with tools update", result);
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            //return res.json(result);

            Service.findByIdAndUpdate(
              result.id,
              { $push: { discountedServiceCharges: arrayOfprice } },
              { new: true }
            ).exec((err, result) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
              } else {
                return res.json(result);
              }
            });
          }
        });
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateService = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  console.log("This is slug from the backend", slug);
  try {
    await Service.findOne({ slug }).exec((err, oldService) => {
      console.log("this is old service", oldService);
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      let form = new formidable.IncomingForm();
      form.keepExtensions = true; //if we have files in formData we want to keep the extensions
      //convert formData into valid javascript obj
      form.parse(req, (err, fields, files) => {
        console.log("This is files", files);

        console.log("This is fields", fields);
        if (err) {
          return res.status(400).json({
            error: "Image could not upload",
          });
        }

        let slugBeforeMerge = oldService.slug; // saving such that slug dont change

        oldService = _.merge(oldService, fields); //merge new fields
        oldService.slug = slugBeforeMerge;

        //update the body cat tag desc

        const {
          summary,
          process,
          duration,
          serviceName,
          discountedPrice,
          tools,
        } = fields;

        if (serviceName) {
          oldService.title = serviceName;
        }

        if (summary) {
          oldService.summary = summary;
        }

        if (process) {
          oldService.process = process;
        }

        if (duration) {
          oldService.duration = duration;
        }

        if (tools) {
          oldService.tools = tools.split(",");
        }

        if (discountedPrice) {
          oldService.discountedPrice = discountedPrice.split(",");
        }

        if (files.photo) {
          if (files.photo.size > 10000000) {
            return res.status(400).json({
              error: "Image should be less then 1mb in size",
            });
          }

          oldService.photo.data = fs.readFileSync(files.photo.path);
          oldService.photo.contentType = files.photo.type;
        }

        oldService.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          res.json(result);
          // result.photo = undefined;
        });
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.ServicesList = async (req, res) => {
  //find the discountServiceCharges for a service
  try {
    await Service.find({})
      //.populate({ path: "discountedServiceCharges", model: "Price" })
      .populate(
        "discountedServiceCharges",
        "_id serviceName discountedServiceCharges slug"
      )
      .populate("tools", "_id tool clientPrice slug")
      .select(
        "_id title slug discountedServiceCharges process summary duration ratingsAverage ratingsQuantity"
      )
      .exec((err, serviceLists) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }
        res.json(serviceLists);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.listRelatedPortfolio = async (req, res) => {
  //find the discountServiceCharges for a service
  const slug = req.params.slug.toLowerCase();
  try {
    // await Service.find({})
    //   //.populate({ path: "discountedServiceCharges", model: "Price" })
    //   .populate(
    //     "discountedServiceCharges",
    //     "_id serviceName discountedServiceCharges slug"
    //   )
    //   .populate("tools", "_id tool clientPrice slug")
    //   .select(
    //     "_id title slug discountedServiceCharges process summary duration ratingsAverage ratingsQuantity"
    //   )
    //   .exec((err, serviceLists) => {
    //     if (err) {
    //       return res.status(400).json({ errors: errorHandler(err) });
    //     }
    //     res.json(serviceLists);
    //   });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.SingleService = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  // console.log(slug);
  try {
    await Service.findOne({ slug })
      .populate([
        {
          path: "the_reviews",
        },
      ])
      .populate([{ path: "the_portfolios", options: { select: "-photo" } }])
      .populate(
        "discountedServiceCharges",
        "_id serviceName discountedServiceCharges slug"
      )
      .populate("tools", "_id tool clientPrice slug")

      .exec((err, service) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }
        res.json(service);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.removeServices = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Service.findOneAndRemove({ slug }).exec((err, service) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      return res.json({
        service,
        message: "service Deleted Successfully",
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.photo = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Service.findOne({ slug })
      .select("photo")
      .exec((err, service) => {
        if (err || !service) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        res.set("Content-Type", service.photo.contentType);
        return res.send(service.photo.data);
      });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.CreatePortfolio = async (req, res) => {
  //console.log(req.body);

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  try {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });
      }

      const { name, technicalSheet, technologies, company, services } = fields;

      // console.log("This is the fields", fields);
      // console.log("This is the files", files);
      if (!name || !name.length) {
        return res.status(400).json({
          error: "name is required",
        });
      }

      if (!technicalSheet || !technicalSheet.length) {
        return res.status(400).json({
          error: "technicalSheet is required",
        });
      }

      if (!technologies || !technologies.length) {
        return res.status(400).json({
          error: "technologies is required",
        });
      }

      if (!company || !company.length) {
        return res.status(400).json({
          error: "company is required",
        });
      }

      let newPortfolio = new Portfolio();
      newPortfolio.name = name;
      newPortfolio.technicalSheet = technicalSheet;
      newPortfolio.slug = slugify(name).toLowerCase();
      newPortfolio.technologies = technologies;
      newPortfolio.company = company;

      let arrayOfServices = services && services.split(",");
      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }

        newPortfolio.photo.data = fs.readFileSync(files.photo.path);
        newPortfolio.photo.contentType = files.photo.type;
      }

      newPortfolio.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        // return res.json(result);

        Portfolio.findByIdAndUpdate(
          result.id,
          { $push: { services: arrayOfServices } },
          { new: true }
        ).exec((err, result) => {
          //console.log("This is the result with tools update", result);
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            return res.json(result);
          }
        });
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.PortfolioList = async (req, res) => {
  try {
    await Portfolio.find({})
      .populate("services", "_id title slug duration")
      .select(" name technicalSheet slug  technologies company services")
      .exec((err, portfolios) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }
        res.json(portfolios);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.Portfoliophoto = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Portfolio.findOne({ slug })
      .select("photo")
      .exec((err, portfolio) => {
        if (err || !portfolio) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        res.set("Content-Type", portfolio.photo.contentType);
        return res.send(portfolio.photo.data);
      });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

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
