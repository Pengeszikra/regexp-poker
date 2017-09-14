import { Component } from "preact";

export default class Delaer extends Component {
  render({ dealer }) {
    return (
      <div id="dealer">
        <div id="street">
          <div className="hand">
            <div className="D c4" />
            <div className="C c6" />
            <div className="B" />
            <div className="B" />
            <div className="B" />
          </div>
          <span>Winner is: Jack :: Two Pair</span>
          <div className="bet" />
        </div>
      </div>
    );
  }
}
