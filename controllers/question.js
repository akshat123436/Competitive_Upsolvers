const { default: mongoose } = require("mongoose");
const { Collection } = require("../models/collection");
const { Question } = require("../models/question");
const { User } = require("../models/user");
const schema = mongoose.Schema;
// const saveschema = new schema({
//   submission: {
//     type: String,
//     enum: ["NOT ATTEMPTED", "CORRECT", "INCORRECT", "PARTIALLY SOLVED"],
//   },
//   remark: String,
//   id: {
//     type: schema.Types.ObjectId,
//     ref: Question,
//   },
// });

module.exports = {
  renderform: (req, res) => {
    const title = "NEW QUESTION";
    const heading = "NEW QUESTION";
    const id = req.params.id;
    res.render("./forms/newquestion", { title, heading, id });
  },
  create: async (req, res, next) => {
    const newquestion = new Question({
      title: req.body.title,
      url: req.body.url,
    });
    await newquestion.save();
    const collection = await Collection.findByIdAndUpdate(req.params.id, {
      $push: { questions: newquestion },
    });
    const userrr = await User.findByIdAndUpdate(req.user._id, {
      $push: {
        questions: {
          submission: req.body.status,
          remark: req.body.remarks,
          id: newquestion,
        },
      },
    });
    res.redirect(`/collection/${req.params.id}`);
  },
  update: async (req, res) => {
    const { questionid } = req.params;
    const userr = await User.findById(req.user._id);
    console.log(userr);
    await userr.updatequestion(
      questionid,
      req.body.submissionstatus,
      req.body.remark
    );
    res.redirect("/collection");
  },
};
