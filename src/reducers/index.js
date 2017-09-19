import { combineReducers } from "redux";
import table from "./table";
import dealer from "./dealer";

const rootReducer = combineReducers({
  table,
  dealer
});

export default rootReducer;