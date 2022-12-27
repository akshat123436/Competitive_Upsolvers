const { Question } = require("../models/question");
const { Collection } = require("../models/collection");
const { User } = require("../models/user");
module.exports = {
  renderform: (req, res) => {
    const title = "NEW COLLECTION";
    const heading = "NEW COLLECTION";
    res.render("./forms/newcollection", { title, heading });
  },
  create: async (req, res) => {
    const question = new Question({
      title: req.body.problemname,
      url: req.body.url,
    });
    await question.save();
    const collection = new Collection({
      title: req.body.collectionname,
      questions: [question],
    });
    await collection.save();
    const newu = await User.findById(req.user._id);
    newu.collections.push(collection);
    newu.questions.push({
      id: question,
      submission: "Not Attempted",
      remark: "none",
    });
    await newu.save();
    res.send(newu);
  },
  show: async (req, res) => {
    const collection = await Collection.findById(req.params.id);
    const title = collection.title;
    const heading = collection.title;
    res.render("collection/show", { title, heading, collection });
  },
  rendercollection: async (req, res) => {
    const userid = req.user._id;
    const user = await User.findById(userid).populate("collections");
    const title = "YOUR COLLECTIONS";
    // res.send(user);
    res.render("./collection/yourcollections", { title, user });
  },
};
