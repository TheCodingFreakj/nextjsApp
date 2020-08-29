const Category = require("../models/category");
const Blog = require("../models/blog");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = async (req, res) => {
  //get the  name from req body

  const { name } = req.body;

  try {
    //generate slug out of that

    let slug = slugify(name).toLowerCase();

    let category = new Category({ name, slug });

    await category.save((err, data) => {
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
    await Category.find({}).exec((err, data) => {
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
    await Category.findOne({ slug }).exec(async (err, category) => {
      if (err) {
        return res
          .status(400)
          .json({ errors: [{ msg: "There is no category of this type" }] });
      }
      //res.json(category); //you can also return the blogs associated with this category
      await Blog.find({ categories: category })
        .populate("categories", "_id name slug")
        .populate("tags", "_id name slug")
        .populate("postedBy", "_id name username")
        .select(
          "_id title slug excerpt categories postedBy tags createdBy updateAt"
        )
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({ errors: errorHandler(err) });
          }

          res.json({ category: category, blogs: data });
        });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.removeCat = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Category.findOneAndRemove({ slug }).exec((err, category) => {
      // console.log(category);
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      return res.json({
        category,
        message: "Category Deleted Successfully",
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
