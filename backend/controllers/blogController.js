const Blog = require("../models/blog");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const Category = require("../models/category");
const Tags = require("../models/tags");
const User = require("../models/user");
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
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    await Blog.find({})
      .populate("categories", "_id name slug") // to populate a field which is also another model you have mention that in the current model with a ref to ObjectId
      .populate("tags", "_id name slug") // second argument is what fields you want to get from that model to this model
      .populate("postedBy", "_id name username") //getting the user from user model
      .select(
        "_id title slug excerpt categories tags postedBy createAt updatedAt"
      ) //select which stuffs you want to send while getting the blogs
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

//We are using this fuction in blog index page
exports.listAllBlogsByCatAndTags = async (req, res) => {
  //console.log(req.body.limit);
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
      .sort({ createdBy: -1 }) //To confirm that latest blogs are sent
      .skip(skip)
      .limit(limit)
      .select(
        "_id title slug excerpt categories tags postedBy createAt updatedAt"
      )
      .exec(async (err, blogs) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        blogsToBeSent = blogs;

        //get all categories
        await Category.find({}).exec(async (err, categories) => {
          if (err) {
            return res.status(400).json({ errors: errorHandler(err) });
          }
          categoriesToBeSent = categories;

          //get all the tags

          await Tags.find({}).exec((err, tags) => {
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
              // limit,
              // skip,
            });
          });
        });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//use this for getting single blog
exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Blog.findOne({ slug })
      // .select("-photo")
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username")
      .select(
        "_id title body slug mtitle mdesc categories tags postedBy createAt updatedAt"
      )
      .exec((err, blog) => {
        if (err) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        return res.json(blog);
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.removeBlog = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Blog.findOneAndRemove({ slug }).exec((err, blog) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      return res.json({
        blog,
        message: "The Blog is deleted successful",
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.updateBlog = async (req, res) => {
  //get the data from form body
  const slug = req.params.slug.toLowerCase();
  try {
    await Blog.findOne({ slug }).exec((err, oldBlog) => {
      if (err) {
        return res.status(400).json({ errors: errorHandler(err) });
      }

      let form = new formidable.IncomingForm();
      form.keepExtensions = true; //if we have files in formData we want to keep the extensions
      //convert formData into valid javascript obj
      form.parse(req, (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            error: "Image could not upload",
          });
        }

        let slugBeforeMerge = oldBlog.slug; // saving such that slug dont change

        oldBlog = _.merge(oldBlog, fields); //merge new fields
        oldBlog.slug = slugBeforeMerge;

        //update the body cat tag desc

        const { body, desc, categories, tags } = fields;

        if (body) {
          oldBlog.excerpt = smartTrim(body, 320, " ", " ....");
          oldBlog.desc = stripHtml(body.substring(0, 160));
        }

        if (categories) {
          oldBlog.categories = categories.split(",");
        }

        if (tags) {
          oldBlog.tags = tags.split(",");
        }

        if (files.photo) {
          if (files.photo.size > 10000000) {
            return res.status(400).json({
              error: "Image should be less then 1mb in size",
            });
          }

          oldBlog.photo.data = fs.readFileSync(files.photo.path);
          oldBlog.photo.contentType = files.photo.type;
        }

        oldBlog.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }

          // result.photo = undefined;

         
        });
      });
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.photo = async (req, res) => {
  //get the data from form body
  const slug = req.params.slug.toLowerCase();
  try {
    await Blog.findOne({ slug })
      .select("photo")
      .exec((err, blog) => {
        if (err || !blog) {
          return res.status(400).json({ errors: errorHandler(err) });
        }

        res.set("Content-Type", blog.photo.contentType);
        return res.send(blog.photo.data);
      });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.listRelated = async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const { _id, categories } = req.body.blog; //This req comes from frontend where we send the blog on which we want to include the related

  try {
    //get the blogs uing id but include only categories and give back other blogs from same category
    await Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
      .limit(limit)
      .populate("postedBy", "_id name username profile")
      .select("title slug excerpt postedBy createdAt updatedAt")
      .exec((err, blogs) => {
        if (err) {
          return res.status(400).json({
            error: "Image could not upload",
          });
        }

        res.json(blogs);
      });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.BlogSearchLists = async (req, res) => {
  console.log(req.query); //this is the string you get from frontend
  const { search } = req.query; //we send the seatc object from frontend

  try {
    if (search) {
      await Blog.find(
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { body: { $regex: search, $options: "i" } },
          ],
        },
        (err, blogs) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }

          res.json(blogs);
        }
      ).select("-photo -body ");
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//logged in userid must match with the person who created the blog then he can delete
exports.listByUser = async (req, res) => {
  //console.log("This is netire body", req.params);
  console.log(
    "I am getting the username from the params. This is what I send from frontend from local storage which is current logged in user info",
    req.params.username
  );
  try {
    User.find({ username: req.params.username }).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      console.log(
        "This is the entire user info I found using the username",
        user
      );
      let userId = user[0]._id;

      console.log("This is userId I target", userId);

      //find the blog using userid
      Blog.find({ postedBy: userId })
        .populate("categories", "_id name slug")
        .populate("tags", "_id name slug")
        .populate("postedBy", "_id name username")
        .select("_id title slug postedBy createdAt updatedAt")
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }

          console.log(
            "This is the entire list of blogs I got using the userId i got from user whoes username i got from params",
            data
          );
          res.json(data);
        });
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
