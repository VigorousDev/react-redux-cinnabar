import {
  takeAction,
  sendEmail,
} from '../util/api/preventive_alerts_api_util';
import {
  actionTakenSuccess,
  actionTakenFailure,
} from '../actions/preventive_alerts_actions';

const PreventiveAlertsMiddleware = ({ getState, dispatch }) => next => action => {
  const takeActionSuccess = () => {
    dispatch(actionTakenSuccess());
  };

  const takeActionFailure = () => {
    dispatch(actionTakenFailure());
  };

  switch (action.type) {
    case 'TAKE_ACTION': {
      const accessToken = getState().currentUser.accessToken;
      const orderIDs = action.payload.orderIDs;
      const actionType = action.payload.actionType;
      takeAction(takeActionSuccess, takeActionFailure, accessToken, orderIDs, actionType);
      if (actionType === 'email') {
        orderIDs.forEach(order => sendEmail(accessToken, order));
      }
      return next(action);
    }
    default:
      return next(action);
  }
};

export default PreventiveAlertsMiddleware;
