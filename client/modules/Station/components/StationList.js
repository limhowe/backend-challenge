import React, { PropTypes } from 'react';

// Import Components
import StationListItem from './StationListItem/StationListItem';

function StationList(props) {
  return (
    <div className="listView">
      {
        props.stations.map(station => (
          <StationListItem
            station={station}
            key={station.kisokId}
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
    totalDocks: PropTypes.string.isRequired,
    kioskId: PropTypes.string.isRequired,
  })).isRequired,
};

export default StationList;
