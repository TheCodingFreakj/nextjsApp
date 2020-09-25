const Brand = require("../models/brands");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createBrands = async (req, res) => {
  const { brandName } = req.body;
  // console.log(req.body);
  let slug = slugify(brandName).toLowerCase();

  try {
    let brand = new Brand({ brandName, slug });
    // console.log(brand);
    await brand.save((err, data) => {
      // console.log(data);
      if (err)
        return res.status(400).json({
          error: errorHandler(err),
        });
      res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    await Brand.find({}).exec((err, data) => {
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

exports.removeBrand = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Brand.findOneAndRemove({ slug }).exec((err, tool) => {
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
