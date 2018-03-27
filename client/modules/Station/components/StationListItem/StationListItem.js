import React, { PropTypes } from 'react';
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
      <hr className={styles.divider} />
    </div>
  );
}

StationListItem.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    kioskType: PropTypes.number.isRequired,
    totalDocks: PropTypes.string.isRequired,
    kioskId: PropTypes.string.isRequired,
  }).isRequired,
};

export default StationListItem;
