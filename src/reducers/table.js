import * as ActionType from '../actions';

const initialState = {
  players:[],
  deck:[]
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

    default:
      return state;
  }
}

export default table;