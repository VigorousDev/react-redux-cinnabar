import axios from 'axios';
import qs from 'qs';

import { formatDate } from '../useful_functions';

export const fetchPackageTracking = (getState, success, catchError, accessToken) => {
  const filters = getState().filters;
  let params = {};

  params['start_date'] = formatDate(filters['start_date']);
  params['end_date'] = formatDate(filters['end_date']);
  // params['category'] = filters['category'];

  const address = `${__API__}/tracking/details?${qs.stringify(params)}`
  // const address = `${__API__}/list/laneperformance`

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
