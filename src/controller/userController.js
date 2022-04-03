const User = require("../model/userModel");
const UserSchema = require("../validator/userValidator");
const message = require("../utils/message");
const bcrypt = require("bcryptjs");
const { generateAuthToken } = require("../middleware/auth.js");
// user register controller
const createUser = async(req, res) => {

    console.log(req.body);
    try {
        const { name, email, password, totalRewards, publicAddress, avatar } = req.body;
        const user = { name, email, password, totalRewards, publicAddress, avatar };
        const data = await new User(user).save();
        res.status(message.OK_CODE).send(data);
    } catch (e) {
        console.log(e);
    }
};
// login for user
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(message.NOT_FOUND_CODE).send(req.body);
        }
        const isvalid = await bcrypt.compare(password, user.password);
        if (!isvalid) {
            res.status(message.UNAUTHORIZED_CODE).send(req.body);
        }
        const token = generateAuthToken(user);
        res.status(message.OK_CODE).send({
            "token": token
        });
    } catch (e) {
        console.log(e);
    }
};
module.exports = {
    createUser,
    loginUser,
};