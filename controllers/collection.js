const { Question } = require("../models/question");
const { Collection } = require("../models/collection");
const { User } = require("../models/user");
const question = require("../models/question");
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
      submission: "NOT ATTEMPTED",
      remark: "NONE",
    });
    await newu.save();
    req.flash("success", "Collection was created successfully");
    res.redirect("/collection");
  },
  show: async (req, res) => {
    const collection = await Collection.findById(req.params.id).populate(
      "questions"
    );
    // console.log(collection);
    const title = collection.title;
    const heading = collection.title;
    const submissionstatus = [];
    const remarks = [];
    const currentu = await User.findById(req.user._id);
    for (let question of collection.questions) {
      if (
        currentu.questions.find((q) => {
          return q.id.toString() === question._id.toString();
        })
      ) {
        submissionstatus.push(
          currentu.questions.find((q) => {
            return q.id.toString() === question._id.toString();
          }).submission
        );
        remarks.push(
          currentu.questions.find((q) => {
            return q.id.toString() === question._id.toString();
          }).remark
        );
      } else {
        submissionstatus.push("NOT ATTEMPTED");
        remarks.push("NONE");
      }
    }

    res.render("./collection/show", {
      title,
      heading,
      collection,
      submissionstatus,
      remarks,
    });
  },
  rendercollection: async (req, res) => {
    const userid = req.user._id;
    const user = await User.findById(userid).populate("collections");
    const title = "YOUR COLLECTIONS";
    // res.send(user);
    res.render("./collection/yourcollections", { title, user });
  },
};
