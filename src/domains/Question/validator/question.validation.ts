import Joi from "joi";
export const createQuestionSchema = Joi.object({
  questionText: Joi.string().required(),

  answerType: Joi.string().valid("RADIO", "CHECKBOX", "TEXT").required(),

  options: Joi.array().items(Joi.string()).optional(),
});
