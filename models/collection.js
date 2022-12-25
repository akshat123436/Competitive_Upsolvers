const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Collection = new schema({
  title: String,
  questions: [
    {
      type: schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});
module.exports = {
  Collection: mongoose.model("Collection", Collection),
};
