import { createStore, applyMiddleware, compose } from 'redux';

import createRootReducer from './reducers/index';
import history from './history';
import { routerMiddleware } from 'connected-react-router';

// const middleWares = );
// routerMiddleware(history)
// creating store using root reducer
const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // ... other middlewares ...
  )
);
// window.store = store;

export default store;
