import "./style/poker.scss";
import { Component, render } from "preact";
import Desk from "./components/Desk";

export default class App extends Component {
  render() {
    let players = [
      {
        name: "Jhon",
        hand: [{ suit: "D", run: "K" }, { suit: "S", run: "7" }]
      },
      {
        name: "Bill",
        hand: [{ suit: "D", run: "K" }, { suit: "S", run: "7" }]
      },
      {
        name: "Evelyn",
        hand: [{ suit: "D", run: "K" }, { suit: "S", run: "7" }]
      },
      {
        name: "Oscar",
        hand: [{ suit: "D", run: "K" }, { suit: "S", run: "7" }]
      },
      {
        name: "Floran",
        hand: [{ suit: "D", run: "K" }, { suit: "S", run: "7" }]
      },
      {
        name: "Levin",
        hand: [{ suit: "D", run: "K" }, { suit: "S", run: "7" }]
      }
    ];
    return <Desk players={players} />;
  }
}

render(<App />, document.getElementById("root"));
