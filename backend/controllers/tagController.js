const Tags = require("../models/category");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = async (req, res) => {
  //get the  name from req body

  const { name } = req.body;

  try {
    //generate slug out of that

    let slug = slugify(name).toLowerCase();

    let tag = new Category({ name, slug });

    await tag.save((err, data) => {
      if (err)
        return res.status(400).json({
          //error: err, // This is the error object. IN front end you have to loop through the erroes and return exact message
          error: errorHandler(err), //pass this err obj to the function
        });

      res.json(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.list = async (req, res) => {
  try {
    await Tags.find({}).exec((err, data) => {
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
exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Tags.findOne({ slug }).exec((err, tag) => {
      if (err) {
        return res
          .status(400)
          .json({ errors: [{ msg: "There is no category of this type" }] });
      }
      res.json(tag); //you can also return the blogs associated with this category
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.removeTag = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    let tag = await Tags.findOneAndRemove({ slug }).exec((err, tag) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      res.json({
        message: "Tag Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
