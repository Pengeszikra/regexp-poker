import * as ActionType from '../actions';

const initialState = {
  hand: [],
  bet: 0,
  message: ""  
}

const dataToCard = data => ( data ? {suit:data[0],run:data[1],hasReveal:true} : null);

const dealer = (state = initialState, action) => {

  switch (action.type) {
   
    case ActionType.DEAL_CARD_TO_DEALER: {
      let {card} = action;
      return {
          ...state,
          hand: [...state.hand, card]          
      }
    }

    case ActionType.DEALER_MESSAGE: {
      let {message} = action;
      return {
        ...state,
        message
      }
    }

    case ActionType.COLLECT_BET: {
      let {bet} = action;
      return {
        ...state,
        bet
      }
    }

    default:
      return state;
  }
}

export default dealer;