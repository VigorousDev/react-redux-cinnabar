import { browserHistory } from 'react-router';
import { merge } from 'lodash';

const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_ACCESS_TOKEN': {
      const stateDup = merge({}, state);
      stateDup.accessToken = action.payload.data.access_token;
      stateDup.refreshToken = action.payload.data.refresh_token;
      return stateDup;
    }
    case 'BAD_LOGIN': {
      const stateDup = merge({}, state);
      stateDup.badLogin = true;
      return stateDup;
    }
    case 'CLEAR_BAD_LOGIN': {
      const stateDup = merge({}, state);
      stateDup.badLogin = false;
      return stateDup;
    }
    case 'LOG_OUT': {
      const stateDup = merge({}, state);
      stateDup.accessToken = undefined;
      stateDup.refreshToken = undefined;
      stateDup.accessTokenGrantTime = undefined;
      browserHistory.push('/');
      return stateDup;
    }
    case 'USER_CREATED': {
      const stateDup = merge({}, state);
      stateDup.userCreated = true;
      return stateDup;
    }
    case 'CLEAR_USER_CREATED': {
      const stateDup = merge({}, state);
      stateDup.userCreated = false;
      return stateDup;
    }
    case 'RESET_INITIATED': {
      const stateDup = merge({}, state);
      stateDup.codeStatus = 'success';
      return stateDup;
    }
    case 'RESET_INITIATE_FAILED': {
      const stateDup = merge({}, state);
      stateDup.codeStatus = 'failed';
      return stateDup;
    }
    case 'RESET_SUCCESS': {
      const stateDup = merge({}, state);
      stateDup.resetStatus = 'success';
      return stateDup;
    }
    case 'RESET_FAILED': {
      const stateDup = merge({}, state);
      stateDup.resetStatus = 'failure';
      return stateDup;
    }
    case 'CLEAR_RESET_STATUS': {
      const stateDup = merge({}, state);
      stateDup.codeStatus = undefined;
      stateDup.resetStatus = undefined;
      return stateDup;
    }
    case 'REMOVE_TIMEOUT_MESSAGE': {
      const stateDup = merge({}, state);
      stateDup.timeoutMessage = false;
      return stateDup;
    }
    case 'ADD_TIMEOUT_MESSAGE': {
      const stateDup = merge({}, state);
      stateDup.timeoutMessage = true;
      return stateDup;
    }
    default:
      return state;
  }
};

export default currentUserReducer;
