import React, { Component } from "react";

import { ReportMap } from "./components";
import "./styles.css";
import Report from "./components/Report/";
import { graphql } from "react-apollo";

import createReport from "../mutations/createReport";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danger: "",
      level: "",
      latitude: "",
      longitude: "",
      gotLocation: false,
      reportFiled: false,
      mapVisible: true,
    };
  }

  toggleMapDisplay = () => {
    this.setState(({ mapVisible: prev }) => ({ mapVisible: !prev }));
  };

  locationSuccess = pos => {
    this.setState({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      gotLocation: true,
    });
  };

  locationError = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    this.setState({
      locationError: true,
    });
  };

  getLocation = () => {
    const locationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      this.locationSuccess,
      this.locationError,
      locationOptions
    );
  };

  fileReport = () => {
    const { createReport } = this.props;
    const { danger, level, latitude, longitude } = this.state;
    createReport({
      variables: {
        danger,
        level,
        latitude,
        longitude,
      },
    })
      .then(({ data }) => {
        this.setState({
          reportFiled: true,
          danger: "",
          level: "",
          mapVisible: true,
        });
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };

  handleClick = e => {
    e.preventDefault();
    this.getLocation();
    this.setState(
      {
        [e.target.dataset.metric]: e.target.value,
      },
      () => {
        const { reportFiled, gotLocation, danger, level } = this.state;
        gotLocation && !reportFiled && level && danger && this.fileReport();
      }
    );
  };

  render() {
    return (
      <div className="App">
        <h1 className="App__header">MoGo Reporter</h1>
        <i
          className="displayToggle material-icons"
          onClick={this.toggleMapDisplay}
        >
          add
        </i>
        <div className="App__body">
          <ReportMap visible={this.state.mapVisible} />
          <div>
            {this.state.locationError && (
              <h1>Please Enable Location Services</h1>
            )}
            <Report
              onClick={this.handleClick}
              danger={this.state.danger}
              level={this.state.level}
            />
          </div>
        </div>
      </div>
    );
  }
}

const AppWithData = graphql(createReport, { name: "createReport" })(App);

export default AppWithData;
