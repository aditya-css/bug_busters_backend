const userService = require("../service/userService");
const User = require("../model/userModel");
const UserSchema = require("../validator/userValidator");
const message = require("../utils/error");
const bcrypt = require("bcryptjs");

const sharp = require("sharp");
// user register controller
const createUserController = async (req, res, next) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    const { name, email, password, totalRewards, publicAddress } = req.body;
    const user = { name, email, password, totalRewards, publicAddress };
    user.avatar = buffer;
    console.log(user);

    const isvalid = User.findOne({ email: user.email });

    const output = await userService.createUser(user);
    res.status(message.OK_CODE).send(output);
  } catch (e) {
    next(e);
  }
};
// login for user
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = UserSchema.validate({ email, password });
    if (result.error) {
      return res.status(message.BAD_REQUEST_CODE).send(req.body);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(message.NOT_FOUND_CODE).send(req.body);
    }
    const isvalid = await bcrypt.compare(password, user.password);
    if (!isvalid) {
      res.status(message.UNAUTHORIZED_CODE).send("Credentials not valid");
    }
    const output = await userService.userLogin(user, password);
    res.status(message.OK_CODE).send(output);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUserController,
  loginUserController,
};
