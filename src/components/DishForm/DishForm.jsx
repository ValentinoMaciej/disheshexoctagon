import React from "react";
import { Field, reduxForm } from "redux-form";

const renderField = ({
  input,
  label,
  type,
  step,
  min,
  max,
  meta: { touched, error, warning },
}) => (
  <div>
    <label className="control-label">{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        step={step}
        min={min}
        max={max}
        className="form-control"
      />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2) {
    errors.firstName = "Minimum be 2 characters or more";
  }
  if (!values.preparation_time) {
    errors.preparation_time = "Required";
  } else if (
    !/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(values.preparation_time)
  ) {
    errors.preparation_time = "Please Add Time";
  }
  if (!values.no_of_slices) {
    errors.no_of_slices = "Required";
  } else if (values.no_of_slices < 2) {
    errors.no_of_slices = "Minimum 2 slices";
  }
  if (!values.diameter) {
    errors.diameter = "Required";
  } else if (values.diameter < 25) {
    errors.diameter = "Diameter must be 25cm or higher";
  } else if (values.diameter > 75) {
    errors.diameter = "Diameter must be 75cm or less";
  }
  if (!values.spiciness_scale) {
    errors.spiciness_scale = "Required";
  } else if (values.spiciness_scale < 1) {
    errors.spiciness_scale = "Minimum 1 on spiciness scale";
  }
  if (!values.slices_of_bread) {
    errors.slices_of_bread = "Required";
  } else if (values.slices_of_bread < 2) {
    errors.slices_of_bread = "Minimum 2 slices of bread";
  } else if (values.slices_of_bread > 50) {
    errors.slices_of_bread = "Maximum 50 slices of bread";
  }
  return errors;
};

export let DishForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <form onSubmit={handleSubmit} id="dish-form">
      <div>
        <label htmlFor="name">Dish name:</label>
        <Field
          type="text"
          id="name"
          name="name"
          component={renderField}
          required
        />
      </div>

      <div>
        <label htmlFor="preparation_time">Preparation time:</label>
        <Field
          type="time"
          id="preparation_time"
          name="preparation_time"
          step="1"
          component={renderField}
          required
        />
      </div>
      <div>
        <label htmlFor="type">Dish type:</label>
        <select id="type" name="type" required>
          <option value="" disabled selected>
            Select a dish type
          </option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
      </div>
      <div id="pizza-fields" className="hidden">
        <div>
          <label htmlFor="no_of_slices"># of slices:</label>
          <Field
            type="number"
            id="no_of_slices"
            name="no_of_slices"
            min="1"
            component={renderField}
            required
          />
        </div>
        <div>
          <label htmlFor="diameter">Diameter:</label>
          <Field
            type="number"
            id="diameter"
            name="diameter"
            step="0.01"
            component={renderField}
            required
          />
        </div>
      </div>
      <div id="soup-fields" className="hidden">
        <div>
          <label htmlFor="spiciness_scale">Spiciness scale (1-10):</label>
          <Field
            type="number"
            id="spiciness_scale"
            name="spiciness_scale"
            min="1"
            max="10"
            component={renderField}
            required
          />
        </div>
      </div>
      <div id="sandwich-fields" className="hidden">
        <div>
          <label htmlFor="slices_of_bread"># of slices of bread:</label>
          <Field
            type="number"
            id="slices_of_bread"
            name="slices_of_bread"
            min="1"
            component={renderField}
            required
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};
DishForm = reduxForm({
  form: "dish-form",
  validate,
})(DishForm);

export default DishForm;
