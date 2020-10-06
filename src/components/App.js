import React from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutHistory from "./WorkoutHistory";
import axios from "axios";

class App extends React.Component {
  state = {
    workouts: [],
    workoutList: [],
    selectedWorkout: "",
  };

  componentDidMount() {
    axios
      .get("/api/workouts")
      .then((workouts) => {
        let wlist = [];
        let wk = [];
        workouts.data.forEach((w) => {
          wk.push({ date: w.date, workout: w.workout, exercises: w.exercises });
          wlist.push(w.date);
        });

        this.setState({
          workouts: wk,
          workoutList: wlist,
          selectedWorkout: wlist[wlist.length - 1],
        });
      })
      .catch((err) => console.log(err));
  }

  handleDropdownChange = (e) => {
    this.setState({ selectedWorkout: e.target.value });
  };

  onFormSubmit = (newWorkout) => {
    if (this.state.workoutList.includes(newWorkout.date)) {
      alert("Workout already exists on this date");
    } else {
      axios
        .post("/api/workouts", {
          date: newWorkout.date,
          workout: newWorkout.workout,
          exercises: newWorkout.exercises,
        })
        .then(() => {
          this.setState({
            workouts: [...this.state.workouts, newWorkout],
            workoutList: [...this.state.workoutList, newWorkout.date],
            selectedWorkout: newWorkout.date,
          });
        })
        .catch((err) => {
          alert("Could not add workout");
        });
    }
  };

  handleDelete = (date) => {
    axios
      .delete(`/api/workouts/${date}`)
      .then(() => {
        let newWorkouts = this.state.workouts.filter((w) => w.date !== date);
        let newWorkoutList = this.state.workoutList.filter((w) => w !== date);
        this.setState({
          workouts: newWorkouts,
          workoutList: newWorkoutList,
          selectedWorkout: newWorkoutList[newWorkoutList.length - 1] || "",
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <div className="ui container">
          <h1 className="ui header">Workout Tracker</h1>
        </div>
        <div className="ui container">
          <WorkoutForm
            onFormSubmit={this.onFormSubmit}
            workoutList={this.state.workoutList}
          />

          <WorkoutHistory
            workouts={this.state.workouts}
            workoutList={this.state.workoutList}
            selectedWorkout={this.state.selectedWorkout}
            handleDropdownChange={this.handleDropdownChange}
            handleDelete={this.handleDelete}
          />
        </div>
      </>
    );
  }
}

export default App;
