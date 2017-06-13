import {
  fetchOrders,
  setCarrier,
} from '../util/api/carrier_allocation_api_util';

import { receiveOrders, getOrders } from '../actions';

const CarrierAllocationMiddleware = ({ getState, dispatch }) => next => action => {
  const getOrdersSuccess = (resp) => (
    dispatch(receiveOrders(resp.data))
  );

  const setCarrierSuccess = () => (
    dispatch(getOrders(action.ids))
  );

  const getOrdersFailure = (resp) => {
    console.log(resp);
  };

  switch (action.type) {
    case 'GET_ORDERS': {
      const accessToken = getState().currentUser.accessToken;
      const ids = action.ids;
      fetchOrders(ids, getOrdersSuccess, getOrdersFailure, accessToken);
      return next(action);
    }
    case 'SET_CARRIER': {
      const accessToken = getState().currentUser.accessToken;
      const ids = action.ids;
      setCarrier(ids, setCarrierSuccess, getOrdersFailure, accessToken);
      return next(action);
    }
    default:
      return next(action);
  }
};

export default CarrierAllocationMiddleware;
