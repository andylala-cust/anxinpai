import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import {middleware} from '../navigator/stackNavigator';

const middlewares = [
  middleware,
];

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
