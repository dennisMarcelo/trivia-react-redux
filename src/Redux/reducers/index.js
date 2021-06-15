import { combineReducers } from 'redux';
import userReducer from './user';

const rootReducer = combineReducers({
  player: userReducer,
});

export default rootReducer;
