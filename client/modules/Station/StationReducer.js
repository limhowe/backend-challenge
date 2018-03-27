import { ADD_STATIONS } from './StationActions';

// Initial State
const initialState = { data: [] };

const StationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATIONS :
      return {
        data: action.stations,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get all stations
export const getStations = state => state.stations.data;

// Export Reducer
export default StationReducer;
