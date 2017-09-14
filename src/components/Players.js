import { Component } from "preact";
import Player from "./components/Player";

export default class Players extends Component {
  render({ players }) {
    return (
      <div id="players">
        {players.map(player => (
          <Player player={player} />
        ))}
      </div>
    );
  }
}
