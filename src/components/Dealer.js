import { Component } from "preact";
import Hand from "./Hand";

export default class Delaer extends Component {
  render({dealer}){
    return (
      <div id="dealer">
        <div id="street">
            <p>Dealer</p>
            <Hand cards = {dealer.hand} />
            <span>{dealer.message}</span>
            <div className="bet">{dealer.bet}</div>
        </div>
      </div>
    );
  }
}
