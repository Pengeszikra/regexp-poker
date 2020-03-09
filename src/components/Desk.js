import "../style/poker.scss";
import React from "react";
import Players from "./Players";
import Dealer from "./Dealer";

export default ({ players, dealer }) => (
  <div id="room">
    <div id="desk">                    
      <Dealer dealer={dealer} />          
      <Players players={players} />
    </div>
  </div>
);