import { actionCreator } from 'react-slash';

export const [INIT, init] = actionCreator("INIT");
export const [DEAL_CARD, dealCard] = actionCreator("DEAL_CARD");
export const [DEAL_CARD_TO_PLAYER, dealCardToPlayer] = actionCreator("DEAL_CARD_TO_PLAYER");
export const [DROP_CARD, dropCard] = actionCreator("DROP_CARD");
export const [SHUFFLE, shuffle] = actionCreator("SHUFFLE");
export const [SET_SMALL_BLIND, setSmallBlind] = actionCreator("SET_SMALL_BLIND");
export const [NEXT_PLAYER, nextPlayer] = actionCreator("NEXT_PLAYER");
export const [THE_FLOP, theFlop] = actionCreator("THE_FLOP");
export const [THE_RIVER, theRiver] = actionCreator("THE_RIVER");
export const [THE_SHODOWN, theShodown] = actionCreator("THE_SHODOWN");
export const [SCORE, score] = actionCreator("SCORE");
export const [SIT_DOWN_PLAYER, sitDownPlayer] = actionCreator("SIT_DOWN_PLAYER");
export const [STAND_UP_PLAYER, standUpPlayer] = actionCreator("STAND_UP_PLAYER");
export const [INIT_GAME, initGame] = actionCreator("INIT_GAME");
export const [BET, bet] = actionCreator("BET");

export const initialState = {
}

export const reducer = (state, {type, payload}) => {
  switch (type) {
    default: return state;
  }
}

export const actions = {
  init,
  dealCard,
  dealCardToPlayer,
  dropCard,
  shuffle,
  setSmallBlind,
  nextPlayer,
  theFlop,
  theRiver,
  theShodown,
  score,
  sitDownPlayer,
  standUpPlayer,
  initGame,
  bet,
};