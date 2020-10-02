import React from "react";

const GreyskullB = ({ register, errors }) => {
  return (
    <>
      <div
        className={`field ${
          errors.exercises && errors.exercises["Overhead Press"] ? "error" : ""
        }  `}
      >
        <label>Overhead Press</label>
        <div className="two fields">
          <div className="eight wide field">
            <div className="ui right labeled input">
              <input
                type="number"
                name="exercises.Overhead Press.Weight"
                placeholder="Weight"
                ref={register({ required: true, maxLength: 3 })}
              />
              <div className="ui basic label">kg</div>
            </div>
          </div>

          <div className="eight wide field">
            <input
              type="number"
              name="exercises.Overhead Press.Reps"
              placeholder="AMRAP"
              ref={register({ required: true, maxLength: 3 })}
            />
          </div>
        </div>
      </div>

      <div
        className={`field ${
          errors.exercises && errors.exercises.pullup ? "error" : ""
        }  `}
      >
        <label>Pullup</label>
        <div className="two fields">
          <div className="eight wide field">
            <div className="ui right labeled input">
              <input
                type="number"
                name="exercises.pullup.Weight"
                placeholder="Weight"
                ref={register({ required: true, maxLength: 3 })}
              />
              <div className="ui basic label">kg</div>
            </div>
          </div>

          <div className="eight wide field">
            <input
              type="number"
              name="exercises.pullup.Reps"
              placeholder="AMRAP"
              ref={register({ required: true, maxLength: 3 })}
            />
          </div>
        </div>
      </div>

      <div
        className={`field ${
          errors.exercises && errors.exercises.Deadlift ? "error" : ""
        }  `}
      >
        <label>Deadlift</label>
        <div className="two fields">
          <div className="eight wide field">
            <div className="ui right labeled input">
              <input
                type="number"
                name="exercises.Deadlift.Weight"
                placeholder="Weight"
                ref={register({ required: true, maxLength: 3 })}
              />
              <div className="ui basic label">kg</div>
            </div>
          </div>

          <div className="eight wide field">
            <input
              type="number"
              name="exercises.Deadlift.Reps"
              placeholder="AMRAP"
              ref={register({ required: true, maxLength: 3 })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GreyskullB;
