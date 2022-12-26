const express = require("express");
const router = express.Router({ mergeParams: true });
const { contestadder } = require("../controllers/home");
const blog = require("../controllers/blog");
const authentication = require("../controllers/authentication");

// console.log(contestadder);
router.get("/dashboard", contestadder);
router.route("/blog").get(blog.blogShow).post(blog.createblog);
router.get("/newblog", blog.newblog);
router.get("/register", authentication.register);
module.exports = router;
