const express = require("express");
const router = express.Router({ mergeParams: true });
const { contestadder } = require("../controllers/home");
const cart = require("../controllers/cart.js");
const blog = require("../controllers/blog");
const authentication = require("../controllers/authentication");
const passport = require("passport");
const session = require("express-session");
const middlewares = require("../middleware");
const collection = require("../controllers/collection");
const question = require("../controllers/question");

// console.log(contestadder);
router.get("/", contestadder);
router.get("/cart", middlewares.isLoggedin, cart.loader);
router.post("/cart", middlewares.isLoggedin, cart.addToCart);
router.post("/cartDelete", middlewares.isLoggedin, cart.deleteFromCart);
router.get("/notepad", cart.notepad);
router.get("/profile", cart.profile);
router
  .route("/blog")
  .get(blog.blogShow)
  .post(blog.validateblog, blog.createblog);
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
      keepSessionInfo: true,
      failureFlash: true,
      failureRedirect: "/login",
    }),
    authentication.loginuser
  );
router.get("/logout", middlewares.isLoggedin, authentication.logout);

router.get("/newcollection", middlewares.isLoggedin, collection.renderform);
router.get(
  "/collection/:id",
  middlewares.isLoggedin,
  middlewares.isOwner,
  collection.show
);
router
  .route("/collection")
  .get(middlewares.isLoggedin, collection.rendercollection)
  .post(
    middlewares.isLoggedin,
    collection.validatecollection,
    collection.create
  );

router.post(
  "/update/:questionid",
  middlewares.isLoggedin,
  question.validatedupdate,
  question.update
);

router
  .route("/question/:id")
  .get(middlewares.isLoggedin, middlewares.isOwner, question.renderform)
  .post(
    middlewares.isLoggedin,
    middlewares.isOwner,
    question.validatequestion,
    question.create
  );

module.exports = router;
