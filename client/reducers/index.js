import {combineReducers} from 'redux';
import filters from './filterReducer';
import message from './messageReducer';
import chat from './chatReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  filters,
  message,
  chat,
  user
});

export default rootReducer;
