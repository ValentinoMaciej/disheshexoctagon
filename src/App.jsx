import React from "react";
import styles from "./App.module.css";
import { DishForm } from "./components/DishForm/DishForm";

class App extends React.Component {
  submit = (values) => {
    alert("Dish has been submitted to our server");
    console.log(values);
  };
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Dish Maker</h2>
        <DishForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default App;
