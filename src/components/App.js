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

  getWorkouts() {
    axios
      .get("/api/workouts")
      .then((workouts) => {
        let wlist = [];
        workouts.data.forEach((w) => {
          wlist.push(w.date);
        });

        this.setState({
          workouts: workouts.data,
          workoutList: wlist,
          selectedWorkout: wlist[wlist.length - 1],
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getWorkouts();
  }

  handleDropdownChange = (e) => {
    this.setState({ selectedWorkout: e.target.value });
  };

  onFormSubmit = (newWorkout) => {
    if (this.state.workoutList.includes(newWorkout.date)) {
      console.log("Bad date");
    } else {
      axios
        .post("/api/workouts", {
          date: newWorkout.date,
          workout: newWorkout.workout,
          exercises: newWorkout.exercises,
        })
        .then(() => {
          this.getWorkouts();
        })
        .catch((err) => {
          alert("Could not add workout");
        });
    }
  };

  handleDelete = (id) => {
    axios
      .delete(`/api/workouts/${id}`)
      .then(() => {
        // alert("workout deleted succesfully");
        this.getWorkouts();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <div className="ui container">
          <h1 className="ui header">Workout Tracker</h1>
        </div>
        <div className="ui two column grid container">
          <div className="column">
            <WorkoutForm
              onFormSubmit={this.onFormSubmit}
              workoutList={this.state.workoutList}
            />
          </div>

          <div className="column">
            <WorkoutHistory
              workouts={this.state.workouts}
              workoutList={this.state.workoutList}
              selectedWorkout={this.state.selectedWorkout}
              handleDropdownChange={this.handleDropdownChange}
              handleDelete={this.handleDelete}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
