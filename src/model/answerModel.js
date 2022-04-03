const mongoose = require('mongoose');
//schema for Answer Model
const answerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    questionId: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: true,
        default: false
    },
    vote: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Answer', answerSchema);