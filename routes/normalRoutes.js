const express = require("express");
const router = express.Router({ mergeParams: true });
const { contestadder } = require("../controllers/home");
const blog = require("../controllers/blog");
const authentication = require("../controllers/authentication");
const passport = require("passport");

// console.log(contestadder);
router.get("/dashboard", contestadder);
router.route("/blog").get(blog.blogShow).post(blog.createblog);
router.get("/newblog", blog.newblog);
router
  .route("/register")
  .get(authentication.register)
  .post(authentication.registeruser);

router
  .route("/login")
  .get(authentication.loginrender)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    authentication.loginuser
  );
module.exports = router;
