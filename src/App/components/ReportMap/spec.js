import React from "react";
import { mount } from "enzyme";
import ReportMap from "./";

describe("<ReportMap />", () => {
  const wrapper = shallow(<ReportMap />);
  const container = wrapper.instance();

  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
    expect(container).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("mounts without crashing", () => {
    const wrapper = mount(<ReportMap />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  describe("componentDidMount", () => {
    it("sends a callback to the navigator.geolocation.getCurrentPosition", () => {
      navigator.geolocation = {
        getCurrentPosition: jest.fn(),
      };
      const mock = navigator.geolocation.getCurrentPosition;
      container.componentDidMount();
      expect(mock).toHaveBeenCalledWith(container.setCurrentLocation);
      mock.mockReset();
    });
  });

  describe("setCurrentLocation", () => {
    it("sets state to the position object coords", () => {
      const position = { coords: { latitude: 1, longitude: 2 } };
      expect(container.state.defaultCenter.lat).not.toEqual(1);
      expect(container.state.defaultCenter.lng).not.toEqual(2);

      container.setCurrentLocation(position);

      expect(container.state.defaultCenter.lat).toEqual(1);
      expect(container.state.defaultCenter.lng).toEqual(2);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("componentDidUpdate", () => {
    it("calls panTo on map if states are different", () => {
      const position = { defaultCenter: { lat: 1, lng: 2 } };
      container.map = { panTo: jest.fn() };
      const mock = container.map.panTo;
      container.componentDidUpdate({}, position);
      expect(mock).toHaveBeenCalledWith(position.defaultCenter);

      delete container.map;
    });

    it("doesnt call panTo on map if states are the same", () => {
      const position = container.state;
      container.map = { panTo: jest.fn() };
      const mock = container.map.panTo;
      container.componentDidUpdate({}, position);
      expect(mock).not.toHaveBeenCalled();

      delete container.map;
    });
  });

  describe("onMapMounter", () => {
    it("sets this.map to the ref", () => {
      expect(container.map).toBeUndefined();
      container.onMapMounted("MAP");
      expect(container.map).toEqual("MAP");
    });

    it("calls forceUpdate", () => {
      const restore = container.forceUpdate;
      container.forceUpdate = jest.fn();
      const mock = container.forceUpdate;
      container.onMapMounted("MAP");
      expect(mock).toHaveBeenCalled();
      container.forceUpdate = restore;
    });
  });
});
