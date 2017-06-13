import {
  fetchLanes,
  fetchLaneData,
} from '../util/api/lane_performance_api_util';

import { receiveLanes, receiveLaneData } from '../actions';

const LanePerformanceMiddleware = ({ getState, dispatch }) => next => action => {
  const getLanesSuccess = (resp) => (
    dispatch(receiveLanes(resp.data))
  );

  const getLaneDataSuccess = (resp) => (
    dispatch(receiveLaneData(resp.data))
  );

  const getLanesFailure = (resp) => {
    console.log(resp);
  };

  switch (action.type) {
    case 'GET_LANES': {
      const accessToken = getState().currentUser.accessToken;
      fetchLanes(
        action.origin,
        action.destination,
        action.carrier,
        action.category,
        getLanesSuccess,
        getLanesFailure,
        accessToken
      );
      return next(action);
    }
    case 'GET_LANE_DATA': {
      const accessToken = getState().currentUser.accessToken;
      fetchLaneData(
        getLaneDataSuccess,
        getLanesFailure,
        accessToken
      );
      return next(action);
    }
    default:
      return next(action);
  }
};

export default LanePerformanceMiddleware;
