import "../style/poker.scss";
import { Component } from "preact";
import Players from "./Players";
import Dealer from "./Dealer";

export default class Desk extends Component {
  render({ players, dealer }) {        
    return (
      <div id="room">
        <div id="desk">                    
          <Dealer dealer={dealer} />          
          <Players players={players} />)}
        </div>
      </div>
    );
  }
}
