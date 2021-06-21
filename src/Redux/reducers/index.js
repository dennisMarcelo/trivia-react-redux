import { combineReducers } from 'redux';
import configReducer from './settings';
import userReducer from './user';

const rootReducer = combineReducers({
  player: userReducer,
  config: configReducer,
});

export default rootReducer;
