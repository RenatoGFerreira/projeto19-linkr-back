import Joi from "joi";

export const postSchema = Joi.object({
  url: Joi.string().uri().required(),
  description: Joi.string(),
});

export const updateSchema = Joi.object({
  id: Joi.number().integer().required(),
  description: Joi.string().required()
});


