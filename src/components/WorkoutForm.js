import React from "react";
import { useForm } from "react-hook-form";
import GreyskullA from "./forms/GreyskullA";
import GreyskullB from "./forms/GreyskullB";

const WorkoutForm = ({ onFormSubmit }) => {
  const { register, watch, errors, handleSubmit } = useForm();

  const watchWorkout = watch("workout", "Greyskull LP A");

  const onSubmit = onFormSubmit;

  let today = new Date().toISOString().slice(0, 10);

  return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
      <div className={`field ${errors.date ? "error" : ""}  `}>
        <label>Date</label>
        <input type="date" name="date" ref={register} defaultValue={today} />
      </div>
      <div className="field">
        <label>Select Workout</label>
        <select className="ui dropdown" name="workout" ref={register}>
          <option value="Greyskull LP A">Greyskull LP A</option>
          <option value="Greyskull LP B">Greyskull LP B</option>
        </select>
      </div>

      {/* Different Forms */}

      {watchWorkout === "Greyskull LP A" && (
        <GreyskullA register={register} errors={errors} />
      )}

      {watchWorkout === "Greyskull LP B" && (
        <GreyskullB register={register} errors={errors} />
      )}

      <button className="ui button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default WorkoutForm;
