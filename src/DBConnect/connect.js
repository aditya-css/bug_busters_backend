const mongoose = require("mongoose");

console.log(process.env.DB_CONN);
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
});
