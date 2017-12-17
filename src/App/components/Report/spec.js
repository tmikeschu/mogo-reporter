import React from "react";
import { mount } from "enzyme";
import Report from "./";

describe("<Report />", () => {
  const wrapper = shallow(<Report />);
  const container = wrapper.instance();

  it("mounts without crashing", () => {
    const wrapper = mount(<Report />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
