import { merge } from 'lodash';

const CarrierAllocationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_LANES': {
      const stateDup = merge({}, state);
      stateDup.lanes = action.lanes.data;
      return stateDup;
    }
    case 'RECEIVE_LANE_DATA': {
      const stateDup = merge({}, state);
      stateDup.laneData = action.laneData;
      return stateDup;
    }
    default:
      return state;
  }
};

export default CarrierAllocationReducer;
