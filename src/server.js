const express = require("express");
const userRouter = require("./routes/userRoute");
const answerRouter = require("./routes/answerRoute")
const questionRouter = require("./routes/questionRoute")
require('./database/connection');
const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.use('/answer', answerRouter);
app.use('/question', questionRouter);
app.listen(port, () => {
    console.log(`Server is running ${port}`);
});