import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CarrierAllocation from './carrier_allocation';
import { getOrders, setCarrier, takeAction } from '../../actions';

class CarrierAllocationContainer extends Component {
  constructor(props) {
    super(props);
    this.getOrders = this.getOrders.bind(this);
  }

  getOrders(ids) {
    this.props.getOrders(ids);
  }

  render() {
    return (
      <CarrierAllocation
        getOrders={this.getOrders}
        setCarrier={this.props.setCarrier}
        orders={this.props.orders}
        takeAction={this.props.takeAction}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOrders,
    setCarrier,
    takeAction,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    orders: state.carrierAllocation.orders,
  };
}

CarrierAllocationContainer.propTypes = {
  getOrders: PropTypes.func.isRequired,
  takeAction: PropTypes.func.isRequired,
  orders: PropTypes.array,
  setCarrier: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierAllocationContainer);
