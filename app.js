var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//const User = require("./config/database"); we need that so we can see in console "Connection has been established successfully."

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

var app = express();

//configure session and flash
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
// incude passport
require("./config/passport");
// add passport
app.use(passport.initialize());
app.use(passport.session());
//
app.use(flash());

// add middleware for flash messages
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.error = req.flash("error");

  if (req.user) {
    res.locals.user = req.user; // We use that in Hidding routes + Authorize (if user...)
  }
  next();
});

//Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// End Body-Parser

// view engine setup
app.set("views", path.join(__dirname, "views"));
//path to Css files (+ JS)
app.use(express.static(path.join(__dirname, "/public")));
//app.use(express.static("public"));
//app.use(express.static("node_modeules"));

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
