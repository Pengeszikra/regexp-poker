import "./style/poker.scss";
import { Component, render } from "preact";
import Desk from "./components/Desk";

export default class App extends Component {
  render({players=[]}) {
    return <Desk players={players} />;
  }
}

render(<App />, document.getElementById("root"));
