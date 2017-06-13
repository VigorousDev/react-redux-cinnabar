import React, { PropTypes } from 'react';

import CarrierAllocationCard from './carrier_allocation_card';

const CarrierAllocation = (props) => {
  const styles = {
    container: {
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <CarrierAllocationCard
        getOrders={props.getOrders}
        orders={props.orders}
        setCarrier={props.setCarrier}
        takeAction={props.takeAction}
      />
    </div>
  );
};

CarrierAllocation.propTypes = {
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.array,
  setCarrier: PropTypes.func.isRequired,
  takeAction: PropTypes.func.isRequired,
};

export default CarrierAllocation;
