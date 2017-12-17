import React, { PureComponent } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const AsyncMap = withScriptjs(
  withGoogleMap(props => (
    /* eslint-disable no-undef */
    // allow global google call
    <GoogleMap {...props.mapDefaults} ref={props.onMapMounted}>
      <Marker position={{ ...props.mapDefaults.defaultCenter }} />
    </GoogleMap>
  ))
);

class ReportMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: {
        lat: 42.3603416,
        lng: -83.0801975,
      },
      defaultZoom: 11,
    };
  }

  componentDidMount() {
    /* eslint-disable no-undef */
    // allow navigator call
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation);
    }
  }

  componentDidUpdate(_, { defaultCenter: prevCenter }) {
    const { defaultCenter: currentCenter } = this.state;
    if (prevCenter !== currentCenter) {
      this.map.panTo({ ...currentCenter });
    }
  }

  setCurrentLocation = pos => {
    const { coords: { latitude: lat, longitude: lng } = {} } = pos;
    this.setState({ defaultCenter: { lat, lng } });
  };

  onMapMounted = ref => {
    this.map = ref;
    this.forceUpdate();
  };

  render() {
    return (
      <AsyncMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDttFtNppkWvWarNnGNvJsCEynQBVfO2K4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        mapDefaults={{ ...this.state }}
        onMapMounted={this.onMapMounted}
        {...this.props}
      />
    );
  }
}

export default ReportMap;
