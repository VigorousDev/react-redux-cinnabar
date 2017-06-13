import axios from 'axios';

export const fetchLanes = (origin, destination, carrier, category, success, catchError, accessToken) => {
  const address = `${__API__}/couriers/laneperformance?origin_city=${origin}&destination_city=${destination}&courier_name=${carrier}&category=${category}`;

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

export const fetchLaneData = (success, catchError, accessToken) => {
  const address = `${__API__}/list/laneperformance`

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
