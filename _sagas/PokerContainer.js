import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "preact-redux";
import * as Actions from "./Game/action";
import Desk from "../src/components/Desk";

class PokerContatiner extends Component {
  render({table, dealer}){
    return <Desk players={table.players} dealer={dealer}/>
  }
}

const stateProps = state => ({...state});
const dispatchToProps = dispatch => ({actions: bindActionCreators(Actions, dispatch)});
export default connect( stateProps, dispatchToProps)(PokerContatiner);