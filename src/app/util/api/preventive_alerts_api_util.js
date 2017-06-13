import axios from 'axios';
import qs from 'qs';

import { formatDate } from '../useful_functions';

export const getPreventiveAlertsCall = (params, success, catchError, accessToken) => {
  const requestParams = {};
  requestParams.start_date = formatDate(params.start_date);
  requestParams.end_date = formatDate(params.end_date);
  const address = `${__API__}/query/batch/`;
  const queryString = qs.stringify(requestParams);
  const low = `/returns/classes/data?level=low&${queryString}`;
  const med = `/returns/classes/data?level=medium&${queryString}`;
  const high = `/returns/classes/data?level=high&${queryString}`;
  const data = JSON.stringify([
    {
      url: low,
      method: 'GET',
    },
    {
      url: med,
      method: 'GET',
    },
    {
      url: high,
      method: 'GET',
    },
  ]);

  return (
    axios({
      method: 'POST',
      url: address,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};

export const takeAction = (success, catchError, accessToken, orderIDs, actionType) => {
  const address = `${__API__}/preventive/take_action`;
  const data = {
    order_ids: orderIDs,
    action: actionType,
  };

  return (
    axios({
      method: 'POST',
      url: address,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};

export const sendEmail = (accessToken, orderID) => {
  const params = {};
  params.email_type = 'mismatch';
  params.subject = 'U sure u wanted dat?';
  params.text = 'Our magic machine prediction thing thinks you might not want this. Want a different thing?';
  params.order_id = orderID;
  const address = `${__API__}/email/manual/compose_email`;
  return axios({
    method: 'GET',
    url: address + '?' + qs.stringify(params),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
