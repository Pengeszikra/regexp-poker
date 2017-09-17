import { combineReducers } from "redux";
import poker from "./poker";
import dealer from "./dealer";

const rootReducer = combineReducers({
  poker,
  dealer
});

export default rootReducer;