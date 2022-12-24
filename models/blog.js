const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Blog = new schema({
  author: String,
  title: String,
  content: String,
});

module.exports = {
  Blog: mongoose.model("Blog", Blog),
};
