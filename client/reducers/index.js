import {combineReducers} from 'redux';
import filters from './filterReducer';
import message from './messageReducer';

const rootReducer = combineReducers({
  filters,
  message
});

export default rootReducer;
