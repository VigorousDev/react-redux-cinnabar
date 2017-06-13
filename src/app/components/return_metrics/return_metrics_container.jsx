import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBatchData } from '../../actions';
import { allReturnMetrics } from '../../util/api/return_metrics';
import ReturnMetrics from './return_metrics';

class ReturnMetricsContainer extends Component {

  componentWillMount() {
    if (!this.props.data.returnMetrics) {
      this.props.getBatchData(allReturnMetrics(), 'returnMetrics');
      this.props.getBatchData({
        returnsByCategory: ['start_date', 'end_date', 'category', 'customer_city'],
        returnsByPrice: ['start_date', 'end_date', 'category', 'customer_city'],
      }, 'cityDrilldown');
    }
  }

  render() {
    return (
      <ReturnMetrics
        data={this.props.data.returnMetrics || {}}
        cityDrilldown={this.props.data.cityDrilldown || {}}
        UI={this.props.UI}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBatchData,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.data,
    UI: state.UI,
  };
}

ReturnMetricsContainer.propTypes = {
  data: React.PropTypes.object,
  getBatchData: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnMetricsContainer);
