const express = require("express");
const router = express.Router();
const answerController = require("../controller/answerController");

//view all answers
router.get("/viewAnswer", answerController.viewAnswer);
//total Answer
router.get("/totalAnswer", answerController.totalAnswer);
//add an Answers
router.post("/addAnswer", answerController.addAnswer);
//total Answers
//get multiple answer for One question
router.get("/:qid", answerController.viewAnswers);
//for pagination first parameter:question id ,second parameter : Page size ,third partameter : skip count of page
router.get("/:qid/:i/:s", answerController.pagination)
    //update Vote using ID
router.put("/updateVote/:id", answerController.updateVote);
// delete an Answer using ID
router.delete("/deleteAnswer/:id", answerController.deleteAnswer);

module.exports = router