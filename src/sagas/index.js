import * as ActionType from "../actions";
import { all } from "redux-saga/effects";

export default function *rootSaga() {
  yield startLog();
  yield all([
    
  ]);
}

export function *startLog(){
  yield console.log('---saga still working---');
}