import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TrendsIntervalFilter from './trends_interval_filter';
import { updateGroupBy, getBatchData, clearDataSet } from '../../actions';

class TrendsIntervalFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getValue() {
    return this.props.groupby ? this.props.groupby : 'day';
  }

  handleChange(event, index, value) {
    if (value === 'day') {
      this.props.updateGroupBy(null);
      this.fetchNewData();
    } else {
      this.props.updateGroupBy(value);
      this.fetchNewData();
    }
  }

  fetchNewData() {
    this.props.clearDataSet('returnMetrics', 'returnsByDate');
    this.props.clearDataSet('returnMetrics', 'ordersByDate');
    this.props.getBatchData({
      returnsByDate: ['start_date', 'end_date', 'category', 'groupby'],
      ordersByDate: ['start_date', 'end_date', 'category', 'groupby'],
      orderValueByDate: ['start_date', 'end_date', 'category', 'groupby'],
      returnValueByDate: ['start_date', 'end_date', 'category', 'groupby'],
    }, 'returnMetrics');
  }

  render() {
    return (
      <TrendsIntervalFilter
        handleChange={this.handleChange}
        getValue={this.getValue}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateGroupBy,
    getBatchData,
    clearDataSet,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    groupby: state.filters.groupby,
  };
}

TrendsIntervalFilterContainer.propTypes = {
  updateGroupBy: React.PropTypes.func.isRequired,
  clearDataSet: React.PropTypes.func.isRequired,
  getBatchData: React.PropTypes.func.isRequired,
  groupby: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendsIntervalFilterContainer);
