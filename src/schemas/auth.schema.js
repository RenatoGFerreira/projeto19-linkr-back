import joi from "joi"

export const userSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required(),
    username: joi.string().required(),
    image: joi.string().required()
})

export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required()
})

