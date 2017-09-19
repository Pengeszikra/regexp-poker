import * as ActionType from "../actions";
import * as Action from "../Game/action";
import { all, call, put, take, takeEvery, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as core from "../Game/poker-core";

export default function *rootSaga() {  
  yield all([
    //yield startLog(),
    yield match()
  ]);
}

const dataToCard = data => ( data ? {
  suit:data[0],
  run:data[1],
  hasReveal:true, 
  id: core.gui()
} : null);

let deck;

export function *startLog(){

  shuffleDeck();

  yield playesArrive();

  yield dealerGet5Card();
  

  // KIHAL - yield/saga is great way to handle game flow

}

function shuffleDeck(){
  deck = core.originDeck.sort( core.shuffle ).map( card => dataToCard(card) );
}

function *dealerGet5Card(){
  for(let i=0;i<5;i++){
    yield call(delay, 100);
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
}

function *playersArrive(){
  var playerNames = [`Donowan`,`Maximilian`,`Edwin`,`Roberto`,`Jake`,`Petrovics`];
  
  for( name of playerNames ) {
    yield call(delay, 50);
    let player = { 
      name, 
      hand:[],
      id: core.gui(),
      chips: 500
    }
    yield put({type:ActionType.SIT_DOWN_PLAYER,player});
  }

  /*
  let players = yield select( store => store.table.players );  

  for(let player of players){
    yield call(delay, 150);
    yield put({type:ActionType.DEAL_CARD_TO_PLAYER, card:deck.pop() , playerKey:player.id});
    yield call(delay, 150);
    yield put({type:ActionType.DEAL_CARD_TO_PLAYER, card:deck.pop() , playerKey:player.id});  
  }

  players = yield select( store => store.table.players );

  yield put({type:ActionType.DROP_CARD, playerKey:players[0].id, cardKey: players[0].hand[0].id })
  */
}

function *reShuffle() {
  // log = "Shuffle ..."
  shuffleDeck()
  yield playersArrive();
  // players.map( player => player.handClear())
  // this.dealer.handClear()
  // this.inactive()
}


function *dealing(){
  let players = yield select( store => store.table.players );
  for(let player of players){
    yield call(delay, 150);
    yield put({type:ActionType.DEAL_CARD_TO_PLAYER, card:deck.pop() , playerKey:player.id});
    yield call(delay, 150);
    yield put({type:ActionType.DEAL_CARD_TO_PLAYER, card:deck.pop() , playerKey:player.id});  
  }
}

function *theBetRound(phase) {
  let players = yield select( store => store.table.players );
  for(let player of players){
    let amount = - (~~(Math.random() * 5) * 10);
    yield call(delay, 150);
    yield put({type:ActionType.CHIPS,amount});
    yield call(delay, 150);
    yield put({type:ActionType.COLLECT_BET,bet:-amount});    
  }
}

function *dealerReveal( message, numberOfCard ){
  yield put({type:ActionType.DEALER_MESSAGE,message});
  for(let i of Array(numberOfCard)){
    yield call(delay, 100);
    let card = deck.pop();
    card.hasReveal = true;
    yield put({type:ActionType.DEAL_CARD_TO_DEALER, card});
  }  
}

function *singleRound() {

  yield dealing();

  yield theBetRound('Flop');

  yield dealerReveal('The Flop', 3);

  yield theBetRound('Turn');
  
  yield dealerReveal('The Turn', 1);

  yield theBetRound('River');
  
  yield dealerReveal('The River', 1);

  yield theBetRound('Showdown');

  /*
  let winnerIs = []
  for (let score of showScores(winnerIs)) yield score
  let winner = theShowdown(winnerIs)
  yield winner
  winner.chips += dealer.drawBet()
  for (let pause of Array(10)) yield winner
  */

}

let amount = 7

function *match() {
  //for (let round of Array(amount)) {
    yield reShuffle()
    for (let step of singleRound()) yield step
  //}
}
