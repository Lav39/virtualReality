import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import appReducer from '../reducers/appReducer';

export default createStore(combineReducers({appReducer}),{});