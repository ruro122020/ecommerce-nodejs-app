//imports
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const db = require("./dbconfig");

//imported routes
const productsRoute = require("./components/products/productsController");
const usersRoute = require("./components/users/usersController");

//variables

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/", productsRoute);
app.use("/", usersRoute);

//connection to mongodb confirmation
db.connect((err) => {
  if (err) {
    console.log("unable to connect to database");
    process.exit(1);
  } else {
    console.log("connect to database, app listening on port 3000");
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
