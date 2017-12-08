import {combineReducers} from 'redux';
import filters from './filterReducer';

const rootReducer = combineReducers({
  filters
});

export default rootReducer;
