import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBatchData, updateCity, clearDataGroup } from '../../actions';
import CityDrilldownFilter from './city_drilldown_filter';

class CityDrilldownFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.handleChange(value);
    this.props.updateCity(value);
    this.props.clearDataGroup('cityDrilldown');
    this.props.getBatchData({
      returnsByCategory: ['start_date', 'end_date', 'category', 'customer_city'],
      returnsByPrice: ['start_date', 'end_date', 'category', 'customer_city'],
    }, 'cityDrilldown');
  }

  render() {
    return (
      <CityDrilldownFilter
        city={this.props.city}
        handleChange={this.handleChange}
        cities={this.props.cities}
      />
    );
  }
}

CityDrilldownFilterContainer.propTypes = {
  getBatchData: PropTypes.func.isRequired,
  updateCity: PropTypes.func.isRequired,
  clearDataGroup: PropTypes.func.isRequired,
  city: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  cities: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBatchData,
    updateCity,
    clearDataGroup,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityDrilldownFilterContainer);
