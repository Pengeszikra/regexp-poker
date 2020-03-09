import React from "react";
import Hand from "./Hand";

export default ({ player }) => (
  <div className = "player">        
    <p>{player.name} : </p>        
    <Hand cards={player.hand} />
    <p>{player.chips}</p>
  </div>
);