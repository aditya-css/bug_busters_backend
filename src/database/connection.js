const mongoose = require("mongoose");
//Connection For Database
mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
},(err)=>{
    if (!err) {
        if (mongoose.connection.readyState == 1) {
          console.log("Database connected");
        }
      } else {
        console.log(err);
      }
});