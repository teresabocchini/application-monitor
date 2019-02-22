import React, { Component } from "react";
import Header from "./components/Header";
//import ApplicationList from "./components/ApplicationList";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplicationList from "./components/ApplicationList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="application-monitor" />
        <div className="container">
          <ApplicationList />
        </div>
      </div>
    );
  }
}

export default App;
