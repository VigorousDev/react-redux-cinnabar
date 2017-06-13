import axios from 'axios';

export const getAccessToken = (username, password, success, catchError) => {
  const address = `${__API__}/o/token/`;
  const params = new FormData();
  params.append('username', username);
  params.append('password', password);
  params.append('grant_type', 'password');

  return (
    axios({
      method: 'POST',
      url: address,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(__CLIENT_ID__ + ':' + __CLIENT_SECRET__),
      },
      data: params,
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};

export const getNewAccessToken = (refreshToken, success, catchError) => {
  const address = `${__API__}/o/token/`;
  const params = new FormData();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  return (
    axios({
      method: 'POST',
      url: address,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(__CLIENT_ID__ + ':' + __CLIENT_SECRET__),
      },
      data: params,
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};

export const createUser = (username, password, success, catchError, accessToken) => {
  const address = `${__API__}/manage/users`;
  const params = new FormData();
  params.append('email', username);
  params.append('password', password);

  return (
    axios({
      method: 'POST',
      url: address,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};

export const initiatePasswordReset = (username, success, catchError) => {
  const address = `${__API__}/manage/initiate_password_reset`;
  const params = new FormData();
  params.append('email', username);

  return (
    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: address,
      data: params,
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};

export const resetPassword = (username, password, token, success, catchError) => {
  const address = `${__API__}/manage/reset_password`;
  const params = new FormData();
  params.append('email', username);
  params.append('password', password);
  params.append('token', token);

  return (
    axios({
      method: 'POST',
      url: address,
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
    .then((response) => success(response))
    .catch((error) => catchError(error))
  );
};
