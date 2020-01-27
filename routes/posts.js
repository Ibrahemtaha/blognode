const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/posts/create", (req, res) => {
  res.render("create");
});

module.exports = router;
