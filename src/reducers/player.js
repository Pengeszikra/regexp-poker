import * as ActionType from '../actions';

const initialState = {
  name: "",
  hand: [],  
  chips: 0,
  key: null
}

const player = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    
    case ActionType.DEAL_CARD_TO_PLAYER: {
      let {card} = action;
      return {
        ...state,
        hand: [...hand, card]
      }
    }

    case ActionType.DROP_CARD: {
      let {cardKey} = action;
      return {
        ...state,
        hand: hand.filter( card => card.key !== cardKey )
      }
    }

    default:
      return state;
  }
}

export default player;