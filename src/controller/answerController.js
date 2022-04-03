const Answer = require("../model/answerModel");
const Question = require("../model/questionModel");
const message = require("../utils/message")
const viewAnswer = async(req, res) => {
    try {
        const data = await Answer.find();
        res.status(message.OK_CODE).send(data);
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};
const totalAnswer = async(req, res) => {
    try {
        const data = await Answer.count({});
        res.status(message.OK_CODE).send({
            "totalAnswer": data
        });
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};
const viewAnswers = async(req, res) => {
    try {
        const question = await Question.findById(req.params.qid);
        const answer = await Answer.find({ questionId: req.params.qid });
        const count = answer.length;
        const result = { question, answer, count };
        res.status(message.OK_CODE).send(result);
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};
const viewQuestionAns = async(req, res) => {
    try {
        const data = await Answer.find().populate('questionId');
        res.status(message.OK_CODE).send(data);
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};
const pagination = async(req, res) => {
    try {
        const question = await Question.findById(req.params.qid);
        const answer = await Answer.find({ questionId: req.params.qid })
            .limit(req.params.i)
            .skip(req.params.s);

        console.log(answer);
        const qna = { question, answer };
        res.status(message.OK_CODE).send(qna);
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};
const deleteAnswer = async(req, res) => {
    try {
        const data = await Answer.findByIdAndDelete(req.params.id);
        res.status(message.OK_CODE).send(data);
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};
const addAnswer = async(req, res) => {
    try {
        console.log(req.body);
        const data = new Answer({
            userId: req.body.userId,
            questionId: req.body.questionId,
            description: req.body.description,
            isAccepted: req.body.isAccepted,
            vote: req.body.vote,
        });
        await data
            .save()
            .then((row) => res.json(row))
            .catch((err) => res.send(err));
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};
const updateVote = async(req, res) => {
    try {
        await Answer.findByIdAndUpdate(
                req.params.id, { $set: { vote: req.body.vote } }, { new: true }
            )
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    } catch (error) {
        res.status(message.INTERNAL_SERVER_ERROR_CODE).send(error);
    }
};

module.exports = {
    viewAnswer,
    viewAnswers,
    viewQuestionAns,
    pagination,
    deleteAnswer,
    addAnswer,
    totalAnswer,
    updateVote
}