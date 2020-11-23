const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

//bring routes
const globalErrorHandler = require("./helpers/errorHandler");
const AppError = require("./helpers/AppError");
const blogRoute = require("./routes/blogRoute");
const authRoute = require("./routes/authRoute");
const userProfileRoute = require("./routes/userProfileRoute");
const categoryRoute = require("./routes/categoryRoute");
const tagsRoute = require("./routes/tagsRoute");
const servicesRoute = require("./routes/servicesRoute");
const toolsRoute = require("./routes/toolsRoute");
const priceRoute = require("./routes/priceRoute");
const brandsRoute = require("./routes/brandsRoute");
const reviewRoute = require("./routes/reviewRoute");
const bookingRoute = require("./routes/bookingRoute");
const shoppingcartRoute = require("./routes/shoppingcartRoute");
const subscribeRoute = require("./routes/subscribeRoute");
//app

const app = express();

//middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  app.use(
    cors({
      origin: `${process.env.CLIENT_URL}`,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 204,
    })
  );
}

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"));

//Routes
app.use("/api", blogRoute);
app.use("/api", authRoute);
app.use("/api", userProfileRoute);
app.use("/api", categoryRoute);
app.use("/api", tagsRoute);
app.use("/api", servicesRoute);
app.use("/api", priceRoute);
app.use("/api", toolsRoute);
app.use("/api", brandsRoute);
app.use("/api", reviewRoute);
app.use("/api", bookingRoute);
app.use("/api", shoppingcartRoute);
app.use("/api", subscribeRoute);
//this executes if any of the above routes fails
app.all("*", (req, res, next) => {
  //creating instance of the class in AppError Class
  next(new AppError(`can't find ${req.originalUrl} on the server!`, 400));
});

//handle operational errors
//
app.use(globalErrorHandler);

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

//Ports
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`This Server is listening to user requests at ${port}`);
});
