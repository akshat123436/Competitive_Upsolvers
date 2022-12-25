const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Question = new schema({
  title: String,
});

module.exports = {
  Question: mongoose.model("Question", Question),
};
