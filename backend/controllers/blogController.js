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
