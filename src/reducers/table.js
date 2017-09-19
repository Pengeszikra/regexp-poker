import * as ActionType from '../actions';

const initialState = {
  players:[],
  active: false
}

const table = (state = initialState, action) => {
  
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
        deck: [...deck]
      }
    }

    case ActionType.DEAL_CARD_TO_PLAYER: {
      let {playerKey, card} = action;           
      return {
        ...state,
        players: state.players.map( player =>
          player.id == playerKey
            ? {...player, hand:[...player.hand, card]}
            : player          
        )
      }
    }

    case ActionType.DROP_CARD: {
      let {playerKey, cardKey} = action;           
      return {
        ...state,
        players: state.players.map( player =>
          player.id == playerKey
            ? {...player, hand: player.hand.filter( card => cardKey !== card.id ) }
            : player          
        )
      }
    }

    case ActionType.CHIPS: {
      let {playerKey, amount} = action;           
      return {
        ...state,
        players: state.players.map( player =>
          player.id == playerKey
            ? {...player, bet: player.chips + amount }
            : player          
        )
      }
    }

    default:
      return state;
  }
}

export default table;