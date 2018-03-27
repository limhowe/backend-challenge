// Import Actions
import { TOGGLE_ADD_STATION } from './AppActions';

// Initial State
const initialState = {
  showAddStation: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_STATION:
      return {
        showAddStation: !state.showAddStation,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddStation
export const getShowAddStation = state => state.app.showAddStation;

// Export Reducer
export default AppReducer;
