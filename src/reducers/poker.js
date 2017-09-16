import * as ActionType from '../actions';

const initialState = {
  players: [],
  dealer: {
    hand: [],
    bet: 0,
    message: ""
  },
  deck: []
}

const dataToCard = data => ( data ? {suit:data[0],run:data[1],hasReveal:true} : null);

const poker = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    
    case ActionType.SIT_DOWN_PLAYER: {
      let {player} = action;
      return {
        ...state,
        players: [...state.players, player]
      }
    }

    case ActionType.SHUFFLE: {
      let {deck} = action;
      return {
        ...state,
        deck
      }
    }

    case ActionType.DEAL_CARD: {
      let deck = [...state.deck];
      let data = deck.pop();
      let card = dataToCard(data);
      return {
        ...state,
        dealer: {
          ...state.dealer,
          hand: [...state.dealer.hand, card]          
        },
        deck
      }
    }

    case ActionType.SCORE: {
      let {message} = action;
      return {
        ...state,
        dealer: {
          ...state.dealer,
          message
        }
      }
    }

    case ActionType.BET: {
      let {bet} = action;
      return {
        ...state,
        dealer: {
          ...state.dealer,
          bet
        }
      }
    }

    default:
      return state;
  }
}

export default poker;