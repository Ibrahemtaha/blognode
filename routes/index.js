var express = require("express");
var router = express.Router();

const { isAuthenticated } = require("../config/auth");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  ); /// Preventing from Redirect BY Clicking on BACK BUTTON Keyboared

  res.render("dashboard");
});

module.exports = router;
