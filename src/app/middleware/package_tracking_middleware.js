import {
  fetchPackageTracking,
} from '../util/api/package_tracking_api_util';

import { receivePackageTracking } from '../actions';

const PackageTrackingMiddleware = ({ getState, dispatch }) => next => action => {
  const getSuccess = (resp) => (
    dispatch(receivePackageTracking(resp.data))
  );

  const getFailure = (resp) => {
    console.log(resp);
  };

  switch (action.type) {
    case 'GET_TRACKING_DETAILS': {
      const accessToken = getState().currentUser.accessToken;
      fetchPackageTracking(
        getState,
        getSuccess,
        getFailure,
        accessToken
      );
      return next(action);
    }
    default:
      return next(action);
  }
};

export default PackageTrackingMiddleware;
