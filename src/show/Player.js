import React from "react";
import Hand from "./Hand";

export default ({ player: {name, hand, chips} }) => (
  <div className = "player">        
    <p>{name} : </p>        
    <Hand cards={hand} />
    <p>{chips}</p>
  </div>
);