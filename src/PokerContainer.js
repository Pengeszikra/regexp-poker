import { h, Component } from "preact";
import { bindActionCreators } from "redux";
import { connect } from "preact-redux";
import * as Actions from "./Game/action";
import Desk from "./components/Desk";

class PokerContatiner extends Component {
  render({players = [], dealer ={ hand:[]} }){
    return <Desk players={players} dealer={dealer}/>
  }
}

const stateProps = state => ({...state});
const dispatchToProps = dispatch => ({actions: bindActionCreators(Actions, dispatch)});
export default connect( stateProps, dispatchToProps)(PokerContatiner);