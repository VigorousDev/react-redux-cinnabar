import { merge } from 'lodash';

const PreventiveAlertsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ACTION_TAKEN_SUCCESS': {
      const stateDup = merge({}, state);
      stateDup.takeActionSuccess = 'success';
      return stateDup;
    }
    case 'ACTION_TAKEN_FAILURE': {
      const stateDup = merge({}, state);
      stateDup.takeActionSuccess = 'failure';
      return stateDup;
    }
    case 'CLEAR_ACTION_TAKEN': {
      const stateDup = merge({}, state);
      stateDup.takeActionSuccess = undefined;
      return stateDup;
    }
    default:
      return state;
  }
};

export default PreventiveAlertsReducer;
