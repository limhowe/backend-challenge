import { ADD_STATIONS, ERR_STATIONS } from './StationActions';

// Initial State
const initialState = { data: [] };

const StationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATIONS :
      return {
        data: action.stations,
      };
    case ERR_STATIONS:
      return {
        data: [],
        err: 404,
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
