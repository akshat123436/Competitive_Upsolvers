const { Blog } = require("../models/blog.js");
const mongoose = require("mongoose");

module.exports = {
  blogShow: async (req, res, next) => {
    // const allblogs = await blogs.find({});
    const allblogs = await Blog.find({ author: "Akshat" });
    // console.log(Blog);
    const title = "blogs";
    const heading = "BLOGS";
    // console.log(allblogs);
    res.render("blogs", { title, allblogs, heading });
  },
};
