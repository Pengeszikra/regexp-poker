import { combineReducers } from "redux";
import pokerGameReducer from "./pokerGameReducer";

const rootReducer = combineReducers({
  pokerGameReducer
});

export default rootReducer;