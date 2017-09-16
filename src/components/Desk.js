import "../style/poker.scss";
import { Component } from "preact";
import Player from "./Player";
import Dealer from "./Dealer";

export default class Desk extends Component {
  render({ players, dealer }) {    
    return (
      <div id="room">
        <div id="desk">                    
          <Dealer dealer={dealer} />
          {players.map(player => <Player player={player} />)}
        </div>
      </div>
    );
  }
}

