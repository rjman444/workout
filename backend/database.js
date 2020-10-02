const mongoose = require("mongoose");
const connection =
  "mongodb+srv://rjman444:DzLpWcvFYX8zRcp@cluster0.y7md8.mongodb.net/workout_tracker?retryWrites=true&w=majority";

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 100,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
