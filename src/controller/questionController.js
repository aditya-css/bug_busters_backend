const Question = require("../model/questionModel");
const Answer = require("../model/answerModel");
const message = require("../utils/message")
const totalQuestion = async(req, res) => {
    try {
        const totalQues = await Question.count({})
        res.status(message.OK_CODE).send({
            "totalQuestion": totalQues
        })
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
}
const viewQuestions = async(req, res) => {
    try {

        const questionData = await Question.find().populate('user_Id')

        res.status(message.OK_CODE).send(questionData)

    } catch (error) {

        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error)

    }
}
const ansOfQuestion = async(req, res) => {
    try {
        const questionData = await Answer.find({ questionId: req.params.id })
        res.status(message.OK_CODE).send(questionData)
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error)
    }
}
const vote = async(req, res) => {
    try {
        const questionData = await Question.findByIdAndUpdate(req.params.id, {
            $set: {
                vote: req.body.vote
            }
        }, {
            new: true
        })
        res.status(message.OK_CODE).send(questionData)
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(e);
    }
}
const topQuestions = async(req, res) => {
    try {
        const totalQues = await Question.find({}, { "question": 1 }).sort({ "vote": -1 }).limit(5)
        res.status(message.OK_CODE).send(totalQues)
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
}
const searchQuestions = async(req, res) => {
    try {
        const match = req.body.tag
        const questionResult = await Question.find({
            tags: {
                $in: match
            }
        })
        res.status(message.OK_CODE).send(questionResult)
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
}
const addQuestion = async(req, res) => {
    try {
        const { user_Id, question, description, tags, vote } = req.body;
        const que = new Question({ user_Id, question, description, tags, vote });
        const output = await que.save(que);
        res.status(message.OK_CODE).send(output);
    } catch (e) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(e);
    }
};
module.exports = {
    totalQuestion,
    viewQuestions,
    ansOfQuestion,
    vote,
    topQuestions,
    searchQuestions,
    addQuestion
}