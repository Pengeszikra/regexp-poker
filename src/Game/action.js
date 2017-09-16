import * as ActionType from "../actions";


export const initGame = () => ({type:ActionType.INIT_GAME});

/*
export const shuffleDeck = dispatch =>{
  let deck = core.originDeck.sort( core.shuffle );
  dispatch({type:ActionType.SHUFFLE,deck});
} 
*/