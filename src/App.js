import React from "react";
import "./App.css";
import { DishForm } from "./components/DishForm/DishForm";

class App extends React.Component {
  submit = (values) => {
    alert("Dish has been submitted to our server");
    console.log(values);
  };
  render() {
    return (
      <div className="container">
        <h3 className="mainTitle">Dish Order</h3>
        <DishForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default App;
