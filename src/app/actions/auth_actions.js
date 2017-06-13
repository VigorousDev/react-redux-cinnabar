export const getAccessToken = (username, password) => ({
  type: 'GET_ACCESS_TOKEN',
  payload: {
    username,
    password,
  },
});

export const receiveAccessToken = (payload) => ({
  type: 'RECEIVE_ACCESS_TOKEN',
  payload,
});

export const badLogin = () => ({
  type: 'BAD_LOGIN',
});

export const clearBadLogin = () => ({
  type: 'CLEAR_BAD_LOGIN',
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const createUser = (username, password) => ({
  type: 'CREATE_USER',
  payload: {
    username,
    password,
  },
});

export const userCreated = (payload) => ({
  type: 'USER_CREATED',
  payload,
});
export const clearUserCreated = (payload) => ({
  type: 'CLEAR_USER_CREATED',
  payload,
});

export const initiatePasswordReset = (username) => ({
  type: 'INITIATE_PASSWORD_RESET',
  payload: {
    username,
  },
});

export const clearResetStatus = () => ({
  type: 'CLEAR_RESET_STATUS',
});

export const resetInitiated = (payload) => ({
  type: 'RESET_INITIATED',
  payload,
});

export const resetIniateFailed = (payload) => ({
  type: 'RESET_INITIATE_FAILED',
  payload,
});

export const resetPassword = (username, password, code) => ({
  type: 'RESET_PASSWORD',
  payload: {
    username,
    password,
    code,
  },
});

export const resetSuccess = (payload) => ({
  type: 'RESET_SUCCESS',
  payload,
});

export const resetFailed = (payload) => ({
  type: 'RESET_FAILED',
  payload,
});

export const removeTimeoutMessage = () => ({
  type: 'REMOVE_TIMEOUT_MESSAGE',
});

export const addTimeoutMessage = () => ({
  type: 'ADD_TIMEOUT_MESSAGE',
});

export const getNewAccessToken = (refreshToken, functionCall) => ({
  type: 'GET_NEW_ACCESS_TOKEN',
  payload: {
    refreshToken,
    functionCall,
  },
});
