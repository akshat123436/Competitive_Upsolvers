const joi = require("joi");
const Blog = new schema({
  author: String,
  title: String,
  content: String,
});

module.exports = {
  Blog: mongoose.model("Blog", Blog),
};

const blogschema = joi.object({
  author: joi.string().required(),
  title: joi.string().required(),
  content: joi.string().required(),
});
