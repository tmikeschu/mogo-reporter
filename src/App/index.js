import React, { Component } from "react";

import { ReportMap } from "./components";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapVisible: true,
    };
  }

  toggleMapDisplay = () => {
    this.setState(({ mapVisible: prev }) => ({ mapVisible: !prev }));
  };

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1>MoGo Reporter</h1>
        </header>
        <button className="displayToggle" onClick={this.toggleMapDisplay}>
          <i className="material-icons">add</i>
        </button>

        <div className="App__body">
          <ReportMap visible={this.state.mapVisible} />
          <div>Form</div>
        </div>
      </div>
    );
  }
}

export default App;
