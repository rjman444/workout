const mongoose = require("mongoose");
const connection =
  "mongodb+srv://rjman444:c3bug3qi@cluster0.o5fkx.gcp.mongodb.net/workout_tracker?retryWrites=true&w=majority";
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
