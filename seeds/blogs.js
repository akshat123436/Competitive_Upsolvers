const { Blog } = require("../models/blog.js");
const { Collection } = require("../models/collection.js");
const { Question } = require("../models/question.js");
const { User } = require("../models/user.js");
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
  // const newq = new Question({
  //   title: "why are Benefits of exercise",
  // });
  // const allblogs = await Blog.find({ author: "Akshat" });
  // console.log(allblogs);
  const newq = await Question.findById("63a7f9d1c952ce51526bd9dc");
  const newu = new User();
  const newc = await Collection.findById("63a7fb7f1d2f38afe2528379");
  // console.log(newq);
  newu.collections.push(newc);
  newu.questions.push({ id: newq, submission: "correct", remark: "none" });
  console.log(newu);
  await newu.save();
};

creator()
  .then(() => {
    // console.log(blogs);
    console.log("Successfully seeded");
  })
  .catch((e) => {
    console.log(e);
  });
