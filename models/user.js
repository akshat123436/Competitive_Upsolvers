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
  questions: [
    {
      submission: String,
      remark: String,
      id: {
        type: schema.Types.ObjectId,
        ref: Question,
      },
    },
  ],
});
module.exports = {
  User: mongoose.model("User", UserSchema),
};
