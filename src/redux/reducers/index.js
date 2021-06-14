import { globalReducer } from './globalReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
  combineReducers({
    globalReducer,
    router: connectRouter(history),
  });
export default createRootReducer;
