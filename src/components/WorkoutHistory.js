import React from "react";

class WorkoutHistory extends React.Component {
  renderDate(date) {
    let d = date.split("-");
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let displayDate = `${d[2]} ${months[parseInt(d[1]) - 1]} ${d[0]}`;
    return displayDate;
  }

  renderWorkout() {
    let w = this.props.workouts.find(
      (e) => e.date === this.props.selectedWorkout
    );

    if (w) {
      return (
        <>
          <h3 className="ui header">{this.renderDate(w.date)}</h3>
          <table className="ui celled fixed unstackable striped table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight</th>
                <th>AMRAP</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(w.exercises).map((exercise) => {
                return (
                  <tr key={exercise}>
                    <td>{exercise}</td>
                    <td>{w.exercises[exercise].Weight}</td>
                    <td>{w.exercises[exercise].Reps}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="ui button negative"
            onClick={() => this.props.handleDelete(w.date)}
          >
            Delete
          </button>
        </>
      );
    }
  }

  renderDropdown() {
    if (this.props.workoutList.length !== 0) {
      return (
        <>
          <div className="ui form">
            <div className="field">
              <label>Choose Workout</label>
              <select
                className="ui dropdown"
                onChange={this.props.handleDropdownChange}
                value={this.props.selectedWorkout}
              >
                {this.props.workoutList.map((w) => {
                  return (
                    <option key={w} value={w}>
                      {this.renderDate(w)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="ui divider"></div>
        </>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderDropdown()}
        {this.renderWorkout()}
      </div>
    );
  }
}

export default WorkoutHistory;
