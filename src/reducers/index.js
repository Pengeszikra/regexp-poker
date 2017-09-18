import { combineReducers } from "redux";
import table from "./table";
import player from "./player";
import dealer from "./dealer";

const rootReducer = combineReducers({
  table,
  player,
  dealer
});

export default rootReducer;