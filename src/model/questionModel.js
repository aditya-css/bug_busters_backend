const mongoose = require("mongoose");

//Schema For Question Model.
const questionSchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    question: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    tags: {
        type: [String],
        trim: true,
        required: true,
    },
    vote: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
//Exports Question Model
module.exports = mongoose.model("Question", questionSchema);