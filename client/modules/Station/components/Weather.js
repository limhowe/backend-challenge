import React from 'react';
import PropTypes from 'prop-types';

import styles from './StationListItem/StationListItem.css';

function Weather(props) {
  return (
    <div className={styles['single-station']}>
      <h3 className={styles['station-title']}>
        Weather
      </h3>
      <p className={styles['station-type']}>Max Temperature: {props.weather.temp_max}</p>
      <p className={styles['station-type']}>Min Temperature: {props.weather.temp_min}</p>
      <p className={styles['station-type']}>Humidity: {props.weather.humidity}</p>
      <p className={styles['station-type']}>Pressure: {props.weather.pressure}</p>
    </div>
  );
}

Weather.propTypes = {
  weather: PropTypes.arrayOf(PropTypes.shape({
    temp_max: PropTypes.number.isRequired,
    temp_min: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
  })).isRequired,
};

export default Weather;
