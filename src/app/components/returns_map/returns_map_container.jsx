import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getData } from '../../actions';
import ReturnsMap from './returns_map';
import Loading from '../common/loading';

class ReturnsMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount() {
    if (!this.props.data.mapData) {
      this.setState({ loading: true });

      this.props.getData(
        'mapData',
        ['start_date', 'end_date', 'category'],
        'mapData'
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.mapData && this.state.loading) {
      this.setState({ loading: false });
    }
    if (!nextProps.data.mapData) {
      this.setState({
        loading: true,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <ReturnsMap mapData={this.props.data.mapData.mapData} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getData,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

ReturnsMapContainer.propTypes = {
  getData: React.PropTypes.func.isRequired,
  data: React.PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(ReturnsMapContainer);
