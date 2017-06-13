import axios from 'axios';

export const fetchPackageTracking = (success, catchError, accessToken) => {
  // const address = `${__API__}/tracking/details`
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
