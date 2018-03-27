import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_STATIONS = 'ADD_STATIONS';

// Export Actions

export function addStations(stations) {
  return {
    type: ADD_STATIONS,
    stations,
  };
}

export function fetchStations() {
  return (dispatch) => {
    return callApi('stations?at=2017-11-01T11:00:00').then(res => {
      dispatch(addStations(res.stations));
    });
  };
}
