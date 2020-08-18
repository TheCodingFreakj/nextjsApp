const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

//bring routes

const blogRoute = require("./routes/blogRoute");
const authRoute = require("./routes/authRoute");
const userProfileRoute = require("./routes/userProfileRoute");

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
      optionsSuccessStatus: 200,
      preflightContinue: true,
      credentials: true,
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

//Ports

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`This Server is listening to user requests at ${port}`);
});
