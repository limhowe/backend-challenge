import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import StationListItem from './StationListItem/StationListItem';

function StationList(props) {
  return (
    <div className="listView">
      {
        props.stations.map(station => (
          <StationListItem
            station={station}
            key={station.kioskId}
          />
        ))
      }
    </div>
  );
}

StationList.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    kioskType: PropTypes.number.isRequired,
    totalDocks: PropTypes.number.isRequired,
    kioskId: PropTypes.string.isRequired,
  })).isRequired,
};

export default StationList;
