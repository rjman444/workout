import React from "react";

const GreyskullA = ({ register, errors }) => {
  return (
    <>
      <div
        className={`field 
        ${errors.exercises && errors.exercises["Bench Press"] ? "error" : ""}  
        `}
      >
        <label>Bench Press</label>
        <div className="two fields">
          <div className="eight wide field">
            <div className="ui right labeled input">
              <input
                type="number"
                step="0.5"
                name="exercises.Bench Press.Weight"
                placeholder="Weight"
                ref={register({ required: true, maxLength: 5 })}
              />
              <div className="ui basic label">kg</div>
            </div>
          </div>

          <div className="eight wide field">
            <input
              type="number"
              name="exercises.Bench Press.Reps"
              placeholder="AMRAP"
              ref={register({ required: true, maxLength: 2 })}
            />
          </div>
        </div>
      </div>

      <div
        className={`field ${
          errors.exercises && errors.exercises.Row ? "error" : ""
        }  `}
      >
        <label>Row</label>
        <div className="two fields">
          <div className="eight wide field">
            <div className="ui right labeled input">
              <input
                type="number"
                step="0.5"
                name="exercises.Row.Weight"
                placeholder="Weight"
                ref={register({ required: true, maxLength: 5 })}
              />
              <div className="ui basic label">kg</div>
            </div>
          </div>

          <div className="eight wide field">
            <input
              type="number"
              name="exercises.Row.Reps"
              placeholder="AMRAP"
              ref={register({ required: true, maxLength: 2 })}
            />
          </div>
        </div>
      </div>

      <div
        className={`field ${
          errors.exercises && errors.exercises.Squat ? "error" : ""
        }  `}
      >
        <label>Squat</label>
        <div className="two fields">
          <div className="eight wide field">
            <div className="ui right labeled input">
              <input
                type="number"
                name="exercises.Squat.Weight"
                step="0.5"
                placeholder="Weight"
                ref={register({ required: true, maxLength: 5 })}
              />
              <div className="ui basic label">kg</div>
            </div>
          </div>

          <div className="eight wide field">
            <input
              type="number"
              name="exercises.Squat.Reps"
              placeholder="AMRAP"
              ref={register({ required: true, maxLength: 2 })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GreyskullA;
