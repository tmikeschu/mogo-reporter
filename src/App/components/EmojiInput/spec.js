import React from "react";
import { mount } from "enzyme";
import EmojiInput from "./";

describe("<EmojiInput />", () => {
  it("mounts without crashing", () => {
    let input = { name: "hello", emoji: "hi" };
    let onClick = jest.fn();
    const wrapper = mount(
      <EmojiInput input={input} parent="bar" selected="foo" onClick={onClick} />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
