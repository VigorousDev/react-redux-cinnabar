import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PackageTracking from './package_tracking';
import { getTrackingDetails } from '../../actions';
import Loading from '../common/loading';

class PackageTrackingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount(){
    this.props.getTrackingDetails()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <PackageTracking
        data={this.props.data}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTrackingDetails,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.packageTracking.data,
  };
}

PackageTrackingContainer.propTypes = {
	data: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageTrackingContainer);
