const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  date: { type: String, required: true },
  workout: { type: String, required: true },
  exercises: { type: Object, required: true },
});

module.exports = mongoose.model("Workout", workoutSchema);
