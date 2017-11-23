import { combineReducers } from 'redux';

import taxies from './mytaxies';
import cars2Go from './cars2go';

export default combineReducers({
  taxies, cars2Go,
});
