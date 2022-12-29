const { Blog } = require("../models/blog.js");
const mongoose = require("mongoose");
const expressError = require("../utils/errorclass");
const schemas = require("../schemas.js");

module.exports = {
  validateblog: (req, res, next) => {
    const { error } = schemas.blogschema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new expressError(msg, 400);
    } else {
      next();
    }
  },
  blogShow: async (req, res, next) => {
    // const allblogs = await blogs.find({});
    const allblogs = await Blog.find({});
    // console.log(Blog);
    const title = "blogs";
    const heading = "BLOGS";
    // console.log(allblogs);
    res.render("blogs", { title, allblogs, heading });
  },
  newblog: (req, res) => {
    const heading = "NEW BLOG";
    const title = "NEW BLOG";
    res.render("./forms/newblog.ejs", { heading, title });
  },
  createblog: async (req, res) => {
    req.body.blog.author = req.user.username;
    const newblog = new Blog(req.body.blog);
    await newblog.save();
    req.flash("success", "Blog was created successfully");
    res.redirect("/blog");
  },
};
