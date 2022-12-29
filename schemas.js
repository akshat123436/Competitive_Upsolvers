const joi = require("joi");

module.exports = {
  blogschema: joi.object({
    blog: joi
      .object({
        title: joi.string().required(),
        content: joi.string().required(),
      })
      .required(),
  }),

  questionSchema: joi.object({
    title: joi.string().required(),
    url: joi.string().required(),
    remarks: joi.string().required(),
    status: joi
      .string()
      .valid("NOT ATTEMPTED", "CORRECT", "INCORRECT", "PARTIALLY SOLVED")
      .required(),
  }),
  updatequestionSchema: joi.object({
    remark: joi.string().required(),
    submissionstatus: joi
      .string()
      .valid("NOT ATTEMPTED", "CORRECT", "INCORRECT", "PARTIALLY SOLVED")
      .required(),
  }),
  collectionSchema: joi.object({
    problemname: joi.string().required(),
    url: joi.string().required(),
    collectionname: joi.string().required(),
  }),
};
