import { getData, getBatchData } from '../util/api';
import { receiveData, receiveBatchData, logOut } from '../actions';
import * as REQUESTS from '../util/api/requests';

const DataMiddleware = ({ getState, dispatch }) => next => action => {
  const getDataSuccess = (response) => {
    const dataName = action.request;
    return dispatch(receiveData(dataName, response.data.data, action.dataGroup));
  };

  const getBatchDataSuccess = (response) => {
    if (response.data[0].status_code === 401) {
      return dispatch(logOut());
    }
    const dataNames = Object.keys(action.requests).map(key => key);
    return dispatch(receiveBatchData(dataNames, response.data, action.dataGroup));
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.data) {
        return dispatch(logOut());
      }
    }
    throw 'bad API config';
  };

  switch (action.type) {
    case 'GET_DATA': {
      getData(
        getState,
        REQUESTS[action.request](action.filters),
        getDataSuccess,
        handleError
      );
      return next(action);
    }
    case 'GET_BATCH_DATA': {
      const requests = Object.keys(action.requests).map(
          key => REQUESTS[key](action.requests[key]
      ));
      getBatchData(
        getState,
        requests,
        getBatchDataSuccess,
        handleError
      );
      return next(action);
    }
    default:
      return next(action);
  }
};

export default DataMiddleware;
