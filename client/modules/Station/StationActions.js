import callApi from '../../util/apiCaller';
import * as dummyAPIResult from '../../util/dummyAPI';

import { browserHistory } from 'react-router';


// Export Constants
export const ADD_STATIONS = 'ADD_STATIONS';
export const ERR_STATIONS = 'ERR_STATIONS';

// Export Actions

export function addStations(stationData) {
  return {
    type: ADD_STATIONS,
    ...stationData,
  };
}

export function errorOccured() {
  return {
    type: ERR_STATIONS,
  };
}

export function fetchStations(at) {
  return (dispatch) => {
    if (!at) {
      return callApi('stations?at=2017-11-01T11:00:00').then(res => {
        dispatch(addStations(dummyAPIResult.dummyStations));
      });
    }
    return callApi(`stations?at=${at}`).then(res => {
      if (res.errors) {
          browserHistory.push('/404');
      } else {
        dispatch(addStations(res));
      }
    });
  };
}
