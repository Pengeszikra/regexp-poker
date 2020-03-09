import React from "react";
import Desk from "./components/Desk";
import { useReducerActions } from "react-slash";

export default () => {
  const [players, dealer] = [[], {}];
  return <Desk players={players} dealer={dealer}/>
}
