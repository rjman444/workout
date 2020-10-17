const express = require("express");
const router = express.Router();
const { checkJwt } = require("../util");

const Workout = require("../models/workout");

router.get("/", async (req, res) => {
  try {
    const { sub } = req.user;
    const Workouts = await Workout.find({ user: sub });
    res.json(Workouts);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "There was a problem finding your workouts" });
  }
});

router.get("/:id", checkJwt, (req, res) => {
  Workout.find({ _id: req.params.id })
    .then((workout) => res.json(workout))
    .catch((error) => console.log(error));
});

router.delete("/:id", checkJwt, (req, res) => {
  const { sub } = req.user;
  Workout.findOneAndDelete({ _id: req.params.id, user: sub })
    .then(() => res.json({ message: "Deleted workout" }))
    .catch((error) => console.log(error));
});

router.post("/", checkJwt, async (req, res) => {
  try {
    const { sub } = req.user;
    const { date, workout, exercises } = req.body;
    const newWorkout = new Workout({
      user: sub,
      date,
      workout,
      exercises,
    });
    await newWorkout.save();
    res.status(201).json({
      message: "New workout created!",
      newWorkout,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "There was a problem adding your workout" });
  }
});

module.exports = router;
