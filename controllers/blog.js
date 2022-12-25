const { Blog } = require("../models/blog.js");
const mongoose = require("mongoose");

module.exports = {
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
    res.render("./forms/newblog.ejs");
  },
  createblog: async (req, res) => {
    // req.body.blog.author = "Author";
    const newblog = new Blog(req.body.blog);
    await newblog.save();
    // res.send(req.body);
    res.redirect("/blog");
  },
};
