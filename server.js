const express = require("express");
require("./src/DBConnect/connect");
const userRouter = require("./src/routes/userRoute");

const port = process.env.PORT || 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
