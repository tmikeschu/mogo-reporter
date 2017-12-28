import report, { initialState } from "./report";
import * as types from "../constants/ActionTypes";

describe("report reducer", () => {
  it("should handle initial state", () => {
    expect(report(undefined, {})).toEqual(initialState);
  });
  it("should handle ENABLE_SOMETHING", () => {
    // Arrange
    const initial = report();
    const expected = initialState.set("something", true);
    // Act
    const actual = report(initial, {
      type: types.ENABLE_SOMETHING,
    });
    // Assert
    expect(actual).toEqual(expected);
  });
  it("should handle DISABLE_SOMETHING", () => {
    // Arrange
    const initial = report();
    const expected = initialState.set("something", false);
    // Act
    const actual = report(initial, {
      type: types.DISABLE_SOMETHING,
    });
    // Assert
    expect(actual).toEqual(expected);
  });
});
