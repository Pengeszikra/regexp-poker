import React from "react";
import Hand from "./Hand";

export default ({dealer}) => (
  <div id="dealer">
    <div id="street">
        <p>Dealer</p>
        <Hand cards = {dealer.hand} />
        <span>{dealer.message}</span>
        <div className="bet">{dealer.bet}</div>
    </div>
  </div>
);