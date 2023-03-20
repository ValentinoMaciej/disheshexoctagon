import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./DishForm.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { formValueSelector } from "redux-form";

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
    <label className={styles.controlLabel}>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        step={step}
        min={min}
        max={max}
        className={styles.formControl}
      />
      {touched &&
        ((error && <span className={styles.error}>{error}</span>) ||
          (warning && <span className={styles.warning}>{warning}</span>))}
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
  const dishTypeSelector = formValueSelector("dish-form");
  const dishType = useSelector((state) => dishTypeSelector(state, "type"));
  const APIurl =
    "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes";

  const submit = async (values) => {
    try {
      let formattedData = {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
      };

      if (values.type === "pizza") {
        formattedData.no_of_slices = values.no_of_slices;
        formattedData.diameter = values.diameter;
      } else if (values.type === "soup") {
        formattedData.spiciness_scale = values.spiciness_scale;
      } else if (values.type === "sandwich") {
        formattedData.slices_of_bread = values.slices_of_bread;
      }

      await axios
        .post(APIurl, JSON.stringify(formattedData), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("POST request was successful:", response.data);
          } else {
            console.log("POST request failed with status:", response.status);
          }
        })
        .catch((error) => {
          console.error("POST request error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      id="dish-form"
      className={styles.dishForm}
    >
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
        <Field name="type" id="type" component="select" required>
          <option value="" disabled selected>
            Select a dish type
          </option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Field>
      </div>
      {dishType === "pizza" && (
        <div id="pizza-fields">
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
      )}
      {dishType === "soup" && (
        <div id="soup-fields">
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
      )}
      {dishType === "sandwich" && (
        <div id="sandwich-fields">
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
      )}
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
