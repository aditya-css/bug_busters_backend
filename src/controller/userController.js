const User = require("../model/userModel");
const UserSchema = require("../validator/userValidator");
const message = require("../utils/message");
const bcrypt = require("bcryptjs");
const { generateAuthToken } = require("../middleware/auth.js");
// user register controller
const createUser = async(req, res, next) => {
    try {
        const { name, email, password, totalRewards, publicAddress, avatar } = req.body;
        const user = { name, email, password, totalRewards, publicAddress, avatar };
        const data = await new User(user).save();
        res.status(message.OK_CODE).send(data);

    } catch (e) {
        next(e)
    }
};
// login for user
const loginUser = async(req, res, next) => {
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
        next(e);
    }
};
//view User
const viewUsers = async(req, res, next) => {
    try {
        const user = await User.find();
        res.status(message.OK_CODE).send(user);
    } catch (e) {
        next(e);
    }
}
const updateTotalRewards = async(req, res, next) => {
    try {
        const questionData = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                totalRewards: req.body.totalRewards
            }
        }, {
            new: true
        })
        res.status(message.OK_CODE).send(questionData)
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(e);
    }
}
const updatePublicAddress = async(req, res, next) => {
    try {
        const questionData = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                publicAddress: req.body.publicAddress
            }
        }, {
            new: true
        })
        res.status(message.OK_CODE).send(questionData)
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(e);
    }
}

const viewUser = async(req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(message.OK_CODE).send(user);
        } catch (e) {
            next(e);
        }
    }
    //user profile edit
const editUser = async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(message.OK_CODE).send(user);
    } catch (e) {
        next(e);
    }
}
module.exports = {
    createUser,
    loginUser,
    viewUsers,
    viewUser,
    editUser,
    updateTotalRewards,
    updatePublicAddress
};