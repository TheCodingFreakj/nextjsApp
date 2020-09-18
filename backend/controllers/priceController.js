const Price = require("../models/price");
const Service = require("../models/services");
const PackagePrice = require("../models/packagePrice");
const ComboPackage = require("../models/comboPackages");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createPriceObject = async (req, res) => {
  console.log("This is the data I got from Frontend", req.body);
  const { serviceName, realServicePrice, servicedDiscountPrice } = req.body;

  try {
    let price = new Price();
    price.serviceName = serviceName;
    price.realServicePrice = realServicePrice;
    price.slug = slugify(serviceName).toLowerCase();
    price.servicedDiscountPrice = servicedDiscountPrice;

    const newPrice = await price.save();
    res.json(newPrice);

    // await price.save((err, data) => {
    //   console.log("This is service Price", data);
    //   if (err)
    //     return res.status(400).json({
    //       error: errorHandler(err), //pass this err obj to the function
    //     });

    //   res.json(data);
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createPackagePrice = async (req, res) => {
  console.log("This is the data I got from Frontend", req.body);
  const { packageName, realPackagePrice, packageDiscountPrice } = req.body;

  try {
    let = new PackagePrice();
    packagePrice.packageName = packageName;
    packagePrice.realPackagePrice = realPackagePrice;
    packagePrice.slug = slugify(packageName).toLowerCase();
    packagePrice.packageDiscountPrice = packageDiscountPrice;

    const newPackagePrice = await packagePrice.save();
    res.json(newPackagePrice);

    // await price.save((err, data) => {
    //   console.log("This is service Price", data);
    //   if (err)
    //     return res.status(400).json({
    //       error: errorHandler(err), //pass this err obj to the function
    //     });

    //   res.json(data);
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// exports.createComboPackage = async (req, res) => {
//   const {
//     packageName,
//     desc,
//     bundleDescription,

//   } = req.body;

//   try{
//     let package = await ComboPackage.findOne({ user: req.user.id });
//   }catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }

//try {
//       let profile = await Profile.findOne({ user: req.user.id });

//       if (profile) {
//         //update

//         profile = await Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           { new: true, upsert: true }
//         );
//         return res.json(profile);
//       }

//       //if not found then create

//       profile = new Profile(profileFields);
//       await profile.save();
//       return res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
//};

// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("status", "Status is required").not().isEmpty(),
//       check("skills", "Skills is required").not().isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     //here we are pulling all the fields from user requests from the frontend

//     const {
//       company,
//       location,
//       website,
//       bio,
//       skills,
//       status,
//       githubusername,
//       youtube,
//       twitter,
//       instagram,
//       linkedin,
//       facebook,
//     } = req.body;

//     //This is the entire profile object data
//     //build profile object

//     const profileFields = {};
//     profileFields.user = req.user.id; //adding the user to the profile object// the token with which the authenticated user is logged in have the id
//     if (company) profileFields.company = company;
//     if (website) profileFields.website = website;
//     if (location) profileFields.location = location;
//     if (bio) profileFields.bio = bio;
//     if (status) profileFields.status = status;
//     if (githubusername) profileFields.githubusername = githubusername;

//     //  "user": "5f2eb733bddf69268835be0d",
//     //     "company": "Total solutions pvt lmt",
//     //     "website": "https://totalsolutions.com",
//     //     "location": "Boston",

//     //turning the skills input to array
//     //""turn skill string to array
//     if (skills) {
//       profileFields.skills = skills.split(",").map((skill) => skill.trim());
//     }

//     //   "skills": [
//     //     "wordpress",
//     //     "php"
//     // ],

//     // Build social object and add to profileFields

//     profileFields.social = {};
//     if (youtube) profileFields.social.youtube = youtube;
//     if (twitter) profileFields.social.twitter = twitter;
//     if (facebook) profileFields.social.facebook = facebook;
//     if (instagram) profileFields.social.instagram = instagram;
//     if (linkedin) profileFields.social.linkedin = linkedin;

//     //   "social": {
//     //     "twitter": "https://twitter.com/pallav75",
//     //     "facebook": "https://facebook.com/pallav75",
//     //     "instagram": "https://instagram.com/solutions",
//     //     "linkedin": "https://linkedin.com/solutions"
//     // },

//     // console.log(profileFields.skills);

//     ///I//////////////////////////////////////////////////////////////////
//     ///////////////INSERT THE BUILT DATA//////////////////////////////////

//     try {
//       let profile = await Profile.findOne({ user: req.user.id });

//       if (profile) {
//         //update

//         profile = await Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           { new: true, upsert: true }
//         );
//         return res.json(profile);
//       }

//       //if not found then create

//       profile = new Profile(profileFields);
//       await profile.save();
//       return res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

//Create a Service
exports.calculateDiscountedServices = async (req, res) => {
  try {
    //get totalling of service charges

    await Price.aggregate([
      {
        $project: {
          //_id: 1, //excludes id
          serviceName: 1, // I am retrieving the tools field. choose field: 1 whichever you want

          discountedServiceCharges: {
            $add: [
              "$indvPrice",
              {
                $multiply: ["$indvPrice", { $divide: ["$discountPrice", 100] }],
              },
            ],
          },
        },
      },
    ]).exec((err, results) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(results); //serviceName, discountedServiceCharges
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.calculatePackagePrice = async (req, res) => {
  try {
    // await Price.aggregate([
    //   {
    //     $project: {
    //       //_id: 1, //excludes id
    //       packageName: 1, // I am retrieving the tools field. choose field: 1 whichever you want
    //       packagePrice: {
    //         $add: [
    //           "$realPackagePrice",
    //           {
    //             $multiply: [
    //               "$realPackagePrice",
    //               { $divide: ["$discountPrice", 100] },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   },
    // ]).exec((err, results) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: errorHandler(err),
    //     });
    //   } else {
    //     res.json(results); //packageName, packagePrice
    //   }
    // });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// exports.UpdatePriceList = async (req, res, next) => {
//   try {
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// exports.getServiceClientPrice = async (req, res) => {
//   try {
//     //getting the service price after discount
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };
// exports.RemovePrice = async (req, res, next) => {
//   const slug = req.params.slug.toLowerCase();
//   try {
//     await Price.findOneAndRemove({ slug }).exec((err, tool) => {
//       if (err) {
//         return res.status(400).json({ errors: errorHandler(err) });
//       }

//       return res.json({
//         tool,
//         message: "Tool Deleted Successfully",
//       });
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };
