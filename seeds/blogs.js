const { Blog } = require("../models/blog.js");
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/projectwebsite");
}
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("connection open");
});

const creator = async (req, res) => {
  const newBlog = new Blog({
    author: "Akshat",
    title: "Benefits of exercise",
    content: "Exercise keeps us healthy",
  });
  const allblogs = await Blog.find({ author: "Akshat" });
  console.log(allblogs);
  await newBlog.save();
};

creator()
  .then(() => {
    // console.log(blogs);
    console.log("Successfully seeded");
  })
  .catch((e) => {
    console.log(e);
  });
