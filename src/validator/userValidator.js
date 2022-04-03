const Joi = require("joi");
//validations for user fields like password,email and rewards
exports.UserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    publicAddress: Joi.string(),
    totalRewards: Joi.number(),
});