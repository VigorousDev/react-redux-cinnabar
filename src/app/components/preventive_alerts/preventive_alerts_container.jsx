import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { merge } from 'lodash';

import {
  takeAction,
  clearActionTaken,
  getBatchData,
} from '../../actions';
import PreventiveAlerts from './preventive_alerts';
import Loading from '../common/loading';
import { allPreventiveAlerts } from '../../util/api/preventive_alerts';

class PreventiveAlertsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount() {
    if (!this.props.data.preventiveAlerts) {
      this.setState({ loading: true });
      this.props.getBatchData(allPreventiveAlerts(), 'preventiveAlerts');
    }
    if (this.props.data.preventiveAlerts) {
      this.data = this.initialSort(this.props.data.preventiveAlerts);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.preventiveAlerts && this.state.loading) {
      this.setState({ loading: false });
      this.data = this.initialSort(nextProps.data.preventiveAlerts);
      return;
    }
    if (!nextProps.data.preventiveAlerts) {
      this.setState({ loading: true });
      return;
    }
    if (nextProps.preventiveAlerts.takeActionSuccess === 'success') {
      this.setState({ loading: true });
      this.props.getBatchData(allPreventiveAlerts(), 'preventiveAlerts');
    }
  }

  initialSort(data) {
    const sortByDate = (a, b) => {
      if (a[0] > b[0]) {
        return -1;
      }
      if (a[0] === b[0]) {
        return 0;
      }
      return 1;
    };
    const sorted = merge({}, data);
    sorted.high.rows = sorted.high.rows.sort((a, b) => sortByDate(a, b));
    sorted.medium.rows = sorted.medium.rows.sort((a, b) => sortByDate(a, b));
    sorted.low.rows = sorted.low.rows.sort((a, b) => sortByDate(a, b));
    return sorted;
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <PreventiveAlerts
        preventiveAlerts={this.data}
        takeAction={this.props.takeAction}
        takeActionSuccess={this.props.preventiveAlerts.takeActionSuccess}
        clearActionTaken={this.props.clearActionTaken}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBatchData,
    takeAction,
    clearActionTaken,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.data,
    preventiveAlerts: state.preventiveAlerts,
  };
}

PreventiveAlertsContainer.propTypes = {
  getBatchData: React.PropTypes.func.isRequired,
  takeAction: React.PropTypes.func.isRequired,
  clearActionTaken: React.PropTypes.func.isRequired,
  preventiveAlerts: React.PropTypes.object,
  data: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreventiveAlertsContainer);
