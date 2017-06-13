export const takeAction = (orderIDs, actionType) => ({
  type: 'TAKE_ACTION',
  payload: {
    orderIDs,
    actionType,
  },
});
export const sendEmail = () => ({
  type: 'SEND_EMAIL',
});
export const clearActionTaken = () => ({
  type: 'CLEAR_ACTION_TAKEN',
});
export const actionTakenSuccess = () => ({
  type: 'ACTION_TAKEN_SUCCESS',
});
export const actionTakenFailure = () => ({
  type: 'ACTION_TAKEN_FAILURE',
});
export const clearPreventiveAlerts = () => ({
  type: 'CLEAR_PREVENTIVE_ALERTS',
});
