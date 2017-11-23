import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

function configureStore() {
  return createStore(reducers, applyMiddleware(thunk));
}

const store = configureStore();

export default store;
