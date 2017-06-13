import { merge } from 'lodash';

const PackageTrackingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TRACKING_DETAILS': {
      const stateDup = merge({}, state);
      stateDup.data = action.data;
      console.log(stateDup);
      return stateDup;
    }
    default:
      return state;
  }
};

export default PackageTrackingReducer;
