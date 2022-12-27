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

module.exports = {
  User: mongoose.model("User", UserSchema),
};
