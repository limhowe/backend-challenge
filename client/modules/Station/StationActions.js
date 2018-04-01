import callApi from '../../util/apiCaller';
import * as dummyAPIResult from '../../util/dummyAPI';

// Export Constants
export const ADD_STATIONS = 'ADD_STATIONS';

// Export Actions

export function addStations(stationData) {
  return {
    type: ADD_STATIONS,
    ...stationData,
  };
}

export function fetchStations() {
  return (dispatch) => {
    return callApi('stations?at=2017-11-01T11:00:00').then(res => {
      dispatch(addStations(dummyAPIResult.dummyStations));
    });
  };
}
