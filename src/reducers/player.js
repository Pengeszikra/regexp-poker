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
    
    default:
      return state;
  }
}

export default player;