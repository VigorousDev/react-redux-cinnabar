import axios from 'axios';
import qs from 'qs';

import { formatDate } from '../useful_functions';

const buildUrl = (filters, request) => {
  const params = {};
  request.filters.forEach(f => {
    if (typeof f === 'object') {
      const key = Object.keys(f)[0];
      const value = Object.values(f)[0];
      params[key] = value;
    } else if (f === 'start_date' || f === 'end_date') {
      params[f] = formatDate(filters[f]);
    } else {
      params[f] = filters[f];
    }
  });
  return `${__API__}${request.endpoint}?${qs.stringify(params)}`;
};

export const getData = (getState, request, success, handleError) => {
  const filters = getState().filters;
  return (
    axios({
      method: request.method,
      url: buildUrl(filters, request),
      headers: {
        Authorization: `Bearer ${getState().currentUser.accessToken}`,
      },
    })
    .then((response) => success(response))
    .catch((response) => handleError(response))
  );
};

export const getBatchData = (getState, requests, success, handleError) => {
  const filters = getState().filters;

  const data = requests.map(r => ({
    url: buildUrl(filters, r),
    method: r.method,
  }));

  return (
    axios({
      method: 'POST',
      url: `${__API__}/query/batch/`,
      headers: {
        Authorization: `Bearer ${getState().currentUser.accessToken}`,
      },
      data,
    })
    .then((response) => success(response))
    .catch((error) => handleError(error))
  );
};
