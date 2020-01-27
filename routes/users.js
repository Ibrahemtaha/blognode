var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/* GET home page. */
router.get("/login", (req, res) => {
  res.render("login");
});

// Passport route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

// Post information from Form
router.post("/register", (req, res) => {
  //console.log(req.body);
  const { name, email, password, password2 } = req.body;

  //Validation
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "please enter all feilds"
    });
  }
  if (name.length < 3) {
    errors.push({
      msg: "Name can not be empty and more the 2 char"
    });
  }
  if (password !== password2) {
    errors.push({
      msg: "password does not match"
    });
  }
  if (password.length < 3) {
    errors.push({
      msg: "password must be more than 3 characteres"
    });
  }

  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    //validationis ok
    // check if user is exist or not in DB
    User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (user) {
          errors.push({
            msg: "Email was already used"
          });
          res.render("register", { errors });
        } else {
          //create user
          const newUser = new User({
            name,
            email,
            password
          });
          //hash the password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  console.log("user created");
                  req.flash(
                    "successMessage",
                    " your account is created ,please login"
                  );
                  res.redirect("/users/login");
                })
                .catch(err => {
                  console.log(err);
                  req.flash("ErrorMessage", "There an error");
                  res.redirect("/users/register");
                }); //end new user
            });
          });
        }
      })
      .catch(err => {});
  }
});

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;
