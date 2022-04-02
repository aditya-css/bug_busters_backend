const Joi = require("joi");
export const UserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  publicAddress: Joi.string(),
  totalRewards: Joi.number(),
});
