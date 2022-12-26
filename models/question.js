const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Question = new schema({
  title: String,
  url: String,
});

module.exports = {
  Question: mongoose.model("Question", Question),
};
