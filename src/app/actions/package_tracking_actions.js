export const getTrackingDetails = () => ({
  type: 'GET_TRACKING_DETAILS',
});
export const receivePackageTracking = (data) => ({
  type: 'RECEIVE_TRACKING_DETAILS',
  data,
});