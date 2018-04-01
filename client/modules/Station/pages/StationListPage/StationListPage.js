import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import StationList from '../../components/StationList';

// Import Actions
import { fetchStations } from '../../StationActions';

// Import Selectors
import { getStations } from '../../StationReducer';

class StationListPage extends Component {
  componentDidMount() {
    const { at } = this.props.location.query;
    this.props.dispatch(fetchStations(at));
  }

  render() {
    return (
      <div>
        <StationList stations={this.props.stations} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
StationListPage.need = [() => { return fetchStations(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    stations: getStations(state),
  };
}

StationListPage.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    kioskType: PropTypes.number.isRequired,
    totalDocks: PropTypes.number.isRequired,
    kioskId: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

StationListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(StationListPage);
