import { browserHistory } from 'react-router';

import {
  getAccessToken,
  createUser,
  initiatePasswordReset,
  resetPassword,
  getNewAccessToken,
} from '../util/api/auth_api_util';
import {
  receiveAccessToken,
  badLogin,
  userCreated,
  resetInitiated,
  resetIniateFailed,
  resetSuccess,
  resetFailed,
  logOut,
  addTimeoutMessage,
} from '../actions/auth_actions';

const AuthMiddleware = ({ getState, dispatch }) => next => action => {
  const getAccessTokenSuccess = (payload) => {
    dispatch(receiveAccessToken(payload));
  };

  const createUserSuccess = (payload) => {
    dispatch(userCreated(payload));
  };

  const initiatePasswordResetSuccess = (payload) => {
    dispatch(resetInitiated(payload));
  };

  const resetPasswordSuccess = (payload) => {
    dispatch(resetSuccess(payload));
  };

  const getNewAccessTokenSuccess = (payload) => {
    dispatch(receiveAccessToken(payload));
    dispatch(action.payload.functionCall());
  };

  const getNewAccessTokenError = () => {
    dispatch(logOut());
    dispatch(addTimeoutMessage());
    browserHistory.push('/');
  };

  const resetPasswordError = (payload) => {
    dispatch(resetFailed(payload));
  };

  const error = () => {
    dispatch(badLogin());
  };

  const resetError = () => {
    dispatch(resetIniateFailed());
  };

  switch (action.type) {
    case 'GET_ACCESS_TOKEN': {
      getAccessToken(
        action.payload.username,
        action.payload.password,
        getAccessTokenSuccess,
        error
      );
      return next(action);
    }
    case 'CREATE_USER': {
      const accessToken = getState().currentUser.accessToken;
      createUser(
        action.payload.username,
        action.payload.password,
        createUserSuccess,
        error,
        accessToken
      );
      return next(action);
    }
    case 'INITIATE_PASSWORD_RESET': {
      initiatePasswordReset(
        action.payload.username,
        initiatePasswordResetSuccess,
        resetError
      );
      return next(action);
    }
    case 'RESET_PASSWORD': {
      resetPassword(
        action.payload.username,
        action.payload.password,
        action.payload.code,
        resetPasswordSuccess,
        resetPasswordError
      );
      return next(action);
    }
    case 'GET_NEW_ACCESS_TOKEN': {
      getNewAccessToken(
        action.payload.refreshToken,
        getNewAccessTokenSuccess,
        getNewAccessTokenError
      );
      return next(action);
    }
    default:
      return next(action);
  }
};

export default AuthMiddleware;
