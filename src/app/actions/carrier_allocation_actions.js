export const getOrders = (ids) => ({
  type: 'GET_ORDERS',
  ids,
});

export const setCarrier = (ids) => ({
  type: 'SET_CARRIER',
  ids,
});

export const receiveOrders = (orders) => ({
  type: 'RECEIVE_ORDERS',
  orders,
});
