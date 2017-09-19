import * as ActionType from "../actions";
import * as Action from "../Game/action";
import { all, call, put, take, takeEvery, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as core from "../Game/poker-core";

export default function *rootSaga() {  
  yield all([
    yield startLog(),
  ]);
}

const dataToCard = data => ( data ? {
  suit:data[0],
  run:data[1],
  hasReveal:true, 
  key: core.gui()
} : null);

const getDeck = state => state.table.deck;

export function *startLog(){

  let deck = core.originDeck.sort( core.shuffle ).map( card => dataToCard(card) );

  yield put({type:ActionType.SHUFFLE,deck});
  
  deck = yield select(getDeck);

  for(let i=0;i<5;i++){
    yield call(delay, 200);
    let card = deck.pop();
    card.hasReveal = true;
    yield put({type:ActionType.DEAL_CARD_TO_DEALER, card});
  }
  yield put({type:ActionType.SHUFFLE,deck});

  yield put({type:ActionType.DEALER_MESSAGE,message:"regexp poker start working"})
  
  for(let bet=0;bet<=1000;bet+=100){
    yield call(delay, 50);
    yield put({type:ActionType.COLLECT_BET,bet});
  }
  
  var playerNames = [`Donowan`,`Maximilian`,`Edwin`,`Roberto`,`Jake`,`Petrovics`];

  for( name of playerNames ) {
    yield call(delay, 150);
    let player = { name, hand:[deck.pop(),{...(deck.pop()),hasReveal:true}] }
    yield put({type:ActionType.SIT_DOWN_PLAYER,player});
  }

}

