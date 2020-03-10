import React from "react";
import Desk from "./show/Desk";
import { useReducerActions } from "react-slash";
import { reducer, initialState, actions } from "./flow/pokerReducer";

export default () => {
  const { state } = useReducerActions(reducer, initialState, actions);
  const { players, dealer } = state;
  
  return <Desk players={players} dealer={dealer}/>
}
