const express = require("express");
const router = express.Router({ mergeParams: true });
const { contestadder } = require("../controllers/home");
const blog = require("../controllers/blog");
const authentication = require("../controllers/authentication");
const passport = require("passport");
const middlewares = require("../middleware");
const collection = require("../controllers/collection");
const { isLoggedin } = require("../middleware");
// console.log(contestadder);
router.get("/dashboard", contestadder);
router.route("/blog").get(blog.blogShow).post(blog.createblog);
router.get("/newblog", middlewares.isLoggedin, blog.newblog);
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
router.get("/logout", middlewares.isLoggedin, authentication.logout);

router.get("/newcollection", middlewares.isLoggedin, collection.renderform);
router.get("/collection/:id", middlewares.isLoggedin, collection.show);
router
  .route("/collection")
  .get(middlewares.isLoggedin, collection.rendercollection)
  .post(middlewares.isLoggedin, collection.create);

module.exports = router;
