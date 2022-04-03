const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const questionController = require("../controller/questionController")

//total Count of Questions
router.get("/totalQuestion", questionController.totalQuestion);
//Update Vote Count
router.patch("/updateVote/:id", auth, questionController.vote);
//Top Voted Questions 
router.get("/topQuestions", questionController.topQuestions);
//Search Questions
router.get("/searchQuestion", questionController.searchQuestions);
//Add New Questions
router.post("/addQuestion", auth, questionController.addQuestion);
//View All Questions
router.get("/viewQuestions", questionController.viewQuestions);
//Answers based on question
router.get("/ansOfQuestion/:id", questionController.ansOfQuestion);

module.exports = router;