import * as ActionType from '../actions';

const initialState = {
  players: [],
  dealer: {
    hand: [],
    bet: 0
  }
}

const pokerGameReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ActionType.SIT_DOWN_PLAYER:
      let {player} = action.payload;
      return {
        ...state,
        players: [...players, player]
      }

    default:
      return state;
  }
}

export default pokerGameReducer;