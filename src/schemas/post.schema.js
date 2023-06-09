import Joi from "joi";

export const postSchema = Joi.object({
  url: Joi.string().uri().required(),
  description: Joi.string(),
});

export const updateSchema = Joi.object({
  id: Joi.number().integer().required(),
  description: Joi.string().required()
});

export const deleteSchema = Joi.object({
  id: Joi.number().integer().required()
});

export const commentSchema = Joi.object({
  comments: Joi.string().required(),
  postId: Joi.number().required()
});

export const postIdSchema = Joi.object({
  postId: Joi.number().required()
});

export const likeSchema = Joi.object({
  postId: Joi.number().integer().required(),
  like: Joi.number().valid(0, 1).required()
});