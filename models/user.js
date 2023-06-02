const mongoose = require("mongoose");
const schema = mongoose.Schema;

const passportlocalmongoose = require("passport-local-mongoose");
const { Collection } = require("./collection");
const { Question } = require("./question");

const UserSchema = new schema({
  collections: [
    {
      type: schema.Types.ObjectId,
      ref: Collection,
    },
  ],
  cart: [
    {
      type: schema.Types.ObjectId,
      ref: Question,
    },
  ],
  questions: [
    {
      submission: {
        type: String,
        enum: ["NOT ATTEMPTED", "CORRECT", "INCORRECT", "PARTIALLY SOLVED"],
      },
      remark: String,
      id: {
        type: schema.Types.ObjectId,
        ref: Question,
      },
    },
  ],
});

UserSchema.plugin(passportlocalmongoose);

UserSchema.methods.updatequestion = async function (
  questionid,
  submissionstatus,
  remarks
) {
  // console.log(this);
  for (let question of this.questions) {
    if (question.id.toString() == questionid.toString()) {
      question.submission = submissionstatus;
      question.remark = remarks;
      return this.save();
    }
  }
  const newquestion = await Question.findById(questionid);
  this.questions.push({
    submission: submissionstatus,
    remark: remarks,
    id: newquestion,
  });
  // console.log(this.questions);
  return this.save();
};

module.exports = {
  User: mongoose.model("User", UserSchema),
};
