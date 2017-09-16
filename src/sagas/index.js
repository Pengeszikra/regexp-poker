import * as ActionType from "../actions";
import * as Action from "../Game/action";
import { all, call, put, take, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as core from "../Game/poker-core";

export default function *rootSaga() {  
  yield all([
    yield startLog(),
  ]);
}

export function *startLog(){
  yield console.log('--- saga ---');
  let deck = core.originDeck.sort( core.shuffle );
  yield put({type:ActionType.SHUFFLE,deck});
  for(let i=0;i<5;i++){
    yield call(delay, 500);
    yield put({type:ActionType.DEAL_CARD});
  }
}

