import { merge } from 'lodash';

const CarrierAllocationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_ORDERS': {
      const stateDup = merge({}, state);
      stateDup.orders = action.orders.data;
      return stateDup;
    }
    case 'RECEIVE_LANES': {
      const stateDup = merge({}, state);
      stateDup.lanes = action.lanes.data;
      return stateDup;
    }
    default:
      return state;
  }
};

export default CarrierAllocationReducer;
