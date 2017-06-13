import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GenderFilter from './gender_filter';
import {
  updateGender,
  getBatchData,
  clearDataSet,
  clearDataGroup,
  getData,
} from '../../actions';
import { allUserMetrics } from '../../util/api/user_metrics';

class GenderFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getValue() {
    return this.props.gender ? this.props.gender : 'all';
  }

  handleChange(event, index, value) {
    if (window.location.pathname === '/usermetrics') {
      if (value === 'all') {
        this.props.updateGender(null);
      } else {
        this.props.updateGender(value);
      }
      this.props.clearDataGroup('userMetrics');
      this.props.getBatchData(allUserMetrics(), 'userMetrics');
    } else {
      if (value === 'all') {
        this.props.updateGender(null);
      } else {
        this.props.updateGender(value);
      }
      this.props.clearDataSet('returnMetrics', 'returnsBySize');
      this.props.getData(
        'returnsBySize',
        ['start_date', 'end_date', 'category', 'user_gender'],
        'returnMetrics'
      );
    }
  }

  render() {
    return (
      <GenderFilter
        handleChange={this.handleChange}
        getValue={this.getValue}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateGender,
    getBatchData,
    clearDataSet,
    clearDataGroup,
    getData,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    gender: state.filters.user_gender,
  };
}

GenderFilterContainer.propTypes = {
  updateGender: React.PropTypes.func.isRequired,
  getData: React.PropTypes.func.isRequired,
  getBatchData: React.PropTypes.func.isRequired,
  clearDataSet: React.PropTypes.func.isRequired,
  clearDataGroup: React.PropTypes.func.isRequired,
  gender: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(GenderFilterContainer);
