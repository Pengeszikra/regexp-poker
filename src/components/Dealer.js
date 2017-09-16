import { Component } from "preact";
import Hand from "./Hand";

export default class Delaer extends Component {
  render({dealer, message, bet}){
    return (
      <div id="dealer">
        <div id="street">
            <Hand cards = {dealer.hand} />
            <span>{message}</span>
            <div className="bet">{bet}</div>
        </div>
      </div>
    );
  }
}
