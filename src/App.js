import React from "react";
import "./App.css";
import { DishForm } from "./components/DishForm/DishForm";

class App extends React.Component {
  submit = (values) => {
    alert("submitted");
    console.log(values);
  };
  render() {
    return (
      <div className="container">
        <h3 className="jumbotron">Dish Order</h3>
        <DishForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default App;
