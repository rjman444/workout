import React from "react";
import { AuthContext } from "../context/AuthContext";
import WorkoutForm from "./WorkoutForm";
import WorkoutHistory from "./WorkoutHistory";

class App extends React.Component {
  static contextType = AuthContext;

  state = {
    workouts: [],
    selectedWorkout: "",
  };

  componentDidMount() {
    let axios = this.context.authAxios;

    axios
      .get("/api/workouts")
      .then(({ data }) => {
        console.log(data);
        if (data.length !== 0) {
          this.setState({
            workouts: data,
            selectedWorkout: data[data.length - 1]._id || "",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  handleDropdownChange = (e) => {
    this.setState({ selectedWorkout: e.target.value });
  };

  onFormSubmit = (newWorkout) => {
    let axios = this.context.authAxios;
    axios
      .post("/api/workouts", {
        date: newWorkout.date,
        workout: newWorkout.workout,
        exercises: newWorkout.exercises,
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          workouts: [...this.state.workouts, data.newWorkout],
          selectedWorkout: data.newWorkout._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDelete = (id) => {
    let axios = this.context.authAxios;
    axios
      .delete(`/api/workouts/${id}`)
      .then(() => {
        let newWorkouts = this.state.workouts.filter((w) => w._id !== id);
        this.setState({
          workouts: newWorkouts,
          selectedWorkout:
            newWorkouts.length !== 0
              ? newWorkouts[newWorkouts.length - 1]._id
              : "",
        });
      })
      .catch((err) => console.log(err));
  };

  Logout = () => {};

  render() {
    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <h1 className="ui header">Workout Tracker</h1>
          <div className="right menu">
            <h1 className="ui header">
              {this.context.authState.userInfo.username}
            </h1>
            <button className="ui button primary" onClick={this.context.logout}>
              Log out
            </button>
          </div>
        </div>
        <div className="ui container">
          <WorkoutForm
            onFormSubmit={this.onFormSubmit}
            workoutList={this.state.workoutList}
          />

          <WorkoutHistory
            workouts={this.state.workouts}
            selectedWorkout={this.state.selectedWorkout}
            handleDropdownChange={this.handleDropdownChange}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
