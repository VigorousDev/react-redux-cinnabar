import axios from 'axios';
import qs from 'qs';

export const fetchOrders = (ids, success, catchError, accessToken) => {
  const address = `${__API__}/couriers/allocation?order_ids=${ids.join('&order_ids=')}`;

  return (
    axios({
      method: 'GET',
      url: address,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};

export const setCarrier = (ids, success, catchError, accessToken) => {
  const address = `${__API__}/couriers/allocation`;

  return (
    axios({
      method: 'PATCH',
      url: address,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        order_ids: ids
      },
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};
