import { combineReducers } from 'redux';

import todo from './todo';
import search from './search';

export default combineReducers({
  todo,
  search,
});