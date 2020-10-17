require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.options("*", cors());
app.use(express.json());

//APIs

const workoutsAPI = require("./api/workouts");
const usersAPI = require("./api/users");
app.use("/api/users", usersAPI);
app.use("/api/workouts", workoutsAPI);

// Serve React Files

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
// Connect to Atlas and start server

async function connect() {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log("Mongoose error", err);
  }
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

connect();
