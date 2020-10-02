const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout");

router.get("/", (req, res) => {
  Workout.find()
    .then((workouts) => res.json(workouts))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  Workout.find({ _id: req.params.id })
    .then((workout) => res.json(workout))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  Workout.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: "Deleted workout" }))
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  const { date, workout, exercises } = req.body;
  const newWorkout = new Workout({
    date,
    workout,
    exercises,
  });
  newWorkout
    .save()
    .then(() =>
      res.json({
        message: "Added new workout",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error adding workout",
      })
    );
});

module.exports = router;
