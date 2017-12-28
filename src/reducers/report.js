import { Map } from "immutable";
import { ENABLE_SOMETHING, DISABLE_SOMETHING } from "../constants/ActionTypes";

export const initialState = Map({
  text: "Use Redux",
  something: false,
});

export default function report(state = initialState, action = {}) {
  switch (action.type) {
    case ENABLE_SOMETHING:
      return state.set("something", true);
    case DISABLE_SOMETHING:
      return state.set("something", false);
    default:
      return state;
  }
}
