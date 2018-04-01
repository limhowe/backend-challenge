import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import Style
import styles from './StationListItem.css';

function StationListItem(props) {
  return (
    <div className={styles['single-station']}>
      <h3 className={styles['station-title']}>
        <Link to={`/stations/${props.station.kioskId}`} >
          {props.station.name}
        </Link>
      </h3>
      <p className={styles['station-type']}>KiskType: {props.station.kioskType}</p>
      <p className={styles['station-docs']}>TotalDocks : {props.station.totalDocks}</p>
    </div>
  );
}

StationListItem.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    kioskType: PropTypes.number.isRequired,
    totalDocks: PropTypes.number.isRequired,
    kioskId: PropTypes.string.isRequired,
  }).isRequired,
};

export default StationListItem;
