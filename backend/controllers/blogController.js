const Blog = require("../models/blog");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const Category = require("../models/category");
const Tags = require("../models/tags");
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");
const { smartTrim } = require("../helpers/blog");
const { parse } = require("path");

//Real Logic of the routes

exports.create = (req, res) => {
  //get the data from form body

  let form = new formidable.IncomingForm();
  form.keepExtensions = true; //if we have files in formData we want to keep the extensions
  try {
    //convert formData into valid javascript obj
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });
      }

      const { title, body, categories, tags } = fields; //felds we pass from frontend
      if (!title || !title.length) {
        return res.status(400).json({
          error: "Title is required",
        });
      }

      if (!body || body.length < 200) {
        return res.status(400).json({
          error: "Content Too Short ",
        });
      }

      if (!categories || categories.length === 0) {
        return res.status(400).json({
          error: "Atleast mention one category",
        });
      }

      if (!tags || tags.length === 0) {
        return res.status(400).json({
          error: "Atleast mention one tag",
        });
      }

      let blog = new Blog();
      blog.title = title;
      blog.body = body;
      blog.excerpt = smartTrim(body, 320, " ", "...");
      blog.slug = slugify(title).toLowerCase(); //slug based on title
      blog.mtitle = `${title} | ${process.env.APP_NAME}`;
      blog.mdesc = stripHtml(body.substring(0, 160));
      blog.postedBy = req.user.id; //got this from the model that conncets user model

      //to get the comma separated categories and tags

      let arrayOfCategories = categories && categories.split(",");
      let arrayOftags = tags && tags.split(",");

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }

        blog.photo.data = fs.readFileSync(files.photo.path);
        blog.photo.contentType = files.photo.type;
      }

      blog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        //find the recent blog using id
        //push the categories and tags to this blog
        Blog.findByIdAndUpdate(
          result.id,
          { $push: { categories: arrayOfCategories } },
          { new: true }
        ).exec((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            Blog.findByIdAndUpdate(
              result.id,
              { $push: { tags: arrayOftags } },
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
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    await Blog.find({})
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username")
      .select(
        "_id title, slug, excerpt categories tags postedBy createAt updatedAt"
      )
      .exec((err, blogs) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        res.json(blogs);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.listAllBlogsByCatAndTags = async (req, res) => {
  //get the limit of blogs to be shown from the front end
  //if user clicks load more then additional req will be sent and then the previous blogs are skipped then rest are send
  let limit = req.body.limit ? parseInt(req.body.limit) : 10; //by default is skip
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogsToBeSent;
  let categoriesToBeSent;
  let tagsToBeSent;
  try {
    await Blog.find({})
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username profile")
      .populate({ createdBy: -1 }) //To confirm that latest blogs are sent
      .skip(skip)
      .limit(limit)
      .select(
        "_id title, slug, excerpt categories tags postedBy createAt updatedAt"
      )
      .exec((err, blogs) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        blogsToBeSent = blogs;

        //get all categories
        Category.find({}).exec((err, categories) => {
          if (err) {
            return res.status(400).json({ errors: errorHandler(err) });
          }
          categoriesToBeSent = categories;

          //get all the tags

          Tags.find({}).exec((err, tags) => {
            if (err) {
              return res.status(400).json({ errors: errorHandler(err) });
            }
            tagsToBeSent = tags;
            //return all categories, blogs , tags

            res.json({
              blogsToBeSent,
              tagsToBeSent,
              categoriesToBeSent,
              size: blogsToBeSent.length,
            });
          });
        });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.read = (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.removeBlog = (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.updateBlog = (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
