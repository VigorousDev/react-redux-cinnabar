import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EmailTracking from './email_tracking';
import Loading from '../common/loading';
import { getBatchData, updateTreeData } from '../../actions';
import {
  allEmailMetricsSplit,
  allEmailMetricsMismatch,
  allEmailMetrics,
} from '../../util/api/requests';

class EmailTrackingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.data.emailTrackingSplit || !this.props.data.emailTrackingMismatch || !this.props.data.emailTracking) {
      this.setState({
        loading: true,
      });
      this.props.getBatchData(allEmailMetricsMismatch(), 'emailTrackingMismatch');
      this.props.getBatchData(allEmailMetricsSplit(), 'emailTrackingSplit');
      this.props.getBatchData(allEmailMetrics(), 'emailTracking');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.emailTrackingSplit && this.state.loading) {
      this.setState({ loading: false });
    }
    if (!nextProps.data.emailTrackingSplit || !nextProps.data.emailTrackingMismatch || !nextProps.data.emailTracking) {
      this.setState({ loading: true });
    }
  }

  getData() {
    if (this.props.treeData === 'mismatch') {
      return this.props.data.emailTrackingMismatch;
    } else if (this.props.treeData === 'split shipment') {
      return this.props.data.emailTrackingSplit;
    }
    return this.props.data.emailTracking;
  }

  handleChange(e, value) {
    this.props.updateTreeData(value);
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <EmailTracking
        split={this.props.data.emailTrackingSplit || {}}
        data={this.getData()}
        emailType={this.props.treeData}
        handleChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    treeData: state.UI.treeData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBatchData,
    updateTreeData,
  }, dispatch);
}

EmailTrackingContainer.propTypes = {
  data: React.PropTypes.object,
  getBatchData: React.PropTypes.func.isRequired,
  treeData: React.PropTypes.string.isRequired,
  updateTreeData: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTrackingContainer);
