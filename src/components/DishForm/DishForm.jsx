import React from "react";
import { Field, reduxForm } from "redux-form";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label className="control-label">{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
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
  if (!values.time) {
    errors.time = "Required";
  } else if (!/^\d+:\d+$/.test(values.time)) {
    errors.time = "Please Add Time";
  }
  if (!values.number) {
    errors.number = "Required";
  } else if (values.number.length < 2) {
    errors.number = "Minimum be 2 characters or more";
  }
  return errors;
};

export let DishForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit} id="dish-form">
      <div>
        <label for="name">Dish name:</label>
        <Field
          type="text"
          id="name"
          name="name"
          component={renderField}
          required
        />
      </div>
      <div>
        <label for="preparation_time">Preparation time:</label>
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
        <label for="type">Dish type:</label>
        <select id="type" name="type" required>
          <option value="" disabled selected>
            Select a dish type
          </option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
      </div>
      <div id="pizza-fields" class="hidden">
        <div>
          <label for="no_of_slices"># of slices:</label>
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
          <label for="diameter">Diameter:</label>
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
      <div id="soup-fields" class="hidden">
        <div>
          <label for="spiciness_scale">Spiciness scale (1-10):</label>
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
      <div id="sandwich-fields" class="hidden">
        <div>
          <label for="slices_of_bread"># of slices of bread:</label>
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
