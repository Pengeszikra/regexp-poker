import React from "react";
import Player from "./Player";

export default ({ players }) => (
  <div id="players">        
    {players.map(player => (
      <Player player={player} key={player.id} />
    ))}
  </div>
);