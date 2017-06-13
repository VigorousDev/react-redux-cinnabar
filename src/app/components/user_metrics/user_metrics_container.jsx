import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBatchData } from '../../actions';
import UserMetrics from './user_metrics';
import { allUserMetrics } from '../../util/api/user_metrics';

class UserMetricsContainer extends Component {
  componentWillMount() {
    if (!this.props.data.userMetricsData) {
      this.props.getBatchData(allUserMetrics(), 'userMetrics');
    }
  }

  render() {
    return (
      <UserMetrics
        data={this.props.data.userMetrics || {}}
      />
    );
  }
}

UserMetricsContainer.propTypes = {
  getBatchData: React.PropTypes.func.isRequired,
  data: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBatchData,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMetricsContainer);
