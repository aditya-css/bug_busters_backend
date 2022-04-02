const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const message = require("./error");
const verify = require("crypto");
//import { UserSchema } from "../validator/userValidation.js";
// token generate for user
const generateAuthToken = function (user) {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  return token;
};

// verify the token for admin
const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    u;
    req.user = user;
    next();
  } catch (err) {
    res.status(message.UNAUTHORIZED_CODE).send(err);
  }
};

module.exports = {
  auth,
  generateAuthToken,
};
