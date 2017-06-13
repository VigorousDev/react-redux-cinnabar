import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateStartDate,
  updateEndDate,
  getBatchData,
  getData,
  clearAllData,
} from '../../../actions';
import DateRangePicker from './date_range_picker';
import { allUserMetrics } from '../../../util/api/user_metrics';
import { allReturnMetrics } from '../../../util/api/return_metrics';
import { allPreventiveAlerts } from '../../../util/api/preventive_alerts';

class DateRangePickerContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  setUpdate() {
    const start = (this.state.startDate).toISOString();
    const end = (this.state.endDate.add(2, 'd')).toISOString();
    this.props.updateStartDate(start);
    this.props.updateEndDate(end);
    this.props.clearAllData();
    this.props.getData(
      'returnsByCategory',
      ['start_date', 'end_date'],
      'categories'
    );
    switch (window.location.pathname) {
      case '/returnmetrics':
        this.props.getBatchData(allReturnMetrics(), 'returnMetrics');
        this.props.getBatchData({
          returnsByCategory: ['start_date', 'end_date', 'category', 'customer_city'],
          returnsByPrice: ['start_date', 'end_date', 'category', 'customer_city'],
        }, 'cityDrilldown');
        break;
      case '/usermetrics':
        this.props.getBatchData(allUserMetrics(), 'userMetrics');
        break;
      case '/preventivealerts':
        this.props.getBatchData(allPreventiveAlerts(), 'preventiveAlerts');
        break;
      case '/returnsmap':
        this.props.getData(
          'mapData',
          ['start_date', 'end_date', 'category'],
          'mapData'
        );
        break;
      default:
        console.log('bad window location for date range picker');
    }
  }

  handleChange(payload) {
    this.setState({
      startDate: payload.startDate,
      endDate: payload.endDate,
    });
  }

  render() {
    return (
      <DateRangePicker
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        handleChange={this.handleChange}
        setUpdate={this.setUpdate}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateStartDate,
    updateEndDate,
    getBatchData,
    getData,
    clearAllData,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    startDate: state.filters.start_date,
    endDate: state.filters.end_date,
  };
}

DateRangePickerContainer.propTypes = {
  updateStartDate: React.PropTypes.func.isRequired,
  getData: React.PropTypes.func.isRequired,
  getBatchData: React.PropTypes.func.isRequired,
  clearAllData: React.PropTypes.func.isRequired,
  updateEndDate: React.PropTypes.func.isRequired,
  startDate: React.PropTypes.string,
  endDate: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePickerContainer);
