const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    publicAddress: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String
    },
    totalRewards: {
        type: Number,
    },
}, {
    timestamps: true,
});
// hashing password
UserSchema.pre("save", async function(next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8);
    next();
});
module.exports = mongoose.model("User", UserSchema);