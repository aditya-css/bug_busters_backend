const express = require("express");
const userRouter = require("./src/routes/userRoute");

const port = process.env.PORT || 4000;
const app = express();
app.use("user", userRouter);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
