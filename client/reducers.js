/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import stations from './modules/Station/StationReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  stations,
  intl,
});
