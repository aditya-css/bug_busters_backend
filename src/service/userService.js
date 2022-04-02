const User = require("../model/userModel");
const { generateAuthToken } = require("../utils/auth.js");
const message = require("../utils/error.js");
const bcrypt = require("bcryptjs");

const createUser = async (user) => {
  const data = await new User(user).save();
  return { data };
};

//user login service
const userLogin = async (user, password, res) => {
  const token = generateAuthToken(user);
  //console.log(token);
  return { token };
};

module.exports = {
  createUser,
  userLogin,
};
