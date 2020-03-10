import React from "react";
import Hand from "./Hand";
import { show } from "react-slash";

//const [Dealer, Street, Bet] = divFactory('dealer', 'street', 'bet');

export default ({dealer:{hand, message, bet}}) => (
  <div id="dealer">
    <div id="street">
        <p>Dealer</p>
        <Hand cards = {hand} />
        <span>{message}</span>
        <div className="bet">{bet}</div>
    </div>
  </div>
);