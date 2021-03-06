import { h, render } from "preact";
import { Provider, connect } from "preact-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import rootSaga, {startLog} from "./sagas";
import createSagaMiddleware from "redux-saga";
import PokerContainer from "./PokerContainer";
import * as ActionType from "./Game/action";

console.log('regexp-poker v 0.1.0');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(  
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    //window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}> 
    <PokerContainer />      
  </Provider>,
  document.body
)

global.store = store;