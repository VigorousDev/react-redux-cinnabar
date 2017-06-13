import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LanePerformance from './lane_performance';
import { getLanes, getLaneData } from '../../actions';
import Loading from '../common/loading';

class LanePerformanceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount(){
    this.props.getLaneData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.laneData) {
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
      <LanePerformance
        lanes={this.props.lanes}
        getLanes={this.props.getLanes}
        laneData={this.props.laneData}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLanes,
    getLaneData,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    lanes: state.lanePerformance.lanes,
    laneData: state.lanePerformance.laneData,
  };
}

LanePerformance.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LanePerformanceContainer);
